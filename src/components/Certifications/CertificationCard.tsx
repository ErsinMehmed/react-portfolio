import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import { useTilt } from "../../hooks/useTilt";
import type { Certification, CertificationKind } from "../../types";

interface KindConfig {
  chip: string;
  path: string;
}

const kinds: Record<CertificationKind, KindConfig> = {
  Award: {
    chip: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    path: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z",
  },
  Certificate: {
    chip: "bg-blue-50 text-[#1b74e4] dark:bg-blue-500/10 dark:text-blue-400",
    path: "M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V22l4-2 4 2v-7.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z",
  },
  Course: {
    chip: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    path: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
  },
  "Sport achievements": {
    chip: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    path: "M17 10.43V2H7v8.43c0 .35.18.68.49.86l4.18 2.51-.99 2.34-3.41.29 2.59 2.24L9.07 22 12 20.23 14.93 22l-.78-3.33 2.59-2.24-3.41-.29-.99-2.34 4.18-2.51c.3-.18.49-.51.49-.86zM13 12.23l-1 .6-1-.6V3h2v9.23z",
  },
  "Scientific publication": {
    chip: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    path: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  },
};

interface CertificationCardProps {
  item: Certification;
}

const CertificationCard = ({ item }: CertificationCardProps) => {
  const { t } = useLanguage();
  const tilt = useTilt();
  const kind = item.kind || item.kindEn || "Certificate";
  const cfg = kinds[kind];
  const hasLink = Boolean(item.link);

  const baseClasses =
    "group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow duration-200 ease-out dark:border-slate-800 dark:bg-slate-900";
  const linkClasses =
    "cursor-pointer hover:border-slate-300 hover:shadow-[0_20px_45px_-24px_rgba(27,74,120,0.4)] dark:hover:border-slate-700 dark:hover:shadow-[0_20px_45px_-24px_rgba(0,0,0,0.5)]";

  const tiltProps = {
    onPointerMove: tilt.onPointerMove,
    onPointerLeave: tilt.onPointerLeave,
    style: {
      rotateX: tilt.rotateX,
      rotateY: tilt.rotateY,
      transformPerspective: 900,
    },
  };

  const content = (
    <>
      <div className='mb-4 flex items-start justify-between'>
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${cfg.chip}`}>
          <svg
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-[22px] w-[22px]'>
            <path d={cfg.path} />
          </svg>
        </span>

        {hasLink && (
          <svg
            viewBox='0 0 24 24'
            fill='currentColor'
            aria-hidden='true'
            className='h-4 w-4 text-slate-300 transition-colors duration-200 group-hover:text-[#1b74e4] dark:text-slate-600 dark:group-hover:text-blue-400'>
            <path d='M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z' />
          </svg>
        )}
      </div>

      <p className='text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400'>
        {t(item.description)}
      </p>
    </>
  );

  if (hasLink) {
    return (
      <motion.a
        {...tiltProps}
        href={item.link}
        target='_blank'
        rel='noreferrer'
        className={`${baseClasses} ${linkClasses}`}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      {...tiltProps}
      className={baseClasses}>
      {content}
    </motion.div>
  );
};

export default CertificationCard;
