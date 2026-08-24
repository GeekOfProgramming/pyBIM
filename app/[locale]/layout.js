import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GoToTop from "@/components/go-to-top";
import { LanguageProvider } from "@/lib/LanguageContext";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { Analytics } from "@vercel/analytics/react";
const siteUrl = "https://pybim.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "pyBIM | Advanced BIM & Software Development Lab",
    template: "%s | pyBIM"
  },
  description:
    "pyBIM is a software development lab for the AEC industry. We automate repetitive workflows, build pyRevit scripts, and eliminate human error in complex construction projects.",
  applicationName: "pyBIM",
  category: "BIM & Software Engineering",
  alternates: {
    canonical: siteUrl,
    languages: {
      "it-IT": siteUrl
    }
  },
  keywords: [
    "BIM Automation",
    "pyRevit scripting",
    "Dynamo automation",
    "Revit API C#",
    "Python for Architecture",
    "AEC Software Development",
    "BIM Management Italy",
    "Construction Tech"
  ],
  openGraph: {
    title: "pyBIM | Advanced BIM & Software Development Lab",
    description:
      "Automating the AEC industry with Python, pyRevit, and C#.",
    url: siteUrl,
    siteName: "pyBIM",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "pyBIM HVAC Nord Italia"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "pyBIM",
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

export function generateStaticParams() {
  return [{ locale: "it" }, { locale: "en" }];
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params?.locale || "it"}>
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
