---
name: PrismaX Design System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cdc5bc'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#969087'
  outline-variant: '#4b463f'
  surface-tint: '#ccc5be'
  primary: '#fcf4ec'
  on-primary: '#33302b'
  primary-container: '#dfd8d0'
  on-primary-container: '#625e58'
  inverse-primary: '#625e57'
  secondary: '#ffb787'
  on-secondary: '#502501'
  secondary-container: '#6b3a15'
  on-secondary-container: '#eba677'
  tertiary: '#d8ffe0'
  on-tertiary: '#00391e'
  tertiary-container: '#a9e7bb'
  on-tertiary-container: '#2f6946'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9e1d9'
  primary-fixed-dim: '#ccc5be'
  on-primary-fixed: '#1e1b16'
  on-primary-fixed-variant: '#4a4640'
  secondary-fixed: '#ffdcc6'
  secondary-fixed-dim: '#ffb787'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#6b3a15'
  tertiary-fixed: '#b2f1c4'
  tertiary-fixed-dim: '#97d4a9'
  on-tertiary-fixed: '#00210f'
  on-tertiary-fixed-variant: '#145130'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  surface-elevated: '#1C1C1C'
  surface-card: '#202020'
  surface-interactive: '#262626'
  text-highlight: '#FFFFFF'
  category-gold: '#D9A45C'
  category-terracotta: '#B87A4F'
  category-green: '#7CB88F'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  label-tag:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1200px
  text-max-width: 750px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 48px
---

## Brand & Style

This design system establishes an **Industrial Editorial** aesthetic, bridging the gap between high-precision robotics and sophisticated Web3 discourse. It is designed for a target audience of researchers, developers, and hardware enthusiasts who value clarity, technical depth, and a premium reading experience.

The visual direction is rooted in **Modern Minimalism with a Brutalist edge**. It utilizes a dark-mode-first environment to reduce eye strain during deep research sessions, high-contrast cream typography for superior readability, and architectural structural elements (like vertical accents and strict grids) to evoke a sense of mechanical reliability. The atmosphere is intellectual, authoritative, and forward-looking.

## Colors

The palette is anchored in a deep carbon foundation, utilizing tiered shades of grey to define elevation rather than shadows. 

- **Primary (Cream):** Used for primary text and core branding to maintain a warm, editorial feel against the dark background.
- **Surface Strategy:** The background hierarchy moves from `#141414` (Global) to `#1C1C1C` (Sectional) to `#202020` (Component Level).
- **Functional Accents:** Category colors (Terracotta, Gold, Pale Green) are used sparingly for taxonomy and status indicators, ensuring the interface remains primarily monochromatic and focused.
- **Contrast:** Maintain a minimum 4.5:1 ratio for all body text. Highlights should utilize pure white sparingly for emphasis.

## Typography

The typography strategy contrasts a high-fashion serif with a high-performance sans-serif.

- **Headlines:** Use **Playfair Display** for all major headings. The tight line height and negative letter spacing on larger sizes create a "compact" editorial look.
- **Body:** **Plus Jakarta Sans** provides a modern, slightly wider stance that improves legibility on dark backgrounds. Use the 1.7 line height for long-form research blocks.
- **Technical Data:** **JetBrains Mono** is reserved for $PIX tokens, market caps, timestamps, and code snippets, signaling "raw data" to the user.
- **Constraint:** Reading blocks must be constrained to a maximum width of 750px to prevent eye fatigue.

## Layout & Spacing

The layout follows a **Fixed Grid** approach for the main container, but switches to a narrow, focused column for editorial content.

- **Editorial Column:** Long-form text must be centered with a max-width between 640px and 750px.
- **Grid:** Use a 12-column grid for dashboards and landing pages with 24px gutters.
- **Vertical Rhythm:** Use generous vertical padding (`stack-lg`) between major sections to emphasize the "minimalist" and "spacious" industrial feel.
- **Mobile:** Scale margins down to 16px. Ensure all card elements stack vertically, maintaining the 4px left-border accent.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layering and Bold Borders**.

- **Z-Axis:** Depth is communicated by increasing the lightness of the background hex code. Objects "closer" to the user are lighter (e.g., a card is `#202020` on a `#141414` base).
- **Accents:** Every card or isolated module must feature a **4px solid left-border accent**. This border color should correspond to the category (e.g., Terracotta for Teleop).
- **Interactions:** Hover states should not use shadows. Instead, shift the background color to `#262626` and, if applicable, increase the opacity of the primary text.

## Shapes

The shape language is primarily **geometric and rigid**, reflecting industrial hardware. 

- **Corners:** Use a "Soft" (4px) radius for buttons and cards. This is just enough to feel modern without losing the precision of a sharp-edged industrial design.
- **Icons:** Use **Line-style icons only** (1.5px or 2px stroke weight). Avoid filled icons to maintain the "blueprint" or "technical drawing" aesthetic.

## Components

- **Buttons:** Primary buttons are solid `#DFD8D0` with `#141414` text. Secondary buttons are outlined with 1px stroke in `#DFD8D0`. Use `label-mono` for button text.
- **Cards:** Cards use the `#202020` background with the mandatory 4px left-border accent. Title text inside cards should use `headline-md`.
- **Chips/Tags:** Small, rectangular tags using `label-tag`. Use low-saturation versions of the Category Colors for the background (15% opacity) with full-saturation text.
- **Input Fields:** Bottom-border only or very subtle `#262626` solid fills. Focus state is indicated by the Primary Cream color and a 1px solid border.
- **Lists:** Research lists should use `body-md` with dividers in `#262626` and a monospace timestamp aligned to the right.
- **PIX Token Display:** Always wrap token mentions in a monospace container with a subtle background tint to make them instantly scannable.