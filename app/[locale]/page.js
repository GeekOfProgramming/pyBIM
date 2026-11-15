import HomePageLayout from "@/components/pages/home-page-layout";
import { siteMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages, getCanonicalDomain, DOMAIN_COM } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const { titles, descriptions } = siteMetadata;
  const canonicalUrl = getCanonicalUrl(locale, "");
  
  return {
    title: {
      absolute: titles[locale] || titles.en
    },
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(""),
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

export default function HomePage({ params }) {
  const locale = params?.locale || "en";
  const siteUrl = getCanonicalDomain(locale);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "pyBIM",
    alternateName: "pyBIM Engineering",
    url: siteUrl,
    logo: `${DOMAIN_COM}/images/shared/brand/logo_black_transparent.png`,
    email: "info@pybim.com",
    description: siteMetadata.organizationDescription,
    sameAs: [
      "https://www.linkedin.com/company/pybim",
      "https://github.com/pyBIM-collaboration"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "pyBIM",
    url: siteUrl,
    inLanguage: ["en", "it", "de"]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomePageLayout />
    </>
  );
}
