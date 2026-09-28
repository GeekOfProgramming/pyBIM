"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, CheckCircle2, AlertCircle, ShieldAlert, Cpu, Lock, Sparkles, Server } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function PriorityQueueSection() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    architecture: "",
    teamScale: "",
    ecosystem: "",
    securityLevel: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [popup, setPopup] = useState(null);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to register application.");
      }

      setSuccessData(data.queueReference || "PYBIM-WAITLIST-CONFIRMED");
      setForm({
        name: "",
        companyName: "",
        email: "",
        phone: "",
        architecture: "",
        teamScale: "",
        ecosystem: "",
        securityLevel: "",
        notes: ""
      });
    } catch (err) {
      setPopup({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="priority-queue" className="scroll-mt-24 bg-brand-surface py-24 border-b border-brand-border relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Header & Cohort Status Banner */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {t("queue.badge")}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-textPrimary tracking-tight mb-6">
            {t("queue.title")}
          </h2>

          <p className="text-base md:text-lg text-brand-textSecondary font-medium leading-relaxed mb-8 max-w-3xl mx-auto">
            {t("queue.subtitle")}
          </p>

          {/* Dynamic Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="inline-flex items-center gap-2 bg-brand-card border border-brand-border px-4 py-2 rounded-xl shadow-sm">
              <span className="text-brand-textSecondary">{t("queue.status_label")}</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{t("queue.status_val")}</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-brand-card border border-brand-border px-4 py-2 rounded-xl shadow-sm">
              <span className="text-brand-textSecondary">{t("queue.cohort_label")}</span>
              <span className="font-bold text-brand-primary">{t("queue.cohort_val")}</span>
            </div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-card border-2 border-emerald-500/30 dark:border-emerald-500/20 p-8 md:p-12 shadow-2xl shadow-emerald-500/5 relative">
            
            {successData ? (
              <div className="text-center py-12 animate-in fade-in duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-brand-textPrimary mb-3">
                  {t("queue.success.title")}
                </h3>

                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl px-5 py-3 mb-6">
                  <span className="text-xs font-mono text-brand-textSecondary uppercase font-bold">
                    {t("queue.success.ticket_label")}
                  </span>
                  <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {successData}
                  </span>
                </div>

                <p className="text-base text-brand-textSecondary font-medium leading-relaxed max-w-xl mx-auto mb-8">
                  {t("queue.success.desc")}
                </p>

                <button
                  type="button"
                  onClick={() => setSuccessData(null)}
                  className="inline-flex items-center justify-center bg-brand-surface hover:bg-brand-card border border-brand-border text-brand-textPrimary px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                >
                  {t("queue.success.btn")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {t("queue.form.name")} <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("queue.form.name_ph")}
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3.5 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {t("queue.form.company")} <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("queue.form.company_ph")}
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3.5 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                {/* Row 2: Corporate Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {t("queue.form.email")} <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t("queue.form.email_ph")}
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3.5 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                    <p className="text-[11px] text-brand-textSecondary font-medium pl-1">
                      {t("queue.form.email_help")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {t("queue.form.phone")}
                    </label>
                    <input
                      type="tel"
                      placeholder={t("queue.form.phone_ph")}
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3.5 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800"
                    />
                  </div>
                </div>

                {/* Row 3: Target Architecture & Firm Scale */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {t("queue.form.architecture")} <span className="text-brand-primary">*</span>
                    </label>
                    <select
                      required
                      value={form.architecture}
                      onChange={(e) => updateField("architecture", e.target.value)}
                      className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3.5 text-sm text-brand-textPrimary outline-none transition focus:border-emerald-500"
                    >
                      <option value="">{t("queue.form.architecture_ph")}</option>
                      <option value="pyBIM Cloud Connect (Autodesk Revit Ribbon Add-in)">{t("queue.form.arch_opt1")}</option>
                      <option value="Sovereign Enterprise Edge AI (Air-Gapped Hardware Appliance)">{t("queue.form.arch_opt2")}</option>
                      <option value="Hybrid Deployment (Revit Cloud API + On-Premise Execution Node)">{t("queue.form.arch_opt3")}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {t("queue.form.scale")} <span className="text-brand-primary">*</span>
                    </label>
                    <select
                      required
                      value={form.teamScale}
                      onChange={(e) => updateField("teamScale", e.target.value)}
                      className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3.5 text-sm text-brand-textPrimary outline-none transition focus:border-emerald-500"
                    >
                      <option value="">{t("queue.form.scale_ph")}</option>
                      <option value="1 – 10 BIM Modelers / Engineers">{t("queue.form.scale_opt1")}</option>
                      <option value="11 – 50 BIM Modelers / Engineers">{t("queue.form.scale_opt2")}</option>
                      <option value="51 – 250 Enterprise Scale">{t("queue.form.scale_opt3")}</option>
                      <option value="250+ Tier-1 Multi-Office Firm">{t("queue.form.scale_opt4")}</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Primary Ecosystem & Security Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {t("queue.form.ecosystem")} <span className="text-brand-primary">*</span>
                    </label>
                    <select
                      required
                      value={form.ecosystem}
                      onChange={(e) => updateField("ecosystem", e.target.value)}
                      className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3.5 text-sm text-brand-textPrimary outline-none transition focus:border-emerald-500"
                    >
                      <option value="">{t("queue.form.ecosystem_ph")}</option>
                      <option value="Autodesk Revit (v2023 - 2026)">{t("queue.form.eco_opt1")}</option>
                      <option value="Autodesk Revit + Navisworks Manage">{t("queue.form.eco_opt2")}</option>
                      <option value="OpenBIM / IFC / Solibri Model Checker">{t("queue.form.eco_opt3")}</option>
                      <option value="Custom C# / Python Dynamo Add-in Environment">{t("queue.form.eco_opt4")}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {t("queue.form.security")} <span className="text-brand-primary">*</span>
                    </label>
                    <select
                      required
                      value={form.securityLevel}
                      onChange={(e) => updateField("securityLevel", e.target.value)}
                      className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3.5 text-sm text-brand-textPrimary outline-none transition focus:border-emerald-500"
                    >
                      <option value="">{t("queue.form.security_ph")}</option>
                      <option value="Standard Corporate NDA (Commercial Projects)">{t("queue.form.sec_opt1")}</option>
                      <option value="Strict ISO 19650 / National Public Tender Mandate (UNI 11337 / DIN)">{t("queue.form.sec_opt2")}</option>
                      <option value="100% Air-Gapped / Zero External Cloud (Classified / Defense)">{t("queue.form.sec_opt3")}</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Notes & Specific Bottlenecks */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                    {t("queue.form.notes")}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t("queue.form.notes_ph")}
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3.5 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 resize-y"
                  />
                </div>

                {/* Row 6: Privacy Policy */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="privacy-queue"
                    required
                    className="mt-1 w-4 h-4 rounded border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="privacy-queue" className="text-xs text-brand-textSecondary font-medium leading-relaxed">
                    {t("forms.accept.part1")}{" "}
                    <Link href="/privacy-policy" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                      {t("forms.accept.privacy")}
                    </Link>{" "}
                    {t("forms.accept.part2")}{" "}
                    <Link href="/terms-and-conditions" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                      {t("forms.accept.terms")}
                    </Link>{" "}
                    {t("forms.accept.part3")}
                  </label>
                </div>

                {/* Row 7: Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative flex items-center justify-center gap-3 rounded-2xl px-8 py-4 font-bold text-sm uppercase tracking-wider text-white transition-all duration-300 disabled:opacity-60 bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 hover:-translate-y-0.5 hover:shadow-emerald-600/40"
                  >
                    <span>
                      {loading ? t("queue.form.button_loading") : t("queue.form.button")}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <p className="text-center text-xs text-brand-textSecondary font-medium mt-3 italic">
                    {t("queue.form.microcopy")}
                  </p>
                </div>
              </form>
            )}

            {/* Error Popup */}
            {popup && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 text-left">
                <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl border border-brand-border dark:border-slate-800 text-center transform animate-in zoom-in-95 duration-200">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-8 w-8" />
                  </div>
                  
                  <h3 className="mb-2 text-2xl font-bold text-brand-textPrimary">
                    {t("contact.form.error_title")}
                  </h3>
                  
                  <p className="mb-8 text-base font-medium leading-relaxed text-brand-textSecondary text-center">
                    {popup.message}
                  </p>
                  
                  <button
                    type="button"
                    onClick={() => setPopup(null)}
                    className="w-full rounded-2xl px-6 py-4 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 bg-brand-primary hover:bg-brand-primaryHover"
                  >
                    {t("contact.form.got_it_btn")}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
