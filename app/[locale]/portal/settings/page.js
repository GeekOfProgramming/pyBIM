import SettingsClient from "@/components/portal/settings-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Account Settings",
    it: "Impostazioni Account",
    de: "Kontoeinstellungen"
  };

  return {
    title: titles[locale] || titles.en
  };
}

export default function SettingsPage() {
  return <SettingsClient />;
}
