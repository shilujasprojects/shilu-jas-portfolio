"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/types";
import { Sparkles, Layers, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const displayedProjects = filter === "featured"
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-[#08090B]">
      {/* Background glow accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C9A86A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] font-bold">
                SELECTED WORK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projects I&apos;ve built to solve <br className="hidden sm:inline" />
              <span className="gold-gradient-text">real-world problems.</span>
            </h2>
          </div>

          <p className="text-sm text-gray-400 max-w-md">
            Production-quality applications featuring end-to-end full-stack architectures, interactive workflows, and robust database management.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Bottom Banner for Flagship Eventura */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#12161F] via-[#0D1117] to-[#12161F] border border-[#C9A86A]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C9A86A] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              FLAGSHIP MERN APPLICATION
            </div>
            <h3 className="text-xl font-bold text-white">
              Want a deep dive into Eventura&apos;s full-stack architecture?
            </h3>
            <p className="text-xs text-gray-400 max-w-xl">
              Inspect database schemas, booking state workflows, RESTful API controllers, JWT authentication guards, and the 60-second interactive project walkthrough.
            </p>
          </div>

          <Link
            href="/projects/eventura"
            className="px-6 py-3 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all shrink-0 flex items-center gap-2 shadow-lg shadow-[#C9A86A]/20"
          >
            Explore Eventura Case Study
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
