import HomePageLayout from "@/components/pages/home-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "pyBIM | BIM Engineering & Revit Automation Services",
    it: "pyBIM | Servizi di Ingegneria BIM & Automazione Revit",
    de: "pyBIM | BIM-Engineering & Revit-Automatisierungsdienste"
  };

  const descriptions = {
    en: "pyBIM supports AEC engineering teams with BIM workflows, Revit automation, structured model information and technical coordination. Explore our current services and development roadmap.",
    it: "pyBIM supporta i team AEC con flussi di lavoro BIM, automazione Revit, gestione informativa del modello e coordinamento tecnico. Scopri i nostri servizi e la roadmap.",
    de: "pyBIM unterstützt AEC-Teams mit BIM-Workflows, Revit-Automatisierung, strukturierten Modellinformationen und technischer Koordination. Entdecken Sie unsere Leistungen und Roadmap."
  };
  
  return {
    title: {
      absolute: titles[locale] || titles.en
    },
    description: descriptions[locale] || descriptions.en
  };
}

const siteUrl = "https://www.pybim.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "pyBIM",
  url: siteUrl,
  logo: `${siteUrl}/logo_black_transparent.png`,
  email: "info@pybim.com",
  description: "pyBIM provides BIM engineering services and develops tailored automation workflows for the architecture, engineering and construction industry, with a focus on Revit-based processes, model information and technical coordination."
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "pyBIM",
  url: siteUrl
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomePageLayout />
    </>
  );
}
