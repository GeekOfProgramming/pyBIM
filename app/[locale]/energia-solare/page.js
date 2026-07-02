import Link from "next/link";
import { ArrowRight, Sun, BatteryCharging, Factory, Leaf } from "lucide-react";

export const metadata = {
  title: "Energia Solare e Fotovoltaico",
  description:
    "Impianti solari e fotovoltaici in tutta Italia. Soluzioni energetiche rinnovabili per edifici residenziali, commerciali e industriali."
};

const serviziSolari = [
  { title: "Installazione Impianti Fotovoltaici", description: "Sistemi fotovoltaici ad alta efficienza per edifici moderni e progetti energetici sostenibili.", icon: Sun },
  { title: "Sistemi di Accumulo", description: "Soluzioni con batterie per migliorare l'indipendenza energetica e ottimizzare l'uso dell'energia.", icon: BatteryCharging },
  { title: "Fotovoltaico per Aziende e Industria", description: "Soluzioni energetiche scalabili per aziende, fabbriche e strutture industriali.", icon: Factory },
  { title: "Progettazione Solare ed Energetica", description: "Progettazione di sistemi solari e fotovoltaici integrati per edifici moderni e sostenibili.", icon: Leaf }
];

export default function EnergiaSolarePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
      <section className="mb-16">
        <p className="text-sm uppercase tracking-[0.35em] text-orange-400">Energia Solare</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Impianti Solari e Fotovoltaici in Italia</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/65">Arvand Termo Tec realizza impianti solari e fotovoltaici per edifici residenziali, commerciali e industriali in tutta Italia.</p>
        <div className="mt-8 flex gap-4"><Link href="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white">Richiedi Consulenza <ArrowRight className="h-4 w-4" /></Link></div>
      </section>
      <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">{serviziSolari.map((servizio)=>{const Icon=servizio.icon; return <div key={servizio.title} className="rounded-[2rem] border border-white/10 bg-[#0a1321] p-8"><div className="mb-6 inline-flex rounded-2xl bg-white/5 p-4 text-orange-400"><Icon className="h-6 w-6" /></div><h3 className="text-xl font-semibold text-white">{servizio.title}</h3><p className="mt-4 text-sm leading-7 text-white/60">{servizio.description}</p></div>})}</section>
    </div>
  );
}
