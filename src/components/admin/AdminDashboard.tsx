import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Layers,
  Cpu,
  Mail,
  BarChart3,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  RefreshCw,
  LogOut,
  X,
  Eye,
  FileText,
  User,
  Check,
} from 'lucide-react';
import {
  Project,
  Skill,
  ContactMessage,
  AnalyticsData,
  OwnerProfile,
  SkillCategory,
} from '../../types';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  onRefreshData: () => void;
}

export default function AdminDashboard({ token, onLogout, onRefreshData }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'messages' | 'projects' | 'skills' | 'profile'>('analytics');
  
  // Data states
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profile, setProfile] = useState<OwnerProfile | null>(null);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Project Form modal state
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    techBadges: '',
    githubUrl: '',
    liveDemoUrl: '',
    features: '',
    category: 'Full Stack' as 'Full Stack' | 'Frontend' | 'DOM/JS' | 'Other',
    image: '',
  });

  // Skill Form modal state
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Web Development' as SkillCategory,
    iconName: 'Code2',
    proficiency: 85,
    level: 'Advanced' as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
  });

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [anRes, msgRes, projRes, skRes, profRes] = await Promise.all([
        fetch('/api/analytics', { headers: authHeaders }),
        fetch('/api/messages', { headers: authHeaders }),
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/profile'),
      ]);

      if (anRes.ok) setAnalytics(await anRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (skRes.ok) setSkills(await skRes.json());
      if (profRes.ok) setProfile(await profRes.json());
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Message Operations
  const handleMarkRead = async (id: string) => {
    await fetch(`/api/messages/${id}/read`, {
      method: 'PATCH',
      headers: authHeaders,
    });
    fetchAdminData();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    await fetch(`/api/messages/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
    });
    fetchAdminData();
  };

  // Project CRUD
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      longDescription: projectForm.longDescription || projectForm.description,
      techBadges: projectForm.techBadges.split(',').map((s) => s.trim()).filter(Boolean),
      githubUrl: projectForm.githubUrl,
      liveDemoUrl: projectForm.liveDemoUrl || undefined,
      features: projectForm.features.split('\n').map((s) => s.trim()).filter(Boolean),
      category: projectForm.category,
      image: projectForm.image || 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80',
      featured: true,
    };

    if (editingProject) {
      await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(payload),
      });
    }

    setProjectModalOpen(false);
    setEditingProject(null);
    fetchAdminData();
    onRefreshData();
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
    });
    fetchAdminData();
    onRefreshData();
  };

  const openProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        description: proj.description,
        longDescription: proj.longDescription,
        techBadges: proj.techBadges.join(', '),
        githubUrl: proj.githubUrl,
        liveDemoUrl: proj.liveDemoUrl || '',
        features: proj.features.join('\n'),
        category: proj.category,
        image: proj.image || '',
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        longDescription: '',
        techBadges: '',
        githubUrl: 'https://github.com/BalajiHariharasudhan/',
        liveDemoUrl: '',
        features: '',
        category: 'Full Stack',
        image: '',
      });
    }
    setProjectModalOpen(true);
  };

  // Skill CRUD
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/skills', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(skillForm),
    });
    setSkillModalOpen(false);
    fetchAdminData();
    onRefreshData();
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    await fetch(`/api/skills/${id}`, {
      method: 'DELETE',
      headers: authHeaders,
    });
    fetchAdminData();
    onRefreshData();
  };

  return (
    <section id="admin" className="py-24 relative bg-slate-950 border-t border-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-100">Balaji&apos;s Portfolio Management</h2>
              <p className="text-xs text-slate-400">JWT Authenticated Admin Panel & Analytics</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAdminData}
              className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics Overview
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
              activeTab === 'messages'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            Messages ({messages.length})
            {messages.some((m) => !m.read) && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute top-1 right-1" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            Manage Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'skills'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Manage Skills ({skills.length})
          </button>
        </div>

        {/* Tab Content: Analytics */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>Total Unique Visitors</span>
                  <Eye className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-extrabold text-slate-100">{analytics.visitorCount}</div>
                <p className="text-[11px] text-slate-500 mt-1">Tracked site traffic</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>Total Project Views</span>
                  <Layers className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-extrabold text-slate-100">{analytics.projectViews}</div>
                <p className="text-[11px] text-slate-500 mt-1">Interactions across projects</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>Resume Downloads</span>
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-slate-100">{analytics.resumeDownloads}</div>
                <p className="text-[11px] text-slate-500 mt-1">Curriculum Vitae requests</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>Contact Submissions</span>
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-slate-100">{analytics.messageCount}</div>
                <p className="text-[11px] text-slate-500 mt-1">Recruiter messages</p>
              </div>
            </div>

            {/* Daily Visitor Graph representation */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200">30-Day Traffic Activity</h3>
              <div className="h-40 flex items-end gap-2 pt-6 border-b border-slate-800 pb-2">
                {analytics.dailyVisitors.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full bg-blue-600/80 group-hover:bg-blue-400 rounded-t-md transition-all"
                      style={{ height: `${Math.max(d.count * 4, 10)}px` }}
                      title={`${d.date}: ${d.count} visitors`}
                    />
                    <span className="text-[9px] text-slate-500 rotate-45 sm:rotate-0 mt-1">
                      {d.date.slice(5)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Messages */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-500 bg-slate-900 rounded-2xl border border-slate-800">
                No recruiter messages received yet.
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    msg.read
                      ? 'bg-slate-900/60 border-slate-800'
                      : 'bg-slate-900 border-blue-500/40 shadow-lg shadow-blue-500/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-100">{msg.name}</h4>
                        {!msg.read && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase">
                            New Message
                          </span>
                        )}
                      </div>
                      <a href={`mailto:${msg.email}`} className="text-xs text-blue-400 hover:underline">
                        {msg.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkRead(msg.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-300 block">Subject: {msg.subject}</span>
                    <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab Content: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">Project Catalog</h3>
              <button
                onClick={() => openProjectModal()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30"
              >
                <Plus className="w-4 h-4" />
                Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-100">{proj.title}</h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-950 text-blue-400 border border-slate-800">
                      {proj.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-500">Views: {proj.views}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openProjectModal(proj)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">Skills Database</h3>
              <button
                onClick={() => setSkillModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((sk) => (
                <div key={sk.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{sk.name}</h4>
                    <span className="text-[10px] text-slate-400">{sk.category} • {sk.proficiency}%</span>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(sk.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Project Form */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setProjectModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="DOM/JS">DOM/JS</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">GitHub Repository URL *</label>
                  <input
                    type="url"
                    required
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Tech Stack Badges (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React.js, Node.js, Express.js, MongoDB"
                  value={projectForm.techBadges}
                  onChange={(e) => setProjectForm({ ...projectForm, techBadges: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Core Features (one per line)</label>
                <textarea
                  rows={3}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  value={projectForm.features}
                  onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Skill Form */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Add New Skill</h3>
              <button onClick={() => setSkillModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Docker / Spring Boot"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                >
                  <option value="Programming">Programming</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Databases">Databases</option>
                  <option value="DSA">DSA</option>
                  <option value="Tools">Tools</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Proficiency % (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skillForm.proficiency}
                  onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md"
              >
                Save Skill
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
