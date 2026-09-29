import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import HowIBuildSection from "@/components/HowIBuildSection";
import ExperienceSection from "@/components/ExperienceSection";
import GitHubActivitySection from "@/components/GitHubActivitySection";
import PhilosophySection from "@/components/PhilosophySection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getPortfolioData } from "@/lib/data";

export const revalidate = 0; // Dynamic server rendering for live updates

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <main className="min-h-screen bg-background text-primaryText selection:bg-accent/30 selection:text-white">
      {/* Navigation */}
      <Navbar data={data} />

      {/* Hero Section */}
      <HeroSection data={data} />

      {/* Currently Building */}
      <CurrentlyBuilding items={data.currentlyBuilding} />

      {/* About Section */}
      <AboutSection data={data} />

      {/* Selected Work */}
      <ProjectsSection projects={data.projects} />

      {/* How I Build */}
      <HowIBuildSection steps={data.howIBuild} />

      {/* Tech Stack Matrix */}
      <TechStackSection skills={data.skills} />

      {/* Experience & Education */}
      <ExperienceSection
        experience={data.experience}
        education={data.education}
        certifications={data.certifications}
      />

      {/* GitHub Activity */}
      <GitHubActivitySection
        activity={data.githubActivity}
        githubUrl={data.profile.github}
      />

      {/* Developer Philosophy */}
      <PhilosophySection items={data.philosophy} />

      {/* Resume Section */}
      <ResumeSection data={data} />

      {/* Contact Section */}
      <ContactSection data={data} />

      {/* Footer */}
      <Footer data={data} />
    </main>
  );
}
