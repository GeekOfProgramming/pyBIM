"use client";

import { Shield, ShieldAlert, Lock, Server, Network, Database, Cpu } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import enData from "@/lib/translations/en/security.json";
import deData from "@/lib/translations/de/security.json";
import itData from "@/lib/translations/it/security.json";

export default function SecurityPageLayout() {
  const { language } = useLanguage();
  const data = language === 'it' ? itData : language === 'de' ? deData : enData;

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-24 md:py-32 px-6 lg:px-8 text-gray-700 dark:text-slate-300 font-sans selection:bg-brand-primary selection:text-white transition-colors">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="mb-16 border-b border-gray-200 dark:border-slate-800 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl border border-brand-primary/20 dark:border-brand-primary/30 text-brand-primary">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              {data.title}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* BLOCK 1: NETWORK ISOLATION DIAGRAM */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Network className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              {data.block1.title}
            </h2>
          </div>
          <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm dark:shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            {/* SVG Infographic */}
            <div className="relative z-10 w-full overflow-x-auto">
              <svg viewBox="0 0 800 400" className="w-full min-w-[600px] h-auto drop-shadow-sm dark:drop-shadow-lg font-mono">
                {/* Client LAN Perimeter */}
                <rect x="50" y="50" width="450" height="300" rx="12" className="fill-white dark:fill-[#0f172a] stroke-gray-300 dark:stroke-[#334155]" strokeWidth="2" strokeDasharray="8 8" />
                <text x="70" y="80" className="fill-gray-600 dark:fill-[#94a3b8]" fontSize="14" fontWeight="bold">{data.diagram_text.lan}</text>
                
                {/* Edge Hardware / Docker */}
                <rect x="100" y="120" width="350" height="180" rx="8" className="fill-blue-50/60 dark:fill-[#1e293b] stroke-blue-500" strokeWidth="2" />
                <text x="120" y="150" className="fill-gray-900 dark:fill-[#f8fafc]" fontSize="16" fontWeight="bold">{data.diagram_text.edge}</text>
                
                <rect x="120" y="180" width="140" height="90" rx="6" className="fill-white dark:fill-[#0f172a] stroke-gray-300 dark:stroke-[#64748b]" strokeWidth="1" />
                <text x="135" y="210" className="fill-gray-700 dark:fill-[#cbd5e1]" fontSize="12">{data.diagram_text.local_llm}</text>
                <text x="135" y="230" className="fill-gray-700 dark:fill-[#cbd5e1]" fontSize="12">{data.diagram_text.rag}</text>
                <text x="135" y="250" className="fill-gray-700 dark:fill-[#cbd5e1]" fontSize="12">{data.diagram_text.python}</text>

                <rect x="290" y="180" width="140" height="90" rx="6" className="fill-white dark:fill-[#0f172a] stroke-gray-300 dark:stroke-[#64748b]" strokeWidth="1" />
                <text x="305" y="210" className="fill-gray-700 dark:fill-[#cbd5e1]" fontSize="12">{data.diagram_text.revit}</text>
                <text x="305" y="230" className="fill-gray-700 dark:fill-[#cbd5e1]" fontSize="12">{data.diagram_text.cde}</text>
                
                <path d="M 260 225 L 290 225" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                <path d="M 290 225 L 260 225" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* External Cloud */}
                <rect x="620" y="120" width="150" height="180" rx="8" className="fill-red-50/60 dark:fill-[#1e293b] stroke-red-500" strokeWidth="2" />
                <text x="640" y="150" className="fill-gray-900 dark:fill-[#f8fafc]" fontSize="14" fontWeight="bold">{data.diagram_text.public_apis}</text>
                <text x="640" y="175" className="fill-gray-600 dark:fill-[#94a3b8]" fontSize="12">{data.diagram_text.cloud}</text>
                
                {/* Severed Connection */}
                <path d="M 450 210 L 620 210" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 6" />
                
                {/* Red X */}
                <g transform="translate(535, 210)">
                  <circle cx="0" cy="0" r="16" className="fill-red-100 dark:fill-[#7f1d1d]" />
                  <path d="M -6 -6 L 6 6 M -6 6 L 6 -6" className="stroke-red-600 dark:stroke-[#f87171]" strokeWidth="3" strokeLinecap="round" />
                </g>
                <text x="470" y="195" className="fill-red-600 dark:fill-[#f87171]" fontSize="12" fontWeight="bold">{data.diagram_text.zero_data}</text>

                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="mt-6 text-sm text-gray-500 dark:text-slate-400 font-medium">
              {data.block1.diagram_caption}
            </p>
          </div>
        </section>

        {/* BLOCK 2: COMPLIANCE MAPPING MATRIX */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              {data.block2.title}
            </h2>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 shadow-sm">
            <table className="w-full text-left text-sm text-gray-700 dark:text-slate-300">
              <thead className="bg-gray-50 dark:bg-slate-800 text-xs uppercase text-gray-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 font-semibold w-1/4">{data.block2.headers[0]}</th>
                  <th scope="col" className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 font-semibold w-1/3">{data.block2.headers[1]}</th>
                  <th scope="col" className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 font-semibold">{data.block2.headers[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/50">
                {data.block2.rows.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white">{row.mandate}</td>
                    <td className="px-6 py-5 text-gray-600 dark:text-slate-300">{row.requirement}</td>
                    <td className="px-6 py-5 text-gray-600 dark:text-slate-300">{row.execution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BLOCK 3: ZERO-TELEMETRY & DATA RETENTION POLICY */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              {data.block3.title}
            </h2>
          </div>
          <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/70 dark:bg-red-950/20 p-8 relative overflow-hidden shadow-sm dark:shadow-[0_0_40px_rgba(127,29,29,0.1)]">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
            <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              {data.block3.notice_title}
            </h3>
            <p className="text-lg text-gray-900 dark:text-white font-medium mb-6 leading-relaxed">
              {data.block3.notice_text}
            </p>
            <div className="bg-white/90 dark:bg-slate-900/80 rounded-xl p-6 border border-red-100 dark:border-slate-800/80 shadow-xs">
              <h4 className="text-sm font-bold text-gray-900 dark:text-slate-300 uppercase mb-2 tracking-wider">{data.block3.purge_title}</h4>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                {data.block3.purge_text}
              </p>
            </div>
          </div>
        </section>

        {/* BLOCK 4: ENCRYPTION & INFRASTRUCTURE PROTOCOLS */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              {data.block4.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* GPU-VPS Sector */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-slate-700 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 text-brand-primary">
                <Server className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{data.block4.sector1_title}</h3>
              <ul className="space-y-4">
                {data.block4.sector1_items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-slate-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0"></div>
                    <div>
                      <strong className="text-gray-900 dark:text-slate-200 block mb-1">{item.title}</strong>
                      <span className="text-sm text-gray-600 dark:text-slate-400">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Edge Appliance Sector */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-slate-700 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 text-brand-primary">
                <Cpu className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{data.block4.sector2_title}</h3>
              <ul className="space-y-4">
                {data.block4.sector2_items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-slate-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0"></div>
                    <div>
                      <strong className="text-gray-900 dark:text-slate-200 block mb-1">{item.title}</strong>
                      <span className="text-sm text-gray-600 dark:text-slate-400">{item.text}</span>
                    </div>
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
