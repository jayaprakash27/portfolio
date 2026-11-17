"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { ChhenaScene } from "@/components/chhena-scene";
import { profile } from "@/lib/data";

/**
 * "Nayagada" in the footer: a button with a small "fun fact" tag. Clicking
 * opens the overnight-bake chhena poda scene.
 */
export function NayagadaFact() {
  const [open, setOpen] = React.useState(false);
  const btn = React.useRef<HTMLButtonElement>(null);

  const close = React.useCallback(() => {
    setOpen(false);
    btn.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <button
        ref={btn}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-cursor="cake"
        onClick={() => setOpen(true)}
        className="nayagada-fact inline-flex items-baseline gap-1.5 text-fg decoration-accent decoration-dotted underline-offset-4 hover:text-accent [&>.nf-name]:underline"
      >
        <span className="nf-name">{profile.hometown}</span>
        <span className="inline-flex translate-y-[-1px] items-center gap-1 rounded-full border border-accent/50 px-1.5 py-px font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
          <svg viewBox="0 0 40 32" className="h-3 w-3.5" aria-hidden>
            <path d="M5 23 L35 12 L35 26 L5 26 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            <path d="M5 23 L35 12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
          fun fact
        </span>
      </button>
      <AnimatePresence>{open && <ChhenaScene onClose={close} />}</AnimatePresence>
    </>
  );
}
