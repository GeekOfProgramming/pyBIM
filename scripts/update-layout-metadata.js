const fs = require('fs');

const path = 'c:/bim/app/[locale]/layout.js';
let content = fs.readFileSync(path, 'utf8');

const newMetadata = `export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const currentUrl = \`\${siteUrl}/\${locale}\`;

  const titles = {
    en: "pyBIM | Advanced BIM & Software Development Lab",
    it: "pyBIM | Laboratorio Avanzato BIM & Sviluppo Software",
    de: "pyBIM | Erweitertes BIM & Softwareentwicklungs-Labor"
  };

  const descriptions = {
    en: "pyBIM is a software development lab for the AEC industry. We engineer custom Revit API C# plugins, Python data pipelines, and ISO 19650 compliant BIM workflows.",
    it: "pyBIM è un laboratorio di sviluppo software per il settore AEC. Sviluppiamo plugin personalizzati Revit API in C#, pipeline di dati in Python e flussi di lavoro BIM conformi allo standard ISO 19650.",
    de: "pyBIM ist ein Softwareentwicklungs-Labor für die AEC-Branche. Wir entwickeln maßgeschneiderte Revit API C#-Plugins, Python-Daten-Pipelines und ISO 19650-konforme BIM-Workflows."
  };

  const ogDescriptions = {
    en: "Automating the AEC industry with Python, Revit API C#, and OpenBIM workflows.",
    it: "Automazione nel settore AEC con flussi di lavoro Python, Revit API C# e OpenBIM.",
    de: "Automatisierung der AEC-Branche mit Python, Revit API C# und OpenBIM-Workflows."
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: titles[locale] || titles.en,
      template: "%s | pyBIM"
    },
    description: descriptions[locale] || descriptions.en,
    applicationName: "pyBIM",
    category: "BIM & Software Engineering",
    alternates: {
      canonical: currentUrl,
      languages: {
        "en-US": \`\${siteUrl}/en\`,
        "it-IT": \`\${siteUrl}/it\`,
        "de-DE": \`\${siteUrl}/de\`,
        "x-default": \`\${siteUrl}/en\`
      }
    },
    keywords: [
      "BIM Automation",
      "pyRevit scripting",
      "Dynamo automation",
      "Revit API C#",
      "Python for Architecture",
      "AEC Software Development",
      "BIM Management Europe",
      "ISO 19650 Compliance",
      "UNI 11337 Standard",
      "COBie Asset Handover"
    ],
    openGraph: {
      title: titles[locale] || titles.en,
      description: ogDescriptions[locale] || ogDescriptions.en,
      url: currentUrl,
      siteName: "pyBIM",
      locale: locale === "it" ? "it_IT" : locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "pyBIM - Advanced BIM & Software Development Lab"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: ogDescriptions[locale] || ogDescriptions.en,
      images: ["/og-image.jpg"]
    },
    icons: {
      icon: [
        { url: "/logo_black_transparent.png", media: "(prefers-color-scheme: light)" },
        { url: "/logo_white_transparent.png", media: "(prefers-color-scheme: dark)" }
      ]
    }
  };
}`;

content = content.replace(/export async function generateMetadata\(\{ params \}\) \{[\s\S]*?\n\}/, newMetadata);
fs.writeFileSync(path, content, 'utf8');
console.log('Layout metadata updated.');
