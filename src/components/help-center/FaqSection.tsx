import React from 'react';
import { Database } from 'lucide-react';
import { TTMDiagram } from '../HelpCenterDiagrams';
import { Accordion } from './HelpCenterShared';

export const FaqSection = () => {
  return (
    <section id="faqs-data" className="pt-4">
      <div className="flex items-center mb-6 pb-2 border-b border-subtle">
        <div className="bg-brand/10 p-2 rounded-lg mr-3">
          <Database className="w-6 h-6 text-brand" />
        </div>
        <h2 className="text-2xl font-bold text-primary">FAQs & Data Sources</h2>
      </div>

      <Accordion id="how-snowflake-works" title="How does the Snowflake work?">
        <div className="space-y-6 text-secondary">
          <p>
            The Snowflake is a visual summary of FinSang’s analysis across 5 assessment criteria on each company. The 5 criteria cover:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Valuation</li>
            <li>Future growth</li>
            <li>Past performance</li>
            <li>Financial health</li>
            <li>Dividend</li>
          </ul>
          <p>
            The company’s score on each of these criteria determines the size, shape and colour of its Snowflake. If you are interested in learning more about our analysis model, please see our article How does FinSang analyse stocks.
          </p>
          <p>
            The Snowflake is designed to allow you to do a quick scan of a particular stock, a group of stocks or the stock market as a whole. This helps you to quickly make comparisons across a wide range of securities and markets.
          </p>

          <div>
            <h4 className="text-xl font-bold text-primary mb-3">What is the Snowflake showing me?</h4>
            <p className="mb-4">
              For each assessment criteria, there are 6 individual checks performed. If a check is successful, it is assigned a score of 1 and if it is unsuccessful, it is assigned a score of 0. The successful checks are added to give an overall score for each assessment criteria.
            </p>
            <p className="mb-4">
              For example, a stock may receive 5 successful checks for "Dividend", giving a total Dividend score of 5 (from a possible 6). The Snowflake’s boundary on the Dividend line moves outwards from the centre as the total Dividend score increases. The total score for each of the other assessment criteria is also shown on the snowflake in the same way. The higher the company scores in each criteria, the larger its Snowflake is.
            </p>
            <p>
              You can see each criteria’s score in more detail by hovering your mouse over the Snowflake at the top right of the Executive Summary for each company.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-3">What do the different colours mean?</h4>
            <p className="mb-4">
              In addition to the Snowflake’s size increasing depending on the number of successful checks a company has, its colour will change too.
            </p>
            <p className="mb-4">
              The Snowflake is colour-coded on a scale. The greater the number of successful checks a company has, the greener the Snowflake will appear. On the opposite end, the lower the number of successful checks a company has, the redder the Snowflake will appear.
            </p>
            <p>
              As the number of successful checks a company has increased, the Snowflake will transition from red to orange and finally to green.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-3">Why is the Snowflake blue?</h4>
            <p>
              Securities that have been categorised as funds or ETFs by default have a blue Snowflake. This is because funds are not able to be fully fitted into our analysis model used for stocks. So the assessment criteria for funds is not as comprehensive as it is for stocks and the Snowflake for funds is not comparable to the Snowflake for stocks.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-3">The Snowflake is NOT a buy or sell recommendation</h4>
            <p className="mb-4">
              While the size and colour of the Snowflake broadly indicate the quality of the company according to FinSang’s analysis, a low score in particular assessment criteria should not necessarily exclude a stock from investment consideration.
            </p>
            <p className="mb-4">
              The Snowflake simply summarises the relevant characteristics of a stock.
            </p>
            <p className="mb-4">
              For example, a low "Dividend" score simply indicates the company may be paying a low dividend. However, it may also be experiencing high growth and reinvesting cash in growth initiatives.
            </p>
            <p>
              Investors should, therefore, consider each of the assessment criteria in terms of their own investment objectives. Our aim is to provide high-quality analysis based on the data we have available for any company. We want to empower you with information that can allow you to make informed decisions on your investments.
            </p>
          </div>
        </div>
      </Accordion>

      <Accordion id="data-updates" title="When is your data and stock prices get updated?">
        <div className="space-y-6 text-secondary">
          <div>
            <h4 className="text-xl font-bold text-primary mb-3">How do I know when the company report was last updated?</h4>
            <p className="mb-4">
              FinSang Company Reports is updated every day. To see when the company data was last updated, check the timestamp beside the word "Updated" on top of the Company Overview section.
            </p>
            <div className="surface-card border border-subtle p-4 rounded-lg bg-card">
              <p className="text-sm text-secondary">
                <strong>Note:</strong> All our data comes from S&P Global Market Intelligence. Most changes related to a company's fundamentals, management, prices, past financials, and future estimates are usually updated on an intraday basis. In the sections below we have provided more information about the timelines for the specific updates. For more information on our data sourcing and collection process, you can check out this link <a href="#" className="text-bullish hover:underline">Where does FinSang source its financial data?</a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-3">How often is the underlying data updated?</h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-left text-secondary border border-subtle rounded-lg overflow-hidden">
                <thead className="text-xs text-secondary uppercase bg-base border-b border-subtle">
                  <tr>
                    <th scope="col" className="px-6 py-3">Data Set</th>
                    <th scope="col" className="px-6 py-3">Typical Update Frequency</th>
                    <th scope="col" className="px-6 py-3">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-card border-b border-subtle">
                    <td className="px-6 py-4 font-medium text-primary">Share prices</td>
                    <td className="px-6 py-4">End of day</td>
                    <td className="px-6 py-4">Up to 6hrs</td>
                  </tr>
                  <tr className="bg-card border-b border-subtle">
                    <td className="px-6 py-4 font-medium text-primary">Earnings</td>
                    <td className="px-6 py-4">Every Quarter</td>
                    <td className="px-6 py-4">1- 3 days (English Financial Statement)<br/>10-22 days (Non-English)</td>
                  </tr>
                  <tr className="bg-card border-b border-subtle">
                    <td className="px-6 py-4 font-medium text-primary">Consensus Analyst Estimates</td>
                    <td className="px-6 py-4">24-48 hours</td>
                    <td className="px-6 py-4">Up to 6hrs (batched with stock price update)</td>
                  </tr>
                  <tr className="bg-card border-b border-subtle">
                    <td className="px-6 py-4 font-medium text-primary">Top Shareholders section</td>
                    <td className="px-6 py-4">No fixed update interval</td>
                    <td className="px-6 py-4">1-3 days for most of the companies</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-6 py-4 font-medium text-primary">Insider Transactions</td>
                    <td className="px-6 py-4">No fixed update interval</td>
                    <td className="px-6 py-4">1-3 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="text-lg font-bold text-primary mb-2">Share price</h5>
                <p>
                  Updated at the end of every day. To see when the price data was last updated, go to the "Price History & Performance" chart under the "Company Overview" section where the last price would be mentioned. We are also currently looking at the possibility of providing live pricing (20 minutes delayed) in the future.
                </p>
              </div>

              <div>
                <h5 className="text-lg font-bold text-primary mb-2">Earnings</h5>
                <p className="mb-2">
                  Updated every quarter for most companies. To see when earnings were last updated, hover your mouse over the latest earnings or revenue data points in the "Earnings and Revenue History" chart under the "Past Performance" section.
                </p>
                <div className="surface-card border border-subtle p-4 rounded-lg bg-card">
                  <p className="text-sm text-secondary">
                    <strong>Note:</strong> There might be delays in data updates in instances where companies report interim earnings or unconsolidated financial statements etc as these are prone to errors and/or correction. Our data provider usually starts collecting and collating data after a company files official reports after which they get populated into our database. Learn more on how our financial data are collected through this link: <a href="#" className="text-bullish hover:underline">How financial data are collected?</a>
                  </p>
                </div>
              </div>

              <p>
                Each of the above updates can also be accessed via a snapshot provided at the end of every company report in the Company Information section on our platform.
              </p>

              <div>
                <h5 className="text-lg font-bold text-primary mb-2">Updates to consensus analyst estimates</h5>
                <p className="mb-2">
                  Any changes in broker estimates that lead to changes in the consensus will get updated within the next 24-48 hours. Analyst numbers are presented using the trailing twelve months (TTM) annual period and you can check the last update by hovering your mouse over your period of interest (2025 in the example below). For more information on our analyst estimates data, you can go to this link: <a href="#" className="text-bullish hover:underline">Which brokers/analysts provide future estimates for companies on FinSang?</a>
                </p>
                <p>
                  For an in-depth insight into how we analyze companies, you can also view the documentation of our analysis model through this link: <a href="https://support.simplywall.st/hc/en-us/sections/360000361075-Stock-Analysis" target="_blank" rel="noreferrer" className="text-bullish hover:underline">Stock Analysis Documentation</a>
                </p>
              </div>

              <div>
                <h5 className="text-lg font-bold text-primary mb-2">Top Shareholders</h5>
                <p>
                  Changes in the number of shares held by entities in the top shareholders usually take around 1 to 3 days to be reflected in our report. To check the last update, hover your mouse over the calendar icon located on the right side of the shareholder's name.
                </p>
              </div>

              <div>
                <h5 className="text-lg font-bold text-primary mb-2">Insider Transactions</h5>
                <p className="mb-2">
                  New insider transactions are reflected in our report within 1-3 days. To view the latest insider transactions, simply go to the Recent Insider Transactions section.
                </p>
                <div className="surface-card border border-subtle p-4 rounded-lg bg-card">
                  <p className="text-sm text-secondary">
                    <strong>Note:</strong> We only capture the insider transactions done in the open market and private transactions (a.k.a off-market or negotiated transactions). This allows us to have a quick overview of the sentiments of the insiders as opposed to including non-open market transactions or those that are done automatically due to an exercise of derivatives/options. For more information about the Ownership section, please visit this link: <a href="https://support.simplywall.st/hc/en-us/articles/8787431138831-Understanding-The-Management-and-Ownership-Sections#Ownership-Section" target="_blank" rel="noreferrer" className="text-bullish hover:underline">Understanding The Management and Ownership Sections</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion id="markets-and-assets" title="What are the markets and assets available on the Finsang Terminal?">
        <div className="space-y-6 text-secondary">
          <div>
            <h4 className="text-xl font-bold text-primary mb-2">What markets do you cover?</h4>
            <p>
              The Finsang Terminal focuses exclusively on the <strong>Vietnamese Stock Market</strong>. We provide comprehensive access and analysis for companies listed on the major exchanges in Vietnam, including <strong>HOSE</strong>, <strong>HNX</strong>, and <strong>UPCOM</strong>. You can explore the complete list of stocks we cover by using the search function or the stock screener on our platform.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">What are ETFs and do you cover them?</h4>
            <p>
              Exchange Traded Funds (ETFs) are traded like a company on the exchange, but they are made up of a basket of investments (such as a group of companies or commodities). They are designed to provide diversification with the benefit of liquidity and easy trading.
            </p>
            <div className="surface-card border border-subtle p-4 rounded-lg mt-3 bg-card">
              <p className="text-sm text-secondary">
                <strong>Note:</strong> Currently, the Finsang Terminal is strictly focused on individual equities (stocks). We <strong>do not cover ETFs</strong>, as they do not fit into our fundamental company report analysis model.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">Do you cover REITs?</h4>
            <p>
              Real Estate Investment Trusts (REITs) or similar real estate funds are <strong>not currently covered</strong> on the platform. Our analysis model is specifically tailored for standard corporate equities and their financial statements.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">Do you cover mutual funds, bonds, or cryptocurrencies?</h4>
            <p>
              The Finsang Terminal is entirely focused on Vietnamese equities (stocks). Therefore, <strong>mutual funds, bonds (and other fixed-income securities), and cryptocurrencies are not covered</strong> on the platform. For the same reason, these assets cannot be added to your portfolio or watchlists.
            </p>
          </div>
        </div>
      </Accordion>

      <Accordion id="data-sources" title="Where do you source financial data?">
        <div className="space-y-6 text-secondary">
          <div>
            <h4 className="text-xl font-bold text-primary mb-2">Where does the Finsang Terminal source its financial data?</h4>
            <p className="mb-4">
              All of our data comes from reputable financial data providers and platforms in Vietnam, including <strong>Vietcap</strong>, <strong>Vietstock</strong> (<a href="https://finance.vietstock.vn/" target="_blank" rel="noreferrer" className="text-bullish hover:underline">finance.vietstock.vn</a>), and <strong>CafeF</strong>.
            </p>
            <p>
              This includes data on company fundamentals, management and governance, pricing, past financials, and future estimates from different brokers and analysts. Industry average and market average data is computed by the Finsang Terminal, with inputs from an aggregation of company data from these databases.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">How is the past financial data collected?</h4>
            <p className="mb-2">Our data providers collect data from:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Publicly Available Sources:</strong> Regulatory agencies (like the State Securities Commission of Vietnam - SSC), company websites, exchange websites (HOSE, HNX, UPCOM), and news agencies.</li>
              <li><strong>Direct Company Disclosures:</strong> Audited financial statements, quarterly reports, and annual reports published directly by the companies.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">How is the future consensus estimate data collected?</h4>
            <p>
              Our data providers and internal systems gather estimates from major Vietnamese securities firms and research institutions. We perform validation and accuracy checks to ensure consistency. Consensus estimates are created only with estimates on the same accounting basis (Vietnamese Accounting Standards - VAS).
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">How are estimates generated?</h4>
            <p className="mb-2">
              Data estimates are based on the consensus estimates from registered analysts covering a company. These estimates are crucial in various sections of our company analysis report:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Future Growth section:</strong> The estimates of the company's future expectations for revenue, cash flow, net income, and return on equity are used to calculate growth for the respective line items.</li>
              <li><strong>Valuation:</strong> Fair Value using the 2-Stage Discounted Cash Flow Model utilizes these estimates in the high-growth stage. Analyst Price Targets are also aggregated from these research reports to indicate where analysts foresee the stock price in the future.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">Who are the analysts covering a company?</h4>
            <p className="mb-2">
              These are analysts from reputable securities firms and investment banks operating in Vietnam. Some of the top contributors include:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Vietcap Securities</li>
              <li>SSI Securities</li>
              <li>VNDirect Securities</li>
              <li>HSC (Ho Chi Minh City Securities Corporation)</li>
              <li>MBS (MB Securities)</li>
            </ul>
            <div className="surface-card border border-subtle p-4 rounded-lg bg-card">
              <p className="text-sm text-secondary">
                <strong>Note:</strong> Analyst coverage varies from company to company. Large-cap companies (e.g., those in the VN30 index) typically have much more extensive analyst coverage compared to small-cap stocks.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">How are the professionals and ownership data collected?</h4>
            <p className="mb-2">We use a range of sources to collect professional and ownership data:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Regulatory Filings:</strong> Management reports, annual reports, and ownership disclosure filings submitted to the State Securities Commission of Vietnam (SSC) and stock exchanges (HOSE, HNX).</li>
              <li><strong>News Aggregators:</strong> Financial news portals like CafeF and Vietstock for corporate announcements, press releases, and insider transaction notifications.</li>
              <li><strong>Company websites:</strong> Information on the board of directors and management team is often profiled directly from the company's own website.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">How do I validate the reliability of information?</h4>
            <p>
              You may check our data against the company filings made available through regulatory bodies (SSC), the market exchange where your stock is listed (HOSE, HNX, UPCOM), or the investor relations section of company websites. We discourage validating information against unaudited sources or rumors on forums.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">What if I spot an error in the data?</h4>
            <p>
              Errors in our financial data often turn out to be a difference in calculation methodology. For example, our financial data is presented in 'trailing twelve months' (TTM) form as opposed to quarterly or annual which can be very out of date. If you do believe there is an error in our data, please send us an email at <a href="mailto:support@finsang.com" className="text-bullish hover:underline">support@finsang.com</a> and provide a source like an audited financial statement released by the company.
            </p>
          </div>
        </div>
      </Accordion>

      <Accordion id="data-differences" title="Your data is different from other reports and websites, why is that?">
        <div className="space-y-6 text-secondary">
          <div>
            <h4 className="text-xl font-bold text-primary mb-2">Why is the Dividend data in the Finsang Terminal different?</h4>
            <p>
              Dividend data presented in our reports is annualized. It depicts an estimate of the total dividend in one year. As a result, the value may differ from the actual dividend distributed by the company.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">What is considered an Insider transaction on Finsang Terminal?</h4>
            <p>
              Only insider transactions that are either Private (off-market or negotiated) or Open market (order matching) are included in our reports. We exclude transactions that are done automatically due to an exercise of derivatives/options or stock dividends.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">Why is the PE ratio and other Income Statement related figures on the Finsang Terminal different from other sites?</h4>
            <p className="mb-2">
              Finsang Terminal uses trailing twelve months or “TTM” data excluding extraordinary items for all of our past Income Statement related figures (e.g., revenue, expenses, income). The section below discusses what Trailing Twelve Month Data is and why it is used in the Finsang Terminal.
            </p>
            <p>
              If you find that the PE ratio or other valuation ratio differs from other sites (like CafeF or Vietstock), you can review the earnings data utilized by other sites and compare it to the Finsang Terminal. Other platforms might display annualized figures based on a single quarter, or they might not adjust for extraordinary, one-off items in the income statement.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">What is Trailing Twelve Month or “TTM” Data?</h4>
            <p className="mb-4">
              Trailing twelve months refers to a company’s financial data over the past 12 months and should not be confused with annual data which a company reports at the end of each accounting year. TTM numbers can be calculated at any point in time during a year unlike annual data, which is reported only once during a year. As a result, the numbers don’t necessarily coincide. However, when a company has just reported its full-year reports, the TTM calculation would be the same as its annual numbers.
            </p>
            <div className="bg-base p-6 rounded-xl border border-subtle mb-6 shadow-sm">
              <TTMDiagram />
            </div>

            <p className="mb-2">
              The example we have provided below should make it easy to understand how TTM data is calculated.
            </p>
            <div className="surface-card border border-subtle p-4 rounded-lg mb-4 bg-card">
              <p className="text-secondary">
                <strong>FPT Corporation (FPT)</strong> reported revenue of 13,000 billion VND in Q2 2023. Going back to the previous three quarters, the revenues reported for Q1 2023, Q4 2022, and Q3 2022 were 11,681 billion VND, 13,042 billion VND, and 11,148 billion VND, respectively. Adding up those numbers, we arrive at <strong>48,871 billion VND in TTM revenue</strong>. Using this TTM revenue we can measure the performance of FPT over a full year period (12 months).
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">Why is TTM used?</h4>
            <p className="mb-4">
              By looking at the trailing 12 months data, we are able to evaluate a company’s most recent performance over a longer period of time than just the quarterly performance. This way, investors and analysts can assess a company’s annualized performance instead of looking at the annual performance over the previous fiscal year, which usually contains old data.
            </p>
            <p className="mb-4">
              In our FPT example above, the TTM revenue of 48,871 billion VND is a better and more “current” measure of the company’s performance compared to the annual figure of 44,010 billion VND reported at the end of December 2022. Why is it better? While performing valuation analysis or looking at future growth projections (PE or PEG ratios for example), using old data from the annual report might not provide an accurate picture of the company’s health. Plus, TTM data is a more relevant comparison to long-term analyst estimates as analysts base their projections on the most recent data.
            </p>
            <p>
              By using TTM data, we would be acting on more recent and relevant information which would be helpful in taking more informed decisions related to any investments.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-primary mb-2">Are Finsang Terminal’s company reports based on TTM data?</h4>
            <p>
              Unless specified, all financial data reported on the Finsang Terminal are on a trailing twelve month or last twelve months (LTM) basis. The data generally gets updated every quarter when companies report their earnings.
            </p>
          </div>
        </div>
      </Accordion>
    </section>
  );
};
