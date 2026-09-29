"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Printer, ArrowLeft, ExternalLink, Sparkles, Check, Download, FileText, Sun, Moon } from "lucide-react";
import { PortfolioData } from "@/lib/types";

export default function ResumePage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState<"ats" | "dark">("ats");

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Check saved theme
    const savedTheme = typeof window !== "undefined" ? (localStorage.getItem("portfolio_theme") as "dark" | "light") : "dark";
    if (savedTheme === "light") {
      setThemeMode("ats");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else if (savedTheme === "dark") {
      setThemeMode("dark");
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const handleToggleMode = (mode: "ats" | "dark") => {
    setThemeMode(mode);
    if (mode === "ats") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio_theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("portfolio_theme", "dark");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 border-2 border-[#C9A86A] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-gray-400">Loading Resume Data...</span>
        </div>
      </div>
    );
  }

  // Format skills dynamically from data
  const frontendSkills = data.skills?.frontend?.map((s) => s.name).join(", ") || "React.js, Next.js, JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS";
  const backendSkills = data.skills?.backend?.map((s) => s.name).join(", ") || "Node.js, Express.js, REST APIs, JWT, Mongoose";
  const databaseSkills = data.skills?.database?.map((s) => s.name).join(", ") || "MongoDB, MySQL";
  const toolsSkills = data.skills?.tools?.map((s) => s.name).join(", ") || "Git, GitHub, Postman, VS Code, Jira, Vercel";
  const testingSkills = data.skills?.testing?.map((s) => s.name).join(", ") || "REST APIs, CRUD Operations, Responsive Design, API Testing, Debugging";

  const isAts = themeMode === "ats";

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors ${isAts ? "bg-slate-100" : "bg-[#08090B]"}`}>
      
      {/* Top Controls Toolbar (Hidden during print) */}
      <div className="max-w-4xl mx-auto mb-6 no-print flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-[#0D1117] border border-white/10 shadow-xl">
        <Link
          href="/"
          className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-gray-300 hover:text-[#C9A86A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Portfolio
        </Link>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-[#12161F] p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleToggleMode("ats")}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              isAts
                ? "bg-[#C9A86A] text-black shadow font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            ATS Clean (Light)
          </button>
          <button
            onClick={() => handleToggleMode("dark")}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              !isAts
                ? "bg-[#C9A86A] text-black shadow font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            Dark Luxury View
          </button>
        </div>

        {/* Print / Export Button */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A86A]/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>

          <Link
            href="/admin"
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 border border-white/10"
            title="Edit Resume Details in Admin"
          >
            Edit in Admin
          </Link>
        </div>
      </div>

      {/* Main Resume Canvas */}
      <div
        className={`max-w-4xl mx-auto rounded-xl p-4 sm:p-8 md:p-12 shadow-2xl transition-all print-resume-container font-sans ${
          isAts
            ? "bg-white text-slate-900 border border-slate-300"
            : "bg-[#0D1117] text-gray-100 border border-[#C9A86A]/30"
        }`}
      >
        
        {/* Header Name & Contact */}
        <div className={`text-center pb-4 space-y-1.5 border-b-2 ${isAts ? "border-slate-800" : "border-[#C9A86A]/50"}`}>
          <h1 className={`text-3xl sm:text-4xl font-black tracking-tight uppercase ${isAts ? "text-slate-950" : "text-white"}`}>
            {data.profile.name}
          </h1>
          <p className={`text-sm font-bold tracking-wide ${isAts ? "text-slate-700" : "text-[#C9A86A]"}`}>
            {data.profile.role || "MERN Stack Developer"}
          </p>

          <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs pt-1 ${isAts ? "text-slate-700" : "text-gray-300"}`}>
            <a href={`mailto:${data.profile.email}`} className={`${isAts ? "text-blue-700 hover:underline" : "text-[#C9A86A] hover:underline"}`}>
              {data.profile.email}
            </a>
            <span>|</span>
            <span className="font-medium">{data.profile.phone}</span>
            <span>|</span>
            <span>{data.profile.location}</span>
            <span>|</span>
            <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className={`${isAts ? "text-blue-700 hover:underline" : "text-[#C9A86A] hover:underline"}`}>
              LinkedIn
            </a>
            <span>|</span>
            <a href={data.profile.github} target="_blank" rel="noreferrer" className={`${isAts ? "text-blue-700 hover:underline" : "text-[#C9A86A] hover:underline"}`}>
              GitHub
            </a>
            <span>|</span>
            <Link href="/" className={`${isAts ? "text-blue-700 hover:underline" : "text-[#C9A86A] hover:underline"}`}>
              Portfolio
            </Link>
          </div>
        </div>

        {/* 1. PROFILE SECTION */}
        <div className="mt-5 space-y-1.5 resume-item-block">
          <h2 className={`text-xs font-black tracking-wider uppercase pb-0.5 border-b resume-section-heading ${isAts ? "text-slate-900 border-slate-400" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
            PROFILE
          </h2>
          <p className={`text-xs leading-relaxed text-justify ${isAts ? "text-slate-800" : "text-gray-300"}`}>
            {data.profile.bio} Actively seeking an onsite role in Calicut to collaborate and grow on real-world projects.
          </p>
        </div>

        {/* 2. TECHNICAL SKILLS SECTION */}
        <div className="mt-5 space-y-2 resume-item-block">
          <h2 className={`text-xs font-black tracking-wider uppercase pb-0.5 border-b resume-section-heading ${isAts ? "text-slate-900 border-slate-400" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
            TECHNICAL SKILLS
          </h2>
          <div className={`text-xs space-y-1 ${isAts ? "text-slate-800" : "text-gray-200"}`}>
            <div>
              <span className={`font-bold ${isAts ? "text-slate-950" : "text-white"}`}>Frontend: </span>
              {frontendSkills}
            </div>
            <div>
              <span className={`font-bold ${isAts ? "text-slate-950" : "text-white"}`}>Backend: </span>
              {backendSkills}
            </div>
            <div>
              <span className={`font-bold ${isAts ? "text-slate-950" : "text-white"}`}>Database: </span>
              {databaseSkills}
            </div>
            <div>
              <span className={`font-bold ${isAts ? "text-slate-950" : "text-white"}`}>Tools & Technologies: </span>
              {toolsSkills}
            </div>
            <div>
              <span className={`font-bold ${isAts ? "text-slate-950" : "text-white"}`}>Core Concepts: </span>
              {testingSkills}
            </div>
          </div>
        </div>

        {/* 3. INTERNSHIP EXPERIENCE SECTION */}
        <div className="mt-5 space-y-3.5">
          <h2 className={`text-xs font-black tracking-wider uppercase pb-0.5 border-b resume-section-heading ${isAts ? "text-slate-900 border-slate-400" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
            INTERNSHIP EXPERIENCE
          </h2>
          
          {data.experience.map((exp) => (
            <div key={exp.id} className="space-y-1 resume-item-block">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <span className={`font-bold text-sm ${isAts ? "text-slate-950" : "text-white"}`}>{exp.role}</span>
                  <div className={`font-medium ${isAts ? "text-slate-700" : "text-[#C9A86A]"}`}>
                    {exp.company} | {exp.location}
                  </div>
                </div>
                <span className={`font-mono text-[11px] ${isAts ? "text-slate-600" : "text-gray-400"}`}>
                  {exp.period}
                </span>
              </div>

              <ul className={`list-disc list-outside pl-4 text-xs space-y-0.5 leading-relaxed ${isAts ? "text-slate-800" : "text-gray-300"}`}>
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 4. PROJECTS SECTION */}
        <div className="mt-5 space-y-3.5">
          <h2 className={`text-xs font-black tracking-wider uppercase pb-0.5 border-b resume-section-heading ${isAts ? "text-slate-900 border-slate-400" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
            PROJECTS
          </h2>

          {data.projects.map((proj) => (
            <div key={proj.slug} className="space-y-1 resume-item-block">
              <div className="flex justify-between items-start text-xs">
                <span className={`font-bold text-sm ${isAts ? "text-slate-950" : "text-white"}`}>
                  {proj.title} – {proj.subtitle}
                </span>
                <span className={`font-mono text-[11px] ${isAts ? "text-slate-600" : "text-gray-400"}`}>
                  {proj.status}
                </span>
              </div>
              <div className={`text-[11px] italic ${isAts ? "text-slate-600" : "text-[#C9A86A]"}`}>
                Tech: {proj.technologies.join(", ")}
              </div>
              <p className={`text-xs leading-relaxed ${isAts ? "text-slate-800" : "text-gray-300"}`}>
                {proj.summary}
              </p>
              {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                <ul className={`list-disc list-outside pl-4 text-xs space-y-0.5 leading-snug ${isAts ? "text-slate-800" : "text-gray-300"}`}>
                  {proj.keyFeatures.slice(0, 3).map((f, fIdx) => (
                    <li key={fIdx}>
                      <span className="font-semibold">{f.title}:</span> {f.desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* 5. EDUCATION SECTION */}
        <div className="mt-5 space-y-2.5 resume-item-block">
          <h2 className={`text-xs font-black tracking-wider uppercase pb-0.5 border-b resume-section-heading ${isAts ? "text-slate-900 border-slate-400" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
            EDUCATION
          </h2>
          
          <div className="space-y-2.5 text-xs">
            {data.education.map((edu, eIdx) => (
              <div key={eIdx} className="flex justify-between items-start">
                <div>
                  <span className={`font-bold ${isAts ? "text-slate-950" : "text-white"}`}>{edu.degree}</span>
                  <div className={`${isAts ? "text-slate-700" : "text-gray-300"}`}>
                    {edu.institution} | <span className={`font-bold ${isAts ? "text-slate-950" : "text-[#C9A86A]"}`}>{edu.score}</span>
                  </div>
                </div>
                <span className={`font-mono text-[11px] ${isAts ? "text-slate-600" : "text-gray-400"}`}>{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. CERTIFICATIONS SECTION */}
        <div className="mt-5 space-y-1.5 resume-item-block">
          <h2 className={`text-xs font-black tracking-wider uppercase pb-0.5 border-b resume-section-heading ${isAts ? "text-slate-900 border-slate-400" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
            CERTIFICATIONS
          </h2>
          <ul className={`list-disc list-outside pl-4 text-xs space-y-1 ${isAts ? "text-slate-800" : "text-gray-300"}`}>
            {data.certifications?.map((cert, cIdx) => {
              const certLink = cert.pdfUrl || cert.url;
              return (
                <li key={cert.id || cIdx}>
                  <span className="font-semibold">{cert.title}</span> – {cert.issuer} ({cert.year})
                  {certLink && (
                    <a
                      href={certLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`ml-2 inline-flex items-center gap-0.5 underline text-[11px] font-medium no-print ${isAts ? "text-blue-700 hover:text-blue-900" : "text-[#C9A86A] hover:text-[#E2C78E]"}`}
                    >
                      View Certificate PDF <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* 7. LANGUAGES SECTION */}
        <div className="mt-5 space-y-1 resume-item-block">
          <h2 className={`text-xs font-black tracking-wider uppercase pb-0.5 border-b resume-section-heading ${isAts ? "text-slate-900 border-slate-400" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
            LANGUAGES
          </h2>
          <div className={`text-xs ${isAts ? "text-slate-800" : "text-gray-200"}`}>
            <span className="font-bold">English</span> (Fluent) • <span className="font-bold">Malayalam</span> (Fluent)
          </div>
        </div>

      </div>

      {/* Bottom Back Button */}
      <div className="max-w-4xl mx-auto mt-8 text-center no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#C9A86A] hover:underline"
        >
          ← Return to Main Portfolio Experience
        </Link>
      </div>
    </div>
  );
}
