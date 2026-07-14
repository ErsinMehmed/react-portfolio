import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { useTilt } from "../../hooks/useTilt";
import type { Project, ProjectType } from "../../types";

interface ProjectCardProps {
  project: Project;
  type: ProjectType;
  onClick: () => void;
}

const MotionLink = motion(Link);

const ProjectCard = ({ project, type, onClick }: ProjectCardProps) => {
  const { t } = useLanguage();
  const tilt = useTilt();
  const techs = project.technologies || [];
  const shown = techs.slice(0, 4);
  const extra = techs.length - shown.length;
  const isCaseStudy = Boolean(project.caseStudySlug);

  const shared = {
    onPointerMove: tilt.onPointerMove,
    onPointerLeave: tilt.onPointerLeave,
    style: {
      rotateX: tilt.rotateX,
      rotateY: tilt.rotateY,
      transformPerspective: 900,
    },
    transition: { duration: 0.2, ease: "easeOut" as const },
    className:
      "group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-sm transition-shadow duration-200 hover:shadow-[0_22px_50px_-24px_rgba(27,74,120,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b74e4] focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-[0_22px_50px_-24px_rgba(0,0,0,0.5)] dark:focus-visible:ring-offset-slate-950",
  };

  const body = (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {type === "professional" ? (
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#1b74e4] dark:bg-blue-500/10 dark:text-blue-400">
            {project.company ? t(project.company) : null}
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {t("projects.personal")}
          </span>
        )}

        {isCaseStudy && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#1b74e4] px-2.5 py-0.5 text-[11px] font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
            {t("projects.caseStudyBadge")}
          </span>
        )}
      </div>

      <h4 className="line-clamp-2 font-display text-lg font-semibold leading-snug text-slate-800 dark:text-slate-100">
        {t(project.name)}
      </h4>

      <p className="mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
        {t(project.description)}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {shown.map((tech, i) => (
          <span
            key={i}
            className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
            {tech}
          </span>
        ))}
        {extra > 0 && (
          <span className="px-1.5 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            +{extra}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
        <span className="text-[13px] font-semibold text-[#1b74e4]">
          {isCaseStudy ? t("projects.readCaseStudy") : t("projects.viewDetails")}
        </span>
        <span className="text-[#1b74e4] transition-transform duration-200 ease-out group-hover:translate-x-1">
          &rarr;
        </span>
      </div>
    </>
  );

  if (isCaseStudy && project.caseStudySlug) {
    return (
      <MotionLink
        to={`/projects/${project.caseStudySlug}`}
        aria-label={`${t(project.name)} — ${t("projects.readCaseStudy")}`}
        {...shared}>
        {body}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      {...shared}>
      {body}
    </motion.button>
  );
};

export default ProjectCard;
