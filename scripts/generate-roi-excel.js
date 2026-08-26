const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function generateROIExcel() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'pyBIM SRLS';
  workbook.lastModifiedBy = 'pyBIM Engineering Lab';
  workbook.created = new Date();
  workbook.modified = new Date();

  const sheet = workbook.addWorksheet('ROI Calculator', {
    views: [{ showGridLines: true }],
    pageSetup: { paperSize: 9, orientation: 'portrait' }
  });

  // Set column widths
  sheet.columns = [
    { width: 4 },   // A - margin
    { width: 42 },  // B - Task / Label
    { width: 18 },  // C - Input / Manual
    { width: 20 },  // D - Automated
    { width: 18 },  // E - Time Saved
    { width: 22 },  // F - Cost Saved
  ];

  // Brand Colors
  const PRIMARY_BLUE = '2563EB';
  const DARK_SLATE = '0F172A';
  const LIGHT_SURFACE = 'F1F5F9';
  const ACCENT_ORANGE = 'F97316';
  const EMERALD_GREEN = '10B981';
  const LIGHT_GREEN = 'ECFDF5';
  const BORDER_COLOR = 'E2E8F0';

  // ROW 2: Header Brand
  sheet.mergeCells('B2:F2');
  const titleCell = sheet.getCell('B2');
  titleCell.value = 'pyBIM  |  ADVANCED BIM & AUTOMATION LAB';
  titleCell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: PRIMARY_BLUE } };
  titleCell.alignment = { vertical: 'middle' };

  // ROW 3: Title
  sheet.mergeCells('B3:F3');
  const mainTitle = sheet.getCell('B3');
  mainTitle.value = 'BIM Automation ROI & Cost-Loss Calculator';
  mainTitle.font = { name: 'Calibri', size: 18, bold: true, color: { argb: DARK_SLATE } };
  mainTitle.alignment = { vertical: 'middle' };

  // ROW 4: Subtitle
  sheet.mergeCells('B4:F4');
  const subTitle = sheet.getCell('B4');
  subTitle.value = 'Quantify hidden engineering losses and projected savings through bespoke Python & C# automation.';
  subTitle.font = { name: 'Calibri', size: 10, italic: true, color: { argb: '64748B' } };
  subTitle.alignment = { vertical: 'middle' };

  // ROW 6: Section 1 Header
  sheet.mergeCells('B6:F6');
  const s1Header = sheet.getCell('B6');
  s1Header.value = '1. STUDIO / FIRM PROFILE (INPUT VARIABLES - EDIT GREEN CELLS)';
  s1Header.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  s1Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  s1Header.alignment = { vertical: 'middle', indent: 1 };
  sheet.getRow(6).height = 25;

  // Input Rows
  const inputs = [
    { row: 7, label: 'Number of BIM Modelers / Engineers in Team:', value: 5, format: '#,##0', note: 'Active engineers modeling in Revit' },
    { row: 8, label: 'Average Hourly Billing / Cost Rate (€ / hr):', value: 85, format: '€#,##0.00', note: 'Standard DACH / EU engineering rate' },
    { row: 9, label: 'Avg. Hours Wasted on Repetitive Tasks per Modeler (hrs/wk):', value: 12, format: '0.0 "hrs"', note: 'Clash routing, naming, manual QTO, sheets' },
    { row: 10, label: 'Working Weeks per Year:', value: 52, format: '#,##0', note: 'Standard annual calendar' },
  ];

  inputs.forEach(inp => {
    sheet.getRow(inp.row).height = 22;
    const lbl = sheet.getCell(`B${inp.row}`);
    lbl.value = inp.label;
    lbl.font = { name: 'Calibri', size: 11, bold: true, color: { argb: DARK_SLATE } };
    lbl.alignment = { vertical: 'middle', indent: 1 };
    lbl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_SURFACE } };

    const val = sheet.getCell(`C${inp.row}`);
    val.value = inp.value;
    val.numFmt = inp.format;
    val.font = { name: 'Calibri', size: 11, bold: true, color: { argb: '065F46' } };
    val.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D1FAE5' } }; // Light editable green
    val.alignment = { vertical: 'middle', horizontal: 'center' };
    val.border = {
      top: { style: 'thin', color: { argb: EMERALD_GREEN } },
      bottom: { style: 'thin', color: { argb: EMERALD_GREEN } },
      left: { style: 'thin', color: { argb: EMERALD_GREEN } },
      right: { style: 'thin', color: { argb: EMERALD_GREEN } },
    };

    sheet.mergeCells(`D${inp.row}:F${inp.row}`);
    const note = sheet.getCell(`D${inp.row}`);
    note.value = inp.note;
    note.font = { name: 'Calibri', size: 10, italic: true, color: { argb: '64748B' } };
    note.alignment = { vertical: 'middle', indent: 1 };
    note.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_SURFACE } };
  });

  // ROW 12: Section 2 Header
  sheet.mergeCells('B12:F12');
  const s2Header = sheet.getCell('B12');
  s2Header.value = '2. TYPICAL REPETITIVE TASKS BREAKDOWN (WEEKLY BASELINE)';
  s2Header.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  s2Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PRIMARY_BLUE } };
  s2Header.alignment = { vertical: 'middle', indent: 1 };
  sheet.getRow(12).height = 25;

  // Table Headers
  const thRow = 13;
  sheet.getRow(thRow).height = 22;
  const colHeaders = [
    { col: 'B', text: 'BIM Workflow & Repetitive Activity' },
    { col: 'C', text: 'Manual (hrs/wk)' },
    { col: 'D', text: 'With pyBIM (hrs/wk)' },
    { col: 'E', text: 'Weekly Saved (hrs)' },
    { col: 'F', text: 'Annual Cost Saved' },
  ];
  colHeaders.forEach(ch => {
    const c = sheet.getCell(`${ch.col}${thRow}`);
    c.value = ch.text;
    c.font = { name: 'Calibri', size: 10, bold: true, color: { argb: DARK_SLATE } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E2E8F0' } };
    c.alignment = { vertical: 'middle', horizontal: ch.col === 'B' ? 'left' : 'center', indent: ch.col === 'B' ? 1 : 0 };
  });

  // Tasks Rows
  const tasks = [
    { row: 14, task: 'Rule-based Clash Detection & BCF Issue Routing', manual: 3.5, auto: 0.5 },
    { row: 15, task: 'Parameter Injection & COBie Metadata Structuring', manual: 3.0, auto: 0.2 },
    { row: 16, task: 'Automated Sheet Setup & View Generation', manual: 2.5, auto: 0.3 },
    { row: 17, task: 'Dynamic 5D Quantity Take-off (QTO) & BOQ Schedules', manual: 2.0, auto: 0.4 },
    { row: 18, task: 'Model QA/QC Checking & Compliance Auditing', manual: 1.0, auto: 0.1 },
  ];

  tasks.forEach(t => {
    sheet.getRow(t.row).height = 20;
    const taskCell = sheet.getCell(`B${t.row}`);
    taskCell.value = t.task;
    taskCell.font = { name: 'Calibri', size: 10, color: { argb: DARK_SLATE } };
    taskCell.alignment = { vertical: 'middle', indent: 1 };

    const manCell = sheet.getCell(`C${t.row}`);
    manCell.value = t.manual;
    manCell.numFmt = '0.0 "hrs"';
    manCell.font = { name: 'Calibri', size: 10, color: { argb: 'DC2626' } };
    manCell.alignment = { vertical: 'middle', horizontal: 'center' };

    const autoCell = sheet.getCell(`D${t.row}`);
    autoCell.value = t.auto;
    autoCell.numFmt = '0.0 "hrs"';
    autoCell.font = { name: 'Calibri', size: 10, color: { argb: '059669' } };
    autoCell.alignment = { vertical: 'middle', horizontal: 'center' };

    const savedCell = sheet.getCell(`E${t.row}`);
    savedCell.value = { formula: `C${t.row}-D${t.row}` };
    savedCell.numFmt = '0.0 "hrs"';
    savedCell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: PRIMARY_BLUE } };
    savedCell.alignment = { vertical: 'middle', horizontal: 'center' };

    const costSavedCell = sheet.getCell(`F${t.row}`);
    costSavedCell.value = { formula: `E${t.row}*C$7*C$8*C$10` };
    costSavedCell.numFmt = '€#,##0';
    costSavedCell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: '047857' } };
    costSavedCell.alignment = { vertical: 'middle', horizontal: 'right' };
  });

  // ROW 20: Section 3 Header (FINANCIAL ROI OUTPUTS)
  sheet.mergeCells('B20:F20');
  const s3Header = sheet.getCell('B20');
  s3Header.value = '3. EXECUTIVE ROI & FINANCIAL SUMMARY (CALCULATED IN REAL-TIME)';
  s3Header.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  s3Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ACCENT_ORANGE } };
  s3Header.alignment = { vertical: 'middle', indent: 1 };
  sheet.getRow(20).height = 25;

  // Executive Outputs
  const outputs = [
    { row: 21, label: 'Current Hidden Annual Loss (Manual Waste):', formula: 'C7*C8*C9*C10', format: '€#,##0.00', color: 'DC2626', bg: 'FEF2F2', bold: true, size: 12 },
    { row: 22, label: 'Estimated Engineering Time Saved per Year:', formula: '(C7*C9*C10)*0.80', format: '#,##0 "hours / yr"', color: PRIMARY_BLUE, bg: LIGHT_SURFACE, bold: true, size: 11 },
    { row: 23, label: 'Gross Annual Financial Savings with pyBIM (80% reduction):', formula: 'F21*0.80', format: '€#,##0.00', color: '059669', bg: 'ECFDF5', bold: true, size: 12 },
    { row: 24, label: 'Estimated pyBIM Automation Investment (One-time):', formula: '15000', format: '€#,##0.00', color: DARK_SLATE, bg: LIGHT_SURFACE, bold: false, size: 11 },
    { row: 25, label: 'NET 1ST-YEAR GAIN / REVENUE PROTECTED:', formula: 'F23-F24', format: '€#,##0.00', color: '047857', bg: 'D1FAE5', bold: true, size: 13 },
    { row: 26, label: 'PROJECTED RETURN ON INVESTMENT (ROI %):', formula: '(F25/F24)', format: '0.0%', color: PRIMARY_BLUE, bg: 'EFF6FF', bold: true, size: 13 },
    { row: 27, label: 'ESTIMATED PAYBACK PERIOD:', formula: '"Under " & ROUND((F24/(F23/12)), 1) & " Months"', format: '@', color: ACCENT_ORANGE, bg: 'FFF7ED', bold: true, size: 12 },
  ];

  outputs.forEach(out => {
    sheet.getRow(out.row).height = 24;
    sheet.mergeCells(`B${out.row}:E${out.row}`);
    const lCell = sheet.getCell(`B${out.row}`);
    lCell.value = out.label;
    lCell.font = { name: 'Calibri', size: out.size, bold: out.bold, color: { argb: DARK_SLATE } };
    lCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: out.bg } };
    lCell.alignment = { vertical: 'middle', indent: 1 };

    const vCell = sheet.getCell(`F${out.row}`);
    if (out.formula.startsWith('"')) {
      vCell.value = { formula: out.formula };
    } else if (isNaN(out.formula)) {
      vCell.value = { formula: out.formula };
    } else {
      vCell.value = Number(out.formula);
    }
    vCell.numFmt = out.format;
    vCell.font = { name: 'Calibri', size: out.size, bold: out.bold, color: { argb: out.color } };
    vCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: out.bg } };
    vCell.alignment = { vertical: 'middle', horizontal: 'right' };
  });

  // ROW 29: CTA Banner
  sheet.mergeCells('B29:F30');
  const ctaCell = sheet.getCell('B29');
  ctaCell.value = 'Ready to implement these savings in your Revit & BIM environment?\nSchedule a Free Technical Audit: https://pybim.com/contact  |  Email: info@pybim.com';
  ctaCell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFF' } };
  ctaCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_SLATE } };
  ctaCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

  // Ensure downloads directory exists
  const dir = path.join(__dirname, '..', 'public', 'downloads');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, 'pyBIM-Automation-ROI-Calculator.xlsx');
  await workbook.xlsx.writeFile(filePath);
  console.log(`Excel file successfully created at: ${filePath}`);
}

generateROIExcel().catch(console.error);
