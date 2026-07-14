import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import CaseStudyShell from "../components/CaseStudy/CaseStudyShell";
import CaseStudyHero from "../components/CaseStudy/CaseStudyHero";
import MetricsBand from "../components/CaseStudy/MetricsBand";
import SectionNav, { type NavItem } from "../components/CaseStudy/SectionNav";
import ArchitectureDiagram from "../components/CaseStudy/ArchitectureDiagram";
import DecisionsSection from "../components/CaseStudy/DecisionsSection";
import CaseStudyFooterNav from "../components/CaseStudy/CaseStudyFooterNav";
import InViewAnimation from "../components/InViewAnimation";
import { Section, SectionHeading, useBilingual } from "../components/CaseStudy/shared";
import { getCaseStudy } from "../data/caseStudies";
import { useLanguage } from "../i18n/LanguageContext";

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "cs.nav.overview" },
  { id: "problem", label: "cs.nav.problem" },
  { id: "architecture", label: "cs.nav.architecture" },
  { id: "decisions", label: "cs.nav.decisions" },
  { id: "results", label: "cs.nav.results" },
  { id: "stack", label: "cs.nav.stack" },
];

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = getCaseStudy(slug);
  const { t } = useLanguage();
  const bt = useBilingual();

  // Unknown slug falls through to the site's normal 404.
  if (!cs) return <NotFound />;

  return (
    <CaseStudyShell
      accent={cs.accent}
      title={t(cs.name)}
      liveUrl={cs.liveUrl}>
      <CaseStudyHero cs={cs} />

      <MetricsBand metrics={cs.metrics} />

      <div className="mt-20 lg:grid lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-10 xl:gap-16">
        <SectionNav items={NAV_ITEMS} />

        <div className="min-w-0 space-y-20">
          {/* 01 — The problem */}
          <Section id="problem">
            <SectionHeading
              index="01"
              title={t("cs.section.problem")}
            />
            <div className="mt-6 max-w-2xl space-y-4">
              {cs.problem.body.map((para, i) => (
                <InViewAnimation key={i}>
                  <p className="leading-8 text-slate-600 dark:text-slate-300">
                    {bt(para)}
                  </p>
                </InViewAnimation>
              ))}
            </div>

            <InViewAnimation>
              <p className="mb-4 mt-10 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {t("cs.section.constraints")}
              </p>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {cs.problem.constraints.map((c, i) => (
                  <li
                    key={i}
                    className="flex gap-3">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--cs-ink)] dark:text-[color:var(--cs-on-dark)]" />
                    <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {bt(c)}
                    </span>
                  </li>
                ))}
              </ul>
            </InViewAnimation>
          </Section>

          {/* 02 — Architecture */}
          <Section id="architecture">
            <SectionHeading
              index="02"
              title={t("cs.section.architecture")}
            />
            <ArchitectureDiagram architecture={cs.architecture} />
          </Section>

          {/* 03 — Key decisions */}
          <Section id="decisions">
            <SectionHeading
              index="03"
              title={t("cs.section.decisions")}
            />
            <DecisionsSection decisions={cs.decisions} />
          </Section>

          {/* 04 — Outcome */}
          <Section id="results">
            <SectionHeading
              index="04"
              title={t("cs.section.results")}
            />
            <div className="mt-6 max-w-2xl space-y-4">
              {cs.results.body.map((para, i) => (
                <InViewAnimation key={i}>
                  <p className="leading-8 text-slate-600 dark:text-slate-300">
                    {bt(para)}
                  </p>
                </InViewAnimation>
              ))}
            </div>

            <InViewAnimation>
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {cs.results.points.map((p, i) => (
                  <li
                    key={i}
                    className="flex gap-3">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--cs-ink)] dark:text-[color:var(--cs-on-dark)]" />
                    <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                      {bt(p)}
                    </span>
                  </li>
                ))}
              </ul>
            </InViewAnimation>
          </Section>

          {/* 05 — Stack */}
          <Section id="stack">
            <SectionHeading
              index="05"
              title={t("cs.section.stack")}
            />
            <div className="mt-6 space-y-6">
              {cs.stack.map((group, i) => (
                <InViewAnimation
                  key={i}
                  delay={i * 0.06}>
                  <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:gap-6">
                    <p className="w-40 shrink-0 font-display text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {bt(group.group)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </InViewAnimation>
              ))}
            </div>
          </Section>

          <CaseStudyFooterNav
            slug={cs.slug}
            liveUrl={cs.liveUrl}
          />
        </div>
      </div>
    </CaseStudyShell>
  );
};

export default CaseStudy;
