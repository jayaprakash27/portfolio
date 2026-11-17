import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";

/** Side projects: card-sized, each with one small hover touch. */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-16 border-t border-line px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Side projects</span>
        <h2 id="projects-title" className="display mt-4 text-[clamp(3rem,7vw,6.5rem)] text-fg">
          Things I built anyway.
        </h2>
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <li key={p.name} className="min-w-0">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const external = !!p.href && p.href !== "#";
  return (
    <a
      href={external ? p.href : undefined}
      target={external ? "_blank" : undefined}
      rel="noreferrer"
      className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-line bg-card p-6 transition-colors hover:border-accent"
    >
      <div className="relative h-28 overflow-hidden rounded-2xl border border-line bg-bg" aria-hidden>
        <HoverTouch name={p.name} />
      </div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="display text-4xl text-fg">{p.name}</h3>
        {external && <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />}
      </div>
      <p className="text-sm text-muted">{p.blurb}</p>
      {p.quip && <p className="text-sm text-fg">{p.quip}</p>}
      <ul className="mt-auto flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
            {s}
          </li>
        ))}
      </ul>
    </a>
  );
}

/** Petu steams, Vide scrubs, Meel ships a parcel. CSS only. */
function HoverTouch({ name }: { name: string }) {
  if (name === "Petu") {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-10 w-24 rounded-b-full border-2 border-t-0 border-fg/60">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute -top-8 h-7 w-1.5 rounded-full bg-muted opacity-0 transition-opacity group-hover:animate-[steam_1.6s_ease-out_infinite] group-hover:opacity-100"
              style={{ left: `${30 + i * 18}%`, animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (name === "Vide") {
    return (
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2">
        <div className="mx-auto h-8 w-8 rounded-full border-2 border-fg/60 [clip-path:polygon(30%_20%,80%_50%,30%_80%)] bg-fg/60" />
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full w-[12%] rounded-full bg-accent transition-[width] duration-[2400ms] ease-linear group-hover:w-full" />
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0">
      <div className="absolute bottom-6 left-4 right-4 h-px bg-line" />
      <div className="absolute bottom-6 left-4 h-6 w-8 rounded-md border-2 border-fg/60 transition-transform duration-[1400ms] ease-in-out group-hover:translate-x-[calc(100%+9rem)]" />
    </div>
  );
}
