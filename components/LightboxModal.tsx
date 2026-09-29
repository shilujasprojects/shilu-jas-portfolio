"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc?: string;
}

export default function LightboxModal({ isOpen, onClose, title, desc }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#0D1117] border border-[#C9A86A]/40 rounded-2xl p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Screenshot / Visual View */}
        <div className="rounded-xl bg-[#12161F] p-8 border border-white/5 text-center min-h-[300px] flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#C9A86A]/10 text-[#C9A86A] flex items-center justify-center font-bold text-xl border border-[#C9A86A]/30">
            UI
          </div>
          <div className="text-white font-bold text-base">{title}</div>
          <p className="text-xs text-gray-400 max-w-lg leading-relaxed">
            {desc || "Interactive high-fidelity view demonstrating component hierarchies, state handling, and responsive layouts."}
          </p>
        </div>
      </div>
    </div>
  );
}
