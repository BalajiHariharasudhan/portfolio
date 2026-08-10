import React from 'react';
import {
  User,
  MapPin,
  GraduationCap,
  Sparkles,
  BookOpen,
  Code,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { OwnerProfile } from '../../types';

interface AboutProps {
  profile: OwnerProfile;
}

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-20 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Engineering SDE Solutions with Modern Tech
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Get to know my technical background, academic journey, and what drives my software development craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Personal Intro Card & Quick Facts */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-blue-500/40 transition-all">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-400" />
                Professional Summary
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {profile.objective}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Education</span>
                    <span className="text-sm font-bold text-slate-200">B.Tech AI & DS (Expected 2028)</span>
                    <span className="text-xs text-slate-400 block">St. Joseph&apos;s College of Engineering</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Location</span>
                    <span className="text-sm font-bold text-slate-200">{profile.location}</span>
                    <span className="text-xs text-slate-400 block">Open to Remote / Onsite Roles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values / Engineering Mindset */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-400">
                  <Code className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-200">Clean Architecture</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Prioritizing modular React components, RESTful standards, and maintainable data stores.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                <div className="p-2 w-fit rounded-lg bg-amber-500/10 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-200">Algorithmic Rigor</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Continuous practice on LeetCode & HackerRank focusing on optimal time & space complexity.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2">
                <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-200">Continuous Growth</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Expanding from full-stack MERN into backend Java Spring Boot and Cloud System Design.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Currently Learning & Growth Focus */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Currently Learning & Mastering</h3>
                  <p className="text-xs text-slate-400">Technologies and concepts in active practice</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {profile.currentlyLearning.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-blue-500/50 hover:bg-slate-800 transition-all shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    {topic}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Academic Focus Areas
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Artificial Intelligence & Machine Learning Fundamentals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Data Structures, Algorithms & Computational Complexity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Database Management Systems & MongoDB Aggregation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Full-Stack Software Engineering Architecture
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
