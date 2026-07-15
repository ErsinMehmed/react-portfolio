import Layout from "../components/Layout";
import InViewAnimation from "../components/InViewAnimation";
import NumberTicker from "../components/NumberTicker";
import { mainSkills, techSkills, projects, certifications } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";
import type { TranslationKey } from "../i18n/translations";

interface Stat {
  value: number;
  suffix: string;
  label: TranslationKey;
}

const stats: Stat[] = [
  { value: 6, suffix: "+", label: "stats.yearsOfExperience" },
  {
    value: projects.professional.length + projects.personal.length,
    suffix: "+",
    label: "stats.projectsBuilt",
  },
  { value: techSkills.length, suffix: "+", label: "stats.technologies" },
  { value: certifications.length, suffix: "", label: "nav.certifications" },
];

const Home = () => {
  const { t } = useLanguage();

  return (
    <Layout
      classes='px-6 md:px-10 lg:px-14'
      contentClasses='2xl:max-w-[820px]'
      header='page.aboutMe'>
      <InViewAnimation>
        <div className='space-y-4 pt-6'>
          <p className='sm:text-justify text-lg leading-8 text-slate-600 dark:text-slate-300'>
            {t("about.intro1")}
          </p>

          <p className='sm:text-justify leading-7 text-slate-500 dark:text-slate-400'>
            {t("about.intro2")}
          </p>
        </div>
      </InViewAnimation>

      <InViewAnimation>
        <dl className='mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-slate-200/70 py-6 dark:border-slate-800 sm:grid-cols-4'>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className='flex flex-col'>
              <dt className='order-2 mt-2 text-xs font-medium text-slate-500 dark:text-slate-400'>
                {t(stat.label)}
              </dt>
              <dd className='order-1 font-display text-[28px] font-bold leading-none tracking-tight text-slate-800 dark:text-slate-100 sm:text-[32px]'>
                <NumberTicker
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </dd>
            </div>
          ))}
        </dl>
      </InViewAnimation>

      <InViewAnimation>
        <h3 className='mb-1 mt-14 font-display text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-3xl'>
          {t("whatIDo.heading")}
        </h3>
      </InViewAnimation>

      <div className='mt-6 border-t border-slate-200/70 dark:border-slate-800'>
        {mainSkills.map((item, index) => (
          <InViewAnimation
            key={index}
            delay={index * 0.07}>
            <div className='grid grid-cols-[2rem_1fr] gap-x-4 border-b border-slate-200/70 py-6 dark:border-slate-800 sm:grid-cols-[2.75rem_1fr] sm:gap-x-6'>
              <span className='pt-1 font-display text-sm font-bold tabular-nums text-brand'>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h4 className='flex items-center gap-2.5 font-display text-lg font-semibold text-slate-800 dark:text-slate-100 sm:text-xl'>
                  <item.icon className='h-5 w-5 shrink-0' />
                  {t(item.title)}
                </h4>

                <p className='mt-2 sm:text-justify leading-7 text-slate-500 dark:text-slate-400'>{t(item.text)}</p>
              </div>
            </div>
          </InViewAnimation>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
