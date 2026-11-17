"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Salad, FileText, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeInOut, lerp, seg } from "@/lib/motion";

export type PhoneBeat = "codebase" | "native" | "chat" | "rtl";

/* ------------------------------------------------------------------ */
/*  The Youth AI phone. Each beat is a pure function of progress p.     */
/*  These are fakes built from plain DOM: sharp at any size, themed by */
/*  the same tokens as the page, and a few KB instead of a video.      */
/* ------------------------------------------------------------------ */

export function PhoneScene({ beat, p }: { beat: PhoneBeat; p: number }) {
  // Beat a: the device morphs phone → Android → browser window.
  const morph = beat === "codebase" ? easeInOut(seg(p, 0.55, 0.85)) : 0;
  const platform: Platform = beat === "codebase" ? (p < 0.3 ? "ios" : p < 0.55 ? "android" : "web") : "ios";

  const width = lerp(280, 440, morph);
  const height = lerp(560, 360, morph);
  const radius = lerp(44, 14, morph);

  return (
    <div className="flex flex-col items-center gap-4" aria-hidden>
      <div
        className="relative max-w-full overflow-hidden border-2 border-fg bg-card"
        style={{ width, height, borderRadius: radius }}
      >
        <StatusBar platform={platform} />
        <div className={cn("absolute inset-x-0 bottom-0 overflow-hidden", platform === "web" ? "top-10" : "top-11")}>
          {beat === "codebase" && <HomeScreen locale="en" wide={morph > 0.6} />}
          {beat === "native" && <NativeScreen p={p} />}
          {beat === "chat" && <ChatScreen p={p} />}
          {beat === "rtl" && <RtlScreen p={p} />}
        </div>
      </div>
      {beat === "codebase" && <PlatformTabs active={platform} />}
    </div>
  );
}

type Platform = "ios" | "android" | "web";

function StatusBar({ platform }: { platform: Platform }) {
  if (platform === "web") {
    return (
      <div className="absolute inset-x-0 top-0 flex h-10 items-center gap-2 border-b border-line px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-2 flex-1 truncate rounded-full border border-line px-3 py-0.5 font-mono text-[10px] text-muted">
          app.youthai.health
        </span>
      </div>
    );
  }
  return (
    <div className="absolute inset-x-0 top-0 flex h-11 items-center justify-between px-6 font-mono text-[11px] text-fg">
      {platform === "ios" ? (
        <>
          <span>9:41</span>
          <span className="absolute left-1/2 top-2.5 h-6 w-20 -translate-x-1/2 rounded-full bg-fg" />
          <span>●●●</span>
        </>
      ) : (
        <>
          <span>9:41</span>
          <span className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-fg" />
          <span>▲ ■</span>
        </>
      )}
    </div>
  );
}

function PlatformTabs({ active }: { active: Platform }) {
  const items: [Platform, string][] = [
    ["ios", "iOS"],
    ["android", "Android"],
    ["web", "Web"],
  ];
  return (
    <div className="flex gap-2 font-mono text-xs">
      {items.map(([k, label]) => (
        <span
          key={k}
          className={cn(
            "rounded-full border px-3 py-1 transition-colors",
            active === k ? "border-accent bg-accent text-on-accent" : "border-line text-muted"
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Home screen (English / Arabic)                                     */
/* ------------------------------------------------------------------ */

const STRINGS = {
  en: {
    hello: "Good morning",
    report: "Your report",
    vitamin: "Vitamin D",
    value: "18 ng/mL · slightly low",
    plan: "Nutrition plan",
    day: "Day 3 of 7",
    meal: "Spinach dal, two eggs",
    shop: "Shop",
    cart: "1 item still in your cart",
  },
  ar: {
    hello: "صباح الخير",
    report: "تقريرك",
    vitamin: "فيتامين د",
    value: "١٨ نانوغرام/مل · منخفض قليلاً",
    plan: "خطة التغذية",
    day: "اليوم ٣ من ٧",
    meal: "دال السبانخ وبيضتان",
    shop: "المتجر",
    cart: "منتج واحد ما زال في سلتك",
  },
} as const;

function HomeScreen({ locale, wide = false }: { locale: "en" | "ar"; wide?: boolean }) {
  const t = STRINGS[locale];
  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="flex h-full flex-col gap-3 px-4 pb-4 text-fg">
      <p className="font-mono text-[11px] text-muted">{t.hello}</p>
      <div className={cn("grid gap-3", wide ? "grid-cols-3" : "grid-cols-1")}>
        <Card icon={<FileText className="h-4 w-4" />} title={t.report}>
          <p className="text-sm font-medium">{t.vitamin}</p>
          <p className="text-xs text-muted">{t.value}</p>
          <Meter value={0.36} />
        </Card>
        <Card icon={<Salad className="h-4 w-4" />} title={t.plan}>
          <p className="text-sm font-medium">{t.day}</p>
          <p className="text-xs text-muted">{t.meal}</p>
        </Card>
        <Card icon={<ShoppingBag className="h-4 w-4" />} title={t.shop} badge="1">
          <p className="text-xs text-muted">{t.cart}</p>
        </Card>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  badge,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl border border-line bg-bg p-3">
      <div className="flex items-center gap-2 text-muted">
        {icon}
        <span className="text-xs">{title}</span>
        {badge && (
          <span className="ms-auto rounded-full bg-accent px-1.5 font-mono text-[10px] text-on-accent">{badge}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function Meter({ value }: { value: number }) {
  return (
    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-line">
      <div className="h-full rounded-full bg-accent" style={{ width: `${value * 100}%` }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Beat b: rich push notification → deep link into the report        */
/* ------------------------------------------------------------------ */

function NativeScreen({ p }: { p: number }) {
  const drop = easeInOut(seg(p, 0.12, 0.38));
  const opened = p > 0.66;
  return (
    <div className="relative h-full">
      <div className={cn("h-full transition-opacity duration-300", opened ? "opacity-0" : "opacity-40")}>
        <HomeScreen locale="en" />
      </div>

      {!opened && (
        <div
          className="absolute inset-x-3 top-0 rounded-2xl border border-line bg-bg p-3 shadow-lg"
          style={{ transform: `translateY(${lerp(-160, 8, drop)}px)`, opacity: drop }}
        >
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
            <span className="grid h-4 w-4 place-items-center rounded bg-accent text-[8px] text-on-accent">Y</span>
            YOUTH AI · now
          </div>
          <p className="mt-1.5 text-sm font-medium text-fg">Your report is ready</p>
          <p className="text-xs text-muted">Vitamin D came back. Tap to see what it means.</p>
          <div
            className="mt-2 h-16 rounded-lg border border-line"
            style={{
              background:
                "repeating-linear-gradient(90deg, var(--line) 0 10px, transparent 10px 16px) bottom / 100% 60% no-repeat",
            }}
          />
          <p className="mt-1.5 font-mono text-[10px] text-muted">rich push · Notification Service Extension (Swift)</p>
        </div>
      )}

      {opened && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex flex-col gap-3 px-4 text-fg"
        >
          <p className="truncate font-mono text-[10px] text-accent">youthai://report/vitamin-d</p>
          <p className="display text-4xl">Vitamin D</p>
          <p className="text-sm text-muted">18 ng/mL. The healthy range is 20–50.</p>
          <Meter value={0.36} />
          <div className="mt-2 flex items-center justify-between rounded-2xl border border-line p-3 text-sm">
            What to eat this week <ChevronRight className="h-4 w-4 text-muted" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
            <Lock className="h-3 w-3" /> token from secure storage
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Beat c: streamed AI reply that survives a dropped connection       */
/* ------------------------------------------------------------------ */

const REPLY =
  "Slightly, yes. Your result is 18 ng/mL, just under the healthy range of 20–50. Ten minutes of morning sun and the eggs in your plan will help.";
const DROP_AT = 52;

function ChatScreen({ p }: { p: number }) {
  // 0.10–0.45 stream to DROP_AT · 0.45–0.62 connection lost · 0.62–0.92 resume.
  const first = Math.round(seg(p, 0.1, 0.45) * DROP_AT);
  const rest = Math.round(seg(p, 0.62, 0.92) * (REPLY.length - DROP_AT));
  const shown = p < 0.62 ? first : DROP_AT + rest;
  const dropped = p >= 0.45 && p < 0.62;
  const done = shown >= REPLY.length;

  return (
    <div className="flex h-full flex-col gap-2 px-3 pb-3 text-fg">
      <p className="text-center font-mono text-[10px] text-muted">AI health assistant</p>
      <div className="self-end rounded-2xl rounded-br-md bg-fg px-3 py-2 text-sm text-bg">Is my vitamin D low?</div>
      {shown > 0 ? (
        <div className="max-w-[90%] self-start rounded-2xl rounded-bl-md border border-line bg-bg px-3 py-2 text-sm leading-relaxed">
          {REPLY.slice(0, shown)}
          {!done && <span className="ms-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-fg" />}
        </div>
      ) : (
        <div className="flex gap-1 self-start rounded-2xl border border-line bg-bg px-3 py-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${i * 120}ms` }} />
          ))}
        </div>
      )}
      <p className={cn("self-start px-1 font-mono text-[10px]", dropped ? "text-accent" : "text-muted")}>
        {dropped ? "connection lost · reconnecting…" : done ? "delivered" : shown > 0 ? "streaming over SSE" : "typing…"}
      </p>
      <div className="mt-auto rounded-full border border-line px-4 py-2.5 text-xs text-muted">Ask about your report</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Beat d: the whole screen goes right-to-left                        */
/* ------------------------------------------------------------------ */

function RtlScreen({ p }: { p: number }) {
  const locale = p > 0.45 ? "ar" : "en";
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={locale}
        className="h-full"
        initial={{ opacity: 0, x: locale === "ar" ? -24 : 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: locale === "ar" ? 24 : -24 }}
        transition={{ duration: 0.25 }}
      >
        <HomeScreen locale={locale} />
      </motion.div>
    </AnimatePresence>
  );
}
