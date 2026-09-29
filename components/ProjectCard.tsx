"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight, CheckCircle } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Default flags to true if not explicitly set
  const showLive = project.showLiveDemo !== false && project.isLiveAvailable && Boolean(project.liveUrl);
  const showCode = project.showGithub !== false && Boolean(project.githubUrl);
  const showCase = project.showCaseStudy !== false;

  return (
    <div className="group relative rounded-2xl bg-[#0D1117] border border-white/10 overflow-hidden hover:border-[#C9A86A]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#C9A86A]/10 flex flex-col justify-between">
      
      {/* Top Banner / Number & Category */}
      <div className="p-6 pb-0 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-bold text-[#C9A86A] px-2.5 py-1 rounded bg-[#C9A86A]/10 border border-[#C9A86A]/20">
            {project.number}
          </span>
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            {project.category}
          </span>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {project.status}
        </span>
      </div>

      {/* Main Content Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-white group-hover:text-[#C9A86A] transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs font-medium text-[#C9A86A] mt-0.5">
            {project.subtitle}
          </p>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed font-normal">
          {project.summary}
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {project.keyFeatures.slice(0, 4).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-400">
              <CheckCircle className="w-3.5 h-3.5 text-[#C9A86A] shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feature.title}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#12161F] text-gray-300 border border-white/5 group-hover:border-[#C9A86A]/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Action Buttons Footer */}
      <div className="p-6 pt-4 border-t border-white/10 bg-[#12161F]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Live Demo Link */}
          {showLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all flex items-center gap-1.5 shadow-md hover:scale-105"
            >
              Live Demo
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="px-3 py-2 rounded-lg text-xs font-medium bg-white/5 text-gray-400 border border-white/5">
              Demo in progress
            </span>
          )}

          {/* GitHub Source Code */}
          {showCode && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg text-xs font-medium bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
        </div>

        {/* Deep Case Study Link */}
        {showCase ? (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A86A] hover:text-[#E2C78E] transition-colors group/link"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <span className="text-xs text-gray-500 font-mono">Overview Available</span>
        )}
      </div>
    </div>
  );
}
