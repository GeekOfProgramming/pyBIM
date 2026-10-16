import assert from "node:assert";
import {
  isInternalDomain,
  normalizeEmail,
  sanitizeHeader,
  validateTextField,
  validateCorporateEmail,
  ALLOWED_INTERNAL_DOMAINS
} from "../lib/formValidation.js";
import {
  isEmailConfigured,
  checkEmailConfiguration,
  getEmailConfig,
  buildEmailPayload
} from "../lib/emailDelivery.js";

console.log("=== RUNNING FORM-01 SECURITY & VALIDATION TESTS ===");

// 1. isInternalDomain security tests (strict allowlist vs substring matching)
console.log("1. Testing isInternalDomain security against substring bypasses...");
assert.strictEqual(isInternalDomain("pybim.com"), true, "pybim.com must be recognized");
assert.strictEqual(isInternalDomain("pybim.it"), true, "pybim.it must be recognized");
assert.strictEqual(isInternalDomain("pybim.co"), true, "pybim.co must be recognized");
assert.strictEqual(isInternalDomain("corp.pybim.com"), true, "subdomain of pybim.com must be recognized");

// CRITICAL SECURITY TESTS: Substring injection vectors must be REJECTED
assert.strictEqual(isInternalDomain("evil-pybim.com"), false, "evil-pybim.com must be rejected");
assert.strictEqual(isInternalDomain("notpybim.com"), false, "notpybim.com must be rejected");
assert.strictEqual(isInternalDomain("pybim.com.attacker.org"), false, "pybim.com.attacker.org must be rejected");
assert.strictEqual(isInternalDomain("pybimfake.com"), false, "pybimfake.com must be rejected");
assert.strictEqual(isInternalDomain(""), false, "empty domain must be rejected");
assert.strictEqual(isInternalDomain(null), false, "null must be rejected");
console.log("   ✓ isInternalDomain strictly rejects substring injection attempts");

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

// 5. Corporate email policy validation
console.log("5. Testing validateCorporateEmail policy...");
assert.strictEqual(validateCorporateEmail("user@gmail.com", false).valid, false);
assert.strictEqual(validateCorporateEmail("user@yahoo.it", false).valid, false);
assert.strictEqual(validateCorporateEmail("architect@arup.com", false).valid, true);
assert.strictEqual(validateCorporateEmail("lead@pybim.com", false).valid, true);
assert.strictEqual(validateCorporateEmail("support@pybim.com", false).valid, true);
assert.strictEqual(validateCorporateEmail("malicious@evil-pybim.com", false).valid, true); // Corporate domain, but not internal
assert.strictEqual(validateCorporateEmail("malicious@evil-pybim.com", false).isInternal, false);
assert.strictEqual(validateCorporateEmail("eng@pybim.com", false).isInternal, true);
console.log("   ✓ validateCorporateEmail enforces policy and distinguishes verified internal domains");

// 6. Fail-closed email configuration check
console.log("6. Testing fail-closed email configuration check...");
const origHost = process.env.SMTP_HOST;
const origContact = process.env.CONTACT_TO;
const origApiKey = process.env.RESEND_API_KEY;

delete process.env.SMTP_HOST;
delete process.env.CONTACT_TO;
delete process.env.RESEND_API_KEY;

assert.strictEqual(isEmailConfigured(), false);
assert.strictEqual(checkEmailConfiguration().ok, false);
assert.strictEqual(checkEmailConfiguration().statusCode, 503);

// Restore or mock
process.env.SMTP_HOST = origHost || "smtp.register.it";
process.env.CONTACT_TO = origContact || "support@pybim.com";
if (origApiKey) process.env.RESEND_API_KEY = origApiKey;
console.log("   ✓ Fail-closed behavior confirmed when email settings are unconfigured");

// 7. Email routing & Reply-To behavior tests (Owner Requirements)
console.log("7. Testing email routing configuration and Reply-To semantics...");
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

console.log("\n=== ALL FORM-01 TESTS PASSED SUCCESSFULLY ===\n");
