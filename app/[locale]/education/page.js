import EducationPageLayout from "@/components/pages/education-page-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const { titles, descriptions } = routeMetadata.education;

  const siteUrl = "https://pybim.com";
  const currentUrl = `${siteUrl}/${locale}/education`;

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/education`,
        it: `${siteUrl}/it/education`,
        de: `${siteUrl}/de/education`,
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

export default function EducationPage() {
  return <EducationPageLayout />;
}
