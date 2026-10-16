/**
 * pyBIM Email Delivery Transport Adapter Interface
 * Provides a uniform, provider-agnostic abstraction for email delivery.
 * Facilitates safe testing, mocking, and future provider switching (SMTP, Resend API, etc.)
 * without rewriting route handlers or validation logic.
 */

import { sanitizeHeader } from "./formValidation.js";

export class EmailDeliveryError extends Error {
  constructor(message, statusCode = 502, code = "DELIVERY_FAILED") {
    super(message);
    this.name = "EmailDeliveryError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Resolves standard email routing configuration from environment variables.
 * Defaults are established per owner directives:
 * - CONTACT_TO defaults to support@pybim.com
 * - EMAIL_FROM defaults to pyBIM Support <support@pybim.com>
 * - Auto-responder Reply-To defaults to support@pybim.com
 *
 * @returns {{ contactTo: string, emailFrom: string, supportReplyTo: string }}
 */
export function getEmailConfig() {
  const contactTo = process.env.CONTACT_TO || "support@pybim.com";
  const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_FROM || `pyBIM Support <${contactTo}>`;
  const supportReplyTo = process.env.SUPPORT_REPLY_TO || contactTo;

  return {
    contactTo: contactTo.trim(),
    emailFrom: emailFrom.trim(),
    supportReplyTo: supportReplyTo.trim()
  };
}

/**
 * Checks whether outbound email delivery is configured in the current environment.
 * Supports both SMTP settings and HTTPS API token (e.g. RESEND_API_KEY).
 *
 * @returns {boolean}
 */
export function isEmailConfigured() {
  const hasSmtp = Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_TO
  );
  const hasApiKey = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO);
  return hasSmtp || hasApiKey;
}

/**
 * Validates delivery configuration fail-closed.
 *
 * @returns {{ ok: boolean, error?: string, statusCode?: number }}
 */
export function checkEmailConfiguration() {
  if (!isEmailConfigured()) {
    return {
      ok: false,
      error: "Email delivery service is not configured on this environment.",
      statusCode: 503
    };
  }
  return { ok: true };
}

/**
 * Prepares standard email payload with proper Reply-To semantics:
 * - Internal notification: Reply-To is the customer's email.
 * - Applicant auto-response: Reply-To is support@pybim.com.
 *
 * @param {object} params
 * @param {'internal_notification'|'applicant_autoresponder'} params.type
 * @param {string} params.customerEmail
 * @param {string} params.subject
 * @param {string} params.html
 * @param {string} [params.text]
 * @returns {object}
 */
export function buildEmailPayload({ type, customerEmail, subject, html, text }) {
  const { contactTo, emailFrom, supportReplyTo } = getEmailConfig();

  if (type === "internal_notification") {
    return {
      from: emailFrom,
      to: contactTo,
      replyTo: customerEmail.trim(),
      subject: sanitizeHeader(subject),
      html,
      text
    };
  }

  // applicant_autoresponder
  return {
    from: emailFrom,
    to: customerEmail.trim(),
    replyTo: supportReplyTo,
    subject: sanitizeHeader(subject),
    html,
    text
  };
}
