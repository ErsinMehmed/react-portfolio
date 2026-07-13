# Handoff — "Ask my CV" AI feature (Groq + Netlify Function)

## Goal

Add an AI chatbot to the portfolio: a recruiter asks a natural-language
question (e.g. "has he worked with payment systems?") and gets a concise,
**grounded** answer with **source chips**, answered only from the real CV.
It must run for **$0** (free LLM tier) and keep the API key **server-side**.

Provider chosen: **Groq** (free tier, no card, ~0.3s answers, OpenAI-compatible),
model `llama-3.3-70b-versatile`.

## Current Progress

Feature is **built, typechecks, lints, tests (29) and builds green**, and the
serverless endpoint was **verified end-to-end** (real Groq calls returned correct
grounded answers + clean source chips; out-of-scope questions correctly answered
"I don't have that information").

Files added/changed (all uncommitted on branch `main`):

- `netlify/functions/ask-cv.mjs` — the endpoint. POST `{ question }` →
  `{ answer, sources[] }`. Reads `process.env.GROQ_API_KEY`, calls Groq with a
  grounded system prompt, per-IP rate limit (8/min, best-effort in-memory),
  input cap 500 chars, parses a trailing `SOURCES:` line into ≤3 chips.
- `netlify/functions/cv-knowledge.mjs` — the grounding context: the whole CV as
  plain English text, each block tagged with a short **comma-free**
  `[Source: ...]` label (labels must stay comma-free — the client splits sources
  on commas). Keep in sync with `src/Data.ts` + translations if the CV changes.
- `src/components/AskCvModal.tsx` — chat modal UI (example questions, user/assistant
  bubbles, source chips, loading dots, error states, dark mode, a11y dialog,
  scroll-lock, focus restore). Opens via `openAskCv()` (window event). Calls
  `/.netlify/functions/ask-cv`.
- `src/components/CommandPalette.tsx` — added an "Ask my CV" action (opens the modal).
- `src/components/ProfileCard.tsx` — added an outline "Ask my CV" button under Download CV.
- `src/App.tsx` — mounts `<AskCvModal/>` (lazy, alongside CommandPalette) so framer
  stays out of the entry chunk.
- `src/i18n/translations.ts` — `askCv.*` keys (EN + BG). Model already replies in
  the question's language automatically.
- `netlify.toml` — added `[functions] directory = "netlify/functions"`.
- `.gitignore` — added bare `.env` (for a local `netlify dev` key file).

Bundle stayed lean: main entry ~209 KB gz 70 (unchanged); AskCvModal is a lazy chunk.

## What Worked

- **Context-stuffing, no vector DB.** The CV is a few KB, so the whole thing goes
  in the system prompt. Groq answered accurately and fast.
- Instructing the model to end with `SOURCES:` and splitting on that (not JSON mode)
  is robust across models.
- Making `[Source: ...]` labels short and **comma-free** fixed broken source chips.
- Prompt rule "output SOURCES: none if you couldn't answer, max 3 relevant" fixed
  the model dumping all sections on out-of-scope questions.
- Testing the real function by importing `ask-cv.mjs` and calling it with a `Request`
  object under Node (functions v2 use the Web fetch API) — no deploy needed.
- `netlify dev --command "npm run dev" --target-port 5173 --port 8888 --offline`
  serves Vite **and** the function together locally.

## What Didn't Work / Gotchas

- **A frontend `VITE_*` key is NOT an option** — Vite inlines it into the browser
  bundle, so the Groq key would be public and abused. The key MUST live server-side
  (the Netlify function). This was explicitly discussed and settled.
- `netlify dev` flag is `--target-port` (not `--targetPort`).
- Under the `netlify dev` proxy (:8888) the app hydrated slower than plain Vite
  (:5173); Playwright screenshots against :5173 (raw Vite) were more reliable. The
  modal empty state renders fine without the function (only sending needs it).
- `netlify dev` created a stray `deno.lock` (edge runtime) — deleted; harmless.
- **A live Groq key was pasted into the chat earlier — treat it as compromised.**
  It must be **regenerated** in the Groq console before use; do not reuse the pasted one.

## Next Steps

1. **Regenerate the Groq key** (the previously shared one is burned). Groq console
   → revoke old, create new.
2. **Add it to Netlify**: Site settings → Environment variables → `GROQ_API_KEY` =
   the new key. (Server-side only; never a `VITE_` var.)
3. **Local testing (optional):** create a gitignored `.env` in the repo root with
   `GROQ_API_KEY=...`, then `npx netlify dev` and open the site; click "Ask my CV".
4. **Deploy**: `git push` — Netlify builds the site and the function together. The
   endpoint lives at `/.netlify/functions/ask-cv`.
5. **Verify on prod**: open the deployed site, "Ask my CV" → ask
   "Has he worked with payment systems?" → expect an answer + source chips.
   Without the env var set, the function returns 503 `not_configured` and the UI
   shows a friendly "assistant isn't configured yet" message (graceful).
6. **Commit** the feature (nothing here contains the key — it's only ever in Netlify's
   env). Suggested scope: the `netlify/` dir, AskCvModal, CommandPalette action,
   ProfileCard button, App wiring, translations, netlify.toml, .gitignore.
7. Optional later polish: streaming responses (Netlify streaming / edge function),
   and keeping `cv-knowledge.mjs` in sync when the CV data changes.
