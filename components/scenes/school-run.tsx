"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeInOut, lerp, seg, useIsDesktop, useMotionNumber, type SceneProps } from "@/lib/motion";

/** PiggyRide's one brand nod: the cyan stripe on the cab. */
export const PIGGY_CYAN = "#22E1E6";

/** Shared timeline so the 3D and 2D cuts tell the same story. */
export const timeline = {
  route: (p: number) => easeInOut(seg(p, 0.12, 0.3)),
  car: (p: number) => easeInOut(seg(p, 0.3, 0.85)),
  morning: (p: number) => seg(p, 0.1, 0.9),
};

const TOASTS = [
  { at: 0.15, text: "Driver arrived · 7:32" },
  { at: 0.45, text: "Picked up · on the way" },
  { at: 0.86, text: "Arrived at school · 7:58 ✓" },
];

// Three.js only loads on desktop, only when this chapter is near the screen.
const SchoolRun3D = dynamic(() => import("./school-run-3d"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse bg-card" />,
});

/**
 * The school run, from the parent's tracking view: dawn map, route draws
 * home → school, the cab drives it, the sky warms, and tracking
 * notifications land as it goes.
 */
export function SchoolRun({ progress }: SceneProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "100% 0px" });
  const desktop = useIsDesktop();
  const p = useMotionNumber(progress);
  const morning = timeline.morning(p);
  const shown = TOASTS.filter((t) => p >= t.at);

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-3xl border border-line"
      style={{ background: skyColor(morning) }}
    >
      {desktop ? near && <SchoolRun3D progress={progress} /> : <SchoolRun2D p={p} />}

      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-col gap-2" aria-live="polite">
        {shown.slice(-2).map((t, i, arr) => (
          <div
            key={t.text}
            className={cn(
              "flex items-center gap-2 rounded-2xl border border-line bg-bg/90 px-3 py-2 text-xs text-fg backdrop-blur-sm transition-opacity",
              i < arr.length - 1 && "opacity-50"
            )}
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10px] font-bold text-bg" style={{ background: PIGGY_CYAN }}>
              P
            </span>
            <span className="font-mono text-[10px] text-muted">PiggyRide</span>
            <span className="truncate">{t.text}</span>
          </div>
        ))}
      </div>
      <p className="absolute left-4 top-3 rounded-full bg-bg/80 px-2 py-0.5 font-mono text-[10px] text-muted">
        {morning < 0.5 ? "dawn" : "morning"} · live tracking
      </p>
    </div>
  );
}

/** Dawn indigo → warm morning. */
export function skyColor(t: number) {
  const from = [34, 30, 58];
  const to = [196, 150, 112];
  const c = from.map((f, i) => Math.round(lerp(f, to[i], t)));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

/* ------------------------------------------------------------------ */
/*  2D cut for phones: SVG route + flat cab moving along the path      */
/* ------------------------------------------------------------------ */

const ROUTE = "M 52 330 C 52 250, 140 260, 150 200 S 250 150, 240 110 S 300 70, 300 52";

function SchoolRun2D({ p }: { p: number }) {
  const pathRef = React.useRef<SVGPathElement>(null);
  const [car, setCar] = React.useState({ x: 52, y: 330, a: -90 });
  const routeT = timeline.route(p);
  const carT = timeline.car(p);

  React.useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const at = path.getPointAtLength(carT * len);
    const ahead = path.getPointAtLength(Math.min(len, carT * len + 1));
    const a = (Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI;
    setCar({ x: at.x, y: at.y, a });
  }, [carT]);

  return (
    <svg viewBox="0 0 360 450" className="absolute inset-0 h-full w-full" aria-hidden>
      {[...Array(9)].map((_, i) => (
        <rect key={i} x={(i % 3) * 120 + 18} y={Math.floor(i / 3) * 140 + 40} width="84" height="96" rx="10" fill="rgb(0 0 0 / 0.18)" />
      ))}
      <path d={ROUTE} fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth="14" strokeLinecap="round" />
      <path
        ref={pathRef}
        d={ROUTE}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={1 - routeT}
      />
      <g transform="translate(52 330)">
        <circle r="14" fill="var(--bg)" />
        <text y="5" textAnchor="middle" fontSize="13">🏠</text>
      </g>
      <g transform="translate(300 52)">
        <circle r="16" fill={carT >= 1 ? "var(--accent)" : "var(--bg)"} />
        <text y="5" textAnchor="middle" fontSize="14">{carT >= 1 ? "✓" : "🏫"}</text>
      </g>
      <g transform={`translate(${car.x} ${car.y}) rotate(${car.a})`} opacity={p > 0.12 ? 1 : 0}>
        <rect x="-15" y="-9" width="30" height="18" rx="7" fill="#f2eee6" />
        <rect x="-15" y="-2" width="30" height="4" fill={PIGGY_CYAN} />
        <rect x="2" y="-7" width="9" height="14" rx="3" fill="#0e0e10" opacity="0.8" />
      </g>
    </svg>
  );
}
