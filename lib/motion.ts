"use client";

import * as React from "react";
import {
  motionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Scroll system                                                      */
/*  Every scene is driven by ONE progress value (0 → 1) for its        */
/*  chapter. Nothing runs on timers, so scrolling back reverses it and */
/*  nothing can drift out of sync.                                     */
/* ------------------------------------------------------------------ */

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Maps p in [a, b] to [0, 1], clamped. */
export const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function useMediaQuery(query: string): boolean {
  return React.useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Desktop gets pinned (sticky) chapters and the WebGL scene. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

const FINISHED = motionValue(1);

/**
 * Progress for one chapter.
 * - pinned (desktop): 0 when the section's top reaches the viewport top,
 *   1 when its bottom reaches the viewport bottom — the sticky content
 *   stays put in between.
 * - inline (mobile): animates as the section scrolls into view.
 * - reduced motion: always 1, so every scene shows its finished frame.
 */
export function useChapterProgress(
  ref: React.RefObject<HTMLElement | null>,
  pinned: boolean
): MotionValue<number> {
  const reduce = useReducedMotion();
  const pinnedScroll = useScroll({ target: ref, offset: ["start start", "end end"] });
  const inlineScroll = useScroll({ target: ref, offset: ["start 0.85", "center 0.4"] });
  if (reduce) return FINISHED;
  return pinned ? pinnedScroll.scrollYProgress : inlineScroll.scrollYProgress;
}

/** Subscribes a component to a motion value and returns its current number. */
export function useMotionNumber(mv: MotionValue<number>): number {
  const [value, setValue] = React.useState(() => mv.get());
  useMotionValueEvent(mv, "change", setValue);
  // When the motion value object itself changes (e.g. desktop ↔ mobile),
  // the next "change" event resyncs; read it directly meanwhile.
  return mv === FINISHED ? 1 : value;
}

export type SceneProps = { progress: MotionValue<number> };
