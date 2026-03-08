import React, { useState } from 'react';
import { Info, Star, X, Database, MoreHorizontal } from 'lucide-react';

const data = {
  ticker: "MBB",
  pe_view: {
    trailing: {
      explanation: "★ Key metric: As MBB is profitable we use its Price-To-Earnings Ratio for relative valuation analysis.",
      centerText: { label: "Market Cap", value: "₫217.89t" },
      topText: { label: "Earnings", value: "₫26.78t" },
      ratio: "8x",
      ratioLabel: "PE Ratio",
      subText: "",
      percentage: 15
    },
    forward: {
      explanation: "★ Key metric: As MBB is profitable we use its Price-To-Earnings Ratio for relative valuation analysis.",
      centerText: { label: "Share Price", value: "₫26,700.00" },
      topText: { label: "Earnings Per Share", value: "₫3.77k" },
      ratio: "7.1x",
      ratioLabel: "Forward PE Ratio",
      subText: "+19% earnings",
      percentage: 20
    }
  },
  pb_view: {
    explanation: "For MBB we can also use its Price-To-Book Ratio for relative valuation analysis.",
    centerText: { label: "Market Cap", value: "₫217.89t" },
    topText: { label: "Book", value: "₫136.14t" },
    ratio: "1.6x",
    ratioLabel: "PB Ratio",
    percentage: 60
  },
  ps_view: {
    trailing: {
      explanation: "As MBB is a bank we don't use its Price-To-Sales Ratio as the key metric for relative valuation analysis.",
      centerText: { label: "Market Cap", value: "₫217.89t" },
      topText: { label: "Sales", value: "₫53.95t" },
      ratio: "4x",
      ratioLabel: "PS Ratio",
      percentage: 25
    },
    forward: {
      explanation: "As MBB is a bank we don't use its Price-To-Sales Ratio as the key metric for relative valuation analysis.",
      centerText: { label: "Market Cap", value: "₫217.89t" },
      topText: { label: "Forecasted Sales in 12m", value: "₫83.93t" },
      ratio: "2.6x",
      ratioLabel: "Forward PS Ratio",
      subText: "+56% sales",
      percentage: 35
    }
  },
  others_view: {
    explanation: "Other financial metrics that can be useful for relative valuation.",
    metrics: [
      { label: "Enterprise Value/Revenue", value: "n/a" },
      { label: "Enterprise Value/EBITDA", value: "n/a" },
      { label: "PEG Ratio", value: "0.5x", tooltip: "Measures a stock's value while factoring in the company's forecast earnings growth rate. A PEG ratio over 1 is considered overvalued, while a value below 1 is considered undervalued" }
    ],
    description: "MBB key valuation metrics and ratios. From Price to Earnings, Price to Sales and Price to Book to Price to Earnings Growth Ratio, Enterprise Value and EBITDA."
  }
};

export const KeyValuationMetric = () => {
  const [activeTab, setActiveTab] = useState('PE');
  const [isForwardPE, setIsForwardPE] = useState(true);
  const [isForwardPS, setIsForwardPS] = useState(true);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  const renderDoughnut = (viewData: any) => {
    const radius = 70;
    const strokeWidth = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(viewData.percentage / 100) * circumference} ${circumference}`;

    return (
      <div className="flex items-center justify-center w-full max-w-md mx-auto mt-8">
        <div className="relative flex flex-col items-center">
          {/* Top Label */}
          <div className="absolute -top-14 flex flex-col items-center whitespace-nowrap">
            <span className="text-secondary text-sm">{viewData.topText.label}</span>
            <span className="text-primary font-bold font-tabular">{viewData.topText.value}</span>
          </div>
          
          {/* Pointer Line */}
          <div className="absolute -top-4 left-1/2 w-px h-8 bg-[#0ea5e9]"></div>
          <div className="absolute -top-5 left-1/2 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] -translate-x-1/2"></div>

          <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
            <circle cx="90" cy="90" r={radius} fill="transparent" stroke="#e5e7eb" strokeWidth={strokeWidth} />
            <circle cx="90" cy="90" r={radius} fill="transparent" stroke="#0ea5e9" strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} strokeLinecap="butt" />
          </svg>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-secondary text-sm">{viewData.centerText.label}</span>
            <span className="text-primary font-bold border-b border-subtle font-tabular">{viewData.centerText.value}</span>
          </div>
        </div>

        {/* Right Side Ratio */}
        <div className="ml-16 flex flex-col">
          <span className="text-primary font-bold text-4xl font-tabular">{viewData.ratio}</span>
          <span className="text-secondary text-sm font-medium border-b border-subtle border-dashed pb-1">{viewData.ratioLabel}</span>
          {viewData.subText && <span className="text-secondary text-xs mt-1">{viewData.subText}</span>}
        </div>
      </div>
    );
  };

  const currentViewData = activeTab === 'PE' 
    ? (isForwardPE ? data.pe_view.forward : data.pe_view.trailing)
    : activeTab === 'PB' ? data.pb_view
    : activeTab === 'PS' ? (isForwardPS ? data.ps_view.forward : data.ps_view.trailing)
    : data.others_view;

  return (
    <div className="mb-12 font-sans">
      <h2 className="text-2xl font-bold text-primary mb-4">1.2 Key Valuation Metric</h2>
      <p className="text-secondary mb-6 font-medium">Which metric is best to use when looking at relative valuation for MBB?</p>

      <div className="bg-card rounded-xl p-6 border border-subtle shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Tabs & Explanation */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <div className="flex space-x-1 bg-base p-1 rounded-lg w-fit mb-4">
            {['PE', 'PB', 'PS', 'Others'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn-interactive px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-secondary'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-base p-4 rounded-lg border border-subtle text-secondary text-sm leading-relaxed">
             {activeTab === 'PE' && (
               <span><Star className="inline-block w-4 h-4 text-[#eab308] mr-2 -mt-1" fill="currentColor" /></span>
             )}
             {currentViewData.explanation.replace('★ ', '')}
          </div>
        </div>

        {/* Right Column: Dynamic Content */}
        <div className="w-full lg:w-2/3 relative min-h-[250px]">
          {activeTab !== 'Others' ? (
            renderDoughnut(currentViewData)
          ) : (
            <div className="flex flex-col w-full max-w-md">
              <div className="text-primary font-bold mb-2 text-sm">Key Statistics</div>
              <div className="flex flex-col space-y-3">
                {data.others_view.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-subtle pb-2 relative">
                    <div 
                      className={`text-secondary text-sm font-medium ${metric.tooltip ? 'border-b border-dashed border-subtle cursor-help' : ''}`}
                      onMouseEnter={() => metric.tooltip && setHoveredTooltip(metric.label)}
                      onMouseLeave={() => setHoveredTooltip(null)}
                    >
                      {metric.label}
                    </div>
                    <div className="text-primary font-bold text-sm font-tabular">{metric.value}</div>
                    
                    {/* Tooltip */}
                    {hoveredTooltip === metric.label && metric.tooltip && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-card text-primary text-xs p-3 rounded shadow-lg z-50 border border-subtle">
                        <div className="absolute -top-2 left-4 w-4 h-4 bg-card transform rotate-45 border-t border-l border-subtle"></div>
                        <div className="relative z-10">{metric.tooltip}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-secondary text-xs mt-6 leading-relaxed">
                {data.others_view.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-end items-center mt-8 space-x-3">
        {activeTab === 'PE' && (
          <div className="flex items-center mr-4">
            <button 
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isForwardPE ? 'bg-[#eab308]' : 'bg-subtle'}`}
              onClick={() => setIsForwardPE(!isForwardPE)}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-card transition-transform ${isForwardPE ? 'translate-x-4' : 'translate-x-1'}`} />
            </button>
            <span className="ml-2 text-secondary text-sm font-medium">Forward PE</span>
          </div>
        )}
        {activeTab === 'PS' && (
          <div className="flex items-center mr-4">
            <button 
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isForwardPS ? 'bg-[#eab308]' : 'bg-subtle'}`}
              onClick={() => setIsForwardPS(!isForwardPS)}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-card transition-transform ${isForwardPS ? 'translate-x-4' : 'translate-x-1'}`} />
            </button>
            <span className="ml-2 text-secondary text-sm font-medium">Forward PS</span>
          </div>
        )}

        <button className="btn-interactive flex items-center px-3 py-1.5 bg-brand hover:bg-brand/90 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
          <Database className="w-4 h-4 mr-2" />
          Data
        </button>
        <button 
          onClick={() => setIsLearnModalOpen(true)}
          className="btn-interactive flex items-center px-3 py-1.5 bg-brand hover:bg-brand/90 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Info className="w-4 h-4 mr-2" />
          Learn
        </button>
        <button className="btn-interactive flex items-center px-2 py-1.5 bg-brand hover:bg-brand/90 text-white rounded-lg transition-colors shadow-sm">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      </div>

      {/* Learn Modal */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-subtle">
              <h3 className="text-xl font-serif font-bold text-primary">Key Valuation Metric</h3>
              <button onClick={() => setIsLearnModalOpen(false)} className="text-secondary hover:text-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-primary space-y-4 text-sm leading-relaxed">
              <p>All valuation metrics suit some stocks better than others. We choose the most relevant data point to use for our relative valuation.</p>
              <p>If a company is profitable, we use the Price to Earnings (PE) ratio, which measures how much investors are paying for today's earnings. A high PE ratio may indicate that investors are expecting high growth in the future. This is calculated by dividing the share price by earnings per share.</p>
              <p>If a company is not yet making a profit, we use the Price to Sales (PS) ratio, which measures how much investors are paying for today's sales or revenues. This is calculated by dividing the share price by revenue per share.</p>
              <p>For some companies like banks or real estate investors, Price to Book (PB) is a useful metric. It looks at what the value of the balance sheet is compared to the market capitalisation of the company. This is calculated by dividing the market capitalisation by the book value of the company.</p>
              <p className="pt-2">For more information on how we select the key valuation metrics, please check out our <a href="#" className="text-[#d97706] hover:text-[#b45309] underline decoration-[#d97706]/30 underline-offset-4 transition-colors">Help Centre</a>.</p>
            </div>
            <div className="p-4 border-t border-subtle flex justify-end">
              <button 
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-2 bg-[#fde047] hover:bg-[#facc15] text-primary font-medium rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
