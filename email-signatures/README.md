# pyBIM Branded Email Signatures

This directory contains six production-grade, Gmail-compatible HTML email signatures for pyBIM, derived directly from the official pyBIM website design system.

---

## Architecture & Design System

- **Layout**: Two-column horizontal table with strict pixel widths (`500px` total width: `150px` left brand panel, `350px` right contact panel).
- **Brand Colors** (from `app/globals.css`):
  - Left Brand Panel: `#080C14` (Sovereign Deep Dark)
  - Right Contact Panel: `#0F172A` (Slate 900)
  - Primary Identity / Headline: `#F8FAFC` (Ice White)
  - Field Labels: `#94A3B8` (Silver Gray)
  - Accent Indicator: `#3B82F6` (Electric Blue)
  - Hyperlinks: `#60A5FA` (High-contrast blue for dark surfaces)
  - Borders: `#1E293B` (Slate 800)
- **Typography**: `Arial, Helvetica, sans-serif` for bulletproof cross-client rendering in Gmail and Outlook without reliance on web fonts.
- **Logo Integration**: Official white transparent pyBIM logo centered at `100px` width × `100px` height (1:1 aspect ratio), clickable to the account's localized domain.

---

## Directory Structure

```text
email-signatures/
  config.mjs                    # Centralized settings (logo URL, dimensions, colors, fonts)
  generate.mjs                  # Deterministic generator script
  src/
    accounts.mjs                # Six account definitions, labels, and LinkedIn links
    signature-template.mjs      # Bulletproof HTML table template generator
  dist/
    info-com.html               # Signature 01 — info@pybim.com (English)
    info-it.html                # Signature 02 — info@pybim.it (Italian)
    careers-com.html            # Signature 03 — careers@pybim.com (English)
    support-com.html            # Signature 04 — support@pybim.com (English)
    hamed-sharifi-it.html       # Signature 05 — hamed.sharifi@pybim.it (Italian)
    hamid-lotfalian-it.html     # Signature 06 — hamid.lotfalian@pybim.it (Italian)
  preview.html                  # Interactive Dark-Only verification & one-click copy suite
  README.md                     # Installation & architectural documentation
  BRAND-TOKENS.md               # Design tokens reference
```

---

## Six Account Variants

| File | Account | Display Name | Lang | Website | Personal LinkedIn |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `info-com.html` | `info@pybim.com` | `pyBIM` | EN | `https://www.pybim.com` | — |
| `info-it.html` | `info@pybim.it` | `pyBIM` | IT | `https://www.pybim.it` | — |
| `careers-com.html` | `careers@pybim.com` | `pyBIM Careers` | EN | `https://www.pybim.com` | — |
| `support-com.html` | `support@pybim.com` | `pyBIM Support` | EN | `https://www.pybim.com` | — |
| `hamed-sharifi-it.html` | `hamed.sharifi@pybim.it` | `Hamed Sharifi` | IT | `https://www.pybim.it` | `hamedsharifi` |
| `hamid-lotfalian-it.html` | `hamid.lotfalian@pybim.it` | `Hamid Lotfalian` | IT | `https://www.pybim.it` | `hamid-lotfalian` |

### Strict Exclusions Enforced
- No individual job titles or executive positions
- No phone numbers, physical addresses, or VAT numbers
- No confidentiality notices, legal disclaimers, or slogans
- No unverified social links or secondary platforms

---

## Logo Hosting & Verification Status

- **Live Production CDN URL**: `https://www.pybim.com/logo_white_transparent.png`
  - HTTP Status: `200 OK`
  - Content-Type: `image/png`
  - File Size: `56,346 bytes`
  - SHA256: `8a416b239f998aa3...` (100% bitwise identical to `public/images/shared/brand/logo_white_transparent.png`)
  - Publicly accessible over HTTPS without authentication.
- **Future Asset Migration**:
  - The development branch `feature/site-background-system-v1` organizes assets under `public/images/shared/brand/logo_white_transparent.png`.
  - Once this feature branch merges to `main` and deploys to Cloudflare, the CDN will serve both paths.
  - The URL is configured in `email-signatures/config.mjs` (`logoUrl`), allowing a 1-line update if ever migrated.

---

## Gmail Installation Instructions

Follow these exact steps to install your pyBIM signature in Gmail:

1. Open `email-signatures/preview.html` in your web browser (or open the specific `.html` file from `email-signatures/dist/`).
2. Click the **Copy Signature** button next to your account (or highlight and copy the rendered signature box directly from the preview page).
   *Note: Do NOT copy the raw HTML source code; copy the rendered signature.*
3. Open **Gmail** ([mail.google.com](https://mail.google.com)).
4. Click the **Gear icon** in the top right corner &rarr; select **See all settings**.
5. Under the **General** tab, scroll down to the **Signature** section.
6. Click **Create new**, enter a recognizable name (e.g., `pyBIM Corporate`), and click into the signature text area.
7. Paste the copied signature using **Ctrl+V** (Windows) or **Cmd+V** (macOS).
8. Under **Signature defaults**:
   - Set **For new emails use**: your new pyBIM signature.
   - Set **On reply/forward use**: your new pyBIM signature (or leave blank if preferred).
9. Scroll to the very bottom of the page and click **Save Changes**.
10. Click **Compose** to verify that your new signature renders cleanly with the official logo and active links.

### Note on Aliases & Identities
If using multiple sending identities (e.g., `info@pybim.com` and `support@pybim.com`), configure each signature under **Settings &rarr; Accounts and Import &rarr; Send mail as** so Gmail associates the correct signature with each sending alias.

---

## Maintenance & Regeneration

To regenerate all signatures after making edits:

```bash
node email-signatures/generate.mjs
```
