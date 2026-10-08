# pyBIM Global Design System

This document serves as the single source of truth for design tokens, typography, semantic colors, and component styling conventions across the **pyBIM** digital platform.

---

## 1. Font Families

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

## 2. Typography Scale Tokens

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

---

## 3. Responsive Typography Mapping

To maintain balanced visual hierarchy across all devices, follow this responsive role pattern:

```html
<!-- Hero Headline -->
<h1 className="text-section-sm sm:text-section lg:text-display font-extrabold tracking-tight text-brand-textPrimary">
  ...
</h1>

<!-- Section Heading -->
<h2 className="text-section-sm lg:text-section font-extrabold tracking-tight text-brand-textPrimary">
  ...
</h2>

<!-- Section Subtitle / Lead Paragraph -->
<p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed">
  ...
</p>

<!-- Card Heading -->
<h3 className="text-lg lg:text-card-title font-bold text-brand-textPrimary tracking-tight">
  ...
</h3>

<!-- Technical Diagram Tag / Node -->
<span className="text-technical font-mono font-medium text-brand-textSecondary">
  ...
</span>
```

---

## 4. Semantic Color System

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

## 5. Component Styling Patterns

### Section Eyebrow
```html
<div className="flex items-center gap-3 mb-4">
  <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
  <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
    SECTION TAG
  </span>
</div>
```

### Primary Action Button
```html
<Link
  href="/contact"
  className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primaryHover text-white px-7 py-3.5 rounded-full text-caption font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-brand-primary/20"
>
  Button Text
</Link>
```

### Secondary Outline Button
```html
<Link
  href="/contact"
  className="inline-flex items-center justify-center bg-brand-card hover:bg-brand-surface border border-brand-border hover:border-brand-primary/40 text-brand-textPrimary px-7 py-3.5 rounded-full text-caption font-bold uppercase tracking-widest transition-all duration-300"
>
  Secondary Action
</Link>
```

### Technical Badge / Identifier
```html
<span className="text-technical font-mono font-semibold px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary">
  IFC4_VALIDATION // SPEC
</span>
```

---

## 6. Accessibility & Motion Guidelines

1. **Contrast Compliance:** All text styles conform to WCAG AA contrast standards (minimum 4.5:1 for regular text, 3:1 for large display titles).
2. **Motion Preference:** Always use Framer Motion's `useReducedMotion()` hook. When `prefers-reduced-motion` is active:
   - Disable continuous loops and pulse indicators.
   - Set transform animations to static offsets (`y: 0`).
   - Retain pure opacity transitions or immediate renders.
3. **Semantic Hierarchy:** One `H1` per page, section headings strictly use `H2`, and card titles use `H3`.
4. **No Text Truncation for Essential Deliverables:** Avoid `truncate` or `ellipsis` on meaningful outputs, scope statements, and technical descriptions. Allow text to wrap naturally.
