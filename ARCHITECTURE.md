# Project Architecture & Guidelines

## 1. Project Overview
This project is a comprehensive **Financial & Stock Market Dashboard Application**. It provides users with detailed insights into market trends, company overviews, valuations, financial health, and portfolio management. The application features a highly customizable, draggable, and resizable grid layout for the market dashboard, along with a built-in device simulator for responsive testing.

## 2. Tech Stack
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS v4 (with custom CSS variables for theming)
- **Icons:** `lucide-react`
- **Animations:** `motion` (Framer Motion)
- **Charts & Data Visualization:** 
  - `recharts`
  - `apexcharts` / `react-apexcharts`
  - `react-ts-tradingview-widgets`
- **Layout System:** `react-grid-layout` (for the customizable dashboard)
- **Localization:** `i18next` / `react-i18next`
- **Backend/Database (Available):** `express`, `@supabase/supabase-js`, `better-sqlite3`
- **AI Integration:** `@google/genai`

## 3. Directory Structure
```text
/src
 ├── components/           # Reusable UI components and main page sections
 │   ├── dashboard/        # Widgets specifically for the Market Dashboard (Grid items)
 │   ├── DeviceSimulator.tsx # Iframe-based responsive previewer
 │   ├── MarketDashboard.tsx # The draggable/resizable grid layout page
 │   ├── CompanyOverview.tsx # Financial analysis pages...
 │   └── ...
 ├── contexts/             # React Context providers for global state
 │   ├── ThemeContext.tsx  # Manages Light/Dark mode
 │   └── PortfolioContext.tsx # Manages user portfolio data
 ├── hooks/                # Custom React hooks
 │   └── useFinancialData.ts # Hook for fetching/mocking financial data
 ├── theme/                # Theme configuration
 │   ├── colors.ts         # Color palettes
 │   └── theme.css         # CSS variables for dynamic theming
 ├── App.tsx               # Main application entry point and routing logic
 ├── index.css             # Global styles and Tailwind imports
 └── main.tsx              # React DOM rendering
```

## 4. Core Components & Features

### 4.1. App Layout (`App.tsx`)
The main layout consists of a `Header`, a collapsible `Sidebar` for navigation, and a main content area. Navigation is handled via state (`activeTab`) rather than a traditional router (like react-router), allowing for seamless transitions between sections like "Dashboard", "Overview", "Valuation", etc.

### 4.2. Market Dashboard (`MarketDashboard.tsx`)
This is the landing page. It uses `react-grid-layout` (`Responsive` and `useContainerWidth`) to render a fully customizable grid.
- **Widgets:** Located in `src/components/dashboard/` (e.g., `IndexTicker`, `TechnicalChart`, `MarketHeatmap`).
- **Responsiveness:** Defines different layouts for breakpoints (`lg`, `md`, `sm`, `xs`, `xxs`).
- **Persistence:** Layout changes are saved to `localStorage` (`marketDashboardLayouts_v5`).

### 4.3. Device Simulator (`DeviceSimulator.tsx`)
A wrapper component that allows users to preview the application in Mobile, Tablet, or Desktop views.
- **Mechanism:** Uses an `iframe` to render the app at specific dimensions, ensuring CSS media queries (like Tailwind's `sm:`, `md:`) trigger correctly based on the simulated device width, not the actual browser window.
- **Bypass:** Automatically bypasses the simulator if opened on an actual mobile device.

### 4.4. Theming System
The app supports dynamic theming (Light/Dark mode).
- Colors are defined using CSS variables in `src/theme/theme.css` (e.g., `--bg-base`, `--bg-card`, `--text-primary`).
- Tailwind classes use these variables (e.g., `bg-[var(--bg-base)]`, `text-[var(--text-primary)]`).
- **Rule for Agents:** Always use CSS variables for colors to ensure Dark Mode compatibility. Avoid hardcoding colors like `bg-white` or `text-black` unless specifically required.

## 5. Guidelines for AI Agents

When modifying or extending this project, please adhere to the following rules:

1. **Adding New Dashboard Widgets:**
   - Create the widget component inside `src/components/dashboard/`.
   - Ensure the widget takes up `100%` width and height of its container (`w-full h-full`), as `react-grid-layout` controls the absolute dimensions.
   - Add the widget to the `defaultLayouts` object in `MarketDashboard.tsx` across all breakpoints.
   - Add the component to the `Responsive` grid inside `MarketDashboard.tsx` with a matching `key`.

2. **Styling & Tailwind:**
   - Use Tailwind CSS for all styling.
   - Respect the established theme variables. Use `bg-[var(--bg-card)]` for widget backgrounds, `border-[var(--border-subtle)]` for borders, and `text-[var(--text-secondary)]` for secondary text.
   - Ensure mobile responsiveness using Tailwind's `sm:`, `md:`, `lg:` prefixes.

3. **Data Fetching:**
   - Use the `useFinancialData` hook or create similar custom hooks in `src/hooks/` to separate data fetching logic from UI components.
   - Handle loading (`loading`) and error (`error`) states gracefully in the UI.

4. **Grid Layout Gotchas:**
   - Do NOT use `WidthProvider` from `react-grid-layout`. Use the `useContainerWidth` hook instead, as it is the recommended approach for React 18+ and prevents hydration/rendering issues.
   - Ensure the `Responsive` component has `width={width}` passed from the hook.

5. **Animations:**
   - Use `motion` from `motion/react` (Framer Motion) for complex animations.
   - For simple transitions (hover effects, color changes), use Tailwind's `transition-colors duration-200` classes.

6. **Icons:**
   - Use `lucide-react` for all icons to maintain a consistent visual style.

7. **TypeScript:**
   - Maintain strict typing. Define interfaces for data models (e.g., Stock, Portfolio, User) in a central types file or within the respective component/hook files.
