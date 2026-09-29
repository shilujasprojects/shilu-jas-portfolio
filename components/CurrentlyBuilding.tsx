"use client";

import React from "react";
import { Calendar, Cpu, Server, Compass, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CurrentlyBuildingItem } from "@/lib/types";

interface CurrentlyBuildingProps {
  items: CurrentlyBuildingItem[];
}

export default function CurrentlyBuilding({ items }: CurrentlyBuildingProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "eventura":
        return <Calendar className="w-5 h-5 text-[#C9A86A]" />;
      case "nextjs":
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "backend":
        return <Server className="w-5 h-5 text-emerald-400" />;
      default:
        return <Compass className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="currently" className="py-12 border-y border-white/5 bg-[#0D1117]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A86A] animate-pulse" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] font-bold">
              CURRENTLY FOCUSING ON
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-mono hidden sm:inline-block">
            Updated Active Sprints
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group p-5 rounded-xl bg-[#12161F]/80 border border-white/5 hover:border-[#C9A86A]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C9A86A]/5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-[#C9A86A]/10 transition-colors">
                    {getIcon(item.id)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5 group-hover:border-[#C9A86A]/20 transition-colors">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#C9A86A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#C9A86A]/90 font-medium mb-2">
                  {item.subtitle}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {item.id === "eventura" && (
                <div className="pt-4 mt-2 border-t border-white/5">
                  <Link
                    href="/projects/eventura"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A86A] hover:text-[#E2C78E] transition-colors"
                  >
                    View Project Case Study
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
