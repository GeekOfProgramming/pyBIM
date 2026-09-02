"use client";

import { useState, useEffect } from "react";
import Link from "@/components/layout/LocalizedLink";
import { usePathname } from "next/navigation";
import { Home, Wrench, Briefcase, Menu, X, Info, FileText, Phone, Server, GraduationCap, Users } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const mainNavItems = [
  { href: "/", tKey: "nav.home", icon: Home },
  { href: "/services", tKey: "nav.services", icon: Wrench },
  { href: "/pricing", tKey: "nav.pricing", icon: Server },
];

const moreNavItems = [
  { href: "/education", tKey: "nav.education", icon: GraduationCap },
  { href: "/about", label: "Who we are", icon: Info },
  { href: "/projects", label: "Success Stories", icon: Briefcase },
  { href: "/careers", label: "Work with us", icon: Users },
  { href: "/contact", label: "Contact us", icon: Phone }
];

export default function MobileBottomNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();
  const pathname = usePathname();

  // Close the more menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Slide-up "More" Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsOpen(false)}
      />
      <div 
        className={`fixed right-4 bottom-[85px] w-60 max-w-[calc(100vw-2rem)] z-50 rounded-3xl border border-white/10 bg-[#18181b]/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 origin-bottom-right lg:hidden flex flex-col ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}`}
      >

        <div className="flex flex-col gap-3">
          {moreNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-4 rounded-2xl p-4 transition-all ${isActive ? "bg-brand-accent/10 text-brand-accent" : "bg-white/5 text-white/80 hover:bg-white/10"}`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isActive ? "bg-brand-accent/20 text-brand-accent" : "bg-white/10 text-white/60"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold">{item.label || t(item.tKey)}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Bottom Tab Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-around rounded-3xl border border-white/10 bg-[#09090b]/90 px-2 py-2 backdrop-blur-xl lg:hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-14 gap-0.5 transition-colors ${isActive ? "text-brand-accent" : "text-white/50 hover:text-white"}`}
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${isActive ? "bg-brand-accent/20" : "bg-transparent"}`}>
                <Icon className={`h-4 w-4 ${isActive ? "scale-110" : ""}`} />
              </div>
              <span className="text-[9px] font-medium tracking-wide">{t(item.tKey)}</span>
            </Link>
          );
        })}
        
        {/* More Menu Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-col items-center justify-center w-14 gap-0.5 transition-colors ${
            isOpen || moreNavItems.some((item) => pathname.startsWith(item.href)) 
              ? "text-brand-accent" 
              : "text-white/50 hover:text-white"
          }`}
        >
          <div className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
            isOpen || moreNavItems.some((item) => pathname.startsWith(item.href)) 
              ? "bg-brand-accent/20" 
              : "bg-transparent"
          }`}>
            <Menu className={`h-4 w-4 ${
              isOpen || moreNavItems.some((item) => pathname.startsWith(item.href)) 
                ? "scale-110" 
                : ""
            }`} />
          </div>
          <span className="text-[9px] font-medium tracking-wide">{language === "it" ? "Altro" : "More"}</span>
        </button>
      </div>
    </>
  );
}
