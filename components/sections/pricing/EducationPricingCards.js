"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { TerminalSquare, LockOpen, Code2, PlayCircle, FolderGit2, CheckCircle2, ChevronRight } from "lucide-react";

export default function EducationPricingCards() {
  const [billingCycle, setBillingCycle] = useState("annual"); // "monthly" or "annual"

  return (
    <section className="px-6 lg:px-8 max-w-7xl mx-auto w-full mb-32">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-gray-800 text-blue-400 font-mono text-xs font-semibold uppercase tracking-widest mb-4">
          <TerminalSquare className="w-3.5 h-3.5" />
          <span>EDUCATION & DEVELOPER HUB</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          Code License & Training
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed mb-8">
          Unlock the paywall. Access our proprietary C#/Python repositories, algorithmic workflows, and masterclass videos.
        </p>
        
        {/* Billing Toggle */}
        <div className="inline-flex items-center p-1 bg-[#18181b] border border-gray-800 rounded-xl relative">
          <button 
            onClick={() => setBillingCycle("monthly")}
            className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${billingCycle === "monthly" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            Billed Monthly
          </button>
          <button 
            onClick={() => setBillingCycle("annual")}
            className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${billingCycle === "annual" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            Billed Annually
          </button>
          <div 
            className={`absolute top-1 bottom-1 w-1/2 bg-[#27272a] rounded-lg transition-transform duration-300 ease-in-out ${billingCycle === "annual" ? "translate-x-full left-[-4px]" : "translate-x-0 left-1"}`}
            style={{ width: "calc(50% - 4px)" }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Card 1: Single-Asset */}
        <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-8 lg:p-10 flex flex-col justify-between group hover:border-gray-600 transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-4 text-gray-400 font-mono text-sm uppercase tracking-widest">
              <PlayCircle className="w-5 h-5" />
              Single-Asset Access
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Pay-per-Item</h3>
            <p className="text-sm text-gray-500 mb-8">Best for isolated problem solving.</p>
            
            <div className="text-5xl font-extrabold text-white mb-8 tracking-tighter">
              €199 <span className="text-lg text-gray-600 font-normal">/ asset</span>
            </div>

            <ul className="space-y-4 mb-10 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-500 shrink-0" />
                Lifetime access to one specific script or video.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-500 shrink-0" />
                Version updates for the purchased asset.
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <span className="w-5 h-5 shrink-0 flex items-center justify-center font-bold">✕</span>
                No access to main GitHub repositories.
              </li>
            </ul>
          </div>

          <Link
            href="/education"
            className="w-full inline-flex items-center justify-between px-6 py-4 rounded-xl bg-[#27272a] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#3f3f46] transition-all"
          >
            <span className="flex items-center gap-2"><LockOpen className="w-4 h-4" /> UNLOCK ASSET</span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Card 2: All-Access */}
        <div className="bg-gradient-to-b from-blue-900/20 to-[#18181b] border border-blue-900/50 rounded-3xl p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50 transition-colors shadow-[0_0_40px_rgba(37,99,235,0.05)]">
          
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
            Enterprise / Developer
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4 text-blue-400 font-mono text-sm uppercase tracking-widest">
              <Code2 className="w-5 h-5" />
              All-Access Subscription
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Developer Hub</h3>
            <p className="text-sm text-blue-400/80 mb-8">Unrestricted algorithmic access.</p>
            
            <div className="text-5xl font-extrabold text-white mb-8 tracking-tighter">
              {billingCycle === "monthly" ? "€499" : "€399"} <span className="text-lg text-gray-600 font-normal">/ mo</span>
              {billingCycle === "annual" && <div className="text-xs text-blue-400 font-mono mt-2 font-normal tracking-normal uppercase">Billed €4,788 yearly</div>}
            </div>

            <ul className="space-y-4 mb-10 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-white font-medium">Complete Paywall bypass</span> on the Education page.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                Live access to public code repositories via <span className="font-mono text-blue-300 text-xs">git clone</span>.
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                Automatic algorithmic pipeline updates.
              </li>
            </ul>
          </div>

          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-between px-6 py-4 rounded-xl bg-blue-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
          >
            <span className="flex items-center gap-2"><FolderGit2 className="w-4 h-4" /> INITIATE SUBSCRIPTION</span>
            <ChevronRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
