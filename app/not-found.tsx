import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08090B] flex items-center justify-center p-4 text-white font-sans">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-[#0D1117] border border-white/10 shadow-2xl">
        <div className="text-6xl font-black text-[#C9A86A] font-mono">404</div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Page Not Found</h1>
        <p className="text-xs text-gray-400 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all shadow-lg shadow-[#C9A86A]/20"
        >
          <Home className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
