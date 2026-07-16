import { useRef, type PointerEvent, type RefObject } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic-cursor pull for a CTA: the element eases toward the pointer while
 * it hovers, then springs back to rest on leave. The spring is critically
 * damped (no overshoot, per the site's no-bounce motion rule). Skipped for
 * touch (pointerType !== "mouse") and for reduced-motion users, where the
 * values simply never leave 0.
 */
export const useMagnetic = <T extends HTMLElement = HTMLElement>(strength = 0.35) => {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 220, damping: 20, mass: 0.4 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  const onPointerMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * strength);
    rawY.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref: ref as RefObject<T>, x, y, onPointerMove, onPointerLeave };
};
