"use client";
import { useState } from "react";

import Link from "@/components/layout/LocalizedLink";
import { usePathname } from "next/navigation";
import { Linkedin, Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
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
      setPopup({ type: "success", message: "Subscription completed successfully!" });
      setEmail("");
    } catch (err) {
      setPopup({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="relative border-t border-brand-border bg-brand-primary pt-16 overflow-hidden">
      {/* Background Texture / Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_40%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] mb-16">
          
                    {/* LEFT SIDE: BRAND & SLOGAN */}
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              <p>Scale Through Code,<br />Not Headcount.</p>
            </h2>
            <p className="text-white/80 mb-8 max-w-sm font-medium leading-relaxed">
              Eliminating manual AEC bottlenecks with custom Python automation, zero-error BIM coordination, and strict <strong>ISO 19650</strong> and <strong>UNI 11337</strong> compliance.
            </p>
            
            {/* Social Icons */}
            <p className="text-white/80 mb-3 font-semibold text-sm">Connect with our Core Engineers:</p>
            <div className="flex gap-4 mb-10 text-white">
              <a href="https://www.linkedin.com/company/pybim" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:bg-white hover:text-[#0077b5] transition bg-white/10 p-2.5 rounded-full border border-white/20">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Box */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-white/90">
              <div className="mb-3 inline-block">
                <img src="/logo_white_transparent.png" alt="pyBIM logo" className="h-8 w-auto object-contain" />
              </div>
              <div className="font-bold text-white">pyBIM Algorithmic R&D Lab</div>
              <div className="mt-1 text-white/80 font-medium">Padua Tech Hub, Italy</div>
            </div>
          </div>

          {/* RIGHT SIDE: LIGHT PANEL CARD */}
          <div className="rounded-[2.5rem] border border-brand-border bg-white p-8 md:p-12 shadow-2xl">
                        {/* Newsletter Block */}
            <div className="mb-12 border-b border-brand-border pb-10">
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-3">The AEC Automation Brief</h3>
              <p className="text-sm text-brand-textSecondary mb-6 font-medium leading-relaxed">
                Join tier-one DACH and Italian engineering firms receiving our latest Python scripts, ROI breakdowns, and algorithmic bottleneck solutions directly.
              </p>
              <form className="group flex flex-col gap-4" onSubmit={handleNewsletter}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 rounded-2xl border border-brand-border bg-brand-surface px-5 py-4 text-brand-textPrimary placeholder:text-brand-textSecondary outline-none transition focus:border-brand-primary focus:bg-white"
                  />
                  <button 
                    type="submit" 
                    disabled={loading} 
                    aria-label="Subscribe" 
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
                    className="mt-1 w-4 h-4 rounded border-brand-border bg-brand-surface text-brand-primary focus:ring-brand-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="privacy-footer" className="text-xs text-brand-textSecondary leading-relaxed">
                    I accept the <Link href="/privacy-policy" className="text-brand-primary font-semibold hover:underline">Privacy Policy</Link>.<br />
                    <span className="italic opacity-80">(100% Free & Secure. Pure engineering data, no marketing fluff. Unsubscribe anytime.)</span>
                  </label>
                </div>
              </form>
            </div>

                        {/* Three Columns */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-brand-textPrimary mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                <ul className="space-y-4 text-brand-textSecondary font-medium">
                  <li><Link href="/" className="hover:text-brand-primary transition">Home</Link></li>
                  <li><Link href="/services" className="hover:text-brand-primary transition">Services</Link></li>
                  <li><Link href="/projects" className="hover:text-brand-primary transition">Projects</Link></li>
                  <li><Link href="/about" className="hover:text-brand-primary transition">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-brand-primary transition">Contact</Link></li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h4 className="font-bold text-brand-textPrimary mb-6 uppercase tracking-wider text-sm">Core Solutions</h4>
                <ul className="space-y-4 text-brand-textSecondary font-medium">
                  <li><Link href="/services/algorithmic-engineering" className="hover:text-brand-primary transition">Algorithmic Engineering</Link></li>
                  <li><Link href="/services/code-automation" className="hover:text-brand-primary transition">Code & Automation</Link></li>
                  <li><Link href="/services/cde-lifecycle-data" className="hover:text-brand-primary transition">CDE & Lifecycle Data</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-bold text-brand-textPrimary mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                <ul className="space-y-5 text-brand-textSecondary font-medium">
                  <li className="flex gap-3">
                    <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                    <div>
                      <div className="text-xs text-brand-textSecondary/70 mb-1">Landline</div>
                      <a href="tel:+390491234567" className="hover:text-brand-primary transition text-sm font-semibold text-brand-textPrimary">+39 049 123 4567</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                    <div>
                      <div className="text-xs text-brand-textSecondary/70 mb-1">E-mail</div>
                      <a href="mailto:info@pybim.com" className="hover:text-brand-primary transition text-sm break-all font-semibold text-brand-textPrimary">info@pybim.com</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="w-5 h-5 text-brand-primary shrink-0" />
                    <div>
                      <div className="text-xs text-brand-textSecondary/70 mb-1">Location</div>
                      <div className="text-sm font-semibold text-brand-textPrimary">Padua, Veneto, Italy</div>
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
            Copyright © 2026 pyBIM. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/80 font-medium justify-center flex-wrap">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition">Terms and Conditions</Link>
          </div>
        </div>
      </div>

      {popup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-base/80 backdrop-blur-sm animate-in fade-in duration-200 text-left">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-brand-border text-center transform animate-in zoom-in-95 duration-200">
            <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${popup.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {popup.type === 'success' ? <CheckCircle2 className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
            </div>
            
            <h3 className="mb-2 text-2xl font-bold text-brand-textPrimary">
              {popup.type === 'success' ? "Success!" : "Action Required"}
            </h3>
            
            <p className="mb-8 text-base font-medium leading-relaxed text-brand-textSecondary" style={{ direction: 'rtl' }}>
              {popup.message}
            </p>
            
            <button
              onClick={() => setPopup(null)}
              className={`w-full rounded-2xl px-6 py-4 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 ${popup.type === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-brand-primary hover:bg-brand-primaryHover'}`}
            >
              {popup.type === 'success' ? "Close" : "Got it"}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
