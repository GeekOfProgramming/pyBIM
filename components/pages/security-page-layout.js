"use client";

import { Shield, ShieldAlert, Lock, Server, Network, Database, Cpu, Globe, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import enData from "@/lib/translations/en/security.json";
import deData from "@/lib/translations/de/security.json";
import itData from "@/lib/translations/it/security.json";

export default function SecurityPageLayout() {
  const { language } = useLanguage();
  const data = language === 'it' ? itData : language === 'de' ? deData : enData;

  return (
    <div className="bg-brand-base min-h-screen py-16 md:py-24 px-6 lg:px-8 text-brand-textPrimary font-sans transition-colors border-b border-brand-border">
      <div className="mx-auto max-w-5xl space-y-16">

        {/* Header Section */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3.5 bg-brand-primary/10 rounded-xl border border-brand-primary/20 text-brand-primary">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
                {data.title}
              </h1>
              <p className="text-xs font-mono text-brand-primary mt-1 uppercase tracking-wider font-semibold">
                pyBIM Security Whitepaper & Architecture Protocol
              </p>
            </div>
          </div>
          <p className="text-base md:text-lg text-brand-textSecondary leading-relaxed max-w-4xl">
            {data.subtitle}
          </p>
        </div>

        {/* DUAL-ZONE ARCHITECTURE CLARIFICATION */}
        {data.scope_clarification && (
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-brand-border pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-brand-textPrimary">
                {data.scope_clarification.title}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {data.scope_clarification.badge}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Zone 1 */}
              <div className="p-6 rounded-xl bg-brand-base border border-brand-border space-y-3">
                <div className="flex items-center gap-2.5 text-brand-primary font-bold text-base">
                  <Lock className="w-5 h-5 shrink-0" />
                  <span>{data.scope_clarification.client_zone_title}</span>
                </div>
                <p className="text-sm text-brand-textSecondary leading-relaxed">
                  {data.scope_clarification.client_zone_desc}
                </p>
              </div>

              {/* Zone 2 */}
              <div className="p-6 rounded-xl bg-brand-base border border-brand-border space-y-3">
                <div className="flex items-center gap-2.5 text-cyan-600 dark:text-cyan-400 font-bold text-base">
                  <Globe className="w-5 h-5 shrink-0" />
                  <span>{data.scope_clarification.web_zone_title}</span>
                </div>
                <p className="text-sm text-brand-textSecondary leading-relaxed">
                  {data.scope_clarification.web_zone_desc}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* BLOCK 1: NETWORK ISOLATION DIAGRAM */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Network className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-brand-textPrimary tracking-tight">
              {data.block1.title}
            </h2>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">

            {/* SVG Infographic */}
            <div className="relative z-10 w-full overflow-x-auto">
              <svg viewBox="0 0 800 400" className="w-full min-w-[640px] h-auto font-mono">
                {/* Client LAN Perimeter */}
                <rect x="50" y="50" width="450" height="300" rx="12" className="fill-brand-base stroke-brand-border" strokeWidth="2" strokeDasharray="8 8" />
                <text x="70" y="80" className="fill-brand-textSecondary" fontSize="13" fontWeight="bold">{data.diagram_text.lan}</text>

                {/* Edge Hardware / Docker */}
                <rect x="90" y="115" width="370" height="195" rx="8" className="fill-brand-surface stroke-brand-primary" strokeWidth="2" />
                <text x="110" y="145" className="fill-brand-textPrimary" fontSize="15" fontWeight="bold">{data.diagram_text.edge}</text>

                {/* Left Stack */}
                <rect x="110" y="170" width="150" height="110" rx="6" className="fill-brand-base stroke-brand-border" strokeWidth="1" />
                <text x="125" y="200" className="fill-brand-textPrimary" fontSize="12" fontWeight="600">{data.diagram_text.local_llm}</text>
                <text x="125" y="225" className="fill-brand-textSecondary" fontSize="12">{data.diagram_text.rag}</text>
                <text x="125" y="250" className="fill-brand-textSecondary" fontSize="12">{data.diagram_text.python}</text>

                {/* Right Stack */}
                <rect x="290" y="170" width="150" height="110" rx="6" className="fill-brand-base stroke-brand-border" strokeWidth="1" />
                <text x="305" y="200" className="fill-brand-textPrimary" fontSize="12" fontWeight="600">{data.diagram_text.revit}</text>
                <text x="305" y="225" className="fill-brand-textSecondary" fontSize="12">{data.diagram_text.cde}</text>

                {/* LAN Bidirectional arrow */}
                <path d="M 260 225 L 290 225" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M 290 225 L 260 225" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* External Cloud */}
                <rect x="610" y="115" width="160" height="195" rx="8" className="fill-rose-500/5 stroke-rose-500/40" strokeWidth="2" />
                <text x="630" y="145" className="fill-brand-textPrimary" fontSize="14" fontWeight="bold">{data.diagram_text.public_apis}</text>
                <text x="630" y="170" className="fill-brand-textSecondary" fontSize="12">{data.diagram_text.cloud}</text>

                {/* Severed Connection */}
                <path d="M 460 215 L 610 215" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6 6" />

                {/* Red X */}
                <g transform="translate(535, 215)">
                  <circle cx="0" cy="0" r="16" className="fill-rose-500/20 stroke-rose-500" strokeWidth="1.5" />
                  <path d="M -6 -6 L 6 6 M -6 6 L 6 -6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                </g>
                <text x="470" y="195" className="fill-rose-500 font-bold" fontSize="11">{data.diagram_text.zero_data}</text>

                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="mt-6 text-sm text-brand-textSecondary font-medium border-t border-brand-border pt-4">
              {data.block1.diagram_caption}
            </p>
          </div>
        </section>

        {/* BLOCK 2: COMPLIANCE MAPPING MATRIX */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-brand-textPrimary tracking-tight">
              {data.block2.title}
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-brand-border bg-brand-surface shadow-sm">
            <table className="w-full text-left text-sm text-brand-textPrimary">
              <thead className="bg-brand-base text-xs uppercase text-brand-textSecondary font-mono border-b border-brand-border">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/4">{data.block2.headers[0]}</th>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/3">{data.block2.headers[1]}</th>
                  <th scope="col" className="px-6 py-4 font-semibold">{data.block2.headers[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {data.block2.rows.map((row, index) => (
                  <tr key={index} className="hover:bg-brand-base/50 transition-colors">
                    <td className="px-6 py-5 font-semibold text-brand-textPrimary font-mono text-xs">{row.mandate}</td>
                    <td className="px-6 py-5 text-brand-textSecondary">{row.requirement}</td>
                    <td className="px-6 py-5 text-brand-textSecondary leading-relaxed">{row.execution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BLOCK 3: ZERO-TELEMETRY & DATA RETENTION POLICY */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-brand-textPrimary tracking-tight">
              {data.block3.title}
            </h2>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-brand-surface p-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-rose-500"></div>
            <h3 className="text-lg font-bold text-rose-500 mb-3 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              {data.block3.notice_title}
            </h3>
            <p className="text-base text-brand-textPrimary font-medium mb-6 leading-relaxed">
              {data.block3.notice_text}
            </p>
            <div className="bg-brand-base rounded-xl p-6 border border-brand-border">
              <h4 className="text-xs font-bold text-brand-textPrimary uppercase mb-2 tracking-wider font-mono">
                {data.block3.purge_title}
              </h4>
              <p className="text-brand-textSecondary text-sm leading-relaxed">
                {data.block3.purge_text}
              </p>
            </div>
          </div>
        </section>

        {/* BLOCK 4: ENCRYPTION & INFRASTRUCTURE PROTOCOLS */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-brand-textPrimary tracking-tight">
              {data.block4.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Sector 1: GPU-VPS */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-textPrimary">{data.block4.sector1_title}</h3>
              <ul className="space-y-4 text-sm">
                {data.block4.sector1_items.map((item, idx) => (
                  <li key={idx} className="space-y-1">
                    <strong className="text-brand-textPrimary block font-semibold">{item.title}</strong>
                    <span className="text-brand-textSecondary text-xs leading-relaxed block">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sector 2: Edge Appliance */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-textPrimary">{data.block4.sector2_title}</h3>
              <ul className="space-y-4 text-sm">
                {data.block4.sector2_items.map((item, idx) => (
                  <li key={idx} className="space-y-1">
                    <strong className="text-brand-textPrimary block font-semibold">{item.title}</strong>
                    <span className="text-brand-textSecondary text-xs leading-relaxed block">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sector 3: Public Web / Cloudflare */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-textPrimary">{data.block4.sector3_title}</h3>
              <ul className="space-y-4 text-sm">
                {data.block4.sector3_items.map((item, idx) => (
                  <li key={idx} className="space-y-1">
                    <strong className="text-brand-textPrimary block font-semibold">{item.title}</strong>
                    <span className="text-brand-textSecondary text-xs leading-relaxed block">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
