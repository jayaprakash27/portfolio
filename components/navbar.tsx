"use client";

import * as React from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, profile } from "@/lib/data";
import { useAchievements } from "@/components/gamification/achievements-provider";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  const { unlock } = useAchievements();

  // Triple-click on the JS monogram — fires Curious + spawns cursor orb.
  const tripleClickRef = React.useRef<{ count: number; timer: number | null }>({
    count: 0,
    timer: null,
  });
  const handleMonogramClick = React.useCallback(() => {
    const state = tripleClickRef.current;
    state.count += 1;
    if (state.timer) window.clearTimeout(state.timer);
    state.timer = window.setTimeout(() => {
      state.count = 0;
      state.timer = null;
    }, 600);
    if (state.count >= 3) {
      state.count = 0;
      unlock("curious");
      window.dispatchEvent(new CustomEvent("ach:cursor-orb-on"));
    }
  }, [unlock]);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500",
          scrolled
            ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
            : "border border-white/[0.06] bg-white/[0.02] backdrop-blur-md"
        )}
      >
        <Link
          href="#top"
          className="flex items-center gap-2 pl-2 text-sm font-medium tracking-tight"
        >
          <span
            onClick={handleMonogramClick}
            className="relative inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-accent-a via-accent-b to-accent-c text-[10px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform active:scale-90"
            aria-label="JS monogram (try triple-clicking)"
          >
            JS
          </span>
          <span className="hidden sm:inline text-white/90">Jayaprakash</span>
        </Link>

        <LiquidNavLinks />

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-white/90 md:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="glass-strong fixed inset-x-4 top-20 z-40 rounded-3xl p-2 md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl px-4 py-3 text-sm text-white/85 hover:bg-white/[0.06]"
              >
                Resume ↗
              </a>
            </li>
          </ul>
        </motion.div>
      )}

      {/* Hidden SVG: the gooey filter that makes the nav pill blob-merge
          between items during hover transitions. Apply via filter:url(#…). */}
      <svg
        aria-hidden
        className="pointer-events-none absolute h-0 w-0"
        focusable="false"
      >
        <defs>
          <filter id="nav-liquid-goo" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </header>
  );
}

/** Water-droplet glass styling for the nav pills. The base alpha stays high
 *  enough (>~0.5) to survive the gooey filter's alpha threshold, while the
 *  layered inset shadows give it the dewdrop catch-light + bottom-depth. */
const DROPLET_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(160deg, rgba(255,255,255,0.88) 0%, rgba(232,238,255,0.62) 55%, rgba(210,222,245,0.55) 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 6px 12px -4px rgba(255,255,255,0.5), inset 0 -3px 7px -2px rgba(30,40,80,0.18), inset 1px 0 2px -1px rgba(255,255,255,0.6), inset -1px 0 2px -1px rgba(180,200,240,0.5)",
};

/** Desktop nav links with an iOS-Liquid-Glass-style hover pill that pinches
 *  and stretches between items like a droplet. Implementation:
 *
 *  - One "active" pill that springs its `x` + `width` to the hovered item.
 *  - When hover moves, a short-lived "trail" pill stays at the previous item
 *    and shrinks + fades out.
 *  - Both pills live inside a layer with `filter: url(#nav-liquid-goo)`, so
 *    their soft-blurred edges merge into one liquid shape mid-transition.
 *  - Text labels live in a sibling layer (no filter) so they stay crisp. */
function LiquidNavLinks() {
  const [active, setActive] = React.useState<number | null>(null);
  const [trail, setTrail] = React.useState<
    | { idx: number; key: number; x: number; y: number; w: number; h: number }
    | null
  >(null);
  const trailTimerRef = React.useRef<number | null>(null);
  const itemRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  // Bumped to force a re-measure once refs are populated.
  const [, force] = React.useState({});
  React.useLayoutEffect(() => {
    force({});
  }, []);

  function rectFor(idx: number | null) {
    if (idx === null) return null;
    const el = itemRefs.current[idx];
    if (!el) return null;
    return { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
  }

  function onEnter(idx: number) {
    setActive((prev) => {
      if (prev === idx) return prev;
      if (prev !== null) {
        const r = rectFor(prev);
        if (r) {
          setTrail({ idx: prev, key: Date.now(), ...r });
          if (trailTimerRef.current) window.clearTimeout(trailTimerRef.current);
          trailTimerRef.current = window.setTimeout(() => setTrail(null), 320);
        }
      }
      return idx;
    });
  }

  function onLeave() {
    setActive(null);
    if (trailTimerRef.current) {
      window.clearTimeout(trailTimerRef.current);
      trailTimerRef.current = null;
    }
    setTrail(null);
  }

  React.useEffect(() => {
    return () => {
      if (trailTimerRef.current) window.clearTimeout(trailTimerRef.current);
    };
  }, []);

  const activeRect = rectFor(active);

  return (
    <ul
      className="relative hidden items-center gap-1 md:flex"
      onMouseLeave={onLeave}
    >
      {/* Liquid pill layer — gooey filter makes the two pills blob-merge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ filter: "url(#nav-liquid-goo)" }}
      >
        {/* Trailing pill — sits at the previous item and fades + shrinks */}
        <AnimatePresence>
          {trail && (
            <motion.span
              key={`trail-${trail.key}`}
              initial={{ opacity: 0.9, scaleX: 1 }}
              animate={{ opacity: 0, scaleX: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute rounded-full"
              style={{
                left: trail.x,
                top: trail.y,
                width: trail.w,
                height: trail.h,
                transformOrigin: "50% 50%",
                ...DROPLET_STYLE,
              }}
            />
          )}
        </AnimatePresence>

        {/* Active pill — springs its position/size to the hovered item */}
        <AnimatePresence>
          {activeRect && (
            <motion.span
              key="active-pill"
              initial={{ opacity: 0, scaleX: 0.45 }}
              animate={{
                opacity: 1,
                scaleX: 1,
                x: activeRect.x,
                width: activeRect.w,
              }}
              exit={{ opacity: 0, scaleX: 0.45 }}
              transition={{
                opacity: { duration: 0.15 },
                scaleX: { type: "spring", stiffness: 420, damping: 28 },
                x: { type: "spring", stiffness: 380, damping: 30, mass: 0.6 },
                width: { type: "spring", stiffness: 380, damping: 30, mass: 0.6 },
              }}
              className="absolute left-0 rounded-full"
              style={{
                top: activeRect.y,
                height: activeRect.h,
                transformOrigin: "50% 50%",
                ...DROPLET_STYLE,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Text layer — crisp, sits above the pill */}
      {navLinks.map((l, i) => (
        <li
          key={l.href}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          onMouseEnter={() => onEnter(i)}
          className="relative z-10"
        >
          <Link
            href={l.href}
            className={cn(
              "block rounded-full px-3 py-1.5 text-sm transition-colors duration-200",
              active === i ? "text-zinc-900" : "text-white/70 hover:text-white",
            )}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
