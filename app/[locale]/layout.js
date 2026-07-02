import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GoToTop from "@/components/go-to-top";
import { LanguageProvider } from "@/lib/LanguageContext";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { Analytics } from "@vercel/analytics/react";
const siteUrl = "https://arvandtermotec.it";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arvand Termo Tec | HVAC e Ventilazione nel Nord Italia",
    template: "%s | Arvand Termo Tec"
  },
  description:
    "Arvand Termo Tec realizza impianti HVAC, ventilazione industriale, riscaldamento e raffrescamento per clienti industriali e residenziali a Venezia e in tutto il Nord Italia.",
  applicationName: "Arvand Termo Tec",
  category: "HVAC Engineering",
  alternates: {
    canonical: siteUrl,
    languages: {
      "it-IT": siteUrl
    }
  },
  keywords: [
    "impianti HVAC Nord Italia",
    "climatizzazione Venezia",
    "impianti climatizzazione Nord Italia",
    "ventilazione industriale Veneto",
    "riscaldamento e raffrescamento Venezia",
    "HVAC Lombardia",
    "climatizzazione commerciale Veneto",
    "impianti residenziali Nord Italia"
  ],
  openGraph: {
    title: "Arvand Termo Tec | HVAC e Ventilazione nel Nord Italia",
    description:
      "Soluzioni HVAC per case, aziende e industria da Venezia a tutto il Nord Italia.",
    url: siteUrl,
    siteName: "Arvand Termo Tec",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arvand Termo Tec HVAC Nord Italia"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvand Termo Tec",
    description:
      "HVAC, ventilazione e climate engineering per Venezia e Nord Italia.",
    images: ["/og-image.jpg"]
  },
  icons: {
    icon: "/logo-new-2.png"
  }
};

export function generateStaticParams() {
  return [{ locale: "it" }, { locale: "en" }];
}

export default function RootLayout({ children, params }) {
  return (
    <html lang={params?.locale || "it"}>
      <body className="min-h-screen bg-[#081730] text-white antialiased">
        <LanguageProvider>
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_26%),linear-gradient(to_bottom,#081730,#0a1b38_40%,#061124)]" />
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
