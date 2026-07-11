import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useReducedMotion } from "framer-motion";

// Expo-out curve — the reveal decelerates hard at the end, matching the
// sokobeauty.bg feel: content glides up into place, never a hard cross-fade.
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface InViewAnimationProps {
  children: ReactNode;
  delay?: number;
}

const InViewAnimation = ({ children, delay = 0 }: InViewAnimationProps) => {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-80px 0px",
  });

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, y: 24, scale: 0.985 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : hidden}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}>
      {children}
    </motion.div>
  );
};

export default InViewAnimation;
