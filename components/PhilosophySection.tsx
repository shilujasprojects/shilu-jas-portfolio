"use client";

import React from "react";
import { Code, Users, TrendingUp, Sparkles } from "lucide-react";
import { PhilosophyItem } from "@/lib/types";

interface PhilosophySectionProps {
  items: PhilosophyItem[];
}

export default function PhilosophySection({ items }: PhilosophySectionProps) {
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes("clean")) {
      return <Code className="w-6 h-6 text-[#C9A86A]" />;
    }
    if (title.toLowerCase().includes("user")) {
      return <Users className="w-6 h-6 text-cyan-400" />;
    }
    return <TrendingUp className="w-6 h-6 text-emerald-400" />;
  };

  return (
    <section className="py-20 lg:py-28 relative bg-[#0D1117]/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            CORE PRINCIPLES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            WHAT DRIVES ME <br />
            <span className="gold-gradient-text">AS A SOFTWARE ENGINEER</span>
          </h2>
          <p className="text-sm text-gray-400">
            Principles that guide how I architect systems, write clean code, and collaborate in engineering teams.
          </p>
        </div>

        {/* 3 Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#12161F] border border-white/5 hover:border-[#C9A86A]/40 transition-all duration-300 space-y-4 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#C9A86A]/5"
            >
              <div className="p-3.5 rounded-xl bg-white/5 group-hover:bg-[#C9A86A]/10 transition-colors w-fit">
                {getIcon(item.title)}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#C9A86A] transition-colors tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-[#C9A86A] mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
