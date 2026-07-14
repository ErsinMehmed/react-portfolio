# Handoff — react-portfolio (paused 2026-07-14)

Repo: github.com/ErsinMehmed/react-portfolio. Last pushed commit is `b58c2e2`
(command palette + AI assistant). **Everything from the 2026-07-14 session
(case-study pages, see below) is UNCOMMITTED working-tree work** — verify with
`git status`, then commit + push after review. All checks green as of writing:
`npm run typecheck && npm run lint && npm test && npm run build` (29 tests).

## Goal

Portfolio that proves seniority. Latest feature: **deep case-study pages** per
flagship project (problem → architecture diagram → key technical decisions +
why → results with numbers) — "the one thing that separates senior from
junior". Bilingual EN/BG, dark mode, per-project brand accent.

## Current Progress (2026-07-14 session — UNCOMMITTED)

Three case-study pages live at `/projects/:slug`:

| Slug | Project | Accent (from the REAL site's CSS) | Timeline |
|---|---|---|---|
| `mypos-partner-portal` | MyPOS Partner Portal | blue `#0071f3` (partners.mypos.com) | 02.2025 - 06.2025 |
| `mypos-payments-system` | Уеб система за бизнес процеси/плащания | green `#00b67a` (www.mypos.com) | 07.2023 - 07.2026 |
| `soko-beauty` | Soko Beauty store | dusty rose `#c97a7e` (sokobeauty.bg `--color-rose`) | 05.2026 - Present |

Architecture:

- **Content**: `src/data/caseStudies.ts` — registry keyed by slug; long-form
  prose is inline `{ en, bg }` (NOT in translations.ts, to keep the flat `t()`
  map lean). BG was **hand-rewritten to sound human**, not translated (user
  complained the first BG draft read like AI; rewrite approved-ish, unreviewed).
- **Types**: `src/types/caseStudy.ts` (exported via `src/types/index.ts`).
  Metric `suffix` is `string | Bilingual` (e.g. `{ en: "-in-1", bg: "-в-1" }`).
- **Page**: `src/pages/CaseStudy.tsx` (lazy route in `App.tsx`; unknown slug →
  NotFound). Sections: Hero → MetricsBand → 01 Problem+constraints →
  02 Architecture (animated spine diagram) → 03 Decisions
  (Problem/Approach/Why/Result rhythm) → 04 Results → 05 Stack → FooterNav.
- **Components**: `src/components/CaseStudy/` — `CaseStudyShell` (accent as CSS
  vars `--cs-*`, scroll-progress bar, sticky header), `CaseStudyHero`
  (staggered entrance), `MetricsBand` (NumberTicker), `SectionNav` (sticky
  rail, IntersectionObserver active tracking), `ArchitectureDiagram` (vertical
  spine + travelling pulse, `animate-cs-flow` keyframe in `index.css`),
  `DecisionsSection`, `CaseStudyFooterNav` (prev/next via `caseStudyOrder`),
  `shared.tsx` (`useBilingual`, `SectionHeading`).
- **Entry points**: `caseStudySlug` on 3 projects in `src/Data.ts` →
  ProjectCard renders a Link + "Инфо за проекта" badge instead of the modal.
- **i18n**: `cs.*` keys in translations.ts; BG for "case study" = "Инфо за
  проекта"; `duration.present` bg changed "Настояще" → "Досега" (also affects
  resume badges). Resume myPOS experience end-dated `07.2023 - 07.2026` (user
  no longer works there).

## What Worked

- Flagship-first flow (user chose): built MyPOS Partner Portal fully, got
  feedback, then cloned the shape for the other two.
- Fetching the real sites' CSS to extract true brand accents (curl the HTML,
  find `/_next/static/.../*.css`, grep hex/var definitions).
- Headless Edge screenshots: old `--headless` mode works, `--headless=new`
  produced NO_SHOT; tall viewports >~3400px also NO_SHOT; use separate
  `--user-data-dir` per parallel capture; `--force-dark-mode` for dark shots.
  In-view reveals don't fire in headless (no scroll) — screenshot artifact,
  not a bug.
- Per-study accent via CSS custom properties on the page root (`--cs-accent`,
  `--cs-ink`, `--cs-on-dark`, `--cs-soft`, `--cs-glow`, `--cs-line`).

## What Didn't Work

- First BG copy draft = literal mirror of EN → user rejected ("звучи като АИ").
  Human rewrite done. Lesson: write BG natively, short sentences, dev slang.
- `AutoPilot` case study was planned but **dropped** — it's an award/cert, not
  a project entry; user pivoted to paymentsSystem + sokoBeauty instead.
- Anchor-hash screenshots (`#architecture`) don't scroll in the SPA capture.

## ⚠️ Placeholder numbers (IMPORTANT before deploy)

All case-study **metrics** (30+/60%/40%/10min; 30+/50%/3-in-1/100%;
2/90+/100%/24-7) and quantified impact lines are **representative fakes I
made up**, clearly flagged to the user, who has NOT yet supplied real ones.
The one user-dictated string: "По-висока производителност / Redis кеширане за
по-бърз достъп до данните" (keep verbatim). Don't ship fake numbers to
recruiters — ask for real figures or soften to non-numeric claims.

## Next Steps

1. User reviews the 3 pages (BG copy esp.) at `/projects/...` — dev server was
   on port 5182 (many stale Vite instances occupy 5173-5181).
2. Replace placeholder metrics with real numbers (or de-numerify).
3. Commit + push (conventional message; run the 4 checks first).
4. Maybe: shorter display title for `mypos-payments-system` (its full name
   wraps to 3 hero lines); OG/meta for case-study routes is DECLINED territory
   (see below) — don't propose.

## Carried-forward items (from 2026-07-13 handoff — still pending)

- **Groq key rotation + Netlify env** — the "Ask about me" AI is built but not
  live: rotate the compromised Groq key, set `GROQ_API_KEY` in Netlify env
  (server-side, never `VITE_`), redeploy, replace the local gitignored `.env`
  key too.
- Skills `years`/`projects` in `src/Data.ts` are estimates.
- Some certifications lack Drive `link:`s.
- Lighthouse perf ~0.87 (warning).

## Explicitly DECLINED (do NOT re-propose)

- Feedback widget (Netlify Forms).
- OG/Twitter meta + JSON-LD + sitemap SEO.
- 3D hero (react-three-fiber) — removed earlier; only CSS `useTilt` remains.

## Workflow reminders

- `build/` is gitignored — Netlify builds from source; don't commit it.
- Before pushing: `npm run typecheck && npm run lint && npm test && npm run build`.
- Never commit the Groq key.
- `netlify/functions/cv-knowledge.mjs` `[Source: ...]` labels stay comma-free.
- Long case-study prose goes in `caseStudies.ts` inline `{en,bg}`, NOT
  translations.ts; short reused UI labels go in translations.ts as `cs.*`.
