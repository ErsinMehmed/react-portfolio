import InViewAnimation from "../InViewAnimation";
import { useBilingual } from "./shared";
import type { CaseStudy } from "../../types";

interface ArchitectureDiagramProps {
  architecture: CaseStudy["architecture"];
}

/**
 * The system as a vertical request flow: client at the top, myPOS core at the
 * bottom, each layer a node on a shared spine. A decorative pulse travels the
 * spine to read as data moving through. Stacks cleanly on mobile because the
 * layers are just rows; nothing is absolutely positioned except the spine.
 */
const ArchitectureDiagram = ({ architecture }: ArchitectureDiagramProps) => {
  const bt = useBilingual();

  return (
    <div className="mt-8">
      <p className="max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
        {bt(architecture.intro)}
      </p>

      <div className="relative mt-10">
        {/* Spine + travelling pulse */}
        <div
          aria-hidden
          className="absolute inset-y-2 left-5 w-px bg-gradient-to-b from-[color:var(--cs-line)] via-[var(--cs-accent)] to-[color:var(--cs-line)] sm:left-6">
          <span className="animate-cs-flow absolute left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--cs-accent)] to-transparent" />
        </div>

        <ol className="space-y-4">
          {architecture.layers.map((layer, i) => (
            <InViewAnimation
              key={i}
              delay={i * 0.08}>
              <li className="relative pl-14 sm:pl-16">
                {/* Node marker sitting on the spine */}
                <span
                  aria-hidden
                  className="absolute left-5 top-6 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--cs-accent)] ring-4 ring-white dark:ring-slate-900 sm:left-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>

                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-[2px] transition-colors dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-xs font-bold tabular-nums text-[color:var(--cs-ink)] dark:text-[color:var(--cs-on-dark)]">
                      L{i + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {bt(layer.title)}
                    </h3>
                  </div>

                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {bt(layer.role)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {layer.nodes.map((node) => (
                      <span
                        key={node}
                        className="rounded-md border border-[color:var(--cs-line)] bg-[var(--cs-soft)] px-2.5 py-1 text-xs font-semibold text-[color:var(--cs-ink)] dark:bg-[var(--cs-glow)] dark:text-[color:var(--cs-on-dark)]">
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </InViewAnimation>
          ))}
        </ol>
      </div>

      {architecture.note && (
        <InViewAnimation>
          <p className="mt-6 rounded-xl border border-[color:var(--cs-line)] bg-[var(--cs-soft)] px-5 py-4 text-sm leading-relaxed text-slate-600 dark:bg-[var(--cs-glow)] dark:text-slate-200">
            {bt(architecture.note)}
          </p>
        </InViewAnimation>
      )}
    </div>
  );
};

export default ArchitectureDiagram;
