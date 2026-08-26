const fs = require('fs');

// 1. Update about-en.json
const enJsonPath = 'c:/bim/lib/translations/en/about-en.json';
let enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

enData["about.team.sec4.badge"] = "04. TRUSTED BY";
enData["about.team.sec4.title"] = "Executed for Industry Leaders.";
enData["about.team.sec4.desc"] = "Delivering algorithmic BIM solutions, automated QTO, and ISO-compliant databases for top-tier architecture studios and general contractors across the DACH region and Italy.";

fs.writeFileSync(enJsonPath, JSON.stringify(enData, null, 2), 'utf8');


// 2. Update team-data.json
const teamJsonPath = 'c:/bim/lib/data/team-data.json';
let teamData = JSON.parse(fs.readFileSync(teamJsonPath, 'utf8'));

teamData.clients = [];
for (let i = 1; i <= 10; i++) {
  teamData.clients.push({
    id: "client" + i,
    image: "https://images.unsplash.com/photo-" + (1550000000000 + i * 1000) + "?q=80&w=600&auto=format&fit=crop",
    isCompany: true,
    en: { name: "Client Studio " + i, role: "General Contractor / Architecture Firm", bio: "Enterprise client from the DACH region.", skills: [] },
    it: { name: "Client Studio " + i, role: "General Contractor / Architecture Firm", bio: "Cliente enterprise della regione DACH.", skills: [] },
    de: { name: "Client Studio " + i, role: "General Contractor / Architecture Firm", bio: "Enterprise-Kunde aus der DACH-Region.", skills: [] }
  });
}

fs.writeFileSync(teamJsonPath, JSON.stringify(teamData, null, 2), 'utf8');


// 3. Update team-partners-section.js
const sectionPath = 'c:/bim/components/sections/team-partners-section.js';
let content = fs.readFileSync(sectionPath, 'utf8');

// Find the CTA block
const ctaBlock = `            <div className="mt-16 text-center max-w-3xl mx-auto">
              <a href="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-brand-primary hover:bg-brand-secondary rounded-full shadow-lg hover:shadow-brand-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                {t("about.team.sec3.cta_btn")}
              </a>
              <p className="text-sm text-brand-textSecondary mt-6 italic bg-brand-surface p-4 rounded-xl border border-brand-border/60">
                {t("about.team.sec3.cta_sub")}
              </p>
            </div>`;

// Remove it from where it is now (end of sec 3)
content = content.replace(ctaBlock, '');

// Add clients to the destructuring
content = content.replace(
  `const corporatePartners = teamData?.corporatePartners || [];`,
  `const corporatePartners = teamData?.corporatePartners || [];\n  const clients = teamData?.clients || [];`
);

// We need an icon for section 4, let's use Star or Briefcase. Let's import Briefcase or BadgeCheck if available. 
// I'll import ShieldCheck from lucide-react.
content = content.replace(
  `import { Users, Handshake, Building2 } from "lucide-react";`,
  `import { Users, Handshake, Building2, ShieldCheck } from "lucide-react";`
);

const sec4Content = `
      {/* 4. TRUSTED BY (Clients) */}
      {clients.length > 0 && (
        <section className="bg-brand-base w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
                <ShieldCheck className="w-4 h-4" /> {t("about.team.sec4.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-6">
                {t("about.team.sec4.title")}
              </h2>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-2xl mx-auto mb-10" dangerouslySetInnerHTML={{ __html: t("about.team.sec4.desc") }} />
            </div>

            <Carousel itemsPerViewDesktop={4}>
              {clients.map((client, idx) => (
                <div key={\`\${client.id}-\${idx}\`} className="animate-in fade-in zoom-in duration-500 h-full">
                  <TeamPartnerCard person={client} onClick={openModal} />
                </div>
              ))}
            </Carousel>
            
${ctaBlock}
          </div>
        </section>
      )}
`;

// Insert sec4Content before the closing modal code
content = content.replace(
  `      {/* MODAL */}`,
  sec4Content + `\n      {/* MODAL */}`
);

fs.writeFileSync(sectionPath, content, 'utf8');
console.log('Updated all files for Section 4: Trusted By');
