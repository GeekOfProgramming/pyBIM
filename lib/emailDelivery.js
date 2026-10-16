/**
 * pyBIM Email Delivery Transport Adapter Interface
 * Provides a uniform, provider-agnostic abstraction for email delivery.
 * Facilitates safe testing, mocking, and provider switching (HTTPS Resend API, SMTP, or Mock)
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
 * In-memory mock storage for automated tests and CI verification.
 */
let mockSentEmails = [];

export function _getMockSentEmails() {
  return [...mockSentEmails];
}

export function _clearMockSentEmails() {
  mockSentEmails = [];
}

/**
 * Resolves standard email routing configuration from environment variables.
 * Defaults are established per owner directives:
 * - CONTACT_TO defaults to support@pybim.com
 * - EMAIL_FROM defaults to pyBIM Support <support@pybim.com>
 * - Auto-responder Reply-To defaults to support@pybim.com
 *
 * @returns {{ contactTo: string, emailFrom: string, supportReplyTo: string, transport: 'resend'|'smtp'|'mock'|'unconfigured' }}
 */
export function getEmailConfig() {
  const contactTo = (process.env.CONTACT_TO || "support@pybim.com").trim();
  const emailFrom = (process.env.EMAIL_FROM || process.env.SMTP_FROM || `pyBIM Support <${contactTo}>`).trim();
  const supportReplyTo = (process.env.SUPPORT_REPLY_TO || contactTo).trim();

  let transport = "unconfigured";
  if (process.env.MOCK_EMAIL_DELIVERY === "true") {
    transport = "mock";
  } else if (process.env.EMAIL_TRANSPORT === "resend" || (!process.env.EMAIL_TRANSPORT && process.env.RESEND_API_KEY)) {
    transport = "resend";
  } else if (process.env.EMAIL_TRANSPORT === "smtp" || (!process.env.EMAIL_TRANSPORT && process.env.SMTP_HOST)) {
    transport = "smtp";
  }

  return {
    contactTo,
    emailFrom,
    supportReplyTo,
    transport
  };
}

/**
 * Checks whether outbound email delivery is configured in the current environment.
 * Validates requirements specific to the selected/active transport.
 *
 * @returns {boolean}
 */
export function isEmailConfigured() {
  if (process.env.MOCK_EMAIL_DELIVERY === "true") {
    return true;
  }

  const { transport } = getEmailConfig();
  if (transport === "resend") {
    return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO);
  }
  if (transport === "smtp") {
    return Boolean(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_TO
    );
  }

  return false;
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

/**
 * Dispatches an email using the HTTPS Resend API via native fetch().
 * Includes request timeout and safe error extraction without secret exposure.
 *
 * @param {object} payload
 * @returns {Promise<{ id: string }>}
 */
async function sendViaResend(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new EmailDeliveryError("Resend API key is not configured.", 503, "RESEND_NOT_CONFIGURED");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s request timeout

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        from: payload.from,
        to: Array.isArray(payload.to) ? payload.to : [payload.to],
        reply_to: payload.replyTo,
        subject: payload.subject,
        html: payload.html,
        text: payload.text
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const safeErrorMsg = data.message || `Provider HTTP error ${res.status}`;
      console.error(`[DELIVERY ERROR - RESEND] Status ${res.status}: ${safeErrorMsg}`);
      throw new EmailDeliveryError(`Email delivery failed: ${safeErrorMsg}`, res.status >= 500 ? 502 : 400, "RESEND_DISPATCH_ERROR");
    }

    return { id: data.id || "resend-ok" };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof EmailDeliveryError) throw err;
    if (err.name === "AbortError") {
      throw new EmailDeliveryError("Delivery request timed out.", 504, "DELIVERY_TIMEOUT");
    }
    console.error("[DELIVERY ERROR - RESEND]", err.message || "Network error");
    throw new EmailDeliveryError("Network failure connecting to delivery provider.", 502, "RESEND_NETWORK_ERROR");
  }
}

/**
 * Dispatches an email via SMTP (Nodemailer).
 *
 * @param {object} payload
 * @returns {Promise<{ messageId: string }>}
 */
async function sendViaSmtp(payload) {
  const nodemailerModule = await import("nodemailer");
  const nodemailer = nodemailerModule.default || nodemailerModule;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000
  });

  const info = await transporter.sendMail({
    from: payload.from,
    to: payload.to,
    replyTo: payload.replyTo,
    subject: payload.subject,
    html: payload.html,
    text: payload.text
  });

  return { messageId: info.messageId };
}

/**
 * Uniform email delivery dispatch function.
 * Routes through Mock, Resend HTTPS API, or SMTP based on environment configuration.
 *
 * @param {object} payload
 * @returns {Promise<{ ok: boolean, messageId?: string, id?: string }>}
 */
export async function sendEmail(payload) {
  const { transport } = getEmailConfig();

  if (transport === "mock") {
    mockSentEmails.push({
      ...payload,
      sentAt: new Date().toISOString()
    });
    return { ok: true, id: `mock-${Date.now()}` };
  }

  if (transport === "resend") {
    const res = await sendViaResend(payload);
    return { ok: true, id: res.id };
  }

  if (transport === "smtp") {
    const res = await sendViaSmtp(payload);
    return { ok: true, messageId: res.messageId };
  }

  throw new EmailDeliveryError(
    "Outbound email service is not configured on this environment.",
    503,
    "TRANSPORT_UNCONFIGURED"
  );
}
