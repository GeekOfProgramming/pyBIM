import TermsLayout from "@/components/pages/terms-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Terms and Conditions",
    it: "Termini e Condizioni",
    de: "Allgemeine Geschäftsbedingungen"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function TermsAndConditionsPage() {
  return (
    <main>
      <TermsLayout />
    </main>
  );
}
