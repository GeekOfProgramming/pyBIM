import Link from "next/link";
import { Sun, Leaf, Factory, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Fotovoltaico Italia",
  description: "Installazione impianti fotovoltaici in tutta Italia. Soluzioni solari per edifici residenziali, commerciali e industriali."
};

const servizi = [
  { title: "Impianti Fotovoltaici Residenziali", description: "Installazione pannelli solari per case, ville e appartamenti con sistemi ad alta efficienza.", icon: Sun },
  { title: "Fotovoltaico per Aziende", description: "Sistemi solari progettati per ridurre i costi energetici di aziende e attività commerciali.", icon: Factory },
  { title: "Energia Rinnovabile", description: "Soluzioni energetiche sostenibili per edifici moderni e progetti a lungo termine.", icon: Leaf }
];

export default function FotovoltaicoItalia() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <section className="mb-16">
        <p className="text-sm uppercase tracking-[0.35em] text-orange-400">Fotovoltaico Italia</p>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Installazione Impianti Fotovoltaici in Italia</h1>
        <p className="mt-6 max-w-2xl text-lg text-white/65">Arvand Termo Tec realizza impianti solari e fotovoltaici per edifici residenziali, commerciali e industriali in tutta Italia.</p>
      </section>
      <section className="grid gap-8 md:grid-cols-3">{servizi.map((servizio)=>{const Icon=servizio.icon; return <div key={servizio.title} className="rounded-[2rem] border border-white/10 bg-[#0a1321] p-8"><div className="mb-6 inline-flex rounded-2xl bg-white/5 p-4 text-orange-400"><Icon className="h-6 w-6" /></div><h3 className="text-xl font-semibold text-white">{servizio.title}</h3><p className="mt-4 text-sm leading-7 text-white/60">{servizio.description}</p></div>})}</section>
      <section className="mt-20 grid gap-10 lg:grid-cols-2"><div><h2 className="text-3xl font-semibold text-white">Perché scegliere il fotovoltaico</h2><div className="mt-6 space-y-4 text-white/65"><p>• Riduzione dei costi energetici</p><p>• Maggiore indipendenza energetica</p><p>• Energia pulita e sostenibile</p><p>• Valore aggiunto per l'immobile</p></div></div><div className="rounded-[2rem] border border-white/10 bg-white/5 p-8"><h3 className="text-xl font-semibold text-white">Richiedi una consulenza</h3><p className="mt-4 text-white/65">Il nostro team può aiutarti a progettare un impianto solare adatto alle esigenze del tuo progetto.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white">Contattaci <ArrowRight className="h-4 w-4" /></Link></div></section>
    </div>
  );
}
