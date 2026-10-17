/**
 * LEGACY ENDPOINT: app/api/roi-matrix/route.js
 *
 * NOTE (ROI-01 / ROI-02):
 * This server-side spreadsheet generator is deprecated and retained for backward compatibility only.
 * Production downloads transition to browser-side lazy-loaded ExcelJS generation (ROI-02).
 * Enterprise eligibility checks are handled via /api/roi-matrix/eligibility.
 */

import nodemailer from "nodemailer";
import dns from "dns/promises";
import { buildHybridRoiWorkbook } from "@/lib/roiExcelGenerator";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { escapeHtml, isValidEmail } from "@/lib/security";

const FREE_EMAIL_PROVIDERS = [
  "gmail.com", "yahoo.com", "yahoo.it", "hotmail.com", "hotmail.it", 
  "outlook.com", "outlook.it", "live.com", "live.it", "icloud.com", 
  "msn.com", "aol.com", "libero.it", "virgilio.it", "alice.it", "tin.it",
  "fastwebnet.it", "tiscali.it", "ymail.com", "mail.com", "gmx.com", "proton.me", "protonmail.com"
];

export async function POST(req) {
  try {
    const clientIp = getClientIp(req);

    // Rate Limiting: Max 5 ROI calculations per 60 seconds per IP
    const rateCheck = checkRateLimit(clientIp, 'roi-matrix', 5, 60 * 1000);
    if (!rateCheck.allowed) {
      console.warn(`[SECURITY ALERT - RATE LIMIT EXCEEDED] IP: ${clientIp} exceeded ROI matrix limit.`);
      return Response.json(
        { ok: false, error: `Too many calculation requests. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.` },
        { 
          status: 429, 
          headers: { 
            'Retry-After': String(rateCheck.retryAfterSeconds),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
          } 
        }
      );
    }

    const body = await req.json();
    const { name, companyName, email, modelerCount, hourlyRate, language = 'en' } = body;

    // Guard against Workers Free CPU execution limits on staging
    if (process.env.ROI_GENERATION_ENABLED !== "true") {
      return Response.json(
        { ok: false, error: "Automated ROI workbook export is temporarily disabled on this preview staging environment to protect edge compute limits." },
        { status: 503 }
      );
    }

    if (!name || !companyName || !email || !modelerCount || !hourlyRate) {
      return Response.json({ ok: false, error: "Missing required calculation parameters." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ ok: false, error: "Invalid email format." }, { status: 400 });
    }

    const numModelers = parseInt(modelerCount, 10);
    const rateHourly = parseFloat(hourlyRate);

    if (isNaN(numModelers) || numModelers < 1) {
      return Response.json({ ok: false, error: "Number of BIM modelers must be a valid integer greater than 0." }, { status: 400 });
    }

    if (isNaN(rateHourly) || rateHourly <= 0) {
      return Response.json({ ok: false, error: "Average hourly rate must be a valid positive number." }, { status: 400 });
    }

    // Corporate domain validation
    const emailParts = email.toLowerCase().trim().split("@");
    const domain = emailParts[1];

    const isDev = process.env.NODE_ENV !== "production";
    const isPybimInternal = domain.includes("pybim");

    // Check if free email provider (disabled in dev or for pybim internal)
    if (!isDev && !isPybimInternal && FREE_EMAIL_PROVIDERS.includes(domain)) {
      return Response.json(
        { ok: false, error: "Corporate domains only. Public email providers (Gmail, Yahoo, Outlook, etc.) are automatically restricted." },
        { status: 400 }
      );
    }

    // DNS MX Verification (non-blocking in dev or if domain is pybim internal)
    if (!isDev && !isPybimInternal) {
      try {
        const records = await dns.resolveMx(domain);
        if (!records || records.length === 0) {
          throw new Error("No MX records found");
        }
      } catch (mxError) {
        console.warn(`[MX Check for ${domain}]:`, mxError.code || mxError.message);
        if (mxError.code === "ENOTFOUND") {
          return Response.json(
            { ok: false, error: "Corporate domain could not be verified. Please use a valid corporate email address." },
            { status: 400 }
          );
        }
      }
    }

    // SERVER-SIDE DEFAULT VARIABLES (ISO 19650-5 Baseline)
    const avgHoursWasted = 12.0; // Baseline, user can edit inside unlocked green cell C9
    const workingWeeks = 48;     // European annual working weeks baseline

    // BUILD 3-TAB HYBRID WORKBOOK (USER'S CURRENT LANGUAGE IS FIRST & ACTIVE)
    const workbook = await buildHybridRoiWorkbook({
      name,
      companyName,
      modelerCount: numModelers,
      hourlyRate: rateHourly,
      avgHoursWasted,
      workingWeeks,
      language
    });

    // Write binary buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Async internal notification (non-blocking)
    if (process.env.SMTP_USER && process.env.CONTACT_TO) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const safeName = escapeHtml(name);
        const safeCompany = escapeHtml(companyName);
        const safeEmail = escapeHtml(email);
        const safeLanguage = escapeHtml(language.toUpperCase());

        transporter.sendMail({
          from: `pyBIM Portal <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: process.env.CONTACT_TO,
          subject: `[Protected ROI Matrix - 3-Tab Hybrid (${safeLanguage})] ${companyName.replace(/[\r\n]/g, ' ')} (${numModelers} modelers @ €${rateHourly}/hr)`,
          html: `
            <h3>Protected 3-Tab Hybrid ROI Matrix Downloaded</h3>
            <p><strong>Language Selected:</strong> ${safeLanguage}</p>
            <p><strong>Lead Name:</strong> ${safeName}</p>
            <p><strong>Company:</strong> ${safeCompany}</p>
            <p><strong>Corporate Email:</strong> ${safeEmail}</p>
            <p><strong>BIM Modelers Count:</strong> ${numModelers}</p>
            <p><strong>Hourly Rate:</strong> €${rateHourly}/hr</p>
            <p><strong>Working Weeks:</strong> ${workingWeeks} wks</p>
            <p><strong>Hours Wasted:</strong> ${avgHoursWasted} hrs/wk</p>
            <p><strong>Annual Loss Baseline:</strong> €${(numModelers * rateHourly * avgHoursWasted * workingWeeks).toLocaleString()}</p>
          `,
        }).catch((e) => console.error("ROI Mail notification failed:", e));
      } catch (mailErr) {
        console.error("Transporter setup error:", mailErr);
      }
    }

    const safeCompany = companyName.replace(/[^a-zA-Z0-9]/g, "_");
    const filenamePrefix = language === 'it' ? 'pyBIM-Calcolo-ROI' : language === 'de' ? 'pyBIM-ROI-Rechner' : 'pyBIM-ROI-Matrix';

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filenamePrefix}-${safeCompany}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("ROI Generation Error:", error);
    return Response.json({ ok: false, error: "Failed to generate personalized ROI calculation spreadsheet." }, { status: 500 });
  }
}
