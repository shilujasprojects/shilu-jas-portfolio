"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, FileText, ArrowUp, Clock } from "lucide-react";
import { PortfolioData } from "@/lib/types";

interface FooterProps {
  data: PortfolioData;
}

export default function Footer({ data }: FooterProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#08090B] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/5">
          
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#12161F] border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A] font-bold text-xs">
                SJ
              </div>
              <span className="font-bold text-white text-base tracking-wider">
                {data.profile.name}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">
              {data.profile.role} • Building Digital Experiences That Actually Work
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium">
            <a href={data.profile.github} target="_blank" rel="noreferrer" className="hover:text-[#C9A86A] transition-colors flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#C9A86A] transition-colors flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <a href={`mailto:${data.profile.email}`} className="hover:text-[#C9A86A] transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
            <Link href="/resume" className="hover:text-[#C9A86A] transition-colors flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Resume
            </Link>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[#12161F] hover:bg-[#C9A86A] hover:text-black text-gray-400 transition-all border border-white/5 cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom copyright and live local time */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>
            © 2026 {data.profile.name}. All rights reserved. Built with Next.js & React.
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>Kozhikode, India (IST):</span>
            <span className="text-[#C9A86A] font-semibold">{time || "Loading..."}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
