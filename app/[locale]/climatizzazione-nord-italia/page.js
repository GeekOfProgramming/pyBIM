import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Climatizzazione Nord Italia",
  description: "Impianti di climatizzazione, riscaldamento, raffrescamento e ventilazione per Venezia e tutto il Nord Italia. Soluzioni per casa, azienda e industria."
};

export default function ClimatizzazioneNordItaliaPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
      <p className="text-sm uppercase tracking-[0.35em] text-orange-400">SEO Italia</p>
      <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Impianti di climatizzazione nel Nord Italia</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
        Arvand Termo Tec opera da Venezia e segue progetti di climatizzazione, ventilazione, riscaldamento e raffrescamento in Veneto, Lombardia, Emilia-Romagna, Friuli-Venezia Giulia e nelle principali città del Nord Italia.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-[2rem] border border-white/10 bg-[#0a1321] p-8">Impianti per abitazioni, ville, appartamenti e ristrutturazioni.</div>
        <div className="rounded-[2rem] border border-white/10 bg-[#0a1321] p-8">Soluzioni HVAC per uffici, negozi, hotel, ristoranti e spazi commerciali.</div>
        <div className="rounded-[2rem] border border-white/10 bg-[#0a1321] p-8">Ventilazione e trattamento aria per capannoni, produzione e magazzini.</div>
      </div>
      <Link href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white">
        Richiedi preventivo <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
