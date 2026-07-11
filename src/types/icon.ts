import type { FC } from "react";

/** Props shared by every icon component in `src/icons`. */
export interface IconProps {
  className?: string;
}

/**
 * Props for icons that render two visual variants (an outlined/stroke SVG
 * and a filled one) selected by the `outline` flag — used by the nav icons
 * and a handful of ProfileCard icons.
 */
export interface DualIconProps extends IconProps {
  outline?: boolean;
}

export type IconComponent = FC<IconProps>;
export type DualIconComponent = FC<DualIconProps>;
