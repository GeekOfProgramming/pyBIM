import ExecutionsClient from "@/components/portal/executions-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Algorithmic Executions",
    it: "Esecuzioni Algoritmiche",
    de: "Algorithmische Ausführungen"
  };

  return {
    title: titles[locale] || titles.en
  };
}

export default function ExecutionsPage() {
  return <ExecutionsClient />;
}
