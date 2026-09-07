import CookiePolicyLayout from "@/components/pages/cookie-policy-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Cookie Policy",
    it: "Informativa sui Cookie",
    de: "Cookie-Richtlinie"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function CookiePolicyPage() {
  return <CookiePolicyLayout />;
}
