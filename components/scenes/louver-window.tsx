"use client";

import { seg, useMotionNumber, type SceneProps } from "@/lib/motion";

const SLATS = 16;
const DEALERS = 120;
const LOUVERLINE_RED = "#C0302F";

/**
 * Blinds open inside a contained window (never over the text), fade away,
 * then 120 dealer dots light up and the counters tick. Louverline red is
 * the single brand nod: the slats and a thin bar on the window's edge.
 */
export function LouverWindow({ progress }: SceneProps) {
  const p = useMotionNumber(progress);
  const k = seg(p, 0.4, 0.85);
  const lit = Math.round(k * DEALERS);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-6" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: LOUVERLINE_RED }} />
      <p className="mb-4 font-mono text-[11px] text-muted">mylouverline.com · dealers online</p>
      <div className="mx-auto grid max-w-[340px] grid-cols-12 gap-2.5">
        {Array.from({ length: DEALERS }, (_, i) => (
          <span
            key={i}
            className="aspect-square rounded-full transition-colors duration-200"
            style={{ background: i < lit ? "var(--muted)" : "var(--line)" }}
          />
        ))}
      </div>
      <div className="mt-6 flex gap-8">
        <Stat value={Math.round(k * 12)} suffix="" label="hours saved / week" />
        <Stat value={Math.round(k * 30)} suffix="%" label="faster processing" />
        <Stat value={lit} suffix="" label="dealers" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col gap-0.5 [perspective:700px]" style={{ opacity: 1 - seg(p, 0.42, 0.54) }}>
        {Array.from({ length: SLATS }, (_, n) => (
          <span
            key={n}
            className="flex-1"
            style={{
              background: LOUVERLINE_RED,
              transform: `rotateX(${seg(p - n * 0.012, 0, 0.35) * 84}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div>
      <p className="display text-4xl text-fg">
        {value}
        {suffix}
      </p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
