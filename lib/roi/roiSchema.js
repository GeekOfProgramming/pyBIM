/**
 * pyBIM ROI Matrix - Shared Data Schema & Calculation Engine
 * Version: 1.0.0 (ROI-01 Benchmark Decisions)
 *
 * Owner-Approved Architecture:
 * 1. Hourly Rate:
 *    - €85/hour initial editable example.
 *    - Labeled "Illustrative Consulting Rate".
 *    - Never described as average salary of European BIM Modelers.
 *    - Distinguishes consulting/billing rate from fully loaded employee labor cost.
 *    - Allows customers to enter custom rates.
 *    - Regional context provides contextual guidance only; never overwrites user-entered rate.
 *
 * 2. Autodesk Industry Reference:
 *    - 13 hours/person/week editable industry reference for time spent finding project data.
 *    - Source: Autodesk, 2025 State of Design & Make: Spotlight on Construction.
 *    - Explicitly not presented as verified BIM modeler waste, not treated as 100% recoverable,
 *      not claimed as data entry or clash detection inefficiency, and not multiplied by arbitrary 85%.
 *    - Avoids double-counting when detailed workflow assessment is provided.
 *
 * 3. Working Weeks:
 *    - 48 effective working weeks/year as an editable initial assumption, not a statutory standard.
 *
 * 4. Realistic Recovery Scenarios:
 *    - Conservative (20%), Expected (35%), Optimized (50%).
 *    - Zero hardcoded implementation prices or fabricated payback periods.
 *    - Explicit distinction between illustrative capacity value and guaranteed financial savings.
 */

export const ROI_SCHEMA_VERSION = "1.0.0";

export const AUTODESK_CITATION = Object.freeze({
  studyTitle: "2025 State of Design & Make: Spotlight on Construction",
  author: "Autodesk",
  publicationYear: 2025,
  finding: "Surveyed construction professionals reported spending an average of 13 hours per week finding project information across project roles.",
  primaryReportUrl: "https://boards.autodesk.com/new-era-contractors-middle-east/items/2025-state-of-design--make--spotlight-on-construction",
  blogUrl: "https://www.autodesk.com/blogs/construction/state-of-design-make-spotlight-on-construction-in-emea/",
  disclaimer: "Autodesk's study measured general time finding data across diverse construction roles. It does not measure isolated BIM modeling inefficiency, is not verified modeler waste, and should not be assumed to be 100% recoverable."
});

export const BENCHMARK_DEFAULTS = Object.freeze({
  MODELER_COUNT: 1,
  HOURLY_RATE: 85,
  SEARCH_HOURS_WEEK: 13,
  WORKING_WEEKS_YEAR: 48,
  RATE_TYPE_DEFAULT: "consulting",
  REGION_DEFAULT: "global"
});

export const RATE_TYPES = Object.freeze({
  consulting: {
    id: "consulting",
    labelKey: "roi.inputs.rate_type_consulting",
    defaultLabel: "Illustrative Consulting Rate (€85/h)",
    descriptionKey: "roi.inputs.rate_type_consulting_desc",
    defaultDescription: "Standard illustrative market consulting/billing rate. Distinguish from fully loaded internal payroll cost."
  },
  internal_labor: {
    id: "internal_labor",
    labelKey: "roi.inputs.rate_type_internal",
    defaultLabel: "Internal Loaded Labor Cost",
    descriptionKey: "roi.inputs.rate_type_internal_desc",
    defaultDescription: "Internal employee labor cost including direct gross salary, payroll taxes, pensions, and overheads."
  }
});

export const REGIONAL_CONTEXTS = Object.freeze({
  global: {
    id: "global",
    name: "European / Global Baseline (Default)",
    description: "General reference across European and international AEC delivery frameworks."
  },
  dach: {
    id: "dach",
    name: "DACH (Germany, Austria, Switzerland)",
    description: "Consultancy and engineering rates reflect DIN EN ISO 19650 and HOAI service phase structures."
  },
  it: {
    id: "it",
    name: "Italy (UNI 11337 / Public Procurement)",
    description: "Tariffs and labor rates align with UNI 11337 guidelines and public infrastructure tender schedules."
  },
  uk: {
    id: "uk",
    name: "UK / International Practice",
    description: "Billing baselines align with UK BIM Framework and regional consultancy advisory standards."
  }
});

export const SCENARIO_RATIOS = Object.freeze({
  conservative: {
    id: "conservative",
    ratio: 0.20,
    percentageLabel: "20%",
    nameKey: "roi.preview.scenario_conservative",
    defaultName: "Conservative (20% Recovery)"
  },
  expected: {
    id: "expected",
    ratio: 0.35,
    percentageLabel: "35%",
    nameKey: "roi.preview.scenario_expected",
    defaultName: "Expected (35% Recovery)"
  },
  optimized: {
    id: "optimized",
    ratio: 0.50,
    percentageLabel: "50%",
    nameKey: "roi.preview.scenario_optimized",
    defaultName: "Optimized (50% Recovery)"
  }
});

/**
 * Validates Quick Estimate parameters.
 *
 * @param {object} inputs
 * @returns {{ valid: boolean, errors: Record<string, string>, sanitized: object }}
 */
export function validateQuickEstimate(inputs = {}) {
  const errors = {};

  // Modeler count: integer >= 1
  const rawModelers = inputs.modelerCount !== undefined && inputs.modelerCount !== null && inputs.modelerCount !== ""
    ? Number(inputs.modelerCount)
    : NaN;
  let modelerCount = BENCHMARK_DEFAULTS.MODELER_COUNT;
  if (isNaN(rawModelers) || !Number.isInteger(rawModelers) || rawModelers < 1 || rawModelers > 500) {
    errors.modelerCount = "Number of BIM modelers must be an integer between 1 and 500.";
  } else {
    modelerCount = rawModelers;
  }

  // Hourly Rate: finite positive number
  const rawRate = inputs.hourlyRate !== undefined && inputs.hourlyRate !== null && inputs.hourlyRate !== ""
    ? Number(inputs.hourlyRate)
    : NaN;
  let hourlyRate = BENCHMARK_DEFAULTS.HOURLY_RATE;
  if (isNaN(rawRate) || rawRate <= 0 || !Number.isFinite(rawRate) || rawRate > 2000) {
    errors.hourlyRate = "Hourly rate must be a positive number up to €2,000/hour.";
  } else {
    hourlyRate = Math.round(rawRate * 100) / 100;
  }

  // Search Hours / Week: finite positive number (Autodesk benchmark reference)
  const rawSearch = inputs.searchHours !== undefined && inputs.searchHours !== null && inputs.searchHours !== ""
    ? Number(inputs.searchHours)
    : NaN;
  let searchHours = BENCHMARK_DEFAULTS.SEARCH_HOURS_WEEK;
  if (isNaN(rawSearch) || rawSearch < 0 || !Number.isFinite(rawSearch) || rawSearch > 40) {
    errors.searchHours = "Information search hours must be between 0 and 40 hours per week.";
  } else {
    searchHours = Math.round(rawSearch * 10) / 10;
  }

  // Working Weeks / Year: integer between 1 and 52
  const rawWeeks = inputs.workingWeeks !== undefined && inputs.workingWeeks !== null && inputs.workingWeeks !== ""
    ? Number(inputs.workingWeeks)
    : NaN;
  let workingWeeks = BENCHMARK_DEFAULTS.WORKING_WEEKS_YEAR;
  if (isNaN(rawWeeks) || !Number.isInteger(rawWeeks) || rawWeeks < 1 || rawWeeks > 52) {
    errors.workingWeeks = "Working weeks per year must be an integer between 1 and 52.";
  } else {
    workingWeeks = rawWeeks;
  }

  // Rate type
  const rateType = inputs.rateType === "internal_labor" ? "internal_labor" : "consulting";

  // Regional context (never changes rate, only context note)
  const region = REGIONAL_CONTEXTS[inputs.region] ? inputs.region : "global";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      modelerCount,
      hourlyRate,
      searchHours,
      workingWeeks,
      rateType,
      region
    }
  };
}

/**
 * Validates Advanced Workflow Assessment parameters.
 * Distinguishes:
 * 1. Information search/retrieval
 * 2. Manual information entry/transfer
 * 3. Discipline-specific BIM workflows
 * 4. Non-automatable design and engineering judgment (protected!)
 *
 * Enforces zero double-counting against total available working hours.
 *
 * @param {object} inputs
 * @returns {{ valid: boolean, errors: Record<string, string>, sanitized: object }}
 */
export function validateAdvancedAssessment(inputs = {}) {
  const errors = {};

  const parseNonNeg = (val, fieldName, max = 35) => {
    if (val === undefined || val === null || val === "") return 0;
    const num = Number(val);
    if (isNaN(num) || num < 0 || !Number.isFinite(num) || num > max) {
      errors[fieldName] = `${fieldName} must be a number between 0 and ${max} hours.`;
      return 0;
    }
    return Math.round(num * 10) / 10;
  };

  const searchHours = parseNonNeg(inputs.searchHours, "searchHours", 35);
  const manualDataEntryHours = parseNonNeg(inputs.manualDataEntryHours, "manualDataEntryHours", 35);
  const disciplineWorkflowsHours = parseNonNeg(inputs.disciplineWorkflowsHours, "disciplineWorkflowsHours", 35);
  const nonAutomatableJudgmentHours = parseNonNeg(inputs.nonAutomatableJudgmentHours, "nonAutomatableJudgmentHours", 40);

  const repetitiveTotal = searchHours + manualDataEntryHours + disciplineWorkflowsHours;
  const grandTotal = repetitiveTotal + nonAutomatableJudgmentHours;

  if (grandTotal > 60) {
    errors.grandTotal = "Total assessed weekly hours per person cannot exceed 60 hours/week.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      searchHours,
      manualDataEntryHours,
      disciplineWorkflowsHours,
      nonAutomatableJudgmentHours,
      repetitiveWeeklyHours: repetitiveTotal,
      totalAssessedHours: grandTotal
    }
  };
}

/**
 * Performs transparent preview calculations without hardcoded implementation fees or unverified adoption assumptions.
 *
 * @param {object} params
 * @param {object} params.quickEstimate Sanitized Quick Estimate inputs
 * @param {boolean} [params.useAdvanced] Whether Advanced Assessment is active
 * @param {object} [params.advancedAssessment] Sanitized Advanced Assessment inputs
 * @returns {object} Calculated metrics, scenarios, and audit metadata
 */
export function calculateRoiPreview({ quickEstimate, useAdvanced = false, advancedAssessment = null }) {
  const q = quickEstimate || BENCHMARK_DEFAULTS;
  const modelers = q.modelerCount;
  const rate = q.hourlyRate;
  const weeks = q.workingWeeks;

  // Determine repetitive weekly hours to avoid double-counting
  let weeklyRepetitiveHours = q.searchHours;
  let breakdown = {
    searchHours: q.searchHours,
    manualDataEntryHours: 0,
    disciplineWorkflowsHours: 0,
    nonAutomatableJudgmentHours: 0
  };

  if (useAdvanced && advancedAssessment) {
    weeklyRepetitiveHours = advancedAssessment.repetitiveWeeklyHours;
    breakdown = {
      searchHours: advancedAssessment.searchHours,
      manualDataEntryHours: advancedAssessment.manualDataEntryHours,
      disciplineWorkflowsHours: advancedAssessment.disciplineWorkflowsHours,
      nonAutomatableJudgmentHours: advancedAssessment.nonAutomatableJudgmentHours
    };
  }

  // Base metrics
  const annualRepetitiveHoursPerPerson = Math.round(weeklyRepetitiveHours * weeks * 10) / 10;
  const annualRepetitiveHoursTeam = Math.round(annualRepetitiveHoursPerPerson * modelers * 10) / 10;
  const annualAllocatedValue = Math.round(annualRepetitiveHoursTeam * rate);

  // Protected non-automatable capacity (if advanced)
  const annualJudgmentHoursTeam = Math.round((breakdown.nonAutomatableJudgmentHours || 0) * weeks * modelers * 10) / 10;

  // Scenarios: Conservative (20%), Expected (35%), Optimized (50%)
  const scenarios = {};
  for (const [key, config] of Object.entries(SCENARIO_RATIOS)) {
    const weeklyRecoveredPerPerson = Math.round(weeklyRepetitiveHours * config.ratio * 10) / 10;
    const annualRecoveredHours = Math.round(weeklyRecoveredPerPerson * weeks * modelers);
    const annualValue = Math.round(annualRecoveredHours * rate);

    scenarios[key] = {
      id: key,
      ratio: config.ratio,
      percentageLabel: config.percentageLabel,
      weeklyRecoveredHoursPerPerson: weeklyRecoveredPerPerson,
      annualRecoveredHours: annualRecoveredHours,
      annualIllustrativeValue: annualValue
    };
  }

  return {
    version: ROI_SCHEMA_VERSION,
    calculatedAt: new Date().toISOString(),
    inputs: {
      modelerCount: modelers,
      hourlyRate: rate,
      rateType: q.rateType,
      region: q.region,
      workingWeeks: weeks,
      useAdvanced,
      weeklyRepetitiveHours,
      breakdown
    },
    baseline: {
      annualRepetitiveHoursTeam,
      annualAllocatedValue,
      annualJudgmentHoursTeam
    },
    scenarios,
    autodeskReference: {
      citation: AUTODESK_CITATION.studyTitle,
      reportedBenchmarkWeeklyHours: 13,
      userSpecifiedSearchHours: breakdown.searchHours,
      disclaimer: AUTODESK_CITATION.disclaimer
    },
    disclaimer: "All figures represent illustrative engineering capacity liberation based on user-provided inputs. They do not constitute guaranteed financial savings, software sales contracts, or performance warranties."
  };
}
