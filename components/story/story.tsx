"use client";

import * as React from "react";
import { chapters, type SceneKey } from "@/lib/data";
import type { SceneProps } from "@/lib/motion";
import { GenomicsHelix } from "@/components/scenes/genomics-helix";
import { PdfStack } from "@/components/scenes/pdf-stack";
import { InternBeat } from "@/components/scenes/intern-beat";
import { SchoolRun } from "@/components/scenes/school-run";
import { LouverWindow } from "@/components/scenes/louver-window";
import { ChapterBlock } from "./chapter-block";
import { PhoneGroup } from "./phone-group";

const SCENES: Partial<Record<SceneKey, React.ComponentType<SceneProps>>> = {
  "genomics-helix": GenomicsHelix,
  "pdf-stack": PdfStack,
  "intern-beat": InternBeat,
  "school-run": SchoolRun,
  "louver-window": LouverWindow,
};

/** The story layer: every chapter in order, each with its own scene. */
export function Story() {
  const phone = chapters.filter((c) => c.scene.startsWith("phone-"));
  const rest = chapters.filter((c) => !c.scene.startsWith("phone-"));

  return (
    <div id="story">
      <PhoneGroup chapters={phone} />
      {rest.map((c) => {
        const Scene = SCENES[c.scene];
        if (!Scene) return null;
        // The intern beat is a short breath between companies, not pinned.
        const short = c.scene === "intern-beat";
        return <ChapterBlock key={c.id} chapter={c} Scene={Scene} pinnable={!short} />;
      })}
    </div>
  );
}
