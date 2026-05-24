"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { MeshGradient } from "@/components/ui/mesh-gradient";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedText } from "@/components/ui/animated-text";
import { profile } from "@/lib/data";
import { useAchievements } from "@/components/gamification/achievements-provider";

export function Hero() {
  const [imgOk, setImgOk] = React.useState(true);
  const { unlock } = useAchievements();
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-32 pb-20"
    >
      <MeshGradient />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
        {/* Left: type */}
        <div className="flex flex-col items-start gap-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/80"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            open to interesting work
          </motion.div>

          <div className="flex flex-col gap-2">
            <AnimatedText
              as="h1"
              text="Jayaprakash Sahoo"
              className="text-gradient text-[clamp(2.6rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            />
            <AnimatedText
              as="h2"
              text={profile.tagline}
              delay={0.2}
              stagger={0.025}
              className="text-gradient-accent max-w-2xl text-[clamp(1.05rem,2.5vw,1.5rem)] font-medium leading-tight"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-xl text-base leading-relaxed text-white/65"
          >
            Mostly TypeScript. Next.js for web, React Native + Expo on mobile,
            Vercel for deploys. Work remote, ship async, and yeah — I&apos;ve burned
            a Saturday on an easing curve before.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contact">
              Let&apos;s ship something
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              href={profile.resumeUrl}
              variant="ghost"
              target="_blank"
              onClick={() => unlock("bookworm")}
            >
              Grab the résumé
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/55"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Next.js · React · React Native
            </span>
          </motion.div>
        </div>

        {/* Right: glass-framed portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] glass-strong p-2">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
              {/* Fallback monogram — shows until /public/headshot.jpg is added */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-a/30 via-accent-b/20 to-accent-c/30">
                <span className="select-none text-[10rem] font-semibold tracking-tighter text-white/80">
                  JS
                </span>
              </div>
              {imgOk && (
                // Plain <img> avoids next/image 404 noise when the file is missing.
                // Alt is empty so the broken-image text doesn't leak before onError fires;
                // the monogram fallback already serves as a decorative portrait.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/headshot.jpg"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 [&.loaded]:opacity-100"
                  onLoad={(e) => e.currentTarget.classList.add("loaded")}
                  onError={() => setImgOk(false)}
                />
              )}
              {/* Reflective overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.18) 0%, transparent 35%), linear-gradient(20deg, rgba(0,0,0,0.20) 0%, transparent 50%)",
                }}
              />
            </div>
          </div>
          {/* Floating chips */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-6 top-10 hidden rounded-2xl px-3 py-2 text-xs text-white/85 sm:block"
          >
            <span className="font-mono">$ pnpm dlx vibe</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -right-4 bottom-12 hidden rounded-2xl px-3 py-2 text-xs text-white/85 sm:block"
          >
            ✦ shipped with Next.js 16
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
