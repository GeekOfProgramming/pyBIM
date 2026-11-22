import assert from "node:assert";
import {
  isInternalDomain,
  normalizeEmail,
  sanitizeHeader,
  validateTextField,
  validateCorporateEmail,
  verifyDomainMx,
  validatePrivacyAcknowledgment,
  parseBoundedJson,
  verifyTurnstileToken,
  FREE_EMAIL_PROVIDERS
} from "../lib/formValidation.js";
import {
  isEmailConfigured,
  checkEmailConfiguration,
  getEmailConfig,
  buildEmailPayload
} from "../lib/emailDelivery.js";

console.log("=== RUNNING FORM-01 CORPORATE ELIGIBILITY & VALIDATION SUITE ===");

// 1. isInternalDomain security tests
console.log("1. Testing isInternalDomain strict allowlist security...");
assert.strictEqual(isInternalDomain("pybim.com"), true, "pybim.com must be recognized");
assert.strictEqual(isInternalDomain("pybim.it"), true, "pybim.it must be recognized");
assert.strictEqual(isInternalDomain("corp.pybim.com"), true, "subdomain of pybim.com must be recognized");

// Strict Security: Unverified pybim.co or substring domains must NOT be trusted
assert.strictEqual(isInternalDomain("pybim.co"), false, "pybim.co must not be trusted until ownership verified");
assert.strictEqual(isInternalDomain("evil-pybim.com"), false, "evil-pybim.com must be rejected");
assert.strictEqual(isInternalDomain("notpybim.com"), false, "notpybim.com must be rejected");
assert.strictEqual(isInternalDomain("pybim.com.attacker.org"), false, "pybim.com.attacker.org must be rejected");
assert.strictEqual(isInternalDomain("pybimfake.com"), false, "pybimfake.com must be rejected");
assert.strictEqual(isInternalDomain(""), false, "empty domain must be rejected");
assert.strictEqual(isInternalDomain(null), false, "null must be rejected");
console.log("   ✓ isInternalDomain strictly rejects substring injection and unverified pybim.co");

// 2. Email normalization
console.log("2. Testing normalizeEmail...");
assert.strictEqual(normalizeEmail("  User.Name@Company.COM  "), "User.Name@company.com");
assert.strictEqual(normalizeEmail("info@PYBIM.IT"), "info@pybim.it");
assert.strictEqual(normalizeEmail("support@PYBIM.COM"), "support@pybim.com");
assert.strictEqual(normalizeEmail(""), "");
console.log("   ✓ normalizeEmail trims and downcases domains properly");

// 3. Header sanitization (CRLF injection prevention)
console.log("3. Testing sanitizeHeader CRLF injection defense...");
assert.strictEqual(
  sanitizeHeader("ACME Corp\r\nBcc: victim@example.com"),
  "ACME Corp  Bcc: victim@example.com",
  "CRLF must be replaced with spaces"
);
assert.strictEqual(
  sanitizeHeader("Project\nSubject: Injected Subject"),
  "Project Subject: Injected Subject",
  "Newline must be sanitized"
);
console.log("   ✓ sanitizeHeader strips carriage returns and newlines");

// 4. validateTextField bounds and required checks
console.log("4. Testing validateTextField bounds checking...");
assert.strictEqual(validateTextField("", "name", 50, true).valid, false);
assert.strictEqual(validateTextField("   ", "name", 50, true).valid, false);
assert.strictEqual(validateTextField("Valid Name", "name", 50, true).valid, true);
assert.strictEqual(validateTextField("a".repeat(51), "name", 50, true).valid, false);
assert.strictEqual(validateTextField(null, "phone", 50, false).valid, true);
console.log("   ✓ validateTextField properly enforces required flags and character bounds");

// 5. Corporate email policy validation across diverse TLDs
console.log("5. Testing validateCorporateEmail policy across diverse TLDs...");
// Consumer providers must be rejected - asserting all 15 required negative domains
const requiredNegativeDomains = [
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

for (const domain of requiredNegativeDomains) {
  const result = validateCorporateEmail(`test.user@${domain}`, false);
  assert.strictEqual(
    result.valid,
    false,
    `Domain ${domain} must be strictly rejected as public/freemail/disposable`
  );
  assert.strictEqual(
    result.domain,
    domain,
    `Rejected result must report normalized domain ${domain}`
  );
}

// Additional providers already in FREE_EMAIL_PROVIDERS
assert.strictEqual(validateCorporateEmail("user@hotmail.de", false).valid, false);
assert.strictEqual(validateCorporateEmail("user@tiscali.it", false).valid, false);
assert.strictEqual(validateCorporateEmail("user@web.de", false).valid, false);
assert.strictEqual(validateCorporateEmail("user@guerrillamail.com", false).valid, false);

// Invalid email syntax tests
assert.strictEqual(validateCorporateEmail("not-an-email").valid, false);
assert.strictEqual(validateCorporateEmail("@domain.com").valid, false);
assert.strictEqual(validateCorporateEmail("user@").valid, false);
assert.strictEqual(validateCorporateEmail("user @domain.com").valid, false);

// Genuine corporate domains across TLDs (.com, .it, .de, .eu, .org) must be accepted
assert.strictEqual(validateCorporateEmail("architect@arup.com", false).valid, true);
assert.strictEqual(validateCorporateEmail("ingegnere@studio-architettura.it", false).valid, true);
assert.strictEqual(validateCorporateEmail("bauingenieur@strabag.de", false).valid, true);
assert.strictEqual(validateCorporateEmail("consultant@bim-europe.eu", false).valid, true);
assert.strictEqual(validateCorporateEmail("director@atkinsrealis.com", false).valid, true);

// Authorized pybim.com and pybim.it internal test addresses must be accepted
assert.strictEqual(validateCorporateEmail("support@pybim.com", false).valid, true);
assert.strictEqual(validateCorporateEmail("support@pybim.it", false).valid, true);
assert.strictEqual(validateCorporateEmail("dev@corp.pybim.com", false).valid, true);

// Corporate email normalization test
const normCheck = validateCorporateEmail("  Partner.Lead@Engineering-Firm.COM  ", false);
assert.strictEqual(normCheck.valid, true);
assert.strictEqual(normCheck.sanitized, "Partner.Lead@engineering-firm.com");
assert.strictEqual(normCheck.domain, "engineering-firm.com");

// Verify that ALLOW_FREEMAIL_FOR_TESTING cannot bypass corporate-email restriction in production
const origNodeEnv = process.env.NODE_ENV;
const origFreemailEnv = process.env.ALLOW_FREEMAIL_FOR_TESTING;
try {
  process.env.NODE_ENV = "production";
  process.env.ALLOW_FREEMAIL_FOR_TESTING = "true";

  // In production, even with ALLOW_FREEMAIL_FOR_TESTING="true" or allowFreemail=true, it MUST be rejected!
  const prodBypassAttempt1 = validateCorporateEmail("tester@gmail.com", true);
  assert.strictEqual(
    prodBypassAttempt1.valid,
    false,
    "Production environment must NEVER allow allowFreemail parameter bypass"
  );

  const prodBypassAttempt2 = validateCorporateEmail("tester@gmail.com", false);
  assert.strictEqual(
    prodBypassAttempt2.valid,
    false,
    "Production environment must NEVER allow ALLOW_FREEMAIL_FOR_TESTING env bypass"
  );
} finally {
  process.env.NODE_ENV = origNodeEnv;
  if (origFreemailEnv !== undefined) {
    process.env.ALLOW_FREEMAIL_FOR_TESTING = origFreemailEnv;
  } else {
    delete process.env.ALLOW_FREEMAIL_FOR_TESTING;
  }
}
console.log("   ✓ Corporate email policy strictly rejects all 15 required consumer/disposable domains, forbids production bypass, and accepts valid corporate domains");

// 6. Privacy Acknowledgment Validation
console.log("6. Testing validatePrivacyAcknowledgment enforcement...");
assert.strictEqual(validatePrivacyAcknowledgment(true).valid, true);
assert.ok(validatePrivacyAcknowledgment(true).timestamp.length > 10, "Server timestamp must be recorded");
assert.strictEqual(validatePrivacyAcknowledgment(false).valid, false);
assert.strictEqual(validatePrivacyAcknowledgment("true").valid, false, "String 'true' must be rejected (type safety)");
assert.strictEqual(validatePrivacyAcknowledgment(null).valid, false);
assert.strictEqual(validatePrivacyAcknowledgment(undefined).valid, false);
assert.strictEqual(validatePrivacyAcknowledgment(1).valid, false);
console.log("   ✓ Privacy acknowledgment strictly enforces boolean true and records server timestamp");

// 7. Stream-based bounded JSON parsing
console.log("7. Testing parseBoundedJson stream byte counting...");
const validBody = { name: "Test Corp", email: "corp@example.com" };
const validReq = new Request("https://example.com/api/test", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(validBody)
});
const parsed = await parseBoundedJson(validReq, 64 * 1024);
assert.strictEqual(parsed.ok, true);
assert.strictEqual(parsed.body.name, "Test Corp");

// Oversized payload without Content-Length
const bigString = "x".repeat(70 * 1024);
const oversizedReq = new Request("https://example.com/api/test", {
  method: "POST",
  headers: { "Content-Type": "application/json" }, // no Content-Length set
  body: JSON.stringify({ data: bigString })
});
const oversizedParsed = await parseBoundedJson(oversizedReq, 64 * 1024);
assert.strictEqual(oversizedParsed.ok, false);
assert.strictEqual(oversizedParsed.status, 413, "Must return HTTP 413 for stream exceeding 64KB");
console.log("   ✓ parseBoundedJson enforces byte limits on actual received stream bytes");

// 8. DNS / MX verification capability tests
console.log("8. Testing verifyDomainMx behavior and error classification...");
// Real-world DNS checks for known domains
const mxValid = await verifyDomainMx("pybim.com", false);
assert.strictEqual(mxValid.valid, true, "pybim.com internal domain must pass MX check");

const mxArup = await verifyDomainMx("google.com", false);
assert.strictEqual(mxArup.valid, true, "google.com must have valid MX records");

// Nonexistent domain test
const mxNonexistent = await verifyDomainMx("this-is-a-completely-fake-domain-xyz987654.com", false);
assert.strictEqual(mxNonexistent.valid, false, "Nonexistent domain must fail MX check");
assert.strictEqual(mxNonexistent.status, 400, "Nonexistent domain must return HTTP 400");
console.log("   ✓ verifyDomainMx correctly resolves valid MX and rejects nonexistent domains");

// 9. Fail-closed email configuration check
console.log("9. Testing fail-closed email configuration check...");
const origHost = process.env.SMTP_HOST;
const origContact = process.env.CONTACT_TO;
const origApiKey = process.env.RESEND_API_KEY;

delete process.env.SMTP_HOST;
delete process.env.CONTACT_TO;
delete process.env.RESEND_API_KEY;

assert.strictEqual(isEmailConfigured(), false);
assert.strictEqual(checkEmailConfiguration().ok, false);
assert.strictEqual(checkEmailConfiguration().statusCode, 503);

process.env.SMTP_HOST = origHost || "smtp.register.it";
process.env.CONTACT_TO = origContact || "support@pybim.com";
if (origApiKey) process.env.RESEND_API_KEY = origApiKey;
console.log("   ✓ Fail-closed behavior confirmed when email settings are unconfigured");

// 10. Email routing & Reply-To behavior tests (Owner Requirements)
console.log("10. Testing email routing configuration and Reply-To semantics...");
const config = getEmailConfig();
assert.strictEqual(config.contactTo, "support@pybim.com", "CONTACT_TO must default to support@pybim.com");
assert.strictEqual(config.emailFrom, "pyBIM Support <support@pybim.com>", "EMAIL_FROM must default to pyBIM Support <support@pybim.com>");
assert.strictEqual(config.supportReplyTo, "support@pybim.com", "supportReplyTo must default to support@pybim.com");

// Internal Notification Payload Check
const internalMsg = buildEmailPayload({
  type: "internal_notification",
  customerEmail: "client@engineering-partner.com",
  subject: "New Project Enquiry\r\nBcc: evil@attacker.com",
  html: "<p>New Enquiry</p>"
});
assert.strictEqual(internalMsg.to, "support@pybim.com", "Internal notification must deliver to support@pybim.com");
assert.strictEqual(internalMsg.replyTo, "client@engineering-partner.com", "Internal notification Reply-To must be customer email");
assert.strictEqual(internalMsg.subject, "New Project Enquiry  Bcc: evil@attacker.com", "Subject must be sanitized of CRLF");

// Applicant Auto-Responder Payload Check
const autoMsg = buildEmailPayload({
  type: "applicant_autoresponder",
  customerEmail: "client@engineering-partner.com",
  subject: "Your pyBIM Application Receipt",
  html: "<p>Receipt</p>"
});
assert.strictEqual(autoMsg.to, "client@engineering-partner.com", "Auto-responder must send to applicant");
assert.strictEqual(autoMsg.replyTo, "support@pybim.com", "Auto-responder Reply-To must be support@pybim.com");
assert.strictEqual(autoMsg.from, "pyBIM Support <support@pybim.com>", "From header must be pyBIM Support <support@pybim.com>");
console.log("   ✓ Email routing and Reply-To semantics verified per owner requirements");

// 11. Turnstile Verification Module
console.log("11. Testing verifyTurnstileToken security logic...");
// Without TURNSTILE_SECRET_KEY, returns ok: true to avoid blocking dev/CI
delete process.env.TURNSTILE_SECRET_KEY;
const devCheck = await verifyTurnstileToken("dummy-token", "127.0.0.1");
assert.strictEqual(devCheck.ok, true);

// When configured, must reject missing/empty tokens fail-closed
process.env.TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA"; // Cloudflare official test secret
const missingTokenCheck = await verifyTurnstileToken("", "127.0.0.1");
assert.strictEqual(missingTokenCheck.ok, false);
assert.strictEqual(missingTokenCheck.status, 403);
delete process.env.TURNSTILE_SECRET_KEY;
console.log("   ✓ Turnstile verification enforces fail-closed token requirements");

console.log("\n=== ALL 11 FORM-01 TEST SUITES PASSED SUCCESSFULLY ===\n");

// 12. Accessibility (A11Y-01) Contact Form DOM & Live Announcement Verification
console.log("12. Testing Contact Form A11Y-01 ARIA error announcements & descriptions...");
import fs from "node:fs";
const contactLayoutSource = fs.readFileSync("components/pages/contact-page-layout.js", "utf-8");

// A. Discipline error element assertions
assert.ok(
  contactLayoutSource.includes('id="discipline-error-msg"'),
  "Discipline error message must define id='discipline-error-msg'"
);
assert.ok(
  contactLayoutSource.includes('role="alert"') && contactLayoutSource.includes('aria-live="polite"'),
  "Error messages must include role='alert' and aria-live='polite'"
);

// B. Other scope field and error element assertions
assert.ok(
  contactLayoutSource.includes('id="contact-other-scope"'),
  "Other scope input must exist with id='contact-other-scope'"
);
assert.ok(
  contactLayoutSource.includes('aria-describedby={otherScopeError ? "other-scope-error-msg" : undefined}'),
  "Other scope textarea must bind aria-describedby to other-scope-error-msg conditionally"
);
assert.ok(
  contactLayoutSource.includes('aria-invalid={otherScopeError}'),
  "Other scope textarea must bind aria-invalid to otherScopeError"
);
assert.ok(
  contactLayoutSource.includes('id="other-scope-error-msg"'),
  "Other scope error message must define id='other-scope-error-msg'"
);

// C. Privacy consent field and error element assertions
assert.ok(
  contactLayoutSource.includes('id="privacy-contact"'),
  "Privacy checkbox must exist with id='privacy-contact'"
);
assert.ok(
  contactLayoutSource.includes('aria-describedby={privacyError ? "privacy-error-msg" : undefined}'),
  "Privacy checkbox must bind aria-describedby to privacy-error-msg conditionally"
);
assert.ok(
  contactLayoutSource.includes('aria-invalid={privacyError}'),
  "Privacy checkbox must bind aria-invalid to privacyError"
);
assert.ok(
  contactLayoutSource.includes('id="privacy-error-msg"'),
  "Privacy error message must define id='privacy-error-msg'"
);

console.log("   ✓ All A11Y-01 ARIA attributes, live announcements, and descriptors verified successfully\n");

// 13. Testing DEL-01 Submission Lifecycle, Resend Idempotency & API Error Resilience
console.log("13. Testing DEL-01 Submission Lifecycle, Resend Idempotency & API Error Resilience...");
import { validateSubmissionId } from "../lib/formValidation.js";
import { parseApiResponse, getLocalizedErrorMessage, getNetworkErrorMessage } from "../lib/apiResponse.js";
import { _clearMockSentEmails, _getMockSentEmails, sendEmail, EmailDeliveryError } from "../lib/emailDelivery.js";

// A. SubmissionId format validation and rejection of malformed / PII identifiers
const validUuid = "123e4567-e89b-42d3-a456-426614174000";
assert.strictEqual(validateSubmissionId(validUuid).valid, true, "Valid UUID v4 must pass");
assert.strictEqual(validateSubmissionId(validUuid.toUpperCase()).valid, true, "Uppercase UUID v4 must normalize to lowercase");
assert.strictEqual(validateSubmissionId(validUuid.toUpperCase()).sanitized, validUuid, "Must return lowercased sanitized UUID");
assert.strictEqual(validateSubmissionId("").valid, false, "Empty string must be rejected");
assert.strictEqual(validateSubmissionId(null).valid, false, "Null must be rejected");
assert.strictEqual(validateSubmissionId("john.doe@company.com").valid, false, "Email PII must be rejected as submissionId");
assert.strictEqual(validateSubmissionId("John Doe").valid, false, "Name PII must be rejected as submissionId");
assert.strictEqual(validateSubmissionId("invalid-uuid-format").valid, false, "Non-UUID string must be rejected");
assert.strictEqual(validateSubmissionId("123e4567-e89b-12d3-a456-426614174000").valid, false, "Non-v4 UUID must be rejected");
console.log("   ✓ validateSubmissionId strictly accepts UUID v4 and rejects PII or malformed strings");

// B. Idempotency Key Namespacing in Mock Transport
_clearMockSentEmails();
process.env.MOCK_EMAIL_DELIVERY = "true";

// Simulate Contact form submission dispatch
const contactSubmissionId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
const contactKey = `contact-${contactSubmissionId}-internal`;
const contactPayload = buildEmailPayload({
  type: "internal_notification",
  customerEmail: "client@engineering-firm.com",
  subject: "Technical Audit Request",
  html: "<p>Audit details</p>",
  idempotencyKey: contactKey
});
await sendEmail(contactPayload);

// Simulate Early Access multi-email dispatch (staff notification + applicant autoresponder)
const earlySubmissionId = "c9a646d3-9c61-4cc9-bc55-e4d6d3d9e248";
const earlyStaffKey = `early-${earlySubmissionId}-staff`;
const earlyApplicantKey = `early-${earlySubmissionId}-applicant`;

const earlyStaffPayload = buildEmailPayload({
  type: "internal_notification",
  customerEmail: "applicant@firm.com",
  subject: "Early Access Staff",
  html: "<p>Staff notification</p>",
  idempotencyKey: earlyStaffKey
});
await sendEmail(earlyStaffPayload);

const earlyApplicantPayload = buildEmailPayload({
  type: "applicant_autoresponder",
  customerEmail: "applicant@firm.com",
  subject: "Early Access Receipt",
  html: "<p>Applicant receipt</p>",
  idempotencyKey: earlyApplicantKey
});
await sendEmail(earlyApplicantPayload);

const sent = _getMockSentEmails();
assert.strictEqual(sent.length, 3, "3 emails must be recorded in mock storage");
assert.strictEqual(sent[0].idempotencyKey, contactKey);
assert.strictEqual(sent[1].idempotencyKey, earlyStaffKey);
assert.strictEqual(sent[2].idempotencyKey, earlyApplicantKey);
assert.notStrictEqual(sent[1].idempotencyKey, sent[2].idempotencyKey, "Staff and applicant keys must never collide");
console.log("   ✓ Resend idempotency namespacing strictly distinguishes Contact, Early Access Staff, and Early Access Applicant");

// C. Resend 409 Concurrent Requests and Idempotency Mismatch Error Translation
const concurrentError = new EmailDeliveryError("Concurrent requests", 409, "CONCURRENT_IDEMPOTENT_REQUESTS");
assert.strictEqual(concurrentError.statusCode, 409);
assert.strictEqual(concurrentError.code, "CONCURRENT_IDEMPOTENT_REQUESTS");

const mismatchError = new EmailDeliveryError("Payload mismatch", 400, "IDEMPOTENCY_PAYLOAD_MISMATCH");
assert.strictEqual(mismatchError.statusCode, 400);
assert.strictEqual(mismatchError.code, "IDEMPOTENCY_PAYLOAD_MISMATCH");
console.log("   ✓ EmailDeliveryError handles Resend 409 and 400 idempotency conflicts with proper status codes");

// D. parseApiResponse Handling: JSON Success
const mockOkRes = {
  ok: true,
  status: 200,
  headers: new Headers({ "content-type": "application/json" }),
  json: async () => ({ ok: true, queueReference: "PYBIM-APP-1234" })
};
const parsedOk = await parseApiResponse(mockOkRes, "en");
assert.strictEqual(parsedOk.ok, true);
assert.strictEqual(parsedOk.data.queueReference, "PYBIM-APP-1234");

// E. parseApiResponse Handling: HTML 429 from Cloudflare WAF
const mockWaf429Res = {
  ok: false,
  status: 429,
  headers: new Headers({ "content-type": "text/html; charset=UTF-8" }),
  json: async () => { throw new SyntaxError("Unexpected token '<'"); }
};
const parsedWaf429En = await parseApiResponse(mockWaf429Res, "en");
assert.strictEqual(parsedWaf429En.ok, false);
assert.strictEqual(parsedWaf429En.status, 429);
assert.strictEqual(parsedWaf429En.error, "Too many requests. Please wait a moment before trying again.");

const parsedWaf429It = await parseApiResponse(mockWaf429Res, "it");
assert.strictEqual(parsedWaf429It.error, "Troppe richieste. Ti preghiamo di attendere un momento prima di riprovare.");

const parsedWaf429De = await parseApiResponse(mockWaf429Res, "de");
assert.strictEqual(parsedWaf429De.error, "Zu viele Anfragen. Bitte warten Sie einen Moment, bevor Sie es erneut versuchen.");

// F. parseApiResponse Handling: HTML 403 Forbidden
const mockWaf403Res = {
  ok: false,
  status: 403,
  headers: new Headers({ "content-type": "text/html" }),
  json: async () => { throw new SyntaxError("Unexpected token '<'"); }
};
const parsedWaf403 = await parseApiResponse(mockWaf403Res, "en");
assert.strictEqual(parsedWaf403.ok, false);
assert.strictEqual(parsedWaf403.status, 403);
assert.strictEqual(parsedWaf403.error, "Access denied. Please complete the security check and try again.");

// G. parseApiResponse Handling: 409 Conflict
const mock409Res = {
  ok: false,
  status: 409,
  headers: new Headers({ "content-type": "application/json" }),
  json: async () => ({ ok: false, error: "A submission request is already being processed." })
};
const parsed409 = await parseApiResponse(mock409Res, "en");
assert.strictEqual(parsed409.ok, false);
assert.strictEqual(parsed409.status, 409);
assert.strictEqual(parsed409.error, "A submission request is already being processed.");

// H. parseApiResponse Handling: 5xx Server Error without leaking internal exceptions
const mock500Res = {
  ok: false,
  status: 500,
  headers: new Headers({ "content-type": "application/json" }),
  json: async () => ({ ok: false, error: "Error: DatabaseConnectionException at line 42" })
};
const parsed500 = await parseApiResponse(mock500Res, "en");
assert.strictEqual(parsed500.ok, false);
assert.strictEqual(parsed500.status, 500);
assert.strictEqual(parsed500.error, "Service temporarily unavailable. Please try again shortly.", "Raw exception must be masked");

// I. Network Abort & Failure Handling
const abortErr = new Error("The operation was aborted");
abortErr.name = "AbortError";
assert.strictEqual(getNetworkErrorMessage(abortErr, "en"), "Request timed out. Please try again.");

const netErr = new TypeError("Failed to fetch");
assert.strictEqual(getNetworkErrorMessage(netErr, "en"), "Network connection error. Please check your connection and try again.");
assert.strictEqual(getNetworkErrorMessage(netErr, "it"), "Errore di connessione di rete. Verifica la tua connessione e riprova.");
console.log("   ✓ parseApiResponse safely handles HTML 429/403, JSON errors, 5xx masking, timeouts, and network drops");

// J. Static Code Verification for Form Handlers
const contactSource = fs.readFileSync("components/pages/contact-page-layout.js", "utf-8");
assert.ok(contactSource.includes("submissionId"), "Contact form must integrate submissionId");
assert.ok(contactSource.includes("parseApiResponse"), "Contact form must use parseApiResponse");
assert.ok(contactSource.includes("getNetworkErrorMessage"), "Contact form must use getNetworkErrorMessage");

const queueSource = fs.readFileSync("components/sections/priority-queue-section.js", "utf-8");
assert.ok(queueSource.includes("submissionId"), "PriorityQueue must integrate submissionId");
assert.ok(queueSource.includes("parseApiResponse"), "PriorityQueue must use parseApiResponse");
assert.ok(queueSource.includes("getNetworkErrorMessage"), "PriorityQueue must use getNetworkErrorMessage");

console.log("   ✓ Contact and Early Access components verify submissionId and resilient response parsing\n");
