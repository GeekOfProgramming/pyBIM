"use client";

import { useId } from "react";

/**
 * ServicesSectionBackdrop
 * 
 * Unified Services Background System providing exactly TWO consistent visual families:
 * - variant="base"    (Family A: S01 Hero, S03 Early Access, S05 Delivery Process)
 *   Clean, white/near-black architectural drafting aesthetic with subtle negative space
 *   geometry and soft atmospheric illumination. Zero vertical dashed boundary lines.
 * 
 * - variant="surface" (Family B: S02 Roadmap, S04 Capabilities, S06 Outcomes)
 *   Soft-gray/navy technical-paper atmosphere with sparse, quiet engineering drafting
 *   texture and restrained depth. Zero dashed container framing lines.
 */
export default function ServicesSectionBackdrop({ variant = "base" }) {
  const baseId = useId();

  if (variant === "surface") {
    return (
      <div 
        className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0" 
        aria-hidden="true"
      >
        {/* Controlled Ambient Surface Lighting */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-brand-primary/[0.04] via-sky-500/[0.02] to-transparent dark:from-brand-primary/[0.09] dark:via-sky-500/[0.03] dark:to-transparent rounded-full blur-[110px]" 
        />

        {/* Quiet Engineering Drafting Pattern (Subtle radial mask, quiet line segments) */}
        <div 
          className="absolute inset-0 text-slate-800 dark:text-blue-200"
          style={{
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 80%)",
          }}
        >
          <svg className="w-full h-full opacity-[0.035] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`${baseId}-surface-pat`} width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="0" cy="0" r="1" fill="currentColor" opacity="0.5" />
                <circle cx="64" cy="64" r="1" fill="currentColor" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${baseId}-surface-pat)`} />
          </svg>
        </div>
      </div>
    );
  }

  // Family A — Base (Default)
  return (
    <div 
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0" 
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
            <pattern id={`${baseId}-base-pat`} width="128" height="128" patternUnits="userSpaceOnUse">
              <path d="M 0 64 L 128 64 M 64 0 L 64 128" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
              <circle cx="64" cy="64" r="1.5" fill="currentColor" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${baseId}-base-pat)`} />
        </svg>
      </div>
    </div>
  );
}
