import ContactPageLayout from "@/components/pages/contact-page-layout";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const { titles, descriptions } = routeMetadata.contact;
  const canonicalUrl = getCanonicalUrl(locale, "contact");
  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("contact"),
    },
    openGraph: {
      title: `${title} | pyBIM`,
      description,
      url: canonicalUrl,
    },
  };
}

export default function ContactPage() {
  return <ContactPageLayout />;
}
