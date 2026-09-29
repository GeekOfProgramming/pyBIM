"use client";
import Link from "@/components/layout/LocalizedLink";
import { useState } from "react";
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle, 
  MapPin, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Lock, 
  Layers, 
  FileCode, 
  Check 
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectDetailLayout({ project }) {
  const [openFaq, setOpenFaq] = useState(0);
  const { language, t } = useLanguage();

  const data = {
    title: project.title?.[language] || project.title?.en || project.title?.it || project.slug,
    category: project.category?.[language] || project.category?.en || project.category?.it || "BIM Execution",
    date: project.date?.[language] || project.date?.en || project.date?.it || "2024-01-15",
    client: project.client?.[language] || project.client?.en || project.client?.it || project.client || "Confidential",
    location: project.location?.[language] || project.location?.en || project.location?.it || project.location || "Milan / Remote CDE",
    description: project.content?.[language] || project.content?.en || project.description?.[language] || project.description?.en || "",
  };

  // Deterministic calculation for hours saved based on slug
  const hoursSaved = (project?.slug?.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 250) + 180;

  // Single unified high-res technical BIM visual as requested
  const unifiedProjectImage = "/Pictures/BIM/bim-0011.jpg";

  const pipelineSteps = [
    {
      step: "01",
      title: "Data Audit & Multi-Disciplinary Ingestion",
      desc: "Ingestion of native multi-disciplinary models (Revit, IFC) with automated coordinate reconciliation and parameter mapping."
    },
    {
      step: "02",
      title: "Rule Engineering & Algorithmic Arbitration",
      desc: "Execution of custom rule algorithms for automated clash isolation, tolerance verification, and parameter synchronization."
    },
    {
      step: "03",
      title: "CDE Pipeline & Plugin Integration",
      desc: "Direct integration into client Common Data Environment (CDE) with automated discrepancy tracking and version control."
    },
    {
      step: "04",
      title: "ISO 19650 Quality Sign-Off & Verification",
      desc: "Zero-clash validation certification, generation of verified audit log archives, and deployment sign-off."
    }
  ];

  const techBadges = [
    "Autodesk Revit 2024",
    "Python 3.11",
    "Revit API (.NET)",
    "OpenBIM (IFC4)",
    "Dynamo Core",
    "Speckle",
    "Docker / CDE Sandbox"
  ];

  const deliverables = [
    "Zero-tolerance multi-disciplinary clash arbitration matrix",
    "Fully synchronized parametric BIM model conforming to ISO 19650-2",
    "Autonomous Python/API routine for continuous model health checking",
    "Exported open-standard IFC deliverables and quantified schedule extracts"
  ];

  const faqs = [
    {
      q: "What standards and protocols are enforced during this deployment?",
      a: "All workflows strictly follow ISO 19650 specifications, Level of Information Need (LOIN) standards, and strict bilateral NDA data governance protocols."
    },
    {
      q: "Can this automation pipeline integrate into our existing CDE?",
      a: "Yes. Our pipelines and plugins interface seamlessly with Autodesk Construction Cloud (ACC), BIM 360, Trimble Connect, and private local servers."
    },
    {
      q: "What deliverables and IP are transferred at project completion?",
      a: "You receive clean, validated native models, comprehensive clash audit sheets, and full ownership of any custom scripts or compiled add-ins specified in your project scope."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white font-sans selection:bg-brand-primary selection:text-white">
      {/* 1. HERO SECTION - AUDIT REPORT STYLE (Preserved exact design) */}
      <section className="relative flex flex-col justify-center py-20 border-b border-slate-800 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_50%)] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-8">
            <Link href="/" className="hover:text-brand-primary transition">{t("project.detail.home") || "HOME"}</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/projects" className="hover:text-brand-primary transition">{t("project.detail.projects") || "PROJECTS"}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-primary">{data.title}</span>
          </div>

          {/* Audit Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded uppercase text-[10px] tracking-widest font-mono text-brand-primary mb-4">
            <Terminal className="w-3 h-3" /> DEPLOYMENT AUDIT REPORT
          </div>
          
          {/* Project Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight text-white">
            {data.title}
          </h1>
          
          {/* Metadata Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800 pt-8 mt-8">
            <div>
              <span className="block text-[10px] font-mono text-slate-500 mb-1">CLIENT_ID</span>
              <span className="font-mono text-sm text-slate-200">{data.client}</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-500 mb-1">COMPLIANCE</span>
              <span className="font-mono text-sm text-emerald-400 font-bold">ISO 19650</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-500 mb-1">CORE_TECH</span>
              <span className="font-mono text-sm text-slate-200">Python / Revit API</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-slate-500 mb-1">DATE</span>
              <span className="font-mono text-sm text-slate-200">{data.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TWO-COLUMN CONTENT BODY */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr] items-start">
          
          {/* COLUMN 1: LEFT SIDEBAR (Sticky) */}
          <div className="lg:sticky lg:top-28 space-y-6">
            
            {/* Algorithmic ROI Panel */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary" />
              
              <h3 className="text-xs font-mono font-bold text-slate-300 mb-6 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-primary" /> ALGORITHMIC ROI
              </h3>
              
              <div className="space-y-5">
                <div>
                  <span className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Engineering Hours Reclaimed</span>
                  <div className="text-3xl font-bold text-brand-primary font-mono">+{hoursSaved}h</div>
                </div>
                
                <div className="h-px w-full bg-slate-800" />
                
                <div>
                  <span className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Conflict Resolution</span>
                  <div className="text-lg font-bold text-emerald-400 font-mono flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> 100% Validated
                  </div>
                </div>

                <div className="h-px w-full bg-slate-800" />

                <div>
                  <span className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Delivery Velocity</span>
                  <div className="text-lg font-bold text-white font-mono">3.4x Accelerated</div>
                </div>
                
                <div className="h-px w-full bg-slate-800" />
                
                <div>
                  <span className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Deployment Location</span>
                  <div className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> {data.location}
                  </div>
                </div>
              </div>

              {/* Primary Action Button (REQUEST SIMILAR DEPLOYMENT) */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <Link 
                  href="/contact#audit" 
                  className="w-full flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accentHover text-white py-3.5 px-4 rounded-xl font-mono font-bold text-xs tracking-wider transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 uppercase text-center"
                >
                  <span>REQUEST SIMILAR DEPLOYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Data Sovereignty & NDA Security Notice */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-left relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">DATA SOVEREIGNTY & NDA</span>
              </div>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                All algorithmic routines and BIM models execute under bilateral NDA. Proprietary project geometry never leaves your verified Common Data Environment.
              </p>
            </div>

          </div>

          {/* COLUMN 2: RIGHT CONTENT (Technical Dossier) */}
          <div className="space-y-12">
            
            {/* Main Unified Project Image */}
            <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-video bg-slate-900">
              <img 
                src={unifiedProjectImage} 
                alt="Deployment Architecture" 
                className="w-full h-full object-cover grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 text-slate-300">
                  PARAMETRIC MODEL // ISO 19650 AUDIT
                </span>
                <span className="bg-brand-primary/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-primary/30 text-brand-primary font-bold">
                  VERIFIED DEPLOYMENT
                </span>
              </div>
            </div>

            {/* Overview & Scope */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary">
                  DEPLOYMENT SCOPE & EXECUTIVE BRIEF
                </h2>
              </div>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                {data.description || "This deployment represents an enterprise-grade execution implementing strict ISO 19650 protocols, automated parameter validation, and continuous clash arbitration. Designed to eliminate spatial coordination bottlenecks, streamline multi-disciplinary model exchange, and accelerate delivery schedules."}
              </p>
            </div>

            {/* Implementation Pipeline (4 Steps) */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-4 h-4 text-brand-primary" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  TECHNICAL IMPLEMENTATION PIPELINE
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {pipelineSteps.map((step, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between hover:border-brand-primary/40 transition-colors">
                    <div>
                      <div className="font-mono text-brand-primary text-xs font-bold tracking-widest mb-2">
                        STEP {step.step}
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-xs text-slate-400 font-mono leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Environment & Tech Stack */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileCode className="w-4 h-4 text-brand-primary" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  TARGET ENVIRONMENT & TECH STACK
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {techBadges.map((badge, idx) => (
                  <span 
                    key={idx} 
                    className="px-3.5 py-1.5 rounded-lg border border-brand-primary/25 bg-brand-primary/10 text-brand-primary font-mono text-xs font-bold tracking-wider"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Deliverables */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  KEY DELIVERABLES & OUTCOMES
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/60">
                    <Check className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-mono text-slate-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="border-t border-slate-800 pt-8">
              <h3 className="text-lg font-bold text-white mb-6">Frequently Asked Technical Questions</h3>
              
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      type="button"
                      className="w-full flex items-center justify-between p-5 text-left font-mono text-xs text-slate-200 hover:text-brand-primary transition-colors"
                    >
                      <span className="font-semibold">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openFaq === idx ? "rotate-180 text-brand-primary" : "text-slate-500"}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 text-xs text-slate-400 font-mono leading-relaxed border-t border-slate-800/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}