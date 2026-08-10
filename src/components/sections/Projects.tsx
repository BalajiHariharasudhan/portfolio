import React, { useState } from 'react';
import {
  Layers,
  Search,
  Github,
  ExternalLink,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Project } from '../../types';
import ProjectDetailModal from '../modals/ProjectDetailModal';

interface ProjectsProps {
  projects: Project[];
  onTrackProjectView: (id: string) => void;
}

export default function Projects({ projects, onTrackProjectView }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Frontend', 'DOM/JS'];

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techBadges.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (project: Project) => {
    setActiveModalProject(project);
    onTrackProjectView(project.id);
  };

  return (
    <section id="projects" className="py-20 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Portfolio Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Featured Full-Stack & Web Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Hands-on software development projects demonstrating full-stack architecture, REST APIs, responsive UI design, and DOM manipulation.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Project Image Banner */}
                {proj.image && (
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-blue-400 text-[10px] uppercase font-bold tracking-widest border border-slate-800 shadow-sm">
                        {proj.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md text-slate-400 text-[10px] font-medium border border-slate-800">
                        <Eye className="w-3 h-3 text-blue-400" />
                        {proj.views}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tech Badges / Tag pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {proj.techBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-800/80 rounded text-[10px] text-slate-300 border border-slate-700/60 font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleOpenDetail(proj)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => onTrackProjectView(proj.id)}
                    className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {proj.liveDemoUrl && (
                    <a
                      href={proj.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => onTrackProjectView(proj.id)}
                      className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-blue-400 border border-slate-800 transition-colors"
                      title="Live Demo Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-base font-semibold">No projects match your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-medium text-blue-400 underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
