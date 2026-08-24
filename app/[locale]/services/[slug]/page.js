import { notFound } from "next/navigation";
import servicesData from "@/lib/data/services-data.json";
import ServiceDetailLayout from "@/components/service-detail-layout";

export function generateStaticParams() {
  const locales = ["en", "it", "de"];
  return locales.flatMap((locale) =>
    servicesData.map((service) => ({
      locale,
      slug: service.slug
    }))
  );
}

export async function generateMetadata({ params }) {
  const service = servicesData.find((item) => item.slug === params.slug);
  if (!service) return {};
  // Metadata could be localized if we use language routing, but for now we fallback to IT
  return {
    title: service.title?.it || service.title?.en || service.slug,
    description: service.description?.it || service.description?.en || ""
  };
}

export default function ServiceDetailPage({ params }) {
  const service = servicesData.find((item) => item.slug === params.slug);
  if (!service) notFound();

  return <ServiceDetailLayout service={service} />;
}
