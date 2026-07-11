import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";

interface NumberTickerProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

// Counts up to `value` once it scrolls into view. Uses ease-out so it feels
// responsive, tabular-nums so the digits never shift, and honours reduced-motion.
const NumberTicker = ({
  value,
  suffix = "",
  duration = 1100,
  className = "",
}: NumberTickerProps) => {
  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (!inView) return undefined;

    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className}`}>
      {display}
      {suffix}
    </span>
  );
};

export default NumberTicker;
