"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { PortfolioData } from "@/lib/types";

interface ContactSectionProps {
  data: PortfolioData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#C9A86A", "#E2C78E", "#ffffff"],
          });
        } catch (_) {}
      } else {
        setError(json.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please email directly to shilujastsy@gmail.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-[#0D1117]/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            HAVE A PROJECT IN MIND? <br />
            <span className="gold-gradient-text">LET&apos;S BUILD SOMETHING MEANINGFUL.</span>
          </h2>
          <p className="text-sm text-gray-400">
            Open for full-time opportunities, engineering roles, and impactful technical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#12161F] border border-white/5 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Contact Information
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Feel free to reach out via email, direct call, or LinkedIn. I typically respond within a few hours.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email */}
                <a
                  href={`mailto:${data.profile.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#C9A86A]/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-[#C9A86A]/10 text-[#C9A86A] group-hover:bg-[#C9A86A] group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-gray-400">Direct Email</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#C9A86A] transition-colors">
                      {data.profile.email}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${data.profile.phone}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-[#C9A86A]/40 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-[#C9A86A]/10 text-[#C9A86A] group-hover:bg-[#C9A86A] group-hover:text-black transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-gray-400">Mobile Phone</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#C9A86A] transition-colors">
                      {data.profile.phone}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2.5 rounded-lg bg-[#C9A86A]/10 text-[#C9A86A]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-gray-400">Location</div>
                    <div className="text-sm font-semibold text-white">
                      {data.profile.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <a
                  href={data.profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={data.profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#12161F] border border-white/5 shadow-2xl">
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Your message is stored securely and directly notifies the developer.
              </p>

              {success ? (
                <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Message Received!</h4>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Thank you for reaching out. I have received your note and will get back to you shortly at your email address.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-gray-300">
                        Your Name <span className="text-[#C9A86A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C9A86A] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-gray-300">
                        Email Address <span className="text-[#C9A86A]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C9A86A] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity / Collaboration / Project"
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C9A86A] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-gray-300">
                      Message <span className="text-[#C9A86A]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Shilu, I'd like to discuss an opportunity or discuss your Eventura project..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C9A86A] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A86A]/20 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
