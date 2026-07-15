import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

export type ButtonVariant = "primary" | "secondary" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark focus-visible:ring-brand dark:focus-visible:ring-offset-slate-900",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900",
  // `--cs-accent`/`--cs-ink` are set per case study (see CaseStudyShell). The
  // focus-ring offset color depends on what's behind the button, so callers
  // add their own `focus-visible:ring-offset-*` via `className`.
  accent: "bg-[var(--cs-accent)] text-white hover:brightness-105 focus-visible:ring-[color:var(--cs-ink)]",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "gap-1.5 rounded-full px-3.5 py-1.5 text-xs",
  md: "gap-2 rounded-xl px-5 py-2.5 text-sm",
  lg: "gap-2 rounded-2xl px-6 py-2.5 text-sm",
};

// Only the two combos actually used carry a brand-tinted glow shadow.
const SHADOW: Partial<Record<`${ButtonVariant}:${ButtonSize}`, string>> = {
  "primary:md": "shadow-[0_12px_26px_-12px_theme(colors.brand.DEFAULT/70%)]",
  "primary:lg": "shadow-[0_14px_30px_-12px_theme(colors.brand.DEFAULT/70%)]",
};

const buttonClasses = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean | undefined,
  className: string | undefined
) =>
  [
    BASE,
    VARIANT[variant],
    SIZE[size],
    SHADOW[`${variant}:${size}`],
    fullWidth && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

interface OwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = OwnProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof OwnProps> & {
    href?: never;
    to?: never;
  };

type ButtonAsAnchor = OwnProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof OwnProps> & {
    href: string;
    to?: never;
  };

type ButtonAsLink = OwnProps &
  Omit<LinkProps, keyof OwnProps> & {
    to: LinkProps["to"];
    href?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

/**
 * Every CTA in the app (primary/secondary/accent x sm/md/lg) from one
 * definition instead of a bespoke class string per page (NotFound's
 * primaryBtn/ghostBtn, ProfileCard's inline strings, CaseStudyFooterNav's
 * own, etc.). Renders `<Link>` when `to` is given, `<a>` when `href` is
 * given, otherwise a native `<button type="button">`.
 */
const Button = ({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = buttonClasses(variant, size, fullWidth, className);

  if ("to" in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as Omit<ButtonAsLink, keyof OwnProps>;
    return (
      <Link
        to={to}
        className={classes}
        {...linkRest}>
        {children}
      </Link>
    );
  }

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a
        className={classes}
        {...(rest as Omit<ButtonAsAnchor, keyof OwnProps>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      type='button'
      className={classes}
      {...(rest as Omit<ButtonAsButton, keyof OwnProps>)}>
      {children}
    </button>
  );
};

export default Button;
