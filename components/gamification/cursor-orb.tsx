"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** A small liquid-glass orb that springs toward the cursor.
 *  Mounted by AchievementsProvider for ~30s after the Curious easter egg fires. */
export function CursorOrb() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 18, mass: 0.6 });

  React.useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="glass-strong pointer-events-none fixed top-0 left-0 z-[120] h-7 w-7 rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), rgba(124,92,255,0.25) 60%, transparent 75%)",
        boxShadow:
          "inset 0 1px 0 0 rgba(255,255,255,0.35), 0 0 24px -2px rgba(124,92,255,0.45)",
      }}
    />
  );
}
