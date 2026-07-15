import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { headerLinks } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";
import { routes } from "../routes";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { CommandMenuButton } from "./CommandPalette";

// Ease-out quint: motion settles instead of bouncing (matches Layout reveals).
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Header = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  // Home matches only exactly; section tabs stay lit on their sub-routes
  // (Projects keeps its highlight on a /projects/:slug case study).
  const isActive = (href: string) =>
    href === routes.home
      ? pathname === routes.home
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const currentRoute = headerLinks.find((item) => item.href === pathname);

    document.title = currentRoute
      ? `${t("profile.name")}${
          currentRoute.title !== "nav.about" ? " | " + t(currentRoute.title) : ""
        }`
      : `${t("profile.name")} | ${t("notFound.title")}`;
  }, [pathname, t]);

  return (
    <div className='mb-8 hidden lg:flex lg:flex-col lg:items-end'>
      <div className='mb-3 flex items-center gap-2'>
        <CommandMenuButton className='shadow-sm' />
        <LanguageToggle className='shadow-sm' />
        <ThemeToggle className='shadow-sm' />
      </div>

      <nav
        aria-label={t("nav.menu")}
        className='flex items-center gap-1 rounded-2xl border border-slate-200/70 bg-white/95 p-1.5 shadow-[0_12px_34px_-16px_rgba(27,74,120,0.35)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/90'>
        {headerLinks.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={active ? "page" : undefined}
              className='group relative inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-[13px] font-semibold tracking-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900'>
              {active ? (
                <motion.span
                  aria-hidden='true'
                  className='absolute inset-0 rounded-xl bg-brand shadow-[0_12px_26px_-12px_rgba(27,116,228,0.85)]'
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={
                    reduce ? { duration: 0.15 } : { duration: 0.28, ease: EASE_OUT }
                  }
                />
              ) : (
                <span
                  aria-hidden='true'
                  className='absolute inset-0 rounded-xl bg-slate-100/0 transition-colors duration-200 group-hover:bg-slate-100 dark:group-hover:bg-slate-800/70'
                />
              )}

              <item.icon
                outline={!active}
                className={`relative z-10 h-[18px] w-[18px] shrink-0 transition-colors ${
                  active
                    ? "text-white"
                    : "text-slate-400 group-hover:text-brand dark:text-slate-500 dark:group-hover:text-blue-400"
                }`}
              />
              <span
                className={`relative z-10 transition-colors ${
                  active
                    ? "text-white"
                    : "text-slate-600 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white"
                }`}>
                {t(item.title)}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Header;
