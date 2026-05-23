"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/sections/_heading";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="02 · Career"
          title="Where I've been building"
          description="A few of the teams I've shipped product with."
        />

        <ol className="relative mt-12 flex flex-col gap-6">
          {experience.map((role, i) => (
            <motion.li
              key={`${role.company}-${role.start}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassCard className="p-6 sm:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="glass mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                        <Briefcase className="h-4 w-4 text-white/80" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-medium text-white">
                          {role.role}
                          <span className="text-white/55"> · {role.company}</span>
                        </h3>
                        <p className="text-xs text-white/50">{role.location}</p>
                      </div>
                    </div>
                    <span className="glass shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
                      {role.start} — {role.end}
                    </span>
                  </div>

                  <ul className="ml-2 flex flex-col gap-2 text-sm leading-relaxed text-white/75 sm:ml-14">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="ml-2 flex flex-wrap gap-1.5 sm:ml-14">
                    {role.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
