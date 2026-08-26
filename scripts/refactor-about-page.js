const fs = require('fs');
const path = 'c:/bim/components/pages/about-page-layout.js';
let content = fs.readFileSync(path, 'utf8');

// Phase 1
content = content.replace(
  '<div className="text-sm font-mono font-bold text-brand-primary mb-2">Phase 1</div>',
  '<div className="text-sm font-mono font-bold text-brand-primary mb-2">{t("about.journey.badge")}</div>'
);
content = content.replace(
  '<h3 className="text-2xl font-bold text-brand-textPrimary mb-4">The Operational Bottleneck</h3>',
  '<h3 className="text-2xl font-bold text-brand-textPrimary mb-4">{t("about.journey.p1_title")}</h3>'
);
content = content.replace(
  '<p className="text-brand-textSecondary leading-relaxed text-lg font-medium">\n                  Managing complex BIM projects exposed a systemic industry flaw: highly skilled engineers waste up to 40% of their billable hours on repetitive data entry, parameter mapping, and manual quality control.\n                </p>',
  '<p className="text-brand-textSecondary leading-relaxed text-lg font-medium">{t("about.journey.p1_desc")}</p>'
);

// Phase 2
content = content.replace(
  '<div className="text-sm font-mono font-bold text-brand-primary mb-2">Phase 2</div>',
  '<div className="text-sm font-mono font-bold text-brand-primary mb-2">{t("about.journey.p2_badge")}</div>'
);
content = content.replace(
  '<h3 className="text-2xl font-bold text-brand-textPrimary mb-4">The Algorithmic Shift</h3>',
  '<h3 className="text-2xl font-bold text-brand-textPrimary mb-4">{t("about.journey.p2_title")}</h3>'
);
content = content.replace(
  '<p className="text-brand-textSecondary leading-relaxed text-lg font-medium">\n                  Instead of scaling through headcount, we transitioned to code. By integrating Python, C#, and Revit APIs into our core workflow, we replaced manual drafting with programmatic execution, reducing processing time from days to seconds.\n                </p>',
  '<p className="text-brand-textSecondary leading-relaxed text-lg font-medium">{t("about.journey.p2_desc")}</p>'
);

// Phase 3
content = content.replace(
  '<div className="text-sm font-mono font-bold text-brand-primary mb-2">Phase 3</div>',
  '<div className="text-sm font-mono font-bold text-brand-primary mb-2">{t("about.journey.p3_badge")}</div>'
);
content = content.replace(
  '<h3 className="text-2xl font-bold text-brand-textPrimary mb-4">The Hybrid B2B Agency</h3>',
  '<h3 className="text-2xl font-bold text-brand-textPrimary mb-4">{t("about.journey.p3_title")}</h3>'
);
content = content.replace(
  '<p className="text-brand-textSecondary leading-relaxed text-lg font-medium">\n                  Today, pyBIM operates as a silent technical partner for AEC firms. We deliver zero-error BIM coordination and develop the custom software infrastructure required to scale your project capacity without increasing overhead.\n                </p>',
  '<p className="text-brand-textSecondary leading-relaxed text-lg font-medium">{t("about.journey.p3_desc")}</p>'
);

// Tech Stack Header
content = content.replace(
  '<Code2 className="w-4 h-4" /> TECH STACK & STANDARDS',
  '<Code2 className="w-4 h-4" /> {t("about.tech.badge")}'
);
content = content.replace(
  '<h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">\n              The tools & standards we use to engineer the process.\n            </h2>',
  '<h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">\n              {t("about.tech.title")}\n            </h2>'
);
content = content.replace(
  '<p className="text-brand-textSecondary text-base md:text-lg font-medium">\n              Eliminating manual bottlenecks through programmatic execution, CDE hosting, and strict ISO compliance.\n            </p>',
  '<p className="text-brand-textSecondary text-base md:text-lg font-medium">\n              {t("about.tech.desc")}\n            </p>'
);

// Box 1 Array Replacement
content = content.replace(
  '<span className="text-[10px] font-mono font-bold text-brand-textSecondary uppercase tracking-widest block">01. SOFTWARE & COORDINATION</span>',
  '<span className="text-[10px] font-mono font-bold text-brand-textSecondary uppercase tracking-widest block">{t("about.tech.box1_top")}</span>'
);
content = content.replace(
  '<span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-surface border border-brand-border text-brand-textSecondary">13 Tools</span>',
  '<span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-surface border border-brand-border text-brand-textSecondary">{t("about.tech.box1_top_right")}</span>'
);
content = content.replace(
  '<Cog className="w-5 h-5 text-brand-primary" /> Engineering Tools',
  '<Cog className="w-5 h-5 text-brand-primary" /> {t("about.tech.box1_title")}'
);
content = content.replace(
  '<p className="text-xs text-brand-primary font-mono italic">ISO-compliant authoring and clash resolution.</p>',
  '<p className="text-xs text-brand-primary font-mono italic">{t("about.tech.box1_sub")}</p>'
);

let toolsRegex = /\{\[\s*\{ name: "Autodesk Revit"[\s\S]*?\]\.map/m;
content = content.replace(toolsRegex, '{(t("about.tech.tools") || []).map');

// Box 2 Array Replacement
content = content.replace(
  '<span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest block">02. CODE & AUTOMATION</span>',
  '<span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest block">{t("about.tech.box2_top")}</span>'
);
content = content.replace(
  '<span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">12 Techs</span>',
  '<span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">{t("about.tech.box2_top_right")}</span>'
);
content = content.replace(
  '<Terminal className="w-5 h-5 text-brand-primary" /> Development Stack',
  '<Terminal className="w-5 h-5 text-brand-primary" /> {t("about.tech.box2_title")}'
);
content = content.replace(
  '<p className="text-xs text-brand-primary font-mono italic">Programmatic control over manual workflows.</p>',
  '<p className="text-xs text-brand-primary font-mono italic">{t("about.tech.box2_sub")}</p>'
);

let devRegex = /\{\[\s*\{ name: "Python"[\s\S]*?\]\.map/m;
content = content.replace(devRegex, '{(t("about.tech.dev") || []).map');

// Box 3 Array Replacement
content = content.replace(
  '<span className="text-[10px] font-mono font-bold text-brand-textSecondary uppercase tracking-widest block">03. MANDATES & OPENBIM</span>',
  '<span className="text-[10px] font-mono font-bold text-brand-textSecondary uppercase tracking-widest block">{t("about.tech.box3_top")}</span>'
);
content = content.replace(
  '<span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-surface border border-brand-border text-brand-textSecondary">12 Standards</span>',
  '<span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-surface border border-brand-border text-brand-textSecondary">{t("about.tech.box3_top_right")}</span>'
);
content = content.replace(
  '<Code2 className="w-5 h-5 text-brand-primary" /> Standards & Protocols',
  '<Code2 className="w-5 h-5 text-brand-primary" /> {t("about.tech.box3_title")}'
);
content = content.replace(
  '<p className="text-xs text-brand-primary font-mono italic">Strict compliance with EU & UK mandates.</p>',
  '<p className="text-xs text-brand-primary font-mono italic">{t("about.tech.box3_sub")}</p>'
);

let stdsRegex = /\{\[\s*\{ name: "ISO 19650"[\s\S]*?\]\.map/m;
content = content.replace(stdsRegex, '{(t("about.tech.stds") || []).map');

// Impact Section
content = content.replace(
  '<Shield className="w-4 h-4" /> OUR IMPACT',
  '<Shield className="w-4 h-4" /> {t("about.impact.badge")}'
);
content = content.replace(
  '<h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">\n              Measurable Efficiency & Zero-Error Results\n            </h2>',
  '<h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">\n              {t("about.impact.title")}\n            </h2>'
);

content = content.replace(
  '                +10,000\r\n              </div>\r\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto">\r\n                Hours saved through custom automation',
  '                {t("about.impact.stat1.val")}\r\n              </div>\r\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat1.desc") }}>'
);
content = content.replace(
  '                100%\r\n              </div>\r\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto">\r\n                Algorithmic precision <br />(Zero human error)',
  '                {t("about.impact.stat2.val")}\r\n              </div>\r\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat2.desc") }}>'
);
content = content.replace(
  '                +50\r\n              </div>\r\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto">\r\n                Custom scripts and plugins deployed',
  '                {t("about.impact.stat3.val")}\r\n              </div>\r\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat3.desc") }}>'
);

// For macOS/Linux line endings, fallbacks
content = content.replace(
  '                +10,000\n              </div>\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto">\n                Hours saved through custom automation',
  '                {t("about.impact.stat1.val")}\n              </div>\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat1.desc") }}>'
);
content = content.replace(
  '                100%\n              </div>\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto">\n                Algorithmic precision <br />(Zero human error)',
  '                {t("about.impact.stat2.val")}\n              </div>\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat2.desc") }}>'
);
content = content.replace(
  '                +50\n              </div>\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto">\n                Custom scripts and plugins deployed',
  '                {t("about.impact.stat3.val")}\n              </div>\n              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat3.desc") }}>'
);
// Make sure closing tags for those divs are removed if they existed previously... wait, my string replace leaves `</div>` properly handled because I am omitting `</div>` from the match for desc. Wait, I matched up to the inner text. Let me fix the replace:

content = content.replace(
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat1.desc") }}>\r\n              </div>',
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat1.desc") }} />'
);
content = content.replace(
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat2.desc") }}>\r\n              </div>',
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat2.desc") }} />'
);
content = content.replace(
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat3.desc") }}>\r\n              </div>',
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat3.desc") }} />'
);

content = content.replace(
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat1.desc") }}>\n              </div>',
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat1.desc") }} />'
);
content = content.replace(
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat2.desc") }}>\n              </div>',
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat2.desc") }} />'
);
content = content.replace(
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat3.desc") }}>\n              </div>',
  '<div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat3.desc") }} />'
);


// CTA Section
content = content.replace(
  '<h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-12">\n                  Are your company\'s BIM workflows slowing you down? Let\'s optimize them.\n                </h3>',
  '<h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-12">\n                  {t("about.cta.card1.title")}\n                </h3>'
);
content = content.replace(
  'Contact Us <ArrowRight className="w-5 h-5" />',
  '{t("about.cta.card1.btn")} <ArrowRight className="w-5 h-5" />'
);

content = content.replace(
  '<h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-12">\n                  Are you an engineer who fell in love with Python? You belong here.\n                </h3>',
  '<h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-12">\n                  {t("about.cta.card2.title")}\n                </h3>'
);
content = content.replace(
  'Work With Us <ArrowRight className="w-5 h-5" />',
  '{t("about.cta.card2.btn")} <ArrowRight className="w-5 h-5" />'
);

fs.writeFileSync(path, content, 'utf8');
console.log("Replaced text with translation keys.");
