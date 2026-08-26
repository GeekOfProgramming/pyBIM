import ContactPageLayout from "@/components/pages/contact-page-layout";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Contact Us",
    it: "Contatti",
    de: "Kontakt"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function ContactPage() {
  return <ContactPageLayout />;
}
