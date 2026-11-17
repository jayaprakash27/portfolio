"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FunFactShell, FunFactText } from "@/components/fun-fact-shell";
import { profile } from "@/lib/data";

const BAKE_MS = 3200; // the whole night, compressed
const START_MIN = 23 * 60; // 11:00 PM
const NIGHT_MIN = 7 * 60; // → 6:00 AM
const CARAMEL = "#B07A3B";

function clockLabel(min: number) {
  const m = Math.round(min) % (24 * 60);
  const h24 = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${mm} ${h24 < 12 ? "AM" : "PM"}`;
}

/**
 * The chhena poda fun fact as "the overnight bake": a clock runs from
 * 11:00 PM to 6:00 AM while a chhena poda on a sal leaf bakes, its top going
 * from pale chhena to caramel, and steam rises once it's done.
 */
export function ChhenaScene({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const titleId = React.useId();
  const [p, setP] = React.useState(reduce ? 1 : 0); // bake progress 0 → 1
  const t = (d: number) => (reduce ? 0 : d);

  React.useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let start = 0;
    const delay = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const k = Math.min(1, (now - start) / BAKE_MS);
        setP(k);
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 700); // let the entrance finish first
    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const baked = p >= 1;
  // Real chhena poda browns all over: the top darkest, the sides a little lighter.
  const crust = `color-mix(in srgb, ${CARAMEL} ${Math.round(p * 100)}%, var(--fg))`;
  const side = `color-mix(in srgb, ${CARAMEL} ${Math.round(p * 62)}%, var(--fg))`;

  return (
    <FunFactShell titleId={titleId} onClose={onClose} className="chhena-scene">
      <FunFactText
        titleId={titleId}
        label="Fun fact · Chhena poda"
        title={`Chhena poda was born in ${profile.hometown}.`}
        className="h-[52%]"
      >
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          The usual story: in the 1950s a confectioner named Sudarshan Sahoo left sweetened chhena in a still-warm
          oven overnight, and by morning it had baked.{" "}
          <span className="text-fg">The best bug-turned-feature in Odisha&apos;s history.</span>
        </p>
        <p className="mt-4 font-mono text-sm text-accent">Same surname. No relation, as far as I know.</p>
      </FunFactText>

      {/* The bake */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex h-[48%] flex-col items-center justify-center gap-5 pb-12"
        aria-hidden
        initial={{ opacity: 0, y: reduce ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : 40, transition: { duration: t(0.4) } }}
        transition={{ duration: t(0.8), delay: t(0.25), ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 300 200" className="chhena-scene__cake">
          {/* steam, once baked */}
          <g className={baked ? "chhena-scene__steam is-on" : "chhena-scene__steam"}>
            {[118, 150, 182].map((x, i) => (
              <path
                key={x}
                d={`M${x} 78 C ${x - 10} 64, ${x + 10} 52, ${x} 36`}
                fill="none"
                stroke="var(--fg)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ animationDelay: `${i * 0.45}s` }}
              />
            ))}
          </g>
          {/* sal leaf */}
          <path d="M18 156 Q150 100 282 156 Q150 214 18 156 Z" fill="var(--accent)" />
          <path d="M18 156 L282 156" stroke="var(--bg)" strokeOpacity="0.35" strokeWidth="2" />
          {[70, 110, 190, 230].map((x) => (
            <path key={x} d={`M${x} 156 L${x + 18} ${x < 150 ? 140 : 172}`} stroke="var(--bg)" strokeOpacity="0.25" strokeWidth="1.5" />
          ))}
          {/* cake body */}
          <path d="M70 98 V140 A80 16 0 0 0 230 140 V98 Z" fill={side} />
          {/* caramel edge where the top meets the side */}
          <path d="M70 98 V106 A80 16 0 0 0 230 106 V98 Z" fill={crust} opacity="0.75" />
          {/* top crust */}
          <ellipse cx="150" cy="98" rx="80" ry="16" fill={crust} />
          {/* a few cardamom flecks */}
          {[
            [128, 96],
            [162, 101],
            [176, 94],
            [140, 103],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="var(--bg)" opacity={0.25 + p * 0.3} />
          ))}
        </svg>

        <p className="font-mono text-sm text-fg">
          <span className="tabular-nums">{clockLabel(START_MIN + p * NIGHT_MIN)}</span>
          <span className="text-muted"> · {baked ? <span className="text-accent">baked.</span> : "oven still warm"}</span>
        </p>
      </motion.div>
    </FunFactShell>
  );
}
