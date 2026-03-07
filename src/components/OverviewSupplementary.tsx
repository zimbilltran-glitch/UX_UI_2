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
          "gridColor": "#1f2937",
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
      <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-lg overflow-hidden flex flex-col" style={{ height: '500px' }}>
        <div className="p-4 border-b border-gray-800 bg-[#111111]">
          <h3 className="text-lg font-bold text-white">Price Chart</h3>
        </div>
        <div className="flex-1 w-full" id="tradingview_mbb" ref={container}></div>
      </div>

      {/* Frame 1: Key Metrics */}
      <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-lg p-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-gray-800/50">
            <div className="text-xs text-gray-400 mb-2 uppercase font-medium">P/E (TTM)</div>
            <div className="text-xl font-bold text-white">8.6x</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-gray-800/50">
            <div className="text-xs text-gray-400 mb-2 uppercase font-medium">P/B</div>
            <div className="text-xl font-bold text-white">1.6x</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-gray-800/50">
            <div className="text-xs text-gray-400 mb-2 uppercase font-medium">ROE</div>
            <div className="text-xl font-bold text-emerald-500">17.0%</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-gray-800/50">
            <div className="text-xs text-gray-400 mb-2 uppercase font-medium">Div Yield</div>
            <div className="text-xl font-bold text-white">0.0%</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-gray-800/50">
            <div className="text-xs text-gray-400 mb-2 uppercase font-medium">Market Cap</div>
            <div className="text-xl font-bold text-white">229.568T VND</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-gray-800/50">
            <div className="text-xs text-gray-400 mb-2 uppercase font-medium">EPS (TTM)</div>
            <div className="text-xl font-bold text-white">3,325 ₫</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-gray-800/50">
            <div className="text-xs text-gray-400 mb-2 uppercase font-medium">52W HIGH</div>
            <div className="text-xl font-bold text-white">29,500 ₫</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-4 border border-gray-800/50">
            <div className="text-xs text-gray-400 mb-2 uppercase font-medium">52W LOW</div>
            <div className="text-xl font-bold text-white">14,600 ₫</div>
          </div>
        </div>
      </div>

      {/* Frame 2: P/E Valuation */}
      <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-lg p-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-24">P/E Valuation</h3>
        
        <div className="relative w-full mb-16">
          {/* Gradient Bar */}
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500"></div>
          
          {/* Current P/E Marker */}
          <div className="absolute top-1/2 left-[43%] transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"></div>
          
          {/* Current P/E Tooltip */}
          <div className="absolute top-[-70px] left-[43%] transform -translate-x-1/2 flex flex-col items-center z-20">
            <div className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 flex flex-col items-center shadow-lg">
              <span className="text-[10px] text-gray-400 font-bold tracking-wider mb-1">CURRENT P/E</span>
              <span className="text-white font-bold text-lg leading-none">8.6x</span>
            </div>
            <div className="w-px h-6 bg-gray-600 mt-1"></div>
          </div>

          {/* Industry P/E Line */}
          <div className="absolute top-[-15px] bottom-[-15px] w-[2px] bg-emerald-500 z-0" style={{ left: '60%' }}></div>
          
          {/* Industry P/E Text */}
          <div className="absolute top-[25px] left-[60%] transform -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
            <span className="text-[10px] text-gray-400 font-bold tracking-wider mb-1">INDUSTRY P/E</span>
            <span className="text-emerald-500 font-bold text-lg leading-none">12.0x</span>
          </div>

          {/* Undervalued Pill */}
          <div className="absolute top-[-45px] left-[60%] transform -translate-x-1/2 whitespace-nowrap z-20">
            <div className="px-3 py-1.5 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              29% BELOW INDUSTRY
            </div>
          </div>
        </div>
      </div>

      {/* Frame 3: Banking Operations */}
      <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-lg p-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Banking Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
          <div className="flex justify-between items-center border-b border-gray-800/50 pb-3">
            <span className="text-gray-400 text-sm">NIM (Net Interest Margin)</span>
            <span className="text-white font-bold">12.78%</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-800/50 pb-3">
            <span className="text-gray-400 text-sm">Total Customer Deposits</span>
            <span className="text-white font-bold">921T VND</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-800/50 pb-3">
            <span className="text-gray-400 text-sm">Total Customer Loans</span>
            <span className="text-white font-bold">1,071T VND</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-800/50 pb-3">
            <span className="text-gray-400 text-sm">LDR (Loan-to-Deposit Ratio)</span>
            <span className="text-orange-500 font-bold">116.2%</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-800/50 pb-3">
            <span className="text-gray-400 text-sm">P/B</span>
            <span className="text-white font-bold">1.6x</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-800/50 pb-3">
            <span className="text-gray-400 text-sm">Dividend</span>
            <span className="text-white font-bold">0.0%</span>
          </div>
        </div>
      </div>

    </div>
  );
}
