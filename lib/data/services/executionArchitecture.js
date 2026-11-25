export const executionArchitecture = {
  en: {
    tag: "BIM INFORMATION FLOW",
    headline: "From project information to reviewed BIM deliverables.",
    subtitle: "Our engineering workflow connects project requirements, specialist BIM production, multidisciplinary coordination and technical verification. Information is developed and exchanged according to the agreed project scope and delivery requirements.",
    labels: {
      referenceArchitecture: "ILLUSTRATIVE WORKFLOW",
      supportingNote: "Illustrative information flow. Actual activities, exchange formats and deliverables depend on the agreed project scope and available information.",
      flowIndicator: "INFORMATION FLOW",
      inputsLayer: "INPUTS",
      logicLayer: "BIM PRODUCTION",
      outputsLayer: "DELIVERABLES",
      coreBadge: "TECHNICAL EXECUTION",
      governedBadge: "SUPERVISED",
      reviewGateBadge: "REVIEW",
      flowBadge: "INFORMATION FLOW"
    },
    nodes: [
      {
        num: "01",
        technicalLabel: "PROJECT INPUTS",
        title: "Project information and requirements",
        desc: "Establish the information basis for specialist modeling, coordination and technical verification.",
        footerLabel: "PROJECT INPUTS",
        items: [
          {
            label: "EIR / BEP",
            sub: "Applicable information requirements and BIM execution plan",
            type: "spec"
          },
          {
            label: "Project Documentation & Models",
            sub: "Drawings, Revit models, IFC files and existing model information",
            type: "model"
          },
          {
            label: "Project Criteria",
            sub: "Modeling scope, coordination rules and verification requirements",
            type: "criteria"
          }
        ]
      },
      {
        num: "02",
        technicalLabel: "BIM PRODUCTION",
        title: "Modeling, coordination and verification",
        desc: "Develop and coordinate discipline models using project-specific requirements. Targeted automation supports specialist engineering work where appropriate.",
        footerLabel: "TECHNICAL EXECUTION",
        items: [
          {
            label: "Requirements Mapping",
            sub: "Model structure, information requirements and parameter mapping",
            type: "rules"
          },
          {
            label: "Modeling & Coordination",
            sub: "Discipline models, technical interfaces and targeted Revit automation",
            type: "code"
          },
          {
            label: "Technical Review",
            sub: "Geometry, information completeness and documented coordination issues",
            type: "review"
          }
        ]
      },
      {
        num: "03",
        technicalLabel: "DIGITAL DELIVERABLES",
        title: "Reviewed models and project documentation",
        desc: "Prepare the agreed BIM models, coordination records and technical documentation for project exchange and handover.",
        footerLabel: "REVIEWED DELIVERABLES",
        items: [
          {
            label: "BIM Models",
            sub: "Developed and coordinated architectural, structural and MEP models",
            type: "model"
          },
          {
            label: "Verification Records",
            sub: "Model review reports, clash records and BCF issues where applicable",
            type: "report"
          },
          {
            label: "Digital Handover",
            sub: "RVT, IFC, drawings, schedules and COBie data where required",
            type: "data"
          }
        ]
      }
    ]
  },
  it: {
    tag: "FLUSSO INFORMATIVO BIM",
    headline: "Dalle informazioni di progetto agli elaborati BIM verificati.",
    subtitle: "Il nostro processo operativo collega i requisiti di progetto, la modellazione BIM specialistica, il coordinamento multidisciplinare e le verifiche tecniche. Le informazioni vengono sviluppate e scambiate secondo le prestazioni concordate e i requisiti di consegna.",
    labels: {
      referenceArchitecture: "SCHEMA OPERATIVO",
      supportingNote: "Schema illustrativo del flusso informativo. Le attività, i formati di scambio e gli elaborati effettivi dipendono dalle prestazioni concordate e dalle informazioni disponibili.",
      flowIndicator: "FLUSSO INFORMATIVO",
      inputsLayer: "DATI INIZIALI",
      logicLayer: "PRODUZIONE BIM",
      outputsLayer: "ELABORATI",
      coreBadge: "ESECUZIONE TECNICA",
      governedBadge: "SUPERVISIONE",
      reviewGateBadge: "VERIFICA",
      flowBadge: "FLUSSO INFORMATIVO"
    },
    nodes: [
      {
        num: "01",
        technicalLabel: "DATI DI PROGETTO",
        title: "Informazioni e requisiti di progetto",
        desc: "Definiamo la base informativa per la modellazione specialistica, il coordinamento e le verifiche tecniche.",
        footerLabel: "DATI DI PROGETTO",
        items: [
          {
            label: "CI / oGI / pGI",
            sub: "Documenti di gestione informativa applicabili alla fase di progetto",
            type: "spec"
          },
          {
            label: "Documentazione e modelli",
            sub: "Elaborati grafici, modelli Revit, file IFC e informazioni esistenti",
            type: "model"
          },
          {
            label: "Criteri di progetto",
            sub: "Prestazioni di modellazione, regole di coordinamento e requisiti di verifica",
            type: "criteria"
          }
        ]
      },
      {
        num: "02",
        technicalLabel: "PRODUZIONE BIM",
        title: "Modellazione, coordinamento e verifica",
        desc: "Sviluppiamo e coordiniamo i modelli disciplinari secondo i requisiti di progetto. L'automazione mirata supporta le attività specialistiche, ove opportuno.",
        footerLabel: "ESECUZIONE TECNICA",
        items: [
          {
            label: "Mappatura dei requisiti",
            sub: "Struttura dei modelli, requisiti informativi e associazione dei parametri",
            type: "rules"
          },
          {
            label: "Modellazione e coordinamento",
            sub: "Modelli disciplinari, interfacce tecniche e automazione Revit mirata",
            type: "code"
          },
          {
            label: "Verifica tecnica",
            sub: "Geometria, completezza informativa e criticità di coordinamento documentate",
            type: "review"
          }
        ]
      },
      {
        num: "03",
        technicalLabel: "ELABORATI DIGITALI",
        title: "Modelli verificati e documentazione di progetto",
        desc: "Predisponiamo i modelli BIM, i registri di coordinamento e la documentazione tecnica concordata per lo scambio informativo e la consegna.",
        footerLabel: "ELABORATI VERIFICATI",
        items: [
          {
            label: "Modelli BIM",
            sub: "Modelli architettonici, strutturali e impiantistici sviluppati e coordinati",
            type: "model"
          },
          {
            label: "Documentazione delle verifiche",
            sub: "Rapporti di verifica, registri delle interferenze e segnalazioni BCF, ove applicabili",
            type: "report"
          },
          {
            label: "Consegna digitale",
            sub: "RVT, IFC, elaborati grafici, abachi e dati COBie, ove richiesti",
            type: "data"
          }
        ]
      }
    ]
  },
  de: {
    tag: "BIM-INFORMATIONSFLUSS",
    headline: "Von Projektinformationen zu geprüften BIM-Lieferobjekten.",
    subtitle: "Unser technischer Arbeitsablauf verbindet Projektanforderungen, BIM-Fachmodellierung, fachübergreifende Koordination und Modellprüfungen. Informationen werden entsprechend dem vereinbarten Leistungsumfang und den Übergabeanforderungen bearbeitet und ausgetauscht.",
    labels: {
      referenceArchitecture: "SCHEMATISCHER ABLAUF",
      supportingNote: "Schematischer Informationsfluss. Die tatsächlichen Leistungen, Austauschformate und Lieferobjekte richten sich nach dem vereinbarten Leistungsumfang und den verfügbaren Informationen.",
      flowIndicator: "INFORMATIONSFLUSS",
      inputsLayer: "GRUNDLAGEN",
      logicLayer: "BIM-BEARBEITUNG",
      outputsLayer: "LIEFEROBJEKTE",
      coreBadge: "TECHNISCHE BEARBEITUNG",
      governedBadge: "BEGLEITET",
      reviewGateBadge: "PRÜFUNG",
      flowBadge: "INFORMATIONSFLUSS"
    },
    nodes: [
      {
        num: "01",
        technicalLabel: "PROJEKTGRUNDLAGEN",
        title: "Projektinformationen und Anforderungen",
        desc: "Wir schaffen die Informationsgrundlage für Fachmodellierung, BIM-Koordination und technische Prüfungen.",
        footerLabel: "PROJEKTGRUNDLAGEN",
        items: [
          {
            label: "AIA / BAP",
            sub: "Anwendbare Informationsanforderungen und BIM-Abwicklungsplan",
            type: "spec"
          },
          {
            label: "Projektunterlagen und Modelle",
            sub: "Planunterlagen, Revit-Modelle, IFC-Dateien und vorhandene Modellinformationen",
            type: "model"
          },
          {
            label: "Projektkriterien",
            sub: "Modellierungsumfang, Koordinationsregeln und Prüfanforderungen",
            type: "criteria"
          }
        ]
      },
      {
        num: "02",
        technicalLabel: "BIM-BEARBEITUNG",
        title: "Modellierung, Koordination und Prüfung",
        desc: "Wir erstellen und koordinieren Fachmodelle anhand der Projektanforderungen. Gezielte Automatisierung unterstützt die fachtechnische Bearbeitung bei Bedarf.",
        footerLabel: "TECHNISCHE BEARBEITUNG",
        items: [
          {
            label: "Zuordnung der Anforderungen",
            sub: "Modellstruktur, Informationsanforderungen und Parameterzuordnung",
            type: "rules"
          },
          {
            label: "Modellierung und Koordination",
            sub: "Fachmodelle, technische Schnittstellen und gezielte Revit-Automatisierung",
            type: "code"
          },
          {
            label: "Fachliche Prüfung",
            sub: "Geometrie, Informationsvollständigkeit und dokumentierte Koordinationspunkte",
            type: "review"
          }
        ]
      },
      {
        num: "03",
        technicalLabel: "DIGITALE LIEFEROBJEKTE",
        title: "Geprüfte Modelle und Projektdokumentation",
        desc: "Wir bereiten die vereinbarten BIM-Modelle, Koordinationsprotokolle und technischen Unterlagen für den Informationsaustausch und die Übergabe vor.",
        footerLabel: "GEPRÜFTE LIEFEROBJEKTE",
        items: [
          {
            label: "BIM-Modelle",
            sub: "Ausgearbeitete und koordinierte Architektur-, Tragwerks- und TGA-Modelle",
            type: "model"
          },
          {
            label: "Prüfdokumentation",
            sub: "Modellprüfberichte, Kollisionsprotokolle und BCF-Meldungen, soweit anwendbar",
            type: "report"
          },
          {
            label: "Digitale Übergabe",
            sub: "RVT, IFC, Planunterlagen, Bauteillisten und COBie-Daten, soweit gefordert",
            type: "data"
          }
        ]
      }
    ]
  }
};
