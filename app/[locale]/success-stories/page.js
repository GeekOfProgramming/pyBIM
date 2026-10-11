import SuccessStoriesPageLayout from "@/components/pages/success-stories-page-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const { titles, descriptions } = routeMetadata.successStories;

  const siteUrl = "https://www.pybim.com";
  const currentUrl = `${siteUrl}/${locale}/success-stories`;

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/success-stories`,
        it: `${siteUrl}/it/success-stories`,
        de: `${siteUrl}/de/success-stories`,
      },
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `${titles[locale] || titles.en} | pyBIM`,
      description: descriptions[locale] || descriptions.en,
      url: currentUrl,
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
