import assert from "node:assert";
import ExcelJS from "exceljs";
import {
  buildRoiWorkbook,
  generateRoiWorkbookBuffer,
  sanitizeSpreadsheetText,
} from "../lib/roi/roiWorkbookBuilder.js";
import {
  AUTODESK_REFERENCE_HOURS_PER_WEEK,
  HUMAN_VERIFICATION_RATE,
  DEFAULT_CONSULTING_RATE,
  DEFAULT_WORKING_WEEKS,
  AUTODESK_CITATION,
} from "../lib/roi/roiSchema.js";

console.log("=== RUNNING ROI-02 EXCEL WORKBOOK GENERATOR TEST SUITE ===\n");

// 1. Formula Injection Prevention (CWE-1236)
console.log("1. Testing Spreadsheet Formula Injection Defense (CWE-1236)...");
{
  assert.strictEqual(sanitizeSpreadsheetText("Normal Firm Name"), "Normal Firm Name");
  assert.strictEqual(sanitizeSpreadsheetText("=1+1"), "'=1+1");
  assert.strictEqual(sanitizeSpreadsheetText("+SUM(A1:A10)"), "'+SUM(A1:A10)");
  assert.strictEqual(sanitizeSpreadsheetText("-25*3"), "'-25*3");
  assert.strictEqual(sanitizeSpreadsheetText("@HYPERLINK(...)"), "'@HYPERLINK(...)");
  assert.strictEqual(sanitizeSpreadsheetText("\t=1+1"), "'=1+1");
  assert.strictEqual(sanitizeSpreadsheetText(null), "");
  assert.strictEqual(sanitizeSpreadsheetText(undefined), "");
}
console.log("   ✓ Formula injection defense properly prepends single quote to dangerous leading characters");

// 2. Default Reference Case Workbook Generation & Four Worksheets
console.log("2. Testing Four Purpose-Built English Worksheets & Structure...");
{
  const testParams = {
    userName: "=Malicious Lead", // Should be sanitized
    companyName: "Studio Ingegneria BIM Srl",
    referenceId: "ROI-SESS-2026-TEST9999",
    modelerCount: 5,
    hourlyRate: 85,
    workingWeeks: 48,
    rateType: "consulting",
    isRateCustom: false
  };

  const workbook = await buildRoiWorkbook(ExcelJS, testParams);

  // Full calculation on load enabled
  assert.strictEqual(workbook.calcProperties.fullCalcOnLoad, true, "fullCalcOnLoad must be true for native Excel recalculation");

  // Exactly four worksheets
  const worksheetNames = workbook.worksheets.map(w => w.name);
  assert.strictEqual(worksheetNames.length, 4, "Workbook must contain exactly 4 worksheets");
  assert.deepStrictEqual(worksheetNames, [
    "Executive Summary",
    "Workflow Inputs",
    "AI Adoption Scenarios",
    "Assumptions & Sources"
  ], "Worksheet names must strictly match English-only contract");
}
console.log("   ✓ Exactly 4 English worksheets generated with fullCalcOnLoad enabled");

// 3. Customer-Editable Cells vs Protected Cells Contract
console.log("3. Testing Unlocked Input Cells vs Locked Protected Cells...");
{
  const testParams = {
    userName: "Elena Rostagno",
    companyName: "Studio Ingegneria BIM Srl",
    referenceId: "ROI-SESS-2026-TEST9999",
    modelerCount: 5,
    hourlyRate: 85,
    workingWeeks: 48,
    rateType: "consulting"
  };

  const workbook = await buildRoiWorkbook(ExcelJS, testParams);
  const wsInputs = workbook.getWorksheet("Workflow Inputs");
  const wsExec = workbook.getWorksheet("Executive Summary");
  const wsScenarios = workbook.getWorksheet("AI Adoption Scenarios");
  const wsSources = workbook.getWorksheet("Assumptions & Sources");

  // 3a. Instruction banner on Workflow Inputs
  const banner = wsInputs.getCell("B3").value;
  assert.ok(
    typeof banner === "string" && banner.includes("Editable input — replace this value with your organization's actual data"),
    "Guidance banner must be clearly present on Workflow Inputs"
  );

  // 3b. Editable Unlocked Cells on Workflow Inputs
  const cellC5 = wsInputs.getCell("C5"); // Modeler Count
  const cellC7 = wsInputs.getCell("C7"); // Hourly Rate
  const cellC8 = wsInputs.getCell("C8"); // Working Weeks

  assert.strictEqual(cellC5.protection?.locked, false, "Cell C5 (Modeler Count) must be unlocked (protection.locked === false)");
  assert.strictEqual(cellC7.protection?.locked, false, "Cell C7 (Hourly Rate) must be unlocked (protection.locked === false)");
  assert.strictEqual(cellC8.protection?.locked, false, "Cell C8 (Working Weeks) must be unlocked (protection.locked === false)");

  // Visual distinction: unlocked cells have highlight fill
  assert.strictEqual(cellC5.fill?.fgColor?.argb, "FFFEF3C7", "Cell C5 must have amber highlight fill");
  assert.strictEqual(cellC7.fill?.fgColor?.argb, "FFFEF3C7", "Cell C7 must have amber highlight fill");
  assert.strictEqual(cellC8.fill?.fgColor?.argb, "FFFEF3C7", "Cell C8 must have amber highlight fill");

  // Data Validation on unlocked cells
  assert.strictEqual(cellC5.dataValidation?.type, "whole", "Cell C5 must enforce whole number validation");
  assert.strictEqual(cellC5.dataValidation?.formulae[0], 1);
  assert.strictEqual(cellC5.dataValidation?.formulae[1], 500);

  assert.strictEqual(cellC7.dataValidation?.type, "decimal", "Cell C7 must enforce decimal validation");
  assert.strictEqual(cellC7.dataValidation?.formulae[0], 0.01);
  assert.strictEqual(cellC7.dataValidation?.formulae[1], 2000);

  assert.strictEqual(cellC8.dataValidation?.type, "whole", "Cell C8 must enforce whole number validation");
  assert.strictEqual(cellC8.dataValidation?.formulae[0], 1);
  assert.strictEqual(cellC8.dataValidation?.formulae[1], 52);

  // 3c. Protected/Locked Benchmark Constants on Workflow Inputs
  const cellC9 = wsInputs.getCell("C9");  // Autodesk Benchmark (13)
  const cellC10 = wsInputs.getCell("C10"); // Human Verification Rate (0.10)
  assert.strictEqual(cellC9.value, 13);
  assert.notStrictEqual(cellC9.protection?.locked, false, "Cell C9 (Benchmark 13) must be locked");
  assert.strictEqual(cellC10.value, 0.10);
  assert.notStrictEqual(cellC10.protection?.locked, false, "Cell C10 (Verification 0.10) must be locked");

  // 3d. All other sheets must have all cells locked
  for (let r = 11; r <= 15; r++) {
    for (const col of ["B", "C", "D", "E", "F", "G", "H", "I"]) {
      const cell = wsScenarios.getCell(`${col}${r}`);
      assert.notStrictEqual(cell.protection?.locked, false, `Scenarios cell ${col}${r} must be locked`);
    }
  }

  // Check worksheet protection enabled
  // Note: ExcelJS worksheet protection sets sheetProtection element
  assert.ok(wsInputs.sheetProtection, "Workflow Inputs must have sheet protection enabled");
  assert.ok(wsExec.sheetProtection, "Executive Summary must have sheet protection enabled");
  assert.ok(wsScenarios.sheetProtection, "AI Adoption Scenarios must have sheet protection enabled");
  assert.ok(wsSources.sheetProtection, "Assumptions & Sources must have sheet protection enabled");
}
console.log("   ✓ Unlocked editable cells, data validation, and worksheet protection verified");

// 4. Excel Formula Engineering & Reference Case Assertions
console.log("4. Testing Native Excel Formulas and 5 Reference Case Values...");
{
  // Reference Case: N=5, R=85, B=13, W=48, V=0.10
  const testParams = {
    userName: "Elena Rostagno",
    companyName: "Studio Ingegneria BIM Srl",
    modelerCount: 5,
    hourlyRate: 85,
    workingWeeks: 48,
    rateType: "consulting"
  };

  const workbook = await buildRoiWorkbook(ExcelJS, testParams);
  const wsScenarios = workbook.getWorksheet("AI Adoption Scenarios");

  // Assert Top References on AI Adoption Scenarios:
  assert.strictEqual(wsScenarios.getCell("C4").value.formula, "='Workflow Inputs'!$C$9"); // B = 13
  assert.strictEqual(wsScenarios.getCell("C4").value.result, 13);

  assert.strictEqual(wsScenarios.getCell("C5").value.formula, "='Workflow Inputs'!$C$10"); // V = 0.10
  assert.strictEqual(wsScenarios.getCell("C5").value.result, 0.10);

  assert.strictEqual(wsScenarios.getCell("C6").value.formula, "='Workflow Inputs'!$C$5"); // N = 5
  assert.strictEqual(wsScenarios.getCell("C6").value.result, 5);

  assert.strictEqual(wsScenarios.getCell("C7").value.formula, "='Workflow Inputs'!$C$8"); // W = 48
  assert.strictEqual(wsScenarios.getCell("C7").value.result, 48);

  assert.strictEqual(wsScenarios.getCell("C8").value.formula, "='Workflow Inputs'!$C$7"); // R = 85
  assert.strictEqual(wsScenarios.getCell("C8").value.result, 85);

  // Five Scenarios Expected Table:
  // Row 11: 20%  -> 561.6 hrs  | €47,736
  // Row 12: 40%  -> 1,123.2 hrs| €95,472
  // Row 13: 60%  -> 1,684.8 hrs| €143,208
  // Row 14: 80%  -> 2,246.4 hrs| €190,944
  // Row 15: 100% -> 2,808.0 hrs| €238,680
  const scenarioAssertions = [
    { row: 11, adoption: 0.20, expAiCovered: 2.6, expVerif: 0.26, expNet: 2.34, expRemaining: 10.66, expHours: 561.6, expVal: 47736 },
    { row: 12, adoption: 0.40, expAiCovered: 5.2, expVerif: 0.52, expNet: 4.68, expRemaining: 8.32, expHours: 1123.2, expVal: 95472 },
    { row: 13, adoption: 0.60, expAiCovered: 7.8, expVerif: 0.78, expNet: 7.02, expRemaining: 5.98, expHours: 1684.8, expVal: 143208 },
    { row: 14, adoption: 0.80, expAiCovered: 10.4, expVerif: 1.04, expNet: 9.36, expRemaining: 3.64, expHours: 2246.4, expVal: 190944 },
    { row: 15, adoption: 1.00, expAiCovered: 13.0, expVerif: 1.30, expNet: 11.70, expRemaining: 1.30, expHours: 2808.0, expVal: 238680 },
  ];

  for (const sc of scenarioAssertions) {
    const r = sc.row;

    // Adoption ratio
    assert.strictEqual(wsScenarios.getCell(`B${r}`).value, sc.adoption);

    // AI Covered Hours
    const dCell = wsScenarios.getCell(`D${r}`).value;
    assert.strictEqual(dCell.formula, `=$C$4*B${r}`, `Row ${r} AI Covered formula`);
    assert.strictEqual(Math.round(dCell.result * 10) / 10, sc.expAiCovered);

    // Verification Hours
    const eCell = wsScenarios.getCell(`E${r}`).value;
    assert.strictEqual(eCell.formula, `=D${r}*$C$5`, `Row ${r} Verification formula`);
    assert.strictEqual(Math.round(eCell.result * 100) / 100, sc.expVerif);

    // Net Recovered Weekly Hours
    const fCell = wsScenarios.getCell(`F${r}`).value;
    assert.strictEqual(fCell.formula, `=D${r}*(1-$C$5)`, `Row ${r} Net Recovered formula`);
    assert.strictEqual(Math.round(fCell.result * 100) / 100, sc.expNet);

    // Remaining Baseline Weekly Hours
    const gCell = wsScenarios.getCell(`G${r}`).value;
    assert.strictEqual(gCell.formula, `=$C$4-F${r}`, `Row ${r} Remaining Baseline formula`);
    assert.strictEqual(Math.round(gCell.result * 100) / 100, sc.expRemaining);

    // Annual Team Recovered Hours
    const hCell = wsScenarios.getCell(`H${r}`).value;
    assert.strictEqual(hCell.formula, `=F${r}*$C$6*$C$7`, `Row ${r} Annual Team Hours formula`);
    assert.strictEqual(hCell.result, sc.expHours, `Row ${r} Annual Team Hours result`);

    // Annual Illustrative Capacity Value
    const iCell = wsScenarios.getCell(`I${r}`).value;
    assert.strictEqual(iCell.formula, `=H${r}*$C$8`, `Row ${r} Annual Value formula`);
    assert.strictEqual(Math.round(iCell.result), sc.expVal, `Row ${r} Annual Value result`);
  }

  // Regression check: at 100% adoption, time elimination is NOT 100% (not 3,120h)
  const h15 = wsScenarios.getCell("H15").value.result;
  assert.strictEqual(h15, 2808.0, "100% adoption must retain 10% (312h) for verification");
  assert.notStrictEqual(h15, 3120, "100% adoption must not report 100% elimination (3120)");

  // Cross-Sheet Executive Summary Links
  const wsExec = workbook.getWorksheet("Executive Summary");
  assert.strictEqual(wsExec.getCell("E16").value.formula, "='AI Adoption Scenarios'!$H$11");
  assert.strictEqual(wsExec.getCell("F16").value.formula, "='AI Adoption Scenarios'!$I$11");
  assert.strictEqual(wsExec.getCell("E20").value.formula, "='AI Adoption Scenarios'!$H$15");
  assert.strictEqual(wsExec.getCell("F20").value.formula, "='AI Adoption Scenarios'!$I$15");
}
console.log("   ✓ Native Excel formulas and exact reference outputs verified across all 5 tiers");

// 5. Clickable Autodesk Research Hyperlinks
console.log("5. Testing Clickable Autodesk Hyperlinks in Assumptions & Sources...");
{
  const workbook = await buildRoiWorkbook(ExcelJS, { userName: "A", companyName: "B" });
  const wsSources = workbook.getWorksheet("Assumptions & Sources");

  const blogLink = wsSources.getCell("C9").value;
  assert.ok(blogLink && typeof blogLink === "object", "C9 must be a hyperlink object");
  assert.strictEqual(blogLink.hyperlink, AUTODESK_CITATION.blogUrl, "Blog hyperlink must match Autodesk URL");

  const reportLink = wsSources.getCell("C10").value;
  assert.ok(reportLink && typeof reportLink === "object", "C10 must be a hyperlink object");
  assert.strictEqual(reportLink.hyperlink, AUTODESK_CITATION.primaryReportUrl, "Report hyperlink must match Autodesk URL");
}
console.log("   ✓ Working Autodesk blog and report hyperlinks verified in Assumptions & Sources");

// 6. Binary Buffer Generation and Reload Programmatic Verification
console.log("6. Testing Workbook Binary Buffer Serialization & Round-Trip Reload...");
{
  const buffer = await generateRoiWorkbookBuffer(ExcelJS, {
    userName: "Elena Rostagno",
    companyName: "Studio Ingegneria BIM Srl",
    modelerCount: 5,
    hourlyRate: 85,
    workingWeeks: 48,
    rateType: "consulting"
  });

  assert.ok(buffer && buffer.length > 5000, "Generated XLSX buffer must be valid non-empty binary");

  // Reload the serialized workbook
  const reloadedWb = new ExcelJS.Workbook();
  await reloadedWb.xlsx.load(buffer);

  assert.strictEqual(reloadedWb.worksheets.length, 4, "Reloaded workbook must have 4 worksheets");

  const reloadedScenarios = reloadedWb.getWorksheet("AI Adoption Scenarios");
  assert.strictEqual(reloadedScenarios.getCell("H11").value.result, 561.6, "Reloaded 20% annual hours must be 561.6");
  assert.strictEqual(reloadedScenarios.getCell("I11").value.result, 47736, "Reloaded 20% annual value must be 47,736");
  assert.strictEqual(reloadedScenarios.getCell("H15").value.result, 2808.0, "Reloaded 100% annual hours must be 2,808.0");
  assert.strictEqual(reloadedScenarios.getCell("I15").value.result, 238680, "Reloaded 100% annual value must be 238,680");

  const reloadedInputs = reloadedWb.getWorksheet("Workflow Inputs");
  assert.strictEqual(reloadedInputs.getCell("C5").protection?.locked, false, "Reloaded C5 must remain unlocked");
  assert.strictEqual(reloadedInputs.getCell("C7").protection?.locked, false, "Reloaded C7 must remain unlocked");
  assert.strictEqual(reloadedInputs.getCell("C8").protection?.locked, false, "Reloaded C8 must remain unlocked");
}
console.log("   ✓ Serialized XLSX binary reloaded cleanly; formulas, outputs, and protections verified");

console.log("\n=== ALL ROI-02 WORKBOOK GENERATOR TESTS PASSED SUCCESSFULLY ===\n");
