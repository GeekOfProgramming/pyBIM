import TermsAndConditionsClient from "@/components/pages/terms-and-conditions-client";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.terms.titles;
  const canonicalUrl = getCanonicalUrl(locale, "terms-and-conditions");
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("terms-and-conditions"),
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsClient />;
}
