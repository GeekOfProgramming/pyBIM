import ContactPageLayout from "@/components/pages/contact-page-layout";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.contact.titles;
  const canonicalUrl = getCanonicalUrl(locale, "contact");
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("contact"),
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

export default function ContactPage() {
  return <ContactPageLayout />;
}
