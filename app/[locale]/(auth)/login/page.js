import AuthLoginClient from "@/components/pages/auth-login-client";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Client Portal Login",
    it: "Accesso Portale Clienti",
    de: "Kundenportal-Anmeldung"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function LoginPage() {
  return <AuthLoginClient />;
}
