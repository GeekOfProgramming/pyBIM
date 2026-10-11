"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { Terminal, Copy, Check, AlertCircle, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

/**
 * ApplicationProtocol Component
 *
 * Professional engineering submission protocol for pyBIM applicant intake.
 * Standardizes email syntax for five technical disciplines without misleading
 * automated rejection claims.
 */
export default function ApplicationProtocol({
  activeCode: controlledCode,
  onSelectCode,
  preselectedRoleCode = "BIM-MOD"
}) {
  const { t } = useLanguage();
  const [internalCode, setInternalCode] = useState(preselectedRoleCode);
  const [copyStatus, setCopyStatus] = useState("idle"); // idle | copied | error

  const activeCode = controlledCode !== undefined ? controlledCode : internalCode;

  const roleCodes = [
    { code: "BIM-MOD", label: "BIM Modeler" },
    { code: "REV-AUTO", label: "Revit Automation" },
    { code: "COMP-DES", label: "Computational Design" },
    { code: "SW-DEV", label: "Software Development" },
    { code: "LLM-AI", label: "LLM & AI Engineering" },
  ];

  const handleSelectCode = (code) => {
    if (onSelectCode) {
      onSelectCode(code);
    } else {
      setInternalCode(code);
    }
  };

  const getSubjectText = (code) => `PYBIM-APPLICATION | ${code} | [FULL_NAME]`;

  const getBodyText = (code) => {
    return `> CANDIDATE: [Full Name]
> TARGET ROLE: ${code}
> PRIMARY SPECIALIZATION: [e.g., Structural BIM / Revit API / RAG Workflows]
> PROFESSIONAL BACKGROUND: [Short technical introduction]
> EVIDENCE / PORTFOLIO: [Portfolio link, GitHub repo, or project summary]
> AVAILABILITY: [Project-based / Ongoing part-time / Full availability]`;
  };

  const getFullTemplateText = (code) => {
    return `SUBJECT: ${getSubjectText(code)}

BODY STRUCTURE:
${getBodyText(code)}`;
  };

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(getFullTemplateText(activeCode));
        setCopyStatus("copied");
        setTimeout(() => setCopyStatus("idle"), 2500);
      } else {
        setCopyStatus("error");
        setTimeout(() => setCopyStatus("idle"), 3000);
      }
    } catch (err) {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 3000);
    }
  };

  const mailtoSubject = encodeURIComponent(getSubjectText(activeCode));
  const mailtoBody = encodeURIComponent(getBodyText(activeCode));
  const mailtoUrl = `mailto:careers@pybim.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div
      id="protocol"
      className="mt-16 pt-12 border-t border-brand-border/80 scroll-mt-28"
      role="region"
      aria-labelledby="protocol-heading"
    >
      <div className="bg-brand-cardElevated border border-brand-border/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg shadow-brand-base/5 dark:shadow-black/20">
        {/* Terminal Header Eyebrow */}
        <div className="flex items-center gap-2 text-caption font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
          <Terminal className="w-4 h-4" aria-hidden="true" />
          <span>{t("careers.protocol.tag") || "// SYNTAX_SUBMISSION_PROTOCOL"}</span>
        </div>

        {/* Section Heading & Overview */}
        <h3 id="protocol-heading" className="text-2xl sm:text-3xl lg:text-card-title font-extrabold font-sans text-brand-textPrimary tracking-tight mb-3">
          {t("careers.protocol.title") || "Structured Application Protocol"}
        </h3>

        <p className="text-body font-sans text-brand-textSecondary max-w-3xl leading-relaxed mb-8">
          {t("careers.protocol.desc") ||
            "Use the structured subject and the guidance below to help us identify your area of expertise and evaluate relevant applications. Submission does not guarantee a response or engagement."}
        </p>

        {/* Role Code Selector Pills */}
        <div className="mb-6">
          <span className="block text-caption font-mono font-bold text-brand-textSecondary uppercase tracking-wider mb-2.5">
            // {t("careers.protocol.select_role") || "Select Target Role Code"}
          </span>
          <div className="flex flex-wrap gap-2">
            {roleCodes.map((rc) => {
              const isSelected = activeCode === rc.code;
              return (
                <button
                  key={rc.code}
                  type="button"
                  onClick={() => handleSelectCode(rc.code)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-caption font-bold tracking-wide transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary min-h-[36px] ${
                    isSelected
                      ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                      : "bg-brand-surface border-brand-border text-brand-textSecondary hover:text-brand-textPrimary hover:border-brand-primary/40"
                  }`}
                >
                  <span>{rc.code}</span>
                  <span className="opacity-75 font-normal ml-1.5 hidden sm:inline">({rc.label})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Inset Technical Surface Terminal Window */}
        <div className="rounded-2xl bg-brand-surface dark:bg-slate-950/80 border border-brand-border/80 overflow-hidden shadow-sm mb-8 max-w-4xl">
          <div className="bg-brand-surfaceHover/70 dark:bg-slate-900/90 px-4 py-3 border-b border-brand-border/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" aria-hidden="true" />
              <span className="ml-2 text-caption font-mono text-brand-textSecondary">
                {t("careers.protocol.terminal_filename") || "application_manifest.txt"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-cardElevated hover:bg-brand-surface text-brand-textPrimary border border-brand-border text-caption font-mono transition-all min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label={t("careers.protocol.copy_aria") || "Copy application template syntax"}
            >
              {copyStatus === "copied" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t("careers.protocol.copied_btn") || "Copied Syntax"}</span>
                </>
              ) : copyStatus === "error" ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">{t("careers.protocol.copy_err") || "Copy Failed"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t("careers.protocol.copy_btn") || "Copy Syntax"}</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-5 sm:p-6 text-body-sm font-mono text-brand-textPrimary dark:text-slate-200 overflow-x-auto leading-relaxed selection:bg-brand-primary/20">
            {getFullTemplateText(activeCode)}
          </pre>
        </div>

        {/* Action Button & Dispatch Details with CtaLink Primary Geometry */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <a
            href={mailtoUrl}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full min-h-[48px] sm:min-h-[52px] px-7 py-3 sm:py-3.5 bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-brand-actionOnPrimary text-body-sm font-semibold tracking-normal shadow-md shadow-brand-actionPrimary/20 hover:shadow-lg hover:shadow-brand-actionPrimary/30 transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-actionPrimary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-brand-base"
          >
            <Mail className="w-4 h-4" />
            <span className="leading-snug">{t("careers.protocol.send_btn") || "Initiate Application Email"}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <span className="text-caption font-mono text-brand-textSecondary">
            {t("careers.protocol.sub_note") || "// Designated recipient: careers@pybim.com"}
          </span>
        </div>

        {/* Applicant Data Notice */}
        <div className="mt-6 pt-5 pb-8 mb-8 border-t border-b border-brand-border/70 flex items-start gap-2.5 text-body-sm font-sans text-brand-textSecondary leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            {t("careers.protocol.privacy_prefix") ||
              "By initiating an application email, you voluntarily provide your personal information, CV, and work samples. pyBIM processes these materials solely to evaluate employment or project-based collaboration opportunities and conduct related follow-up communications. Submissions are never used for unrelated marketing. Please include only details relevant to your technical background, and do not disclose sensitive personal data or confidential client material. For more information on how we handle personal data, please review our"}{" "}
            <Link href="/privacy-policy" className="text-brand-primary hover:underline font-medium">
              {t("careers.protocol.privacy_link") || "Privacy Policy"}
            </Link>
            {t("careers.protocol.privacy_suffix") || "."}
          </span>
        </div>

        {/* Submission Guidelines & Rules in Inter Body Typography */}
        <div className="space-y-4">
          <h4 className="text-caption font-mono font-bold tracking-wider text-brand-textPrimary uppercase">
            {t("careers.protocol.guidelines_title") || "Submission Guidelines"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface/50 border border-brand-border/60">
              <span className="font-mono text-caption font-bold text-brand-primary block mb-1.5">
                [01] {t("careers.protocol.rule1_title") || "Categorized Subject"}
              </span>
              <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                {t("careers.protocol.rule1") ||
                  "Use the specified subject format and role code to make the area of your application easier to identify."}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface/50 border border-brand-border/60">
              <span className="font-mono text-caption font-bold text-brand-primary block mb-1.5">
                [02] {t("careers.protocol.rule2_title") || "Discipline-Tailored Evidence"}
              </span>
              <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                {t("careers.protocol.rule2") ||
                  "BIM modelers may provide drawings or model screenshots (GitHub is not required); developers are encouraged to include code or repositories."}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface/50 border border-brand-border/60">
              <span className="font-mono text-caption font-bold text-brand-primary block mb-1.5">
                [03] {t("careers.protocol.rule3_title") || "Confidentiality Respected"}
              </span>
              <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                {t("careers.protocol.rule3") ||
                  "Feel free to anonymize client details or proprietary parameters when referencing past project work."}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface/50 border border-brand-border/60">
              <span className="font-mono text-caption font-bold text-brand-primary block mb-1.5">
                [04] {t("careers.protocol.rule4_title") || "Transparent Review"}
              </span>
              <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                {t("careers.protocol.rule4") ||
                  "Applications may be considered according to current opportunities and available review capacity. Additional information may be requested when relevant."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
