"use client";
import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { usePathname } from "next/navigation";
import { Linkedin, Github, Mail, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
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
    <footer className="relative w-full overflow-hidden">
      {/* =========================================================================
          TIER A — BRAND BLUE: Brand Message & Newsletter
          ========================================================================= */}
      <section className="w-full bg-brand-actionPrimary text-white py-12 lg:py-16 border-t border-blue-700/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 lg:gap-12 items-center">

            {/* Left: 55% (span 6) — Brand Message */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {t("footer.brand.slogan_line1")}{" "}
                <span className="text-blue-100">{t("footer.brand.slogan_line2")}</span>
              </h2>
              <p className="text-blue-50 text-base sm:text-lg leading-relaxed max-w-xl font-normal opacity-95">
                {t("footer.brand.description")}
              </p>
            </div>

            {/* Right: 45% (span 5) — Newsletter Panel */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950 p-6 sm:p-7 shadow-xl">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {t("footer.newsletter.title")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    {t("footer.newsletter.subtitle")}
                  </p>
                </div>

                <form className="flex flex-col gap-3" onSubmit={handleNewsletter}>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("footer.newsletter.placeholder")}
                      required
                      className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-slate-900 font-sans"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      aria-label={t("footer.newsletter.button_label")}
                      className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-accentHover disabled:opacity-60 shrink-0 cursor-pointer"
                    >
                      <span>{t("footer.newsletter.button_label")}</span>
                      <Send className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="privacy-footer-tier"
                      required
                      className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer shrink-0"
                    />
                    <label htmlFor="privacy-footer-tier" className="text-xs text-slate-300 leading-normal cursor-pointer select-none">
                      {t("footer.newsletter.privacy_prefix")}
                      <Link href="/privacy-policy" className="text-blue-400 font-medium hover:underline">
                        {t("footer.newsletter.privacy_link")}
                      </Link>
                      {t("footer.newsletter.privacy_dot")}{" "}
                      <span className="text-slate-400 opacity-90">{t("footer.newsletter.privacy_microcopy")}</span>
                    </label>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER B — DEEP NAVY: Company, R&D, Navigation & Legal
          ========================================================================= */}
      <section className="w-full bg-slate-950 text-slate-300 pt-14 pb-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Main 4-Column Navigation Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">

            {/* Column A: pyBIM Identity & Engineering R&D Lab (span 4) */}
            <div className="lg:col-span-4 flex flex-col space-y-5">
              <div>
                <span className="text-2xl font-bold tracking-tight text-white font-sans">
                  pyBIM
                </span>
                <p className="text-xs text-slate-400 mt-1 font-mono tracking-wide">
                  {t("footer.brand.identity_line")}
                </p>
              </div>

              {/* Compact Engineering R&D Lab Block */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white tracking-wide">
                    <span className="text-cyan-400 font-extrabold">&lt;/&gt;</span>
                    <span>{t("footer.legal.lab_name")}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{t("footer.legal.location")}</span>
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300 font-mono pt-2 border-t border-slate-800/80">
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{t("footer.legal.compliance_1")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{t("footer.legal.compliance_2")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{t("footer.legal.compliance_3")}</span>
                  </li>
                </ul>
              </div>

              {/* Social Channels */}
              <div className="pt-1">
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://www.linkedin.com/company/pybim"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("footer.social.linkedin_label")}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/pyBIM-collaboration"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column B: Quick Links (span 2 or 3) */}
            <div className="lg:col-span-2 md:pl-2">
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs font-mono">
                {t("footer.quick_links.title")}
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-slate-400 hover:text-blue-400 transition">
                    {t("footer.quick_links.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="text-slate-400 hover:text-blue-400 transition">
                    {t("footer.quick_links.projects")}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-slate-400 hover:text-blue-400 transition">
                    {t("footer.quick_links.services")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-blue-400 transition">
                    {t("footer.quick_links.who_we_are")}
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-slate-400 hover:text-blue-400 transition">
                    {t("footer.quick_links.work_with_us")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-blue-400 transition">
                    {t("footer.quick_links.contact_us")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column C: Core Solutions (span 3) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs font-mono">
                {t("footer.core_solutions.title")}
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/services#capabilities" className="text-slate-400 hover:text-blue-400 transition block">
                    {t("footer.core_solutions.bim_execution")}
                  </Link>
                </li>
                <li>
                  <Link href="/services#execution-architecture" className="text-slate-400 hover:text-blue-400 transition block">
                    {t("footer.core_solutions.revit_automation")}
                  </Link>
                </li>
                <li>
                  <Link href="/services#roadmap" className="text-slate-400 hover:text-blue-400 transition block">
                    {t("footer.core_solutions.sovereign_ai")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column D: Contact (span 3) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs font-mono">
                {t("footer.contact_info.title")}
              </h4>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono font-semibold">
                      {t("footer.contact_info.email_label")}
                    </div>
                    <a
                      href="mailto:info@pybim.com"
                      className="font-mono text-slate-300 hover:text-blue-400 transition"
                    >
                      {t("footer.contact_info.email_val")}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono font-semibold">
                      {t("footer.contact_info.location_label")}
                    </div>
                    <span className="text-slate-300">
                      {t("footer.contact_info.location_val")}
                    </span>
                  </div>
                </li>
                <li className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300 transition"
                  >
                    <span>{t("footer.contact_info.direct_link")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Legal Bottom Row Separator */}
          <div className="border-t border-slate-900 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Left: Copyright */}
            <p className="text-xs font-mono text-slate-400 text-center md:text-left">
              {t("footer.bottom.copyright")}
            </p>

            {/* Right: Legal Links & Cookie Preferences */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
              <Link href="/privacy-policy" className="hover:text-white transition">
                {t("footer.bottom.privacy_policy")}
              </Link>
              <Link href="/security" className="hover:text-white transition">
                {t("footer.bottom.enterprise_security")}
              </Link>
              <Link href="/cookie-policy" className="hover:text-white transition">
                {t("footer.bottom.cookie_policy")}
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition">
                {t("footer.bottom.terms_and_conditions")}
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new Event("open_cookie_preferences"));
                  }
                }}
                className="hover:text-white transition cursor-pointer text-left bg-transparent border-none p-0 font-mono text-xs text-slate-400 underline-offset-2 hover:underline"
              >
                {t("cookie.footer.manage_preferences") || "Cookie Preferences"}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Subscription Status Popup Modal */}
      {popup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 p-7 shadow-2xl border border-slate-800 text-center transform animate-in zoom-in-95 duration-200">
            <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${popup.type === 'success' ? 'bg-emerald-950/60 text-emerald-400' : 'bg-red-950/60 text-red-400'}`}>
              {popup.type === 'success' ? <CheckCircle2 className="h-7 w-7" /> : <AlertCircle className="h-7 w-7" />}
            </div>

            <h3 className="mb-2 text-xl font-bold text-white">
              {popup.type === 'success' ? t("footer.popup.success_title") : t("footer.popup.error_title")}
            </h3>

            <p className="mb-6 text-sm font-medium leading-relaxed text-slate-300">
              {popup.message}
            </p>

            <button
              onClick={() => setPopup(null)}
              className={`w-full rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md transition-all cursor-pointer ${popup.type === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover'}`}
            >
              {popup.type === 'success' ? t("footer.popup.close_btn") : t("footer.popup.got_it_btn")}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
