import InfrastructureClient from "@/components/portal/infrastructure-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Infrastructure & Licenses",
    it: "Infrastruttura & Licenze",
    de: "Infrastruktur & Lizenzen"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function InfrastructurePage() {
  return <InfrastructureClient />;
}
