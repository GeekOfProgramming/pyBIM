import { permanentRedirect } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "it" }, { locale: "de" }];
}

export default function ProjectsRedirectPage({ params }) {
  const locale = params?.locale || "en";
  permanentRedirect(`/${locale}/success-stories`);
}
