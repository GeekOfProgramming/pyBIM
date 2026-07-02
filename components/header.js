"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const navItems = [
  { href: "/", tKey: "nav.home" },
  { href: "/services", tKey: "nav.services" },
  { href: "/projects", tKey: "nav.projects" },
  { href: "/blog", tKey: "nav.blog" },
  { href: "/about", tKey: "nav.about" },
  { href: "/contact", tKey: "nav.contact" }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    <header className={`sticky top-0 z-50 border-b border-sky-400/10 bg-[#081730]/85 backdrop-blur-xl transition-all duration-300 ${isScrolled ? "py-2 shadow-lg" : "py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-300">
        <Link href={`/${language}`} className="flex items-center gap-4 text-left" aria-label="Arvand Termo Tec home">
          <div className="flex items-center">
            <Image 
              src="/logo-new-2.png" 
              alt="Arvand Termo Tec logo" 
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
                className={`transition px-4 py-2 rounded-full ${isActive ? "bg-orange-500/10 text-blue-100 font-bold border border-orange-500/20" : "text-white/70 hover:text-blue-300 hover:bg-white/5"}`}
              >
                {t(item.tKey)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          
          {/* Language Toggle */}
          <div className="flex items-center bg-white/5 p-1 rounded-full border border-white/10">
            <button 
              onClick={() => changeLanguage("it")}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition ${language === "it" ? "bg-orange-500 text-white" : "text-white/50 hover:text-white"}`}
            >
              IT
            </button>
            <button 
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition ${language === "en" ? "bg-blue-500 text-white" : "text-white/50 hover:text-white"}`}
            >
              EN
            </button>
          </div>

          <Link href={`/${language}/contact`} className="hidden rounded-2xl border border-orange-400/35 bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(249,115,22,0.28)] transition hover:translate-y-[-1px] md:block">
            {t("nav.consultation")}
          </Link>
        </div>
      </div>
    </header>
  );
}
