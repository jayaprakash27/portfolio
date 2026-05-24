"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Lock, RotateCcw, X } from "lucide-react";
import { useAchievements } from "@/components/gamification/achievements-provider";

type Props = { onClose: () => void };

export function AchievementsModal({ onClose }: Props) {
  const { unlocked, achievements, reset } = useAchievements();

  // Close on Escape.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const count = unlocked.size;
  const total = achievements.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="presentation"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-label="Achievements"
        className="glass-strong relative w-full max-w-lg overflow-hidden rounded-3xl p-6 sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex items-end justify-between gap-4 pr-10">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
              Achievements
            </span>
            <h2 className="text-xl font-medium text-white">
              <span className="tabular-nums">{count}</span>
              <span className="text-white/40"> / {total}</span>{" "}
              <span className="text-white/55">unlocked</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.confirm("Reset all achievements?")) {
                reset();
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/60 transition hover:border-white/20 hover:text-white/90"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>

        <ul className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto pr-1">
          {achievements.map((a) => {
            const isUnlocked = unlocked.has(a.id);
            const hide = a.hidden && !isUnlocked;
            return (
              <li
                key={a.id}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                  isUnlocked
                    ? "border-white/15 bg-white/[0.05] text-white"
                    : "border-white/[0.06] bg-white/[0.02] text-white/45"
                }`}
              >
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-base ${
                    isUnlocked
                      ? "border-white/15 bg-white/10"
                      : "border-white/[0.06] bg-white/[0.02] grayscale"
                  }`}
                  aria-hidden
                >
                  {hide ? <Lock className="h-4 w-4 text-white/40" /> : a.icon}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium">
                    {hide ? "???" : a.name}
                  </span>
                  <span className="text-xs text-white/55">
                    {hide ? "Keep exploring to discover this one." : a.flavor}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}
