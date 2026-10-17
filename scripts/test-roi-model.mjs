import assert from "node:assert";
import {
  ROI_SCHEMA_VERSION,
  AUTODESK_CITATION,
  BENCHMARK_DEFAULTS,
  REGIONAL_CONTEXTS,
  validateQuickEstimate,
  validateAdvancedAssessment,
  calculateRoiPreview,
} from "../lib/roi/roiSchema.js";

console.log("=== RUNNING ROI-01 SHARED DATA SCHEMA & CALCULATION ENGINE SUITE ===\n");

// 1. Benchmark Defaults & Autodesk Citation Invariants
console.log("1. Testing Benchmark Defaults & Autodesk Citation Invariants...");
assert.strictEqual(BENCHMARK_DEFAULTS.HOURLY_RATE, 85, "Hourly rate default must be €85/hour");
assert.strictEqual(BENCHMARK_DEFAULTS.SEARCH_HOURS_WEEK, 13, "Autodesk search reference must be 13 hrs/wk");
assert.strictEqual(BENCHMARK_DEFAULTS.WORKING_WEEKS_YEAR, 48, "Working weeks initial assumption must be 48");
assert.strictEqual(BENCHMARK_DEFAULTS.RATE_TYPE_DEFAULT, "consulting", "Default rate classification must be consulting");
assert.ok(AUTODESK_CITATION.primaryReportUrl.includes("boards.autodesk.com"), "Autodesk citation must include primary report URL");
assert.ok(AUTODESK_CITATION.blogUrl.includes("blogs/construction"), "Autodesk citation must include blog URL");
assert.ok(AUTODESK_CITATION.disclaimer.includes("not verified modeler waste"), "Autodesk citation must disclaim modeler waste");
console.log("   ✓ Approved benchmark constants and citations verified");

// 2. Quick Estimate Validation & Boundary Handling
console.log("2. Testing Quick Estimate Validation & Bounds...");
{
  // Valid baseline
  const res = validateQuickEstimate({
    modelerCount: "5",
    hourlyRate: "85",
    searchHours: "13",
    workingWeeks: "48",
    rateType: "consulting",
    region: "global"
  });
  assert.strictEqual(res.valid, true);
  assert.strictEqual(res.sanitized.modelerCount, 5);
  assert.strictEqual(res.sanitized.hourlyRate, 85);
  assert.strictEqual(res.sanitized.searchHours, 13);
  assert.strictEqual(res.sanitized.workingWeeks, 48);
  assert.strictEqual(res.sanitized.rateType, "consulting");

  // Custom rate allowed
  const customRateRes = validateQuickEstimate({
    modelerCount: 3,
    hourlyRate: 145.5,
    searchHours: 10,
    workingWeeks: 46,
    rateType: "internal_labor"
  });
  assert.strictEqual(customRateRes.valid, true);
  assert.strictEqual(customRateRes.sanitized.hourlyRate, 145.5);
  assert.strictEqual(customRateRes.sanitized.rateType, "internal_labor");

  // Invalid modelers
  const invalidModelers = validateQuickEstimate({ modelerCount: "0" });
  assert.strictEqual(invalidModelers.valid, false);
  assert.ok(invalidModelers.errors.modelerCount);

  // Invalid rate
  const invalidRate = validateQuickEstimate({ hourlyRate: "-10" });
  assert.strictEqual(invalidRate.valid, false);
  assert.ok(invalidRate.errors.hourlyRate);

  // Invalid weeks
  const invalidWeeks = validateQuickEstimate({ workingWeeks: "55" });
  assert.strictEqual(invalidWeeks.valid, false);
  assert.ok(invalidWeeks.errors.workingWeeks);
}
console.log("   ✓ Quick Estimate validation cleanly enforces boundaries");

// 3. Regional Context Non-Destructive Behavior
console.log("3. Testing Regional Context Non-Destructive Behavior...");
{
  const customRate = 120.0;
  // User enters custom rate and selects DACH
  const dachRes = validateQuickEstimate({
    hourlyRate: customRate,
    region: "dach"
  });
  assert.strictEqual(dachRes.sanitized.hourlyRate, 120.0, "Selecting DACH must NOT alter customer's custom rate");
  assert.strictEqual(dachRes.sanitized.region, "dach");

  // User selects Italy
  const itRes = validateQuickEstimate({
    hourlyRate: customRate,
    region: "it"
  });
  assert.strictEqual(itRes.sanitized.hourlyRate, 120.0, "Selecting Italy must NOT alter customer's custom rate");
  assert.strictEqual(itRes.sanitized.region, "it");

  // Unknown region falls back to global
  const unknownRes = validateQuickEstimate({
    hourlyRate: customRate,
    region: "mars"
  });
  assert.strictEqual(unknownRes.sanitized.region, "global");
  assert.strictEqual(unknownRes.sanitized.hourlyRate, 120.0);
}
console.log("   ✓ Regional context provides market context only and never overwrites user rate");

// 4. Advanced Workflow Assessment & Double-Counting Safeguards
console.log("4. Testing Advanced Workflow Assessment & Zero Double-Counting...");
{
  const advRes = validateAdvancedAssessment({
    searchHours: "8",
    manualDataEntryHours: "4",
    disciplineWorkflowsHours: "6",
    nonAutomatableJudgmentHours: "20"
  });
  assert.strictEqual(advRes.valid, true);
  assert.strictEqual(advRes.sanitized.searchHours, 8);
  assert.strictEqual(advRes.sanitized.manualDataEntryHours, 4);
  assert.strictEqual(advRes.sanitized.disciplineWorkflowsHours, 6);
  assert.strictEqual(advRes.sanitized.nonAutomatableJudgmentHours, 20);
  assert.strictEqual(advRes.sanitized.repetitiveWeeklyHours, 18, "Repetitive total must equal 8 + 4 + 6 = 18");
  assert.strictEqual(advRes.sanitized.totalAssessedHours, 38, "Total assessed hours must equal 18 + 20 = 38");

  // Exceeding weekly max 60 hrs
  const excessive = validateAdvancedAssessment({
    searchHours: "25",
    manualDataEntryHours: "20",
    disciplineWorkflowsHours: "20",
    nonAutomatableJudgmentHours: "10"
  });
  assert.strictEqual(excessive.valid, false);
  assert.ok(excessive.errors.grandTotal, "Should error when total hours exceed 60 hrs/wk");
}
console.log("   ✓ Advanced assessment cleanly calculates repetitive total and isolates judgment");

// 5. Calculation Engine Preview & Scenario Consistency
console.log("5. Testing Preview Calculations & Realistic Scenarios...");
{
  // Quick Estimate Calculation
  const qInputs = {
    modelerCount: 2,
    hourlyRate: 85,
    searchHours: 13,
    workingWeeks: 48,
    rateType: "consulting",
    region: "global"
  };
  const preview = calculateRoiPreview({ quickEstimate: qInputs });

  // Baseline repetitive hours = 13 * 48 * 2 = 1248 hrs/yr
  assert.strictEqual(preview.baseline.annualRepetitiveHoursTeam, 1248);
  // Annual allocated value = 1248 * 85 = €106,080
  assert.strictEqual(preview.baseline.annualAllocatedValue, 106080);

  // Conservative (20%): 13 * 0.20 = 2.6 hrs/wk/person -> 2.6 * 48 * 2 = 249.6 ~ 250 hrs
  assert.strictEqual(preview.scenarios.conservative.weeklyRecoveredHoursPerPerson, 2.6);
  assert.strictEqual(preview.scenarios.conservative.annualRecoveredHours, 250);
  assert.strictEqual(preview.scenarios.conservative.annualIllustrativeValue, 250 * 85);

  // Expected (35%): 13 * 0.35 = 4.55 ~ 4.6 hrs/wk/person -> 4.6 * 48 * 2 = 441.6 ~ 442 hrs
  assert.strictEqual(preview.scenarios.expected.weeklyRecoveredHoursPerPerson, 4.6);
  assert.strictEqual(preview.scenarios.expected.annualRecoveredHours, 442);
  assert.strictEqual(preview.scenarios.expected.annualIllustrativeValue, 442 * 85);

  // Optimized (50%): 13 * 0.50 = 6.5 hrs/wk/person -> 6.5 * 48 * 2 = 624 hrs
  assert.strictEqual(preview.scenarios.optimized.weeklyRecoveredHoursPerPerson, 6.5);
  assert.strictEqual(preview.scenarios.optimized.annualRecoveredHours, 624);
  assert.strictEqual(preview.scenarios.optimized.annualIllustrativeValue, 624 * 85);

  // Check that no arbitrary 85% or 100% fantasy scenario exists
  assert.strictEqual(preview.scenarios["100%"], undefined);
  assert.ok(!JSON.stringify(preview).includes("9500"), "Must not include hardcoded €9500 software implementation price");
  assert.ok(preview.disclaimer.includes("illustrative"), "Must include transparent illustrative disclaimer");

  // Advanced Assessment Calculation
  const advInputs = {
    searchHours: 10,
    manualDataEntryHours: 5,
    disciplineWorkflowsHours: 5,
    nonAutomatableJudgmentHours: 15,
    repetitiveWeeklyHours: 20,
    totalAssessedHours: 35
  };
  const advPreview = calculateRoiPreview({
    quickEstimate: qInputs,
    useAdvanced: true,
    advancedAssessment: advInputs
  });
  // Repetitive weekly hours = 20 (replaces 13 from quick search)
  // Annual repetitive hours = 20 * 48 * 2 = 1920 hrs/yr
  assert.strictEqual(advPreview.baseline.annualRepetitiveHoursTeam, 1920);
  // Protected judgment hours = 15 * 48 * 2 = 1440 hrs/yr
  assert.strictEqual(advPreview.baseline.annualJudgmentHoursTeam, 1440);
  // Conservative (20%): 20 * 0.20 = 4.0 hrs/wk/person -> 4.0 * 48 * 2 = 384 hrs
  assert.strictEqual(advPreview.scenarios.conservative.annualRecoveredHours, 384);
}
console.log("   ✓ Preview calculations generate accurate, realistic scenarios without hardcoded prices");

console.log("\n=== ALL ROI-01 SCHEMA & CALCULATION TESTS PASSED SUCCESSFULLY ===\n");
