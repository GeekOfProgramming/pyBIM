import PrivacyPolicyClient from "@/components/pages/privacy-policy-client";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.privacy.titles;
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
