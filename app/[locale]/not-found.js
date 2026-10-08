"use client";

import Link from "@/components/layout/LocalizedLink";
import { Home, Layers, Terminal } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen w-full bg-[#0A0A0A] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans px-6 py-20">
      
      {/* Ambient Radial Background Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-[#3B82F6]/20 via-[#2563EB]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-radial from-[#3B82F6]/10 to-transparent blur-3xl pointer-events-none" />
      
      {/* High-Tech Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
        
        {/* Code Badge Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25 text-[#3B82F6] font-mono text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5" />
          <span>{t("notfound.badge") || "// ERROR 404: ELEMENT_NOT_FOUND"}</span>
        </div>

        {/* Glowing 404 Numbers */}
        <h1 className="text-[120px] sm:text-[180px] md:text-[240px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-[#3B82F6]/40 select-none drop-shadow-[0_0_60px_rgba(59,130,246,0.35)]">
          404
        </h1>

        {/* Sub-headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight -mt-4 sm:-mt-8 mb-4">
          {t("notfound.title") || "Spatial Coordinates Not Found."}
        </h2>

        {/* Description Body */}
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed mb-10">
          {t("notfound.desc") || "The parameter or page you are searching for does not exist in our BIM database. It may have been relocated, updated, or deleted."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-16">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>{t("notfound.btn_home") || "Return to Homepage"}</span>
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#262626] hover:border-[#3B82F6]/50 text-gray-200 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300"
          >
            <Layers className="w-4 h-4 text-[#3B82F6]" />
            <span>{t("notfound.btn_services") || "Explore Services"}</span>
          </Link>
        </div>

        {/* Quick Navigation Footer Links */}
        <div className="border-t border-[#262626] pt-8 w-full max-w-xl">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
            {t("notfound.quick_nav") || "Quick Navigation"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: t("notfound.link_services") || "Services", href: "/services" },
              { label: t("notfound.link_about") || "About Us", href: "/about" },
              { label: t("header.mega.success_stories") || t("notfound.link_projects") || "Success Stories", href: "/success-stories" },
              { label: t("notfound.link_contact") || "Contact", href: "/contact" },
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="px-4 py-2 rounded-xl bg-[#171717] border border-[#262626] hover:border-[#3B82F6]/40 text-xs text-gray-400 hover:text-white transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
