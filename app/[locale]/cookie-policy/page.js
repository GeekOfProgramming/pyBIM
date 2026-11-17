import CookiePolicyLayout from "@/components/pages/cookie-policy-layout";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.cookie.titles;
  const canonicalUrl = getCanonicalUrl(locale, "cookie-policy");
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("cookie-policy"),
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

export default function CookiePolicyPage() {
  return <CookiePolicyLayout />;
}
