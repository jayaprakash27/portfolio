import { ImageResponse } from "next/og";
import { Monogram, displayFontOptions } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Browser-tab icon: the lime "JS" squircle from the App Store card. */
export default async function Icon() {
  return new ImageResponse(<Monogram size={64} radius={16} />, { ...size, fonts: await displayFontOptions() });
}
