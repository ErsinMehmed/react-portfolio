# Handoff — react-portfolio (paused 2026-07-15)

Repo: github.com/ErsinMehmed/react-portfolio. Last commit `93c281c`
("Fix skill-tooltip flip math and a reused translation key").

**Working tree is DIRTY and UNCOMMITTED** — this session's a11y/font/cache/nav
work is not committed yet. `git status`: ~27 modified files + 1 untracked
(`public/fonts/onest-cyrillic.woff2` — must `git add` it, it's a real asset).
All checks were green at pause: `npm run typecheck && npm run lint && npm test
&& npm run build` (37 tests). **Next agent: run the 4 checks, then commit +
push** (small logical commits, or one "a11y + BG fonts + cache headers + nav
redesign" commit).

## Goal

Portfolio that proves seniority. Working through the senior-review action plan
(19-section audit from 2026-07-14). This session cleared most of the a11y +
several design/React items. Remaining plan items + one deferred perf epic
(prerender) below.

## Done THIS session (2026-07-15)

**Design-system primitives extracted** (some by the user in parallel — respect
them):
- `src/hooks/useDialog.ts` + `src/components/ui/Dialog.tsx` — one modal
  primitive: backdrop, scroll-lock, Escape, **focus trap**, focus move-in +
  restore. ProjectModal, AskCvModal, CommandPalette, ProfileCard QR all use it
  now. Test: `src/tests/useDialog.test.tsx`.
- `src/components/ui/Button.tsx` + `Chip.tsx` (user-added) — now used across
  ProjectCard/ProjectModal/ProfileCard/CaseStudyFooterNav.
- `src/routes.ts` — single source for all paths. `routes.*` for links,
  `routePatterns.caseStudy` for `<Route path>`. Killed inline `/projects/${slug}`.
- `src/hooks/useMediaQuery.ts` (user-added) — SkillsFilterSection responsive
  column count. jsdom has no matchMedia → stubbed in `src/setupTests.ts`.

**A11y (review §5/§6/§7 + extras):**
- **h1**: Layout page title `h2 → h1`; whole heading tree bumped up one level
  (Home/Resume/Project/Certification/SkillsFilterSection/ProjectCard). Each
  content page now has exactly one h1. ProfileCard/AskCv dialog stay h2.
- **Focus trap**: solved via `useDialog` (was missing in AskCv/CommandPalette/
  QR). `aria-live="polite" role="log"` on the AskCv transcript.
- **Kicker contrast**: light `text-slate-400 → slate-500` (≥4.5:1) on
  CaseStudyHero ×2, CaseStudyFooterNav, DecisionsSection, AskCv sources,
  CommandPalette group headers. Dark unchanged.
- **`<main>` landmark** added in CaseStudyShell (was a bare div).
- **Touch targets**: ProjectModal close/nav buttons `h-9 → h-11` (44px) +
  title `pr-36`. LanguageToggle: kept the compact 24px visual pill (matches
  the header's density) but gave each button a 44px tap area via an
  invisible `after:` pseudo-element expanding it -10px top/bottom only (not
  sideways, so it can't steal the adjacent EN/BG button's hit zone) —
  visual AA (24px) and tap-target AAA (44px) at once. ThemeToggle (32px)
  still left; bump later if AAA wanted there too.

**§8 Cyrillic font — the review finding was WRONG, corrected:** Hanken Grotesk
does NOT ship a base-Cyrillic subset on Google (verified via css2: only
`cyrillic-ext` U+0460-052F); Bricolage has none at all. So you can't "add the
Hanken subset". Solution shipped: self-hosted **Onest** (geometric grotesque,
harmonises) at `public/fonts/onest-cyrillic.woff2` (14KB), `@font-face` in
index.css scoped `unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,
U+2116`, and `"Onest"` appended to BOTH `sans` + `display` stacks in
tailwind.config.js. EN stays 100% on brand faces; only BG Cyrillic glyphs pull
Onest, fetched only when BG is shown.

**§9 MobileMenu** pink/peach gradient → brand-blue active pill (filled icon,
outline when inactive, prefix-active so Projects stays lit on `/projects/:slug`,
safe-area inset, blur). `src/components/MobileMenu.tsx`.

**Main desktop nav redesign** (`src/components/Header.tsx`): 4 chunky 89×89
tiles (were an anti-reference "identical card grid") → compact segmented pill
bar, brand-fill active, distinct hover, `aria-current`, `nav aria-label`
(new `nav.menu` key). Loading `NavSkeleton` + mobile-bar skeleton rewritten to
match 1:1 (desktop skeleton uses the real translated labels, masked, so widths
match exactly — no reflow on hydrate).

**§10 cache headers** (partial): netlify.toml `[[headers]]` — `Cache-Control:
public, max-age=31536000, immutable` for `/assets/*` + `/fonts/*`. **Security
headers still pending** (see §10 remaining).

**React (§14/§20):** Header `useEffect` deps `[pathname, t]` (`t` is stable
`useCallback([lang])`); CommandPalette `onMouseMove` gated `if (active !== i)`.

**§19 skeleton counts — done DIFFERENTLY on purpose:** did NOT import Data into
Loading. Measured: importing Data into the entry chunk (Loading is the
pre-hydrate fallback, lives in entry) adds **+11.5kB gzip** to the critical
path — defeats the point of a light skeleton. Instead: constants
`SKELETON_SKILL_COUNT` / `SKELETON_PROJECT_COUNTS` in Loading.tsx, guarded by
`src/tests/Loading.test.ts` (asserts they equal `techSkills.length` /
`projects.*.length`). Skeleton can't silently lie; entry stays light.

## DEFERRED epic — Prerender / SSG (review §17, user paused it 2026-07-15)

Root cause of the ~0.87 Lighthouse Performance: pure CSR. `index.tsx` does
`createRoot().render()` into an empty `#root` (only a CSS preloader in HTML),
pages are `lazy()` → content paints only after JS downloads+parses+executes+
lazy-chunk. Lighthouse CI (`lighthouserc.json`) measures the static `build/`.

**Recommended approach: `vite-react-ssg`** (build-time SSG for Vite + React
Router). Rejected alternatives: Netlify prerendering (bot-only, does NOT help
real-user FCP/LCP i.e. the Lighthouse metric); custom `react-dom/server` script
(blocked by `lazy()` — `renderToString` renders the Suspense skeleton, not
content).

**Work required (the real cost):**
1. Make browser-API reads SSR-safe (they run at render, crash in Node build):
   - `ThemeContext.getInitialTheme` reads `document` → guard, default `light`.
   - `LanguageProvider.getInitialLang` reads `localStorage`/`navigator` → guard,
     default `en`.
   - `useMediaQuery` init reads `window.matchMedia` → guard, default `false`.
2. Convert entry to `ViteReactSSG` (routes array); `includedRoutes`: `/`,
   `/resume`, `/projects`, `/certifications` (+ case-study slugs — also fully
   static from Data.ts). `createRoot → hydrateRoot` (plugin handles it).
3. **GOTCHA**: InViewAnimation reveals must NOT leave content `opacity:0` until
   the IntersectionObserver fires — else the prerendered HTML is in the DOM but
   invisible and the paint win is lost. Ensure a default-visible fallback.
4. Per-route `<title>` in the prerendered HTML (free SEO).

**Language tradeoff to decide before building:** SSG renders EN (build can't
know a visitor's saved BG). Options: (a) EN prerender + client swap to BG,
brief 1-frame EN flash + hydration warning [recommended, simplest]; (b) dual
`/bg/*` prerender [bigger]; (c) neutral shell [loses the win]. Bots/default get
EN = fine for SEO. **User must pick (a) or (b) before implementation.**

**Expected gain:** Performance ~0.87 → ~0.95+ (passes the 0.9 gate); SEO up
(real content/headings/title per route); content-first instead of skeleton.
Synergises with the immutable cache headers above.

## Remaining plan items (Next Steps)

### Critical (still open)
1. **Rotate the compromised Groq key** + set `GROQ_API_KEY` in Netlify env
   (pending since 07-13; AI assistant not live in prod). `.env` is gitignored.
2. **Resume mobile overflow** (320/375px) from the hidden skill tooltip —
   likely addressed by commit `93c281c` (tooltip flip math) + the new
   responsive `useMediaQuery` columns, but **re-verify at 320/375 that
   scrollWidth == clientWidth** (`src/components/Resume/SkillBox.tsx`).
3. **Fake case-study metrics** (30+/60%/40%/10min) — replace with real numbers
   or de-numerify. Interview-integrity risk. `src/data/caseStudies.ts`.
4. **Dark-mode invisible icons** (TechLogo brand-hex: Codex #000, GitHub
   #181717, Next.js black on slate-900). SkillBox was edited this session —
   **verify** whether this got fixed; if not, add dark variants / fill-current.

### High (still open)
- §10 **Security headers** in netlify.toml (cache is done): X-Frame-Options,
  X-Content-Type-Options: nosniff, Referrer-Policy.
- §11 `project.paymentsSystem.name` → a SHORT product name in both langs
  (sentence belongs in description).

### Medium (still open)
- §12 Case-study pages have no mobile bottom nav (dead end) + ScrollToTop kills
  back-scroll position on /projects.
- §13 framer-motion on the critical path (~40kB gzip via the AskCvModal chunk);
  move Layout h1 + ThemeToggle animations to CSS to keep framer lazy.
- §14 No ErrorBoundary. (Header deps + hardcoded-hex tokens already done.)
- §15 Certification cards — `CertificationCard.tsx` was edited this session;
  verify cards now have titles (were icon+paragraph only).
- §16 Playwright smoke in CI (routes open + no-overflow assert).
- §17 SEO pack beyond prerender: per-route meta descriptions, OG cards,
  sitemap, JSON-LD. (Was "declined" 07-13 but re-opened in the review prompt —
  confirm scope with user.)

### Low (still open)
- §21 `cs-flow` keyframe animates `top` → use translateY (index.css).
- §22 Rate-limit Map in `netlify/functions/ask-cv.mjs` never pruned.
- §23 Origin check in ask-cv.mjs (any site can burn the Groq quota).
- §24 Feature backlog (50+ ideas in the review: blog/MDX, terminal easter egg,
  live GitHub, streaming AskCv, accent picker...).

## Review scores (2026-07-14 baseline, pre-this-session)

Architecture 7.5 · React 7.5 · Perf 7 · Design 8 · UX 7.5 · A11y 6 · SEO 3.5 ·
Maintainability 8 · Scalability 6.5 · Code Quality 8 · Portfolio Value 8 ·
Senior Level 7.5. A11y should now be materially higher; Perf still gated on the
prerender epic; SEO still low until prerender + meta.

## Workflow reminders / gotchas

- `build/` is gitignored — Netlify builds from source; don't commit it.
- Before pushing: `npm run typecheck && npm run lint && npm test && npm run build`.
  Lint is `--max-warnings=0`; TS is strict (unused vars fail the build).
- jsdom lacks `matchMedia` + `IntersectionObserver` — both stubbed in
  `src/setupTests.ts`. Any new browser-API-at-render needs a stub or a guard.
- `git status` may show files modified that YOU didn't touch (user/linter edits
  in parallel: Button/Chip primitives, responsive columns, brand tokens,
  App.tsx useLayoutEffect). Don't revert them.
- The `build` script chains `tsc -b && vite build`; if you only need chunk
  sizes without the type gate, run `npx vite build`.
- Some source files have pre-existing mojibake (corrupted UTF-8) in comments /
  CommandPalette search keywords (e.g. `Ð¿Ð¸Ñ‚Ð°Ð¹`) and an em-dash in
  ProjectCard aria-label — not introduced this session; the BG palette-search
  keywords are genuinely broken and worth a separate fix.
- Long case-study prose → `src/data/caseStudies.ts` inline `{en,bg}`; short
  reused UI labels → `translations.ts`. `cv-knowledge.mjs` `[Source: ...]`
  labels stay comma-free.

## Explicitly DECLINED (do NOT re-propose unprompted)

- Feedback widget (Netlify Forms); 3D hero (react-three-fiber).
- SEO OG/JSON-LD/sitemap were declined 07-13, then re-opened in the review
  prompt — treat as open-for-scoping, confirm before building.
- Prerender/SSG: user paused it 2026-07-15 ("later"). Full plan captured above;
  resume when they say go.
