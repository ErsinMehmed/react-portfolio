import React from "react";
import { Tooltip } from "flowbite-react";
import { motion } from "framer-motion";
import NumberTicker from "../NumberTicker";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  siHtml5,
  siCss,
  siTailwindcss,
  siBootstrap,
  siJavascript,
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

const iconMap = {
  HTML: siHtml5,
  CSS: siCss,
  Tailwind: siTailwindcss,
  Bootstrap: siBootstrap,
  JavaScript: siJavascript,
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

const easeOutStrong = [0.23, 1, 0.32, 1];

// SQL and AJAX are not brands, so they have no official logo. Use fitting
// generic glyphs (a database cylinder and code brackets) instead.
const customIcons = {
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

const TechLogo = ({ item, className }) => {
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

const levelFromPercentage = (value) => {
  const n = Number(value);
  if (n >= 90) return "Expert";
  if (n >= 75) return "Advanced";
  if (n >= 50) return "Intermediate";
  return "Familiar";
};

const SkillCard = ({ item }) => {
  const { t } = useLanguage();

  return (
    <div className='w-[240px] p-3.5 text-left'>
      <div className='flex items-center gap-3'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100'>
          <TechLogo
            item={item}
            className='h-[18px] w-[18px]'
          />
        </span>

        <div className='min-w-0 flex-1'>
          <p className='font-display text-sm font-bold leading-tight text-slate-800'>
            {item.title}
          </p>
          <p className='mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400'>
            {t(levelFromPercentage(item.percentage))}
          </p>
        </div>

        <span className='text-sm font-bold tabular-nums text-[#1b74e4]'>
          {item.percentage}%
        </span>
      </div>

      <div className='mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100'>
        <div
          className={`${item.color} h-1 rounded-full`}
          style={{ width: `${item.percentage}%` }}
        />
      </div>

      <p className='mt-3 text-[13px] leading-relaxed text-slate-500'>
        {t(item.description)}
      </p>

      {item.items && (
        <ul className='mt-2 space-y-1'>
          {item.items.map((entry, i) => (
            <li
              key={i}
              className='flex items-center gap-2 text-[13px] text-slate-600'>
              <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-[#1b74e4]' />
              {t(entry)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const tooltipTheme = {
  base: "absolute z-10 inline-block max-w-[260px] rounded-2xl shadow-[0_16px_40px_-12px_rgba(27,74,120,0.35)]",
  style: {
    dark: "border border-slate-200/80 bg-white",
  },
};

const SkillBox = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index, 10) * 0.035,
        ease: easeOutStrong,
      }}
    >
      <div className='mb-1.5 flex items-center justify-between text-sm font-semibold text-slate-700'>
        <span className='flex min-w-0 items-center gap-2'>
          <TechLogo
            item={item}
            className='h-[18px] w-[18px] shrink-0'
          />

          {item.description ? (
            <Tooltip
              content={<SkillCard item={item} />}
              placement='right'
              arrow={false}
              theme={tooltipTheme}
            >
              <span className='cursor-pointer truncate transition-opacity hover:opacity-60'>
                {item.title}
              </span>
            </Tooltip>
          ) : (
            <span className='cursor-default truncate'>{item.title}</span>
          )}
        </span>

        <NumberTicker
          value={Number(item.percentage)}
          suffix='%'
          className='text-slate-400'
        />
      </div>

      {/* Bar grows via a GPU transform (scaleX) instead of animating width */}
      <div className='h-1.5 w-full overflow-hidden rounded-full bg-slate-100'>
        <motion.div
          className={`${item.color} h-1.5 origin-left rounded-full`}
          style={{ width: `${item.percentage}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease: easeOutStrong }}
        />
      </div>
    </motion.div>
  );
};

export default SkillBox;
