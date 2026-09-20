import React from 'react';
import { useApp } from '../context/AppContext';

export const CyberBackground: React.FC = () => {
  const { rgbTheme } = useApp();

  // Determine glow gradient accents based on theme
  const getGlowStyles = () => {
    switch (rgbTheme) {
      case 'cyan':
        return {
          glow1: 'bg-cyan-500/10',
          glow2: 'bg-blue-600/10',
          glow3: 'bg-teal-500/10',
        };
      case 'purple':
        return {
          glow1: 'bg-purple-600/12',
          glow2: 'bg-pink-600/10',
          glow3: 'bg-indigo-600/10',
        };
      case 'green':
        return {
          glow1: 'bg-emerald-500/10',
          glow2: 'bg-cyan-500/10',
          glow3: 'bg-green-600/10',
        };
      case 'aurora':
      default:
        return {
          glow1: 'bg-cyan-500/10',
          glow2: 'bg-purple-600/10',
          glow3: 'bg-pink-500/08',
        };
    }
  };

  const glows = getGlowStyles();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#04060B]">
      {/* Subtle futuristic cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Subtle radial dots */}
      <div className="absolute inset-0 cyber-dots opacity-20" />

      {/* Top ambient aura */}
      <div
        className={`absolute -top-40 left-1/4 w-[600px] h-[500px] rounded-full filter blur-[120px] transition-colors duration-1000 ${glows.glow1}`}
      />

      {/* Mid ambient aura */}
      <div
        className={`absolute top-[40%] -right-20 w-[550px] h-[550px] rounded-full filter blur-[140px] transition-colors duration-1000 ${glows.glow2}`}
      />

      {/* Bottom ambient aura */}
      <div
        className={`absolute -bottom-20 left-1/3 w-[650px] h-[600px] rounded-full filter blur-[150px] transition-colors duration-1000 ${glows.glow3}`}
      />

      {/* Subtle scanline / top vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04060B]/60 via-transparent to-[#04060B] pointer-events-none" />
    </div>
  );
};
