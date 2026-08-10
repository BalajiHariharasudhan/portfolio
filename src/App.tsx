import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import ExperienceSection from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import EducationSection from './components/sections/Education';
import CodingProfiles from './components/sections/CodingProfiles';
import ResumeSection from './components/sections/ResumeSection';
import Contact from './components/sections/Contact';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLoginModal from './components/modals/AdminLoginModal';

import {
  OwnerProfile,
  Project,
  Skill,
  Experience,
  Certification,
  Education,
  AuthState,
} from './types';

import {
  initialOwnerProfile,
  initialProjects,
  initialSkills,
  initialExperiences,
  initialCertifications,
  initialEducation,
} from './data/portfolioData';

export default function App() {
  const [profile, setProfile] = useState<OwnerProfile>(initialOwnerProfile);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [education, setEducation] = useState<Education[]>(initialEducation);

  const [activeSection, setActiveSection] = useState<string>('home');
  const [adminLoginOpen, setAdminLoginOpen] = useState<boolean>(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false);

  const [auth, setAuth] = useState<AuthState>(() => {
    const savedToken = localStorage.getItem('balaji_admin_jwt');
    return {
      token: savedToken,
      isAuthenticated: Boolean(savedToken),
      user: savedToken ? { email: 'bala3507563@gmail.com', name: 'Balaji Harihara Sudhan A' } : null,
    };
  });

  // Fetch live portfolio data from Express server
  const loadPortfolioData = async () => {
    try {
      const [profRes, projRes, skRes, expRes, certRes, eduRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/experiences'),
        fetch('/api/certifications'),
        fetch('/api/education'),
      ]);

      if (profRes.ok) setProfile(await profRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (skRes.ok) setSkills(await skRes.json());
      if (expRes.ok) setExperiences(await expRes.json());
      if (certRes.ok) setCertifications(await certRes.json());
      if (eduRes.ok) setEducation(await eduRes.json());
    } catch (err) {
      console.warn('Using local fallback data:', err);
    }
  };

  useEffect(() => {
    loadPortfolioData();

    // Track visitor
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'visitor' }),
    }).catch(() => {});
  }, []);

  // Track project views
  const handleTrackProjectView = (id: string) => {
    fetch(`/api/projects/${id}/view`, { method: 'POST' }).catch(() => {});
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, views: (p.views || 0) + 1 } : p))
    );
  };

  // Track resume download
  const handleTrackResumeDownload = () => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'resume' }),
    }).catch(() => {});
  };

  // ScrollSpy for Active Section
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'skills',
      'experience',
      'projects',
      'achievements',
      'education',
      'coding-profiles',
      'resume',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin') {
      if (auth.isAuthenticated) {
        setShowAdminDashboard(true);
      } else {
        setAdminLoginOpen(true);
      }
      return;
    }

    setShowAdminDashboard(false);
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (token: string, user: { email: string; name: string }) => {
    localStorage.setItem('balaji_admin_jwt', token);
    setAuth({ token, isAuthenticated: true, user });
    setShowAdminDashboard(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('balaji_admin_jwt');
    setAuth({ token: null, isAuthenticated: false, user: null });
    setShowAdminDashboard(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Immersive UI Ambient Glow Background Orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Navigation Header */}
      <Navbar
        activeSection={showAdminDashboard ? 'admin' : activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => handleNavigate('resume')}
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
        auth={auth}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main>
        {showAdminDashboard && auth.token ? (
          <AdminDashboard
            token={auth.token}
            onLogout={handleLogout}
            onRefreshData={loadPortfolioData}
          />
        ) : (
          <>
            <Hero
              profile={profile}
              onNavigate={handleNavigate}
              onOpenResume={() => handleNavigate('resume')}
            />
            <About profile={profile} />
            <Skills skills={skills} />
            <ExperienceSection experiences={experiences} />
            <Projects projects={projects} onTrackProjectView={handleTrackProjectView} />
            <Achievements certifications={certifications} />
            <EducationSection educationList={education} />
            <CodingProfiles profile={profile} />
            <ResumeSection
              profile={profile}
              projects={projects}
              experiences={experiences}
              education={education}
              certifications={certifications}
              onTrackResumeDownload={handleTrackResumeDownload}
            />
            <Contact profile={profile} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer profile={profile} onNavigate={handleNavigate} />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
