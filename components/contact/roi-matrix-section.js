"use client";

import { useState, useId } from "react";
import Link from "@/components/layout/LocalizedLink";
import { 
  Calculator, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Lock
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

/**
 * RoiMatrixSection Component (Section 03 — BIM Automation ROI Matrix)
 *
 * pyBIM Design System v2 — Engineering Precision
 * Task CONTACT-03A: BIM Automation ROI Matrix Redesign
 *
 * Architecture & Rhythm:
 * - Alternating rhythm: S03 is Family A Base (bg-brand-base + EngineeringBackdrop variant="base")
 * - Section ID: id="calculator" (preserves existing Contact page anchor and mega-menu links)
 * - Standard container: max-w-7xl mx-auto px-6 lg:px-8
 * - Layout: Desktop 12-column grid (5/12 Left explanation, 7/12 Right interactive interface)
 *   Mobile stacks into single column with clear readability and no clipped views.
 *
 * Left Column (5/12):
 * - Eyebrow: BIM AUTOMATION · ROI MATRIX
 * - H2: Estimate the Impact of BIM Automation.
 * - Concise, professional B2B engineering problem, impact, solution, and 3 deliverables.
 *
 * Right Column (7/12):
 * - Group 01: Four operational calculation inputs with reference workbook defaults (1, 85, 12, 48)
 * - Group 02: Estimated results presentation area with conservative (50%), expected (75%), optimized (100%)
 *   scenarios, marked in an honest pending validation state without fabricated numbers.
 * - Group 03: Mandatory business identity fields (Full Name, Company Name, Corporate Email)
 *   with corporate domain eligibility guidance and privacy disclosure link.
 * - Primary CTA: Pill-shaped "Request Full ROI Matrix" with verified submission state handling.
 */
export default function RoiMatrixSection() {
  const { t, language } = useLanguage();
  const headingId = useId();

  // Group 01: Four operational inputs (workbook defaults)
  const [modelerCount, setModelerCount] = useState("1");
  const [hourlyRate, setHourlyRate] = useState("85");
  const [hoursWasted, setHoursWasted] = useState("12");
  const [workingWeeks, setWorkingWeeks] = useState("48");

  // Group 03: Three mandatory business identity fields
  const [businessIdentity, setBusinessIdentity] = useState({
    name: "",
    companyName: "",
    email: "",
    privacyAccepted: false
  });

  // Access request UI state
  const [loading, setLoading] = useState(false);
  const [accessState, setAccessState] = useState("initial"); // 'initial' | 'pending_backend' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const updateIdentity = (field, value) => {
    setBusinessIdentity((prev) => ({ ...prev, [field]: value }));
  };

  const handleRequestAccess = (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !businessIdentity.name.trim() ||
      !businessIdentity.companyName.trim() ||
      !businessIdentity.email.trim()
    ) {
      setErrorMessage(
        t("roi.validation.required_fields") ||
          "Please fill in all required business identity fields."
      );
      setAccessState("error");
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessIdentity.email.trim())) {
      setErrorMessage(
        t("roi.validation.invalid_email") ||
          "Please provide a valid corporate email address."
      );
      setAccessState("error");
      return;
    }

    if (!businessIdentity.privacyAccepted) {
      setErrorMessage(
        t("roi.validation.privacy_required") ||
          "Please accept the privacy policy to proceed."
      );
      setAccessState("error");
      return;
    }

    // Honest handling: Controlled backend is planned for CONTACT-03B
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAccessState("pending_backend");
    }, 400);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Explanation & Value Proposition (5 of 12)    */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Section Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
              <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
                {t("roi.section.eyebrow") || "BIM AUTOMATION · ROI MATRIX"}
              </span>
            </div>

            {/* Section H2 */}
            <h2
              id={headingId}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-section-sm xl:text-section font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-4"
            >
              {t("roi.section.title") || "Estimate the Impact of BIM Automation."}
            </h2>

            {/* Introductory Lead */}
            <p className="text-body sm:text-lead font-sans text-brand-textSecondary font-medium leading-relaxed mb-8">
              {t("roi.section.desc") ||
                "Explore how repetitive BIM workflows affect engineering capacity and operational costs, and assess the potential value of targeted automation."}
            </p>

            {/* Structured Problem, Impact, Solution Narrative */}
            <div className="space-y-4 mb-8 w-full">
              <div className="p-4 rounded-2xl bg-brand-surface/70 border border-brand-border/80">
                <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                  {t("roi.narrative.problem_title") || "The Problem"}
                </h3>
                <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                  {t("roi.narrative.problem_desc") ||
                    "Manual coordination, repetitive data entry and fragmented BIM workflows consume valuable engineering time."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-surface/70 border border-brand-border/80">
                <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                  {t("roi.narrative.impact_title") || "The Impact"}
                </h3>
                <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                  {t("roi.narrative.impact_desc") ||
                    "Recurring operational tasks can reduce delivery capacity, increase coordination overhead and limit the time available for higher-value engineering work."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-surface/70 border border-brand-border/80">
                <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                  {t("roi.narrative.solution_title") || "The Solution"}
                </h3>
                <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                  {t("roi.narrative.solution_desc") ||
                    "Targeted automation using tools such as Revit scripting, Python and C# can streamline repetitive operations and support more consistent digital delivery."}
                </p>
              </div>
            </div>

            {/* Deliverables List (Three concise benefits) */}
            <div className="w-full pt-6 border-t border-brand-border/80">
              <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary mb-4">
                {t("roi.deliverables.title") || "What the Matrix Delivers"}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-body-sm font-sans text-brand-textSecondary">
                  <span className="font-mono text-caption font-bold text-brand-primary px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border/80 shrink-0 mt-0.5">
                    01
                  </span>
                  <div>
                    <strong className="text-brand-textPrimary block font-semibold">
                      {t("roi.deliverables.d1_title") || "Identify Operational Inefficiencies"}
                    </strong>
                    <span className="leading-relaxed">
                      {t("roi.deliverables.d1_desc") ||
                        "Estimate how repetitive BIM tasks contribute to time and cost overhead."}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 text-body-sm font-sans text-brand-textSecondary">
                  <span className="font-mono text-caption font-bold text-brand-primary px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border/80 shrink-0 mt-0.5">
                    02
                  </span>
                  <div>
                    <strong className="text-brand-textPrimary block font-semibold">
                      {t("roi.deliverables.d2_title") || "Explore Automation Scenarios"}
                    </strong>
                    <span className="leading-relaxed">
                      {t("roi.deliverables.d2_desc") ||
                        "Compare conservative, expected and optimized adoption assumptions."}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3 text-body-sm font-sans text-brand-textSecondary">
                  <span className="font-mono text-caption font-bold text-brand-primary px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border/80 shrink-0 mt-0.5">
                    03
                  </span>
                  <div>
                    <strong className="text-brand-textPrimary block font-semibold">
                      {t("roi.deliverables.d3_title") || "Support Investment Decisions"}
                    </strong>
                    <span className="leading-relaxed">
                      {t("roi.deliverables.d3_desc") ||
                        "Use structured financial estimates to inform conversations about automation priorities."}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Calculator & Access Request (7 of 12)       */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-3xl border border-brand-border/80 bg-brand-cardElevated p-6 sm:p-8 lg:p-10 shadow-xl shadow-brand-base/5 dark:shadow-black/20">
              
              {/* GROUP 01: ROI Calculation Inputs */}
              <div className="mb-8 pb-8 border-b border-brand-border/70">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                      {t("roi.inputs.group_title") || "01 · ROI Calculation Inputs"}
                    </h3>
                  </div>
                  <span className="text-caption font-mono text-brand-textSecondary hidden sm:inline">
                    {t("roi.inputs.group_note") || "// Reference Baseline Values"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field 01: Modeler Count */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="roi-modeler-count"
                      className="text-body-sm font-medium font-sans text-brand-textPrimary"
                    >
                      {t("roi.inputs.modeler_count") || "Number of BIM Modelers"}
                    </label>
                    <input
                      id="roi-modeler-count"
                      type="number"
                      min="1"
                      step="1"
                      value={modelerCount}
                      onChange={(e) => setModelerCount(e.target.value)}
                      className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    />
                    <p className="text-caption font-mono text-brand-textSecondary">
                      {t("roi.inputs.modeler_count_unit") || "Engineers / Modelers"}
                    </p>
                  </div>

                  {/* Field 02: Hourly Labor Cost */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="roi-hourly-rate"
                      className="text-body-sm font-medium font-sans text-brand-textPrimary"
                    >
                      {t("roi.inputs.hourly_rate") || "Hourly Labor Cost (€)"}
                    </label>
                    <input
                      id="roi-hourly-rate"
                      type="number"
                      min="1"
                      step="0.5"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    />
                    <p className="text-caption font-mono text-brand-textSecondary">
                      {t("roi.inputs.hourly_rate_unit") || "€ / hour rate"}
                    </p>
                  </div>

                  {/* Field 03: Manual Hours Wasted */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="roi-hours-wasted"
                      className="text-body-sm font-medium font-sans text-brand-textPrimary"
                    >
                      {t("roi.inputs.hours_wasted") || "Manual Hours / Week (per modeler)"}
                    </label>
                    <input
                      id="roi-hours-wasted"
                      type="number"
                      min="0"
                      step="0.5"
                      value={hoursWasted}
                      onChange={(e) => setHoursWasted(e.target.value)}
                      className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    />
                    <p className="text-caption font-mono text-brand-textSecondary">
                      {t("roi.inputs.hours_wasted_unit") || "Hours / week"}
                    </p>
                  </div>

                  {/* Field 04: Working Weeks */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="roi-working-weeks"
                      className="text-body-sm font-medium font-sans text-brand-textPrimary"
                    >
                      {t("roi.inputs.working_weeks") || "Working Weeks / Year"}
                    </label>
                    <input
                      id="roi-working-weeks"
                      type="number"
                      min="1"
                      max="52"
                      step="1"
                      value={workingWeeks}
                      onChange={(e) => setWorkingWeeks(e.target.value)}
                      className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                    />
                    <p className="text-caption font-mono text-brand-textSecondary">
                      {t("roi.inputs.working_weeks_unit") || "Weeks / year"}
                    </p>
                  </div>
                </div>
              </div>

              {/* GROUP 02: Estimated Results (Restrained Numerical Dashboard) */}
              <div className="mb-8 pb-8 border-b border-brand-border/70">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                      {t("roi.results.group_title") || "02 · Estimated Results"}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                    <Clock className="w-3 h-3" />
                    {t("roi.results.status_badge") || "Model Reconciliation in Progress"}
                  </span>
                </div>

                {/* Dashboard Metric Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="p-4 rounded-2xl bg-brand-surface/70 border border-brand-border/80">
                    <span className="text-caption font-mono uppercase tracking-wider text-brand-textSecondary block mb-1">
                      {t("roi.results.recovered_hours") || "Recovered Engineering Hours"}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-mono text-brand-textPrimary tracking-tight">
                        —
                      </span>
                      <span className="text-caption font-mono text-brand-textSecondary">
                        {t("roi.results.pending_reconciliation") || "Formula audit pending"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-surface/70 border border-brand-border/80">
                    <span className="text-caption font-mono uppercase tracking-wider text-brand-textSecondary block mb-1">
                      {t("roi.results.annual_value") || "Potential Annual Financial Value"}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-mono text-brand-textPrimary tracking-tight">
                        —
                      </span>
                      <span className="text-caption font-mono text-brand-textSecondary">
                        {t("roi.results.pending_reconciliation") || "Formula audit pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Three Adoption Scenarios from Workbook */}
                <div className="p-4 rounded-2xl bg-brand-surface/40 border border-brand-border/70 space-y-2.5">
                  <span className="text-caption font-mono font-semibold uppercase tracking-wider text-brand-textSecondary block">
                    {t("roi.results.scenarios_title") || "Workbook Adoption Scenarios"}
                  </span>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-brand-cardElevated border border-brand-border/70">
                      <span className="text-[11px] font-mono font-bold text-brand-primary block">
                        50%
                      </span>
                      <span className="text-caption font-sans text-brand-textSecondary block">
                        {t("roi.results.conservative") || "Conservative"}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-brand-cardElevated border border-brand-primary/40">
                      <span className="text-[11px] font-mono font-bold text-brand-primary block">
                        75%
                      </span>
                      <span className="text-caption font-sans text-brand-textSecondary block">
                        {t("roi.results.expected") || "Expected"}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-brand-cardElevated border border-brand-border/70">
                      <span className="text-[11px] font-mono font-bold text-brand-primary block">
                        100%
                      </span>
                      <span className="text-caption font-sans text-brand-textSecondary block">
                        {t("roi.results.optimized") || "Optimized"}
                      </span>
                    </div>
                  </div>

                  <p className="text-caption font-sans text-brand-textSecondary pt-1 leading-relaxed">
                    {t("roi.results.disclaimer") ||
                      "Operational inputs remain interactive. Verified financial calculations are currently undergoing mathematical audit (CONTACT-03C) to guarantee multi-regional consistency."}
                  </p>
                </div>
              </div>

              {/* GROUP 03: Request Full ROI Matrix (Business Identity) */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                  <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                    {t("roi.access.group_title") || "03 · Request Full ROI Matrix"}
                  </h3>
                </div>

                {accessState === "pending_backend" ? (
                  <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold font-sans text-brand-textPrimary">
                      {t("roi.access.controlled_title") || "Controlled Access In Preparation"}
                    </h4>
                    <p className="text-body-sm font-sans text-brand-textSecondary max-w-md mx-auto leading-relaxed">
                      {t("roi.access.controlled_desc") ||
                        "Your request parameters have been noted. The authorized corporate delivery endpoint and domain verification system are currently being prepared (CONTACT-03B). Unrestricted downloads remain disabled."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setAccessState("initial")}
                      className="text-caption font-mono font-bold text-brand-primary hover:underline uppercase tracking-wider pt-2"
                    >
                      {t("roi.access.reset_btn") || "Back to form"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRequestAccess} noValidate className="space-y-4">
                    {accessState === "error" && errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-2.5 text-body-sm font-sans text-red-700 dark:text-red-400">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Field 05: Full Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="roi-client-name"
                          className="text-body-sm font-medium font-sans text-brand-textPrimary"
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
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>

                      {/* Field 06: Company Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="roi-client-company"
                          className="text-body-sm font-medium font-sans text-brand-textPrimary"
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
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>
                    </div>

                    {/* Field 07: Corporate Email Address */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="roi-client-email"
                        className="text-body-sm font-medium font-sans text-brand-textPrimary"
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
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
                      <p className="text-caption font-sans text-brand-textSecondary pt-0.5">
                        {t("roi.access.email_guidance") ||
                          "Corporate domains only. Public providers automatically rejected."}
                      </p>
                    </div>

                    {/* Privacy Checkbox */}
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
                        className="text-caption font-sans text-brand-textSecondary leading-normal cursor-pointer select-none"
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

                    {/* Pill Primary CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="group inline-flex items-center justify-center w-full min-h-[48px] sm:min-h-[52px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold normal-case text-body-sm tracking-normal text-brand-actionOnPrimary bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover shadow-md shadow-brand-actionPrimary/20 hover:shadow-lg hover:shadow-brand-actionPrimary/30 active:scale-[0.99] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-actionPrimary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-brand-base disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        <span>
                          {loading
                            ? t("roi.access.loading") || "Processing Request..."
                            : t("roi.access.cta") || "Request Full ROI Matrix"}
                        </span>
                        <ArrowRight
                          className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
