import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { northItalyCities } from "@/lib/seo-data";

export function generateStaticParams() {
  return northItalyCities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }) {
  const city = northItalyCities.find((item) => item.slug === params.slug);
  if (!city) return {};
  return {
    title: `Impianti HVAC a ${city.name}`,
    description: `${city.intro} pyBIM serve ${city.name} e il mercato ${city.region} dalla sede di Venezia.`
  };
}

export default function ServiceAreaPage({ params }) {
  const city = northItalyCities.find((item) => item.slug === params.slug);
  if (!city) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Impianti HVAC a ${city.name}`,
    areaServed: city.name,
    provider: {
      "@type": "HVACBusiness",
      name: "pyBIM",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Venezia",
        addressRegion: "Veneto",
        addressCountry: "IT"
      }
    },
    serviceType: ["HVAC industriale", "HVAC residenziale", "Sistemi di ventilazione"]
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="text-sm uppercase tracking-[0.35em] text-orange-400">Area servita</p>
      <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Impianti HVAC e climatizzazione a {city.name}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">{city.intro}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-[#0a1321] p-8">
          <div className="flex items-center gap-3 text-orange-400"><MapPin className="h-5 w-5" /> {city.name}, {city.region}</div>
          <h2 className="mt-4 text-2xl font-semibold text-white">Servizi disponibili in questa zona</h2>
          <ul className="mt-5 space-y-3 text-white/65">
            <li>• HVAC industriale a {city.name}</li>
            <li>• Riscaldamento e raffrescamento residenziale a {city.name}</li>
            <li>• Sistemi di ventilazione in {city.region}</li>
            <li>• Installazione HVAC da Venezia verso il Nord Italia</li>
          </ul>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Richiedi un preventivo</h2>
          <p className="mt-4 text-white/65">Contatta pyBIM per sopralluoghi, installazioni, ristrutturazioni e aggiornamenti di ventilazione per abitazioni, attività commerciali e strutture industriali.</p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white">
            Contatta il team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
