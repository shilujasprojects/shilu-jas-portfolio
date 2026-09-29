"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, CornerDownLeft, Sparkles, Check } from "lucide-react";
import { PortfolioData } from "@/lib/types";

interface DeveloperTerminalProps {
  data: PortfolioData;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function DeveloperTerminal({ data }: DeveloperTerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial display commands
    setHistory([
      {
        command: "whoami",
        output: (
          <div className="text-gray-300">
            <span className="text-[#C9A86A] font-semibold">{data.profile.name}</span> — {data.profile.role} based in {data.profile.location}.
          </div>
        ),
      },
      {
        command: "tech_stack",
        output: (
          <div className="flex flex-wrap gap-1.5 py-1">
            {["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JWT", "Tailwind CSS"].map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded bg-white/10 text-emerald-400 text-xs font-mono">
                {tech}
              </span>
            ))}
          </div>
        ),
      },
      {
        command: "currently_building",
        output: (
          <div className="text-amber-300 text-xs">
            ⚡ Eventura — Full-stack Event Booking & Management Platform (MERN Stack)
          </div>
        ),
      },
      {
        command: "status",
        output: (
          <div className="text-emerald-400 text-xs flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ● {data.profile.status}
          </div>
        ),
      },
    ]);
  }, [data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    let outputNode: React.ReactNode = null;

    switch (cleanCmd) {
      case "whoami":
        outputNode = (
          <div className="text-gray-300">
            <span className="text-[#C9A86A] font-semibold">{data.profile.name}</span> — {data.profile.role}
            <p className="text-xs text-gray-400 mt-1">{data.profile.bio}</p>
          </div>
        );
        break;
      case "tech_stack":
      case "skills":
        outputNode = (
          <div className="space-y-1.5 py-1">
            <div><span className="text-gray-400 text-xs">Frontend:</span> <span className="text-emerald-400 text-xs">React, Next.js, JavaScript, Tailwind, Bootstrap, Framer Motion</span></div>
            <div><span className="text-gray-400 text-xs">Backend:</span> <span className="text-emerald-400 text-xs">Node.js, Express.js, REST APIs, JWT</span></div>
            <div><span className="text-gray-400 text-xs">Database:</span> <span className="text-emerald-400 text-xs">MongoDB, Mongoose, MySQL</span></div>
            <div><span className="text-gray-400 text-xs">Tools/QA:</span> <span className="text-emerald-400 text-xs">Postman, Git, Jira, Vercel</span></div>
          </div>
        );
        break;
      case "currently_building":
        outputNode = (
          <div className="text-xs space-y-1 text-gray-300">
            <span className="text-[#C9A86A] font-semibold">Eventura</span> — Event Booking & Management Platform
            <p className="text-gray-400">Connecting clients, venues, custom package tiers, and administrative controls.</p>
          </div>
        );
        break;
      case "projects":
        outputNode = (
          <div className="space-y-1.5 text-xs text-gray-300">
            {data.projects.map((p) => (
              <div key={p.slug} className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-white font-medium">{p.title}</span>
                <span className="text-gray-500 font-mono">{p.category}</span>
              </div>
            ))}
          </div>
        );
        break;
      case "experience":
        outputNode = (
          <div className="space-y-1.5 text-xs text-gray-300">
            {data.experience.map((e) => (
              <div key={e.id}>
                <span className="text-[#C9A86A] font-semibold">{e.role}</span> @ {e.company} ({e.period})
              </div>
            ))}
          </div>
        );
        break;
      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs text-gray-300">
            <div>Email: <span className="text-[#C9A86A]">{data.profile.email}</span></div>
            <div>Phone: <span className="text-[#C9A86A]">{data.profile.phone}</span></div>
            <div>Location: <span className="text-gray-400">{data.profile.location}</span></div>
          </div>
        );
        break;
      case "status":
        outputNode = (
          <div className="text-emerald-400 text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ● {data.profile.status} (Open to Full-Stack / MERN Roles)
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "help":
        outputNode = (
          <div className="text-xs text-gray-400 space-y-0.5">
            Available commands: <span className="text-[#C9A86A]">whoami</span>, <span className="text-[#C9A86A]">tech_stack</span>, <span className="text-[#C9A86A]">currently_building</span>, <span className="text-[#C9A86A]">projects</span>, <span className="text-[#C9A86A]">experience</span>, <span className="text-[#C9A86A]">contact</span>, <span className="text-[#C9A86A]">status</span>, <span className="text-[#C9A86A]">clear</span>
          </div>
        );
        break;
      default:
        outputNode = (
          <div className="text-xs text-rose-400">
            command not found: `{cleanCmd}`. Type <span className="text-white underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> to view available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cleanCmd, output: outputNode }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    }
  };

  const quickCommands = ["whoami", "tech_stack", "currently_building", "projects", "contact", "clear"];

  return (
    <div className="w-full rounded-2xl bg-[#0D1117]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl transition-all hover:border-[#C9A86A]/40 group">
      {/* Terminal Title Bar */}
      <div className="bg-[#12161F] px-4 py-3 border-b border-white/10 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#C9A86A]" />
          developer@shilujas:~
        </div>
        <div className="text-[10px] text-gray-500 font-mono">zsh</div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-gray-200 max-h-[340px] sm:max-h-[380px] overflow-y-auto space-y-3.5">
        <div className="text-gray-500 text-[11px] pb-1 border-b border-white/5">
          Type a command or click one of the quick pills below:
        </div>

        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-[#C9A86A]">$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-4 text-gray-300">{item.output}</div>
          </div>
        ))}

        {/* Active Command Line */}
        <div className="flex items-center gap-2 text-gray-400 pt-1">
          <span className="text-[#C9A86A]">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-600 font-mono text-xs sm:text-sm"
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="text-gray-500 hover:text-[#C9A86A] transition-colors p-1"
            title="Execute command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Quick Suggestion Pills */}
      <div className="bg-[#12161F]/60 px-4 py-2.5 border-t border-white/5 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mr-1">
          Quick:
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 hover:bg-[#C9A86A]/20 hover:text-[#C9A86A] text-gray-400 border border-white/5 transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
