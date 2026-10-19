"use client";

import { useState, useId, useMemo, useRef } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, CheckCircle2, AlertCircle, ExternalLink, ChevronDown, ChevronUp, ShieldCheck, Info, Download, FileSpreadsheet } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import TurnstileWidget from "@/components/common/turnstile-widget";
import {
  AUTODESK_CITATION,
  AUTODESK_REFERENCE_HOURS_PER_WEEK,
  BENCHMARK_DEFAULTS,
  DEFAULT_CONSULTING_RATE,
  HUMAN_VERIFICATION_RATE,
  REGIONAL_CONTEXTS,
  validateQuickEstimate,
  validateAdvancedAssessment,
  calculateRoiPreview,
} from "@/lib/roi/roiSchema";

/**
 * RoiMatrixSection Component (Section 03 — BIM Automation ROI Matrix)
 *
 * pyBIM Design System v2 — Engineering Precision
 * Task ROI-01 (Final Owner Decisions)
 *
 * Core Governance & Invariants:
 * 1. Hourly Rate & Rate-Type Integrity:
 *    - Consulting rate is OPTIONAL, initially blank with €85/h placeholder.
 *    - Defaults to €85/h if left blank; custom valid rate preserved if entered.
 *    - Toggling to Internal Loaded Labor Cost requires customer-entered labor cost (never defaults to 85).
 *    - Valuation metrics clearly distinguish billing capacity from internal loaded labor valuation.
 * 2. Fixed Autodesk Reference (13 Hours):
 *    - Read-only standard benchmark on website (13 hrs/wk), locked in scenario model.
 *    - Cites Autodesk 2025 State of Design & Make study across construction roles.
 * 3. Exactly Five Fixed AI Adoption Scenarios:
 *    - 20%, 40%, 60%, 80%, 100% adoption of addressable benchmark workflow time.
 * 4. Fixed 10% Human Verification Allowance:
 *    - 10% retained for engineering review and quality control. At 100% adoption,
 *      does NOT report 100% time elimination (retains 10% verification).
 * 5. Download Notification & Stateless Verification:
 *    - In ROI-02, production export will notify support@pybim.com via Resend (EXPORT_INITIATED).
 *    - Client-side verification is stateless UX guidance without durable storage.
 */
export default function RoiMatrixSection() {
  const { t } = useLanguage();
  const headingId = useId();
  const turnstileRef = useRef(null);

  // Group 01: Quick Estimate Operational Inputs
  const [modelerCount, setModelerCount] = useState(String(BENCHMARK_DEFAULTS.MODELER_COUNT));
  const [rateType, setRateType] = useState(BENCHMARK_DEFAULTS.RATE_TYPE_DEFAULT); // 'consulting' | 'internal_labor'
  const [consultingRate, setConsultingRate] = useState(""); // Optional, initially blank (defaults to €85/h if empty)
  const [internalLaborRate, setInternalLaborRate] = useState(""); // Explicit customer-entered internal cost
  const [workingWeeks, setWorkingWeeks] = useState(String(BENCHMARK_DEFAULTS.WORKING_WEEKS_YEAR));
  const [region, setRegion] = useState(BENCHMARK_DEFAULTS.REGION_DEFAULT);

  // Optional Advanced Workflow Assessment state (diagnostic assessment)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showHowCalculated, setShowHowCalculated] = useState(false);
  const [advSearchHours, setAdvSearchHours] = useState(String(AUTODESK_REFERENCE_HOURS_PER_WEEK));
  const [advManualEntryHours, setAdvManualEntryHours] = useState("0");
  const [advDisciplineHours, setAdvDisciplineHours] = useState("0");
  const [advJudgmentHours, setAdvJudgmentHours] = useState("0");

  // Group 03: Business Identity & Verification Fields
  const [businessIdentity, setBusinessIdentity] = useState({
    name: "",
    companyName: "",
    email: "",
    privacyAccepted: false,
  });
  const [turnstileToken, setTurnstileToken] = useState("");

  // Verification request UI state
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null); // null | { ok: boolean, data?: object, error?: string }

  // Invalidate verification state when any relevant input changes
  const handleInputChange = (setter) => (val) => {
    setter(val);
    if (verificationResult) {
      setVerificationResult(null);
    }
  };

  const updateIdentity = (field, value) => {
    setBusinessIdentity((prev) => ({ ...prev, [field]: value }));
    if (verificationResult) {
      setVerificationResult(null);
    }
  };

  const handleRateTypeChange = (newType) => {
    setRateType(newType);
    if (verificationResult) {
      setVerificationResult(null);
    }
  };

  // Resolve current active hourly rate string based on rateType
  const activeRateStr = rateType === "consulting" ? consultingRate : internalLaborRate;

  // Real-time Preview Calculation using shared schema engine
  const previewData = useMemo(() => {
    const quickInputs = {
      modelerCount,
      hourlyRate: activeRateStr,
      searchHours: AUTODESK_REFERENCE_HOURS_PER_WEEK,
      workingWeeks,
      rateType,
      region,
    };

    const advancedInputs = showAdvanced
      ? {
          searchHours: advSearchHours,
          manualDataEntryHours: advManualEntryHours,
          disciplineWorkflowsHours: advDisciplineHours,
          nonAutomatableJudgmentHours: advJudgmentHours,
        }
      : null;

    const quickValidated = validateQuickEstimate(quickInputs);
    if (!quickValidated.valid) {
      return {
        isValid: false,
        errors: quickValidated.errors,
      };
    }

    const advValidated = showAdvanced ? validateAdvancedAssessment(advancedInputs) : null;
    if (showAdvanced && advValidated && !advValidated.valid) {
      return {
        isValid: false,
        errors: advValidated.errors,
      };
    }

    return calculateRoiPreview({
      quickEstimate: quickValidated.sanitized,
      useAdvanced: showAdvanced && advValidated?.valid,
      advancedAssessment: advValidated?.sanitized,
    });
  }, [
    modelerCount,
    activeRateStr,
    rateType,
    workingWeeks,
    region,
    showAdvanced,
    advSearchHours,
    advManualEntryHours,
    advDisciplineHours,
    advJudgmentHours,
  ]);

  const handleVerifyEligibility = async (e) => {
    e.preventDefault();
    setVerificationResult(null);

    // 1. Client-side Quick Estimate validation
    const quickValidation = validateQuickEstimate({
      modelerCount,
      hourlyRate: activeRateStr,
      searchHours: AUTODESK_REFERENCE_HOURS_PER_WEEK,
      workingWeeks,
      rateType,
      region,
    });

    if (!quickValidation.valid) {
      const firstError = Object.values(quickValidation.errors)[0];
      setVerificationResult({ ok: false, error: firstError });
      return;
    }

    // 2. Client-side Advanced validation (if active)
    let advancedValidation = null;
    if (showAdvanced) {
      advancedValidation = validateAdvancedAssessment({
        searchHours: advSearchHours,
        manualDataEntryHours: advManualEntryHours,
        disciplineWorkflowsHours: advDisciplineHours,
        nonAutomatableJudgmentHours: advJudgmentHours,
      });

      if (!advancedValidation.valid) {
        const firstError = Object.values(advancedValidation.errors)[0];
        setVerificationResult({ ok: false, error: firstError });
        return;
      }
    }

    // 3. Client-side Business Identity validation
    if (!businessIdentity.name.trim() || !businessIdentity.companyName.trim() || !businessIdentity.email.trim()) {
      setVerificationResult({
        ok: false,
        error: t("roi.validation.required_fields"),
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessIdentity.email.trim())) {
      setVerificationResult({
        ok: false,
        error: t("roi.validation.invalid_email"),
      });
      return;
    }

    if (!businessIdentity.privacyAccepted) {
      setVerificationResult({
        ok: false,
        error: t("roi.validation.privacy_required"),
      });
      return;
    }

    // Turnstile check
    if (!turnstileToken) {
      setVerificationResult({
        ok: false,
        error: t("roi.validation.turnstile_required"),
      });
      return;
    }

    // 4. Client-side XLSX construction & Server-side verification & Resend dispatch sequence
    // In accordance with ROI-02 Final Corrections:
    // 1. Lazy-load ExcelJS and construct the XLSX buffer in browser memory first.
    // 2. Generate stable export attempt identifier & reference ID reused across retries.
    // 3. Verify Turnstile, corporate email, DNS MX, and Privacy on the server and dispatch notification.
    // 4. Confirm provider acceptance.
    // 5. Trigger browser download.
    setLoading(true);

    try {
      // Step A: Derive stable export-attempt identifier & reference ID for this unchanged request
      const safeEmail = businessIdentity.email.trim().toLowerCase();
      const domain = safeEmail.split("@")[1] || "client";
      let attemptHash;
      try {
        const attemptSig = JSON.stringify({
          email: safeEmail,
          name: businessIdentity.name.trim().toLowerCase(),
          company: businessIdentity.companyName.trim().toLowerCase(),
          quick: quickValidation.sanitized,
          useAdvanced: Boolean(showAdvanced),
          advanced: showAdvanced && advancedValidation ? advancedValidation.sanitized : null,
        });
        if (typeof crypto !== "undefined" && crypto.subtle && typeof TextEncoder !== "undefined") {
          const enc = new TextEncoder();
          const hashBuf = await crypto.subtle.digest("SHA-256", enc.encode(attemptSig));
          attemptHash = Array.from(new Uint8Array(hashBuf))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
            .substring(0, 8)
            .toUpperCase();
        }
      } catch {
        // Fallback if subtle crypto is not available
      }
      if (!attemptHash) {
        attemptHash = Math.abs(
          (safeEmail + businessIdentity.name.trim()).split("").reduce((acc, c) => ((acc << 5) - acc + c.charCodeAt(0)) | 0, 0)
        ).toString(36).substring(0, 8).toUpperCase();
      }

      const stableReferenceId = `ROI-SESS-${new Date().getFullYear()}-${attemptHash}`;
      const idempotencyKey = `roi-export-${domain}-${attemptHash}`;

      // Step B: Lazy-load ExcelJS and construct & serialize XLSX buffer in browser memory
      let serializedBuffer;
      let safeFileName;
      try {
        const ExcelJSModule = await import("exceljs");
        const ExcelJS = ExcelJSModule.default || ExcelJSModule;
        const { buildRoiWorkbook } = await import("@/lib/roi/roiWorkbookBuilder");

        const workbook = await buildRoiWorkbook(ExcelJS, {
          userName: businessIdentity.name.trim(),
          companyName: businessIdentity.companyName.trim(),
          referenceId: stableReferenceId,
          modelerCount: quickValidation.sanitized.modelerCount,
          hourlyRate: quickValidation.sanitized.hourlyRate,
          isRateCustom: quickValidation.sanitized.isRateCustom,
          rateType: quickValidation.sanitized.rateType,
          workingWeeks: quickValidation.sanitized.workingWeeks,
          useAdvanced: showAdvanced,
          advancedAssessment: showAdvanced && advancedValidation ? advancedValidation.sanitized : null,
        });

        serializedBuffer = await workbook.xlsx.writeBuffer();
        const safeCompanyFile = (businessIdentity.companyName.trim() || "pyBIM")
          .replace(/[^a-zA-Z0-9_-]/g, "_")
          .substring(0, 30);
        safeFileName = `pyBIM-ROI-Matrix-${safeCompanyFile}.xlsx`;
      } catch (wbError) {
        console.error("[ROI WORKBOOK CONSTRUCTION FAILED]:", wbError);
        setVerificationResult({
          ok: false,
          error: t("roi.access.err_workbook_failed"),
        });
        if (turnstileRef.current?.reset) turnstileRef.current.reset();
        setTurnstileToken("");
        return;
      }

      // Step C: Server-side verification (Turnstile, Corporate Email, DNS MX, Privacy) and Resend notification dispatch
      const attemptTimestamp = new Date().toISOString();
      const response = await fetch("/api/roi-matrix/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: businessIdentity.name.trim(),
          companyName: businessIdentity.companyName.trim(),
          email: businessIdentity.email.trim(),
          privacyAccepted: businessIdentity.privacyAccepted,
          turnstileToken,
          idempotencyKey,
          referenceId: stableReferenceId,
          attemptTimestamp,
          quickEstimate: quickValidation.sanitized,
          useAdvanced: showAdvanced,
          advancedAssessment: advancedValidation ? advancedValidation.sanitized : null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setVerificationResult({
          ok: false,
          error: data.error || t("roi.access.err_default"),
        });
        if (turnstileRef.current?.reset) turnstileRef.current.reset();
        setTurnstileToken("");
        return;
      }

      // Step D: Confirm provider acceptance and trigger browser download of serialized buffer
      const blob = new Blob([serializedBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = safeFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 2000);

      setVerificationResult({
        ok: true,
        downloadTriggered: true,
        fileName: safeFileName,
        data,
      });
    } catch (_err) {
      setVerificationResult({
        ok: false,
        error: t("roi.access.err_network"),
      });
      if (turnstileRef.current?.reset) turnstileRef.current.reset();
      setTurnstileToken("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="calculator"
      className="relative w-full py-20 md:py-24 lg:py-28 bg-brand-base border-b border-brand-border overflow-hidden scroll-mt-28"
      aria-labelledby={headingId}
    >
      {/* Background Family A (Base / Architectural) */}
      <EngineeringBackdrop variant="base" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ========================================================= */}
        {/* UNIFIED SECTION CONTAINER (Engineering Inset Card)         */}
        {/* ========================================================= */}
        <div className="rounded-[2.5rem] bg-brand-surface border border-brand-border p-8 md:p-12 lg:p-14 shadow-xl flex flex-col lg:flex-row gap-12 lg:gap-14 xl:gap-16 items-start relative overflow-hidden">
          
          {/* Subtle Ambient Illumination */}
          <div
            className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* ======================================================= */}
          {/* LEFT COLUMN: Editorial, Value Proposition & Citation    */}
          {/* ======================================================= */}
          <div className="lg:w-5/12 w-full flex flex-col items-start text-left relative z-10">
            {/* Section Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-semibold text-brand-primary mb-6 shadow-xs">
              {t("roi.badge")}
            </div>

            {/* Section H2 Headline */}
            <h2
              id={headingId}
              className="text-3xl sm:text-[34px] lg:text-section font-extrabold tracking-tight text-brand-textPrimary leading-[1.2] sm:leading-[1.2] lg:leading-[1.2] mb-5"
            >
              {t("roi.section.title")}
            </h2>

            {/* Introductory Lead */}
            <p className="text-[17px] sm:text-lead text-brand-textSecondary leading-relaxed mb-6">
              {t("roi.section.desc")}
            </p>

            {/* Editorial Narrative */}
            <div className="space-y-4 mb-8 text-body-sm text-brand-textSecondary leading-relaxed">
              <p>
                <strong className="text-brand-textPrimary font-semibold">
                  {t("roi.narrative.problem_lead")}{" "}
                </strong>
                {t("roi.narrative.problem_desc")}
              </p>

              <p>
                <strong className="text-brand-textPrimary font-semibold">
                  {t("roi.narrative.impact_lead")}{" "}
                </strong>
                {t("roi.narrative.impact_desc")}
              </p>

              <p>
                <strong className="text-brand-textPrimary font-semibold">
                  {t("roi.narrative.solution_lead")}{" "}
                </strong>
                {t("roi.narrative.solution_desc")}
              </p>
            </div>

            {/* Potential Time & Value with AI (Compact Comparison Table) */}
            <div className="w-full mb-8">
              {previewData.isValid ? (
                <div className="w-full p-4 rounded-2xl bg-brand-base border border-brand-border space-y-4">
                  {/* Panel Header */}
                  <div>
                    <h3 className="text-base font-bold text-brand-textPrimary leading-snug">
                      {t("roi.preview.group_title")}
                    </h3>
                    <p className="text-caption text-brand-textSecondary mt-0.5 leading-normal">
                      {t("roi.preview.subtitle")}
                    </p>
                  </div>

                  {/* 5-Row Comparison Table */}
                  <div className="w-full overflow-hidden">
                    <table className="w-full table-fixed border-collapse">
                      <thead>
                        <tr className="h-10 border-b border-brand-border/80 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-brand-textSecondary">
                          <th scope="col" className="w-[20%] py-2 px-2 text-left font-semibold">
                            {t("roi.preview.col_coverage")}
                          </th>
                          <th scope="col" className="w-[35%] py-2 px-2 text-right font-semibold">
                            {t("roi.preview.col_hours")}
                          </th>
                          <th scope="col" className="w-[45%] py-2 px-2 text-right font-semibold">
                            {t("roi.preview.col_value")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/40">
                        {Object.values(previewData.scenarios).map((scenario) => {
                          const formattedHours = scenario.annualRecoveredHours.toLocaleString(undefined, {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          });
                          const formattedValue = `€${scenario.annualIllustrativeValue.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}`;
                          return (
                            <tr key={scenario.id} className="h-[52px] transition-colors hover:bg-brand-surface/40">
                              <td className="py-2 px-2 text-left font-mono font-semibold text-sm text-brand-textPrimary">
                                {scenario.percentageLabel}
                              </td>
                              <td className="py-2 px-2 text-right font-mono tabular-nums font-medium text-sm text-brand-textPrimary">
                                {formattedHours}
                              </td>
                              <td className="py-2 px-2 text-right font-mono tabular-nums font-bold text-[15px] text-brand-primary">
                                {formattedValue}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Valuation indicator and always-visible disclaimer note */}
                  <div className="pt-2 border-t border-brand-border/60 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-technical font-mono text-brand-textSecondary font-medium">
                      <Info className="w-3.5 h-3.5 shrink-0 text-brand-primary" aria-hidden="true" />
                      <span>{previewData.baseline.valuationTypeLabel}</span>
                    </div>
                    <p className="text-caption text-brand-textSecondary leading-relaxed">
                      {t("roi.preview.disclaimer_short")}
                    </p>
                  </div>

                  {/* Collapsible Calculation Explanation */}
                  <div className="pt-1 border-t border-brand-border/50">
                    <button
                      type="button"
                      onClick={() => setShowHowCalculated((prev) => !prev)}
                      aria-expanded={showHowCalculated}
                      aria-controls="roi-how-calculated-panel"
                      className="w-full flex items-center justify-between py-2 text-caption font-mono font-semibold text-brand-textPrimary hover:text-brand-primary transition focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
                    >
                      <span>{t("roi.preview.how_calculated_btn")}</span>
                      {showHowCalculated ? (
                        <ChevronUp className="w-4 h-4 text-brand-textSecondary shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-brand-textSecondary shrink-0" aria-hidden="true" />
                      )}
                    </button>

                    {showHowCalculated && (
                      <div
                        id="roi-how-calculated-panel"
                        className="mt-2 p-3.5 rounded-xl bg-brand-surface/70 border border-brand-border/80 text-caption text-brand-textSecondary space-y-2.5 leading-relaxed"
                      >
                        <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-brand-border/60 text-technical font-mono">
                          <span className="text-brand-textPrimary font-semibold">
                            {t("roi.preview.calc_annual_search_hours")}
                          </span>
                          <span className="text-brand-primary font-bold tabular-nums">
                            {previewData.baseline.annualRepetitiveHoursTeam.toLocaleString()} hrs/yr
                          </span>
                        </div>
                        <p>
                          • {t("roi.preview.calc_benchmark")}
                        </p>
                        <p>
                          • {t("roi.preview.calc_scenarios")}
                        </p>
                        <p>
                          • {t("roi.preview.calc_verification")}
                        </p>
                        <p>
                          • {t("roi.preview.calc_capacity_nature")}
                        </p>
                        <p>
                          • {t("roi.preview.calc_implementation")}
                        </p>
                        <p className="pt-1 text-[11px] border-t border-brand-border/50 text-brand-textSecondary/90">
                          {previewData.disclaimer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full p-4 rounded-2xl bg-brand-base border border-brand-border space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-brand-border/60">
                    <h3 className="text-base font-bold text-brand-textPrimary leading-snug">
                      {t("roi.preview.group_title")}
                    </h3>
                    <span className="text-caption font-mono text-amber-600 dark:text-amber-400">
                      {t("roi.preview.status_paused")}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-body-sm text-brand-textPrimary flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">
                        {t("roi.preview.paused_title")}
                      </strong>
                      <p className="text-caption text-brand-textSecondary mt-1 leading-relaxed">
                        {rateType === "internal_labor" && !activeRateStr.trim()
                          ? (t("roi.preview.paused_internal_rate"))
                          : (t("roi.preview.paused_desc"))}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clickable Autodesk Industry Reference Callout */}
            <div className="w-full p-5 rounded-2xl bg-brand-base border border-brand-border/90 shadow-xs mb-8">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
                  {t("roi.citation.title")}
                </span>
                <span className="text-[11px] font-mono text-brand-textSecondary">
                  2025 Study
                </span>
              </div>
              <p className="text-body-sm text-brand-textPrimary font-medium mb-3 leading-snug">
                &ldquo;{t("roi.citation.finding") || AUTODESK_CITATION.finding}&rdquo;
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-brand-primary font-medium mb-3">
                <a
                  href={AUTODESK_CITATION.primaryReportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                  title="Autodesk 2025 State of Design & Make: Spotlight on Construction Primary Report"
                >
                  <span>{t("roi.citation.primary_link")}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                </a>
                <span className="text-brand-border" aria-hidden="true">•</span>
                <a
                  href={AUTODESK_CITATION.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                  title="Autodesk EMEA Construction Spotlight Blog"
                >
                  <span>{t("roi.citation.blog_link")}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                </a>
              </div>
              <p className="text-[11px] text-brand-textSecondary leading-relaxed border-t border-brand-border/60 pt-2.5">
                {t("roi.citation.disclaimer") || AUTODESK_CITATION.disclaimer}
              </p>
            </div>

            {/* What the Matrix Delivers: Compact Editorial List */}
            <div className="w-full pt-6 border-t border-brand-border/80">
              <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary mb-4">
                {t("roi.deliverables.title")}
              </h3>
              <ul className="space-y-3.5 text-body-sm text-brand-textSecondary">
                <li className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-2 h-2 mt-2 rounded-full bg-brand-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <strong className="text-brand-textPrimary font-semibold">
                      {t("roi.deliverables.d1_title")}
                    </strong>
                    <span className="block text-body-sm text-brand-textSecondary leading-relaxed">
                      {t("roi.deliverables.d1_desc")}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-2 h-2 mt-2 rounded-full bg-brand-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <strong className="text-brand-textPrimary font-semibold">
                      {t("roi.deliverables.d2_title")}
                    </strong>
                    <span className="block text-body-sm text-brand-textSecondary leading-relaxed">
                      {t("roi.deliverables.d2_desc")}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-2 h-2 mt-2 rounded-full bg-brand-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <strong className="text-brand-textPrimary font-semibold">
                      {t("roi.deliverables.d3_title")}
                    </strong>
                    <span className="block text-body-sm text-brand-textSecondary leading-relaxed">
                      {t("roi.deliverables.d3_desc")}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ======================================================= */}
          {/* RIGHT COLUMN: Calculator & Eligibility Verification Form*/}
          {/* ======================================================= */}
          <div className="lg:w-7/12 w-full relative z-10">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-brand-border dark:border-slate-800 shadow-xl transition-colors">
              <form onSubmit={handleVerifyEligibility} noValidate className="space-y-6">
                
                {/* --------------------------------------------------- */}
                {/* GROUP 01: Quick Estimate Parameters                 */}
                {/* --------------------------------------------------- */}
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-border/70">
                    <div>
                      <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                        {t("roi.inputs.group_title")}
                      </h3>
                      <p className="text-xs text-brand-textSecondary mt-0.5">
                        {t("roi.inputs.group_note")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Item 1: Rate Classification */}
                    <div className="space-y-1.5 p-4 rounded-2xl bg-brand-surface/60 border border-brand-border/70">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-medium text-brand-textPrimary">
                          {t("roi.inputs.rate_type_label")}
                        </span>
                        <div className="inline-flex rounded-xl p-1 bg-brand-base border border-brand-border/80">
                          <button
                            type="button"
                            onClick={() => handleRateTypeChange("consulting")}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                              rateType === "consulting"
                                ? "bg-brand-primary text-white shadow-xs"
                                : "text-brand-textSecondary hover:text-brand-textPrimary"
                            }`}
                          >
                            {t("roi.inputs.rate_type_consulting")}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRateTypeChange("internal_labor")}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                              rateType === "internal_labor"
                                ? "bg-brand-primary text-white shadow-xs"
                                : "text-brand-textSecondary hover:text-brand-textPrimary"
                            }`}
                          >
                            {t("roi.inputs.rate_type_internal")}
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-brand-textSecondary leading-relaxed pt-1">
                        {rateType === "consulting"
                          ? (t("roi.inputs.hourly_rate_help"))
                          : (t("roi.inputs.hourly_rate_internal_help"))}
                      </p>
                    </div>

                    {/* Item 2: Number of BIM Modelers / Engineers (80/20 grid layout) */}
                    <div className="p-4 rounded-2xl bg-brand-surface/60 border border-brand-border/70 grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(90px,1fr)] items-center gap-3">
                      <div className="space-y-0.5">
                        <label
                          htmlFor="roi-modeler-count"
                          className="text-body-sm font-medium text-brand-textPrimary block"
                        >
                          {t("roi.inputs.modeler_count")}{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <p className="text-[11px] text-brand-textSecondary leading-snug">
                          {t("roi.inputs.modeler_count_unit")}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <input
                          id="roi-modeler-count"
                          type="number"
                          required
                          min="1"
                          max="500"
                          step="1"
                          value={modelerCount}
                          onChange={(e) => handleInputChange(setModelerCount)(e.target.value)}
                          placeholder="e.g. 1"
                          className="w-full h-11 rounded-xl border border-brand-border bg-brand-base px-3.5 text-sm font-semibold text-center tabular-nums text-brand-textPrimary placeholder:text-brand-textSecondary/70 placeholder:font-normal outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Item 3: Illustrative Consulting Rate (€ / hour) (Optional) (80/20 grid layout) */}
                    <div className="p-4 rounded-2xl bg-brand-surface/60 border border-brand-border/70 grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(90px,1fr)] items-center gap-3">
                      <div className="space-y-0.5">
                        <label
                          htmlFor="roi-hourly-rate"
                          className="text-body-sm font-medium text-brand-textPrimary block"
                        >
                          {rateType === "consulting"
                            ? (t("roi.inputs.hourly_rate_consulting_label"))
                            : (t("roi.inputs.hourly_rate_internal_label"))}{" "}
                          {rateType === "internal_labor" && <span className="text-brand-primary">*</span>}
                        </label>
                        <p className="text-[11px] text-brand-textSecondary leading-snug">
                          {rateType === "consulting"
                            ? (t("roi.inputs.hourly_rate_help"))
                            : t("roi.inputs.hourly_rate_internal_subhelp")}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <input
                          id="roi-hourly-rate"
                          type="number"
                          required={rateType === "internal_labor"}
                          min="1"
                          max="2000"
                          step="any"
                          value={rateType === "consulting" ? consultingRate : internalLaborRate}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (rateType === "consulting") {
                              handleInputChange(setConsultingRate)(val);
                            } else {
                              handleInputChange(setInternalLaborRate)(val);
                            }
                          }}
                          placeholder={rateType === "consulting" ? "85" : "e.g. 45"}
                          className="w-full h-11 rounded-xl border border-brand-border bg-brand-base px-3.5 text-sm font-semibold text-center tabular-nums text-brand-textPrimary placeholder:text-brand-textSecondary/70 placeholder:font-normal outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Item 4: Effective Working Weeks / Year * (80/20 grid layout) */}
                    <div className="p-4 rounded-2xl bg-brand-surface/60 border border-brand-border/70 grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(90px,1fr)] items-center gap-3">
                      <div className="space-y-0.5">
                        <label
                          htmlFor="roi-working-weeks"
                          className="text-body-sm font-medium text-brand-textPrimary block"
                        >
                          {t("roi.inputs.working_weeks")}{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <p className="text-[11px] text-brand-textSecondary leading-snug">
                          {t("roi.inputs.working_weeks_help")}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <input
                          id="roi-working-weeks"
                          type="number"
                          required
                          min="1"
                          max="52"
                          step="1"
                          value={workingWeeks}
                          onChange={(e) => handleInputChange(setWorkingWeeks)(e.target.value)}
                          placeholder="48"
                          className="w-full h-11 rounded-xl border border-brand-border bg-brand-base px-3.5 text-sm font-semibold text-center tabular-nums text-brand-textPrimary placeholder:text-brand-textSecondary/70 placeholder:font-normal outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>

                    {/* Item 5: Regional Market Context (Optional) - Block Presentation */}
                    <div className="space-y-2 p-4 rounded-2xl bg-brand-surface/60 border border-brand-border/70">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label
                          htmlFor="roi-region"
                          className="text-xs font-mono font-medium text-brand-textPrimary block"
                        >
                          {t("roi.inputs.region_label")}
                        </label>
                        <span className="text-[11px] font-sans text-brand-textSecondary">
                          {REGIONAL_CONTEXTS[region]?.name}
                        </span>
                      </div>
                      <select
                        id="roi-region"
                        value={region}
                        onChange={(e) => handleInputChange(setRegion)(e.target.value)}
                        className="w-full rounded-xl border border-brand-border bg-brand-base px-3.5 py-2.5 text-body-sm font-medium text-brand-textPrimary outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      >
                        <option value="global">{t("roi.inputs.region_global")}</option>
                        <option value="dach">{t("roi.inputs.region_dach")}</option>
                        <option value="it">{t("roi.inputs.region_it")}</option>
                        <option value="uk">{t("roi.inputs.region_uk")}</option>
                      </select>
                      <p className="text-[11px] text-brand-textSecondary leading-relaxed pt-0.5">
                        {t("roi.inputs.region_help")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* --------------------------------------------------- */}
                {/* Item 6: Diagnostic Assessment (Collapsible Accordion) */}
                {/* --------------------------------------------------- */}
                <div className="rounded-2xl border border-brand-border bg-brand-surface/40 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdvanced((prev) => {
                        const next = !prev;
                        if (next && advSearchHours === "0") {
                          setAdvSearchHours(searchHours);
                        }
                        return next;
                      });
                      if (verificationResult) setVerificationResult(null);
                    }}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-brand-surface transition"
                    aria-expanded={showAdvanced}
                  >
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary flex items-center gap-2">
                      {showAdvanced ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          <span>{t("roi.advanced.toggle_close")}</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span>{t("roi.advanced.toggle_open")}</span>
                        </>
                      )}
                    </span>
                    <span className="text-[11px] font-mono text-brand-textSecondary">
                      {showAdvanced ? "Active (Zero Double-Counting)" : "Optional Granularity"}
                    </span>
                  </button>

                  {showAdvanced && (
                    <div className="p-5 pt-3 border-t border-brand-border/70 space-y-3.5 animate-in fade-in duration-200">
                      <p className="text-caption text-brand-textSecondary leading-relaxed">
                        {t("roi.advanced.desc")}
                      </p>

                      <div className="space-y-3">
                        {/* Diagnostic Cat 1: Information Search & Retrieval (80/20 grid layout) */}
                        <div className="p-3.5 rounded-xl bg-brand-base border border-brand-border/70 grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(90px,1fr)] items-center gap-3">
                          <div className="space-y-0.5">
                            <label
                              htmlFor="roi-adv-search"
                              className="text-xs font-semibold text-brand-textPrimary block"
                            >
                              {t("roi.advanced.cat_search_label")}
                            </label>
                            <p className="text-[10px] text-brand-textSecondary leading-snug">
                              {t("roi.advanced.cat_search_desc")}
                            </p>
                          </div>
                          <div className="flex justify-end">
                            <input
                              id="roi-adv-search"
                              type="number"
                              min="0"
                              max="35"
                              step="0.5"
                              value={advSearchHours}
                              onChange={(e) => handleInputChange(setAdvSearchHours)(e.target.value)}
                              className="w-full h-11 rounded-xl border border-brand-border bg-brand-surface px-3.5 text-sm font-semibold text-center tabular-nums text-brand-textPrimary outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>

                        {/* Diagnostic Cat 2: Manual Data Entry & Transfer (80/20 grid layout) */}
                        <div className="p-3.5 rounded-xl bg-brand-base border border-brand-border/70 grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(90px,1fr)] items-center gap-3">
                          <div className="space-y-0.5">
                            <label
                              htmlFor="roi-adv-entry"
                              className="text-xs font-semibold text-brand-textPrimary block"
                            >
                              {t("roi.advanced.cat_entry_label")}
                            </label>
                            <p className="text-[10px] text-brand-textSecondary leading-snug">
                              {t("roi.advanced.cat_entry_desc")}
                            </p>
                          </div>
                          <div className="flex justify-end">
                            <input
                              id="roi-adv-entry"
                              type="number"
                              min="0"
                              max="35"
                              step="0.5"
                              value={advManualEntryHours}
                              onChange={(e) => handleInputChange(setAdvManualEntryHours)(e.target.value)}
                              className="w-full h-11 rounded-xl border border-brand-border bg-brand-surface px-3.5 text-sm font-semibold text-center tabular-nums text-brand-textPrimary outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>

                        {/* Diagnostic Cat 3: Discipline-Specific BIM Workflows (80/20 grid layout) */}
                        <div className="p-3.5 rounded-xl bg-brand-base border border-brand-border/70 grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(90px,1fr)] items-center gap-3">
                          <div className="space-y-0.5">
                            <label
                              htmlFor="roi-adv-discipline"
                              className="text-xs font-semibold text-brand-textPrimary block"
                            >
                              {t("roi.advanced.cat_discipline_label")}
                            </label>
                            <p className="text-[10px] text-brand-textSecondary leading-snug">
                              {t("roi.advanced.cat_discipline_desc")}
                            </p>
                          </div>
                          <div className="flex justify-end">
                            <input
                              id="roi-adv-discipline"
                              type="number"
                              min="0"
                              max="35"
                              step="0.5"
                              value={advDisciplineHours}
                              onChange={(e) => handleInputChange(setAdvDisciplineHours)(e.target.value)}
                              className="w-full h-11 rounded-xl border border-brand-border bg-brand-surface px-3.5 text-sm font-semibold text-center tabular-nums text-brand-textPrimary outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>

                        {/* Diagnostic Cat 4: Non-Automatable Engineering Judgment (80/20 grid layout) */}
                        <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(90px,1fr)] items-center gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <label
                                htmlFor="roi-adv-judgment"
                                className="text-xs font-semibold text-brand-textPrimary block"
                              >
                                {t("roi.advanced.cat_judgment_label")}
                              </label>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase">
                                {t("roi.advanced.protected_badge")}
                              </span>
                            </div>
                            <p className="text-[10px] text-brand-textSecondary leading-snug">
                              {t("roi.advanced.cat_judgment_desc")}
                            </p>
                          </div>
                          <div className="flex justify-end">
                            <input
                              id="roi-adv-judgment"
                              type="number"
                              min="0"
                              max="40"
                              step="0.5"
                              value={advJudgmentHours}
                              onChange={(e) => handleInputChange(setAdvJudgmentHours)(e.target.value)}
                              className="w-full h-11 rounded-xl border border-blue-500/30 bg-brand-surface px-3.5 text-sm font-semibold text-center tabular-nums text-brand-textPrimary outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-brand-base border border-brand-border/70 text-[11px] text-brand-textSecondary flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                        <div>
                          <span>
                            {t("roi.advanced.reconciliation_note")}
                          </span>
                          <span className="block text-[10px] text-brand-textSecondary/80 mt-1">
                            {t("roi.advanced.overlap_warning")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* --------------------------------------------------- */}
                {/* GROUP 03: Enterprise Eligibility & Verification     */}
                {/* --------------------------------------------------- */}
                <div>
                  <div className="pb-3 mb-4 border-b border-brand-border/70">
                    <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                      {t("roi.access.group_title")}
                    </h3>
                    <p className="text-xs text-brand-textSecondary mt-0.5">
                      {t("roi.access.subtitle")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Field 05: Full Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="roi-client-name"
                          className="text-body-sm font-medium text-brand-textPrimary block"
                        >
                          {t("roi.access.name")} <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          id="roi-client-name"
                          type="text"
                          required
                          value={businessIdentity.name}
                          onChange={(e) => updateIdentity("name", e.target.value)}
                          placeholder={t("roi.access.name_ph")}
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>

                      {/* Field 06: Company Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="roi-client-company"
                          className="text-body-sm font-medium text-brand-textPrimary block"
                        >
                          {t("roi.access.company")} <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          id="roi-client-company"
                          type="text"
                          required
                          value={businessIdentity.companyName}
                          onChange={(e) => updateIdentity("companyName", e.target.value)}
                          placeholder={t("roi.access.company_ph")}
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>
                    </div>

                    {/* Field 07: Corporate Email Address */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="roi-client-email"
                        className="text-body-sm font-medium text-brand-textPrimary block"
                      >
                        {t("roi.access.email")} <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        id="roi-client-email"
                        type="email"
                        required
                        value={businessIdentity.email}
                        onChange={(e) => updateIdentity("email", e.target.value)}
                        placeholder={t("roi.access.email_ph")}
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
                      <p className="text-[11px] text-brand-textSecondary pt-0.5">
                        {t("roi.access.email_guidance")}
                      </p>
                    </div>

                    {/* Cloudflare Turnstile Human Verification Widget */}
                    <div className="pt-2">
                      <TurnstileWidget
                        ref={turnstileRef}
                        action="roi_matrix"
                        onVerify={(token) => setTurnstileToken(token)}
                        onError={() => setTurnstileToken("")}
                        onExpire={() => setTurnstileToken("")}
                        className="flex justify-start"
                      />
                    </div>

                    {/* Privacy Consent Checkbox */}
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="roi-privacy-consent"
                        checked={businessIdentity.privacyAccepted}
                        onChange={(e) => updateIdentity("privacyAccepted", e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-brand-border bg-brand-surface text-brand-primary focus:ring-brand-primary cursor-pointer"
                      />
                      <label
                        htmlFor="roi-privacy-consent"
                        className="text-caption text-brand-textSecondary leading-normal cursor-pointer select-none"
                      >
                        {t("forms.accept.part1")}{" "}
                        <Link
                          href="/privacy-policy"
                          className="text-brand-primary font-semibold hover:underline"
                        >
                          {t("forms.accept.privacy")}
                        </Link>{" "}
                        {t("forms.accept.part2")}{" "}
                        <Link
                          href="/terms-and-conditions"
                          className="text-brand-primary font-semibold hover:underline"
                        >
                          {t("forms.accept.terms")}
                        </Link>
                        .
                      </label>
                    </div>

                    {/* In-Form Privacy & Data Processing Disclosure */}
                    <p className="text-[11px] text-brand-textSecondary leading-relaxed px-1">
                      {t("roi.access.privacy_disclosure")}
                    </p>

                    {/* Verification Result Display */}
                    {verificationResult && (
                      <div
                        className={`p-4 rounded-2xl border flex flex-col gap-2 text-body-sm ${
                          verificationResult.ok
                            ? "bg-emerald-500/10 border-emerald-500/25 text-brand-textPrimary"
                            : "bg-red-500/10 border-red-500/25 text-red-700 dark:text-red-400"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {verificationResult.ok ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <strong className="block font-semibold">
                              {verificationResult.ok
                                ? (t("roi.access.eligible_title"))
                                : t("roi.access.verification_notice_title")}
                            </strong>
                            <p className="text-xs text-brand-textSecondary mt-1 leading-relaxed">
                              {verificationResult.ok
                                ? (t("roi.access.eligible_desc"))
                                : verificationResult.error}
                            </p>
                          </div>
                        </div>

                        {verificationResult.ok && verificationResult.data && (
                          <div className="mt-2 pt-2 border-t border-emerald-500/20 text-xs font-mono space-y-1.5">
                            <div className="flex items-center justify-between text-brand-textSecondary">
                              <span>{t("roi.access.reference_id")}:</span>
                              <span className="font-bold text-brand-primary">
                                {verificationResult.data.referenceId}
                              </span>
                            </div>
                            <p className="text-[11px] font-sans text-brand-textSecondary leading-snug">
                              {t("roi.access.stateless_notice")}
                            </p>
                            {verificationResult.downloadTriggered && (
                              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-sans text-emerald-900 dark:text-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <span className="flex items-center gap-1.5">
                                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <strong>{t("roi.access.export_initiated_prefix")}</strong> {verificationResult.fileName}
                                </span>
                                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono">
                                  {t("roi.access.contract_badge")}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pill Primary CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="group inline-flex items-center justify-center w-full min-h-[48px] sm:min-h-[52px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold normal-case text-body-sm tracking-normal text-brand-actionOnPrimary bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover shadow-md shadow-brand-actionPrimary/20 hover:shadow-lg hover:shadow-brand-actionPrimary/30 active:scale-[0.99] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-actionPrimary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-brand-base disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        <span>
                          {loading
                            ? (t("roi.access.loading"))
                            : (t("roi.access.cta"))}
                        </span>
                        {loading ? (
                          <div className="w-4 h-4 ml-2 border-2 border-brand-actionOnPrimary/30 border-t-brand-actionOnPrimary rounded-full animate-spin shrink-0" />
                        ) : (
                          <Download
                            className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-y-0.5 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
