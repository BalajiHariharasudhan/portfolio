import React from 'react';
import { Award, Trophy, Medal, ExternalLink, Calendar, Users, Sparkles } from 'lucide-react';
import { Certification } from '../../types';

interface AchievementsProps {
  certifications: Certification[];
}

export default function Achievements({ certifications }: AchievementsProps) {
  return (
    <section id="achievements" className="py-20 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Certifications & Hackathon Wins
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Recognitions for academic excellence, algorithmic competition performance, and industry-standard certifications.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
                    {cert.title.includes('Prize') || cert.title.includes('Hackathon') ? (
                      <Trophy className="w-6 h-6 text-amber-400" />
                    ) : cert.title.includes('Silver') ? (
                      <Medal className="w-6 h-6 text-slate-300" />
                    ) : (
                      <Award className="w-6 h-6 text-blue-400" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {cert.date}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Issued by: <span className="text-slate-200">{cert.issuer}</span>
                  </p>
                </div>

                {cert.highlight && (
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                    {cert.highlight}
                  </p>
                )}
              </div>

              {cert.credUrl && cert.credUrl !== '#' && (
                <div className="pt-3 border-t border-slate-800/80">
                  <a
                    href={cert.credUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Verify Credential
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Leadership & Extracurricular Highlights Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Leadership & Extracurricular Initiatives</h3>
              <p className="text-xs text-slate-400">Campus activities and technical club participation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-xs font-bold text-blue-400 block">NSDC–SJCE Chapter</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Active Member contributing to skill development and technical workshops.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-xs font-bold text-indigo-400 block">Hackathon Contender</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Regular participant in coding hackathons, leading team presentations and rapid prototyping.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <span className="text-xs font-bold text-purple-400 block">Mini-Project Mentor</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Leading collegiate peer discussions on JavaScript, React components, and MERN setup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
