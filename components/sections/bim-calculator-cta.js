"use client";
import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { Calculator, Download, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function BimCalculatorCta() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", companySize: "" });
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Send lead notification
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: "-",
          message: `[ROI Calculator Download] Company Size: ${form.companySize || "Not specified"}`
        })
      });

      // Trigger file download (.xlsx)
      const link = document.createElement("a");
      link.href = "/downloads/pyBIM-Automation-ROI-Calculator.xlsx";
      link.download = "pyBIM-Automation-ROI-Calculator.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloaded(true);
    } catch (err) {
      console.error("Error downloading calculator:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="calculator" className="bg-brand-base py-24 border-b border-brand-border">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-brand-surface border border-brand-border p-8 md:p-14 shadow-xl flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Side - Copy */}
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6 text-brand-primary">
              <Calculator className="w-6 h-6" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-brand-textPrimary mb-6 leading-tight">
              Ready to Stop Wasting<br />Time on <span className="text-brand-primary">Manual Modeling?</span>
            </h2>
            
            <p className="text-brand-textSecondary mb-8 leading-relaxed font-medium">
              Download our <strong>BIM Automation ROI Calculator</strong>. Discover how many hours your team can save by replacing repetitive tasks with custom pyRevit scripts and APIs.
            </p>
            
            <ul className="space-y-4 text-sm font-medium text-brand-textPrimary">
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                Accurate estimate of hours saved
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                Custom ROI analysis for your studio
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                BIM productivity KPIs and metrics
              </li>
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-sm">
              {downloaded ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-textPrimary mb-2">
                    {language === "it" ? "File Scaricato!" : "Download Started!"}
                  </h3>
                  <p className="text-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                    {language === "it"
                      ? "Il calcolatore ROI è stato scaricato sul tuo dispositivo. Un nostro ingegnere è a tua disposizione se desideri un audit personalizzato."
                      : "The BIM Automation ROI Calculator has been downloaded. Our engineering team is available if you need a tailored technical audit."}
                  </p>
                  <button
                    onClick={() => setDownloaded(false)}
                    className="text-xs font-bold text-brand-primary hover:underline uppercase tracking-wider"
                  >
                    {language === "it" ? "Scarica di nuovo" : "Download again"}
                  </button>
                </div>
              ) : (
                <form className="grid gap-5" onSubmit={handleSubmit}>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {language === "it" ? "Nome Completo" : "Name"}
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3.5 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {language === "it" ? "Email Aziendale" : "Work Email"}
                    </label>
                    <input
                      type="email"
                      placeholder="john@architecture-studio.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3.5 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-textPrimary tracking-wide">
                      {language === "it" ? "Dimensione Studio / Team" : "Company Size"}
                    </label>
                    <select
                      required
                      value={form.companySize}
                      onChange={(e) => setForm({ ...form, companySize: e.target.value })}
                      className="w-full rounded-2xl border border-brand-border bg-brand-surface px-4 py-3.5 text-sm text-brand-textPrimary outline-none transition focus:border-brand-primary focus:bg-white cursor-pointer"
                    >
                      <option value="" disabled>{language === "it" ? "Seleziona un'opzione" : "Select an option"}</option>
                      <option value="1-10">1-10 {language === "it" ? "Dipendenti" : "Employees"}</option>
                      <option value="11-50">11-50 {language === "it" ? "Dipendenti" : "Employees"}</option>
                      <option value="51-200">51-200 {language === "it" ? "Dipendenti" : "Employees"}</option>
                      <option value="200+">200+ {language === "it" ? "Dipendenti" : "Employees"}</option>
                    </select>
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-3 mt-1">
                    <input
                      type="checkbox"
                      id="privacy-calculator"
                      required
                      className="mt-1 w-4 h-4 rounded border-brand-border bg-brand-surface text-brand-primary focus:ring-brand-primary cursor-pointer"
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
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-accent px-6 py-4 font-bold text-white shadow-md transition-all hover:bg-brand-accentHover hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    <Download className="w-5 h-5" /> {loading ? "..." : (language === "it" ? "Scarica Calcolatore ROI Gratuito" : "Download Free ROI Calculator")}
                  </button>
                  
                  <p className="text-center text-[11px] text-brand-textSecondary font-medium">
                    {language === "it" ? "I tuoi dati sono al sicuro. Nessun invio di spam." : "Your data is protected. We will never send spam."}
                  </p>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
