"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, CheckCircle, ChevronRight, Sparkles, Eye } from "lucide-react";
import { ProjectWalkthroughStep } from "@/lib/types";

interface ProjectWalkthroughProps {
  steps: ProjectWalkthroughStep[];
  projectTitle: string;
}

export default function ProjectWalkthrough({ steps, projectTitle }: ProjectWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((curr) => (curr + 1) % steps.length);
            return 0;
          }
          return prev + 2.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const stepDetailsMock: Record<number, { visual: string; highlights: string[] }> = {
    0: {
      visual: "Discovery & Search View: Dynamic filter bar with Category Pills (Weddings, Corporate, Cultural), Date Range picker, and live card search.",
      highlights: ["Real-time category filtering", "High-speed Mongoose indexed search", "Responsive image cards with badges"],
    },
    1: {
      visual: "Event Details View: Full-width media gallery, amenities checklist, venue location map, organizer credentials, and verified client reviews.",
      highlights: ["Multi-image carousel", "Pricing tier breakdown", "Real-time date availability calendar"],
    },
    2: {
      visual: "Tiered Package Selection: Interactive comparison matrix (Standard vs Premium vs Luxury) with customizable Add-On Services (Catering, Photography).",
      highlights: ["Dynamic package price calculator", "Custom service checkboxes", "Immediate subtotal feedback"],
    },
    3: {
      visual: "Booking & Payment Verification: Stateful multi-step client reservation form with contact info, guest headcount, date slot lock, and payment proof upload.",
      highlights: ["Client-side schema validation", "Atomic slot booking protection", "Payment status tracking"],
    },
    4: {
      visual: "Administrative Control Center: Secure dashboard for event managers with booking approval queues, revenue metrics, and vendor scheduling.",
      highlights: ["JWT protected admin route", "One-click booking approval/rejection", "Real-time reservation status updates"],
    },
  };

  const currentInfo = stepDetailsMock[currentStep] || {
    visual: "Interactive full-stack workflow simulation.",
    highlights: ["Stateful client flow", "Robust backend integration", "Data persistence"],
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6">
      
      {/* Header with Play / Pause Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C9A86A] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            60-SECOND INTERACTIVE WORKFLOW
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Interactive User Flow Simulation
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isPlaying
                ? "bg-amber-400 text-black hover:bg-amber-300"
                : "bg-[#C9A86A] text-black hover:bg-[#E2C78E]"
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? "Pause Flow" : "Play Walkthrough"}
          </button>

          <button
            onClick={() => {
              setCurrentStep(0);
              setProgress(0);
              setIsPlaying(false);
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Pills Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {steps.map((step, idx) => (
          <button
            key={step.step}
            onClick={() => {
              setCurrentStep(idx);
              setProgress(0);
              setIsPlaying(false);
            }}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
              currentStep === idx
                ? "bg-[#161D29] border-[#C9A86A] text-white shadow-md shadow-[#C9A86A]/10"
                : "bg-[#12161F] border-white/5 text-gray-400 hover:text-gray-200"
            }`}
          >
            {/* Progress bar inside active pill */}
            {currentStep === idx && isPlaying && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-[#C9A86A] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            )}
            <div className="text-[10px] font-mono text-[#C9A86A] font-bold">
              STEP {step.step}
            </div>
            <div className="text-xs font-bold truncate mt-0.5">
              {step.name}
            </div>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage Display */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#12161F] border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#C9A86A]/20 text-[#C9A86A] font-bold">
              STAGE {steps[currentStep]?.step || "01"}
            </span>
            <h4 className="text-lg font-bold text-white">
              {steps[currentStep]?.name}
            </h4>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            {steps[currentStep]?.desc}
          </span>
        </div>

        {/* Visual Mock Representation */}
        <div className="p-5 rounded-lg bg-black/40 border border-white/5 space-y-4">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Eye className="w-4 h-4 text-[#C9A86A]" />
            <span className="font-semibold text-white">Interface Action & State:</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            {currentInfo.visual}
          </p>

          <div className="pt-2 border-t border-white/5 space-y-1.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
              Technical Implementation Details:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentInfo.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-emerald-400 bg-white/5 p-2 rounded">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            disabled={currentStep === 0}
            onClick={() => {
              setCurrentStep((prev) => Math.max(0, prev - 1));
              setProgress(0);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-300 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
          >
            ← Previous Stage
          </button>

          <span className="text-xs text-gray-500 font-mono">
            Step {currentStep + 1} of {steps.length}
          </span>

          <button
            disabled={currentStep === steps.length - 1}
            onClick={() => {
              setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
              setProgress(0);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] disabled:opacity-30 cursor-pointer"
          >
            Next Stage →
          </button>
        </div>
      </div>
    </div>
  );
}
