import Link from "@/components/LocalizedLink";
import { CheckCircle2, Shield } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutPreview() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        
        {/* Left Column: Image with Overlays */}
        <div className="relative mb-12 lg:mb-0">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl">
            <img 
              src="/Pictures/Uncategorized/uncategorized-013.jpg" 
              alt="Tecnico al lavoro" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081730]/90 via-[#081730]/20 to-transparent" />
          </div>
          
          {/* Bottom Left Card */}
          <div className="absolute -bottom-8 -left-4 sm:left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <div className="text-4xl font-black text-brand-accent mb-1">12+</div>
            <div className="text-sm font-semibold text-white/90 leading-tight" dangerouslySetInnerHTML={{ __html: t("about.stats.exp.label").replace(' ', '<br/>') }}></div>
          </div>
          
          {/* Bottom Right Logos */}
          <div className="absolute bottom-8 right-8 flex gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-sky-600" />
            </div>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent" /> {t("home.about.badge")}
          </p>
          
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight">
            {t("home.about.title")}
          </h2>
          
          <p className="text-lg leading-relaxed text-white/60 mb-10">
            {t("home.about.p1")}
          </p>
          
          <ul className="space-y-5 mb-12">
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
              <span className="text-white/80 text-lg">{t("home.about.cert1")}</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
              <span className="text-white/80 text-lg">{t("home.about.cert2")}</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
              <span className="text-white/80 text-lg">{t("home.about.cert3")}</span>
            </li>
          </ul>
          
          <Link href="/about" className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-4 text-base font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] transition hover:bg-orange-600 hover:-translate-y-1">
            {t("nav.about")}
          </Link>
        </div>
        
      </div>
    </section>
  );
}
