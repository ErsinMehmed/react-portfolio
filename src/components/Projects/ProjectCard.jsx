import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";

const ProjectCard = ({ project, type, onClick }) => {
  const { t } = useLanguage();
  const techs = project.technologies || [];
  const shown = techs.slice(0, 4);
  const extra = techs.length - shown.length;

  return (
    <motion.button
      type='button'
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className='group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition-shadow duration-200 hover:shadow-[0_22px_50px_-24px_rgba(27,74,120,0.4)]'>
      <div className='mb-3'>
        {type === "professional" ? (
          <span className='rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#1b74e4]'>
            {t(project.company)}
          </span>
        ) : (
          <span className='rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500'>
            {t("projects.personal")}
          </span>
        )}
      </div>

      <h4 className='line-clamp-2 font-display text-lg font-semibold leading-snug text-slate-800'>
        {t(project.name)}
      </h4>

      <p className='mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-slate-500'>
        {t(project.description)}
      </p>

      <div className='mt-4 flex flex-wrap gap-1.5'>
        {shown.map((tech, i) => (
          <span
            key={i}
            className='rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-100'>
            {tech}
          </span>
        ))}
        {extra > 0 && (
          <span className='px-1.5 py-1 text-[11px] font-semibold text-slate-400'>
            +{extra}
          </span>
        )}
      </div>

      <div className='mt-4 flex items-center justify-between border-t border-slate-100 pt-3'>
        <span className='text-[13px] font-semibold text-[#1b74e4]'>
          {t("projects.viewDetails")}
        </span>
        <span className='text-[#1b74e4] transition-transform duration-200 ease-out group-hover:translate-x-1'>
          &rarr;
        </span>
      </div>
    </motion.button>
  );
};

export default ProjectCard;
