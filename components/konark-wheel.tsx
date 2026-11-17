"use client";

import * as React from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

const SPOKES = 16; // Konark's wheels: 8 major + 8 minor spokes

/**
 * Scroll progress, as a Konark Sun Temple wheel. The real wheels double as
 * sundials; this one tells you how far down the page you are. The wheel
 * turns as you scroll and its spokes light up one by one.
 */
export function KonarkWheel() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);
  const [lit, setLit] = React.useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    progress.set(p);
    const next = Math.round(p * SPOKES);
    if (next !== lit) setLit(next);
  });

  const rotate = useTransform(progress, [0, 1], [0, reduce ? 0 : 360]);
  const percent = Math.round((lit / SPOKES) * 100);

  return (
    <span
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      title="Konark's wheels tell the time. This one tells you how far you've scrolled."
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center"
    >
      <svg viewBox="-16 -16 32 32" className="h-7 w-7" aria-hidden>
        <circle r="14.5" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        <circle r="11.5" fill="none" stroke="var(--line)" strokeWidth="1" />
        <motion.g style={{ rotate }}>
          {Array.from({ length: SPOKES }, (_, k) => {
            const a = (k * Math.PI * 2) / SPOKES - Math.PI / 2;
            const major = k % 2 === 0;
            const on = k < lit;
            return (
              <line
                key={k}
                x1={Math.cos(a) * 3.5}
                y1={Math.sin(a) * 3.5}
                x2={Math.cos(a) * 11.5}
                y2={Math.sin(a) * 11.5}
                stroke={on ? "var(--accent)" : "var(--muted)"}
                strokeOpacity={on ? 1 : 0.45}
                strokeWidth={major ? 2.2 : 0.9}
                strokeLinecap="round"
              />
            );
          })}
          <circle r="3.2" fill={lit === SPOKES ? "var(--accent)" : "var(--bg)"} stroke="var(--muted)" strokeWidth="1" />
        </motion.g>
      </svg>
    </span>
  );
}
