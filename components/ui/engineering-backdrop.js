"use client";

import { useId } from "react";

/**
 * EngineeringBackdrop
 * 
 * Design System v2 — Engineering Precision Background Architecture
 * BG-02 Refinement: Enhanced Light Mode Visibility & Contrast Tuning
 * 
 * Supports:
 * 1. variant="home-hero" (Parametric BIM × Digital Intelligence — Custom Hero)
 *    - Architectural coordinate framework, sparse parametric guidance lines,
 *      and soft off-canvas ambient blue lighting tuned for both Light and Dark themes.
 * 
 * 2. variant="home-base" (Family A — Architectural BIM Canvas for Home)
 *    - Orthogonal drafting geometry, Revit-inspired construction lines, dimension ticks,
 *      clean drawing-paper aesthetic, and soft diffuse ambient lighting.
 * 
 * 3. variant="home-surface" (Family B — Digital Intelligence Canvas for Home)
 *    - Distinct technical dot matrix, micro-nodes, and network connection vectors,
 *      imparting a digital intelligence / computational feel.
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
        {/* Layer 4: Ambient Off-Canvas Edge Lighting Sources */}
        {/* Primary Upper-Right off-canvas cool blue illumination */}
        <div 
          className="absolute -top-36 -right-36 w-[700px] h-[600px] bg-gradient-to-bl from-blue-500/[0.12] via-sky-400/[0.05] to-transparent dark:from-blue-500/[0.14] dark:via-sky-400/[0.06] dark:to-transparent rounded-full blur-[130px]" 
        />
        {/* Subtle Upper-Left edge illumination */}
        <div 
          className="absolute -top-28 -left-28 w-[620px] h-[520px] bg-gradient-to-br from-indigo-500/[0.09] via-blue-500/[0.04] to-transparent dark:from-indigo-500/[0.10] dark:via-blue-500/[0.04] dark:to-transparent rounded-full blur-[125px]" 
        />
        {/* Bottom edge ambient illumination entry */}
        <div 
          className="absolute -bottom-40 right-1/4 w-[540px] h-[460px] bg-gradient-to-tl from-cyan-400/[0.07] via-blue-400/[0.03] to-transparent dark:from-cyan-400/[0.08] dark:via-blue-500/[0.03] dark:to-transparent rounded-full blur-[120px]" 
        />

        {/* Content Protection Mask (Layer 5): Protects central headline, description, and primary CTAs */}
        <div 
          className="absolute inset-0 text-slate-700 dark:text-blue-100"
          style={{
            maskImage: "radial-gradient(ellipse 94% 84% at 50% 38%, black 44%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse 94% 84% at 50% 38%, black 44%, transparent 95%)",
          }}
        >
          {/* Layer 2: Architectural Reference Grid & Dimension Coordinate Pattern */}
          <svg className="w-full h-full opacity-[0.14] dark:opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-hero-grid`} width="96" height="96" patternUnits="userSpaceOnUse">
                {/* Orthogonal Reference Grid */}
                <path d="M 96 0 L 0 0 0 96" fill="none" stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.55" />
                <path d="M 0 48 L 96 48 M 48 0 L 48 96" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 9" strokeOpacity="0.38" />
                {/* Architectural Dimension Tick Crosshairs at Intersections */}
                <path d="M 44 48 L 52 48 M 48 44 L 48 52" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
                {/* Structural Node Dots */}
                <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.75" />
                <circle cx="96" cy="0" r="1.5" fill="currentColor" opacity="0.75" />
                <circle cx="0" cy="96" r="1.5" fill="currentColor" opacity="0.75" />
                <circle cx="96" cy="96" r="1.5" fill="currentColor" opacity="0.75" />
                {/* Digital Node Center Coordinate */}
                <circle cx="48" cy="48" r="1" fill="currentColor" opacity="0.55" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${baseId}-hero-grid)`} />
          </svg>

          {/* Layer 2 & 3: Heroic Deterministic Architectural Linework & Digital Intelligence Elements */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.17] dark:opacity-[0.16]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Top-Right Architectural Drafting Guide Vectors Framing the Schematic Card */}
            <line x1="84%" y1="0%" x2="100%" y2="46%" stroke="currentColor" strokeWidth="0.85" strokeDasharray="4 8" strokeOpacity="0.65" />
            <line x1="72%" y1="0%" x2="96%" y2="68%" stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.5" />
            
            {/* Sparse Drafting Arc / Radius Guide Fragment in Upper Periphery */}
            <path d="M 880 0 A 280 280 0 0 0 600 280" fill="none" stroke="currentColor" strokeWidth="0.65" strokeDasharray="3 7" strokeOpacity="0.4" />
            <circle cx="85%" cy="30%" r="4" fill="none" stroke="currentColor" strokeWidth="0.85" opacity="0.7" />
            <circle cx="85%" cy="30%" r="1.5" fill="currentColor" opacity="0.75" />
            
            {/* Left Edge Architectural Datum Line & Elevation Lead Fragment */}
            <line x1="0%" y1="22%" x2="18%" y2="54%" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.5" />
            <line x1="4%" y1="12%" x2="24%" y2="80%" stroke="currentColor" strokeWidth="0.65" strokeDasharray="6 10" strokeOpacity="0.45" />
            <circle cx="18%" cy="54%" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.85" opacity="0.65" />
            <circle cx="18%" cy="54%" r="1.5" fill="currentColor" opacity="0.7" />

            {/* Subtle Horizon Level Datum Line across Lower Viewport Edge */}
            <line x1="12%" y1="88%" x2="48%" y2="88%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 12" strokeOpacity="0.35" />
            <line x1="75%" y1="92%" x2="98%" y2="92%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 12" strokeOpacity="0.35" />
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
          className="absolute -top-36 left-8 w-[580px] h-[420px] bg-gradient-to-br from-blue-500/[0.09] via-indigo-500/[0.04] to-transparent dark:from-blue-500/[0.10] dark:via-indigo-500/[0.04] dark:to-transparent rounded-full blur-[130px]" 
        />
        <div 
          className="absolute -bottom-36 right-8 w-[580px] h-[420px] bg-gradient-to-tl from-sky-400/[0.08] via-blue-400/[0.03] to-transparent dark:from-sky-400/[0.09] dark:via-blue-500/[0.03] dark:to-transparent rounded-full blur-[130px]" 
        />

        {/* Architectural Drafting Geometry (Orthogonal Grid, Guide Dashes & Tick Marks) */}
        <div 
          className="absolute inset-0 text-slate-700 dark:text-slate-200"
          style={{
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 40%, transparent 94%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 40%, transparent 94%)",
          }}
        >
          <svg className="w-full h-full opacity-[0.13] dark:opacity-[0.11]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-arch-base-pat`} width="112" height="112" patternUnits="userSpaceOnUse">
                {/* Thin Orthogonal Drafting Lines */}
                <line x1="0" y1="56" x2="112" y2="56" stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.5" />
                <line x1="56" y1="0" x2="56" y2="112" stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.5" />
                
                {/* Faint Intermediate Subdivisions */}
                <line x1="0" y1="0" x2="112" y2="0" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 11" strokeOpacity="0.35" />
                <line x1="0" y1="112" x2="112" y2="112" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 11" strokeOpacity="0.35" />
                
                {/* Architectural Intersection Markers / Dimension Crosshairs */}
                <path d="M 52 56 L 60 56 M 56 52 L 56 60" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.75" />
                
                {/* Subtle Discrete Node Dots */}
                <circle cx="56" cy="56" r="1.5" fill="currentColor" opacity="0.65" />
                <circle cx="0" cy="0" r="1.2" fill="currentColor" opacity="0.45" />
                <circle cx="112" cy="0" r="1.2" fill="currentColor" opacity="0.45" />
                <circle cx="0" cy="112" r="1.2" fill="currentColor" opacity="0.45" />
                <circle cx="112" cy="112" r="1.2" fill="currentColor" opacity="0.45" />
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
        {/* Ambient Edge Glow Sources */}
        <div 
          className="absolute -top-32 right-12 w-[620px] h-[460px] bg-gradient-to-bl from-blue-500/[0.10] via-sky-400/[0.05] to-transparent dark:from-blue-500/[0.11] dark:via-sky-400/[0.04] dark:to-transparent rounded-full blur-[130px]" 
        />
        <div 
          className="absolute -bottom-32 left-12 w-[560px] h-[420px] bg-gradient-to-tr from-cyan-500/[0.08] via-blue-500/[0.04] to-transparent dark:from-cyan-500/[0.08] dark:via-blue-600/[0.03] dark:to-transparent rounded-full blur-[130px]" 
        />

        {/* Digital Intelligence Dot Matrix & Node Geometry */}
        <div 
          className="absolute inset-0 text-slate-700 dark:text-blue-200"
          style={{
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 94%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 94%)",
          }}
        >
          <svg className="w-full h-full opacity-[0.14] dark:opacity-[0.13]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-digi-surface-pat`} width="56" height="56" patternUnits="userSpaceOnUse">
                {/* Micro Technical Dot Matrix */}
                <circle cx="28" cy="28" r="1.3" fill="currentColor" opacity="0.65" />
                <circle cx="0" cy="0" r="0.9" fill="currentColor" opacity="0.4" />
                <circle cx="56" cy="0" r="0.9" fill="currentColor" opacity="0.4" />
                <circle cx="0" cy="56" r="0.9" fill="currentColor" opacity="0.4" />
                <circle cx="56" cy="56" r="0.9" fill="currentColor" opacity="0.4" />

                {/* Subtle Geometric Node Connecting Links */}
                <path d="M 0 28 L 12 28 M 44 28 L 56 28 M 28 0 L 28 12 M 28 44 L 28 56" stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.45" />
                <circle cx="28" cy="28" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
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
