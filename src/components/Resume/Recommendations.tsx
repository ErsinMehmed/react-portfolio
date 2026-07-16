import { useLanguage } from "../../i18n/LanguageContext";
import InViewAnimation from "../InViewAnimation";
import { recommendations } from "../../Data";
import type { Recommendation } from "../../types";

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}>
    <path d='M7.17 7A5 5 0 0 0 3 12v4a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a3 3 0 0 1 3-3V7H7.17zm10 0A5 5 0 0 0 13 12v4a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2a3 3 0 0 1 3-3V7h-1.83z' />
  </svg>
);

const LetterIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <rect
      x='4'
      y='4'
      width='16'
      height='16'
      rx='2'
    />
    <path d='M8 9.5h8M8 13h5' />
  </svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}>
    <path d='M5 12h14M13 6l6 6-6 6' />
  </svg>
);

const RecommendationCard = ({ item }: { item: Recommendation }) => {
  const { t } = useLanguage();

  return (
    <a
      href={item.url}
      target='_blank'
      rel='noreferrer'
      className='group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_22px_50px_-24px_rgba(27,74,120,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-[0_22px_50px_-24px_rgba(0,0,0,0.5)] dark:focus-visible:ring-offset-slate-950'>
      <div className='flex items-center gap-3'>
        <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-brand ring-1 ring-slate-100 dark:bg-slate-800 dark:text-blue-400 dark:ring-slate-700'>
          <LetterIcon className='h-5 w-5' />
        </span>
        <div className='min-w-0'>
          <p className='font-display text-[15px] font-semibold leading-tight text-slate-800 dark:text-slate-100'>
            {t(item.role)}
          </p>
          <p className='mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400'>
            {t(item.company)}
          </p>
        </div>
      </div>

      {item.quote && (
        <p className='mt-4 text-[15px] italic leading-relaxed text-slate-600 dark:text-slate-300'>
          &ldquo;{t(item.quote)}&rdquo;
        </p>
      )}

      <span className='mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand dark:text-blue-400'>
        {t("reco.viewLetter")}
        <ArrowIcon className='h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5' />
      </span>
    </a>
  );
};

/** Real reference letters, shown as linked cards — see the Recommendation type. */
const Recommendations = () => {
  const { t } = useLanguage();

  return (
    <div className='mt-14'>
      <div className='mb-2 flex items-center gap-2.5'>
        <QuoteIcon className='h-5 w-5 text-brand' />
        <h2 className='font-display text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-2xl'>
          {t("reco.heading")}
        </h2>
      </div>

      <p className='mb-6 max-w-[60ch] text-sm text-slate-500 dark:text-slate-400'>
        {t("reco.subtitle")}
      </p>

      <div className='grid gap-4 sm:grid-cols-2'>
        {recommendations.map((item, index) => (
          <InViewAnimation
            key={index}
            delay={index * 0.08}>
            <RecommendationCard item={item} />
          </InViewAnimation>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
