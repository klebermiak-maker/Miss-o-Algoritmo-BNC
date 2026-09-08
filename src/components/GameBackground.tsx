import React from 'react';
import { BackgroundThemeId } from '../types';

interface GameBackgroundProps {
  theme: BackgroundThemeId;
}

export const GameBackground: React.FC<GameBackgroundProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-700">
      {/* 1. DEEP SPACE (Default): Cosmic Nebulas & Starfield */}
      {theme === 'deep-space' && (
        <>
          {/* Base space gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060814] via-[#090d1f] to-[#04060d]" />

          {/* Glowing Cosmic Nebulas */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/4 -right-40 w-[700px] h-[700px] bg-violet-600/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-[800px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl" />

          {/* SVG Starfield with Constellations & Tech Coordinates */}
          <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="space-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="0.75" fill="#94a3b8" opacity="0.3" />
                <circle cx="10" cy="90" r="0.5" fill="#38bdf8" opacity="0.4" />
                <circle cx="90" cy="20" r="0.6" fill="#c084fc" opacity="0.4" />
                <circle cx="25" cy="35" r="0.9" fill="#ffffff" opacity="0.5" />
                <circle cx="75" cy="70" r="0.4" fill="#67e8f9" opacity="0.3" />
                <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="3 7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#space-grid)" />
            
            {/* Distant Orbital Rings */}
            <circle cx="85%" cy="20%" r="220" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.08" fill="none" strokeDasharray="6 12" />
            <circle cx="85%" cy="20%" r="350" stroke="#c084fc" strokeWidth="0.75" strokeOpacity="0.05" fill="none" />
            <circle cx="15%" cy="85%" r="180" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.07" fill="none" strokeDasharray="4 8" />
          </svg>

          {/* Subtle Cyber Dust particles */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.18),rgba(255,255,255,0))]" />
        </>
      )}

      {/* 2. CYBER GRID: Neon Matrix Holographic Plane */}
      {theme === 'cyber-grid' && (
        <>
          {/* Base cyber dark */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#040d21] to-[#01040f]" />

          {/* Cyber Neon Glows */}
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent" />

          {/* Perspective Tech Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cyber-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.25" />
                <circle cx="40" cy="0" r="1.5" fill="#22d3ee" fillOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cyber-pattern)" />
            {/* Tech Horizon glow line */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="8 6" />
          </svg>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.7)_100%)]" />
        </>
      )}

      {/* 3. AURORA BOREALIS: Ethereal Quantum Glow */}
      {theme === 'aurora-borealis' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#060d17] via-[#0b1329] to-[#040814]" />

          {/* Fluid Aurora Waves */}
          <div className="absolute -top-24 left-10 w-[700px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] transform -rotate-12" />
          <div className="absolute top-1/4 right-0 w-[650px] h-[600px] bg-teal-500/20 rounded-full blur-[110px]" />
          <div className="absolute top-1/2 left-1/4 w-[800px] h-[450px] bg-indigo-500/15 rounded-full blur-[120px] transform rotate-6" />
          <div className="absolute -bottom-20 right-1/4 w-[600px] h-[400px] bg-violet-600/15 rounded-full blur-[90px]" />

          {/* Subtle Stardust overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="aurora-stars" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="30" r="0.75" fill="#a7f3d0" opacity="0.4" />
                <circle cx="60" cy="70" r="0.5" fill="#5eead4" opacity="0.3" />
                <circle cx="40" cy="15" r="0.6" fill="#e0e7ff" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aurora-stars)" />
          </svg>
        </>
      )}

      {/* 4. CAD BLUEPRINT: Technical Architecture & Coordinates */}
      {theme === 'cad-blueprint' && (
        <>
          {/* Engineering Blueprint Navy */}
          <div className="absolute inset-0 bg-[#071326]" />

          {/* Soft ambient lighting */}
          <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl" />

          {/* CAD Technical Graph Paper */}
          <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cad-small" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#0284c7" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>
              <pattern id="cad-large" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#cad-small)" />
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.25" />
                <circle cx="80" cy="0" r="1.5" fill="#7dd3fc" fillOpacity="0.4" />
                <circle cx="0" cy="80" r="1.5" fill="#7dd3fc" fillOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cad-large)" />
            
            {/* Technical Registration Marks */}
            <path d="M 30 30 L 45 30 M 30 30 L 30 45" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
            <path d="M 97% 30 L 95% 30 M 97% 30 L 97% 45" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
          </svg>
        </>
      )}

      {/* 5. SOLAR STATION: Golden Amber & Stellar Flare */}
      {theme === 'solar-station' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#140b04] via-[#1c1005] to-[#0a0502]" />

          {/* Radiant Solar Coronal Flare */}
          <div className="absolute -top-40 right-10 w-[700px] h-[700px] bg-amber-500/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[110px]" />
          <div className="absolute -bottom-32 right-1/4 w-[800px] h-[500px] bg-yellow-600/15 rounded-full blur-[100px]" />

          {/* Golden Stardust Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-45" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="solar-grid" width="90" height="90" patternUnits="userSpaceOnUse">
                <circle cx="45" cy="45" r="0.8" fill="#fde68a" opacity="0.5" />
                <circle cx="15" cy="75" r="0.5" fill="#fbbf24" opacity="0.4" />
                <circle cx="80" cy="20" r="0.6" fill="#f59e0b" opacity="0.3" />
                <path d="M 45 0 L 45 90 M 0 45 L 90 45" stroke="#78350f" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#solar-grid)" />
            {/* Solar Radius Wave */}
            <circle cx="90%" cy="10%" r="280" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.12" fill="none" strokeDasharray="8 12" />
            <circle cx="90%" cy="10%" r="420" stroke="#fbbf24" strokeWidth="0.75" strokeOpacity="0.08" fill="none" />
          </svg>
        </>
      )}

      {/* 6. STEALTH MATRIX: Pure Obsidian with Emerald Traces */}
      {theme === 'stealth-matrix' && (
        <>
          <div className="absolute inset-0 bg-[#020508]" />

          {/* Subtle Emerald Pulses */}
          <div className="absolute top-10 left-1/3 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-[700px] h-[500px] bg-green-500/10 rounded-full blur-[100px]" />

          {/* Matrix Scan & Circuit Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="matrix-circuit" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 0 25 L 20 25 L 25 30 L 45 30 L 50 25" fill="none" stroke="#10b981" strokeWidth="0.75" strokeOpacity="0.2" />
                <circle cx="20" cy="25" r="1.5" fill="#34d399" fillOpacity="0.4" />
                <circle cx="45" cy="30" r="1.5" fill="#34d399" fillOpacity="0.4" />
                <path d="M 25 0 L 25 15 L 30 20 L 30 50" fill="none" stroke="#059669" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#matrix-circuit)" />
          </svg>
        </>
      )}

      {/* Vignette Overlay for Crisp Readability of Game Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />
    </div>
  );
};
