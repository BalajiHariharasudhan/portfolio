import React, { useState, useEffect } from 'react';
import {
  FileText,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code2,
  Terminal,
  Award,
  Briefcase,
  Layers,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OwnerProfile } from '../../types';

interface HeroProps {
  profile: OwnerProfile;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

const roles = [
  'Software Engineer',
  'MERN Stack Developer',
  'Java Developer',
  'AI & DS Student',
  'Full-Stack Developer',
];

export default function Hero({ profile, onNavigate, onOpenResume }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const handleDownloadResume = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onOpenResume();
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glows & Particles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/15 to-purple-600/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Immersive UI Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-blue-400 font-mono text-xs sm:text-sm tracking-wider uppercase">
            <span className="h-px w-8 bg-blue-400"></span>
            AVAILABLE FOR ROLE
            <span className="h-px w-8 bg-blue-400"></span>
          </div>

          {/* Main Title & Role Typing */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Balaji{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500">
                Harihara
              </span>{' '}
              Sudhan A
            </h1>

            <div className="h-10 sm:h-12 flex items-center justify-center">
              <span className="text-lg sm:text-2xl font-bold text-slate-300 tracking-wide">
                Specializing in{' '}
                <span className="text-blue-400 border-r-2 border-blue-400 pr-1 animate-pulse">
                  {displayText}
                </span>
              </span>
            </div>
          </div>

          {/* Brief Immersive Tagline */}
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Software Engineer specializing in <span className="text-slate-100 underline decoration-blue-500/50 decoration-2 font-medium">MERN Stack</span> and <span className="text-slate-100 underline decoration-purple-500/50 decoration-2 font-medium">Java Development</span>. B.Tech AI & Data Science Student at St. Joseph&apos;s College of Engineering.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 shadow-md transition-all"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              View & Download Resume
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              Get in Touch
            </button>
          </div>

          {/* Social Icons Quick Row */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 text-slate-400 hover:text-blue-400 hover:bg-slate-800 border border-slate-800 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://leetcode.com/u/BalajiHariharasudhan/"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 text-slate-400 hover:text-amber-400 hover:bg-slate-800 border border-slate-800 transition-all"
              title="LeetCode"
            >
              <Code2 className="w-5 h-5" />
            </a>
            <a
              href="https://www.hackerrank.com/profile/bala3507563"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 border border-slate-800 transition-all"
              title="HackerRank"
            >
              <Terminal className="w-5 h-5" />
            </a>
          </div>

          {/* Stat Cards Grid */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-all group">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Full-Stack Projects</span>
                <Layers className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-extrabold text-slate-100">{profile.stats.projectsCompleted}</div>
              <p className="text-xs text-slate-400 mt-1">MERN & JS Applications</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-all group">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">DSA Solved</span>
                <Code2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-extrabold text-slate-100">{profile.stats.problemsSolved}</div>
              <p className="text-xs text-slate-400 mt-1">LeetCode / Skillrack</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-all group">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Internship</span>
                <Briefcase className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-extrabold text-slate-100">1</div>
              <p className="text-xs text-slate-400 mt-1">Approtech R&D Solutions</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 transition-all group">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Certifications</span>
                <Award className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-extrabold text-slate-100">{profile.stats.certificationsCount}</div>
              <p className="text-xs text-slate-400 mt-1">Oracle AI & NPTEL Silver</p>
            </div>
          </div>
        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="pt-12 text-center">
        <button
          onClick={() => onNavigate('about')}
          className="p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 animate-bounce transition-all inline-block"
          aria-label="Scroll to About section"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
