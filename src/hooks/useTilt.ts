import type { PointerEvent as ReactPointerEvent } from "react";
import {
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

// Max rotation at the element's edges, in degrees. Small on purpose — a
// "this is interactive" signal, not a novelty flip.
const MAX_TILT = 7;

// Follows the pointer with a little momentum instead of tracking it 1:1, so
// the motion reads as physical (Emil Kowalski's spring-for-decorative-
// interactions principle) rather than robotic.
const SPRING = { stiffness: 170, damping: 15, mass: 0.4 };

export interface Tilt {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onPointerMove: (e: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
}

/**
 * Pointer-driven 3D tilt for a single element. Returns spring-backed rotation
 * values plus the two handlers to spread onto the tilting element. Only reacts
 * to a real mouse (touch/pen leave it flat) and stays inert under
 * prefers-reduced-motion.
 */
export const useTilt = (): Tilt => {
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING);
  const rotateY = useSpring(ry, SPRING);

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 (left) .. 1 (right)
    const py = (e.clientY - rect.top) / rect.height; // 0 (top)  .. 1 (bottom)

    rx.set((0.5 - py) * 2 * MAX_TILT);
    ry.set((px - 0.5) * 2 * MAX_TILT);
  };

  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return { rotateX, rotateY, onPointerMove, onPointerLeave };
};
