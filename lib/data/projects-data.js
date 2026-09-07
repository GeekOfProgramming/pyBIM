const dummyContent = {
  en: "This is a placeholder text for the project details. The actual content will be provided later. We will include detailed descriptions, steps, and all necessary information to help you understand this project.",
  it: "Questo è un testo segnaposto per i dettagli del progetto. Il contenuto effettivo verrà fornito in seguito. Includeremo descrizioni dettagliate, passaggi e tutte le informazioni necessarie per aiutarti a comprendere questo progetto.",
  de: "Dies ist ein Platzhaltertext für die Projektdetails. Der eigentliche Inhalt wird später bereitgestellt. Wir werden detaillierte Beschreibungen, Schritte und alle notwendigen Informationen hinzufügen, damit Sie dieses Projekt verstehen können."
};

export const allProjects = [
  {
    slug: "project-alpha",
    title: {
      en: "Project Alpha",
      it: "Progetto Alpha",
      de: "Projekt Alpha"
    },
    description: {
      en: "A comprehensive BIM implementation for a commercial complex.",
      it: "Un'implementazione BIM completa per un complesso commerciale.",
      de: "Eine umfassende BIM-Implementierung für einen Gewerbekomplex."
    },
    category: {
      en: "Commercial",
      it: "Commerciale",
      de: "Gewerbebau"
    },
    date: {
      en: "2023-01-15",
      it: "2023-01-15",
      de: "2023-01-15"
    },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "project-beta",
    title: {
      en: "Project Beta",
      it: "Progetto Beta",
      de: "Projekt Beta"
    },
    description: {
      en: "Infrastructure planning and clash detection for a subway extension.",
      it: "Pianificazione delle infrastrutture e rilevamento interferenze per l'estensione di una metropolitana.",
      de: "Infrastrukturplanung und Kollisionsprüfung für eine U-Bahn-Erweiterung."
    },
    category: {
      en: "Infrastructure",
      it: "Infrastrutture",
      de: "Infrastruktur"
    },
    date: {
      en: "2023-04-20",
      it: "2023-04-20",
      de: "2023-04-20"
    },
    image: "https://images.unsplash.com/photo-1541888087425-ce81dfc46928?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "project-gamma",
    title: {
      en: "Project Gamma",
      it: "Progetto Gamma",
      de: "Projekt Gamma"
    },
    description: {
      en: "Residential tower structural and MEP coordination.",
      it: "Coordinamento strutturale e impianti MEP per una torre residenziale.",
      de: "Tragwerks- und TGA-Koordination für ein Wohnhochhaus."
    },
    category: {
      en: "Residential",
      it: "Residenziale",
      de: "Wohnbau"
    },
    date: {
      en: "2023-07-10",
      it: "2023-07-10",
      de: "2023-07-10"
    },
    image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "project-delta",
    title: {
      en: "Project Delta",
      it: "Progetto Delta",
      de: "Projekt Delta"
    },
    description: {
      en: "Hospital expansion project with advanced COBie deliverables.",
      it: "Progetto di ampliamento ospedaliero con deliverable COBie avanzati.",
      de: "Krankenhauserweiterungsprojekt mit anspruchsvollen COBie-Lieferobjekten."
    },
    category: {
      en: "Healthcare",
      it: "Sanità",
      de: "Gesundheitswesen"
    },
    date: {
      en: "2023-10-05",
      it: "2023-10-05",
      de: "2023-10-05"
    },
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "project-epsilon",
    title: {
      en: "Project Epsilon",
      it: "Progetto Epsilon",
      de: "Projekt Epsilon"
    },
    description: {
      en: "University campus master planning using BIM models.",
      it: "Master plan del campus universitario sviluppato tramite modelli BIM.",
      de: "Masterplanung eines Universitätscampus auf Basis von BIM-Modellen."
    },
    category: {
      en: "Education",
      it: "Istruzione",
      de: "Bildung"
    },
    date: {
      en: "2024-01-12",
      it: "2024-01-12",
      de: "2024-01-12"
    },
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "project-zeta",
    title: {
      en: "Project Zeta",
      it: "Progetto Zeta",
      de: "Projekt Zeta"
    },
    description: {
      en: "Airport terminal renovation with fully automated clash resolution.",
      it: "Riqualificazione del terminal aeroportuale con risoluzione completamente automatizzata delle interferenze.",
      de: "Flughafenterminal-Sanierung mit vollautomatisierter Kollisionsbehebung."
    },
    category: {
      en: "Aviation",
      it: "Aviazione",
      de: "Luftfahrt"
    },
    date: {
      en: "2024-03-22",
      it: "2024-03-22",
      de: "2024-03-22"
    },
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  }
];

export const featuredAiCaseStudies = [
  {
    slug: "ai-workplace",
    title: {
      en: "AI Integration in the Workplace",
      it: "Integrazione AI sul Posto di Lavoro",
      de: "KI-Integration am Arbeitsplatz"
    },
    description: {
      en: "Implementing artificial intelligence to streamline daily operations and enhance productivity.",
      it: "Implementazione dell'intelligenza artificiale per semplificare le operazioni quotidiane e migliorare la produttività.",
      de: "Implementierung künstlicher Intelligenz zur Optimierung täglicher Abläufe und Steigerung der Produktivität."
    },
    category: {
      en: "Artificial Intelligence",
      it: "Intelligenza Artificiale",
      de: "Künstliche Intelligenz"
    },
    date: {
      en: "Ongoing",
      it: "In corso",
      de: "Laufend"
    },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "ai-models",
    title: {
      en: "Working with AI Models",
      it: "Lavorare con Modelli AI",
      de: "Arbeiten mit KI-Modellen"
    },
    description: {
      en: "Training and deploying custom AI models tailored for specific business needs in the AEC sector.",
      it: "Addestramento e distribuzione di modelli AI personalizzati per esigenze specifiche nel settore AEC.",
      de: "Training und Bereitstellung maßgeschneiderter KI-Modelle für spezifische Geschäftsanforderungen im AEC-Sektor."
    },
    category: {
      en: "Machine Learning",
      it: "Machine Learning",
      de: "Maschinelles Lernen"
    },
    date: {
      en: "Ongoing",
      it: "In corso",
      de: "Laufend"
    },
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "generative-design",
    title: {
      en: "Generative Design for Urban Planning",
      it: "Design Generativo per la Pianificazione Urbana",
      de: "Generatives Design für die Stadtplanung"
    },
    description: {
      en: "Using AI to generate optimal layouts for new city blocks.",
      it: "Utilizzo dell'IA per generare layout ottimali per nuovi isolati urbani.",
      de: "Nutzung von KI zur Generierung optimaler Grundrisse für neue Stadtquartiere."
    },
    category: {
      en: "Generative AI",
      it: "IA Generativa",
      de: "Generative KI"
    },
    date: {
      en: "Ongoing",
      it: "In corso",
      de: "Laufend"
    },
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "predictive-maintenance",
    title: {
      en: "Predictive Maintenance Algorithms",
      it: "Algoritmi di Manutenzione Predittiva",
      de: "Algorithmen zur vorausschauenden Wartung"
    },
    description: {
      en: "Forecasting equipment failures before they occur.",
      it: "Previsione dei guasti agli impianti prima del loro verificarsi.",
      de: "Vorhersage von Anlagen- und Geräteausfällen vor deren Auftreten."
    },
    category: {
      en: "Machine Learning",
      it: "Machine Learning",
      de: "Maschinelles Lernen"
    },
    date: {
      en: "Completed",
      it: "Completato",
      de: "Abgeschlossen"
    },
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "nlp-specs",
    title: {
      en: "NLP for Building Specifications",
      it: "NLP per Capitolati e Specifiche Tecniche",
      de: "NLP für Bauspezifikationen"
    },
    description: {
      en: "Extracting insights from unstructured specification documents.",
      it: "Estrazione di informazioni e requisiti da documenti di capitolato non strutturati.",
      de: "Extrahieren von Erkenntnissen aus unstrukturierten Leistungsverzeichnissen und Spezifikationen."
    },
    category: {
      en: "NLP",
      it: "NLP",
      de: "NLP"
    },
    date: {
      en: "Ongoing",
      it: "In corso",
      de: "Laufend"
    },
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  },
  {
    slug: "computer-vision-safety",
    title: {
      en: "Computer Vision for Site Safety",
      it: "Computer Vision per la Sicurezza in Cantiere",
      de: "Computer Vision für Baustellensicherheit"
    },
    description: {
      en: "Monitoring construction sites for safety hazards in real-time.",
      it: "Monitoraggio in tempo reale dei cantieri edili per rilevare rischi e violazioni della sicurezza.",
      de: "Echtzeit-Überwachung von Baustellen auf Sicherheitsrisiken und Gefahren."
    },
    category: {
      en: "Computer Vision",
      it: "Computer Vision",
      de: "Computer Vision"
    },
    date: {
      en: "Testing",
      it: "In fase di test",
      de: "In Prüfung"
    },
    image: "https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=800&auto=format&fit=crop",
    content: dummyContent
  }
];

export const allProjectsData = [...allProjects, ...featuredAiCaseStudies];
