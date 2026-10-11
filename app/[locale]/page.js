import HomePageLayout from "@/components/pages/home-page-layout";
import { siteMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const { titles, descriptions } = siteMetadata;
  
  return {
    title: {
      absolute: titles[locale] || titles.en
    },
    description: descriptions[locale] || descriptions.en
  };
}

const siteUrl = "https://pybim.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "pyBIM",
  url: siteUrl,
  logo: `${siteUrl}/logo_black_transparent.png`,
  email: "info@pybim.com",
  description: siteMetadata.organizationDescription
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "pyBIM",
  url: siteUrl
};

export default function HomePage() {
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
