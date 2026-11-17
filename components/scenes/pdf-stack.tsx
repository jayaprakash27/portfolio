"use client";

import { cn } from "@/lib/utils";
import { easeInOut, seg, useMotionNumber, type SceneProps } from "@/lib/motion";

const SHEETS = 20;

/**
 * A stack of 20+ report sheets fans out, the top page's score meter and
 * bars fill in, then the page flips from the English layout to the
 * mirrored Arabic one. Pure DOM + CSS 3D.
 */
export function PdfStack({ progress }: SceneProps) {
  const p = useMotionNumber(progress);
  const fan = easeInOut(seg(p, 0, 0.4));
  const fill = easeInOut(seg(p, 0.4, 0.65));
  const flip = easeInOut(seg(p, 0.7, 0.95));

  return (
    <div className="flex w-full flex-col items-center gap-10 overflow-x-clip py-4" aria-hidden>
      <div className="relative mx-auto aspect-[3/4] w-[min(100%,320px)] [perspective:1200px]">
        {Array.from({ length: SHEETS }, (_, i) => {
          const k = i - SHEETS / 2;
          return (
            <div
              key={i}
              className="absolute inset-0 rounded-xl border border-line bg-card"
              style={{
                transform: `translate(${k * 4 * fan}px, ${Math.abs(k) * 2.5 * fan}px) rotate(${k * 1.6 * fan}deg)`,
                opacity: 0.35 + 0.65 * (i / SHEETS),
              }}
            />
          );
        })}
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: `rotateY(${flip * 180}deg)` }}
        >
          <ReportFace locale="en" fill={fill} />
          <ReportFace locale="ar" fill={fill} back />
        </div>
      </div>
      <div className="flex gap-2 font-mono text-xs">
        <span className={cn("rounded-full border px-3 py-1", flip < 0.5 ? "border-accent bg-accent text-on-accent" : "border-line text-muted")}>
          English
        </span>
        <span className={cn("rounded-full border px-3 py-1", flip >= 0.5 ? "border-accent bg-accent text-on-accent" : "border-line text-muted")}>
          العربية
        </span>
      </div>
    </div>
  );
}

const COPY = {
  en: { title: "Genetic report", test: "Vitamin D metabolism", score: "Score", bars: ["Absorption", "Conversion", "Transport"], signed: "Reviewed by the lab's doctor" },
  ar: { title: "تقرير جيني", test: "استقلاب فيتامين د", score: "النتيجة", bars: ["الامتصاص", "التحويل", "النقل"], signed: "راجعه طبيب المختبر" },
} as const;

function ReportFace({ locale, fill, back = false }: { locale: "en" | "ar"; fill: number; back?: boolean }) {
  const t = COPY[locale];
  const score = 0.68;
  const arc = 125.66; // half-circumference of r=40
  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="absolute inset-0 flex flex-col gap-3 rounded-xl border border-fg/30 bg-card p-5 text-fg [backface-visibility:hidden]"
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      <div className="flex items-center justify-between font-mono text-[10px] text-muted">
        <span>ENIGMA GENOMICS</span>
        <span>PDF</span>
      </div>
      <div>
        <p className="text-xs text-muted">{t.title}</p>
        <p className="text-base font-medium leading-tight">{t.test}</p>
      </div>
      <svg viewBox="0 0 100 56" className="mx-auto w-3/4">
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="var(--line)" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={arc}
          strokeDashoffset={arc * (1 - score * fill)}
          style={locale === "ar" ? { transform: "scaleX(-1)", transformOrigin: "50px 30px" } : undefined}
        />
        <text x="50" y="48" textAnchor="middle" fontSize="14" fill="var(--fg)" fontFamily="var(--font-geist-mono)">
          {Math.round(score * 100 * fill)}
        </text>
      </svg>
      <div className="flex flex-col gap-2">
        {t.bars.map((label, i) => (
          <div key={label} className="flex items-center gap-2 text-[11px]">
            <span className="w-20 shrink-0 text-muted">{label}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
              <span className="block h-full rounded-full bg-fg" style={{ width: `${[72, 54, 81][i] * fill}%` }} />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-auto border-t border-line pt-2 font-mono text-[10px] text-muted">{t.signed} ✓</p>
    </div>
  );
}
