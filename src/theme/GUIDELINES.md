# FinSang Design System Guidelines

## 1. Color Palette (Light Institutional Modern)
- **Background:** `--bg-base` (#F4F6F8)
- **Card Background:** `--bg-card` (#FFFFFF)
- **Text:** `--text-primary` (#111827), `--text-secondary` (#4B5563)
- **Accents:**
  - Brand: `--brand-primary` (#007BFF)
  - Bullish: `--color-bullish` (#28A745)
  - Bearish: `--color-bearish` (#FF3B30)

## 2. Typography
- Use the **Plus Jakarta Sans** font family for all UI elements.
- Use **JetBrains Mono** for financial data (tabular numbers).
- Use `font-tabular` class for all financial figures to ensure alignment.

## 3. Logo & Branding
- Use the `FinSangLogo` component from `/src/theme`.
- The logo is a geometric polyhedron inside a rounded square container.
- Branding: "Fin" (Bullish Green), "Sang" (Primary Black), "Terminal" (Secondary Gray).

## 4. Implementation
- Import `theme.css` in your global `index.css`.
- Use CSS variables for all component styling.
- Apply `surface-card` class for cards to get the institutional look.
