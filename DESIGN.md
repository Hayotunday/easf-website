---
name: EASF Design System
colors:
  surface: '#f8fafa'
  surface-dim: '#d8dada'
  surface-bright: '#f8fafa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f4'
  surface-container: '#eceeee'
  surface-container-high: '#e6e8e8'
  surface-container-highest: '#e1e3e3'
  on-surface: '#191c1d'
  on-surface-variant: '#3f4945'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#eff1f1'
  outline: '#707975'
  outline-variant: '#bfc9c4'
  surface-tint: '#29695b'
  primary: '#00342b'
  on-primary: '#ffffff'
  primary-container: '#004d40'
  on-primary-container: '#7ebdac'
  inverse-primary: '#94d3c1'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#00342d'
  on-tertiary: '#ffffff'
  tertiary-container: '#004d44'
  on-tertiary-container: '#64c1b0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#afefdd'
  primary-fixed-dim: '#94d3c1'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#065043'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#97f3e2'
  tertiary-fixed-dim: '#7ad7c6'
  on-tertiary-fixed: '#00201b'
  on-tertiary-fixed-variant: '#005047'
  background: '#f8fafa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e3'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  button:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
---

## Brand & Style

The design system is anchored in the concepts of **Growth, Prestige, and Accessibility**. It serves a dual purpose: to appear prestigious enough for high-achieving scholars and institutional partners, while remaining warm and accessible for students navigating complex application processes.

The aesthetic follows a **Modern Corporate** approach with academic leanings. It prioritizes clarity and trust through:
- **Generous Whitespace:** Promoting focus and reducing cognitive load during long reading sessions.
- **Intentional Photography:** High-resolution imagery of students in collaborative, optimistic environments, utilizing natural sunlight and African context.
- **Refined Accents:** Using gold not as a primary filler, but as a "reward" color for achievements and key calls-to-action.

## Colors

The palette is rooted in a **Deep Emerald Green** (#004D40), conveying stability, growth, and a nod to Nigerian heritage. This is paired with **Gold** (#D4AF37) to symbolize the "Golden Opportunity" of the scholarship.

- **Primary:** Deep Emerald for headers, primary buttons, and brand iconography.
- **Secondary:** Gold for secondary actions, highlights, and success indicators.
- **Backgrounds:** A tiered system of White (#FFFFFF) for primary content and Light Gray (#F5F7F7) for section differentiation.
- **Status Colors:** Use tertiary teals for informative states and deep reds for errors, ensuring they do not clash with the primary emerald.

## Typography

This design system utilizes a high-contrast typographic pairing to balance modern authority with academic tradition.

- **Headings (Montserrat):** Used for all structural titles. Its geometric nature provides a modern, professional outlook.
- **Body (Source Serif 4):** Chosen for its exceptional legibility in long-form academic content. The serif typeface evokes the feeling of a prestigious institution.
- **Interface Elements (Inter):** Used for labels, buttons, and form inputs to ensure maximum clarity and a "system" feel for functional tasks.

## Layout & Spacing

The layout utilizes a **Fixed Grid** system for desktop to maintain a prestigious, centered reading experience, transitioning to a fluid model for mobile devices.

- **Desktop:** 12-column grid with a 1280px max-width.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px margins.
- **Rhythm:** Use an 8px base unit. Section vertical spacing should be generous (80px+) to allow the "academic" content room to breathe and appear less overwhelming to applicants.

## Elevation & Depth

The design system employs **Tonal Layering** supplemented by **Ambient Shadows** to create a sense of organized hierarchy.

- **Surface Tiers:** Use subtle background shifts (White to Light Gray) to separate the navigation, main content, and footer.
- **Shadow Profile:** Shadows should be extremely soft and diffused (e.g., `box-shadow: 0 4px 20px rgba(0, 77, 64, 0.08)`). The use of a tiny amount of the primary emerald in the shadow tint keeps the depth feeling organic to the brand.
- **Interactive Depth:** Cards should slightly elevate on hover to signify interactability, moving from a low-depth state to a more prominent shadow.

## Shapes

The shape language is **Refined and Rounded**. Elements avoid sharp corners to feel more welcoming, but avoid "bubble" or pill shapes (except for tags) to maintain professional gravitas.

- **Standard Radius:** 0.5rem (8px) for cards, input fields, and standard buttons.
- **Large Radius:** 1rem (16px) for featured promotional sections or image containers.
- **Pill Shapes:** Reserved exclusively for status indicators (e.g., "Application Open") and category chips.

## Components

### Buttons
- **Primary:** Solid Emerald Green with White text. Bold, sans-serif labels. 
- **Secondary:** Ghost style with Emerald borders or Solid Gold with Deep Emerald text for high-priority "Apply Now" actions.
- **States:** Hover states should involve a subtle darken or a 2px elevation lift.

### Cards
- **Course/Scholarship Cards:** White background, 1px soft gray border, and a subtle shadow. Headlines in Montserrat, metadata (dates, locations) in Inter with small icons.
- **Image Treatment:** Top-aligned photography with a 0.5rem top-radius to match the card.

### Forms
- **Structure:** Vertical stacks with labels placed above the input.
- **Inputs:** Light gray fill with a 1px border that turns Emerald on focus. Use Inter for input text to ensure clarity in data entry.

### Lists & Progress
- **Application Tracker:** Stepper components using Gold for completed steps and Emerald for the active step.
- **Informative Lists:** Use custom "check" icons in Gold to highlight scholarship benefits.