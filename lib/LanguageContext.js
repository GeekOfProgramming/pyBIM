"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations/index";
import { useParams, useRouter, usePathname } from "next/navigation";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguage] = useState("en");
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
    router.push(newPath);
  };

  const t = (key) => {
    const langToUse = isClient ? language : (params?.locale || "en");
    return translations[langToUse]?.[key] || key;
  };

  const getLocalizedUrl = (path) => {
    const langToUse = isClient ? language : (params?.locale || "en");
    if (path.startsWith('http')) return path; // external links
    return `/${langToUse}${path === "/" ? "" : path}`;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isClient, getLocalizedUrl }}>
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
