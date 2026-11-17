"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations/index";
import { useParams, useRouter, usePathname } from "next/navigation";
import { isItalianDomain, isComDomain, CANONICAL_DOMAINS } from "@/lib/seo";
import { GEO_COOKIE_NAME } from "@/lib/geo";

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

    // Clean up cross-domain transfer parameter from browser URL without triggering a reload
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('lang_pref')) {
          const pref = url.searchParams.get('lang_pref');
          if (pref === 'en' || pref === 'it' || pref === 'de') {
            if (typeof document !== "undefined") {
              const isHttps = window.location.protocol === "https:";
              document.cookie = `${GEO_COOKIE_NAME}=${pref}; path=/; max-age=31536000; SameSite=Lax${isHttps ? '; Secure' : ''}`;
            }
          }
          url.searchParams.delete('lang_pref');
          window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
        }
      } catch (e) {
        // Safe fail-silent for non-standard environments
      }
    }
  }, [params?.locale]);

  const changeLanguage = (lang) => {
    if (lang === language) return;
    setLanguage(lang);

    // Persist intentional language choice in a minimal, functional preference cookie
    if (typeof document !== "undefined") {
      const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
      document.cookie = `${GEO_COOKIE_NAME}=${lang}; path=/; max-age=31536000; SameSite=Lax${isHttps ? '; Secure' : ''}`;
    }
    
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
        const isItLang = lang === 'it';
        const isCurrentlyIt = isIt;

        // Cross-domain navigation is only needed when switching between different domain families (.com vs .it).
        // Navigates directly to the final canonical www destination.
        if (isItLang !== isCurrentlyIt) {
          const targetOrigin = isItLang ? CANONICAL_DOMAINS.it : CANONICAL_DOMAINS.en;
          const searchParams = new URLSearchParams(search);
          searchParams.set('lang_pref', lang);
          const newSearch = searchParams.toString() ? `?${searchParams.toString()}` : '';
          window.location.href = `${targetOrigin}${newPath}${newSearch}${hash}`;
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
