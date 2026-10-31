import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/cn";

const sizes = {
  md: "sm:max-w-xl",
  lg: "sm:max-w-2xl",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Dialog({ onClose, title, size = "md", children }) {
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  const reduce = useReducedMotion();

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusTimer = window.setTimeout(() => {
      const target =
        panelRef.current?.querySelector("[data-autofocus]") ||
        panelRef.current?.querySelector(FOCUSABLE);
      target?.focus();
    }, 30);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current?.();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(
        panelRef.current.querySelectorAll(FOCUSABLE),
      ).filter((node) => node.offsetParent !== null);

      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <Motion.div
        className="absolute inset-0 bg-[rgba(8,10,7,0.55)] backdrop-blur-[3px]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
        onClick={() => closeRef.current?.()}
      />
      <Motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={reduce ? false : { opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[22px] border border-line bg-panel shadow-[var(--shadow-raise)] sm:rounded-[22px]",
          sizes[size],
        )}
      >
        <button
          type="button"
          onClick={() => closeRef.current?.()}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 z-10 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-panel-2 hover:text-ink"
        >
          <X size={18} />
        </button>
        {children}
      </Motion.div>
    </div>
  );
}
