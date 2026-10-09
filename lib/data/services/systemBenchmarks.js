export const systemBenchmarks = {
  en: {
    tag: "ENGINEERING EVALUATION",
    badge: "PROJECT-SPECIFIC EVALUATION",
    headline: "Clear Criteria. Reviewable Engineering Results.",
    subtitle: "BIM workflows should be assessed against agreed project requirements, available model data, and relevant engineering checks—not universal speed or accuracy promises.",
    methodologyNote: "Evaluation criteria, checks, and reporting methods are defined according to the project scope. The examples below illustrate possible assessment areas, not measured performance results.",
    criteriaLabel: "EVALUATION CRITERIA",
    evidenceLabel: "POSSIBLE REVIEW EVIDENCE",
    matrixAriaLabel: "Engineering Verification Matrix",
    columnLabels: {
      domain: "Review Domain",
      criteria: "Evaluation Criteria",
      evidence: "Possible Review Evidence"
    },
    assessments: [
      {
        id: "workflow-efficiency",
        num: "01",
        category: "WORKFLOW ASSESSMENT",
        title: "Workflow Efficiency",
        desc: "Identify repetitive engineering operations and examine where targeted automation may reduce manual handling while keeping the necessary technical review in place.",
        criteria: [
          "Task Scope",
          "Repeatability",
          "Review Effort"
        ],
        evidenceLabel: "POSSIBLE REVIEW EVIDENCE",
        evidence: "Workflow checklist and technical review notes"
      },
      {
        id: "information-quality",
        num: "02",
        category: "INFORMATION REVIEW",
        title: "Model Information Quality",
        desc: "Review naming rules, required parameters, classification consistency, and documented exceptions against the information requirements agreed for the project.",
        criteria: [
          "Required Fields",
          "Rule Exceptions",
          "Issue Tracking"
        ],
        evidenceLabel: "POSSIBLE REVIEW EVIDENCE",
        evidence: "Model review notes and exception register"
      },
      {
        id: "coordination-handover",
        num: "03",
        category: "DELIVERY REVIEW",
        title: "Coordination & Handover Readiness",
        desc: "Examine documented coordination findings, information exchange requirements, and handover records before preparing relevant deliverables for project-team review.",
        criteria: [
          "Coordination Findings",
          "Information Exchange",
          "Handover Records"
        ],
        evidenceLabel: "POSSIBLE REVIEW EVIDENCE",
        evidence: "Issue records and project handover checklist"
      }
    ]
  },
  it: {
    tag: "VALUTAZIONE INGEGNERISTICA",
    badge: "VALUTAZIONE SU SPECIFICA DI PROGETTO",
    headline: "Criteri Chiari. Risultati Ingegneristici Verificabili.",
    subtitle: "I workflow BIM devono essere valutati rispetto ai requisiti informativi concordati, ai dati di modello disponibili e alle verifiche tecniche pertinenti, non su promesse generiche di velocità o accuratezza.",
    methodologyNote: "I criteri di valutazione, le verifiche e le modalità di reportistica vengono definiti in base all'ambito di progetto. Gli esempi illustrano possibili aree di analisi, non risultati prestazionali misurati.",
    criteriaLabel: "CRITERI DI VERIFICA",
    evidenceLabel: "EVIDENZE DI REVISIONE",
    matrixAriaLabel: "Matrice di Verifica Ingegneristica",
    columnLabels: {
      domain: "Ambito di Revisione",
      criteria: "Criteri di Verifica",
      evidence: "Evidenze di Revisione Possibili"
    },
    assessments: [
      {
        id: "workflow-efficiency",
        num: "01",
        category: "VALUTAZIONE DEI WORKFLOW",
        title: "Efficienza dei Workflow",
        desc: "Identificare le operazioni ingegneristiche ripetitive e analizzare dove un'automazione mirata possa ridurre la gestione manuale mantenendo il necessario controllo tecnico.",
        criteria: [
          "Ambito di Attività",
          "Ripetibilità",
          "Impegno di Revisione"
        ],
        evidenceLabel: "EVIDENZE DI REVISIONE",
        evidence: "Checklist di processo e note di revisione tecnica"
      },
      {
        id: "information-quality",
        num: "02",
        category: "REVISIONE INFORMATIVA",
        title: "Qualità delle Informazioni del Modello",
        desc: "Verificare convenzioni di denominazione, parametri obbligatori, coerenza delle classificazioni ed eccezioni documentate rispetto ai requisiti informativi di progetto.",
        criteria: [
          "Campi Obbligatori",
          "Eccezioni alle Regole",
          "Tracciamento Issue"
        ],
        evidenceLabel: "EVIDENZE DI REVISIONE",
        evidence: "Note di verifica del modello e registro delle eccezioni"
      },
      {
        id: "coordination-handover",
        num: "03",
        category: "REVISIONE DI CONSEGNA",
        title: "Coordinamento e Prontezza alla Consegna",
        desc: "Esaminare le risultanze di coordinamento documentate, i requisiti di scambio informativo e le registrazioni di consegna prima di predisporre gli elaborati per il team di progetto.",
        criteria: [
          "Risultanze di Coordinamento",
          "Scambio Informativo",
          "Registri di Consegna"
        ],
        evidenceLabel: "EVIDENZE DI REVISIONE",
        evidence: "Registro delle problematiche e checklist di consegna"
      }
    ]
  },
  de: {
    tag: "ENGINEERING-BEWERTUNG",
    badge: "PROJEKTSPEZIFISCHE BEWERTUNG",
    headline: "Klare Kriterien. Nachvollziehbare Engineering-Ergebnisse.",
    subtitle: "BIM-Workflows sollten anhand vereinbarter Projektanforderungen, verfügbarer Modelldaten und relevanter Prüfregeln bewertet werden – nicht anhand universeller Geschwindigkeits- oder Genauigkeitsversprechen.",
    methodologyNote: "Prüfkriterien, Prüfmethoden und Berichtsformen werden gemäß dem Projektumfang definiert. Die nachfolgenden Beispiele veranschaulichen mögliche Bewertungsbereiche, keine gemessenen Leistungsdaten.",
    criteriaLabel: "PRÜFKRITERIEN",
    evidenceLabel: "MÖGLICHE PRÜFNACHWEISE",
    matrixAriaLabel: "Engineering-Prüfmatrix",
    columnLabels: {
      domain: "Prüfbereich",
      criteria: "Prüfkriterien",
      evidence: "Mögliche Prüfnachweise"
    },
    assessments: [
      {
        id: "workflow-efficiency",
        num: "01",
        category: "WORKFLOW-BEWERTUNG",
        title: "Workflow-Effizienz",
        desc: "Identifikation repetitiver Engineering-Abläufe und Prüfung, wo gezielte Automatisierung manuelle Aufwände reduzieren kann, während die erforderliche fachliche Kontrolle gewahrt bleibt.",
        criteria: [
          "Aufgabenbereich",
          "Wiederholbarkeit",
          "Prüfaufwand"
        ],
        evidenceLabel: "MÖGLICHE PRÜFNACHWEISE",
        evidence: "Workflow-Checkliste und technische Prüfnotizen"
      },
      {
        id: "information-quality",
        num: "02",
        category: "INFORMATIONS-PRÜFUNG",
        title: "Qualität der Modellinformationen",
        desc: "Prüfung von Namenskonventionen, Pflichtparametern, Klassifikationskonsistenz und dokumentierten Ausnahmen anhand der vereinbarten Informationsanforderungen des Projekts.",
        criteria: [
          "Pflichtfelder",
          "Regelausnahmen",
          "Issue-Tracking"
        ],
        evidenceLabel: "MÖGLICHE PRÜFNACHWEISE",
        evidence: "Modellprüfnotizen und Abweichungsprotokoll"
      },
      {
        id: "coordination-handover",
        num: "03",
        category: "ÜBERGABE-PRÜFUNG",
        title: "Koordination und Übergabereife",
        desc: "Untersuchung dokumentierter Koordinationsbefunde, Informationsaustauschanforderungen und Übergabeprotokolle vor Bereitstellung der Ergebnisse zur Projektteam-Prüfung.",
        criteria: [
          "Koordinationsbefunde",
          "Informationsaustausch",
          "Übergabeprotokolle"
        ],
        evidenceLabel: "MÖGLICHE PRÜFNACHWEISE",
        evidence: "Mängelprotokolle und Projekt-Übergabe-Checkliste"
      }
    ]
  }
};
