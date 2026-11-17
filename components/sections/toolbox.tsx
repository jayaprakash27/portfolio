import { certifications, education, skills } from "@/lib/data";

/** Skills as a big typographic list, plus education in one line. */
export function Toolbox() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-16 border-t border-line px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Skills</span>
        <h2 id="skills-title" className="display mt-4 text-[clamp(3rem,7vw,6.5rem)] text-fg">
          The toolbox.
        </h2>
        <p className="mt-4 text-lg text-muted">
          Things I reach for without googling. <span className="text-fg">Mostly.</span>
        </p>

        <dl className="mt-14 flex flex-col">
          {(Object.keys(skills) as (keyof typeof skills)[]).map((group) => (
            <div key={group} className="grid gap-3 border-t border-line py-6 md:grid-cols-[220px_minmax(0,1fr)]">
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{group}</dt>
              <dd className="text-[clamp(1.4rem,2.6vw,2.1rem)] leading-snug text-fg">
                {skills[group].join(" · ")}
              </dd>
            </div>
          ))}
        </dl>

        <div id="education" className="mt-16 grid gap-3 border-t border-line pt-8 md:grid-cols-[220px_minmax(0,1fr)]">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Education</span>
          <div className="flex flex-col gap-2">
            <p className="text-lg text-fg">
              {education.degree}, {education.school} · {education.period} · {education.detail}
            </p>
            <p className="text-muted">{education.quip}</p>
            <p className="mt-2 font-mono text-xs text-muted">
              Certificates: {certifications.map((c) => `${c.name} (${c.issuer})`).join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
