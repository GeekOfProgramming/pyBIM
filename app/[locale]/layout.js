import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GoToTop from "@/components/go-to-top";
import { LanguageProvider } from "@/lib/LanguageContext";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { Analytics } from "@vercel/analytics/react";

const siteUrl = "https://pybim.com";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const currentUrl = `${siteUrl}/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "pyBIM | Advanced BIM & Software Development Lab",
      template: "%s | pyBIM"
    },
    description:
      "pyBIM is a software development lab for the AEC industry. We engineer custom Revit API C# plugins, Python data pipelines, and ISO 19650 compliant BIM workflows.",
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
      title: "pyBIM | Advanced BIM & Software Development Lab",
      description:
        "Automating the AEC industry with Python, Revit API C#, and OpenBIM workflows.",
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
      title: "pyBIM | Advanced BIM & Software Development Lab",
      description:
        "BIM Automation and AEC Software Engineering.",
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
      <body className="min-h-screen bg-brand-base text-brand-textPrimary antialiased">
        <LanguageProvider>
          <div className="fixed inset-0 -z-10 bg-brand-base" />
          <Header />
          <main className="pb-20 lg:pb-0">{children}</main>
          <GoToTop />
          <Footer />
          <MobileBottomNav />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
