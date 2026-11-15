import SecurityPageLayout from "@/components/pages/security-page-layout";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.security.titles;
  const canonicalUrl = getCanonicalUrl(locale, "security");
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("security"),
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

export default function SecurityPage() {
  return <SecurityPageLayout />;
}
