import SuccessStoriesPageLayout from "@/components/pages/success-stories-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Success Stories — In Preparation",
    it: "Casi di Successo — In Preparazione",
    de: "Erfolgsgeschichten — In Vorbereitung"
  };

  const descriptions = {
    en: "We're preparing a selection of BIM engineering work, project case studies, and client perspectives for publication once the relevant material has been reviewed and approved.",
    it: "Stiamo preparando una selezione di progetti BIM, case study e testimonianze dei clienti per la pubblicazione, non appena il materiale sarà stato verificato e approvato.",
    de: "Wir bereiten eine Auswahl an BIM-Engineering-Projekten, Fallstudien und Kundenperspektiven für die Veröffentlichung vor, sobald die entsprechenden Unterlagen geprüft und freigegeben sind."
  };

  const siteUrl = "https://pybim.com";
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
