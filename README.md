# FinSang Terminal (Financial & Stock Market Dashboard)

## 1. Project Overview
This project is a comprehensive React-based web application that replicates a professional financial terminal (FinSang Terminal v3.0). It provides a 360° view of a company's financial health, valuation, future growth, past performance, and a fully customizable **Market Dashboard** using interactive charts and a clean, institutional-grade UI.

## 2. Key Features
- **Customizable Market Dashboard:** A drag-and-drop, resizable grid layout (`react-grid-layout`) featuring real-time widgets (Index Ticker, Technical Charts, Heatmaps, Liquidity, Top Movers).
- **Responsive Device Simulator:** Built-in iframe-based simulator to preview the application in Mobile, Tablet, and Desktop views perfectly.
- **360° Company Overview:** Snowflake chart analyzing Value, Future, Past, Health, and Dividend.
- **In-depth Analysis Tabs:** Detailed sections for Valuation, Future Growth, Past Performance, and Financial Health.
- **Interactive Data Visualization:** Custom implementations using Recharts, ApexCharts, and TradingView widgets.
- **Cross-tab Navigation:** Seamless smooth-scrolling navigation.
- **Design System:** Adheres to the "Light Institutional Modern" theme with dynamic CSS variables for theming.

## 3. Tech Stack
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4
- **Layout:** React Grid Layout
- **Icons:** Lucide React
- **Charts:** Recharts, ApexCharts, React TS TradingView Widgets
- **Animations:** Motion (Framer Motion)

## 4. Quick Start
```bash
# Install dependencies
npm install

# Run development server (runs on port 3000)
npm run dev

# Build for production
npm run build
```

## 5. Documentation Directory
For detailed technical information, component architecture, API integration guidelines, and JSON data structures, please refer to the following documents:

- 🏗️ **[Architecture & Guidelines](./ARCHITECTURE.md):** The core architectural overview, tech stack details, and strict guidelines for AI agents and developers.
- 📚 **[Technical Documentation](./Technical_Documentation.md):** Deep dive into component architecture, JSON payloads for API integration, and the complete project changelog.
- 🎨 **[Design System & Tech Notes](./TECH_DOC.md):** Supplementary notes on the "Light Institutional Modern" design system, typography, and colors.
- 🇻🇳 **[Frontend UX/UI & Data Requirements](./Techdoc_Frontend_UX_UI2.md):** (Vietnamese) Detailed guide for Backend/Data teams regarding API structures, state management, and UX principles.
