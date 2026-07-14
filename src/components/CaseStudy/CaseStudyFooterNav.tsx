import { Link } from "react-router-dom";
import InViewAnimation from "../InViewAnimation";
import { useLanguage } from "../../i18n/LanguageContext";
import { caseStudyOrder, getCaseStudy } from "../../data/caseStudies";

interface CaseStudyFooterNavProps {
  slug: string;
  liveUrl?: string;
}

const ExternalIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}>
    <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z" />
  </svg>
);

/** Closing block: live link, the next study when there is one, and a way back. */
const CaseStudyFooterNav = ({ slug, liveUrl }: CaseStudyFooterNavProps) => {
  const { t } = useLanguage();

  const index = caseStudyOrder.indexOf(slug);
  const nextSlug =
    index >= 0 && caseStudyOrder.length > 1
      ? caseStudyOrder[(index + 1) % caseStudyOrder.length]
      : undefined;
  const next = getCaseStudy(nextSlug);

  return (
    <InViewAnimation>
      <div className="mt-20 overflow-hidden rounded-3xl border border-[color:var(--cs-line)] bg-[var(--cs-soft)] p-8 dark:bg-[var(--cs-glow)] sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {t("cs.cta.title")}
            </p>
            <p className="mt-2 max-w-md leading-relaxed text-slate-600 dark:text-slate-300">
              {t("cs.cta.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--cs-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-150 ease-out hover:brightness-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cs-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cs-soft)]">
                <ExternalIcon className="h-4 w-4" />
                {t("cs.viewLive")}
              </a>
            )}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600">
              {t("cs.cta.allProjects")}
            </Link>
          </div>
        </div>

        {next && (
          <Link
            to={`/projects/${next.slug}`}
            className="group mt-8 flex items-center justify-between border-t border-[color:var(--cs-line)] pt-6 focus-visible:outline-none">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {t("cs.cta.next")}
            </span>
            <span className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900 group-hover:text-[color:var(--cs-ink)] dark:text-slate-50 dark:group-hover:text-[color:var(--cs-on-dark)]">
              {t(next.name)}
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </Link>
        )}
      </div>
    </InViewAnimation>
  );
};

export default CaseStudyFooterNav;
