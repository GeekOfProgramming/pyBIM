import ServicesPageLayout from "@/components/pages/services-page-layout";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const { titles, descriptions } = routeMetadata.services;
  const canonicalUrl = getCanonicalUrl(locale, "services");
  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("services"),
    },
    openGraph: {
      title: `${title} | pyBIM`,
      description,
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
