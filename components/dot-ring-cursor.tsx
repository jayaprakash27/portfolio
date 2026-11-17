"use client";

import * as React from "react";

type Mode = "default" | "link" | "ship" | "cake" | "text" | "hidden";

const TYPING =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]';
const CLICKABLE = 'a, button, [role="button"], summary, select, label[for], [data-cursor]';

/**
 * Site-wide cursor: a lime dot that follows exactly and a thin ring that
 * trails behind it.
 *
 * - Over anything clickable the ring grows and fills with a faint lime.
 * - Surprises: over elements marked data-cursor="ship" the ring becomes a
 *   boita; over data-cursor="cake" it becomes a chhena poda slice — hints
 *   that those words hide a fun fact.
 * - Text fields get the native I-beam back.
 * - Mouse / trackpad only; touch and pen keep native behaviour.
 * - Native cursor is hidden only once this has mounted (html class
 *   `has-custom-cursor`), so a JS failure never leaves visitors cursorless.
 * - Reduced motion: the ring snaps instead of trailing.
 *
 * Positions are written straight to transforms (no React state per frame);
 * state only changes when the mode does.
 */
export function DotRingCursor() {
  const dot = React.useRef<HTMLDivElement>(null);
  const ring = React.useRef<HTMLDivElement>(null);
  const [mode, setMode] = React.useState<Mode>("hidden");
  const [pressed, setPressed] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.classList.add("has-custom-cursor");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let current: Mode = "hidden";
    const set = (m: Mode) => {
      if (m !== current) {
        current = m;
        setMode(m);
      }
    };

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const loop = () => {
      const k = reduce ? 1 : 0.2;
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return set("hidden");
      if (current === "hidden") {
        rx = e.clientX; // don't fly in from the corner
        ry = e.clientY;
      }
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const target = e.target as Element | null;
      const special = target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (target?.closest(TYPING)) set("text");
      else if (special === "ship" || special === "cake") set(special);
      else if (target?.closest(CLICKABLE)) set("link");
      else set("default");
    };
    const onLeave = () => set("hidden");
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    html.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      html.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="dr-cursor" data-mode={mode} data-pressed={pressed || undefined} aria-hidden>
      <div ref={ring} className="dr-cursor__ring">
        <div className="dr-cursor__shape">
          <svg className="dr-cursor__icon dr-cursor__icon--ship" viewBox="0 0 70 56">
            <path d="M4 40 L66 40 L58 52 L12 52 Z" fill="var(--fg)" stroke="var(--bg)" strokeWidth="3" />
            <path d="M34 6 L34 40" stroke="var(--fg)" strokeWidth="4" />
            <path d="M20 12 L48 12 L46 34 L22 34 Z" fill="var(--accent)" stroke="var(--bg)" strokeWidth="3" />
          </svg>
          {/* A cake slice, side view: cream outline, lime crust along the top. */}
          <svg className="dr-cursor__icon dr-cursor__icon--cake" viewBox="0 0 40 32">
            <path d="M5 23 L35 12 L35 26 L5 26 Z" fill="var(--bg)" stroke="var(--bg)" strokeWidth="5" strokeLinejoin="round" />
            <path d="M5 23 L35 12 L35 26 L5 26 Z" fill="var(--bg)" stroke="var(--fg)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M5 23 L35 12" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M14 22.5 L35 19" stroke="var(--fg)" strokeOpacity="0.45" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
      <div ref={dot} className="dr-cursor__dot" />
    </div>
  );
}
