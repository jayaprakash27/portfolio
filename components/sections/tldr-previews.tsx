/* ------------------------------------------------------------------ */
/*  "Screenshots" for the App Store card: tiny static frames of each   */
/*  chapter's scene, drawn as SVG. Server-rendered, zero JavaScript,   */
/*  themed by the same CSS variables as the real scenes.               */
/*  All share a 90 × 140 viewBox (the tile's 9:14 ratio).              */
/* ------------------------------------------------------------------ */

const LOUVERLINE_RED = "#C0302F";
const PIGGY_CYAN = "#22E1E6";

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 90 140" className="absolute inset-0 h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** Youth AI: the phone home screen — report card with meter, plan, shop badge. */
export function PreviewYouthAI() {
  return (
    <Frame label="Youth AI app home screen">
      <rect x="33" y="8" width="24" height="6" rx="3" fill="var(--fg)" />
      <rect x="8" y="22" width="30" height="3" rx="1.5" fill="var(--muted)" opacity="0.6" />
      {[30, 62, 94].map((y, i) => (
        <g key={y}>
          <rect x="8" y={y} width="74" height="26" rx="6" fill="var(--card)" stroke="var(--line)" />
          <rect x="14" y={y + 6} width={i === 0 ? 34 : 28} height="3" rx="1.5" fill="var(--fg)" />
          <rect x="14" y={y + 12} width="44" height="2.5" rx="1.25" fill="var(--muted)" opacity="0.6" />
          {i === 0 && (
            <>
              <rect x="14" y={y + 18} width="62" height="3" rx="1.5" fill="var(--line)" />
              <rect x="14" y={y + 18} width="22" height="3" rx="1.5" fill="var(--accent)" />
            </>
          )}
          {i === 2 && <circle cx="74" cy={y + 7.5} r="3.5" fill="var(--accent)" />}
        </g>
      ))}
    </Frame>
  );
}

/** Genomics: a slice of the double helix, a few variant matches lit. */
export function PreviewGenomics() {
  const dots: { x: number; y: number; o: number; lit: boolean }[] = [];
  for (let i = 0; i < 46; i++) {
    const t = i / 45;
    for (const strand of [0, 1]) {
      const a = t * Math.PI * 4 + strand * Math.PI;
      dots.push({
        x: 45 + Math.cos(a) * 24,
        y: 26 + t * 104,
        o: 0.25 + 0.75 * ((Math.sin(a) + 1) / 2),
        lit: (i * 7 + strand * 3) % 17 === 0,
      });
    }
  }
  return (
    <Frame label="Genomics variant browser">
      <rect x="6" y="7" width="78" height="11" rx="5.5" fill="var(--card)" stroke="var(--line)" />
      <rect x="12" y="11" width="30" height="3" rx="1.5" fill="var(--fg)" />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x.toFixed(1)}
          cy={d.y.toFixed(1)}
          r={d.lit ? 2.4 : 1 + d.o * 0.6}
          fill={d.lit ? "var(--accent)" : "var(--fg)"}
          opacity={d.lit ? 1 : d.o * 0.8}
        />
      ))}
    </Frame>
  );
}

/** PiggyRide: morning map, route drawn home → school, cab with cyan stripe. */
export function PreviewSchoolRun() {
  return (
    <Frame label="PiggyRide school run tracking map">
      <rect width="90" height="140" fill="rgb(196 150 112)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={(i % 2) * 44 + 6} y={Math.floor(i / 2) * 44 + 8} width="34" height="36" rx="4" fill="rgb(0 0 0 / 0.16)" />
      ))}
      <path d="M 14 128 C 14 96, 46 100, 46 74 S 76 52, 76 16" fill="none" stroke="rgb(255 255 255 / 0.2)" strokeWidth="7" strokeLinecap="round" />
      <path d="M 14 128 C 14 96, 46 100, 46 74 S 76 52, 76 16" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="128" r="5" fill="var(--bg)" />
      <circle cx="76" cy="16" r="6" fill="var(--accent)" />
      <g transform="translate(46 74) rotate(-60)">
        <rect x="-7" y="-4.5" width="14" height="9" rx="3.5" fill="#f2eee6" />
        <rect x="-7" y="-1" width="14" height="2" fill={PIGGY_CYAN} />
      </g>
    </Frame>
  );
}

/** Louverline: the red window bar, a couple of tilted slats, all 120 dealers lit. */
export function PreviewLouverline() {
  return (
    <Frame label="Louverline dealer portal">
      <rect x="0" y="0" width="90" height="4" fill={LOUVERLINE_RED} />
      {[10, 17].map((y) => (
        <rect key={y} x="6" y={y} width="78" height="3" rx="1" fill={LOUVERLINE_RED} opacity="0.85" />
      ))}
      {Array.from({ length: 120 }, (_, i) => (
        <circle
          key={i}
          cx={10 + (i % 10) * 7.8}
          cy={34 + Math.floor(i / 10) * 7.4}
          r="2.2"
          fill="var(--muted)"
        />
      ))}
    </Frame>
  );
}
