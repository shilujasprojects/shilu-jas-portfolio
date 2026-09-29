export interface Profile {
  name: string;
  title: string;
  tagline: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  bio: string;
  avatar: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

export interface Stat {
  label: string;
  value: string;
  sub: string;
}

export interface CurrentlyBuildingItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  desc: string;
}

export interface ProjectFeature {
  title: string;
  desc: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectWalkthroughStep {
  step: string;
  name: string;
  desc: string;
}

export interface ProjectArchitecture {
  client: string;
  network: string;
  api: string;
  controllers: string;
  orm: string;
  database: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  status: string;
  featured: boolean;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  isLiveAvailable: boolean;
  showLiveDemo: boolean;
  showCaseStudy: boolean;
  showGithub: boolean;
  image: string;
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: ProjectFeature[];
  architecture: ProjectArchitecture;
  challenges: ProjectChallenge[];
  walkthroughSteps: ProjectWalkthroughStep[];
}

export interface SkillItem {
  name: string;
  level: string;
  highlight: boolean;
  category?: "frontend" | "backend" | "database" | "tools" | "testing";
  projects: string[];
}

export interface SkillsData {
  frontend: SkillItem[];
  backend: SkillItem[];
  database: SkillItem[];
  tools: SkillItem[];
  testing: SkillItem[];
}

export interface HowIBuildStep {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  skills: string[];
  points: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  details: string;
}

export interface CertificationItem {
  id?: string;
  title: string;
  issuer: string;
  year: string;
  pdfUrl?: string;
  pdfFileName?: string;
  url?: string;
  credentialId?: string;
}

export interface PhilosophyItem {
  title: string;
  subtitle: string;
  desc: string;
}

export interface GitHubActivity {
  username: string;
  totalContributions: string;
  publicRepos: string;
  currentStreak: string;
  topLanguage: string;
  autoFetch?: boolean;
  lastSynced?: string;
  contributions: { month: string; level: number }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface PortfolioData {
  profile: Profile;
  stats: Stat[];
  currentlyBuilding: CurrentlyBuildingItem[];
  projects: Project[];
  skills: SkillsData;
  howIBuild: HowIBuildStep[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  philosophy: PhilosophyItem[];
  githubActivity: GitHubActivity;
  messages: ContactMessage[];
}
