"use client";
import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { Download, CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function BimCalculatorCta() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ 
    name: "", 
    companyName: "", 
    email: "", 
    modelerCount: "", 
    hourlyRate: "" 
  });
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [popup, setPopup] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/roi-matrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          companyName: form.companyName,
          email: form.email,
          modelerCount: form.modelerCount,
          hourlyRate: form.hourlyRate,
          language: language || "en",
        })
      });

      if (!res.ok) {
        let errMessage = t("roi.error_failed");
        try {
          const errData = await res.json();
          if (errData.error) errMessage = errData.error;
        } catch (_) {}
        throw new Error(errMessage);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const safeCompany = (form.companyName || "Corporate").replace(/[^a-zA-Z0-9]/g, "_");
      const filenamePrefix = language === 'it' ? 'pyBIM-Calcolo-ROI' : language === 'de' ? 'pyBIM-ROI-Rechner' : 'pyBIM-ROI-Matrix';
      link.download = `${filenamePrefix}-${safeCompany}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloaded(true);
    } catch (err) {
      setPopup({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="calculator" className="scroll-mt-24 bg-brand-base py-24 border-b border-brand-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-brand-surface border border-brand-border p-8 md:p-14 shadow-xl flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />

          {/* Left Side - Copy */}
          <div className="lg:w-5/12 flex flex-col items-start text-left relative z-10 pr-0 md:pr-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-6 shadow-sm self-start">
              {t("roi.badge")}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-brand-textPrimary mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t("roi.title") }} />
            
            <div className="space-y-4 mb-8">
              <p className="text-brand-textSecondary text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t("roi.desc_problem") }} />
              <p className="text-brand-textSecondary text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t("roi.desc_agitation") }} />
              <p className="text-brand-textSecondary text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t("roi.desc_solution") }} />
            </div>
            
            <h4 className="text-lg font-bold text-brand-textPrimary mb-4">{t("roi.features_title")}</h4>
            <ul className="space-y-4 text-sm font-medium text-brand-textSecondary">
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <span dangerouslySetInnerHTML={{ __html: t("roi.feature1") }} />
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <span dangerouslySetInnerHTML={{ __html: t("roi.feature2") }} />
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-2 h-2 mt-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <span dangerouslySetInnerHTML={{ __html: t("roi.feature3") }} />
              </li>
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-7/12 w-full relative z-10">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 border border-brand-border dark:border-slate-800 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-colors">
              {downloaded ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-textPrimary mb-2">
                    {t("roi.success.title")}
                  </h3>
                  <p className="text-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                    {t("roi.success.desc")}
                  </p>
                  <button
                    onClick={() => setDownloaded(false)}
                    className="text-xs font-bold text-brand-primary hover:underline uppercase tracking-wider"
                  >
                    {t("roi.success.btn")}
                  </button>
                </div>
              ) : (
                <form className="group grid gap-4" onSubmit={handleSubmit}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("roi.form.name")}</label>
                      <input
                        type="text"
                        required
                        placeholder={t("roi.form.name_ph")}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white dark:focus:bg-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("roi.form.companyName")}</label>
                      <input
                        type="text"
                        required
                        placeholder={t("roi.form.companyName_ph")}
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white dark:focus:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">{t("roi.form.email")}</label>
                    <input
                      type="email"
                      placeholder={t("roi.form.email_ph")}
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white dark:focus:bg-slate-800"
                    />
                    <p className="text-[10.5px] text-brand-textSecondary mt-1 font-medium pl-1">
                      {t("roi.form.email_help")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                        {t("roi.form.modelerCount")}
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        required
                        placeholder={t("roi.form.modelerCount_ph")}
                        value={form.modelerCount}
                        onChange={(e) => setForm({ ...form, modelerCount: e.target.value })}
                        className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white dark:focus:bg-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                        {t("roi.form.hourlyRate")}
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="any"
                        required
                        placeholder={t("roi.form.hourlyRate_ph")}
                        value={form.hourlyRate}
                        onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
                        className="w-full rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white dark:focus:bg-slate-800"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mt-2">
                    <input
                      type="checkbox"
                      id="privacy-calculator"
                      required
                      className="mt-1 w-4 h-4 rounded border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800 text-brand-primary focus:ring-brand-primary cursor-pointer"
                    />
                    <label htmlFor="privacy-calculator" className="text-xs text-brand-textSecondary font-medium leading-normal">
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="group/btn relative w-full mt-2 flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-bold transition-all duration-300 disabled:opacity-60 overflow-hidden bg-brand-accent text-white shadow-[0_10px_20px_-10px_rgba(249,115,22,0.4)] hover:bg-brand-accentHover hover:-translate-y-1 hover:shadow-[0_15px_25px_-10px_rgba(249,115,22,0.5)] group-invalid:bg-orange-200 group-invalid:text-black group-invalid:shadow-none group-invalid:pointer-events-none group-invalid:transform-none"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0 group-invalid:hidden" />
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? t("roi.form.button_loading") : t("roi.form.button")}
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1 group-invalid:opacity-50" />
                    </span>
                  </button>
                  
                  <p className="text-left w-full text-xs text-brand-textSecondary font-medium mt-2 italic">
                    {t("roi.form.microcopy")}
                  </p>
                </form>
              )}

              {popup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 text-left">
                  <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl border border-brand-border dark:border-slate-800 text-center transform animate-in zoom-in-95 duration-200">
                    <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${popup.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'}`}>
                      {popup.type === 'success' ? <CheckCircle2 className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
                    </div>
                    
                    <h3 className="mb-2 text-2xl font-bold text-brand-textPrimary">
                      {popup.type === 'success' ? t("contact.form.success_title") : t("contact.form.error_title")}
                    </h3>
                    
                    <p className="mb-8 text-base font-medium leading-relaxed text-brand-textSecondary text-center" dir="auto">
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
    </section>
  );
}
