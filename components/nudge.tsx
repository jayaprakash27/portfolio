"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { X } from "lucide-react";

const KEY = "nudge-shown";

function alreadyShown() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* private mode: it just may show again next visit */
  }
}

/**
 * One iOS-style notification, once per visit, at ~70% of the page.
 * A nod to the Swift notification extension. Dismissible, never returns.
 */
export function Nudge() {
  const [open, setOpen] = React.useState(false);
  // Measured against the live page height, which changes as chapters
  // switch between pinned (desktop) and inline (mobile) layouts.
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const v = max > 0 ? y / max : 0;
    if (v > 0.7 && v < 0.9 && !open && !alreadyShown()) {
      markShown();
      setOpen(true);
    }
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          className="fixed inset-x-4 top-20 z-40 mx-auto flex max-w-sm items-start gap-3 rounded-2xl border border-line bg-card p-3 shadow-2xl sm:left-auto sm:right-6"
        >
          <span className="display grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-base text-on-accent">J</span>
          <a href="#contact" onClick={() => setOpen(false)} className="min-w-0 flex-1">
            <span className="block font-mono text-[10px] text-muted">JAY · now</span>
            <span className="block text-sm text-fg">Still here? Let&apos;s talk →</span>
          </a>
          <button type="button" onClick={() => setOpen(false)} aria-label="Dismiss" className="text-muted hover:text-fg">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
