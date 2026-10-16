/**
 * pyBIM Email Delivery Transport Adapter Interface
 * Provides a uniform, provider-agnostic abstraction for email delivery.
 * Facilitates safe testing, mocking, and future provider switching (SMTP, Cloudflare, Resend, etc.)
 * without rewriting route handlers or validation logic.
 */

export class EmailDeliveryError extends Error {
  constructor(message, statusCode = 502, code = "DELIVERY_FAILED") {
    super(message);
    this.name = "EmailDeliveryError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Checks whether outbound email delivery is configured in the current environment.
 * @returns {boolean}
 */
export function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_TO
  );
}

/**
 * Validates delivery configuration fail-closed.
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
