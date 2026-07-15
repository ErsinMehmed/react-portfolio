import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { headerLinks } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";
import { routes } from "../routes";

const MobileMenu = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  // Home matches only exactly; the rest also light up on their sub-routes
  // (e.g. Projects stays active on a /projects/:slug case study).
  const isActive = (href: string) =>
    href === routes.home
      ? pathname === routes.home
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label={t("nav.menu")}
      style={{ bottom: "max(0.875rem, env(safe-area-inset-bottom))" }}
      className='lg:hidden fixed left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 rounded-full border border-slate-200/80 bg-white/85 shadow-[0_14px_40px_-12px_rgba(27,74,120,0.45)] backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/85 sm:max-w-lg'>
      <div className='grid h-14 grid-cols-4'>
        {headerLinks.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              aria-label={t(item.title)}
              aria-current={active ? "page" : undefined}
              className='group relative flex items-center justify-center'>
              {active && (
                <motion.span
                  aria-hidden='true'
                  className='absolute inset-2 rounded-full bg-brand shadow-[0_10px_24px_-8px_rgba(27,116,228,0.8)]'
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={
                    reduce
                      ? { duration: 0.15 }
                      : { type: "spring", stiffness: 420, damping: 28 }
                  }
                />
              )}

              <item.icon
                outline={!active}
                className={`relative z-10 h-[22px] w-[22px] transition-transform duration-200 ease-out group-active:scale-90 ${
                  active
                    ? "text-white"
                    : "text-slate-400 group-hover:text-brand dark:text-slate-500 dark:group-hover:text-blue-400"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileMenu;
