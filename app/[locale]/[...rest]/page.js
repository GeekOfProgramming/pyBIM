import NotFound from "../not-found";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "404 - Page Not Found",
    it: "404 - Pagina Non Trovata",
    de: "404 - Seite Nicht Gefunden"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function CatchAllNotFound() {
  return <NotFound />;
}
