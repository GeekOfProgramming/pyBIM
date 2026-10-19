import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import ExcelJS from "exceljs";
import { buildRoiWorkbook } from "../lib/roi/roiWorkbookBuilder.js";

async function main() {
  console.log("=== GENERATING pyBIM ROI MATRIX LOCAL QA SAMPLE XLSX ===");

  const outputDir = path.resolve("qa-output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "pyBIM-ROI-Matrix-QA.xlsx");

  const sampleParams = {
    userName: "pyBIM Internal QA",
    companyName: "pyBIM Internal QA",
    referenceId: "ROI-QA-LOCAL-001",
    modelerCount: 1,
    hourlyRate: 85,
    isRateCustom: false,
    rateType: "consulting",
    workingWeeks: 48,
    useAdvanced: false,
  };

  console.log("Building workbook with parameters:", JSON.stringify(sampleParams, null, 2));

  // Build workbook using the exact project implementation
  const workbook = await buildRoiWorkbook(ExcelJS, sampleParams);

  // Assert fullCalcOnLoad on the built workbook
  assert.strictEqual(workbook.calcProperties.fullCalcOnLoad, true, "fullCalcOnLoad must be true on built workbook");

  // Write directly to file
  await workbook.xlsx.writeFile(outputPath);
  console.log(`Saved QA sample to: ${outputPath}`);

  // Verification phase: Reload from disk
  const reloaded = new ExcelJS.Workbook();
  await reloaded.xlsx.readFile(outputPath);

  const stat = fs.statSync(outputPath);
  console.log(`File Size: ${stat.size} bytes`);
  assert.ok(stat.size > 10000, "XLSX file must be nonempty and greater than 10KB");

  // 1. Worksheet count and names
  const sheetNames = reloaded.worksheets.map(w => w.name);
  console.log("Generated Sheet Names:", sheetNames);
  assert.strictEqual(sheetNames.length, 4, "Must contain exactly four worksheets");
  assert.deepStrictEqual(sheetNames, [
    "Executive Summary",
    "Workflow Inputs",
    "AI Adoption Scenarios",
    "Assumptions & Sources"
  ]);

  // 2. Workflow Inputs checks
  const inputSheet = reloaded.getWorksheet("Workflow Inputs");
  assert.ok(inputSheet.sheetProtection, "Workflow Inputs must have active protection");

  const cellC5 = inputSheet.getCell("C5"); // Modeler count
  console.log("Workflow Inputs C5:", { val: cellC5.value, locked: cellC5.protection?.locked });
  assert.strictEqual(Number(cellC5.value), 1, "C5 must equal 1");
  assert.strictEqual(cellC5.protection?.locked, false, "C5 must be unlocked/editable");

  const cellC7 = inputSheet.getCell("C7"); // Hourly rate
  console.log("Workflow Inputs C7:", { val: cellC7.value, locked: cellC7.protection?.locked });
  assert.strictEqual(Number(cellC7.value), 85, "C7 must equal 85");
  assert.strictEqual(cellC7.protection?.locked, false, "C7 must be unlocked/editable");

  const cellC8 = inputSheet.getCell("C8"); // Working weeks
  console.log("Workflow Inputs C8:", { val: cellC8.value, locked: cellC8.protection?.locked });
  assert.strictEqual(Number(cellC8.value), 48, "C8 must equal 48");
  assert.strictEqual(cellC8.protection?.locked, false, "C8 must be unlocked/editable");

  const cellC9 = inputSheet.getCell("C9"); // Autodesk 13h benchmark
  console.log("Workflow Inputs C9:", { val: cellC9.value, locked: cellC9.protection?.locked });
  assert.strictEqual(Number(cellC9.value), 13, "C9 must equal 13");
  assert.strictEqual(cellC9.protection?.locked !== false, true, "C9 must be protected");

  const cellC10 = inputSheet.getCell("C10"); // Human verification 10%
  console.log("Workflow Inputs C10:", { val: cellC10.value, locked: cellC10.protection?.locked });
  assert.strictEqual(Number(cellC10.value), 0.1, "C10 must equal 0.10 (10%)");
  assert.strictEqual(cellC10.protection?.locked !== false, true, "C10 must be protected");

  // 3. AI Adoption Scenarios checks (Rows 11 to 15, H=Hours, I=Value)
  const scenarioSheet = reloaded.getWorksheet("AI Adoption Scenarios");
  assert.ok(scenarioSheet.sheetProtection, "AI Adoption Scenarios must have active protection");

  const expectedOutputs = [
    { row: 11, pct: 0.20, hours: 112.32, value: 9547.20 },
    { row: 12, pct: 0.40, hours: 224.64, value: 19094.40 },
    { row: 13, pct: 0.60, hours: 336.96, value: 28641.60 },
    { row: 14, pct: 0.80, hours: 449.28, value: 38188.80 },
    { row: 15, pct: 1.00, hours: 561.60, value: 47736.00 },
  ];

  for (const exp of expectedOutputs) {
    const pctCell = scenarioSheet.getCell(`B${exp.row}`);
    const netCell = scenarioSheet.getCell(`F${exp.row}`);
    const hoursCell = scenarioSheet.getCell(`H${exp.row}`);
    const valueCell = scenarioSheet.getCell(`I${exp.row}`);

    assert.strictEqual(pctCell.protection?.locked !== false, true, `B${exp.row} adoption pct must be protected`);
    assert.strictEqual(Number(pctCell.value), exp.pct, `B${exp.row} must equal ${exp.pct}`);

    // Check genuine formulas exist
    assert.ok(netCell.value?.formula, `F${exp.row} net formula must exist`);
    assert.ok(hoursCell.value?.formula, `H${exp.row} recovered hours formula must exist`);
    assert.ok(valueCell.value?.formula, `I${exp.row} annual value formula must exist`);

    // Check cached values match approved reference outputs
    const actualHours = hoursCell.value.result;
    const actualValue = valueCell.value.result;

    console.log(`Tier ${(exp.pct * 100)}%: formula hours=${actualHours} (exp ${exp.hours}), formula val=${actualValue} (exp ${exp.value})`);
    assert.strictEqual(actualHours.toFixed(2), exp.hours.toFixed(2), `Tier ${exp.pct} hours must match`);
    assert.strictEqual(actualValue.toFixed(2), exp.value.toFixed(2), `Tier ${exp.pct} value must match`);
  }

  // 4. Assumptions & Sources Autodesk links
  const sourcesSheet = reloaded.getWorksheet("Assumptions & Sources");
  assert.ok(sourcesSheet.sheetProtection, "Assumptions & Sources must have active protection");

  const blogLink = sourcesSheet.getCell("C9").value;
  const reportLink = sourcesSheet.getCell("C10").value;

  console.log("Sources C9 blog link:", blogLink);
  console.log("Sources C10 report link:", reportLink);

  assert.ok(blogLink && typeof blogLink === "object" && blogLink.hyperlink.includes("autodesk.com"), "C9 blog hyperlink must be present");
  assert.ok(reportLink && typeof reportLink === "object" && reportLink.hyperlink.includes("autodesk.com"), "C10 report hyperlink must be present");

  console.log("\n   ✓ All verification checks passed for local QA XLSX sample!");
  console.log(`FINAL SAMPLE FILE: ${outputPath}`);
}

main().catch((err) => {
  console.error("Failed to generate QA sample:", err);
  process.exit(1);
});
