"use client";

import React, { useState } from "react";
import { Monitor, ArrowDown, Network, Server, ShieldCheck, Database, HardDrive, Sparkles } from "lucide-react";
import { ProjectArchitecture } from "@/lib/types";

interface ArchitectureDiagramProps {
  architecture: ProjectArchitecture;
  projectTitle: string;
}

export default function ArchitectureDiagram({ architecture, projectTitle }: ArchitectureDiagramProps) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    {
      step: "01",
      name: "Frontend Client Tier",
      icon: <Monitor className="w-5 h-5 text-[#C9A86A]" />,
      tech: architecture.client,
      details: "Stateful user interfaces, responsive layouts, Framer Motion animations, client form validation, and reactive session tokens.",
    },
    {
      step: "02",
      name: "Network & HTTP Transport Layer",
      icon: <Network className="w-5 h-5 text-cyan-400" />,
      tech: architecture.network,
      details: "Standardized RESTful HTTP calls with request/response interceptors, automatic JWT bearer attachment, and graceful error handling.",
    },
    {
      step: "03",
      name: "Backend Application & API Server",
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      tech: architecture.api,
      details: "Express.js RESTful API endpoints handling client requests, payload verification, and rate limiting.",
    },
    {
      step: "04",
      name: "Controllers & Security Middleware",
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      tech: architecture.controllers,
      details: "JWT token verification, role-based access control (Admin/Client/Vendor), sanitization, and business logic execution.",
    },
    {
      step: "05",
      name: "Data Modeling & ODM / ORM Layer",
      icon: <Database className="w-5 h-5 text-purple-400" />,
      tech: architecture.orm,
      details: "Structured schema models, relationship population pipelines, virtuals, and transactional safety checks.",
    },
    {
      step: "06",
      name: "Database Persistence Tier",
      icon: <HardDrive className="w-5 h-5 text-rose-400" />,
      tech: architecture.database,
      details: "High-availability database cluster with compound indexes on frequently queried fields like booking dates and user IDs.",
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#C9A86A]/10 text-[#C9A86A]">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Full-Stack System Architecture
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              End-to-End Data Flow for {projectTitle}
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-[#C9A86A] bg-[#C9A86A]/10 px-2.5 py-1 rounded hidden sm:inline-block">
          Interactive Diagram
        </span>
      </div>

      {/* Vertical Flow Diagram */}
      <div className="space-y-3 max-w-2xl mx-auto">
        {layers.map((layer, index) => (
          <React.Fragment key={layer.step}>
            <div
              onClick={() => setActiveLayer(activeLayer === index ? null : index)}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeLayer === index
                  ? "bg-[#161D29] border-[#C9A86A] shadow-lg shadow-[#C9A86A]/10 scale-[1.02]"
                  : "bg-[#12161F] border-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/40">
                    {layer.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-gray-500">
                        LAYER {layer.step}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {layer.name}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#C9A86A] mt-0.5">
                      {layer.tech}
                    </div>
                  </div>
                </div>

                <span className="text-xs text-gray-400 font-mono">
                  {activeLayer === index ? "Hide Details ▲" : "View Details ▼"}
                </span>
              </div>

              {activeLayer === index && (
                <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-300 leading-relaxed animate-fadeIn">
                  {layer.details}
                </div>
              )}
            </div>

            {index < layers.length - 1 && (
              <div className="flex justify-center my-1">
                <ArrowDown className="w-4 h-4 text-gray-600 animate-bounce" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
