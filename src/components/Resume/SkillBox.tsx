import { useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import { techSkills } from "../../Data";
import type { TechSkill } from "../../types";
import type { SimpleIcon } from "simple-icons";
import {
  siHtml5,
  siCss,
  siTailwindcss,
  siBootstrap,
  siJavascript,
  siTypescript,
  siVuedotjs,
  siInertia,
  siReact,
  siMobx,
  siJquery,
  siPhp,
  siSymfony,
  siLaravel,
  siNextdotjs,
  siNodedotjs,
  siMysql,
  siMongodb,
  siPostgresql,
  siGithub,
  siJira,
  siClaude,
} from "simple-icons";

const iconMap: Record<string, SimpleIcon> = {
  HTML: siHtml5,
  CSS: siCss,
  Tailwind: siTailwindcss,
  Bootstrap: siBootstrap,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  "Vue.js": siVuedotjs,
  "Inertia.js": siInertia,
  "React.js": siReact,
  Mobx: siMobx,
  jQuery: siJquery,
  PHP: siPhp,
  Symfony: siSymfony,
  Laravel: siLaravel,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  MySQL: siMysql,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  GitHub: siGithub,
  Jira: siJira,
  "Claude Code": siClaude,
};

const easeOutStrong: [number, number, number, number] = [0.23, 1, 0.32, 1];

interface CustomIcon {
  hex: string;
  path: string;
}

// SQL and AJAX are not brands, so they have no official logo. Use fitting
// generic glyphs (a database cylinder and code brackets) instead.
const customIcons: Record<string, CustomIcon> = {
  SQL: {
    hex: "0284c7",
    path: "M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm6 14c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-4.55c-1.3.95-3.58 1.55-6 1.55s-4.7-.6-6-1.55V9.64c1.47.83 3.61 1.36 6 1.36s4.53-.53 6-1.36v2.81zM12 9C8.13 9 6 7.5 6 7s2.13-2 6-2 6 1.5 6 2-2.13 2-6 2z",
  },
  AJAX: {
    hex: "64748b",
    path: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  },
  Testing: {
    hex: "16a34a",
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  "CI/CD": {
    hex: "6366f1",
    path: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z",
  },
  Codex: {
    hex: "000000",
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
  },
};

const TechLogo = ({ item, className }: { item: TechSkill; className?: string }) => {
  const icon = iconMap[item.title] || customIcons[item.title];

  if (!icon) {
    return (
      <span
        className={`${item.color} inline-block h-2.5 w-2.5 shrink-0 rounded-full`}
      />
    );
  }

  return (
    <svg
      role='img'
      viewBox='0 0 24 24'
      aria-label={item.title}
      className={className}
      fill={`#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
};

// Longest tenure across all skills, so the gauge below reads on a shared,
// honest scale: one filled segment per year of hands-on experience.
const MAX_YEARS = Math.max(...techSkills.map((s) => s.years));

// A segmented meter where each segment is one real year of experience,
// filled up to the skill's tenure. Unlike a "proficiency %", every mark
// maps to a concrete quantity.
const YearGauge = ({ years, className = "" }: { years: number; className?: string }) => (
  <span
    className={`flex items-center gap-[3px] ${className}`}
    aria-hidden='true'>
    {Array.from({ length: MAX_YEARS }).map((_, i) => (
      <span
        key={i}
        className={`h-1 flex-1 rounded-full ${
          i < years ? "bg-brand" : "bg-slate-200/80 dark:bg-slate-700/60"
        }`}
      />
    ))}
  </span>
);

const SkillMetrics = ({ item }: { item: TechSkill }) => {
  const { t } = useLanguage();

  return (
    <span className='tabular-nums'>
      <span className='font-bold text-slate-700 dark:text-slate-200'>{item.years}</span>{" "}
      {t("duration.yr")}
      <span className='mx-1 text-slate-300 dark:text-slate-600'>&middot;</span>
      <span className='font-bold text-slate-700 dark:text-slate-200'>{item.projects}</span>{" "}
      {t("skill.projects")}
    </span>
  );
};

const SkillCard = ({ item }: { item: TechSkill }) => {
  const { t } = useLanguage();

  return (
    <div className='w-[248px] p-3.5 text-left'>
      <div className='flex items-center gap-3'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700'>
          <TechLogo
            item={item}
            className='h-[18px] w-[18px]'
          />
        </span>

        <div className='min-w-0 flex-1'>
          <p className='font-display text-sm font-bold leading-tight text-slate-800 dark:text-slate-100'>
            {item.title}
          </p>
          <p className='mt-0.5 text-[12px] text-slate-500 dark:text-slate-400'>
            <SkillMetrics item={item} />
          </p>
        </div>
      </div>

      <YearGauge
        years={item.years}
        className='mt-3'
      />

      <p className='mt-3 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400'>
        {t(item.description)}
      </p>

      {item.items && (
        <ul className='mt-2 space-y-1'>
          {item.items.map((entry, i) => (
            <li
              key={i}
              className='flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-300'>
              <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-brand' />
              {t(entry)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface SkillBoxProps {
  item: TechSkill;
  index: number;
  /** Total cards in the grid, so the bottom rows can open their tooltip
   * upward instead of downward. */
  total: number;
  /** Current column count of the grid (2 on mobile, 3 at lg+) — the last-two-
   * rows math below depends on it, so it can't be hardcoded. */
  columns: number;
}

const SkillBox = ({ item, index, total, columns }: SkillBoxProps) => {
  const { t } = useLanguage();
  const triggerRef = useRef<HTMLDivElement>(null);

  // The last two rows would push their downward tooltip past the page
  // bottom — which also stretches the document's scroll height beyond the
  // app background, leaving a white strip. Flip those upward.
  const flipUp = index >= total - columns * 2;
  const tooltipPosition = flipUp ? "bottom-full mb-2" : "top-full mt-2";

  const card = (
    <div className='group flex h-full flex-col rounded-xl border border-slate-200/70 bg-white px-3.5 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_30px_-18px_rgba(27,74,120,0.45)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.5)]'>
      <div className='flex items-center gap-2.5'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100 transition-colors group-hover:ring-slate-200 dark:bg-slate-800 dark:ring-slate-700 dark:group-hover:ring-slate-600'>
          <TechLogo
            item={item}
            className='h-[18px] w-[18px]'
          />
        </span>

        <p className='truncate font-display text-sm font-semibold leading-tight text-slate-800 dark:text-slate-100'>
          {item.title}
        </p>
      </div>

      <div className='mt-3'>
        <YearGauge years={item.years} />
        <p className='mt-1.5 text-[11.5px] text-slate-500 dark:text-slate-400'>
          <SkillMetrics item={item} />
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      data-testid='skill-card'
      data-skill-title={item.title}
      // framer-motion's transform on this element makes it its own stacking
      // context, so the tooltip's z-20 (scoped inside that context) can't
      // out-rank a *later* sibling card in the grid on its own — that
      // sibling would paint over the tooltip and swallow its taps/clicks.
      // Raising this card's own z-index while its tooltip is open fixes it.
      className='relative h-full w-full hover:z-30 focus-within:z-30'
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index, 12) * 0.03,
        ease: easeOutStrong,
      }}>
      {item.description ? (
        <div className='group/skill relative h-full'>
          <div
            ref={triggerRef}
            tabIndex={0}
            className='h-full cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950'>
            {card}
          </div>

          {/* Custom hover/focus tooltip (replaces flowbite). A named group keeps
              it independent of the card's own internal `group` hover. Stays
              pointer-events-none while hidden so it can't block taps on the
              cards it overlaps; only the visible state (hover or focus, which
              is how a tap opens it on touch) turns pointer events back on so
              the close button below is reachable. */}
          <div
            role='tooltip'
            className={`pointer-events-none absolute left-1/2 ${tooltipPosition} z-20 w-[248px] -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white opacity-0 shadow-[0_16px_40px_-12px_rgba(27,74,120,0.35)] transition-opacity duration-150 group-hover/skill:pointer-events-auto group-hover/skill:opacity-100 group-focus-within/skill:pointer-events-auto group-focus-within/skill:opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]`}>
            {/* Touch has no hover-away to dismiss this, so give it an explicit
                close button; mouse users just move the pointer off instead. */}
            <button
              type='button'
              onClick={() => triggerRef.current?.blur()}
              aria-label={t("skill.closeTooltip")}
              className='absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300 [@media(hover:hover)]:hidden'>
              <svg
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-3.5 w-3.5'>
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
              </svg>
            </button>

            <SkillCard item={item} />
          </div>
        </div>
      ) : (
        <div className='h-full'>{card}</div>
      )}
    </motion.div>
  );
};

export default SkillBox;
