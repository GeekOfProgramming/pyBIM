"use client";

import { useId } from "react";

/**
 * EngineeringBackdrop
 * 
 * Design System v2 — Engineering Precision
 * Unified Section Rhythm System providing exactly TWO coordinated background families:
 * 
 * 1. variant="base" (Family A — Base / Architectural)
 *    - Semantic token: bg-brand-base (#FFFFFF light / #080C14 dark)
 *    - Sections: Services S01 (Hero), S03 (Early Access), S05 (Delivery Process), Education Hero, Success Stories Hero & AI/LLM.
 *    - Visual motif: Clean architectural space, faint structural drafting linework in negative space, soft ambient illumination.
 *    - Zero decorative dashed container boundary lines. Zero fake coordinates.
 * 
 * 2. variant="surface" (Family B — Surface / Technical)
 *    - Semantic token: bg-brand-surface (#F1F5F9 light / #0F172A dark)
 *    - Sections: Services S02 (Roadmap), S04 (Capabilities), S06 (Outcomes), Success Stories Completed Projects & Testimonials.
 *    - Visual motif: Technical-paper atmosphere, quiet non-repeating drafting geometry, restrained ambient surface glow.
 *    - Zero dense repeating crosshairs. Zero content-bounding boxes.
 */
export default function EngineeringBackdrop({ variant = "base", className = "" }) {
  const baseId = useId();

  if (variant === "surface") {
    return (
      <div 
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`} 
        aria-hidden="true"
      >
        {/* Controlled Ambient Surface Lighting */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[400px] bg-gradient-to-b from-brand-primary/[0.04] via-sky-500/[0.02] to-transparent dark:from-brand-primary/[0.09] dark:via-sky-500/[0.03] dark:to-transparent rounded-full blur-[110px]" 
        />

        {/* Quiet Engineering Drafting Pattern (Radial masked technical line segments) */}
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

  // Family A — Base (Default)
  return (
    <div 
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`} 
      aria-hidden="true"
    >
      {/* Soft Controlled Ambient Illumination */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-b from-blue-500/[0.035] via-cyan-500/[0.015] to-transparent dark:from-blue-500/[0.07] dark:via-cyan-500/[0.025] dark:to-transparent rounded-full blur-[120px]" 
      />

      {/* Very Faint Architectural Drafting Geometry in Negative Space */}
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
