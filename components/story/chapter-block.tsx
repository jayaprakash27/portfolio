"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Chapter } from "@/lib/data";
import { useChapterProgress, useIsDesktop, type SceneProps } from "@/lib/motion";
import { ChapterText } from "./chapter-text";

/**
 * One chapter: text on the left, its scene on the right.
 * Desktop: the whole grid is sticky inside a tall section, so the scene
 * plays while the text stays put (scroll-pinned). Mobile: normal flow,
 * scene below the text, animating as it scrolls into view.
 */
export function ChapterBlock({
  chapter,
  Scene,
  pinnable = true,
  height = "lg:h-[180vh]",
}: {
  chapter: Chapter;
  Scene: React.ComponentType<SceneProps>;
  pinnable?: boolean;
  height?: string;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const pinned = desktop && pinnable;
  const progress = useChapterProgress(ref, pinned);

  return (
    <section
      ref={ref}
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className={cn("relative border-t border-line", pinned && height)}
    >
      <div
        className={cn(
          "mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16",
          pinned && "sticky top-0 h-screen py-0 pt-16"
        )}
      >
        <ChapterText chapter={chapter} />
        <div className="relative min-w-0">
          <Scene progress={progress} />
        </div>
      </div>
    </section>
  );
}
