import ServicesPageLayout from "@/components/pages/services-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Services",
    it: "Servizi",
    de: "Dienstleistungen"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function ServicesPage() {
  return <ServicesPageLayout />;
}
