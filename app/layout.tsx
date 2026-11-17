import type { Metadata } from "next";
import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { DotRingCursor } from "@/components/dot-ring-cursor";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for the giant headlines. Only the black (900) weight is
// used, so one static weight (~20 KB) instead of the variable family.
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: "900",
  // Next has no metrics to auto-tune a fallback for this family; use a
  // narrow system face so the swap barely shifts the layout.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "Jayaprakash Sahoo — React Native & Next.js Engineer",
    template: "%s · Jayaprakash Sahoo",
  },
  description:
    "Jayaprakash Sahoo, React Native and Next.js engineer. Shipped Youth AI to the App Store, Google Play and the web from one codebase, and built a Next.js variant browser over 1,378 Saudi exomes.",
  keywords: [
    "Jayaprakash Sahoo",
    "Jay Sahoo",
    "React Native Engineer",
    "Next.js Engineer",
    "React Native",
    "Expo",
    "TypeScript",
    "Next.js",
    "Mobile developer",
    "Portfolio",
  ],
  authors: [{ name: "Jayaprakash Sahoo" }],
  creator: "Jayaprakash Sahoo",
  openGraph: {
    type: "website",
    title: "Jayaprakash Sahoo — React Native & Next.js Engineer",
    description: "React Native & Next.js engineer. I ship to the stores. And the browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayaprakash Sahoo — React Native & Next.js Engineer",
    description: "React Native & Next.js engineer. I ship to the stores. And the browser.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-accent px-4 py-2 font-mono text-sm text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <LenisProvider>
          {children}
          <DotRingCursor />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--card)",
                border: "1px solid var(--line)",
                color: "var(--fg)",
              },
            }}
          />
        </LenisProvider>
      </body>
      <Analytics />
    </html>
  );
}
