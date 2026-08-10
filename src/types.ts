export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techBadges: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  features: string[];
  image?: string;
  category: 'Full Stack' | 'Frontend' | 'DOM/JS' | 'Other';
  featured: boolean;
  views: number;
  createdAt: string;
}

export type SkillCategory =
  | 'Programming'
  | 'Web Development'
  | 'Databases'
  | 'DSA'
  | 'Tools'
  | 'Soft Skills';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  iconName: string;
  proficiency: number; // 0 to 100
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  responsibilities: string[];
  techUsed: string[];
  isCurrent?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credUrl?: string;
  credentialId?: string;
  badgeColor?: string;
  highlight?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
  highlights: string[];
  gpaOrScore?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  replied?: boolean;
}

export interface AnalyticsData {
  visitorCount: number;
  projectViews: number;
  resumeDownloads: number;
  messageCount: number;
  dailyVisitors: { date: string; count: number }[];
  projectStats: { id: string; title: string; views: number }[];
}

export interface OwnerProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  objective: string;
  currentlyLearning: string[];
  codingProfiles: {
    platform: string;
    username: string;
    url: string;
    stats: string;
    icon: string;
  }[];
  stats: {
    projectsCompleted: number;
    problemsSolved: string;
    hackathons: string;
    certificationsCount: number;
  };
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  } | null;
}
