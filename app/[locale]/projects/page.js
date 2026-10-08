import ProjectsPageLayout from "@/components/pages/projects-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Success Stories — In Preparation",
    it: "Casi di Successo — In Preparazione",
    de: "Erfolgsgeschichten — In Vorbereitung"
  };

  const descriptions = {
    en: "We're preparing a carefully reviewed collection of engineering project examples, case studies, and client perspectives. Coming soon.",
    it: "Stiamo preparando una raccolta accuratamente verificata di progetti ingegneristici, case study e testimonianze dei clienti. Prossimamente.",
    de: "Wir bereiten eine sorgfältig geprüfte Sammlung von Engineering-Projekten, Fallstudien und Kundenperspektiven vor. Demnächst verfügbar."
  };

  const siteUrl = "https://pybim.com";
  const currentUrl = `${siteUrl}/${locale}/projects`;

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/projects`,
        it: `${siteUrl}/it/projects`,
        de: `${siteUrl}/de/projects`,
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

export default function ProjectsPage() {
  return <ProjectsPageLayout />;
}
