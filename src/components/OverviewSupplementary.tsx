import React, { useEffect, useRef } from 'react';

export function OverviewSupplementary() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TradingView Widget injection
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "HOSE:MBB",
          "interval": "D",
          "timezone": "Asia/Ho_Chi_Minh",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "backgroundColor": "#111111",
          "gridColor": "rgba(255, 255, 255, 0.1)",
          "hide_top_toolbar": false,
          "hide_legend": false,
          "save_image": false,
          "container_id": "tradingview_mbb",
          "support_host": "https://www.tradingview.com"
        }
      `;
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="space-y-6 mt-8 font-sans">
      {/* Frame 4: Price Chart (TradingView) */}
      <div className="surface-card overflow-hidden flex flex-col" style={{ height: '500px' }}>
        <div className="p-4 border-b border-subtle bg-base">
          <h3 className="text-lg font-bold text-primary">Price Chart</h3>
        </div>
        <div className="flex-1 w-full" id="tradingview_mbb" ref={container}></div>
      </div>

      {/* Frame 1: Key Metrics */}
      <div className="surface-card p-6">
        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-base rounded-xl p-4 border border-subtle shadow-sm">
            <div className="text-xs text-secondary mb-2 uppercase font-semibold">P/E (TTM)</div>
            <div className="text-xl font-bold text-primary font-tabular">8.6x</div>
          </div>
          <div className="bg-base rounded-xl p-4 border border-subtle shadow-sm">
            <div className="text-xs text-secondary mb-2 uppercase font-semibold">P/B</div>
            <div className="text-xl font-bold text-primary font-tabular">1.6x</div>
          </div>
          <div className="bg-base rounded-xl p-4 border border-subtle shadow-sm">
            <div className="text-xs text-secondary mb-2 uppercase font-semibold">ROE</div>
            <div className="text-xl font-bold text-bullish font-tabular">17.0%</div>
          </div>
          <div className="bg-base rounded-xl p-4 border border-subtle shadow-sm">
            <div className="text-xs text-secondary mb-2 uppercase font-semibold">Div Yield</div>
            <div className="text-xl font-bold text-primary font-tabular">0.0%</div>
          </div>
          <div className="bg-base rounded-xl p-4 border border-subtle shadow-sm">
            <div className="text-xs text-secondary mb-2 uppercase font-semibold">Market Cap</div>
            <div className="text-xl font-bold text-primary font-tabular">229.568T VND</div>
          </div>
          <div className="bg-base rounded-xl p-4 border border-subtle shadow-sm">
            <div className="text-xs text-secondary mb-2 uppercase font-semibold">EPS (TTM)</div>
            <div className="text-xl font-bold text-primary font-tabular">3,325 ₫</div>
          </div>
          <div className="bg-base rounded-xl p-4 border border-subtle shadow-sm">
            <div className="text-xs text-secondary mb-2 uppercase font-semibold">52W HIGH</div>
            <div className="text-xl font-bold text-primary font-tabular">29,500 ₫</div>
          </div>
          <div className="bg-base rounded-xl p-4 border border-subtle shadow-sm">
            <div className="text-xs text-secondary mb-2 uppercase font-semibold">52W LOW</div>
            <div className="text-xl font-bold text-primary font-tabular">14,600 ₫</div>
          </div>
        </div>
      </div>

      {/* Frame 2: P/E Valuation */}
      <div className="surface-card p-6">
        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-24">P/E Valuation</h3>
        
        <div className="relative w-full mb-16">
          {/* Gradient Bar */}
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-bullish via-yellow-500 to-bearish"></div>
          
          {/* Current P/E Marker */}
          <div className="absolute top-1/2 left-[43%] transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-card border-2 border-subtle rounded-full shadow-md z-10"></div>
          
          {/* Current P/E Tooltip */}
          <div className="absolute top-[-70px] left-[43%] transform -translate-x-1/2 flex flex-col items-center z-20">
            <div className="bg-card border border-subtle rounded-lg px-4 py-2 flex flex-col items-center shadow-lg">
              <span className="text-[10px] text-secondary font-bold tracking-wider mb-1">CURRENT P/E</span>
              <span className="text-primary font-bold text-lg leading-none">8.6x</span>
            </div>
            <div className="w-px h-6 bg-subtle mt-1"></div>
          </div>

          {/* Industry P/E Line */}
          <div className="absolute top-[-15px] bottom-[-15px] w-[2px] bg-bullish z-0" style={{ left: '60%' }}></div>
          
          {/* Industry P/E Text */}
          <div className="absolute top-[25px] left-[60%] transform -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
            <span className="text-[10px] text-secondary font-bold tracking-wider mb-1">INDUSTRY P/E</span>
            <span className="text-bullish font-bold text-lg leading-none">12.0x</span>
          </div>

          {/* Undervalued Pill */}
          <div className="absolute top-[-45px] left-[60%] transform -translate-x-1/2 whitespace-nowrap z-20">
            <div className="px-3 py-1.5 rounded-full border border-bullish/30 bg-bullish/10 text-bullish text-xs font-bold flex items-center shadow-sm">
              <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              29% BELOW INDUSTRY
            </div>
          </div>
        </div>
      </div>

      {/* Frame 3: Banking Operations */}
      <div className="surface-card p-6">
        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-6">Banking Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
          <div className="flex justify-between items-center border-b border-subtle pb-3">
            <span className="text-secondary text-sm font-medium">NIM (Net Interest Margin)</span>
            <span className="text-primary font-bold">12.78%</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-3">
            <span className="text-secondary text-sm font-medium">Total Customer Deposits</span>
            <span className="text-primary font-bold">921T VND</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-3">
            <span className="text-secondary text-sm font-medium">Total Customer Loans</span>
            <span className="text-primary font-bold">1,071T VND</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-3">
            <span className="text-secondary text-sm font-medium">LDR (Loan-to-Deposit Ratio)</span>
            <span className="text-orange-600 font-bold">116.2%</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-3">
            <span className="text-secondary text-sm font-medium">P/B</span>
            <span className="text-primary font-bold">1.6x</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-3">
            <span className="text-secondary text-sm font-medium">Dividend</span>
            <span className="text-primary font-bold">0.0%</span>
          </div>
        </div>
      </div>

    </div>
  );
}
