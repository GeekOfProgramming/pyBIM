import TermsAndConditionsClient from "@/components/pages/terms-and-conditions-client";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.terms.titles;
  const siteUrl = "https://pybim.com";
  const currentUrl = `${siteUrl}/${locale}/terms-and-conditions`;
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/terms-and-conditions`,
        it: `${siteUrl}/it/terms-and-conditions`,
        de: `${siteUrl}/de/terms-and-conditions`,
      },
    },
  };
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsClient />;
}
