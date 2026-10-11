"use client";

import { useState, useId } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import CtaLink from "@/components/ui/cta-link";
import {
  Box,
  GitMerge,
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Info
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TOPIC_ICONS = {
  geometry: Box,
  coordination: GitMerge,
  information: FileCheck2,
};

export default function ExecutionPipeline() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).executionPipeline;
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

  const [activeTopicId, setActiveTopicId] = useState("geometry");
  const activeTopic =
    data.topics.find((t) => t.id === activeTopicId) || data.topics[0];

  const ActiveIcon = TOPIC_ICONS[activeTopic.id] || Box;

  return (
    <section
      className="relative py-20 md:py-28 lg:py-32 px-6 lg:px-8 w-full bg-brand-surface text-brand-textPrimary border-b border-brand-border overflow-hidden transition-colors"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Family B — Surface Background */}
      <EngineeringBackdrop variant="surface" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* =========================================================================
            SECTION HEADER: Left-Aligned Editorial Architecture
            ========================================================================= */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-caption font-bold tracking-widest uppercase mb-5 select-none shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
            <span>{data.eyebrow}</span>
          </div>

          {/* Semantic H2 Heading */}
          <h2
            id={`${sectionId}-heading`}
            className="text-section font-extrabold text-brand-textPrimary tracking-tight mb-5"
          >
            {data.heading}
          </h2>

          {/* Editorial Description */}
          <p className="text-lead text-brand-textSecondary font-normal leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* =========================================================================
            BIM EVIDENCE STUDIO: Large Landscape Engineering Demonstration Stage
            Deep Navy Engineering Canvas (#0B132B) for high-contrast CAD visualization
            ========================================================================= */}
        <div
          role="region"
          aria-label={data.diagram_aria_label}
          className="w-full rounded-3xl border border-slate-800 bg-[#0B132B] shadow-2xl shadow-slate-950/40 overflow-hidden relative backdrop-blur-md"
        >
          {/* Top Viewer Header Bar */}
          <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-slate-800/80 bg-[#070D1F]/90 flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* Header & Status Indicator */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-body-sm font-bold text-white tracking-tight">
                    {data.viewer.header}
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-cyan-300 px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/50 uppercase tracking-wider">
                    {data.viewer.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Inspection Topic Selector Tabs */}
            <div
              role="tablist"
              aria-label={data.viewer.quick_inspect_label}
              className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800/80 self-start md:self-auto overflow-x-auto max-w-full"
            >
              {data.topics.map((topic, idx) => {
                const isSelected = activeTopicId === topic.id;
                const TabIcon = TOPIC_ICONS[topic.id] || Box;

                return (
                  <button
                    key={topic.id}
                    role="tab"
                    id={`${sectionId}-tab-${topic.id}`}
                    aria-selected={isSelected}
                    aria-controls={`${sectionId}-panel-${topic.id}`}
                    onClick={() => setActiveTopicId(topic.id)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-200 select-none cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isSelected
                        ? "bg-brand-primary text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75">{`0${idx + 1}`}</span>
                    <TabIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{topic.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Visualization Stage: 16:9 Scalable Isometric Model */}
          <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[540px] bg-gradient-to-b from-[#070D1F] via-[#0B132B] to-[#070D1F] flex items-center justify-center overflow-hidden select-none">

            {/* SVG Engineering Model */}
            <svg
              className="w-full h-full"
              viewBox="0 0 960 540"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                {/* Blueprint Background Grid */}
                <pattern id={`${sectionId}-bg-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeOpacity="0.4" />
                </pattern>

                {/* Linear Gradients for Slabs & Elements */}
                <linearGradient id={`${sectionId}-slab-fill-geo`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.12" />
                </linearGradient>

                <linearGradient id={`${sectionId}-slab-fill-dim`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E293B" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0.08" />
                </linearGradient>

                <linearGradient id={`${sectionId}-duct-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#0891B2" />
                </linearGradient>
              </defs>

              {/* Background Draft Grid */}
              <rect width="100%" height="100%" fill={`url(#${sectionId}-bg-grid)`} />

              {/* Isometric Ambient Radial Glow */}
              <radialGradient id={`${sectionId}-ambient`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
              </radialGradient>
              <circle cx="480" cy="270" r="320" fill={`url(#${sectionId}-ambient)`} />

              {/* -------------------------------------------------------------
                  LEVEL ELEVATION DATUMS (Left Column Leader Annotations)
                  ------------------------------------------------------------- */}
              <g className={`transition-opacity duration-300 ${activeTopicId === "geometry" ? "opacity-100" : "opacity-45"}`}>
                {/* L03 Datum (+7.20m) */}
                <path d="M 120 150 L 250 150 L 280 150" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="120" cy="150" r="3.5" fill="#38BDF8" />
                <text x="75" y="146" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="600">L03 // +7.20m</text>
                <text x="75" y="159" fill="#64748B" fontSize="9" fontFamily="monospace">{data.viewer.annotations?.level_roof || "ROOF LEVEL"}</text>

                {/* L02 Datum (+3.60m) */}
                <path d="M 120 260 L 250 260 L 280 260" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="120" cy="260" r="3.5" fill="#38BDF8" />
                <text x="75" y="256" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="600">L02 // +3.60m</text>
                <text x="75" y="269" fill="#64748B" fontSize="9" fontFamily="monospace">{data.viewer.annotations?.level_mid || "MID LEVEL"}</text>

                {/* L01 Datum (+0.00m) */}
                <path d="M 120 370 L 250 370 L 280 370" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="120" cy="370" r="3.5" fill="#38BDF8" />
                <text x="75" y="366" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="600">L01 // +0.00m</text>
                <text x="75" y="379" fill="#64748B" fontSize="9" fontFamily="monospace">{data.viewer.annotations?.level_base || "BASE LEVEL"}</text>
              </g>

              {/* -------------------------------------------------------------
                  STRUCTURAL COLUMNS (Spanning across Levels 01 -> 02 -> 03)
                  ------------------------------------------------------------- */}
              <g className={`transition-all duration-300 ${activeTopicId === "geometry" ? "opacity-100" : "opacity-50"}`}>
                {/* Column 1: Front-Left (280, 150) -> (280, 380) */}
                <path d="M 277 150 L 277 380 L 283 380 L 283 150 Z" fill="#1E293B" stroke="#60A5FA" strokeWidth={activeTopicId === "geometry" ? "1.5" : "1"} />

                {/* Column 2: Front-Center (480, 240) -> (480, 470) */}
                <path d="M 477 240 L 477 470 L 483 470 L 483 240 Z" fill="#1E293B" stroke="#60A5FA" strokeWidth={activeTopicId === "geometry" ? "1.5" : "1"} />

                {/* Column 3: Front-Right (680, 150) -> (680, 380) */}
                <path d="M 677 150 L 677 380 L 683 380 L 683 150 Z" fill="#1E293B" stroke="#60A5FA" strokeWidth={activeTopicId === "geometry" ? "1.5" : "1"} />

                {/* Column 4: Back-Left (380, 105) -> (380, 325) */}
                <path d="M 378 105 L 378 325 L 382 325 L 382 105 Z" fill="#0F172A" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="4 2" />

                {/* Column 5: Back-Right (580, 105) -> (580, 325) */}
                <path d="M 578 105 L 578 325 L 582 325 L 582 105 Z" fill="#0F172A" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="4 2" />
              </g>

              {/* -------------------------------------------------------------
                  FLOOR SLAB 01 (Base Elevation Y = 370)
                  ------------------------------------------------------------- */}
              <g className={`transition-all duration-300 ${activeTopicId === "geometry" ? "opacity-100" : "opacity-55"}`}>
                {/* Top Face Rhombus */}
                <polygon
                  points="480,280 680,370 480,460 280,370"
                  fill={activeTopicId === "geometry" ? `url(#${sectionId}-slab-fill-geo)` : `url(#${sectionId}-slab-fill-dim)`}
                  stroke={activeTopicId === "geometry" ? "#3B82F6" : "#334155"}
                  strokeWidth={activeTopicId === "geometry" ? "1.8" : "1.2"}
                />
                {/* Thickness Extrusion Front-Left */}
                <polygon
                  points="280,370 480,460 480,470 280,380"
                  fill="#0F172A"
                  stroke={activeTopicId === "geometry" ? "#2563EB" : "#1E293B"}
                  strokeWidth="1"
                />
                {/* Thickness Extrusion Front-Right */}
                <polygon
                  points="480,460 680,370 680,380 480,470"
                  fill="#1E293B"
                  stroke={activeTopicId === "geometry" ? "#2563EB" : "#1E293B"}
                  strokeWidth="1"
                />
                {/* Grid Linework on Slab 01 */}
                <line x1="380" y1="325" x2="580" y2="415" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" opacity={activeTopicId === "geometry" ? "0.6" : "0.25"} />
                <line x1="580" y1="325" x2="380" y2="415" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" opacity={activeTopicId === "geometry" ? "0.6" : "0.25"} />
              </g>

              {/* -------------------------------------------------------------
                  FLOOR SLAB 02 (Mid Elevation Y = 260)
                  ------------------------------------------------------------- */}
              <g className={`transition-all duration-300 ${activeTopicId === "geometry" ? "opacity-100" : "opacity-65"}`}>
                {/* Top Face Rhombus */}
                <polygon
                  points="480,170 680,260 480,350 280,260"
                  fill={activeTopicId === "geometry" ? `url(#${sectionId}-slab-fill-geo)` : `url(#${sectionId}-slab-fill-dim)`}
                  stroke={activeTopicId === "geometry" ? "#60A5FA" : "#475569"}
                  strokeWidth={activeTopicId === "geometry" ? "2" : "1.2"}
                />
                {/* Thickness Extrusion Front-Left */}
                <polygon
                  points="280,260 480,350 480,360 280,270"
                  fill="#0F172A"
                  stroke={activeTopicId === "geometry" ? "#3B82F6" : "#1E293B"}
                  strokeWidth="1"
                />
                {/* Thickness Extrusion Front-Right */}
                <polygon
                  points="480,350 680,260 680,270 480,360"
                  fill="#1E293B"
                  stroke={activeTopicId === "geometry" ? "#3B82F6" : "#1E293B"}
                  strokeWidth="1"
                />
                {/* Grid Linework on Slab 02 */}
                <line x1="380" y1="215" x2="580" y2="305" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" opacity={activeTopicId === "geometry" ? "0.8" : "0.3"} />
                <line x1="580" y1="215" x2="380" y2="305" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" opacity={activeTopicId === "geometry" ? "0.8" : "0.3"} />
              </g>

              {/* -------------------------------------------------------------
                  TOPIC B: MEP ROUTING & COORDINATION REVIEW INTERFACE (Level 02)
                  ------------------------------------------------------------- */}
              <g className={`transition-all duration-300 ${activeTopicId === "coordination" ? "opacity-100" : "opacity-45"}`}>
                {/* 3D Isometric Conduit / Duct Route */}
                <path
                  d="M 660 235 L 530 235 L 476 270 L 476 340"
                  fill="none"
                  stroke={`url(#${sectionId}-duct-grad)`}
                  strokeWidth={activeTopicId === "coordination" ? "7" : "4.5"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={activeTopicId === "coordination" ? "drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))" : "none"}
                />
                {/* Secondary Parallel Air Duct Wire */}
                <path
                  d="M 660 238 L 532 238 L 479 272 L 479 340"
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="2"
                  strokeDasharray="2 2"
                  opacity={activeTopicId === "coordination" ? "0.8" : "0.3"}
                />

                {/* Coordination Target Reticle / Clearance Marker at (476, 270) */}
                <g transform="translate(476, 270)">
                  {/* Outer Concentric Target Ring */}
                  <circle
                    cx="0"
                    cy="0"
                    r={activeTopicId === "coordination" ? "18" : "14"}
                    fill="none"
                    stroke={activeTopicId === "coordination" ? "#F59E0B" : "#06B6D4"}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className={activeTopicId === "coordination" ? "animate-spin" : ""}
                    style={{ transformOrigin: "center", animationDuration: "14s" }}
                  />
                  {/* Inner Target Ring */}
                  <circle
                    cx="0"
                    cy="0"
                    r="6"
                    fill={activeTopicId === "coordination" ? "#F59E0B" : "#22D3EE"}
                    fillOpacity="0.4"
                    stroke={activeTopicId === "coordination" ? "#F59E0B" : "#22D3EE"}
                    strokeWidth="1.5"
                  />
                  {/* Crosshair lines */}
                  <line x1="-12" y1="0" x2="12" y2="0" stroke={activeTopicId === "coordination" ? "#F59E0B" : "#22D3EE"} strokeWidth="1" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke={activeTopicId === "coordination" ? "#F59E0B" : "#22D3EE"} strokeWidth="1" />
                </g>

                {/* Interface Callout Badge & Leader Line */}
                <g className={`transition-all duration-300 ${activeTopicId === "coordination" ? "opacity-100" : "opacity-30"}`}>
                  <polyline points="476,270 410,295 340,295" fill="none" stroke="#F59E0B" strokeWidth="1.2" />
                  <rect x="230" y="282" width="105" height="26" rx="5" fill="#0B132B" stroke="#F59E0B" strokeWidth="1" />
                  <text x="240" y="295" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">{data.viewer.annotations?.interface_tag || "INTERFACE 01"}</text>
                  <text x="240" y="304" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">{data.viewer.annotations?.clearance_check || "CLEARANCE CHECK"}</text>
                </g>
              </g>

              {/* -------------------------------------------------------------
                  FLOOR SLAB 03 (Roof / Top Elevation Y = 150)
                  ------------------------------------------------------------- */}
              <g className={`transition-all duration-300 ${activeTopicId === "geometry" ? "opacity-100" : "opacity-60"}`}>
                {/* Top Face Rhombus */}
                <polygon
                  points="480,60 680,150 480,240 280,150"
                  fill={activeTopicId === "geometry" ? `url(#${sectionId}-slab-fill-geo)` : `url(#${sectionId}-slab-fill-dim)`}
                  stroke={activeTopicId === "geometry" ? "#93C5FD" : "#64748B"}
                  strokeWidth={activeTopicId === "geometry" ? "2" : "1.2"}
                />
                {/* Thickness Extrusion Front-Left */}
                <polygon
                  points="280,150 480,240 480,250 280,160"
                  fill="#0F172A"
                  stroke={activeTopicId === "geometry" ? "#3B82F6" : "#1E293B"}
                  strokeWidth="1"
                />
                {/* Thickness Extrusion Front-Right */}
                <polygon
                  points="480,240 680,150 680,160 480,250"
                  fill="#1E293B"
                  stroke={activeTopicId === "geometry" ? "#3B82F6" : "#1E293B"}
                  strokeWidth="1"
                />
                {/* Grid Linework on Slab 03 */}
                <line x1="380" y1="105" x2="580" y2="195" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" opacity={activeTopicId === "geometry" ? "0.9" : "0.3"} />
                <line x1="580" y1="105" x2="380" y2="195" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="3 3" opacity={activeTopicId === "geometry" ? "0.9" : "0.3"} />
              </g>

              {/* -------------------------------------------------------------
                  TOPIC C: INFORMATION QA METADATA ANNOTATION CARD (Level 03)
                  ------------------------------------------------------------- */}
              <g className={`transition-all duration-300 ${activeTopicId === "information" ? "opacity-100" : "opacity-40"}`}>
                {/* Leader Line anchored to Column 5 top vertex (580, 105) */}
                <polyline
                  points="580,105 630,75 700,75"
                  fill="none"
                  stroke={activeTopicId === "information" ? "#22D3EE" : "#475569"}
                  strokeWidth={activeTopicId === "information" ? "1.5" : "1"}
                  strokeDasharray={activeTopicId === "information" ? "none" : "3 3"}
                />
                <circle cx="580" cy="105" r="3.5" fill={activeTopicId === "information" ? "#22D3EE" : "#475569"} />

                {/* Floating Information QA Technical Card */}
                <g transform="translate(700, 40)">
                  <rect
                    x="0"
                    y="0"
                    width="190"
                    height="85"
                    rx="8"
                    fill="#0B132B"
                    stroke={activeTopicId === "information" ? "#22D3EE" : "#334155"}
                    strokeWidth={activeTopicId === "information" ? "1.5" : "1"}
                    filter={activeTopicId === "information" ? "drop-shadow(0 4px 16px rgba(34, 211, 238, 0.25))" : "none"}
                  />
                  {/* Card Header */}
                  <text x="12" y="20" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">IfcColumn // L03-C2</text>
                  <circle cx="168" cy="17" r="4.5" fill="#10B981" />
                  <path d="M 166 17 L 167.5 18.5 L 170.5 15.5" fill="none" stroke="#FFFFFF" strokeWidth="1" />

                  {/* Divider */}
                  <line x1="12" y1="28" x2="178" y2="28" stroke="#1E293B" strokeWidth="1" />

                  {/* Attributes */}
                  <text x="12" y="42" fill="#94A3B8" fontSize="9" fontFamily="monospace">Dim: 400x400 mm</text>
                  <text x="12" y="55" fill="#94A3B8" fontSize="9" fontFamily="monospace">Mat: Concrete_C30/37</text>
                  <text x="12" y="68" fill="#94A3B8" fontSize="9" fontFamily="monospace">FireRating: REI 120</text>

                  {/* QA Stamp Pill */}
                  <rect x="110" y="45" width="68" height="18" rx="4" fill="#064E3B" stroke="#059669" strokeWidth="0.8" />
                  <text x="116" y="57" fill="#34D399" fontSize="8" fontFamily="monospace" fontWeight="bold">{data.viewer.annotations?.qa_verified || "QA VERIFIED"}</text>
                </g>
              </g>

            </svg>

            {/* -------------------------------------------------------------
                ACCESSIBLE OVERLAY HOTSPOTS (Clickable & Keyboard-Navigable)
                ------------------------------------------------------------- */}
            {data.topics.map((topic, index) => {
              const isSelected = activeTopicId === topic.id;

              return (
                <div
                  key={topic.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{
                    left: `${topic.hotspot.x}%`,
                    top: `${topic.hotspot.y}%`,
                  }}
                >
                  <button
                    type="button"
                    aria-label={`${topic.title} (${index + 1})`}
                    aria-pressed={isSelected}
                    onClick={() => setActiveTopicId(topic.id)}
                    className="relative group p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer select-none"
                  >
                    {/* Animated Ripple for Active Topic */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full bg-cyan-400/25 animate-ping pointer-events-none" />
                    )}

                    {/* Hotspot Disc Core */}
                    <span
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 shadow-md ${
                        isSelected
                          ? "bg-cyan-400 text-slate-950 scale-110 shadow-cyan-400/50"
                          : "bg-slate-900/90 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-950 hover:border-cyan-400"
                      }`}
                    >
                      {`0${index + 1}`}
                    </span>

                    {/* Tooltip on Hover/Focus */}
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity bg-slate-950/95 border border-slate-700 text-white text-[11px] font-sans font-medium px-2.5 py-1 rounded-md whitespace-nowrap shadow-xl z-30">
                      {topic.title}
                    </span>
                  </button>
                </div>
              );
            })}

          </div>

          {/* =========================================================================
              BOTTOM INSPECTION DRAWER: Dynamic Feedback & Explicit Disclosure
              ========================================================================= */}
          <div className="p-6 sm:p-8 bg-[#070D1F] border-t border-slate-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTopic.id}
                id={`${sectionId}-panel-${activeTopic.id}`}
                role="tabpanel"
                aria-labelledby={`${sectionId}-tab-${activeTopic.id}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                {/* Left 5 Cols: Topic Overview */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[11px] font-bold text-cyan-400 tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
                      {activeTopic.tag}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {activeTopic.callout}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2.5">
                    <ActiveIcon className="w-5 h-5 text-cyan-400 shrink-0" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {activeTopic.title}
                    </h3>
                  </div>

                  <p className="text-body-sm text-slate-300 font-normal leading-relaxed">
                    {activeTopic.description}
                  </p>
                </div>

                {/* Right 7 Cols: Structured Verification Details */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeTopic.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-1.5 text-cyan-400 mb-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {data.viewer.check_prefix || "CHECK"} {idx + 1}
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-300 font-sans leading-snug">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Explicit Mandatory Disclosure */}
                  <div className="pt-3 border-t border-slate-800/60 flex items-center gap-2 text-slate-400">
                    <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                    <p className="font-mono text-[11px] text-slate-400 tracking-wide">
                      {data.viewer.disclosure}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* =========================================================================
            PRIMARY CONTEXTUAL CTA (Post-Visualization Action)
            ========================================================================= */}
        <div className="mt-12 lg:mt-14 flex justify-center text-center">
          <CtaLink href={data.cta.href} variant="primary">
            {data.cta.label}
          </CtaLink>
        </div>

      </div>
    </section>
  );
}
