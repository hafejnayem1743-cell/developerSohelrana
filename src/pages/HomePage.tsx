import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Briefcase,
  Cpu,
  CheckCircle2,
  Terminal,
  ExternalLink,
  ChevronRight,
  Code2,
  ShieldCheck,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { data } = useApp();
  const { siteSettings, heroTechBadges, courses, services } = data;

  return (
    <div className="relative">
      {/* 1. COMPACT HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono tracking-widest text-cyan-300 font-semibold uppercase">
                  {siteSettings.statusText}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-['Outfit'] font-black tracking-tight text-4xl sm:text-6xl lg:text-7xl text-white">
                  {siteSettings.headline}
                </h1>
                <h2 className="font-['Outfit'] font-bold text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  {siteSettings.subtitle}
                </h2>
              </div>

              {/* Short Description */}
              <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                {siteSettings.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/courses"
                  id="hero-explore-courses-btn"
                  className="px-6 py-3.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  id="hero-services-btn"
                  className="px-6 py-3.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-cyan-300 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Freelance Services</span>
                </Link>

                <Link
                  to="/contact"
                  id="hero-hire-me-btn"
                  className="px-6 py-3.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-900 border border-white/10 hover:border-purple-400/40 transition-all cursor-pointer"
                >
                  Hire Me
                </Link>
              </div>

              {/* Small Technology Badges */}
              <div className="pt-4 w-full">
                <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 block mb-2.5">
                  Core Engineering Stack:
                </span>
                <div className="flex flex-wrap gap-2">
                  {heroTechBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-950/80 border border-white/[0.08] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Developer Photo Card Treatment */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-xl opacity-75" />

                <div className="relative rounded-3xl bg-[#080C18]/90 border border-white/10 p-5 backdrop-blur-2xl shadow-2xl">
                  {/* Card Terminal Header */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.06] text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">
                      workstation://sohel-rana
                    </span>
                  </div>

                  {/* Photo Frame */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-white/10 group">
                    <img
                      src={siteSettings.profilePhoto}
                      alt={siteSettings.name}
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                    {!siteSettings.profilePhoto && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_35%_30%,rgba(0,240,255,0.18),transparent_35%),radial-gradient(circle_at_70%_65%,rgba(168,85,247,0.2),transparent_40%)]">
                        <span className="font-display text-7xl font-black text-white/90">SR</span>
                      </div>
                    )}

                    {/* Gradient cyber tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-transparent to-transparent opacity-60" />

                    {/* Corner HUD Markers */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                  </div>

                  {/* Developer Card Details */}
                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <div className="font-['Outfit'] font-bold text-white text-base">
                        {siteSettings.name}
                      </div>
                      <div className="text-xs font-mono text-cyan-400">
                        {siteSettings.role}
                      </div>
                    </div>
                    <Link
                      to="/about"
                      className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Read Bio</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION PREVIEW CARDS (Compact layout as explicitly mandated) */}
      <section className="relative py-16 border-t border-white/[0.06] bg-[#04070F]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
              DISCOVER & EXPLORE
            </span>
            <h3 className="font-['Outfit'] font-extrabold text-2xl sm:text-3xl text-white">
              Engineering & Academy Overview
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Courses Preview */}
            <div className="group relative rounded-2xl bg-[#080C18]/90 border border-white/[0.08] hover:border-cyan-500/40 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-['Outfit'] font-bold text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  Coding Courses
                </h4>
                <p className="text-slate-400 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed mb-6">
                  Learn industry-grade Full-Stack, Python backend, and native Android app engineering from hands-on production codebases.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-6">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04]">3 Major Tracks</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                    Bundle 30% OFF
                  </span>
                </div>
              </div>

              <Link
                to="/courses"
                id="home-preview-courses-link"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 text-xs font-mono text-cyan-300 flex items-center justify-center gap-2 transition-all cursor-pointer font-semibold"
              >
                <span>View Courses Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Services Preview */}
            <div className="group relative rounded-2xl bg-[#080C18]/90 border border-white/[0.08] hover:border-blue-500/40 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h4 className="font-['Outfit'] font-bold text-xl text-white mb-2 group-hover:text-blue-300 transition-colors">
                  Freelance Services
                </h4>
                <p className="text-slate-400 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed mb-6">
                  Bespoke portfolio and custom web application development with transparent package pricing and direct project communication.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-6">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04]">Portfolio ($80-$200)</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04]">Custom ($90-$300)</span>
                </div>
              </div>

              <Link
                to="/services"
                id="home-preview-services-link"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400 text-xs font-mono text-blue-300 flex items-center justify-center gap-2 transition-all cursor-pointer font-semibold"
              >
                <span>View Services Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Technical Skills Preview */}
            <div className="group relative rounded-2xl bg-[#080C18]/90 border border-white/[0.08] hover:border-purple-500/40 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="font-['Outfit'] font-bold text-xl text-white mb-2 group-hover:text-purple-300 transition-colors">
                  Technical Skills & Stack
                </h4>
                <p className="text-slate-400 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed mb-6">
                  A practical stack spanning frontend, backend, databases, mobile development, tooling, and web security.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-6">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04]">Modern Tooling</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04]">Full-Stack Ready</span>
                </div>
              </div>

              <Link
                to="/skills"
                id="home-preview-skills-link"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-purple-500/20 border border-white/10 hover:border-purple-400 text-xs font-mono text-purple-300 flex items-center justify-center gap-2 transition-all cursor-pointer font-semibold"
              >
                <span>Explore Technical Skills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
