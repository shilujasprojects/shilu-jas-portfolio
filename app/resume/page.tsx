"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Printer, ArrowLeft, ExternalLink, Download, Sun, Moon } from "lucide-react";
import { PortfolioData } from "@/lib/types";

export default function ResumePage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState<"ats" | "dark">("ats");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));

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

  const handleDownloadPdf = async () => {
    if (typeof window === "undefined" || !data) return;
    const element = document.getElementById("ats-resume-document");
    if (!element) return;

    setDownloading(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const fileName = `${data.profile.name ? data.profile.name.replace(/\s+/g, "_") : "Shilu_Jas"}_Resume.pdf`;

      const opt: any = {
        margin: 5,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed, falling back to print", err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center text-white font-sans">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 border-2 border-[#C9A86A] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-gray-400">Loading ATS Resume Data...</span>
        </div>
      </div>
    );
  }

  // Format skills dynamically from data
  const frontendSkills = data.skills?.frontend?.map((s) => s.name).join(", ") || "HTML5, CSS3, Bootstrap, JavaScript (ES6+), React.js, Next.js, Responsive Web Design";
  const backendSkills = data.skills?.backend?.map((s) => s.name).join(", ") || "Node.js, Express.js, REST APIs, JWT, Authentication";
  const databaseSkills = data.skills?.database?.map((s) => s.name).join(", ") || "MongoDB, Mongoose, MySQL";
  const toolsSkills = data.skills?.tools?.map((s) => s.name).join(", ") || "Git, GitHub, VS Code, Postman, Jira, Vercel";
  const testingSkills = data.skills?.testing?.map((s) => s.name).join(", ") || "CRUD Operations, REST API Development, API Integration, MVC Architecture, Responsive Web Design";

  const isAts = themeMode === "ats";

  return (
    <div className={`min-h-screen py-6 px-4 sm:px-6 lg:px-8 transition-colors ${isAts ? "bg-slate-100" : "bg-[#08090B]"}`}>

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
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${isAts
              ? "bg-[#C9A86A] text-black shadow font-bold"
              : "text-gray-400 hover:text-white"
              }`}
          >
            <Sun className="w-3.5 h-3.5" />
            ATS Standard Template
          </button>
          <button
            onClick={() => handleToggleMode("dark")}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${!isAts
              ? "bg-[#C9A86A] text-black shadow font-bold"
              : "text-gray-400 hover:text-white"
              }`}
          >
            <Moon className="w-3.5 h-3.5" />
            Dark Luxury Mode
          </button>
        </div>

        {/* Download Button */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A86A]/20 cursor-pointer"
          >
            {downloading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Downloading PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Resume PDF
              </>
            )}
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

      {/* Main Resume Canvas (Exact ATS Template Match) */}
      <div
        id="ats-resume-document"
        className={`max-w-4xl mx-auto shadow-2xl transition-all print-resume-container font-sans overflow-hidden ${isAts
          ? "bg-white text-slate-900 border-none rounded-none sm:rounded-lg"
          : "bg-[#0D1117] text-gray-100 border-none rounded-none sm:rounded-lg"
          }`}
      >

        {/* 1. Header Dark Navy Blue Banner */}
        <div className={`p-6 sm:p-8 text-left space-y-2 resume-header-banner ${isAts ? "bg-[#0B2545]" : "bg-[#0D1117] border-b border-[#C9A86A]/40"}`} style={{ backgroundColor: isAts ? "#0B2545" : "#0D1117", color: "#ffffff" }}>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase resume-header-name" style={{ color: "#ffffff" }}>
            {data.profile.name}
          </h1>
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase resume-header-role font-mono" style={{ color: "#90CAF9" }}>
            {data.profile.role ? data.profile.role.toUpperCase() : "FULL STACK DEVELOPER (MERN)"}
          </p>

          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 text-xs pt-2 font-medium" style={{ color: "#ffffff" }}>
            <a href={`mailto:${data.profile.email}`} className="hover:text-[#90CAF9] hover:underline transition-colors" style={{ color: "#ffffff" }}>
              {data.profile.email}
            </a>
            <span style={{ color: "#94a3b8" }}>|</span>
            <span style={{ color: "#ffffff" }}>{data.profile.phone}</span>
            <span style={{ color: "#94a3b8" }}>|</span>
            <span style={{ color: "#ffffff" }}>{data.profile.location}</span>
            <span style={{ color: "#94a3b8" }}>|</span>
            <a href={data.profile.github} target="_blank" rel="noreferrer" className="hover:text-[#90CAF9] hover:underline transition-colors" style={{ color: "#ffffff" }}>
              GitHub
            </a>
            <span style={{ color: "#94a3b8" }}>|</span>
            <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#90CAF9] hover:underline transition-colors" style={{ color: "#ffffff" }}>
              LinkedIn
            </a>
            <span style={{ color: "#94a3b8" }}>|</span>
            <Link href="/" className="hover:text-[#90CAF9] hover:underline transition-colors" style={{ color: "#ffffff" }}>
              Portfolio
            </Link>
          </div>
        </div>

        {/* Thin accent line under header */}
        <div className="h-1 bg-[#1E88E5]" />

        {/* Inner Resume Body */}
        <div className="p-6 sm:p-8 md:p-10 space-y-6">

          {/* 2. SUMMARY SECTION */}
          <div className="space-y-2 resume-section-block">
            <h2 className={`text-xs font-black tracking-wider uppercase pb-2.5 border-b-2 resume-section-heading ${isAts ? "text-[#0B2545] border-[#90CAF9]" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
              SUMMARY
            </h2>
            <p className={`text-xs leading-relaxed text-justify ${isAts ? "text-slate-800" : "text-gray-300"}`}>
              {data.profile.bio} Full Stack Developer (MERN) with hands-on internship experience building scalable web applications using React.js, Node.js, Express.js, and MongoDB. Passionate about building clean, responsive, and user-focused applications while continuously learning modern web technologies.
            </p>
          </div>

          {/* 3. TECHNICAL SKILLS SECTION */}
          <div className="space-y-2.5 resume-section-block">
            <h2 className={`text-xs font-black tracking-wider uppercase pb-2.5 border-b-2 resume-section-heading ${isAts ? "text-[#0B2545] border-[#90CAF9]" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
              TECHNICAL SKILLS
            </h2>
            <div className={`text-xs space-y-1.5 ${isAts ? "text-slate-800" : "text-gray-200"}`}>
              <div className="flex items-start">
                <span className={`font-bold w-24 sm:w-28 shrink-0 ${isAts ? "text-slate-950" : "text-white"}`}>Frontend</span>
                <span>{frontendSkills}</span>
              </div>
              <div className="flex items-start">
                <span className={`font-bold w-24 sm:w-28 shrink-0 ${isAts ? "text-slate-950" : "text-white"}`}>Backend</span>
                <span>{backendSkills}</span>
              </div>
              <div className="flex items-start">
                <span className={`font-bold w-24 sm:w-28 shrink-0 ${isAts ? "text-slate-950" : "text-white"}`}>Database</span>
                <span>{databaseSkills}</span>
              </div>
              <div className="flex items-start">
                <span className={`font-bold w-24 sm:w-28 shrink-0 ${isAts ? "text-slate-950" : "text-white"}`}>Tools</span>
                <span>{toolsSkills}</span>
              </div>
              <div className="flex items-start">
                <span className={`font-bold w-24 sm:w-28 shrink-0 ${isAts ? "text-slate-950" : "text-white"}`}>Concepts</span>
                <span>{testingSkills}</span>
              </div>
            </div>
          </div>

          {/* 4. EXPERIENCE SECTION */}
          <div className="space-y-4 resume-section-block">
            <h2 className={`text-xs font-black tracking-wider uppercase pb-2.5 border-b-2 resume-section-heading ${isAts ? "text-[#0B2545] border-[#90CAF9]" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
              EXPERIENCE
            </h2>

            {data.experience.map((exp) => (
              <div key={exp.id} className="space-y-1.5 resume-item-block">
                <div className="flex justify-between items-start text-xs">
                  <span className={`font-bold text-xs sm:text-sm ${isAts ? "text-slate-950" : "text-white"}`}>{exp.role}</span>
                  <span className={`font-semibold text-xs ${isAts ? "text-[#0B2545]" : "text-[#C9A86A]"}`}>
                    {exp.period}
                  </span>
                </div>
                <div className={`text-xs font-medium ${isAts ? "text-slate-700" : "text-gray-400"}`}>
                  {exp.company} · {exp.location}
                </div>

                <ul className="space-y-1 text-xs pt-0.5">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className={`text-base leading-none select-none shrink-0 mt-0.5 ${isAts ? "text-slate-900 font-bold" : "text-gray-200"}`}>•</span>
                      <span className={isAts ? "text-slate-800" : "text-gray-300"}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 5. PROJECTS SECTION */}
          <div className="space-y-4 resume-section-block">
            <h2 className={`text-xs font-black tracking-wider uppercase pb-2.5 border-b-2 resume-section-heading ${isAts ? "text-[#0B2545] border-[#90CAF9]" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
              PROJECTS
            </h2>

            {data.projects.map((proj) => (
              <div key={proj.slug} className="space-y-1.5 resume-item-block">
                <div className="flex justify-between items-start text-xs">
                  <span className={`font-bold text-xs sm:text-sm ${isAts ? "text-slate-950" : "text-white"}`}>
                    {proj.title} – {proj.subtitle}
                  </span>
                  <div className="flex items-center gap-3 no-print">
                    {proj.showLiveDemo !== false && proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="font-semibold text-xs text-blue-700 hover:underline">
                        Live Demo
                      </a>
                    )}
                    {proj.showGithub !== false && proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="font-semibold text-xs text-blue-700 hover:underline">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                <div className="text-[11px] font-medium text-blue-700">
                  {proj.technologies.join(" · ")}
                </div>

                <p className={`text-xs leading-relaxed ${isAts ? "text-slate-800" : "text-gray-300"}`}>
                  {proj.summary}
                </p>

                {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                  <ul className="space-y-1 text-xs pt-0.5">
                    {proj.keyFeatures.slice(0, 3).map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className={`text-base leading-none select-none shrink-0 mt-0.5 ${isAts ? "text-slate-900 font-bold" : "text-gray-200"}`}>•</span>
                        <span className={isAts ? "text-slate-800" : "text-gray-300"}>
                          <span className="font-semibold">{f.title}:</span> {f.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* 6. EDUCATION SECTION */}
          <div className="space-y-3 resume-section-block">
            <h2 className={`text-xs font-black tracking-wider uppercase pb-2.5 border-b-2 resume-section-heading ${isAts ? "text-[#0B2545] border-[#90CAF9]" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
              EDUCATION
            </h2>

            <div className="space-y-3 text-xs">
              {data.education.map((edu, eIdx) => (
                <div key={eIdx} className="space-y-0.5">
                  <div className="flex justify-between items-start">
                    <span className={`font-bold ${isAts ? "text-slate-950" : "text-white"}`}>{edu.degree}</span>
                    <span className={`font-semibold ${isAts ? "text-[#0B2545]" : "text-[#C9A86A]"}`}>{edu.period}</span>
                  </div>
                  <div className={`${isAts ? "text-slate-700" : "text-gray-300"}`}>
                    {edu.institution} {edu.score ? `· ${edu.score}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. CERTIFICATIONS SECTION */}
          <div className="space-y-2 resume-section-block">
            <h2 className={`text-xs font-black tracking-wider uppercase pb-2.5 border-b-2 resume-section-heading ${isAts ? "text-[#0B2545] border-[#90CAF9]" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
              CERTIFICATIONS
            </h2>
            <ul className="space-y-1 text-xs">
              {data.certifications?.map((cert, cIdx) => {
                const certLink = cert.pdfUrl || cert.url;
                return (
                  <li key={cert.id || cIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className={`text-base leading-none select-none shrink-0 mt-0.5 ${isAts ? "text-slate-900 font-bold" : "text-gray-200"}`}>•</span>
                    <span className={isAts ? "text-slate-800" : "text-gray-300"}>
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
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 8. LANGUAGES SECTION */}
          <div className="space-y-1.5 resume-section-block">
            <h2 className={`text-xs font-black tracking-wider uppercase pb-2.5 border-b-2 resume-section-heading ${isAts ? "text-[#0B2545] border-[#90CAF9]" : "text-[#C9A86A] border-[#C9A86A]/40"}`}>
              LANGUAGES
            </h2>
            <div className={`text-xs ${isAts ? "text-slate-800" : "text-gray-200"}`}>
              <span className="font-bold">English</span> (Fluent) • <span className="font-bold">Malayalam</span> (Fluent)
            </div>
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
