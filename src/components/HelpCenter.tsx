import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, BookOpen, HelpCircle, Database, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

// Tooltip component for inline explanations
const Tooltip = ({ children, text }: { children: React.ReactNode, text: string }) => (
  <span className="relative group inline-block cursor-help border-b border-dashed border-gray-500 text-emerald-400 hover:text-emerald-300 transition-colors">
    {children}
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-[#1A1A1A] text-xs text-gray-200 rounded-lg shadow-xl border border-gray-700 z-50 font-sans leading-relaxed">
      {text}
      {/* Arrow */}
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]"></span>
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-700 mt-[1px] -z-10"></span>
    </span>
  </span>
);

// Accordion component for collapsible sections
const Accordion = ({ title, children, id }: { title: string, children: React.ReactNode, id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Open accordion if URL hash matches its ID
    const handleHashChange = () => {
      if (window.location.hash === `#${id}`) {
        setIsOpen(true);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for header
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [id]);

  return (
    <div id={id} className="border border-gray-800 rounded-xl mb-4 bg-[#111111] overflow-hidden transition-all duration-300 hover:border-gray-700">
      <button 
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none hover:bg-[#1A1A1A] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className={`p-1 rounded-full bg-gray-800/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 pt-0 border-t border-gray-800/50 text-gray-300 leading-relaxed bg-[#111111] mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export function HelpCenter({ ticker = "MBB" }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-[#050505] min-h-screen text-white p-4 md:p-8 font-sans pb-24">
      {/* Header & Search */}
      <div className="max-w-4xl mx-auto mb-12 text-center pt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">How can we help you analyze <span className="text-emerald-500">{ticker}</span>?</h1>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-[#111111] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg shadow-lg"
            placeholder="Search for articles, guides, or FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center text-sm text-gray-400 bg-[#111111] p-3 rounded-lg border border-gray-800 w-fit">
        <span className="hover:text-white cursor-pointer transition-colors flex items-center"><HelpCircle className="w-4 h-4 mr-2"/> Help Center</span>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
        <span className="hover:text-white cursor-pointer transition-colors">Company Analysis Report</span>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
        <span className="text-emerald-500 font-medium">Valuation</span>
      </div>

      {/* Grid Categories */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1">
          <div className="bg-emerald-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
            <BookOpen className="w-7 h-7 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-white">Analysis Guides</h3>
          <p className="text-sm text-gray-400 leading-relaxed">Detailed explanations of our 360° analysis model, metrics, and how to interpret the Snowflake.</p>
        </div>
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-1">
          <div className="bg-blue-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
            <Database className="w-7 h-7 text-blue-500" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-white">Data & Sources</h3>
          <p className="text-sm text-gray-400 leading-relaxed">Information about where we get our financial data, update frequencies, and calculation methodologies.</p>
        </div>
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:-translate-y-1">
          <div className="bg-purple-500/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
            <HelpCircle className="w-7 h-7 text-purple-500" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-white">FAQs</h3>
          <p className="text-sm text-gray-400 leading-relaxed">Frequently asked questions about Finsang Terminal features, account settings, and troubleshooting.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block col-span-1">
          <div className="sticky top-8 bg-[#111111] border border-gray-800 rounded-xl p-5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Table of Contents</h4>
            <ul className="space-y-4">
              <li>
                <a href="#guide-core-model" className="text-emerald-500 font-bold hover:text-emerald-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                  1. Company Analysis
                </a>
                <ul className="pl-3.5 mt-3 space-y-3 text-sm text-gray-400 border-l border-gray-800">
                  <li><a href="#understanding-valuation" className="hover:text-white transition-colors block pl-3 border-l-2 border-transparent hover:border-gray-500">Valuation</a></li>
                  <li><a href="#future-growth" className="hover:text-white transition-colors block pl-3 border-l-2 border-transparent hover:border-gray-500">Future Growth</a></li>
                  <li><a href="#past-performance" className="hover:text-white transition-colors block pl-3 border-l-2 border-transparent hover:border-gray-500">Past Performance</a></li>
                  <li><a href="#financial-health" className="hover:text-white transition-colors block pl-3 border-l-2 border-transparent hover:border-gray-500">Financial Health</a></li>
                  <li><a href="#dividend" className="hover:text-white transition-colors block pl-3 border-l-2 border-transparent hover:border-gray-500">Dividend</a></li>
                </ul>
              </li>
              <li className="pt-2">
                <a href="#faqs-data" className="text-white font-bold hover:text-blue-400 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                  2. FAQs & Data
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-1 lg:col-span-3 space-y-10">
          
          <section id="guide-core-model">
            <div className="flex items-center mb-6 pb-2 border-b border-gray-800">
              <div className="bg-emerald-500/10 p-2 rounded-lg mr-3">
                <BookOpen className="w-6 h-6 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Guide: Company Analysis Report</h2>
            </div>
            
            <Accordion id="the-core-model" title="The Core Model (Snowflake)">
              <p className="mb-4">
                The Finsang Terminal uses a visual model called the Snowflake to summarize a company's investment profile. It is based on the open-source <a href="https://github.com/SimplyWallSt/Company-Analysis-Model" target="_blank" rel="noreferrer" className="text-emerald-500 hover:text-emerald-400 font-medium hover:underline inline-flex items-center transition-colors">Simply Wall St Company Analysis Model <ExternalLink className="w-3.5 h-3.5 ml-1" /></a>.
              </p>
              <p className="mb-4">
                The Snowflake visually represents 5 key areas: <strong>Value, Future, Past, Health, and Dividend</strong>. The larger the snowflake stretches towards a specific axis, the better the company performs in that area based on our rigorous pass/fail checks.
              </p>
              <div className="bg-[#1A1A1A] p-4 rounded-lg border border-gray-800 mt-4">
                <h4 className="text-white font-medium mb-2 text-sm">Why use a visual model?</h4>
                <p className="text-sm text-gray-400">It allows investors to instantly grasp a company's strengths and weaknesses without digging through pages of financial statements initially. It acts as a powerful screening tool.</p>
              </div>
            </Accordion>

            <Accordion id="understanding-valuation" title="Valuation">
              <div className="space-y-8">
                {/* Overview */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">Overview: The Valuation Section</h4>
                  <p className="text-gray-400 leading-relaxed">
                    There are two main methods for valuing companies: <strong className="text-gray-200">relative</strong> and <strong className="text-gray-200">intrinsic</strong> valuation. Each approach has its advantages and limitations and gives a different view of the company's value. We use both methods, incorporating them into the checks that form the valuation arm of our snowflake.
                  </p>
                </div>

                {/* Intrinsic Valuation */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Intrinsic Valuation: Method, Data & Analysis</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Intrinsic valuation focuses on the company itself, and compares the current price to an estimate of fair value. Theoretically, the value of a company is the present value of all the future cash flows it can provide to shareholders. To get this value, the <Tooltip text="A valuation method used to estimate the value of an investment based on its expected future cash flows.">Discounted Cash Flow (DCF)</Tooltip> method is used.
                  </p>
                  
                  <div className="bg-[#1A1A1A] p-5 rounded-xl border border-gray-800 mb-6">
                    <h5 className="text-white font-bold mb-2">Share Price vs Fair Value Checks:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-gray-400">
                      <li>If the current price is lower than our fair value estimate, the company passes one check.</li>
                      <li>If the current price is 20% lower than our fair value estimate, the company passes two checks.</li>
                    </ul>
                  </div>

                  <h5 className="text-lg font-bold text-white mb-3">Which DCF method is used to calculate fair value?</h5>
                  <p className="text-gray-400 mb-4">We use 4 variations of DCF depending on the characteristics of a particular stock, such as its industry and data availability:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-emerald-400 font-bold mb-1">1. 2-Stage DCF Model</h6>
                      <p className="text-sm text-gray-400">Suitable for companies not expected to grow at a constant rate over time (high-growth initially, then stable).</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-blue-400 font-bold mb-1">2. Dividend Discount Model (DDM)</h6>
                      <p className="text-sm text-gray-400">Used when 2-stage DCF is not available. Suitable for companies that consistently pay out a meaningful portion of earnings as dividends.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-purple-400 font-bold mb-1">3. Excess Returns Model</h6>
                      <p className="text-sm text-gray-400">Used for financial companies (banks, insurance) which face different regulatory requirements for cash holdings.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-amber-400 font-bold mb-1">4. AFFO 2-Stage DCF Model</h6>
                      <p className="text-sm text-gray-400">Used for Real Estate Investment Trusts (REITs) using Adjusted-Funds-From-Operations instead of free cash flow.</p>
                    </div>
                  </div>

                  {/* Example Box */}
                  <div className="mt-6 bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-5">
                    <h6 className="text-emerald-400 font-bold mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Example Calculation: 2-Stage DCF (Microsoft - MSFT)
                    </h6>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong className="text-gray-200">1. High-Growth Stage:</strong> Present value of the next 10 years' free cash flows = <span className="text-white">$858,403M</span></p>
                      <p><strong className="text-gray-200">2. Stable-Growth Stage:</strong> Present value of Terminal Value (Gordon Growth formula) = <span className="text-white">$1,829,665M</span></p>
                      <p><strong className="text-gray-200">3. Total Equity Value:</strong> $858,403M + $1,829,665M = <span className="text-white">$2,688,068M</span></p>
                      <div className="pt-3 mt-3 border-t border-emerald-500/20">
                        <p><strong className="text-emerald-400">Fair Value per Share:</strong> Total Value / Shares Outstanding (7,430M) = <strong className="text-white text-base">$361.80</strong></p>
                        <p className="text-gray-400 mt-1 italic">If MSFT's current price is $312.79, it is 13.5% below fair value (Passes 1st check, but not the 20% discount check).</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Relative Valuation */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Relative Valuation: Metrics, Data & Analysis</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Relative Valuation is where we compare the company in question to other companies. We assess a company's relative valuation using three metrics:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-400 mb-6">
                    <li>Price-to-Earnings, Book, or Sales Ratio compared to its <strong className="text-gray-200">peers</strong>.</li>
                    <li>Price-to-Earnings, Book, or Sales Ratio compared to the <strong className="text-gray-200">industry</strong>.</li>
                    <li>Price-to-Earnings, Book, or Sales Ratio vs the <strong className="text-gray-200">Fair Ratio</strong>.</li>
                  </ul>

                  <h5 className="text-lg font-bold text-white mb-3">Selection of Preferred Multiple</h5>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded mr-3 mt-0.5">P/E</div>
                      <p className="text-gray-400 text-sm"><strong className="text-gray-200">Price to Earnings:</strong> Useful for companies that are profitable, and have a PE ratio below 150.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded mr-3 mt-0.5">P/S</div>
                      <p className="text-gray-400 text-sm"><strong className="text-gray-200">Price to Sales:</strong> Generally the next best option. Very high growth companies and those in earlier stages are best valued using Price to Sales.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded mr-3 mt-0.5">P/B</div>
                      <p className="text-gray-400 text-sm"><strong className="text-gray-200">Price to Book:</strong> Useful in particular for banks or other financial institutions for whom the value of their assets are particularly important.</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-[#1A1A1A] p-5 rounded-xl border border-gray-800">
                    <h5 className="text-white font-bold mb-2">What is the Fair Ratio?</h5>
                    <p className="text-sm text-gray-400">
                      The Fair Ratio is a model developed by us that estimates the Fair Ratio based on the company's growth and risk. It uses thousands of data points to determine the market's willingness to pay for growth given a specific level of risk, bridging the gap between relative and fundamental valuation.
                    </p>
                  </div>

                  {/* Example Box */}
                  <div className="mt-6 bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                    <h6 className="text-blue-400 font-bold mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Example: Relative Valuation (Microsoft - MSFT)
                    </h6>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 mr-2 flex-shrink-0"></span>
                        <p><strong className="text-gray-200">vs Peers:</strong> MSFT P/E is <span className="text-white">32.1x</span>. Peer average is <span className="text-white">29.9x</span>. <span className="text-red-400 font-medium">Fails check</span> (Higher than peers).</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 mr-2 flex-shrink-0"></span>
                        <p><strong className="text-gray-200">vs Industry:</strong> MSFT P/E is <span className="text-white">33.0x</span>. Industry average is <span className="text-white">43.5x</span>. <span className="text-emerald-400 font-medium">Passes check</span> (Lower than industry).</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 mr-2 flex-shrink-0"></span>
                        <p><strong className="text-gray-200">vs Fair Ratio:</strong> MSFT P/E is <span className="text-white">32.1x</span>. Estimated Fair P/E is <span className="text-white">65.0x</span>. <span className="text-emerald-400 font-medium">Passes check</span> (Lower than Fair Ratio).</p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Analysts Price Targets */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Analysts Price Targets</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Our final check in valuation is to assess what analysts think of a stock. This tells us whether there might be an upside opportunity, and if we should have confidence in that consensus price target.
                  </p>
                  <div className="bg-blue-900/10 border border-blue-500/30 p-5 rounded-xl">
                    <h5 className="text-blue-400 font-bold mb-2">What we check:</h5>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                      <li>The current share price must be at least <strong className="text-white">20% below the consensus price target</strong>.</li>
                      <li>The dispersion from the consensus must be <strong className="text-white">less than 15%</strong> (meaning analysts' expectations are largely the same, giving us "Good" confidence).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion id="future-growth" title="Future Growth">
              <p className="mb-4">
                Future growth estimates are aggregated from professional analysts covering the stock. We look at projected revenue, earnings, and <Tooltip text="Earnings Per Share: A company's net profit divided by the number of common shares it has outstanding.">Earnings per Share (EPS)</Tooltip> growth over the next 1 to 3 years.
              </p>
              <p>
                High growth expectations stretch the 'Future' axis of the Snowflake. We also compare these growth rates against the broader market and industry averages to provide context.
              </p>
            </Accordion>

            <Accordion id="past-performance" title="Past Performance">
              <p className="mb-4">
                We analyze historical data (typically up to 5 years) to assess the company's track record and management execution.
              </p>
              <p>
                This includes evaluating historical earnings growth, revenue growth, and the quality of earnings (e.g., ensuring reported profits are backed by actual operating cash flow, rather than just accounting adjustments).
              </p>
            </Accordion>

            <Accordion id="financial-health" title="Financial Health">
              <p className="mb-4">
                This section evaluates the company's balance sheet strength and its ability to withstand economic downturns.
              </p>
              <p>
                We check short-term and long-term solvency (assets vs. liabilities), debt-to-equity ratios, and whether the company's operating cash flow can comfortably cover its debt obligations (interest coverage).
              </p>
            </Accordion>

            <Accordion id="dividend" title="Dividend">
              <p className="mb-4">
                For dividend-paying stocks, we assess the current yield against the market's top 25% and bottom 25% payers.
              </p>
              <p>
                More importantly, we evaluate <strong>dividend sustainability</strong> by checking the payout ratio (percentage of earnings paid as dividends) and the cash payout ratio (percentage of free cash flow paid as dividends). A high yield is only valuable if the company can afford to keep paying it.
              </p>
            </Accordion>
          </section>

          <section id="faqs-data" className="pt-4">
            <div className="flex items-center mb-6 pb-2 border-b border-gray-800">
              <div className="bg-blue-500/10 p-2 rounded-lg mr-3">
                <Database className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">FAQs & Data Sources</h2>
            </div>

            <Accordion id="snowflake-logic" title="Snowflake Logic: How is it calculated?">
              <p className="mb-4">
                The Snowflake's shape and size are determined by 30 individual checks (6 for each of the 5 axes: Value, Future, Past, Health, Dividend). Each check is a simple Pass/Fail test. 
              </p>
              <p>
                For example, if a company passes 4 out of 6 checks for 'Value', the Value axis will stretch 4/6ths of the way to the edge. The overall color intensity (from red to green) also reflects the total score across all 30 checks.
              </p>
            </Accordion>

            <Accordion id="data-updates" title="When is data updated?">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0"></span>
                  <p><strong>Stock Prices:</strong> Updated in real-time or delayed by 15 minutes depending on the specific exchange regulations.</p>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0"></span>
                  <p><strong>Fundamental Data:</strong> Updated within 24 hours of a company officially publishing its quarterly or annual financial reports to the exchange.</p>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0"></span>
                  <p><strong>Analyst Estimates:</strong> Updated daily as new analyst reports and consensus figures are published.</p>
                </li>
              </ul>
            </Accordion>

            <Accordion id="data-sources" title="Where does the data come from?">
              <p className="mb-4">
                We aggregate data from multiple highly reliable sources to ensure accuracy:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Institutional Providers:</strong> Primary data feeds from Vietcap and S&P Global.</li>
                <li><strong>Direct Sourcing:</strong> We utilize proprietary scraping algorithms to gather and verify data directly from audited financial statements published by the companies.</li>
              </ul>
            </Accordion>

            <Accordion id="data-differences" title="Why is your data different from other sites?">
              <div className="bg-blue-900/10 border border-blue-500/30 rounded-xl p-5 mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <p className="text-blue-100 text-lg leading-relaxed font-medium">
                  "Finsang focuses on Trailing Twelve Months (TTM) data rather than single quarterly data to eliminate cyclicality. We use standardized algorithms from the Simply Wall St model to ensure objectivity."
                </p>
              </div>
              <p className="mb-4">
                Other platforms (like Cafef or Fireant) might display annualized figures based on a single quarter, or they might not adjust for extraordinary, one-off items in the income statement.
              </p>
              <p>
                Our TTM approach provides a smoother, more accurate picture of a company's ongoing operational performance by always looking at the most recent 12-month period, regardless of the fiscal year-end.
              </p>
            </Accordion>
          </section>

        </div>
      </div>
    </div>
  );
}
