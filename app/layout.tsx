import type { Metadata } from "next";
import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for the giant headlines. Google ships "Big Shoulders" as one
// variable family; the optical-size axis lets large headlines pick the
// display cut automatically (font-optical-sizing: auto).
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
  // Next has no metrics to auto-tune a fallback for this family; use a
  // narrow system face so the swap barely shifts the layout.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jay27codes.vercel.app"),
  title: {
    default: "Jayaprakash Sahoo — React Native Engineer",
    template: "%s · Jayaprakash Sahoo",
  },
  description:
    "Jayaprakash Sahoo, React Native engineer. Shipped an Expo app to the App Store, Google Play and web from one codebase, owning native work, performance and releases.",
  keywords: [
    "Jayaprakash Sahoo",
    "Jay Sahoo",
    "React Native Engineer",
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
    title: "Jayaprakash Sahoo — React Native Engineer",
    description: "React Native engineer. I ship to the stores: iOS, Android and web from one codebase.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayaprakash Sahoo — React Native Engineer",
    description: "React Native engineer. I ship to the stores: iOS, Android and web from one codebase.",
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
        <LenisProvider>
          {children}
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
