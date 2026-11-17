"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared full-screen shell for the fun-fact scenes ("ship", "Nayagada"):
 * portal to <body>, a proper modal dialog, focus on the close button and back
 * to the trigger afterwards (the trigger does that in onClose), Escape to
 * close, Tab kept inside, page scroll locked, and a fade in/out. Clicking
 * anywhere closes it. Scenes render their layers as children.
 */
export function FunFactShell({
  titleId,
  onClose,
  className,
  hint = "Tap, click or press Esc to close",
  hintClassName,
  children,
}: {
  titleId: string;
  onClose: () => void;
  className?: string;
  hint?: string;
  hintClassName?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const closeBtn = React.useRef<HTMLButtonElement>(null);
  const t = (d: number) => (reduce ? 0 : d);

  React.useEffect(() => {
    closeBtn.current?.focus({ preventScroll: true });
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault(); // one control in here: keep focus on it
        closeBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lenis-prevent
      onClick={onClose}
      className={cn("fixed inset-0 z-[80] overflow-hidden bg-bg", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: t(0.35), delay: t(0.3) } }}
      transition={{ duration: t(0.4) }}
    >
      {children}

      <button
        ref={closeBtn}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/60 text-fg backdrop-blur-sm hover:border-accent sm:right-6 sm:top-6"
      >
        <X className="h-4 w-4" />
      </button>

      <motion.p
        className={cn("absolute inset-x-0 bottom-5 z-[2] text-center font-mono text-xs text-muted", hintClassName)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        exit={{ opacity: 0 }}
        transition={{ delay: t(0.9) }}
      >
        {hint}
      </motion.p>
    </motion.div>,
    document.body
  );
}

/** The text block both scenes share: label, display headline, story. */
export function FunFactText({
  titleId,
  label,
  title,
  children,
  className,
}: {
  titleId: string;
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("relative z-[1] mx-auto flex max-w-3xl flex-col justify-center px-6 text-center", className)}
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -10, transition: { duration: reduce ? 0 : 0.25 } }}
      transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{label}</p>
      <h2 id={titleId} className="display mt-4 text-[clamp(2.6rem,7vw,5.5rem)] text-fg">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
