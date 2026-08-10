import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code2,
  Terminal,
  ArrowUp,
  Check,
  Copy,
  Heart,
} from 'lucide-react';
import { OwnerProfile } from '../../types';

interface FooterProps {
  profile: OwnerProfile;
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ profile, onNavigate }: FooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow ambient element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md shadow-blue-500/20">
                B
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  {profile.name}
                </h3>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest block">
                  Developer Portfolio // 2026
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {profile.objective}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => copyToClipboard(profile.email, 'email')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                {profile.email}
                {copiedEmail ? (
                  <Check className="w-3 h-3 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500 ml-1" />
                )}
              </button>

              <button
                onClick={() => copyToClipboard(profile.phone, 'phone')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                {profile.phone}
                {copiedPhone ? (
                  <Check className="w-3 h-3 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500 ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'education', 'contact'].map(
                (sec) => (
                  <li key={sec}>
                    <button
                      onClick={() => onNavigate(sec)}
                      className="text-slate-400 hover:text-blue-400 transition-colors capitalize text-xs font-medium"
                    >
                      {sec}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: Profiles & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Coding & Professional Profiles
            </h4>
            <div className="flex flex-col space-y-2.5">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-slate-300" />
                GitHub Repositories
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                LinkedIn Profile
              </a>
              <a
                href="https://leetcode.com/u/BalajiHariharasudhan/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 transition-colors"
              >
                <Code2 className="w-4 h-4 text-amber-400" />
                LeetCode Submissions
              </a>
              <a
                href="https://www.hackerrank.com/profile/bala3507563"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                HackerRank Profile
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Balaji Harihara Sudhan A. Built with MERN Stack & React.</p>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> for SDE Roles
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
