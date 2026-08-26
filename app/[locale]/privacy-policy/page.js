import PrivacyPolicyLayout from "@/components/pages/privacy-policy-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Privacy Policy",
    it: "Informativa sulla privacy",
    de: "Datenschutzrichtlinie"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PrivacyPolicyLayout />
    </main>
  );
}
