"use client";

import React, { useState } from "react";
import { Briefcase, GraduationCap, Award, CheckCircle2, Calendar, MapPin, ExternalLink } from "lucide-react";
import { ExperienceItem, EducationItem, CertificationItem } from "@/lib/types";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
}

export default function ExperienceSection({
  experience,
  education,
  certifications,
}: ExperienceSectionProps) {
  const [activeView, setActiveView] = useState<"experience" | "education" | "certifications">("experience");

  return (
    <section id="experience" className="py-20 lg:py-28 relative bg-[#0D1117]/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] font-bold">
                CAREER & FOUNDATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Experience & <br />
              <span className="gold-gradient-text">Academic Background.</span>
            </h2>
          </div>

          {/* Toggle Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#12161F] p-1 sm:p-1.5 rounded-xl border border-white/5 overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveView("experience")}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeView === "experience"
                  ? "bg-[#C9A86A] text-black shadow-md font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Internships ({experience.length})
            </button>
            <button
              onClick={() => setActiveView("education")}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeView === "education"
                  ? "bg-[#C9A86A] text-black shadow-md font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Education ({education.length})
            </button>
            <button
              onClick={() => setActiveView("certifications")}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeView === "certifications"
                  ? "bg-[#C9A86A] text-black shadow-md font-bold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Certifications ({certifications.length})
            </button>
          </div>
        </div>

        {/* Dynamic Content Views */}
        {activeView === "experience" && (
          <div className="space-y-6">
            {experience.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#12161F] border border-white/5 hover:border-[#C9A86A]/40 transition-all duration-300 space-y-4 hover:shadow-xl hover:shadow-[#C9A86A]/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {item.role}
                      </h3>
                      {item.badge === "Current" && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Current Role
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#C9A86A] mt-0.5">
                      {item.company} <span className="text-gray-500 font-normal">• {item.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A86A]" />
                    {item.period}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5">
                  {item.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-black/40 text-gray-400 border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === "education" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#12161F] border border-white/5 hover:border-[#C9A86A]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/5">
                      <GraduationCap className="w-5 h-5 text-[#C9A86A]" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#C9A86A] bg-[#C9A86A]/10 px-2 py-0.5 rounded">
                      {edu.score}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-semibold text-gray-300 mt-1">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {edu.location}
                  </p>

                  <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                    {edu.details}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-gray-500">
                  {edu.period}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView === "certifications" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {certifications?.map((cert, idx) => {
              const certLink = cert.pdfUrl || cert.url;
              return (
                <div
                  key={cert.id || idx}
                  className="p-5 rounded-xl bg-[#12161F] border border-white/5 hover:border-[#C9A86A]/30 transition-all duration-300 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-lg bg-[#C9A86A]/10 w-fit">
                      <Award className="w-5 h-5 text-[#C9A86A]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-[#C9A86A] mt-0.5 font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-gray-500 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span>Year: {cert.year}</span>
                    {certLink && (
                      <a
                        href={certLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#C9A86A] hover:underline flex items-center gap-1 font-semibold text-xs"
                      >
                        View PDF <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
