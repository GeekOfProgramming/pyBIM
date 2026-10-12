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
          className="absolute -top-32 -right-32 w-[740px] h-[640px] bg-gradient-to-bl from-blue-500/[0.16] via-sky-400/[0.08] to-transparent dark:from-blue-500/[0.18] dark:via-sky-400/[0.08] dark:to-transparent rounded-full blur-[125px]" 
        />
        {/* Secondary Upper-Left off-canvas indigo/blue illumination */}
        <div 
          className="absolute -top-24 -left-24 w-[640px] h-[540px] bg-gradient-to-br from-indigo-500/[0.12] via-blue-500/[0.06] to-transparent dark:from-indigo-500/[0.13] dark:via-blue-500/[0.06] dark:to-transparent rounded-full blur-[120px]" 
        />
        {/* Subtle Lower-Right edge cyan illumination */}
        <div 
          className="absolute -bottom-36 right-1/4 w-[560px] h-[480px] bg-gradient-to-tl from-cyan-400/[0.10] via-blue-400/[0.04] to-transparent dark:from-cyan-400/[0.10] dark:via-blue-500/[0.04] dark:to-transparent rounded-full blur-[120px]" 
        />

        {/* Content Protection & Vignette Mask (Layer 5): Protects central headline, copy & primary CTAs */}
        <div 
          className="absolute inset-0 text-slate-800 dark:text-blue-100"
          style={{
            maskImage: "radial-gradient(ellipse 96% 88% at 48% 36%, black 40%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse 96% 88% at 48% 36%, black 40%, transparent 95%)",
          }}
        >
          {/* Layer 2: Architectural Reference Grid & Dimension Coordinate Pattern */}
          <svg className="w-full h-full opacity-[0.20] dark:opacity-[0.16]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-hero-grid`} width="96" height="96" patternUnits="userSpaceOnUse">
                {/* Major Orthogonal Reference Lines */}
                <path d="M 96 0 L 0 0 0 96" fill="none" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.65" />
                {/* Secondary Drafting Subdivisions */}
                <path d="M 0 48 L 96 48 M 48 0 L 48 96" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 9" strokeOpacity="0.45" />
                {/* Architectural Dimension Tick Crosshairs at Intersections */}
                <path d="M 44 48 L 52 48 M 48 44 L 48 52" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.75" />
                {/* Structural Node Dots */}
                <circle cx="0" cy="0" r="1.6" fill="currentColor" opacity="0.85" />
                <circle cx="96" cy="0" r="1.6" fill="currentColor" opacity="0.85" />
                <circle cx="0" cy="96" r="1.6" fill="currentColor" opacity="0.85" />
                <circle cx="96" cy="96" r="1.6" fill="currentColor" opacity="0.85" />
                {/* Digital Node Center Coordinate */}
                <circle cx="48" cy="48" r="1.2" fill="currentColor" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${baseId}-hero-grid)`} />
          </svg>

          {/* Layer 2 & 3: Heroic Deterministic Architectural Linework & Digital Intelligence Composition */}
          {/* ViewBox coordinate system 1440x800 for architectural scale fidelity and crisp vector placement */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-[0.26] dark:opacity-[0.22]" 
            viewBox="0 0 1440 800" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* --- ARCHITECTURAL STRUCTURAL GRID EXTENSIONS (REPLACE GENERIC EDGES) --- */}
            {/* Top Structural Axis Guide with Grid Callout Bubble */}
            <line x1="920" y1="20" x2="1420" y2="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 8" strokeOpacity="0.65" />
            <circle cx="920" cy="20" r="12" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.75" fill="none" />
            <text x="920" y="24" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.85">A1</text>

            <line x1="1080" y1="20" x2="1080" y2="780" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 12" strokeOpacity="0.4" />
            <circle cx="1080" cy="20" r="12" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.75" fill="none" />
            <text x="1080" y="24" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.85">B2</text>

            <line x1="1340" y1="20" x2="1340" y2="780" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 12" strokeOpacity="0.4" />
            <circle cx="1340" cy="20" r="12" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.75" fill="none" />
            <text x="1340" y="24" textAnchor="middle" fill="currentColor" fontSize="9" fontFamily="monospace" fontWeight="600" opacity="0.85">C3</text>

            {/* --- RESTRAINT FRAME & BACKPLATE GEOMETRY FRAMING SCHEMATIC CARD (Right Column) --- */}
            {/* Structural corner datum framing the top-right of the schematic card */}
            <path d="M 860 120 L 860 84 L 896 84" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
            <path d="M 1390 84 L 1426 84 L 1426 120" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
            <path d="M 1426 620 L 1426 656 L 1390 656" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
            <path d="M 896 656 L 860 656 L 860 620" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />

            {/* Precision Dimension Extension & Tick String behind schematic */}
            <line x1="860" y1="72" x2="1426" y2="72" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />
            <path d="M 856 76 L 864 68 M 1422 76 L 1430 68" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8" />
            <path d="M 1080 76 L 1080 68 M 1340 76 L 1340 68" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.6" />

            {/* --- PARAMETRIC DRAFTING GUIDE ARCS & CURVATURE FRAGMENTS --- */}
            {/* Tangent guide arc sweeping through upper-right technical periphery */}
            <path d="M 1440 180 A 420 420 0 0 0 980 40" stroke="currentColor" strokeWidth="0.85" strokeDasharray="5 7" strokeOpacity="0.55" />
            <path d="M 1440 260 A 540 540 0 0 0 880 30" stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.4" />
            {/* Dimension radius center anchor */}
            <circle cx="1440" cy="600" r="3" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" />
            <line x1="1440" y1="600" x2="1140" y2="460" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 8" strokeOpacity="0.4" />

            {/* --- DIGITAL INTELLIGENCE LAYER: NETWORK NODES & COMPUTATIONAL TRACES --- */}
            {/* Trace 1: Diagonal telemetry lead connecting architectural grid into automation node */}
            <polyline points="840,460 920,460 980,520 1120,520" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.65" />
            <circle cx="840" cy="460" r="2.5" fill="currentColor" opacity="0.8" />
            <circle cx="980" cy="520" r="3.5" stroke="currentColor" strokeWidth="0.8" fill="none" strokeOpacity="0.7" />
            <circle cx="980" cy="520" r="1.5" fill="currentColor" opacity="0.85" />
            <circle cx="1120" cy="520" r="2.5" fill="currentColor" opacity="0.8" />

            {/* Trace 2: Upper network interconnect with micro-matrix */}
            <polyline points="1020,110 1060,150 1140,150" stroke="currentColor" strokeWidth="0.7" strokeDasharray="4 6" strokeOpacity="0.5" />
            <circle cx="1020" cy="110" r="2" fill="currentColor" opacity="0.7" />
            <circle cx="1140" cy="150" r="2" fill="currentColor" opacity="0.7" />

            {/* Trace 3: Precision computational node cluster in upper periphery */}
            <circle cx="1300" cy="120" r="4" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.7" fill="none" />
            <circle cx="1300" cy="120" r="1.5" fill="currentColor" opacity="0.8" />
            <line x1="1300" y1="124" x2="1300" y2="160" stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.5" />
            <circle cx="1300" cy="160" r="2" fill="currentColor" opacity="0.6" />

            {/* --- LEFT FLANK ARCHITECTURAL ELEVATION & DATUM GUIDES (Framing Title Copy) --- */}
            {/* Vertical Elevation Datum Bar on extreme left */}
            <line x1="36" y1="140" x2="36" y2="680" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.55" />
            {/* Level datum markers */}
            <path d="M 36 220 L 64 220 M 36 214 L 46 220 L 36 226" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.7" fill="none" />
            <text x="70" y="223" fill="currentColor" fontSize="8.5" fontFamily="monospace" fontWeight="600" opacity="0.75">LVL 03 +7.20</text>

            <path d="M 36 420 L 64 420 M 36 414 L 46 420 L 36 426" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.7" fill="none" />
            <text x="70" y="423" fill="currentColor" fontSize="8.5" fontFamily="monospace" fontWeight="600" opacity="0.75">LVL 02 +3.60</text>

            <path d="M 36 620 L 64 620 M 36 614 L 46 620 L 36 626" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.7" fill="none" />
            <text x="70" y="623" fill="currentColor" fontSize="8.5" fontFamily="monospace" fontWeight="600" opacity="0.75">LVL 01 +0.00</text>

            {/* Sparse Angular Guide Line cutting across lower left */}
            <line x1="20" y1="720" x2="260" y2="640" stroke="currentColor" strokeWidth="0.65" strokeDasharray="5 9" strokeOpacity="0.45" />
            <circle cx="260" cy="640" r="2" fill="currentColor" opacity="0.6" />

            {/* Bottom Horizon Reference Axis */}
            <line x1="80" y1="760" x2="680" y2="760" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 14" strokeOpacity="0.35" />
            <line x1="860" y1="760" x2="1400" y2="760" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 14" strokeOpacity="0.35" />
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
