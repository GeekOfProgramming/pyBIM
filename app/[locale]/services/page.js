import ServicesPageLayout from "@/components/pages/services-page-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.services.titles;
  
  return {
    title: titles[locale] || titles.en
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "de" }];
}

export default function ServicesPage() {
  return <ServicesPageLayout />;
}
