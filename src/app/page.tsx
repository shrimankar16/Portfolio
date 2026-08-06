import { loadConfig } from "@/lib/config";
import SpaceBackground from "@/components/SpaceBackground";
import LaunchScreen from "@/components/LaunchScreen";
import EffectsToggle from "@/components/EffectsToggle";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import ProjectsSection from "@/components/ProjectsSection";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const config = loadConfig();
  const { profile, projects, skills } = config;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <LaunchScreen />
      <SpaceBackground />
      <Navbar name={profile.name} />
      <EffectsToggle />
      <Hero profile={profile} />
      <About profile={profile} />
      <Experience />
      <Education />
      <ProjectsSection projects={projects} />
      <Skills groups={skills} />
      <Contact profile={profile} />
      <Footer />
    </main>
  );
}
