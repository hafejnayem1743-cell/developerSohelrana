import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowUp,
  Code2,
  Mail,
  CheckCircle2,
} from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { data } = useApp();
  const { siteSettings } = data;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#03050B] pt-14 pb-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="font-mono text-cyan-400 font-bold text-sm">&lt;SR/&gt;</span>
              <span className="font-['Outfit'] font-black tracking-wider text-xl text-white">
                {siteSettings.name.toUpperCase()}
              </span>
            </Link>

            <p className="text-sm font-['Plus_Jakarta_Sans'] text-slate-400 max-w-sm leading-relaxed">
              {siteSettings.shortDescription}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{siteSettings.statusText}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold block">
              Direct Pages
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link to="/about" className="hover:text-cyan-300 transition-colors">
                  // 01. About Developer
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-cyan-300 transition-colors">
                  // 02. Technical Skills
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-cyan-300 transition-colors">
                  // 03. Coding Courses
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-300 transition-colors">
                  // 04. Freelance Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-300 transition-colors">
                  // 05. Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold block">
              Contact
            </span>
            <div className="space-y-2.5 text-xs font-mono">
              <Link
                to="/contact"
                className="flex items-center gap-2 text-cyan-400 hover:underline pt-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Submit Workstation Inquiry</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>{siteSettings.footerCopyright}</div>

          <div className="text-slate-400 flex items-center gap-1.5">
            <span>{siteSettings.footerTagline}</span>
          </div>

          <button
            onClick={scrollToTop}
            id="public-footer-scroll-top-btn"
            className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
