import ServicesPageLayout from "@/components/pages/services-page-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.services.titles;
  const siteUrl = "https://pybim.com";
  const currentUrl = `${siteUrl}/${locale}/services`;
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/services`,
        it: `${siteUrl}/it/services`,
        de: `${siteUrl}/de/services`,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "de" }];
}

export default function ServicesPage() {
  return <ServicesPageLayout />;
}
