import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";

const cities = ["trieste", "bolzano", "verona", "brescia", "treviso", "milano", "roma", "padova", "bologna"];

export function generateStaticParams() {
  return cities.map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return {
    title: `Fotovoltaico ${city}`,
    description: `Installazione impianti fotovoltaici a ${city}. Soluzioni solari per edifici residenziali e commerciali.`
  };
}

export default function CitySolarPage({ params }) {
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <p className="text-sm uppercase tracking-[0.35em] text-orange-400">Fotovoltaico {city}</p>
      <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Impianti Fotovoltaici a {city}</h1>
      <p className="mt-6 max-w-2xl text-lg text-white/65">Arvand Termo Tec realizza impianti fotovoltaici a {city} e in tutta Italia, offrendo soluzioni solari moderne per edifici residenziali, commerciali e industriali.</p>
      <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#0a1321] p-8">
        <div className="mb-6 inline-flex rounded-2xl bg-white/5 p-4 text-orange-400"><Sun className="h-6 w-6" /></div>
        <h2 className="text-2xl font-semibold text-white">Installazione pannelli solari a {city}</h2>
        <p className="mt-4 text-white/60">I nostri sistemi fotovoltaici sono progettati per ridurre i costi energetici e migliorare l'efficienza energetica degli edifici.</p>
        <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white">Richiedi consulenza <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </div>
  );
}
