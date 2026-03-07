# Technical Documentation & Architecture

## 0. Documentation Policy
**IMPORTANT:** This document serves as the single source of truth for the project's technical architecture, data structures, and integration guidelines. **Every time a new feature is added, a component is modified, or a data structure is changed, this file MUST be updated.** This ensures that any future developer or AI agent can seamlessly take over, understand the UX/UI connection, and perform API integrations without reverse-engineering the codebase.

---

## 1. Architecture & Component Deep Dive

This application follows a modular, component-based architecture using React (Vite) and Tailwind CSS. The routing is currently handled via state (`activeTab`) rather than a traditional router (like `react-router-dom`) to keep the application lightweight and tightly coupled with the smooth-scrolling navigation system.

### 1.1 `App.tsx` (Main Container & State Manager)
- **Role:** The root component. It manages the global layout (Sidebar + Main Content) and the routing state.
- **State Variables:**
  - `activeTab` (string): Determines which component to render in the main view (e.g., `'Overview'`, `'Valuation'`). Default is `'Overview'`.
  - `pendingScrollId` (string | null): Temporarily stores the HTML `id` of the section the user wants to scroll to after a tab change.
- **The Navigation Engine (`navigateTo`):**
  ```typescript
  const navigateTo = (tabName: string, sectionId?: string) => {
    setActiveTab(tabName);
    if (sectionId) {
      setPendingScrollId(sectionId);
    }
  };
  ```
- **The Smooth Scroll Effect:**
  A `useEffect` hook monitors `pendingScrollId`. When it detects a value, it waits `100ms` (to ensure React has finished rendering the new tab's DOM elements), finds the element by ID, and triggers `scrollIntoView`.
  ```typescript
  useEffect(() => {
    if (pendingScrollId) {
      setTimeout(() => {
        const element = document.getElementById(pendingScrollId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setPendingScrollId(null); // Reset after scrolling
      }, 100);
    }
  }, [pendingScrollId, activeTab]);
  ```

### 1.2 `Sidebar.tsx` (Navigation Menu)
- **Role:** Renders the left-hand navigation.
- **Props:** `activeTab` (string), `setActiveTab` (function).
- **Styling:** Uses Tailwind to highlight the active tab (`bg-white/10 text-white`) versus inactive tabs (`text-gray-400 hover:bg-white/5`).

### 1.3 `CompanyOverview.tsx` (Dashboard Landing)
- **Role:** The 360° summary view.
- **Sub-components & Features:**
  - **Snowflake Chart:** Built using Recharts `<RadarChart>`. It uses a custom `<PolarAngleAxis>` with a `tick` render function to position the labels (Value, Future, Past, Health, Dividend) correctly around the hexagon.
  - **Rewards & Risk Checks:** Lists of pros and cons. They utilize the `onNavigate` prop to trigger cross-tab navigation.
  - **Modals:** Uses local state (`isRiskModalOpen`) to conditionally render a full-screen overlay showing all risk checks.

### 1.4 Data Visualization Tabs (`Valuation.tsx`, `FutureGrowth.tsx`, `PastPerformance.tsx`)
- **Role:** Render detailed financial charts.
- **Recharts Implementation Details:**
  - **Responsiveness:** All charts are wrapped in `<ResponsiveContainer width="100%" height="100%">`.
  - **Tooltips:** Custom tooltips are often used to format currency (e.g., converting `25000` to `$25.0B`).
  - **Anchors:** Every major section is wrapped in a `div` with a specific `id` (e.g., `<div id="section_1_1">`). **Crucial:** These IDs must exactly match the `link` properties in the Risk Checks JSON data.

---

## 2. UI/UX Design System (OLED Dark)

To maintain visual consistency, the project strictly adheres to an OLED Dark theme.
- **Backgrounds:** 
  - Main App Background: `#050505` (OLED Black)
  - Card/Panel Backgrounds: `#111111` or `bg-white/5`
- **Typography:** 
  - Primary Text: `#ffffff` (White)
  - Secondary Text: `#9ca3af` (Gray-400) or `#6b7280` (Gray-500)
- **Status Colors:**
  - Pass / Positive: `#10b981` (Emerald-500)
  - Warning / Neutral: `#f59e0b` (Amber-500)
  - Fail / Negative: `#ef4444` (Red-500)
- **Chart Colors:**
  - Primary Brand (Company): `#3b82f6` (Blue-500)
  - Industry/Peers: `#2dd4bf` (Teal-400), `#d946ef` (Fuchsia-500)

---

## 3. Data Integration Guide & JSON Payloads

Currently, data is mocked. To connect this UI to a real backend (Node.js, Python, etc.), your API must return JSON payloads that conform to the following TypeScript interfaces.

### 3.1 Snowflake Chart Data
**Target Component:** `CompanyOverview.tsx`
**TypeScript Interface:**
```typescript
interface SnowflakeDataPoint {
  subject: "Value" | "Future" | "Past" | "Health" | "Dividend";
  A: number; // The company's score (0 to 6)
  fullMark: 6; // Always 6
}
type SnowflakePayload = SnowflakeDataPoint[];
```
**JSON Example:**
```json
[
  { "subject": "Value", "A": 4, "fullMark": 6 },
  { "subject": "Future", "A": 5, "fullMark": 6 },
  { "subject": "Past", "A": 4, "fullMark": 6 },
  { "subject": "Health", "A": 5, "fullMark": 6 },
  { "subject": "Dividend", "A": 0, "fullMark": 6 }
]
```

### 3.2 Rewards & Risk Checks
**Target Component:** `CompanyOverview.tsx`
**TypeScript Interface:**
```typescript
interface RiskCheck {
  id: number | string;
  label: string; // The text displayed to the user
  status: "pass" | "fail" | "warning"; // Determines the icon (Check, X, AlertTriangle)
  tab: string; // The exact name of the target tab (e.g., "Valuation")
  link: string; // The HTML ID of the target section (e.g., "section_1_1")
}
type RiskChecksPayload = RiskCheck[];
```
**JSON Example:**
```json
[
  {
    "id": 1,
    "label": "Trading at 46.2% below our estimate of its fair value",
    "status": "pass", 
    "tab": "Valuation",
    "link": "section_1_1"
  }
]
```

### 3.3 Time-Series Financial Data (Line/Bar Charts)
**Target Component:** `FutureGrowth.tsx`, `PastPerformance.tsx`
**TypeScript Interface:**
```typescript
interface FinancialYearData {
  year: string; // e.g., "2020", "Dec 23"
  revenue?: number; // Raw number, UI will format to Billions/Trillions
  earnings?: number;
  cashFlow?: number;
  [key: string]: any; // Extensible for other metrics
}
type TimeSeriesPayload = FinancialYearData[];
```
**JSON Example:**
```json
[
  { "year": "2020", "revenue": 20000, "earnings": 5000 },
  { "year": "2021", "revenue": 25000, "earnings": 8000 }
]
```

### 3.4 Comparative Data (Bar/Scatter Charts)
**Target Component:** `Valuation.tsx`
**TypeScript Interface:**
```typescript
interface ComparativeDataPoint {
  name: string; // e.g., "Company", "Industry", "Market"
  value: number; // The metric value (e.g., PE Ratio)
  fill?: string; // Optional: Hex color code. If omitted, frontend should assign colors.
}
type ComparativePayload = ComparativeDataPoint[];
```

### 3.5 How to Implement API Fetching (Example)
To replace the mock data, implement a standard `useEffect` fetch pattern in `App.tsx` or individual components:
```typescript
// Example Implementation
const [overviewData, setOverviewData] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchCompanyData = async () => {
    try {
      const response = await fetch('https://api.yourbackend.com/company/AAPL/overview');
      const data = await response.json();
      setOverviewData(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchCompanyData();
}, []);

// Render loading skeleton or actual component
if (isLoading) return <LoadingSkeleton />;
return <CompanyOverview data={overviewData} onNavigate={navigateTo} />;
```

---

## 4. Configuration Files

### 4.1 `package.json`
Manages project dependencies and scripts.
- **Dependencies:** `react`, `react-dom`, `recharts` (for data visualization), `lucide-react` (for SVG icons).
- **Dev Dependencies:** `vite`, `tailwindcss`, `typescript`.
- **Scripts:** `npm run dev` starts the Vite development server on port 3000. `npm run build` compiles the TypeScript and builds the production bundle.

### 4.2 `metadata.json`
Used by the AI Studio environment to define the applet's metadata.
```json
{
  "name": "Finsang Update New",
  "description": "A clone of Simply Wall St's Future Growth section for a stock.",
  "requestFramePermissions": []
}
```

---

## 5. Log of Work Done (Changelog)

### Phase 1: Layout & Core Navigation
- Set up the main application layout with a fixed `Sidebar` and a scrollable main content area.
- Implemented state management in `App.tsx` to handle tab switching (`activeTab`).

### Phase 2: Company Overview Tab
- Built the `CompanyOverview` component.
- Implemented the custom **Snowflake Chart** (Radar chart equivalent).
- Added the **Rewards** list and **Risk Checks** summary with interactive Modals.

### Phase 3: Detailed Analysis Tabs (Data Visualization)
- **Valuation Tab:** Added charts for "Share Price vs Fair Value", "PE Ratio vs Peers", etc.
- **Future Growth Tab:** Added charts for "Earnings and Revenue Growth Forecasts", etc.
- **Past Performance Tab:** Added charts for "Earnings and Revenue History", etc.

### Phase 4: Cross-Tab Navigation & UX Improvements
- Implemented a robust cross-tab navigation system (`navigateTo`).
- Added `id` attributes to all major sections across tabs to support anchor scrolling.
- Created placeholder screens for unimplemented tabs.
- **Documentation:** Created comprehensive `Technical_Documentation.md` with strict TypeScript interfaces for API integration.

### Phase 5: Future Growth Enhancements
- Built the **"2.1 Earnings and Revenue Growth Forecasts"** component.
- Implemented an advanced `ComposedChart` using Recharts to display Revenue, Earnings, Free Cash Flow, and Cash from Op.
- Added interactive features: Multi-select legend to toggle metrics, custom tooltips with analyst data, and a toggleable Data View (Table mode).
- Used `ReferenceArea` and `ReferenceLine` to visually separate "Past" and "Analysts Forecasts" data.

### Phase 6: Analyst Future Growth Forecasts
- Built the **"2.2 Analyst Future Growth Forecasts"** component.
- Implemented grouped bar charts for Earnings and Revenue growth comparisons.
- Added interactive tooltips for definitions and a modal for data sources.

### Phase 7: EPS Growth Forecasts
- Built the **"2.3 Earnings per Share (EPS) Growth Forecasts"** component.
- Implemented an EPS fan chart (Line and Area charts) to visualize historical data and future forecasts.
- Included an interactive tooltip and a modal displaying detailed data tables (Summary, Future Estimates, Past Financials).

### Phase 8: Future Return on Equity
- Built the **"2.4 Future Return on Equity"** component.
- Implemented a custom SVG Gauge Chart to visualize ROE forecasts for the company vs the industry.
- Added interactive tooltips with dashed underlines and a "Learn" modal explaining the importance of Future ROE.
- Consolidated documentation notes regarding the future internal Help Center.

### Phase 9: Past Earnings Performance
- Built the **"3. Past Earnings Performance"** module (`PastEarnings` and `PastEarningsOverview`).
- Implemented an interactive checklist with smooth scrolling to detailed sections.
- Created a Key Information table displaying historical metrics (Earnings growth, EPS growth, ROE, Net margin).
- Integrated a Snowflake Radar chart highlighting the "PAST" sector.
- Built a "Recent past performance updates" panel with a collapsible sidebar for viewing all historical updates.
- **Technical Note:** Historical data for this section will be synchronized from Parquet files in the backend.

### Phase 10: Overview Supplementary Frames
- Built the **"OverviewSupplementary"** component to enhance the "0.0 Overview" section.
- Integrated **TradingView Advanced Chart** widget for real-time price visualization.
- Created a **Key Metrics Grid** displaying 8 essential TTM indicators (P/E, P/B, ROE, Div Yield, Market Cap, EPS, 52W High/Low).
- Implemented a **Linear Valuation Slider** to visually compare current P/E against industry standards, using a gradient theme and glow pointers.
- Added a **Banking Operation Info** panel highlighting industry-specific metrics like NIM, Total Deposits, Total Loans, and LDR.
- Ensured strict adherence to the OLED Dark (`#050505`) theme and responsive design.
- **TradingView API Integration:** Added comprehensive technical documentation on how to dynamically connect and manage the TradingView widget lifecycle when switching stock symbols.

### Phase 11: Help Center (Internal Wikipedia)
- Built the **"HelpCenter"** component to serve as an internal knowledge base, mimicking the UX of Simply Wall St Support.
- Implemented an interactive **Accordion** system for collapsible FAQs and Guides.
- Integrated **Tooltips** for quick explanations of financial jargon (e.g., DCF, PEG Ratio, EPS).
- Created a structured **Knowledge Hierarchy** covering the Core Model (Snowflake), Valuation, Future Growth, Past Performance, Financial Health, and Dividend.
- Added a dedicated section for **FAQs & Data Sources**, explaining the TTM methodology and data origins (Vietcap, S&P Global).
- Enabled **Anchor Link Navigation** allowing users to jump directly to specific sections via URL hashes.
- Added a "Help Center" tab to the main Sidebar navigation under the "Support" category.

### Phase 12: Help Center Enhancements (Management & Ownership)
- Expanded the **"HelpCenter"** component to include detailed documentation for the **Management** and **Ownership** sections.
- **Management Section:** Added explanations for CEO compensation checks (vs Market, vs Earnings) and Leadership/Board experience (average tenure).
- **Ownership Section:** Added documentation for Insider Transactions (Open Market vs Private) and Ownership Breakdown (Dilution of Shares, Top Shareholders).
- **FAQs & Data Sources:** Added specific FAQs detailing the data providers and sources for Ownership Data (Proxies, 13Fs, Funds) and Insider Transactions Data (SEC Form 4, 3, 5, 13D/G).
- Updated the Table of Contents in the Help Center sidebar to include the new Management and Ownership anchor links.

---

## 6. Pending Tasks / Under Construction

The following tabs currently show a "Under construction" placeholder and need to be implemented:
1. **Financial Health:** Needs charts for Debt to Equity history, Short/Long term assets vs liabilities.
2. **Dividend:** Needs charts for Dividend Yield vs Market, Dividend history and payout ratio.
3. **Management:** Needs data tables for CEO compensation, board members, and insider trading.
4. **Ownership:** Needs pie charts for shareholder breakdown.
5. **Other information:** Needs general company info, employee count history, and listing details.
