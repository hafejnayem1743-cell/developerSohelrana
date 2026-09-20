import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { data } = useApp();
  const { services, socialLinks } = data;

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>04 // FREELANCE SERVICES</span>
          </div>
          <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Engineering & <span className="rgb-text-gradient">Web Solutions</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl text-base font-['Plus_Jakarta_Sans']">
            Transparent package pricing and modern full-stack development for portfolio, business, and web application projects.
          </p>
        </div>

        {/* Services Overview Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-[#090D1A]/90 border border-white/[0.08] hover:border-cyan-500/40 p-8 backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,240,255,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">
                    SERVICE TIER
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Accepting Clients</span>
                  </div>
                </div>

                <h2 className="font-['Outfit'] font-black text-3xl text-white mb-2">
                  {service.title}
                </h2>

                <p className="text-slate-400 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* 3 Packages Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {service.tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                          {tier.name}
                        </span>
                        <div className="font-['Outfit'] font-black text-2xl text-white mb-2">
                          ${tier.price}
                        </div>
                        <p className="text-[11px] font-['Plus_Jakarta_Sans'] text-slate-400 leading-snug line-clamp-3">
                          {tier.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Details Action Button */}
              <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Full specifications & package comparison
                </span>

                <Link
                  to={`/services/${service.slug}`}
                  id={`view-service-${service.slug}-btn`}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Guarantee Note */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <h4 className="text-sm font-['Outfit'] font-bold text-white">
                Clear Scope & Project Communication
              </h4>
              <p className="text-xs text-slate-400 font-['Plus_Jakarta_Sans']">
                Project scope, deliverables, and communication can be agreed directly before development begins.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase whitespace-nowrap hover:bg-cyan-500/25 transition-colors cursor-pointer"
          >
            Start Project Inquiry →
          </Link>
        </div>
      </div>
    </div>
  );
};
