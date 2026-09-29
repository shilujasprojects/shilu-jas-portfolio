import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, AlertTriangle, Lightbulb, Sparkles, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import ProjectWalkthrough from "@/components/ProjectWalkthrough";
import { getPortfolioData, getProjectBySlug } from "@/lib/data";
import type { Metadata } from "next";

export const revalidate = 0;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} — Case Study | Shilu Jas`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Full-Stack Case Study`,
      description: project.summary,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const data = await getPortfolioData();
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const showLive = project.showLiveDemo !== false && project.isLiveAvailable && Boolean(project.liveUrl);
  const showCode = project.showGithub !== false && Boolean(project.githubUrl);

  // Find index for next/prev project navigation
  const currentIndex = data.projects.findIndex((p) => p.slug === project.slug);
  const nextProject = data.projects[(currentIndex + 1) % data.projects.length];
  const prevProject = data.projects[(currentIndex - 1 + data.projects.length) % data.projects.length];

  return (
    <main className="min-h-screen bg-[#08090B] text-primaryText">
      <Navbar data={data} />

      {/* Hero Header */}
      <section className="pt-32 pb-16 border-b border-white/5 bg-[#0D1117]/60 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#C9A86A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Selected Work
          </Link>

          {/* Project Title & Category */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-[#C9A86A] px-2.5 py-1 rounded bg-[#C9A86A]/10 border border-[#C9A86A]/20">
                  PROJECT {project.number}
                </span>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {project.status}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-[#C9A86A] font-medium">
                {project.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {showLive ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all flex items-center gap-2 shadow-lg shadow-[#C9A86A]/20"
                >
                  Live Demo
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="px-4 py-2.5 rounded-xl text-xs font-medium bg-white/5 text-gray-400 border border-white/5">
                  Demo Deployment in Progress
                </span>
              )}

              {showCode && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 text-white hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View Source
                </a>
              )}
            </div>
          </div>

          {/* Tech stack badge row */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-[#12161F] text-gray-300 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* Case Study Body Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Overview, Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Overview Card */}
            <div className="p-6 rounded-2xl bg-[#0D1117] border border-white/5 space-y-3 shadow">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C9A86A] uppercase font-bold">
                <Sparkles className="w-4 h-4" />
                Overview
              </div>
              <h3 className="text-lg font-bold text-white">The Vision</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Problem Card */}
            <div className="p-6 rounded-2xl bg-[#0D1117] border border-white/5 space-y-3 shadow">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase font-bold">
                <AlertTriangle className="w-4 h-4" />
                The Problem
              </div>
              <h3 className="text-lg font-bold text-white">Challenges Faced</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution Card */}
            <div className="p-6 rounded-2xl bg-[#0D1117] border border-white/5 space-y-3 shadow">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase font-bold">
                <Lightbulb className="w-4 h-4" />
                The Solution
              </div>
              <h3 className="text-lg font-bold text-white">Architecture & UX</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </div>

          </div>

          {/* 60-Second Walkthrough Simulation */}
          {project.walkthroughSteps && project.walkthroughSteps.length > 0 && (
            <ProjectWalkthrough
              steps={project.walkthroughSteps}
              projectTitle={project.title}
            />
          )}

          {/* System Architecture Diagram */}
          {project.architecture && (
            <ArchitectureDiagram
              architecture={project.architecture}
              projectTitle={project.title}
            />
          )}

          {/* Key Features Grid */}
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] font-bold">
                CORE CAPABILITIES
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Key Product Features
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#0D1117] border border-white/5 hover:border-[#C9A86A]/30 transition-colors space-y-2 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A86A]" />
                    <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed pl-6">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Challenges & Solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6 shadow">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] font-bold">
                  DEEP DIVE
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  Real Engineering Challenges & Technical Solutions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.challenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#12161F] border border-white/5 space-y-3"
                  >
                    <div className="text-xs font-bold text-rose-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      Challenge: {c.challenge}
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed pl-4 border-l border-[#C9A86A]/30">
                      <span className="text-[#C9A86A] font-semibold block mb-0.5">Solution:</span>
                      {c.solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next / Previous Project Footer Navigation */}
          <div className="pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="p-5 rounded-xl bg-[#0D1117] border border-white/5 hover:border-[#C9A86A]/40 transition-colors flex items-center gap-4 group text-left"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-[#C9A86A] transition-colors" />
              <div>
                <div className="text-[10px] font-mono text-gray-500">PREVIOUS PROJECT</div>
                <div className="text-sm font-bold text-white group-hover:text-[#C9A86A] transition-colors">
                  {prevProject.title}
                </div>
              </div>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="p-5 rounded-xl bg-[#0D1117] border border-white/5 hover:border-[#C9A86A]/40 transition-colors flex items-center justify-between group text-right"
            >
              <div>
                <div className="text-[10px] font-mono text-gray-500">NEXT PROJECT</div>
                <div className="text-sm font-bold text-white group-hover:text-[#C9A86A] transition-colors">
                  {nextProject.title}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#C9A86A] transition-colors" />
            </Link>
          </div>

        </div>
      </section>

      <Footer data={data} />
    </main>
  );
}
