const fs = require('fs');
const path = 'c:/bim/components/pages/about-page-layout.js';
let content = fs.readFileSync(path, 'utf8');

// Change grid columns
content = content.replace(
  '<div className="grid gap-8 lg:grid-cols-3">',
  '<div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">'
);

// Replace subtitle with dangerouslySetInnerHTML
content = content.replace(
  '<h2 className="text-lg md:text-xl text-brand-textSecondary leading-relaxed max-w-3xl mx-auto font-medium mb-12">{t("about.manifesto.subtitle")}</h2>',
  '<h2 className="text-lg md:text-xl text-brand-textSecondary leading-relaxed max-w-3xl mx-auto font-medium mb-12" dangerouslySetInnerHTML={{ __html: t("about.manifesto.subtitle") }} />'
);

// Replace descriptions with dangerouslySetInnerHTML
content = content.replace(
  '<p className="text-brand-textSecondary text-base leading-relaxed font-medium">{t("about.manifesto.trad_desc")}</p>',
  '<p className="text-brand-textSecondary text-base leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("about.manifesto.trad_desc") }} />'
);

content = content.replace(
  '<p className="text-brand-textSecondary text-base leading-relaxed font-medium">{t("about.manifesto.approach_desc")}</p>',
  '<p className="text-brand-textSecondary text-base leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("about.manifesto.approach_desc") }} />'
);

// Remove the third box
const impactStart = content.indexOf('{/* Instant Impact */}');
const impactEnd = content.indexOf('</div>\r\n        </div>\r\n      </section>\r\n\r\n      {/* SECTION 3');

if (impactStart > -1 && impactEnd > -1) {
  content = content.substring(0, impactStart) + content.substring(impactEnd);
} else {
  console.log("Could not find Instant Impact block");
  // Try alternative line endings
  const impactEndAlt = content.indexOf('</div>\n        </div>\n      </section>\n\n      {/* SECTION 3');
  if (impactStart > -1 && impactEndAlt > -1) {
    content = content.substring(0, impactStart) + content.substring(impactEndAlt);
  }
}

fs.writeFileSync(path, content, 'utf8');
console.log("Updated about-page-layout.js");
