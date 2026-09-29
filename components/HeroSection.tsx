"use client";

import React from "react";
import { ArrowRight, Sparkles, Code2, Layers, ChevronDown } from "lucide-react";
import DeveloperTerminal from "./DeveloperTerminal";
import { PortfolioData } from "@/lib/types";

interface HeroSectionProps {
  data: PortfolioData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center subtle-grid-bg"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A86A]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Typography & Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#12161F] border border-white/10 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-300 font-mono tracking-wide">{data.profile.status}</span>
            </div>

            {/* Massive Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              BUILDING DIGITAL <br />
              EXPERIENCES THAT <br />
              <span className="gold-gradient-text">ACTUALLY WORK.</span>
            </h1>

            {/* Bio Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl font-normal leading-relaxed">
              Full-Stack Developer passionate about building modern, scalable and user-friendly web applications.
              Turning complex database schemas and REST APIs into seamless, high-performance digital products.
            </p>

            {/* Tech Badges Quick Bar */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-xs text-gray-400 font-mono">
              <span className="text-gray-500">Core:</span>
              {["MERN Stack", "React.js", "Next.js", "Node.js", "Express.js", "MongoDB"].map((badge) => (
                <span key={badge} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/5 border border-white/5 text-gray-300 text-[11px] sm:text-xs">
                  {badge}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A86A]/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl text-sm font-semibold bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                Let&apos;s Connect
                <ArrowRight className="w-4 h-4 text-[#C9A86A]" />
              </a>
            </div>
          </div>

          {/* Right Column: Developer Terminal Card */}
          <div className="lg:col-span-5 w-full">
            <DeveloperTerminal data={data} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center justify-center text-center">
          <a
            href="#currently"
            className="text-[11px] font-mono uppercase tracking-widest text-gray-500 hover:text-[#C9A86A] transition-colors flex flex-col items-center gap-1.5"
          >
            <span>Scroll To Explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#C9A86A]" />
          </a>
        </div>
      </div>
    </section>
  );
}
