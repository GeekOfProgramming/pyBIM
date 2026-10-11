import PrivacyPolicyClient from "@/components/pages/privacy-policy-client";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.privacy.titles;
  const siteUrl = "https://pybim.com";
  const currentUrl = `${siteUrl}/${locale}/privacy-policy`;
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/privacy-policy`,
        it: `${siteUrl}/it/privacy-policy`,
        de: `${siteUrl}/de/privacy-policy`,
      },
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
