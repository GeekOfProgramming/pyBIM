export const systemBenchmarks = {
  en: {
    tag: "BIM ENGINEERING EVALUATION",
    badge: "PROJECT-SPECIFIC EVALUATION",
    headline: "Defined criteria. Documented technical reviews.",
    subtitle: "We assess BIM activities and deliverables against agreed project requirements, available model information and relevant technical criteria.",
    methodologyNote: "The criteria and documentation shown below are illustrative examples, not measured performance results. Actual assessment methods are defined according to the agreed project scope.",
    criteriaLabel: "EVALUATION CRITERIA",
    evidenceLabel: "POSSIBLE DOCUMENTATION",
    matrixAriaLabel: "BIM Engineering Evaluation Matrix",
    columnLabels: {
      domain: "Review domain",
      criteria: "Evaluation criteria",
      evidence: "Possible documentation"
    },
    assessments: [
      {
        id: "workflow-efficiency",
        num: "01",
        category: "WORKFLOW ASSESSMENT",
        title: "Workflow efficiency",
        desc: "Assess repetitive modeling, parameter management and documentation tasks to identify suitable opportunities for automation while retaining technical oversight.",
        criteria: [
          "Task scope",
          "Repeatability",
          "Technical review effort"
        ],
        evidenceLabel: "POSSIBLE DOCUMENTATION",
        evidence: "Workflow checklist and technical assessment notes"
      },
      {
        id: "information-quality",
        num: "02",
        category: "INFORMATION VERIFICATION",
        title: "Model information quality",
        desc: "Review required parameters, naming conventions, classifications and information completeness against agreed project requirements.",
        criteria: [
          "Required information",
          "Naming and classification rules",
          "Documented discrepancies"
        ],
        evidenceLabel: "POSSIBLE DOCUMENTATION",
        evidence: "Model verification report and issue register"
      },
      {
        id: "coordination-handover",
        num: "03",
        category: "HANDOVER REVIEW",
        title: "Coordination and handover readiness",
        desc: "Review documented coordination findings, information exchange requirements and the completeness of agreed digital deliverables.",
        criteria: [
          "Coordination findings",
          "Information exchange requirements",
          "Deliverable completeness"
        ],
        evidenceLabel: "POSSIBLE DOCUMENTATION",
        evidence: "Coordination records and handover checklist"
      }
    ]
  },
  it: {
    tag: "VALUTAZIONE TECNICA BIM",
    badge: "VALUTAZIONE SPECIFICA DI PROGETTO",
    headline: "Criteri definiti. Verifiche tecniche documentate.",
    subtitle: "Valutiamo le attività e gli elaborati BIM rispetto ai requisiti di progetto concordati, alle informazioni disponibili nei modelli e ai criteri tecnici pertinenti.",
    methodologyNote: "I criteri e la documentazione riportati di seguito sono esempi illustrativi, non risultati prestazionali misurati. Le modalità di valutazione effettive vengono definite in base alle prestazioni concordate.",
    criteriaLabel: "CRITERI DI VALUTAZIONE",
    evidenceLabel: "DOCUMENTAZIONE POSSIBILE",
    matrixAriaLabel: "Matrice di valutazione tecnica BIM",
    columnLabels: {
      domain: "Ambito di verifica",
      criteria: "Criteri di valutazione",
      evidence: "Documentazione possibile"
    },
    assessments: [
      {
        id: "workflow-efficiency",
        num: "01",
        category: "VALUTAZIONE DEI PROCESSI",
        title: "Efficienza dei processi operativi",
        desc: "Valutiamo le attività ripetitive di modellazione, gestione dei parametri e produzione degli elaborati per individuare le opportunità di automazione, mantenendo la supervisione tecnica.",
        criteria: [
          "Ambito delle attività",
          "Ripetibilità delle attività",
          "Impegno richiesto per le verifiche"
        ],
        evidenceLabel: "DOCUMENTAZIONE POSSIBILE",
        evidence: "Lista di controllo del processo e note di valutazione tecnica"
      },
      {
        id: "information-quality",
        num: "02",
        category: "VERIFICA INFORMATIVA",
        title: "Qualità informativa dei modelli",
        desc: "Verifichiamo i parametri richiesti, le convenzioni di denominazione, le classificazioni e la completezza informativa rispetto ai requisiti di progetto concordati.",
        criteria: [
          "Informazioni richieste",
          "Regole di denominazione e classificazione",
          "Difformità documentate"
        ],
        evidenceLabel: "DOCUMENTAZIONE POSSIBILE",
        evidence: "Rapporto di verifica dei modelli e registro delle criticità"
      },
      {
        id: "coordination-handover",
        num: "03",
        category: "VERIFICA DELLA CONSEGNA",
        title: "Coordinamento e preparazione alla consegna",
        desc: "Esaminiamo le risultanze documentate del coordinamento, i requisiti di scambio informativo e la completezza degli elaborati digitali concordati.",
        criteria: [
          "Risultanze del coordinamento",
          "Requisiti di scambio informativo",
          "Completezza degli elaborati"
        ],
        evidenceLabel: "DOCUMENTAZIONE POSSIBILE",
        evidence: "Registri di coordinamento e lista di controllo della consegna"
      }
    ]
  },
  de: {
    tag: "TECHNISCHE BIM-BEWERTUNG",
    badge: "PROJEKTSPEZIFISCHE BEWERTUNG",
    headline: "Definierte Kriterien. Dokumentierte technische Prüfungen.",
    subtitle: "Wir bewerten BIM-Leistungen und Lieferobjekte anhand der vereinbarten Projektanforderungen, der verfügbaren Modellinformationen und der relevanten technischen Kriterien.",
    methodologyNote: "Die nachfolgenden Kriterien und Unterlagen sind illustrative Beispiele und keine gemessenen Leistungsdaten. Die tatsächlichen Bewertungsmethoden richten sich nach dem vereinbarten Leistungsumfang.",
    criteriaLabel: "BEWERTUNGSKRITERIEN",
    evidenceLabel: "MÖGLICHE DOKUMENTATION",
    matrixAriaLabel: "Technische BIM-Bewertungsmatrix",
    columnLabels: {
      domain: "Prüfbereich",
      criteria: "Bewertungskriterien",
      evidence: "Mögliche Dokumentation"
    },
    assessments: [
      {
        id: "workflow-efficiency",
        num: "01",
        category: "PROZESSBEWERTUNG",
        title: "Effizienz der Arbeitsabläufe",
        desc: "Wir bewerten wiederkehrende Modellierungsaufgaben, die Parameterverwaltung und die Erstellung von Planunterlagen, um geeignete Automatisierungsmöglichkeiten unter fachlicher Aufsicht zu identifizieren.",
        criteria: [
          "Aufgabenbereich",
          "Wiederholbarkeit",
          "Fachlicher Prüfaufwand"
        ],
        evidenceLabel: "MÖGLICHE DOKUMENTATION",
        evidence: "Prozesscheckliste und technische Bewertungsnotizen"
      },
      {
        id: "information-quality",
        num: "02",
        category: "INFORMATIONSPRÜFUNG",
        title: "Qualität der Modellinformationen",
        desc: "Wir prüfen erforderliche Parameter, Benennungsregeln, Klassifikationen und Informationsvollständigkeit anhand der vereinbarten Projektanforderungen.",
        criteria: [
          "Erforderliche Informationen",
          "Benennungs- und Klassifikationsregeln",
          "Dokumentierte Abweichungen"
        ],
        evidenceLabel: "MÖGLICHE DOKUMENTATION",
        evidence: "Modellprüfbericht und Abweichungsprotokoll"
      },
      {
        id: "coordination-handover",
        num: "03",
        category: "ÜBERGABEPRÜFUNG",
        title: "Koordination und Vorbereitung der Übergabe",
        desc: "Wir prüfen dokumentierte Koordinationsergebnisse, Anforderungen an den Informationsaustausch und die Vollständigkeit der vereinbarten digitalen Lieferobjekte.",
        criteria: [
          "Koordinationsergebnisse",
          "Anforderungen an den Informationsaustausch",
          "Vollständigkeit der Lieferobjekte"
        ],
        evidenceLabel: "MÖGLICHE DOKUMENTATION",
        evidence: "Koordinationsprotokolle und Übergabecheckliste"
      }
    ]
  }
};
