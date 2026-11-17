import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";
import { OG, displayFontOptions } from "@/lib/og";

export const alt = "Jayaprakash Sahoo — React Native & Next.js engineer. I ship to the stores. And the browser.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The link preview people see on LinkedIn, WhatsApp, Slack and X before
 * they ever open the site. Same Night Shift palette and headline as the hero.
 * Generated once at build time.
 */
export default async function OpengraphImage() {
  const fonts = await displayFontOptions();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: OG.bg,
          color: OG.fg,
          padding: "56px 72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: OG.muted }}>
          <div style={{ display: "flex", letterSpacing: 2 }}>{`${profile.name} · ${profile.eyebrow}`.toUpperCase()}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: `2px solid ${OG.line}`,
              borderRadius: 999,
              padding: "8px 20px",
              color: OG.fg,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: OG.accent }} />
            {profile.status}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "auto",
            fontFamily: "Big Shoulders",
            fontWeight: 900,
            fontSize: 132,
            lineHeight: 0.9,
            letterSpacing: -1,
            textTransform: "uppercase",
          }}
        >
          <span style={{ marginRight: 28 }}>I</span>
          <span style={{ marginRight: 28, color: OG.accent }}>ship</span>
          <span style={{ marginRight: 28 }}>to the</span>
          <span style={{ marginRight: 28 }}>stores.</span>
          <span style={{ marginRight: 28 }}>And the</span>
          <span>browser.</span>
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 40, fontSize: 24, color: OG.muted }}>
          {["React Native · Next.js", "Youth AI on App Store & Google Play", "jay27codes.vercel.app"].map((t) => (
            <div key={t} style={{ display: "flex", border: `2px solid ${OG.line}`, borderRadius: 999, padding: "8px 20px" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
