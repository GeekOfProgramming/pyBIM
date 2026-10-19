"use client";

import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

/**
 * LegalPageSection
 *
 * Full-width section component that implements pyBIM's approved A/B background architecture:
 * - family="a": bg-brand-base with EngineeringBackdrop variant="base"
 * - family="b": bg-brand-surface with EngineeringBackdrop variant="surface"
 *
 * Provides:
 * - Full-width background container with overflow-hidden
 * - Reusable EngineeringBackdrop positioned behind the content
 * - Relative z-10 inner container constrained to the requested reading column (default: max-w-4xl)
 * - Clear responsive vertical padding and bottom border
 */
export function LegalPageSection({
  family = "a",
  maxWidthClass = "max-w-4xl",
  className = "",
  children,
  id,
  as: Component = "section",
  ...props
}) {
  const isFamilyA = family === "a";
  const bgClass = isFamilyA ? "bg-brand-base" : "bg-brand-surface";
  const backdropVariant = isFamilyA ? "base" : "surface";

  return (
    <Component
      id={id}
      className={`relative w-full ${bgClass} border-b border-brand-border py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors ${className}`}
      {...props}
    >
      {/* Background Architectural Canvas: Family A (base) or Family B (surface) */}
      <EngineeringBackdrop variant={backdropVariant} />

      {/* Foreground Content Container */}
      <div className={`relative z-10 mx-auto ${maxWidthClass}`}>
        {children}
      </div>
    </Component>
  );
}

/**
 * LegalPageShell
 *
 * Semantic wrapper for pyBIM legal and security pages ensuring proper document flow.
 */
export default function LegalPageShell({ children, className = "" }) {
  return (
    <div className={`w-full overflow-hidden transition-colors ${className}`}>
      {children}
    </div>
  );
}
