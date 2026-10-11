import SecurityPageLayout from "@/components/pages/security-page-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.security.titles;
  const siteUrl = "https://pybim.com";
  const currentUrl = `${siteUrl}/${locale}/security`;
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/security`,
        it: `${siteUrl}/it/security`,
        de: `${siteUrl}/de/security`,
      },
    },
  };
}

export default function SecurityPage() {
  return <SecurityPageLayout />;
}
