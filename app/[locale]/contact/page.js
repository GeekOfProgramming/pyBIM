import ContactPageLayout from "@/components/pages/contact-page-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.contact.titles;
  const siteUrl = "https://pybim.com";
  const currentUrl = `${siteUrl}/${locale}/contact`;
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/contact`,
        it: `${siteUrl}/it/contact`,
        de: `${siteUrl}/de/contact`,
      },
    },
  };
}

export default function ContactPage() {
  return <ContactPageLayout />;
}
