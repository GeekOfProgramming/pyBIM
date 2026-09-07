"use client";
import { useState } from "react";

import Link from "@/components/layout/LocalizedLink";
import { usePathname } from "next/navigation";
import { Linkedin, Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  async function handleNewsletter(e) {
    e.preventDefault();
    setLoading(true);
    setPopup(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setPopup({ type: "success", message: t("footer.newsletter.success_msg") });
      setEmail("");
    } catch (err) {
      setPopup({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  const isExcluded = 
    pathname?.startsWith("/admin") ||
    pathname?.includes("/portal") ||
    pathname?.includes("/login");

  if (isExcluded) return null;

  return (
    <footer className="relative border-t border-brand-border bg-brand-primary pt-16 overflow-hidden">
      {/* Background Texture / Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_40%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] mb-16 items-start">
          
          {/* LEFT SIDE: BRAND & SLOGAN */}
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              <p>{t("footer.brand.slogan_line1")}<br />{t("footer.brand.slogan_line2")}</p>
            </h2>
            <p 
              className="text-white/80 mb-8 max-w-sm font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("footer.brand.description") }}
            />
            
            {/* Social Icons */}
            <p className="text-white/80 mb-3 font-semibold text-sm">{t("footer.social.heading")}</p>
            <div className="flex gap-4 mb-10 text-white">
              <a href="https://www.linkedin.com/company/pybim" target="_blank" rel="noopener noreferrer" aria-label={t("footer.social.linkedin_label")} className="hover:bg-white hover:text-[#0077b5] transition bg-white/10 p-2.5 rounded-full border border-white/20">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Box */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-white/90">
              <div className="mb-3 inline-block">
                <img src="/logo_white_transparent.png" alt="pyBIM logo" className="h-8 w-auto object-contain" />
              </div>
              <div className="font-bold text-white">{t("footer.legal.lab_name")}</div>
              <div className="mt-1 text-white/80 font-medium">{t("footer.legal.location")}</div>
            </div>
          </div>

          {/* RIGHT SIDE: LIGHT/DARK PANEL CARD */}
          <div className="rounded-[2.5rem] border border-brand-border dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 md:p-10 xl:p-12 shadow-2xl overflow-hidden transition-colors">
            {/* Newsletter Block */}
            <div className="mb-12 border-b border-brand-border dark:border-slate-800 pb-10">
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-3">{t("footer.newsletter.title")}</h3>
              <p className="text-sm text-brand-textSecondary mb-6 font-medium leading-relaxed">
                {t("footer.newsletter.subtitle")}
              </p>
              <form className="group flex flex-col gap-4" onSubmit={handleNewsletter}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.newsletter.placeholder")}
                    required
                    className="flex-1 rounded-2xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800/90 px-5 py-4 text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white dark:focus:bg-slate-800"
                  />
                  <button 
                    type="submit" 
                    disabled={loading} 
                    aria-label={t("footer.newsletter.button_label")} 
                    className="group/btn relative inline-flex items-center justify-center rounded-2xl bg-brand-accent px-6 py-4 text-white shadow-[0_10px_20px_-10px_rgba(249,115,22,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-brand-accentHover hover:shadow-[0_15px_25px_-10px_rgba(249,115,22,0.5)] group-invalid:bg-orange-200 group-invalid:text-black group-invalid:shadow-none group-invalid:pointer-events-none group-invalid:transform-none disabled:opacity-60 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0 group-invalid:hidden" />
                    <Send className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 group-invalid:opacity-50" />
                  </button>
                </div>
                <div className="flex items-start gap-3 mt-1">
                  <input
                    type="checkbox"
                    id="privacy-footer"
                    required
                    className="mt-1 w-4 h-4 rounded border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800 text-brand-primary focus:ring-brand-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="privacy-footer" className="text-xs text-brand-textSecondary leading-relaxed">
                    {t("footer.newsletter.privacy_prefix")}<Link href="/privacy-policy" className="text-brand-primary font-semibold hover:underline">{t("footer.newsletter.privacy_link")}</Link>{t("footer.newsletter.privacy_dot")}<br />
                    <span className="italic opacity-80">{t("footer.newsletter.privacy_microcopy")}</span>
                  </label>
                </div>
              </form>
            </div>

            {/* Three Columns (Proportional Layout for Zero Wrapping on Laptop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[130px_1fr_210px] xl:grid-cols-[140px_1fr_220px] gap-8 lg:gap-6 xl:gap-10 items-start">
              {/* Quick Links */}
              <div className="shrink-0">
                <h4 className="font-bold text-brand-textPrimary mb-6 uppercase tracking-wider text-sm">{t("footer.quick_links.title")}</h4>
                <ul className="space-y-4 text-brand-textSecondary font-medium text-sm">
                  <li><Link href="/" className="hover:text-brand-primary transition whitespace-nowrap">{t("footer.quick_links.home")}</Link></li>
                  <li><Link href="/services" className="hover:text-brand-primary transition whitespace-nowrap">{t("footer.quick_links.services")}</Link></li>
                  <li><Link href="/pricing" className="hover:text-brand-primary transition whitespace-nowrap">{t("footer.quick_links.pricing")}</Link></li>
                  <li><Link href="/about" className="hover:text-brand-primary transition whitespace-nowrap">{t("footer.quick_links.who_we_are")}</Link></li>
                  <li><Link href="/careers" className="hover:text-brand-primary transition whitespace-nowrap">{t("footer.quick_links.work_with_us")}</Link></li>
                  <li><Link href="/contact" className="hover:text-brand-primary transition whitespace-nowrap">{t("footer.quick_links.contact_us")}</Link></li>
                </ul>
              </div>

              {/* Core Solutions */}
              <div className="min-w-0">
                <h4 className="font-bold text-brand-textPrimary mb-6 uppercase tracking-wider text-sm">{t("footer.core_solutions.title")}</h4>
                <ul className="space-y-4 text-brand-textSecondary font-medium text-sm">
                  <li><Link href="/services" className="hover:text-brand-primary transition whitespace-nowrap block">{t("footer.core_solutions.bim_execution")}</Link></li>
                  <li><Link href="/services" className="hover:text-brand-primary transition whitespace-nowrap block">{t("footer.core_solutions.revit_automation")}</Link></li>
                  <li><Link href="/services" className="hover:text-brand-primary transition whitespace-nowrap block">{t("footer.core_solutions.clash_detection")}</Link></li>
                  <li><Link href="/services" className="hover:text-brand-primary transition whitespace-nowrap block">{t("footer.core_solutions.5d_qto")}</Link></li>
                  <li><Link href="/services" className="hover:text-brand-primary transition whitespace-nowrap block">{t("footer.core_solutions.iso_cobie")}</Link></li>
                  <li><Link href="/services" className="hover:text-brand-primary transition whitespace-nowrap block">{t("footer.core_solutions.sovereign_ai")}</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="shrink-0">
                <h4 className="font-bold text-brand-textPrimary mb-6 uppercase tracking-wider text-sm">{t("footer.contact_info.title")}</h4>
                <ul className="space-y-4 text-brand-textSecondary font-medium text-sm">
                  <li className="flex gap-3">
                    <Phone className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-brand-textSecondary/70 uppercase font-semibold">{t("footer.contact_info.landline_label")}</div>
                      <a href="tel:+390491234567" className="hover:text-brand-primary transition font-semibold text-brand-textPrimary whitespace-nowrap">{t("footer.contact_info.landline_val")}</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-brand-textSecondary/70 uppercase font-semibold">{t("footer.contact_info.email_label")}</div>
                      <a href="mailto:info@pybim.com" className="hover:text-brand-primary transition font-semibold text-brand-textPrimary whitespace-nowrap">{t("footer.contact_info.email_val")}</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-brand-textSecondary/70 uppercase font-semibold">{t("footer.contact_info.location_label")}</div>
                      <div className="font-semibold text-brand-textPrimary whitespace-nowrap">{t("footer.contact_info.location_val")}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/20 pt-8 pb-28 lg:pb-8 mt-4 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/80 font-medium text-center md:text-left">
            {t("footer.bottom.copyright")}
          </p>
          <div className="flex gap-6 text-sm text-white/80 font-medium justify-center flex-wrap">
            <Link href="/privacy-policy" className="hover:text-white transition">{t("footer.bottom.privacy_policy")}</Link>
            <Link href="/security" className="hover:text-white transition">{t("footer.bottom.enterprise_security")}</Link>
            <Link href="/cookie-policy" className="hover:text-white transition">{t("footer.bottom.cookie_policy")}</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition">{t("footer.bottom.terms_and_conditions")}</Link>
          </div>
        </div>
      </div>

      {popup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 text-left">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl border border-brand-border dark:border-slate-800 text-center transform animate-in zoom-in-95 duration-200">
            <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${popup.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'}`}>
              {popup.type === 'success' ? <CheckCircle2 className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
            </div>
            
            <h3 className="mb-2 text-2xl font-bold text-brand-textPrimary">
              {popup.type === 'success' ? t("footer.popup.success_title") : t("footer.popup.error_title")}
            </h3>
            
            <p className="mb-8 text-base font-medium leading-relaxed text-brand-textSecondary" style={{ direction: 'rtl' }}>
              {popup.message}
            </p>
            
            <button
              onClick={() => setPopup(null)}
              className={`w-full rounded-2xl px-6 py-4 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 ${popup.type === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-brand-primary hover:bg-brand-primaryHover'}`}
            >
              {popup.type === 'success' ? t("footer.popup.close_btn") : t("footer.popup.got_it_btn")}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
