import type { ReactNode } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import type { Bilingual } from "../../types";

/**
 * Resolve inline `{ en, bg }` case-study prose against the active language.
 * Short reused labels still go through `t()`; this is for the long-form copy
 * that lives in the case-study data instead of the translation dictionary.
 */
export const useBilingual = () => {
  const { lang } = useLanguage();
  return (x: Bilingual) => x[lang];
};

interface SectionHeadingProps {
  index: string;
  title: string;
  id?: string;
}

/**
 * Numbered section heading. The leading two-digit index (in the study's
 * accent) is the section grammar, deliberately not a stack of tiny uppercase
 * kickers, which read as AI scaffolding when repeated.
 */
export const SectionHeading = ({ index, title, id }: SectionHeadingProps) => (
  <div
    id={id}
    className="flex scroll-mt-24 items-baseline gap-4 sm:gap-5">
    <span className="font-display text-sm font-bold tabular-nums text-[color:var(--cs-ink)] dark:text-[color:var(--cs-on-dark)]">
      {index}
    </span>
    <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
      {title}
    </h2>
  </div>
);

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/** Consistent vertical rhythm + a scroll anchor for the section nav. */
export const Section = ({ id, children, className = "" }: SectionProps) => (
  <section
    id={id}
    className={`scroll-mt-24 ${className}`}>
    {children}
  </section>
);
