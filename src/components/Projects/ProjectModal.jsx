import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";

const GitHubMark = ({ className }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}>
    <path d='M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.67 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.4-2.69 5.37-5.25 5.66.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z' />
  </svg>
);

const ExternalIcon = ({ className }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}>
    <path d='M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z' />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}>
    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
  </svg>
);

const ProjectModal = ({ data, onClose }) => {
  useEffect(() => {
    if (!data) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [data, onClose]);

  const { t } = useLanguage();
  const project = data?.project;
  const type = data?.type;

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <div
            className='absolute inset-0 bg-slate-900/50 backdrop-blur-sm'
            onClick={onClose}
          />

          <motion.div
            role='dialog'
            aria-modal='true'
            className='relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8'
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <button
              type='button'
              onClick={onClose}
              aria-label='Close'
              className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700'>
              <CloseIcon className='h-5 w-5' />
            </button>

            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                type === "professional"
                  ? "bg-blue-50 text-[#1b74e4]"
                  : "bg-slate-100 uppercase tracking-wide text-slate-500"
              }`}>
              {type === "professional"
                ? t(project.company)
                : t("projects.personalProject")}
            </span>

            <h3 className='mt-3 pr-8 font-display text-2xl font-bold leading-tight tracking-tight text-slate-800'>
              {t(project.name)}
            </h3>

            <p className='mt-4 leading-relaxed text-slate-600'>
              {t(project.description)}
            </p>

            <div className='mt-6'>
              <p className='mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
                {t("projects.techStack")}
              </p>
              <div className='flex flex-wrap gap-2'>
                {(project.technologies || []).map((tech, i) => (
                  <span
                    key={i}
                    className='rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-100'>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.live || project.github) && (
              <div className='mt-7 flex flex-wrap gap-3'>
                {project.live && (
                  <a
                    href={project.live}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex items-center gap-2 rounded-xl bg-[#1b74e4] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_26px_-12px_rgba(27,116,228,0.7)] transition-colors hover:bg-[#1667cf]'>
                    <ExternalIcon className='h-4 w-4' />
                    {t("projects.liveDemo")}
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50'>
                    <GitHubMark className='h-4 w-4' />
                    {t("projects.viewCode")}
                  </a>
                )}
              </div>
            )}

            {type === "professional" && !project.live && !project.github && (
              <p className='mt-7 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500'>
                {t("projects.proprietaryNotice")}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
