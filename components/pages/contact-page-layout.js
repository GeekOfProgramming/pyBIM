"use client";
import { useState, useEffect } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Mail, Phone, Linkedin, CheckCircle2, AlertCircle } from "lucide-react";
import { emailAddress, phoneDisplay, phoneHref } from "@/lib/site-copy";
import FAQSection from "@/components/sections/faq-section";
import { useLanguage } from "@/lib/LanguageContext";
import BimCalculatorCta from "@/components/sections/bim-calculator-cta";

export default function ContactPageLayout() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", companyName: "", email: "", phone: "", service: "", teamScale: "", message: "" });
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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || t("contact.form.error"));
      setPopup({ type: "success", message: t("contact.form.success") });
      setForm({ name: "", companyName: "", email: "", phone: "", service: "", teamScale: "", message: "" });
    } catch (err) {
      setPopup({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-brand-base">
      {/* COMBINED HERO & FORM SECTION */}
      <section id="audit" className="scroll-mt-24 relative overflow-hidden py-24 lg:py-32 px-6 lg:px-8 border-b border-brand-border">
        <div className="absolute inset-0 -z-10">
          <img
            src="/Pictures/Contact/contact-002.jpg"
            alt={t("contact.hero.img_alt")}
            className="h-full w-full object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-base via-brand-base/90 to-brand-surface/70" />
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            
            {/* LEFT COLUMN (40% Width) */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-6 shadow-sm self-start">
                {t("contact.hero.tag")}
              </div>
              <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl text-brand-textPrimary mb-6 leading-tight">
                {t("contact.hero.title")}
              </h1>
              <p className="text-lg font-bold text-brand-primary md:text-xl mb-12">
                {t("contact.hero.subtitle")}
              </p>

              <div className="border-t border-brand-border pt-8">
                <div className="space-y-6 text-base leading-relaxed text-brand-textSecondary font-medium">
                  <p>{t("contact.section.desc1")}</p>
                  <p className="font-bold text-brand-textPrimary">{t("contact.section.next")}</p>
                  <ul className="space-y-3 list-disc pl-5">
                    <li><strong className="text-brand-textPrimary">{t("contact.section.list1_title")}</strong>{t("contact.section.list1_desc")}</li>
                    <li><strong className="text-brand-textPrimary">{t("contact.section.list2_title")}</strong>{t("contact.section.list2_desc")}</li>
                    <li><strong className="text-brand-textPrimary">{t("contact.section.list3_title")}</strong>{t("contact.section.list3_desc")}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div id="audit" className="relative rounded-[2.5rem] bg-white p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-brand-border/60 overflow-hidden">
                {/* Decorative background gradients */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="mb-10">
                    <h3 className="text-3xl font-bold text-brand-textPrimary mb-3">{t("contact.form.title")}</h3>
                    <p className="text-brand-textSecondary font-medium">{t("contact.form.desc")}</p>
                  </div>
                  
                  <form className="group grid gap-4" onSubmit={handleSubmit}>
                    
                    {/* Row 1: Name & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("contact.form.name")}</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          placeholder={t("contact.form.name_ph")}
                          required
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("contact.form.companyName")}</label>
                        <input
                          type="text"
                          value={form.companyName}
                          onChange={(e) => updateField("companyName", e.target.value)}
                          placeholder={t("contact.form.companyName_ph")}
                          required
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("contact.form.email")}</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder={t("contact.form.email_ph")}
                          required
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white"
                        />
                        <p className="text-[10.5px] text-brand-textSecondary mt-1 font-medium pl-1">
                          {t("contact.form.email_help")}
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("contact.form.phone")}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          placeholder={t("contact.form.phone_ph")}
                          className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Row 3: Service of Interest & Team Scale */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("contact.form.service")}</label>
                        <select
                          value={form.service}
                          onChange={(e) => updateField("service", e.target.value)}
                          required
                          className={`w-full appearance-none rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-textPrimary outline-none transition focus:border-brand-primary focus:bg-white ${form.service ? '' : 'text-brand-textSecondary'}`}
                        >
                          <option value="" disabled hidden>{t("contact.form.service_ph")}</option>
                          {["service_opt1", "service_opt2", "service_opt3", "service_opt4", "service_opt5", "service_opt6", "service_opt7", "service_opt8"].map((key) => (
                            <option key={key} value={t(`contact.form.${key}`)} className="text-brand-textPrimary">
                              {t(`contact.form.${key}`)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("contact.form.teamScale")}</label>
                        <select
                          value={form.teamScale}
                          onChange={(e) => updateField("teamScale", e.target.value)}
                          required
                          className={`w-full appearance-none rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-textPrimary outline-none transition focus:border-brand-primary focus:bg-white ${form.teamScale ? '' : 'text-brand-textSecondary'}`}
                        >
                          <option value="" disabled hidden>{t("contact.form.teamScale_ph")}</option>
                          {["scale_opt1", "scale_opt2", "scale_opt3", "scale_opt4"].map((key) => (
                            <option key={key} value={t(`contact.form.${key}`)} className="text-brand-textPrimary">
                              {t(`contact.form.${key}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Message / Project Description */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("contact.form.message_label")}</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        placeholder={t("contact.form.message_ph")}
                        required
                        className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white resize-y"
                      />
                    </div>

                    {/* Row 5: Privacy */}
                    <div className="flex items-start gap-3 mt-2">
                      <input
                        type="checkbox"
                        id="privacy-contact"
                        required
                        className="mt-1 w-4 h-4 rounded border-brand-border bg-brand-surface text-brand-primary focus:ring-brand-primary cursor-pointer"
                      />
                      <label htmlFor="privacy-contact" className="text-xs text-brand-textSecondary font-medium leading-normal">
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

                    {/* Row 6: Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group/btn relative w-full mt-2 flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-bold transition-all duration-300 disabled:opacity-60 overflow-hidden bg-brand-accent text-white shadow-[0_10px_20px_-10px_rgba(249,115,22,0.4)] hover:bg-brand-accentHover hover:-translate-y-1 hover:shadow-[0_15px_25px_-10px_rgba(249,115,22,0.5)] group-invalid:bg-orange-200 group-invalid:text-black group-invalid:shadow-none group-invalid:pointer-events-none group-invalid:transform-none"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0 group-invalid:hidden" />
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? t("contact.form.sending") : t("contact.form.button")}
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1 group-invalid:opacity-50" />
                      </span>
                    </button>
                    
                    {t("contact.form.microcopy") && (
                      <p className="text-left w-full text-xs text-brand-textSecondary font-medium mt-2 italic">
                        {t("contact.form.microcopy")}
                      </p>
                    )}
                  </form>

                  {popup && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-base/80 backdrop-blur-sm animate-in fade-in duration-200">
                      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-brand-border text-center transform animate-in zoom-in-95 duration-200">
                        <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${popup.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {popup.type === 'success' ? <CheckCircle2 className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
                        </div>
                        
                        <h3 className="mb-2 text-2xl font-bold text-brand-textPrimary">
                          {popup.type === 'success' ? t("contact.form.success_title") : t("contact.form.error_title")}
                        </h3>
                        
                        <p className="mb-8 text-base font-medium leading-relaxed text-brand-textSecondary" dir="auto">
                          {popup.message}
                        </p>
                        
                        <button
                          onClick={() => setPopup(null)}
                          className={`w-full rounded-2xl px-6 py-4 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 ${popup.type === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-brand-primary hover:bg-brand-primaryHover'}`}
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

      {/* COMBINED CONTACT INFO & SOCIALS SECTION */}
      <section id="direct-channels" className="scroll-mt-24 bg-brand-surface py-20 border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm mx-auto">
              {t("contact.channels.badge")}
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              {t("contact.channels.title")}
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto items-stretch">
            
            {/* TELEFONO FISSO */}
            <a href={phoneHref} className="group flex flex-col items-center justify-center rounded-3xl border border-brand-border bg-white p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-1 hover:border-brand-primary/30">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary/15 flex items-center justify-center mb-6 transition-colors">
                <Phone className="h-7 w-7" />
              </div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-textSecondary">{t("contact.info.phone_fixed")}</h4>
              <span className="text-lg font-bold text-brand-textPrimary group-hover:text-brand-primary transition-colors">
                +39 {phoneDisplay}
              </span>
            </a>

            {/* E-MAIL GENERAL */}
            <a href={`mailto:${emailAddress}`} className="group flex flex-col items-center justify-center rounded-3xl border border-brand-border bg-white p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-1 hover:border-brand-primary/30">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary/15 flex items-center justify-center mb-6 transition-colors">
                <Mail className="h-7 w-7" />
              </div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-textSecondary">{t("contact.info.email_general")}</h4>
              <span className="text-lg font-bold text-brand-textPrimary group-hover:text-brand-primary transition-colors">
                {emailAddress}
              </span>
            </a>

            {/* LINKEDIN */}
            <a href="https://www.linkedin.com/company/pybim" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center rounded-3xl border border-brand-border bg-white p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-[0_10px_30px_-15px_rgba(10,102,194,0.15)] hover:-translate-y-1 hover:border-[#0A66C2]/30">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 text-brand-primary group-hover:bg-[#0A66C2]/10 group-hover:text-[#0A66C2] flex items-center justify-center mb-6 transition-colors">
                <Linkedin className="h-7 w-7" />
              </div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-textSecondary">{t("contact.info.linkedin")}</h4>
              <span className="text-lg font-bold text-brand-textPrimary group-hover:text-[#0A66C2] transition-colors">
                {t("contact.info.linkedin_handle")}
              </span>
            </a>

          </div>
        </div>
      </section>

      {/* BIM ROI CALCULATOR CTA */}
      <BimCalculatorCta />

      {/* FAQ SECTION - Technical Support */}
      <section id="support" className="scroll-mt-24 bg-brand-surface pt-20 pb-32 border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

    </div>
  );
}
