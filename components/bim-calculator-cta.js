"use client";
import { Calculator, Download } from "lucide-react";

export default function BimCalculatorCta() {
  return (
    <section className="bg-brand-background py-20 border-b border-white/5">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="rounded-[2rem] bg-brand-surface border border-brand-border p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Side - Copy */}
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
              <Calculator className="w-6 h-6 text-brand-accent" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-brand-textPrimary mb-6 leading-tight">
              Ready to Stop Wasting<br />Time on <span className="text-brand-accent">Manual Modeling?</span>
            </h2>
            
            <p className="text-brand-textSecondary mb-8 leading-relaxed">
              Download our <strong>BIM Automation ROI Calculator</strong>. Discover how many hours your team can save by replacing repetitive tasks with custom pyRevit scripts and APIs.
            </p>
            
            <ul className="space-y-4 text-sm font-medium text-brand-textPrimary">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                Accurate estimate of hours saved
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                Custom ROI analysis for your studio
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                BIM productivity KPIs and metrics
              </li>
            </ul>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-brand-background rounded-3xl p-8 border border-white/5 shadow-inner">
              <form className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-brand-textPrimary tracking-wide">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full rounded-xl border border-white/10 bg-brand-surfaceHover px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-brand-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-brand-textPrimary tracking-wide">Work Email</label>
                  <input
                    type="email"
                    placeholder="john@architecture-studio.com"
                    required
                    className="w-full rounded-xl border border-white/10 bg-brand-surfaceHover px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-brand-accent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-brand-textPrimary tracking-wide">Company Size</label>
                  <select
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-white/10 bg-brand-surfaceHover px-4 py-3 text-white outline-none transition focus:border-brand-accent focus:ring-brand-accent appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-white/40">Select an option</option>
                    <option value="1-10">1-10 Employees</option>
                    <option value="11-50">11-50 Employees</option>
                    <option value="51-200">51-200 Employees</option>
                    <option value="200+">200+ Employees</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-4 font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all hover:bg-brand-accentHover hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" /> Download Free ROI Calculator
                </button>
                
                <p className="text-center text-xs text-white/40 mt-2">
                  Your data is protected. We will never send spam.
                </p>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
