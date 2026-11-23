import "../globals.css";
import localFont from "next/font/local";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoToTop from "@/components/layout/go-to-top";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import MobileBottomNav from "@/components/layout/mobile-bottom-nav";
import CookieConsent from "@/components/ui/CookieConsent";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../../public/fonts/jetbrains-mono-latin-wght-normal.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

import { siteMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages, DOMAIN_COM } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const canonicalUrl = getCanonicalUrl(locale, "");
  const { titles, descriptions, ogDescriptions } = siteMetadata;

  return {
    metadataBase: new URL(DOMAIN_COM),
    title: {
      default: titles[locale] || titles.en,
      template: "%s | pyBIM"
    },
    description: descriptions[locale] || descriptions.en,
    applicationName: "pyBIM",
    category: "BIM & Software Engineering",
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(""),
    },
    keywords: [
      "BIM Engineering",
      "BIM Automation",
      "Revit API",
      "pyRevit",
      "Dynamo Automation",
      "Python AEC",
      "OpenBIM Workflows",
      "Technical Coordination",
      "Model Management"
    ],
    openGraph: {
      title: titles[locale] || titles.en,
      description: ogDescriptions[locale] || ogDescriptions.en,
      url: canonicalUrl,
      siteName: "pyBIM",
      locale: locale === "it" ? "it_IT" : locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/shared/brand/logo_black_transparent.png",
          alt: "pyBIM - BIM Engineering & Revit Automation Services"
        }
      ]
    },
    twitter: {
      card: "summary",
      title: titles[locale] || titles.en,
      description: ogDescriptions[locale] || ogDescriptions.en,
      images: ["/images/shared/brand/logo_black_transparent.png"]
    },
    icons: {
      icon: [
        { url: "/images/shared/brand/logo_black_transparent.png", media: "(prefers-color-scheme: light)" },
        { url: "/images/shared/brand/logo_white_transparent.png", media: "(prefers-color-scheme: dark)" }
      ]
    }
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "de" }];
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params?.locale || "en"} className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          id="pybim-theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className="font-sans min-h-screen bg-brand-base text-brand-textPrimary antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <div className="fixed inset-0 -z-10 bg-brand-base" />
            <Header />
            <main className="pb-20 lg:pb-0">{children}</main>
            <GoToTop />
            <Footer />
            <MobileBottomNav />
            <CookieConsent />
            <GoogleAnalytics locale={params?.locale || "en"} />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
