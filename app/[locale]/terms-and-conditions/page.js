import TermsAndConditionsClient from "@/components/pages/terms-and-conditions-client";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.terms.titles;
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsClient />;
}
