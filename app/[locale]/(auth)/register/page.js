import AuthRegisterClient from "@/components/pages/auth-register-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Create Enterprise Account",
    it: "Crea Account Aziendale",
    de: "Unternehmenskonto erstellen"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function RegisterPage() {
  return <AuthRegisterClient />;
}
