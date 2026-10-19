"use client";
import Link from "@/components/layout/LocalizedLink";
import { usePathname } from "next/navigation";
import { Linkedin, Github, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const isExcluded =
    pathname?.startsWith("/admin") ||
    pathname?.includes("/portal") ||
    pathname?.includes("/login");

  if (isExcluded) return null;

  return (
    <footer className="relative w-full overflow-hidden">
      {/* =========================================================================
          TIER A — BRAND BLUE: Brand Message
          ========================================================================= */}
      <section className="w-full bg-brand-actionPrimary text-white py-12 lg:py-16 border-t border-blue-700/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {t("footer.brand.slogan_line1")}{" "}
              <span className="text-blue-100">{t("footer.brand.slogan_line2")}</span>
            </h2>
            <p className="text-blue-50 text-base sm:text-lg leading-relaxed font-normal opacity-95">
              {t("footer.brand.description")}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TIER B — CORPORATE COBALT: Company, R&D, Navigation & Legal
          ========================================================================= */}
      <section
        style={{
          background: "linear-gradient(180deg, #2053A8 0%, #174080 52%, #102851 100%)",
        }}
        className="w-full text-[#E2E8F0] pt-14 pb-10 border-t border-[#4E70A2]/40"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Main 4-Column Navigation Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">

            {/* Column A: pyBIM Identity & Engineering R&D Lab (span 4) */}
            <div className="lg:col-span-4 flex flex-col space-y-5">
              <div>
                <span className="text-2xl font-bold tracking-tight text-[#F8FAFC] font-sans">
                  pyBIM
                </span>
                <p className="text-xs text-[#DCE9FF] mt-1 font-mono tracking-wide">
                  {t("footer.brand.identity_line")}
                </p>
              </div>

              {/* Compact Engineering R&D Lab Block */}
              <div className="rounded-xl border border-[#4E70A2] bg-[#10274D] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F8FAFC] tracking-wide">
                    <span className="text-cyan-400 font-extrabold">&lt;/&gt;</span>
                    <span>{t("footer.legal.lab_name")}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#DCE9FF]">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{t("footer.legal.location")}</span>
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-[#E2E8F0] font-mono pt-2 border-t border-[#4E70A2]/50">
                  <li className="flex items-center gap-2 text-[#E2E8F0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{t("footer.legal.compliance_1")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#E2E8F0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{t("footer.legal.compliance_2")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#E2E8F0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shrink-0" />
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
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#10274D] border border-[#4E70A2] text-[#E2E8F0] hover:text-white hover:bg-[#174080] hover:border-white/50 transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/pyBIM-collaboration"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("footer.social.github_label")}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#10274D] border border-[#4E70A2] text-[#E2E8F0] hover:text-white hover:bg-[#174080] hover:border-white/50 transition"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column B: Quick Links (span 2 or 3) */}
            <div className="lg:col-span-2 md:pl-2">
              <h4 className="font-bold text-[#F8FAFC] mb-4 uppercase tracking-wider text-xs font-mono">
                {t("footer.quick_links.title")}
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-[#E2E8F0] hover:text-white transition">
                    {t("footer.quick_links.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="text-[#E2E8F0] hover:text-white transition">
                    {t("footer.quick_links.projects")}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-[#E2E8F0] hover:text-white transition">
                    {t("footer.quick_links.services")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-[#E2E8F0] hover:text-white transition">
                    {t("footer.quick_links.who_we_are")}
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-[#E2E8F0] hover:text-white transition">
                    {t("footer.quick_links.work_with_us")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#E2E8F0] hover:text-white transition">
                    {t("footer.quick_links.contact_us")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column C: Core Solutions (span 3) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-[#F8FAFC] mb-4 uppercase tracking-wider text-xs font-mono">
                {t("footer.core_solutions.title")}
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/services#capabilities" className="text-[#E2E8F0] hover:text-white transition block">
                    {t("footer.core_solutions.bim_execution")}
                  </Link>
                </li>
                <li>
                  <Link href="/services#execution-architecture" className="text-[#E2E8F0] hover:text-white transition block">
                    {t("footer.core_solutions.revit_automation")}
                  </Link>
                </li>
                <li>
                  <Link href="/services#roadmap" className="text-[#E2E8F0] hover:text-white transition block">
                    {t("footer.core_solutions.sovereign_ai")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column D: Contact (span 3) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-[#F8FAFC] mb-4 uppercase tracking-wider text-xs font-mono">
                {t("footer.contact_info.title")}
              </h4>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-[#DCE9FF] uppercase font-mono font-semibold">
                      {t("footer.contact_info.email_label")}
                    </div>
                    <a
                      href="mailto:info@pybim.com"
                      className="font-mono text-[#E2E8F0] hover:text-white transition"
                    >
                      {t("footer.contact_info.email_val")}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-[#DCE9FF] uppercase font-mono font-semibold">
                      {t("footer.contact_info.location_label")}
                    </div>
                    <span className="text-[#E2E8F0]">
                      {t("footer.contact_info.location_val")}
                    </span>
                  </div>
                </li>
                <li className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-white transition"
                  >
                    <span>{t("footer.contact_info.direct_link")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Legal Bottom Row Separator */}
          <div className="border-t border-[#4E70A2]/40 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Left: Copyright */}
            <p className="text-xs font-mono text-[#CBD5E1] text-center md:text-left">
              {t("footer.bottom.copyright")}
            </p>

            {/* Right: Legal Links & Cookie Preferences */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-xs font-mono text-[#CBD5E1]">
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
                className="hover:text-white transition cursor-pointer text-left bg-transparent border-none p-0 font-mono text-xs text-[#CBD5E1] underline-offset-2 hover:underline"
              >
                {t("cookie.footer.manage_preferences")}
              </button>
            </div>

          </div>

        </div>
      </section>
    </footer>
  );
}
