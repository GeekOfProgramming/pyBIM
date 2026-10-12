"use client";

import { useId } from "react";

/**
 * EngineeringBackdrop
 * 
 * Design System v2 — Engineering Precision Background Architecture
 * 
 * Supports:
 * 1. variant="home-hero" (Parametric BIM × Digital Intelligence — Custom Hero)
 *    - Architectural drafting structure, sparse parametric lines, fine node field,
 *      and soft off-canvas ambient blue lighting from multiple edge angles.
 * 
 * 2. variant="home-base" (Family A — Architectural BIM Canvas for Home)
 *    - Drawing-paper aesthetic, delicate Revit/BIM construction guidelines,
 *      orthogonal drafting segments, sparse intersection markers, subtle secondary dots,
 *      and soft ambient blue edge illumination entering from outside the viewport.
 * 
 * 3. variant="home-surface" (Family B — Digital Intelligence Canvas for Home)
 *    - Fine technical dot matrix, subtle node connections, faint engineering guide lines,
 *      controlled density, and soft ambient light entering from surrounding edges.
 * 
 * 4. variant="base" / variant="surface" (Default legacy fallback)
 *    - Backward-compatible standard rendering for Services, About, Education, Contact, etc.
 */
export default function EngineeringBackdrop({ variant = "base", className = "" }) {
  const baseId = useId();

  // =========================================================================
  // 1. HOME HERO: Parametric BIM × Digital Intelligence Composition
  // =========================================================================
  if (variant === "home-hero") {
    return (
      <div 
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`} 
        aria-hidden="true"
      >
        {/* Soft Ambient Off-Canvas Edge Lighting Sources */}
        {/* Top-Left off-canvas glow */}
        <div 
          className="absolute -top-32 -left-32 w-[600px] h-[550px] bg-gradient-to-br from-blue-600/[0.08] via-indigo-600/[0.04] to-transparent dark:from-blue-500/[0.14] dark:via-indigo-500/[0.06] dark:to-transparent rounded-full blur-[140px]" 
        />
        {/* Top-Right off-canvas glow */}
        <div 
          className="absolute -top-24 -right-24 w-[650px] h-[500px] bg-gradient-to-bl from-sky-500/[0.07] via-blue-600/[0.03] to-transparent dark:from-sky-400/[0.12] dark:via-blue-600/[0.05] dark:to-transparent rounded-full blur-[130px]" 
        />
        {/* Subtle Bottom-Right glow entering viewport */}
        <div 
          className="absolute -bottom-40 right-1/4 w-[500px] h-[450px] bg-gradient-to-tl from-cyan-500/[0.05] via-blue-500/[0.02] to-transparent dark:from-cyan-400/[0.08] dark:via-blue-500/[0.03] dark:to-transparent rounded-full blur-[130px]" 
        />

        {/* Home Hero Parametric & Architectural SVG Geometry Layer */}
        <div 
          className="absolute inset-0 text-slate-800 dark:text-blue-100"
          style={{
            maskImage: "radial-gradient(ellipse 95% 85% at 50% 35%, black 40%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse 95% 85% at 50% 35%, black 40%, transparent 95%)",
          }}
        >
          {/* Subtle Primary Technical Pattern */}
          <svg className="w-full h-full opacity-[0.06] dark:opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-hero-grid`} width="96" height="96" patternUnits="userSpaceOnUse">
                {/* Architectural Coordinate Lines */}
                <path d="M 96 0 L 0 0 0 96" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.45" />
                <path d="M 0 48 L 96 48 M 48 0 L 48 96" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 9" strokeOpacity="0.3" />
                {/* Structural Node Dots */}
                <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="96" cy="0" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="0" cy="96" r="1.5" fill="currentColor" opacity="0.6" />
                <circle cx="96" cy="96" r="1.5" fill="currentColor" opacity="0.6" />
                {/* Secondary Center Point */}
                <circle cx="48" cy="48" r="1" fill="currentColor" opacity="0.35" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${baseId}-hero-grid)`} />
          </svg>

          {/* Hero Heroic Architectural Linework (Thin Vector Accents in Periphery) */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.07] dark:opacity-[0.16]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Top-Right to Center-Right Drafting Guide Lines */}
            <line x1="85%" y1="0%" x2="100%" y2="45%" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 8" strokeOpacity="0.5" />
            <line x1="70%" y1="0%" x2="95%" y2="70%" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="85%" cy="30%" r="3" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
            <circle cx="85%" cy="30%" r="1" fill="currentColor" opacity="0.6" />
            
            {/* Left Edge Drafting Guide Lines */}
            <line x1="0%" y1="20%" x2="18%" y2="55%" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="5%" y1="10%" x2="25%" y2="80%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 10" strokeOpacity="0.35" />
            <circle cx="18%" cy="55%" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
            <circle cx="18%" cy="55%" r="1" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. HOME FAMILY A: Architectural BIM Canvas (base / white / #080C14)
  // =========================================================================
  if (variant === "home-base") {
    return (
      <div 
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`} 
        aria-hidden="true"
      >
        {/* Soft Ambient Off-Canvas Edge Illumination */}
        <div 
          className="absolute -top-36 left-10 w-[550px] h-[400px] bg-gradient-to-br from-blue-500/[0.05] via-indigo-500/[0.02] to-transparent dark:from-blue-500/[0.10] dark:via-indigo-500/[0.04] dark:to-transparent rounded-full blur-[130px]" 
        />
        <div 
          className="absolute -bottom-36 right-10 w-[550px] h-[400px] bg-gradient-to-tl from-sky-500/[0.04] via-blue-500/[0.015] to-transparent dark:from-sky-400/[0.09] dark:via-blue-500/[0.03] dark:to-transparent rounded-full blur-[130px]" 
        />

        {/* Architectural Drafting Geometry (Orthogonal Grid, Guide Dashes & Tick Marks) */}
        <div 
          className="absolute inset-0 text-slate-800 dark:text-slate-200"
          style={{
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 35%, transparent 92%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 35%, transparent 92%)",
          }}
        >
          <svg className="w-full h-full opacity-[0.05] dark:opacity-[0.11]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-arch-base-pat`} width="112" height="112" patternUnits="userSpaceOnUse">
                {/* Thin Orthogonal Drafting Lines */}
                <line x1="0" y1="56" x2="112" y2="56" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
                <line x1="56" y1="0" x2="56" y2="112" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
                
                {/* Faint Intermediate Subdivisions */}
                <line x1="0" y1="0" x2="112" y2="0" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 12" strokeOpacity="0.25" />
                <line x1="0" y1="112" x2="112" y2="112" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 12" strokeOpacity="0.25" />
                
                {/* Architectural Intersection Markers / Dimension Crosshairs */}
                <path d="M 53 56 L 59 56 M 56 53 L 56 59" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
                
                {/* Subtle Discrete Node Dots */}
                <circle cx="56" cy="56" r="1.5" fill="currentColor" opacity="0.5" />
                <circle cx="0" cy="0" r="1" fill="currentColor" opacity="0.3" />
                <circle cx="112" cy="0" r="1" fill="currentColor" opacity="0.3" />
                <circle cx="0" cy="112" r="1" fill="currentColor" opacity="0.3" />
                <circle cx="112" cy="112" r="1" fill="currentColor" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${baseId}-arch-base-pat)`} />
          </svg>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. HOME FAMILY B: Digital Intelligence Canvas (surface / #F1F5F9 / #0F172A)
  // =========================================================================
  if (variant === "home-surface") {
    return (
      <div 
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`} 
        aria-hidden="true"
      >
        {/* Soft Ambient Edge Glow Sources */}
        <div 
          className="absolute -top-32 right-16 w-[600px] h-[450px] bg-gradient-to-bl from-blue-600/[0.05] via-sky-500/[0.025] to-transparent dark:from-blue-500/[0.11] dark:via-sky-400/[0.04] dark:to-transparent rounded-full blur-[135px]" 
        />
        <div 
          className="absolute -bottom-32 left-16 w-[550px] h-[400px] bg-gradient-to-tr from-cyan-600/[0.04] via-blue-600/[0.02] to-transparent dark:from-cyan-500/[0.08] dark:via-blue-600/[0.03] dark:to-transparent rounded-full blur-[135px]" 
        />

        {/* Digital Intelligence Dot Matrix & Node Geometry */}
        <div 
          className="absolute inset-0 text-slate-800 dark:text-blue-200"
          style={{
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 35%, transparent 92%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 35%, transparent 92%)",
          }}
        >
          <svg className="w-full h-full opacity-[0.06] dark:opacity-[0.13]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-digi-surface-pat`} width="56" height="56" patternUnits="userSpaceOnUse">
                {/* Micro Technical Dot Matrix */}
                <circle cx="28" cy="28" r="1" fill="currentColor" opacity="0.45" />
                <circle cx="0" cy="0" r="0.75" fill="currentColor" opacity="0.25" />
                <circle cx="56" cy="0" r="0.75" fill="currentColor" opacity="0.25" />
                <circle cx="0" cy="56" r="0.75" fill="currentColor" opacity="0.25" />
                <circle cx="56" cy="56" r="0.75" fill="currentColor" opacity="0.25" />

                {/* Subtle Geometric Node Connecting Links */}
                <path d="M 0 28 L 12 28 M 44 28 L 56 28 M 28 0 L 28 12 M 28 44 L 28 56" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.25" />
                <circle cx="28" cy="28" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${baseId}-digi-surface-pat)`} />
          </svg>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. LEGACY SURFACE: Backward-compatible rendering for other pages
  // =========================================================================
  if (variant === "surface") {
    return (
      <div 
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`} 
        aria-hidden="true"
      >
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[400px] bg-gradient-to-b from-brand-primary/[0.04] via-sky-500/[0.02] to-transparent dark:from-brand-primary/[0.09] dark:via-sky-500/[0.03] dark:to-transparent rounded-full blur-[110px]" 
        />
        <div 
          className="absolute inset-0 text-slate-800 dark:text-blue-200"
          style={{
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 80%)",
          }}
        >
          <svg className="w-full h-full opacity-[0.035] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-eng-surface-pat`} width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="0" cy="0" r="1" fill="currentColor" opacity="0.5" />
                <circle cx="64" cy="64" r="1" fill="currentColor" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${baseId}-eng-surface-pat)`} />
          </svg>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. LEGACY BASE: Backward-compatible rendering for other pages
  // =========================================================================
  return (
    <div 
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`} 
      aria-hidden="true"
    >
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-b from-blue-500/[0.035] via-cyan-500/[0.015] to-transparent dark:from-blue-500/[0.07] dark:via-cyan-500/[0.025] dark:to-transparent rounded-full blur-[120px]" 
      />
      <div 
        className="absolute inset-0 text-slate-700 dark:text-slate-300"
        style={{
          maskImage: "radial-gradient(ellipse 80% 65% at 50% 40%, black 25%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 40%, black 25%, transparent 85%)",
        }}
      >
        <svg className="w-full h-full opacity-[0.025] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`${baseId}-eng-base-pat`} width="128" height="128" patternUnits="userSpaceOnUse">
              <path d="M 0 64 L 128 64 M 64 0 L 64 128" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
              <circle cx="64" cy="64" r="1.5" fill="currentColor" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${baseId}-eng-base-pat)`} />
        </svg>
      </div>
    </div>
  );
}
