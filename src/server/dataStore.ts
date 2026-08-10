import fs from 'fs';
import path from 'path';
import {
  OwnerProfile,
  Project,
  Skill,
  Experience,
  Certification,
  Education,
  ContactMessage,
  AnalyticsData,
} from '../types';
import {
  initialOwnerProfile,
  initialProjects,
  initialSkills,
  initialExperiences,
  initialCertifications,
  initialEducation,
} from '../data/portfolioData';

interface DbSchema {
  profile: OwnerProfile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  certifications: Certification[];
  education: Education[];
  messages: ContactMessage[];
  analytics: AnalyticsData;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const defaultData: DbSchema = {
  profile: initialOwnerProfile,
  projects: initialProjects,
  skills: initialSkills,
  experiences: initialExperiences,
  certifications: initialCertifications,
  education: initialEducation,
  messages: [
    {
      id: 'msg-sample-1',
      name: 'HR Recruiter - Tech Corp',
      email: 'recruiter@techcorp.com',
      subject: 'Inquiry regarding SDE Entry-Level Role',
      message:
        'Hi Balaji, We reviewed your MERN Stack portfolio and LeetCode activity. We would love to schedule a introductory technical call for our Software Development Engineer opening.',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      read: true,
    },
  ],
  analytics: {
    visitorCount: 128,
    projectViews: 355,
    resumeDownloads: 42,
    messageCount: 1,
    dailyVisitors: [
      { date: '2026-08-04', count: 12 },
      { date: '2026-08-05', count: 18 },
      { date: '2026-08-06', count: 24 },
      { date: '2026-08-07', count: 31 },
      { date: '2026-08-08', count: 19 },
      { date: '2026-08-09', count: 24 },
      { date: '2026-08-10', count: 15 },
    ],
    projectStats: [
      { id: 'mern-task-manager', title: 'MERN Task Manager', views: 142 },
      { id: 'booksky', title: 'BookSky', views: 115 },
      { id: 'instagram-clone', title: 'Instagram Clone', views: 98 },
    ],
  },
};

class DataStore {
  private data: DbSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DbSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          ...defaultData,
          ...parsed,
          profile: parsed.profile || defaultData.profile,
          projects: parsed.projects || defaultData.projects,
          skills: parsed.skills || defaultData.skills,
          experiences: parsed.experiences || defaultData.experiences,
          certifications: parsed.certifications || defaultData.certifications,
          education: parsed.education || defaultData.education,
          messages: parsed.messages || defaultData.messages,
          analytics: parsed.analytics || defaultData.analytics,
        };
      }
    } catch (err) {
      console.error('Error loading DB file, fallback to defaults:', err);
    }
    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(dataToSave?: DbSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave || this.data, null, 2));
    } catch (err) {
      console.error('Error saving DB file:', err);
    }
  }

  // Profile
  getProfile(): OwnerProfile {
    return this.data.profile;
  }
  updateProfile(newProfile: Partial<OwnerProfile>): OwnerProfile {
    this.data.profile = { ...this.data.profile, ...newProfile };
    this.saveData();
    return this.data.profile;
  }

  // Projects
  getProjects(): Project[] {
    return this.data.projects;
  }
  getProjectById(id: string): Project | undefined {
    return this.data.projects.find((p) => p.id === id);
  }
  createProject(proj: Omit<Project, 'id' | 'views' | 'createdAt'>): Project {
    const id = proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const newProj: Project = {
      ...proj,
      id,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.data.projects.unshift(newProj);
    this.data.profile.stats.projectsCompleted = this.data.projects.length;
    this.saveData();
    return newProj;
  }
  updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const idx = this.data.projects.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    this.data.projects[idx] = { ...this.data.projects[idx], ...updates };
    this.saveData();
    return this.data.projects[idx];
  }
  deleteProject(id: string): boolean {
    const initialLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter((p) => p.id !== id);
    if (this.data.projects.length !== initialLen) {
      this.data.profile.stats.projectsCompleted = this.data.projects.length;
      this.saveData();
      return true;
    }
    return false;
  }
  incrementProjectView(id: string): number {
    const proj = this.getProjectById(id);
    if (proj) {
      proj.views = (proj.views || 0) + 1;
      this.data.analytics.projectViews += 1;
      const stat = this.data.analytics.projectStats.find((s) => s.id === id);
      if (stat) {
        stat.views = proj.views;
      } else {
        this.data.analytics.projectStats.push({ id, title: proj.title, views: proj.views });
      }
      this.saveData();
      return proj.views;
    }
    return 0;
  }

  // Skills
  getSkills(): Skill[] {
    return this.data.skills;
  }
  createSkill(skill: Omit<Skill, 'id'>): Skill {
    const newSkill: Skill = {
      ...skill,
      id: 's-' + Date.now(),
    };
    this.data.skills.push(newSkill);
    this.saveData();
    return newSkill;
  }
  updateSkill(id: string, updates: Partial<Skill>): Skill | undefined {
    const idx = this.data.skills.findIndex((s) => s.id === id);
    if (idx === -1) return undefined;
    this.data.skills[idx] = { ...this.data.skills[idx], ...updates };
    this.saveData();
    return this.data.skills[idx];
  }
  deleteSkill(id: string): boolean {
    const initialLen = this.data.skills.length;
    this.data.skills = this.data.skills.filter((s) => s.id !== id);
    if (this.data.skills.length !== initialLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Experiences
  getExperiences(): Experience[] {
    return this.data.experiences;
  }
  createExperience(exp: Omit<Experience, 'id'>): Experience {
    const newExp: Experience = {
      ...exp,
      id: 'exp-' + Date.now(),
    };
    this.data.experiences.unshift(newExp);
    this.saveData();
    return newExp;
  }
  updateExperience(id: string, updates: Partial<Experience>): Experience | undefined {
    const idx = this.data.experiences.findIndex((e) => e.id === id);
    if (idx === -1) return undefined;
    this.data.experiences[idx] = { ...this.data.experiences[idx], ...updates };
    this.saveData();
    return this.data.experiences[idx];
  }
  deleteExperience(id: string): boolean {
    const initialLen = this.data.experiences.length;
    this.data.experiences = this.data.experiences.filter((e) => e.id !== id);
    if (this.data.experiences.length !== initialLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Certifications
  getCertifications(): Certification[] {
    return this.data.certifications;
  }
  createCertification(cert: Omit<Certification, 'id'>): Certification {
    const newCert: Certification = {
      ...cert,
      id: 'cert-' + Date.now(),
    };
    this.data.certifications.push(newCert);
    this.data.profile.stats.certificationsCount = this.data.certifications.length;
    this.saveData();
    return newCert;
  }
  updateCertification(id: string, updates: Partial<Certification>): Certification | undefined {
    const idx = this.data.certifications.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    this.data.certifications[idx] = { ...this.data.certifications[idx], ...updates };
    this.saveData();
    return this.data.certifications[idx];
  }
  deleteCertification(id: string): boolean {
    const initialLen = this.data.certifications.length;
    this.data.certifications = this.data.certifications.filter((c) => c.id !== id);
    if (this.data.certifications.length !== initialLen) {
      this.data.profile.stats.certificationsCount = this.data.certifications.length;
      this.saveData();
      return true;
    }
    return false;
  }

  // Education
  getEducation(): Education[] {
    return this.data.education;
  }
  createEducation(edu: Omit<Education, 'id'>): Education {
    const newEdu: Education = {
      ...edu,
      id: 'edu-' + Date.now(),
    };
    this.data.education.push(newEdu);
    this.saveData();
    return newEdu;
  }
  updateEducation(id: string, updates: Partial<Education>): Education | undefined {
    const idx = this.data.education.findIndex((e) => e.id === id);
    if (idx === -1) return undefined;
    this.data.education[idx] = { ...this.data.education[idx], ...updates };
    this.saveData();
    return this.data.education[idx];
  }
  deleteEducation(id: string): boolean {
    const initialLen = this.data.education.length;
    this.data.education = this.data.education.filter((e) => e.id !== id);
    if (this.data.education.length !== initialLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Messages
  getMessages(): ContactMessage[] {
    return this.data.messages;
  }
  createMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
      read: false,
    };
    this.data.messages.unshift(newMsg);
    this.data.analytics.messageCount += 1;
    this.saveData();
    return newMsg;
  }
  markMessageRead(id: string): boolean {
    const msg = this.data.messages.find((m) => m.id === id);
    if (msg) {
      msg.read = true;
      this.saveData();
      return true;
    }
    return false;
  }
  deleteMessage(id: string): boolean {
    const initialLen = this.data.messages.length;
    this.data.messages = this.data.messages.filter((m) => m.id !== id);
    if (this.data.messages.length !== initialLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Analytics & Tracking
  getAnalytics(): AnalyticsData {
    return this.data.analytics;
  }
  trackVisitor(): void {
    this.data.analytics.visitorCount += 1;
    const today = new Date().toISOString().split('T')[0];
    const dayEntry = this.data.analytics.dailyVisitors.find((d) => d.date === today);
    if (dayEntry) {
      dayEntry.count += 1;
    } else {
      this.data.analytics.dailyVisitors.push({ date: today, count: 1 });
      if (this.data.analytics.dailyVisitors.length > 30) {
        this.data.analytics.dailyVisitors.shift();
      }
    }
    this.saveData();
  }
  trackResumeDownload(): void {
    this.data.analytics.resumeDownloads += 1;
    this.saveData();
  }
}

export const db = new DataStore();
