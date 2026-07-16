import { cvContext } from "./cv-knowledge.mjs";
import { putRecord, KIND } from "./analytics-store.mjs";

// Groq is OpenAI-compatible and free (llama-3.3-70b-versatile is fast + strong
// enough for grounded CV Q&A). The API key lives only here, server-side, in the
// GROQ_API_KEY env var — it is never shipped to the browser.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

// Only the site itself (and local dev) may call this — blocks other sites
// from burning the free Groq quota via cross-origin POSTs.
const ALLOWED_ORIGINS = [
  "https://ersin-mehmed.netlify.app",
  "http://localhost:5173",
  "http://localhost:8888",
];

// Best-effort per-IP rate limit. In-memory, so it resets on cold starts — that
// is fine: it only exists to blunt abuse of the free tier, not to be airtight.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map();

// The Map would otherwise grow one entry per unique IP until the next cold
// start. Sweep out fully-elapsed windows, but only once it is large enough to
// be worth the pass, so the common request path stays O(1).
const MAX_TRACKED_IPS = 5000;
const pruneStale = (now) => {
  if (hits.size < MAX_TRACKED_IPS) return;
  for (const [key, rec] of hits) {
    if (now - rec.ts >= WINDOW_MS) hits.delete(key);
  }
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const LANG_NAME = { en: "English", bg: "Bulgarian" };

// --- Prompt builders, one per mode ------------------------------------------

// Free-form recruiter Q&A. Answer, then a machine-parsable SOURCES line and a
// FOLLOWUPS line the client peels off (see parseAskAnswer on the client).
const askSystem = () => `You are an assistant that answers recruiters' questions about Ersin Hyusein, a Senior Full Stack Web Developer, using ONLY the CV context below.

Rules:
- Reply in the SAME language as the question (English or Bulgarian).
- Keep it concise: 2-4 sentences, factual, no hype.
- Base every claim strictly on the context. If it isn't covered, say you don't have that information rather than guessing.
- Then, on a new line, output "SOURCES:" followed by up to THREE comma-separated section titles you relied on (the exact text inside the [Source: ...] labels, without the word "Source:"), or exactly "SOURCES: none".
- Then, on a new final line, output "FOLLOWUPS:" followed by up to THREE short, natural follow-up questions the recruiter might ask next, separated by " | ", each answerable from this context and written in the same language as your answer, or exactly "FOLLOWUPS: none".

CV CONTEXT:
${cvContext}`;

// "Prepare interview questions about me" mode: a grouped question set, each
// with a short grounded model answer, so a recruiter can walk in prepared.
const interviewSystem = (lang) => `You are helping a recruiter prepare to interview Ersin Hyusein, a Senior Full Stack Web Developer, using ONLY the CV context below.

Produce 6 to 8 strong interview questions that probe his real strengths, grouped under these three headers, in this order: Technical, Experience, Behavioral & Leadership. Under each header list its questions. For every question add a concise suggested answer (1-2 sentences) grounded strictly in the context.

Format each item on two lines, exactly:
Q: <question>
A: <answer>
Put each group's header on its own line above that group's items.

Rules:
- Reply in ${LANG_NAME[lang] ?? "English"}.
- Factual and specific, no hype. Every answer must be supported by the context.
- Do not invent facts that are not present in the context.

CV CONTEXT:
${cvContext}`;

// Per case-study decision: explain the trade-off, why this over the realistic
// alternatives. Grounded only in the decision the client sends.
const decisionSystem = (lang) => `You explain one technical decision made by a senior full-stack developer to a technically literate visitor, using ONLY the decision details the user provides.

In 2 to 4 sentences, explain why this option was chosen over the realistic alternatives and what trade-offs were accepted. Be concrete and specific. Do not restate the choice verbatim, do not add hype, and do not invent project facts beyond the details given (you may reason about well-known properties of the named technologies).

Reply in ${LANG_NAME[lang] ?? "English"}.`;

const buildMessages = (mode, lang, payload) => {
  if (mode === "interview") {
    return [
      { role: "system", content: interviewSystem(lang) },
      { role: "user", content: "Generate the interview questions now." },
    ];
  }

  if (mode === "decision") {
    const d = payload?.decision ?? {};
    const userText = [
      `Title: ${String(d.title ?? "").slice(0, 300)}`,
      `Problem: ${String(d.problem ?? "").slice(0, 600)}`,
      `Choice: ${String(d.choice ?? "").slice(0, 600)}`,
      `Stated reason: ${String(d.why ?? "").slice(0, 600)}`,
      `Tech: ${(Array.isArray(d.tags) ? d.tags : []).join(", ").slice(0, 200)}`,
    ].join("\n");
    return [
      { role: "system", content: decisionSystem(lang) },
      { role: "user", content: userText },
    ];
  }

  const question = String(payload?.question ?? "").trim().slice(0, 500);
  if (!question) return null;
  return [
    { role: "system", content: askSystem() },
    { role: "user", content: question },
  ];
};

// Groq caps and temperature per mode: the interview set is long, the others short.
const GEN = {
  ask: { max_tokens: 400, temperature: 0.2 },
  interview: { max_tokens: 900, temperature: 0.4 },
  decision: { max_tokens: 320, temperature: 0.3 },
};

// What to file the exchange under on the /stats dashboard.
const questionLabel = (mode, payload) => {
  if (mode === "interview") return "[interview prep]";
  if (mode === "decision")
    return `[decision] ${String(payload?.decision?.title ?? "").slice(0, 200)}`;
  return String(payload?.question ?? "").slice(0, 500);
};

// Tees Groq's SSE: every chunk goes to the browser untouched and is also
// accumulated here, so the finished answer can be logged. `flush` runs when the
// upstream ends — still inside this invocation, while the response is being
// streamed — so there is no background work to get killed after the return.
const answerLogger = (meta) => {
  const decoder = new TextDecoder();
  let buffer = "";
  let answer = "";

  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk);
      buffer += decoder.decode(chunk, { stream: true });

      let nl;
      while ((nl = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line.startsWith("data:")) continue;

        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        try {
          const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
          if (delta) answer += delta;
        } catch {
          /* keepalive or a partial frame — the next chunk completes it */
        }
      }
    },
    async flush() {
      await putRecord(KIND.qa, { ...meta, answer: answer.slice(0, 8000) });
    },
  });
};

export default async (req, context) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const origin = req.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) return json({ error: "forbidden_origin" }, 403);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return json({ error: "not_configured" }, 503);

  const ip = req.headers.get("x-nf-client-connection-ip") || "unknown";
  const now = Date.now();
  pruneStale(now);
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

  const mode = ["interview", "decision"].includes(payload?.mode) ? payload.mode : "ask";
  const lang = payload?.lang === "bg" ? "bg" : "en";

  const messages = buildMessages(mode, lang, payload);
  if (!messages) return json({ error: "empty_question" }, 400);

  const { max_tokens, temperature } = GEN[mode];

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
        temperature,
        max_tokens,
        stream: true,
        messages,
      }),
    });
  } catch {
    return json({ error: "upstream_unreachable" }, 502);
  }

  if (!res.ok || !res.body) return json({ error: "upstream_error" }, 502);

  // Pass Groq's OpenAI-style SSE through; the client reads the token deltas.
  // Streaming keeps the answer appearing word-by-word instead of after a
  // multi-second wait, which matters most for the long interview set. The tee
  // records the exchange for /stats without delaying a single token.
  const logged = res.body.pipeThrough(
    answerLogger({
      mode,
      lang,
      question: questionLabel(mode, payload),
      country: context?.geo?.country?.code ?? undefined,
    })
  );

  return new Response(logged, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
};
