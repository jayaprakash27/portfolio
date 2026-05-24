import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { AchievementsProvider } from "@/components/gamification/achievements-provider";
import { AchievementsBadge } from "@/components/gamification/achievements-badge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jay-portfolio.vercel.app"),
  title: {
    default: "Jayaprakash Sahoo — Software Engineer",
    template: "%s · Jayaprakash Sahoo",
  },
  description:
    "Portfolio of Jayaprakash Sahoo — Software Engineer crafting performant, futuristic interfaces with Next.js, React, and React Native.",
  keywords: [
    "Jayaprakash Sahoo",
    "Jay Sahoo",
    "Software Engineer",
    "Next.js",
    "React",
    "React Native",
    "Portfolio",
    "Frontend",
    "TypeScript",
  ],
  authors: [{ name: "Jayaprakash Sahoo" }],
  creator: "Jayaprakash Sahoo",
  openGraph: {
    type: "website",
    title: "Jayaprakash Sahoo — Software Engineer",
    description:
      "Crafting performant, futuristic interfaces with Next.js, React, and React Native.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayaprakash Sahoo — Software Engineer",
    description:
      "Crafting performant, futuristic interfaces with Next.js, React, and React Native.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Inline so Lightning CSS doesn't strip the unprefixed backdrop-filter.
            See note in app/globals.css. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
.glass{backdrop-filter:blur(28px) saturate(160%);-webkit-backdrop-filter:blur(28px) saturate(160%)}
.glass-strong{backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%)}
`,
          }}
        />
      </head>
      <body className="relative min-h-full">
        <LenisProvider>
          <AchievementsProvider>
            {children}
            <AchievementsBadge />
            <Toaster
              theme="dark"
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "rgba(20, 20, 28, 0.7)",
                  backdropFilter: "blur(20px) saturate(160%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                },
              }}
            />
          </AchievementsProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
