"use client";
import { useState } from "react";
import Link from "@/components/LocalizedLink";
import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, MessageCircle } from "lucide-react";
import { emailAddress, phoneDisplay, phoneHref } from "@/lib/site-copy";
import FAQSection from "@/components/faq-section";
import { useLanguage } from "@/lib/LanguageContext";
import CareersCTA from "@/components/careers-cta";

export default function ContactPageLayout() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send");
      setStatus(t("contact.form.success"));
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus(t("contact.form.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* HERO BG SECTION */}
      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden py-20 px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <img
            src="/Pictures/Contact/contact-002.jpg"
            alt="Arvand Termo Tec HVAC Building"
            className="h-full w-full object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081730]/80 via-[#081730]/60 to-[#081730]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl text-white drop-shadow-lg">
            {t("contact.hero.title")}
          </h1>
          <p className="mt-6 text-lg font-medium text-orange-400 drop-shadow md:text-xl">
            {t("contact.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* BODY SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-16 md:grid-cols-3">

          {/* COLUMN 1 (1/3 Width) */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-semibold text-white">{t("contact.section.title")}</h2>
            <div className="mt-6 space-y-6 text-lg leading-8 text-white/70">
              <p>{t("contact.section.desc1")}</p>
              <p>{t("contact.section.desc2")}</p>
            </div>


          </div>

          {/* COLUMN 2 (2/3 Width) */}
          <div className="md:col-span-2">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl backdrop-blur-xl md:p-10">
              <h3 className="mb-8 text-2xl font-semibold text-white">{t("contact.form.title")}</h3>
              <form className="group grid gap-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                  <input
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder={t("contact.form.name")}
                    required
                    className="rounded-2xl border border-white/10 bg-[#102A5C] px-5 py-4 text-white placeholder:text-white/40 outline-none transition focus:border-orange-400 focus:bg-[#0f1d32]"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder={t("contact.form.email")}
                    required
                    className="rounded-2xl border border-white/10 bg-[#102A5C] px-5 py-4 text-white placeholder:text-white/40 outline-none transition focus:border-orange-400 focus:bg-[#0f1d32]"
                  />
                </div>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder={t("contact.form.phone")}
                  className="rounded-2xl border border-white/10 bg-[#102A5C] px-5 py-4 text-white placeholder:text-white/40 outline-none transition focus:border-orange-400 focus:bg-[#0f1d32]"
                />
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder={t("contact.form.message")}
                  required
                  className="rounded-2xl border border-white/10 bg-[#102A5C] px-5 py-4 text-white placeholder:text-white/40 outline-none transition focus:border-orange-400 focus:bg-[#0f1d32] resize-y"
                />

                <div className="flex items-start gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="privacy-contact"
                    required
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-[#102A5C] text-orange-500 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="privacy-contact" className="text-sm">
                    <span className="text-sm text-white/70">
                      {t("forms.accept.part1")}
                      <Link href="/privacy-policy" className="text-orange-400 hover:underline">
                        {t("forms.accept.privacy")}
                      </Link>
                      {t("forms.accept.part2")}
                      <Link href="/terms-and-conditions" className="text-orange-400 hover:underline">
                        {t("forms.accept.terms")}
                      </Link>
                      {t("forms.accept.part3")}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-500 px-8 py-5 text-base font-semibold text-white shadow-[0_10px_35px_rgba(249,115,22,0.3)] transition hover:-translate-y-1 hover:bg-orange-400 disabled:opacity-60 group-invalid:opacity-50 md:w-auto md:self-end"
                >
                  {loading ? t("contact.form.sending") : t("contact.form.button")}
                  <ArrowRight className="h-5 w-5" />
                </button>
                {status && (
                  <p className="text-right text-sm font-medium text-white/80">{status}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO SECTION */}
      <section className="bg-[#0a1321] py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {/* TELEFONO FISSO */}
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/5 p-6 text-center transition hover:bg-white/10">
              <Phone className="mb-4 h-8 w-8 text-blue-300" />
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">{t("contact.info.phone_fixed")}</h4>
              <a href={`tel:+390418944704`} className="text-lg font-medium text-white hover:text-sky-300">
                +39 041 894 4704
              </a>
            </div>

            {/* CELLULARE */}
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/5 p-6 text-center transition hover:bg-white/10">
              <Phone className="mb-4 h-8 w-8 text-orange-400" />
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">{t("contact.info.phone_mobile")}</h4>
              <a href={phoneHref} className="text-lg font-medium text-white hover:text-orange-300">
                +39 {phoneDisplay}
              </a>
            </div>

            {/* E-MAIL GENERAL */}
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/5 p-6 text-center transition hover:bg-white/10">
              <Mail className="mb-4 h-8 w-8 text-blue-300" />
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">{t("contact.info.email_general")}</h4>
              <a href={`mailto:${emailAddress}`} className="text-lg font-medium text-white hover:text-sky-300">
                {emailAddress}
              </a>
            </div>

            {/* ADDRESS */}
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/5 p-6 text-center transition hover:bg-white/10">
              <MapPin className="mb-4 h-8 w-8 text-orange-400" />
              <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">{t("contact.info.address")}</h4>
              <a href="https://maps.google.com/?q=Via+Verrocchio+2+30035+Mirano+VE" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-medium text-white hover:text-orange-300">
                Via Verrocchio, 2,<br />30035 Mirano (VE)
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA SECTION */}
      <section className="bg-[#061224] py-20 border-y border-white/5">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h4 className="mb-12 text-sm font-bold uppercase tracking-widest text-white/50">{t("contact.info.socials")}</h4>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">

            <a href="https://web.whatsapp.com/send?phone=393518373043" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-lg">
                <MessageCircle className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-[#25D366]">WhatsApp</span>
            </a>

            <a href="https://www.facebook.com/arvandtermotec" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-300 shadow-lg">
                <Facebook className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-[#1877F2]">Facebook</span>
            </a>

            <a href="https://www.linkedin.com/company/arvand-termo-tec" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-all duration-300 shadow-lg">
                <Linkedin className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-[#0A66C2]">LinkedIn</span>
            </a>

            <a href="https://www.instagram.com/arvandtermotec/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E1306C]/10 border border-[#E1306C]/20 text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-all duration-300 shadow-lg">
                <Instagram className="h-8 w-8" />
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-[#E1306C]">Instagram</span>
            </a>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="pt-20 pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>

      {/* Careers Banner */}
      <CareersCTA />
    </div>
  );
}
