"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading } from "@/components/sections/_heading";
import { projects, screenshotFor, type Project } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="04 · Work"
          title="Selected projects"
          description="Personal builds — small, focused experiments I shipped on the side."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href ?? "#"}
              target={p.href && p.href !== "#" ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group block"
            >
              <GlassCard className="relative h-full overflow-hidden p-0">
                <ProjectPreview project={p} />

                <div className="flex flex-col gap-4 p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-medium text-white">{p.name}</h3>
                      <p className="text-sm text-white/55">{p.blurb}</p>
                    </div>
                    <span className="glass inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/75">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.stack.map((s) => (
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ project: p }: { project: Project }) {
  const screenshotUrl = p.preview ?? screenshotFor(p.href);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgFailed, setImgFailed] = React.useState(false);
  const showImage = screenshotUrl && !imgFailed;

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${p.accent}`}
    >
      {/* Live/local screenshot — loaded async, fades in on success */}
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={screenshotUrl}
          alt=""
          aria-hidden
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ${
            imgLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
          } group-hover:scale-[1.03]`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgFailed(true)}
        />
      )}

      {/* Accent gradient + radial spotlight tint — preserves the brand color
          even when a screenshot is present, and serves as the fallback look. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${p.accent} mix-blend-overlay`}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 35%, rgba(255,255,255,0.18), transparent 65%)",
        }}
      />

      {/* Darkening overlay — stronger at bottom for project-name legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Project name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[clamp(3.2rem,8vw,6rem)] font-semibold leading-none tracking-[-0.05em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          {p.name}
        </span>
      </div>
    </div>
  );
}
