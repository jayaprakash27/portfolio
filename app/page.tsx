import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { PageBackground } from "@/components/ui/page-background";

export default function Home() {
  return (
    <>
      {/* Persistent, viewport-fixed ambient mesh — keeps non-hero sections
          from feeling like a flat black page. Hero still has its own
          stronger gradient layered on top. */}
      <PageBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
