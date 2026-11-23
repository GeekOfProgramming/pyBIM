import { permanentRedirect } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "de" }];
}

export default async function ProjectsRedirectPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "en";
  permanentRedirect(`/${locale}/success-stories`);
  return null;
}
