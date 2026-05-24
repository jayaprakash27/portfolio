"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { useAchievements } from "@/components/gamification/achievements-provider";
import { AchievementsModal } from "@/components/gamification/achievements-modal";

export function AchievementsBadge() {
  const { unlocked, achievements } = useAchievements();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Avoid SSR/hydration mismatch — only render after mount.
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const total = achievements.length;
  const count = unlocked.size;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="glass-strong fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-white/85 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.6)] hover:text-white"
        aria-label={`Achievements: ${count} of ${total} unlocked`}
      >
        <Trophy className="h-3.5 w-3.5 text-amber-300" />
        <span className="tabular-nums">
          <span className="text-white">{count}</span>
          <span className="text-white/40"> / {total}</span>
        </span>
      </motion.button>

      <AnimatePresence>{open && <AchievementsModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
