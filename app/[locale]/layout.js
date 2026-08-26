import "../globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoToTop from "@/components/layout/go-to-top";
import { LanguageProvider } from "@/lib/LanguageContext";
import MobileBottomNav from "@/components/layout/mobile-bottom-nav";
import IsolatedAnalytics from "@/components/ui/IsolatedAnalytics";
import Script from "next/script";
const siteUrl = "https://pybim.com";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const currentUrl = `${siteUrl}/${locale}`;

  const titles = {
    en: "pyBIM | Advanced BIM & Software Development Lab",
    it: "pyBIM | Laboratorio Avanzato BIM & Sviluppo Software",
    de: "pyBIM | Erweitertes BIM & Softwareentwicklungs-Labor"
  };

  const descriptions = {
    en: "pyBIM is a software development lab for the AEC industry. We engineer custom Revit API C# plugins, Python data pipelines, and ISO 19650 compliant BIM workflows.",
    it: "pyBIM è un laboratorio di sviluppo software per il settore AEC. Sviluppiamo plugin personalizzati Revit API in C#, pipeline di dati in Python e flussi di lavoro BIM conformi allo standard ISO 19650.",
    de: "pyBIM ist ein Softwareentwicklungs-Labor für die AEC-Branche. Wir entwickeln maßgeschneiderte Revit API C#-Plugins, Python-Daten-Pipelines und ISO 19650-konforme BIM-Workflows."
  };

  const ogDescriptions = {
    en: "Automating the AEC industry with Python, Revit API C#, and OpenBIM workflows.",
    it: "Automazione nel settore AEC con flussi di lavoro Python, Revit API C# e OpenBIM.",
    de: "Automatisierung der AEC-Branche mit Python, Revit API C# und OpenBIM-Workflows."
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: titles[locale] || titles.en,
      template: "%s | pyBIM"
    },
    description: descriptions[locale] || descriptions.en,
    applicationName: "pyBIM",
    category: "BIM & Software Engineering",
    alternates: {
      canonical: currentUrl,
      languages: {
        "en-US": `${siteUrl}/en`,
        "it-IT": `${siteUrl}/it`,
        "de-DE": `${siteUrl}/de`,
        "x-default": `${siteUrl}/en`
      }
    },
    keywords: [
      "BIM Automation",
      "pyRevit scripting",
      "Dynamo automation",
      "Revit API C#",
      "Python for Architecture",
      "AEC Software Development",
      "BIM Management Europe",
      "ISO 19650 Compliance",
      "UNI 11337 Standard",
      "COBie Asset Handover"
    ],
    openGraph: {
      title: titles[locale] || titles.en,
      description: ogDescriptions[locale] || ogDescriptions.en,
      url: currentUrl,
      siteName: "pyBIM",
      locale: locale === "it" ? "it_IT" : locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "pyBIM - Advanced BIM & Software Development Lab"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: ogDescriptions[locale] || ogDescriptions.en,
      images: ["/og-image.jpg"]
    },
    icons: {
      icon: [
        { url: "/logo_black_transparent.png", media: "(prefers-color-scheme: light)" },
        { url: "/logo_white_transparent.png", media: "(prefers-color-scheme: dark)" }
      ]
    }
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "de" }];
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params?.locale || "en"}>
      <head>
        <Script id="iubenda-cookie-banner" strategy="beforeInteractive" src="https://embeds.iubenda.com/widgets/eedcc230-7814-4450-9adf-6b78912f4614.js" />
        <Script id="iubenda-loader" strategy="lazyOnload" src="https://cdn.iubenda.com/iubenda.js" />
      </head>
      <body className="min-h-screen bg-brand-base text-brand-textPrimary antialiased">
        <LanguageProvider>
          <div className="fixed inset-0 -z-10 bg-brand-base" />
          <Header />
          <main className="pb-20 lg:pb-0">{children}</main>
          <GoToTop />
          <Footer />
          <MobileBottomNav />
        </LanguageProvider>
        <IsolatedAnalytics />
      </body>
    </html>
  );
}
