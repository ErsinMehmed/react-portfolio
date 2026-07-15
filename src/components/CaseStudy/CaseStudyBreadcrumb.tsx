import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { routes } from "../../routes";

interface CaseStudyBreadcrumbProps {
  title: string;
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const CaseStudyBreadcrumb = ({ title }: CaseStudyBreadcrumbProps) => {
  const { t } = useLanguage();

  return (
    <nav
      aria-label="Breadcrumb"
      className="pt-5 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-500 dark:text-slate-400">
        <li>
          <Link
            to={routes.home}
            className="transition-colors hover:text-slate-900 dark:hover:text-white">
            {t("breadcrumb.home")}
          </Link>
        </li>
        <li
          aria-hidden
          className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <Link
            to={routes.projects}
            className="transition-colors hover:text-slate-900 dark:hover:text-white">
            {t("nav.projects")}
          </Link>
        </li>
        <li
          aria-hidden
          className="flex items-center">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li
          aria-current="page"
          className="max-w-[200px] truncate font-medium text-slate-700 dark:text-slate-200 sm:max-w-none">
          {title}
        </li>
      </ol>
    </nav>
  );
};

export default CaseStudyBreadcrumb;
