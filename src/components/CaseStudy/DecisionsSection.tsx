import { useState } from "react";
import InViewAnimation from "../InViewAnimation";
import { useBilingual } from "./shared";
import { useLanguage } from "../../i18n/LanguageContext";
import { streamAskCv } from "../../lib/askCv";
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

const SparkIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}>
    <path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2zm7 12l.9 2.4L22 17l-2.1.6L19 20l-.9-2.4L16 17l2.1-.6L19 14z" />
  </svg>
);

type RationaleStatus = "idle" | "streaming" | "done" | "error";

/**
 * On demand, an LLM explains why this option beat the realistic alternatives
 * and what trade-offs were accepted, streamed in. The static "Why" states the
 * decision; this adds the senior-signal reasoning around it, grounded in the
 * decision the client hands the function (see netlify/functions/ask-cv.mjs).
 */
const DecisionRationale = ({ decision }: { decision: CaseStudyDecision }) => {
  const { t, lang } = useLanguage();
  const bt = useBilingual();
  const [status, setStatus] = useState<RationaleStatus>("idle");
  const [text, setText] = useState("");

  const run = async () => {
    if (status === "streaming") return;
    setStatus("streaming");
    setText("");
    try {
      const raw = await streamAskCv({
        mode: "decision",
        lang,
        decision: {
          title: bt(decision.title),
          problem: bt(decision.problem),
          choice: bt(decision.choice),
          why: bt(decision.why),
          tags: decision.tags,
        },
        onToken: setText,
      });
      setText(raw.trim());
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "idle") {
    return (
      <button
        type="button"
        onClick={run}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--cs-line)] bg-[var(--cs-soft)] px-3.5 py-1.5 text-[13px] font-medium text-[color:var(--cs-ink)] transition-colors hover:border-[color:var(--cs-ink)]/40 dark:bg-[var(--cs-glow)] dark:text-[color:var(--cs-on-dark)]">
        <SparkIcon className="h-3.5 w-3.5" />
        {t("cs.decision.askAi")}
      </button>
    );
  }

  return (
    <div className="mt-5 rounded-xl border border-[color:var(--cs-line)] bg-[var(--cs-soft)] p-4 dark:bg-[var(--cs-glow)]">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--cs-ink)] dark:text-[color:var(--cs-on-dark)]">
        <SparkIcon className="h-3.5 w-3.5" />
        {t("cs.decision.aiTag")}
      </div>

      {status === "error" ? (
        <p className="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
          {t("cs.decision.aiError")}
        </p>
      ) : status === "streaming" && !text ? (
        <div className="mt-3 space-y-2">
          <div className="h-2.5 w-11/12 animate-pulse rounded bg-[color:var(--cs-line)]" />
          <div className="h-2.5 w-3/4 animate-pulse rounded bg-[color:var(--cs-line)]" />
        </div>
      ) : (
        <>
          <p className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed text-slate-700 dark:text-slate-200">
            {text}
          </p>
          {status === "done" && (
            <p className="mt-2.5 text-[11px] leading-snug text-slate-400 dark:text-slate-500">
              {t("cs.decision.aiDisclaimer")}
            </p>
          )}
        </>
      )}
    </div>
  );
};

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

                <DecisionRationale decision={decision} />
              </div>
            </div>
          </article>
        </InViewAnimation>
      ))}
    </div>
  );
};

export default DecisionsSection;
