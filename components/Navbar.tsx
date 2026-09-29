"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Briefcase, FileText, Sparkles, Settings, Sun, Moon } from "lucide-react";
import RecruiterModal from "./RecruiterModal";
import { PortfolioData } from "@/lib/types";

interface NavbarProps {
  data: PortfolioData;
}

export default function Navbar({ data }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initialize Theme
    const savedTheme = (localStorage.getItem("portfolio_theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Skills", href: "/#skills" },
    { name: "How I Build", href: "/#how-i-build" },
    { name: "Experience", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#08090B]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#12161F] border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A] font-bold text-base tracking-wider shadow-md group-hover:border-[#C9A86A] transition-all">
              SJ
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-widest text-white group-hover:text-[#C9A86A] transition-colors">
                SHILU JAS
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider">
                FULL-STACK DEVELOPER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Visible on xl / 1280px+) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs 2xl:text-sm font-medium text-gray-300 hover:text-[#C9A86A] transition-colors tracking-wide whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action Buttons (Visible on xl / 1280px+) */}
          <div className="hidden xl:flex items-center gap-2.5 2xl:gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-[#C9A86A] border border-white/10 transition-all cursor-pointer"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-[#C9A86A]" /> : <Moon className="w-4 h-4 text-[#926514]" />}
            </button>

            {/* Recruiter Mode Button */}
            <button
              onClick={() => setRecruiterModalOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30 hover:bg-[#C9A86A]/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm whitespace-nowrap"
              title="Quick 30-second summary for recruiters"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Recruiter View
            </button>

            {/* Resume Link */}
            <Link
              href="/resume"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white border border-white/15 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </Link>

            {/* Admin Portal entry */}
            <Link
              href="/admin"
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
              title="Admin Content Studio"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile & Medium Tablet Actions Bar (Visible below xl / < 1280px) */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-[#C9A86A] border border-white/5"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-[#C9A86A]" /> : <Moon className="w-4 h-4 text-[#926514]" />}
            </button>

            {/* Recruiter Mode Button */}
            <button
              onClick={() => setRecruiterModalOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#C9A86A]/10 text-[#C9A86A] border border-[#C9A86A]/30 flex items-center gap-1.5"
              aria-label="Recruiter Mode"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Recruiter View</span>
            </button>

            {/* Resume Link on Medium Devices */}
            <Link
              href="/resume"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-white border border-white/15 hover:bg-[#C9A86A] hover:text-black transition-all items-center gap-1.5 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </Link>

            {/* Mobile & Tablet Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0D1117]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex flex-col gap-3.5 animate-fadeIn shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-200 hover:text-[#C9A86A] py-1 border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-[#C9A86A] text-black flex items-center justify-center gap-2 shadow"
              >
                <FileText className="w-4 h-4" />
                View & Download Resume
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 text-center text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                Admin Studio
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Recruiter Modal */}
      <RecruiterModal
        isOpen={recruiterModalOpen}
        onClose={() => setRecruiterModalOpen(false)}
        data={data}
      />
    </>
  );
}
