import DashboardClient from "@/components/portal/dashboard-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Overview & Dashboard",
    it: "Panoramica & Dashboard",
    de: "Übersicht & Dashboard"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function DashboardPage() {
  return <DashboardClient />;
}
