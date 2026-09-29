"use client";

import React, { useState } from "react";
import { Code2, Server, Database, Wrench, CheckCircle, Sparkles } from "lucide-react";
import { SkillsData, SkillItem } from "@/lib/types";

interface TechStackSectionProps {
  skills: SkillsData;
}

export default function TechStackSection({ skills }: TechStackSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "database" | "tools" | "testing">("all");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const categories = [
    { id: "all", label: "All Skills", icon: <Sparkles className="w-4 h-4" /> },
    { id: "frontend", label: "Frontend", icon: <Code2 className="w-4 h-4" /> },
    { id: "backend", label: "Backend & APIs", icon: <Server className="w-4 h-4" /> },
    { id: "database", label: "Database", icon: <Database className="w-4 h-4" /> },
    { id: "tools", label: "Tools & DevOps", icon: <Wrench className="w-4 h-4" /> },
    { id: "testing", label: "Testing & QA", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const getSkillsToDisplay = () => {
    if (activeTab === "all") {
      return [
        ...skills.frontend.map((s) => ({ ...s, cat: "Frontend" })),
        ...skills.backend.map((s) => ({ ...s, cat: "Backend" })),
        ...skills.database.map((s) => ({ ...s, cat: "Database" })),
        ...skills.tools.map((s) => ({ ...s, cat: "Tools" })),
        ...skills.testing.map((s) => ({ ...s, cat: "Testing" })),
      ];
    }
    return skills[activeTab].map((s) => ({ ...s, cat: activeTab.toUpperCase() }));
  };

  const currentSkills = getSkillsToDisplay();

  return (
    <section id="skills" className="py-20 lg:py-28 relative bg-[#0D1117]/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            TECHNICAL PROFICIENCY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tools, Languages & <br />
            <span className="gold-gradient-text">Architectural Capabilities.</span>
          </h2>
          <p className="text-sm text-gray-400">
            Hover over any technology badge to inspect associated full-stack project implementations.
          </p>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === cat.id
                  ? "bg-[#C9A86A] text-black shadow-lg shadow-[#C9A86A]/20 scale-105"
                  : "bg-[#12161F] text-gray-400 hover:text-white border border-white/5 hover:border-white/20"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {currentSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`p-4 rounded-xl border transition-all duration-300 relative group cursor-default flex flex-col justify-between ${
                skill.highlight
                  ? "bg-[#12161F] border-[#C9A86A]/30 hover:border-[#C9A86A] shadow-md shadow-[#C9A86A]/5"
                  : "bg-[#12161F]/60 border-white/5 hover:border-white/20"
              } hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-bold text-white group-hover:text-[#C9A86A] transition-colors">
                  {skill.name}
                </span>
                {skill.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] shrink-0 mt-1.5" />
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                <span>{skill.level}</span>
                {skill.projects && skill.projects.length > 0 && (
                  <span className="text-[#C9A86A] text-[10px] font-semibold bg-[#C9A86A]/10 px-1.5 py-0.5 rounded">
                    {skill.projects.length} {skill.projects.length === 1 ? "project" : "projects"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Project Association Tooltip Banner */}
        {hoveredSkill && (
          <div className="mt-8 p-4 rounded-xl bg-[#12161F] border border-[#C9A86A]/40 text-center max-w-xl mx-auto animate-fadeIn shadow-lg">
            <div className="text-xs text-gray-300">
              <span className="text-[#C9A86A] font-bold">{hoveredSkill.name}</span> is actively utilized in:{" "}
              {hoveredSkill.projects && hoveredSkill.projects.length > 0 ? (
                <span className="text-white font-medium">
                  {hoveredSkill.projects.map((p) => p.toUpperCase().replace("-", " ")).join(", ")}
                </span>
              ) : (
                <span className="text-gray-400">Core engineering workflow & daily development practices</span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
