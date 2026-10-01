"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Plus, Trash2, Edit3, Save, CheckCircle2, AlertCircle, ArrowLeft, Eye, MessageSquare, Briefcase, Code, FileText, Sparkles, RefreshCw, Award, Github, ToggleLeft, ToggleRight, Check } from "lucide-react";
import { PortfolioData, Project, ExperienceItem, SkillItem, CertificationItem, EducationItem, SkillsData } from "@/lib/types";

export default function AdminStudio() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "certificates" | "experience" | "github" | "profile" | "inbox">("projects");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [syncingGithub, setSyncingGithub] = useState(false);

  // Project Editor State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Skills Editor State
  const [newSkillCat, setNewSkillCat] = useState<"frontend" | "backend" | "database" | "tools" | "testing">("frontend");
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Advanced");
  const [newSkillHighlight, setNewSkillHighlight] = useState(false);

  // Certificate Editor State
  const [newCertTitle, setNewCertTitle] = useState("");
  const [newCertIssuer, setNewCertIssuer] = useState("");
  const [newCertYear, setNewCertYear] = useState(new Date().getFullYear().toString());
  const [newCertUrl, setNewCertUrl] = useState("");
  const [newCertId, setNewCertId] = useState("");
  const [isUploadingCert, setIsUploadingCert] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/data");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        sessionStorage.setItem("admin_token", json.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        setAuthError(json.error || "Invalid Passcode. Hint: Whom you love the most, their nickname");
      }
    } catch (err) {
      setAuthError("Verification failed.");
    }
  };

  const handleSaveData = async (updatedData: PortfolioData) => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setData(updatedData);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("Failed to save changes.");
      }
    } catch (err) {
      alert("Error saving data.");
    } finally {
      setSaving(false);
    }
  };

  // Real-time GitHub Sync
  const handleSyncGithub = async () => {
    if (!data) return;
    setSyncingGithub(true);
    try {
      const username = data.githubActivity?.username || "shilujas";
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (res.ok) {
        const ghData = await res.json();
        const updatedActivity = {
          ...(data.githubActivity || { totalContributions: "120+", currentStreak: "14 Days", topLanguage: "JavaScript" }),
          username,
          publicRepos: `${ghData.public_repos || 18}+`,
          lastSynced: new Date().toISOString(),
        };
        const updated = { ...data, githubActivity: updatedActivity };
        await handleSaveData(updated);
        alert(`Successfully synced with GitHub for @${username}! Public repos: ${ghData.public_repos}`);
      } else {
        alert("Could not fetch from GitHub API. Please check your username.");
      }
    } catch (err) {
      alert("Error connecting to GitHub.");
    } finally {
      setSyncingGithub(false);
    }
  };

  // Project Handlers
  const handleSaveProject = (projectToSave: Project) => {
    if (!data) return;
    const existingIndex = data.projects.findIndex((p) => p.slug === projectToSave.slug || p.id === projectToSave.id);
    let updatedProjects: Project[];

    if (existingIndex >= 0) {
      updatedProjects = [...data.projects];
      updatedProjects[existingIndex] = projectToSave;
    } else {
      updatedProjects = [projectToSave, ...data.projects];
    }

    const updatedData = { ...data, projects: updatedProjects };
    handleSaveData(updatedData);
    setEditingProject(null);
    setIsAddingProject(false);
  };

  const handleDeleteProject = (slug: string) => {
    if (!data || !confirm("Are you sure you want to delete this project?")) return;
    const updatedProjects = data.projects.filter((p) => p.slug !== slug);
    handleSaveData({ ...data, projects: updatedProjects });
  };

  // Skill Handlers
  const handleAddSkill = () => {
    if (!data || !newSkillName.trim()) return;
    const newSkill: SkillItem = {
      name: newSkillName.trim(),
      level: newSkillLevel,
      highlight: newSkillHighlight,
      category: newSkillCat,
      projects: [],
    };
    const updatedSkills = {
      ...data.skills,
      [newSkillCat]: [...(data.skills[newSkillCat] || []), newSkill],
    };
    handleSaveData({ ...data, skills: updatedSkills });
    setNewSkillName("");
  };

  const handleDeleteSkill = (cat: keyof SkillsData, index: number) => {
    if (!data || !confirm("Delete this skill?")) return;
    const updatedList = [...data.skills[cat]];
    updatedList.splice(index, 1);
    const updatedSkills = { ...data.skills, [cat]: updatedList };
    handleSaveData({ ...data, skills: updatedSkills });
  };

  // Certificate Handlers
  const handleAddCertificate = () => {
    if (!data) return;
    if (!newCertTitle.trim()) {
      alert("Please enter a Certificate Title before saving.");
      return;
    }
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: newCertTitle.trim(),
      issuer: newCertIssuer.trim() || "Certification Authority",
      year: newCertYear.trim() || new Date().getFullYear().toString(),
      pdfUrl: newCertUrl.trim() || undefined,
      pdfFileName: newCertId.trim() || undefined,
      url: newCertUrl.trim() || undefined,
      credentialId: newCertId.trim() || undefined,
    };
    const updatedCerts = [newCert, ...(data.certifications || [])];
    handleSaveData({ ...data, certifications: updatedCerts });
    setNewCertTitle("");
    setNewCertIssuer("");
    setNewCertYear(new Date().getFullYear().toString());
    setNewCertUrl("");
    setNewCertId("");
    const fileInput = document.getElementById("pdfCertInput") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleDeleteCertificate = (index: number) => {
    if (!data || !confirm("Delete this certificate?")) return;
    const updatedCerts = [...data.certifications];
    updatedCerts.splice(index, 1);
    handleSaveData({ ...data, certifications: updatedCerts });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#0D1117] border border-[#C9A86A]/40 shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#12161F] border border-[#C9A86A]/30 flex items-center justify-center text-[#C9A86A]">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin Content Studio
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Manage projects, live demo buttons, skills, certificates, and dynamic resume.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2 justify-center">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {authError}
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-gray-300">
                Studio PIN / Passcode
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full px-4 py-3 rounded-xl bg-[#12161F] border border-white/10 text-white text-center text-base tracking-wider focus:outline-none focus:border-[#C9A86A]"
              />
              <p className="text-[11px] text-gray-400 text-center pt-1 font-sans">
                💡 <span className="font-semibold text-gray-300">Hint:</span> Whom you love the most, their nickname
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all cursor-pointer shadow-lg shadow-[#C9A86A]/20"
            >
              Access Studio Dashboard
            </button>
          </form>

          <Link href="/" className="inline-block text-xs font-mono text-gray-500 hover:text-gray-300">
            ← Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (isAuthenticated && !data) {
    return (
      <div className="min-h-screen bg-[#08090B] flex items-center justify-center p-4 text-white">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-[#C9A86A] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-gray-400">Loading Studio Dashboard...</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#08090B] text-primaryText py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Studio Top Header */}
        <div className="p-6 rounded-2xl bg-[#0D1117] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-xl font-bold text-white tracking-tight">
                Shilu Jas — Content Management Studio
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Live updates to projects, demo buttons, skills, certificates, and resume.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live Sync Successful!
              </span>
            )}

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#C9A86A]" />
              View Website
            </Link>

            <Link
              href="/resume"
              target="_blank"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-[#C9A86A] border border-[#C9A86A]/30 flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              View Resume
            </Link>

            <button
              onClick={() => {
                sessionStorage.removeItem("admin_token");
                setIsAuthenticated(false);
              }}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#0D1117] p-2 rounded-xl border border-white/5 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap">
          <button
            onClick={() => {
              setActiveTab("projects");
              setEditingProject(null);
              setIsAddingProject(false);
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "projects" ? "bg-[#C9A86A] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <Code className="w-4 h-4" />
            Projects ({data.projects?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "skills" ? "bg-[#C9A86A] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Skills & Tools
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "certificates" ? "bg-[#C9A86A] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            Certificates ({data.certifications?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "experience" ? "bg-[#C9A86A] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Experience & Resume
          </button>

          <button
            onClick={() => setActiveTab("github")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "github" ? "bg-[#C9A86A] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <Github className="w-4 h-4" />
            GitHub Real-Time
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "profile" ? "bg-[#C9A86A] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            Profile Bio
          </button>

          <button
            onClick={() => setActiveTab("inbox")}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === "inbox" ? "bg-[#C9A86A] text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Inbox ({data.messages?.length || 0})
          </button>
        </div>

        {/* 1. PROJECTS TAB (With Demo & Case Study Button Toggles) */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {!editingProject && !isAddingProject ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">All Showcase Projects</h2>
                  <button
                    onClick={() => {
                      setIsAddingProject(true);
                      setEditingProject({
                        id: `proj-${Date.now()}`,
                        slug: "new-project",
                        number: `0${(data.projects?.length || 0) + 1}`,
                        title: "",
                        category: "Full-Stack Web App",
                        subtitle: "",
                        summary: "",
                        status: "Production Ready",
                        featured: true,
                        technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
                        liveUrl: "",
                        githubUrl: "",
                        isLiveAvailable: false,
                        showLiveDemo: false,
                        showCaseStudy: true,
                        showGithub: true,
                        image: "/images/projects/preview.png",
                        overview: "",
                        problem: "",
                        solution: "",
                        keyFeatures: [
                          { title: "Core Feature 1", desc: "Feature details" },
                        ],
                        architecture: {
                          client: "React.js / Next.js",
                          network: "Axios REST Client",
                          api: "Express.js RESTful API",
                          controllers: "Route Handlers",
                          orm: "Mongoose ODM",
                          database: "MongoDB Atlas",
                        },
                        challenges: [],
                        walkthroughSteps: [],
                      });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] transition-all flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.projects?.map((project) => (
                    <div
                      key={project.slug}
                      className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-[#C9A86A] font-bold">
                            {project.number}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-2">
                          {project.summary}
                        </p>

                        {/* Button Visibility Indicators */}
                        <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono">
                          <span className={`px-2 py-0.5 rounded ${project.showLiveDemo !== false && project.liveUrl ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-800 text-gray-500"}`}>
                            Live Demo: {project.showLiveDemo !== false && project.liveUrl ? "ON" : "OFF"}
                          </span>
                          <span className={`px-2 py-0.5 rounded ${project.showCaseStudy !== false ? "bg-[#C9A86A]/10 text-[#C9A86A]" : "bg-gray-800 text-gray-500"}`}>
                            Case Study: {project.showCaseStudy !== false ? "ON" : "OFF"}
                          </span>
                          <span className={`px-2 py-0.5 rounded ${project.showGithub !== false && project.githubUrl ? "bg-blue-500/10 text-blue-400" : "bg-gray-800 text-gray-500"}`}>
                            GitHub: {project.showGithub !== false && project.githubUrl ? "ON" : "OFF"}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setEditingProject({ ...project })}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#C9A86A]" />
                          Edit Details & Toggles
                        </button>

                        <button
                          onClick={() => handleDeleteProject(project.slug)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Project Edit Form */
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-[#C9A86A]/40 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="text-lg font-bold text-white">
                    {isAddingProject ? "Add New Project" : `Editing: ${editingProject?.title}`}
                  </h2>
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setIsAddingProject(false);
                    }}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                {editingProject && (
                  <div className="space-y-4">
                    {/* BUTTON VISIBILITY TOGGLES SECTION */}
                    <div className="p-4 rounded-xl bg-[#12161F] border border-[#C9A86A]/20 space-y-3">
                      <div className="text-xs font-bold text-[#C9A86A] uppercase font-mono">
                        Button Visibility & Access Controls
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Live Demo Toggle */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1117] border border-white/5">
                          <div>
                            <div className="text-xs font-semibold text-white">Live Demo Button</div>
                            <div className="text-[10px] text-gray-400">Show on Card & Case Study</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditingProject({ ...editingProject, showLiveDemo: editingProject.showLiveDemo === false ? true : false, isLiveAvailable: editingProject.showLiveDemo === false ? true : false })}
                            className={`p-1.5 rounded-lg text-xs font-bold ${editingProject.showLiveDemo !== false ? "bg-emerald-500 text-black" : "bg-gray-800 text-gray-400"}`}
                          >
                            {editingProject.showLiveDemo !== false ? "ENABLED" : "DISABLED"}
                          </button>
                        </div>

                        {/* Case Study Toggle */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1117] border border-white/5">
                          <div>
                            <div className="text-xs font-semibold text-white">Case Study Button</div>
                            <div className="text-[10px] text-gray-400">Show Deep Dive Link</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditingProject({ ...editingProject, showCaseStudy: editingProject.showCaseStudy === false ? true : false })}
                            className={`p-1.5 rounded-lg text-xs font-bold ${editingProject.showCaseStudy !== false ? "bg-[#C9A86A] text-black" : "bg-gray-800 text-gray-400"}`}
                          >
                            {editingProject.showCaseStudy !== false ? "ENABLED" : "DISABLED"}
                          </button>
                        </div>

                        {/* GitHub Toggle */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D1117] border border-white/5">
                          <div>
                            <div className="text-xs font-semibold text-white">GitHub Button</div>
                            <div className="text-[10px] text-gray-400">Show Code Link</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditingProject({ ...editingProject, showGithub: editingProject.showGithub === false ? true : false })}
                            className={`p-1.5 rounded-lg text-xs font-bold ${editingProject.showGithub !== false ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"}`}
                          >
                            {editingProject.showGithub !== false ? "ENABLED" : "DISABLED"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-300">Project Title</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-300">URL Slug (e.g. eventura)</label>
                        <input
                          type="text"
                          value={editingProject.slug}
                          onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                          className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-300">Category Tag</label>
                        <input
                          type="text"
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-300">Live Demo URL (Leave blank if not deployed)</label>
                        <input
                          type="text"
                          value={editingProject.liveUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-300">GitHub Repository URL</label>
                        <input
                          type="text"
                          value={editingProject.githubUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">Short Summary</label>
                      <textarea
                        rows={2}
                        value={editingProject.summary}
                        onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs resize-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-300">Technologies (Comma separated)</label>
                      <input
                        type="text"
                        value={editingProject.technologies.join(", ")}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        onClick={() => {
                          setEditingProject(null);
                          setIsAddingProject(false);
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveProject(editingProject)}
                        disabled={saving}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] flex items-center gap-1.5 cursor-pointer shadow"
                      >
                        <Save className="w-3.5 h-3.5" />
                        {saving ? "Saving..." : "Save Project & Sync"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 2. SKILLS & TOOLS TAB (Add, Edit, Delete) */}
        {activeTab === "skills" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Skills & Tools Manager</h2>
                <p className="text-xs text-gray-400">Add, edit, or remove technical skills across all portfolio and resume sections.</p>
              </div>
            </div>

            {/* Add New Skill Bar */}
            <div className="p-4 rounded-xl bg-[#12161F] border border-white/5 space-y-3">
              <div className="text-xs font-semibold text-[#C9A86A] uppercase font-mono">Add New Skill</div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Skill Name (e.g. Docker, Redis, TypeScript)"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs"
                />
                <select
                  value={newSkillCat}
                  onChange={(e) => setNewSkillCat(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend & APIs</option>
                  <option value="database">Database</option>
                  <option value="tools">Tools & DevOps</option>
                  <option value="testing">Testing & QA</option>
                </select>
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs"
                >
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </div>
            </div>

            {/* Categorized Skills List */}
            <div className="space-y-6">
              {(["frontend", "backend", "database", "tools", "testing"] as const).map((cat) => (
                <div key={cat} className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#C9A86A] font-bold">
                    {cat.toUpperCase()} SKILLS ({data.skills?.[cat]?.length || 0})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {data.skills?.[cat]?.map((skill, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-[#12161F] border border-white/5 flex items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-white">{skill.name}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{skill.level}</div>
                        </div>
                        <button
                          onClick={() => handleDeleteSkill(cat, sIdx)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. CERTIFICATES TAB (Add, Edit, Link, Delete) */}
        {activeTab === "certificates" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Certifications & Credentials</h2>
                <p className="text-xs text-gray-400">Manage NPTEL, Cloud, and technical certifications with direct verification links.</p>
              </div>
            </div>

            {/* Add New Certificate Bar (PDF Upload Only) */}
            <div className="p-5 rounded-xl bg-[#12161F] border border-white/5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A86A] uppercase font-mono">
                <FileText className="w-4 h-4" />
                Upload New Certificate (PDF File Only)
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-medium">Certificate Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Database Management System"
                    value={newCertTitle}
                    onChange={(e) => setNewCertTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-medium">Issuer / Authority</label>
                  <input
                    type="text"
                    placeholder="e.g. NPTEL / Coursera / AWS"
                    value={newCertIssuer}
                    onChange={(e) => setNewCertIssuer(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-medium">Year</label>
                  <input
                    type="text"
                    placeholder="e.g. 2024"
                    value={newCertYear}
                    onChange={(e) => setNewCertYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D1117] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              {/* PDF File Picker */}
              <div className="p-4 rounded-xl bg-[#0D1117] border border-dashed border-[#C9A86A]/40 space-y-2 text-center">
                <input
                  type="file"
                  id="pdfCertInput"
                  accept=".pdf,application/pdf"
                  disabled={isUploadingCert}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (!file.name.toLowerCase().endsWith(".pdf")) {
                      alert("Please select a valid .pdf certificate file.");
                      return;
                    }
                    
                    setIsUploadingCert(true);
                    const uploadData = new FormData();
                    uploadData.append("file", file);
                    
                    try {
                      const res = await fetch("/api/upload", {
                        method: "POST",
                        body: uploadData,
                      });
                      const json = await res.json();
                      if (res.ok && json.success) {
                        setNewCertUrl(json.url);
                        setNewCertId(json.fileName);
                        if (!newCertTitle) {
                          const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
                          setNewCertTitle(cleanTitle);
                        }
                        alert(`✅ Uploaded ${json.fileName} successfully!`);
                      } else {
                        alert(json.error || "Failed to upload PDF");
                      }
                    } catch (err) {
                      alert("Error uploading PDF file.");
                    } finally {
                      setIsUploadingCert(false);
                    }
                  }}
                  className="hidden"
                />

                <label
                  htmlFor="pdfCertInput"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    isUploadingCert
                      ? "bg-white/10 text-gray-400 cursor-not-allowed"
                      : "bg-white/5 hover:bg-[#C9A86A]/10 text-gray-200 hover:text-[#C9A86A] border border-white/10 hover:border-[#C9A86A]/40"
                  }`}
                >
                  {isUploadingCert ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#C9A86A] border-t-transparent rounded-full animate-spin" />
                      Uploading PDF File...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-[#C9A86A]" />
                      {newCertUrl ? "Change Selected PDF File" : "Choose PDF Certificate File (.pdf)"}
                    </>
                  )}
                </label>

                {newCertUrl ? (
                  <div className="text-xs font-mono text-emerald-400 flex items-center justify-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Attached: {newCertId || "Certificate.pdf"}
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-500 font-mono">
                    Accepts only authentic .pdf files. The file will be stored securely on the server.
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddCertificate}
                  disabled={isUploadingCert}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] flex items-center gap-1.5 cursor-pointer shadow transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" /> Save Certificate to Portfolio & Resume
                </button>
              </div>
            </div>

            {/* List of Certificates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.certifications?.map((cert, cIdx) => {
                const certLink = cert.pdfUrl || cert.url;
                return (
                  <div key={cert.id || cIdx} className="p-4 rounded-xl bg-[#12161F] border border-white/5 flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#C9A86A]" />
                        <div className="text-sm font-bold text-white">{cert.title}</div>
                      </div>
                      <div className="text-xs text-[#C9A86A] font-medium pl-6">{cert.issuer} ({cert.year})</div>
                      {certLink ? (
                        <div className="pl-6 flex items-center gap-2">
                          <a
                            href={certLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:underline bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                          >
                            <Eye className="w-3 h-3" /> View Uploaded PDF
                          </a>
                          {cert.pdfFileName && (
                            <span className="text-[10px] text-gray-500 font-mono truncate max-w-[150px]">({cert.pdfFileName})</span>
                          )}
                        </div>
                      ) : (
                        <div className="pl-6 text-[10px] text-gray-500 italic">No PDF attached</div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteCertificate(cIdx)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10"
                      title="Delete certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. EXPERIENCE & RESUME TAB */}
        {activeTab === "experience" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Internships, Work Experience & Resume Bullets</h2>
              <button
                onClick={() => {
                  const newExp: ExperienceItem = {
                    id: `exp-${Date.now()}`,
                    role: "Software Developer Intern",
                    company: "Company Name",
                    location: "Kozhikode, Kerala",
                    period: "2026 – Present",
                    badge: "Current",
                    skills: ["React.js", "Node.js", "MongoDB"],
                    points: ["Developed full-stack web applications with modern UI."],
                  };
                  handleSaveData({ ...data, experience: [newExp, ...data.experience] });
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Experience Record
              </button>
            </div>

            {data.experience?.map((exp, expIdx) => (
              <div key={exp.id} className="p-5 rounded-xl bg-[#12161F] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#C9A86A] font-bold">RECORD #{expIdx + 1}</span>
                  <button
                    onClick={() => {
                      if (!confirm("Delete this experience record?")) return;
                      const updated = [...(data.experience || [])];
                      updated.splice(expIdx, 1);
                      handleSaveData({ ...data, experience: updated });
                    }}
                    className="p-1 text-gray-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={exp.role || ""}
                    onChange={(e) => {
                      const updated = [...(data.experience || [])];
                      updated[expIdx].role = e.target.value;
                      setData({ ...data, experience: updated });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0D1117] border border-white/10 text-white text-xs font-bold"
                  />
                  <input
                    type="text"
                    value={exp.company || ""}
                    onChange={(e) => {
                      const updated = [...(data.experience || [])];
                      updated[expIdx].company = e.target.value;
                      setData({ ...data, experience: updated });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0D1117] border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={exp.period || ""}
                    onChange={(e) => {
                      const updated = [...(data.experience || [])];
                      updated[expIdx].period = e.target.value;
                      setData({ ...data, experience: updated });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0D1117] border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-400 font-mono">Bullet Points (one per line):</label>
                  <textarea
                    rows={4}
                    value={exp.points ? exp.points.join("\n") : ""}
                    onChange={(e) => {
                      const updated = [...(data.experience || [])];
                      updated[expIdx].points = e.target.value.split("\n").filter(Boolean);
                      setData({ ...data, experience: updated });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D1117] border border-white/10 text-white text-xs leading-relaxed"
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => handleSaveData(data)}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save All Experience Changes"}
              </button>
            </div>
          </div>
        )}

        {/* 5. GITHUB REAL-TIME SYNC TAB */}
        {activeTab === "github" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">GitHub Real-Time Metrics & Open Source</h2>
                <p className="text-xs text-gray-400">Sync live stats from the public GitHub API or customize metrics manually.</p>
              </div>

              <button
                onClick={handleSyncGithub}
                disabled={syncingGithub}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-[#C9A86A] hover:text-black border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncingGithub ? "animate-spin" : ""}`} />
                {syncingGithub ? "Syncing API..." : "Sync Real-Time from GitHub"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">GitHub Username</label>
                <input
                  type="text"
                  value={data.githubActivity?.username || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      githubActivity: { ...(data.githubActivity || { totalContributions: "120+", publicRepos: "18+", currentStreak: "14 Days", topLanguage: "JavaScript" }), username: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Total Contributions Count</label>
                <input
                  type="text"
                  value={data.githubActivity?.totalContributions || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      githubActivity: { ...(data.githubActivity || { username: "shilujas", publicRepos: "18+", currentStreak: "14 Days", topLanguage: "JavaScript" }), totalContributions: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Public Repositories Count</label>
                <input
                  type="text"
                  value={data.githubActivity?.publicRepos || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      githubActivity: { ...(data.githubActivity || { username: "shilujas", totalContributions: "120+", currentStreak: "14 Days", topLanguage: "JavaScript" }), publicRepos: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Active Commit Streak</label>
                <input
                  type="text"
                  value={data.githubActivity?.currentStreak || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      githubActivity: { ...(data.githubActivity || { username: "shilujas", totalContributions: "120+", publicRepos: "18+", topLanguage: "JavaScript" }), currentStreak: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => handleSaveData(data)}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save GitHub Settings"}
              </button>
            </div>
          </div>
        )}

        {/* 6. PROFILE & BIO TAB */}
        {activeTab === "profile" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white">Profile & Contact Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={data.profile?.name || ""}
                  onChange={(e) => setData({ ...data, profile: { ...(data.profile || { role: "", title: "", email: "", phone: "", location: "", bio: "", status: "", heroBadge: "" }), name: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Professional Title</label>
                <input
                  type="text"
                  value={data.profile?.title || ""}
                  onChange={(e) => setData({ ...data, profile: { ...(data.profile || { name: "", role: "", email: "", phone: "", location: "", bio: "", status: "", heroBadge: "" }), title: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Email Address</label>
                <input
                  type="email"
                  value={data.profile?.email || ""}
                  onChange={(e) => setData({ ...data, profile: { ...(data.profile || { name: "", role: "", title: "", phone: "", location: "", bio: "", status: "", heroBadge: "" }), email: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Phone Number</label>
                <input
                  type="text"
                  value={data.profile?.phone || ""}
                  onChange={(e) => setData({ ...data, profile: { ...(data.profile || { name: "", role: "", title: "", email: "", location: "", bio: "", status: "", heroBadge: "" }), phone: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Location (City, State / Country)</label>
                <input
                  type="text"
                  value={data.profile?.location || ""}
                  onChange={(e) => setData({ ...data, profile: { ...(data.profile || { name: "", role: "", title: "", email: "", phone: "", bio: "", status: "", heroBadge: "" }), location: e.target.value } })}
                  placeholder="e.g. Kozhikode, Kerala"
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Availability Status Badge</label>
                <input
                  type="text"
                  value={data.profile?.status || ""}
                  onChange={(e) => setData({ ...data, profile: { ...(data.profile || { name: "", role: "", title: "", email: "", phone: "", location: "", bio: "", heroBadge: "" }), status: e.target.value } })}
                  placeholder="e.g. Available for Full-Stack Roles"
                  className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Professional Bio</label>
              <textarea
                rows={4}
                value={data.profile?.bio || ""}
                onChange={(e) => setData({ ...data, profile: { ...(data.profile || { name: "", role: "", title: "", email: "", phone: "", location: "", status: "", heroBadge: "" }), bio: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl bg-[#12161F] border border-white/10 text-white text-xs leading-relaxed"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => handleSaveData(data)}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#C9A86A] text-black hover:bg-[#E2C78E] flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Profile Details"}
              </button>
            </div>
          </div>
        )}

        {/* 7. CONTACT INBOX TAB */}
        {activeTab === "inbox" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/10 space-y-6">
            <h2 className="text-lg font-bold text-white">Received Messages & Inquiries</h2>

            {data.messages && data.messages.length > 0 ? (
              <div className="space-y-4">
                {data.messages.map((msg) => (
                  <div key={msg.id} className="p-4 rounded-xl bg-[#12161F] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="font-bold text-white">{msg.name} ({msg.email})</div>
                      <div className="text-gray-500 font-mono">{new Date(msg.timestamp).toLocaleString()}</div>
                    </div>
                    <div className="text-xs font-semibold text-[#C9A86A]">Subject: {msg.subject}</div>
                    <p className="text-xs text-gray-300 leading-relaxed bg-[#0D1117] p-3 rounded-lg border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-gray-500 font-mono">
                No messages in inbox yet. Inquiries submitted through the contact form will appear here.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
