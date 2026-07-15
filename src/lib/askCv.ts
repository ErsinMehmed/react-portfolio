import type { Lang } from "../i18n/LanguageContext";

/** The one serverless endpoint behind every AI feature (see netlify/functions/ask-cv.mjs). */
export const ASK_CV_ENDPOINT = "/.netlify/functions/ask-cv";

export type AskCvMode = "ask" | "interview" | "decision";

/** Decision context sent for the case-study "why this over the alternatives" mode. */
export interface DecisionInput {
  title: string;
  problem: string;
  choice: string;
  why: string;
  tags?: string[];
}

export interface StreamAskCvParams {
  mode?: AskCvMode;
  question?: string;
  lang: Lang;
  decision?: DecisionInput;
  /** Called on every token with the full accumulated raw text so far. */
  onToken: (fullRaw: string) => void;
  signal?: AbortSignal;
}

/**
 * POST the request and read the function's Server-Sent Events, forwarding the
 * model's token deltas as they arrive. Resolves with the full raw text once the
 * stream ends. Throws `Error(<code>)` for a non-2xx response, where the message
 * is the function's JSON error code (e.g. "rate_limited") so callers can map it
 * to a translated string.
 */
export async function streamAskCv(params: StreamAskCvParams): Promise<string> {
  const res = await fetch(ASK_CV_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: params.mode ?? "ask",
      question: params.question,
      lang: params.lang,
      decision: params.decision,
    }),
    signal: params.signal,
  });

  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => ({}));
    throw new Error(String((data as { error?: string })?.error ?? "error"));
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let raw = "";
  let buffer = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Groq speaks OpenAI's SSE: newline-delimited `data: {json}` frames, ending
    // with `data: [DONE]`. Process only whole lines; keep any trailing partial.
    let nl: number;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, nl).trim();
      buffer = buffer.slice(nl + 1);
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
        if (typeof delta === "string" && delta) {
          raw += delta;
          params.onToken(raw);
        }
      } catch {
        // A keep-alive comment or a frame split across chunks — ignore it.
      }
    }
  }

  return raw;
}

export interface ParsedAnswer {
  answer: string;
  sources: string[];
  followups: string[];
}

const firstMeta = /\n?\s*(?:SOURCES:|FOLLOWUPS:)/i;

/**
 * The text the user should see mid-stream: everything before the first metadata
 * marker, so the raw "SOURCES:" / "FOLLOWUPS:" lines never flash in the bubble.
 */
export function stripMeta(raw: string): string {
  const idx = raw.search(firstMeta);
  return (idx === -1 ? raw : raw.slice(0, idx)).trimEnd();
}

/** Split an "ask"-mode answer from its trailing SOURCES and FOLLOWUPS lines. */
export function parseAskAnswer(raw: string): ParsedAnswer {
  const answer = stripMeta(raw);

  const srcLine = raw.match(/SOURCES:\s*([^\n]*)/i)?.[1]?.trim() ?? "";
  const sources =
    !srcLine || /^none$/i.test(srcLine)
      ? []
      : srcLine.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 3);

  const fuLine = raw.match(/FOLLOWUPS:\s*([^\n]*)/i)?.[1]?.trim() ?? "";
  const followups =
    !fuLine || /^none$/i.test(fuLine)
      ? []
      : fuLine.split("|").map((s) => s.trim()).filter(Boolean).slice(0, 3);

  return { answer, sources, followups };
}
