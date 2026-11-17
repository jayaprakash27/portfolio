"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Chapter } from "@/lib/data";
import { useChapterProgress, useIsDesktop, useMotionNumber, type SceneProps } from "@/lib/motion";
import { PhoneScene, type PhoneBeat } from "@/components/scenes/phone";
import { ChapterBlock } from "./chapter-block";
import { ChapterText } from "./chapter-text";

const BEATS: Record<string, PhoneBeat> = {
  "phone-codebase": "codebase",
  "phone-native": "native",
  "phone-chat": "chat",
  "phone-rtl": "rtl",
};

/**
 * The Enigma Youth AI chapters share one phone.
 * Desktop: a single tall section; the phone stays pinned while the four
 * headlines take turns beside it. Mobile: four ordinary chapters, each
 * with its own phone below the text.
 */
export function PhoneGroup({ chapters }: { chapters: Chapter[] }) {
  const desktop = useIsDesktop();
  if (!desktop) {
    return (
      <>
        {chapters.map((c) => (
          <ChapterBlock key={c.id} chapter={c} Scene={beatScene(BEATS[c.scene])} pinnable={false} />
        ))}
      </>
    );
  }
  return <PinnedPhoneGroup chapters={chapters} />;
}

const sceneCache = new Map<PhoneBeat, React.ComponentType<SceneProps>>();
function beatScene(beat: PhoneBeat): React.ComponentType<SceneProps> {
  let Scene = sceneCache.get(beat);
  if (!Scene) {
    Scene = function PhoneBeatScene({ progress }: SceneProps) {
      const p = useMotionNumber(progress);
      return <PhoneScene beat={beat} p={p} />;
    };
    sceneCache.set(beat, Scene);
  }
  return Scene;
}

function PinnedPhoneGroup({ chapters }: { chapters: Chapter[] }) {
  const ref = React.useRef<HTMLElement>(null);
  const progress = useChapterProgress(ref, true);
  const p = useMotionNumber(progress);

  const n = chapters.length;
  const active = Math.min(n - 1, Math.floor(p * n));
  const sub = Math.min(1, p * n - active);
  const beat = BEATS[chapters[active].scene];

  return (
    <section ref={ref} id="youth-ai" aria-label="Enigma Genomics · Youth AI app" className="relative h-[460vh] border-t border-line">
      <div className="sticky top-0 mx-auto grid h-screen max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,460px)] items-center gap-16 px-6 pt-16">
        <div className="relative h-[70vh] min-w-0">
          {chapters.map((c, i) => {
            const flipped = BEATS[c.scene] === "rtl" && i === active && sub > 0.45;
            return (
              <div
                key={c.id}
                id={c.id}
                className={cn(
                  "absolute inset-0 flex flex-col justify-center transition-[opacity,transform] duration-500",
                  i === active ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                )}
              >
                <ChapterText
                  chapter={c}
                  headlineClassName="transition-[text-align] duration-500"
                  headlineStyle={{ textAlign: flipped ? "right" : "left" }}
                />
              </div>
            );
          })}
          <div className="absolute bottom-0 left-0 flex gap-2 font-mono text-xs">
            {chapters.map((c, i) => (
              <span
                key={c.id}
                className={cn(
                  "rounded-full border px-2.5 py-0.5",
                  i === active ? "border-accent bg-accent text-on-accent" : "border-line text-muted"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>
        <PhoneScene beat={beat} p={sub} />
      </div>
    </section>
  );
}
