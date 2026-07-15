import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import LanguageToggle from "../LanguageToggle";
import ThemeToggle from "../ThemeToggle";
import { useLanguage } from "../../i18n/LanguageContext";
import { routes } from "../../routes";
import type { CaseStudyAccent } from "../../types";

interface CaseStudyShellProps {
  accent: CaseStudyAccent;
  title: string;
  liveUrl?: string;
  children: ReactNode;
}

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

const ExternalIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}>
    <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z" />
  </svg>
);

/**
 * Full-bleed immersive shell for a case study: it breaks out of the
 * ProfileCard layout so sections can breathe, while keeping the site's
 * gradient, the language/theme toggles and a scroll-progress bar. The study's
 * accent is published as CSS custom properties so every child can theme
 * itself without importing the palette. The 8-digit hex suffixes add alpha to
 * the base hue for hairlines and tints.
 */
const CaseStudyShell = ({
  accent,
  title,
  liveUrl,
  children,
}: CaseStudyShellProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const accentVars = {
    "--cs-accent": accent.base,
    "--cs-ink": accent.ink,
    "--cs-on-dark": accent.onDark,
    "--cs-soft": accent.soft,
    "--cs-glow": accent.glow,
    "--cs-line": `${accent.base}2e`,
    "--cs-line-strong": `${accent.base}59`,
  } as CSSProperties;

  return (
    <div
      style={accentVars}
      className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      {/* Scroll progress: maps to position, not autonomous motion, so it stays on for reduced-motion. */}
      <motion.div
        aria-hidden
        style={{ scaleX: reduce ? scrollYProgress : progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[var(--cs-accent)]"
      />

      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/70"
            : "border-b border-transparent"
        }`}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to={routes.projects}
            className="group inline-flex items-center gap-2 rounded-full py-1.5 pr-3 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cs-ink)] dark:text-slate-300 dark:hover:text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors group-hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:text-white">
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />
            </span>
            <span className="hidden sm:inline">{t("nav.projects")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${title} — ${t("cs.viewLive")}`}
                className="ml-1 hidden items-center gap-1.5 rounded-full bg-[var(--cs-accent)] px-3.5 py-1.5 text-xs font-semibold text-white transition-transform duration-150 ease-out hover:brightness-105 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cs-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:inline-flex dark:focus-visible:ring-offset-slate-950">
                <ExternalIcon className="h-3.5 w-3.5" />
                {t("cs.viewLive")}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default CaseStudyShell;
