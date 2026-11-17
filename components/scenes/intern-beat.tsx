"use client";

import { seg, useMotionNumber, type SceneProps } from "@/lib/motion";

/** "Software Engineer Intern" — the word Intern gets struck through and leaves. */
export function InternBeat({ progress }: SceneProps) {
  const p = useMotionNumber(progress);
  const strike = seg(p, 0.15, 0.45);
  const leave = seg(p, 0.5, 0.8);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-line bg-card p-8" aria-hidden>
      <span className="font-mono text-xs text-muted">Job title · {leave > 0.5 ? "Nov 2024" : "May 2024"}</span>
      <p className="display text-[clamp(2.5rem,5vw,4rem)] text-fg">
        Software Engineer{" "}
        <span
          className="relative inline-block text-muted"
          style={{ transform: `translateX(${leave * 60}px)`, opacity: 1 - leave }}
        >
          Intern
          <span
            className="absolute left-0 top-1/2 h-[0.12em] -translate-y-1/2 bg-accent"
            style={{ width: `${strike * 100}%` }}
          />
        </span>
      </p>
    </div>
  );
}
