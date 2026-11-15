"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations/index";
import { useParams, useRouter, usePathname } from "next/navigation";
import { isItalianDomain, isComDomain, CANONICAL_DOMAINS } from "@/lib/seo";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguage] = useState(params?.locale || "en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (params?.locale && (params.locale === "it" || params.locale === "en" || params.locale === "de")) {
      setLanguage(params.locale);
    }
  }, [params?.locale]);

  const changeLanguage = (lang) => {
    if (lang === language) return;
    setLanguage(lang);
    
    if (!pathname) return;
    const segments = pathname.split('/');
    if (segments[1] === "it" || segments[1] === "en" || segments[1] === "de") {
      segments[1] = lang;
    } else {
      segments.splice(1, 0, lang);
    }
    const newPath = segments.join('/') || '/';
    const search = typeof window !== "undefined" ? window.location.search || "" : "";
    const hash = typeof window !== "undefined" ? window.location.hash || "" : "";

    // Model B Multi-Domain Cross-Navigation:
    // When on production domains (pybim.com / pybim.it), navigating to a language that lives
    // on the other canonical domain (e.g. en/de -> pybim.com, it -> pybim.it) must navigate
    // directly to the target domain without intermediate redirect hops.
    // Localhost, preview environments, and private session routes (/portal, /login, /register)
    // stay on the current origin.
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname || "";
      const isIt = isItalianDomain(hostname);
      const isCom = isComDomain(hostname);
      const isProd = isIt || isCom;

      const isPrivate =
        pathname.startsWith('/api/') ||
        pathname.includes('/portal') ||
        pathname.includes('/login') ||
        pathname.includes('/register');

      if (isProd && !isPrivate) {
        const targetDomain = CANONICAL_DOMAINS[lang] || CANONICAL_DOMAINS.en;
        const currentCanonicalApex = isIt ? 'pybim.it' : 'pybim.com';
        const targetCanonicalApex = lang === 'it' ? 'pybim.it' : 'pybim.com';

        if (currentCanonicalApex !== targetCanonicalApex || hostname.startsWith('www.')) {
          window.location.href = `${targetDomain}${newPath}${search}${hash}`;
          return;
        }
      }
    }

    router.push(`${newPath}${search}${hash}`);
  };

  const effectiveLang = params?.locale || language || "en";

  const t = (key) => {
    return translations[effectiveLang]?.[key] || translations.en?.[key] || key;
  };

  const getLocalizedUrl = (path) => {
    if (path.startsWith('http')) return path; // external links
    return `/${effectiveLang}${path === "/" ? "" : path}`;
  };

  return (
    <LanguageContext.Provider value={{ language: effectiveLang, changeLanguage, t, isClient, getLocalizedUrl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
