import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMagnetic } from "../../hooks/useMagnetic";

interface MagneticProps {
  children: ReactNode;
  /** 0 = no pull, 1 = follows the cursor 1:1. Small values read best. */
  strength?: number;
  className?: string;
}

/**
 * Wraps a CTA so it drifts toward the cursor on hover. Inline-flex so it never
 * changes the button's own box; the pull lives on this wrapper's transform.
 */
const Magnetic = ({ children, strength, className = "" }: MagneticProps) => {
  const { ref, x, y, onPointerMove, onPointerLeave } =
    useMagnetic<HTMLDivElement>(strength);

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x, y }}
      className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  );
};

export default Magnetic;
