"use client";

import { cn } from "@/lib/utils";

type Props = { className?: string };

export function MeshGradient({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* Base radial tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(124,92,255,0.28), transparent 60%), radial-gradient(80% 60% at 0% 100%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(80% 60% at 100% 80%, rgba(244,114,182,0.18), transparent 60%)",
        }}
      />
      {/* Drifting blobs */}
      <div
        className="blob"
        style={{
          width: 620,
          height: 620,
          top: "-10%",
          left: "5%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(124,92,255,0.7), transparent 60%)",
          animation: "drift-a 18s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          width: 540,
          height: 540,
          top: "40%",
          right: "-8%",
          background:
            "radial-gradient(circle at 60% 40%, rgba(34,211,238,0.65), transparent 60%)",
          animation: "drift-b 22s ease-in-out infinite",
        }}
      />
      <div
        className="blob"
        style={{
          width: 480,
          height: 480,
          bottom: "-12%",
          left: "30%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(244,114,182,0.55), transparent 60%)",
          animation: "drift-c 26s ease-in-out infinite",
        }}
      />
      {/* Grain on top */}
      <div className="grain" />
    </div>
  );
}
