# pyBIM Brand Design Tokens for Email Signatures

This document defines the verified pyBIM corporate design tokens used in the email signature system, extracted directly from the pyBIM web application codebase (`app/globals.css`, `tailwind.config.js`, and `components/layout/header.js`).

---

## 1. Verified Brand Colors

All hex values map directly to the active pyBIM design tokens defined in `app/globals.css`:

| Token | CSS Variable (Dark) | Hex Value | Role in Email Signature |
| :--- | :--- | :--- | :--- |
| **Dark Base** | `--brand-base` (`8 12 20`) | `#080C14` | Left Brand Panel background (Sovereign Deep Dark) |
| **Dark Surface** | `--brand-surface` (`15 23 42`) | `#0F172A` | Right Contact Panel background (Slate 900) |
| **Dark Elevated Card** | `--brand-cardElevated` (`21 34 55`) | `#152237` | Reference card surface token |
| **Dark Border** | `--brand-border` (`30 41 59`) | `#1E293B` | Outer boundary border & internal vertical divider |
| **Primary Accent Blue** | `--brand-primary` (`59 130 246`) | `#3B82F6` | Accent bar / indicator line |
| **High-Contrast Link Blue** | `--brand-primaryHover` (`96 165 250`) | `#60A5FA` | Hyperlinks (email, website, LinkedIn) on dark surface |
| **Primary Ice White Text** | `--brand-textPrimary` (`248 250 252`) | `#F8FAFC` | Primary identity text / Name |
| **Silver Gray Text** | `--brand-textSecondary` (`148 163 184`) | `#94A3B8` | Field labels ("Email:", "Website:", "LinkedIn:") |

---

## 2. Typography Rules

Due to inconsistent font rendering across email clients (Gmail, Outlook 2016+, Apple Mail, Webmail):
- **Web fonts** (`Inter`, `JetBrains Mono`, Google Fonts, `@font-face`) are intentionally avoided in signature HTML.
- **Primary Font Stack**: `Arial, Helvetica, sans-serif`
  - High cross-platform rendering fidelity across all versions of Outlook and Gmail.
- **Secondary Monospace Stack** (for technical details/labels): `'Courier New', Courier, monospace` or clean uppercase `Arial` with letter-spacing.

---

## 3. Dimensional Specification

- **Total Width**: `500px` (within the recommended 480–520px envelope)
- **Left Column (Brand Panel)**:
  - Width: `150px`
  - Background: `#080C14`
  - Padding: `20px 16px`
  - Content: Official white transparent pyBIM logo (`100px` width × `100px` height, 1:1 aspect ratio), vertically and horizontally centered, clickable to the account's website.
- **Divider**:
  - Vertical border: `1px solid #1E293B` with an optional subtle `2px` top accent in `#3B82F6`.
- **Right Column (Contact Panel)**:
  - Width: `350px`
  - Background: `#0F172A`
  - Padding: `20px 22px`
  - Content:
    1. Display Name / Department (`#F8FAFC`, 16px, bold, `Arial`)
    2. pyBIM Brand Subline (`#94A3B8`, 11px, letter-spacing: 0.5px, uppercase, `Arial`)
    3. Spacer / Divider (`1px solid #1E293B` with `8px` margins)
    4. Contact Data Rows (Email, Website, Company LinkedIn, Personal LinkedIn)
       - Label: `#94A3B8` (11px, `Arial`)
       - Value / Link: `#60A5FA` (12px, `Arial`, text-decoration: none)
