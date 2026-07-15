import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLanguage } from "../../i18n/LanguageContext";
import { useBilingual } from "./shared";
import type { CaseStudy } from "../../types";

interface CaseStudyHeroProps {
  cs: CaseStudy;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CaseStudyHero = ({ cs }: CaseStudyHeroProps) => {
  const { t } = useLanguage();
  const bt = useBilingual();
  const reduce = useReducedMotion();

  // One hero entrance, staggered top to bottom (Emil: ~60ms between lines).
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <section
      id="overview"
      className="relative scroll-mt-24 pt-14 sm:pt-20">
      {/* Signature backdrop: an accent glow bleeding from the top, over a faint dotted grid. Not glass, not gradient text. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[520px] overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[820px] max-w-[140vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background: `radial-gradient(closest-side, var(--cs-glow), transparent)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.5] dark:opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            color: "var(--cs-line)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show">
        <motion.p
          variants={item}
          className="text-sm font-semibold tracking-tight text-[color:var(--cs-ink)] dark:text-[color:var(--cs-on-dark)]">
          {bt(cs.eyebrow)}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl">
          {t(cs.name)}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
          {bt(cs.tagline)}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-2xl leading-7 text-slate-500 dark:text-slate-400">
          {bt(cs.summary)}
        </motion.p>

        <motion.dl
          variants={item}
          className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-500">
              {t("cs.role")}
            </dt>
            <dd className="mt-1 max-w-xs text-sm font-semibold text-slate-700 dark:text-slate-200">
              {bt(cs.role)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-500">
              {t("cs.timeline")}
            </dt>
            <dd className="mt-1 text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-200">
              {cs.timeline.replace("Present", t("duration.present"))}
            </dd>
          </div>
        </motion.dl>
      </motion.div>
    </section>
  );
};

export default CaseStudyHero;
