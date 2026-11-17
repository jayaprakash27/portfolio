"use client";

import * as React from "react";
import { Lock, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeInOut, lerp, seg, useMotionNumber, type SceneProps } from "@/lib/motion";

/** Exactly the number in the headline: one dot per exome. */
const DOTS = 1378;
const QUERY = "BRCA2 · c.5946delT";

type Dot = { t: number; strand: number; sx: number; sy: number; jitter: number; lit: boolean };

/** Deterministic PRNG so server and client agree and the cloud never reshuffles. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeDots(): Dot[] {
  const rnd = mulberry32(1378);
  const lit = new Set<number>();
  while (lit.size < 12) lit.add(Math.floor(rnd() * DOTS));
  return Array.from({ length: DOTS }, (_, i) => ({
    t: Math.floor(i / 2) / (DOTS / 2),
    strand: i % 2,
    sx: rnd() * 2 - 1,
    sy: rnd() * 2 - 1,
    jitter: rnd(),
    lit: lit.has(i),
  }));
}

const dots = makeDots();

/**
 * 1,378 dots drift into a double helix, a variant search types out, a
 * dozen dots light up as matches, and a lock snaps on for the security beat.
 * One <canvas>: 1,378 DOM nodes would not stay smooth on a phone.
 */
export function GenomicsHelix({ progress }: SceneProps) {
  const p = useMotionNumber(progress);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });

  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size.w, size.h);

    const css = getComputedStyle(document.documentElement);
    const fg = css.getPropertyValue("--fg").trim() || "#f2eee6";
    const accent = css.getPropertyValue("--accent").trim() || "#c6f432";

    const form = easeInOut(seg(p, 0, 0.35));
    const glow = seg(p, 0.6, 0.75);
    const rot = p * Math.PI * 3;
    const cx = size.w / 2;
    const cy = size.h / 2;
    const radius = Math.min(size.w * 0.3, 120);
    const span = size.h * 0.86;

    for (const d of dots) {
      const angle = d.t * Math.PI * 7 + d.strand * Math.PI + rot;
      const z = Math.sin(angle);
      const hx = cx + Math.cos(angle) * radius * (0.92 + d.jitter * 0.16);
      const hy = cy + (d.t - 0.5) * span;
      const x = lerp(cx + d.sx * size.w * 0.48, hx, form);
      const y = lerp(cy + d.sy * size.h * 0.48, hy, form);
      const depth = lerp(0.6, (z + 1) / 2, form);

      if (d.lit && glow > 0) {
        ctx.globalAlpha = 0.35 + 0.65 * glow;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(x, y, 1.6 + 2.4 * glow, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.globalAlpha = (0.18 + 0.6 * depth) * (1 - 0.55 * glow);
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(x, y, 0.9 + 1.1 * depth, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }, [p, size]);

  const typed = Math.round(seg(p, 0.35, 0.55) * QUERY.length);
  const showResults = p > 0.62;
  const locked = p > 0.84;

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-3xl border border-line bg-card">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="absolute inset-x-4 top-4 flex items-center gap-2 rounded-full border border-line bg-bg/90 px-4 py-2.5 font-mono text-xs text-fg">
        <Search className="h-3.5 w-3.5 text-muted" aria-hidden />
        <span className="truncate">
          {QUERY.slice(0, typed)}
          {typed < QUERY.length && p > 0.35 && <span className="animate-pulse">▍</span>}
          {typed === 0 && <span className="text-muted">Search variants</span>}
        </span>
        <span
          className={cn(
            "ms-auto inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] transition-all duration-300",
            locked ? "scale-100 bg-accent text-on-accent opacity-100" : "scale-75 opacity-0"
          )}
        >
          <Lock className="h-3 w-3" aria-hidden /> 2FA
        </span>
      </div>
      <div
        className={cn(
          "absolute inset-x-4 bottom-4 flex justify-between rounded-2xl border border-line bg-bg/90 px-4 py-3 font-mono text-xs transition-opacity duration-300",
          showResults ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-accent">12 matches</span>
        <span className="text-muted">across 1,378 exomes</span>
      </div>
    </div>
  );
}
