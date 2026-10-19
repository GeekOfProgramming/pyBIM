import assert from "node:assert";
import { POST } from "../app/api/roi-matrix/eligibility/route.js";
import { _getMockSentEmails, _clearMockSentEmails, checkEmailConfiguration, sendEmail } from "../lib/emailDelivery.js";
import { _clearRateLimitMap } from "../lib/rateLimit.js";

console.log("=== RUNNING ROI-02 ELIGIBILITY & LEAD NOTIFICATION TEST SUITE ===\n");

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
  const consumerDomains = [
    "gmail.com",
    "googlemail.com",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "yahoo.com",
    "yahoo.it",
    "icloud.com",
    "libero.it",
    "virgilio.it",
    "gmx.de",
    "proton.me",
    "mailinator.com",
    "yopmail.com",
    "tempmail.com"
  ];
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
    assert.strictEqual(res.status, 400, `Consumer/disposable domain ${domain} must be rejected with 400`);
    const json = await res.json();
    assert.strictEqual(json.ok, false);
    assert.ok(json.error.includes("corporate email"), "Error message must mention corporate email");
  }
}
console.log("   ✓ All 15 required public consumer & disposable domains strictly rejected by eligibility route");

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

// 6. Support Lead Notification via Mock Resend Delivery
console.log("6. Testing Support Lead Notification to support@pybim.com (14 fields)...");
{
  process.env.MOCK_EMAIL_DELIVERY = "true";
  _clearMockSentEmails();
  _clearRateLimitMap();

  const notifReq = createMockRequest({
    name: "Marcus Aurelius",
    companyName: "Imperial Architecture Ltd",
    email: "marcus@imperial-arch.com",
    privacyAccepted: true,
    turnstileToken: "1x00000000000000000000AA",
    quickEstimate: {
      modelerCount: 8,
      hourlyRate: 95,
      searchHours: 13,
      workingWeeks: 46,
      rateType: "consulting",
      region: "uk"
    },
    useAdvanced: true,
    advancedAssessment: {
      searchHours: 13,
      manualDataEntryHours: 6,
      disciplineWorkflowsHours: 10,
      nonAutomatableJudgmentHours: 9
    }
  }, "198.51.100.60");

  const notifRes = await POST(notifReq);
  assert.strictEqual(notifRes.status, 200);
  const notifJson = await notifRes.json();
  assert.strictEqual(notifJson.ok, true);

  const sent = _getMockSentEmails();
  assert.strictEqual(sent.length, 1, "Exactly one notification email must be sent to pyBIM Support");
  const email = sent[0];
  assert.strictEqual(email.to, "support@pybim.com");
  assert.ok(email.from.includes("support@pybim.com"));
  assert.strictEqual(email.replyTo, "marcus@imperial-arch.com");
  assert.ok(email.subject.includes("[pyBIM ROI Matrix Export] Imperial Architecture Ltd"));

  // Verify all 14 required fields in the text body:
  assert.ok(email.text.includes("Marcus Aurelius"), "1. Name");
  assert.ok(email.text.includes("Imperial Architecture Ltd"), "2. Company");
  assert.ok(email.text.includes("marcus@imperial-arch.com"), "3. Corporate Email");
  assert.ok(email.text.includes("Illustrative Consulting Rate"), "4. Rate Type");
  assert.ok(email.text.includes("€95/h"), "5. Effective Hourly Rate");
  assert.ok(email.text.includes("Customer-Supplied Custom Rate"), "6. Rate Origin");
  assert.ok(email.text.includes("8"), "7. BIM Professionals");
  assert.ok(email.text.includes("46"), "8. Effective Working Weeks");
  assert.ok(email.text.includes("Regional Market Context: UK / International Practice (Informational)"), "8b. Regional Context");
  assert.ok(email.text.includes("13 hrs/week/person"), "9. Autodesk Benchmark");
  assert.ok(email.text.includes("10%"), "10. Verification Allowance");
  assert.ok(email.text.includes("20% Adoption"), "11a. Scenario 20");
  assert.ok(email.text.includes("40% Adoption"), "11b. Scenario 40");
  assert.ok(email.text.includes("60% Adoption"), "11c. Scenario 60");
  assert.ok(email.text.includes("80% Adoption"), "11d. Scenario 80");
  assert.ok(email.text.includes("100% Adoption"), "11e. Scenario 100");
  assert.ok(email.text.includes("Protected Engineering Judgment: 9 hrs/wk"), "12. Diagnostic Assessment");
  assert.ok(email.text.includes(notifJson.referenceId), "13. Export Reference");
  assert.ok(email.text.includes("EXPORT_INITIATED"), "14. Event status");

  // Verify HTML body contains escaped values
  assert.ok(email.html.includes("Imperial Architecture Ltd"));
  assert.ok(email.html.includes("EXPORT_INITIATED"));
}
console.log("   ✓ Support notification sent to support@pybim.com with all 14 required fields");

// 7. Idempotency Key Handling & Stability
console.log("7. Testing Idempotency Key Support and Stable Resend Dispatch...");
{
  _clearMockSentEmails();
  _clearRateLimitMap();
  const customIdempotencyKey = "custom-idempotency-key-test-12345";
  const idempReq = createMockRequest({
    name: "Marcus Aurelius",
    companyName: "Imperial Architecture Ltd",
    email: "marcus@imperial-arch.com",
    privacyAccepted: true,
    turnstileToken: "1x00000000000000000000AA",
    idempotencyKey: customIdempotencyKey,
    quickEstimate: {
      modelerCount: 8,
      hourlyRate: 95
    }
  }, "198.51.100.61");

  const idempRes = await POST(idempReq);
  assert.strictEqual(idempRes.status, 200);
  const sentIdemp = _getMockSentEmails();
  assert.strictEqual(sentIdemp.length, 1);
  assert.strictEqual(sentIdemp[0].idempotencyKey, customIdempotencyKey);
}
console.log("   ✓ Idempotency-Key correctly attached to email delivery options");

// 7b. Stable export-attempt identifier & retry idempotency without duplicate email variations
console.log("7b. Testing Stable Export-Attempt Identifier & Retry Idempotency...");
{
  _clearMockSentEmails();
  _clearRateLimitMap();

  const attemptTimestamp = new Date().toISOString();
  const retryPayload = {
    name: "Elena Rostagno",
    companyName: "Studio Ingegneria BIM Srl",
    email: "elena@studio-rostagno.it",
    privacyAccepted: true,
    turnstileToken: "1x00000000000000000000AA",
    attemptTimestamp,
    quickEstimate: {
      modelerCount: 5,
      hourlyRate: 85,
      searchHours: 13,
      workingWeeks: 48,
      rateType: "consulting",
      region: "eu"
    }
  };

  // Attempt 1: First request without explicit idempotency key
  const req1 = createMockRequest(retryPayload, "198.51.100.62");
  const res1 = await POST(req1);
  assert.strictEqual(res1.status, 200);
  const json1 = await res1.json();
  const emails1 = _getMockSentEmails();
  assert.strictEqual(emails1.length, 1);
  const firstKey = emails1[0].idempotencyKey;
  assert.ok(firstKey.startsWith("roi-export-studio-rostagno.it-"));

  // Attempt 2: Legitimate retry with identical parameters (re-submission / network recovery)
  const req2 = createMockRequest(retryPayload, "198.51.100.62");
  const res2 = await POST(req2);
  assert.strictEqual(res2.status, 200);
  const json2 = await res2.json();
  const emails2 = _getMockSentEmails();
  assert.strictEqual(emails2.length, 2);
  const secondKey = emails2[1].idempotencyKey;

  // The generated attempt identifier and reference ID must be stable and consistent across retries
  assert.strictEqual(json1.referenceId, json2.referenceId, "Reference ID must be identical across retries of unchanged request");
  assert.strictEqual(firstKey, secondKey, "Idempotency key must be identical across retries of unchanged request");
  assert.strictEqual(emails1[0].subject, emails2[1].subject, "Email subject and reference must be identical across retries");
  assert.strictEqual(emails1[0].text, emails2[1].text, "Email body text payload must be identical across retries");
  assert.strictEqual(emails1[0].html, emails2[1].html, "Email body html payload must be identical across retries");

  // Attempt 3: New subsequent legitimate export with unique attempt identifier (even with same customer inputs)
  const newAttemptPayload = {
    ...retryPayload,
    referenceId: "ROI-SESS-2026-NEWEXP01",
    idempotencyKey: "roi-export-studio-rostagno.it-NEWEXP01"
  };
  const req3 = createMockRequest(newAttemptPayload, "198.51.100.63");
  const res3 = await POST(req3);
  assert.strictEqual(res3.status, 200);
  const json3 = await res3.json();
  const emails3 = _getMockSentEmails();
  assert.strictEqual(emails3.length, 3);
  assert.strictEqual(json3.referenceId, "ROI-SESS-2026-NEWEXP01", "New export event must preserve distinct referenceId");
  assert.strictEqual(emails3[2].idempotencyKey, "roi-export-studio-rostagno.it-NEWEXP01", "New export event must use distinct idempotencyKey");
  assert.notStrictEqual(emails3[0].idempotencyKey, emails3[2].idempotencyKey, "Separate downloads must not reuse the same idempotency key");
}
console.log("   ✓ Consistent Reference ID, Idempotency-Key, and email payload verified on retries");
console.log("   ✓ New legitimate exports with distinct identifiers receive separate notifications");

// 8. Rejection cases send NO notification
console.log("8. Testing Absence of Emails for Rejected Requests...");
{
  _clearMockSentEmails();
  _clearRateLimitMap();

  const rejectReq1 = createMockRequest({
    name: "Spammer",
    companyName: "Spam Corp",
    email: "spam@gmail.com", // Consumer domain rejected
    privacyAccepted: true,
    turnstileToken: "1x00000000000000000000AA"
  }, "198.51.100.70");
  await POST(rejectReq1);

  const rejectReq2 = createMockRequest({
    name: "No Token",
    companyName: "Corp",
    email: "legit@pybim.com",
    privacyAccepted: true,
    turnstileToken: "" // Missing token
  }, "198.51.100.71");
  await POST(rejectReq2);

  assert.strictEqual(_getMockSentEmails().length, 0, "No notification emails should be dispatched for rejected requests");
}
console.log("   ✓ No email dispatched on invalid, blocked, or rejected requests");

// 9. Production Fail-Closed Behavior when Email Unconfigured
console.log("9. Testing Production Fail-Closed Behavior When Email Service is Unconfigured...");
{
  const prevEnv = process.env.NODE_ENV;
  const prevMock = process.env.MOCK_EMAIL_DELIVERY;
  const prevKey = process.env.RESEND_API_KEY;
  const prevSmtp = process.env.SMTP_HOST;
  try {
    // 9a. Unconfigured email service fails closed in production
    delete process.env.RESEND_API_KEY;
    delete process.env.SMTP_HOST;
    process.env.MOCK_EMAIL_DELIVERY = "false";

    const prodCheck = checkEmailConfiguration({ isProduction: true });
    assert.strictEqual(prodCheck.ok, false);
    assert.strictEqual(prodCheck.statusCode, 503);
    assert.ok(prodCheck.error.includes("not configured"));

    // 9b. Mock transport is strictly forbidden in production
    process.env.MOCK_EMAIL_DELIVERY = "true";
    const mockInProdCheck = checkEmailConfiguration({ isProduction: true });
    assert.strictEqual(mockInProdCheck.ok, false);
    assert.strictEqual(mockInProdCheck.statusCode, 503);
    assert.ok(mockInProdCheck.error.includes("strictly forbidden"));

    await assert.rejects(
      async () => await sendEmail({ to: "support@pybim.com", subject: "test" }, { isProduction: true }),
      /strictly forbidden/i
    );
  } finally {
    process.env.NODE_ENV = prevEnv;
    process.env.MOCK_EMAIL_DELIVERY = prevMock;
    if (prevKey) process.env.RESEND_API_KEY = prevKey;
    if (prevSmtp) process.env.SMTP_HOST = prevSmtp;
  }
}
console.log("   ✓ Production mode fails closed (HTTP 503) and forbids mock delivery");
console.log("   ✓ Production mode fails closed (HTTP 503) when email transport is unconfigured");

console.log("\n=== ALL ROI-02 ELIGIBILITY & LEAD NOTIFICATION TESTS PASSED SUCCESSFULLY ===\n");
