const fs = require('fs');
const path = require('path');

// 1. Team Data
const teamDataPath = 'c:/bim/lib/data/team-data.json';
const newTeamData = {
  teamMembers: [
    {
      id: "t1",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      it: { name: "Alessandro Rossi", role: "BIM Manager", bio: "Esperto in automazione BIM e standard ISO 19650.", skills: [{name:"Revit API", value:95}] },
      en: { name: "Alessandro Rossi", role: "BIM Manager", bio: "Expert in BIM automation and ISO 19650 standards.", skills: [{name:"Revit API", value:95}] },
      de: { name: "Alessandro Rossi", role: "BIM Manager", bio: "Experte für BIM-Automatisierung und ISO 19650-Standards.", skills: [{name:"Revit API", value:95}] }
    }
  ],
  partnersIndividual: [],
  partnersCorporate: []
};
fs.writeFileSync(teamDataPath, JSON.stringify(newTeamData, null, 2));
console.log('Updated team-data.json');

// 2. Projects Data
const projectsDataPath = 'c:/bim/lib/data/projects-data.json';
const newProjectsData = [
  {
    id: "p1",
    category: "automation",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com",
    title: { it: "Automazione Clash Detection", en: "Automated Clash Detection", de: "Automatisierte Kollisionsprüfung" },
    desc: { it: "Script Python per Navisworks.", en: "Python script for Navisworks.", de: "Python-Skript für Navisworks." },
    tags: ["Python", "Navisworks"]
  }
];
fs.writeFileSync(projectsDataPath, JSON.stringify(newProjectsData, null, 2));
console.log('Updated projects-data.json');

// 3. Blog Data
const blogDataPath = 'c:/bim/lib/data/blog-data.json';
const newBlogData = [
  {
    id: "b1",
    slug: "revit-api-python",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
    date: "2024-01-15",
    readTime: "5 min",
    author: "Alessandro Rossi",
    category: { it: "Automazione BIM", en: "BIM Automation", de: "BIM-Automatisierung" },
    title: { it: "Guida alla Revit API", en: "Revit API Guide", de: "Revit API Leitfaden" },
    excerpt: { it: "Come automatizzare...", en: "How to automate...", de: "Wie man automatisiert..." },
    content: { it: "<p>Contenuto...</p>", en: "<p>Content...</p>", de: "<p>Inhalt...</p>" },
    tags: ["Revit", "Python"]
  }
];
fs.writeFileSync(blogDataPath, JSON.stringify(newBlogData, null, 2));
console.log('Updated blog-data.json');

// 4. Dummy Jobs
const dummyJobsPath = 'c:/bim/lib/dummy-jobs.js';
const newDummyJobs = `export const DUMMY_JOBS = [
  {
    id: "bim-developer-senior",
    type: "full-time",
    titleIt: "Sviluppatore BIM Senior",
    titleEn: "Senior BIM Developer",
    titleDe: "Senior BIM-Entwickler",
    descriptionIt: "Siamo alla ricerca di uno sviluppatore esperto per plugin Revit (C#/Python).",
    descriptionEn: "We are looking for an experienced developer for Revit plugins (C#/Python).",
    descriptionDe: "Wir suchen einen erfahrenen Entwickler für Revit-Plugins (C#/Python)."
  }
];`;
fs.writeFileSync(dummyJobsPath, newDummyJobs);
console.log('Updated dummy-jobs.js');

// 5. Site Copy
const siteCopyPath = 'c:/bim/lib/site-copy.js';
const newSiteCopy = `export const SEODescriptions = {
  it: {
    homeText: "pyBIM: Agenzia B2B per l'automazione BIM in Italia e DACH.",
    trustText: "Il sito presenta pyBIM come un'azienda leader nell'automazione BIM.",
    aboutText: "pyBIM si presenta come partner specializzato in C# e Python per AEC.",
    servicesIntro: "Da plugin custom a coordinamento BIM zero-errori.",
    contactHeroTitle: "Parla con il nostro team di sviluppo BIM"
  },
  en: {
    homeText: "pyBIM: B2B Agency for BIM automation in Italy and DACH.",
    trustText: "The site presents pyBIM as a leading BIM automation company.",
    aboutText: "pyBIM presents itself as a specialized partner in C# and Python for AEC.",
    servicesIntro: "From custom plugins to zero-error BIM coordination.",
    contactHeroTitle: "Talk to our BIM development team"
  },
  de: {
    homeText: "pyBIM: B2B-Agentur für BIM-Automatisierung in Italien und DACH.",
    trustText: "Die Seite präsentiert pyBIM als führendes BIM-Automatisierungsunternehmen.",
    aboutText: "pyBIM präsentiert sich als spezialisierter Partner für C# und Python in AEC.",
    servicesIntro: "Von maßgeschneiderten Plugins bis zur fehlerfreien BIM-Koordination.",
    contactHeroTitle: "Sprechen Sie mit unserem BIM-Entwicklungsteam"
  }
};`;
fs.writeFileSync(siteCopyPath, newSiteCopy);
console.log('Updated site-copy.js');
