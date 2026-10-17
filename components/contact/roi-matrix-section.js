"use client";

import { useState, useId, useMemo, useRef } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, CheckCircle2, AlertCircle, ExternalLink, ChevronDown, ChevronUp, ShieldCheck, Info, Lock, Download, FileSpreadsheet } from "lucide-react";
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
        error: t("roi.validation.required_fields") || "Please complete all required fields before submitting.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessIdentity.email.trim())) {
      setVerificationResult({
        ok: false,
        error: t("roi.validation.invalid_email") || "Please provide a valid corporate email address.",
      });
      return;
    }

    if (!businessIdentity.privacyAccepted) {
      setVerificationResult({
        ok: false,
        error: t("roi.validation.privacy_required") || "Please accept the Privacy Policy and Terms & Conditions to proceed.",
      });
      return;
    }

    // Turnstile check
    if (!turnstileToken) {
      setVerificationResult({
        ok: false,
        error: "Please complete the human security verification.",
      });
      return;
    }

    // 4. Server-side eligibility & MX verification check
    setLoading(true);

    try {
      // 1. Generate client idempotency key to prevent duplicate email alerts on double clicks
      let clientToken;
      try {
        clientToken = crypto.randomUUID().substring(0, 8).toUpperCase();
      } catch {
        clientToken = Date.now().toString(36).toUpperCase();
      }
      const idempotencyKey = `roi-export-${businessIdentity.email.trim().toLowerCase().split("@")[1] || "client"}-${clientToken}`;

      // 2. Server-side verification and Resend notification dispatch
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
          quickEstimate: quickValidation.sanitized,
          useAdvanced: showAdvanced,
          advancedAssessment: advancedValidation ? advancedValidation.sanitized : null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setVerificationResult({
          ok: false,
          error: data.error || "Eligibility verification could not be completed. Please check your domain and try again.",
        });
        if (turnstileRef.current?.reset) turnstileRef.current.reset();
        setTurnstileToken("");
      } else {
        // 3. Client-side lazy load ExcelJS and build the English protected 4-worksheet workbook
        try {
          const ExcelJSModule = await import("exceljs");
          const ExcelJS = ExcelJSModule.default || ExcelJSModule;
          const { buildRoiWorkbook } = await import("@/lib/roi/roiWorkbookBuilder");

          const workbook = await buildRoiWorkbook(ExcelJS, {
            userName: businessIdentity.name.trim(),
            companyName: businessIdentity.companyName.trim(),
            referenceId: data.referenceId,
            modelerCount: data.sanitizedInputs?.modelerCount || quickValidation.sanitized.modelerCount,
            hourlyRate: data.sanitizedInputs?.hourlyRate || quickValidation.sanitized.hourlyRate,
            isRateCustom: data.sanitizedInputs?.isRateCustom || quickValidation.sanitized.isRateCustom,
            rateType: data.sanitizedInputs?.rateType || quickValidation.sanitized.rateType,
            workingWeeks: data.sanitizedInputs?.workingWeeks || quickValidation.sanitized.workingWeeks,
            useAdvanced: showAdvanced,
            advancedAssessment: advancedValidation ? advancedValidation.sanitized : null
          });

          // 4. Generate in-memory buffer and trigger direct browser download
          const buffer = await workbook.xlsx.writeBuffer();
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const safeCompanyFile = (businessIdentity.companyName.trim() || "pyBIM")
            .replace(/[^a-zA-Z0-9_-]/g, "_")
            .substring(0, 30);
          const fileName = `pyBIM-ROI-Matrix-${safeCompanyFile}.xlsx`;

          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => window.URL.revokeObjectURL(url), 2000);

          setVerificationResult({
            ok: true,
            downloadTriggered: true,
            fileName,
            data,
          });
        } catch (wbError) {
          console.error("[ROI WORKBOOK GENERATION FAILED]:", wbError);
          setVerificationResult({
            ok: false,
            error: "Eligibility verified, but browser spreadsheet construction failed. Please try again or contact support.",
          });
        }
      }
    } catch (_err) {
      setVerificationResult({
        ok: false,
        error: "Network error during eligibility verification. Please check your connection.",
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
              {t("roi.badge") || "// BIM AUTOMATION · ROI MATRIX"}
            </div>

            {/* Section H2 Headline */}
            <h2
              id={headingId}
              className="text-3xl sm:text-[34px] lg:text-section font-extrabold tracking-tight text-brand-textPrimary leading-[1.2] sm:leading-[1.2] lg:leading-[1.2] mb-5"
            >
              {t("roi.section.title") || "Estimate the Impact of BIM Automation."}
            </h2>

            {/* Introductory Lead */}
            <p className="text-[17px] sm:text-lead text-brand-textSecondary leading-relaxed mb-6">
              {t("roi.section.desc") ||
                "Explore how repetitive BIM workflows affect engineering capacity and operational costs, and assess the potential value of targeted automation."}
            </p>

            {/* Editorial Narrative */}
            <div className="space-y-4 mb-8 text-body-sm text-brand-textSecondary leading-relaxed">
              <p>
                <strong className="text-brand-textPrimary font-semibold">
                  {t("roi.narrative.problem_lead") || "The Problem:"}{" "}
                </strong>
                {t("roi.narrative.problem_desc") ||
                  "Manual coordination, repetitive data entry and fragmented BIM workflows consume valuable engineering time."}
              </p>

              <p>
                <strong className="text-brand-textPrimary font-semibold">
                  {t("roi.narrative.impact_lead") || "The Impact:"}{" "}
                </strong>
                {t("roi.narrative.impact_desc") ||
                  "Recurring operational tasks can reduce delivery capacity, increase coordination overhead and limit the time available for higher-value engineering work."}
              </p>

              <p>
                <strong className="text-brand-textPrimary font-semibold">
                  {t("roi.narrative.solution_lead") || "The Solution:"}{" "}
                </strong>
                {t("roi.narrative.solution_desc") ||
                  "Targeted automation using tools such as Revit scripting, Python and C# can streamline repetitive operations and support more consistent digital delivery."}
              </p>
            </div>

            {/* Clickable Autodesk Industry Reference Callout */}
            <div className="w-full p-5 rounded-2xl bg-brand-base border border-brand-border/90 shadow-xs mb-8">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
                  {t("roi.citation.title") || "Autodesk Industry Reference"}
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
                  <span>{t("roi.citation.primary_link") || "Primary Report"}</span>
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
                  <span>{t("roi.citation.blog_link") || "Autodesk Construction Blog"}</span>
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
                {t("roi.deliverables.title") || "What the Matrix Delivers"}
              </h3>
              <ul className="space-y-3.5 text-body-sm text-brand-textSecondary">
                <li className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-2 h-2 mt-2 rounded-full bg-brand-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <strong className="text-brand-textPrimary font-semibold">
                      {t("roi.deliverables.d1_title") || "Identify Operational Inefficiencies"}
                    </strong>
                    <span className="block text-body-sm text-brand-textSecondary leading-relaxed">
                      {t("roi.deliverables.d1_desc") ||
                        "Estimate how repetitive BIM tasks contribute to time and cost overhead."}
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
                      {t("roi.deliverables.d2_title") || "Explore Automation Scenarios"}
                    </strong>
                    <span className="block text-body-sm text-brand-textSecondary leading-relaxed">
                      {t("roi.deliverables.d2_desc") ||
                        "Compare conservative, expected and optimized adoption assumptions."}
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
                      {t("roi.deliverables.d3_title") || "Support Investment Decisions"}
                    </strong>
                    <span className="block text-body-sm text-brand-textSecondary leading-relaxed">
                      {t("roi.deliverables.d3_desc") ||
                        "Use structured financial estimates to inform conversations about automation priorities."}
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
                        {t("roi.inputs.group_title") || "Quick Estimate Parameters"}
                      </h3>
                      <p className="text-xs text-brand-textSecondary mt-0.5">
                        {t("roi.inputs.group_note") || "Baseline Model Variables"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field 01: Modeler Count */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="roi-modeler-count"
                        className="text-body-sm font-medium text-brand-textPrimary block"
                      >
                        {t("roi.inputs.modeler_count") || "Number of BIM Modelers / Engineers"}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
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
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>

                    {/* Field 02: Hourly Rate */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="roi-hourly-rate"
                          className="text-body-sm font-medium text-brand-textPrimary"
                        >
                          {rateType === "consulting"
                            ? (t("roi.inputs.hourly_rate_consulting_label") || "Illustrative Consulting Rate (€ / hour) (Optional)")
                            : (t("roi.inputs.hourly_rate_internal_label") || "Internal Loaded Labor Cost (€ / hour)")}{" "}
                          {rateType === "internal_labor" && <span className="text-brand-primary">*</span>}
                        </label>
                      </div>
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
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>

                    {/* Rate Type Selector & Distinction */}
                    <div className="sm:col-span-2 space-y-1.5 p-3.5 rounded-2xl bg-brand-surface/60 border border-brand-border/60">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono font-medium text-brand-textPrimary">
                          {t("roi.inputs.rate_type_label") || "Rate Classification:"}
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
                            {t("roi.inputs.rate_type_consulting") || "Illustrative Consulting Rate"}
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
                            {t("roi.inputs.rate_type_internal") || "Internal Loaded Labor Cost"}
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-brand-textSecondary leading-relaxed pt-1">
                        {rateType === "consulting"
                          ? (t("roi.inputs.hourly_rate_help") ||
                            "Optional illustrative consulting baseline (€85/h example). Valuates capacity at external market billing potential. Leave blank to use the €85/h example, or enter your organization's custom billing rate.")
                          : (t("roi.inputs.hourly_rate_internal_help") ||
                            "Internal employee labor cost (gross salary + employer taxes + pensions + overheads). Please supply your actual internal loaded labor cost. Billing capacity potential and internal payroll savings are not aggregated.")}
                      </p>
                    </div>

                    {/* Field 03: Fixed Autodesk Search Hours Reference (Read-Only Benchmark) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="roi-search-hours-benchmark"
                          className="text-body-sm font-medium text-brand-textPrimary block"
                        >
                          {t("roi.inputs.hours_search_benchmark_label") || "Autodesk Reference (Fixed Benchmark)"}
                        </label>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary inline-flex items-center gap-1">
                          <Lock className="w-3 h-3" /> {t("roi.inputs.benchmark_locked") || "Fixed Benchmark"}
                        </span>
                      </div>
                      <div
                        id="roi-search-hours-benchmark"
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface/60 px-4 py-3 text-body-sm text-brand-textPrimary flex items-center justify-between cursor-not-allowed select-none"
                      >
                        <span className="font-mono font-bold text-brand-textPrimary">13 hrs / person / week</span>
                        <span className="text-xs text-brand-textSecondary font-sans">
                          {t("roi.inputs.search_finding_data") || "Locating project data"}
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-textSecondary leading-snug">
                        {t("roi.inputs.search_benchmark_desc") ||
                          "Autodesk 2025 study observation across construction roles. Fixed standard reference in the ROI scenario model."}
                      </p>
                    </div>

                    {/* Field 04: Working Weeks */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="roi-working-weeks"
                        className="text-body-sm font-medium text-brand-textPrimary block"
                      >
                        {t("roi.inputs.working_weeks") || "Effective Working Weeks / Year"}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
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
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
                      <p className="text-[11px] text-brand-textSecondary leading-snug">
                        {t("roi.inputs.working_weeks_help") ||
                          "Editable initial planning assumption (excluding leave and holidays), not a statutory standard."}
                      </p>
                    </div>

                    {/* Optional Regional Context Benchmark Dropdown */}
                    <div className="sm:col-span-2 space-y-1.5 pt-1">
                      <label
                        htmlFor="roi-region"
                        className="text-xs font-mono font-medium text-brand-textPrimary flex items-center justify-between"
                      >
                        <span>{t("roi.inputs.region_label") || "Regional Market Context (Optional)"}</span>
                        <span className="text-[11px] font-sans text-brand-textSecondary">
                          {REGIONAL_CONTEXTS[region]?.name}
                        </span>
                      </label>
                      <select
                        id="roi-region"
                        value={region}
                        onChange={(e) => handleInputChange(setRegion)(e.target.value)}
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-2.5 text-body-sm text-brand-textPrimary outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      >
                        <option value="global">{t("roi.inputs.region_global") || "European / Global Baseline (Default)"}</option>
                        <option value="dach">{t("roi.inputs.region_dach") || "DACH (Germany, Austria, Switzerland)"}</option>
                        <option value="it">{t("roi.inputs.region_it") || "Italy (UNI 11337 / Public Procurement)"}</option>
                        <option value="uk">{t("roi.inputs.region_uk") || "UK / International Practice"}</option>
                      </select>
                      <p className="text-[11px] text-brand-textSecondary leading-snug">
                        {t("roi.inputs.region_help") ||
                          "Contextual baseline reference only. Selecting a region provides market context and will never overwrite your entered rate."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* --------------------------------------------------- */}
                {/* OPTIONAL: Advanced Workflow Assessment Accordion    */}
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
                          <span>{t("roi.advanced.toggle_close") || "Hide Advanced Workflow Assessment"}</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span>{t("roi.advanced.toggle_open") || "+ Show Advanced Workflow Assessment (Optional)"}</span>
                        </>
                      )}
                    </span>
                    <span className="text-[11px] font-mono text-brand-textSecondary">
                      {showAdvanced ? "Active (Zero Double-Counting)" : "Optional Granularity"}
                    </span>
                  </button>

                  {showAdvanced && (
                    <div className="p-5 pt-2 border-t border-brand-border/70 space-y-4 animate-in fade-in duration-200">
                      <p className="text-caption text-brand-textSecondary leading-relaxed">
                        {t("roi.advanced.desc") ||
                          "Refine operational time allocation across 4 distinct categories. Categories 1–3 replace the high-level search figure to eliminate double-counting, while Category 4 protects non-automatable engineering judgment."}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Cat 1: Information Search & Retrieval */}
                        <div className="space-y-1">
                          <label
                            htmlFor="roi-adv-search"
                            className="text-xs font-semibold text-brand-textPrimary block"
                          >
                            {t("roi.advanced.cat_search_label") || "1. Information Search & Retrieval (hrs/wk)"}
                          </label>
                          <input
                            id="roi-adv-search"
                            type="number"
                            min="0"
                            max="35"
                            step="0.5"
                            value={advSearchHours}
                            onChange={(e) => handleInputChange(setAdvSearchHours)(e.target.value)}
                            className="w-full rounded-xl border border-brand-border bg-brand-base px-3 py-2 text-xs text-brand-textPrimary outline-none focus:border-brand-primary"
                          />
                          <p className="text-[10px] text-brand-textSecondary">
                            {t("roi.advanced.cat_search_desc") || "Locating drawings, querying models, verifying revisions across CDEs."}
                          </p>
                        </div>

                        {/* Cat 2: Manual Data Entry & Transfer */}
                        <div className="space-y-1">
                          <label
                            htmlFor="roi-adv-entry"
                            className="text-xs font-semibold text-brand-textPrimary block"
                          >
                            {t("roi.advanced.cat_entry_label") || "2. Manual Data Entry & Transfer (hrs/wk)"}
                          </label>
                          <input
                            id="roi-adv-entry"
                            type="number"
                            min="0"
                            max="35"
                            step="0.5"
                            value={advManualEntryHours}
                            onChange={(e) => handleInputChange(setAdvManualEntryHours)(e.target.value)}
                            className="w-full rounded-xl border border-brand-border bg-brand-base px-3 py-2 text-xs text-brand-textPrimary outline-none focus:border-brand-primary"
                          />
                          <p className="text-[10px] text-brand-textSecondary">
                            {t("roi.advanced.cat_entry_desc") || "Parameter population, schedule editing, manual title block and sheet updates."}
                          </p>
                        </div>

                        {/* Cat 3: Discipline-Specific BIM Workflows */}
                        <div className="space-y-1">
                          <label
                            htmlFor="roi-adv-discipline"
                            className="text-xs font-semibold text-brand-textPrimary block"
                          >
                            {t("roi.advanced.cat_discipline_label") || "3. Discipline-Specific Workflows (hrs/wk)"}
                          </label>
                          <input
                            id="roi-adv-discipline"
                            type="number"
                            min="0"
                            max="35"
                            step="0.5"
                            value={advDisciplineHours}
                            onChange={(e) => handleInputChange(setAdvDisciplineHours)(e.target.value)}
                            className="w-full rounded-xl border border-brand-border bg-brand-base px-3 py-2 text-xs text-brand-textPrimary outline-none focus:border-brand-primary"
                          />
                          <p className="text-[10px] text-brand-textSecondary">
                            {t("roi.advanced.cat_discipline_desc") || "Clash grouping and triage, QTO exports, IFC property audits."}
                          </p>
                        </div>

                        {/* Cat 4: Non-Automatable Engineering Judgment */}
                        <div className="space-y-1 p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/20">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <label
                              htmlFor="roi-adv-judgment"
                              className="text-xs font-semibold text-brand-textPrimary block"
                            >
                              {t("roi.advanced.cat_judgment_label") || "4. Engineering Judgment (hrs/wk)"}
                            </label>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase">
                              Protected
                            </span>
                          </div>
                          <input
                            id="roi-adv-judgment"
                            type="number"
                            min="0"
                            max="40"
                            step="0.5"
                            value={advJudgmentHours}
                            onChange={(e) => handleInputChange(setAdvJudgmentHours)(e.target.value)}
                            className="w-full rounded-xl border border-blue-500/30 bg-brand-base px-3 py-2 text-xs text-brand-textPrimary outline-none focus:border-brand-primary"
                          />
                          <p className="text-[10px] text-brand-textSecondary">
                            {t("roi.advanced.cat_judgment_desc") ||
                              "Design logic, structural review, client advisory. Preserved and excluded from automation recovery."}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-brand-base border border-brand-border/70 text-[11px] text-brand-textSecondary flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                        <div>
                          <span>
                            {t("roi.advanced.reconciliation_note") ||
                              "Reconciliation Active: Weekly repetitive hours for automation preview are calculated as (1 + 2 + 3). Category 4 is protected."}
                          </span>
                          <span className="block text-[10px] text-brand-textSecondary/80 mt-1">
                            {t("roi.advanced.overlap_warning") ||
                              "Note: The 60-hour/week cap acts as a structural sanity check against impossible individual weekly totals, but does not by itself guarantee absence of semantic overlap. Please ensure tasks are distinctly categorized."}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* --------------------------------------------------- */}
                {/* GROUP 02: Dynamic Interactive Results Preview       */}
                {/* --------------------------------------------------- */}
                {previewData.isValid ? (
                  <div className="rounded-2xl bg-brand-surface/70 border border-brand-border/80 p-5 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                          {t("roi.preview.group_title") || "Interactive Capacity & Value Preview"}
                        </h3>
                        <p className="text-xs text-brand-textSecondary">
                          {t("roi.preview.status_note") || "Hypothetical scenario modeling (unapproved placeholders pending owner review)"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-brand-textPrimary block">
                          {previewData.baseline.annualRepetitiveHoursTeam.toLocaleString()} {t("roi.preview.hours_unit") || "hrs/yr"}
                        </span>
                        <span className="text-[10px] text-brand-textSecondary block">
                          {t("roi.preview.annual_repetitive_title") || "Repetitive Allocation"}
                        </span>
                      </div>
                    </div>

                    {/* Five Fixed AI Adoption Scenarios (20%, 40%, 60%, 80%, 100%) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                      {Object.values(previewData.scenarios).map((scenario) => {
                        const isHighest = scenario.adoptionRate === 1.0;
                        return (
                          <div
                            key={scenario.id}
                            className={`p-3 rounded-2xl bg-brand-cardElevated border text-center flex flex-col justify-between transition ${
                              isHighest
                                ? "border-brand-primary/60 shadow-xs"
                                : "border-brand-border/80"
                            }`}
                          >
                            <div>
                              <span className="text-[11px] font-mono font-bold text-brand-textPrimary uppercase tracking-wider block mb-0.5">
                                {scenario.percentageLabel} {t("roi.preview.adoption_suffix") || "AI Adoption"}
                              </span>
                              <span className="text-[9px] font-mono text-brand-primary/90 font-medium block">
                                {t("roi.preview.verification_retained") || "10% Verification Retained"}
                              </span>
                            </div>
                            <div className="my-2">
                              <span className="text-base font-bold font-mono text-brand-textPrimary block leading-tight">
                                +{scenario.annualRecoveredHours.toLocaleString()} hrs
                              </span>
                              <span className="text-xs font-bold text-brand-primary block pt-0.5">
                                €{scenario.annualIllustrativeValue.toLocaleString()} / yr
                              </span>
                            </div>
                            <span className="text-[10px] text-brand-textSecondary block">
                              ~{scenario.weeklyRecoveredHoursPerPerson} hrs/wk/person
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-brand-border/60">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand-primary font-semibold">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>{previewData.baseline.valuationTypeLabel}</span>
                      </div>
                      <p className="text-[11px] text-brand-textSecondary leading-relaxed">
                        <strong>{t("roi.preview.verification_note_title") || "Engineering Verification Allowance (10%)"}:</strong>{" "}
                        {previewData.verificationAllowanceNotice}
                      </p>
                      <p className="text-[11px] text-brand-textSecondary leading-relaxed">
                        {previewData.disclaimer}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-brand-surface/70 border border-brand-border/80 p-5 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-brand-border/60">
                      <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                        {t("roi.preview.group_title") || "Interactive Capacity & Value Preview"}
                      </h3>
                      <span className="text-xs font-mono text-amber-600 dark:text-amber-400">
                        {t("roi.preview.status_paused") || "Inputs Required"}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-body-sm text-brand-textPrimary flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold">
                          {t("roi.preview.paused_title") || "Calculation Preview Paused"}
                        </strong>
                        <p className="text-xs text-brand-textSecondary mt-1 leading-relaxed">
                          {rateType === "internal_labor" && !activeRateStr.trim()
                            ? (t("roi.preview.paused_internal_rate") || "Please enter your internal loaded labor cost (€ / hour) to calculate scenario estimates.")
                            : (t("roi.preview.paused_desc") || "Please provide valid operational inputs above (at least 1 modeler, valid positive rate if custom, valid working weeks) to calculate illustrative scenarios.")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* --------------------------------------------------- */}
                {/* GROUP 03: Enterprise Eligibility & Verification     */}
                {/* --------------------------------------------------- */}
                <div>
                  <div className="pb-3 mb-4 border-b border-brand-border/70">
                    <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                      {t("roi.access.group_title") || "Enterprise Eligibility & Verification"}
                    </h3>
                    <p className="text-xs text-brand-textSecondary mt-0.5">
                      {t("roi.access.subtitle") ||
                        "Verify corporate eligibility to authorize browser-side export (ROI-02)."}
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
                          {t("roi.access.name") || "Full Name"} <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          id="roi-client-name"
                          type="text"
                          required
                          value={businessIdentity.name}
                          onChange={(e) => updateIdentity("name", e.target.value)}
                          placeholder={t("roi.access.name_ph") || "Your full name"}
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>

                      {/* Field 06: Company Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="roi-client-company"
                          className="text-body-sm font-medium text-brand-textPrimary block"
                        >
                          {t("roi.access.company") || "Company Name"} <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          id="roi-client-company"
                          type="text"
                          required
                          value={businessIdentity.companyName}
                          onChange={(e) => updateIdentity("companyName", e.target.value)}
                          placeholder={t("roi.access.company_ph") || "Your company name"}
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
                        {t("roi.access.email") || "Corporate Email Address"} <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        id="roi-client-email"
                        type="email"
                        required
                        value={businessIdentity.email}
                        onChange={(e) => updateIdentity("email", e.target.value)}
                        placeholder={t("roi.access.email_ph") || "name@company.com"}
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
                      <p className="text-[11px] text-brand-textSecondary pt-0.5">
                        {t("roi.access.email_guidance") ||
                          "Corporate domains only. Public and disposable email providers are automatically restricted."}
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
                        {t("forms.accept.part1") || "I agree to the"}{" "}
                        <Link
                          href="/privacy-policy"
                          className="text-brand-primary font-semibold hover:underline"
                        >
                          {t("forms.accept.privacy") || "Privacy Policy"}
                        </Link>{" "}
                        {t("forms.accept.part2") || "and"}{" "}
                        <Link
                          href="/terms-and-conditions"
                          className="text-brand-primary font-semibold hover:underline"
                        >
                          {t("forms.accept.terms") || "Terms & Conditions"}
                        </Link>
                        .
                      </label>
                    </div>

                    {/* In-Form Privacy & Data Processing Disclosure */}
                    <p className="text-[11px] text-brand-textSecondary leading-relaxed px-1">
                      {t("roi.access.privacy_disclosure") ||
                        "Corporate verification notice: Submitted business contact details are processed to verify corporate eligibility and dispatch an internal lead notification to pyBIM Support (support@pybim.com). Domain MX checks verify mail-exchange routing but do not prove mailbox ownership. Submissions are not added to marketing lists and imply no unsolicited marketing opt-in."}
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
                                ? (t("roi.access.eligible_title") || "ROI Matrix (.xlsx) Generated Successfully")
                                : "Verification Notice"}
                            </strong>
                            <p className="text-xs text-brand-textSecondary mt-1 leading-relaxed">
                              {verificationResult.ok
                                ? (t("roi.access.eligible_desc") ||
                                  "Your browser download has been initiated. If the file did not appear automatically, please check your browser download manager. Unlocked cells can be edited in Microsoft Excel or compatible spreadsheet software to recalculate outputs dynamically.")
                                : verificationResult.error}
                            </p>
                          </div>
                        </div>

                        {verificationResult.ok && verificationResult.data && (
                          <div className="mt-2 pt-2 border-t border-emerald-500/20 text-xs font-mono space-y-1.5">
                            <div className="flex items-center justify-between text-brand-textSecondary">
                              <span>{t("roi.access.reference_id") || "Session Verification Reference (Non-Persistent)"}:</span>
                              <span className="font-bold text-brand-primary">
                                {verificationResult.data.referenceId}
                              </span>
                            </div>
                            <p className="text-[11px] font-sans text-brand-textSecondary leading-snug">
                              {t("roi.access.stateless_notice") ||
                                "Stateless verification receipt: Submissions are NOT durably stored or emailed to recipients. Client-side download gating is for UX guidance only and does not represent an access-controlled security barrier. File creation does not prove local filesystem save."}
                            </p>
                            {verificationResult.downloadTriggered && (
                              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-sans text-emerald-900 dark:text-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <span className="flex items-center gap-1.5">
                                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <strong>Export Initiated:</strong> {verificationResult.fileName}
                                </span>
                                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono">
                                  4 Worksheets • Protected English Contract
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
                            ? (t("roi.access.loading") || "Verifying Eligibility & Generating Workbook...")
                            : (t("roi.access.cta") || "Verify & Download ROI Matrix (.xlsx)")}
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
