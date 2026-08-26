const fs = require('fs');
const layoutPath = 'c:/bim/components/pages/about-page-layout.js';
let content = fs.readFileSync(layoutPath, 'utf8');

const newImpactCTA = `          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Shield className="w-4 h-4" /> {t("about.impact.badge")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              {t("about.impact.title")}
            </h2>
          </div>
          <div className="grid gap-16 md:grid-cols-3">
            <div className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-blue-400 mb-4 group-hover:scale-105 transition-transform duration-500">
                {t("about.impact.stat1.val")}
              </div>
              <h4 className="text-brand-textPrimary font-bold text-lg mb-2">{t("about.impact.stat1.title")}</h4>
              <p className="text-brand-textSecondary text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat1.desc") }} />
            </div>

            <div className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-blue-400 mb-4 group-hover:scale-105 transition-transform duration-500">
                {t("about.impact.stat2.val")}
              </div>
              <h4 className="text-brand-textPrimary font-bold text-lg mb-2">{t("about.impact.stat2.title")}</h4>
              <p className="text-brand-textSecondary text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat2.desc") }} />
            </div>

            <div className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-blue-400 mb-4 group-hover:scale-105 transition-transform duration-500">
                {t("about.impact.stat3.val")}
              </div>
              <h4 className="text-brand-textPrimary font-bold text-lg mb-2">{t("about.impact.stat3.title")}</h4>
              <p className="text-brand-textSecondary text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat3.desc") }} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Call to Action (Two side-by-side cards) */}
      <section className="bg-brand-base w-full py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">

            {/* Card 1 For Clients */}
            <div className="rounded-[2.5rem] border border-brand-border bg-white shadow-lg p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-surface blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-primary/5 transition-colors" />
              <div className="relative z-10 w-full mb-10">
                <Briefcase className="w-12 h-12 text-brand-primary/60 mb-6 group-hover:text-brand-primary transition-colors" />
                <h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-8">
                  {t("about.cta.c1_title")}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-brand-textPrimary text-base">{t("about.cta.c1_b_title")}:</h4>
                    <p className="text-brand-textSecondary text-base leading-relaxed">{t("about.cta.c1_b_desc")}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-textPrimary text-base">{t("about.cta.c1_p_title")}:</h4>
                    <p className="text-brand-textSecondary text-base leading-relaxed">{t("about.cta.c1_p_desc")}</p>
                  </div>
                </div>
              </div>
              <div className="relative z-10 w-full">
                <Link href="/contact" className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full border border-brand-border bg-brand-surface px-8 py-4 font-bold text-brand-textPrimary hover:bg-white hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-md transition-all mb-6">
                  {t("about.cta.c1_btn")} <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-xs text-brand-textSecondary italic leading-relaxed border-t border-brand-border/60 pt-4">
                  {t("about.cta.c1_sub")}
                </p>
              </div>
            </div>

            {/* Card 2 For Talent */}
            <div className="rounded-[2.5rem] border border-brand-primary/20 bg-white shadow-xl p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full group-hover:bg-brand-primary/10 transition-colors pointer-events-none" />
              <div className="relative z-10 w-full mb-10">
                <Code2 className="w-12 h-12 text-brand-primary mb-6" />
                <h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-8">
                  {t("about.cta.c2_title")}
                </h3>
                <div className="space-y-4">
                  <p className="text-brand-textPrimary font-bold text-lg leading-relaxed">
                    {t("about.cta.c2_desc1")}
                  </p>
                  <p className="text-brand-textSecondary text-base leading-relaxed">
                    {t("about.cta.c2_desc2")}
                  </p>
                </div>
              </div>
              <div className="relative z-10 w-full">
                <Link href="/contact" className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 font-bold text-white hover:bg-brand-accentHover transition-all shadow-md hover:shadow-lg hover:-translate-y-1 mb-6">
                  {t("about.cta.c2_btn")} <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-xs text-brand-textSecondary/80 italic leading-relaxed border-t border-brand-primary/10 pt-4">
                  {t("about.cta.c2_sub")}
                </p>
              </div>
            </div>`;

// String slicing
const lines = content.split('\n');
const startIdx = lines.findIndex(l => l.includes('<div className="text-center mb-16">') && lines.indexOf(l) > 320);
const endIdx = lines.findIndex(l => l.includes('{/* SECTION 7: Team & Leadership */}'));

if (startIdx !== -1 && endIdx !== -1) {
  const newLines = [
    ...lines.slice(0, startIdx),
    newImpactCTA,
    ...lines.slice(endIdx)
  ];
  fs.writeFileSync(layoutPath, newLines.join('\n'), 'utf8');
  console.log("Updated about-page-layout.js Impact & CTA UI.");
} else {
  console.log("Could not find boundaries.");
}
