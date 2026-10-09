export const executionArchitecture = {
  en: {
    tag: "ENGINEERING WORKFLOW ARCHITECTURE",
    headline: "Connecting BIM Requirements, Engineering Logic, and Deliverables.",
    subtitle: "A practical reference architecture for organizing project requirements, BIM data, tailored automation, and engineering review into a connected delivery workflow. The tools and level of automation are selected according to each project's scope.",
    labels: {
      referenceArchitecture: "REFERENCE ARCHITECTURE",
      supportingNote: "Illustrative structure. Actual workflows and deliverables depend on project requirements, available data, and the agreed scope of work.",
      flowIndicator: "CONNECTED INFORMATION FLOW",
      inputsLayer: "INPUTS",
      logicLayer: "ENGINEERING CONTROLS",
      outputsLayer: "REVIEWED OUTPUTS",
      coreBadge: "ENGINEERING CONTROL CORE",
      governedBadge: "GOVERNED",
      reviewGateBadge: "REVIEW GATE",
      flowBadge: "FLOW"
    },
    nodes: [
      {
        num: "01",
        technicalLabel: "PROJECT INPUTS",
        title: "Project Data & Requirements",
        desc: "Bring together relevant project information, model data, and agreed information requirements so the engineering workflow starts from a clearly defined scope.",
        footerLabel: "INPUTS",
        items: [
          {
            label: "EIR / BEP",
            sub: "Information specifications & exchange guidelines",
            type: "spec"
          },
          {
            label: "Revit / IFC Models",
            sub: "Source geometry & parameter datasets",
            type: "model"
          },
          {
            label: "Project Criteria",
            sub: "Coordination constraints & scope boundaries",
            type: "criteria"
          }
        ]
      },
      {
        num: "02",
        technicalLabel: "ENGINEERING LOGIC",
        title: "Controlled Engineering Workflows",
        desc: "Apply defined rules, technical review, and project-specific automation where useful. Python, C#, and Revit API tools may support repetitive operations under engineering oversight.",
        footerLabel: "ENGINEERING CONTROLS",
        items: [
          {
            label: "Requirements Mapping",
            sub: "Scope parsing & rule parameter alignment",
            type: "rules"
          },
          {
            label: "Validation & Automation",
            sub: "Targeted Python, C# & Revit API routines",
            type: "code"
          },
          {
            label: "Engineering Review",
            sub: "Technical verification & engineering oversight",
            type: "review"
          }
        ]
      },
      {
        num: "03",
        technicalLabel: "BIM OUTPUTS",
        title: "Reviewed Models & Deliverables",
        desc: "Prepare relevant model updates, issue records, reports, and structured information for review and handover against the criteria agreed for the project.",
        footerLabel: "REVIEWED OUTPUTS",
        items: [
          {
            label: "Model Updates",
            sub: "Structured model parameters and geometry updates",
            type: "model"
          },
          {
            label: "QA/QC Reports",
            sub: "Clash summaries, variance logs & audit records",
            type: "report"
          },
          {
            label: "Handover Information",
            sub: "IFC models, COBie data and documentation where applicable",
            type: "data"
          }
        ]
      }
    ]
  },
  it: {
    tag: "ARCHITETTURA DEL WORKFLOW BIM",
    headline: "Collegare Requisiti BIM, Logica Ingegneristica e Deliverable.",
    subtitle: "Una pratica architettura di riferimento per organizzare requisiti di progetto, dati BIM, automazioni dedicate e revisione ingegneristica in un flusso di lavoro integrato. Gli strumenti e il livello di automazione sono selezionati in base all'ambito di ciascun progetto.",
    labels: {
      referenceArchitecture: "ARCHITETTURA DI RIFERIMENTO",
      supportingNote: "Struttura illustrativa. I flussi operativi e i deliverable effettivi dipendono dai requisiti del progetto, dai dati disponibili e dall'ambito concordato.",
      flowIndicator: "FLUSSO DI DATI E LOGICA",
      inputsLayer: "DATI DI INGRESSO",
      logicLayer: "CONTROLLI INGEGNERISTICI",
      outputsLayer: "OUTPUT REVISIONATI",
      coreBadge: "CONTROLLI INGEGNERISTICI",
      governedBadge: "SUPERVISIONATO",
      reviewGateBadge: "GATE DI REVISIONE",
      flowBadge: "FLUSSO"
    },
    nodes: [
      {
        num: "01",
        technicalLabel: "DATI DI PROGETTO",
        title: "Dati e Requisiti di Progetto",
        desc: "Raccogliere le informazioni di progetto pertinenti, i dati del modello e i requisiti informativi concordati, affinché il flusso di lavoro ingegneristico parta da un ambito chiaramente definito.",
        footerLabel: "DATI DI INGRESSO",
        items: [
          {
            label: "EIR / BEP (CI / pGI)",
            sub: "Specifiche informative e linee guida di scambio",
            type: "spec"
          },
          {
            label: "Modelli Revit / IFC",
            sub: "Geometria di base e dataset di parametri",
            type: "model"
          },
          {
            label: "Criteri di Progetto",
            sub: "Regole di coordinamento e perimetro di lavoro",
            type: "criteria"
          }
        ]
      },
      {
        num: "02",
        technicalLabel: "LOGICA INGEGNERISTICA",
        title: "Logiche Ingegneristiche Controllate",
        desc: "Applicare regole definite, revisione tecnica e automazioni specifiche per il progetto quando utile. Strumenti Python, C# e Revit API possono supportare operazioni ripetitive sotto supervisione ingegneristica.",
        footerLabel: "CONTROLLI INGEGNERISTICI",
        items: [
          {
            label: "Mappatura dei Requisiti",
            sub: "Allineamento regole e schemi informativi",
            type: "rules"
          },
          {
            label: "Validazione e Automazione",
            sub: "Routine mirate in Python, C# e Revit API",
            type: "code"
          },
          {
            label: "Supervisione Tecnica",
            sub: "Verifica professionale e controllo ingegneristico",
            type: "review"
          }
        ]
      },
      {
        num: "03",
        technicalLabel: "DELIVERABLE BIM",
        title: "Modelli e Deliverable Sottoposti a Revisione",
        desc: "Predisporre aggiornamenti di modello, registri anomalie, report e dati strutturati per la verifica e la consegna in base ai criteri concordati di progetto.",
        footerLabel: "OUTPUT REVISIONATI",
        items: [
          {
            label: "Aggiornamenti di Modello",
            sub: "Parametri di modello strutturati e aggiornamenti geometrici",
            type: "model"
          },
          {
            label: "Report di QA/QC",
            sub: "Tracciamento interferenze e registri di audit",
            type: "report"
          },
          {
            label: "Consegna Informativa",
            sub: "Modelli IFC, dati COBie e documentazione ove applicabile",
            type: "data"
          }
        ]
      }
    ]
  },
  de: {
    tag: "BIM-WORKFLOW-ARCHITEKTUR",
    headline: "BIM-Anforderungen, Engineering-Logik und Projektergebnisse verbinden.",
    subtitle: "Eine praxisnahe Referenzarchitektur zur Organisation von Projektanforderungen, BIM-Daten, gezielter Automatisierung und fachlicher Prüfung in einem durchgängigen Workflow. Werkzeuge und Automatisierungsgrad werden passend zum jeweiligen Projektumfang ausgewählt.",
    labels: {
      referenceArchitecture: "REFERENZARCHITEKTUR",
      supportingNote: "Illustrative Struktur. Tatsächliche Workflows und Ergebnisse hängen von den Projektanforderungen, den verfügbaren Daten und dem vereinbarten Leistungsumfang ab.",
      flowIndicator: "DATEN- & LOGIKFLUSS",
      inputsLayer: "EINGANGSDATEN",
      logicLayer: "KONTROLLMECHANISMEN",
      outputsLayer: "GEPRÜFTE ERGEBNISSE",
      coreBadge: "ENGINEERING-KONTROLLKERN",
      governedBadge: "GEPRÜFT",
      reviewGateBadge: "PRÜF-GATE",
      flowBadge: "FLUSS"
    },
    nodes: [
      {
        num: "01",
        technicalLabel: "PROJEKT-INPUTS",
        title: "Projektdaten und Anforderungen",
        desc: "Zusammenführung relevanter Projektinformationen, Modelldaten und vereinbarter Informationsanforderungen, damit der Engineering-Workflow von einem klar definierten Rahmen ausgeht.",
        footerLabel: "EINGANGSDATEN",
        items: [
          {
            label: "AIA / BAP",
            sub: "Informationsanforderungen und Richtlinien",
            type: "spec"
          },
          {
            label: "Revit- / IFC-Modelle",
            sub: "Quellgeometrie und Parametersätze",
            type: "model"
          },
          {
            label: "Projektkriterien",
            sub: "Koordinationsregeln und Leistungsumfang",
            type: "criteria"
          }
        ]
      },
      {
        num: "02",
        technicalLabel: "ENGINEERING-LOGIK",
        title: "Kontrollierte Engineering-Workflows",
        desc: "Anwendung definierter Regeln, technischer Prüfungen und projektspezifischer Automatisierung, wo sinnvoll. Werkzeuge in Python, C# und Revit-API können repetitive Aufgaben unter fachlicher Aufsicht unterstützen.",
        footerLabel: "KONTROLLMECHANISMEN",
        items: [
          {
            label: "Anforderungs-Mapping",
            sub: "Regeldefinitionen und Parameterabgleich",
            type: "rules"
          },
          {
            label: "Validierung & Automatisierung",
            sub: "Gezielte Routinen in Python, C# und Revit-API",
            type: "code"
          },
          {
            label: "Fachliche Prüfung",
            sub: "Ingenieurmäßige Aufsicht und Plausibilitätskontrolle",
            type: "review"
          }
        ]
      },
      {
        num: "03",
        technicalLabel: "BIM-ERGEBNISSE",
        title: "Geprüfte BIM-Ergebnisse",
        desc: "Vorbereitung relevanter Modellaktualisierungen, Prüfprotokolle, Berichte und strukturierter Daten zur Freigabe und Übergabe gemäß den vereinbarten Projektkriterien.",
        footerLabel: "GEPRÜFTE ERGEBNISSE",
        items: [
          {
            label: "Modell-Updates",
            sub: "Strukturierte Modellparameter und Geometrieaktualisierungen",
            type: "model"
          },
          {
            label: "QS/QK-Berichte",
            sub: "Prüfprotokolle, Abweichungsanalysen und Audits",
            type: "report"
          },
          {
            label: "Übergabeinformationen",
            sub: "IFC-Modelle, COBie-Daten und Dokumentation, soweit zutreffend",
            type: "data"
          }
        ]
      }
    ]
  }
};
