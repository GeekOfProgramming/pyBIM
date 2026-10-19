"use client";

import { useId } from "react";

/**
 * LegalPageShell
 *
 * Reusable visual presentation wrapper for pyBIM legal and technical policy pages:
 * - Privacy Policy (/privacy-policy)
 * - Cookie Policy (/cookie-policy)
 * - Terms & Conditions (/terms-and-conditions)
 * - Enterprise Security (/security)
 *
 * Implements:
 * - Subtle engineering coordinate backdrop in hero zone
 * - Controlled reading column (default ~900-960px max-w-4xl, or custom e.g. max-w-6xl for Security)
 * - Standardized typography hierarchy (Inter + JetBrains Mono)
 * - Clean section framing and seamless transition to site footer
 * - Seamless Light and Dark mode behavior using brand semantic tokens
 */
export default function LegalPageShell({
  children,
  maxWidthClass = "max-w-4xl",
  className = "",
}) {
  const gridId = useId();

  return (
    <div className={`relative w-full bg-brand-base min-h-[75vh] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border transition-colors ${className}`}>
      {/* Subtle CAD / Architectural Grid Backdrop in the Hero Region */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        {/* Soft Ambient Off-Canvas Light Tint */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[360px] bg-gradient-to-b from-blue-500/[0.07] dark:from-blue-500/[0.12] via-sky-400/[0.03] to-transparent rounded-full blur-[110px]"
        />

        {/* CAD Drafting Coordinate Grid with Radial Vignette */}
        <div
          className="absolute inset-0 text-slate-400 dark:text-slate-500"
          style={{
            maskImage: "radial-gradient(ellipse 85% 70% at 50% 25%, black 20%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 70% at 50% 25%, black 20%, transparent 85%)",
          }}
        >
          <svg className="w-full h-full opacity-[0.16] dark:opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={gridId} width="64" height="64" patternUnits="userSpaceOnUse">
                {/* Major lines */}
                <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5" />
                {/* Secondary guide tick */}
                <path d="M 30 32 L 34 32 M 32 30 L 32 34" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.6" />
                {/* Intersection coordinate dots */}
                <circle cx="0" cy="0" r="1.1" fill="currentColor" opacity="0.6" />
                <circle cx="64" cy="0" r="1.1" fill="currentColor" opacity="0.6" />
                <circle cx="0" cy="64" r="1.1" fill="currentColor" opacity="0.6" />
                <circle cx="64" cy="64" r="1.1" fill="currentColor" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${gridId})`} />
          </svg>
        </div>
      </div>

      {/* Main Content Column */}
      <div className={`relative z-10 mx-auto ${maxWidthClass} space-y-8 sm:space-y-10`}>
        {children}
      </div>
    </div>
  );
}
