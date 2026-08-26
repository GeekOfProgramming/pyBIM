const fs = require('fs');
const layoutPath = 'c:/bim/components/pages/about-page-layout.js';
let content = fs.readFileSync(layoutPath, 'utf8');

const ctaBlock = `<div className="flex flex-col items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-brand-primary hover:bg-brand-secondary rounded-full shadow-lg hover:shadow-brand-primary/30 transition-all duration-300 transform hover:-translate-y-1">
              {t("about.manifesto.cta")}
            </Link>
            <p className="text-sm text-brand-textSecondary max-w-md mx-auto">
              {t("about.manifesto.cta_sub")}
            </p>
          </div>`;

content = content.replace(ctaBlock, '');

fs.writeFileSync(layoutPath, content, 'utf8');
console.log("Removed CTA from Manifesto successfully");
