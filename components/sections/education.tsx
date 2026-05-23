"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/sections/_heading";
import { certifications, education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="05 · Background"
          title="Education & certifications"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="flex h-full flex-col gap-6 p-7">
              <div className="flex items-center gap-3">
                <span className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl">
                  <GraduationCap className="h-4 w-4 text-white/85" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                  Education
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium text-white">{education.degree}</h3>
                <p className="text-sm text-white/65">{education.school}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="glass rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                    {education.period}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/70">
                    {education.detail}
                  </span>
                </div>
              </div>

              <div className="hairline" />

              <div className="flex flex-col gap-1.5 text-xs text-white/55">
                <span className="text-white/75">{education.prior.school}</span>
                <span>
                  {education.prior.period} · {education.prior.detail}
                </span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="flex h-full flex-col gap-6 p-7">
              <div className="flex items-center gap-3">
                <span className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl">
                  <Sparkles className="h-4 w-4 text-white/85" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                  Certifications
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {certifications.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="text-sm text-white/85">{c.name}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                      {c.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
