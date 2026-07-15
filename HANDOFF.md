# Handoff — react-portfolio (paused 2026-07-14, late session)

Repo: github.com/ErsinMehmed/react-portfolio. Last pushed commit `f12730e`
("Add deep case-study pages for the flagship projects") — the whole case-study
feature + the case-study loading skeleton are **committed and pushed**.
Working tree at pause: only this HANDOFF.md is modified. All checks green:
`npm run typecheck && npm run lint && npm test && npm run build` (29 tests).

## Goal

Portfolio that proves seniority. Case-study feature is DONE and live on main.
**Next phase: apply the fixes from the full senior review** (19-section audit
done this session — architecture, React, TS, UX, design, a11y, perf, bugs,
responsive, animations, security, SEO). Nothing from its action plan is
applied yet.

## Current Progress (this session)

1. **Case-study BG copy fully humanized** — user dictated ~60 sentence-level
   rewrites across all 3 studies (marketing tone → neutral technical Bulgarian).
   EN was NOT given the same pass and still reads AI-flavoured in places
   ("It is payments.", "lives or dies on speed") — flagged in review §5/§13.
2. **Soko Beauty corrected to reality**: DB is **PostgreSQL** (was MongoDB) in
   caseStudies.ts + Data.ts; added "Admin dashboard" + "Customer account"
   architecture layers (campaigns, products/categories, email campaigns,
   orders, refund promotions; order history, referral program, payment
   methods, Soko points → real money) + points-as-ledger decision.
3. `project.paymentsSystem.name` BG changed to "Уеб платформа за управление на
   търговски акаунти, плащания и финансови операции." (EN still the old
   sentence — review recommends a SHORT product name instead, see plan).
4. **Case-study route skeleton**: `/projects/:slug` previously fell into the
   projects-list skeleton (ProfileCard shape — wrong). Now `isCaseStudyRoute()`
   in `src/components/Loading.tsx` renders `CaseStudySkeleton` matching
   CaseStudyShell 1:1 (header/hero/metrics/nav/sections/footer). Verified with
   Playwright screenshots.
5. **Committed + pushed everything** (f12730e).
6. **Full senior review delivered** (in-chat, 19 sections, scores, 50+ feature
   ideas, action plan). Verified findings via: reading every src file, prod
   build chunk analysis, npm audit (0 vulns), Playwright DOM audit across
   5 routes × 5 viewports (320→1440) + 14 screenshots incl. dark.

## The Review's Action Plan (= the Next Steps)

### Critical
1. **Rotate compromised Groq key** + set `GROQ_API_KEY` in Netlify env (still
   pending since 07-13; AI assistant not live in prod).
2. **Resume mobile horizontal overflow (320/375px)** — hidden skill tooltip
   (`w-[248px]` absolute, opacity-0) stretches scrollWidth
   (`src/components/Resume/SkillBox.tsx`). Fix: `overflow-x: clip` on section
   or `hidden group-hover/skill:block` instead of opacity.
3. **Fake case-study metrics** (30+/60%/40%/10min etc.) — replace with real
   numbers from user or de-numerify. Interview integrity risk.
4. **Dark mode invisible icons** — TechLogo uses simple-icons brand hex:
   Codex #000000, GitHub #181717, Next.js black → invisible on slate-900
   (`src/components/Resume/SkillBox.tsx` iconMap/customIcons). Add dark
   variants or fill-current.

### High
5. No `<h1>` on Home/Resume/Projects/Certifications (Layout title is h2,
   ProfileCard name h2). CaseStudy is fine.
6. Focus trap missing in AskCvModal, CommandPalette, QR modal (ProjectModal
   HAS one — copy that pattern / extract `useDialog`). + `aria-live="polite"`
   on AskCv transcript.
7. Kicker contrast: `text-slate-400` on white ≈3.0:1 fails AA (11px uppercase
   labels: constraints/why/result/sources) → slate-500/600.
8. **Cyrillic font gap**: @font-face covers latin/latin-ext/vietnamese +
   hanken **cyrillic-EXT (U+0460-052F) only** — basic Cyrillic U+0410-044F is
   NOT covered, so ALL Bulgarian text renders in system fallback (both
   families). Add Hanken Grotesk cyrillic subset; decide display-font
   strategy for BG.
9. MobileMenu active gradient `#ffafbd→#ffc3a0` (pink/peach) is off-brand →
   brand blue (`src/components/MobileMenu.tsx`).
10. netlify.toml: add `[[headers]]` — immutable cache for /assets + /fonts,
    X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
11. `project.paymentsSystem.name` → short name ("myPOS Merchant Platform"
    style) in BOTH langs; sentence belongs in description.

### Medium
12. Case study mobile has no bottom nav (dead end) + ScrollToTop kills back
    scroll position on /projects.
13. framer-motion loads on every page via the AskCvModal chunk (122kB raw /
    ~40 gzip — confirmed by chunk grep). Move Layout h2 + ThemeToggle
    animations to CSS to actually keep framer out of the critical path.
14. ErrorBoundary (none exists); Header.tsx useEffect missing deps array
    (sets document.title every render); ~~#1b74e4 hardcoded ~50× → tailwind
    theme token~~ **done 2026-07-15** — `colors.brand`/`brand-dark` added to
    tailwind.config.js, all components repointed, `src/theme/colors.ts` +
    index.html CSS vars cover the two raw-hex (non-Tailwind-class) spots.
15. Certification cards lack titles (icon + paragraph only, poor scan).
16. Playwright smoke in CI (routes open + no horizontal overflow assert).
17. SEO pack — user EXPLICITLY asked in the review prompt (overrides the old
    "declined" note for this scope): per-route meta descriptions, OG cards,
    sitemap, JSON-LD, consider prerender. Confirm with user before building.

### Low
18. ~~Delete dead code: `src/App.css` (never imported), unused `color` fields
    (educations/experiences/techSkills), unused `iconColor` (personalInfo).~~
    **done 2026-07-15** — removed `src/App.css`, `color` from
    Education/Experience/MainSkill + `iconColor` from PersonalInfoItem (types
    + Data.ts + the one test fixture). **Kept** `TechSkill.color`: it's a live
    fallback dot in `SkillBox.tsx`'s `TechLogo` (renders when a title has no
    simple-icons/custom-icon match) — not actually dead, just unreachable with
    today's data since every current skill has a logo.
19. Derive Loading skeleton counts from Data.ts (currently hardcoded 27/5/8).
20. CommandPalette `onMouseMove` → gate `setActive` on change.
21. `cs-flow` keyframe animates `top` → translateY (index.css).
22. Rate-limit Map in ask-cv.mjs never pruned (grows till cold start).
23. Origin check in ask-cv.mjs (any site can burn the Groq quota).
24. Feature ideas backlog: 50+ items in the review (blog/MDX, terminal easter
    egg, GitHub live integration, streaming AskCv, accent picker...).

## Review scores (for context)

Architecture 7.5 · React 7.5 · Perf 7 · Design 8 · UX 7.5 · A11y 6 · SEO 3.5 ·
Maintainability 8 · Scalability 6.5 · Code Quality 8 · Portfolio Value 8 ·
Senior Level 7.5. Biggest single risk: fake metrics.

## What Worked (this session)

- Playwright via npx cache: no playwright devDependency; run scripts with
  `NODE_PATH="C:\Users\USER-PC\AppData\Local\npm-cache\_npx\e41f203b7505f1fb\node_modules" node script.js`
  (chromium already installed). Dev server on :5173.
- DOM audit script pattern (routes × viewports, measure scrollWidth overflow,
  h1 count, alt/name coverage, touch targets) — objective findings, no
  guessing. Script lives in the session scratchpad (rewrite if needed).
- To see InViewAnimation content in full-page screenshots: scroll the page
  step-by-step first (reveals are viewport-triggered), then capture.
- User dictates BG copy line-by-line; apply verbatim, keep EN in sync only
  when told.

## What Didn't Work / gotchas

- `npx -p playwright node script` still can't resolve the module — must use
  NODE_PATH pointing into the npx cache.
- First audit run printed to stdout got truncated by tail — write JSON to a
  file, then summarize.

## Explicitly DECLINED (do NOT re-propose unprompted)

- Feedback widget (Netlify Forms).
- 3D hero (react-three-fiber) — removed earlier; only CSS `useTilt` remains.
- (SEO was declined 07-13 BUT the user explicitly requested SEO analysis and
  ideas in the review prompt — treat as re-opened, confirm scope first.)

## Workflow reminders

- `build/` is gitignored — Netlify builds from source; don't commit it.
- Before pushing: `npm run typecheck && npm run lint && npm test && npm run build`.
- Never commit the Groq key. `.env` is gitignored, key inside is compromised
  → rotate.
- Long case-study prose → `src/data/caseStudies.ts` inline `{en,bg}`;
  short reused UI labels → translations.ts `cs.*` keys.
- `netlify/functions/cv-knowledge.mjs` `[Source: ...]` labels stay comma-free.
- Commit style: short imperative subject, body explains why (see git log).
