# pyBIM — GA4 Privacy-First Setup & Administration Guide

**Document Version:** 1.2.0
**Phase:** GA4-01D
**Architecture:** Shared Single Property, Basic Consent Mode, Cross-Domain Measurement
**Target Domains:**
- `https://www.pybim.com` (English `/en`, German `/de`)
- `https://www.pybim.it` (Italian `/it`)

---

## 1. Overview & Architecture

pyBIM uses a single Google Analytics 4 (GA4) property configured with one Web Data Stream to measure engagement across both `.com` and `.it` without domain fragmentation or duplicate tags.

### Core Privacy & Consent Safeguards:
1. **Dormant Configuration:** GA4 remains completely inactive unless a valid Measurement ID (`NEXT_PUBLIC_GA4_MEASUREMENT_ID`) is provided **at Next.js build time**.
2. **Basic Consent Mode & Script Isolation:**
   - If user consent is not granted, the `gtag.js` script is **never loaded**, zero network requests are dispatched, and zero Google cookies are created.
   - Script injection requires **both** explicit user consent (`analytics === true`) AND that the user is visiting an approved public route.
   - Default signals for advertising (`ad_storage`, `ad_user_data`, `ad_personalization`) are permanently denied.
   - Anonymization and restricted data processing flags (`restricted_data_processing: true`, `anonymize_ip: true`, `allow_google_signals: false`) are hardcoded.
3. **Private-Route Shielding:**
   - Client Portal (`/portal/*`), authentication pages (`/login`, `/register`), API endpoints (`/api/*`), and error pages are strictly excluded from analytics initialization and event tracking.
   - If a returning consented user opens `/en/login` or `/en/portal/*` directly, Google Tag is **not loaded**.
4. **Complete Tracking Shutdown (`ga-disable-G-XXXX`):**
   - *Important architectural distinction:* Setting `analytics_storage: denied` alone instructs Google Analytics not to store cookies, but does not guarantee that zero network requests will be dispatched if the script is running.
   - To ensure a **complete shutdown**, pyBIM implements Google's official opt-out mechanism `window['ga-disable-G-XXXXXXXXXX'] = true` whenever consent is revoked or navigation enters a private route. This halts all data transmission directly at the Google Tag library level.
   - In addition, `gtag('consent', 'update', { analytics_storage: 'denied' })` is dispatched and all `_ga*` cookies are expired.
5. **Race Condition Protection:**
   - If consent is revoked or navigation transitions to a private route while `gtag.js` is still downloading, the loader verifies the latest state on completion and immediately enforces shutdown (`analytics_storage: 'denied'` and `ga-disable: true`).
6. **Zero PII Policy & Pure Paths:**
   - Automatic PII scrubbing removes names, emails, phone numbers, form bodies, auth tokens, and session credentials before events are logged.
   - Page views are logged with clean pathnames only (e.g. `/en/services`). No search queries or URL tokens are transmitted.

---

## 2. Google Analytics 4 Property & Data Stream Setup

Follow these exact steps in the Google Analytics Admin console:

### Step 1: Create or Select the GA4 Property
1. Log in to [Google Analytics](https://analytics.google.com).
2. Go to **Admin** (gear icon in lower-left).
3. Select or create an Account: `pyBIM`.
4. Property details:
   - **Property Name:** `pyBIM`
   - **Property ID:** (Configured under pyBIM account)
   - **Reporting Time Zone:** `Italy (Rome)`
   - **Currency:** `Euro (EUR €)`.
5. Click **Next** and complete business details.

### Step 2: Configure the Single Web Data Stream
1. Under **Data collection and modification**, click **Data Streams** > **Web**.
2. **Website URL:** `https://www.pybim.com` (primary host).
3. **Stream name:** `pyBIM Production Web`.
4. **Measurement ID:** `G-BHR1F0E342`.
5. **Enhanced Measurement Configuration (CRITICAL):**
   - Click the gear icon to customize Enhanced Measurement.
   - Expand the **Page views** section.
   - Click **Show advanced settings**.
   - **Uncheck** "Page changes based on browser history events".
   - *Why this is essential:* pyBIM's `GoogleAnalytics` component manually dispatches deterministic `page_view` events for Next.js App Router client-side navigation. If history-change tracking remains checked in GA4, Enhanced Measurement will fire a second, duplicate `page_view` on every client-side page navigation!
6. Click **Save**.
7. Note: Do NOT install or inject Google Tag Manager (GTM) alongside this direct `gtag.js` implementation without deliberate architectural redesign. Having both GTM and direct `gtag.js` will cause duplicate event tracking and consent race conditions.

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

> [!IMPORTANT]
> **Understanding Cross-Domain Continuity:**
> - Analytics cookies (`_ga`) and user consent preferences (`cookie_consent` in `localStorage`) are strictly domain-specific. An Italian user accepting cookies on `pybim.it` will see the consent banner again if they visit `pybim.com`.
> - The language preference bridge (`?lang_pref=...`) transfers user language choices between domains without passing Google Analytics client IDs or user tracking tokens.
> - GA4's cross-domain linking ensures that when users navigate from `.com` to `.it` (or vice versa), Google Tag links the sessions via an ephemeral `_gl` URL parameter while respecting each domain's separate consent state.
> - Using one GA4 property for both domains does not by itself guarantee cross-domain visitor identity continuity if the user's consent status differs between domains or if navigation is programmatic.

---

## 4. Build-Time Environment Variable Configuration

> [!CAUTION]
> `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is a **Next.js build-time public environment variable**.
> Because Next.js inlines `NEXT_PUBLIC_*` variables into client-side JavaScript bundles during compilation, the ID **must be set in the build environment before running `npm run build` or `npm run build:worker`**.
> Adding it solely as a runtime Cloudflare Worker variable after compilation will NOT activate the compiled browser bundles.

### Critical Distinction: Build-Time vs Runtime Variables
- **Workers Builds Build Variables:** Used by the Cloudflare build container while compiling Next.js and bundling static browser chunks. This is where `NEXT_PUBLIC_GA4_MEASUREMENT_ID` **must** be defined so the Measurement ID is inlined into client JavaScript.
- **Worker Runtime Variables:** Set under Worker runtime settings or `wrangler.jsonc`. These are available only at request execution time inside the Worker runtime and **cannot** retroactively inject values into already-compiled client static assets.

When ready to activate analytics for production:
1. In Cloudflare Dashboard navigate to:
   `Workers & Pages` → `pybim` → `Settings` → `Build` → `Build Variables and Secrets`
2. Add a new Build Variable:
   - **Variable name:** `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - **Value:** `G-BHR1F0E342`
3. Trigger a production build and deployment from `main`.

---

## 5. Post-Deployment Consent & Verification Checklist

Once deployed to production with the build variable set:

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
     - `page_path`: e.g. `/en/services` (zero query parameters attached)
4. **Private-Route Navigation Test:**
   - Navigate to `/en/login` or `/en/portal/dashboard`.
   - Verify that `window['ga-disable-G-XXXX'] === true`.
   - Verify that **no** `page_view` or custom events are fired while on private routes.
5. **Consent Revocation Test:**
   - Reopen Cookie Preferences from the footer, uncheck Analytics, and save.
   - Verify `window['ga-disable-G-XXXX'] === true` and `_ga*` cookies are expired and removed from the browser.
6. **Form Submission Test:**
   - Submit an inquiry via the Contact form.
   - Verify only a generic `contact_form_submit` event is sent with `service_id`. Confirm no email, name, phone, or message body data is attached.

---

## 6. Reporting Dimensions in GA4

Once data collection begins, you can filter and segment reports by:

- **Hostname:** `www.pybim.com` vs `www.pybim.it` to analyze domain performance.
- **Custom Dimension / Parameter (`locale`):** Compare user journeys across `en`, `it`, and `de`.
- **Country:** Geographic reports to observe regional adoption in Italy, Germany, Austria, and worldwide.
