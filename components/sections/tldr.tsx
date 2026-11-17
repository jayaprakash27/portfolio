import { chapters, profile, tldr } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { StoreLinks } from "@/components/ui/store-links";
import {
  PreviewGenomics,
  PreviewLouverline,
  PreviewSchoolRun,
  PreviewYouthAI,
} from "./tldr-previews";

const SHOTS = [
  { id: "one-codebase", label: "Youth AI", Preview: PreviewYouthAI },
  { id: "genomics", label: "Genomics", Preview: PreviewGenomics },
  { id: "school-run", label: "PiggyRide", Preview: PreviewSchoolRun },
  { id: "louverline", label: "Louverline", Preview: PreviewLouverline },
].filter((s) => chapters.some((c) => c.id === s.id));

/**
 * "Skip intro" lands here: the whole pitch shaped like an App Store
 * listing, a layout every recruiter already knows how to read.
 */
export function Tldr() {
  return (
    <section id="tldr" aria-labelledby="tldr-title" className="scroll-mt-16 border-t border-line px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] [&>*]:min-w-0">
        <div className="flex flex-col gap-5">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">The short version</span>
          <h2 id="tldr-title" className="display text-[clamp(3rem,7vw,6.5rem)] text-fg">
            Everything, in one card.
          </h2>
          <p className="max-w-[46ch] text-lg leading-relaxed text-muted">
            {tldr.summary} <span className="text-fg">Scroll on for the story behind it.</span>
          </p>
        </div>

        <article className="rounded-[28px] border border-line bg-card p-5 sm:p-6">
          <header className="flex items-center gap-4">
            <div className="display grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent text-3xl text-on-accent">
              JS
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-fg">{profile.name}</h3>
              <p className="text-sm text-muted">
                {profile.role} · {profile.location}
              </p>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="ms-auto shrink-0 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
            >
              Get
            </a>
          </header>

          <dl className="my-5 grid grid-cols-3 border-y border-line">
            {tldr.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse px-2 py-3 text-center ${i > 0 ? "border-s border-line" : ""}`}
              >
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="text-lg font-semibold text-fg">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h4 className="text-sm font-semibold text-fg">What&apos;s new · {tldr.whatsNew.version}</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted">{tldr.whatsNew.text}</p>
            <StoreLinks className="mt-3" />
          </div>

          <div className="mt-5 grid grid-cols-4 gap-2">
            {SHOTS.map(({ id, label, Preview }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-label={`Jump to ${label}`}
                className="group relative block aspect-[9/14] overflow-hidden rounded-xl border border-line bg-bg transition-colors hover:border-accent"
              >
                <span className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.04]">
                  <Preview />
                </span>
                <span className="absolute inset-x-1 bottom-1 truncate rounded-md bg-bg/85 px-1.5 py-0.5 font-mono text-[9px] text-muted group-hover:text-fg">
                  {label}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="rounded-full border border-line px-3 py-1.5 text-fg hover:border-accent">
              Resume (PDF)
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-fg hover:border-accent">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-fg hover:border-accent">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
