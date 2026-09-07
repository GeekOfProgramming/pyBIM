import SecurityPageLayout from "@/components/pages/security-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Enterprise Security & Air-Gap Architecture",
    it: "Sicurezza Aziendale & Architettura Air-Gap",
    de: "Unternehmenssicherheit & Air-Gap-Architektur"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function SecurityPage() {
  return <SecurityPageLayout />;
}
