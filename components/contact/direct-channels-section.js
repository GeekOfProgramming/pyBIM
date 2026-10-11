"use client";

import { useId } from "react";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

/**
 * DirectChannelsSection Component (Section 02 — Connect with pyBIM)
 *
 * pyBIM Design System v2 — Engineering Precision
 * Task CONTACT-02: Connect with pyBIM
 *
 * Visual & Functional Architecture:
 * - Alternating rhythm: Family B Surface (bg-brand-surface + EngineeringBackdrop variant="surface")
 * - Section ID: id="direct-channels" (scroll-mt-28, exactly once on Contact page)
 * - Standard container: max-w-7xl mx-auto px-6 lg:px-8
 * - Left-aligned section header with JetBrains Mono eyebrow, H2 headline, and concise description
 * - Equal-width, three-column card grid (desktop) adapting to single-column stack (mobile)
 * - Exactly three corporate destination cards:
 *   1. Business Email (mailto:info@pybim.com) — primary commercial contact with brand-primary CTA
 *   2. LinkedIn (https://www.linkedin.com/company/pybim) — external secure link
 *   3. GitHub (https://github.com/pyBIM-collaboration) — technical/dev presence external secure link
 * - Equal visual height (items-stretch, flex flex-col justify-between)
 * - Complete localization (EN, IT, DE) with zero hardcoded user-facing strings
 */
export default function DirectChannelsSection() {
  const { t } = useLanguage();
  const headingId = useId();

  const channels = [
    {
      id: "email",
      icon: Mail,
      iconWrapClass:
        "bg-brand-primary/10 text-brand-primary border-brand-primary/25",
      title: t("contact.channels.email.title") || "Business Email",
      destinationDisplay: "info@pybim.com",
      destinationHref: "mailto:info@pybim.com",
      description:
        t("contact.channels.email.desc") ||
        "Project enquiries and business communication.",
      ctaLabel: t("contact.channels.email.cta") || "Send Email",
      isExternal: false,
      isPrimary: true,
    },
    {
      id: "linkedin",
      icon: Linkedin,
      iconWrapClass:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
      title: t("contact.channels.linkedin.title") || "LinkedIn",
      destinationDisplay: null,
      destinationHref: "https://www.linkedin.com/company/pybim",
      description:
        t("contact.channels.linkedin.desc") ||
        "Company updates and professional connections.",
      ctaLabel: t("contact.channels.linkedin.cta") || "View Profile",
      isExternal: true,
      isPrimary: false,
    },
    {
      id: "github",
      icon: Github,
      iconWrapClass:
        "bg-slate-500/10 text-slate-800 dark:text-slate-200 border-slate-500/25",
      title: t("contact.channels.github.title") || "GitHub",
      destinationDisplay: null,
      destinationHref: "https://github.com/pyBIM-collaboration",
      description:
        t("contact.channels.github.desc") ||
        "Our development organization and technical work.",
      ctaLabel: t("contact.channels.github.cta") || "Visit GitHub",
      isExternal: true,
      isPrimary: false,
    },
  ];

  return (
    <section
      id="direct-channels"
      className="relative w-full py-20 md:py-24 lg:py-28 bg-brand-surface border-b border-brand-border overflow-hidden scroll-mt-28"
      aria-labelledby={headingId}
    >
      {/* Background Family B (Surface / Technical) */}
      <EngineeringBackdrop variant="surface" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER: Left-aligned, consistent pyBIM hierarchy */}
        {/* ========================================================= */}
        <div className="max-w-3xl mb-12 lg:mb-16 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
            <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t("contact.channels.eyebrow") || "CONNECT & EXPLORE"}
            </span>
          </div>

          <h2
            id={headingId}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-section-sm xl:text-section font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-4"
          >
            {t("contact.channels.title") || "Connect with pyBIM."}
          </h2>

          <p className="text-body sm:text-lead font-sans text-brand-textSecondary font-medium leading-relaxed">
            {t("contact.channels.desc") ||
              "Reach our team for project enquiries, connect with us professionally, or explore our technical presence."}
          </p>
        </div>

        {/* ========================================================= */}
        {/* THREE CORPORATE DESTINATION CARDS                         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {channels.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-brand-border/80 bg-brand-cardElevated p-6 sm:p-8 transition-all duration-300 hover:border-brand-primary/40 hover:shadow-lg hover:-translate-y-1 shadow-2xs"
              >
                {/* Upper Content: Icon, Title, Description, Destination Detail */}
                <div>
                  {/* Card Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 transition-colors ${card.iconWrapClass}`}
                    aria-hidden="true"
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-brand-textPrimary tracking-tight mb-2.5">
                    {card.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed mb-4">
                    {card.description}
                  </p>

                  {/* Destination Detail (prominent email address) */}
                  {card.destinationDisplay && (
                    <div className="mb-4 pt-1">
                      <span className="font-mono text-body-sm font-semibold text-brand-textPrimary select-all">
                        {card.destinationDisplay}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom CTA Action */}
                <div className="pt-6 mt-2 border-t border-brand-border/60">
                  <a
                    href={card.destinationHref}
                    target={card.isExternal ? "_blank" : undefined}
                    rel={card.isExternal ? "noopener noreferrer" : undefined}
                    className={`group/cta inline-flex items-center justify-between w-full px-4 py-3 rounded-xl font-sans text-body-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-brand-surface ${
                      card.isPrimary
                        ? "bg-brand-primary text-white shadow-sm shadow-brand-primary/20 hover:bg-brand-primaryHover"
                        : "bg-brand-surface hover:bg-brand-border/40 text-brand-textPrimary border border-brand-border hover:border-brand-primary/30"
                    }`}
                  >
                    <span>{card.ctaLabel}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 ml-2 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 shrink-0 ${
                        card.isPrimary
                          ? "text-white"
                          : "text-brand-textSecondary group-hover/cta:text-brand-primary"
                      }`}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
