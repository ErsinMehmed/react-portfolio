import InViewAnimation from "../InViewAnimation";
import NumberTicker from "../NumberTicker";
import { useBilingual } from "./shared";
import type { CaseStudyMetric } from "../../types";

interface MetricsBandProps {
  metrics: CaseStudyMetric[];
}

/**
 * The "at a glance" numbers. Deliberately not the SaaS hero-metric cliche (a
 * giant gradient number over a label): these are column-separated, each with a
 * one-line reason underneath, so a number always comes with its cause.
 */
const MetricsBand = ({ metrics }: MetricsBandProps) => {
  const bt = useBilingual();

  return (
    <InViewAnimation>
      <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-[color:var(--cs-line)] py-8 lg:grid-cols-4">
        {metrics.map((metric, i) => {
          const suffix =
            typeof metric.suffix === "object"
              ? bt(metric.suffix)
              : metric.suffix ?? "";
          return (
            <div
              key={i}
              className="flex flex-col">
              <dd className="font-display text-4xl font-bold leading-none tracking-tight text-slate-900 dark:text-slate-50 sm:text-[42px]">
                {metric.prefix}
                <NumberTicker
                  value={metric.value}
                  suffix={suffix}
                />
              </dd>
            <dt className="mt-3 text-sm font-semibold text-[color:var(--cs-ink)] dark:text-[color:var(--cs-on-dark)]">
              {bt(metric.label)}
            </dt>
              {metric.detail && (
                <p className="mt-1 text-[13px] leading-snug text-slate-500 dark:text-slate-400">
                  {bt(metric.detail)}
                </p>
              )}
            </div>
          );
        })}
      </dl>
    </InViewAnimation>
  );
};

export default MetricsBand;
