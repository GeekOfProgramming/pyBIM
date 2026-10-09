import EducationPageLayout from "@/components/pages/education-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Education & Training — Coming Soon",
    it: "Formazione e Risorse BIM — Prossimamente",
    de: "BIM-Wissen und Weiterbildung — Demnächst verfügbar"
  };

  const descriptions = {
    en: "We're preparing practical BIM learning resources, engineering insights, and workflow guides. Coming soon.",
    it: "Stiamo preparando risorse formative BIM, approfondimenti tecnici e guide pratiche ai workflow. Prossimamente.",
    de: "Wir bereiten praxisnahe BIM-Lernressourcen, technische Einblicke und Workflow-Leitfäden vor. Demnächst verfügbar."
  };

  const siteUrl = "https://www.pybim.com";
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
