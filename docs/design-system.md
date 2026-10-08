# pyBIM Global Design System

This document serves as the single source of truth for design tokens, typography, semantic colors, brand identity, layout systems, and component styling conventions across the **pyBIM** digital platform.

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
Machine-readable references must remain intact and are exempt from display casing rules:
- URLs and domains: `https://pybim.com`, `pybim.it`
- Email addresses: `info@pybim.com`, `careers@pybim.com`
- Repository and code paths: `c:\bim`, `GeekOfProgramming/pyBIM`
- Internal code identifiers, cookies, localStorage keys: `pybim_theme`, `pybim_token`
- Package names and CLI commands

---

## 2. Premium Visual Language & Art Direction

The pyBIM design philosophy communicates:
**Engineering Precision × Modern Software × Enterprise Credibility**

### Visual Qualities
- **Clean & Precise:** Architectural grid foundations, fine hairline borders (`border-brand-border/60`), subtle depth.
- **Controlled Palette:** Calibrated brand blue (`#2563EB` / `#3B82F6`), high-contrast dark mode slate neutrals, semantic status accents.
- **Design Restraint:** Avoid gratuitous AI startup neon glows, excessive glassmorphism, or decorative clutter. Every visual element must serve communication, navigation, or engineering hierarchy.
- **Technical Illustrations:** Use structured workflow HUDs, schematic diagrams, and terminal nodes to communicate real engineering methodology rather than generic marketing stock imagery.

---

## 3. Font Families

The platform standardizes on **exactly two font families** loaded natively via `next/font/google` in `app/[locale]/layout.js`:

| Font Family | Variable | Tailwind Class | Primary Role |
| :--- | :--- | :--- | :--- |
| **Inter** | `--font-inter` | `font-sans` | All headings, body copy, descriptions, buttons, forms, navigation, and general UI across EN, IT, and DE locales. |
| **JetBrains Mono** | `--font-jetbrains-mono` | `font-mono` | Technical badges, engineering identifiers, code strings, process flow steps, and schematic diagram labels. |

### Font Weights
- `font-normal` (400): Standard body copy and secondary descriptions.
- `font-medium` (500): UI buttons, list items, card descriptions, lead text.
- `font-semibold` (600): Interactive action labels, card subheadings, technical tags.
- `font-bold` (700): Section headings (`H2`), card titles (`H3`), primary buttons.
- `font-extrabold` (800): Major Display titles, hero headlines.

---

## 4. Typography Scale Tokens

All font sizes, line heights, and letter-spacings are governed by centralized Tailwind `fontSize` tokens:

| Token | Size | Line Height | Tracking | Semantic Role / Usage |
| :--- | :--- | :--- | :--- | :--- |
| `text-display` | `3.5rem` (56px) | `4rem` (64px) | `-0.025em` | Main Hero headline (`H1`) on desktop. |
| `text-section` | `2.5rem` (40px) | `3rem` (48px) | `-0.02em` | Primary Section title (`H2`) on desktop (`lg+`). |
| `text-section-sm` | `2rem` (32px) | `2.5rem` (40px) | `-0.015em` | Section title on tablet/mobile, or sub-section banner headings. |
| `text-card-title` | `1.5rem` (24px) | `2rem` (32px) | `-0.01em` | Major capability card / phase card heading (`H3`). |
| `text-lead` | `1.125rem` (18px) | `1.75rem` (28px) | `-0.005em` | Section introductory lead paragraphs. |
| `text-body` | `1rem` (16px) | `1.625rem` (26px) | `normal` | Standard descriptive paragraphs and card body copy. |
| `text-body-sm` | `0.875rem` (14px) | `1.375rem` (22px) | `normal` | Secondary card copy, feature bullet items, micro-descriptions. |
| `text-caption` | `0.75rem` (12px) | `1.125rem` (18px) | `0.04em` | Section eyebrows, button text, badges, status pills. |
| `text-technical` | `0.6875rem` (11px)| `1rem` (16px) | `0.025em` | Technical diagram labels, schema nodes, mono identifiers (minimum legible size). |

> [!IMPORTANT]
> **No Micro-Text Below 11px:** Arbitrary pixel classes such as `text-[8px]`, `text-[9px]`, and `text-[10px]` are prohibited. Use `text-technical` (11px) or `text-caption` (12px) with `font-mono`.
> **No Text Truncation on Meaningful Outputs:** Avoid `truncate` on technical deliverables, schema properties, or German/Italian localized labels. Allow text to wrap cleanly.

---

## 5. Grid, Alignment & Spacing System

### Shared Container
All page content aligns to the universal container:
`max-w-7xl mx-auto px-6 lg:px-8`

### Section-to-Section Rhythm
- **Desktop (`lg` / `xl`):** `py-20 md:py-24 lg:py-28` (approx 88–112px padding).
- **Tablet (`md`):** `py-16 md:py-20` (approx 64–80px padding).
- **Mobile:** `py-12 md:py-16` (approx 48–64px padding).
- Compact CTA banners adjust vertical padding down to maintain visual density.

### Equal-Height vs Content-Driven Heights
- **Comparison Grids (e.g. Section 02 Roadmap):** Use CSS `subgrid` across rows (`md:grid-rows-subgrid md:row-span-8`) so phase numbers, titles, descriptions, and CTA footers align across identical baselines.
- **Asymmetrical / Editorial Panels (e.g. Section 08 Engagement Pathways, Section 06 Outcomes Rail):** Use content-driven height (`flex flex-col`) with `mt-auto` anchoring bottom elements, eliminating unnatural blank space caused by forced stretching or unbounded `justify-between`.

---

## 6. Shared CTA & Interaction System

All interactive navigation buttons use the standardized component:
`components/ui/cta-link.js`

### CTA Specifications

| Property | Primary Variant | Secondary Variant | Tertiary Variant |
| :--- | :--- | :--- | :--- |
| **Visual Role** | Main section action / Available Now | Alternate action / In Development | Inline text navigation |
| **Background** | `bg-brand-primary hover:bg-brand-primary/90` | `bg-brand-surface hover:bg-brand-card` | Transparent / None |
| **Border** | None | `border border-brand-border hover:border-brand-primary/40` | None |
| **Text Color** | `text-white` | `text-brand-textPrimary hover:text-brand-primary` | `text-brand-primary hover:underline` |
| **Typography** | `text-caption font-bold uppercase tracking-wider` | `text-caption font-bold uppercase tracking-wider` | `text-body-sm font-semibold` |
| **Geometry** | `rounded-full` | `rounded-full` | None |
| **Touch Target** | `min-h-[48px] sm:min-h-[52px]` | `min-h-[48px] sm:min-h-[52px]` | Inline height |
| **Padding** | `px-6 sm:px-7 py-3 sm:py-3.5` | `px-6 sm:px-7 py-3 sm:py-3.5` | `p-0` |
| **Icon** | `ArrowRight` (16px, `group-hover:translate-x-1`) | `ArrowRight` (16px, `group-hover:translate-x-1`) | Inline chevron |
| **Shadow** | `shadow-md shadow-brand-primary/20` | `shadow-sm` | None |
| **Focus** | Visible outline ring `focus-visible:ring-2 focus-visible:ring-brand-primary` | Visible outline ring `focus-visible:ring-2 focus-visible:ring-brand-primary` | Standard browser focus ring |

---

## 7. Usability Heuristics & UX Rules

1. **Fitts's Law:** All primary and secondary interactive targets guarantee a minimum touch height of `48px` (`min-h-[48px] sm:min-h-[52px]`) with balanced horizontal padding for effortless mobile tapping and desktop clicking.
2. **Hick's Law:** Avoid competing primary actions within the same zone. Each section presents one distinct primary action; secondary exploratory actions are visually subordinate.
3. **Jakob's Law:** Standard links are used for page and hash transitions (`LocalizedLink`); buttons are reserved for state-changing forms and interactions. Navigation never mimics fake completed actions.
4. **Von Restorff Effect:** Strategic prominence distinguishes available services ("Available Now" with blue CTA fill and emerald indicator) from in-development roadmap items (neutral secondary styling).
5. **Progressive Disclosure:** Complex architecture diagrams provide readable high-level layers with structured annotations, allowing technical stakeholders to inspect details without cluttering core messaging.

---

## 8. Semantic Color System

The platform uses RGB CSS variables defined in `app/globals.css` with dark mode support via the `.dark` class:

| Semantic Token | Tailwind Class | Light Mode (RGB / Hex) | Dark Mode (RGB / Hex) | Role / Usage |
| :--- | :--- | :--- | :--- | :--- |
| `base` | `bg-brand-base` | `255 255 255` (#FFFFFF) | `8 12 20` (#080C14) | Page background, alternating section foundation. |
| `surface` | `bg-brand-surface` | `241 245 249` (#F1F5F9) | `15 23 42` (#0F172A) | Alternating section background, secondary containers. |
| `surfaceHover` | `hover:bg-brand-surfaceHover` | `226 232 240` (#E2E8F0) | `30 41 59` (#1E293B) | Hover state for surface modules. |
| `card` | `bg-brand-card` | `255 255 255` (#FFFFFF) | `15 23 42` (#0F172A) | Elevated capability panels, cards, dialogs. |
| `primary` | `text-brand-primary` / `bg-brand-primary` | `37 99 235` (#2563EB) | `59 130 246` (#3B82F6) | Primary brand blue, key actions, icons, active borders. |
| `primaryHover` | `hover:bg-brand-primaryHover` | `29 78 216` (#1D4ED8) | `96 165 250` (#60A5FA) | Primary button hover state. |
| `accent` | `bg-brand-accent` | `249 115 22` (#F97316) | `249 115 22` (#F97316) | Intentional warm accents (e.g., Client Portal CTA). |
| `textPrimary` | `text-brand-textPrimary` | `15 23 42` (#0F172A) | `248 250 252` (#F8FAFC) | Primary headings, titles, high-emphasis copy. |
| `textSecondary` | `text-brand-textSecondary` | `71 85 105` (#475569) | `148 163 184` (#94A3B8) | Paragraph descriptions, subtitles, supporting metadata. |
| `border` | `border-brand-border` | `226 232 240` (#E2E8F0) | `30 41 59` (#1E293B) | Subtle card borders, dividers, bounding tracks. |

---

## 9. Accessibility & Motion Guidelines

1. **Contrast Compliance:** All text styles conform to WCAG AA contrast standards (minimum 4.5:1 for regular text, 3:1 for large display titles).
2. **Motion Preference:** Always use Framer Motion's `useReducedMotion()` hook. When `prefers-reduced-motion` is active:
   - Disable continuous loops and pulse indicators.
   - Set transform animations to static offsets (`y: 0`).
   - Retain pure opacity transitions or immediate renders.
3. **Semantic Hierarchy:** Exactly one `H1` per page, section headings strictly use `H2`, and card titles use `H3`.
4. **Localization Resilience:** All layouts accommodate length variations across English, Italian, and German without overflowing or clipping.
