import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false
    }
  };
}

export default function EducationPostPage() {
  notFound();
}

