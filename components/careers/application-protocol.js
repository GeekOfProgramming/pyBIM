"use client";

import { useState } from "react";
import { Terminal, Copy, Check, AlertCircle, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

/**
 * ApplicationProtocol Component
 *
 * Professional engineering submission protocol for pyBIM applicant intake.
 * Standardizes email syntax for five technical disciplines without misleading
 * automated rejection claims.
 */
export default function ApplicationProtocol({ preselectedRoleCode = "BIM-MOD" }) {
  const { t } = useLanguage();
  const [copyStatus, setCopyStatus] = useState("idle"); // idle | copied | error
  const [activeCode, setActiveCode] = useState(preselectedRoleCode);

  const roleCodes = [
    { code: "BIM-MOD", label: "BIM Modeler" },
    { code: "REV-AUTO", label: "Revit Automation" },
    { code: "COMP-DES", label: "Computational Design" },
    { code: "SW-DEV", label: "Software Development" },
    { code: "LLM-AI", label: "LLM & AI Engineering" },
  ];

  const getTemplateText = (code) => {
    return `SUBJECT: PYBIM-APPLICATION | ${code} | [FULL_NAME]

BODY STRUCTURE:
> CANDIDATE: [Full Name]
> TARGET ROLE: ${code}
> PRIMARY SPECIALIZATION: [e.g., Structural BIM / Revit API / RAG Workflows]
> PROFESSIONAL BACKGROUND: [Short technical introduction]
> EVIDENCE / PORTFOLIO: [Portfolio link, GitHub repo, or project summary]
> AVAILABILITY: [Project-based / Ongoing part-time / Full availability]`;
  };

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(getTemplateText(activeCode));
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

  const mailtoSubject = encodeURIComponent(`PYBIM-APPLICATION | ${activeCode} | [FULL_NAME]`);
  const mailtoBody = encodeURIComponent(getTemplateText(activeCode));
  const mailtoUrl = `mailto:careers@pybim.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div
      id="protocol"
      className="mt-16 pt-12 border-t border-brand-border/80 scroll-mt-28"
      role="region"
      aria-labelledby="protocol-heading"
    >
      <div className="bg-brand-cardElevated border border-brand-border/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-brand-base/5 dark:shadow-black/20">
        {/* Terminal Header Eyebrow */}
        <div className="flex items-center gap-2 text-caption font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
          <Terminal className="w-4 h-4" aria-hidden="true" />
          <span>{t("careers.protocol.tag") || "// SYNTAX_SUBMISSION_PROTOCOL"}</span>
        </div>

        {/* Section Heading & Overview */}
        <h3 id="protocol-heading" className="text-2xl sm:text-3xl font-extrabold font-sans text-brand-textPrimary tracking-tight mb-3">
          {t("careers.protocol.title") || "Structured Application Protocol"}
        </h3>

        <p className="text-body font-sans text-brand-textSecondary max-w-3xl leading-relaxed mb-8">
          {t("careers.protocol.desc") ||
            "To ensure your application is promptly categorized and reviewed by our engineering leads, please format your submission using our standardized structure below."}
        </p>

        {/* Role Code Selector Pills */}
        <div className="mb-6">
          <span className="block text-caption font-mono font-bold text-brand-textSecondary uppercase tracking-wider mb-2.5">
            // Select Target Role Code
          </span>
          <div className="flex flex-wrap gap-2">
            {roleCodes.map((rc) => {
              const isSelected = activeCode === rc.code;
              return (
                <button
                  key={rc.code}
                  type="button"
                  onClick={() => setActiveCode(rc.code)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-caption font-bold tracking-wide transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
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

        {/* Terminal Code Display Block */}
        <div className="rounded-2xl bg-[#09090b] border border-neutral-800 overflow-hidden shadow-2xl mb-8">
          <div className="bg-[#0f1115] px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" aria-hidden="true" />
              <span className="ml-2 text-caption font-mono text-neutral-400">
                {t("careers.protocol.terminal_filename") || "application_manifest.txt"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-caption font-mono transition-colors border border-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Copy application template syntax"
            >
              {copyStatus === "copied" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{t("careers.protocol.copied_btn") || "Copied Syntax"}</span>
                </>
              ) : copyStatus === "error" ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-400">{t("careers.protocol.copy_err") || "Copy Failed"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t("careers.protocol.copy_btn") || "Copy Syntax"}</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-5 text-caption sm:text-body-sm font-mono text-neutral-200 overflow-x-auto leading-relaxed selection:bg-brand-primary/30">
            {getTemplateText(activeCode)}
          </pre>
        </div>

        {/* Action Button & Dispatch Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-brand-border/70">
          <a
            href={mailtoUrl}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-brand-actionOnPrimary px-8 py-4 font-bold uppercase text-caption tracking-wider transition-all shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <Mail className="w-4 h-4" />
            <span>{t("careers.protocol.send_btn") || "INITIATE APPLICATION EMAIL"}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <span className="text-caption font-mono text-brand-textSecondary">
            {t("careers.protocol.sub_note") || "// Designated recipient: careers@pybim.com"}
          </span>
        </div>

        {/* Submission Guidelines & Rules */}
        <div className="space-y-4">
          <h4 className="text-caption font-mono font-bold tracking-wider text-brand-textPrimary uppercase">
            {t("careers.protocol.guidelines_title") || "Submission Guidelines"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/70">
              <span className="font-mono text-caption font-bold text-brand-primary block mb-1">
                [01] Categorized Subject
              </span>
              <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                {t("careers.protocol.rule1") ||
                  "Consistent Subject Line: Use the exact format with your role code (e.g. BIM-MOD, SW-DEV) to ensure accurate technical routing."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/70">
              <span className="font-mono text-caption font-bold text-brand-primary block mb-1">
                [02] Discipline-Tailored Evidence
              </span>
              <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                {t("careers.protocol.rule2") ||
                  "Discipline-Tailored Evidence: BIM modelers may provide drawings or model screenshots (GitHub is not required); developers are encouraged to include code or repositories."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/70">
              <span className="font-mono text-caption font-bold text-brand-primary block mb-1">
                [03] Confidentiality Respected
              </span>
              <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                {t("careers.protocol.rule3") ||
                  "Confidentiality Respected: Feel free to anonymize client details or proprietary parameters when referencing past project work."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/70">
              <span className="font-mono text-caption font-bold text-brand-primary block mb-1">
                [04] Transparent Review
              </span>
              <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                {t("careers.protocol.rule4") ||
                  "Transparent Review: Submissions are reviewed individually by engineering leads. Incomplete materials may require follow-up clarification before evaluation."}
              </p>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 pt-4 flex items-start gap-2.5 text-caption font-mono text-brand-textSecondary">
            <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
            <span className="leading-relaxed">
              {t("careers.protocol.privacy_notice") ||
                "By transmitting your application, you consent to the processing of personal data for recruitment and collaboration evaluation pursuant to GDPR (EU Regulation 2016/679) and Italian D.lgs. 196/2003."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
