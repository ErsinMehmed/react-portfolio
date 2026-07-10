import React, { useState } from "react";
import IconAcademicCap from "../icons/AcademicCap";
import Layout from "../components/Layout";
import SkillBox from "../components/Resume/SkillBox";
import EducationBox from "../components/Resume/EducationBox";
import ExperienceBox from "../components/Resume/ExperienceBox";
import InViewAnimation from "../components/InViewAnimation";
import IconWork from "../icons/Work";
import { techSkills, educations, experiences } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";

const filterCategories = [
  { kind: "All", labelKey: "filter.all" },
  { kind: "Frontend", labelKey: "filter.frontend" },
  { kind: "Backend", labelKey: "filter.backend" },
  { kind: "Database", labelKey: "filter.database" },
  { kind: "AI", labelKey: "filter.ai" },
  { kind: "Other", labelKey: "filter.other" },
];

const Resume = () => {
  const { t } = useLanguage();
  const [selectedKind, setSelectedKind] = useState("All");

  const filteredSkills = (
    selectedKind !== "All"
      ? techSkills.filter((item) => item.kind === selectedKind)
      : techSkills
  )
    .slice()
    .sort((a, b) => b.years - a.years || b.projects - a.projects);

  return (
    <Layout
      classes='px-6 md:px-10 lg:px-14'
      contentClasses='2xl:max-w-[820px]'
      header='nav.resume'>
      <div className='mt-8'>
        <InViewAnimation>
          <div className='mb-6 flex items-center gap-2.5'>
            <IconAcademicCap className='h-5 w-5 text-[#1b74e4]' />
            <h3 className='font-display text-xl font-bold tracking-tight text-slate-800 sm:text-2xl'>
              {t("resume.education")}
            </h3>
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
            <IconWork className='h-5 w-5 text-[#1b74e4]' />
            <h3 className='font-display text-xl font-bold tracking-tight text-slate-800 sm:text-2xl'>
              {t("resume.experience")}
            </h3>
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

      <InViewAnimation delay={0.15}>
        <div className='mt-14'>
          <h3 className='font-display text-xl font-bold tracking-tight text-slate-800 sm:text-2xl'>
            {t("resume.professionalSkills")}
          </h3>

          <p className='mt-1.5 max-w-[60ch] text-sm text-slate-500'>
            {t("resume.hoverHint")}
          </p>

          <div className='mt-5 flex flex-wrap gap-2'>
            {filterCategories.map((category, index) => (
              <button
                key={index}
                type='button'
                onClick={() => setSelectedKind(category.kind)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                  selectedKind === category.kind
                    ? "bg-[#1b74e4] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}>
                {t(category.labelKey)}
              </button>
            ))}
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3'>
            {filteredSkills.map((item, index) => (
              <SkillBox
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </InViewAnimation>
    </Layout>
  );
};

export default Resume;
