import InViewAnimation from "../InViewAnimation";
import { useBilingual } from "./shared";
import { useLanguage } from "../../i18n/LanguageContext";
import type { CaseStudyDecision } from "../../types";

interface DecisionsSectionProps {
  decisions: CaseStudyDecision[];
}

interface PartProps {
  label: string;
  children: string;
  className?: string;
}

const Part = ({ label, children, className = "" }: PartProps) => (
  <div className={className}>
    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
      {label}
    </p>
    <p className="mt-1.5 leading-relaxed text-slate-600 dark:text-slate-300">
      {children}
    </p>
  </div>
);

/**
 * The senior-signal section: each decision told as problem then approach then
 * why then result. A tall faint index anchors each one; the approach sits on a
 * soft accent panel (a tint, never a side-stripe) so the eye lands on the
 * actual choice. Not an identical card grid, the parts vary in weight.
 */
const DecisionsSection = ({ decisions }: DecisionsSectionProps) => {
  const { t } = useLanguage();
  const bt = useBilingual();

  return (
    <div className="mt-8 space-y-10">
      {decisions.map((decision, i) => (
        <InViewAnimation
          key={i}
          delay={i * 0.05}>
          <article className="border-t border-slate-200 pt-8 dark:border-slate-800">
            <div className="flex gap-5 sm:gap-7">
              <span
                aria-hidden
                className="hidden select-none font-display text-3xl font-bold tabular-nums text-[color:var(--cs-line-strong)] sm:block sm:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
                  {bt(decision.title)}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {t("cs.decision.problem")}.{" "}
                  </span>
                  {bt(decision.problem)}
                </p>

                <div className="mt-4 rounded-xl border border-[color:var(--cs-line)] bg-[var(--cs-soft)] p-4 dark:bg-[var(--cs-glow)]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--cs-ink)] dark:text-[color:var(--cs-on-dark)]">
                    {t("cs.decision.choice")}
                  </p>
                  <p className="mt-1.5 font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                    {bt(decision.choice)}
                  </p>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Part label={t("cs.decision.why")}>{bt(decision.why)}</Part>
                  {decision.impact && (
                    <Part label={t("cs.decision.impact")}>
                      {bt(decision.impact)}
                    </Part>
                  )}
                </div>

                {decision.tags && decision.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {decision.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        </InViewAnimation>
      ))}
    </div>
  );
};

export default DecisionsSection;
