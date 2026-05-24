"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  ACHIEVEMENTS,
  HIRE_ME_KEYWORD,
  KONAMI_SEQUENCE,
  SECTION_IDS,
  STORAGE_KEY,
  type Achievement,
} from "@/lib/achievements";
import { CursorOrb } from "@/components/gamification/cursor-orb";

type Ctx = {
  unlocked: Set<string>;
  unlock: (id: string) => void;
  achievements: Achievement[];
  reset: () => void;
};

const AchievementsContext = React.createContext<Ctx | null>(null);

export function useAchievements(): Ctx {
  const ctx = React.useContext(AchievementsContext);
  if (!ctx) {
    throw new Error("useAchievements must be used inside <AchievementsProvider>");
  }
  return ctx;
}

const PROJECT_HOVER_EVENT = "ach:project-hover";
const PREFILL_CONTACT_EVENT = "ach:prefill-contact";

export const projectHoverEvent = (project: string) =>
  new CustomEvent<{ project: string }>(PROJECT_HOVER_EVENT, { detail: { project } });

export const prefillContactEvent = (message: string) =>
  new CustomEvent<{ message: string }>(PREFILL_CONTACT_EVENT, { detail: { message } });

export const PROJECT_HOVER_EVENT_NAME = PROJECT_HOVER_EVENT;
export const PREFILL_CONTACT_EVENT_NAME = PREFILL_CONTACT_EVENT;

const HIRE_ME_PREFILL =
  "hi jay,\n\ni tried `sudo hire-me` and it worked. let's chat — i think you'd fit a role on my team.\n\n— ";

export function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = React.useState<Set<string>>(new Set());
  const [orbActive, setOrbActive] = React.useState(false);
  const hydratedRef = React.useRef(false);

  // ---------- Hydrate from localStorage on mount ----------
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setUnlocked(new Set(parsed.filter((s): s is string => typeof s === "string")));
        }
      }
    } catch {
      /* ignore */
    }
    hydratedRef.current = true;
  }, []);

  // ---------- Core unlock(), idempotent, persists, toasts ----------
  const unlock = React.useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }

      const ach = ACHIEVEMENTS.find((a) => a.id === id);
      if (ach) {
        toast(`${ach.icon}  Achievement: ${ach.name}`, {
          description: ach.flavor,
          duration: 4500,
        });
      }

      // Completionist meta-check: all *earnable-on-demand* non-meta achievements
      // unlocked → fire completionist. `night_owl` is excluded because it depends
      // on the time of day and isn't reachable by every visitor.
      const required = ACHIEVEMENTS.filter(
        (a) => a.id !== "completionist" && a.id !== "night_owl",
      );
      const allRequired = required.every((a) => next.has(a.id));
      if (allRequired && !next.has("completionist")) {
        // Defer to avoid recursive setState inside the same updater call.
        setTimeout(() => {
          setUnlocked((p) => {
            if (p.has("completionist")) return p;
            const n = new Set(p);
            n.add("completionist");
            try {
              window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...n]));
            } catch {
              /* ignore */
            }
            const meta = ACHIEVEMENTS.find((a) => a.id === "completionist")!;
            toast(`${meta.icon}  Achievement: ${meta.name}`, {
              description: meta.flavor,
              duration: 6000,
            });
            return n;
          });
        }, 700);
      }

      return next;
    });
  }, []);

  const reset = React.useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setUnlocked(new Set());
  }, []);

  // ---------- First Light + Night Owl (on mount) ----------
  React.useEffect(() => {
    const t = setTimeout(() => unlock("first_light"), 2000);
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) unlock("night_owl");
    return () => clearTimeout(t);
  }, [unlock]);

  // ---------- Explorer (IntersectionObserver on every section) ----------
  React.useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.target.id) {
            seen.add(e.target.id);
          }
        }
        if (SECTION_IDS.every((id) => seen.has(id))) {
          unlock("explorer");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    const ids = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    ids.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [unlock]);

  // ---------- Stalker (custom event from project cards) ----------
  React.useEffect(() => {
    const seen = new Set<string>();
    const handler = (raw: Event) => {
      const e = raw as CustomEvent<{ project: string }>;
      if (e.detail?.project) {
        seen.add(e.detail.project);
        if (seen.size >= 2) unlock("stalker");
      }
    };
    window.addEventListener(PROJECT_HOVER_EVENT, handler as EventListener);
    return () => window.removeEventListener(PROJECT_HOVER_EVENT, handler as EventListener);
  }, [unlock]);

  // ---------- Cursor orb on-demand (window event from navbar triple-click) ----------
  React.useEffect(() => {
    const handler = () => {
      setOrbActive(true);
      const t = setTimeout(() => setOrbActive(false), 30_000);
      return () => clearTimeout(t);
    };
    window.addEventListener("ach:cursor-orb-on", handler);
    return () => window.removeEventListener("ach:cursor-orb-on", handler);
  }, []);

  // ---------- Keyboard listeners: Konami + sudo hire-me ----------
  React.useEffect(() => {
    const konamiBuf: string[] = [];
    let textBuf = "";

    const isEditable = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };

    const handler = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;

      const k = e.key.toLowerCase();

      // Konami buffer
      konamiBuf.push(k);
      if (konamiBuf.length > KONAMI_SEQUENCE.length) {
        konamiBuf.splice(0, konamiBuf.length - KONAMI_SEQUENCE.length);
      }
      if (
        konamiBuf.length === KONAMI_SEQUENCE.length &&
        KONAMI_SEQUENCE.every((expected, i) => expected === konamiBuf[i])
      ) {
        unlock("konami");
        triggerPartyMode();
        konamiBuf.length = 0;
      }

      // sudo hire-me — only count printable keys
      if (k.length === 1 || k === " ") {
        textBuf += k;
        if (textBuf.length > HIRE_ME_KEYWORD.length) {
          textBuf = textBuf.slice(-HIRE_ME_KEYWORD.length);
        }
        if (textBuf === HIRE_ME_KEYWORD) {
          textBuf = "";
          const contactEl = document.getElementById("contact");
          contactEl?.scrollIntoView({ behavior: "smooth", block: "start" });
          window.dispatchEvent(prefillContactEvent(HIRE_ME_PREFILL));
          toast("🥷  Cheat code accepted", {
            description: "Routed to contact and pre-filled a message.",
          });
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [unlock]);

  const value = React.useMemo<Ctx>(
    () => ({ unlocked, unlock, achievements: ACHIEVEMENTS, reset }),
    [unlocked, unlock, reset],
  );

  return (
    <AchievementsContext.Provider value={value}>
      {children}
      {orbActive && <CursorOrb />}
    </AchievementsContext.Provider>
  );
}

/** Toggle party mode for 4s by setting `data-party` on <html>. CSS in globals.css
 *  drives the hue-rotate animation on .blob elements. */
function triggerPartyMode() {
  const root = document.documentElement;
  root.dataset.party = "true";
  window.setTimeout(() => {
    delete root.dataset.party;
  }, 4000);
}
