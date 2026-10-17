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
  // 5a. Reference Case (Owner Decision & Review Standard):
  // 5 modelers, €85/h, 13 weekly hours, 48 working weeks, 35% hypothetical recovery
  const referenceInputs = {
    modelerCount: 5,
    hourlyRate: 85,
    searchHours: 13,
    workingWeeks: 48,
    rateType: "consulting",
    region: "global"
  };
  const refPreview = calculateRoiPreview({ quickEstimate: referenceInputs });

  // Baseline team repetitive hours: 5 * 13 * 48 = 3,120 hrs/yr
  assert.strictEqual(refPreview.baseline.annualRepetitiveHoursTeam, 3120);
  assert.strictEqual(refPreview.baseline.annualAllocatedValue, 3120 * 85); // €265,200

  // Expected Scenario (35% hypothetical recovery):
  // Full-precision intermediate: 3,120 * 0.35 = exactly 1,092.0 hours/year
  // Full-precision value: 1,092 * 85 = exactly €92,820/year
  assert.strictEqual(refPreview.scenarios.expected.annualRecoveredHours, 1092, "Reference case must equal exactly 1,092 hrs/yr");
  assert.strictEqual(refPreview.scenarios.expected.annualIllustrativeValue, 92820, "Reference case must equal exactly €92,820/yr");
  // Regression test: must detect and prevent the previous 1,104-hour premature rounding defect
  assert.notStrictEqual(refPreview.scenarios.expected.annualRecoveredHours, 1104, "Must not suffer from previous 1,104-hour premature rounding defect");
  assert.strictEqual(refPreview.scenarios.expected.isHypotheticalPlaceholder, true, "Scenario rates must be marked hypothetical placeholders");
  assert.strictEqual(refPreview.scenarios.expected.status, "unapproved_placeholder");

  // Conservative Scenario (20%): 3,120 * 0.20 = exactly 624.0 hours/year -> €53,040
  assert.strictEqual(refPreview.scenarios.conservative.annualRecoveredHours, 624);
  assert.strictEqual(refPreview.scenarios.conservative.annualIllustrativeValue, 624 * 85);

  // Optimized Scenario (50%): 3,120 * 0.50 = exactly 1,560.0 hours/year -> €132,600
  assert.strictEqual(refPreview.scenarios.optimized.annualRecoveredHours, 1560);
  assert.strictEqual(refPreview.scenarios.optimized.annualIllustrativeValue, 1560 * 85);

  // 5b. Rate-Type Integrity & Distinction
  console.log("   Testing Rate-Type Integrity & Output Metric Disambiguation...");
  const internalLaborInputs = {
    ...referenceInputs,
    rateType: "internal_labor",
    hourlyRate: 55 // Customer entered their own internal loaded rate
  };
  const internalPreview = calculateRoiPreview({ quickEstimate: internalLaborInputs });
  assert.strictEqual(internalPreview.scenarios.expected.valuationTypeLabel, "Hypothetical Internal Labor Capacity Value (€)");
  assert.strictEqual(refPreview.scenarios.expected.valuationTypeLabel, "Hypothetical Consulting Billing Capacity Value (€)");
  assert.strictEqual(internalPreview.scenarios.expected.annualIllustrativeValue, 1092 * 55);
  // Ensure no aggregation of billing capacity and internal labor savings
  assert.strictEqual(internalPreview.aggregatedSavingsAndBilling, undefined, "Must never aggregate billing capacity with cash cost savings");

  // 5c. 2-Modeler Standard Case Verification (with full precision intermediate math)
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
  assert.strictEqual(preview.baseline.annualAllocatedValue, 106080);

  // Conservative (20%): 1248 * 0.20 = 249.6 -> round to 250 hrs. Value: 249.6 * 85 = 21216 -> 21216
  assert.strictEqual(preview.scenarios.conservative.annualRecoveredHours, 250);
  assert.strictEqual(preview.scenarios.conservative.annualIllustrativeValue, 21216);

  // Expected (35%): 1248 * 0.35 = 436.8 -> round to 437 hrs. Value: 436.8 * 85 = 37128 -> 37128
  assert.strictEqual(preview.scenarios.expected.annualRecoveredHours, 437);
  assert.strictEqual(preview.scenarios.expected.annualIllustrativeValue, 37128);

  // Optimized (50%): 1248 * 0.50 = 624.0 -> round to 624 hrs. Value: 624 * 85 = 53040
  assert.strictEqual(preview.scenarios.optimized.annualRecoveredHours, 624);
  assert.strictEqual(preview.scenarios.optimized.annualIllustrativeValue, 53040);

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
  // Conservative (20%): 1920 * 0.20 = 384 hrs -> 384 * 85 = 32640
  assert.strictEqual(advPreview.scenarios.conservative.annualRecoveredHours, 384);
  assert.strictEqual(advPreview.scenarios.conservative.annualIllustrativeValue, 384 * 85);
}
console.log("   ✓ Preview calculations generate accurate, realistic scenarios without hardcoded prices");

console.log("\n=== ALL ROI-01 SCHEMA & CALCULATION TESTS PASSED SUCCESSFULLY ===\n");
