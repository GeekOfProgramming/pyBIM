const fs = require('fs');
const sectionPath = 'c:/bim/components/sections/team-partners-section.js';
let content = fs.readFileSync(sectionPath, 'utf8');

// 1. Add "The Extended Network" text to Section 2
const oldSec2Content = `<p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed">
                  <strong className="text-brand-textPrimary text-brand-primary">{t("about.team.sec2.s_title")}:</strong> {t("about.team.sec2.s_desc")}
                </p>
              </div>
            </div>`;

const newSec2Content = `<p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: \`<strong class="text-brand-textPrimary text-brand-primary">\${t("about.team.sec2.s_title")}:</strong> \${t("about.team.sec2.s_desc")}\` }} />
              </div>
              <p className="text-brand-textPrimary text-base md:text-lg font-medium bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/20" dangerouslySetInnerHTML={{ __html: t("about.team.sec2.network") }} />
            </div>`;

content = content.replace(oldSec2Content, newSec2Content);

// 2. Fix dangerous html for other paragraphs in section 2 just in case
content = content.replace(
  `<p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed">
                  <strong className="text-brand-textPrimary">{t("about.team.sec2.b_title")}:</strong> {t("about.team.sec2.b_desc")}
                </p>`,
  `<p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: \`<strong class="text-brand-textPrimary">\${t("about.team.sec2.b_title")}:</strong> \${t("about.team.sec2.b_desc")}\` }} />`
);

content = content.replace(
  `<p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed">
                  <strong className="text-brand-textPrimary">{t("about.team.sec2.a_title")}:</strong> {t("about.team.sec2.a_desc")}
                </p>`,
  `<p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: \`<strong class="text-brand-textPrimary">\${t("about.team.sec2.a_title")}:</strong> \${t("about.team.sec2.a_desc")}\` }} />`
);


// 3. Add CTA to Section 3
const oldSec3End = `</Carousel>
          </div>
        </section>`;

const newSec3End = `</Carousel>

            <div className="mt-16 text-center max-w-3xl mx-auto">
              <a href="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-brand-primary hover:bg-brand-secondary rounded-full shadow-lg hover:shadow-brand-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                {t("about.team.sec3.cta_btn")}
              </a>
              <p className="text-sm text-brand-textSecondary mt-6 italic bg-brand-surface p-4 rounded-xl border border-brand-border/60">
                {t("about.team.sec3.cta_sub")}
              </p>
            </div>
          </div>
        </section>`;

content = content.replace(oldSec3End, newSec3End);

fs.writeFileSync(sectionPath, content, 'utf8');
console.log('Updated team-partners-section.js UI');
