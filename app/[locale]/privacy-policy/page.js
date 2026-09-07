import PrivacyPolicyClient from "@/components/pages/privacy-policy-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Privacy Policy",
    it: "Informativa sulla Privacy",
    de: "Datenschutzrichtlinie"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
