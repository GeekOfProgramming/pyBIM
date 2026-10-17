/**
 * pyBIM ROI-02 Workbook Generator
 *
 * Constructs a professional, protected, English-only .xlsx workbook
 * containing exactly four purpose-built worksheets:
 * 1. Executive Summary
 * 2. Workflow Inputs (unlocked user inputs with validation & styling)
 * 3. AI Adoption Scenarios (native Excel formulas & cached engine outputs)
 * 4. Assumptions & Sources (clickable Autodesk links & governance disclosures)
 *
 * Implements:
 * - Real interconnected native Excel formulas with cached initial results.
 * - fullCalcOnLoad = true for instant recalculation in Microsoft Excel, LibreOffice, and Google Sheets.
 * - ExcelJS cell-level and worksheet-level protection (unlocked inputs vs locked formulas/constants).
 * - Formula-injection defense (CWE-1236).
 * - Clean pyBIM engineering visual identity, consistent number formats, and print properties.
 */

import {
  AUTODESK_REFERENCE_HOURS_PER_WEEK,
  HUMAN_VERIFICATION_RATE,
  DEFAULT_CONSULTING_RATE,
  DEFAULT_WORKING_WEEKS,
  AUTODESK_CITATION,
  AI_ADOPTION_SCENARIOS,
  calculateRoiPreview,
} from "./roiSchema.js";

/**
 * Sanitizes user-provided text to prevent CSV/Spreadsheet Formula Injection (CWE-1236).
 * Prepends a single quote to strings starting with '=', '+', '-', '@', '\t', or '\r'.
 *
 * @param {string} val
 * @returns {string}
 */
export function sanitizeSpreadsheetText(val) {
  if (typeof val !== "string") return val == null ? "" : String(val);
  const trimmed = val.trim();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}

// Brand Color Palette (pyBIM Slate & Blue Engineering Theme)
const COLORS = {
  HEADER_DARK_BG: "FF0F172A",       // Slate 900
  HEADER_DARK_TEXT: "FFFFFFFF",     // Pure White
  ACCENT_BLUE_BG: "FF1E3A8A",       // Deep Indigo/Blue 900
  ACCENT_BLUE_TEXT: "FFFFFFFF",     // White
  UNLOCKED_INPUT_FILL: "FFFEF3C7",  // Light Gold/Amber Highlight (Warm Editable)
  UNLOCKED_INPUT_BORDER: "FFD97706",// Amber 600 Border
  LOCKED_INPUT_FILL: "FFF1F5F9",    // Slate 100 Neutral
  TABLE_HEADER_BG: "FF1E293B",      // Slate 800
  TABLE_HEADER_TEXT: "FFFFFFFF",    // White
  ZEBRA_ROW_FILL: "FFF8FAFC",       // Slate 50
  TOTAL_ROW_FILL: "FFE2E8F0",       // Slate 200
  BORDER_LIGHT: "FFE2E8F0",         // Slate 200
  BORDER_DARK: "FF334155",          // Slate 700
  HYPERLINK_BLUE: "FF2563EB",       // Blue 600
  TEXT_MUTED: "FF64748B",           // Slate 500
};

// Common Styles
const FONT_BASE = { name: "Calibri", size: 11 };
const FONT_TITLE = { name: "Calibri", size: 16, bold: true, color: { argb: COLORS.HEADER_DARK_TEXT } };
const FONT_SUBTITLE = { name: "Calibri", size: 10, italic: true, color: { argb: "FFE2E8F0" } };
const FONT_SECTION_HEADER = { name: "Calibri", size: 12, bold: true, color: { argb: COLORS.TABLE_HEADER_TEXT } };
const FONT_TABLE_HEADER = { name: "Calibri", size: 10, bold: true, color: { argb: COLORS.TABLE_HEADER_TEXT } };
const FONT_BOLD = { name: "Calibri", size: 11, bold: true };
const FONT_EDITABLE = { name: "Calibri", size: 11, bold: true, color: { argb: "FF0F172A" } };

const THIN_BORDER = {
  top: { style: "thin", color: { argb: COLORS.BORDER_LIGHT } },
  left: { style: "thin", color: { argb: COLORS.BORDER_LIGHT } },
  bottom: { style: "thin", color: { argb: COLORS.BORDER_LIGHT } },
  right: { style: "thin", color: { argb: COLORS.BORDER_LIGHT } },
};

const EDITABLE_BORDER = {
  top: { style: "medium", color: { argb: COLORS.UNLOCKED_INPUT_BORDER } },
  left: { style: "medium", color: { argb: COLORS.UNLOCKED_INPUT_BORDER } },
  bottom: { style: "medium", color: { argb: COLORS.UNLOCKED_INPUT_BORDER } },
  right: { style: "medium", color: { argb: COLORS.UNLOCKED_INPUT_BORDER } },
};

/**
 * Builds the complete 4-worksheet pyBIM ROI Excel Workbook using ExcelJS.
 *
 * @param {object} ExcelJS The ExcelJS library instance (imported or passed in)
 * @param {object} params
 * @param {string} [params.userName] Client contact name
 * @param {string} [params.companyName] Client firm / company name
 * @param {string} [params.referenceId] Non-persistent session verification reference
 * @param {number} [params.modelerCount=5] Number of BIM professionals (unlocked input)
 * @param {number} [params.hourlyRate=85] Effective hourly rate (€/h) (unlocked input)
 * @param {boolean} [params.isRateCustom=false] Whether hourly rate was customer-supplied
 * @param {string} [params.rateType='consulting'] 'consulting' or 'internal_labor'
 * @param {number} [params.workingWeeks=48] Effective working weeks per year (unlocked input)
 * @param {boolean} [params.useAdvanced=false] Whether advanced assessment inputs were provided
 * @param {object} [params.advancedAssessment] Optional diagnostic category breakdown
 * @returns {Promise<object>} Constructed ExcelJS Workbook
 */
export async function buildRoiWorkbook(ExcelJS, params = {}) {
  const {
    userName = "Enterprise Lead",
    companyName = "AEC Engineering Practice",
    referenceId = `ROI-SESS-${new Date().getFullYear()}-EXPORT`,
    modelerCount = 5,
    hourlyRate = DEFAULT_CONSULTING_RATE,
    isRateCustom = false,
    rateType = "consulting",
    workingWeeks = DEFAULT_WORKING_WEEKS,
    useAdvanced = false,
    advancedAssessment = null
  } = params;

  // Sanitize user inputs for spreadsheet display
  const safeClientName = sanitizeSpreadsheetText(userName);
  const safeCompanyName = sanitizeSpreadsheetText(companyName);
  const safeReferenceId = sanitizeSpreadsheetText(referenceId);

  // Validate initial numerical inputs
  const initialN = Number.isInteger(Number(modelerCount)) && Number(modelerCount) >= 1 && Number(modelerCount) <= 500
    ? Number(modelerCount)
    : 5;
  const initialR = Number(hourlyRate) > 0 && Number(hourlyRate) <= 2000
    ? Number(hourlyRate)
    : DEFAULT_CONSULTING_RATE;
  const initialW = Number.isInteger(Number(workingWeeks)) && Number(workingWeeks) >= 1 && Number(workingWeeks) <= 52
    ? Number(workingWeeks)
    : DEFAULT_WORKING_WEEKS;

  // Compute reference calculation results via shared calculation engine for initial cached results
  const preview = calculateRoiPreview({
    quickEstimate: {
      modelerCount: initialN,
      hourlyRate: initialR,
      workingWeeks: initialW,
      rateType,
      isRateCustom
    },
    useAdvanced,
    advancedAssessment
  });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "pyBIM Automation Lab (https://pybim.com)";
  workbook.lastModifiedBy = "pyBIM Executive ROI Engine";
  workbook.created = new Date();
  workbook.modified = new Date();

  // Ensure formulas recalculate on open in Excel and compatible spreadsheet viewers
  workbook.calcProperties.fullCalcOnLoad = true;

  // =========================================================================
  // WORKSHEET 1: Executive Summary
  // =========================================================================
  const wsExec = workbook.addWorksheet("Executive Summary", {
    views: [{ showGridLines: true }],
    pageSetup: { fitToPage: true, fitToWidth: 1, fitToHeight: 0, orientation: "portrait" }
  });

  // Set column widths
  wsExec.columns = [
    { width: 4 },   // A (spacer)
    { width: 38 },  // B (Description / Metric)
    { width: 22 },  // C (Value / Ratio)
    { width: 24 },  // D (Unit / Detail)
    { width: 26 },  // E (Hours)
    { width: 28 },  // F (Valuation)
  ];

  // Title Block
  wsExec.mergeCells("B2:F2");
  const execTitleCell = wsExec.getCell("B2");
  execTitleCell.value = "pyBIM | BIM AUTOMATION ROI & CAPACITY VALUATION";
  execTitleCell.font = FONT_TITLE;
  execTitleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.HEADER_DARK_BG } };
  execTitleCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsExec.getRow(2).height = 36;

  wsExec.mergeCells("B3:F3");
  const execSubCell = wsExec.getCell("B3");
  execSubCell.value = `Client: ${safeClientName} (${safeCompanyName}) | Reference: ${safeReferenceId} | Model: ISO 19650 Architecture`;
  execSubCell.font = FONT_SUBTITLE;
  execSubCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.HEADER_DARK_BG } };
  execSubCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
  wsExec.getRow(3).height = 20;

  // Banner Notice
  wsExec.mergeCells("B4:F4");
  const execNoticeCell = wsExec.getCell("B4");
  execNoticeCell.value = "Illustrative Planning Model • Autodesk 13h Reference • 10% Engineering Verification Allowance Retained";
  execNoticeCell.font = { name: "Calibri", size: 9, bold: true, color: { argb: "FF1E3A8A" } };
  execNoticeCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFE" } };
  execNoticeCell.alignment = { vertical: "middle", horizontal: "center" };
  wsExec.getRow(4).height = 22;

  // Section 1 Header: Operational Variables
  wsExec.mergeCells("B6:F6");
  const s1Header = wsExec.getCell("B6");
  s1Header.value = "1. OPERATIONAL BASELINE PARAMETERS (LINKED TO WORKFLOW INPUTS)";
  s1Header.font = FONT_SECTION_HEADER;
  s1Header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.TABLE_HEADER_BG } };
  s1Header.alignment = { vertical: "middle", indent: 1 };
  wsExec.getRow(6).height = 26;

  const execInputs = [
    { row: 7, label: "Number of BIM Professionals (Team Size):", formula: "='Workflow Inputs'!$C$5", result: initialN, format: "#,##0", unit: "Engineers / Modelers" },
    { row: 8, label: "Rate Classification:", formula: "='Workflow Inputs'!$C$6", result: rateType === "internal_labor" ? "Internal Loaded Labor Cost" : "Illustrative Consulting Rate", format: "@", unit: "Valuation Basis" },
    { row: 9, label: "Effective Hourly Valuation Rate:", formula: "='Workflow Inputs'!$C$7", result: initialR, format: "€#,##0.00", unit: "€ / hour" },
    { row: 10, label: "Effective Working Weeks / Year:", formula: "='Workflow Inputs'!$C$8", result: initialW, format: "#,##0", unit: "Weeks / year" },
    { row: 11, label: "Autodesk Sourced Benchmark (Finding Data):", formula: "='Workflow Inputs'!$C$9", result: AUTODESK_REFERENCE_HOURS_PER_WEEK, format: "0.0", unit: "hrs / person / week (Fixed)" },
    { row: 12, label: "Engineering Verification Allowance:", formula: "='Workflow Inputs'!$C$10", result: HUMAN_VERIFICATION_RATE, format: "0.0%", unit: "10% Retained for QC (Fixed)" },
  ];

  for (const item of execInputs) {
    wsExec.getCell(`B${item.row}`).value = item.label;
    wsExec.getCell(`B${item.row}`).font = FONT_BASE;
    wsExec.getCell(`B${item.row}`).border = THIN_BORDER;

    const valCell = wsExec.getCell(`C${item.row}`);
    valCell.value = { formula: item.formula, result: item.result };
    valCell.numFmt = item.format;
    valCell.font = FONT_BOLD;
    valCell.alignment = { horizontal: "right" };
    valCell.border = THIN_BORDER;

    wsExec.mergeCells(`D${item.row}:F${item.row}`);
    const unitCell = wsExec.getCell(`D${item.row}`);
    unitCell.value = item.unit;
    unitCell.font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
    unitCell.border = THIN_BORDER;
    wsExec.getRow(item.row).height = 20;
  }

  // Section 2 Header: Five Fixed AI Adoption Scenarios Summary
  wsExec.mergeCells("B14:F14");
  const s2Header = wsExec.getCell("B14");
  s2Header.value = "2. FIVE AI ADOPTION SCENARIOS (ANNUAL CAPACITY & VALUE COMPARISON)";
  s2Header.font = FONT_SECTION_HEADER;
  s2Header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.TABLE_HEADER_BG } };
  s2Header.alignment = { vertical: "middle", indent: 1 };
  wsExec.getRow(14).height = 26;

  // Table Headers
  const execTableHeaders = [
    { col: "B", text: "AI Workflow Adoption Scenario" },
    { col: "C", text: "Adoption Ratio" },
    { col: "D", text: "Net Recovered / Person" },
    { col: "E", text: "Annual Team Hours" },
    { col: "F", text: "Illustrative Capacity Value" }
  ];
  for (const th of execTableHeaders) {
    const c = wsExec.getCell(`${th.col}15`);
    c.value = th.text;
    c.font = FONT_TABLE_HEADER;
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF334155" } };
    c.alignment = { vertical: "middle", horizontal: th.col === "B" ? "left" : "right" };
    c.border = THIN_BORDER;
  }
  wsExec.getRow(15).height = 24;

  const scenarioRowsExec = [
    { row: 16, scKey: "scenario_20", label: "Scenario 1 (Initial Adoption)", targetRow: 11 },
    { row: 17, scKey: "scenario_40", label: "Scenario 2 (Expanding Adoption)", targetRow: 12 },
    { row: 18, scKey: "scenario_60", label: "Scenario 3 (Established Adoption)", targetRow: 13 },
    { row: 19, scKey: "scenario_80", label: "Scenario 4 (Advanced Integration)", targetRow: 14 },
    { row: 20, scKey: "scenario_100", label: "Scenario 5 (Full Workflow Coverage)", targetRow: 15 },
  ];

  for (const sc of scenarioRowsExec) {
    const p = preview.scenarios[sc.scKey];

    const labelCell = wsExec.getCell(`B${sc.row}`);
    labelCell.value = sc.label;
    labelCell.font = FONT_BOLD;
    labelCell.border = THIN_BORDER;

    const ratioCell = wsExec.getCell(`C${sc.row}`);
    ratioCell.value = { formula: `='AI Adoption Scenarios'!$B$${sc.targetRow}`, result: p.adoptionRate };
    ratioCell.numFmt = "0%";
    ratioCell.font = FONT_BASE;
    ratioCell.alignment = { horizontal: "right" };
    ratioCell.border = THIN_BORDER;

    const weeklyCell = wsExec.getCell(`D${sc.row}`);
    weeklyCell.value = { formula: `='AI Adoption Scenarios'!$F$${sc.targetRow}`, result: p.weeklyRecoveredHoursPerPerson };
    weeklyCell.numFmt = "#,##0.0 \"hrs/wk\"";
    weeklyCell.font = FONT_BASE;
    weeklyCell.alignment = { horizontal: "right" };
    weeklyCell.border = THIN_BORDER;

    const annualCell = wsExec.getCell(`E${sc.row}`);
    annualCell.value = { formula: `='AI Adoption Scenarios'!$H$${sc.targetRow}`, result: p.annualRecoveredHours };
    annualCell.numFmt = "#,##0.0 \"hrs/yr\"";
    annualCell.font = FONT_BOLD;
    annualCell.alignment = { horizontal: "right" };
    annualCell.border = THIN_BORDER;

    const valCell = wsExec.getCell(`F${sc.row}`);
    valCell.value = { formula: `='AI Adoption Scenarios'!$I$${sc.targetRow}`, result: p.annualIllustrativeValue };
    valCell.numFmt = "€#,##0";
    valCell.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FF047857" } };
    valCell.alignment = { horizontal: "right" };
    valCell.border = THIN_BORDER;

    wsExec.getRow(sc.row).height = 22;
  }

  // Section 3: Takeaway & Governance Note
  wsExec.mergeCells("B22:F22");
  const s3Header = wsExec.getCell("B22");
  s3Header.value = "3. GOVERNANCE PRINCIPLES & DYNAMIC RECALCULATION NOTICE";
  s3Header.font = FONT_SECTION_HEADER;
  s3Header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.TABLE_HEADER_BG } };
  s3Header.alignment = { vertical: "middle", indent: 1 };
  wsExec.getRow(22).height = 26;

  const takeawayNotes = [
    "• To simulate your organization's specific profile, edit the highlighted yellow cells on the 'Workflow Inputs' sheet.",
    "• All outputs across this Executive Summary and 'AI Adoption Scenarios' update automatically via native Excel formulas.",
    "• At 100% AI adoption, the model retains 10% (312 team hours in the baseline case) for human verification and quality control.",
    "• Illustrative Capacity Value reflects capacity valuation at billing potential or loaded cost; it is not guaranteed profit or cash savings."
  ];

  takeawayNotes.forEach((note, idx) => {
    const r = 23 + idx;
    wsExec.mergeCells(`B${r}:F${r}`);
    const cell = wsExec.getCell(`B${r}`);
    cell.value = note;
    cell.font = { name: "Calibri", size: 10, color: { argb: "FF334155" } };
    cell.alignment = { vertical: "middle" };
    wsExec.getRow(r).height = 19;
  });

  // Protect Executive Summary (all cells locked)
  await wsExec.protect("pybim-exec-2025", {
    selectLockedCells: true,
    selectUnlockedCells: true
  });

  // =========================================================================
  // WORKSHEET 2: Workflow Inputs (Customer-Editable Sheet)
  // =========================================================================
  const wsInputs = workbook.addWorksheet("Workflow Inputs", {
    views: [{ showGridLines: true }],
    pageSetup: { fitToPage: true, fitToWidth: 1, fitToHeight: 0, orientation: "portrait" }
  });

  wsInputs.columns = [
    { width: 4 },   // A (spacer)
    { width: 38 },  // B (Parameter Name)
    { width: 22 },  // C (Value - EDITABLE CELLS C5, C7, C8)
    { width: 22 },  // D (Unit)
    { width: 22 },  // E (Cell Protection Status)
    { width: 36 },  // F (Governance Guidance & Rule)
  ];

  // Header Banner
  wsInputs.mergeCells("B2:F2");
  const inputsTitleCell = wsInputs.getCell("B2");
  inputsTitleCell.value = "pyBIM | WORKFLOW INPUTS & BASELINE VARIABLES";
  inputsTitleCell.font = FONT_TITLE;
  inputsTitleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.HEADER_DARK_BG } };
  inputsTitleCell.alignment = { vertical: "middle", indent: 1 };
  wsInputs.getRow(2).height = 34;

  // Guidance Instruction Banner for Unlocked Inputs
  wsInputs.mergeCells("B3:F3");
  const bannerCell = wsInputs.getCell("B3");
  bannerCell.value = "Editable input — replace this value with your organization's actual data. Calculations update automatically.";
  bannerCell.font = { name: "Calibri", size: 10, bold: true, color: { argb: "FF92400E" } };
  bannerCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.UNLOCKED_INPUT_FILL } };
  bannerCell.alignment = { vertical: "middle", horizontal: "center" };
  bannerCell.border = EDITABLE_BORDER;
  wsInputs.getRow(3).height = 26;

  // Table Header
  const inputColHeaders = [
    { col: "B", text: "Model Parameter" },
    { col: "C", text: "Value" },
    { col: "D", text: "Unit / Format" },
    { col: "E", text: "Protection Status" },
    { col: "F", text: "Governance Guidance" }
  ];
  for (const th of inputColHeaders) {
    const c = wsInputs.getCell(`${th.col}4`);
    c.value = th.text;
    c.font = FONT_TABLE_HEADER;
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.TABLE_HEADER_BG } };
    c.alignment = { vertical: "middle", horizontal: th.col === "B" || th.col === "F" ? "left" : "center" };
    c.border = THIN_BORDER;
  }
  wsInputs.getRow(4).height = 24;

  // Row 5: Modeler Count (UNLOCKED)
  wsInputs.getCell("B5").value = "Number of BIM Professionals (Team Size)";
  wsInputs.getCell("B5").font = FONT_BOLD;
  wsInputs.getCell("B5").border = THIN_BORDER;

  const cellC5 = wsInputs.getCell("C5");
  cellC5.value = initialN;
  cellC5.numFmt = "#,##0";
  cellC5.font = FONT_EDITABLE;
  cellC5.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.UNLOCKED_INPUT_FILL } };
  cellC5.border = EDITABLE_BORDER;
  cellC5.alignment = { horizontal: "right" };
  cellC5.protection = { locked: false }; // UNLOCKED
  cellC5.dataValidation = {
    type: "whole",
    operator: "between",
    allowBlank: false,
    showErrorMessage: true,
    errorTitle: "Invalid Team Size",
    error: "Number of BIM professionals must be an integer between 1 and 500.",
    formulae: [1, 500]
  };

  wsInputs.getCell("D5").value = "Engineers / Modelers";
  wsInputs.getCell("D5").font = FONT_BASE;
  wsInputs.getCell("D5").border = THIN_BORDER;

  wsInputs.getCell("E5").value = "UNLOCKED (Customer Input)";
  wsInputs.getCell("E5").font = { name: "Calibri", size: 10, bold: true, color: { argb: "FFB45309" } };
  wsInputs.getCell("E5").border = THIN_BORDER;

  wsInputs.getCell("F5").value = "Active full-time equivalent BIM engineers in team (1 to 500).";
  wsInputs.getCell("F5").font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
  wsInputs.getCell("F5").border = THIN_BORDER;
  wsInputs.getRow(5).height = 24;

  // Row 6: Rate Classification (LOCKED)
  wsInputs.getCell("B6").value = "Rate Classification";
  wsInputs.getCell("B6").font = FONT_BASE;
  wsInputs.getCell("B6").border = THIN_BORDER;

  const cellC6 = wsInputs.getCell("C6");
  cellC6.value = rateType === "internal_labor" ? "Internal Loaded Labor Cost" : "Illustrative Consulting Rate";
  cellC6.font = FONT_BASE;
  cellC6.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.LOCKED_INPUT_FILL } };
  cellC6.border = THIN_BORDER;
  cellC6.alignment = { horizontal: "center" };
  cellC6.protection = { locked: true };

  wsInputs.getCell("D6").value = "Category Basis";
  wsInputs.getCell("D6").font = FONT_BASE;
  wsInputs.getCell("D6").border = THIN_BORDER;

  wsInputs.getCell("E6").value = "LOCKED (Fixed by Type)";
  wsInputs.getCell("E6").font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
  wsInputs.getCell("E6").border = THIN_BORDER;

  wsInputs.getCell("F6").value = "Defines whether capacity value measures billing potential or labor payroll cost.";
  wsInputs.getCell("F6").font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
  wsInputs.getCell("F6").border = THIN_BORDER;
  wsInputs.getRow(6).height = 22;

  // Row 7: Effective Hourly Rate (UNLOCKED)
  wsInputs.getCell("B7").value = "Effective Hourly Valuation Rate";
  wsInputs.getCell("B7").font = FONT_BOLD;
  wsInputs.getCell("B7").border = THIN_BORDER;

  const cellC7 = wsInputs.getCell("C7");
  cellC7.value = initialR;
  cellC7.numFmt = "€#,##0.00";
  cellC7.font = FONT_EDITABLE;
  cellC7.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.UNLOCKED_INPUT_FILL } };
  cellC7.border = EDITABLE_BORDER;
  cellC7.alignment = { horizontal: "right" };
  cellC7.protection = { locked: false }; // UNLOCKED
  cellC7.dataValidation = {
    type: "decimal",
    operator: "between",
    allowBlank: false,
    showErrorMessage: true,
    errorTitle: "Invalid Hourly Rate",
    error: "Hourly rate must be a positive number up to €2,000/hour.",
    formulae: [0.01, 2000]
  };

  wsInputs.getCell("D7").value = "€ / hour";
  wsInputs.getCell("D7").font = FONT_BASE;
  wsInputs.getCell("D7").border = THIN_BORDER;

  wsInputs.getCell("E7").value = "UNLOCKED (Customer Input)";
  wsInputs.getCell("E7").font = { name: "Calibri", size: 10, bold: true, color: { argb: "FFB45309" } };
  wsInputs.getCell("E7").border = THIN_BORDER;

  wsInputs.getCell("F7").value = isRateCustom
    ? "Customer-entered custom hourly rate."
    : "Default €85/h illustrative consulting baseline. Replace with actual firm rate.";
  wsInputs.getCell("F7").font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
  wsInputs.getCell("F7").border = THIN_BORDER;
  wsInputs.getRow(7).height = 24;

  // Row 8: Working Weeks / Year (UNLOCKED)
  wsInputs.getCell("B8").value = "Effective Working Weeks / Year";
  wsInputs.getCell("B8").font = FONT_BOLD;
  wsInputs.getCell("B8").border = THIN_BORDER;

  const cellC8 = wsInputs.getCell("C8");
  cellC8.value = initialW;
  cellC8.numFmt = "#,##0";
  cellC8.font = FONT_EDITABLE;
  cellC8.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.UNLOCKED_INPUT_FILL } };
  cellC8.border = EDITABLE_BORDER;
  cellC8.alignment = { horizontal: "right" };
  cellC8.protection = { locked: false }; // UNLOCKED
  cellC8.dataValidation = {
    type: "whole",
    operator: "between",
    allowBlank: false,
    showErrorMessage: true,
    errorTitle: "Invalid Working Weeks",
    error: "Working weeks per year must be an integer between 1 and 52.",
    formulae: [1, 52]
  };

  wsInputs.getCell("D8").value = "Weeks / year";
  wsInputs.getCell("D8").font = FONT_BASE;
  wsInputs.getCell("D8").border = THIN_BORDER;

  wsInputs.getCell("E8").value = "UNLOCKED (Customer Input)";
  wsInputs.getCell("E8").font = { name: "Calibri", size: 10, bold: true, color: { argb: "FFB45309" } };
  wsInputs.getCell("E8").border = THIN_BORDER;

  wsInputs.getCell("F8").value = "Annual working weeks excluding holidays and statutory leave (typically 46–48).";
  wsInputs.getCell("F8").font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
  wsInputs.getCell("F8").border = THIN_BORDER;
  wsInputs.getRow(8).height = 24;

  // Row 9: Autodesk Benchmark (LOCKED)
  wsInputs.getCell("B9").value = "Autodesk Benchmark Weekly Search Hours";
  wsInputs.getCell("B9").font = FONT_BASE;
  wsInputs.getCell("B9").border = THIN_BORDER;

  const cellC9 = wsInputs.getCell("C9");
  cellC9.value = AUTODESK_REFERENCE_HOURS_PER_WEEK; // 13
  cellC9.numFmt = "0.0";
  cellC9.font = FONT_BOLD;
  cellC9.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.LOCKED_INPUT_FILL } };
  cellC9.border = THIN_BORDER;
  cellC9.alignment = { horizontal: "right" };
  cellC9.protection = { locked: true };

  wsInputs.getCell("D9").value = "Hours / person / week";
  wsInputs.getCell("D9").font = FONT_BASE;
  wsInputs.getCell("D9").border = THIN_BORDER;

  wsInputs.getCell("E9").value = "LOCKED (Fixed Benchmark)";
  wsInputs.getCell("E9").font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
  wsInputs.getCell("E9").border = THIN_BORDER;

  wsInputs.getCell("F9").value = "Fixed 13 hrs/wk finding project data. Sourced from Autodesk 2025 study.";
  wsInputs.getCell("F9").font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
  wsInputs.getCell("F9").border = THIN_BORDER;
  wsInputs.getRow(9).height = 22;

  // Row 10: Human Verification Allowance (LOCKED)
  wsInputs.getCell("B10").value = "Engineering Verification Allowance";
  wsInputs.getCell("B10").font = FONT_BASE;
  wsInputs.getCell("B10").border = THIN_BORDER;

  const cellC10 = wsInputs.getCell("C10");
  cellC10.value = HUMAN_VERIFICATION_RATE; // 0.10
  cellC10.numFmt = "0.0%";
  cellC10.font = FONT_BOLD;
  cellC10.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.LOCKED_INPUT_FILL } };
  cellC10.border = THIN_BORDER;
  cellC10.alignment = { horizontal: "right" };
  cellC10.protection = { locked: true };

  wsInputs.getCell("D10").value = "Ratio of covered hours";
  wsInputs.getCell("D10").font = FONT_BASE;
  wsInputs.getCell("D10").border = THIN_BORDER;

  wsInputs.getCell("E10").value = "LOCKED (Fixed Assumption)";
  wsInputs.getCell("E10").font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
  wsInputs.getCell("E10").border = THIN_BORDER;

  wsInputs.getCell("F10").value = "Fixed 10% allowance retained across all scenarios for engineering quality control.";
  wsInputs.getCell("F10").font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
  wsInputs.getCell("F10").border = THIN_BORDER;
  wsInputs.getRow(10).height = 22;

  // Protect Workflow Inputs worksheet, leaving C5, C7, C8 selectable and editable
  await wsInputs.protect("pybim-inputs-2025", {
    selectLockedCells: true,
    selectUnlockedCells: true,
    formatCells: false,
    formatColumns: false,
    formatRows: false
  });

  // =========================================================================
  // WORKSHEET 3: AI Adoption Scenarios (Calculation Engine & Formulas)
  // =========================================================================
  const wsScenarios = workbook.addWorksheet("AI Adoption Scenarios", {
    views: [{ showGridLines: true }],
    pageSetup: { fitToPage: true, fitToWidth: 1, fitToHeight: 0, orientation: "landscape" }
  });

  wsScenarios.columns = [
    { width: 4 },   // A (spacer)
    { width: 14 },  // B (Adoption Ratio A)
    { width: 32 },  // C (Scenario Title)
    { width: 22 },  // D (AI Covered Weekly Hrs)
    { width: 24 },  // E (Review Retained Weekly Hrs)
    { width: 24 },  // F (Net Recovered Weekly Hrs)
    { width: 24 },  // G (Remaining Baseline Hrs)
    { width: 26 },  // H (Annual Team Recovered Hours)
    { width: 28 },  // I (Annual Illustrative Capacity Value)
  ];

  // Title Block
  wsScenarios.mergeCells("B2:I2");
  const scTitle = wsScenarios.getCell("B2");
  scTitle.value = "pyBIM | FIVE FIXED AI ADOPTION SCENARIOS (MATHEMATICAL MODEL)";
  scTitle.font = FONT_TITLE;
  scTitle.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.HEADER_DARK_BG } };
  scTitle.alignment = { vertical: "middle", indent: 1 };
  wsScenarios.getRow(2).height = 34;

  // Reference Parameter Link Block (Rows 4-8)
  const scParams = [
    { row: 4, label: "Autodesk Benchmark Weekly Hours (B):", formula: "='Workflow Inputs'!$C$9", result: AUTODESK_REFERENCE_HOURS_PER_WEEK, fmt: "0.0", unit: "hrs/person/week" },
    { row: 5, label: "Engineering Verification Allowance (V):", formula: "='Workflow Inputs'!$C$10", result: HUMAN_VERIFICATION_RATE, fmt: "0.0%", unit: "10% QC allowance" },
    { row: 6, label: "Active Team Size (N):", formula: "='Workflow Inputs'!$C$5", result: initialN, fmt: "#,##0", unit: "Engineers" },
    { row: 7, label: "Working Weeks / Year (W):", formula: "='Workflow Inputs'!$C$8", result: initialW, fmt: "#,##0", unit: "Weeks" },
    { row: 8, label: "Effective Hourly Valuation Rate (R):", formula: "='Workflow Inputs'!$C$7", result: initialR, fmt: "€#,##0.00", unit: "€/hour" },
  ];

  for (const sp of scParams) {
    wsScenarios.getCell(`B${sp.row}`).value = sp.label;
    wsScenarios.getCell(`B${sp.row}`).font = FONT_BOLD;
    wsScenarios.getCell(`B${sp.row}`).border = THIN_BORDER;

    const valCell = wsScenarios.getCell(`C${sp.row}`);
    valCell.value = { formula: sp.formula, result: sp.result };
    valCell.numFmt = sp.fmt;
    valCell.font = FONT_BOLD;
    valCell.alignment = { horizontal: "right" };
    valCell.border = THIN_BORDER;

    wsScenarios.getCell(`D${sp.row}`).value = sp.unit;
    wsScenarios.getCell(`D${sp.row}`).font = { name: "Calibri", size: 10, color: { argb: COLORS.TEXT_MUTED } };
    wsScenarios.getCell(`D${sp.row}`).border = THIN_BORDER;
    wsScenarios.getRow(sp.row).height = 20;
  }

  // Scenarios Table Header
  const scTableHeaders = [
    { col: "B", text: "Adoption (A)" },
    { col: "C", text: "AI Workflow Adoption Scenario" },
    { col: "D", text: "AI Covered (hrs/wk)" },
    { col: "E", text: "Verification (hrs/wk)" },
    { col: "F", text: "Net Recovered (hrs/wk)" },
    { col: "G", text: "Remaining Base (hrs/wk)" },
    { col: "H", text: "Annual Team Hours" },
    { col: "I", text: "Illustrative Value (€)" }
  ];

  for (const th of scTableHeaders) {
    const c = wsScenarios.getCell(`${th.col}10`);
    c.value = th.text;
    c.font = FONT_TABLE_HEADER;
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.TABLE_HEADER_BG } };
    c.alignment = { vertical: "middle", horizontal: th.col === "B" || th.col === "C" ? "left" : "right" };
    c.border = THIN_BORDER;
  }
  wsScenarios.getRow(10).height = 26;

  // The Five Approved Fixed AI Adoption Scenarios:
  // Row 11: 20%
  // Row 12: 40%
  // Row 13: 60%
  // Row 14: 80%
  // Row 15: 100%
  const scenariosData = [
    { row: 11, key: "scenario_20", ratio: 0.20, name: "20% AI Workflow Adoption" },
    { row: 12, key: "scenario_40", ratio: 0.40, name: "40% AI Workflow Adoption" },
    { row: 13, key: "scenario_60", ratio: 0.60, name: "60% AI Workflow Adoption" },
    { row: 14, key: "scenario_80", ratio: 0.80, name: "80% AI Workflow Adoption" },
    { row: 15, key: "scenario_100", ratio: 1.00, name: "100% AI Workflow Adoption" },
  ];

  for (const s of scenariosData) {
    const p = preview.scenarios[s.key];
    const r = s.row;

    // Col B: Adoption ratio (Locked constant)
    const cellB = wsScenarios.getCell(`B${r}`);
    cellB.value = s.ratio;
    cellB.numFmt = "0%";
    cellB.font = FONT_BOLD;
    cellB.alignment = { horizontal: "center" };
    cellB.border = THIN_BORDER;

    // Col C: Name
    const cellC = wsScenarios.getCell(`C${r}`);
    cellC.value = s.name;
    cellC.font = FONT_BASE;
    cellC.border = THIN_BORDER;

    // Col D: AI Covered Hours/Week = B * A -> =$C$4*B{r}
    const cellD = wsScenarios.getCell(`D${r}`);
    cellD.value = {
      formula: `=$C$4*B${r}`,
      result: p.aiCoveredHoursPerWeekExact
    };
    cellD.numFmt = "#,##0.0";
    cellD.font = FONT_BASE;
    cellD.alignment = { horizontal: "right" };
    cellD.border = THIN_BORDER;

    // Col E: Verification Hours/Week = AI_Covered * V -> =D{r}*$C$5
    const cellE = wsScenarios.getCell(`E${r}`);
    cellE.value = {
      formula: `=D${r}*$C$5`,
      result: p.verificationHoursPerWeekExact
    };
    cellE.numFmt = "#,##0.0";
    cellE.font = FONT_BASE;
    cellE.alignment = { horizontal: "right" };
    cellE.border = THIN_BORDER;

    // Col F: Net Recovered Hours/Week = AI_Covered * (1 - V) -> =D{r}*(1-$C$5)
    const cellF = wsScenarios.getCell(`F${r}`);
    cellF.value = {
      formula: `=D${r}*(1-$C$5)`,
      result: p.netRecoveredHoursPerWeekExact
    };
    cellF.numFmt = "#,##0.0";
    cellF.font = FONT_BOLD;
    cellF.alignment = { horizontal: "right" };
    cellF.border = THIN_BORDER;

    // Col G: Remaining Baseline Hours/Week = B - Net_Recovered -> =$C$4-F{r}
    const cellG = wsScenarios.getCell(`G${r}`);
    cellG.value = {
      formula: `=$C$4-F${r}`,
      result: p.remainingBaselineHoursPerWeekExact
    };
    cellG.numFmt = "#,##0.0";
    cellG.font = FONT_BASE;
    cellG.alignment = { horizontal: "right" };
    cellG.border = THIN_BORDER;

    // Col H: Annual Team Recovered Hours = Net_Recovered * N * W -> =F{r}*$C$6*$C$7
    const cellH = wsScenarios.getCell(`H${r}`);
    cellH.value = {
      formula: `=F${r}*$C$6*$C$7`,
      result: p.annualRecoveredHours
    };
    cellH.numFmt = "#,##0.0";
    cellH.font = FONT_BOLD;
    cellH.alignment = { horizontal: "right" };
    cellH.border = THIN_BORDER;

    // Col I: Annual Illustrative Value = Annual_Team_Hours * R -> =H{r}*$C$8
    const cellI = wsScenarios.getCell(`I${r}`);
    cellI.value = {
      formula: `=H${r}*$C$8`,
      result: p.annualIllustrativeValue
    };
    cellI.numFmt = "€#,##0";
    cellI.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FF047857" } };
    cellI.alignment = { horizontal: "right" };
    cellI.border = THIN_BORDER;

    wsScenarios.getRow(r).height = 24;
  }

  // Row 17: Methodology Verification Footer
  wsScenarios.mergeCells("B17:I17");
  const scFooter = wsScenarios.getCell("B17");
  scFooter.value = "Formula Verification: Annual Recovered Hours = B * A * (1 - V) * N * W | Illustrative Value = Annual Recovered Hours * R";
  scFooter.font = { name: "Calibri", size: 9, italic: true, color: { argb: COLORS.TEXT_MUTED } };
  scFooter.alignment = { vertical: "middle", horizontal: "center" };
  wsScenarios.getRow(17).height = 20;

  // Protect AI Adoption Scenarios worksheet (all cells locked)
  await wsScenarios.protect("pybim-scenarios-2025", {
    selectLockedCells: true,
    selectUnlockedCells: true
  });

  // =========================================================================
  // WORKSHEET 4: Assumptions & Sources (Governance & Clickable Hyperlinks)
  // =========================================================================
  const wsSources = workbook.addWorksheet("Assumptions & Sources", {
    views: [{ showGridLines: true }],
    pageSetup: { fitToPage: true, fitToWidth: 1, fitToHeight: 0, orientation: "portrait" }
  });

  wsSources.columns = [
    { width: 4 },   // A (spacer)
    { width: 32 },  // B (Topic / Reference)
    { width: 70 },  // C (Details, Citations & Hyperlinks)
  ];

  // Title Block
  wsSources.mergeCells("B2:C2");
  const srcTitle = wsSources.getCell("B2");
  srcTitle.value = "pyBIM | RESEARCH ATTRIBUTION, ASSUMPTIONS & SOURCES";
  srcTitle.font = FONT_TITLE;
  srcTitle.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.HEADER_DARK_BG } };
  srcTitle.alignment = { vertical: "middle", indent: 1 };
  wsSources.getRow(2).height = 34;

  // Section 1: Autodesk Industry Reference
  wsSources.mergeCells("B4:C4");
  const srcS1 = wsSources.getCell("B4");
  srcS1.value = "1. AUTODESK INDUSTRY RESEARCH CITATION (13 HOURS / WEEK)";
  srcS1.font = FONT_SECTION_HEADER;
  srcS1.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.TABLE_HEADER_BG } };
  srcS1.alignment = { vertical: "middle", indent: 1 };
  wsSources.getRow(4).height = 24;

  const autodeskStatements = [
    {
      row: 5,
      label: "Research Publication:",
      val: "Autodesk, 2025 State of Design & Make: Spotlight on Construction."
    },
    {
      row: 6,
      label: "Empirical Finding:",
      val: "Surveyed construction professionals reported spending an average of 13 hours per person per week searching for project information."
    },
    {
      row: 7,
      label: "Research Scope Note:",
      val: "The 13-hour observation measures general time locating project data across surveyed construction roles."
    },
    {
      row: 8,
      label: "Attribution Disclosure:",
      val: "It does NOT measure isolated BIM modeling inefficiency, is NOT proof of modeler waste, does NOT prove all 13h can be eliminated, and does NOT imply Autodesk validated pyBIM automation performance."
    },
  ];

  for (const item of autodeskStatements) {
    wsSources.getCell(`B${item.row}`).value = item.label;
    wsSources.getCell(`B${item.row}`).font = FONT_BOLD;
    wsSources.getCell(`B${item.row}`).border = THIN_BORDER;

    wsSources.getCell(`C${item.row}`).value = item.val;
    wsSources.getCell(`C${item.row}`).font = FONT_BASE;
    wsSources.getCell(`C${item.row}`).border = THIN_BORDER;
    wsSources.getRow(item.row).height = 22;
  }

  // Working Clickable Hyperlinks in Workbook
  wsSources.getCell("B9").value = "EMEA Spotlight (Blog):";
  wsSources.getCell("B9").font = FONT_BOLD;
  wsSources.getCell("B9").border = THIN_BORDER;

  const blogLinkCell = wsSources.getCell("C9");
  blogLinkCell.value = {
    text: "Autodesk Construction Blog — State of Design & Make: Spotlight on Construction in EMEA",
    hyperlink: AUTODESK_CITATION.blogUrl
  };
  blogLinkCell.font = { name: "Calibri", size: 11, color: { argb: COLORS.HYPERLINK_BLUE }, underline: true };
  blogLinkCell.border = THIN_BORDER;
  wsSources.getRow(9).height = 22;

  wsSources.getCell("B10").value = "Primary Report (Boards):";
  wsSources.getCell("B10").font = FONT_BOLD;
  wsSources.getCell("B10").border = THIN_BORDER;

  const reportLinkCell = wsSources.getCell("C10");
  reportLinkCell.value = {
    text: "Autodesk Boards — 2025 State of Design & Make: Spotlight on Construction Primary Report",
    hyperlink: AUTODESK_CITATION.primaryReportUrl
  };
  reportLinkCell.font = { name: "Calibri", size: 11, color: { argb: COLORS.HYPERLINK_BLUE }, underline: true };
  reportLinkCell.border = THIN_BORDER;
  wsSources.getRow(10).height = 22;

  // Section 2: Planning Assumptions
  wsSources.mergeCells("B12:C12");
  const srcS2 = wsSources.getCell("B12");
  srcS2.value = "2. OWNER PLANNING ASSUMPTIONS & VERIFICATION ALLOWANCE";
  srcS2.font = FONT_SECTION_HEADER;
  srcS2.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.TABLE_HEADER_BG } };
  srcS2.alignment = { vertical: "middle", indent: 1 };
  wsSources.getRow(12).height = 24;

  const planningStatements = [
    {
      row: 13,
      label: "Engineering Verification Allowance:",
      val: "Fixed 10% (0.10) human review allowance is retained across all scenarios for engineering verification and quality control. This is an OWNER-SELECTED PLANNING ASSUMPTION, not an Autodesk research result."
    },
    {
      row: 14,
      label: "Five AI Adoption Scenarios:",
      val: "The five tiers (20%, 40%, 60%, 80%, 100%) represent proportions of addressable workflow time covered by automation, not guaranteed productivity leaps or empirically achieved results."
    },
    {
      row: 15,
      label: "Hourly Valuation Rate:",
      val: "€85/h is an illustrative consulting example, not average European BIM salary. Custom client rates can be entered freely on the 'Workflow Inputs' sheet."
    },
    {
      row: 16,
      label: "Annual Working Weeks:",
      val: "48 weeks/year is an editable planning assumption excluding holidays and vacation, not a statutory labor standard."
    },
  ];

  for (const item of planningStatements) {
    wsSources.getCell(`B${item.row}`).value = item.label;
    wsSources.getCell(`B${item.row}`).font = FONT_BOLD;
    wsSources.getCell(`B${item.row}`).border = THIN_BORDER;

    wsSources.getCell(`C${item.row}`).value = item.val;
    wsSources.getCell(`C${item.row}`).font = FONT_BASE;
    wsSources.getCell(`C${item.row}`).border = THIN_BORDER;
    wsSources.getRow(item.row).height = 26;
  }

  // Section 3: Financial Disclaimers
  wsSources.mergeCells("B18:C18");
  const srcS3 = wsSources.getCell("B18");
  srcS3.value = "3. FINANCIAL DISCLAIMERS & CAPACITY VALUATION LIMITATIONS";
  srcS3.font = FONT_SECTION_HEADER;
  srcS3.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLORS.TABLE_HEADER_BG } };
  srcS3.alignment = { vertical: "middle", indent: 1 };
  wsSources.getRow(18).height = 24;

  const disclaimers = [
    {
      row: 19,
      label: "Scope of Valuation:",
      val: "Illustrative Capacity Value measures liberated engineering time valuated at billing potential or loaded payroll cost. It does NOT represent guaranteed revenue, net profit, cash savings, or software warranties."
    },
    {
      row: 20,
      label: "Residual Manual Effort:",
      val: "Actual automation outcomes depend on firm-specific workflow maturity, setup time, exception handling, and ongoing script maintenance."
    },
    {
      row: 21,
      label: "Absence of Fabricated Costs:",
      val: "This matrix does not invent deployment, infrastructure, or licensing costs. Financial net return must be evaluated against verified project integration quotes."
    },
  ];

  for (const item of disclaimers) {
    wsSources.getCell(`B${item.row}`).value = item.label;
    wsSources.getCell(`B${item.row}`).font = FONT_BOLD;
    wsSources.getCell(`B${item.row}`).border = THIN_BORDER;

    wsSources.getCell(`C${item.row}`).value = item.val;
    wsSources.getCell(`C${item.row}`).font = FONT_BASE;
    wsSources.getCell(`C${item.row}`).border = THIN_BORDER;
    wsSources.getRow(item.row).height = 24;
  }

  // Protect Assumptions & Sources worksheet (hyperlinks remain clickable)
  await wsSources.protect("pybim-sources-2025", {
    selectLockedCells: true,
    selectUnlockedCells: true,
    insertHyperlinks: false
  });

  return workbook;
}

/**
 * Generates an XLSX file buffer (Uint8Array / Buffer) in memory.
 * Compatible with Node.js runtime and browser ArrayBuffer environments.
 *
 * @param {object} ExcelJS
 * @param {object} params
 * @returns {Promise<Uint8Array>}
 */
export async function generateRoiWorkbookBuffer(ExcelJS, params = {}) {
  const workbook = await buildRoiWorkbook(ExcelJS, params);
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
