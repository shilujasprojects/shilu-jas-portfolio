"use client";

import React from "react";
import { CheckCircle2, Terminal, ShieldCheck, Database, Layout, Sparkles, MapPin, Award } from "lucide-react";
import { PortfolioData } from "@/lib/types";

interface AboutSectionProps {
  data: PortfolioData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const highlights = [
    { title: "Frontend Engineering", desc: "React.js, Next.js, responsive layouts, modular state" },
    { title: "Backend Architecture", desc: "Node.js, Express.js RESTful APIs, middleware & controllers" },
    { title: "Database Systems", desc: "MongoDB, Mongoose schemas, relational SQL & indexing" },
    { title: "Security & Auth", desc: "JWT authentication, HTTP-only tokens, route guards" },
    { title: "Admin Dashboards", desc: "CRUD portals, metrics visualization, inventory control" },
    { title: "QA & API Testing", desc: "Postman test suites, manual verification, Jira tracking" },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] font-bold">
            ABOUT THE DEVELOPER
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Visual Developer Avatar Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Glowing backdrops */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C9A86A]/20 via-transparent to-blue-500/10 blur-xl opacity-75" />
              
              <div className="relative rounded-2xl bg-[#0D1117] border border-white/10 p-6 shadow-2xl space-y-6">
                
                {/* Visual Avatar Placeholder & Identity Badge */}
                <div className="relative rounded-xl bg-gradient-to-b from-[#161C26] to-[#0D1117] border border-white/10 p-6 text-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A86A]/10 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Monogram Icon */}
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-[#12161F] border-2 border-[#C9A86A] flex items-center justify-center text-2xl font-extrabold text-[#C9A86A] shadow-xl shadow-[#C9A86A]/10 mb-4">
                    SJ
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {data.profile.name}
                  </h3>
                  <p className="text-xs font-mono text-[#C9A86A] mt-0.5">
                    {data.profile.title}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3 pt-3 border-t border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>{data.profile.location}</span>
                  </div>
                </div>

                {/* Developer Experience Badges */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#12161F] border border-white/5">
                    <span className="text-xs text-gray-400">Current Role</span>
                    <span className="text-xs font-semibold text-white">MERN Intern @ Zonemac</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#12161F] border border-white/5">
                    <span className="text-xs text-gray-400">Education</span>
                    <span className="text-xs font-semibold text-white">MCA (KTU University, 2025)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#12161F] border border-white/5">
                    <span className="text-xs text-gray-400">Specialization</span>
                    <span className="text-xs font-semibold text-[#C9A86A]">Full-Stack Web Engineering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              A developer who enjoys <br />
              <span className="gold-gradient-text">turning ideas into products.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              <p>
                I am a Full-Stack Developer with hands-on experience building modern, responsive, and scalable web applications. My foundation is built on the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** alongside modern frameworks like **Next.js**.
              </p>
              <p>
                From architecting database relationships and RESTful endpoints to designing polished user interfaces with micro-interactions, I focus on the complete product lifecycle. I believe in clean code, practical architecture, and software that delivers immediate value.
              </p>
            </div>

            {/* Core Capability Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#12161F]/60 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#C9A86A] font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
