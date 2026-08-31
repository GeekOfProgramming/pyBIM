import EducationPageLayout from "@/components/pages/education-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Education & Training",
    it: "Formazione e Corsi",
    de: "Ausbildung & Schulung"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function EducationPage() {
  return <EducationPageLayout />;
}
