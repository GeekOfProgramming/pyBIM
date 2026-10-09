# pyBIM Global Design System v2: Engineering Precision

This document serves as the official specification for design tokens, typography, semantic colors, accessible contrast, section rhythm, component geometry, and motion guidelines across the **pyBIM** digital platform.

---

## 1. Brand Identity & Visible Casing

### Official Visible Spelling
The brand name must always appear in customer-facing UI and prose exactly as:

**`pyBIM`**

- **Correct:** `pyBIM`, `pyBIM Cloud Connect`, `pyBIM Engineering`, `pyBIM Education & Training`
- **Incorrect:** `PYBIM`, `PyBIM`, `Pybim`, `pybim`

### CSS Uppercase Exception
When parent badges or headers use Tailwind's `uppercase` utility, text can inadvertently transform `pyBIM` into `PYBIM`. 
- **Rule:** Isolate the brand name into a nested span with `normal-case`, e.g.:
  ```html
  <span className="uppercase tracking-widest">
    THE <span className="normal-case">pyBIM</span> TECH STACK
  </span>
  ```

### Machine Identifiers & Technical Preservations
Machine-readable references remain intact and are exempt from display casing rules:
- URLs and domains: `https://pybim.com`, `pybim.it`
- Repository and code paths: `c:\bim`, `GeekOfProgramming/pyBIM`
- Internal code identifiers, cookies, localStorage keys: `pybim_theme`, `pybim_token`

---

## 2. Visual Language & Art Direction

The pyBIM Design System v2 communicates:
**Engineering Precision × Architectural Clarity × Modern Software × Enterprise Credibility**

### Core Principles
- **Dual Aesthetic:**
  - **Dark (Engineering):** High technology, data processing, 3D modeling, deep precision.
  - **Light (Architectural):** Technical documentation, clarity, structural transparency, corporate trust.
- **Three Coordinated Brand Accents:**
  - **Primary Blue (`#2563EB`):** Interactive actions, main CTA fills, selected states, authoritative focal points.
  - **Technical Cyan (`#22D3EE`):** BIM schemas, architectural graphs, Revit API connectors, non-text data visualization.
  - **Brand Orange (`#F97316`):** Client Portal identity, high-priority visual alert (never overused across engineering diagrams).
- **Design Restraint:** Avoid generic marketing stock imagery, fake live terminal outputs, or decorative neon noise. Every graphic element represents real engineering methodology.

---

## 3. Font Families

The platform standardizes on **exactly two font families** loaded natively via `next/font/google` in `app/[locale]/layout.js`:

| Font Family | Variable | Tailwind Class | Primary Role |
| :--- | :--- | :--- | :--- |
| **Inter** | `--font-inter` | `font-sans` | Headings, body copy, descriptions, buttons, forms, navigation, and commercial UI across EN, IT, and DE locales. |
| **JetBrains Mono** | `--font-jetbrains-mono` | `font-mono` | Technical badges, engineering identifiers, code strings, process flow steps, and schematic diagram labels. |

---

## 4. Responsive Typography Scale Tokens

All font sizes, line heights, and letter-spacings are governed by centralized Tailwind tokens:

| Token | Mobile Target | Desktop Target | Line Height | Tracking | Semantic Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `text-display` | `36–40px` | `56–64px` | `1.1–1.15` | `-0.025em` | Main Hero headline (`H1`). |
| `text-section` | `28–32px` | `40–44px` | `1.2` | `-0.02em` | Major Section title (`H2`). |
| `text-section-sm` | `24px` | `32px` | `1.25` | `-0.015em` | Tablet section title, sub-section banner headings. |
| `text-card-title` | `18–20px` | `22–24px` | `1.3` | `-0.01em` | Capability card / phase card heading (`H3`). |
| `text-lead` | `17–18px` | `18–20px` | `1.55` | `-0.005em` | Section introductory lead paragraphs. |
| `text-body` | `16px` | `16px` | `1.625` | `normal` | Standard descriptive paragraphs and card copy. |
| `text-body-sm` | `14px` | `14px` | `1.4` | `normal` | Secondary card copy, feature bullet items. |
| `text-caption` | `12–13px` | `12–13px` | `1.3` | `0.04em` | Section eyebrows, button text, badges, status pills. |
| `text-technical` | `11–12px` | `12–13px` | `1.4` | `0.025em` | Technical diagram labels, schema nodes, mono identifiers. |

> [!IMPORTANT]
> **No Micro-Text Below 11px:** Arbitrary pixel classes such as `text-[8px]`, `text-[9px]`, and `text-[10px]` are prohibited.
> **No Text Truncation on Meaningful Outputs:** Avoid `truncate` or `line-clamp` on essential engineering outputs. Allow German and Italian headings to wrap naturally.

---

## 5. Semantic Color System & Dark Mode

All colors use space-separated RGB CSS variables defined in `app/globals.css`:

| Semantic Token | Tailwind Class | Light Mode (Hex / RGB) | Dark Mode (Hex / RGB) | Role / Usage |
| :--- | :--- | :--- | :--- | :--- |
| `base` | `bg-brand-base` | `#FFFFFF` (`255 255 255`) | `#080C14` (`8 12 20`) | Canvas background, Family A base foundation. |
| `surface` | `bg-brand-surface` | `#F1F5F9` (`241 245 249`) | `#0F172A` (`15 23 42`) | Family B surface foundation, secondary containers. |
| `surfaceHover` | `hover:bg-brand-surfaceHover` | `#E2E8F0` (`226 232 240`) | `#1E293B` (`30 41 59`) | Hover state for surface cards and list items. |
| `card` | `bg-brand-card` | `#FFFFFF` (`255 255 255`) | `#0F172A` (`15 23 42`) | Standard card surface. |
| `cardElevated` | `bg-brand-cardElevated` | `#FFFFFF` (`255 255 255`) | `#152237` (`21 34 55`) | **Approved Dark Elevated Card** (provides tonal lift without heavy drop shadows). |
| `primary` | `text-brand-primary` | `#2563EB` (`37 99 235`) | `#3B82F6` (`59 130 246`) | Brand blue for icons, linework, and borders. |
| `primaryHover`| `hover:bg-brand-primaryHover`| `#1D4ED8` (`29 78 216`) | `#60A5FA` (`96 165 250`) | Hover state for secondary blue highlights. |
| `actionPrimary` | `bg-brand-actionPrimary` | `#2563EB` (`37 99 235`) | `#2563EB` (`37 99 235`) | **Accessible Action Fill** (guarantees WCAG AA 5.17:1 on white text in both themes). |
| `actionPrimaryHover` | `hover:bg-brand-actionPrimaryHover` | `#1D4ED8` (`29 78 216`) | `#1D4ED8` (`29 78 216`) | Action button hover fill. |
| `actionOnPrimary` | `text-brand-actionOnPrimary` | `#FFFFFF` (`255 255 255`) | `#FFFFFF` (`255 255 255`) | Action button foreground label. |
| `accentAction`| `bg-brand-accentAction` | `#F97316` (`249 115 22`) | `#F97316` (`249 115 22`) | Client Portal Action Orange. |
| `accentOnAction` | `text-brand-accentOnAction` | `#0F172A` (`15 23 42`) | `#0F172A` (`15 23 42`) | **Accessible Dark Navy Label on Orange** (WCAG AA > 7.5:1 contrast). |
| `textPrimary` | `text-brand-textPrimary` | `#0F172A` (`15 23 42`) | `#F8FAFC` (`248 250 252`) | Primary headings, high-emphasis copy. |
| `textSecondary`| `text-brand-textSecondary` | `#475569` (`71 85 105`) | `#94A3B8` (`148 163 184`) | Descriptive paragraphs, subtitles, metadata. |
| `border` | `border-brand-border` | `#E2E8F0` (`226 232 240`) | `#1E293B` (`30 41 59`) | Subtle hairline borders (`border-brand-border/80`). |

---

## 6. Accessible Action Color System (WCAG AA Compliance)

Ordinary text requires minimum **4.5:1** contrast ratio; large text requires **3:1**.

### Contrast Audit Matrix
| Visual Combination | Contrast Ratio | WCAG AA Status | Design System v2 Treatment |
| :--- | :--- | :--- | :--- |
| White on `#2563EB` (Primary Blue) | **5.17:1** | Pass | **Approved** for `CtaLink` primary in both Light and Dark modes. |
| White on `#3B82F6` (Electric Blue) | **3.68:1** | Fail | Disallowed for white text. Used only for icons and linework. |
| White on `#F97316` (Laser Orange) | **2.80:1** | Fail | Disallowed for white button text. |
| Dark Navy (`#0F172A`) on `#F97316` | **7.54:1** | Pass (AAA) | **Approved** for Client Portal button label and badge. |

---

## 7. Section Rhythm System (A/B Alternation)

Major content chapters must alternate backgrounds to reduce visual fatigue and communicate narrative progression:

### Family A — BASE / Architectural (`bg-brand-base`)
- Light: `#FFFFFF` / Dark: `#080C14`
- Reusable helper: `<EngineeringBackdrop variant="base" />`
- Visual motif: Clean architectural space, soft central illumination, masked geometric linework in negative space.
- Zero vertical dashed content boundary lines (`border-l border-dashed` prohibited).

### Family B — SURFACE / Technical (`bg-brand-surface`)
- Light: `#F1F5F9` / Dark: `#0F172A`
- Reusable helper: `<EngineeringBackdrop variant="surface" />`
- Visual motif: Technical-paper atmosphere, quiet non-repeating drafting geometry, restrained ambient glow.
- Zero dense repeating crosshairs, zero fake content bounding frames.

### Page Allocation Matrix
| Route | Section | Title | Family |
| :--- | :--- | :--- | :--- |
| **Services** | S01 | Hero & Overview | **A (Base)** |
| | S02 | Execution Roadmap | **B (Surface)** |
| | S03 | Early Access Banner | **A (Base)** |
| | S04 | Engineering Capabilities (Workbench) | **B (Surface)** |
| | S05 | Engineering Delivery Process | **A (Base)** |
| | S06 | Engineering Outcomes | **B (Surface)** |
| **Education** | Hero | Engineering Knowledge | **A (Base)** |
| | Areas | Practical Learning & Guidance | **A (Base)** |
| **Success Stories** | 01 | Success Stories Hero | **A (Base)** |
| | 02 | Completed Projects | **B (Surface)** |
| | 03 | AI & LLM Development | **A (Base)** |
| | 04 | Active Research Workstreams | **A (Base)** *(nested within AI/LLM)* |
| | 05 | Client Testimonials | **B (Surface)** |

---

## 8. Geometry & Spacing Standards

- **Spacing Rhythm:** 4px grid.
- **Universal Container:** `max-w-7xl mx-auto px-6 lg:px-8` (~1280px).
- **Section Padding:**
  - Desktop: `py-20 md:py-24 lg:py-28` (88–112px).
  - Mobile: `py-12 md:py-16` (48–64px).
- **Card Geometry:**
  - Main Cards: `rounded-2xl lg:rounded-3xl` (16–24px).
  - Technical Inset Panels: `rounded-xl lg:rounded-2xl` (12–16px).
  - Padding: `p-6 sm:p-8 lg:p-10`.
- **Button Geometry:**
  - Main Action CTAs: `rounded-full`, min height `48px` (`min-h-[48px] sm:min-h-[52px]`).
  - Small Controls / Pills: `rounded-lg` or `rounded-full`, min height `36px`.
- **Card Nesting Hierarchy:**
  1. Section Surface (`base` or `surface`).
  2. Main Content Card (`cardElevated` or `card` with `border-brand-border/80`).
  3. Supporting Technical HUD (inset with `bg-brand-surface` or `bg-slate-950/60`).
  *(Never use 3+ nested bordered boxes).*

---

## 9. Motion Standards & Accessibility

Framer Motion is the official animation library.

### Motion Tiers
- **Tier 1 (Micro Interactions):** `150–220ms` (buttons, tabs, hover states, toggles).
- **Tier 2 (Component Entrances & SVGs):** `350–900ms` (pathLength drawing, progress bars, workflow nodes).
- **Tier 3 (Section Reveals):** `450–700ms` (editorial text fade-ins, viewport triggers with `viewport={{ once: true }}`).

### Reduced Motion Rules
Always integrate `useReducedMotion()`. When true:
- Set `scale` and `y` offsets to 0 immediately.
- Draw SVG paths with `pathLength: 1` instantly.
- Retain instantaneous opacity transitions (`duration: 0`).
- Prohibit infinite looping pulses or simulated scanlines.
