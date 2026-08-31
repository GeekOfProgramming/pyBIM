"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, ChevronRight, Briefcase, FileText, Code2, Users, Building, Activity, Shield, Terminal, Cog, Calculator } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const navItems = [
  { href: "/", tKey: "nav.home" },
  { href: "/services", tKey: "nav.services" },
  { href: "/education", tKey: "nav.education" },
];

const pyBimLeftMenu = [
  { id: "who_we_are", label: "Who we are", href: "/about" },
  { id: "success_stories", label: "Success Stories", href: "/projects" },
  { id: "work_with_us", label: "Work with us", href: "/careers" },
  { id: "contact_us", label: "Contact us", href: "/contact" },
];

const pyBimRightMenu = {
  who_we_are: [
    { label: "The Manifesto", icon: Terminal, href: "/about#manifesto" },
    { label: "Our Journey", icon: Activity, href: "/about#journey" },
    { label: "Tech Stack & Standards", icon: Code2, href: "/about#tech-stack" },
    { label: "Our Impact", icon: Shield, href: "/about#impact" },
    { label: "Our Team", icon: Users, href: "/about#team" },
  ],
  success_stories: [
    { label: "All Projects", icon: Briefcase, href: "/projects#all-projects" },
    { label: "Featured Case Studies", icon: FileText, href: "/projects#featured" },
    { label: "Client Testimonials", icon: Users, href: "/projects#testimonials" },
  ],
  work_with_us: [
    { label: "Culture & Benefits", icon: Users, href: "/careers#culture" },
    { label: "Open Positions", icon: Briefcase, href: "/careers#positions" },
    { label: "Life at pyBIM", icon: Building, href: "/careers#life" },
  ],
  contact_us: [
    { label: "Technical & AI Audit", icon: Briefcase, href: "/contact#audit" },
    { label: "Direct Channels", icon: Building, href: "/contact#direct-channels" },
    { label: "Algorithmic ROI Matrix", icon: Calculator, href: "/contact#calculator" },
    { label: "FAQ", icon: Cog, href: "/contact#support" },
  ],
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeMegaMenuItem, setActiveMegaMenuItem] = useState("who_we_are");
  
  const { t, language, changeLanguage, getLocalizedUrl } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className={`sticky top-0 z-[1000] border-b border-brand-border bg-white/95 backdrop-blur-xl transition-all duration-300 ${isScrolled ? "py-2 shadow-sm" : "py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-300">
        <Link href={`/${language}`} className="flex items-center gap-4 text-left" aria-label="pyBIM home">
          <div className="flex items-center">
            <Image 
              src="/logo_black_transparent.png" 
              alt="pyBIM logo" 
              width={180} 
              height={80} 
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? "h-10" : "h-14"}`} 
            />
          </div>
        </Link>
        <nav className="hidden items-center gap-2 text-sm lg:flex">
          {navItems.map((item) => {
            const localizedHref = getLocalizedUrl(item.href);
            const isActive = pathname === localizedHref || pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={localizedHref} 
                className={`transition px-4 py-2 rounded-full font-medium ${isActive ? "text-brand-primary bg-brand-primary/10" : "text-brand-textSecondary hover:text-brand-primary hover:bg-brand-surface"}`}
              >
                {t(item.tKey)}
              </Link>
            );
          })}

          {/* Megamenu Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <button className={`flex items-center gap-1 transition px-4 py-2 rounded-full font-medium ${megaMenuOpen ? 'text-brand-primary bg-brand-surface' : 'text-brand-textSecondary hover:text-brand-primary hover:bg-brand-surface'}`}>
              pyBIM <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Megamenu Dropdown */}
            {megaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px] z-[1000]">
                <div className="bg-white border border-brand-border rounded-2xl shadow-2xl overflow-hidden flex ring-1 ring-black/5">
                  
                  {/* Left Column */}
                  <div className="w-[45%] bg-brand-surface border-r border-brand-border p-4 flex flex-col gap-1">
                    {pyBimLeftMenu.map(item => {
                      const isActiveLink = pathname === getLocalizedUrl(item.href);
                      return (
                        <Link
                          key={item.id}
                          href={getLocalizedUrl(item.href)}
                          onMouseEnter={() => setActiveMegaMenuItem(item.id)}
                          onClick={() => setMegaMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeMegaMenuItem === item.id ? 'bg-white shadow-sm text-brand-primary font-bold' : 'text-brand-textSecondary hover:bg-white hover:text-brand-primary font-medium'} ${isActiveLink && activeMegaMenuItem !== item.id ? 'text-brand-primary font-bold' : ''}`}
                        >
                          <span className="text-sm tracking-wide">{item.label}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${activeMegaMenuItem === item.id ? 'translate-x-1 text-brand-primary' : 'text-transparent'}`} />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Right Column */}
                  <div className="w-[55%] bg-white p-6">
                    <div className="flex flex-col gap-4 h-full justify-center">
                      {pyBimRightMenu[activeMegaMenuItem].map((subItem, idx) => {
                        const Icon = subItem.icon;
                        return (
                          <Link 
                            key={idx} 
                            href={getLocalizedUrl(subItem.href)} 
                            onClick={() => setMegaMenuOpen(false)}
                            className="group flex items-center gap-4 p-2 rounded-lg hover:bg-brand-surface transition"
                          >
                            <div className="shrink-0 w-10 h-10 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-sm text-brand-textPrimary group-hover:text-brand-primary transition-colors">{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-3">
          
          {/* Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-2 rounded-full transition hover:border-brand-primary/50 hover:bg-brand-surfaceHover"
            >
              <Globe className="w-4 h-4 text-brand-textSecondary" />
              <span className="text-xs font-bold text-brand-textSecondary uppercase">{language}</span>
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-24 bg-brand-base border border-brand-border rounded-xl overflow-hidden shadow-lg z-50">
                  {['en', 'it', 'de'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => { changeLanguage(lang); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-3 text-sm font-bold uppercase transition ${language === lang ? 'bg-brand-primary/10 text-brand-primary' : 'text-brand-textSecondary hover:bg-brand-surface'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link href={`/${language}/contact`} className="hidden rounded-full bg-brand-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-accentHover hover:-translate-y-0.5 md:block">
            {t("nav.consultation")}
          </Link>
        </div>
      </div>
    </header>
  );
}
