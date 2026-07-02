"use client";
import { useState } from "react";

import Link from "@/components/LocalizedLink";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleNewsletter(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setStatus(t("contact.form.success") || "Iscrizione completata!");
      setEmail("");
    } catch {
      setStatus("Errore durante l'iscrizione.");
    } finally {
      setLoading(false);
    }
  }

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#081730] pt-16 overflow-hidden">
      {/* Background Texture / Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.05),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.05),transparent_40%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        


        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] mb-16">
          
          {/* LEFT SIDE: BRAND & SLOGAN */}
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("nav.home") === "Home" && t("nav.services") === "Services" ? 
                <p>Building your comfort<br />together</p> : 
                <p>Costruiamo insieme<br />il vostro comfort</p>
              }
            </h2>
            <p className="text-white/60 mb-8 max-w-sm">
              {t("nav.home") === "Home" && t("nav.services") === "Services" ?
                "Fast technicians in Northern Italy: installations, climate, boilers, and renovations." :
                "Tecnici rapidi in Veneto: impianti, clima, caldaie e ristrutturazioni."
              }
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mb-10 text-white/50">
              <a href="https://web.whatsapp.com/send?phone=393518373043" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-blue-300 transition bg-white/5 p-2.5 rounded-full border border-white/10 hover:bg-white/10">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/arvandtermotec" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-300 transition bg-white/5 p-2.5 rounded-full border border-white/10 hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/arvand-termo-tec" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-300 transition bg-white/5 p-2.5 rounded-full border border-white/10 hover:bg-white/10">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/arvandtermotec/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-blue-300 transition bg-white/5 p-2.5 rounded-full border border-white/10 hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Box */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/60">
              <div className="mb-4">
                <img src="/logo-new-3.png" alt="Arvand Termo Tec logo" className="h-10 w-auto object-contain" />
              </div>
              <div>P.IVA - C.F.: 4992890279</div>
              <div className="mt-1">Sede Legale: Via Verrocchio, 2, 30035 Mirano (VE)</div>
            </div>
          </div>

          {/* RIGHT SIDE: DARK PANEL CARD */}
          <div className="rounded-[2.5rem] border border-white/10 bg-[#102A5C] p-8 md:p-12 shadow-2xl">
            {/* Newsletter Block */}
            <div className="mb-12 border-b border-white/10 pb-10">
              <h3 className="text-xl font-semibold text-white mb-6">{t("footer.newsletter.title")}</h3>
              <form className="group flex flex-col gap-4" onSubmit={handleNewsletter}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.newsletter.placeholder")}
                    required
                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-white/40 outline-none transition focus:border-orange-400 focus:bg-[#0f1d32]"
                  />
                  <button type="submit" disabled={loading} aria-label="Subscribe" className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 text-white shadow-[0_10px_35px_rgba(249,115,22,0.3)] transition hover:-translate-y-1 hover:bg-orange-400 group-invalid:opacity-50 disabled:opacity-50">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                {status && <p className="text-sm font-medium text-white/80">{status}</p>}
                <div className="flex items-start gap-3 mt-1">
                  <input
                    type="checkbox"
                    id="privacy-footer"
                    required
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="privacy-footer" className="text-xs">
                    <span className="text-xs text-white/50">
                      {t("forms.accept.part1")}
                      <Link href="/privacy-policy" className="text-orange-400 hover:underline">
                        {t("forms.accept.privacy")}
                      </Link>
                      {t("forms.accept.part3_short")}
                    </span>
                  </label>
                </div>
              </form>
            </div>

            {/* Three Columns */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">{t("footer.links")}</h4>
                <ul className="space-y-4 text-white/60">
                  <li><Link href="/" className="hover:text-blue-300 transition">{t("nav.home")}</Link></li>
                  <li><Link href="/services" className="hover:text-blue-300 transition">{t("nav.services")}</Link></li>
                  <li><Link href="/projects" className="hover:text-blue-300 transition">{t("nav.projects")}</Link></li>
                  <li><Link href="/about" className="hover:text-blue-300 transition">{t("nav.about")}</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-300 transition">{t("nav.contact")}</Link></li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Our Services</h4>
                <ul className="space-y-4 text-white/60">
                  <li><Link href="/services" className="hover:text-blue-300 transition">Impianti Elettrici</Link></li>
                  <li><Link href="/services" className="hover:text-blue-300 transition">Climatizzatori e Caldaie</Link></li>
                  <li><Link href="/services" className="hover:text-blue-300 transition">Idraulica e Riparazioni</Link></li>
                  <li><Link href="/services" className="hover:text-blue-300 transition">Ristrutturazioni e Tinteggiatura</Link></li>
                  <li><Link href="/services" className="hover:text-blue-300 transition">Telecamere e Sicurezza</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">{t("footer.contact")}</h4>
                <ul className="space-y-5 text-white/60">
                  <li className="flex gap-3">
                    <Phone className="w-5 h-5 text-orange-400 shrink-0" />
                    <div>
                      <div className="text-xs text-white/40 mb-1">Telefono Fisso</div>
                      <a href="tel:+390418944704" className="hover:text-orange-400 transition text-sm">+39 041 894 4704</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="w-5 h-5 text-orange-400 shrink-0" />
                    <div>
                      <div className="text-xs text-white/40 mb-1">Cellulare</div>
                      <a href="tel:+393518373043" className="hover:text-orange-400 transition text-sm">+39 351 837 3043</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="w-5 h-5 text-blue-300 shrink-0" />
                    <div>
                      <div className="text-xs text-white/40 mb-1">E-mail</div>
                      <a href="mailto:info@arvandtermotec.it" className="hover:text-blue-300 transition text-sm break-all">info@arvandtermotec.it</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-blue-300 shrink-0" />
                    <div className="text-sm">Via Verrocchio, 2,<br />30035 Mirano (VE)</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 pb-28 lg:pb-8 mt-4 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 text-center md:text-left">
            Copyright © 2026 ARVAND TERMO TEC SRLS. {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-sm text-white/40 justify-center flex-wrap">
            <Link href="/privacy-policy" className="hover:text-orange-400 transition">{t("footer.privacy")}</Link>
            <Link href="/terms-and-conditions" className="hover:text-orange-400 transition">{t("forms.accept.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
