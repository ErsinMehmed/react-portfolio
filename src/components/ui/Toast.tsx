import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ToastProps {
  open: boolean;
  children: ReactNode;
  /** Optional leading glyph (e.g. a success check). */
  icon?: ReactNode;
}

/**
 * A single transient, bottom-centered notification. Presentational only — the
 * caller owns visibility and auto-dismiss, so it stays trivial to drop in
 * anywhere. `role="status"` + polite live region announces it to screen readers
 * once, and the fixed layer is click-through except for the pill itself.
 */
const Toast = ({ open, children, icon }: ToastProps) => {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role='status'
          aria-live='polite'
          className='pointer-events-none fixed inset-x-0 top-6 z-[70] flex justify-center px-4'
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}>
          <div className='pointer-events-auto flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_16px_40px_-12px_rgba(27,74,120,0.35)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]'>
            {icon}
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
