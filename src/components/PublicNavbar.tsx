import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Code2,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Terminal,
} from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const { data, rgbTheme, setRgbTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Courses', path: '/courses' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const themeCycle = () => {
    const themes: ('aurora' | 'cyan' | 'purple' | 'green')[] = [
      'aurora',
      'cyan',
      'purple',
      'green',
    ];
    const nextIndex = (themes.indexOf(rgbTheme) + 1) % themes.length;
    setRgbTheme(themes[nextIndex]);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#04060B]/80 border-b border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-20 py-3 gap-3">
          {/* Brand Logo */}
          <Link
            to="/"
            id="nav-brand-logo"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:border-cyan-400 transition-all duration-300">
              <span className="font-mono font-bold text-xs text-cyan-400 group-hover:scale-110 transition-transform">
                &lt;SR/&gt;
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-col">
              <span className="font-['Outfit'] font-black tracking-wider text-sm sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                {data.siteSettings.name.toUpperCase()}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden min-[360px]:block text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-400 uppercase truncate max-w-[170px]">
                  {data.siteSettings.role}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-2xl bg-slate-950/60 border border-white/[0.06] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-cyan-400" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action: RGB Profile Switcher & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={themeCycle}
              id="theme-switcher-btn"
              title={`RGB Lighting Profile: ${rgbTheme.toUpperCase()} (Click to toggle)`}
              className="p-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="capitalize">{rgbTheme}</span>
            </button>

            <Link
              to="/contact"
              id="nav-hire-me-btn"
              className="px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wider text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
            >
              HIRE ME
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <button
              onClick={themeCycle}
              className="p-2 min-w-10 min-h-10 rounded-xl bg-slate-900 border border-white/10 text-cyan-400 cursor-pointer inline-flex items-center justify-center"
              title="Toggle RGB"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-nav-toggle-btn"
              className="p-2.5 min-w-10 min-h-10 rounded-xl bg-slate-900/90 border border-white/10 text-slate-300 hover:text-white cursor-pointer inline-flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060912]/95 border-b border-white/10 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-1.5">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-mono transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </Link>
              );
            })}

            <div className="pt-4 mt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500"
              >
                Hire Me / Get in Touch
              </Link>
              <Link
                to="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-slate-900 border border-cyan-500/30"
              >
                Explore Coding Academy
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
