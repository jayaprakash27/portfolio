import { cn } from "@/lib/utils";
import type { Chapter } from "@/lib/data";
import { StoreLinks } from "@/components/ui/store-links";

/**
 * The text half of a chapter. The headline is the skim layer (a recruiter
 * reading only these gets the pitch); the story and quip are the read layer.
 */
export function ChapterText({
  chapter,
  className,
  headlineClassName,
  headlineStyle,
}: {
  chapter: Chapter;
  className?: string;
  headlineClassName?: string;
  headlineStyle?: React.CSSProperties;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-5", className)}>
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{chapter.label}</span>
      <h2
        id={`${chapter.id}-title`}
        className={cn("display text-[clamp(3rem,7vw,6.5rem)] text-fg", headlineClassName)}
        style={headlineStyle}
      >
        {chapter.headline}
      </h2>
      {(chapter.story || chapter.quip) && (
        <p className="max-w-[52ch] text-lg leading-relaxed text-muted">
          {chapter.story}
          {chapter.story && chapter.quip ? " " : null}
          {chapter.quip && <span className="text-fg">{chapter.quip}</span>}
        </p>
      )}
      {chapter.storeLinks && <StoreLinks />}
    </div>
  );
}
