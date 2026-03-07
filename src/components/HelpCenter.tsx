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
                  <li><a href="#management" className="hover:text-white transition-colors block pl-3 border-l-2 border-transparent hover:border-gray-500">Management</a></li>
                  <li><a href="#ownership" className="hover:text-white transition-colors block pl-3 border-l-2 border-transparent hover:border-gray-500">Ownership</a></li>
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
                  
                  <div className="grid grid-cols-1 gap-6">
                    {/* 1. 2-Stage DCF */}
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h6 className="text-emerald-400 font-bold mb-2 text-lg">1. 2-Stage Discounted Cash Flow Model</h6>
                      <p className="text-sm text-gray-400 mb-4">Suitable for companies not expected to grow at a constant rate over time (high-growth initially, then stable).</p>
                      <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-4">
                        <h6 className="text-emerald-400 font-bold mb-2 flex items-center text-sm">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Example Calculation (Microsoft - MSFT)
                        </h6>
                        <div className="space-y-2 text-xs text-gray-300">
                          <p><strong className="text-gray-200">High-Growth Stage:</strong> Present value of next 10 years' free cash flows = <span className="text-white">$858,403M</span></p>
                          <p><strong className="text-gray-200">Stable-Growth Stage:</strong> Present value of Terminal Value = <span className="text-white">$1,829,665M</span></p>
                          <p><strong className="text-gray-200">Total Equity Value:</strong> $858,403M + $1,829,665M = <span className="text-white">$2,688,068M</span></p>
                          <div className="pt-2 mt-2 border-t border-emerald-500/20">
                            <p><strong className="text-emerald-400">Fair Value per Share:</strong> $2,688,068M / 7,430M shares = <strong className="text-white">$361.80</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. DDM */}
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h6 className="text-blue-400 font-bold mb-2 text-lg">2. Dividend Discount Model (DDM)</h6>
                      <p className="text-sm text-gray-400 mb-4">Used when 2-stage DCF is not available. Suitable for companies that consistently pay out a meaningful portion of earnings as dividends. The Gordon Growth model is used to discount dividend payments.</p>
                      <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4">
                        <h6 className="text-blue-400 font-bold mb-2 flex items-center text-sm">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Example Calculation (BSE:530365)
                        </h6>
                        <div className="space-y-2 text-xs text-gray-300">
                          <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800">Value = Expected dividends per share / (Discount Rate - Perpetual Growth Rate)</p>
                          <p>Value = ₹1 / (17.80% - 6.76%) = <strong className="text-white text-sm">₹9.05</strong></p>
                        </div>
                      </div>
                    </div>

                    {/* 3. Excess Returns */}
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h6 className="text-purple-400 font-bold mb-2 text-lg">3. Excess Returns Model</h6>
                      <p className="text-sm text-gray-400 mb-4">Used for financial companies (banks, insurance) which face different regulatory requirements for cash holdings. The key assumption is that equity value is how much the firm can earn over and above its cost of equity.</p>
                      <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4">
                        <h6 className="text-purple-400 font-bold mb-2 flex items-center text-sm">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Example Calculation (Bank of America - BAC)
                        </h6>
                        <div className="space-y-2 text-xs text-gray-300">
                          <p><strong className="text-gray-200">1. Excess Returns:</strong> (9.8% ROE - 7.61% Cost of Equity) × $35.38 Book Value = <span className="text-white">$0.78</span></p>
                          <p><strong className="text-gray-200">2. Terminal Value of Excess Returns:</strong> $0.78 / (7.61% - 2.15%) = <span className="text-white">$14.26</span></p>
                          <div className="pt-2 mt-2 border-t border-purple-500/20">
                            <p><strong className="text-purple-400">Fair Value per Share:</strong> $35.38 (Book Value) + $14.26 = <strong className="text-white">$49.64</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. AFFO */}
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h6 className="text-amber-400 font-bold mb-2 text-lg">4. AFFO 2-Stage DCF Model</h6>
                      <p className="text-sm text-gray-400 mb-4">Used for Real Estate Investment Trusts (REITs). Instead of discounting free cash flows, we use Adjusted Funds from Operations (AFFO) which better reflects operational cash flows of property businesses.</p>
                      <div className="bg-amber-900/10 border border-amber-500/20 rounded-lg p-4">
                        <h6 className="text-amber-400 font-bold mb-2 flex items-center text-sm">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Example Calculation (American Tower - AMT)
                        </h6>
                        <div className="space-y-2 text-xs text-gray-300">
                          <p><strong className="text-gray-200">Total Equity Value:</strong> $48,026M (Next 10 yrs AFFO) + $102,511M (Terminal Value) = <span className="text-white">$150,536.66M</span></p>
                          <div className="pt-2 mt-2 border-t border-amber-500/20">
                            <p><strong className="text-amber-400">Fair Value per Share:</strong> $150,537M / 466M shares = <strong className="text-white">$322.93</strong></p>
                          </div>
                        </div>
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

                  <h5 className="text-lg font-bold text-white mb-3">Comparison to Peers & Industry</h5>
                  <p className="text-gray-400 text-sm mb-4">
                    <strong>Peers:</strong> Companies that are similar to each other (competitors, similar products, similar growth stage). If the company's multiple is below the peer average, it passes the check.<br/>
                    <strong>Industry:</strong> Comparing to the whole industry helps understand if the company sits in a niche valued higher or lower than the industry as a whole.
                  </p>

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
                    Our final check in valuation is to assess what analysts think of a stock. Analysts covering a company do extensive research and provide a price target—an indication of where they think the stock price could be trading in the future.
                  </p>
                  
                  <div className="bg-blue-900/10 border border-blue-500/30 p-5 rounded-xl mb-6">
                    <h5 className="text-blue-400 font-bold mb-2">What we check:</h5>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
                      <li>The current share price must be at least <strong className="text-white">20% below the consensus price target</strong> (indicates decent upside opportunity).</li>
                      <li>The dispersion from the consensus must be <strong className="text-white">less than 15%</strong> (meaning analysts' expectations are largely the same).</li>
                    </ul>
                  </div>

                  <h5 className="text-lg font-bold text-white mb-3">Understanding the Price Target Chart</h5>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-3 flex-shrink-0"></span>
                      <p><strong className="text-gray-200">Blue Line:</strong> Represents the stock's historical share price over the past 2 years.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-3 flex-shrink-0"></span>
                      <p><strong className="text-gray-200">Purple Line/Dot:</strong> Represents the consensus price target (average of all analysts' targets looking forward 1 year).</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-gray-500 mt-1.5 mr-3 flex-shrink-0"></span>
                      <p><strong className="text-gray-200">Shaded Area:</strong> Represents the range of price targets from highest to lowest. It is <strong className="text-emerald-400">Green</strong> if the stock was at a &gt;20% discount to the consensus, and <strong className="text-red-400">Red</strong> if trading at less than a 20% discount.</p>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-3 flex-shrink-0"></span>
                      <p><strong className="text-gray-200">Confidence (Good/Low):</strong> "Good" if the lowest and highest estimates are within 15% of the consensus. "Low" if they are more than 15% away (analysts don't agree).</p>
                    </li>
                  </ul>
                </div>
              </div>
            </Accordion>

            <Accordion id="future-growth" title="Future Growth">
              <div className="space-y-8">
                {/* Overview */}
                <div>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    The Future Growth section examines professional analyst estimates of a company’s future expectations for revenue, cash flow, net income, and return on equity. Historically, analyst estimates, on average, are relatively accurate over the short term.
                  </p>
                  <div className="bg-indigo-900/10 border border-indigo-500/30 p-5 rounded-xl">
                    <h5 className="text-indigo-400 font-bold mb-3">6 Key Metrics Contributing to the Snowflake Score:</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="bg-[#111111] border border-gray-800 p-3 rounded-lg text-sm text-gray-300 text-center">Earnings vs Savings Rate</div>
                      <div className="bg-[#111111] border border-gray-800 p-3 rounded-lg text-sm text-gray-300 text-center">Earnings vs Market</div>
                      <div className="bg-[#111111] border border-gray-800 p-3 rounded-lg text-sm text-gray-300 text-center">High Growth Earnings</div>
                      <div className="bg-[#111111] border border-gray-800 p-3 rounded-lg text-sm text-gray-300 text-center">Revenue vs Market</div>
                      <div className="bg-[#111111] border border-gray-800 p-3 rounded-lg text-sm text-gray-300 text-center">High Growth Revenue</div>
                      <div className="bg-[#111111] border border-gray-800 p-3 rounded-lg text-sm text-gray-300 text-center">Future ROE</div>
                    </div>
                  </div>
                </div>

                {/* How do we Calculate Growth Rates? */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">How do we Calculate Growth Rates?</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    When a company is covered by analysts, we rely on the consensus of their estimates to calculate its future growth rate. These analysts come from independent research firms, investment banks, and brokers.
                  </p>
                  <div className="bg-[#1A1A1A] p-5 rounded-xl border border-gray-800">
                    <h5 className="text-white font-bold mb-2">Weighted Best-Fit Line</h5>
                    <p className="text-sm text-gray-400">
                      We plot a best-fit line through each estimate to determine the slope (growth rate). We assign <strong className="text-gray-200">higher weight to the years with more analyst coverage</strong>. For example, if FY2025 has 49 analysts and FY2026 has 5, the FY2025 estimates are weighted more heavily. The initial data point is derived from the most recent earnings release and is given a weight of one.
                    </p>
                  </div>
                </div>

                {/* Earnings and Revenue Growth Forecasts */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Earnings and Revenue Growth Forecasts</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    These forecasts shed light on the trajectory of financial health, aiding in assessing potential returns, liquidity, and operational efficiency.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-emerald-400 font-bold mb-1">1. Revenue</h6>
                      <p className="text-sm text-gray-400">What the business generates from its sales or services, reflecting its top-line financial performance.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-blue-400 font-bold mb-1">2. Earnings</h6>
                      <p className="text-sm text-gray-400">The net profit or income remaining after subtracting all expenses, reflecting financial success.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-purple-400 font-bold mb-1">3. Free Cash Flow</h6>
                      <p className="text-sm text-gray-400">Surplus cash generated after covering operating expenses and capital expenditures. Indicates ability to invest, grow, or return value.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-amber-400 font-bold mb-1">4. Cash from Operations</h6>
                      <p className="text-sm text-gray-400">Cash generated from core business activities, providing insight into liquidity and operational strength.</p>
                    </div>
                  </div>
                </div>

                {/* Analyst Future Growth Forecast (The 5 Checks) */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Analyst Future Growth Forecast</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    This is where the majority of the metrics contributing to the snowflake score are checked. We evaluate future prospects by comparing earnings and revenue growth to relevant benchmarks.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Check 1 */}
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check 1</span>
                        <h6 className="text-white font-bold">Earnings vs Savings Rate</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">Measures whether expected earnings growth at least matches the low-risk savings rate plus inflation. If not, a low-risk savings product might be more rational.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Average annual earnings growth &gt; (savings rate + inflation).</li>
                        <li><strong className="text-emerald-400">Pass:</strong> Company is expected to become profitable in the next 5 years.</li>
                      </ul>
                    </div>

                    {/* Check 2 */}
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check 2</span>
                        <h6 className="text-white font-bold">Earnings vs Market</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">Measures whether the company is expected to grow earnings faster than the average stock in its listed market.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Average annual earnings growth &gt; weighted average earnings growth of the market.</li>
                      </ul>
                    </div>

                    {/* Check 3 */}
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check 3</span>
                        <h6 className="text-white font-bold">High Growth Earnings</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">Identifies high-growth companies. Earnings growth indicates ability to grow profitability, fundamentally impacting valuation.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Average annual earnings growth &gt; 20%.</li>
                      </ul>
                    </div>

                    {/* Check 4 */}
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check 4</span>
                        <h6 className="text-white font-bold">Revenue vs Market</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">Measures whether the company is expected to grow revenue faster than the average stock in its listed market.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Average annual revenue growth &gt; weighted average revenue growth of the market.</li>
                      </ul>
                    </div>

                    {/* Check 5 */}
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check 5</span>
                        <h6 className="text-white font-bold">High Growth Revenue</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">Revenue growth is a pure measure of growth (harder to manipulate). It shows operational expansion (increasing prices, market share, or new products).</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Average annual revenue growth &gt; 20%.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Earnings Per Share & Future ROE */}
                <div className="border-t border-gray-800 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Earnings Per Share (EPS)</h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      EPS highlights how well a company sustains earnings relative to outstanding shares. It measures the absolute profit earned on a per-share basis. As a common base, it allows comparison across companies and industries, and is used in the P/E Ratio.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3">Future Return On Equity (ROE)</h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      Evaluates future profitability in terms of shareholders' funds. It indicates efficiency in using shareholders' equity to generate profits.
                    </p>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check 6</span>
                        <h6 className="text-white font-bold text-sm">Future ROE</h6>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Estimated ROE in 3 years' time &gt; 20%.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion id="past-performance" title="Past Performance">
              <div className="space-y-8">
                {/* How are financial data presented */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">How are financial data presented?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h5 className="text-emerald-400 font-bold mb-2">Trailing Twelve Month (TTM) Data</h5>
                      <p className="text-sm text-gray-400">
                        We use TTM data instead of quarterly data. TTM refers to a company's financial data over the past 12 months, allowing evaluation of the most recent annualized performance rather than waiting for the fiscal year-end report.
                      </p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2">GAAP Earnings</h5>
                      <p className="text-sm text-gray-400">
                        We use unadjusted or GAAP (Generally Accepted Accounting Principles) EPS across the company report and articles to maintain accuracy and uniform comparison across companies.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Overview: Past Earnings Performance Analysis */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Overview: Past Earnings Performance Analysis</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Highlights consistent earnings growth, revenue increase, and strong return on equity and net profit margins.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-white font-bold mb-1">Earnings & EPS Growth Rate</h6>
                      <p className="text-sm text-gray-400">Annualized growth rate considering historical data over 5-year, 3-year, and 1-year periods, calculated using a "line of best fit".</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-white font-bold mb-1">Industry Growth Rate</h6>
                      <p className="text-sm text-gray-400">Annualized earnings growth rate of the company's industry. Comparing a company's growth rate to the industry average provides insights into its relative performance.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-white font-bold mb-1">Return on Equity (ROE)</h6>
                      <p className="text-sm text-gray-400 mb-2">Measures how effectively management has used shareholder funds to generate profits.</p>
                      <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">ROE = Net Income / Total Equity</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                      <h6 className="text-white font-bold mb-1">Net Margin</h6>
                      <p className="text-sm text-gray-400 mb-2">The ratio of net profit to total revenue. Indicates the percentage of profit earned per unit of revenue.</p>
                      <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Net Margin = Net Income / Revenue</p>
                    </div>
                  </div>
                </div>

                {/* Revenue & Expenses Breakdown */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Revenue & Expenses Breakdown</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    A comprehensive overview of how the company both makes and spends money over the last twelve months (LTM).
                  </p>
                  <div className="bg-[#1A1A1A] p-5 rounded-xl border border-gray-800 space-y-3">
                    <div className="flex flex-col md:flex-row md:items-start gap-2">
                      <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded md:w-32 flex-shrink-0">Revenue</div>
                      <p className="text-sm text-gray-400">Total amount of sales or services generated.</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start gap-2">
                      <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded md:w-32 flex-shrink-0">Cost of Sales</div>
                      <p className="text-sm text-gray-400">Direct expenses incurred in production or delivery.</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start gap-2">
                      <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded md:w-32 flex-shrink-0">Gross Profit</div>
                      <p className="text-sm text-gray-400">Revenue minus cost of sales (core profitability before operating expenses).</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-start gap-2">
                      <div className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded md:w-32 flex-shrink-0">Expenses</div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <p><strong className="text-gray-300">General & Admin:</strong> Overhead costs essential for running the business.</p>
                        <p><strong className="text-gray-300">Sales & Marketing:</strong> Costs related to promoting and selling.</p>
                        <p><strong className="text-gray-300">R&D:</strong> Financial outlay for innovating or improving products.</p>
                        <p><strong className="text-gray-300">Non-Operating:</strong> Costs unrelated to primary operations.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Earnings & Revenue History */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Earnings & Revenue History</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Tracks fluctuations and trends in key financial metrics over time.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Quality of Earnings</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Evaluates if unusual items significantly impact financial performance.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Unusual items &lt; 20% of Earnings Before Tax (EBT) OR accruals ratio &lt; 20%.</li>
                      </ul>
                    </div>

                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Growing Profit Margin</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Assesses whether net profit margins have increased compared to the previous year.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Current year net profit margin &gt; previous year.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Free Cash Flow vs Earnings Analysis */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Free Cash Flow vs Earnings Analysis</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Breaks down the factors that impact a company's free cash flow (funds remaining after accounting for necessary expenses and investments).
                  </p>
                  <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                    <p className="text-sm text-gray-300 mb-3">The following are added/deducted to Earnings to arrive at Free Cash Flow:</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                      <li><strong className="text-gray-200">Depreciation and Amortization:</strong> Non-cash expenses added back.</li>
                      <li><strong className="text-gray-200">Stock-Based Compensation:</strong> Non-cash expense added back.</li>
                      <li><strong className="text-gray-200">Net Working Capital Changes:</strong> Fluctuations in working capital.</li>
                      <li><strong className="text-gray-200">Others:</strong> Additional adjustments like capital expenditures, gain/loss on sale of investments.</li>
                    </ul>
                  </div>
                </div>

                {/* Past Earnings Growth Analysis */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Past Earnings Growth Analysis</h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Provides insights into 5-year and 1-year earnings growth, and performance relative to industry and market.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Earnings Trend</h6>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Current year earnings &gt; earnings from 5 years ago.</li>
                      </ul>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Accelerating Growth</h6>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Current year earnings growth &gt; average annual growth over the past 5 years.</li>
                      </ul>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Earnings vs. Industry</h6>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Company's earnings growth &gt; relevant industry average earnings growth.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Return on Equity, ROA, ROCE */}
                <div className="border-t border-gray-800 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                    <h6 className="text-white font-bold mb-2">Return on Equity (ROE)</h6>
                    <p className="text-sm text-gray-400 mb-3">A high ROE suggests strong return on shareholders' equity.</p>
                    <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-3">
                      <p className="text-xs text-gray-300"><strong className="text-emerald-400">Check Pass:</strong> Current year ROE &gt; 20%.</p>
                    </div>
                  </div>
                  <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                    <h6 className="text-white font-bold mb-2">Return on Assets (ROA)</h6>
                    <p className="text-sm text-gray-400 mb-3">Measures how efficiently earnings are generated from total assets.</p>
                    <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">(Net Income - Net Interest Expense) / Total Assets</p>
                  </div>
                  <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                    <h6 className="text-white font-bold mb-2">Return on Capital Employed (ROCE)</h6>
                    <p className="text-sm text-gray-400 mb-3">Profitability in terms of total capital employed (equity + long-term liabilities).</p>
                    <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">EBIT / (Total Assets - Current Liabilities)</p>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion id="financial-health" title="Financial Health">
              <div className="space-y-8">
                {/* Overview */}
                <div>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    The Financial Health section focuses on examining the company's balance sheet to analyze its financial position and liquidity. We have separate metrics and analyses done on companies broadly categorized as <strong className="text-gray-200">Non-financial Institutions</strong> and <strong className="text-gray-200">Financial Institutions</strong>.
                  </p>
                </div>

                {/* --- NON-FINANCIAL INSTITUTIONS --- */}
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="bg-blue-900/30 text-blue-400 p-2 rounded-lg mr-3">
                      <Activity className="w-5 h-5" />
                    </span>
                    Analysis for Non-Financial Institutions
                  </h3>

                  {/* Key Information */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3">Key Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                        <h5 className="text-blue-400 font-bold mb-2">Debt-to-Equity Ratio</h5>
                        <p className="text-sm text-gray-400 mb-2">Shows the proportion of money a company borrows compared to the money invested by shareholders. Assesses financial risk.</p>
                        <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Debt / Equity</p>
                        <p className="text-xs text-gray-500 mt-2">Debt = Short-Term Borrowings + Current Portion of Long-Term Debt + Long-Term Debt</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                        <h5 className="text-blue-400 font-bold mb-2">Interest Coverage Ratio</h5>
                        <p className="text-sm text-gray-400 mb-2">Indicates how well a company can cover its interest payments using its operating income. Higher ratio = lower risk of default.</p>
                        <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Operating Income (EBIT) / Net Interest Expense</p>
                      </div>
                    </div>
                  </div>

                  {/* Financial Position Analysis */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3">Financial Position Analysis</h4>
                    <p className="text-sm text-gray-400 mb-4">Categorizes assets and liabilities into short-term and long-term to gauge overall financial stability.</p>
                    <div className="space-y-4">
                      <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                        <div className="flex items-center mb-2">
                          <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                          <h6 className="text-white font-bold">Short-Term Liabilities</h6>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Measures whether the company has a net positive financial position within 12 months.</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                          <li><strong className="text-emerald-400">Pass:</strong> Short-term assets &gt; Short-term liabilities.</li>
                        </ul>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                        <div className="flex items-center mb-2">
                          <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                          <h6 className="text-white font-bold">Long-Term Liabilities</h6>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Measures whether short-term assets can cover long-term (12+ months) liabilities.</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                          <li><strong className="text-emerald-400">Pass:</strong> Short-term assets &gt; Long-term liabilities.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Debt to Equity History and Analysis */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3">Debt to Equity History and Analysis</h4>
                    <p className="text-sm text-gray-400 mb-4">Evaluates financial soundness through various debt-related metrics.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Debt Level</h6>
                        <p className="text-xs text-gray-400">Pass if Debt to Equity ratio &lt; 40%.</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Reducing Debt</h6>
                        <p className="text-xs text-gray-400">Pass if the ratio has not increased or has fallen over 5 years.</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Debt Coverage</h6>
                        <p className="text-xs text-gray-400">Pass if Operating Cash Flows &gt; 20% of Total Debt.</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Interest Coverage</h6>
                        <p className="text-xs text-gray-400">Pass if EBIT &gt; 5x interest on debt.</p>
                      </div>
                    </div>
                  </div>

                  {/* Cash Runway Analysis */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3">Cash Runway Analysis (For Loss-Making Companies)</h4>
                    <p className="text-sm text-gray-400 mb-4">Replaces the Debt Level and Reducing Debt checks for companies with negative free cash flow.</p>
                    <div className="space-y-4">
                      <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                        <div className="flex items-center mb-2">
                          <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                          <h6 className="text-white font-bold">Stable Cash Runway</h6>
                        </div>
                        <p className="text-sm text-gray-400">Pass if cash/liquid assets cover negative free cash flow over the next year (assuming stable rate).</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                        <div className="flex items-center mb-2">
                          <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                          <h6 className="text-white font-bold">Forecast Cash Runway</h6>
                        </div>
                        <p className="text-sm text-gray-400">Pass if cash/liquid assets cover negative free cash flow over the next year (assuming historical growth/shrink rate).</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Balance Sheet Terminologies */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Balance Sheet Terminologies</h4>
                    <div className="bg-[#1A1A1A] p-5 rounded-xl border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div><strong className="text-gray-200 text-sm block">Receivables</strong><span className="text-xs text-gray-400">Owed by customers for goods/services on credit.</span></div>
                      <div><strong className="text-gray-200 text-sm block">Inventory</strong><span className="text-xs text-gray-400">Goods held for sale or production.</span></div>
                      <div><strong className="text-gray-200 text-sm block">Cash & Short-Term Inv.</strong><span className="text-xs text-gray-400">Funds and easily convertible assets.</span></div>
                      <div><strong className="text-gray-200 text-sm block">Physical Assets</strong><span className="text-xs text-gray-400">Tangible assets (land, buildings, equipment).</span></div>
                      <div><strong className="text-gray-200 text-sm block">Accounts Payable</strong><span className="text-xs text-gray-400">Amounts owed to suppliers/creditors.</span></div>
                      <div><strong className="text-gray-200 text-sm block">Debt</strong><span className="text-xs text-gray-400">Borrowed funds owed to lenders/bondholders.</span></div>
                      <div><strong className="text-gray-200 text-sm block">Equity</strong><span className="text-xs text-gray-400">Residual interest in assets after deducting liabilities.</span></div>
                    </div>
                  </div>
                </div>

                {/* --- FINANCIAL INSTITUTIONS --- */}
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="bg-purple-900/30 text-purple-400 p-2 rounded-lg mr-3">
                      <Shield className="w-5 h-5" />
                    </span>
                    Analysis for Financial Institutions
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Financial Institutions (Banks, Financial Services, REITs, Insurance) borrow the majority of their funding. Conventional debt measures don't apply, so we use a separate series of health checks.
                  </p>

                  {/* Financial Institution Checks */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-white mb-3">Health Checks</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Asset Level</h6>
                        <p className="text-xs text-gray-400">Leverage (Assets to Equity) &lt; 20x.</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Allowance for Bad Loans</h6>
                        <p className="text-xs text-gray-400">Provision for bad loans &gt; actual bad debts written off.</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Low Risk Liabilities</h6>
                        <p className="text-xs text-gray-400">Total deposits &gt; 50% of total liabilities.</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Loan Level</h6>
                        <p className="text-xs text-gray-400">Net loans &lt; 110% of total assets.</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Low Risk Deposits</h6>
                        <p className="text-xs text-gray-400">Total loans &lt; 125% of total deposits.</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                        <h6 className="text-white font-bold mb-1 text-sm"><span className="text-emerald-400 mr-2">✓</span>Level of Bad Loans</h6>
                        <p className="text-xs text-gray-400">Net Charge Off Ratio &lt; 3%.</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Information Overview */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">Key Information Overview</h4>
                    <div className="space-y-4">
                      <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                        <h5 className="text-purple-400 font-bold mb-2">Asset to Equity Ratio</h5>
                        <p className="text-sm text-gray-400 mb-2">Represents how much operations are funded by debt vs equity. Higher ratio = greater debt financing.</p>
                        <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Total Assets / Total Equity</p>
                      </div>
                      <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                        <h5 className="text-purple-400 font-bold mb-2">Net Interest Margin</h5>
                        <p className="text-sm text-gray-400 mb-2">Difference between interest income earned and interest expenses paid. Higher margin implies efficient use of investments.</p>
                        <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">(Interest Income - Interest Expense) / Average Earning Assets</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                          <h5 className="text-purple-400 font-bold mb-2">Loan to Deposits Ratio</h5>
                          <p className="text-sm text-gray-400 mb-2">Measures liquidity. If too high, bank might lack liquidity for unforeseen funding.</p>
                          <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Loans / Deposits</p>
                        </div>
                        <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                          <h5 className="text-purple-400 font-bold mb-2">Bad Loans (%)</h5>
                          <p className="text-sm text-gray-400 mb-2">Loans unlikely to be repaid, leading to higher loan loss provisions.</p>
                          <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Non-Performing Loans / Loans</p>
                        </div>
                        <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                          <h5 className="text-purple-400 font-bold mb-2">Allowance for Bad Loans (%)</h5>
                          <p className="text-sm text-gray-400 mb-2">Reserve for possible future losses. High ratio (&gt;100%) means bank can withstand losses better.</p>
                          <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Loan Loss Reserve / Non-Performing Loans</p>
                        </div>
                        <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                          <h5 className="text-purple-400 font-bold mb-2">Current Ratio</h5>
                          <p className="text-sm text-gray-400 mb-2">Ability to meet short-term obligations. Value &gt; 1 is considered good.</p>
                          <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Current Assets / Current Liabilities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion id="dividend" title="Dividend">
              <div className="space-y-8">
                {/* Overview */}
                <div>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    The Dividend section provides an analysis of a company's dividend payments to its shareholders. It analyses the dividend payment in terms of its dividend yield against other dividend payers, as well as its stability, reliability, and sustainability.
                  </p>
                </div>

                {/* Key Information */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Key Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2">Dividend Yield</h5>
                      <p className="text-sm text-gray-400 mb-2">The estimated annual dividend income a shareholder could earn from every dollar invested in a stock.</p>
                      <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Annualized Dividend Per Share / Latest End-Of-Day Price</p>
                      <p className="text-xs text-gray-500 mt-2">Example: NYSE:XOM had an Annualized Dividend of $3.64 and price of $115.83, resulting in a 3.1% yield.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2">Payout Ratio</h5>
                      <p className="text-sm text-gray-400 mb-2">The percentage of a company's earnings distributed to shareholders as cash dividends.</p>
                      <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Annualized Dividend Per Share / TTM Earnings Per Share</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2">Industry Average Yield</h5>
                      <p className="text-sm text-gray-400">The average of the dividend yields of all the companies in a given industry.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2">Dividend Per Share</h5>
                      <p className="text-sm text-gray-400">The Annualized Dividend Per Share which is an estimation of total dividend in 1 year time.</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#1A1A1A] p-4 rounded-lg border border-gray-800">
                      <h6 className="text-gray-200 text-sm font-bold mb-1">Next dividend pay date</h6>
                      <p className="text-xs text-gray-400">The nearest upcoming dividend pay date.</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-lg border border-gray-800">
                      <h6 className="text-gray-200 text-sm font-bold mb-1">Ex-dividend date</h6>
                      <p className="text-xs text-gray-400">Date when a stock starts trading without the right to receive the next dividend payment.</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-lg border border-gray-800">
                      <h6 className="text-gray-200 text-sm font-bold mb-1">Dividend Yield Forecast in 3Y</h6>
                      <p className="text-xs text-gray-400">Forecasted annualized dividend yield in 3 years from analysts.</p>
                    </div>
                  </div>
                </div>

                {/* Stability and Growth of Payments */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Stability and Growth of Payments</h4>
                  <div className="space-y-4">
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Stable Dividend</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Checks historical dividend per share payments taking into account time intervals.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> No significant drop in Dividend Per share payments in the past 10 years.</li>
                        <li><span className="text-gray-500">Flags: Drop &gt; 20% (1yr gap), &gt; 10% (6mo gap), &gt; 30% (18mo gap).</span></li>
                      </ul>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Growing Dividend</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Compares current annualized dividend to the amount paid 10 years ago.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Current annualized dividend &gt; annual dividend 10 years ago (must have paid for 10+ years).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dividend VS Market */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Company's Dividend Yield VS Market</h4>
                  <div className="space-y-4">
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Notable Dividend</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Checks if the dividend is greater than the bottom 10% and bottom 25% of companies in the market.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Dividend &gt; bottom 25% of market. (Fails all checks if &lt; bottom 10%).</li>
                      </ul>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">High Dividend Yield</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Checks if the dividend yield is higher compared to the top 25% of the market.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Dividend yield &gt; top 25% of the market.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Earnings & Cash Payout */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Payout to Shareholders</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Earnings Coverage</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Checks if the company’s dividend is well covered by its earnings.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300 mb-3">
                        <li><strong className="text-emerald-400">Pass:</strong> Earnings payout ratio is between 0% and 90% (100% for REITs).</li>
                      </ul>
                      <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Annualized Dividend / TTM EPS</p>
                      <p className="text-xs text-gray-500 mt-2">For REITs: Total Cash Dividend / Total Funds From Operations (FFO)</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Cash Flow Coverage</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Checks if the dividend is well covered by Free Cash Flow from the last twelve months.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300 mb-3">
                        <li><strong className="text-emerald-400">Pass:</strong> Cash payout ratio is between 0% and 90% (100% for REITs).</li>
                      </ul>
                      <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Total LTM Cash Dividend / LTM Free Cash Flow</p>
                    </div>
                  </div>
                </div>

                {/* How do we Calculate the Annualized Dividend? */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Calculating the Annualized Dividend</h4>
                  <p className="text-sm text-gray-400 mb-4">The annualized dividend represents an estimation of total dividend in 1 year time. It is usually calculated by multiplying the frequency of regular dividend payments.</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-bold text-gray-200 mb-3">Based on Frequency of Payment</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#1A1A1A] p-4 rounded-lg border border-gray-800">
                          <h6 className="text-white font-bold mb-1">Quarterly Dividends</h6>
                          <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300 mb-2">Latest DPS × 4</p>
                          <p className="text-xs text-gray-400">If consistent trend over past 2 years.</p>
                        </div>
                        <div className="bg-[#1A1A1A] p-4 rounded-lg border border-gray-800">
                          <h6 className="text-white font-bold mb-1">Semi-Annual Dividends</h6>
                          <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300 mb-2">Latest DPS × 2</p>
                          <p className="text-xs text-gray-400">If consistent trend over past 2 years.</p>
                        </div>
                        <div className="bg-[#1A1A1A] p-4 rounded-lg border border-gray-800">
                          <h6 className="text-white font-bold mb-1">Annual Dividends</h6>
                          <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300 mb-2">Latest actual DPS</p>
                          <p className="text-xs text-gray-400">Adopted as the annualized data.</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-gray-200 mb-3">Special Cases</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                          <h6 className="text-white font-bold mb-1 text-sm">As Reported</h6>
                          <p className="text-xs text-gray-400">If the company explicitly reports an annualized/forecasted dividend value, that value is used.</p>
                        </div>
                        <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                          <h6 className="text-white font-bold mb-1 text-sm">Irregular Dividends</h6>
                          <p className="text-xs text-gray-400">If no consistent pattern in the last 2 years, the total dividend declared for the latest annual financial period is used.</p>
                        </div>
                        <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                          <h6 className="text-white font-bold mb-1 text-sm">Special Dividends</h6>
                          <p className="text-xs text-gray-400">If paid for two years in a row, it is considered recurring and included in the calculation.</p>
                        </div>
                        <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg">
                          <h6 className="text-white font-bold mb-1 text-sm">Suspended/Canceled</h6>
                          <p className="text-xs text-gray-400">Automatically zero from the filing date of suspension until a new dividend pattern is filed.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2">Fallback Dividend Yield Calculation</h5>
                      <p className="text-sm text-gray-300 mb-3">Used when annualized dividend data is unavailable but actual dividends were paid over the last 12 months (LTM).</p>
                      <p className="font-mono bg-[#050505] p-2 rounded border border-gray-800 text-xs text-gray-300">Dividend Yield = LTM Dividend Payments / Current Share Price</p>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion id="management" title="Management">
              <div className="space-y-8">
                {/* Overview */}
                <div>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    The management section does not contribute any scores in the Snowflake and therefore does not affect the color or shape of it. However, we still do some checks as a complimentary analysis. We check whether the CEO's total compensation is reasonable when compared to similar-sized companies in the market and in relation to the company's performance.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    In addition, we analyze the experience level of both the management team and the board members by examining their average tenure to gauge the depth of knowledge and expertise within the company's leadership.
                  </p>
                </div>

                {/* Key Information */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Key Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2 text-sm">Total Compensation</h5>
                      <p className="text-xs text-gray-400">Sum of all forms of payments and benefits received by the CEO (salary, bonus, stock options, perks).</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2 text-sm">CEO Salary Percentage</h5>
                      <p className="text-xs text-gray-400">Percentage of total compensation allocated toward salary (paid regardless of performance).</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2 text-sm">CEO Tenure</h5>
                      <p className="text-xs text-gray-400">Length of time the CEO has been in their current role.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2 text-sm">CEO Ownership</h5>
                      <p className="text-xs text-gray-400">Percentage of shares owned by the CEO, indicating personal investment and alignment with shareholders.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2 text-sm">Management Average Tenure</h5>
                      <p className="text-xs text-gray-400">Average length of time the members of the management team have been in their roles.</p>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl">
                      <h5 className="text-blue-400 font-bold mb-2 text-sm">Board Average Tenure</h5>
                      <p className="text-xs text-gray-400">Average length of time that members of the board of directors have served on the board.</p>
                    </div>
                  </div>
                </div>

                {/* CEO Compensation Analysis */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">CEO Compensation Analysis</h4>
                  <div className="space-y-4">
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Compensation vs Market</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Compares CEO pay to the median of similar-sized companies.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> CEO's total compensation is not above the median average.</li>
                        <li><span className="text-gray-500">Flags: Fails if paid 30% or more above the median pay.</span></li>
                      </ul>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Compensation vs Earnings</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Evaluates CEO compensation in relation to the company's performance.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Compensation is aligned with earnings growth.</li>
                        <li><span className="text-gray-500">Flags: Fails if loss-making and compensation increased, or if compensation increased by &gt; 20% regardless of earnings growth.</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Team Experience */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Leadership & Board Experience</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Management Team Experience</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Analyzes the experience level of the company's management team.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Median average tenure of the management team is &ge; 2 years.</li>
                      </ul>
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                      <div className="flex items-center mb-2">
                        <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                        <h6 className="text-white font-bold">Board Member Experience</h6>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Analyzes the experience level of the company's board members.</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                        <li><strong className="text-emerald-400">Pass:</strong> Median average tenure of the Board of Directors is &ge; 3 years.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion id="ownership" title="Ownership">
              <div className="space-y-8">
                {/* Overview */}
                <div>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    In the ownership section, we analyze the sentiments of insiders by examining their open and off-market transactions. We also evaluate whether shareholders have been diluted by checking the historical shares outstanding. Metrics in this section are not incorporated in the Snowflake score.
                  </p>
                </div>

                {/* Recent Insider Transactions */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Recent Insider Transactions</h4>
                  <p className="text-sm text-gray-400 mb-4">Overview of transactions done by individuals and institutional insiders in the past 12 months.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#1A1A1A] p-5 rounded-xl border border-gray-800">
                      <h5 className="text-blue-400 font-bold mb-2">Open Market Transaction</h5>
                      <p className="text-sm text-gray-300 mb-2">Buy or sell transaction executed on a stock exchange at a market price, voluntarily initiated by an insider.</p>
                      <p className="text-xs text-gray-500">Filed in SEC Form 4 (Code P for acquisition, S for disposition).</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-5 rounded-xl border border-gray-800">
                      <h5 className="text-blue-400 font-bold mb-2">Private (Off-Market) Transaction</h5>
                      <p className="text-sm text-gray-300 mb-2">Sale or purchase of shares between parties without going through the marketplace (negotiated agreements).</p>
                      <p className="text-xs text-gray-500">Captured when transaction price falls outside the daily price range.</p>
                    </div>
                  </div>

                  <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                    <div className="flex items-center mb-2">
                      <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                      <h6 className="text-white font-bold">Insider Buying</h6>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Checks both open-market and private transactions done by individual insiders over the past 3 months.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                      <li><strong className="text-emerald-400">Pass:</strong> More buy transactions than sell transactions during this period.</li>
                    </ul>
                  </div>
                </div>

                {/* Ownership Breakdown */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Ownership Breakdown</h4>
                  <p className="text-sm text-gray-400 mb-4">Distribution of shares among different types of shareholders to understand who owns the company.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                    <div className="bg-[#1A1A1A] p-3 rounded-lg border border-gray-800 text-center">
                      <h6 className="text-gray-200 text-xs font-bold mb-1">Private Companies</h6>
                      <p className="text-[10px] text-gray-500">Non-publicly traded</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-3 rounded-lg border border-gray-800 text-center">
                      <h6 className="text-gray-200 text-xs font-bold mb-1">Individual Insiders</h6>
                      <p className="text-[10px] text-gray-500">Executives, board</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-3 rounded-lg border border-gray-800 text-center">
                      <h6 className="text-gray-200 text-xs font-bold mb-1">State/Govt</h6>
                      <p className="text-[10px] text-gray-500">State-owned entities</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-3 rounded-lg border border-gray-800 text-center">
                      <h6 className="text-gray-200 text-xs font-bold mb-1">General Public</h6>
                      <p className="text-[10px] text-gray-500">Individual investors</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-3 rounded-lg border border-gray-800 text-center">
                      <h6 className="text-gray-200 text-xs font-bold mb-1">Institutions</h6>
                      <p className="text-[10px] text-gray-500">Mutual/pension funds</p>
                    </div>
                  </div>

                  <div className="bg-[#111111] border border-gray-800 p-5 rounded-xl">
                    <div className="flex items-center mb-2">
                      <span className="bg-emerald-900/50 text-emerald-400 text-xs font-bold px-2 py-1 rounded mr-3">Check</span>
                      <h6 className="text-white font-bold">Dilution of Shares</h6>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Looks at the change in the number of shares outstanding over a 1-year period.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                      <li><strong className="text-emerald-400">Pass:</strong> No significant increase in shares outstanding.</li>
                      <li><span className="text-gray-500">Flags: Increase &gt; 2% is considered dilution, &gt; 50% is significant dilution.</span></li>
                    </ul>
                  </div>
                </div>

                {/* Top Shareholders */}
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-xl font-bold text-white mb-3">Top Shareholders</h4>
                  <p className="text-sm text-gray-400">Investors identified in the share registry holding the highest number of shares. Excludes investors holding stocks under nominee or broker accounts ("Street Name").</p>
                </div>
              </div>
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

            <Accordion id="ownership-data-source" title="Where does your data provider source Ownership Data?">
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Proxies and Annuals (a few Quarterly and Interim Reports) and Exchange Notifications of "the issuer" from Regulatory Agencies, Stock Exchanges, and Company Websites.</li>
                <li>Portfolio filings of Institutions (13Fs) from Regulatory Agencies.</li>
                <li>Portfolio filings of Funds from Regulatory Agencies, Stock Exchanges, Company Websites, and Direct Relationships with a contact at Sponsor.</li>
                <li>3rd Party Data Feeds.</li>
              </ul>
            </Accordion>

            <Accordion id="insider-data-source" title="Where does your data provider source Insider Transactions Data?">
              <p className="mb-4 text-gray-300">
                Our data provider sources and collects data from the Form 4 filing of the company for US listed companies.
              </p>
              <div className="bg-[#111111] border border-gray-800 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-400 italic">
                  "Disclosure of information specified on this Form is mandatory. The information will be used for the primary purpose of disclosing the transactions and holdings of directors, officers, and beneficial owners of registered companies. Information disclosed will be a matter of public record and available for inspection by members of the public..."
                </p>
                <p className="text-xs text-gray-500 mt-2">- US SEC</p>
              </div>
              <p className="text-gray-300">
                Apart from Form-4, they are also collecting and displaying the insider transaction data from Form-3, 5 and 13D/G filings which are fields in SEC-EDGAR, and similar forms required by other exchanges around the world.
              </p>
            </Accordion>
          </section>

        </div>
      </div>
    </div>
  );
}
