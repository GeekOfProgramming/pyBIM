import PrivacyPolicyClient from "@/components/pages/privacy-policy-client";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.privacy.titles;
  const canonicalUrl = getCanonicalUrl(locale, "privacy-policy");
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("privacy-policy"),
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
