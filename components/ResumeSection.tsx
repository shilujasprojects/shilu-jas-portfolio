"use client";

import React from "react";
import Link from "next/link";
import { FileText, Download, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { PortfolioData } from "@/lib/types";

interface ResumeSectionProps {
  data: PortfolioData;
}

export default function ResumeSection({ data }: ResumeSectionProps) {
  return (
    <section id="resume" className="py-20 lg:py-28 relative bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] font-bold">
                CURRICULUM VITAE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              MY RESUME <br />
              <span className="gold-gradient-text">ATS-READY & DETAILED</span>
            </h2>
          </div>

          <p className="text-sm text-gray-400 max-w-md">
            A quick overview of my professional experience, verified skills, and academic achievements. Available for immediate download or interactive online review.
          </p>
        </div>

        {/* Resume Preview Banner Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0D1117] via-[#12161F] to-[#0D1117] border border-[#C9A86A]/40 shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A86A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#C9A86A]/15 text-[#C9A86A] border border-[#C9A86A]/30">
                <FileText className="w-3.5 h-3.5" />
                Updated Curriculum Vitae (2026)
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {data.profile.name} — {data.profile.role}
                </h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                  Specialized in MERN Stack, React.js, Next.js, and RESTful API backend architectures. 
                  Featuring 3 professional internships at Zonemac Solutions, Bairuhatech, and ICT Academy UL Cyberpark.
                </p>
              </div>

              {/* Fast Resume Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                  <span>Master of Computer Application (MCA) - KTU</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                  <span>Eventura MERN Flagship System</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                  <span>3 NPTEL Technical Certifications</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0" />
                  <span>Available for immediate onsite / remote roles</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/resume"
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all flex items-center gap-2 shadow-lg shadow-[#C9A86A]/20 hover:scale-105"
                >
                  <FileText className="w-4 h-4" />
                  View Interactive Live Resume
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/resume?print=true"
                  className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#C9A86A]" />
                  Download / Print Clean PDF
                </Link>
              </div>
            </div>

            {/* Right Visual Resume Mockup */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-xl bg-white p-5 text-gray-900 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-300 text-[10px] space-y-3 font-sans select-none">
                <div className="text-center border-b pb-2 border-gray-200">
                  <div className="font-extrabold text-xs tracking-wider text-black">SHILU JAS</div>
                  <div className="text-gray-600 font-semibold">MERN Stack Developer</div>
                  <div className="text-gray-500">{data.profile.email} | {data.profile.location}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-gray-800 text-[9px] uppercase tracking-wider border-b border-gray-300 pb-0.5">TECHNICAL SKILLS</div>
                  <div className="text-gray-700">React.js, Next.js, Node.js, Express, MongoDB, REST APIs</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-gray-800 text-[9px] uppercase tracking-wider border-b border-gray-300 pb-0.5">INTERNSHIPS</div>
                  <div className="font-semibold text-gray-800">Zonemac Solutions — MERN Developer</div>
                  <div className="text-gray-600">Bairuhatech — Software Developer & QA</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-gray-800 text-[9px] uppercase tracking-wider border-b border-gray-300 pb-0.5">PROJECTS</div>
                  <div className="font-semibold text-gray-800">Eventura — Event Booking System</div>
                </div>
                <div className="pt-1 text-center text-[#A38244] font-semibold text-[9px]">
                  Click to open full high-resolution version →
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
