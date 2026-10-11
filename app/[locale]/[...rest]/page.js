import NotFound from "../not-found";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.notFound.titles;
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function CatchAllNotFound() {
  return <NotFound />;
}
