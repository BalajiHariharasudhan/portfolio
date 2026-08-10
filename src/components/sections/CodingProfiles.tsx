import React from 'react';
import { Code2, Terminal, Cpu, Github, Linkedin, ExternalLink, Sparkles } from 'lucide-react';
import { OwnerProfile } from '../../types';

interface CodingProfilesProps {
  profile: OwnerProfile;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-amber-400" />,
  Terminal: <Terminal className="w-6 h-6 text-emerald-400" />,
  Cpu: <Cpu className="w-6 h-6 text-blue-400" />,
  Github: <Github className="w-6 h-6 text-slate-200" />,
  Linkedin: <Linkedin className="w-6 h-6 text-sky-400" />,
};

export default function CodingProfiles({ profile }: CodingProfilesProps) {
  return (
    <section id="coding-profiles" className="py-20 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            <span>Problem Solving & Socials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Coding Profiles & Presence
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Direct access to my competitive programming handles, GitHub repositories, and professional networks.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.codingProfiles.map((cp, idx) => (
            <a
              key={idx}
              href={cp.url}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl hover:-translate-y-1 group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 group-hover:scale-110 transition-transform">
                    {iconMap[cp.icon] || <Code2 className="w-6 h-6 text-blue-400" />}
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                    {cp.platform}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">@{cp.username}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  {cp.stats}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <span>Visit {cp.platform} Handle</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
