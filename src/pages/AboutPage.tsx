import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User,
  CheckCircle2,
  ShieldCheck,
  Code2,
  Globe,
  Palette,
  Server,
  Workflow,
  Database,
  Terminal,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { data } = useApp();
  const { siteSettings, about, heroTechBadges } = data;

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-5 h-5 text-cyan-400" />,
    Code2: <Code2 className="w-5 h-5 text-blue-400" />,
    Palette: <Palette className="w-5 h-5 text-purple-400" />,
    Server: <Server className="w-5 h-5 text-emerald-400" />,
    Workflow: <Workflow className="w-5 h-5 text-pink-400" />,
    Database: <Database className="w-5 h-5 text-cyan-400" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>01 // ABOUT THE DEVELOPER</span>
          </div>
          <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Engineering With <span className="rgb-text-gradient">Precision</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl text-base font-['Plus_Jakarta_Sans']">
            A look into the background, technical philosophy, and engineering pillars behind Sohel Rana.
          </p>
        </div>

        {/* Top Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Photo & Specs Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-[#090D1A]/90 border border-white/10 p-6 backdrop-blur-xl">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 mb-5 relative group">
                <img
                  src={siteSettings.profilePhoto}
                  alt={siteSettings.name}
                  className="w-full h-full object-cover filter contrast-105"
                />
                {!siteSettings.profilePhoto && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_35%_30%,rgba(0,240,255,0.18),transparent_35%),radial-gradient(circle_at_70%_65%,rgba(168,85,247,0.2),transparent_40%)]">
                    <span className="font-display text-7xl font-black text-white/90">SR</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D1A] via-transparent to-transparent opacity-60" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400 uppercase">Developer</span>
                  <span className="text-white font-bold">{siteSettings.name}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-slate-400 uppercase">Specialization</span>
                  <span className="text-cyan-400">{siteSettings.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 uppercase">Availability</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl text-white">
              Bridging Clean Architecture & High-Performance Web Systems
            </h2>

            <div className="space-y-4 text-slate-300 font-['Plus_Jakarta_Sans'] text-base leading-relaxed">
              {about.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Philosophy Callout */}
            <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-bold mb-2">
                <Terminal className="w-4 h-4" />
                <span>Engineering Philosophy</span>
              </div>
              <p className="text-slate-300 text-sm font-['Plus_Jakarta_Sans'] italic">
                "{about.philosophy}"
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="px-5 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Learn With Sohel Rana
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>

        {/* Engineering Pillars */}
        <div className="border-t border-white/[0.08] pt-16">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 block">
              EXPERTISE & DOMAINS
            </span>
            <h3 className="font-['Outfit'] font-extrabold text-3xl text-white">
              Core Technical Competencies
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#090D1A]/80 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[area.icon] || <Code2 className="w-5 h-5 text-cyan-400" />}
                </div>
                <h4 className="font-['Outfit'] font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {area.title}
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm font-['Plus_Jakarta_Sans'] leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
