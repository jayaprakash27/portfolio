"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { ShipScene } from "@/components/ship-scene";

/**
 * The accent word "ship" in the hero, with a hidden story behind a click.
 *
 * Hint: a small tag above the word ("click for a fun fact") with a tiny boita
 * and a hooked arrow pointing down at it. Both the word and the tag open the
 * scene. Click only: the word sits mid-hero, so hover would trigger by accident.
 */
export function ShipWord({ word }: { word: string }) {
  const [open, setOpen] = React.useState(false);
  const btn = React.useRef<HTMLButtonElement>(null);

  const closeScene = React.useCallback(() => {
    setOpen(false);
    btn.current?.focus({ preventScroll: true });
  }, []);

  return (
    <span className="ship-word relative inline-block">
      <button
        ref={btn}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby="ship-hint"
        data-cursor="ship"
        onClick={() => setOpen(true)}
        className="ship-word__btn text-accent focus-visible:outline-offset-8"
      >
        {word}
      </button>

      {/* The hint tag: sits in the gap above the word, points down at it. */}
      <span
        id="ship-hint"
        className="ship-word__hint"
        data-cursor="ship"
        // A mouse/touch shortcut; keyboard users reach the scene via the word,
        // which this tag also describes (aria-describedby).
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 24 24" className="ship-word__hint-arrow" aria-hidden>
          <path d="M20 3 C 20 13, 14 17, 6 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M10 13 L6 17 L10 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 70 56" className="ship-word__hint-boat" aria-hidden>
          <path d="M4 40 L66 40 L58 52 L12 52 Z" fill="var(--fg)" />
          <path d="M34 6 L34 40" stroke="var(--fg)" strokeWidth="4" />
          <path d="M20 12 L48 12 L46 34 L22 34 Z" fill="var(--accent)" />
        </svg>
        <span>click for a fun fact</span>
      </span>

      <AnimatePresence>{open && <ShipScene onClose={closeScene} />}</AnimatePresence>
    </span>
  );
}
