import { cvContext } from "./cv-knowledge.mjs";

// Groq is OpenAI-compatible and free (llama-3.3-70b-versatile is fast + strong
// enough for grounded CV Q&A). The API key lives only here, server-side, in the
// GROQ_API_KEY env var — it is never shipped to the browser.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

// Best-effort per-IP rate limit. In-memory, so it resets on cold starts — that
// is fine: it only exists to blunt abuse of the free tier, not to be airtight.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map();

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// The model is told to end with a "SOURCES:" line listing the [Source: ...]
// labels it used. Splitting on that is more robust across models than JSON mode.
const parseAnswer = (raw) => {
  const idx = raw.lastIndexOf("SOURCES:");
  if (idx === -1) return { answer: raw.trim(), sources: [] };
  const answer = raw.slice(0, idx).trim();
  const tail = raw.slice(idx + "SOURCES:".length).trim();
  const sources = /^none$/i.test(tail)
    ? []
    : tail
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3);
  return { answer, sources };
};

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return json({ error: "not_configured" }, 503);

  const ip = req.headers.get("x-nf-client-connection-ip") || "unknown";
  const now = Date.now();
  const rec = hits.get(ip);
  if (rec && now - rec.ts < WINDOW_MS) {
    if (rec.count >= MAX_PER_WINDOW) return json({ error: "rate_limited" }, 429);
    rec.count += 1;
  } else {
    hits.set(ip, { count: 1, ts: now });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const question = String(payload?.question ?? "").trim().slice(0, 500);
  if (!question) return json({ error: "empty_question" }, 400);

  const system = `You are an assistant that answers recruiters' questions about Ersin Hyusein, a Senior Full Stack Web Developer, using ONLY the CV context below.

Rules:
- Reply in the SAME language as the question (English or Bulgarian).
- Keep it concise: 2-4 sentences, factual, no hype.
- Base every claim strictly on the context. If it isn't covered, reply that you don't have that information rather than guessing.
- On a new final line, output "SOURCES:" followed by up to THREE comma-separated section titles you actually relied on (the exact text inside the [Source: ...] labels, without the word "Source:"). List only the most relevant ones. If you could not answer from the context, output exactly "SOURCES: none".

CV CONTEXT:
${cvContext}`;

  let res;
  try {
    res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 400,
        messages: [
          { role: "system", content: system },
          { role: "user", content: question },
        ],
      }),
    });
  } catch {
    return json({ error: "upstream_unreachable" }, 502);
  }

  if (!res.ok) return json({ error: "upstream_error" }, 502);

  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content ?? "";
  if (!raw) return json({ error: "empty_response" }, 502);

  return json(parseAnswer(raw));
};
