"use client";

import React from "react";
import { Search, Compass, Code, CheckSquare, Rocket, Sparkles } from "lucide-react";
import { HowIBuildStep } from "@/lib/types";

interface HowIBuildSectionProps {
  steps: HowIBuildStep[];
}

export default function HowIBuildSection({ steps }: HowIBuildSectionProps) {
  const getIcon = (step: string) => {
    switch (step) {
      case "01":
        return <Search className="w-5 h-5 text-[#C9A86A]" />;
      case "02":
        return <Compass className="w-5 h-5 text-cyan-400" />;
      case "03":
        return <Code className="w-5 h-5 text-emerald-400" />;
      case "04":
        return <CheckSquare className="w-5 h-5 text-amber-400" />;
      default:
        return <Rocket className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section id="how-i-build" className="py-20 lg:py-28 relative bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A86A]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] font-bold">
                ENGINEERING WORKFLOW
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              HOW I BUILD <br />
              <span className="gold-gradient-text">FROM CONCEPT TO PRODUCTION</span>
            </h2>
          </div>

          <p className="text-sm text-gray-400 max-w-md">
            A disciplined, 5-stage software engineering lifecycle ensuring high code quality, reliable APIs, and seamless user experiences.
          </p>
        </div>

        {/* 5-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#0D1117] border border-white/5 hover:border-[#C9A86A]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#C9A86A]/5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-[#C9A86A]/50 group-hover:text-[#C9A86A] transition-colors">
                    {step.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#12161F] group-hover:bg-[#C9A86A]/10 transition-colors">
                    {getIcon(step.step)}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#C9A86A] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-medium text-[#C9A86A] mb-3">
                  {step.subtitle}
                </p>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-gray-500">
                <span>STAGE {idx + 1} OF 5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
