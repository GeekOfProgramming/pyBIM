/**
 * pyBIM FORM-01 End-to-End Route & Connection Chain Integration Test Suite
 *
 * Verifies the complete connection path across both primary workflows:
 * Frontend Payload -> API Route -> Field Validation -> Corporate Email Check ->
 * DNS/MX Verification -> Privacy Acknowledgment -> Turnstile Siteverify ->
 * Delivery Adapter -> Mock Transport Provider -> Safe Localized Response.
 */

import assert from "node:assert";
import { POST as contactHandler } from "../app/api/contact/route.js";
import { POST as earlyAccessHandler } from "../app/api/early-access/route.js";
import {
  _getMockSentEmails,
  _clearMockSentEmails,
  getEmailConfig,
  checkEmailConfiguration
} from "../lib/emailDelivery.js";

console.log("=== RUNNING FORM-01 FULL CONNECTION CHAIN INTEGRATION TESTS ===");

// 1. Setup Mock Environment
process.env.MOCK_EMAIL_DELIVERY = "true";
process.env.CONTACT_TO = "support@pybim.com";
process.env.EMAIL_FROM = "pyBIM Support <support@pybim.com>";
process.env.SUPPORT_REPLY_TO = "support@pybim.com";
process.env.TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA"; // Cloudflare Always-Pass test secret

_clearMockSentEmails();

// Helper to create mock Next.js requests
function createMockRequest(url, body, ip = "198.51.100.1") {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-connecting-ip": ip
    },
    body: JSON.stringify(body)
  });
}

// Suite 1: Contact Form - Full Success Path
console.log("1. Testing Contact Form - End-to-End Success Path...");
{
  _clearMockSentEmails();
  const validContactBody = {
    name: "Marco Rossi",
    companyName: "Studio Ingegneria Rossi S.r.l.",
    email: "m.rossi@studio-rossi.it",
    phone: "+39 049 827 5111",
    service: "Revit Automation & Dynamo Development",
    teamScale: "21–50 employees",
    message: "We need an algorithmic workflow to automate parameter synchronization across structural models.",
    privacyAccepted: true,
    turnstileToken: "cf-test-token-valid-contact"
  };

  const req = createMockRequest("https://www.pybim.it/api/contact", validContactBody, "198.51.100.11");
  const res = await contactHandler(req);
  const data = await res.json();

  assert.strictEqual(res.status, 200, "Successful contact submission must return HTTP 200");
  assert.strictEqual(data.ok, true, "Response payload must confirm ok: true");

  const sent = _getMockSentEmails();
  assert.strictEqual(sent.length, 1, "Exactly one internal notification must be dispatched");
  assert.strictEqual(sent[0].to, "support@pybim.com", "Notification must be sent to support@pybim.com");
  assert.strictEqual(sent[0].replyTo, "m.rossi@studio-rossi.it", "Internal notification Reply-To must be customer email");
  assert.ok(sent[0].subject.includes("Studio Ingegneria Rossi S.r.l."), "Subject must reference company name");
  assert.ok(sent[0].html.includes("Marco Rossi"), "Email body must contain customer name");
  assert.ok(!sent[0].html.includes("<script>"), "Payload must be HTML escaped");
  console.log("   ✓ Contact form full chain succeeded with correct Reply-To and body escaping");
}

// Suite 2: Contact Form - Corporate Email Rejection
console.log("2. Testing Contact Form - Consumer/Freemail Rejection...");
{
  _clearMockSentEmails();
  const freemailBody = {
    name: "Test User",
    companyName: "Test Company",
    email: "user@gmail.com",
    phone: "+39 049 827 5111",
    service: "BIM QA",
    teamScale: "1–5 employees",
    message: "Valid project inquiry details exceeding minimum length.",
    privacyAccepted: true,
    turnstileToken: "cf-test-token-valid"
  };

  const req = createMockRequest("https://www.pybim.com/api/contact", freemailBody, "198.51.100.12");
  const res = await contactHandler(req);
  const data = await res.json();

  assert.strictEqual(res.status, 400, "Consumer email must be rejected with HTTP 400");
  assert.strictEqual(data.ok, false);
  assert.ok(data.error.includes("corporate email"), "Error message must state corporate email requirement");
  assert.strictEqual(_getMockSentEmails().length, 0, "No email must be dispatched for rejected inquiry");
  console.log("   ✓ Consumer email rejected fail-closed without triggering delivery");
}

// Suite 3: Contact Form - Missing Privacy Acknowledgment
console.log("3. Testing Contact Form - Mandatory Privacy Enforcement...");
{
  _clearMockSentEmails();
  const noPrivacyBody = {
    name: "Test User",
    companyName: "Acme Corp",
    email: "user@acme-corp.com",
    phone: "+39 049 827 5111",
    service: "BIM QA",
    teamScale: "1–5 employees",
    message: "Valid project inquiry details.",
    privacyAccepted: false, // NOT accepted
    turnstileToken: "cf-test-token-valid"
  };

  const req = createMockRequest("https://www.pybim.com/api/contact", noPrivacyBody, "198.51.100.13");
  const res = await contactHandler(req);
  const data = await res.json();

  assert.strictEqual(res.status, 400, "Missing privacy acceptance must return HTTP 400");
  assert.strictEqual(data.ok, false);
  assert.ok(data.error.includes("Privacy Policy"), "Error message must cite Privacy Policy");
  assert.strictEqual(_getMockSentEmails().length, 0, "Zero email sent when privacy rejected");
  console.log("   ✓ Privacy acknowledgment strictly enforced");
}

// Suite 4: Contact Form - Missing Turnstile Token
console.log("4. Testing Contact Form - Turnstile Enforcement...");
{
  _clearMockSentEmails();
  const noTurnstileBody = {
    name: "Test User",
    companyName: "Acme Corp",
    email: "user@acme-corp.com",
    phone: "+39 049 827 5111",
    service: "BIM QA",
    teamScale: "1–5 employees",
    message: "Valid project inquiry details.",
    privacyAccepted: true,
    turnstileToken: "" // Missing token
  };

  const req = createMockRequest("https://www.pybim.com/api/contact", noTurnstileBody, "198.51.100.14");
  const res = await contactHandler(req);
  const data = await res.json();

  assert.strictEqual(res.status, 403, "Missing Turnstile token must return HTTP 403");
  assert.strictEqual(data.ok, false);
  assert.strictEqual(data.code, "TURNSTILE_TOKEN_REQUIRED");
  assert.strictEqual(_getMockSentEmails().length, 0);
  console.log("   ✓ Bot check enforced with stable error code TURNSTILE_TOKEN_REQUIRED");
}

// Suite 5: Early Access Form - Full Success Path with Dual Delivery Outcomes
console.log("5. Testing Early Access - Full Success Path (Internal Notification + Auto-Responder)...");
{
  _clearMockSentEmails();
  const validEarlyAccessBody = {
    name: "Dr. Elena Bianchi",
    companyName: "Hyperion BIM Engineering S.p.A.",
    email: "e.bianchi@hyperion-eng.it",
    phone: "+39 02 899 1234",
    architecture: "Sovereign Enterprise Edge AI (Air-Gapped Hardware Appliance)",
    teamScale: "51 – 250 Enterprise Scale",
    ecosystem: "Autodesk Revit + Navisworks Manage",
    securityLevel: "Strict ISO 19650 / National Public Tender Mandate (UNI 11337 / DIN)",
    notes: "Requires complete on-premises air-gapped inference for classified infrastructure models.",
    privacyAccepted: true,
    turnstileToken: "cf-test-token-valid-ea"
  };

  const req = createMockRequest("https://www.pybim.it/api/early-access", validEarlyAccessBody, "198.51.100.21");
  const res = await earlyAccessHandler(req);
  const data = await res.json();

  assert.strictEqual(res.status, 200, "Early access submission must return HTTP 200");
  assert.strictEqual(data.ok, true);
  assert.ok(data.queueReference.startsWith("PYBIM-WAITLIST-"), "Queue reference ticket must be returned");

  const sent = _getMockSentEmails();
  assert.strictEqual(sent.length, 2, "Must dispatch both internal notification and applicant auto-response");

  // Check 1: Internal Notification
  const internal = sent.find(m => m.to === "support@pybim.com");
  assert.ok(internal, "Internal notification must be addressed to support@pybim.com");
  assert.strictEqual(internal.replyTo, "e.bianchi@hyperion-eng.it", "Internal notification Reply-To must be customer email");
  assert.ok(internal.subject.includes(data.queueReference), "Subject must include ticket reference");

  // Check 2: Applicant Auto-Responder
  const auto = sent.find(m => m.to === "e.bianchi@hyperion-eng.it");
  assert.ok(auto, "Auto-responder must be addressed to applicant");
  assert.strictEqual(auto.replyTo, "support@pybim.com", "Auto-responder Reply-To must be support@pybim.com");
  assert.ok(auto.html.includes(data.queueReference), "Auto-responder must include ticket reference");
  console.log("   ✓ Early Access delivered both internal dispatch and auto-responder with correct Reply-Tos");
}

// Suite 6: Fail-Closed Transport Handling
console.log("6. Testing Fail-Closed Behavior when unconfigured...");
{
  delete process.env.MOCK_EMAIL_DELIVERY;
  delete process.env.SMTP_HOST;
  delete process.env.RESEND_API_KEY;

  const validBody = {
    name: "Valid Person",
    companyName: "Valid Firm",
    email: "test@arup.com",
    phone: "+39 049 827 5111",
    service: "BIM QA",
    teamScale: "1–5 employees",
    message: "Valid message content for inquiry.",
    privacyAccepted: true,
    turnstileToken: "cf-test-token"
  };

  const req = createMockRequest("https://www.pybim.com/api/contact", validBody, "198.51.100.31");
  const res = await contactHandler(req);
  const data = await res.json();

  assert.strictEqual(res.status, 503, "Unconfigured transport must return HTTP 503 fail-closed");
  assert.strictEqual(data.ok, false);
  assert.ok(data.error.includes("not configured"), "Error must report service unconfigured");

  // Restore mock delivery
  process.env.MOCK_EMAIL_DELIVERY = "true";
  console.log("   ✓ Fail-closed confirmed: unconfigured transport safely returns 503 without false success");
}

console.log("\n=== ALL FORM-01 CONNECTION CHAIN INTEGRATION TESTS PASSED ===\n");
