# FinSang Design System Guidelines (v3.0)

This document outlines the design system for the FinSang Terminal. All new features and components MUST strictly adhere to these guidelines to maintain visual consistency.

## 1. Color Palette (Institutional Modern)
- **Background:** `--bg-base` (#F4F6F8)
- **Card Background:** `--bg-card` (#FFFFFF)
- **Text:** `--text-primary` (#111827), `--text-secondary` (#4B5563)
- **Accents:**
  - Brand: `--brand-primary` (#007BFF)
  - Bullish: `--color-bullish` (#28A745)
  - Bearish: `--color-bearish` (#FF3B30)

## 2. Typography
- **UI Font:** Plus Jakarta Sans
- **Data Font:** JetBrains Mono (tabular numbers)
- **Class:** Use `font-tabular` for all financial figures.

## 3. Logo & Branding
- **Component:** `FinSangLogo` from `/src/theme`.
- **Usage:**
  - **Primary Placement:** Top-left corner of the main navigation bar.
  - **Favicon:** Use the simplified icon version of the logo.
  - **Sizing:** Maintain consistent aspect ratio; do not stretch.
- **Design:** Geometric polyhedron inside a rounded square container.
- **Branding:** "Fin" (Bullish Green), "Sang" (Primary Black), "Terminal" (Secondary Gray).

## 4. Dark & Light Mode
- **System:** The terminal supports both modes.
- **Implementation:** Use CSS variables defined in `theme.css`.
- **Switching:** Use the global theme provider context. Components must react to `theme` state changes (light/dark) by updating the root class (`.light` or `.dark`).
- **Defaults:** Default to system preference, with user override capability.

## 5. Localization (EN/VI)
- **Typography:** Ensure the font family (Plus Jakarta Sans) supports Vietnamese diacritics.
- **Layout:** Vietnamese text can be longer than English. Ensure containers have flexible widths and avoid fixed-width layouts for labels.
- **Theme:** The color palette and visual style remain consistent across languages.

## 6. Buttons
- **Primary:** High contrast, solid background (`--brand-primary`).
- **Secondary:** Outline or subtle background.
- **States:** Hover, Active, Disabled states must be defined in `theme.css`.
- **Padding:** Consistent padding (e.g., `px-4 py-2`).

## 7. Frames & Containers
- **Cards:** Use `surface-card` class. Rounded corners (`rounded-xl`), subtle border (`border-gray-200`).
- **Layouts:** Use CSS Grid/Flexbox. Avoid absolute positioning.
- **Spacing:** Use consistent spacing scale (e.g., `gap-4`).

## 8. Charts
- **Library:** Use `recharts` for all data visualization.
- **Colors:** Use the defined palette (`--color-bullish`, `--color-bearish`, `--brand-primary`).
- **Accessibility:** Always include tooltips and legends.
- **Responsiveness:** Charts must resize to fit their container.

## 9. Implementation Rules
- Import `theme.css` in your global `index.css`.
- Use CSS variables for all component styling.
- Apply `surface-card` class for cards to get the institutional look.
- **Interactive Classes:** Use `btn-interactive`, `tab-interactive`, `list-row` for consistent behavior.
- **MANDATORY:** All new features MUST strictly adhere to these guidelines. Do not introduce new styling patterns without updating these guidelines first.
