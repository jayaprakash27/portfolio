"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Atom } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/sections/_heading";
import { skills } from "@/lib/data";

const groupMeta: Record<keyof typeof skills, { icon: React.ReactNode; tone: string }> = {
  Development: {
    icon: <Atom className="h-4 w-4" />,
    tone: "from-violet-400/30 to-cyan-400/20",
  },
  Languages: {
    icon: <Code2 className="h-4 w-4" />,
    tone: "from-cyan-400/30 to-pink-400/20",
  },
  Tools: {
    icon: <Cpu className="h-4 w-4" />,
    tone: "from-pink-400/30 to-violet-400/20",
  },
};

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="03 · Toolbelt"
          title="Daily drivers"
          description="What I actually open every day — heavy on the web platform, React, and pragmatic backends."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {(Object.keys(skills) as Array<keyof typeof skills>).map((group, gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
            >
              <GlassCard className="relative h-full overflow-hidden p-6">
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-gradient-to-br ${groupMeta[group].tone} blur-3xl`}
                />
                <div className="relative flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="glass inline-flex h-8 w-8 items-center justify-center rounded-xl text-white/85">
                        {groupMeta[group].icon}
                      </span>
                      <h3 className="text-base font-medium text-white/90">{group}</h3>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      {skills[group].length} items
                    </span>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {skills[group].map((s) => (
                      <li
                        key={s}
                        className="group relative inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
