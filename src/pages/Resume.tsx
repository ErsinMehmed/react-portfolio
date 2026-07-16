import IconAcademicCap from "../icons/AcademicCap";
import Layout from "../components/Layout";
import EducationBox from "../components/Resume/EducationBox";
import ExperienceBox from "../components/Resume/ExperienceBox";
import Recommendations from "../components/Resume/Recommendations";
import SkillsFilterSection from "../components/Resume/SkillsFilterSection";
import InViewAnimation from "../components/InViewAnimation";
import IconWork from "../icons/Work";
import { educations, experiences } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";

const Resume = () => {
  const { t } = useLanguage();

  return (
    <Layout
      classes='px-6 md:px-10 lg:px-14'
      contentClasses='2xl:max-w-[820px]'
      header='nav.resume'>
      <div className='mt-8'>
        <InViewAnimation>
          <div className='mb-6 flex items-center gap-2.5'>
            <IconAcademicCap className='h-5 w-5 text-brand' />
            <h2 className='font-display text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-2xl'>
              {t("resume.education")}
            </h2>
          </div>

          <div>
            {educations.map((item, index) => (
              <InViewAnimation
                key={index}
                delay={index * 0.12}>
                <EducationBox
                  item={item}
                  isLast={index === educations.length - 1}
                />
              </InViewAnimation>
            ))}
          </div>
        </InViewAnimation>

        <InViewAnimation>
          <div className='mb-6 mt-12 flex items-center gap-2.5'>
            <IconWork className='h-5 w-5 text-brand' />
            <h2 className='font-display text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-2xl'>
              {t("resume.experience")}
            </h2>
          </div>

          <div>
            {experiences.map((item, index) => (
              <InViewAnimation
                key={index}
                delay={index * 0.1}>
                <ExperienceBox
                  item={item}
                  isLast={index === experiences.length - 1}
                />
              </InViewAnimation>
            ))}
          </div>
        </InViewAnimation>
      </div>

      <InViewAnimation>
        <Recommendations />
      </InViewAnimation>

      <InViewAnimation delay={0.15}>
        <SkillsFilterSection />
      </InViewAnimation>
    </Layout>
  );
};

export default Resume;
