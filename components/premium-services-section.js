import Link from "@/components/LocalizedLink";
import { ArrowRight, Building2, Factory, Home, Wind } from "lucide-react";

const services = [
  {
    title: "HVAC e ventilazione industriale",
    description: "Trattamento aria, estrazione, ventilazione e climatizzazione per fabbriche, magazzini, aree produttive e spazi logistici.",
    icon: Factory,
    href: "/services/industrial-hvac"
  },
  {
    title: "Impianti HVAC commerciali",
    description: "Controllo climatico affidabile per uffici, ospitalità, ristoranti, showroom, retail e edifici a uso misto.",
    icon: Building2,
    href: "/services/commercial-hvac"
  },
  {
    title: "Riscaldamento e raffrescamento residenziale",
    description: "Soluzioni orientate al comfort per ville, appartamenti, ristrutturazioni e nuove realizzazioni.",
    icon: Home,
    href: "/services/residential-hvac"
  },
  {
    title: "Progettazione e ingegneria HVAC",
    description: "Progettazione tecnica, dimensionamento impianti e pianificazione installativa per prestazioni efficienti e durature.",
    icon: Wind,
    href: "/contact"
  }
];

export default function PremiumServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-14 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Servizi</p>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Soluzioni HVAC professionali per industria, business e abitazioni</h2>
        <p className="mt-6 text-lg text-white/60">
          Il brand è posizionato per domanda industriale, commerciale e residenziale nel Nord Italia, con pagine servizio e struttura SEO pensate per la ricerca locale.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.title} className="group rounded-[2rem] border border-white/10 bg-[#0a1321] p-8 transition hover:border-sky-400/30 hover:bg-[#0c1728]">
              <div className="mb-6 inline-flex rounded-2xl bg-white/5 p-4 text-orange-400">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/60">{service.description}</p>
              <Link href={service.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-sky-300">
                Scopri di più <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
