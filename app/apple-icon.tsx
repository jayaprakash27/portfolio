import { ImageResponse } from "next/og";
import { Monogram, displayFontOptions } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen / bookmark icon. iOS rounds the corners itself. */
export default async function AppleIcon() {
  return new ImageResponse(<Monogram size={180} radius={0} />, { ...size, fonts: await displayFontOptions() });
}
