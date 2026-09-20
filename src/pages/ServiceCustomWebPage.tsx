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
  Database,
  Server,
  Code2,
} from 'lucide-react';

export const ServiceCustomWebPage: React.FC = () => {
  const { data } = useApp();
  const service = data.services.find((s) => s.slug === 'custom-web');
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
        <div className="rounded-3xl bg-[#090D1A]/90 border border-blue-500/30 p-8 sm:p-12 backdrop-blur-2xl mb-14 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
              <Code2 className="w-3.5 h-3.5" />
              <span>BESPOKE FULL-STACK ENGINEERING</span>
            </div>

            <h1 className="font-['Outfit'] font-black text-3xl sm:text-5xl text-white">
              {service.title}
            </h1>

            <p className="text-slate-300 text-base font-['Plus_Jakarta_Sans'] leading-relaxed">
              {service.description} From custom landing funnels to complex multi-tier web applications with database persistence, RESTful backends, and OWASP-hardened security.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
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
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-1">
              TIER BREAKDOWN
            </span>
            <h2 className="font-['Outfit'] font-black text-3xl text-white">
              Custom Web Application Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {service.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-b from-blue-950/40 via-[#090D1A]/95 to-[#090D1A] border-2 border-blue-400 shadow-[0_0_35px_rgba(59,130,246,0.25)] -translate-y-1.5'
                    : 'bg-[#090D1A]/85 border border-white/10 hover:border-blue-500/30'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-500 text-white font-mono font-bold text-[10px] uppercase tracking-wider shadow-lg">
                    RECOMMENDED
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
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
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
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:brightness-110'
                        : 'bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    <span>Order {tier.name} Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/contact"
                    className="w-full py-2 text-center font-mono text-[11px] text-slate-400 hover:text-white block transition-colors"
                  >
                    Request Technical Scope Discussion →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Highlights */}
        <div className="p-8 rounded-3xl bg-slate-950/70 border border-white/10">
          <h3 className="font-['Outfit'] font-bold text-xl text-white mb-6 text-center">
            Supported Technology Ecosystem
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-[#090D1A] border border-white/[0.06]">
              <Server className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="font-mono text-xs font-bold text-white mb-1">Backend Services</div>
              <p className="text-slate-400 text-xs font-['Plus_Jakarta_Sans']">
                Node.js, Express, Python Django, and RESTful architectures with token authentication.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D1A] border border-white/[0.06]">
              <Database className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="font-mono text-xs font-bold text-white mb-1">Databases & Storage</div>
              <p className="text-slate-400 text-xs font-['Plus_Jakarta_Sans']">
                MongoDB schemas, PostgreSQL relational tables, and Firebase real-time data sync.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D1A] border border-white/[0.06]">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="font-mono text-xs font-bold text-white mb-1">Defensive Security</div>
              <p className="text-slate-400 text-xs font-['Plus_Jakarta_Sans']">
                Strict input sanitization, CORS configuration, CSP headers, and OWASP audit verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
