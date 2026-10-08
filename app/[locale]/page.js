import HomePageLayout from "@/components/pages/home-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Advanced BIM & Software Development Lab",
    it: "Laboratorio Avanzato BIM & Sviluppo Software",
    de: "Erweitertes BIM & Softwareentwicklungs-Labor"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "pyBIM",
  url: "https://pybim.com",
  logo: "https://pybim.com/logo_black_transparent.png",
  email: "info@pybim.com",
  description: "pyBIM is an engineering & software development lab for the AEC industry specializing in BIM automation, Revit API C# plugins, and OpenBIM workflows.",
  sameAs: ["https://pybim.com"]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "pyBIM - Advanced BIM & Software Development Lab",
  image: "https://pybim.com/og-image.jpg",
  email: "info@pybim.com",
  priceRange: "€€€",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IT"
  },
  areaServed: ["European Union", "DACH Region", "Italy", "United Kingdom"],
  url: "https://pybim.com",
  knowsAbout: [
    "BIM Automation",
    "Revit API Development",
    "Dynamo Scripting",
    "Python Data Pipelines",
    "OpenBIM Workflows",
    "UNI 11337 Standard",
    "COBie Asset Handover",
    "Digital Twins"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is specialized coding expertise required to operate your custom plugins?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All programmatic logic is encapsulated within intuitive Graphical User Interfaces (WPF) or custom ribbon toolbars. Execution requires zero syntax knowledge from the end-user."
      }
    },
    {
      "@type": "Question",
      name: "How does pyBIM ensure compliance with European BIM mandates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our workflows strictly adhere to ISO 19650, UNI 11337, and Decreto BIM protocols. We automate COBie extraction and CDE data validation to guarantee 100% tender compliance."
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
