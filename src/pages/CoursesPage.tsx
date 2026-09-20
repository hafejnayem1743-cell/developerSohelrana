import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  DollarSign,
  Layers,
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { data } = useApp();
  const { courses, bundle } = data;

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>03 // CODING ACADEMY</span>
          </div>
          <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Learn With <span className="rgb-text-gradient">Sohel Rana</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl text-base font-['Plus_Jakarta_Sans']">
            Learn full-stack web development, Python development, and app development through structured curriculum, technologies, and hands-on topics.
          </p>
        </div>

        {/* 3 Core Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses
            .filter((c) => c.enabled)
            .map((course) => (
              <div
                key={course.id}
                className="group relative rounded-3xl bg-[#090D1A]/90 border border-white/[0.08] hover:border-cyan-500/40 p-7 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Package Number & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold">
                      {course.packageNumber}
                    </span>
                    {course.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h3 className="font-['Outfit'] font-black text-2xl text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-400 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed mb-6 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-2">
                      Technologies Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.technologies.slice(0, 6).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] border border-white/[0.06] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {course.technologies.length > 6 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-slate-400">
                          +{course.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Price & View Course Action */}
                <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-['Outfit'] font-black text-3xl text-white">
                      ${course.price}
                    </span>
                    {course.regularPrice && (
                      <span className="text-xs font-mono text-slate-500 line-through">
                        ${course.regularPrice}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/courses/${course.slug}`}
                    id={`view-course-${course.slug}-btn`}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {/* 4th Highlighted Card: COMPLETE DEVELOPER BUNDLE */}
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-blue-950/40 border border-cyan-500/40 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                <Flame className="w-3.5 h-3.5" />
                <span>ULTIMATE CAREER TRACK — 30% DISCOUNT</span>
              </div>

              <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-white">
                {bundle.title}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base font-['Plus_Jakarta_Sans'] leading-relaxed max-w-2xl">
                {bundle.description}
              </p>

              {/* Feature Inclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {bundle.features.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & CTA Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center p-6 rounded-2xl bg-slate-950/80 border border-white/10 text-center lg:text-right space-y-4">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                  Regular Total: <span className="line-through">${bundle.regularTotal}</span>
                </span>
                <div className="flex items-baseline justify-center lg:justify-end gap-2">
                  <span className="font-['Outfit'] font-black text-4xl sm:text-5xl text-white">
                    ${bundle.finalPrice}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20">
                    Save {bundle.savings}
                  </span>
                </div>
              </div>

              <Link
                to="/courses/bundle"
                id="view-bundle-btn"
                className="w-full py-3.5 px-6 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{bundle.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
