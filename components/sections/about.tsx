"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedText } from "@/components/ui/animated-text";
import { about } from "@/lib/data";
import { SectionHeading } from "@/components/sections/_heading";

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="01 · About" title="A few words" />

        <div className="mt-10 grid gap-6 md:grid-cols-[1.6fr_1fr]">
          <GlassCard className="p-8 sm:p-10">
            <AnimatedText
              text={about.body}
              className="text-[clamp(1.05rem,2vw,1.35rem)] leading-relaxed text-white/85"
            />
          </GlassCard>

          <div className="grid grid-cols-2 gap-4">
            {about.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassCard className="flex h-full flex-col justify-between gap-4 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {h.label}
                  </span>
                  <span className="text-lg font-medium text-white/90">{h.value}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
