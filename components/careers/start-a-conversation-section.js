"use client";

import { useId } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import ApplicationProtocol from "@/components/careers/application-protocol";

/**
 * StartAConversationSection Component (Section 05 - Start a Conversation)
 *
 * pyBIM Design System v2 — Engineering Precision
 * Task WU-05: Complete Careers Page: Start a Conversation
 *
 * Layout:
 * - Restores Family A Base rhythm (bg-brand-base with EngineeringBackdrop variant="base")
 * - Section header with H2, eyebrow, introductory lead, and transparent evaluation note
 * - Embeds the single authoritative ApplicationProtocol (id="protocol")
 * - Includes temporary compatibility aliases for legacy #life and #engineering-culture anchors
 */
export default function StartAConversationSection({
  selectedRoleCode = "BIM-MOD",
  onSelectRoleCode
}) {
  const { t } = useLanguage();
  const titleId = useId();

  return (
    <>
      {/* Temporary compatibility aliases for legacy #life and #engineering-culture anchors until Navbar is finalized in WU-06 */}
      <span id="engineering-culture" className="scroll-mt-28" aria-hidden="true" />
      <span id="life" className="scroll-mt-28" aria-hidden="true" />

      <section
        id="apply"
        className="scroll-mt-28 py-20 md:py-24 lg:py-28 relative border-b border-brand-border bg-brand-base overflow-hidden"
        aria-labelledby={titleId}
      >
        {/* Background Family A (Base / Clean) */}
        <EngineeringBackdrop variant="base" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* ========================================================= */}
          {/* SECTION HEADER                                            */}
          {/* ========================================================= */}
          <div className="max-w-4xl mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
              <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
                // {t("careers.conversation.eyebrow") || "START A CONVERSATION"}
              </span>
            </div>

            <h2
              id={titleId}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-section-sm xl:text-section font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-4"
            >
              {t("careers.conversation.title") || "Introduce Your Expertise."}
            </h2>

            <p className="text-body sm:text-lead font-sans text-brand-textSecondary font-medium leading-relaxed mb-4">
              {t("careers.conversation.desc") ||
                "Interested in contributing to pyBIM? Select the area that best matches your experience and share a concise technical introduction using the application guide below."}
            </p>

            <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
              {t("careers.conversation.note") ||
                "Applications are considered in relation to current recruitment needs and future professional collaborations. Submission does not guarantee selection, a response or an engagement."}
            </p>
          </div>

          {/* ========================================================= */}
          {/* EMBEDDED APPLICATION PROTOCOL (Single Authoritative Intake) */}
          {/* ========================================================= */}
          <ApplicationProtocol
            activeCode={selectedRoleCode}
            onSelectCode={onSelectRoleCode}
          />
        </div>
      </section>
    </>
  );
}
