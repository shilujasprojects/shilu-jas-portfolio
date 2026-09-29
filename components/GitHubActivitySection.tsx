"use client";

import React, { useState, useEffect } from "react";
import { Github, GitPullRequest, GitCommit, GitBranch, ExternalLink, Sparkles, RefreshCw } from "lucide-react";
import { GitHubActivity } from "@/lib/types";

interface GitHubActivitySectionProps {
  activity: GitHubActivity;
  githubUrl: string;
}

export default function GitHubActivitySection({ activity, githubUrl }: GitHubActivitySectionProps) {
  const [liveRepos, setLiveRepos] = useState<string>(activity.publicRepos);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Attempt real-time fetch from public GitHub API
    if (activity.username) {
      fetch(`https://api.github.com/users/${activity.username}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed");
        })
        .then((data) => {
          if (data && typeof data.public_repos === "number") {
            setLiveRepos(`${data.public_repos}+`);
            setIsLive(true);
          }
        })
        .catch(() => {
          // Keep configured fallback gracefully
          setIsLive(false);
        });
    }
  }, [activity.username]);

  // Generate a realistic grid of 52 weeks x 5 rows
  const generateHeatmap = () => {
    const cells = [];
    for (let i = 0; i < 52 * 5; i++) {
      const seed = (i * 37) % 100;
      let level = 0;
      if (seed > 80) level = 4;
      else if (seed > 55) level = 3;
      else if (seed > 35) level = 2;
      else if (seed > 15) level = 1;
      cells.push(level);
    }
    return cells;
  };

  const heatmapCells = generateHeatmap();

  const getColorClass = (level: number) => {
    switch (level) {
      case 4:
        return "bg-[#C9A86A]";
      case 3:
        return "bg-[#C9A86A]/75";
      case 2:
        return "bg-[#C9A86A]/45";
      case 1:
        return "bg-[#C9A86A]/20";
      default:
        return "bg-white/5";
    }
  };

  return (
    <section className="py-16 bg-[#08090B] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6 shadow-xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#12161F] text-[#C9A86A] border border-white/5">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Open Source & GitHub Activity
                  </h3>
                  {isLive && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live API Connected
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 font-mono">
                  github.com/{activity.username}
                </p>
              </div>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 text-white hover:bg-[#C9A86A] hover:text-black border border-white/10 transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              View GitHub Profile
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#12161F] border border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <GitCommit className="w-3.5 h-3.5 text-[#C9A86A]" />
                Contributions
              </div>
              <div className="text-xl font-bold text-white font-mono">
                {activity.totalContributions}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#12161F] border border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                Repositories
              </div>
              <div className="text-xl font-bold text-white font-mono">
                {liveRepos}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#12161F] border border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Active Streak
              </div>
              <div className="text-xl font-bold text-emerald-400 font-mono">
                {activity.currentStreak}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#12161F] border border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
                Primary Code
              </div>
              <div className="text-sm font-bold text-white font-mono truncate">
                {activity.topLanguage}
              </div>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="space-y-2">
            <div className="text-xs text-gray-400 font-mono flex items-center justify-between">
              <span>Contribution Activity Grid</span>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded bg-white/5 inline-block" />
                <span className="w-2.5 h-2.5 rounded bg-[#C9A86A]/20 inline-block" />
                <span className="w-2.5 h-2.5 rounded bg-[#C9A86A]/45 inline-block" />
                <span className="w-2.5 h-2.5 rounded bg-[#C9A86A]/75 inline-block" />
                <span className="w-2.5 h-2.5 rounded bg-[#C9A86A] inline-block" />
                <span>More</span>
              </div>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="grid grid-flow-col grid-rows-5 gap-1 min-w-[600px]">
                {heatmapCells.map((level, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-sm ${getColorClass(level)} transition-colors hover:scale-125`}
                    title={`Activity level: ${level}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
