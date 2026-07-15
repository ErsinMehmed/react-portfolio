import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRef } from "react";
import { useDialog } from "../hooks/useDialog";

// Minimal consumer so the hook can be exercised without any modal markup or
// framer-motion. Two focusable buttons let us drive the Tab trap; an optional
// input covers the `initialFocusRef` path.
const Harness = ({
  open,
  onClose,
  useInput = false,
}: {
  open: boolean;
  onClose: () => void;
  useInput?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { panelRef } = useDialog({
    open,
    onClose,
    initialFocusRef: useInput ? inputRef : undefined,
  });

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      data-testid='panel'>
      {useInput && (
        <input
          ref={inputRef}
          data-testid='field'
        />
      )}
      <button data-testid='first'>first</button>
      <button data-testid='last'>last</button>
    </div>
  );
};

const noop = () => {};

test("locks body scroll while open and restores it on close", () => {
  const { rerender } = render(
    <Harness
      open={false}
      onClose={noop}
    />
  );
  expect(document.body.style.overflow).toBe("");

  rerender(
    <Harness
      open
      onClose={noop}
    />
  );
  expect(document.body.style.overflow).toBe("hidden");

  rerender(
    <Harness
      open={false}
      onClose={noop}
    />
  );
  expect(document.body.style.overflow).toBe("");
});

test("calls onClose when Escape is pressed", () => {
  const onClose = vi.fn();
  render(
    <Harness
      open
      onClose={onClose}
    />
  );

  fireEvent.keyDown(document, { key: "Escape" });
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("moves focus to the panel on open by default", async () => {
  render(
    <Harness
      open
      onClose={noop}
    />
  );

  await waitFor(() => expect(screen.getByTestId("panel")).toHaveFocus());
});

test("honours initialFocusRef when provided", async () => {
  render(
    <Harness
      open
      useInput
      onClose={noop}
    />
  );

  await waitFor(() => expect(screen.getByTestId("field")).toHaveFocus());
});

test("traps Tab within the panel, wrapping at both edges", async () => {
  render(
    <Harness
      open
      onClose={noop}
    />
  );
  // Let the open-focus land on the panel before driving the trap.
  await waitFor(() => expect(screen.getByTestId("panel")).toHaveFocus());

  const first = screen.getByTestId("first");
  const last = screen.getByTestId("last");

  last.focus();
  fireEvent.keyDown(document, { key: "Tab" });
  expect(first).toHaveFocus();

  first.focus();
  fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
  expect(last).toHaveFocus();
});

test("restores focus to the trigger on close", async () => {
  const { rerender } = render(
    <>
      <button data-testid='trigger'>trigger</button>
      <Harness
        open={false}
        onClose={noop}
      />
    </>
  );

  const trigger = screen.getByTestId("trigger");
  trigger.focus();
  expect(trigger).toHaveFocus();

  rerender(
    <>
      <button data-testid='trigger'>trigger</button>
      <Harness
        open
        onClose={noop}
      />
    </>
  );
  await waitFor(() => expect(screen.getByTestId("panel")).toHaveFocus());

  rerender(
    <>
      <button data-testid='trigger'>trigger</button>
      <Harness
        open={false}
        onClose={noop}
      />
    </>
  );
  expect(trigger).toHaveFocus();
});
