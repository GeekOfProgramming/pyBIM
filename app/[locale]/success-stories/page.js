import SuccessStoriesPageLayout from "@/components/pages/success-stories-page-layout";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const { titles, descriptions } = routeMetadata.successStories;
  const canonicalUrl = getCanonicalUrl(locale, "success-stories");

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("success-stories"),
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `${titles[locale] || titles.en} | pyBIM`,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl,
      siteName: "pyBIM",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "de" }];
}

export default function SuccessStoriesPage() {
  return <SuccessStoriesPageLayout />;
}
