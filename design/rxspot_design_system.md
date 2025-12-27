# The Rx Spot - Master Design System

**Version:** 1.0
**Date:** 2025-12-07
**Purpose:** Comprehensive design system for The Rx Spot website, synthesizing brand guidelines, competitor best practices, and implementation specifications

---

## 1. COLOR SYSTEM

### Primary Color Tokens

```css
/* Deep Navy Blues - Brand Authority */
--color-brand-navy: #1a3d5c;
--color-brand-navy-dark: #003354;
--color-brand-navy-darker: #001a2b;

/* Accent Blues - Action & Interaction */
--color-accent-primary: #004E7C;
--color-accent-bright: #4a9fd8;
--color-accent-cyan: #00d4ff;
--color-accent-cyan-solid: #0099ff;

/* Chrome/Metallic - Premium Elements */
--color-chrome-silver: #a0a0a0;
--color-chrome-blue: #b8d4e8;

/* Neutrals - Backgrounds & Text */
--color-white: #ffffff;
--color-off-white: #f8fafc;
--color-light-gray: #f0f4f8;
--color-light-blue-tint: #f0f7ff;

--color-text-primary: #334155;
--color-text-secondary: #64748b;
--color-text-tertiary: #94a3b8;

--color-border-light: #e2e8f0;
--color-border-medium: #cbd5e1;

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

### Gradient Recipes

#### Gradient 1: Hero Background (Deep Blue Fade)
```css
.gradient-hero {
  background: linear-gradient(135deg, #1a3d5c 0%, #004E7C 50%, #0099ff 100%);
}
```
**Usage:** Hero section overlay backgrounds, premium card headers

#### Gradient 2: Subtle Medical Abstract
```css
.gradient-subtle {
  background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%);
}
```
**Usage:** Light section backgrounds, card surfaces

#### Gradient 3: Radial Glow (Cyan Accent)
```css
.gradient-glow {
  background: radial-gradient(circle at center, rgba(0, 212, 255, 0.2) 0%, transparent 70%);
}
```
**Usage:** Decorative background elements, spotlight effects, button hover glows

#### Gradient 4: Photo Overlay (Dark to Transparent)
```css
.gradient-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%);
}
```
**Usage:** Overlay on hero images to ensure text legibility

---

## 2. TYPOGRAPHY SYSTEM

### Font Families

```css
--font-heading: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale

#### H1 - Hero Headlines
```css
.text-h1 {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 5vw, 4.5rem); /* 48px → 72px */
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-brand-navy);
}
```
**Usage:** Primary hero headline only

#### H2 - Section Headlines
```css
.text-h2 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.5vw, 3rem); /* 32px → 48px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-brand-navy);
}
```
**Usage:** Major section headings

#### H3 - Card/Feature Headlines
```css
.text-h3 {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 2vw, 1.75rem); /* 24px → 28px */
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text-primary);
}
```
**Usage:** Card titles, feature headings, modal titles

#### H4 - Subsection Headings
```css
.text-h4 {
  font-family: var(--font-heading);
  font-size: clamp(1.125rem, 1.5vw, 1.25rem); /* 18px → 20px */
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text-primary);
}
```
**Usage:** FAQ questions, form section headers

#### Body - Paragraph Text
```css
.text-body {
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.2vw, 1.125rem); /* 16px → 18px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-primary);
}
```
**Usage:** Paragraphs, descriptions, list items

#### Small - Captions & Labels
```css
.text-small {
  font-family: var(--font-body);
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
```
**Usage:** Form labels, captions, disclaimers

#### Eyebrow - Overline Labels
```css
.text-eyebrow {
  font-family: var(--font-heading);
  font-size: clamp(0.75rem, 1vw, 0.875rem); /* 12px → 14px */
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-accent-primary);
}
```
**Usage:** Section labels above headlines (e.g., "TRUSTED MEDICAL PARTNER")

#### Button Text
```css
.text-button {
  font-family: var(--font-heading);
  font-size: clamp(0.875rem, 1vw, 1rem); /* 14px → 16px */
  font-weight: 600;
  letter-spacing: 0.02em;
}
```
**Usage:** All button labels

---

## 3. SPACING SCALE

### Modular Scale (4px Base)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Contextual Spacing

#### Section Padding (Vertical)
```css
.section-padding-mobile: var(--space-12); /* 48px */
.section-padding-tablet: var(--space-16); /* 64px */
.section-padding-desktop: var(--space-20); /* 80px */
```

#### Card Internal Padding
```css
.card-padding-small: var(--space-6); /* 24px */
.card-padding-default: var(--space-8); /* 32px */
.card-padding-large: var(--space-12); /* 48px */
```

#### Component Spacing
```css
.heading-margin-bottom: var(--space-6); /* 24px */
.paragraph-margin-bottom: var(--space-4); /* 16px */
.button-padding-y: var(--space-3); /* 12px */
.button-padding-x: var(--space-6); /* 24px */
```

---

## 4. COMPONENT LIBRARY

### 4.1 Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--color-accent-primary);
  color: var(--color-white);
  padding: 12px 24px;
  border-radius: 999px; /* Full pill shape */
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.btn-primary:hover {
  background: var(--color-brand-navy-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 78, 124, 0.15);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--color-accent-primary);
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid var(--color-accent-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--color-accent-primary);
  color: var(--color-white);
  border-color: var(--color-accent-primary);
}
```

#### Ghost/Text Button
```css
.btn-ghost {
  background: transparent;
  color: var(--color-accent-primary);
  padding: 8px 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-ghost:hover {
  color: var(--color-brand-navy-dark);
  text-decoration: underline;
}
```

### 4.2 Cards

#### Default Card
```css
.card {
  background: var(--color-white);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--color-border-light);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04);
}
```

#### Feature Card (with accent bar)
```css
.card-feature {
  /* Inherits from .card */
  position: relative;
  overflow: hidden;
}

.card-feature::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--color-border-light);
  transition: background 0.3s ease;
}

.card-feature:hover::before {
  background: var(--color-accent-primary);
}
```

#### Gateway Card (for three-audience section)
```css
.card-gateway {
  background: var(--color-white);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  border: 2px solid var(--color-border-light);
  transition: all 0.3s ease;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-gateway:hover {
  border-color: var(--color-accent-primary);
  box-shadow: 0 12px 32px rgba(0, 78, 124, 0.12);
}
```

### 4.3 Modals

#### Modal Container
```css
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-container {
  background: var(--color-white);
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  background: var(--color-accent-primary);
  color: var(--color-white);
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0 0;
}

.modal-body {
  padding: 32px;
}
```

### 4.4 Form Elements

#### Text Input
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-border-medium);
  border-radius: 8px;
  background: var(--color-off-white);
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text-primary);
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px rgba(0, 78, 124, 0.1);
  background: var(--color-white);
}
```

#### Checkbox/Radio
```css
.form-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid var(--color-border-medium);
  cursor: pointer;
}

.form-checkbox:checked {
  background: var(--color-accent-primary);
  border-color: var(--color-accent-primary);
}
```

### 4.5 Badges & Tags

#### Status Badge
```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-new {
  background: var(--color-accent-cyan);
  color: var(--color-white);
}

.badge-popular {
  background: var(--color-accent-primary);
  color: var(--color-white);
}

.badge-available {
  background: var(--color-success);
  color: var(--color-white);
}
```

### 4.6 FAQ Accordion

```css
.accordion-item {
  border-bottom: 1px solid var(--color-border-light);
}

.accordion-trigger {
  width: 100%;
  padding: 20px 0;
  background: transparent;
  border: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--color-text-primary);
}

.accordion-content {
  padding-bottom: 20px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.accordion-content[hidden] {
  display: none;
}
```

---

## 5. LAYOUT ARCHETYPES

### 5.1 Hero Layout

```
┌─────────────────────────────────────────┐
│  [Sticky Nav: Logo | CTA Button]        │
├─────────────────────────────────────────┤
│                                         │
│    [Eyebrow Label]                      │
│    ═══════════════                      │
│                                         │
│    ████ HERO HEADLINE ████              │
│    ████ SECOND LINE   ████              │
│                                         │
│    Supporting subheadline text with     │
│    trust signals and key benefits       │
│                                         │
│    [Primary CTA]  [Secondary CTA]       │
│                                         │
│    ↓ Scroll Indicator                   │
│                                         │
└─────────────────────────────────────────┘
```

**Background:** Full-width gradient or photo with overlay
**Max Content Width:** 1280px centered
**Vertical Padding:** 120px top, 80px bottom (desktop)

### 5.2 Three-Audience Gateway

```
┌───────────────────────────────────────────┐
│     Section Headline: "Who We Serve"      │
│                                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │ [Icon]  │  │ [Icon]  │  │ [Icon]  │   │
│  │         │  │         │  │         │   │
│  │Patients │  │  B2B    │  │Business │   │
│  │         │  │Providers│  │  Opps   │   │
│  │  Card   │  │  Card   │  │  Card   │   │
│  │         │  │         │  │         │   │
│  │ [CTA]   │  │ [CTA]   │  │ [CTA]   │   │
│  └─────────┘  └─────────┘  └─────────┘   │
└───────────────────────────────────────────┘
```

**Layout:** 3-column grid (desktop), stacked (mobile)
**Card Spacing:** 32px gap
**Max Width:** 1200px

### 5.3 Two-Column Content + Media

```
┌─────────────────────────────────────────┐
│  ┌───────────────┐  ┌───────────────┐   │
│  │               │  │               │   │
│  │  TEXT         │  │   IMAGE or    │   │
│  │  CONTENT      │  │   VIDEO       │   │
│  │               │  │               │   │
│  │  • Bullets    │  │               │   │
│  │  • List       │  │               │   │
│  │               │  │               │   │
│  │  [CTA]        │  │               │   │
│  │               │  │               │   │
│  └───────────────┘  └───────────────┘   │
└─────────────────────────────────────────┘
```

**Layout:** 50/50 split (desktop), stacked (mobile)
**Usage:** B2B section, Business Opportunities section

### 5.4 Services/Features Grid

```
┌─────────────────────────────────────────┐
│         Section Headline                │
│                                         │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐        │
│  │Wt  │  │Pep-│  │Hair│  │Skin│        │
│  │Loss│  │tide│  │    │  │    │        │
│  └────┘  └────┘  └────┘  └────┘        │
│                                         │
│  ┌────┐  ┌────┐                         │
│  │Sex │  │Long│                         │
│  │Hlth│  │evty│                         │
│  └────┘  └────┘                         │
└─────────────────────────────────────────┘
```

**Layout:** 4 columns (desktop) → 2 cols (tablet) → 1 col (mobile)
**Card Min-Height:** 280px

### 5.5 Timeline / How It Works

```
┌─────────────────────────────────────────┐
│         "How It Works"                  │
│                                         │
│   ①──────→②──────→③──────→④             │
│  Sign    Consult  Receive  Ongoing      │
│   Up     w/       Kit      Support      │
│          Provider                       │
│                                         │
│  [Short description for each step]      │
└─────────────────────────────────────────┘
```

**Layout:** Horizontal timeline (desktop), vertical stack (mobile)
**Step Indicators:** Numbered circles or icons

---

## 6. MOTION & ANIMATION

### Animation Principles
- **Subtle over flashy**
- **Performance-first** (CSS transforms only)
- **Respect reduced motion** preferences

### Timing & Easing

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-medium: 300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 600ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Scroll-Triggered Animations

```css
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Trigger:** When element is 15% into viewport
**Stagger:** 100ms delay between sibling elements

### Hover States

#### Button Hover
```css
transform: translateY(-2px);
box-shadow: 0 8px 16px rgba(0, 78, 124, 0.2);
transition: all 0.2s ease;
```

#### Card Hover
```css
transform: translateY(-4px);
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Modal Animations

```css
/* Modal entrance */
.modal-backdrop {
  animation: fadeIn 0.3s ease;
}

.modal-container {
  animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 7. IMAGE USAGE GUIDELINES

### Logo Placement
- **Nav:** Top-left, 120-150px wide
- **Footer:** Centered or left-aligned, same size
- **Favicon:** 32x32 / 180x180 (iOS)

### Photography Rules

#### Hero Section
- **Image:** Lab glassware with cyan glow (`dmitrii-e-y10vO-Ic4OI-unsplash.jpg`)
- **Treatment:** Dark gradient overlay (60% opacity) for text legibility
- **Fallback:** Deep blue gradient background

#### Service Cards
- **Approach:** Icons preferred over photos for cleaner look
- **If photos used:** Consistent aspect ratio (1:1 or 4:3), blue color filter acceptable

#### B2B Section
- **Image:** Well plate or clinical precision imagery
- **Treatment:** 50/50 split with text, minimal overlay

### Abstract Backgrounds

#### Radial Glow Pattern
```css
.bg-glow {
  background-image:
    radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.08) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(74, 159, 216, 0.06) 0%, transparent 40%);
}
```

#### Medical Cross Pattern (Subtle)
```css
.bg-medical-pattern {
  background-image: url('data:image/svg+xml,...'); /* SVG medical cross */
  background-size: 120px 120px;
  opacity: 0.05;
}
```

---

## 8. RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptop */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

### Responsive Patterns

#### Container Max-Widths
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

#### Grid Responsiveness
```css
.grid-3col {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: 24px;
}

@media (min-width: 768px) {
  .grid-3col {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .grid-3col {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}
```

---

## 9. ACCESSIBILITY

### Focus States
```css
*:focus-visible {
  outline: 3px solid var(--color-accent-cyan);
  outline-offset: 2px;
}
```

### Color Contrast Requirements
- **AA Standard:** Minimum 4.5:1 for body text
- **AAA Standard:** Minimum 7:1 for headings (where possible)

### ARIA Labels
- All interactive elements require `aria-label` or visible text
- Modals require `aria-modal="true"` and `role="dialog"`
- Accordions use `aria-expanded` states

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. IMPLEMENTATION NOTES

### CSS Architecture
- **Methodology:** Utility-first (Tailwind) or BEM
- **File Structure:**
  - `reset.css` — Browser normalization
  - `tokens.css` — Color/spacing/typography variables
  - `components.css` — Reusable components
  - `utilities.css` — Helper classes
  - `animations.css` — Motion & keyframes

### JavaScript Requirements
- **Scroll reveal:** Intersection Observer API
- **Modal behavior:** Focus trap, ESC key to close
- **Accordion:** Toggle `aria-expanded` and `hidden` attributes
- **Form validation:** Client-side + server-side

### Performance Targets
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)

---

**End of Master Design System**
