import React from 'react';
import { GraduationCap, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { Education } from '../../types';

interface EducationProps {
  educationList: Education[];
}

export default function EducationSection({ educationList }: EducationProps) {
  return (
    <section id="education" className="py-20 relative bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Education Timeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Academic history in Artificial Intelligence, Data Science, and Computer Science.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-blue-500/40 transition-all shadow-xl space-y-4 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300">{edu.institution}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end text-xs text-slate-400 space-y-1">
                  <span className="flex items-center gap-1.5 font-medium text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    {edu.location}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {edu.details}
              </p>

              {edu.highlights && edu.highlights.length > 0 && (
                <div className="pt-2 space-y-2">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Highlights & Activities
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {edu.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
