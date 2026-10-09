"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight } from "lucide-react";

/**
 * Standardized CTA Link component for pyBIM.
 * Enforces unified heights (min-h-[48px] sm:min-h-[52px]), rounded-full geometry,
 * typography tokens, accessible focus states, and restrained micro-interactions.
 *
 * @param {string} href - Target route or anchor
 * @param {'primary' | 'secondary' | 'tertiary'} variant - Visual hierarchy style
 * @param {boolean} fullWidth - Whether to stretch 100% on container
 * @param {React.ReactNode} icon - Optional custom icon (defaults to ArrowRight for primary/secondary)
 * @param {boolean} hideIcon - Suppress the trailing icon
 * @param {Function} onClick - Optional click handler (e.g. for smooth scrolling)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Button label text
 */
export default function CtaLink({
  href,
  variant = "primary",
  fullWidth = false,
  icon,
  hideIcon = false,
  onClick,
  className = "",
  children,
  ...props
}) {
  const baseClasses =
    "group inline-flex items-center justify-center text-center font-semibold normal-case text-body-sm tracking-normal transition-all duration-200 rounded-full select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-actionPrimary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-brand-base disabled:opacity-50 disabled:pointer-events-none";

  const sizeClasses = "min-h-[48px] sm:min-h-[52px] px-6 sm:px-7 py-3 sm:py-3.5";

  let variantClasses = "";
  if (variant === "primary") {
    variantClasses =
      "bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-brand-actionOnPrimary shadow-md shadow-brand-actionPrimary/20 hover:shadow-lg hover:shadow-brand-actionPrimary/30 active:scale-[0.99]";
  } else if (variant === "secondary") {
    variantClasses =
      "bg-brand-surface hover:bg-brand-cardElevated text-brand-textPrimary hover:text-brand-primary border border-brand-border/80 hover:border-brand-primary/40 active:scale-[0.99]";
  } else if (variant === "tertiary") {
    variantClasses =
      "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 !p-0 !min-h-0 !rounded-none font-semibold normal-case hover:underline";
  }

  const widthClass = fullWidth ? "w-full" : "w-full sm:w-auto";

  const defaultIcon = (
    <ArrowRight
      className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
      aria-hidden="true"
    />
  );

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${variant === "tertiary" ? "" : sizeClasses} ${variantClasses} ${widthClass} ${className}`.trim()}
      {...props}
    >
      <span className="leading-snug">{children}</span>
      {!hideIcon && (icon ? icon : defaultIcon)}
    </Link>
  );
}
