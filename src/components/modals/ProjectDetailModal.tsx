import React from 'react';
import { X, Github, ExternalLink, Eye, CheckCircle2, Layers, Calendar, Sparkles } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Image */}
        {project.image && (
          <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden border border-slate-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-bold shadow-md">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 text-slate-300 text-xs font-medium border border-slate-800">
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                {project.views} Views
              </span>
            </div>
          </div>
        )}

        {/* Header Title & Date */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>Created on {project.createdAt}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">{project.title}</h2>
          <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
        </div>

        {/* Tech Badges */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-400" />
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techBadges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Long Architectural Description */}
        <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Architecture & Highlights
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Key Features List */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Core Application Features
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Links */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all shadow-md"
          >
            <Github className="w-4 h-4" />
            View GitHub Repository
          </a>

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo / Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
