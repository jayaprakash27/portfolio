import { Fragment, type CSSProperties } from "react";
import { profile } from "@/lib/data";
import { ShipWord } from "@/components/ship-word";

const STAGGER = 0.06; // seconds between words

/**
 * The only load-time animation on the site: headline words land one by one.
 * It runs on CSS keyframes, not JavaScript, so it starts as soon as the HTML
 * arrives instead of waiting for the JS bundle to load and hydrate. That
 * keeps the headline (the page's largest paint) fast on slow phones.
 * "Ship" is the single accent word. "Skip intro" jumps to the summary card.
 */
export function Hero() {
  const words = profile.headline.join(" ").split(" ");

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col px-4 pb-10 pt-24 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <h1 className="mt-auto text-fg">
          {/* The role is part of the h1 (for search and screen readers), shown
              as a small mono line so the giant type stays about shipping. */}
          <span className="hero-in mb-12 block font-mono text-sm uppercase tracking-[0.14em] text-muted sm:text-base">
            {profile.eyebrow}
          </span>{" "}
          {/* Words are real text (no aria-hidden copy) so "ship" can be a
              focusable button that opens its hint. */}
          <span className="display block text-[clamp(4rem,13vw,12.5rem)]">
            {words.map((w, i) => (
              <Fragment key={`${w}-${i}`}>
                <span
                  // The "ship" word sits on a higher layer so its hint card
                  // paints above the words after it.
                  className={w.toLowerCase() === "ship" ? "hero-in relative z-30 inline-block" : "hero-in inline-block"}
                  style={{ "--hero-delay": `${STAGGER * i}s` } as CSSProperties}
                >
                  {w.toLowerCase() === "ship" ? <ShipWord word={w} /> : w}
                </span>
                {/* A real space, so the heading reads as words, not one long string. */}
                {i < words.length - 1 && " "}
              </Fragment>
            ))}
          </span>
        </h1>

        <div
          className="hero-in mt-10 flex flex-wrap items-end justify-between gap-6"
          style={{ "--hero-delay": `${STAGGER * words.length + 0.1}s` } as CSSProperties}
        >
          <p className="max-w-[46ch] text-lg leading-relaxed text-muted">
            <span className="text-fg">Hi, I&apos;m {profile.shortName}.</span>{" "}
            {profile.intro.replace(`Hi, I'm ${profile.shortName}. `, "")}
          </p>
          <a
            href="#tldr"
            title="Recruiter? Respect. Here's the short version."
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 font-mono text-sm text-bg transition-opacity hover:opacity-85"
          >
            Skip intro <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
