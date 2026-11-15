import ServicesPageLayout from "@/components/pages/services-page-layout";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.services.titles;
  const canonicalUrl = getCanonicalUrl(locale, "services");
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("services"),
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "de" }];
}

export default function ServicesPage() {
  return <ServicesPageLayout />;
}
