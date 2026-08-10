import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { AuthState } from '../../types';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenAdminLogin: () => void;
  auth: AuthState;
  onLogout: () => void;
}

export default function Navbar({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenAdminLogin,
  auth,
  onLogout,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: '01. Home' },
    { id: 'about', label: '02. About' },
    { id: 'skills', label: '03. Skills' },
    { id: 'experience', label: '04. Experience' },
    { id: 'projects', label: '05. Projects' },
    { id: 'achievements', label: '06. Awards' },
    { id: 'education', label: '07. Education' },
    { id: 'contact', label: '08. Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/50 shadow-xl shadow-black/40 py-3'
          : 'bg-slate-950/40 backdrop-blur-md py-4 border-b border-slate-800/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            B
          </div>
          <div>
            <span className="text-slate-100 font-bold tracking-tight text-sm sm:text-base block group-hover:text-blue-400 transition-colors">
              Balaji Harihara Sudhan A
            </span>
            <span className="font-semibold tracking-tight uppercase text-[10px] text-slate-400 opacity-70 block">
              Developer Portfolio // 2026
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-full border border-slate-800/60 backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50 opacity-80 hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('contact')}
            className="bg-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            Hire Me
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            Resume
          </button>

          {auth.isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLinkClick('admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Admin
              </button>
              <button
                onClick={onLogout}
                className="px-2 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 transition-colors"
                title="Logout Admin"
              >
                Exit
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all border border-slate-800"
              title="Admin Portal Login"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenResume}
            className="p-2 rounded-xl bg-slate-900 text-blue-400 border border-slate-800 text-xs font-medium flex items-center gap-1 sm:hidden"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-2 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-left text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </button>

            {auth.isAuthenticated ? (
              <button
                onClick={() => {
                  handleLinkClick('admin');
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAdminLogin();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
