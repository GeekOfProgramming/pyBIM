import fs from "fs";
import path from "path";
import HomePageLayout from "@/components/home-page-layout";
import { northItalyCities, northItalyRegions } from "@/lib/seo-data";

// Schema objects remain the same...
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "pyBIM",
  url: "https://pybim.com",
  logo: "https://pybim.com/logo_black_transparent.png",
  email: "info@pybim.com",
  telephone: "+39 351 974 2579",
  sameAs: ["https://pybim.com"]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "pyBIM",
  image: "https://pybim.com/og-image.jpg",
  telephone: "+39 351 974 2579",
  email: "info@pybim.com",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Venezia",
    addressRegion: "Veneto",
    addressCountry: "IT"
  },
  areaServed: northItalyRegions,
  url: "https://pybim.com",
  serviceArea: northItalyCities.map((city) => ({
    "@type": "City",
    name: city.name
  })),
  knowsAbout: [
    "BIM Automation",
    "Revit API",
    "Dynamo Scripts",
    "Python for Architecture",
    "Software Development for AEC",
    "Digital Twin"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Lavorate solo a Venezia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. pyBIM opera da Venezia e serve tutto il Nord Italia, inclusi Veneto, Lombardia, Emilia-Romagna e Friuli-Venezia Giulia."
      }
    },
    {
      "@type": "Question",
      name: "Seguite sia progetti industriali che residenziali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sì. L'azienda è posizionata per impianti industriali, commerciali e residenziali, con servizi di ventilazione, riscaldamento e raffrescamento."
      }
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomePageLayout />
    </>
  );
}
