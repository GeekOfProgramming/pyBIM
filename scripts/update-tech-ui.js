const fs = require('fs');
const layoutPath = 'c:/bim/components/pages/about-page-layout.js';
let content = fs.readFileSync(layoutPath, 'utf8');

const newTechSection = `            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
              {t("about.tech.title")}
            </h2>
            <div className="text-left space-y-4">
              <p className="text-brand-textSecondary text-base md:text-lg font-medium">
                <strong className="text-brand-textPrimary">{t("about.tech.p1_title")}:</strong> {t("about.tech.p1_desc")}
              </p>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium">
                <strong className="text-brand-textPrimary">{t("about.tech.p2_title")}:</strong> {t("about.tech.p2_desc")}
              </p>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium">
                <strong className="text-brand-textPrimary">{t("about.tech.p3_title")}:</strong> <span dangerouslySetInnerHTML={{ __html: t("about.tech.p3_desc") }} />
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            {/* 1. ENGINEERING TOOLS */}
            <div className="rounded-3xl bg-white border border-brand-border shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="border-b border-brand-border pb-6 mb-6">
                  <h3 className="text-xl font-bold text-brand-textPrimary mb-2 flex items-center gap-2">
                    <Cog className="w-5 h-5 text-brand-primary" /> {t("about.tech.box1_title")}
                  </h3>
                  <p className="text-sm text-brand-textSecondary font-medium">{t("about.tech.box1_sub")}</p>
                </div>

                <div className="space-y-4 mb-6">
                  {(t("about.tech.box1_items") || []).map((item, idx) => (
                    <div key={idx} className="bg-brand-surface/60 rounded-xl p-4 border border-brand-border/60 hover:bg-white hover:border-brand-primary/30 transition-colors">
                      <strong className="text-sm text-brand-textPrimary block mb-1">{item.name}</strong>
                      <span className="text-xs text-brand-textSecondary leading-relaxed block" dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-brand-textSecondary/70 italic mt-4 pt-4 border-t border-brand-border/50">
                {t("about.tech.box1_footer")}
              </div>
            </div>

            {/* 2. DEVELOPMENT STACK */}
            <div className="rounded-3xl bg-white border-2 border-brand-primary/40 shadow-[0_0_40px_-10px_rgba(37,99,235,0.15)] p-8 flex flex-col justify-between relative group hover:border-brand-primary/60 transition-all z-10 lg:-translate-y-4">
              <div className="absolute inset-0 bg-brand-primary/[0.02] rounded-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="border-b border-brand-primary/20 pb-6 mb-6">
                  <h3 className="text-xl font-bold text-brand-primary mb-2 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-brand-primary" /> {t("about.tech.box2_title")}
                  </h3>
                  <p className="text-sm text-brand-textSecondary font-medium">{t("about.tech.box2_sub")}</p>
                </div>

                <div className="space-y-4 mb-6">
                  {(t("about.tech.box2_items") || []).map((item, idx) => (
                    <div key={idx} className="bg-brand-primary/5 rounded-xl p-4 border border-brand-primary/15 hover:bg-white hover:border-brand-primary/40 transition-colors">
                      <strong className="text-sm text-brand-textPrimary block mb-1">{item.name}</strong>
                      <span className="text-xs text-brand-textSecondary leading-relaxed block" dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative z-10 text-xs text-brand-textSecondary/70 italic mt-4 pt-4 border-t border-brand-primary/20">
                {t("about.tech.box2_footer")}
              </div>
            </div>

            {/* 3. STANDARDS & PROTOCOLS */}
            <div className="rounded-3xl bg-white border border-brand-border shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="border-b border-brand-border pb-6 mb-6">
                  <h3 className="text-xl font-bold text-brand-textPrimary mb-2 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-brand-primary" /> {t("about.tech.box3_title")}
                  </h3>
                  <p className="text-sm text-brand-textSecondary font-medium">{t("about.tech.box3_sub")}</p>
                </div>

                <div className="space-y-4 mb-6">
                  {(t("about.tech.box3_items") || []).map((item, idx) => (
                    <div key={idx} className="bg-brand-surface/60 rounded-xl p-4 border border-brand-border/60 hover:bg-white hover:border-brand-primary/30 transition-colors">
                      <strong className="text-sm text-brand-textPrimary block mb-1">{item.name}</strong>
                      <span className="text-xs text-brand-textSecondary leading-relaxed block" dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-brand-textSecondary/70 italic mt-4 pt-4 border-t border-brand-border/50">
                {t("about.tech.box3_footer")}
              </div>
            </div>

          </div>
        </div>
      </section>`;

// Replace from line 221 to the end of section
const startStr = `<h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">`;
const endStr = `</section>`;

const startIdx = content.indexOf(startStr);
const sectionStartIdx = content.lastIndexOf('<section id="tech-stack"', startIdx);
const nextSectionIdx = content.indexOf('<section id="impact"', startIdx);
const endIdx = content.lastIndexOf(endStr, nextSectionIdx) + endStr.length;

if (startIdx !== -1 && nextSectionIdx !== -1) {
  content = content.substring(0, startIdx) + newTechSection + '\n' + content.substring(endIdx);
  fs.writeFileSync(layoutPath, content, 'utf8');
  console.log("Updated about-page-layout.js Tech Stack UI without CTA.");
} else {
  console.log("Could not find boundaries string matching.");
}
