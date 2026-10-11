import SecurityPageLayout from "@/components/pages/security-page-layout";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.security.titles;
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function SecurityPage() {
  return <SecurityPageLayout />;
}
