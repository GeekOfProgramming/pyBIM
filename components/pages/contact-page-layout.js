"use client";
import { useState, useEffect } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, MessageCircle, Briefcase, Building, Cog } from "lucide-react";
import { emailAddress, phoneDisplay, phoneHref } from "@/lib/site-copy";
import FAQSection from "@/components/sections/faq-section";
import { useLanguage } from "@/lib/LanguageContext";
import BimCalculatorCta from "@/components/sections/bim-calculator-cta";

export default function ContactPageLayout() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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
    <div className="w-full bg-brand-base">
      {/* COMBINED HERO & FORM SECTION */}
      <section className="relative overflow-hidden py-24 lg:py-32 px-6 lg:px-8 border-b border-brand-border">
        <div className="absolute inset-0 -z-10">
          <img
            src="/Pictures/Contact/contact-002.jpg"
            alt="pyBIM HVAC Building"
            className="h-full w-full object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-base via-brand-base/90 to-brand-surface/70" />
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            
            {/* LEFT COLUMN (40% Width) */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-6 shadow-sm self-start">
                <Briefcase className="w-4 h-4" /> SALES INQUIRY
              </div>
              <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl lg:text-6xl text-brand-textPrimary mb-6 leading-tight">
                {t("contact.hero.title")}
              </h1>
              <p className="text-lg font-bold text-brand-primary md:text-xl mb-12">
                {t("contact.hero.subtitle")}
              </p>

              <div className="border-t border-brand-border pt-8">
                <h2 className="text-2xl font-semibold text-brand-textPrimary mb-4">{t("contact.section.title")}</h2>
                <div className="space-y-4 text-base leading-relaxed text-brand-textSecondary font-medium">
                  <p>{t("contact.section.desc1")}</p>
                  <p>{t("contact.section.desc2")}</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (60% Width) */}
            <div className="lg:col-span-7">
              <div id="sales" className="rounded-[2rem] border border-brand-border bg-white p-6 shadow-xl md:p-10">
                <h3 className="mb-8 text-2xl font-semibold text-brand-textPrimary">{t("contact.form.title")}</h3>
                <form className="group grid gap-6" onSubmit={handleSubmit}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder={t("contact.form.name")}
                      required
                      className="rounded-2xl border border-brand-border bg-brand-surface px-5 py-4 text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white focus:ring-1 focus:ring-brand-primary"
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder={t("contact.form.email")}
                      required
                      className="rounded-2xl border border-brand-border bg-brand-surface px-5 py-4 text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white focus:ring-1 focus:ring-brand-primary"
                    />
                  </div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder={t("contact.form.phone")}
                    className="rounded-2xl border border-brand-border bg-brand-surface px-5 py-4 text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white focus:ring-1 focus:ring-brand-primary"
                  />
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder={t("contact.form.message")}
                    required
                    className="rounded-2xl border border-brand-border bg-brand-surface px-5 py-4 text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white focus:ring-1 focus:ring-brand-primary resize-y"
                  />

                  <div className="flex items-start gap-3 mt-2">
                    <input
                      type="checkbox"
                      id="privacy-contact"
                      required
                      className="mt-1 w-5 h-5 rounded border-brand-border bg-brand-surface text-brand-primary focus:ring-brand-primary focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="privacy-contact" className="text-sm">
                      <span className="text-sm text-brand-textSecondary font-medium">
                        {t("forms.accept.part1")}
                        <Link href="/privacy-policy" className="text-brand-primary font-bold hover:underline">
                          {t("forms.accept.privacy")}
                        </Link>
                        {t("forms.accept.part2")}
                        <Link href="/terms-and-conditions" className="text-brand-primary font-bold hover:underline">
                          {t("forms.accept.terms")}
                        </Link>
                        {t("forms.accept.part3")}
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-accent px-8 py-5 text-base font-bold text-white shadow-md transition hover:-translate-y-1 hover:bg-brand-accentHover disabled:opacity-60 group-invalid:opacity-50 md:w-auto md:self-end"
                  >
                    {loading ? t("contact.form.sending") : t("contact.form.button")}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  {status && (
                    <p className="text-right text-sm font-bold text-brand-primary">{status}</p>
                  )}
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* COMBINED CONTACT INFO & SOCIALS SECTION */}
      <section id="headquarters" className="bg-brand-surface py-20 border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Building className="w-4 h-4" /> HEADQUARTERS
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              Our Offices & Direct Channels
            </h3>
          </div>
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            
            {/* LEFT 50%: CONTACT INFO */}
            <div className="flex justify-center">
              <div className="grid gap-6 sm:grid-cols-2 max-w-lg w-full">
                {/* CELLULARE */}
                <div className="flex flex-col items-center justify-center rounded-3xl border border-brand-border bg-white p-6 text-center transition hover:shadow-md">
                  <Phone className="mb-4 h-8 w-8 text-brand-primary" />
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-textSecondary">{t("contact.info.phone_mobile")}</h4>
                  <a href={phoneHref} className="text-lg font-bold text-brand-textPrimary hover:text-brand-primary transition-colors">
                    +39 {phoneDisplay}
                  </a>
                </div>

                {/* E-MAIL GENERAL */}
                <div className="flex flex-col items-center justify-center rounded-3xl border border-brand-border bg-white p-6 text-center transition hover:shadow-md">
                  <Mail className="mb-4 h-8 w-8 text-brand-primary" />
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-textSecondary">{t("contact.info.email_general")}</h4>
                  <a href={`mailto:${emailAddress}`} className="text-lg font-bold text-brand-textPrimary hover:text-brand-primary transition-colors">
                    {emailAddress}
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT 50%: SOCIALS */}
            <div className="flex flex-col items-center">
              <h4 className="mb-8 text-sm font-bold uppercase tracking-widest text-brand-textSecondary text-center">{t("contact.info.socials")}</h4>
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                <a href="https://web.whatsapp.com/send?phone=391234567890" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-brand-border text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-bold text-brand-textSecondary group-hover:text-[#25D366]">WhatsApp</span>
                </a>

                <a href="https://www.facebook.com/pybim" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-brand-border text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                    <Facebook className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-bold text-brand-textSecondary group-hover:text-[#1877F2]">Facebook</span>
                </a>

                <a href="https://www.linkedin.com/company/pybim" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-brand-border text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                    <Linkedin className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-bold text-brand-textSecondary group-hover:text-[#0A66C2]">LinkedIn</span>
                </a>

                <a href="https://www.instagram.com/pybim/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 transition">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-brand-border text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                    <Instagram className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-bold text-brand-textSecondary group-hover:text-[#E1306C]">Instagram</span>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* BIM ROI CALCULATOR CTA */}
      <BimCalculatorCta />

      {/* FAQ SECTION - Technical Support */}
      <section id="support" className="bg-brand-base pt-20 pb-32 border-b border-brand-border">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Cog className="w-4 h-4" /> TECHNICAL SUPPORT
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              Frequently Asked Questions & Support
            </h3>
          </div>
          <FAQSection />
        </div>
      </section>

    </div>
  );
}
