import { youthAI } from "@/lib/data";
import { cn } from "@/lib/utils";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
      <path d="M16.37 12.6c-.02-2.17 1.78-3.22 1.86-3.27-1.02-1.48-2.6-1.69-3.15-1.71-1.34-.14-2.62.79-3.3.79-.68 0-1.73-.77-2.84-.75-1.46.02-2.81.85-3.56 2.16-1.52 2.63-.39 6.52 1.09 8.66.72 1.04 1.58 2.22 2.71 2.17 1.09-.04 1.5-.7 2.81-.7 1.31 0 1.68.7 2.83.68 1.17-.02 1.91-1.06 2.62-2.11.83-1.21 1.17-2.38 1.19-2.44-.03-.01-2.28-.87-2.3-3.48zM14.21 6.24c.6-.73 1-1.73.89-2.74-.86.04-1.9.57-2.52 1.3-.55.64-1.04 1.67-.91 2.66.96.07 1.94-.49 2.54-1.22z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
      <path d="M4.2 2.6c-.25.26-.4.67-.4 1.2v16.4c0 .53.15.94.4 1.2l.07.06 9.19-9.19v-.22L4.27 2.54l-.07.06zM16.52 15.33l-3.06-3.06v-.22l3.06-3.06.07.04 3.63 2.06c1.04.59 1.04 1.55 0 2.14l-3.63 2.06-.07.04zM16.59 15.29 13.46 12.16 4.2 21.41c.34.36.91.41 1.54.05l10.85-6.17M16.59 9.03 5.74 2.86c-.63-.36-1.2-.31-1.54.05l9.26 9.25 3.13-3.13z" />
    </svg>
  );
}

function WebGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
    </svg>
  );
}

/**
 * Live links for Youth AI: App Store, Google Play and the web app. Drawn in
 * the site's own style (not the official badge artwork) so they sit naturally
 * next to the other pills.
 */
export function StoreLinks({ className }: { className?: string }) {
  const pill =
    "inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono text-xs text-fg transition-colors hover:border-accent";
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a href={youthAI.appStore} target="_blank" rel="noreferrer" className={pill}>
        <AppleGlyph /> App Store <span className="text-muted">↗</span>
      </a>
      <a href={youthAI.playStore} target="_blank" rel="noreferrer" className={pill}>
        <PlayGlyph /> Google Play <span className="text-muted">↗</span>
      </a>
      <a href={youthAI.web} target="_blank" rel="noreferrer" className={pill}>
        <WebGlyph /> Web app <span className="text-muted">↗</span>
      </a>
    </div>
  );
}
