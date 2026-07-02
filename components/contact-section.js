"use client";
import { useState } from "react";
import Link from "@/components/LocalizedLink";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { copy, emailAddress, phoneDisplay, phoneHref } from "@/lib/site-copy";
import FAQSection from "@/components/faq-section";
import { useLanguage } from "@/lib/LanguageContext";

export default function ContactSection({ lang = "it" }) {
  const { t } = useLanguage();
  const c = copy[lang];
  const [form, setForm] = useState({ name: "", company: "", phone: "", message: "" });
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
      setStatus("Messaggio inviato con successo.");
      setForm({ name: "", company: "", phone: "", message: "" });
    } catch {
      setStatus("Invio non riuscito.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div><p className="text-sm uppercase tracking-[0.3em] text-orange-400">{c.nav.contact}</p><h2 className="mt-4 text-3xl font-semibold md:text-5xl">{c.contactTitle}</h2><p className="mt-6 max-w-xl text-lg leading-8 text-white/65">{c.contactText}</p><div className="mt-10 space-y-5"><div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5"><Phone className="h-5 w-5 text-orange-400" /><a href={phoneHref} className="text-white/85 transition hover:text-orange-300">{phoneDisplay}</a></div><div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5"><MapPin className="h-5 w-5 text-orange-400" /><span className="text-white/85">{c.locationValue}</span></div><div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5"><Mail className="h-5 w-5 text-orange-400" /><a href={`mailto:${emailAddress}`} className="text-white/70 transition hover:text-orange-300">{emailAddress}</a></div></div></div>
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-8">
          <form className="group grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <input value={form.name} onChange={(e) => updateField("name", e.target.value)} required placeholder={c.contactForm.name} className="rounded-2xl border border-white/10 bg-[#102A5C] px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition focus:border-orange-400" />
              <input value={form.company} onChange={(e) => updateField("company", e.target.value)} placeholder={c.contactForm.company} className="rounded-2xl border border-white/10 bg-[#102A5C] px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition focus:border-orange-400" />
            </div>
            <input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} required placeholder={c.contactForm.phone} className="rounded-2xl border border-white/10 bg-[#102A5C] px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition focus:border-orange-400" />
            <textarea rows={6} value={form.message} onChange={(e) => updateField("message", e.target.value)} required placeholder={c.contactForm.message} className="rounded-2xl border border-white/10 bg-[#102A5C] px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition focus:border-orange-400" />
            
            <div className="flex items-start gap-3 mt-1 mb-2">
              <input
                type="checkbox"
                id="privacy-contact-section"
                required
                className="mt-1 w-5 h-5 rounded border-white/20 bg-[#102A5C] text-orange-500 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="privacy-contact-section" className="text-sm">
                <span className="text-sm text-white/70">
                  {t("forms.accept.part1")}
                  <Link href="/privacy-policy" className="text-orange-400 hover:underline">
                    {t("forms.accept.privacy")}
                  </Link>
                  {t("forms.accept.part2")}
                  <Link href="/terms-and-conditions" className="text-orange-400 hover:underline">
                    {t("forms.accept.terms")}
                  </Link>
                  {t("forms.accept.part3_short")}
                </span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(249,115,22,0.3)] transition hover:translate-y-[-1px] disabled:opacity-60 group-invalid:opacity-50">
              {loading ? "Invio in corso..." : c.contactForm.button}
              <ArrowRight className="h-4 w-4" />
            </button>
            {status && <p className="text-sm text-white/70">{status}</p>}
          </form>
        </div>
      </div>
      <FAQSection lang={lang} />
    </section>
  );
}
