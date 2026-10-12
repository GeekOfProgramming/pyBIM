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
  // 2. SERVICES HERO: Engineering Signal Flow Composition
  // =========================================================================
  if (variant === "services-hero") {
    return (
      <div 
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`} 
        aria-hidden="true"
      >
        {/* Layer 4: Ambient Off-Canvas Edge Lighting Sources */}
        {/* Primary Upper-Right off-canvas cool blue illumination */}
        <div 
          className="absolute -top-32 -right-32 w-[720px] h-[620px] bg-gradient-to-bl from-blue-500/[0.15] via-sky-400/[0.07] to-transparent dark:from-blue-500/[0.17] dark:via-sky-400/[0.07] dark:to-transparent rounded-full blur-[125px]" 
        />
        {/* Secondary Upper-Left off-canvas indigo/blue illumination */}
        <div 
          className="absolute -top-24 -left-24 w-[620px] h-[520px] bg-gradient-to-br from-indigo-500/[0.11] via-blue-500/[0.05] to-transparent dark:from-indigo-500/[0.12] dark:via-blue-500/[0.05] dark:to-transparent rounded-full blur-[120px]" 
        />
        {/* Subtle Lower-Right edge cyan illumination */}
        <div 
          className="absolute -bottom-36 right-1/4 w-[540px] h-[460px] bg-gradient-to-tl from-cyan-400/[0.09] via-blue-400/[0.04] to-transparent dark:from-cyan-400/[0.10] dark:via-blue-500/[0.04] dark:to-transparent rounded-full blur-[120px]" 
        />

        {/* Content Protection & Vignette Mask: Protects central headline, copy & primary CTAs */}
        <div 
          className="absolute inset-0 text-slate-800 dark:text-cyan-100"
          style={{
            maskImage: "radial-gradient(ellipse 96% 88% at 48% 36%, black 40%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse 96% 88% at 48% 36%, black 40%, transparent 95%)",
          }}
        >
          {/* Layer 2: Architectural Reference Grid & Dimension Coordinate Pattern (Family A base) */}
          <svg className="w-full h-full opacity-[0.16] dark:opacity-[0.14]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-services-hero-grid`} width="96" height="96" patternUnits="userSpaceOnUse">
                {/* Major Orthogonal Reference Lines */}
                <path d="M 96 0 L 0 0 0 96" fill="none" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.6" />
                {/* Secondary Drafting Subdivisions */}
                <path d="M 0 48 L 96 48 M 48 0 L 48 96" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 9" strokeOpacity="0.4" />
                {/* Intersection Crosshairs */}
                <path d="M 44 48 L 52 48 M 48 44 L 48 52" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7" />
                {/* Structural Node Dots */}
                <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="96" cy="0" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="0" cy="96" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="96" cy="96" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="48" cy="48" r="1.1" fill="currentColor" opacity="0.55" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${baseId}-services-hero-grid)`} />
          </svg>

          {/* Layer 2 & 3: Engineering Signal Flow Paths & Workflow Coordination Geometry */}
          {/* ViewBox coordinate system 1440x800 for precision routing and framing */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-[0.24] dark:opacity-[0.20]" 
            viewBox="0 0 1440 800" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* --- SIGNAL PATH ROUTE 1: PRIMARY TOP-RIGHT PIPELINE BUS (Framing right technical panel) --- */}
            {/* Stepped 90-degree orthogonal bus line */}
            <polyline 
              points="820,50 820,110 870,110 870,70 1420,70" 
              stroke="currentColor" 
              strokeWidth="0.85" 
              strokeOpacity="0.65" 
            />
            {/* Bus Branch Drop into Right Schematic Container */}
            <line x1="870" y1="110" x2="870" y2="660" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 8" strokeOpacity="0.5" />
            <line x1="1410" y1="70" x2="1410" y2="660" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 8" strokeOpacity="0.5" />
            
            {/* Channel Route Indicators & Node Taps */}
            <circle cx="820" cy="50" r="3" fill="currentColor" opacity="0.85" />
            <circle cx="870" cy="110" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
            <circle cx="1060" cy="70" r="2.5" fill="currentColor" opacity="0.8" />
            <circle cx="1240" cy="70" r="2.5" fill="currentColor" opacity="0.8" />
            <circle cx="1410" cy="70" r="3" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />

            {/* --- SIGNAL PATH ROUTE 2: TRANS-PIPELINE STEPPED INTERCONNECTS --- */}
            {/* Horizontal data rail leading across upper-right periphery */}
            <line x1="900" y1="150" x2="1380" y2="150" stroke="currentColor" strokeWidth="0.65" strokeDasharray="4 10" strokeOpacity="0.45" />
            {/* 90-degree stepped signal tap */}
            <polyline 
              points="1020,150 1020,185 1160,185 1160,220" 
              stroke="currentColor" 
              strokeWidth="0.75" 
              strokeOpacity="0.6" 
            />
            <circle cx="1020" cy="150" r="2" fill="currentColor" opacity="0.75" />
            <circle cx="1160" cy="185" r="2" fill="currentColor" opacity="0.75" />
            <circle cx="1160" cy="220" r="2" fill="currentColor" opacity="0.75" />

            {/* Signal Flow Branch 3: Lower-Right Handover Route */}
            <polyline 
              points="870,660 870,695 1200,695 1200,735 1420,735" 
              stroke="currentColor" 
              strokeWidth="0.85" 
              strokeOpacity="0.65" 
            />
            <circle cx="870" cy="660" r="3" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
            <circle cx="1200" cy="695" r="2.5" fill="currentColor" opacity="0.8" />
            <circle cx="1420" cy="735" r="3" fill="currentColor" opacity="0.85" />

            {/* --- ENGINEERING DRAFTING COORDINATE LABELS & CALIBRATION TICKS --- */}
            {/* Signal Bus Labels along top rail */}
            <text x="890" y="64" fill="currentColor" fontSize="8.5" fontFamily="monospace" fontWeight="600" opacity="0.75">CH_01 // INGEST</text>
            <text x="1080" y="64" fill="currentColor" fontSize="8.5" fontFamily="monospace" fontWeight="600" opacity="0.75">CH_02 // VALIDATE</text>
            <text x="1260" y="64" fill="currentColor" fontSize="8.5" fontFamily="monospace" fontWeight="600" opacity="0.75">CH_03 // EXECUTE</text>

            {/* Corner Alignment Ticks framing the Workflow Ledger */}
            <path d="M 855 95 L 855 80 L 870 80" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
            <path d="M 1410 80 L 1425 80 L 1425 95" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
            <path d="M 1425 645 L 1425 660 L 1410 660" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
            <path d="M 870 660 L 855 660 L 855 645" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />

            {/* --- LEFT FLANK ORTHOGONAL FEED ROUTING (Framing primary headline copy) --- */}
            {/* Vertical Signal Spine on far left */}
            <line x1="38" y1="120" x2="38" y2="700" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.55" />
            {/* Orthogonal branches tapping into editorial hierarchy */}
            <polyline points="38,200 78,200 78,235" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.65" />
            <circle cx="38" cy="200" r="2.5" fill="currentColor" opacity="0.8" />
            <circle cx="78" cy="235" r="2" fill="currentColor" opacity="0.75" />
            <text x="86" y="204" fill="currentColor" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.75">FEED // .RVT</text>

            <polyline points="38,400 88,400 88,435" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.65" />
            <circle cx="38" cy="400" r="2.5" fill="currentColor" opacity="0.8" />
            <circle cx="88" cy="435" r="2" fill="currentColor" opacity="0.75" />
            <text x="96" y="404" fill="currentColor" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.75">PROC // API</text>

            <polyline points="38,600 78,600 78,635" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.65" />
            <circle cx="38" cy="600" r="2.5" fill="currentColor" opacity="0.8" />
            <circle cx="78" cy="635" r="2" fill="currentColor" opacity="0.75" />
            <text x="86" y="604" fill="currentColor" fontSize="8" fontFamily="monospace" fontWeight="600" opacity="0.75">DISP // IFC4</text>

            {/* Diagonal Engineering Calibration Guide across bottom left */}
            <line x1="38" y1="720" x2="320" y2="720" stroke="currentColor" strokeWidth="0.6" strokeDasharray="5 11" strokeOpacity="0.4" />
            <circle cx="320" cy="720" r="2" fill="currentColor" opacity="0.6" />

            {/* --- DIGITAL TEXTURE: CLUSTERED NODE MATRICES IN PERIPHERY --- */}
            {/* Discrete 3x2 micro dot clusters near signal junctions */}
            {[0, 1].map((row) =>
              [0, 1, 2].map((col) => (
                <circle 
                  key={`dot-${row}-${col}`} 
                  cx={770 + col * 12} 
                  cy={130 + row * 12} 
                  r="1.2" 
                  fill="currentColor" 
                  opacity="0.6" 
                />
              ))
            )}
            {[0, 1].map((row) =>
              [0, 1, 2].map((col) => (
                <circle 
                  key={`dot-b-${row}-${col}`} 
                  cx={1340 + col * 12} 
                  cy={680 + row * 12} 
                  r="1.2" 
                  fill="currentColor" 
                  opacity="0.6" 
                />
              ))
            )}
          </svg>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. HOME FAMILY A: Architectural BIM Canvas (base / white / #080C14)
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
  // 4. FAMILY B (Surface / Digital Intelligence Canvas): Reusable across all pages
  // =========================================================================
  if (variant === "surface" || variant === "home-surface") {
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
  // 5. FAMILY A (Base / Architectural BIM Canvas): Reusable across all pages
  // =========================================================================
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
