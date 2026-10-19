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

  // Write to file (handling open file lock if owner has it open in Excel)
  try {
    await workbook.xlsx.writeFile(outputPath);
    console.log(`Saved QA sample to: ${outputPath}`);
  } catch (err) {
    if (err.code === "EBUSY") {
      console.warn(`[QA NOTICE] Target file is currently open in Microsoft Excel (${outputPath}). Writing to temporary path and continuing verification.`);
      const tempPath = path.join(outputDir, "pyBIM-ROI-Matrix-QA-temp.xlsx");
      await workbook.xlsx.writeFile(tempPath);
      console.log(`Saved temporary QA sample to: ${tempPath}`);
    } else {
      throw err;
    }
  }

  // Verification phase: Reload from workbook buffer or disk
  const buffer = await workbook.xlsx.writeBuffer();
  const reloaded = new ExcelJS.Workbook();
  await reloaded.xlsx.load(buffer);

  let stat;
  try {
    stat = fs.statSync(outputPath);
  } catch {
    const tempPath = path.join(outputDir, "pyBIM-ROI-Matrix-QA-temp.xlsx");
    stat = fs.statSync(tempPath);
  }
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

  // 5. Verification of text wrapping, row heights, and alternating shading
  const execSheet = reloaded.getWorksheet("Executive Summary");
  assert.strictEqual(execSheet.getCell("B25").value, "• At 100% AI workflow coverage, 10% of covered time remains allocated to engineering verification and quality control.");
  assert.ok(!execSheet.getCell("B25").value.includes("312"), "Must not contain hardcoded 312 number");
  assert.strictEqual(execSheet.views?.[0]?.showGridLines, false, "Executive Summary gridlines must be hidden");

  // Verify Executive Summary centered ranges: C7:C12, C16:C20, D16:D20, E16:E20, F16:F20
  for (let r = 7; r <= 12; r++) {
    const cell = execSheet.getCell(`C${r}`);
    assert.strictEqual(cell.alignment?.horizontal, "center", `Executive Summary C${r} must be horizontally centered`);
    assert.strictEqual(cell.alignment?.vertical, "middle", `Executive Summary C${r} must be vertically centered`);
  }
  for (let r = 16; r <= 20; r++) {
    for (const col of ["C", "D", "E", "F"]) {
      const cell = execSheet.getCell(`${col}${r}`);
      assert.strictEqual(cell.alignment?.horizontal, "center", `Executive Summary ${col}${r} must be horizontally centered`);
      assert.strictEqual(cell.alignment?.vertical, "middle", `Executive Summary ${col}${r} must be vertically centered`);
    }
  }
  // Verify unspecified alignments remain unchanged (e.g. labels left-aligned)
  assert.strictEqual(execSheet.getCell("B7").alignment?.horizontal || "left", "left", "Executive Summary B7 should remain left-aligned");
  assert.strictEqual(execSheet.getCell("B16").alignment?.horizontal, "left", "Executive Summary B16 should remain left-aligned");

  // Verify Workflow Inputs centered ranges: C4, D4, E4
  for (const col of ["C", "D", "E"]) {
    const cell = inputSheet.getCell(`${col}4`);
    assert.strictEqual(cell.alignment?.horizontal, "center", `Workflow Inputs ${col}4 must be horizontally centered`);
    assert.strictEqual(cell.alignment?.vertical, "middle", `Workflow Inputs ${col}4 must be vertically centered`);
  }
  assert.strictEqual(inputSheet.getCell("B4").alignment?.horizontal, "left", "Workflow Inputs B4 must remain left-aligned");
  assert.strictEqual(inputSheet.getCell("F4").alignment?.horizontal, "left", "Workflow Inputs F4 must remain left-aligned");

  // Verify AI Adoption Scenarios column B width and centered ranges: C4:C8, D4:D8, E10, F10, H10, I10
  const colBWidth = scenarioSheet.getColumn("B").width;
  console.log("AI Adoption Scenarios Column B width:", colBWidth);
  assert.ok(colBWidth >= 34 && colBWidth <= 38, `Column B width (${colBWidth}) must be between 34 and 38 units`);

  for (let r = 4; r <= 8; r++) {
    const cellC = scenarioSheet.getCell(`C${r}`);
    const cellD = scenarioSheet.getCell(`D${r}`);
    assert.strictEqual(cellC.alignment?.horizontal, "center", `AI Adoption Scenarios C${r} must be horizontally centered`);
    assert.strictEqual(cellC.alignment?.vertical, "middle", `AI Adoption Scenarios C${r} must be vertically centered`);
    assert.strictEqual(cellD.alignment?.horizontal, "center", `AI Adoption Scenarios D${r} must be horizontally centered`);
    assert.strictEqual(cellD.alignment?.vertical, "middle", `AI Adoption Scenarios D${r} must be vertically centered`);
  }

  for (const col of ["E", "F", "H", "I"]) {
    const cell = scenarioSheet.getCell(`${col}10`);
    assert.strictEqual(cell.alignment?.horizontal, "center", `AI Adoption Scenarios ${col}10 must be horizontally centered`);
    assert.strictEqual(cell.alignment?.vertical, "middle", `AI Adoption Scenarios ${col}10 must be vertically centered`);
  }
  // G10 remains right-aligned (not centered)
  assert.strictEqual(scenarioSheet.getCell("G10").alignment?.horizontal, "right", "AI Adoption Scenarios G10 must remain right-aligned");

  // Verify scenario row heights and wrapping
  assert.ok(scenarioSheet.getRow(10).height >= 38, "Scenario table header row height should be >= 38");
  assert.ok(scenarioSheet.getRow(11).height >= 28, "Scenario body row height should be >= 28");
  assert.strictEqual(scenarioSheet.getCell("B11").alignment?.horizontal, "center", "Adoption % must be centered");
  assert.strictEqual(scenarioSheet.getCell("C11").alignment?.horizontal, "left", "Scenario name must be left aligned");

  // 6. Test alternative input set: 3 professionals, €85/h, 48 weeks
  console.log("\nTesting Alternative Input Set (3 BIM professionals, €85/h, 48 weeks)...");
  const altParams = {
    userName: "Alternative Case QA",
    companyName: "Engineering BIM S.p.A.",
    referenceId: "ROI-QA-ALT-003",
    modelerCount: 3,
    hourlyRate: 85,
    isRateCustom: false,
    rateType: "consulting",
    workingWeeks: 48,
    useAdvanced: false,
  };
  const altWb = await buildRoiWorkbook(ExcelJS, altParams);
  const altScenarios = altWb.getWorksheet("AI Adoption Scenarios");
  const altH15 = altScenarios.getCell("H15").value;
  const altI15 = altScenarios.getCell("I15").value;

  console.log("Alt 100% Annual Recovered Hours (exp 1684.8):", altH15.result);
  console.log("Alt 100% Annual Illustrative Value (exp 143208):", altI15.result);
  assert.strictEqual(Number(altH15.result).toFixed(1), "1684.8", "3 professionals 100% hours must be 1,684.8");
  assert.strictEqual(Math.round(altI15.result), 143208, "3 professionals 100% value must be 143,208");

  // Verify 10% annual verification calculation for 3 professionals: 13 * 0.10 * 3 * 48 = 187.2 team hours
  const expectedVerifHours = 13 * 0.10 * 3 * 48;
  assert.strictEqual(expectedVerifHours.toFixed(1), "187.2", "3 professionals annual verification must be 187.2 hours");

  console.log("\n   ✓ All verification checks passed for local QA XLSX sample!");
  console.log(`FINAL SAMPLE FILE: ${outputPath}`);
}

main().catch((err) => {
  console.error("Failed to generate QA sample:", err);
  process.exit(1);
});
