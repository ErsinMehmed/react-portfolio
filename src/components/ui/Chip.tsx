import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ChipTone = "brand" | "neutral" | "solid" | "muted" | "outline";
export type ChipSize = "xs" | "sm";

const BASE = "inline-flex items-center gap-1 transition-colors";

// `outline` is a squarer tech-tag shape (rounded-md, ring, font-medium) and
// carries its own fixed padding — it ignores the `size` prop entirely.
const TONE: Record<ChipTone, string> = {
  brand: "rounded-full font-semibold bg-blue-50 text-brand dark:bg-blue-500/10 dark:text-blue-400",
  neutral:
    "rounded-full font-semibold uppercase tracking-wide bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  solid: "rounded-full font-semibold bg-brand text-white",
  muted:
    "rounded-full font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
  outline:
    "rounded-md px-2.5 py-1 text-xs font-medium bg-slate-50 text-slate-600 ring-1 ring-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
};

const SIZE: Record<ChipSize, string> = {
  xs: "px-2.5 py-0.5 text-[11px]",
  sm: "px-3.5 py-1.5 text-sm",
};

interface OwnProps {
  tone?: ChipTone;
  size?: ChipSize;
  className?: string;
  children: ReactNode;
}

type ChipAsSpan = OwnProps & Omit<ComponentPropsWithoutRef<"span">, keyof OwnProps>;
type ChipAsButton = OwnProps & Omit<ComponentPropsWithoutRef<"button">, keyof OwnProps>;

export type ChipProps = ChipAsSpan | ChipAsButton;

/**
 * Small pill label: category/date badges, tech tags and the resume skill
 * filter, from one definition instead of a per-file className (ProjectCard,
 * ProjectModal, EducationBox/ExperienceBox and CertificationCard all had
 * their own copies of the same `bg-blue-50 text-brand` pill). Renders a
 * `<button type="button">` when `onClick` is passed (the interactive skill
 * filter), otherwise a plain `<span>`.
 */
const Chip = ({ tone = "brand", size = "xs", className, children, ...rest }: ChipProps) => {
  const classes = [BASE, TONE[tone], tone !== "outline" && SIZE[size], className]
    .filter(Boolean)
    .join(" ");

  if ("onClick" in rest && rest.onClick) {
    return (
      <button
        type='button'
        className={classes}
        {...(rest as Omit<ChipAsButton, keyof OwnProps>)}>
        {children}
      </button>
    );
  }

  return (
    <span
      className={classes}
      {...(rest as Omit<ChipAsSpan, keyof OwnProps>)}>
      {children}
    </span>
  );
};

export default Chip;
