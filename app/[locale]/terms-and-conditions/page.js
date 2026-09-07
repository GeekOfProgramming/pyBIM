import TermsAndConditionsClient from "@/components/pages/terms-and-conditions-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Terms & Conditions",
    it: "Termini e Condizioni",
    de: "Allgemeine Geschäftsbedingungen"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsClient />;
}
