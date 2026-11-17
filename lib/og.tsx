/* ------------------------------------------------------------------ */
/*  Shared pieces for build-time images (social preview + icons).      */
/*  Satori (next/og) needs TTF/OTF/WOFF, not the WOFF2 next/font uses, */
/*  so the display face is fetched as TTF from Google Fonts at build.  */
/*  If that fails (offline build), images fall back to the default     */
/*  font instead of breaking the build.                                */
/* ------------------------------------------------------------------ */

export const OG = {
  bg: "#0E0E10",
  fg: "#F2EEE6",
  muted: "#9B978F",
  line: "rgba(242,238,230,0.16)",
  accent: "#C6F432",
  onAccent: "#0E0E10",
} as const;

let cached: Promise<ArrayBuffer | null> | null = null;

/** Big Shoulders 900 as TTF, or null if it can't be fetched. */
export function displayFont(): Promise<ArrayBuffer | null> {
  cached ??= (async () => {
    try {
      // Without a browser User-Agent, Google Fonts serves TTF.
      const css = await fetch("https://fonts.googleapis.com/css2?family=Big+Shoulders:wght@900").then((r) => r.text());
      const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
      if (!url) return null;
      return await fetch(url).then((r) => r.arrayBuffer());
    } catch {
      return null;
    }
  })();
  return cached;
}

export async function displayFontOptions() {
  const data = await displayFont();
  return data ? [{ name: "Big Shoulders", data, weight: 900 as const, style: "normal" as const }] : [];
}

/** The lime "JS" squircle used for favicons, the Apple icon and the card. */
export function Monogram({ size, radius }: { size: number; radius: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: OG.accent,
        color: OG.onAccent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Big Shoulders",
        fontWeight: 900,
        fontSize: size * 0.56,
        letterSpacing: -size * 0.01,
        lineHeight: 1,
        paddingTop: size * 0.04,
      }}
    >
      JS
    </div>
  );
}
