import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Database,
  Terminal,
  Wrench,
  Users,
  Coffee,
  FileCode,
  Atom,
  Server,
  Layout,
  Palette,
  FileJson,
  Binary,
  Brain,
  GitBranch,
  Code,
  MessageSquare,
  Handshake,
  Lightbulb,
} from 'lucide-react';
import { Skill, SkillCategory } from '../../types';

interface SkillsProps {
  skills: Skill[];
}

const categoryIcons: Record<SkillCategory, React.ReactNode> = {
  Programming: <Code2 className="w-4 h-4 text-blue-400" />,
  'Web Development': <Cpu className="w-4 h-4 text-indigo-400" />,
  Databases: <Database className="w-4 h-4 text-emerald-400" />,
  DSA: <Binary className="w-4 h-4 text-amber-400" />,
  Tools: <Wrench className="w-4 h-4 text-purple-400" />,
  'Soft Skills': <Users className="w-4 h-4 text-rose-400" />,
};

const skillIcons: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="w-5 h-5 text-amber-500" />,
  FileCode: <FileCode className="w-5 h-5 text-yellow-400" />,
  Atom: <Atom className="w-5 h-5 text-sky-400 animate-spin-slow" />,
  Server: <Server className="w-5 h-5 text-emerald-400" />,
  Cpu: <Cpu className="w-5 h-5 text-slate-300" />,
  Layout: <Layout className="w-5 h-5 text-orange-400" />,
  Palette: <Palette className="w-5 h-5 text-cyan-400" />,
  Database: <Database className="w-5 h-5 text-emerald-500" />,
  FileJson: <FileJson className="w-5 h-5 text-yellow-500" />,
  Binary: <Binary className="w-5 h-5 text-blue-400" />,
  Brain: <Brain className="w-5 h-5 text-purple-400" />,
  GitBranch: <GitBranch className="w-5 h-5 text-red-400" />,
  Code: <Code className="w-5 h-5 text-blue-500" />,
  Users: <Users className="w-5 h-5 text-indigo-400" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-green-400" />,
  Handshake: <Handshake className="w-5 h-5 text-rose-400" />,
  Lightbulb: <Lightbulb className="w-5 h-5 text-amber-400" />,
};

export default function Skills({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Programming',
    'Web Development',
    'Databases',
    'DSA',
    'Tools',
    'Soft Skills',
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical & Professional Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Skills & Technology Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Categorized overview of languages, frameworks, databases, tools, and soft skills honed through projects and coursework.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat !== 'All' && categoryIcons[cat as SkillCategory]}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
                    {skillIcons[skill.iconName] || <Code2 className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    skill.level === 'Expert'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      : skill.level === 'Advanced'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {skill.level}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 text-[11px]">Proficiency</span>
                  <span className="text-slate-200 font-semibold text-[11px]">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden p-[1px] border border-slate-800/80">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
