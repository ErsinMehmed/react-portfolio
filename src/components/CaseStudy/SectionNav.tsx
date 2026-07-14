import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import type { TranslationKey } from "../../i18n/translations";

export interface NavItem {
  id: string;
  label: TranslationKey;
}

interface SectionNavProps {
  items: NavItem[];
}

/**
 * Sets the active section to whichever one is crossing a thin band near the
 * top third of the viewport, so the highlight tracks reading position without
 * flickering between adjacent sections.
 */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // ids is a stable module-level array; identity never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
};

/**
 * Sticky reading rail (desktop only). Occasional-use navigation, so the only
 * motion is the active marker sliding between items via a shared layoutId.
 */
const SectionNav = ({ items }: SectionNavProps) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const active = useActiveSection(items.map((i) => i.id));

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-24 hidden self-start lg:block">
      <ul className="space-y-1 border-l border-slate-200 dark:border-slate-800">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li
              key={item.id}
              className="relative">
              {isActive && (
                <motion.span
                  layoutId="cs-nav-marker"
                  className="absolute inset-y-0 -left-px w-0.5 bg-[var(--cs-accent)]"
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                />
              )}
              <button
                type="button"
                onClick={() => go(item.id)}
                className={`block w-full py-1.5 pl-4 text-left text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:text-[color:var(--cs-ink)] dark:focus-visible:text-[color:var(--cs-on-dark)] ${
                  isActive
                    ? "font-semibold text-[color:var(--cs-ink)] dark:text-[color:var(--cs-on-dark)]"
                    : "font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                }`}>
                {t(item.label)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SectionNav;
