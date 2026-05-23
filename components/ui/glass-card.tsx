"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof React.JSX.IntrinsicElements;
  interactive?: boolean;
  strong?: boolean;
  glow?: boolean;
  children: React.ReactNode;
};

export function GlassCard({
  className,
  interactive = true,
  strong = false,
  glow = false,
  children,
  ...rest
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useTransform(py, [0, 1], [4, -4]);
  const ry = useTransform(px, [0, 1], [-4, 4]);
  const rxs = useSpring(rx, { stiffness: 120, damping: 18, mass: 0.4 });
  const rys = useSpring(ry, { stiffness: 120, damping: 18, mass: 0.4 });

  const highlightX = useTransform(px, (v) => `${v * 100}%`);
  const highlightY = useTransform(py, (v) => `${v * 100}%`);

  function handleMove(e: React.MouseEvent) {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={interactive ? { rotateX: rxs, rotateY: rys, transformPerspective: 800 } : undefined}
      className={cn(
        "relative overflow-hidden rounded-3xl",
        strong ? "glass-strong" : "glass",
        glow &&
          "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-gradient-to-br before:from-accent-a/20 before:via-accent-b/10 before:to-accent-c/20 before:blur-2xl",
        className
      )}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {/* Specular highlight that follows the cursor */}
      {interactive && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-px z-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(220px circle at ${highlightX.get()} ${highlightY.get()}, rgba(255,255,255,0.18), transparent 60%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
