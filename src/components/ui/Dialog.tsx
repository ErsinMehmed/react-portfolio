import type { KeyboardEventHandler, ReactNode, RefObject } from "react";
import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import { useDialog } from "../../hooks/useDialog";

type PanelMotion = Pick<MotionProps, "initial" | "animate" | "exit" | "transition">;

// The whole overlay cross-fades; the panel gets its own pop (overridable).
const OVERLAY_MOTION: PanelMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

const DEFAULT_PANEL_MOTION: PanelMotion = {
  initial: { opacity: 0, scale: 0.96, y: 24 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.97, y: 12 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
};

const DEFAULT_CONTAINER =
  "fixed inset-0 z-50 flex items-center justify-center p-4";
const DEFAULT_BACKDROP =
  "absolute inset-0 bg-slate-900/50 backdrop-blur-sm dark:bg-black/60";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Classes for the modal panel (size, colours, radius, padding). */
  panelClassName: string;
  /** Outer positioning layer — controls z-index, placement and padding. */
  containerClassName?: string;
  backdropClassName?: string;
  /** Override the panel's enter/exit animation (e.g. reduced-motion, sheets). */
  panelMotion?: PanelMotion;
  /** Element to focus on open; defaults to the panel. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Panel-scoped key handler for bespoke keys (e.g. arrow paging). */
  onPanelKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  ariaLabel?: string;
  labelledBy?: string;
}

/**
 * Headless-ish modal primitive: renders the backdrop + animated panel and wires
 * up scroll-lock, Escape, focus-trap and focus restore via `useDialog`. Callers
 * pass only the panel's inner content and any style/motion overrides, so the
 * cross-cutting dialog behaviour lives in exactly one place.
 */
const Dialog = ({
  open,
  onClose,
  children,
  panelClassName,
  containerClassName = DEFAULT_CONTAINER,
  backdropClassName = DEFAULT_BACKDROP,
  panelMotion = DEFAULT_PANEL_MOTION,
  initialFocusRef,
  onPanelKeyDown,
  ariaLabel,
  labelledBy,
}: DialogProps) => {
  const { panelRef } = useDialog({ open, onClose, initialFocusRef });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={containerClassName}
          {...OVERLAY_MOTION}>
          <div
            className={backdropClassName}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role='dialog'
            aria-modal='true'
            aria-label={ariaLabel}
            aria-labelledby={labelledBy}
            tabIndex={-1}
            onKeyDown={onPanelKeyDown}
            className={panelClassName}
            {...panelMotion}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
