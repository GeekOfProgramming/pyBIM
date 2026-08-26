const fs = require('fs');
const layoutPath = 'c:/bim/components/pages/about-page-layout.js';
let content = fs.readFileSync(layoutPath, 'utf8');

// 1. Remove the Manifesto CTA
const manifestoCtaStart = `          <div className="flex flex-col items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-brand-primary hover:bg-brand-secondary rounded-full shadow-lg hover:shadow-brand-primary/30 transition-all duration-300 transform hover:-translate-y-1">
              {t("about.manifesto.cta")}
            </Link>
            <p className="text-sm text-brand-textSecondary max-w-md mx-auto">
              {t("about.manifesto.cta_sub")}
            </p>
          </div>`;
content = content.replace(manifestoCtaStart, '');

// 2. Remove the Tech Stack CTA
const techStackCtaStart = `          <div className="mt-16 text-center max-w-3xl mx-auto">
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-brand-primary hover:bg-brand-secondary rounded-full shadow-lg hover:shadow-brand-primary/30 transition-all duration-300 transform hover:-translate-y-1">
              {t("about.tech.cta")}
            </Link>
            <p className="text-sm text-brand-textSecondary mt-6 italic bg-brand-surface p-4 rounded-xl border border-brand-border/60">
              {t("about.tech.cta_sub")}
            </p>
          </div>`;
content = content.replace(techStackCtaStart, '');

fs.writeFileSync(layoutPath, content, 'utf8');
console.log("Removed both CTAs successfully.");
