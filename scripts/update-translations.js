const fs = require('fs');

const data = {
  en: {
    "about.manifesto.title": "We write code for the AEC industry, <br className=\"hidden md:block\" /><span className=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400\">not a manual modeling farm.</span>",
    "about.manifesto.subtitle": "We replace repetitive manual clicks, visual clash detection bottlenecks, and redundant data entry with custom Python and C# automation pipelines.",
    "about.manifesto.cta": "Claim Your Free BIM Data Audit",
    "about.manifesto.cta_sub": "(No credit card required. Send your sample model for an instant Python automation assessment)",
    "about.manifesto.trad_title": "The Traditional Bottleneck",
    "about.manifesto.trad_desc": "Traditional AEC firms waste thousands of engineering hours on manual error correction and visual auditing, draining project margins and delaying delivery.",
    "about.manifesto.approach_title": "The pyBIM Approach",
    "about.manifesto.approach_desc": "We believe that if a task is executed twice in Revit, it belongs to an automated script. By combining Senior BIM Engineering with Full-Stack software development, we make complex data interoperability effortless.",
    "about.manifesto.impact_title": "Instant Impact",
    "about.manifesto.impact_desc": "Eliminate human error and accelerate delivery cycles across complex European infrastructure under ISO 19650 and UNI 11337 standards."
  },
  it: {
    "about.manifesto.title": "Scriviamo codice per il settore AEC, <br className=\"hidden md:block\" /><span className=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400\">non siamo una fabbrica di modellazione manuale.</span>",
    "about.manifesto.subtitle": "Sostituiamo clic manuali ripetitivi, colli di bottiglia nel rilevamento visivo delle interferenze e l'inserimento ridondante di dati con pipeline di automazione personalizzate in Python e C#.",
    "about.manifesto.cta": "Richiedi il tuo Audit gratuito sui dati BIM",
    "about.manifesto.cta_sub": "(Nessuna carta di credito richiesta. Invia il tuo modello di esempio per una valutazione immediata dell'automazione in Python)",
    "about.manifesto.trad_title": "Il collo di bottiglia tradizionale",
    "about.manifesto.trad_desc": "Le tradizionali aziende AEC sprecano migliaia di ore di ingegneria nella correzione manuale degli errori e nel controllo visivo, esaurendo i margini del progetto e ritardando la consegna.",
    "about.manifesto.approach_title": "L'approccio pyBIM",
    "about.manifesto.approach_desc": "Crediamo che se un'operazione viene eseguita due volte in Revit, debba essere automatizzata con uno script. Combinando l'ingegneria BIM Senior con lo sviluppo software Full-Stack, rendiamo semplice l'interoperabilità di dati complessi.",
    "about.manifesto.impact_title": "Impatto immediato",
    "about.manifesto.impact_desc": "Elimina l'errore umano e accelera i cicli di consegna nelle infrastrutture complesse europee secondo gli standard ISO 19650 e UNI 11337."
  },
  de: {
    "about.manifesto.title": "Wir schreiben Code für die AEC-Branche, <br className=\"hidden md:block\" /><span className=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400\">wir sind keine manuelle Modellierungsfabrik.</span>",
    "about.manifesto.subtitle": "Wir ersetzen repetitive manuelle Klicks, visuelle Engpässe bei der Kollisionsprüfung und redundante Dateneingaben durch benutzerdefinierte Python- und C#-Automatisierungs-Pipelines.",
    "about.manifesto.cta": "Fordern Sie Ihr kostenloses BIM-Daten-Audit an",
    "about.manifesto.cta_sub": "(Keine Kreditkarte erforderlich. Senden Sie Ihr Beispielmodell für eine sofortige Python-Automatisierungsbewertung)",
    "about.manifesto.trad_title": "Der traditionelle Engpass",
    "about.manifesto.trad_desc": "Traditionelle AEC-Firmen verschwenden Tausende von Ingenieurstunden für die manuelle Fehlerkorrektur und visuelle Prüfung, was die Projektmargen aufzehrt und die Lieferung verzögert.",
    "about.manifesto.approach_title": "Der pyBIM-Ansatz",
    "about.manifesto.approach_desc": "Wir glauben, dass eine Aufgabe, die in Revit zweimal ausgeführt wird, in ein automatisiertes Skript gehört. Durch die Kombination von Senior BIM Engineering mit Full-Stack-Softwareentwicklung machen wir komplexe Dateninteroperabilität mühelos.",
    "about.manifesto.impact_title": "Sofortige Wirkung",
    "about.manifesto.impact_desc": "Beseitigen Sie menschliche Fehler und beschleunigen Sie die Lieferzyklen für komplexe europäische Infrastrukturen gemäß den Standards ISO 19650 und UNI 11337."
  }
};

['en', 'it', 'de'].forEach(lang => {
  const file = `c:/bim/lib/translations/${lang}/about-${lang}.json`;
  let obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  Object.assign(obj, data[lang]);
  fs.writeFileSync(file, JSON.stringify(obj, null, 2), 'utf8');
});
