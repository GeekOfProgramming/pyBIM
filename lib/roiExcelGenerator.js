const ExcelJS = require('exceljs');

const I18N_SHEETS = {
  en: {
    sheetName: "EN - ISO 19650 Global",
    standardName: "ISO 19650 Global AEC Framework",
    brandHeader: (co) => `pyBIM  |  ADVANCED BIM & AUTOMATION LAB  •  PREPARED FOR: ${co.toUpperCase()}`,
    mainTitle: "BIM Automation ROI & Cost-Loss Matrix (ISO 19650)",
    subTitle: (n, co, m, r) => `Client: ${n} (${co}) | Baseline Team Scale: ${m} Engineers | Base Rate: €${r.toFixed(2)}/hr`,
    s1Header: "1. STUDIO / FIRM PROFILE (INPUT VARIABLES - EDIT GREEN CELLS)",
    inputs: [
      { label: "Number of BIM Modelers / Engineers in Team:", note: "Determines overall team scale (Frontend variable)" },
      { label: "Average Hourly Billing / Cost Rate (€ / hr):", note: "Standard DACH / EU engineering rate baseline" },
      { label: "Avg. Hours Wasted on Repetitive Tasks per Modeler (hrs/wk):", note: "Clash routing, naming, manual QTO, sheets (ISO 19650 baseline: 12h)" },
      { label: "Working Weeks per Year (EU Baseline):", note: "Annual working weeks excluding holidays & vacation" },
    ],
    s2Header: "2. AEC TASK AUTOMATION BREAKDOWN & RECOVERED CAPACITY (ISO 19650 AUDIT)",
    s2Cols: {
      b: "AEC Workflow / Task Description",
      c: "Manual (hrs/wk)",
      d: "Auto (hrs/wk)",
      e: "Saved (hrs/wk)",
      f: "Gross Weekly Savings (€)"
    },
    tasks: [
      "3D Spatial Clash Resolution & BCF Routing (Navisworks / Solibri)",
      "Dynamic 5D Quantity Take-Off (QTO) & BOQ Synchronization",
      "Custom Revit C# / Python Scripting & Parameter Injection",
      "4D Time-Schedule & Construction Sequencing Linkage (Synchro PRO)",
      "COBie Lifecycle Parameter Validation & ISO 19650 Quality Audits"
    ],
    totSavedLabel: "Total Weekly Recovered Capacity & Financial Savings:",
    s3Header: "3. EXECUTIVE ROI & RANGE-BASED FINANCIAL ARCHITECTURE",
    baseOutputs: [
      "Current Hidden Annual Loss (Manual Labor Drain):",
      "Gross Annual Financial Savings with pyBIM Engine:",
      "Total Recovered Engineering Capacity (Hours / Year):"
    ],
    scenariosHeader: {
      b: "ADOPTION SCENARIOS (ANNUAL FINANCIAL RECOVERY):",
      c: "Efficiency Ratio:",
      d: "Target Adoption:",
      e: "Annual Recovered Hrs:",
      f: "Net Annual Financial Value:"
    },
    scenarios: [
      { label: "Conservative Scenario (Initial Phase 1 Rollout):", adoption: "50% Automation Adoption" },
      { label: "Expected Base Scenario (Standard pyBIM Implementation):", adoption: "75% Automation Adoption" },
      { label: "Optimized Scenario (Full Digital Twin & API Pipeline):", adoption: "100% Full Core Automation" }
    ],
    finMetrics: [
      "Estimated pyBIM Integration Investment (Baseline Platform & Setup):",
      "Net Annual Savings (Year 1, Expected Scenario minus Investment):",
      "Payback Period (Months to 100% Capital Recovery):",
      "Year-1 Return on Investment (ROI %):"
    ],
    cumHeader: "FIVE-YEAR CUMULATIVE VALUE CREATION (COMPOUNDED CAPACITY):",
    cumMetrics: [
      "5-Year Cumulative Net Financial Gain (Expected Scenario):",
      "5-Year Engineering Capacity Liberated:"
    ],
    s4Header: "4. TECHNICAL VERIFICATION & DATA SOVEREIGNTY (AIR-GAP COMPLIANCE)",
    complianceItems: [
      { label: "Compliance Framework:", val: "ISO 19650-1/2, buildingSMART OpenBIM, IFC4.3 Certified" },
      { label: "Data Security Protocol:", val: "Air-Gapped LAN Execution • Zero Cloud Metadata Ingestion • GDPR & ISO 27001" },
      { label: "Engineering Audit Sign-off:", val: "Padua R&D Computational Team (Studio Ingegneria BIM Italia)" }
    ]
  },
  it: {
    sheetName: "IT - UNI 11337 Italia",
    standardName: "Norma UNI 11337 & Decreto BIM (D.M. 560/2017 & D.M. 312/2021)",
    brandHeader: (co) => `pyBIM  |  LABORATORIO DI AUTOMAZIONE BIM AVANZATA  •  PREPARATO PER: ${co.toUpperCase()}`,
    mainTitle: "Matrice di Ritorno sull'Investimento (ROI) e Analisi Costi BIM (UNI 11337)",
    subTitle: (n, co, m, r) => `Cliente: ${n} (${co}) | Team di Base: ${m} Modellatori | Tariffa Oraria: €${r.toFixed(2)}/ora`,
    s1Header: "1. PROFILO DELLO STUDIO / IMPRESA (VARIABILI DI INPUT - MODIFICA LE CELLE VERDI)",
    inputs: [
      { label: "Numero di Modellatori / BIM Specialist nel Team:", note: "Dimensione operativa del team tecnico (Variabile frontend)" },
      { label: "Tariffa Oraria Media di Fatturazione / Costo (€ / ora):", note: "Tariffa media ingegneristica di riferimento per l'Italia / UE" },
      { label: "Ore Medie Perse in Task Ripetitivi per Modellatore (ore/settimana):", note: "Clash routing, rinomina, computi manuali, cartigli (UNI 11337 baseline: 12h)" },
      { label: "Settimane Lavorative all'Anno (Standard Italiano / UE):", note: "Settimane annue effettive escluse ferie e festività" },
    ],
    s2Header: "2. DETTAGLIO AUTOMAZIONE DEI PROCESSI BIM E CAPACITÀ RECUPERATA (UNI 11337)",
    s2Cols: {
      b: "Processo BIM / Descrizione Attività",
      c: "Manuale (ore/sett)",
      d: "Auto (ore/sett)",
      e: "Recuperate (ore/sett)",
      f: "Risparmio Settimanale (€)"
    },
    tasks: [
      "Risoluzione Algoritmica delle Interferenze e Routing BCF (Navisworks / Solibri)",
      "Computo Metrico Estimativo 5D Dinamico e Sincronizzazione Elenco Prezzi",
      "Scripting Personalizzato Revit API (C# / Python) e Iniezione Parametri",
      "Pianificazione e Simulazione 4D con Cronoprogramma Lavori (Synchro PRO)",
      "Validazione Schede Informative COBie e Controllo Qualità Modelli UNI 11337"
    ],
    totSavedLabel: "Totale Capacità Ingegneristica Recuperata e Risparmio Economico Settimanale:",
    s3Header: "3. ARCHITETTURA FINANZIARIA STRATEGICA E SCENARI DI RITORNO (ROI)",
    baseOutputs: [
      "Perdita Economica Annua Attuale (Inefficienza Lavoro Manuale):",
      "Risparmio Economico Lordo Annuo con Motore pyBIM:",
      "Capacità Ingegneristica Totale Recuperata (Ore / Anno):"
    ],
    scenariosHeader: {
      b: "SCENARI DI ADOZIONE (RECUPERO ECONOMICO ANNUO):",
      c: "Tasso Efficienza:",
      d: "Livello Adozione:",
      e: "Ore Annue Recuperate:",
      f: "Valore Economico Netto Annuo:"
    },
    scenarios: [
      { label: "Scenario Prudenziale (Fase Iniziale di Transizione):", adoption: "Adozione Automazione al 50%" },
      { label: "Scenario Base Atteso (Implementazione Standard pyBIM):", adoption: "Adozione Automazione al 75%" },
      { label: "Scenario Ottimale (Piena Integrazione API e Gemello Digitale):", adoption: "Adozione Automazione Completa al 100%" }
    ],
    finMetrics: [
      "Investimento Stimato di Integrazione pyBIM (Piattaforma & Setup Iniziale):",
      "Risparmio Netto Annuo (Anno 1, Scenario Atteso al netto investimento):",
      "Periodo di Payback (Mesi per il Recupero Completo del Capitale):",
      "Ritorno sull'Investimento al 1° Anno (ROI %):"
    ],
    cumHeader: "CREAZIONE DI VALORE CUMULATIVO A 5 ANNI (EFFETTO COMPOUNDING):",
    cumMetrics: [
      "Beneficio Economico Netto Cumulativo a 5 Anni (Scenario Atteso):",
      "Capacità Ingegneristica Totale Liberata a 5 Anni:"
    ],
    s4Header: "4. VERIFICA TECNICA, NORMATIVA NAZIONALE E SOVRANITÀ DEI DATI",
    complianceItems: [
      { label: "Quadro Normativo:", val: "UNI 11337-1/7, D.M. 560/2017, D.M. 312/2021, OpenBIM IFC4.3" },
      { label: "Protocollo di Sovranità Dati:", val: "Esecuzione Locale Air-Gapped • Nessuna Ingestione Cloud • GDPR & ISO 27001" },
      { label: "Validazione Tecnica di Audit:", val: "Team di Ricerca e Sviluppo pyBIM (Padova, Italia)" }
    ]
  },
  de: {
    sheetName: "DE - DIN 19650 DACH",
    standardName: "DIN EN ISO 19650 & Stufenplan Digitales Planen und Bauen",
    brandHeader: (co) => `pyBIM  |  LABOR FÜR FORTSCHRITTLICHE BIM-AUTOMATISIERUNG  •  ERSTELLT FÜR: ${co.toUpperCase()}`,
    mainTitle: "BIM-Automatisierungs-ROI & Kosten-Verlust-Matrix (DIN EN ISO 19650)",
    subTitle: (n, co, m, r) => `Kunde: ${n} (${co}) | Basis-Teamgröße: ${m} Konstrukteure | Stundensatz: €${r.toFixed(2)}/Std`,
    s1Header: "1. UNTERNEHMENSPROFIL (EINGABEVARIABLEN - GRÜNE ZELLEN BEARBEITEN)",
    inputs: [
      { label: "Anzahl BIM-Konstrukteure / Modellierer im Team:", note: "Bestimmt die gesamte Teamkapazität (Frontend-Variable)" },
      { label: "Durchschnittlicher Stundensatz / Verrechnungssatz (€ / Std):", note: "Standard-Ingenieurstundensatz für den DACH-Raum" },
      { label: "Durchschnittliche Zeitverschwendung für Routineaufgaben (Std/Woche):", note: "Kollisionsprüfung, Benennung, manuelle AVA, Pläne (DIN-Basis: 12h)" },
      { label: "Arbeitswochen pro Jahr (DACH / EU-Standard):", note: "Tatsächliche Jahresarbeitswochen ohne Urlaub und Feiertage" },
    ],
    s2Header: "2. DETAILANALYSE DER BIM-WORKFLOWS & ZURÜCKGEWONNENE KAPAZITÄT (DIN ISO 19650)",
    s2Cols: {
      b: "BIM-Prozess / Aufgabenbeschreibung",
      c: "Manuell (Std/Wo)",
      d: "Auto (Std/Wo)",
      e: "Erspart (Std/Wo)",
      f: "Wöchentliche Ersparnis (€)"
    },
    tasks: [
      "3D-Kollisionsprüfung & BCF-Routing (Navisworks / Solibri)",
      "Dynamische 5D-Mengen- und Kostenermittlung (AVA) & Leistungsverzeichnisse",
      "Benutzerdefinierte Revit-API-Skripte (C# / Python) & Parameterinjektion",
      "4D-Bauzeitenplanung & Prozesssimulation (Synchro PRO)",
      "COBie-Attribut-Validierung & AIA/BAP-Qualitätsprüfung nach DIN EN ISO 19650"
    ],
    totSavedLabel: "Wöchentliche zurückgewonnene Ingenieurkapazität & Gesamtersparnis:",
    s3Header: "3. WIRTSCHAFTLICHKEITSANALYSE & MEHRSTUFIGE ROI-ARCHITEKTUR",
    baseOutputs: [
      "Aktueller verdeckter Jahresverlust (Manueller Arbeitsaufwand):",
      "Jährliche Brutto-Finanzersparnis mit der pyBIM-Engine:",
      "Zurückgewonnene Ingenieurkapazität insgesamt (Stunden / Jahr):"
    ],
    scenariosHeader: {
      b: "EINFÜHRUNGSSZENARIEN (JÄHRLICHE FINANZIELLE RÜCKGEWINNUNG):",
      c: "Effizienzrate:",
      d: "Ziel-Adoption:",
      e: "Eingesparte Jahresstunden:",
      f: "Jährlicher Netto-Finanzwert:"
    },
    scenarios: [
      { label: "Konservatives Szenario (Phase 1 Einführung):", adoption: "50% Automatisierungsgrad" },
      { label: "Erwartetes Basisszenario (Standard pyBIM-Implementierung):", adoption: "75% Automatisierungsgrad" },
      { label: "Optimiertes Szenario (Vollständige Digital-Twin- & API-Pipeline):", adoption: "100% Vollautomatisierung" }
    ],
    finMetrics: [
      "Geschätzte pyBIM-Integrationsinvestition (Plattform & Setup):",
      "Netto-Jahresersparnis (Jahr 1, Basisszenario abzüglich Investition):",
      "Amortisationszeit / Payback (Monate bis zur vollen Kapitalrückgewinnung):",
      "Investitionsrendite im 1. Jahr (ROI %):"
    ],
    cumHeader: "KUMULIERTER MEHRWERT ÜBER 5 JAHRE (COMPOUNDING-EFFEKT):",
    cumMetrics: [
      "Kumulierter Netto-Finanzgewinn über 5 Jahre (Basisszenario):",
      "Über 5 Jahre freigesetzte Ingenieurkapazität:"
    ],
    s4Header: "4. TECHNISCHE PRÜFUNG, NORMKONFORMITÄT & DATENSOUVERÄNITÄT",
    complianceItems: [
      { label: "Normatives Rahmenwerk:", val: "DIN EN ISO 19650-1/2, buildingSMART OpenBIM, IFC4.3 zertifiziert" },
      { label: "Datensicherheitsprotokoll:", val: "Lokale Air-Gap-Ausführung • Keine Cloud-Ingestion • DSGVO & ISO 27001" },
      { label: "Ingenieurtechnische Freigabe:", val: "pyBIM F&E-Berechnungsteam (Padua, Italien)" }
    ]
  }
};

function buildLanguageSheet(workbook, langKey, options, isSelected) {
  const dict = I18N_SHEETS[langKey] || I18N_SHEETS.en;
  const {
    name = "Executive Engineering Lead",
    companyName = "Enterprise Architecture & Engineering Partner",
    modelerCount = 5,
    hourlyRate = 85.0,
    avgHoursWasted = 12.0,
    workingWeeks = 48,
  } = options;

  const numModelers = parseInt(modelerCount, 10) || 5;
  const rateHourly = parseFloat(hourlyRate) || 85.0;
  const wastedHours = parseFloat(avgHoursWasted) || 12.0;
  const weeksWorking = parseInt(workingWeeks, 10) || 48;

  const sheet = workbook.addWorksheet(dict.sheetName, {
    views: [{ state: 'normal', showGridLines: true, activeCell: 'C7', tabSelected: isSelected }],
    pageSetup: { paperSize: 9, orientation: 'portrait' }
  });

  // Generous column widths so text NEVER truncates or overlaps
  sheet.columns = [
    { width: 4 },   // A - margin
    { width: 72 },  // B - Task / Metric Label (generous 72 for complete German & Italian phrases)
    { width: 22 },  // C - Base Scenario Input / Manual
    { width: 22 },  // D - Automated / Base Extra
    { width: 22 },  // E - Time Saved / Complex Scenario
    { width: 28 },  // F - Cost Saved / Complex Extra
  ];

  const PRIMARY_BLUE = '2563EB';
  const DARK_SLATE = '0F172A';
  const LIGHT_SURFACE = 'F1F5F9';
  const ACCENT_ORANGE = 'F97316';
  const EMERALD_GREEN = '10B981';
  const BORDER_COLOR = 'CBD5E1';
  const EDITABLE_GREEN_BG = 'D1FAE5';
  const EDITABLE_GREEN_TEXT = '065F46';

  const thinBorder = {
    top: { style: 'thin', color: { argb: BORDER_COLOR } },
    bottom: { style: 'thin', color: { argb: BORDER_COLOR } },
    left: { style: 'thin', color: { argb: BORDER_COLOR } },
    right: { style: 'thin', color: { argb: BORDER_COLOR } },
  };

  // ROW 2: Header Brand
  sheet.mergeCells('B2:F2');
  const titleCell = sheet.getCell('B2');
  titleCell.value = dict.brandHeader(companyName);
  titleCell.font = { name: 'Calibri', size: 10.5, bold: true, color: { argb: PRIMARY_BLUE } };
  titleCell.alignment = { vertical: 'middle' };
  sheet.getRow(2).height = 20;

  // ROW 3: Title
  sheet.mergeCells('B3:F3');
  const mainTitle = sheet.getCell('B3');
  mainTitle.value = dict.mainTitle;
  mainTitle.font = { name: 'Calibri', size: 17, bold: true, color: { argb: DARK_SLATE } };
  mainTitle.alignment = { vertical: 'middle' };
  sheet.getRow(3).height = 30;

  // ROW 4: Subtitle / Client Baseline Dossier
  sheet.mergeCells('B4:F4');
  const subTitle = sheet.getCell('B4');
  subTitle.value = dict.subTitle(name, companyName, numModelers, rateHourly);
  subTitle.font = { name: 'Calibri', size: 10, italic: true, color: { argb: '64748B' } };
  subTitle.alignment = { vertical: 'middle' };
  sheet.getRow(4).height = 20;

  // ROW 6: Section 1 Header
  sheet.mergeCells('B6:F6');
  const s1Header = sheet.getCell('B6');
  s1Header.value = dict.s1Header;
  s1Header.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  s1Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  s1Header.alignment = { vertical: 'middle', indent: 1 };
  sheet.getRow(6).height = 26;

  // Input Rows (Unlocked / User-Editable in Column C)
  const inputs = [
    { row: 7, label: dict.inputs[0].label, value: numModelers, format: '#,##0', note: dict.inputs[0].note },
    { row: 8, label: dict.inputs[1].label, value: rateHourly, format: '€#,##0.00', note: dict.inputs[1].note },
    { row: 9, label: dict.inputs[2].label, value: wastedHours, format: '0.0 "hrs"', note: dict.inputs[2].note },
    { row: 10, label: dict.inputs[3].label, value: weeksWorking, format: '#,##0', note: dict.inputs[3].note },
  ];

  inputs.forEach(inp => {
    sheet.getRow(inp.row).height = 24;
    const lCell = sheet.getCell(`B${inp.row}`);
    lCell.value = inp.label;
    lCell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: DARK_SLATE } };
    lCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_SURFACE } };
    lCell.alignment = { vertical: 'middle', indent: 1 };
    lCell.border = thinBorder;

    const vCell = sheet.getCell(`C${inp.row}`);
    vCell.value = inp.value;
    vCell.numFmt = inp.format;
    vCell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: EDITABLE_GREEN_TEXT } };
    vCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: EDITABLE_GREEN_BG } };
    vCell.alignment = { vertical: 'middle', horizontal: 'right' };
    vCell.border = thinBorder;
    vCell.protection = { locked: false };

    const c1Cell = sheet.getCell(`D${inp.row}`);
    c1Cell.value = inp.row === 7 ? "Active Engineers" : inp.row === 8 ? "Standard Billing" : inp.row === 9 ? "Repetitive Drain" : "Annual Working Wks";
    c1Cell.font = { name: 'Calibri', size: 10, italic: true, color: { argb: '64748B' } };
    c1Cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_SURFACE } };
    c1Cell.alignment = { vertical: 'middle', horizontal: 'center' };
    c1Cell.border = thinBorder;

    sheet.mergeCells(`E${inp.row}:F${inp.row}`);
    const nCell = sheet.getCell(`E${inp.row}`);
    nCell.value = inp.note;
    nCell.font = { name: 'Calibri', size: 10, italic: true, color: { argb: '64748B' } };
    nCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_SURFACE } };
    nCell.alignment = { vertical: 'middle', indent: 1 };
    nCell.border = thinBorder;
  });

  // ROW 12: Section 2 Header (TASK AUTOMATION BREAKDOWN)
  sheet.mergeCells('B12:F12');
  const s2Header = sheet.getCell('B12');
  s2Header.value = dict.s2Header;
  s2Header.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  s2Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PRIMARY_BLUE } };
  s2Header.alignment = { vertical: 'middle', indent: 1 };
  sheet.getRow(12).height = 26;

  // ROW 13: Table Column Headers
  const tableHeaders = [
    { col: 'B', label: dict.s2Cols.b, align: 'left', indent: 1 },
    { col: 'C', label: dict.s2Cols.c, align: 'center', indent: 0 },
    { col: 'D', label: dict.s2Cols.d, align: 'center', indent: 0 },
    { col: 'E', label: dict.s2Cols.e, align: 'center', indent: 0 },
    { col: 'F', label: dict.s2Cols.f, align: 'right', indent: 0 },
  ];
  sheet.getRow(13).height = 22;
  tableHeaders.forEach(th => {
    const c = sheet.getCell(`${th.col}13`);
    c.value = th.label;
    c.font = { name: 'Calibri', size: 10.5, bold: true, color: { argb: DARK_SLATE } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E2E8F0' } };
    c.alignment = { vertical: 'middle', horizontal: th.align, indent: th.indent };
    c.border = thinBorder;
  });

  // Rows 14-18: Concrete AEC Tasks & Benchmarks
  const tasks = [
    { row: 14, label: dict.tasks[0], manual: 3.5, auto: 0.5 },
    { row: 15, label: dict.tasks[1], manual: 2.5, auto: 0.3 },
    { row: 16, label: dict.tasks[2], manual: 2.0, auto: 0.2 },
    { row: 17, label: dict.tasks[3], manual: 2.0, auto: 0.4 },
    { row: 18, label: dict.tasks[4], manual: 2.0, auto: 0.4 },
  ];

  tasks.forEach(t => {
    sheet.getRow(t.row).height = 24;

    const b = sheet.getCell(`B${t.row}`);
    b.value = t.label;
    b.font = { name: 'Calibri', size: 10.5, color: { argb: DARK_SLATE } };
    b.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
    b.alignment = { vertical: 'middle', indent: 1 };
    b.border = thinBorder;

    const c = sheet.getCell(`C${t.row}`);
    c.value = t.manual;
    c.numFmt = '0.0 "hrs"';
    c.font = { name: 'Calibri', size: 10.5, color: { argb: DARK_SLATE } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
    c.border = thinBorder;

    const d = sheet.getCell(`D${t.row}`);
    d.value = t.auto;
    d.numFmt = '0.0 "hrs"';
    d.font = { name: 'Calibri', size: 10.5, color: { argb: DARK_SLATE } };
    d.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
    d.alignment = { vertical: 'middle', horizontal: 'center' };
    d.border = thinBorder;

    const e = sheet.getCell(`E${t.row}`);
    e.value = { formula: `C${t.row}-D${t.row}` };
    e.numFmt = '0.0 "hrs"';
    e.font = { name: 'Calibri', size: 10.5, bold: true, color: { argb: PRIMARY_BLUE } };
    e.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'EFF6FF' } };
    e.alignment = { vertical: 'middle', horizontal: 'center' };
    e.border = thinBorder;

    const f = sheet.getCell(`F${t.row}`);
    f.value = { formula: `E${t.row}*$C$8*$C$7` };
    f.numFmt = '€#,##0.00';
    f.font = { name: 'Calibri', size: 10.5, bold: true, color: { argb: '047857' } };
    f.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F0FDF4' } };
    f.alignment = { vertical: 'middle', horizontal: 'right' };
    f.border = thinBorder;
  });

  // ROW 19: Total Row
  sheet.getRow(19).height = 26;
  const totLabel = sheet.getCell('B19');
  totLabel.value = dict.totSavedLabel;
  totLabel.font = { name: 'Calibri', size: 11, bold: true, color: { argb: DARK_SLATE } };
  totLabel.alignment = { vertical: 'middle', indent: 1 };
  totLabel.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E2E8F0' } };
  totLabel.border = thinBorder;

  const totMan = sheet.getCell('C19');
  totMan.value = { formula: 'SUM(C14:C18)' };
  totMan.numFmt = '0.0 "hrs"';
  totMan.font = { name: 'Calibri', size: 11, bold: true, color: { argb: DARK_SLATE } };
  totMan.alignment = { vertical: 'middle', horizontal: 'center' };
  totMan.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E2E8F0' } };
  totMan.border = thinBorder;

  const totAuto = sheet.getCell('D19');
  totAuto.value = { formula: 'SUM(D14:D18)' };
  totAuto.numFmt = '0.0 "hrs"';
  totAuto.font = { name: 'Calibri', size: 11, bold: true, color: { argb: DARK_SLATE } };
  totAuto.alignment = { vertical: 'middle', horizontal: 'center' };
  totAuto.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E2E8F0' } };
  totAuto.border = thinBorder;

  const totSaved = sheet.getCell('E19');
  totSaved.value = { formula: 'SUM(E14:E18)' };
  totSaved.numFmt = '0.0 "hrs/wk"';
  totSaved.font = { name: 'Calibri', size: 11, bold: true, color: { argb: PRIMARY_BLUE } };
  totSaved.alignment = { vertical: 'middle', horizontal: 'center' };
  totSaved.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DBEAFE' } };
  totSaved.border = thinBorder;

  const totCostSaved = sheet.getCell('F19');
  totCostSaved.value = { formula: 'SUM(F14:F18)' };
  totCostSaved.numFmt = '€#,##0.00';
  totCostSaved.font = { name: 'Calibri', size: 11, bold: true, color: { argb: '047857' } };
  totCostSaved.alignment = { vertical: 'middle', horizontal: 'right' };
  totCostSaved.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D1FAE5' } };
  totCostSaved.border = thinBorder;

  // ROW 21: Section 3 Header (RANGE-BASED EXECUTIVE ROI ARCHITECTURE)
  sheet.mergeCells('B21:F21');
  const s3Header = sheet.getCell('B21');
  s3Header.value = dict.s3Header;
  s3Header.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  s3Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ACCENT_ORANGE } };
  s3Header.alignment = { vertical: 'middle', indent: 1 };
  sheet.getRow(21).height = 26;

  // Baseline Financial Metrics (Row 22-24)
  const baseOutputs = [
    { row: 22, label: dict.baseOutputs[0], formula: 'C7*C8*C9*C10', format: '€#,##0.00', color: 'DC2626', bg: 'FEF2F2', bold: true, size: 11 },
    { row: 23, label: dict.baseOutputs[1], formula: 'E19*C10*C8*C7', format: '€#,##0.00', color: '059669', bg: 'ECFDF5', bold: true, size: 11 },
    { row: 24, label: dict.baseOutputs[2], formula: 'E19*C10*C7', format: '#,##0 "hours / yr"', color: PRIMARY_BLUE, bg: LIGHT_SURFACE, bold: true, size: 11 },
  ];

  baseOutputs.forEach(out => {
    sheet.getRow(out.row).height = 24;
    sheet.mergeCells(`B${out.row}:E${out.row}`);
    const lCell = sheet.getCell(`B${out.row}`);
    lCell.value = out.label;
    lCell.font = { name: 'Calibri', size: out.size, bold: out.bold, color: { argb: DARK_SLATE } };
    lCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: out.bg } };
    lCell.alignment = { vertical: 'middle', indent: 1 };
    lCell.border = thinBorder;

    const vCell = sheet.getCell(`F${out.row}`);
    vCell.value = { formula: out.formula };
    vCell.numFmt = out.format;
    vCell.font = { name: 'Calibri', size: out.size, bold: out.bold, color: { argb: out.color } };
    vCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: out.bg } };
    vCell.alignment = { vertical: 'middle', horizontal: 'right' };
    vCell.border = thinBorder;
  });

  // ROW 26: Range-Based Scenarios Sub-header Table
  sheet.getRow(26).height = 22;
  const scenHeaders = [
    { col: 'B', label: dict.scenariosHeader.b, align: 'left', indent: 1 },
    { col: 'C', label: dict.scenariosHeader.c, align: 'center', indent: 0 },
    { col: 'D', label: dict.scenariosHeader.d, align: 'center', indent: 0 },
    { col: 'E', label: dict.scenariosHeader.e, align: 'center', indent: 0 },
    { col: 'F', label: dict.scenariosHeader.f, align: 'right', indent: 0 },
  ];
  scenHeaders.forEach(sh => {
    const c = sheet.getCell(`${sh.col}26`);
    c.value = sh.label;
    c.font = { name: 'Calibri', size: 10, bold: true, color: { argb: DARK_SLATE } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FED7AA' } };
    c.alignment = { vertical: 'middle', horizontal: sh.align, indent: sh.indent };
    c.border = thinBorder;
  });

  // Rows 28-30: Conservative, Expected, Optimized Scenarios
  const scenarios = [
    { row: 28, label: dict.scenarios[0].label, ratio: 0.50, name: dict.scenarios[0].adoption, bg: 'FFFFFF' },
    { row: 29, label: dict.scenarios[1].label, ratio: 0.75, name: dict.scenarios[1].adoption, bg: 'FFF7ED' },
    { row: 30, label: dict.scenarios[2].label, ratio: 1.00, name: dict.scenarios[2].adoption, bg: 'FFFFFF' },
  ];

  scenarios.forEach(sc => {
    sheet.getRow(sc.row).height = 24;

    const b = sheet.getCell(`B${sc.row}`);
    b.value = sc.label;
    b.font = { name: 'Calibri', size: 10.5, bold: sc.row === 29, color: { argb: DARK_SLATE } };
    b.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sc.bg } };
    b.alignment = { vertical: 'middle', indent: 1 };
    b.border = thinBorder;

    const c = sheet.getCell(`C${sc.row}`);
    c.value = sc.ratio;
    c.numFmt = '0%';
    c.font = { name: 'Calibri', size: 10.5, bold: true, color: { argb: PRIMARY_BLUE } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sc.bg } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
    c.border = thinBorder;

    const d = sheet.getCell(`D${sc.row}`);
    d.value = sc.name;
    d.font = { name: 'Calibri', size: 10, italic: true, color: { argb: '64748B' } };
    d.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sc.bg } };
    d.alignment = { vertical: 'middle', horizontal: 'center' };
    d.border = thinBorder;

    const e = sheet.getCell(`E${sc.row}`);
    e.value = { formula: `F24*C${sc.row}` };
    e.numFmt = '#,##0 "hrs"';
    e.font = { name: 'Calibri', size: 10.5, bold: true, color: { argb: PRIMARY_BLUE } };
    e.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sc.bg } };
    e.alignment = { vertical: 'middle', horizontal: 'center' };
    e.border = thinBorder;

    const f = sheet.getCell(`F${sc.row}`);
    f.value = { formula: `F23*C${sc.row}` };
    f.numFmt = '€#,##0.00';
    f.font = { name: 'Calibri', size: 10.5, bold: true, color: { argb: sc.row === 29 ? 'C2410C' : '047857' } };
    f.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sc.row === 29 ? 'FFEDD5' : sc.bg } };
    f.alignment = { vertical: 'middle', horizontal: 'right' };
    f.border = thinBorder;
  });

  // Rows 32-35: Implementation & Payback Analysis
  const finMetrics = [
    { row: 32, label: dict.finMetrics[0], formula: 'MAX(12500, C7*1850)', format: '€#,##0.00', color: DARK_SLATE, bg: LIGHT_SURFACE, bold: true, size: 10.5 },
    { row: 33, label: dict.finMetrics[1], formula: 'F29-F32', format: '€#,##0.00', color: '059669', bg: 'ECFDF5', bold: true, size: 11 },
    { row: 34, label: dict.finMetrics[2], formula: 'ROUND((F32/F29)*12, 1)', format: '0.0 "months"', color: PRIMARY_BLUE, bg: LIGHT_SURFACE, bold: true, size: 10.5 },
    { row: 35, label: dict.finMetrics[3], formula: '(F33/F32)', format: '0.0%', color: 'C2410C', bg: 'FFF7ED', bold: true, size: 11.5 },
  ];

  finMetrics.forEach(fm => {
    sheet.getRow(fm.row).height = 24;
    sheet.mergeCells(`B${fm.row}:E${fm.row}`);
    const lCell = sheet.getCell(`B${fm.row}`);
    lCell.value = fm.label;
    lCell.font = { name: 'Calibri', size: fm.size, bold: fm.bold, color: { argb: DARK_SLATE } };
    lCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fm.bg } };
    lCell.alignment = { vertical: 'middle', indent: 1 };
    lCell.border = thinBorder;

    const vCell = sheet.getCell(`F${fm.row}`);
    vCell.value = { formula: fm.formula };
    vCell.numFmt = fm.format;
    vCell.font = { name: 'Calibri', size: fm.size, bold: true, color: { argb: fm.color } };
    vCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fm.bg } };
    vCell.alignment = { vertical: 'middle', horizontal: 'right' };
    vCell.border = thinBorder;
  });

  // ROW 36: Five-Year Cumulative Value Header
  sheet.mergeCells('B36:F36');
  const s3Sub2 = sheet.getCell('B36');
  s3Sub2.value = dict.cumHeader;
  s3Sub2.font = { name: 'Calibri', size: 10.5, bold: true, color: { argb: DARK_SLATE } };
  s3Sub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E2E8F0' } };
  s3Sub2.alignment = { vertical: 'middle', indent: 1 };
  sheet.getRow(36).height = 22;

  // Rows 37-38: 5-Year Compounded Values
  const cumMetrics = [
    { row: 37, label: dict.cumMetrics[0], formula: '(F29*5)-(F32*1.4)', format: '€#,##0.00', color: '059669', bg: 'D1FAE5' },
    { row: 38, label: dict.cumMetrics[1], formula: 'E29*5', format: '#,##0 "hours liberated"', color: PRIMARY_BLUE, bg: 'DBEAFE' },
  ];

  cumMetrics.forEach(cm => {
    sheet.getRow(cm.row).height = 24;
    sheet.mergeCells(`B${cm.row}:E${cm.row}`);
    const lCell = sheet.getCell(`B${cm.row}`);
    lCell.value = cm.label;
    lCell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: DARK_SLATE } };
    lCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cm.bg } };
    lCell.alignment = { vertical: 'middle', indent: 1 };
    lCell.border = thinBorder;

    const vCell = sheet.getCell(`F${cm.row}`);
    vCell.value = { formula: cm.formula };
    vCell.numFmt = cm.format;
    vCell.font = { name: 'Calibri', size: 11.5, bold: true, color: { argb: cm.color } };
    vCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cm.bg } };
    vCell.alignment = { vertical: 'middle', horizontal: 'right' };
    vCell.border = thinBorder;
  });

  // ROW 40: Section 4 Header (STANDARDS & SOVEREIGNTY)
  sheet.mergeCells('B40:F40');
  const s4Header = sheet.getCell('B40');
  s4Header.value = dict.s4Header;
  s4Header.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '047857' } };
  s4Header.alignment = { vertical: 'middle', indent: 1 };
  sheet.getRow(40).height = 26;

  // Compliance Footnotes (Rows 41-43)
  const compliance = [
    { row: 41, label: dict.complianceItems[0].label, val: dict.complianceItems[0].val },
    { row: 42, label: dict.complianceItems[1].label, val: dict.complianceItems[1].val },
    { row: 43, label: dict.complianceItems[2].label, val: dict.complianceItems[2].val },
  ];

  compliance.forEach(comp => {
    sheet.getRow(comp.row).height = 22;
    const l = sheet.getCell(`B${comp.row}`);
    l.value = comp.label;
    l.font = { name: 'Calibri', size: 10, bold: true, color: { argb: '065F46' } };
    l.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F0FDF4' } };
    l.alignment = { vertical: 'middle', indent: 1 };
    l.border = thinBorder;

    sheet.mergeCells(`C${comp.row}:F${comp.row}`);
    const v = sheet.getCell(`C${comp.row}`);
    v.value = comp.val;
    v.font = { name: 'Calibri', size: 10, italic: true, color: { argb: DARK_SLATE } };
    v.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F0FDF4' } };
    v.alignment = { vertical: 'middle', indent: 1 };
    v.border = thinBorder;
  });

  // Sheet Protection: Unlock green inputs C7:C10, protect everything else
  sheet.protect('', {
    selectLockedCells: true,
    selectUnlockedCells: true,
    formatCells: false,
    formatColumns: false,
    formatRows: false,
    insertColumns: false,
    insertRows: false,
    insertHyperlinks: false,
    deleteColumns: false,
    deleteRows: false,
    sort: false,
    autoFilter: false,
    pivotTables: false
  });

  return sheet;
}

async function buildHybridRoiWorkbook(options = {}) {
  const { language = 'en' } = options;

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'pyBIM SRLS';
  workbook.lastModifiedBy = 'pyBIM Algorithmic Engine';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.views = [
    {
      x: 0, y: 0, width: 10000, height: 20000,
      firstSheet: 0, activeTab: 0, visibility: 'visible'
    }
  ];

  // Determine Tab Order based on User's current website language
  // The user's language comes FIRST and is set as active (tabSelected: true)
  let orderedLanguages = ['en', 'it', 'de'];
  if (language === 'it') {
    orderedLanguages = ['it', 'en', 'de'];
  } else if (language === 'de') {
    orderedLanguages = ['de', 'en', 'it'];
  }

  orderedLanguages.forEach((langKey, index) => {
    const isFirstActive = index === 0;
    buildLanguageSheet(workbook, langKey, options, isFirstActive);
  });

  return workbook;
}

module.exports = {
  buildHybridRoiWorkbook,
  I18N_SHEETS
};
