export interface QAPair {
  question: string;
  answer: string;
}

export interface HelpSection {
  id: string;
  title: string;
  iconName: string;
  overviewText: string;
  qaPairs: QAPair[];
}

export const swsHelpData: HelpSection[] = [
  {
    id: "snowflake-overview",
    title: "The Snowflake Overview",
    iconName: "Hexagon",
    overviewText: "The Snowflake is a visual summary of a company's investment profile, designed to help investors quickly identify if a stock meets their criteria. It evaluates companies across 5 distinct axes: Value, Future, Past, Health, and Dividend. Each axis is scored from 0 to 6, based on a series of quantitative checks. The resulting shape instantly communicates the company's strengths and weaknesses—for instance, a large, well-rounded snowflake indicates a fundamentally strong company across all metrics, while a skewed shape highlights specific areas of strength or concern.",
    qaPairs: [
      {
        question: "How is the 0-6 score calculated for each axis?",
        answer: "Each of the 5 axes consists of 6 underlying true/false checks based on quantitative financial data. For every check a company passes, it earns 1 point. The total score for an axis is the sum of these passed checks, resulting in a score between 0 and 6."
      },
      {
        question: "What does the overall shape of the Snowflake tell me?",
        answer: "The shape acts as a visual fingerprint. A value-oriented stock will stretch towards the 'Value' axis, while a high-growth tech stock might stretch towards 'Future' and 'Past' but lack in 'Dividend'. A larger total area generally indicates a higher number of passed checks across the board."
      },
      {
        question: "Are the scores relative to the industry or absolute?",
        answer: "The scores are a mix. Some checks are absolute (e.g., 'Does the company pay a dividend?'), while others are relative to the market or industry (e.g., 'Is the PE ratio lower than the industry average?'). This provides a balanced view of absolute quality and relative valuation."
      }
    ]
  },
  {
    id: "value",
    title: "Value (Valuation)",
    iconName: "Scale",
    overviewText: "The Value pillar assesses whether a company's stock is trading at an attractive price relative to its intrinsic value and peers. We employ a 2-Stage Discounted Cash Flow (DCF) model, updated to include a 10-year high-growth stage with decaying growth rates, to better capture companies transitioning from high growth to macroeconomic maturity. Alongside the DCF, we evaluate relative valuation metrics including the Price-to-Earnings (PE), Price-to-Earnings-Growth (PEG), and Price-to-Book (PB) ratios, comparing them against industry peers and the broader market.",
    qaPairs: [
      {
        question: "How do we calculate the terminal value in the DCF model?",
        answer: "The terminal value is calculated using the Gordon Growth Model at the end of the 10-year high-growth stage. We assume the company will grow at a conservative rate (typically aligned with the 10-year government bond rate, representing long-term inflation and GDP growth) into perpetuity. This value is then discounted back to present value."
      },
      {
        question: "Why use a 10-year high-growth stage instead of a standard 5-year model?",
        answer: "A standard 5-year model often forces a sudden drop to terminal growth, which is unrealistic for many high-growth companies. Our 10-year model applies a decaying growth rate, smoothly transitioning the company's current high growth down to the terminal rate, resulting in a more accurate and realistic intrinsic value."
      },
      {
        question: "What happens if a DCF cannot be applied to a company?",
        answer: "DCF models rely on predictable positive free cash flows. For companies with negative cash flows, highly cyclical earnings, or financial institutions (like banks), DCF is often unreliable or inapplicable. In these cases, the Value score relies more heavily on relative metrics like PE, PB, and PEG ratios compared to industry averages."
      }
    ]
  },
  {
    id: "future-performance",
    title: "Future Performance",
    iconName: "TrendingUp",
    overviewText: "The Future Performance pillar evaluates the company's expected growth over the next 1 to 3 years. This analysis relies heavily on consensus estimates from professional financial analysts covering the stock. We look at projected Revenue growth, Earnings Per Share (EPS) growth, and Future Return on Equity (ROE). The goal is to determine not just if the company will grow, but if it will grow faster than its industry peers and the broader market.",
    qaPairs: [
      {
        question: "Where do the analyst estimates come from?",
        answer: "We aggregate consensus estimates from professional analysts at major investment banks and research firms (sourced via S&P Global Capital IQ). These estimates represent the average expectation of the market's leading experts."
      },
      {
        question: "How is future growth scored if there are no analyst estimates?",
        answer: "If a company has little to no analyst coverage (common for micro-cap stocks), we cannot reliably project future earnings. In such cases, the Future axis will score 0, as we require verifiable consensus data to award points for future projections."
      },
      {
        question: "Why do you compare growth to the market and industry?",
        answer: "Absolute growth numbers can be misleading. A 10% growth rate might look great, but if the entire industry is growing at 20%, the company is actually losing market share. Comparing growth to benchmarks ensures we identify true outperformers."
      }
    ]
  },
  {
    id: "past-performance",
    title: "Past Performance",
    iconName: "History",
    overviewText: "The Past Performance pillar looks in the rearview mirror to assess the company's historical track record, typically over the last 5 years. We evaluate historical Earnings growth, Return on Equity (ROE), Return on Assets (ROA), and Return on Capital Employed (ROCE). To account for the volatility of earnings, we utilize a line-of-best-fit methodology for historical EPS growth rather than a simple point-to-point Compound Annual Growth Rate (CAGR), ensuring a more accurate representation of the underlying growth trend.",
    qaPairs: [
      {
        question: "Why use a line-of-best-fit for historical growth instead of CAGR?",
        answer: "A simple point-to-point CAGR only looks at the first and last year. If the first year was unusually bad or the last year unusually good, the CAGR will be heavily distorted. A line-of-best-fit (linear regression) considers every data point over the 5-year period, smoothing out anomalies and revealing the true underlying growth trajectory."
      },
      {
        question: "How is Return on Equity (ROE) evaluated?",
        answer: "ROE measures how efficiently a company generates profits from shareholders' equity. We check if the company's current ROE is high (typically >20%) and if it exceeds the industry average, indicating superior capital allocation by management."
      },
      {
        question: "What is the difference between ROA and ROCE?",
        answer: "Return on Assets (ROA) measures profit against all assets (including debt-funded ones). Return on Capital Employed (ROCE) measures profit against the capital actually employed in the business (Total Assets minus Current Liabilities). ROCE is often a better metric for capital-intensive businesses."
      }
    ]
  },
  {
    id: "financial-health",
    title: "Financial Health",
    iconName: "HeartPulse",
    overviewText: "The Financial Health pillar assesses the strength of a company's balance sheet and its ability to meet its financial obligations. For standard companies, we analyze Short and Long-Term Assets vs. Liabilities, the Debt-to-Equity ratio, and Interest Coverage. Crucially, the model differentiates between standard companies and Financial Institutions (like banks). Because banks inherently operate with high leverage (deposits are liabilities), standard debt metrics do not apply. Instead, for banks, we evaluate the Loan-to-Deposit ratio, allowance for bad loans, and the proportion of low-risk liabilities.",
    qaPairs: [
      {
        question: "How is financial health assessed differently for banks?",
        answer: "Banks use customer deposits (liabilities) to issue loans (assets). A high debt-to-equity ratio is normal and required for their business model. Therefore, we evaluate banks on their Loan-to-Deposit ratio (liquidity), the percentage of non-performing loans (asset quality), and their allowance for bad loans (risk mitigation)."
      },
      {
        question: "What is a safe Debt-to-Equity ratio?",
        answer: "Generally, a Debt-to-Equity ratio below 40% is considered safe, though this varies by industry. We also look at the trend: is the debt level reducing over the past 5 years? A reducing debt load is a strong positive signal."
      },
      {
        question: "Why is Interest Coverage important?",
        answer: "Interest Coverage measures how easily a company can pay interest on its outstanding debt with its current earnings (EBIT). If a company has high debt but generates massive cash flows that cover interest payments 10x over, the debt is manageable. If coverage is below 3x, the company may be at risk during an economic downturn."
      }
    ]
  },
  {
    id: "dividends",
    title: "Dividends",
    iconName: "Coins",
    overviewText: "The Dividend pillar evaluates the attractiveness and sustainability of a company's dividend payments. We look beyond just the current Dividend Yield. The model checks if the yield is in the top 25% of the market, but more importantly, it assesses sustainability. We analyze the Payout Ratio (what percentage of earnings is paid out) and the Cash Payout Ratio (what percentage of free cash flow is paid out). We also check the historical track record to see if dividends have been stable and growing over the past 10 years.",
    qaPairs: [
      {
        question: "Does a high dividend yield mean a good investment?",
        answer: "Not necessarily. A very high yield can be a 'dividend trap'—often the result of a collapsing stock price rather than a generous payout. This is why we heavily emphasize sustainability checks alongside the absolute yield."
      },
      {
        question: "What makes a dividend sustainable?",
        answer: "A sustainable dividend is well-covered by both Earnings and Free Cash Flow. Generally, a payout ratio below 70% indicates the company retains enough capital to reinvest in the business while still rewarding shareholders. If the payout ratio exceeds 100%, the company is paying out more than it earns, which is unsustainable."
      },
      {
        question: "Why do you check the 10-year dividend history?",
        answer: "Consistency is key for dividend investors. We check if the dividend payments have been stable (no cuts) and growing over the past decade. A company that maintained or grew its dividend through economic cycles demonstrates strong financial resilience and management commitment to shareholders."
      }
    ]
  }
];
