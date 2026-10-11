import CookiePolicyLayout from "@/components/pages/cookie-policy-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.cookie.titles;
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function CookiePolicyPage() {
  return <CookiePolicyLayout />;
}
