import { Navbar } from "@/components/navbar";
import { CommandPalette } from "@/components/command-palette";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen relative z-10">
      <CommandPalette />
      <Navbar />
      {/* Recruiter-first order: what you did, then what you built, then who you are. */}
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <InteractiveTerminal />
      <ContactSection />
      <Footer />
    </main>
  );
}
