import PricingPageLayout from "@/components/pages/pricing-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Pricing & Deployment Models | pyBIM",
    it: "Prezzi e Modelli di Distribuzione | pyBIM",
    de: "Preise und Bereitstellungsmodelle | pyBIM"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function PricingPage() {
  return <PricingPageLayout />;
}
