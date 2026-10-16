"use client";
import { useState, useEffect, useRef } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, CheckCircle2, AlertCircle, Check } from "lucide-react";
import DirectChannelsSection from "@/components/contact/direct-channels-section";
import FAQSection from "@/components/sections/faq-section";
import { useLanguage } from "@/lib/LanguageContext";
import RoiMatrixSection from "@/components/contact/roi-matrix-section";
import PriorityQueueSection from "@/components/sections/priority-queue-section";
import TurnstileWidget from "@/components/common/turnstile-widget";

import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

const serviceOptions = [
  { id: "bim_modeling", labelKey: "contact.form.service_opt1" },
  { id: "bim_coordination", labelKey: "contact.form.service_opt2" },
  { id: "bim_qa", labelKey: "contact.form.service_opt3" },
  { id: "revit_automation", labelKey: "contact.form.service_opt4" },
  { id: "computational_design", labelKey: "contact.form.service_opt5" },
  { id: "software_integrations", labelKey: "contact.form.service_opt6" },
  { id: "other", labelKey: "contact.form.service_opt7" },
];

const companySizeOptions = [
  { id: "size_1_5", labelKey: "contact.form.scale_opt1" },
  { id: "size_6_20", labelKey: "contact.form.scale_opt2" },
  { id: "size_21_50", labelKey: "contact.form.scale_opt3" },
  { id: "size_51_200", labelKey: "contact.form.scale_opt4" },
  { id: "size_201_plus", labelKey: "contact.form.scale_opt5" },
];

const engineeringDisciplines = [
  { id: "architecture", labelKey: "contact.form.discipline_arch" },
  { id: "structural", labelKey: "contact.form.discipline_struct" },
  { id: "mep", labelKey: "contact.form.discipline_mep" },
  { id: "infrastructure", labelKey: "contact.form.discipline_infra" },
];

export default function ContactPageLayout() {
  const { t } = useLanguage();
  const turnstileRef = useRef(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [form, setForm] = useState({ name: "", companyName: "", email: "", phone: "", service: "", teamScale: "", message: "", privacyAccepted: false });
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [disciplineError, setDisciplineError] = useState(false);
  const [otherScope, setOtherScope] = useState("");
  const [otherScopeError, setOtherScopeError] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const hash = window.location.hash;
        if (hash) {
          const id = hash.replace("#", "");
          const el = document.getElementById(id);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 150);
          }
        }
      };

      handleScroll();
      window.addEventListener("hashchange", handleScroll);
      return () => window.removeEventListener("hashchange", handleScroll);
    }
  }, []);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const handleServiceChange = (serviceId) => {
    setSelectedServiceId(serviceId);
    const opt = serviceOptions.find((o) => o.id === serviceId);
    updateField("service", opt ? t(opt.labelKey) : serviceId);

    if (serviceId !== "bim_modeling") {
      setSelectedDisciplines([]);
      setDisciplineError(false);
    }
    if (serviceId !== "other") {
      setOtherScope("");
      setOtherScopeError(false);
    }
  };

  const toggleDiscipline = (discId) => {
    setSelectedDisciplines((prev) => {
      const next = prev.includes(discId)
        ? prev.filter((id) => id !== discId)
        : [...prev, discId];
      if (next.length > 0) setDisciplineError(false);
      return next;
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.companyName.trim() || !form.email.trim() || !form.phone.trim() || !selectedServiceId || !form.teamScale || !form.message.trim()) {
      return;
    }

    if (!form.privacyAccepted) {
      setPrivacyError(true);
      return;
    }

    if (selectedServiceId === "bim_modeling" && selectedDisciplines.length === 0) {
      setDisciplineError(true);
      return;
    }

    if (selectedServiceId === "other" && !otherScope.trim()) {
      setOtherScopeError(true);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        disciplines: selectedDisciplines,
        otherScope: otherScope.trim(),
        turnstileToken
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || t("contact.form.error"));
      setPopup({ type: "success", message: t("contact.form.success") });
      setForm({ name: "", companyName: "", email: "", phone: "", service: "", teamScale: "", message: "", privacyAccepted: false });
      setSelectedServiceId("");
      setSelectedDisciplines([]);
      setDisciplineError(false);
      setOtherScope("");
      setOtherScopeError(false);
      setPrivacyError(false);
      setTurnstileToken("");
      if (turnstileRef.current) turnstileRef.current.reset();
    } catch (err) {
      setPopup({ type: "error", message: err.message });
      if (turnstileRef.current) turnstileRef.current.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-brand-base">
      {/* S01 HERO & PROJECT ENQUIRY FORM SECTION */}
      <section
        id="audit"
        className="relative w-full py-20 md:py-28 lg:py-32 bg-brand-base border-b border-brand-border overflow-hidden scroll-mt-28"
        aria-labelledby="contact-hero-heading"
      >
        {/* Family A Background */}
        <EngineeringBackdrop variant="base" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
            
            {/* LEFT COLUMN (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-caption font-mono font-bold tracking-wider text-brand-primary mb-6 shadow-xs self-start uppercase">
                <span>CONTACT <span className="normal-case">pyBIM</span> · PROJECT ENQUIRIES</span>
              </div>

              <h1 id="contact-hero-heading" className="text-4xl sm:text-[44px] lg:text-display font-extrabold text-brand-textPrimary tracking-tight mb-6 leading-[1.12] lg:leading-[1.14]">
                {t("contact.hero.title") || "Let's Discuss Your Next BIM Project."}
              </h1>

              <p className="text-[17px] sm:text-lead text-brand-textSecondary leading-relaxed mb-4">
                {t("contact.hero.subtitle") || "From BIM modeling and project delivery to engineering automation, start with a focused technical conversation."}
              </p>

              <p className="text-body text-brand-textSecondary leading-relaxed mb-8">
                {t("contact.section.desc1") || "Tell us about your project requirements, engineering disciplines, expected deliverables or software workflow challenges. We can review the scope and explore a suitable approach to collaboration."}
              </p>

              {/* Three Compact Engineering Capability Statements */}
              <div className="border-t border-brand-border/70 pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-body-sm font-medium text-brand-textPrimary">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                    <span>{t("contact.hero.capability1") || "BIM Modeling & Engineering Delivery"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-body-sm font-medium text-brand-textPrimary">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                    <span>{t("contact.hero.capability2") || "Revit Automation & Computational Design"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-body-sm font-medium text-brand-textPrimary">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                    <span>{t("contact.hero.capability3") || "Engineering Software & BIM Integrations"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (7 Columns) - Elevated Project Enquiry Form */}
            <div className="lg:col-span-7">
              <div id="project-enquiry" className="relative rounded-3xl bg-brand-cardElevated p-6 sm:p-8 lg:p-10 shadow-xl shadow-brand-base/5 dark:shadow-black/20 border border-brand-border/80 transition-colors scroll-mt-28">
                <div className="relative z-10">
                  <div className="mb-8">
                    <h2 className="text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary tracking-tight leading-[1.25] sm:leading-[1.25] lg:leading-[1.25] mb-2">
                      {t("contact.form.title") || "Project Enquiry Form"}
                    </h2>
                    <p className="text-body-sm text-brand-textSecondary leading-relaxed">
                      {t("contact.form.desc") || "Tell us about your project and our engineering team will get back to you with an initial technical assessment."}
                    </p>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    {/* Row 1: Full Name & Company Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name" className="text-body-sm font-medium text-brand-textPrimary">
                          {t("contact.form.name") || "Full Name"} <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder={t("contact.form.name_ph") || "e.g. John Doe"}
                          required
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contact-company" className="text-body-sm font-medium text-brand-textPrimary">
                          {t("contact.form.companyName") || "Company Name"} <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          value={form.companyName}
                          onChange={(e) => updateField("companyName", e.target.value)}
                          placeholder={t("contact.form.companyName_ph") || "e.g. Acme Engineering"}
                          required
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>
                    </div>

                    {/* Row 2: Corporate Email & Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="text-body-sm font-medium text-brand-textPrimary">
                          {t("contact.form.email") || "Corporate Email Address"} <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder={t("contact.form.email_ph") || "name@company.com"}
                          required
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        />
                        <p className="text-xs text-brand-textSecondary pl-1">
                          {t("contact.form.email_help") || "*Corporate domains only."}
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contact-phone" className="text-body-sm font-medium text-brand-textPrimary">
                          {t("contact.form.phone") || "Phone Number"} <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder={t("contact.form.phone_ph") || "+39 049 123 4567"}
                          required
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                        />
                      </div>
                    </div>

                    {/* Row 3: Service of Interest & Company Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-service" className="text-body-sm font-medium text-brand-textPrimary">
                          {t("contact.form.service") || "Service or Project Scope"} <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="contact-service"
                            value={selectedServiceId}
                            onChange={(e) => handleServiceChange(e.target.value)}
                            required
                            className={`w-full appearance-none rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 pr-10 text-body-sm text-brand-textPrimary outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary ${selectedServiceId ? '' : 'text-brand-textSecondary/70'}`}
                          >
                            <option value="" disabled hidden>{t("contact.form.service_ph") || "Select primary service or project scope..."}</option>
                            {serviceOptions.map((opt) => (
                              <option key={opt.id} value={opt.id} className="text-brand-textPrimary bg-brand-surface">
                                {t(opt.labelKey)}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-brand-textSecondary">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="contact-size" className="text-body-sm font-medium text-brand-textPrimary">
                          {t("contact.form.teamScale") || "Company Size"} <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="contact-size"
                            value={form.teamScale}
                            onChange={(e) => updateField("teamScale", e.target.value)}
                            required
                            className={`w-full appearance-none rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 pr-10 text-body-sm text-brand-textPrimary outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary ${form.teamScale ? '' : 'text-brand-textSecondary/70'}`}
                          >
                            <option value="" disabled hidden>{t("contact.form.teamScale_ph") || "Select company size..."}</option>
                            {companySizeOptions.map((opt) => (
                              <option key={opt.id} value={t(opt.labelKey)} className="text-brand-textPrimary bg-brand-surface">
                                {t(opt.labelKey)}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-brand-textSecondary">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CONDITIONAL ROW A: Engineering Discipline (Only when BIM Modeling selected) */}
                    {selectedServiceId === "bim_modeling" && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface/70 border border-brand-border transition-all">
                        <div className="mb-3">
                          <label className="text-body-sm font-semibold text-brand-textPrimary block">
                            {t("contact.form.disciplines_label") || "Engineering Discipline"} <span className="text-brand-primary">*</span>
                          </label>
                          <p className="text-xs text-brand-textSecondary">
                            {t("contact.form.disciplines_desc") || "Select one or more disciplines relevant to your project."}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {engineeringDisciplines.map((disc) => {
                            const isSelected = selectedDisciplines.includes(disc.id);
                            return (
                              <button
                                key={disc.id}
                                type="button"
                                role="checkbox"
                                aria-checked={isSelected}
                                onClick={() => toggleDiscipline(disc.id)}
                                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-body-sm font-medium transition-all text-center select-none ${
                                  isSelected
                                    ? "bg-brand-primary/10 border-brand-primary text-brand-primary font-semibold shadow-xs"
                                    : "bg-brand-surface border-brand-border text-brand-textSecondary hover:border-brand-primary/40 hover:text-brand-textPrimary"
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 text-brand-primary shrink-0" />}
                                <span>{t(disc.labelKey)}</span>
                              </button>
                            );
                          })}
                        </div>
                        {disciplineError && (
                          <p className="text-xs text-rose-500 font-medium mt-2">
                            {t("contact.form.discipline_error") || "Please select at least one engineering discipline."}
                          </p>
                        )}
                      </div>
                    )}

                    {/* CONDITIONAL ROW B: Other / Multidisciplinary Scope (Only when Other selected) */}
                    {selectedServiceId === "other" && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface/70 border border-brand-border transition-all space-y-1.5">
                        <label htmlFor="contact-other-scope" className="text-body-sm font-semibold text-brand-textPrimary block">
                          {t("contact.form.other_label") || "Please Specify Your Project Scope"} <span className="text-brand-primary">*</span>
                        </label>
                        <textarea
                          id="contact-other-scope"
                          rows={2}
                          value={otherScope}
                          onChange={(e) => {
                            setOtherScope(e.target.value);
                            if (otherScopeError && e.target.value.trim()) setOtherScopeError(false);
                          }}
                          placeholder={t("contact.form.other_ph") || "Describe the service, engineering discipline or combination of activities you need..."}
                          className="w-full rounded-xl border border-brand-border bg-brand-surface px-4 py-2.5 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-y"
                        />
                        {otherScopeError && (
                          <p className="text-xs text-rose-500 font-medium mt-1">
                            {t("contact.form.other_error") || "Please specify your project scope."}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Row 4: Project Scope & Requirements */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-body-sm font-medium text-brand-textPrimary">
                        {t("contact.form.message_label") || "Project Scope & Requirements"} <span className="text-brand-primary">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        placeholder={t("contact.form.message_ph") || "Briefly describe your project, relevant disciplines, expected deliverables, approximate scale and any relevant deadline."}
                        required
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-body-sm text-brand-textPrimary placeholder:text-brand-textSecondary/70 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-y min-h-[100px]"
                      />
                    </div>

                    {/* Row 5: Privacy Checkbox & Legal Links */}
                    <div className="flex flex-col gap-1 pt-1">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="privacy-contact"
                          checked={form.privacyAccepted}
                          onChange={(e) => {
                            updateField("privacyAccepted", e.target.checked);
                            if (e.target.checked) setPrivacyError(false);
                          }}
                          required
                          className="mt-1 w-4 h-4 rounded border-brand-border bg-brand-surface text-brand-primary focus:ring-brand-primary cursor-pointer"
                        />
                        <label htmlFor="privacy-contact" className="text-xs text-brand-textSecondary font-medium leading-normal cursor-pointer select-none">
                          {t("forms.accept.part1")}{" "}
                          <Link href="/privacy-policy" className="text-brand-primary font-bold hover:underline">
                            {t("forms.accept.privacy")}
                          </Link>{" "}
                          {t("forms.accept.part2")}{" "}
                          <Link href="/terms-and-conditions" className="text-brand-primary font-bold hover:underline">
                            {t("forms.accept.terms")}
                          </Link>{" "}
                          {t("forms.accept.part3")}
                        </label>
                      </div>
                      {privacyError && (
                        <p className="text-xs text-rose-500 font-medium pl-7">
                          {t("forms.error.privacy_required") || "You must accept the Privacy Policy and Terms to proceed."}
                        </p>
                      )}
                    </div>

                    {/* Row 5.5: Cloudflare Turnstile Verification */}
                    <div className="py-1">
                      <TurnstileWidget
                        ref={turnstileRef}
                        action="contact"
                        onVerify={(token) => setTurnstileToken(token)}
                        onExpire={() => setTurnstileToken("")}
                        onError={() => setTurnstileToken("")}
                      />
                    </div>

                    {/* Row 6: Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full min-h-[48px] sm:min-h-[52px] px-6 py-3.5 rounded-full bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-brand-actionOnPrimary text-body-sm font-semibold tracking-normal shadow-md shadow-brand-actionPrimary/20 hover:shadow-lg hover:shadow-brand-actionPrimary/30 transition-all active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-actionPrimary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-brand-base"
                      >
                        <span>{loading ? (t("contact.form.sending") || "Sending...") : (t("contact.form.button") || "Send Project Enquiry")}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>

                  {popup && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
                      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl border border-brand-border dark:border-slate-800 text-center transform animate-in zoom-in-95 duration-200">
                        <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${popup.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'}`}>
                          {popup.type === 'success' ? <CheckCircle2 className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
                        </div>
                        
                        <h3 className="mb-2 text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary tracking-tight leading-[1.25]">
                          {popup.type === 'success' ? t("contact.form.success_title") : t("contact.form.error_title")}
                        </h3>
                        
                        <p className="mb-8 text-body text-brand-textSecondary leading-relaxed font-normal" dir="auto">
                          {popup.message}
                        </p>
                        
                        <button
                          onClick={() => setPopup(null)}
                          className={`w-full rounded-2xl px-6 py-4 font-bold text-body-sm text-white shadow-md transition-all hover:-translate-y-0.5 ${popup.type === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-brand-primary hover:bg-brand-primaryHover'}`}
                        >
                          {popup.type === 'success' ? t("contact.form.close_btn") : t("contact.form.got_it_btn")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* S02 — CONNECT WITH pyBIM (Direct Channels) */}
      <DirectChannelsSection />

      {/* S03 — BIM AUTOMATION ROI MATRIX */}
      <RoiMatrixSection />

      {/* SOVEREIGN AI PRIORITY QUEUE / EARLY ACCESS FORM */}
      <PriorityQueueSection />

      {/* S05 — FAQ SECTION - Technical Support (Family A Base) */}
      <section id="support" className="scroll-mt-24 relative w-full bg-brand-base pt-20 pb-32 border-b border-brand-border overflow-hidden">
        {/* Family A Background */}
        <EngineeringBackdrop variant="base" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

    </div>
  );
}
