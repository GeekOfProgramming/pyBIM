"use client";

import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

/**
 * ServicesSectionBackdrop
 * Re-exports the unified EngineeringBackdrop primitive for backward-compatibility.
 */
export default function ServicesSectionBackdrop({ variant = "base", className = "" }) {
  return <EngineeringBackdrop variant={variant} className={className} />;
}
