"use client";

import { cn } from "@/lib/utils";

/** Persistent, viewport-fixed mesh-gradient backdrop that sits behind every
 *  section. Subtler than the hero's <MeshGradient />: bigger blobs, slower
 *  drift, lower opacity — so non-hero sections feel ambient rather than flat
 *  black, but the hero still reads as the dominant moment. */
export function PageBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Base radial tint — very faint, sits across the full viewport */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -20%, rgba(124,92,255,0.10), transparent 60%), radial-gradient(80% 60% at 0% 40%, rgba(34,211,238,0.06), transparent 60%), radial-gradient(80% 60% at 100% 70%, rgba(244,114,182,0.07), transparent 60%)",
        }}
      />
      {/* Big, lazy drifting blobs */}
      <div
        className="blob"
        style={{
          width: 900,
          height: 900,
          top: "-10%",
          left: "-15%",
          background:
            "radial-gradient(circle at 35% 35%, rgba(124,92,255,0.45), transparent 60%)",
          animation: "drift-a 32s ease-in-out infinite",
          opacity: 0.32,
        }}
      />
      <div
        className="blob"
        style={{
          width: 820,
          height: 820,
          top: "40%",
          right: "-18%",
          background:
            "radial-gradient(circle at 60% 40%, rgba(34,211,238,0.4), transparent 60%)",
          animation: "drift-b 38s ease-in-out infinite",
          opacity: 0.3,
        }}
      />
      <div
        className="blob"
        style={{
          width: 720,
          height: 720,
          bottom: "-12%",
          left: "30%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(244,114,182,0.4), transparent 60%)",
          animation: "drift-c 44s ease-in-out infinite",
          opacity: 0.28,
        }}
      />
      <div
        className="blob"
        style={{
          width: 600,
          height: 600,
          top: "25%",
          left: "55%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(167,139,250,0.35), transparent 60%)",
          animation: "drift-a 50s ease-in-out infinite reverse",
          opacity: 0.22,
        }}
      />
      {/* Subtle film grain over the whole page */}
      <div className="grain" />
    </div>
  );
}
