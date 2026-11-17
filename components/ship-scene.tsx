"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FunFactShell, FunFactText } from "@/components/fun-fact-shell";

/** Deterministic star field so server and client agree and stars never jump. */
const STARS = Array.from({ length: 34 }, (_, i) => {
  const x = (i * 37.7) % 100;
  const y = (i * 23.3 + (i % 3) * 7) % 52;
  return { x, y, r: i % 5 === 0 ? 1.6 : 1, o: 0.35 + ((i * 13) % 50) / 100 };
});

/** One seamless wave tile, repeated twice so it can scroll -50% forever. */
function WaveLayer({
  className,
  opacity,
  amp,
  duration,
  reverse,
}: {
  className: string;
  opacity: number;
  amp: number;
  duration: number;
  reverse?: boolean;
}) {
  const crest = 40 - amp;
  const tile = `M0 40 Q 50 ${crest} 100 40 T 200 40 Q 250 ${crest} 300 40 T 400 40 V 120 H 0 Z`;
  return (
    <div className={`ship-scene__wave ${className}`} style={{ opacity }}>
      <svg
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
        className="ship-scene__wave-track"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
        aria-hidden
      >
        <path d={tile} fill="var(--accent)" />
        <path d={tile} transform="translate(400 0)" fill="var(--accent)" />
      </svg>
    </div>
  );
}

/**
 * The "ship" fun fact as a night-sea scene: a dark sky with a crescent moon
 * and stars, three layers of rolling lime waves, and a boita sailing between
 * them. Opening, the sky fades in and the tide rises; closing, it drains.
 */
export function ShipScene({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const titleId = React.useId();
  const t = (d: number) => (reduce ? 0 : d);

  return (
    <FunFactShell
      titleId={titleId}
      onClose={onClose}
      className="ship-scene"
      hint="Tap, click or press Esc to sail back"
      hintClassName="text-on-accent"
    >
      {/* Sky */}
      <div className="ship-scene__sky absolute inset-0" aria-hidden>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="ship-scene__star absolute rounded-full bg-fg"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.r * 2,
              height: s.r * 2,
              opacity: s.o,
              animationDelay: `${(i % 7) * 0.6}s`,
            }}
          />
        ))}
        <motion.svg
          viewBox="0 0 100 100"
          className="ship-scene__moon absolute"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: t(0.8), delay: t(0.2) }}
        >
          <defs>
            <mask id="crescent">
              <rect width="100" height="100" fill="white" />
              <circle cx="66" cy="38" r="40" fill="black" />
            </mask>
          </defs>
          <circle cx="50" cy="50" r="42" fill="var(--fg)" mask="url(#crescent)" />
        </motion.svg>
      </div>

      {/* Story, in the sky */}
      <FunFactText titleId={titleId} label="Fun fact · Bali Jatra" title="Shipping is an Odia tradition." className="h-[54%]">
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Kalinga sailors traded with Bali, Java and Sri Lanka centuries ago, and every Kartik Purnima (October or
          November) Odisha still celebrates <span className="text-fg">Bali Jatra</span> in their memory.
        </p>
        <p className="mt-4 font-mono text-sm text-accent">I just ship to app stores.</p>
      </FunFactText>

      {/* Sea: the tide rises in, drains out */}
      <motion.div
        className="ship-scene__sea absolute inset-x-0 bottom-0 h-[48%]"
        aria-hidden
        initial={{ y: reduce ? 0 : "100%" }}
        animate={{ y: 0 }}
        exit={{ y: reduce ? 0 : "100%", transition: { duration: t(0.5), ease: [0.65, 0, 0.35, 1] } }}
        transition={{ duration: t(0.9), ease: [0.22, 1, 0.36, 1] }}
      >
        <WaveLayer className="ship-scene__wave--back" opacity={0.18} amp={10} duration={14} reverse />
        <WaveLayer className="ship-scene__wave--mid" opacity={0.38} amp={14} duration={10} />
        <svg viewBox="0 0 70 56" className="ship-scene__boat" aria-hidden>
          <path d="M4 40 L66 40 L58 52 L12 52 Z" fill="var(--fg)" />
          <path d="M34 6 L34 40" stroke="var(--fg)" strokeWidth="3" />
          <path d="M20 12 L48 12 L46 34 L22 34 Z" fill="var(--accent)" />
          <path d="M34 6 L42 9 L34 11" fill="var(--fg)" />
        </svg>
        <WaveLayer className="ship-scene__wave--front" opacity={1} amp={12} duration={7} reverse />
      </motion.div>
    </FunFactShell>
  );
}
