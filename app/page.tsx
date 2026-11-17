import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Nudge } from "@/components/nudge";
import { Hero } from "@/components/sections/hero";
import { Tldr } from "@/components/sections/tldr";
import { Story } from "@/components/story/story";
import { Changelog } from "@/components/sections/changelog";
import { Projects } from "@/components/sections/projects";
import { Toolbox } from "@/components/sections/toolbox";
import { TheEnd } from "@/components/sections/the-end";

/**
 * Two reading speeds on one page:
 * - skim: hero → Skip intro → App Store card (everything in one card),
 * - read: the story chapters with their scenes, then the changelog.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <Tldr />
        <Story />
        <Changelog />
        <Projects />
        <Toolbox />
        <TheEnd />
      </main>
      <Footer />
      <Nudge />
    </>
  );
}
