import assert from "node:assert";
import { POST } from "../app/api/roi-matrix/eligibility/route.js";

console.log("=== RUNNING ROI-01 ELIGIBILITY ENDPOINT INTEGRATION SUITE ===\n");

function createMockRequest(body, ip = "198.51.100.1") {
  return new Request("http://localhost:3000/api/roi-matrix/eligibility", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-connecting-ip": ip,
    },
    body: JSON.stringify(body),
  });
}

// 1. Missing or Malformed Turnstile Token
console.log("1. Testing Turnstile enforcement on eligibility endpoint...");
{
  const req = createMockRequest({
    name: "Jane Doe",
    companyName: "AEC Studio",
    email: "jane@aecstudio.com",
    privacyAccepted: true,
    turnstileToken: "", // empty
    quickEstimate: { modelerCount: 2, hourlyRate: 85 }
  }, "198.51.100.10");
  const res = await POST(req);
  assert.strictEqual(res.status, 403, "Empty Turnstile token must return 403");
  const json = await res.json();
  assert.strictEqual(json.ok, false);
}
console.log("   ✓ Turnstile enforcement verified");

// 2. Consumer/Public Email Domain Rejection
console.log("2. Testing Corporate Email Policy (blocking consumer email)...");
{
  const consumerDomains = ["gmail.com", "yahoo.it", "hotmail.com", "outlook.de", "proton.me"];
  let ipIndex = 20;
  for (const domain of consumerDomains) {
    const req = createMockRequest({
      name: "Jane Doe",
      companyName: "AEC Studio",
      email: `test@${domain}`,
      privacyAccepted: true,
      turnstileToken: "1x00000000000000000000AA", // Cloudflare test pass token in dev
      quickEstimate: { modelerCount: 2, hourlyRate: 85 }
    }, `198.51.100.${ipIndex++}`);
    const res = await POST(req);
    assert.strictEqual(res.status, 400, `Consumer domain ${domain} must be rejected with 400`);
    const json = await res.json();
    assert.strictEqual(json.ok, false);
    assert.ok(json.error.includes("corporate email"), "Error message must mention corporate email");
  }
}
console.log("   ✓ Public consumer domains strictly rejected");

// 3. Privacy Policy Mandatory Acknowledgment
console.log("3. Testing Privacy Policy Enforcement...");
{
  const req = createMockRequest({
    name: "Jane Doe",
    companyName: "AEC Studio",
    email: "jane@aecstudio.com",
    privacyAccepted: false, // not accepted
    turnstileToken: "1x00000000000000000000AA",
    quickEstimate: { modelerCount: 2, hourlyRate: 85 }
  }, "198.51.100.30");
  const res = await POST(req);
  assert.strictEqual(res.status, 400);
  const json = await res.json();
  assert.strictEqual(json.ok, false);
}
console.log("   ✓ Privacy Policy strictly required");

// 4. Rate Limiting Enforcement
console.log("4. Testing Rate Limiting on Eligibility Endpoint...");
{
  const testIp = "198.51.100.40";
  let throttled = false;
  // Send 6 requests rapidly from the same IP (limit is 5)
  for (let i = 0; i < 6; i++) {
    const req = createMockRequest({
      name: "Jane Doe",
      companyName: "AEC Studio",
      email: "jane@pybim.com",
      privacyAccepted: true,
      turnstileToken: "1x00000000000000000000AA",
      quickEstimate: { modelerCount: 2, hourlyRate: 85 }
    }, testIp);
    const res = await POST(req);
    if (res.status === 429) {
      throttled = true;
      assert.strictEqual(res.headers.get("X-RateLimit-Limit"), "5");
      assert.strictEqual(res.headers.get("X-RateLimit-Remaining"), "0");
      break;
    }
  }
  assert.strictEqual(throttled, true, "Sixth request must be throttled with HTTP 429");
}
console.log("   ✓ Rate limiting strictly enforces 5 req/min per IP");

// 5. Successful Eligibility Verification (Corporate Domain)
console.log("5. Testing Successful Corporate Eligibility & Reference Receipt...");
{
  const req = createMockRequest({
    name: "Jane Doe",
    companyName: "AEC Studio",
    email: "jane@pybim.com", // Verified internal corporate domain
    privacyAccepted: true,
    turnstileToken: "1x00000000000000000000AA",
    quickEstimate: {
      modelerCount: 4,
      hourlyRate: 85,
      searchHours: 13,
      workingWeeks: 48,
      rateType: "consulting",
      region: "global"
    }
  }, "198.51.100.50");
  const res = await POST(req);
  assert.strictEqual(res.status, 200, "Valid corporate request must return 200");
  const json = await res.json();
  assert.strictEqual(json.ok, true);
  assert.strictEqual(json.eligible, true);
  assert.ok(json.referenceId.startsWith("ROI-SESS-"), "Must return stateless non-persistent ROI reference ID");
  assert.strictEqual(json.clientSummary.domain, "pybim.com");
  assert.strictEqual(json.downloadContract.targetEngine, "browser_exceljs");
  assert.strictEqual(json.downloadContract.targetLocale, "en");
  assert.strictEqual(json.downloadContract.worksheets.length, 4);
  assert.deepStrictEqual(json.downloadContract.worksheets, [
    "Executive Summary",
    "Workflow Inputs",
    "AI Adoption Scenarios",
    "Assumptions & Sources"
  ]);
  assert.strictEqual(json.downloadContract.supportNotification.recipient, "support@pybim.com");
  assert.strictEqual(json.downloadContract.supportNotification.eventStatus, "EXPORT_INITIATED");

  // Check that all five fixed AI adoption scenarios are present
  assert.ok(json.preview.scenarios.scenario_20);
  assert.ok(json.preview.scenarios.scenario_40);
  assert.ok(json.preview.scenarios.scenario_60);
  assert.ok(json.preview.scenarios.scenario_80);
  assert.ok(json.preview.scenarios.scenario_100);
  assert.strictEqual(json.preview.scenarios.scenario_40.adoptionRate, 0.40);
  assert.strictEqual(json.preview.scenarios.scenario_40.humanVerificationRate, 0.10);
  assert.ok(json.preview.scenarios.scenario_40.annualRecoveredHours > 0);
  // Ensure NO binary buffer or XLSX file is attached to HTTP response
  assert.strictEqual(res.headers.get("content-type"), "application/json");
}
console.log("   ✓ Corporate eligibility generates receipt with 4-worksheet contract and 5 scenarios");

console.log("\n=== ALL ROI-01 ELIGIBILITY ENDPOINT TESTS PASSED SUCCESSFULLY ===\n");
