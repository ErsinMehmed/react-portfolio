import React, { useState } from "react";
import Layout from "../components/Layout";
import InViewAnimation from "../components/InViewAnimation";
import ProjectCard from "../components/Projects/ProjectCard";
import ProjectModal from "../components/Projects/ProjectModal";
import { projects } from "../Data";
import { useLanguage } from "../i18n/LanguageContext";

const sections = [
  { key: "professional", title: "projects.professional", items: projects.professional },
  { key: "personal", title: "projects.personal", items: projects.personal },
];

const Project = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);

  const handleNavigate = (dir) => {
    setSelected((cur) => {
      if (!cur) return cur;
      const count = cur.items.length;
      const index = (cur.index + dir + count) % count;
      return { ...cur, index, project: cur.items[index] };
    });
  };

  return (
    <Layout
      classes='px-6 md:px-10 lg:px-14'
      contentClasses='2xl:max-w-[820px]'
      header='nav.projects'>
      <div className='mt-8 space-y-14'>
        {sections.map((section) => (
          <InViewAnimation key={section.key}>
            <div className='mb-6 flex items-center gap-3'>
              <span className='h-5 w-1.5 rounded-full bg-[#1b74e4]' />
              <h3 className='font-display text-xl font-bold tracking-tight text-slate-800 sm:text-2xl'>
                {t(section.title)}
              </h3>
              <span className='text-sm font-semibold text-slate-500'>
                {section.items.length}
              </span>
            </div>

            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
              {section.items.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  type={section.key}
                  onClick={() =>
                    setSelected({
                      project,
                      type: section.key,
                      items: section.items,
                      index,
                    })
                  }
                />
              ))}
            </div>
          </InViewAnimation>
        ))}
      </div>

      <ProjectModal
        data={selected}
        onClose={() => setSelected(null)}
        onNavigate={handleNavigate}
      />
    </Layout>
  );
};

export default Project;
