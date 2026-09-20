import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ExternalLink, ShieldCheck, ArrowRight, Briefcase, AlertTriangle } from 'lucide-react';

export const FiverrPage: React.FC = () => {
  const { data } = useApp();
  const configuredServices = data.services.filter((service) => Boolean(service.fiverrGigUrl));
  const profileUrl = data.socialLinks.fiverr;

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <div className="section-kicker"><ShieldCheck className="w-3.5 h-3.5" /> FIVERR</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Fiverr <span className="rgb-text-gradient">Links</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl text-base">
            This page only displays Fiverr URLs that are actually configured in the project. Reviews, ratings, orders, earnings, and customer statistics are not fabricated here.
          </p>
        </div>

        {configuredServices.length > 0 || profileUrl ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {configuredServices.map((service) => (
              <div key={service.id} className="rgb-border rounded-3xl p-8">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono uppercase tracking-widest mb-4">
                  <Briefcase className="w-4 h-4" /> Configured Fiverr Link
                </div>
                <h2 className="font-display font-bold text-2xl text-white mb-2">{service.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>
                <a href={service.fiverrGigUrl} target="_blank" rel="noopener noreferrer" className="premium-button px-5 py-3 text-xs">
                  Open Fiverr Gig <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
            {profileUrl && (
              <div className="rgb-border rounded-3xl p-8">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
                  <ShieldCheck className="w-4 h-4" /> Configured Profile
                </div>
                <h2 className="font-display font-bold text-2xl text-white mb-2">Fiverr Profile</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">Open the configured profile link to view the current public Fiverr information.</p>
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="premium-button px-5 py-3 text-xs">
                  Open Fiverr Profile <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="rgb-border rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <AlertTriangle className="w-10 h-10 text-amber-300 mx-auto mb-4" />
            <h2 className="font-display font-black text-2xl text-white mb-3">No Fiverr URL is configured</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-7">
              The uploaded project did not contain a verified Fiverr profile or gig URL, so no placeholder or invented Fiverr destination is shown.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/services" className="premium-button px-5 py-3 text-xs">View Services <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/contact" className="premium-button premium-button-muted px-5 py-3 text-xs">Contact Sohel Rana</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
