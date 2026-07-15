import { useEffect, useRef, type RefObject } from "react";

// Everything inside a dialog that can hold keyboard focus. Used to wrap Tab at
// the panel's edges so focus can't escape to the page behind the backdrop.
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export interface UseDialogOptions {
  /** Whether the dialog is currently shown. */
  open: boolean;
  /** Called on Escape (the backdrop click is wired by the caller/`<Dialog>`). */
  onClose: () => void;
  /**
   * Element to focus when the dialog opens. Defaults to the panel itself.
   * Pass e.g. a text input's ref for command-palette / chat style dialogs.
   */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * The shared behaviour every modal in the app needs: body scroll-lock, close on
 * Escape, a Tab focus-trap, and focus that moves into the panel on open and
 * returns to the trigger on close. Purely behavioural — the caller (usually
 * `<Dialog>`) owns the markup and animation. Returns the ref to spread onto the
 * panel element.
 */
export const useDialog = ({
  open,
  onClose,
  initialFocusRef,
}: UseDialogOptions) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll-lock + Escape + Tab focus-trap, all torn down together on close.
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (nodes.length === 0) {
          e.preventDefault();
          panelRef.current.focus();
          return;
        }

        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        const atStart =
          active === first ||
          active === panelRef.current ||
          !panelRef.current.contains(active);

        if (e.shiftKey && atStart) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Move focus into the dialog on open (one frame later so the panel is
  // mounted), then restore it to whatever was focused before, on close.
  useEffect(() => {
    if (!open) return undefined;

    const trigger = document.activeElement;
    const id = requestAnimationFrame(() => {
      (initialFocusRef?.current ?? panelRef.current)?.focus();
    });

    return () => {
      cancelAnimationFrame(id);
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, [open, initialFocusRef]);

  return { panelRef };
};
