import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  return {
    robots: { index: false, follow: false }
  };
}

export default async function ProjectDetailPage() {
  notFound();
}

