import testimonials from "@/lib/data/testimonials-data.json";
import Carousel from "./carousel";
import { Star } from "lucide-react";
export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Testimonianze</p>
        <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Fiducia costruita con immagine, tecnica e performance</h2>
      </div>
      <Carousel itemsPerViewDesktop={3}>
        {[...testimonials].reverse().map((item, idx) => (
          <div key={item.id || idx} className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-8 flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-orange-400 mb-6">
                {[...Array(item.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-white/70 leading-8 mb-6">“{item.text}”</p>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/40 font-bold overflow-hidden shrink-0">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.authorName} className="w-full h-full object-cover" />
                ) : (
                  item.authorName.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <div className="text-white font-semibold">{item.authorName}</div>
                <div className="text-sm text-white/45">{item.authorRole}</div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
