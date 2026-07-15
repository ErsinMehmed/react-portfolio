import { useLanguage } from "../../i18n/LanguageContext";
import Chip from "../ui/Chip";
import type { Experience } from "../../types";

interface ExperienceBoxProps {
  item: Experience;
  isLast: boolean;
}

interface DateParts {
  month: number;
  year: number;
}

const parsePart = (value: string): DateParts => {
  if (/present/i.test(value)) {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  }

  const [month, year] = value.split(".").map(Number);
  return { month, year };
};

const getDuration = (period: string): string => {
  const [start, end] = period.split(" - ");
  const from = parsePart(start);
  const to = parsePart(end);

  let months = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  if (months < 1) months = 1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts: string[] = [];
  if (years) parts.push(`${years} yr`);
  if (remainingMonths) parts.push(`${remainingMonths} mo`);

  return parts.join(" ") || "1 mo";
};

const ExperienceBox = ({ item, isLast }: ExperienceBoxProps) => {
  const { t } = useLanguage();

  const duration = getDuration(item.period)
    .replace(/yr/g, t("duration.yr"))
    .replace(/mo/g, t("duration.mo"));

  return (
    <div className='grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5'>
      <div className='flex flex-col items-center'>
        <span className='mt-1.5 h-3 w-3 shrink-0 rounded-full border-[2.5px] border-brand bg-white dark:bg-slate-900' />
        {!isLast && <span className='mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-800' />}
      </div>

      <div className={isLast ? "pb-0" : "pb-7"}>
        <div className='flex flex-wrap items-center gap-2'>
          <Chip>{item.period.replace("Present", t("duration.present"))}</Chip>

          <span className='text-xs font-medium text-slate-500 dark:text-slate-400'>{duration}</span>
        </div>

        <h3 className='mt-2 font-display text-lg font-semibold text-slate-800 dark:text-slate-100'>
          {t(item.title)}
          <span className='font-medium text-slate-500 dark:text-slate-400'>
            {" "}
            Â· {t(item.location)}
          </span>
        </h3>

        <p className='mt-0.5 text-sm text-slate-500 dark:text-slate-400'>{t(item.company)}</p>
      </div>
    </div>
  );
};

export default ExperienceBox;
