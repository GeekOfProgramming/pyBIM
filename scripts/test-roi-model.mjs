import assert from "node:assert";
import {
  ROI_SCHEMA_VERSION,
  AUTODESK_REFERENCE_HOURS_PER_WEEK,
  HUMAN_VERIFICATION_RATE,
  DEFAULT_CONSULTING_RATE,
  DEFAULT_WORKING_WEEKS,
  AUTODESK_CITATION,
  BENCHMARK_DEFAULTS,
  REGIONAL_CONTEXTS,
  AI_ADOPTION_SCENARIOS,
  validateQuickEstimate,
  validateAdvancedAssessment,
  calculateRoiPreview,
} from "../lib/roi/roiSchema.js";

console.log("=== RUNNING ROI-01 FINAL OWNER DECISIONS TEST SUITE ===\n");

// 1. Benchmark Defaults & Autodesk Citation Invariants
console.log("1. Testing Benchmark Defaults & Autodesk Citation Invariants...");
assert.strictEqual(AUTODESK_REFERENCE_HOURS_PER_WEEK, 13, "Autodesk benchmark must be immutable 13 hrs/wk");
assert.strictEqual(HUMAN_VERIFICATION_RATE, 0.10, "Human verification allowance must be exactly 10% (0.10)");
assert.strictEqual(DEFAULT_CONSULTING_RATE, 85, "Hourly consulting rate default must be €85/hour");
assert.strictEqual(DEFAULT_WORKING_WEEKS, 48, "Working weeks default must be 48");
assert.strictEqual(BENCHMARK_DEFAULTS.HOURLY_RATE, 85);
assert.strictEqual(BENCHMARK_DEFAULTS.SEARCH_HOURS_WEEK, 13);
assert.strictEqual(BENCHMARK_DEFAULTS.WORKING_WEEKS_YEAR, 48);
assert.strictEqual(BENCHMARK_DEFAULTS.HUMAN_VERIFICATION_RATE, 0.10);
assert.strictEqual(BENCHMARK_DEFAULTS.RATE_TYPE_DEFAULT, "consulting");

// Five fixed AI adoption scenarios (20%, 40%, 60%, 80%, 100%)
const expectedScenarioKeys = ["scenario_20", "scenario_40", "scenario_60", "scenario_80", "scenario_100"];
const actualScenarioKeys = Object.keys(AI_ADOPTION_SCENARIOS);
assert.deepStrictEqual(actualScenarioKeys, expectedScenarioKeys, "Must contain exactly the five approved AI adoption scenarios");
assert.strictEqual(AI_ADOPTION_SCENARIOS.scenario_20.adoptionRate, 0.20);
assert.strictEqual(AI_ADOPTION_SCENARIOS.scenario_40.adoptionRate, 0.40);
assert.strictEqual(AI_ADOPTION_SCENARIOS.scenario_60.adoptionRate, 0.60);
assert.strictEqual(AI_ADOPTION_SCENARIOS.scenario_80.adoptionRate, 0.80);
assert.strictEqual(AI_ADOPTION_SCENARIOS.scenario_100.adoptionRate, 1.00);

// Citations and disclaimers
assert.ok(AUTODESK_CITATION.primaryReportUrl.includes("boards.autodesk.com"), "Autodesk citation must include primary report URL");
assert.ok(AUTODESK_CITATION.blogUrl.includes("blogs/construction"), "Autodesk citation must include blog URL");
assert.ok(AUTODESK_CITATION.disclaimer.includes("across surveyed construction roles"), "Citation must disclose general search across construction roles");
assert.ok(AUTODESK_CITATION.disclaimer.includes("not verified modeler waste"), "Citation must disclaim modeler waste");
assert.ok(AUTODESK_CITATION.disclaimer.includes("does not prove that all 13 hours can be eliminated"), "Citation must state 13h cannot all be eliminated");
console.log("   ✓ Approved benchmark constants, five scenarios, and Autodesk citations verified");

// 2. Quick Estimate Validation, Optional Rate Fallback, and Bounds
console.log("2. Testing Quick Estimate Validation, Optional Rate Fallback & Bounds...");
{
  // 2a. Blank consulting rate falls back to exactly €85/h
  const blankRateRes = validateQuickEstimate({
    modelerCount: "5",
    hourlyRate: "", // User leaves website field blank
    workingWeeks: "48",
    rateType: "consulting",
    region: "global"
  });
  assert.strictEqual(blankRateRes.valid, true, "Blank consulting rate must be valid");
  assert.strictEqual(blankRateRes.sanitized.hourlyRate, 85, "Blank consulting rate must default to exactly €85/h");
  assert.strictEqual(blankRateRes.sanitized.isRateCustom, false, "Rate must be flagged as non-custom default");
  assert.strictEqual(blankRateRes.sanitized.searchHours, 13, "Search hours must be locked to 13");

  // 2b. Null or undefined rate also falls back to €85/h
  const undefinedRateRes = validateQuickEstimate({
    modelerCount: 5,
    rateType: "consulting"
  });
  assert.strictEqual(undefinedRateRes.valid, true);
  assert.strictEqual(undefinedRateRes.sanitized.hourlyRate, 85);
  assert.strictEqual(undefinedRateRes.sanitized.isRateCustom, false);

  // 2c. Custom valid positive rate is strictly preserved
  const customRateRes = validateQuickEstimate({
    modelerCount: 5,
    hourlyRate: "125.50",
    rateType: "consulting"
  });
  assert.strictEqual(customRateRes.valid, true);
  assert.strictEqual(customRateRes.sanitized.hourlyRate, 125.50);
  assert.strictEqual(customRateRes.sanitized.isRateCustom, true);

  // 2d. Reject invalid non-empty consulting entries (zero, negative, non-numeric, > 2000)
  const zeroRate = validateQuickEstimate({ hourlyRate: "0" });
  assert.strictEqual(zeroRate.valid, false, "Zero rate must be rejected");
  assert.ok(zeroRate.errors.hourlyRate);

  const negRate = validateQuickEstimate({ hourlyRate: "-25" });
  assert.strictEqual(negRate.valid, false, "Negative rate must be rejected");
  assert.ok(negRate.errors.hourlyRate);

  const nonNumRate = validateQuickEstimate({ hourlyRate: "eighty-five" });
  assert.strictEqual(nonNumRate.valid, false, "Non-numeric rate must be rejected");
  assert.ok(nonNumRate.errors.hourlyRate);

  const excessiveRate = validateQuickEstimate({ hourlyRate: "2500" });
  assert.strictEqual(excessiveRate.valid, false, "Rate over €2,000 must be rejected");
  assert.ok(excessiveRate.errors.hourlyRate);

  // 2e. Internal Loaded Labor Cost requires an explicitly supplied internal rate
  const blankInternal = validateQuickEstimate({
    modelerCount: 5,
    rateType: "internal_labor",
    hourlyRate: "" // Blank internal rate
  });
  assert.strictEqual(blankInternal.valid, false, "Internal labor cost CANNOT be blank");
  assert.ok(blankInternal.errors.hourlyRate, "Must require explicitly supplied internal rate");

  const validInternal = validateQuickEstimate({
    modelerCount: 5,
    rateType: "internal_labor",
    hourlyRate: "62.50"
  });
  assert.strictEqual(validInternal.valid, true);
  assert.strictEqual(validInternal.sanitized.hourlyRate, 62.50);
  assert.strictEqual(validInternal.sanitized.rateType, "internal_labor");

  // 2f. Search hours immutable: any passed value is normalized to 13
  const tamperedSearch = validateQuickEstimate({
    modelerCount: 5,
    searchHours: "25" // Attempting to pass 25
  });
  assert.strictEqual(tamperedSearch.sanitized.searchHours, 13, "Search hours must remain locked to 13");

  // 2g. Modeler count and working week bounds
  const invalidModelers = validateQuickEstimate({ modelerCount: "0" });
  assert.strictEqual(invalidModelers.valid, false);
  const invalidWeeks = validateQuickEstimate({ workingWeeks: "55" });
  assert.strictEqual(invalidWeeks.valid, false);
}
console.log("   ✓ Optional rate fallback, validation bounds, and internal rate isolation verified");

// 3. Required Numerical Regression Tests (Owner Reference Case)
console.log("3. Testing Required Numerical Regression Tests (N=5, R=85, B=13, W=48, V=0.10)...");
{
  const refInputs = {
    modelerCount: 5,
    hourlyRate: 85,
    searchHours: 13,
    workingWeeks: 48,
    rateType: "consulting",
    region: "global"
  };
  const preview = calculateRoiPreview({ quickEstimate: refInputs });

  // Baseline team repetitive hours: 5 * 13 * 48 = 3,120 hrs/yr
  assert.strictEqual(preview.baseline.annualRepetitiveHoursTeam, 3120);
  assert.strictEqual(preview.baseline.annualAllocatedValue, 3120 * 85); // €265,200

  // Expected regression outputs table:
  // Adoption | Annual Recovered Hours | Illustrative Value
  // 20%      | 561.6                  | €47,736
  // 40%      | 1,123.2                | €95,472
  // 60%      | 1,684.8                | €143,208
  // 80%      | 2,246.4                | €190,944
  // 100%     | 2,808.0                | €238,680
  const expectedTable = [
    { key: "scenario_20", adoption: 0.20, expectedHours: 561.6, expectedValue: 47736 },
    { key: "scenario_40", adoption: 0.40, expectedHours: 1123.2, expectedValue: 95472 },
    { key: "scenario_60", adoption: 0.60, expectedHours: 1684.8, expectedValue: 143208 },
    { key: "scenario_80", adoption: 0.80, expectedHours: 2246.4, expectedValue: 190944 },
    { key: "scenario_100", adoption: 1.00, expectedHours: 2808.0, expectedValue: 238680 },
  ];

  for (const exp of expectedTable) {
    const sc = preview.scenarios[exp.key];
    assert.ok(sc, `Scenario ${exp.key} must exist`);
    assert.strictEqual(sc.adoptionRate, exp.adoption);
    assert.strictEqual(sc.humanVerificationRate, 0.10);

    // Full-precision assertions
    assert.strictEqual(
      sc.annualRecoveredHours,
      exp.expectedHours,
      `${exp.key} annualRecoveredHours must equal exactly ${exp.expectedHours}`
    );
    assert.strictEqual(
      sc.annualIllustrativeValue,
      exp.expectedValue,
      `${exp.key} annualIllustrativeValue must equal exactly €${exp.expectedValue}`
    );

    // Weekly per-person intermediate formula assertions
    const expectedAiCovered = Math.round(13 * exp.adoption * 10) / 10;
    const expectedVerification = Math.round(13 * exp.adoption * 0.10 * 10) / 10;
    const expectedNetRecovered = Math.round(13 * exp.adoption * 0.90 * 10) / 10;
    const expectedRemaining = Math.round((13 - 13 * exp.adoption * 0.90) * 10) / 10;

    assert.strictEqual(sc.aiCoveredHoursPerWeek, expectedAiCovered);
    assert.strictEqual(sc.verificationHoursPerWeek, expectedVerification);
    assert.strictEqual(sc.weeklyRecoveredHoursPerPerson, expectedNetRecovered);
    assert.strictEqual(sc.remainingBaselineHoursPerWeek, expectedRemaining);
  }

  // Critical Regression Test: 100% adoption must NOT report 100% time elimination (3,120 hrs)
  assert.notStrictEqual(preview.scenarios.scenario_100.annualRecoveredHours, 3120, "100% adoption must NOT report 3,120 hours");
  assert.strictEqual(preview.scenarios.scenario_100.annualRecoveredHours, 2808.0, "100% adoption must retain 10% (312 hrs) for verification");
  assert.strictEqual(preview.baseline.annualRepetitiveHoursTeam - preview.scenarios.scenario_100.annualRecoveredHours, 312.0);

  // 3b. Test blank-rate fallback produces the identical regression outputs
  const blankValidated = validateQuickEstimate({
    modelerCount: 5,
    hourlyRate: "", // blank
    workingWeeks: 48,
    rateType: "consulting"
  });
  const blankPreview = calculateRoiPreview({ quickEstimate: blankValidated.sanitized });
  assert.strictEqual(blankPreview.scenarios.scenario_20.annualRecoveredHours, 561.6);
  assert.strictEqual(blankPreview.scenarios.scenario_20.annualIllustrativeValue, 47736);
  assert.strictEqual(blankPreview.scenarios.scenario_100.annualRecoveredHours, 2808.0);
  assert.strictEqual(blankPreview.scenarios.scenario_100.annualIllustrativeValue, 238680);

  // 3c. Test custom rate propagation
  const customValidated = validateQuickEstimate({
    modelerCount: 5,
    hourlyRate: "100.00", // custom €100/h
    workingWeeks: 48,
    rateType: "consulting"
  });
  const customPreview = calculateRoiPreview({ quickEstimate: customValidated.sanitized });
  assert.strictEqual(customPreview.scenarios.scenario_20.annualRecoveredHours, 561.6);
  assert.strictEqual(customPreview.scenarios.scenario_20.annualIllustrativeValue, 56160); // 561.6 * 100
  assert.strictEqual(customPreview.scenarios.scenario_100.annualIllustrativeValue, 280800); // 2808.0 * 100

  // 3d. Check disclaimers and verification notice
  assert.ok(preview.verificationAllowanceNotice.includes("fixed 10% engineering verification allowance"));
  assert.ok(preview.verificationAllowanceNotice.includes("owner-selected planning assumption"));
  assert.ok(preview.disclaimer.includes("illustrative capacity valuation"));
  assert.ok(!JSON.stringify(preview).includes("9500"), "Must not contain fabricated €9500 price");
}
console.log("   ✓ All five required numerical regression cases asserted with exact precision");

// 4. Regional Context Non-Destructive Behavior
console.log("4. Testing Regional Context Non-Destructive Behavior...");
{
  const customRate = 120.0;
  const dachRes = validateQuickEstimate({ hourlyRate: customRate, region: "dach" });
  assert.strictEqual(dachRes.sanitized.hourlyRate, 120.0, "Selecting DACH must NOT alter customer's custom rate");
  assert.strictEqual(dachRes.sanitized.region, "dach");

  const itRes = validateQuickEstimate({ hourlyRate: customRate, region: "it" });
  assert.strictEqual(itRes.sanitized.hourlyRate, 120.0, "Selecting Italy must NOT alter customer's custom rate");
  assert.strictEqual(itRes.sanitized.region, "it");

  const unknownRes = validateQuickEstimate({ hourlyRate: customRate, region: "mars" });
  assert.strictEqual(unknownRes.sanitized.region, "global");
}
console.log("   ✓ Regional context preserves custom rate unconditionally");

// 5. Rate-Type Integrity & Distinction
console.log("5. Testing Rate-Type Integrity & Disambiguation...");
{
  const internalLaborInputs = {
    modelerCount: 5,
    workingWeeks: 48,
    rateType: "internal_labor",
    hourlyRate: 55 // Customer entered their own internal loaded rate
  };
  const internalPreview = calculateRoiPreview({ quickEstimate: internalLaborInputs });
  assert.strictEqual(internalPreview.baseline.valuationTypeLabel, "Hypothetical Internal Labor Capacity Value (€)");
  assert.strictEqual(internalPreview.scenarios.scenario_20.valuationTypeLabel, "Hypothetical Internal Labor Capacity Value (€)");
  assert.strictEqual(internalPreview.scenarios.scenario_20.annualIllustrativeValue, Math.round(561.6 * 55));
  assert.strictEqual(internalPreview.aggregatedSavingsAndBilling, undefined, "Must never aggregate billing capacity with cash cost savings");
}
console.log("   ✓ Rate types strictly segregated; no aggregation of capacity and cash savings");

// 6. Advanced Workflow Assessment Diagnostic Safeguards
console.log("6. Testing Advanced Workflow Assessment Diagnostic Safeguards...");
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
  assert.strictEqual(advRes.sanitized.repetitiveWeeklyHours, 18);
  assert.strictEqual(advRes.sanitized.totalAssessedHours, 38);

  // Standard scenario preview calculation with advanced assessment attached:
  // Standard scenario model remains locked to 13h benchmark (AUTODESK_REFERENCE_HOURS_PER_WEEK)
  // to avoid double counting, while advanced numbers serve as diagnostic breakdown.
  const previewWithAdv = calculateRoiPreview({
    quickEstimate: { modelerCount: 5, hourlyRate: 85, workingWeeks: 48, rateType: "consulting" },
    useAdvanced: true,
    advancedAssessment: advRes.sanitized
  });
  // Repetitive annual baseline is still 13 * 5 * 48 = 3,120
  assert.strictEqual(previewWithAdv.baseline.annualRepetitiveHoursTeam, 3120);
  assert.strictEqual(previewWithAdv.scenarios.scenario_20.annualRecoveredHours, 561.6);
  // Protected judgment is computed independently
  assert.strictEqual(previewWithAdv.baseline.annualJudgmentHoursTeam, 20 * 48 * 5); // 4,800 hrs

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
console.log("   ✓ Advanced assessment operates as diagnostic tool without double-counting benchmark");

console.log("\n=== ALL ROI-01 TESTS PASSED SUCCESSFULLY (100% COMPLIANT WITH OWNER DECISIONS) ===\n");
