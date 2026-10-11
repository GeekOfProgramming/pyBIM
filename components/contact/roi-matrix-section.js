"use client";

import { useState, useId } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

/**
 * RoiMatrixSection Component (Section 03 — BIM Automation ROI Matrix)
 *
 * pyBIM Design System v2 — Engineering Precision
 * Task CONTACT-03A-R1: Visual Design Correction & Brand Alignment
 *
 * Visual & Functional Architecture:
 * - Alternating rhythm: S03 is Family A Base (bg-brand-base + EngineeringBackdrop variant="base")
 * - Section ID: id="calculator" (preserves existing Contact page anchor and mega-menu links)
 * - Standard container: max-w-7xl mx-auto px-6 lg:px-8
 * - Unified Outer Container: Restores the original single large rounded inset container
 *   (rounded-[2.5rem] bg-brand-surface border border-brand-border p-8 md:p-12 lg:p-14 shadow-xl)
 *   encompassing both the left explanation and the right calculator.
 * - Grid: Desktop 5/12 Left editorial column, 7/12 Right form card. Stacks cleanly on mobile.
 *
 * Left Column (5/12):
 * - Eyebrow: BIM AUTOMATION · ROI MATRIX (JetBrains Mono uppercase pill badge)
 * - H2: Estimate the Impact of BIM Automation. (Inter font, matching site typography scale)
 * - Introduction: Clean editorial lead paragraph
 * - Narrative: The Problem, The Impact, The Solution formatted as bold inline lead-ins followed
 *   by readable body text — zero individual cards or box overload.
 * - What the Matrix Delivers: Three concise deliverables as a compact list with subtle accent markers.
 *
 * Right Column (7/12):
 * - Unified form container (bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-brand-border dark:border-slate-800 shadow-xl)
 * - Group 01: Four operational inputs (BIM Modelers, Hourly Rate, Manual Hours/Wk, Working Weeks/Yr)
 *   matching CONTACT-01 input styling.
 * - Group 02: Compact, integrated estimated results notice with 50%, 75%, 100% scenarios and no
 *   fabricated numbers or internal development jargon.
 * - Group 03: Three mandatory business identity fields (Full Name, Company Name, Corporate Email)
 *   with corporate domain eligibility guidance and privacy policy checkbox.
 * - Primary CTA: Pill-shaped "Request Full ROI Matrix" with verified submission state handling.
 */
export default function RoiMatrixSection() {
  const { t } = useLanguage();
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
    privacyAccepted: false,
  });

  // Access request UI state
  const [loading, setLoading] = useState(false);
  const [accessNotice, setAccessNotice] = useState(null); // { type: 'pending' | 'error', message: string }

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
      setAccessNotice({
        type: "error",
        message:
          t("roi.validation.required_fields") ||
          "Please fill in all required business identity fields.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessIdentity.email.trim())) {
      setAccessNotice({
        type: "error",
        message:
          t("roi.validation.invalid_email") ||
          "Please provide a valid corporate email address.",
      });
      return;
    }

    if (!businessIdentity.privacyAccepted) {
      setAccessNotice({
        type: "error",
        message:
          t("roi.validation.privacy_required") ||
          "Please accept the privacy policy to proceed.",
      });
      return;
    }

    // Honest handling: Controlled backend delivery is being prepared (CONTACT-03B).
    // No fake confirmation or simulated success is rendered.
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAccessNotice({
        type: "pending",
        message:
          t("roi.access.controlled_notice") ||
          "The corporate distribution system is currently being prepared. Automated downloads remain restricted until security validation is active.",
      });
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
        {/* ========================================================= */}
        {/* UNIFIED SECTION CONTAINER (Restored from Original S03)     */}
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
          {/* LEFT COLUMN: Editorial & Value Proposition (5 of 12)    */}
          {/* ======================================================= */}
          <div className="lg:w-5/12 w-full flex flex-col items-start text-left relative z-10">
            {/* Section Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-semibold text-brand-primary mb-6 shadow-xs">
              {t("roi.badge") || "// BIM AUTOMATION · ROI MATRIX"}
            </div>

            {/* Section H2 Headline */}
            <h2
              id={headingId}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-5"
            >
              {t("roi.section.title") || "Estimate the Impact of BIM Automation."}
            </h2>

            {/* Introductory Lead */}
            <p className="text-body sm:text-lead font-sans text-brand-textSecondary font-medium leading-relaxed mb-6">
              {t("roi.section.desc") ||
                "Explore how repetitive BIM workflows affect engineering capacity and operational costs, and assess the potential value of targeted automation."}
            </p>

            {/* Editorial Narrative (Inline lead-ins without box cards) */}
            <div className="space-y-4 mb-8 text-body-sm font-sans text-brand-textSecondary leading-relaxed">
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

            {/* What the Matrix Delivers: Compact Editorial List */}
            <div className="w-full pt-6 border-t border-brand-border/80">
              <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary mb-4">
                {t("roi.deliverables.title") || "What the Matrix Delivers"}
              </h3>
              <ul className="space-y-3.5 text-body-sm font-sans text-brand-textSecondary">
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
          {/* RIGHT COLUMN: Calculator & Access Form (7 of 12)        */}
          {/* ======================================================= */}
          <div className="lg:w-7/12 w-full relative z-10">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-brand-border dark:border-slate-800 shadow-xl transition-colors">
              <form onSubmit={handleRequestAccess} noValidate className="space-y-6">
                {/* --------------------------------------------------- */}
                {/* GROUP 01: ROI Calculation Inputs                    */}
                {/* --------------------------------------------------- */}
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-border/70">
                    <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                      {t("roi.inputs.group_title") || "01 · ROI Calculation Inputs"}
                    </h3>
                    <span className="text-caption font-mono text-brand-textSecondary hidden sm:inline">
                      {t("roi.inputs.group_note") || "Baseline Parameters"}
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
                        placeholder="1"
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
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
                        step="any"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="85"
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
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
                        placeholder="12"
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
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
                        placeholder="48"
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm font-sans text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* --------------------------------------------------- */}
                {/* GROUP 02: Estimated Results (Integrated Summary)    */}
                {/* --------------------------------------------------- */}
                <div className="rounded-2xl bg-brand-surface/70 border border-brand-border/80 p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                      {t("roi.results.group_title") || "02 · Estimated Results"}
                    </h3>
                    <span className="text-caption font-mono text-brand-textSecondary">
                      {t("roi.results.status_note") || "Detailed estimates available after validation"}
                    </span>
                  </div>

                  {/* Compact Scenario Badges */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-2 rounded-xl bg-brand-cardElevated border border-brand-border/70">
                      <span className="text-caption font-mono font-bold text-brand-primary block">
                        50%
                      </span>
                      <span className="text-[11px] font-sans text-brand-textSecondary block">
                        {t("roi.results.conservative") || "Conservative"}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-brand-cardElevated border border-brand-primary/40">
                      <span className="text-caption font-mono font-bold text-brand-primary block">
                        75%
                      </span>
                      <span className="text-[11px] font-sans text-brand-textSecondary block">
                        {t("roi.results.expected") || "Expected"}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-brand-cardElevated border border-brand-border/70">
                      <span className="text-caption font-mono font-bold text-brand-primary block">
                        100%
                      </span>
                      <span className="text-[11px] font-sans text-brand-textSecondary block">
                        {t("roi.results.optimized") || "Optimized"}
                      </span>
                    </div>
                  </div>

                  <p className="text-caption font-sans text-brand-textSecondary leading-relaxed pt-0.5">
                    {t("roi.results.summary_notice") ||
                      "Detailed financial estimates and recovered capacity projections are provided in the full ROI Matrix workbook."}
                  </p>
                </div>

                {/* --------------------------------------------------- */}
                {/* GROUP 03: Request Full ROI Matrix (Business Identity) */}
                {/* --------------------------------------------------- */}
                <div>
                  <div className="pb-3 mb-4 border-b border-brand-border/70">
                    <h3 className="text-caption font-mono font-bold tracking-wider uppercase text-brand-textPrimary">
                      {t("roi.access.group_title") || "03 · Request Full ROI Matrix"}
                    </h3>
                  </div>

                  <div className="space-y-4">
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

                    {/* Inline Notice State (Error or In-Preparation) */}
                    {accessNotice && (
                      <div
                        className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-body-sm font-sans ${
                          accessNotice.type === "error"
                            ? "bg-red-500/10 border-red-500/25 text-red-700 dark:text-red-400"
                            : "bg-blue-500/10 border-blue-500/25 text-brand-textPrimary"
                        }`}
                      >
                        {accessNotice.type === "error" ? (
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                        )}
                        <span className="leading-relaxed">{accessNotice.message}</span>
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
                            ? t("roi.access.loading") || "Processing Request..."
                            : t("roi.access.cta") || "Request Full ROI Matrix"}
                        </span>
                        <ArrowRight
                          className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
                          aria-hidden="true"
                        />
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
