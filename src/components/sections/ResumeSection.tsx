import React from 'react';
import { FileText, Download, Printer, CheckCircle2, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OwnerProfile, Project, Experience, Education, Certification } from '../../types';

interface ResumeSectionProps {
  profile: OwnerProfile;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  onTrackResumeDownload: () => void;
}

export default function ResumeSection({
  profile,
  projects,
  experiences,
  education,
  certifications,
  onTrackResumeDownload,
}: ResumeSectionProps) {
  const handleDownload = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
    onTrackResumeDownload();
    window.open('/api/resume/download', '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-20 relative bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Official Resume & Curriculum Vitae
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            ATS-friendly formatted resume document ready for immediate download and recruitment review.
          </p>

          {/* Action Row */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              Download Resume (.txt)
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs sm:text-sm font-semibold transition-all"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Inline Resume Viewer Document Card */}
        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 print:bg-white print:text-black print:border-none print:shadow-none">
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-6 text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight uppercase">
              {profile.name}
            </h1>
            <p className="text-sm font-bold text-blue-400">
              Software Engineer | MERN Stack Developer | Java Developer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                {profile.phone}
              </span>
            </div>
          </div>

          {/* Objective */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Career Objective
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {profile.objective}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200">
                  <span>{edu.degree} — {edu.institution}</span>
                  <span className="text-slate-400 text-xs font-normal">{edu.period}</span>
                </div>
                <p className="text-xs text-slate-400">{edu.details}</p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Professional Experience
            </h3>
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="text-slate-400 text-xs font-normal">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Technical Projects
            </h3>
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200">
                  <span>{proj.title} <span className="text-xs font-normal text-slate-400">({proj.techBadges.join(', ')})</span></span>
                </div>
                <p className="text-xs text-slate-300">{proj.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-slate-800/80 pb-1">
              Certifications & Honors
            </h3>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
              {certifications.map((c) => (
                <li key={c.id}>
                  <strong className="text-slate-200">{c.title}</strong> — {c.issuer} ({c.date})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
