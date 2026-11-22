/**
 * Robust Client-Side API Response Parser
 * Safely parses responses from Next.js route handlers and Cloudflare Edge WAF.
 * Handles HTML, JSON, timeouts, and network aborts without exposing raw HTML or stack traces.
 */

const FALLBACK_ERROR_MESSAGES = {
  en: {
    rate_limit: "Too many requests. Please wait a moment before trying again.",
    forbidden: "Access denied. Please complete the security check and try again.",
    conflict: "A submission request is already being processed. Please wait a moment.",
    server_error: "Service temporarily unavailable. Please try again shortly.",
    network_error: "Network connection error. Please check your connection and try again.",
    timeout_error: "Request timed out. Please try again.",
    generic_error: "Failed to process request. Please try again."
  },
  it: {
    rate_limit: "Troppe richieste. Ti preghiamo di attendere un momento prima di riprovare.",
    forbidden: "Accesso negato. Completa la verifica di sicurezza e riprova.",
    conflict: "Una richiesta di invio è già in elaborazione. Ti preghiamo di attendere.",
    server_error: "Servizio temporaneamente non disponibile. Riprova più tardi.",
    network_error: "Errore di connessione di rete. Verifica la tua connessione e riprova.",
    timeout_error: "Richiesta scaduta per timeout. Riprova.",
    generic_error: "Impossibile elaborare la richiesta. Riprova più tardi."
  },
  de: {
    rate_limit: "Zu viele Anfragen. Bitte warten Sie einen Moment, bevor Sie es erneut versuchen.",
    forbidden: "Zugriff verweigert. Bitte schließen Sie die Sicherheitsprüfung ab.",
    conflict: "Eine Übermittlungsanfrage wird bereits verarbeitet. Bitte warten Sie einen Moment.",
    server_error: "Dienst vorübergehend nicht verfügbar. Bitte versuchen Sie es in Kürze erneut.",
    network_error: "Netzwerkverbindungsfehler. Bitte überprüfen Sie Ihre Verbindung.",
    timeout_error: "Zeitüberschreitung der Anforderung. Bitte versuchen Sie es erneut.",
    generic_error: "Anfrage konnte nicht verarbeitet werden. Bitte versuchen Sie es später erneut."
  }
};

/**
 * Normalizes error messages according to HTTP status, error codes, and locale.
 *
 * @param {Response} res - Native Fetch Response object
 * @param {any} data - Parsed JSON object if available
 * @param {string} locale - Active language locale ('en' | 'it' | 'de')
 * @returns {string} Safe user-facing error message
 */
export function getLocalizedErrorMessage(res, data, locale = "en") {
  const messages = FALLBACK_ERROR_MESSAGES[locale] || FALLBACK_ERROR_MESSAGES.en;

  // 1. Status 429: Rate Limit
  if (res.status === 429) {
    if (data && typeof data.error === "string" && data.error.trim()) {
      return data.error.trim();
    }
    return messages.rate_limit;
  }

  // 2. Status 409: Conflict / Concurrent Idempotent Requests
  if (res.status === 409) {
    if (data && typeof data.error === "string" && data.error.trim()) {
      return data.error.trim();
    }
    return messages.conflict;
  }

  // 3. Status 403: Forbidden (Turnstile challenge failure, Cloudflare WAF block)
  if (res.status === 403) {
    if (data && typeof data.error === "string" && data.error.trim()) {
      return data.error.trim();
    }
    return messages.forbidden;
  }

  // 4. Status 5xx: Upstream / Server Error
  if (res.status >= 500) {
    if (data && typeof data.error === "string" && data.error.trim() && !data.error.includes("Exception") && !data.error.includes("Error:")) {
      return data.error.trim();
    }
    return messages.server_error;
  }

  // 5. Explicit application error message in JSON payload
  if (data && typeof data.error === "string" && data.error.trim()) {
    return data.error.trim();
  }

  return messages.generic_error;
}

/**
 * Safely parses an API response without throwing on HTML or non-JSON bodies.
 *
 * @param {Response} res - Fetch Response
 * @param {string} locale - Locale code for fallback error messages
 * @returns {Promise<{ ok: boolean, status: number, data: any, error?: string }>}
 */
export async function parseApiResponse(res, locale = "en") {
  const status = res.status;
  const contentType = (res.headers && res.headers.get("content-type")) || "";
  let data = null;

  if (contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  }

  if (res.ok && data && data.ok) {
    return { ok: true, status, data };
  }

  const errorMessage = getLocalizedErrorMessage(res, data, locale);
  return {
    ok: false,
    status,
    data,
    code: data?.code,
    error: errorMessage
  };
}

/**
 * Handles client-side fetch catch exceptions (network down, aborts, timeouts).
 *
 * @param {Error|any} err
 * @param {string} locale
 * @returns {string} Safe user-facing error message
 */
export function getNetworkErrorMessage(err, locale = "en") {
  const messages = FALLBACK_ERROR_MESSAGES[locale] || FALLBACK_ERROR_MESSAGES.en;
  if (!err) return messages.generic_error;

  if (err.name === "AbortError") {
    return messages.timeout_error;
  }

  if (typeof err.message === "string") {
    const msg = err.message.toLowerCase();
    if (msg.includes("network") || msg.includes("failed to fetch") || msg.includes("load failed")) {
      return messages.network_error;
    }
  }

  return err.message || messages.generic_error;
}
