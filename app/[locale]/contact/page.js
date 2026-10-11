import ContactPageLayout from "@/components/pages/contact-page-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.contact.titles;
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function ContactPage() {
  return <ContactPageLayout />;
}
