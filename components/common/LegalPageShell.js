"use client";

import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

/**
 * LegalPageShell
 *
 * Reusable visual presentation wrapper for pyBIM legal and technical policy pages:
 * - Privacy Policy (/privacy-policy)
 * - Cookie Policy (/cookie-policy)
 * - Terms & Conditions (/terms-and-conditions)
 * - Enterprise Security (/security)
 *
 * Architecture:
 * - Reuses pyBIM's approved EngineeringBackdrop (variant="base")
 * - Controlled reading column (default ~900-960px max-w-4xl, or max-w-6xl for Enterprise Security)
 * - Standardized typography hierarchy (Inter + JetBrains Mono)
 * - Clean section framing and seamless transition to site footer
 * - Seamless Light and Dark mode behavior using brand semantic tokens
 */
export default function LegalPageShell({
  children,
  maxWidthClass = "max-w-4xl",
  className = "",
  backdropVariant = "base",
}) {
  return (
    <div className={`relative w-full bg-brand-base min-h-[75vh] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-border overflow-hidden transition-colors ${className}`}>
      {/* Approved Existing Website EngineeringBackdrop */}
      <EngineeringBackdrop variant={backdropVariant} />

      {/* Main Content Column */}
      <div className={`relative z-10 mx-auto ${maxWidthClass} space-y-8 sm:space-y-10`}>
        {children}
      </div>
    </div>
  );
}
