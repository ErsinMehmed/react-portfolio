import Layout from "../components/Layout";
import InViewAnimation from "../components/InViewAnimation";
import NumberTicker from "../components/NumberTicker";
import { mainSkills, techSkills, projects, certifications } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";

const stats = [
  { value: 5, suffix: "+", label: "Years of experience" },
  {
    value: projects.professional.length + projects.personal.length,
    suffix: "+",
    label: "Projects built",
  },
  { value: techSkills.length, suffix: "+", label: "Technologies" },
  { value: certifications.length, suffix: "", label: "Certifications" },
];

const Home = () => {
  const { t } = useLanguage();

  return (
    <Layout
      classes='px-6 md:px-10 lg:px-14'
      contentClasses='2xl:max-w-[820px]'
      header='About Me'>
      <InViewAnimation>
        <div className='space-y-4 pt-6'>
          <p className='text-lg leading-8 text-slate-600'>
            {t(
              "Hi, my name is Ersin, and I am a software developer. I have over 6 years of experience in programming, including more than 4 years of professional experience, combining my passion for technology with real-world practice. Over the years, I’ve honed my skills by working on various projects, both at work and in my spare time, constantly striving to deliver high-quality solutions."
            )}
          </p>

          <p className='leading-7 text-slate-500'>
            {t(
              "I have both theoretical and practical expertise in back-end and front-end programming, with a strong focus on web development. Web programming is my greatest strength, and I continuously work on refining my skills in this area. On this site, you can explore more details about my work, including the developments and projects I am currently involved in."
            )}
          </p>
        </div>
      </InViewAnimation>

      <InViewAnimation>
        <dl className='mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-slate-200/70 py-6 sm:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className='sr-only'>{t(stat.label)}</dt>
              <dd className='font-display text-[28px] font-bold leading-none tracking-tight text-slate-800 sm:text-[32px]'>
                <NumberTicker
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </dd>
              <p className='mt-2 text-xs font-medium text-slate-400'>
                {t(stat.label)}
              </p>
            </div>
          ))}
        </dl>
      </InViewAnimation>

      <InViewAnimation>
        <h3 className='mb-1 mt-14 font-display text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl'>
          {t("What I do")}
        </h3>
      </InViewAnimation>

      <div className='mt-6 border-t border-slate-200/70'>
        {mainSkills.map((item, index) => (
          <InViewAnimation
            key={index}
            delay={index * 0.07}>
            <div className='grid grid-cols-[2rem_1fr] gap-x-4 border-b border-slate-200/70 py-6 sm:grid-cols-[2.75rem_1fr] sm:gap-x-6'>
              <span className='pt-1 font-display text-sm font-bold tabular-nums text-[#1b74e4]'>
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h4 className='flex items-center gap-2.5 font-display text-lg font-semibold text-slate-800 sm:text-xl'>
                  <item.icon className='h-5 w-5 shrink-0' />
                  {t(item.title)}
                </h4>

                <p className='mt-2 leading-7 text-slate-500'>{t(item.text)}</p>
              </div>
            </div>
          </InViewAnimation>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
