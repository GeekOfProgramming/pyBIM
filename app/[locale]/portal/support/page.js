import SupportClient from "@/components/portal/support-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Technical Support",
    it: "Supporto Tecnico",
    de: "Technischer Support"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function SupportPage() {
  return <SupportClient />;
}
