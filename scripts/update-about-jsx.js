const fs = require('fs');

const path = 'c:/bim/components/pages/about-page-layout.js';
let content = fs.readFileSync(path, 'utf8');

// Add import
if (!content.includes('useLanguage')) {
  content = content.replace(
    'import TeamPartnersSection',
    'import { useLanguage } from "@/lib/LanguageContext";\nimport TeamPartnersSection'
  );
}

// Add hook
if (!content.includes('const { t } = useLanguage();')) {
  content = content.replace(
    'export default function AboutPageLayout({ teamData }) {\n',
    'export default function AboutPageLayout({ teamData }) {\n  const { t } = useLanguage();\n'
  );
}

// Replace Manifesto JSX
content = content.replace(
  /<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-textPrimary tracking-tight mb-8 leading-tight max-w-5xl mx-auto">[\s\S]*?<\/h1>/,
  `<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-textPrimary tracking-tight mb-8 leading-tight max-w-5xl mx-auto" dangerouslySetInnerHTML={{ __html: t("about.manifesto.title") }} />`
);

content = content.replace(
  /<h2 className="text-lg md:text-xl text-brand-textSecondary leading-relaxed max-w-3xl mx-auto font-medium mb-12">[\s\S]*?<\/h2>/,
  `<h2 className="text-lg md:text-xl text-brand-textSecondary leading-relaxed max-w-3xl mx-auto font-medium mb-12">{t("about.manifesto.subtitle")}</h2>`
);

content = content.replace(
  /Claim Your Free BIM Data Audit/,
  `{t("about.manifesto.cta")}`
);

content = content.replace(
  /\(No credit card required\. Send your sample model for an instant Python automation assessment\)/,
  `{t("about.manifesto.cta_sub")}`
);

// Traditional Bottleneck
content = content.replace(
  /<h3 className="text-xl font-bold text-brand-textPrimary">The Traditional Bottleneck<\/h3>/,
  `<h3 className="text-xl font-bold text-brand-textPrimary">{t("about.manifesto.trad_title")}</h3>`
);
content = content.replace(
  /<p className="text-brand-textSecondary text-base leading-relaxed font-medium">\s*Traditional AEC firms waste thousands of engineering hours on manual error correction and visual auditing, draining project margins and delaying delivery\.\s*<\/p>/,
  `<p className="text-brand-textSecondary text-base leading-relaxed font-medium">{t("about.manifesto.trad_desc")}</p>`
);

// The pyBIM Approach
content = content.replace(
  /<h3 className="text-xl font-bold text-brand-textPrimary">The pyBIM Approach<\/h3>/,
  `<h3 className="text-xl font-bold text-brand-textPrimary">{t("about.manifesto.approach_title")}</h3>`
);
content = content.replace(
  /<p className="text-brand-textSecondary text-base leading-relaxed font-medium">\s*We believe that if a task is executed twice in Revit, it belongs to an automated script\. By combining Senior BIM Engineering with Full-Stack software development, we make complex data interoperability effortless\.\s*<\/p>/,
  `<p className="text-brand-textSecondary text-base leading-relaxed font-medium">{t("about.manifesto.approach_desc")}</p>`
);

// Instant Impact
content = content.replace(
  /<h3 className="text-xl font-bold text-brand-textPrimary">Instant Impact<\/h3>/,
  `<h3 className="text-xl font-bold text-brand-textPrimary">{t("about.manifesto.impact_title")}</h3>`
);
content = content.replace(
  /<p className="text-brand-textSecondary text-base leading-relaxed font-medium">\s*Eliminate human error and accelerate delivery cycles across complex European infrastructure under ISO 19650 and UNI 11337 standards\.\s*<\/p>/,
  `<p className="text-brand-textSecondary text-base leading-relaxed font-medium">{t("about.manifesto.impact_desc")}</p>`
);


fs.writeFileSync(path, content, 'utf8');
console.log('JSX updated.');
