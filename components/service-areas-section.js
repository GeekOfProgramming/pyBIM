import Link from "@/components/LocalizedLink";
import { northItalyCities, northItalyRegions } from "@/lib/seo-data";

export default function ServiceAreasSection() {
  return (
    <section className="border-y border-sky-400/8 bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Aree servite</p>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Sede a Venezia. Copertura in tutto il Nord Italia.</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
          Il sito è strutturato per rafforzare la rilevanza locale nelle aree strategiche di Veneto, Lombardia, Emilia-Romagna,
          Friuli-Venezia Giulia, Piemonte, Liguria e Trentino-Alto Adige.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {northItalyRegions.map((region) => (
            <span key={region} className="rounded-full border border-white/10 bg-[#0d1727] px-4 py-2 text-sm text-white/75">
              {region}
            </span>
          ))}
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {northItalyCities.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="rounded-2xl border border-white/10 bg-[#0d1727] px-5 py-4 text-white/75 transition hover:border-sky-400/30 hover:text-white"
            >
              <div className="font-medium text-white">{city.name}</div>
              <div className="mt-1 text-sm text-white/50">{city.region}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
