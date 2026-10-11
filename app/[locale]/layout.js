import "../globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import GoToTop from "@/components/layout/go-to-top";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import MobileBottomNav from "@/components/layout/mobile-bottom-nav";
import CookieConsent from "@/components/ui/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

import { siteMetadata } from "@/lib/site-copy";

const siteUrl = "https://pybim.com";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const currentUrl = `${siteUrl}/${locale}`;
  const { titles, descriptions, ogDescriptions } = siteMetadata;

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
      url: currentUrl,
      siteName: "pyBIM",
      locale: locale === "it" ? "it_IT" : locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "pyBIM - BIM Engineering & Revit Automation Services"
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
    <html lang={params?.locale || "en"} className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
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
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
