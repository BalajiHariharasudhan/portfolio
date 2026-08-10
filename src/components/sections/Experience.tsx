import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { Experience } from '../../types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Practical full-stack industry experience delivering web applications and collaborating in agile teams.
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 space-y-12 border-l-2 border-slate-800">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center group-hover:border-indigo-400 transition-colors">
                <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-purple-500/40 transition-all shadow-xl space-y-6 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-widest">
                        {exp.type}
                      </span>
                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-purple-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-purple-300">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs text-slate-400 space-y-1">
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    Key Contributions & Impact
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-purple-400 font-bold">▹</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-2 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    Tech Stack:
                  </span>
                  {exp.techUsed.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
