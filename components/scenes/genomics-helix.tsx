"use client";

import * as React from "react";
import { Lock, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeInOut, lerp, seg, useMotionNumber, type SceneProps } from "@/lib/motion";

/** The strands are drawn from exactly the number in the headline. */
const PARTICLES = 1378;
const RUNGS = 20;
const TURNS = 2.3;
/** Base pairs that light up as variant matches; the callout points at the last. */
const LIT = [4, 9, 15];
const CALLOUT_RUNG = 15;
const QUERY = "BRCA2 · c.5946delT";

type Particle = { t: number; strand: 0 | 1; dx: number; dy: number; size: number; sx: number; sy: number };

/** Deterministic PRNG so server and client agree and the dust never reshuffles. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Roughly normal jitter (sum of uniforms) so the dust is dense at the strand and frays at the edges. */
const gauss = (rnd: () => number) => (rnd() + rnd() + rnd() - 1.5) / 1.5;

const particles: Particle[] = (() => {
  const rnd = mulberry32(1378);
  return Array.from({ length: PARTICLES }, (_, i) => ({
    t: rnd(),
    strand: (i % 2) as 0 | 1,
    dx: gauss(rnd),
    dy: gauss(rnd),
    size: 0.7 + rnd() * 1.3,
    sx: rnd() * 2 - 1,
    sy: rnd() * 2 - 1,
  }));
})();

/**
 * The Saudi Genomics Platform as a DNA ladder: two dusty strands (1,378
 * particles), soft base-pair rungs that foreshorten as the helix turns with
 * scroll, a few rungs glowing lime as variant matches, and a callout that
 * follows one of them. Search bar and 2FA lock carry the product story.
 * One <canvas> keeps it smooth on phones.
 */
export function GenomicsHelix({ progress }: SceneProps) {
  const p = useMotionNumber(progress);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const calloutRef = React.useRef<HTMLDivElement>(null);
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
    const rungsIn = seg(form, 0.55, 1);
    const glow = seg(p, 0.6, 0.75);
    const rot = p * Math.PI * 2.2;

    // Leave room on the right for the callout.
    const cx = size.w * 0.36;
    const radius = Math.min(size.w * 0.26, 118);
    const top = size.h * 0.17; // below the search bar
    const span = size.h * 0.76;
    const angleAt = (t: number) => t * TURNS * Math.PI * 2 + rot;

    const drawParticles = (front: boolean) => {
      ctx.fillStyle = fg;
      for (const d of particles) {
        const a = angleAt(d.t) + d.strand * Math.PI;
        const z = Math.sin(a);
        if (front !== z >= 0) continue;
        const hx = cx + Math.cos(a) * radius + d.dx * 11;
        const hy = top + d.t * span + d.dy * 11;
        const x = lerp(cx + d.sx * size.w * 0.48, hx, form);
        const y = lerp(size.h / 2 + d.sy * size.h * 0.48, hy, form);
        ctx.globalAlpha = lerp(0.45, 0.3 + 0.6 * ((z + 1) / 2), form);
        ctx.fillRect(x, y, d.size, d.size);
      }
    };

    const rung = (i: number) => {
      const t = 0.03 + (i / (RUNGS - 1)) * 0.94;
      const a = angleAt(t);
      const y = top + t * span;
      const tilt = Math.sin(a) * 7;
      return {
        x1: cx + Math.cos(a) * radius * 0.86,
        y1: y - tilt,
        x2: cx - Math.cos(a) * radius * 0.86,
        y2: y + tilt,
        y,
      };
    };

    drawParticles(false);

    // Base pairs
    if (rungsIn > 0) {
      ctx.lineCap = "round";
      for (let i = 0; i < RUNGS; i++) {
        const r = rung(i);
        const lit = LIT.includes(i);
        ctx.globalAlpha = rungsIn * (lit ? lerp(0.22, 1, glow) : 0.2 * (1 - 0.35 * glow));
        ctx.strokeStyle = lit && glow > 0 ? accent : fg;
        ctx.lineWidth = lit ? lerp(5, 7, glow) : 5;
        if (lit && glow > 0) {
          ctx.shadowColor = accent;
          ctx.shadowBlur = 16 * glow;
        }
        ctx.beginPath();
        ctx.moveTo(r.x1, r.y1);
        ctx.lineTo(r.x2, r.y2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    drawParticles(true);
    ctx.globalAlpha = 1;

    // Callout follows the right end of its rung as the helix turns.
    const c = calloutRef.current;
    if (c) {
      const r = rung(CALLOUT_RUNG);
      const x = Math.max(r.x1, r.x2);
      const y = r.x1 > r.x2 ? r.y1 : r.y2;
      c.style.transform = `translate(${x}px, ${y}px)`;
      c.style.setProperty("--room", `${Math.max(120, size.w - x - 44)}px`);
    }
  }, [p, size]);

  const typed = Math.round(seg(p, 0.35, 0.55) * QUERY.length);
  const showCallout = p > 0.68;
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

      {/* Callout: dot on the rung, a leader line, then the label. */}
      <div
        ref={calloutRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 transition-opacity duration-300",
          showCallout ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_3px_var(--card)]" />
        <span className="absolute left-1.5 top-0 h-px w-7 bg-accent" />
        <span className="absolute left-9 top-0 block w-max max-w-[var(--room)] -translate-y-1/2 whitespace-nowrap rounded-xl border border-line bg-bg/90 px-3 py-2">
          <span className="block text-xs font-medium text-fg">Genetic variant</span>
          <span className="block font-mono text-[10px] text-muted">12 matches · 1,378 exomes</span>
        </span>
      </div>
    </div>
  );
}
