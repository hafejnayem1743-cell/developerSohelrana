import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Check,
  ExternalLink,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';

export const ServicePortfolioPage: React.FC = () => {
  const { data } = useApp();
  const service = data.services.find((s) => s.slug === 'portfolio');
  const { socialLinks } = data;

  if (!service) {
    return <div className="py-24 text-center text-white">Service not found.</div>;
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO SERVICES OVERVIEW</span>
        </Link>

        {/* Header Banner */}
        <div className="rounded-3xl bg-[#090D1A]/90 border border-cyan-500/30 p-8 sm:p-12 backdrop-blur-2xl mb-14 shadow-[0_0_40px_rgba(0,240,255,0.15)]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>FREELANCE SERVICE SPECIFICATIONS</span>
            </div>

            <h1 className="font-['Outfit'] font-black text-3xl sm:text-5xl text-white">
              {service.title}
            </h1>

            <p className="text-slate-300 text-base font-['Plus_Jakarta_Sans'] leading-relaxed">
              {service.description} Built specifically for engineers, creative founders, and agencies who demand an unmistakable, ultra-premium digital presence that converts high-value opportunities.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer"
              >
                <span>Order Package / Direct Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Packages In-Depth Comparison */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
              TIER BREAKDOWN
            </span>
            <h2 className="font-['Outfit'] font-black text-3xl text-white">
              Choose Your Portfolio Package
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {service.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-b from-cyan-950/40 via-[#090D1A]/95 to-[#090D1A] border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.25)] -translate-y-1.5'
                    : 'bg-[#090D1A]/85 border border-white/10 hover:border-cyan-500/30'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-400 text-slate-950 font-mono font-bold text-[10px] uppercase tracking-wider shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-['Outfit'] font-bold text-xl text-white">
                      {tier.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="font-['Outfit'] font-black text-5xl text-white">
                      ${tier.price}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ project</span>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm font-['Plus_Jakarta_Sans'] leading-relaxed mb-6">
                    {tier.summary}
                  </p>

                  <div className="space-y-3 mb-8 pt-4 border-t border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block">
                      Included Deliverables:
                    </span>
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <Link
                    to="/contact"
                    className={`w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      tier.popular
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110'
                        : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    <span>Order {tier.name} Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/contact"
                    className="w-full py-2 text-center font-mono text-[11px] text-slate-400 hover:text-white block transition-colors"
                  >
                    Discuss Custom Requirements →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Workflow */}
        <div className="p-8 rounded-3xl bg-slate-950/70 border border-white/10 mb-12">
          <h3 className="font-['Outfit'] font-bold text-xl text-white mb-6 text-center">
            Portfolio Delivery Pipeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                01
              </div>
              <div className="font-mono text-xs font-bold text-white uppercase">Requirements</div>
              <p className="text-slate-400 text-xs font-['Plus_Jakarta_Sans']">
                Gather content, brand goals, preferred color aesthetics, and assets.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                02
              </div>
              <div className="font-mono text-xs font-bold text-white uppercase">Architecture</div>
              <p className="text-slate-400 text-xs font-['Plus_Jakarta_Sans']">
                Engineer responsive layouts, typography scales, and micro-interactions.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                03
              </div>
              <div className="font-mono text-xs font-bold text-white uppercase">Review & QA</div>
              <p className="text-slate-400 text-xs font-['Plus_Jakarta_Sans']">
                Cross-device mobile inspection, performance tuning, and revisions.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                04
              </div>
              <div className="font-mono text-xs font-bold text-white uppercase">Live Handover</div>
              <p className="text-slate-400 text-xs font-['Plus_Jakarta_Sans']">
                Cloud deployment, domain binding, and full clean source code delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
