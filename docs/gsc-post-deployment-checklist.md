# pyBIM — Google Search Console Post-Deployment Technical Checklist

**Document Version:** 1.0.0  
**Phase:** PRELAUNCH-SEO-01  
**Target Environments:**
- Property 1: `https://www.pybim.com` (Domain / URL-prefix Property)
- Property 2: `https://www.pybim.it` (Domain / URL-prefix Property)

---

## 1. Prerequisites (Post-Deployment Verification)

> [!IMPORTANT]
> Do NOT perform these actions until the `feature/seo-multidomain-locales-v1` branch has been officially merged into `main` and successfully deployed to Cloudflare Workers via Cloudflare Builds.
> Both production properties are verified in Google Search Console.

Verify via command-line HTTP requests (`curl -I`) before opening Search Console:
1. `https://www.pybim.com/sitemap.xml` responds with HTTP 200 and XML containing exactly 16 URLs.
2. `https://www.pybim.it/sitemap.xml` responds with HTTP 200 and XML containing exactly 8 URLs.
3. `https://www.pybim.com/robots.txt` points to `Sitemap: https://www.pybim.com/sitemap.xml`.
4. `https://www.pybim.it/robots.txt` points to `Sitemap: https://www.pybim.it/sitemap.xml`.

---

## 2. Sitemap Submission Protocol

### A. `pybim.com` Search Console Property
1. Navigate to **Sitemaps** under the Indexing section in Google Search Console.
2. Under "Add a new sitemap", enter:
   `sitemap.xml` (Full path: `https://www.pybim.com/sitemap.xml`).
3. Click **Submit**.
4. Confirm "Sitemap submitted successfully".
5. Status should show **Success** with **Discovered pages: 16** (8 English routes and 8 German routes).
6. Note: Any legacy sitemap references previously pointing to apex `pybim.com` should be reviewed or left superseded by the `www` sitemap.

### B. `pybim.it` Search Console Property
1. Switch to the `pybim.it` property.
2. Navigate to **Sitemaps**.
3. Under "Add a new sitemap", enter:
   `sitemap.xml` (Full path: `https://www.pybim.it/sitemap.xml`).
4. Click **Submit**.
5. Confirm "Sitemap submitted successfully".
6. Status should show **Success** with **Discovered pages: 8** (8 Italian routes).
7. Note: The historical issue where `.it` reported `.com` URLs in its sitemap is resolved; only `https://www.pybim.it/it/...` canonical URLs are present.

---

## 3. URL Inspection & Indexing Requests

Inspect the following key landing pages using the **URL Inspection** tool:

### Priority Inspection Targets:
- `https://www.pybim.com/en` (English Homepage)
- `https://www.pybim.com/en/services` (English Services)
- `https://www.pybim.it/it` (Italian Homepage)
- `https://www.pybim.it/it/services` (Italian Services)
- `https://www.pybim.com/de` (German Homepage)

### Checklist for each inspected URL:
1. Click **Test Live URL**.
2. **HTTP Response:** Verify `URL is available to Google` (HTTP 200).
3. **User-declared Canonical:** Verify it matches the exact requested URL (e.g. `https://www.pybim.it/it`).
4. **Google-selected Canonical:** Confirm Google accepts the user-declared canonical (allow up to 24–72 hours for index alignment).
5. **Request Indexing:** Click "Request Indexing" for the top 3 entry pages (`/en`, `/it`, `/de`).

---

## 4. Hreflang Validation & Multi-Domain Association

1. Under URL Inspection for `https://www.pybim.com/en`:
   - Inspect the **Page fetch** or HTML source.
   - Verify reciprocal alternates detected:
     - `en` → `https://www.pybim.com/en`
     - `it` → `https://www.pybim.it/it`
     - `de` → `https://www.pybim.com/de`
     - `x-default` → `https://www.pybim.com/en`
2. Check the GSC **International Targeting** or Page Indexing report for any "Hreflang without return tag" warnings. (Model B architecture guarantees exact 1-to-1 reciprocity across both domains).

---

## 5. Verification of Legacy & Soft-404 Removals

Audit Google's indexing report for historical URLs:

| Historical / Legacy URL | Expected Server Code | Expected GSC Status |
| :--- | :---: | :--- |
| `https://www.pybim.com/en/pricing` | HTTP 404 | Not found (404) |
| `https://www.pybim.com/en/blog/revit-api-python` | HTTP 404 | Not found (404) |
| `https://www.pybim.com/en/education/iso-certification` | HTTP 404 | Not found (404) |
| `https://www.pybim.com/en/projects/example-invalid-project` | HTTP 404 | Not found (404) |

1. Inspect `https://www.pybim.com/en/pricing` in URL Inspection.
2. Verify **URL is not on Google** with reason `Not found (404)`.
3. If Google previously marked these as "Soft 404", click **Validate Fix** in the Page Indexing report to confirm the true HTTP 404 status.
4. Do NOT submit manual removal requests for normal 404s; standard GSC natural de-indexing through 404 signals is the recommended and cleanest path.

---

## 6. Search Performance & Geographic Monitoring

### A. Branded Search Verification (`pybim` / `pyBIM`)
- Monitor Performance reports on both properties for queries: `pybim`, `py bim`, `pybim srl`, `pybim revit`.
- Verify brand queries correctly display official metadata and snippets matching `lib/site-copy.js`.

### B. Italy Search Performance Comparison (`.com` vs `.it`)
- Filter GSC Performance Report: Country = `Italy`.
- On `pybim.com`: Italian impressions/clicks should smoothly migrate to `pybim.it`.
- On `pybim.it`: Italian impressions/clicks should grow as Google recognizes the ccTLD and local entity relevance.
- Confirm there is no domain cannibalization or duplicate indexing.

### C. Germany / Austria Search Performance
- Filter GSC Performance Report on `pybim.com`: Country = `Germany` and `Austria`.
- Confirm impressions land on `https://www.pybim.com/de/...` rather than `/en/...`.

---

## 7. Search Feature Observations (Sitelinks & AI Overviews)

> [!NOTE]
> Google Sitelinks, Knowledge Panels, and AI Overviews are algorithmic presentations determined dynamically by Google search algorithms. They cannot be directly forced, configured, or guaranteed through code.

1. **Crawlable Navigation Baseline:**
   The crawlable header navigation in `components/layout/header.js` provides visible HTML anchors (`<a>`) for Services, About, Careers, and Contact to support sitelinks generation.
2. **Monitoring Protocol:**
   - Periodically search `pybim` on Google Search from diverse geolocations (or via search parameters `&gl=it`, `&gl=us`, `&gl=de`).
   - Observe if Google surfaces 2 to 6 sitelinks below the primary homepage result.
   - Observe entity summary or AI Overview grounding to confirm it cites official brand pillars ("BIM Modeling", "BIM Automation & Custom Software", "BIM Management & Technical Coordination", "BIM Information Structure & Data Management") without speculative claims.
