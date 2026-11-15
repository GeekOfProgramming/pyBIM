# pyBIM — GA4 Privacy-First Setup & Administration Guide

**Document Version:** 1.0.0
**Phase:** GA4-01
**Architecture:** Shared Single Property, Basic Consent Mode, Cross-Domain Measurement
**Target Domains:**
- `https://www.pybim.com` (English `/en`, German `/de`)
- `https://www.pybim.it` (Italian `/it`)

---

## 1. Overview & Architecture

pyBIM uses a single Google Analytics 4 (GA4) property configured with one Web Data Stream to measure engagement across both `.com` and `.it` without domain fragmentation or duplicate tags.

### Core Privacy & Consent Safeguards:
1. **Dormant Configuration:** GA4 remains completely inactive unless a valid Measurement ID (`NEXT_PUBLIC_GA4_MEASUREMENT_ID`) is provided in the build environment.
2. **Basic Consent Mode:**
   - If user consent is not granted, the `gtag.js` script is **never loaded**, zero network requests are dispatched, and zero Google cookies are created.
   - Default signals for advertising (`ad_storage`, `ad_user_data`, `ad_personalization`) are permanently denied.
   - Anonymization and restricted data processing flags (`restricted_data_processing: true`, `anonymize_ip: true`, `allow_google_signals: false`) are hardcoded.
3. **Consent Revocation:** When a user revokes analytics consent via the Cookie Preferences modal, future events are blocked, Google tag consent is updated to `denied`, and `_ga*` cookies are expired.
4. **Zero PII Policy:** Automatic PII scrubbing removes names, emails, phone numbers, form bodies, auth tokens, and session credentials before events are logged.

---

## 2. Google Analytics 4 Property & Data Stream Setup

Follow these exact steps in the Google Analytics Admin console:

### Step 1: Create or Select the GA4 Property
1. Log in to [Google Analytics](https://analytics.google.com).
2. Go to **Admin** (gear icon in lower-left).
3. Select or create an Account: `pyBIM`.
4. Create a Property:
   - **Property Name:** `pyBIM Official Web`
   - **Reporting Time Zone:** `Italy (Rome)` or your organization's primary time zone.
   - **Currency:** `Euro (EUR €)`.
5. Click **Next** and complete business details.

### Step 2: Configure the Single Web Data Stream
1. Under **Data collection and modification**, click **Data Streams** > **Add stream** > **Web**.
2. **Website URL:** `https://www.pybim.com` (default primary host).
3. **Stream name:** `pyBIM Production Web (Multi-Domain)`.
4. **Enhanced measurement:** Click the gear icon:
   - Keep Page views enabled.
   - Ensure "Page changes based on browser history events" is compatible with our client-side `page_view` dispatch (or manage page views exclusively through our component).
5. Click **Create stream**.
6. Copy the generated **Measurement ID** (format: `G-XXXXXXXXXX`).

---

## 3. Cross-Domain Measurement Configuration (Admin-Side)

Because pyBIM operates across two separate Top-Level Domains (`www.pybim.com` and `www.pybim.it`), Google Analytics must be informed that both domains belong to the same entity:

1. Inside your Web Data Stream details, scroll down and click **Configure tag settings**.
2. Under the **Settings** tab, click **Configure your domains**.
3. Under **Include conditions**, add two match conditions:
   - **Condition 1:**
     - Match type: `Contains`
     - Domain: `pybim.com`
   - **Condition 2:**
     - Match type: `Contains`
     - Domain: `pybim.it`
4. Click **Save**.

> [!NOTE]
> **Understanding Cross-Domain Continuity:**
> - Analytics cookies (`_ga`) and user consent preferences (`cookie_consent` in `localStorage`) are strictly domain-specific. An Italian user accepting cookies on `pybim.it` will see the consent banner again if they visit `pybim.com`.
> - The language preference bridge (`?lang_pref=...`) transfers user language choices between domains without passing Google Analytics client IDs or user tracking tokens.
> - GA4's cross-domain linking ensures that when users navigate from `.com` to `.it` (or vice versa), Google Tag links the sessions via an ephemeral `_gl` URL parameter while respecting each domain's separate consent state.

---

## 4. Cloudflare Environment Variable Configuration

When ready to activate analytics for production:

1. Go to the Cloudflare Dashboard > **Workers & Pages**.
2. Select the `pybim` worker/application.
3. Navigate to **Settings** > **Variables and Secrets**.
4. Under **Environment Variables**, add:
   - **Variable name:** `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX` (your official Measurement ID).
5. Trigger a new production deployment from `main`.

---

## 5. Post-Deployment Consent & Verification Checklist

Once deployed to production with the environment variable set:

1. **Clean Profile Verification (First Visit):**
   - Open a clean browser session (or DevTools with empty cache/storage).
   - Inspect the **Network** tab: verify **zero requests** are made to `google-analytics.com` or `googletagmanager.com`.
   - Inspect **Application > Cookies**: verify no `_ga*` cookies are set.
2. **Consent Rejection Test:**
   - Click "Reject Optional" on the Cookie banner.
   - Verify network remains clean; no GA scripts load.
3. **Consent Acceptance Test:**
   - Open Cookie Preferences, toggle Analytics to ON, and click "Save Preferences".
   - Verify `https://www.googletagmanager.com/gtag/js?id=G-...` loads.
   - Verify an initial `page_view` event is sent with:
     - `hostname`: `www.pybim.com` (or `www.pybim.it`)
     - `locale`: `en`, `it`, or `de`
     - `page_path`: e.g. `/en/services`
4. **Consent Revocation Test:**
   - Reopen Cookie Preferences from the footer, uncheck Analytics, and save.
   - Verify `_ga*` cookies are expired and removed from the browser.
5. **Form Submission Test:**
   - Submit an inquiry via the Contact form.
   - Verify only a generic `contact_form_submit` event is sent with `service_id`. Confirm no email, name, or message data is attached.

---

## 6. Reporting Dimensions in GA4

Once data collection begins, you can filter and segment reports by:

- **Hostname:** `www.pybim.com` vs `www.pybim.it` to analyze domain performance.
- **Custom Dimension / Parameter (`locale`):** Compare user journeys across `en`, `it`, and `de`.
- **Country:** Geographic reports to observe regional adoption in Italy, Germany, Austria, and worldwide.
