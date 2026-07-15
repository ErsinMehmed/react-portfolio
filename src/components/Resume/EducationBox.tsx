import { useLanguage } from "../../i18n/LanguageContext";
import Chip from "../ui/Chip";
import type { Education } from "../../types";

interface EducationBoxProps {
  item: Education;
  isLast: boolean;
}

const EducationBox = ({ item, isLast }: EducationBoxProps) => {
  const { t } = useLanguage();

  return (
    <div className='grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-5'>
      <div className='flex flex-col items-center'>
        <span className='mt-1.5 h-3 w-3 shrink-0 rounded-full border-[2.5px] border-brand bg-white dark:bg-slate-900' />
        {!isLast && <span className='mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-800' />}
      </div>

      <div className={isLast ? "pb-0" : "pb-7"}>
        <Chip>{item.period}</Chip>

        <h3 className='mt-2 font-display text-lg font-semibold text-slate-800 dark:text-slate-100'>
          {t(item.title)}
          <span className='font-medium text-slate-500 dark:text-slate-400'>
            {" "}
            · {t(item.degree)}
          </span>
        </h3>

        <p className='mt-0.5 text-sm text-slate-500 dark:text-slate-400'>{t(item.institution)}</p>
      </div>
    </div>
  );
};

export default EducationBox;
