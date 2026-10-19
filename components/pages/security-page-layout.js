"use client";

import { Shield, ShieldAlert, Lock, Server, Network, Database, Cpu, Globe, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";
import enData from "@/lib/translations/en/security.json";
import deData from "@/lib/translations/de/security.json";
import itData from "@/lib/translations/it/security.json";
import LegalPageShell, { LegalPageSection } from "@/components/common/LegalPageShell";

export default function SecurityPageLayout() {
  const { language } = useLanguage();
  const data = language === 'it' ? itData : language === 'de' ? deData : enData;

  return (
    <LegalPageShell>
      {/* =========================================================================
          SECTION 1 (FAMILY A): Breadcrumb, Page Hero & Whitepaper Header
          bg-brand-base + EngineeringBackdrop variant="base"
          ========================================================================= */}
      <LegalPageSection family="a" maxWidthClass="max-w-6xl" as="header" className="pt-8 sm:pt-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-mono text-brand-textSecondary">
            <li>
              <Link href="/" className="hover:text-brand-primary transition-colors">
                pybim.com
              </Link>
            </li>
            <li aria-hidden="true" className="text-brand-border">/</li>
            <li className="text-brand-textPrimary font-semibold" aria-current="page">
              Security Architecture
            </li>
          </ol>
        </nav>

        {/* Hero Card */}
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 md:p-10 lg:p-12 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0">
              <Shield className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <span className="text-technical font-mono uppercase tracking-wider text-brand-primary font-semibold block mb-1">
                pyBIM Security Whitepaper & Architecture Protocol
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-display font-bold tracking-tight text-brand-textPrimary">
                {data.title}
              </h1>
            </div>
          </div>
          <p className="text-[15px] sm:text-lead text-brand-textSecondary leading-[1.7] max-w-4xl">
            {data.subtitle}
          </p>
        </div>
      </LegalPageSection>

      {/* =========================================================================
          SECTION 2 (FAMILY B): Dual-Zone System Boundary & Network Isolation Diagram (Block 1)
          bg-brand-surface + EngineeringBackdrop variant="surface"
          ========================================================================= */}
      <LegalPageSection family="b" maxWidthClass="max-w-6xl" id="security-architecture">
        <div className="space-y-12">
          {/* Dual-Zone Architecture Clarification */}
          {data.scope_clarification && (
            <div
              aria-labelledby="dual-zone-heading"
              className="rounded-2xl border border-brand-border bg-brand-cardElevated p-6 sm:p-8 lg:p-10 shadow-xs space-y-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-3 border-b border-brand-border pb-4">
                <div>
                  <span className="text-technical font-mono uppercase tracking-wider text-brand-primary font-semibold block mb-1">
                    System Boundary
                  </span>
                  <h2 id="dual-zone-heading" className="text-xl sm:text-2xl font-bold text-brand-textPrimary">
                    {data.scope_clarification.title}
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-technical font-mono font-semibold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  {data.scope_clarification.badge}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Zone 1 */}
                <div className="p-6 rounded-xl bg-brand-base border border-brand-border space-y-3">
                  <div className="flex items-center gap-2.5 text-brand-primary font-bold text-base">
                    <Lock className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{data.scope_clarification.client_zone_title}</span>
                  </div>
                  <p className="text-[15px] text-brand-textSecondary leading-[1.7]">
                    {data.scope_clarification.client_zone_desc}
                  </p>
                </div>

                {/* Zone 2 */}
                <div className="p-6 rounded-xl bg-brand-base border border-brand-border space-y-3">
                  <div className="flex items-center gap-2.5 text-cyan-600 dark:text-cyan-400 font-bold text-base">
                    <Globe className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{data.scope_clarification.web_zone_title}</span>
                  </div>
                  <p className="text-[15px] text-brand-textSecondary leading-[1.7]">
                    {data.scope_clarification.web_zone_desc}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Block 1: Network Isolation Diagram */}
          <div aria-labelledby="diagram-heading" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
                <Network className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 id="diagram-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary tracking-tight">
                {data.block1.title}
              </h2>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-base p-5 sm:p-7 md:p-8 shadow-xs space-y-5">
              {/* SVG Infographic with Horizontal Scroll Frame on Mobile */}
              <div className="w-full overflow-x-auto rounded-xl border border-brand-border/80 bg-brand-surface/60 p-2 sm:p-4">
                <svg
                  viewBox="0 0 800 400"
                  className="w-full min-w-[680px] h-auto font-mono select-none"
                  role="img"
                  aria-label="Network isolation architecture diagram showing client LAN perimeter isolated from public cloud APIs"
                >
                  {/* Client LAN Perimeter */}
                  <rect
                    x="50"
                    y="50"
                    width="450"
                    height="300"
                    rx="12"
                    className="fill-brand-base stroke-slate-400 dark:stroke-slate-600"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                  />
                  <text x="70" y="82" className="fill-slate-700 dark:fill-slate-300 font-mono" fontSize="12" fontWeight="700" letterSpacing="0.05em">
                    {data.diagram_text.lan}
                  </text>

                  {/* Edge Hardware / Docker Container */}
                  <rect
                    x="90"
                    y="115"
                    width="370"
                    height="195"
                    rx="10"
                    className="fill-brand-surface stroke-blue-600 dark:stroke-blue-400"
                    strokeWidth="1.75"
                  />
                  <text x="110" y="145" className="fill-slate-900 dark:fill-slate-100 font-sans" fontSize="14" fontWeight="700">
                    {data.diagram_text.edge}
                  </text>

                  {/* Left Stack: AI Engine */}
                  <rect
                    x="110"
                    y="170"
                    width="150"
                    height="115"
                    rx="8"
                    className="fill-brand-base stroke-brand-border"
                    strokeWidth="1"
                  />
                  <text x="125" y="198" className="fill-slate-900 dark:fill-slate-100 font-mono" fontSize="12" fontWeight="700">
                    {data.diagram_text.local_llm}
                  </text>
                  <text x="125" y="224" className="fill-slate-600 dark:fill-slate-400 font-mono" fontSize="11">
                    {data.diagram_text.rag}
                  </text>
                  <text x="125" y="250" className="fill-slate-600 dark:fill-slate-400 font-mono" fontSize="11">
                    {data.diagram_text.python}
                  </text>

                  {/* Right Stack: Client BIM Stack */}
                  <rect
                    x="290"
                    y="170"
                    width="150"
                    height="115"
                    rx="8"
                    className="fill-brand-base stroke-brand-border"
                    strokeWidth="1"
                  />
                  <text x="305" y="198" className="fill-slate-900 dark:fill-slate-100 font-mono" fontSize="12" fontWeight="700">
                    {data.diagram_text.revit}
                  </text>
                  <text x="305" y="224" className="fill-slate-600 dark:fill-slate-400 font-mono" fontSize="11">
                    {data.diagram_text.cde}
                  </text>

                  {/* LAN Bidirectional arrow between AI and BIM */}
                  <path d="M 260 225 L 290 225" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />
                  <path d="M 290 225 L 260 225" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />

                  {/* External Cloud (Isolated) */}
                  <rect
                    x="610"
                    y="115"
                    width="150"
                    height="195"
                    rx="10"
                    className="fill-rose-500/5 stroke-rose-500/40"
                    strokeWidth="1.5"
                  />
                  <text x="625" y="145" className="fill-slate-900 dark:fill-slate-100 font-sans" fontSize="13" fontWeight="700">
                    {data.diagram_text.public_apis}
                  </text>
                  <text x="625" y="170" className="fill-slate-600 dark:fill-slate-400 font-mono" fontSize="11">
                    {data.diagram_text.cloud}
                  </text>

                  {/* Severed Connection Line */}
                  <path d="M 460 215 L 610 215" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" />

                  {/* Severed Badge */}
                  <g transform="translate(535, 215)">
                    <circle cx="0" cy="0" r="14" className="fill-rose-500/20 stroke-rose-500" strokeWidth="1.5" />
                    <path d="M -5 -5 L 5 5 M -5 5 L 5 -5" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
                  </g>
                  <text x="465" y="195" className="fill-rose-600 dark:fill-rose-400 font-mono" fontSize="10" fontWeight="700" letterSpacing="0.04em">
                    {data.diagram_text.zero_data}
                  </text>

                  <defs>
                    <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                    </marker>
                  </defs>
                </svg>
              </div>

              <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed border-t border-brand-border pt-3">
                {data.block1.diagram_caption}
              </p>
            </div>
          </div>
        </div>
      </LegalPageSection>

      {/* =========================================================================
          SECTION 3 (FAMILY A): Standards & Compliance Mapping Matrix (Block 2)
          bg-brand-base + EngineeringBackdrop variant="base"
          ========================================================================= */}
      <LegalPageSection family="a" maxWidthClass="max-w-6xl" id="security-matrix">
        <div aria-labelledby="matrix-heading" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <Lock className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 id="matrix-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary tracking-tight">
              {data.block2.title}
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-brand-border bg-brand-surface shadow-xs">
            <table className="w-full text-left text-sm text-brand-textPrimary min-w-[620px]">
              <thead className="bg-brand-base text-technical uppercase text-brand-textSecondary font-mono border-b border-brand-border">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/4">{data.block2.headers[0]}</th>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/3">{data.block2.headers[1]}</th>
                  <th scope="col" className="px-6 py-4 font-semibold">{data.block2.headers[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {data.block2.rows.map((row, index) => (
                  <tr key={index} className="hover:bg-brand-base/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-brand-textPrimary font-mono text-xs">{row.mandate}</td>
                    <td className="px-6 py-4 text-brand-textSecondary text-[14px] leading-relaxed">{row.requirement}</td>
                    <td className="px-6 py-4 text-brand-textSecondary text-[14px] leading-relaxed">{row.execution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </LegalPageSection>

      {/* =========================================================================
          SECTION 4 (FAMILY B): Retention Notice (Block 3) & Infrastructure Protocols (Block 4)
          bg-brand-surface + EngineeringBackdrop variant="surface"
          ========================================================================= */}
      <LegalPageSection family="b" maxWidthClass="max-w-6xl" id="security-infrastructure">
        <div className="space-y-12">
          {/* Block 3: Zero-Telemetry & Data Retention Policy */}
          <div aria-labelledby="retention-heading" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
                <ShieldAlert className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 id="retention-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary tracking-tight">
                {data.block3.title}
              </h2>
            </div>

            <div className="rounded-2xl border border-rose-500/25 bg-brand-base p-6 sm:p-8 relative overflow-hidden shadow-xs space-y-5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{data.block3.notice_title}</span>
                </h3>
                <p className="text-[15px] sm:text-base text-brand-textPrimary font-medium leading-[1.7]">
                  {data.block3.notice_text}
                </p>
              </div>

              <div className="bg-brand-surface rounded-xl p-5 sm:p-6 border border-brand-border">
                <h4 className="text-technical font-bold text-brand-textPrimary uppercase mb-2 tracking-wider font-mono">
                  {data.block3.purge_title}
                </h4>
                <p className="text-brand-textSecondary text-[14px] leading-[1.7]">
                  {data.block3.purge_text}
                </p>
              </div>
            </div>
          </div>

          {/* Block 4: Encryption & Infrastructure Protocols */}
          <div aria-labelledby="infra-heading" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
                <Database className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 id="infra-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary tracking-tight">
                {data.block4.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Sector 1: GPU-VPS */}
              <div className="bg-brand-base border border-brand-border rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
                <div className="w-11 h-11 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
                  <Server className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-brand-textPrimary">{data.block4.sector1_title}</h3>
                <ul className="space-y-3.5 text-xs sm:text-sm">
                  {data.block4.sector1_items.map((item, idx) => (
                    <li key={idx} className="space-y-1">
                      <strong className="text-brand-textPrimary block font-semibold">{item.title}</strong>
                      <span className="text-brand-textSecondary text-xs leading-relaxed block">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sector 2: Edge Appliance */}
              <div className="bg-brand-base border border-brand-border rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
                <div className="w-11 h-11 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
                  <Cpu className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-brand-textPrimary">{data.block4.sector2_title}</h3>
                <ul className="space-y-3.5 text-xs sm:text-sm">
                  {data.block4.sector2_items.map((item, idx) => (
                    <li key={idx} className="space-y-1">
                      <strong className="text-brand-textPrimary block font-semibold">{item.title}</strong>
                      <span className="text-brand-textSecondary text-xs leading-relaxed block">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sector 3: Public Web / Cloudflare */}
              <div className="bg-brand-base border border-brand-border rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
                <div className="w-11 h-11 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Globe className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-brand-textPrimary">{data.block4.sector3_title}</h3>
                <ul className="space-y-3.5 text-xs sm:text-sm">
                  {data.block4.sector3_items.map((item, idx) => (
                    <li key={idx} className="space-y-1">
                      <strong className="text-brand-textPrimary block font-semibold">{item.title}</strong>
                      <span className="text-brand-textSecondary text-xs leading-relaxed block">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LegalPageSection>
    </LegalPageShell>
  );
}
