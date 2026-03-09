# Technical Documentation (Supplementary)

## Overview
This document provides supplementary technical notes and design system guidelines for the FinSang Terminal project. For the comprehensive architecture and data integration guide, refer to [Technical_Documentation.md](./Technical_Documentation.md).

## Design System Guidelines (FinSang Terminal v3.0)

### 1. Color Palette (Light Institutional Modern)
- **Background:** `--bg-base` (#F4F6F8)
- **Card Background:** `--bg-card` (#FFFFFF)
- **Text:** `--text-primary` (#111827), `--text-secondary` (#4B5563)
- **Accents:**
  - Brand: `--brand-primary` (#007BFF)
  - Bullish: `--color-bullish` (#28A745)
  - Bearish: `--color-bearish` (#FF3B30)

### 2. Typography
- **UI Font:** Plus Jakarta Sans
- **Data Font:** JetBrains Mono (tabular numbers)
- **Class:** Use `font-tabular` for all financial figures.

### 3. Logo & Branding
- **Component:** `FinSangLogo` from `/src/theme`.
- **Design:** Geometric polyhedron inside a rounded square container.
- **Branding:** "Fin" (Bullish Green), "Sang" (Primary Black), "Terminal" (Secondary Gray).

### 4. Implementation Rules
- Import `theme.css` in your global `index.css`.
- Use CSS variables for all component styling.
- Apply `surface-card` class for cards to get the institutional look.
- **MANDATORY:** All new features MUST strictly adhere to these guidelines, including defined colors, typography, and interactive classes (`btn-interactive`, `tab-interactive`, `list-row`).

## Key Technical Notes
- **TradingView Widget:** Embedded via script (`embed-widget-advanced-chart.js`).
- **Snowflake Chart:** Uses Bullish Green (`#84cc16`) for successful scores.
- **Help Center:** Supports anchor link navigation via URL Hash.
- **Data Synchronization:** All financial metrics must be synchronized with the backend data structure.
