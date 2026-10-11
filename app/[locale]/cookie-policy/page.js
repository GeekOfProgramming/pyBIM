import CookiePolicyLayout from "@/components/pages/cookie-policy-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.cookie.titles;
  const siteUrl = "https://pybim.com";
  const currentUrl = `${siteUrl}/${locale}/cookie-policy`;
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/cookie-policy`,
        it: `${siteUrl}/it/cookie-policy`,
        de: `${siteUrl}/de/cookie-policy`,
      },
    },
  };
}

export default function CookiePolicyPage() {
  return <CookiePolicyLayout />;
}
