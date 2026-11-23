import { escapeHtml } from "./security.js";

/**
 * Resolves a supported email locale ('en' | 'it' | 'de'), defaulting to 'en'.
 *
 * @param {string} [locale]
 * @returns {'en'|'it'|'de'}
 */
export function resolveEmailLocale(locale) {
  if (typeof locale !== "string") return "en";
  const normalized = locale.trim().toLowerCase();
  if (normalized === "it" || normalized === "de" || normalized === "en") {
    return normalized;
  }
  return "en";
}

function renderConfirmationHtml({ badge, title, bodyParagraphs, referenceLine, footerTeam, footerLocation }) {
  const paragraphsHtml = bodyParagraphs
    .map((p, idx) => {
      const margin = idx === bodyParagraphs.length - 1 ? "0" : "0 0 16px 0";
      return `<p style="margin: ${margin};">${p}</p>`;
    })
    .join("\n                ");

  const refHtml = referenceLine
    ? `<p style="margin: 8px 0 0 0; font-size: 12px; color: #64748b; font-family: monospace;">${referenceLine}</p>`
    : "";

  return `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
              <div style="margin-bottom: 24px;">
                <span style="display: inline-block; font-family: monospace; font-size: 11px; font-weight: 700; color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 4px 10px; border-radius: 6px; letter-spacing: 1px; text-transform: uppercase;">
                  ${badge}
                </span>
                ${refHtml}
              </div>

              <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0; letter-spacing: -0.5px;">
                ${title}
              </h2>

              <div style="font-size: 15px; line-height: 1.7; color: #334155; margin-bottom: 24px;">
                ${paragraphsHtml}
              </div>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 14px; color: #475569;">
                <p style="margin: 0 0 4px 0; font-weight: 700; color: #0f172a;">${footerTeam}</p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">${footerLocation}</p>
              </div>
            </div>
          `;
}

const CONTACT_COPY = {
  en: {
    subject: "We Received Your Project Enquiry | pyBIM",
    badge: "// PROJECT ENQUIRY RECEIVED",
    title: "Project Enquiry Confirmation",
    greeting: (name) => `Hello ${name},`,
    p1: "Thank you for contacting pyBIM. We confirm that we have received your project enquiry.",
    p2: "Our engineering team will review your submission and follow up regarding potential next steps.",
    p3: "If you have any additional details to share, you can reply to this email or reach us at support@pybim.com.",
    footerTeam: "The pyBIM Engineering Team",
    footerLocation: "pyBIM • Padua, Veneto, Italy",
  },
  it: {
    subject: "Abbiamo ricevuto la tua richiesta di progetto | pyBIM",
    badge: "// RICHIESTA PROGETTO RICEVUTA",
    title: "Conferma Ricezione Richiesta",
    greeting: (name) => `Gentile ${name},`,
    p1: "Grazie per aver contattato pyBIM. Confermiamo di aver ricevuto la tua richiesta di progetto.",
    p2: "Il nostro team tecnico esaminerà la richiesta inviata e valuterà i possibili passi successivi.",
    p3: "Per ulteriori informazioni puoi rispondere a questa email o contattarci all'indirizzo support@pybim.com.",
    footerTeam: "Il Team di Ingegneria pyBIM",
    footerLocation: "pyBIM • Padova, Veneto, Italia",
  },
  de: {
    subject: "Wir haben Ihre Projektanfrage erhalten | pyBIM",
    badge: "// PROJEKTANFRAGE EINGEGANGEN",
    title: "Bestätigung Ihrer Projektanfrage",
    greeting: (name) => `Guten Tag ${name},`,
    p1: "vielen Dank für Ihre Kontaktaufnahme mit pyBIM. Wir bestätigen den Eingang Ihrer Projektanfrage.",
    p2: "Unser Engineering-Team wird Ihre Angaben prüfen und sich bezüglich möglicher nächster Schritte melden.",
    p3: "Bei ergänzenden Fragen können Sie direkt auf diese E-Mail antworten oder uns unter support@pybim.com erreichen.",
    footerTeam: "Ihr pyBIM Engineering-Team",
    footerLocation: "pyBIM • Padua, Venetien, Italien",
  },
};

const ROI_COPY = {
  en: {
    subject: "Your pyBIM ROI Matrix Request Confirmation",
    badge: "// ROI MATRIX ELIGIBILITY CONFIRMED",
    title: "ROI Matrix Request Confirmation",
    refPrefix: "Session Reference",
    greeting: (name) => `Hello ${name},`,
    p1: "Thank you for using the pyBIM ROI Matrix. Your corporate eligibility check was processed successfully.",
    p2: "Your XLSX workbook download was initiated directly in your browser. Please note that the workbook is not attached to this email.",
    p3: "To access your file, please check your browser's Downloads folder. If you need assistance, contact us at support@pybim.com.",
    footerTeam: "The pyBIM Engineering Team",
    footerLocation: "pyBIM • Padua, Veneto, Italy",
  },
  it: {
    subject: "Conferma della richiesta ROI Matrix | pyBIM",
    badge: "// IDONEITÀ ROI MATRIX CONFERMATA",
    title: "Conferma Richiesta ROI Matrix",
    refPrefix: "Riferimento Sessione",
    greeting: (name) => `Gentile ${name},`,
    p1: "Grazie per aver utilizzato la ROI Matrix di pyBIM. La verifica di idoneità aziendale è stata completata con successo.",
    p2: "Il download del file XLSX è stato avviato direttamente nel tuo browser. Il file non è allegato a questa email.",
    p3: "Per aprire il documento, controlla la cartella Download del tuo browser. Per supporto puoi scrivere a support@pybim.com.",
    footerTeam: "Il Team di Ingegneria pyBIM",
    footerLocation: "pyBIM • Padova, Veneto, Italia",
  },
  de: {
    subject: "Bestätigung Ihrer pyBIM ROI-Matrix-Anfrage",
    badge: "// ROI-MATRIX BERECHTIGUNG BESTÄTIGT",
    title: "Bestätigung der ROI-Matrix-Anfrage",
    refPrefix: "Sitzungsreferenz",
    greeting: (name) => `Guten Tag ${name},`,
    p1: "vielen Dank für die Nutzung der pyBIM ROI-Matrix. Ihre geschäftliche Berechtigungsprüfung wurde erfolgreich abgeschlossen.",
    p2: "Der Download Ihrer XLSX-Arbeitsmappe wurde direkt in Ihrem Browser gestartet. Bitte beachten Sie, dass die Datei dieser E-Mail nicht angehängt ist.",
    p3: "Bitte prüfen Sie den Download-Ordner Ihres Browsers, um auf die Datei zuzugreifen. Bei Fragen erreichen Sie uns unter support@pybim.com.",
    footerTeam: "Ihr pyBIM Engineering-Team",
    footerLocation: "pyBIM • Padua, Venetien, Italien",
  },
};

/**
 * Builds subject, text, and HTML for the Contact Form customer confirmation email.
 * Intentionally omits sensitive full enquiry contents and avoids response-time promises.
 */
export function buildContactConfirmationEmail({ name, locale }) {
  const lang = resolveEmailLocale(locale);
  const c = CONTACT_COPY[lang];
  const rawName = String(name || "").trim();
  const safeName = escapeHtml(rawName);

  const text = [
    c.greeting(rawName),
    "",
    c.p1,
    c.p2,
    c.p3,
    "",
    c.footerTeam,
  ].join("\n");

  const html = renderConfirmationHtml({
    badge: c.badge,
    title: c.title,
    bodyParagraphs: [
      c.greeting(safeName),
      c.p1,
      c.p2,
      c.p3.replace("support@pybim.com", '<a href="mailto:support@pybim.com" style="color: #2563eb; text-decoration: underline;">support@pybim.com</a>'),
    ],
    footerTeam: c.footerTeam,
    footerLocation: c.footerLocation,
  });

  return { subject: c.subject, text, html };
}

/**
 * Builds subject, text, and HTML for the ROI Matrix customer confirmation email.
 * Explains browser-initiated XLSX download without attachment and without implying server verification of local save.
 */
export function buildRoiConfirmationEmail({ name, referenceId, locale }) {
  const lang = resolveEmailLocale(locale);
  const c = ROI_COPY[lang];
  const rawName = String(name || "").trim();
  const safeName = escapeHtml(rawName);
  const safeRef = referenceId ? escapeHtml(String(referenceId).trim()) : "";

  const refText = referenceId ? `${c.refPrefix}: ${referenceId}` : "";
  const text = [
    c.greeting(rawName),
    "",
    c.p1,
    c.p2,
    c.p3,
    ...(refText ? ["", refText] : []),
    "",
    c.footerTeam,
  ].join("\n");

  const html = renderConfirmationHtml({
    badge: c.badge,
    title: c.title,
    referenceLine: safeRef ? `${c.refPrefix}: ${safeRef}` : "",
    bodyParagraphs: [
      c.greeting(safeName),
      c.p1,
      c.p2,
      c.p3.replace("support@pybim.com", '<a href="mailto:support@pybim.com" style="color: #2563eb; text-decoration: underline;">support@pybim.com</a>'),
    ],
    footerTeam: c.footerTeam,
    footerLocation: c.footerLocation,
  });

  return { subject: c.subject, text, html };
}
