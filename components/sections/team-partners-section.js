"use client";

import { useState } from "react";
import TeamPartnerCard from "@/components/ui/team-partner-card";
import TeamPartnerModal from "@/components/ui/team-partner-modal";
import { useLanguage } from "@/lib/LanguageContext";
import Carousel from "@/components/ui/carousel";
import { Users, Handshake, Building2, ShieldCheck, Terminal, GraduationCap, Layers, HardDrive, Server, Code2 } from "lucide-react";

export default function TeamPartnersSection({ teamData }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { t, language } = useLanguage();

  const openModal = (person) => setSelectedPerson(person);
  const closeModal = () => setSelectedPerson(null);

  const teamMembers = teamData?.teamMembers || [];
  const individualPartners = teamData?.individualPartners || [];
  const corporatePartners = teamData?.corporatePartners || [];
  const clients = teamData?.clients || [];

  if (teamMembers.length === 0 && individualPartners.length === 0 && corporatePartners.length === 0) return null;

  return (
    <>
      {/* 1. CORE TEAM SECTION */}
      {teamMembers.length > 0 && (
        <section id="team" className="bg-brand-surface w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
                <Users className="w-4 h-4" /> {t("about.team.sec1.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
                {t("about.team.sec1.title")}
              </h2>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t("about.team.sec1.desc") }} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((person, idx) => (
                <div key={`${person.id}-${idx}`} className="animate-in fade-in zoom-in duration-500 h-full">
                  <TeamPartnerCard person={person} onClick={openModal} />
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto text-center pt-10 mt-12 border-t border-brand-border/60">
              <p className="text-sm text-brand-textSecondary/80 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.team.sec1.footer") }} />
            </div>


          </div>
        </section>
      )}

      {/* 2. STRATEGIC ECOSYSTEM & DEPLOYMENT */}
      <section className="bg-[#09090b] w-full border-t border-neutral-800 py-24 lg:py-32 overflow-hidden text-slate-300 font-sans">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* HEADER BLOCK */}
          <div className="text-left mb-14 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-[#12141a] px-3.5 py-1.5 text-xs font-mono font-semibold text-purple-400 mb-4 tracking-wider">
              <Terminal className="w-3.5 h-3.5" /> &gt; _ STRATEGIC ECOSYSTEM &amp; DEPLOYMENT
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Strategic Ecosystem &amp; Deployment.
            </h2>
            <p className="text-neutral-400 text-base md:text-lg font-mono leading-relaxed">
              Operating at the intersection of strict algorithmic engineering and air-gapped enterprise BIM execution. We eliminate manual drafting bottlenecks.
            </p>
          </div>

          {/* TOP ROW: CORE INFRASTRUCTURE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            {/* LEFT BLOCK */}
            <div className="bg-[#111318] border border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-neutral-700 transition-all">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/80 via-blue-500/80 to-transparent" />
              <div>
                <div className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-neutral-900/90 px-2.5 py-1 text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-4">
                  // STRUCTURAL_MANIFEST_01
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 leading-snug">
                  Core R&amp;D &amp; Execution Infrastructure
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  Direct translation of raw software engineering logic into deterministic, enterprise-grade AEC pipelines.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>STATUS // DETERMINISTIC</span>
                <span className="text-purple-400 font-semibold">PIPELINE ACTIVE</span>
              </div>
            </div>

            {/* CENTER BLOCK */}
            <div className="bg-[#111318] border border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-neutral-700 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    <span>// ENGINEERING_HUB</span>
                  </div>
                  <Server className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  The Padua Engineering Hub
                </h3>
                <div className="text-xs font-mono text-purple-400 font-semibold mb-3">
                  Information Engineering Foundation
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  Operating from Northern Italy&apos;s premier technological center, our infrastructure is built on strict data architecture and computational logic, completely bypassing traditional manual drafting workflows.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>LOCATION // PADUA, IT</span>
                <span className="text-purple-400 font-semibold">BASE // R&amp;D LAB</span>
              </div>
            </div>

            {/* RIGHT BLOCK */}
            <div className="bg-[#111318] border border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-neutral-700 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
                    <Code2 className="w-4 h-4" />
                    <span>// API_INTEGRATION</span>
                  </div>
                  <Layers className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Headless OpenBIM &amp; Autodesk API
                </h3>
                <div className="text-xs font-mono text-blue-400 font-semibold mb-3">
                  Automated Integration Pipelines
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  Direct programmatic execution within <strong className="text-neutral-200">Revit</strong> and <strong className="text-neutral-200">Navisworks</strong> APIs. We deploy air-gapped automation kernels to process heavy <strong className="text-neutral-200">IFC4</strong> schemas in seconds, eliminating manual interface friction.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>RUNTIME // C# .NET + PYTHON</span>
                <span className="text-blue-400 font-semibold">MODE // HEADLESS</span>
              </div>
            </div>

          </div>

          {/* BOTTOM ROW: DEPLOYMENT VECTORS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CARD 1: LEFT */}
            <div className="bg-[#111318] border border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-neutral-700 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900/90 px-2.5 py-1 text-[11px] font-mono font-bold text-neutral-400">
                    // DEPLOYMENT_VECTOR_01
                  </span>
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Enterprise Node</h4>
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-3">
                  On-Premise Edge Deployment
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  Air-gapped hardware deployment for Tier-1 contractors. We guarantee <strong className="text-neutral-200">absolute data sovereignty</strong> and eliminate network latency by executing complex geometric algorithms directly within your local LAN.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/80 space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Architecture:</span>
                  <strong className="text-neutral-200 font-semibold">Local Appliance</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Sovereignty:</span>
                  <strong className="text-emerald-400 font-semibold">Air-Gapped / Zero Leak</strong>
                </div>
              </div>
            </div>

            {/* CARD 2: CENTER */}
            <div className="bg-[#111318] border border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-neutral-700 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900/90 px-2.5 py-1 text-[11px] font-mono font-bold text-neutral-400">
                    // DEPLOYMENT_VECTOR_02
                  </span>
                  <Server className="w-4 h-4 text-cyan-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Cloud Vector</h4>
                <div className="text-xs font-mono text-cyan-400 font-semibold mb-3">
                  Isolated GPU-VPS Infrastructure
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  High-throughput, single-tenant virtual servers equipped with dedicated GPU acceleration. We instantly process massive clash resolutions without straining your internal IT hardware.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/80 space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Compute:</span>
                  <strong className="text-neutral-200 font-semibold">Dedicated GPU VRAM</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Network:</span>
                  <strong className="text-cyan-400 font-semibold">Encrypted TLS 1.3</strong>
                </div>
              </div>
            </div>

            {/* CARD 3: RIGHT */}
            <div className="bg-[#111318] border border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-neutral-700 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900/90 px-2.5 py-1 text-[11px] font-mono font-bold text-neutral-400">
                    // DEPLOYMENT_VECTOR_03
                  </span>
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Standard Enforcement</h4>
                <div className="text-xs font-mono text-purple-400 font-semibold mb-3">
                  Algorithmic Compliance Modules
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  Automated validation kernels that strictly enforce <strong className="text-neutral-200">ISO 19650-5</strong> and <strong className="text-neutral-200">UNI 11337</strong> mandates. We mathematically verify your tender deliverables, eliminating the risk of human error and project disqualification.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/80 space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Governance:</span>
                  <strong className="text-neutral-200 font-semibold">ISO 19650-5 / UNI 11337</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Audit:</span>
                  <strong className="text-purple-400 font-semibold">Algorithmic Trail</strong>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* MODAL */}
      {selectedPerson && (
        <TeamPartnerModal person={selectedPerson} onClose={closeModal} />
      )}
    </>
  );
}
