const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  { path: 'c:/bim/app/[locale]/blog/page.js', en: 'Blog & News', it: 'Blog & Ultime Notizie', de: 'Blog & Neuigkeiten' },
  { path: 'c:/bim/app/[locale]/contact/page.js', en: 'Contact Us', it: 'Contatti', de: 'Kontakt' },
  { path: 'c:/bim/app/[locale]/cookie-policy/page.js', en: 'Cookie Policy', it: 'Politica sui cookie', de: 'Cookie-Richtlinie' },
  { path: 'c:/bim/app/[locale]/privacy-policy/page.js', en: 'Privacy Policy', it: 'Informativa sulla privacy', de: 'Datenschutzrichtlinie' },
  { path: 'c:/bim/app/[locale]/projects/page.js', en: 'Projects', it: 'Progetti', de: 'Projekte' },
  { path: 'c:/bim/app/[locale]/services/page.js', en: 'Services', it: 'Servizi', de: 'Dienstleistungen' },
  { path: 'c:/bim/app/[locale]/terms-and-conditions/page.js', en: 'Terms and Conditions', it: 'Termini e Condizioni', de: 'Allgemeine Geschäftsbedingungen' },
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file.path)) {
    let content = fs.readFileSync(file.path, 'utf8');

    const generateMetadata = `export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "${file.en}",
    it: "${file.it}",
    de: "${file.de}"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}`;

    // Replace the static metadata block with the dynamic one
    content = content.replace(/export const metadata = \{[\s\S]*?\};/, generateMetadata);

    fs.writeFileSync(file.path, content, 'utf8');
    console.log("Updated", file.path);
  }
});
