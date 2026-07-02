const logos = ["ARCHITETTI", "SVILUPPATORI", "APPALTATORI", "FACILITY TEAM", "CONSULENTI", "PARTNER TECNICI"];

export default function ClientLogosSection() {
  return (
    <section className="relative border-y border-sky-400/8 bg-[#08101c]/70">
      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Presenza affidabile</p>
          <h2 className="mt-4 text-2xl font-semibold text-white md:text-4xl">Pensato per relazioni professionali solide</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">{logos.map((logo)=><div key={logo} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-6 text-center backdrop-blur-sm transition hover:border-sky-400/30 hover:bg-white/[0.07]"><div className="relative text-sm font-semibold tracking-[0.22em] text-white/60 transition group-hover:text-white/90">{logo}</div></div>)}</div>
      </div>
    </section>
  );
}
