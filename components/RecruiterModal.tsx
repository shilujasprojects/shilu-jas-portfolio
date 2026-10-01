"use client";

import React, { useState } from "react";
import { X, Check, Copy, ExternalLink, Download, Mail, Phone, MapPin, Briefcase, Code, Sparkles } from "lucide-react";
import Link from "next/link";
import { PortfolioData } from "@/lib/types";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export default function RecruiterModal({ isOpen, onClose, data }: RecruiterModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0D1117] border border-[#C9A86A]/40 shadow-2xl p-5 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close Recruiter View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#C9A86A]/15 text-[#C9A86A] border border-[#C9A86A]/30">
            <Briefcase className="w-3.5 h-3.5" />
            30-Second Recruiter Summary
          </span>
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Available for Hiring
          </span>
        </div>

        {/* Candidate Info */}
        <div className="border-b border-white/10 pb-5 mb-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {data.profile.name}
          </h2>
          <p className="text-[#C9A86A] font-medium text-sm sm:text-base mt-1">
            {data.profile.role} • MERN Stack Specialist
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              {data.profile.location}
            </span>
            <span className="flex items-center gap-1">
              <Code className="w-3.5 h-3.5 text-gray-500" />
              MCA Graduate (KTU University, 2025)
            </span>
          </div>
        </div>

        {/* Core Elevator Pitch */}
        <div className="bg-[#12161F] p-4 rounded-xl border border-white/5 mb-5">
          <p className="text-sm text-gray-300 leading-relaxed">
            Hands-on Full-Stack Developer with 3 professional internships (Zonemac Solutions, Bairuhatech, ICT Academy).
            Proven track record of building production-grade MERN web apps, architecting RESTful APIs, designing secure JWT auth,
            and crafting responsive UI systems.
          </p>
        </div>

        {/* Fast Facts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-center">
            <div className="text-lg font-bold text-white">3+</div>
            <div className="text-[11px] text-gray-400">Internships</div>
          </div>
          <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-center">
            <div className="text-lg font-bold text-[#C9A86A]">4+</div>
            <div className="text-[11px] text-gray-400">Full-Stack Apps</div>
          </div>
          <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-center">
            <div className="text-lg font-bold text-white">8.05</div>
            <div className="text-[11px] text-gray-400">MCA CGPA</div>
          </div>
          <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-center">
            <div className="text-lg font-bold text-emerald-400">Immediate</div>
            <div className="text-[11px] text-gray-400">Availability</div>
          </div>
        </div>

        {/* Primary Tech Stack */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Key Technologies
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JWT", "Tailwind CSS", "Postman", "Git"].map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded text-xs bg-white/5 border border-white/10 text-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Top Highlight Projects */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Flagship Project: Eventura
          </h3>
          <div className="p-3.5 rounded-xl bg-[#12161F] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-white text-sm">Eventura — Event Booking & Management Platform</div>
              <div className="text-xs text-gray-400 mt-0.5">MERN Stack (React, Node, Express, MongoDB, JWT, Bootstrap)</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/projects/eventura"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-colors"
              >
                Case Study →
              </Link>
              <a
                href={data.projects[0]?.liveUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1"
              >
                Live Demo <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Contact & Action Buttons */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => copyToClipboard(data.profile.email, "email")}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-[#C9A86A]" />}
              {copiedEmail ? "Email Copied!" : "Copy Email"}
            </button>
            <button
              onClick={() => copyToClipboard(data.profile.phone, "phone")}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Phone className="w-3.5 h-3.5 text-[#C9A86A]" />}
              {copiedPhone ? "Phone Copied!" : "Copy Phone"}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/resume"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-[#C9A86A]/20"
            >
              <Download className="w-3.5 h-3.5" />
              Full Resume & PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
