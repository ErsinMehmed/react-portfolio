import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";

const parsePart = (value) => {
  if (/present/i.test(value)) {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  }

  const [month, year] = value.split(".").map(Number);
  return { month, year };
};

const getDuration = (period) => {
  const [start, end] = period.split(" - ");
  const from = parsePart(start);
  const to = parsePart(end);

  let months = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  if (months < 1) months = 1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts = [];
  if (years) parts.push(`${years} yr`);
  if (remainingMonths) parts.push(`${remainingMonths} mo`);

  return parts.join(" ") || "1 mo";
};

const ExperienceBox = (props) => {
  const { item, isLast } = props;
  const { t } = useLanguage();

  const duration = getDuration(item.period)
    .replace(/yr/g, t("duration.yr"))
    .replace(/mo/g, t("duration.mo"));

  return (
    <div className='grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5'>
      <div className='flex flex-col items-center'>
        <span className='mt-1.5 h-3 w-3 shrink-0 rounded-full border-[2.5px] border-[#1b74e4] bg-white' />
        {!isLast && <span className='mt-1 w-px flex-1 bg-slate-200' />}
      </div>

      <div className={isLast ? "pb-0" : "pb-7"}>
        <div className='flex flex-wrap items-center gap-2'>
          <span className='inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#1b74e4]'>
            {item.period}
          </span>

          <span className='text-xs font-medium text-slate-500'>{duration}</span>
        </div>

        <h3 className='mt-2 font-display text-lg font-semibold text-slate-800'>
          {t(item.title)}
          <span className='font-medium text-slate-500'>
            {" "}
            · {t(item.location)}
          </span>
        </h3>

        <p className='mt-0.5 text-sm text-slate-500'>{t(item.company)}</p>
      </div>
    </div>
  );
};

export default ExperienceBox;
