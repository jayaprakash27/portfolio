import { experience, type NoteType } from "@/lib/data";
import { cn } from "@/lib/utils";
import { StoreLinks } from "@/components/ui/store-links";

const TAG: Record<NoteType, string> = {
  added: "text-accent",
  improved: "text-muted",
  fixed: "text-muted",
};

/**
 * The factual layer: every role as a release, every resume bullet as an
 * Added / Improved / Fixed note. Scannable for recruiters, familiar to devs.
 */
export function Changelog() {
  const releases = experience.map((role, i) => ({ role, version: `v${experience.length - i}.0` }));

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-16 border-t border-line px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Experience</span>
        <h2 id="experience-title" className="display mt-4 text-[clamp(3rem,7vw,6.5rem)] text-fg">
          The changelog.
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-muted">
          Every role, written as release notes. <span className="text-fg">Newest first, like any good changelog.</span>
        </p>

        <ol className="mt-14 flex flex-col">
          {releases.map(({ role, version }) => (
            <li key={`${role.company}-${role.start}`} className="grid gap-6 border-t border-line py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-accent">{version}</span>
                <h3 className="display text-4xl text-fg">{role.company}</h3>
                <p className="text-sm text-fg">{role.role}</p>
                <p className="font-mono text-xs text-muted">
                  {role.start} – {role.end}
                </p>
                <p className="text-xs text-muted">{role.location}</p>
              </div>
              <div className="min-w-0">
                <ul className="flex flex-col">
                  {role.notes.map((n) => (
                    <li key={n.text} className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-b border-line py-3 text-[15px] leading-relaxed text-fg">
                      <span className={cn("pt-0.5 font-mono text-[11px] uppercase tracking-[0.06em]", TAG[n.type])}>{n.type}</span>
                      <span>{n.text}</span>
                    </li>
                  ))}
                </ul>
                {role.company === "Enigma Genomics" && role.end === "Present" && (
                  <StoreLinks className="mt-5" />
                )}
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                  {role.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
