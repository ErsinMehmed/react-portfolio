import type { ComponentType } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "../routes";
import { useLanguage } from "../i18n/LanguageContext";
import type { TranslationKey } from "../i18n/translations";

// Skeleton item counts. Loading sits in the entry chunk (it's the pre-hydrate
// fallback), so it must NOT import Data.ts and drag the whole dataset + icons
// onto the critical path. These mirror the live data instead, and
// Loading.test.tsx asserts they stay equal to techSkills / projects lengths,
// so the skeleton can't silently lie when the data changes.
export const SKELETON_SKILL_COUNT = 27;
export const SKELETON_PROJECT_COUNTS = { professional: 5, personal: 8 };

// Route-level Suspense fallback. A full skeleton of the whole shell — nav
// tiles, language + theme toggles, ProfileCard, page title, footer — plus a
// body that mirrors each page's real sections and card counts 1:1, so
// nothing shifts when the real content lands. Class names are copied from
// the real Layout / ProfileCard so the geometry matches exactly.

const Bar = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-md bg-slate-200/70 dark:bg-slate-700/50 ${className}`} />
);

const Pill = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-full bg-slate-200/70 dark:bg-slate-700/50 ${className}`} />
);

/* ---- Shell pieces ---- */

const ProfileSkeleton = () => (
  <div className='lg:sticky lg:top-[158px]'>
    <div className='relative mx-auto mb-6 mt-28 w-full bg-white px-7 pb-5 shadow-[0_24px_70px_-30px_rgba(27,74,120,0.45)] ring-1 ring-slate-900/[0.04] dark:bg-slate-900 dark:ring-white/[0.06] sm:mt-32 md:mt-36 lg:mb-0 lg:mt-0 lg:rounded-[28px]'>
      <div className='absolute left-1/2 -mt-[104px] h-48 w-48 -translate-x-1/2 rounded-[22px] bg-slate-200/70 ring-4 ring-white dark:bg-slate-700/50 dark:ring-slate-900' />

      <div className='pt-[96px]'>
        <Bar className='mx-auto h-6 w-40' />
        <Bar className='mx-auto mt-2 h-4 w-36' />

        <div className='mt-3.5 flex justify-center gap-2.5'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='h-10 w-10 rounded-xl bg-slate-200/70 dark:bg-slate-700/50'
            />
          ))}
        </div>

        <div className='mt-3.5 divide-y divide-slate-200/50 rounded-2xl bg-[#f7f9fb] px-5 dark:divide-slate-700/50 dark:bg-slate-800/60'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className='flex items-center gap-3.5 py-2.5'>
              <div className='h-[18px] w-[18px] shrink-0 rounded bg-slate-200/70 dark:bg-slate-700/50' />
              <div className='flex-1'>
                <Bar className='h-3 w-16' />
                <Bar className='mt-3 h-4 w-32' />
              </div>
            </div>
          ))}
        </div>

        {/* Ask about me (outline) + Download CV (primary) */}
        <div className='mt-4 h-11 w-full rounded-2xl border border-slate-200 dark:border-slate-700' />
        <Bar className='mt-2 h-11 w-full rounded-2xl' />
      </div>
    </div>
  </div>
);

// Desktop nav (language + theme toggles + the segmented pill bar), matching
// Header. The tab labels are the real (translated) text, only masked to a
// slate bar, so each item is the exact live width and nothing reflows on
// hydrate. Keep this list in sync with headerLinks in Data.ts.
const NAV_KEYS: TranslationKey[] = [
  "nav.about",
  "nav.resume",
  "nav.projects",
  "nav.certifications",
];

const NavSkeleton = () => {
  const { t } = useLanguage();

  return (
    <div className='mb-8 hidden lg:flex lg:flex-col lg:items-end'>
      <div className='mb-3 flex items-center gap-2'>
        <div className='h-8 w-[76px] rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900' />
        <div className='inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-900'>
          <Pill className='h-6 w-9' />
          <div className='h-6 w-9' />
        </div>
        <div className='h-8 w-8 rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900' />
      </div>

      <div className='flex items-center gap-1 rounded-2xl border border-slate-200/70 bg-white/95 p-1.5 shadow-[0_12px_34px_-16px_rgba(27,74,120,0.35)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/90'>
        {NAV_KEYS.map((key) => (
          <div
            key={key}
            className='inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5'>
            <Bar className='h-[18px] w-[18px]' />
            <span className='rounded-md bg-slate-200/70 text-[13px] font-semibold tracking-tight text-transparent dark:bg-slate-700/50'>
              {t(key)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TitleSkeleton = () => (
  <div className='flex items-center'>
    <Bar className='h-9 w-48 sm:h-10 sm:w-56' />
    <div className='ml-8 mt-1.5 h-0.5 w-32 rounded bg-slate-200/70 dark:bg-slate-700/50 sm:w-44' />
  </div>
);

const FooterSkeleton = () => (
  <div className='pt-8'>
    <Bar className='mx-auto h-4 w-48' />
  </div>
);

/* ---- Reusable body cards ---- */

const TickHeader = () => (
  <div className='mb-6 flex items-center gap-3'>
    <span className='h-5 w-1.5 rounded-full bg-slate-200/70 dark:bg-slate-700/50' />
    <Bar className='h-6 w-40' />
    <Bar className='h-4 w-5' />
  </div>
);

// Mirrors ProjectCard.
const ProjectCardSkeleton = () => (
  <div className='flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
    <div className='mb-3'>
      <Pill className='h-[18px] w-24' />
    </div>
    <Bar className='h-5 w-3/4' />
    <div className='mt-2 flex-1 space-y-2'>
      <Bar className='h-3.5 w-full' />
      <Bar className='h-3.5 w-11/12' />
      <Bar className='h-3.5 w-2/3' />
    </div>
    <div className='mt-4 flex gap-1.5'>
      <Pill className='h-6 w-14' />
      <Pill className='h-6 w-14' />
      <Pill className='h-6 w-12' />
      <Pill className='h-6 w-10' />
    </div>
    <div className='mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800'>
      <Bar className='h-3.5 w-24' />
      <Bar className='h-3.5 w-4' />
    </div>
  </div>
);

// Mirrors CertificationCard.
const CertCardSkeleton = () => (
  <div className='flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
    <div className='mb-4 flex items-start justify-between'>
      <div className='h-11 w-11 rounded-xl bg-slate-200/70 dark:bg-slate-700/50' />
      <Bar className='h-4 w-4' />
    </div>
    <div className='space-y-2'>
      <Bar className='h-3.5 w-full' />
      <Bar className='h-3.5 w-5/6' />
    </div>
  </div>
);

// Mirrors SkillBox (collapsed state).
const SkillSkeleton = () => (
  <div className='rounded-xl border border-slate-200/70 bg-white px-3.5 py-3 dark:border-slate-800 dark:bg-slate-900'>
    <div className='flex items-center gap-2.5'>
      <div className='h-8 w-8 rounded-lg bg-slate-200/70 dark:bg-slate-700/50' />
      <Bar className='h-4 w-20' />
    </div>
    <div className='mt-3'>
      <Bar className='h-1 w-full' />
      <Bar className='mt-1.5 h-3 w-24' />
    </div>
  </div>
);

// Mirrors EducationBox / ExperienceBox timeline entry.
const TimelineItem = ({ last }: { last: boolean }) => (
  <div className='grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5'>
    <div className='flex flex-col items-center'>
      <span className='mt-1.5 h-3 w-3 shrink-0 rounded-full bg-slate-200/70 dark:bg-slate-700/50' />
      {!last && <span className='mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-800' />}
    </div>
    <div className={last ? "pb-0" : "pb-7"}>
      <Pill className='h-5 w-24' />
      <Bar className='mt-2 h-6 w-2/3' />
      <Bar className='mt-1.5 h-4 w-1/3' />
    </div>
  </div>
);

const grid2 = "grid grid-cols-1 gap-5 sm:grid-cols-2";

const CardSection = ({
  count,
  Card,
}: {
  count: number;
  Card: ComponentType;
}) => (
  <div>
    <TickHeader />
    <div className={grid2}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  </div>
);

/* ---- Per-route bodies ---- */

const HomeBody = () => (
  <>
    <div className='space-y-4 pt-6'>
      <div className='space-y-2'>
        <Bar className='h-5 w-full' />
        <Bar className='h-5 w-11/12' />
      </div>
      <div className='space-y-2'>
        <Bar className='h-4 w-full' />
        <Bar className='h-4 w-5/6' />
      </div>
    </div>

    <dl className='mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-slate-200/70 py-6 dark:border-slate-800 sm:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Bar className='h-8 w-16' />
          <Bar className='mt-2 h-3 w-20' />
        </div>
      ))}
    </dl>

    <Bar className='mb-1 mt-14 h-8 w-64' />

    <div className='mt-6 border-t border-slate-200/70 dark:border-slate-800'>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className='grid grid-cols-[2rem_1fr] gap-x-4 border-b border-slate-200/70 py-6 dark:border-slate-800 sm:grid-cols-[2.75rem_1fr] sm:gap-x-6'>
          <Bar className='mt-1 h-4 w-6' />
          <div>
            <div className='flex items-center gap-2.5'>
              <div className='h-5 w-5 rounded bg-slate-200/70 dark:bg-slate-700/50' />
              <Bar className='h-6 w-48' />
            </div>
            <div className='mt-2 space-y-2'>
              <Bar className='h-4 w-full' />
              <Bar className='h-4 w-11/12' />
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
);

const ResumeBody = () => (
  <div className='mt-8'>
    <div>
      <div className='mb-6 flex items-center gap-2.5'>
        <div className='h-5 w-5 rounded bg-slate-200/70 dark:bg-slate-700/50' />
        <Bar className='h-6 w-40' />
      </div>
      <div>
        {Array.from({ length: 3 }).map((_, i) => (
          <TimelineItem
            key={i}
            last={i === 2}
          />
        ))}
      </div>
    </div>

    <div className='mt-12'>
      <div className='mb-6 flex items-center gap-2.5'>
        <div className='h-5 w-5 rounded bg-slate-200/70 dark:bg-slate-700/50' />
        <Bar className='h-6 w-40' />
      </div>
      <div>
        {Array.from({ length: 6 }).map((_, i) => (
          <TimelineItem
            key={i}
            last={i === 5}
          />
        ))}
      </div>
    </div>

    <div className='mt-14'>
      <Bar className='h-6 w-52' />
      <Bar className='mt-2 h-3.5 w-80 max-w-full' />

      <div className='mt-5 flex flex-wrap gap-2'>
        {["w-16", "w-24", "w-20", "w-24", "w-14", "w-20"].map((w, i) => (
          <Pill
            key={i}
            className={`h-8 ${w}`}
          />
        ))}
      </div>

      <div className='mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3'>
        {Array.from({ length: SKELETON_SKILL_COUNT }).map((_, i) => (
          <SkillSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

const ProjectsBody = () => (
  <div className='mt-8 space-y-14'>
    <CardSection
      count={SKELETON_PROJECT_COUNTS.professional}
      Card={ProjectCardSkeleton}
    />
    <CardSection
      count={SKELETON_PROJECT_COUNTS.personal}
      Card={ProjectCardSkeleton}
    />
  </div>
);

const CertBody = () => (
  <div className='mt-8 space-y-12'>
    {[2, 4, 2, 1, 1].map((count, i) => (
      <CardSection
        key={i}
        count={count}
        Card={CertCardSkeleton}
      />
    ))}
  </div>
);

const DefaultBody = () => (
  <div className='mt-8 flex flex-col items-center gap-3 py-12'>
    <Bar className='h-20 w-40' />
    <Bar className='h-4 w-72 max-w-full' />
    <Bar className='mt-4 h-11 w-32 rounded-2xl' />
  </div>
);

const ROUTES: Record<string, ComponentType> = {
  [routes.resume]: ResumeBody,
  [routes.projects]: ProjectsBody,
  [routes.certifications]: CertBody,
};

const resolveBody = (pathname: string): ComponentType => {
  if (pathname === routes.home) return HomeBody;
  const key = Object.keys(ROUTES).find((r) => pathname.startsWith(r));
  return key ? ROUTES[key] : DefaultBody;
};

// /projects/:slug (case study) breaks out of the ProfileCard shell entirely
// (see CaseStudyShell), so it needs its own full-bleed skeleton below instead
// of slotting a Body into the generic sidebar layout.
const caseStudyPrefix = `${routes.projects}/`;
const isCaseStudyRoute = (pathname: string) =>
  pathname.startsWith(caseStudyPrefix) &&
  pathname.length > caseStudyPrefix.length;

/* ---- Case study page (full-bleed shell, no ProfileCard) ---- */

const CaseStudyHeaderSkeleton = () => (
  <header className='sticky top-0 z-40 border-b border-transparent'>
    <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center gap-2'>
        <div className='h-7 w-7 rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900' />
        <Bar className='hidden h-4 w-16 sm:block' />
      </div>
      <div className='flex items-center gap-2'>
        <div className='inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-900'>
          <Pill className='h-6 w-9' />
          <div className='h-6 w-9' />
        </div>
        <div className='h-8 w-8 rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900' />
        <Pill className='ml-1 hidden h-7 w-24 sm:block' />
      </div>
    </div>
  </header>
);

// Mirrors CaseStudyHero.
const CaseStudyHeroSkeleton = () => (
  <div className='pt-14 sm:pt-20'>
    <Bar className='h-4 w-40' />
    <Bar className='mt-4 h-10 w-3/4 max-w-2xl sm:h-14' />
    <Bar className='mt-3 h-10 w-1/2 max-w-md sm:h-14' />
    <div className='mt-6 max-w-2xl space-y-2.5'>
      <Bar className='h-5 w-full' />
      <Bar className='h-5 w-11/12' />
    </div>
    <div className='mt-4 max-w-2xl space-y-2'>
      <Bar className='h-4 w-full' />
      <Bar className='h-4 w-5/6' />
    </div>
    <div className='mt-9 flex flex-wrap gap-x-10 gap-y-4'>
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i}>
          <Bar className='h-3 w-16' />
          <Bar className='mt-2 h-4 w-24' />
        </div>
      ))}
    </div>
  </div>
);

// Mirrors MetricsBand.
const CaseStudyMetricsSkeleton = () => (
  <dl className='mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-slate-200/70 py-8 dark:border-slate-800 lg:grid-cols-4'>
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className='flex flex-col'>
        <Bar className='h-9 w-16' />
        <Bar className='mt-3 h-4 w-24' />
        <Bar className='mt-1 h-3 w-28' />
      </div>
    ))}
  </dl>
);

// Mirrors SectionNav (desktop only).
const CaseStudySectionNavSkeleton = () => (
  <div className='sticky top-24 hidden self-start lg:block'>
    <div className='space-y-1 border-l border-slate-200 dark:border-slate-800'>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className='py-1.5 pl-4'>
          <Bar className='h-3.5 w-20' />
        </div>
      ))}
    </div>
  </div>
);

// Mirrors SectionHeading.
const CaseStudySectionHeadingSkeleton = () => (
  <div className='flex items-baseline gap-4 sm:gap-5'>
    <Bar className='h-4 w-5' />
    <Bar className='h-7 w-40 sm:h-8' />
  </div>
);

const CheckItemSkeleton = () => (
  <div className='flex gap-3'>
    <div className='mt-0.5 h-4 w-4 shrink-0 rounded-full bg-slate-200/70 dark:bg-slate-700/50' />
    <Bar className='h-3.5 w-full' />
  </div>
);

// Mirrors one ArchitectureDiagram layer card.
const CaseStudyLayerSkeleton = () => (
  <div className='relative pl-14 sm:pl-16'>
    <div className='rounded-2xl border border-slate-200/80 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60'>
      <div className='flex items-baseline gap-3'>
        <Bar className='h-3 w-5' />
        <Bar className='h-5 w-32' />
      </div>
      <Bar className='mt-3 h-3.5 w-full max-w-xl' />
      <Bar className='mt-1.5 h-3.5 w-2/3 max-w-xl' />
      <div className='mt-4 flex flex-wrap gap-2'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Pill
            key={i}
            className='h-6 w-16'
          />
        ))}
      </div>
    </div>
  </div>
);

// Mirrors ArchitectureDiagram.
const CaseStudyArchitectureSkeleton = () => (
  <div className='mt-8'>
    <div className='max-w-2xl space-y-2'>
      <Bar className='h-4 w-full' />
      <Bar className='h-4 w-4/5' />
    </div>
    <div className='mt-10 space-y-4'>
      {Array.from({ length: 5 }).map((_, i) => (
        <CaseStudyLayerSkeleton key={i} />
      ))}
    </div>
    <div className='mt-6 h-14 rounded-xl border border-slate-200/70 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40' />
  </div>
);

// Mirrors one DecisionsSection article.
const CaseStudyDecisionSkeleton = () => (
  <div className='border-t border-slate-200 pt-8 dark:border-slate-800'>
    <div className='flex gap-5 sm:gap-7'>
      <Bar className='hidden h-8 w-10 sm:block' />
      <div className='min-w-0 flex-1'>
        <Bar className='h-6 w-1/2 sm:h-7' />
        <div className='mt-3 space-y-2'>
          <Bar className='h-4 w-full' />
          <Bar className='h-4 w-3/4' />
        </div>
        <div className='mt-4 rounded-xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/40'>
          <Bar className='h-3 w-16' />
          <Bar className='mt-2 h-4 w-2/3' />
        </div>
        <div className='mt-4 grid gap-4 sm:grid-cols-2'>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i}>
              <Bar className='h-3 w-10' />
              <Bar className='mt-1.5 h-3.5 w-full' />
              <Bar className='mt-1 h-3.5 w-2/3' />
            </div>
          ))}
        </div>
        <div className='mt-5 flex flex-wrap gap-1.5'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Pill
              key={i}
              className='h-5 w-14'
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Mirrors one stack group row.
const CaseStudyStackRowSkeleton = () => (
  <div className='flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:gap-6'>
    <Bar className='h-4 w-32 shrink-0 sm:w-40' />
    <div className='flex flex-wrap gap-2'>
      {Array.from({ length: 4 }).map((_, i) => (
        <Pill
          key={i}
          className='h-7 w-16'
        />
      ))}
    </div>
  </div>
);

// Mirrors CaseStudyFooterNav.
const CaseStudyFooterNavSkeleton = () => (
  <div className='mt-20 rounded-3xl border border-slate-200/70 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-800/40 sm:p-10'>
    <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
      <div>
        <Bar className='h-6 w-48' />
        <Bar className='mt-2 h-4 w-64 max-w-full' />
      </div>
      <div className='flex flex-wrap items-center gap-3'>
        <Bar className='h-10 w-32 rounded-xl' />
        <Bar className='h-10 w-32 rounded-xl' />
      </div>
    </div>
    <div className='mt-8 flex items-center justify-between border-t border-slate-200/70 pt-6 dark:border-slate-800'>
      <Bar className='h-3 w-16' />
      <Bar className='h-6 w-40' />
    </div>
  </div>
);

// Full page skeleton for /projects/:slug — matches CaseStudyShell 1:1: its own
// sticky header (no ProfileCard sidebar, no mobile bottom nav), hero, metrics
// band, sticky section nav and every section in reading order.
const CaseStudySkeleton = () => (
  <div className='min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
    <CaseStudyHeaderSkeleton />
    <div className='mx-auto max-w-6xl animate-pulse px-4 pb-28 sm:px-6 lg:px-8'>
      <CaseStudyHeroSkeleton />
      <CaseStudyMetricsSkeleton />

      <div className='mt-20 lg:grid lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-10 xl:gap-16'>
        <CaseStudySectionNavSkeleton />

        <div className='min-w-0 space-y-20'>
          {/* Problem */}
          <div>
            <CaseStudySectionHeadingSkeleton />
            <div className='mt-6 max-w-2xl space-y-4'>
              <div className='space-y-2'>
                <Bar className='h-4 w-full' />
                <Bar className='h-4 w-11/12' />
                <Bar className='h-4 w-4/5' />
              </div>
              <div className='space-y-2'>
                <Bar className='h-4 w-full' />
                <Bar className='h-4 w-3/4' />
              </div>
            </div>
            <Bar className='mb-4 mt-10 h-3 w-24' />
            <div className='grid gap-x-8 gap-y-3 sm:grid-cols-2'>
              {Array.from({ length: 4 }).map((_, i) => (
                <CheckItemSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <CaseStudySectionHeadingSkeleton />
            <CaseStudyArchitectureSkeleton />
          </div>

          {/* Decisions */}
          <div>
            <CaseStudySectionHeadingSkeleton />
            <div className='mt-8 space-y-10'>
              {Array.from({ length: 5 }).map((_, i) => (
                <CaseStudyDecisionSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <CaseStudySectionHeadingSkeleton />
            <div className='mt-6 max-w-2xl space-y-2'>
              <Bar className='h-4 w-full' />
              <Bar className='h-4 w-5/6' />
            </div>
            <div className='mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2'>
              {Array.from({ length: 4 }).map((_, i) => (
                <CheckItemSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <CaseStudySectionHeadingSkeleton />
            <div className='mt-6 space-y-6'>
              {Array.from({ length: 3 }).map((_, i) => (
                <CaseStudyStackRowSkeleton key={i} />
              ))}
            </div>
          </div>

          <CaseStudyFooterNavSkeleton />
        </div>
      </div>
    </div>
  </div>
);

const Loading = () => {
  const { pathname } = useLocation();

  if (isCaseStudyRoute(pathname)) return <CaseStudySkeleton />;

  const Body = resolveBody(pathname);

  return (
    <div
      className='w-full min-h-screen pb-12 lg:pb-8 bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
      role='status'
      aria-busy='true'
      aria-label='Loading'>
      {/* Mobile language + theme toggle (fixed top-right) */}
      <div className='fixed right-4 top-4 z-40 flex items-center gap-2 lg:hidden'>
        <div className='inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-900'>
          <Pill className='h-6 w-9' />
          <div className='h-6 w-9' />
        </div>
        <div className='h-8 w-8 rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900' />
      </div>

      <div className='mx-auto h-full min-h-screen w-full max-w-[2000px]'>
        <div className='relative h-full animate-pulse gap-10 pt-0.5 lg:flex lg:px-4 lg:pt-[158px] xl:px-32 2xl:justify-center 2xl:px-40'>
          <span className='w-fit lg:block lg:w-[350px] lg:shrink-0 xl:w-[400px]'>
            <ProfileSkeleton />
          </span>

          <div className='w-full 2xl:max-w-[820px]'>
            <div className='flex justify-end'>
              <NavSkeleton />
            </div>

            <div className='px-6 py-8 shadow lg:rounded-2xl lg:px-14 lg:py-10 md:px-10 bg-white dark:bg-slate-900'>
              <TitleSkeleton />
              <Body />
              <FooterSkeleton />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav bar (matches MobileMenu: floating pill, blur, safe area) */}
      <div
        style={{ bottom: "max(0.875rem, env(safe-area-inset-bottom))" }}
        className='fixed left-1/2 z-50 h-14 w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 rounded-full border border-slate-200/80 bg-white/85 shadow-[0_14px_40px_-12px_rgba(27,74,120,0.45)] backdrop-blur-lg sm:max-w-lg lg:hidden dark:border-slate-800 dark:bg-slate-900/85'>
        <div className='grid h-full grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='flex items-center justify-center'>
              <div className='h-[22px] w-[22px] rounded-md bg-slate-200/70 dark:bg-slate-700/50' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
