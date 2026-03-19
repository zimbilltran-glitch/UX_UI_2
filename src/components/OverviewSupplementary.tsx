import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

export function OverviewSupplementary() {
  const { theme } = useTheme();

  return (
    <div className="space-y-6 mt-8 font-sans">
      {/* Frame 4: Price Chart (TradingView) */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden flex flex-col" style={{ height: '500px' }}>
        <div className="p-4 border-b border-subtle bg-base">
          <h3 className="text-lg font-bold text-primary">Price Chart</h3>
        </div>
        <div className="flex-1 w-full relative">
          <AdvancedRealTimeChart 
            symbol="HOSE:MBB"
            theme={theme === 'dark' ? 'dark' : 'light'}
            interval="D"
            timezone="Asia/Ho_Chi_Minh"
            style="1"
            locale="en"
            enable_publishing={false}
            hide_top_toolbar={false}
            hide_legend={false}
            save_image={false}
            autosize
          />
        </div>
      </div>

      {/* Frame 1: Key Metrics */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg p-4 sm:p-6">
        <h3 className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-base rounded-xl p-3 sm:p-4 border border-subtle shadow-sm">
            <div className="text-[10px] sm:text-xs text-secondary mb-1 sm:mb-2 uppercase font-semibold">P/E (TTM)</div>
            <div className="text-base sm:text-xl font-bold text-primary font-tabular">8.6x</div>
          </div>
          <div className="bg-base rounded-xl p-3 sm:p-4 border border-subtle shadow-sm">
            <div className="text-[10px] sm:text-xs text-secondary mb-1 sm:mb-2 uppercase font-semibold">P/B</div>
            <div className="text-base sm:text-xl font-bold text-primary font-tabular">1.6x</div>
          </div>
          <div className="bg-base rounded-xl p-3 sm:p-4 border border-subtle shadow-sm">
            <div className="text-[10px] sm:text-xs text-secondary mb-1 sm:mb-2 uppercase font-semibold">ROE</div>
            <div className="text-base sm:text-xl font-bold text-bullish font-tabular">17.0%</div>
          </div>
          <div className="bg-base rounded-xl p-3 sm:p-4 border border-subtle shadow-sm">
            <div className="text-[10px] sm:text-xs text-secondary mb-1 sm:mb-2 uppercase font-semibold">Div Yield</div>
            <div className="text-base sm:text-xl font-bold text-primary font-tabular">0.0%</div>
          </div>
          <div className="bg-base rounded-xl p-3 sm:p-4 border border-subtle shadow-sm">
            <div className="text-[10px] sm:text-xs text-secondary mb-1 sm:mb-2 uppercase font-semibold">Market Cap</div>
            <div className="text-base sm:text-xl font-bold text-primary font-tabular">229.568T VND</div>
          </div>
          <div className="bg-base rounded-xl p-3 sm:p-4 border border-subtle shadow-sm">
            <div className="text-[10px] sm:text-xs text-secondary mb-1 sm:mb-2 uppercase font-semibold">EPS (TTM)</div>
            <div className="text-base sm:text-xl font-bold text-primary font-tabular">3,325 ₫</div>
          </div>
          <div className="bg-base rounded-xl p-3 sm:p-4 border border-subtle shadow-sm">
            <div className="text-[10px] sm:text-xs text-secondary mb-1 sm:mb-2 uppercase font-semibold">52W HIGH</div>
            <div className="text-base sm:text-xl font-bold text-primary font-tabular">29,500 ₫</div>
          </div>
          <div className="bg-base rounded-xl p-3 sm:p-4 border border-subtle shadow-sm">
            <div className="text-[10px] sm:text-xs text-secondary mb-1 sm:mb-2 uppercase font-semibold">52W LOW</div>
            <div className="text-base sm:text-xl font-bold text-primary font-tabular">14,600 ₫</div>
          </div>
        </div>
      </div>

      {/* Frame 2: P/E Valuation */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg p-4 sm:p-6">
        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-20 sm:mb-24">P/E Valuation</h3>
        
        <div className="relative w-full mb-12 sm:mb-16">
          {/* Gradient Bar */}
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-bullish via-yellow-500 to-bearish"></div>
          
          {/* Current P/E Marker */}
          <div className="absolute top-1/2 left-[43%] transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-card border-2 border-subtle rounded-full shadow-md z-10"></div>
          
          {/* Current P/E Tooltip */}
          <div className="absolute top-[-60px] sm:top-[-70px] left-[43%] transform -translate-x-1/2 flex flex-col items-center z-20">
            <div className="bg-card border border-subtle rounded-lg px-2 sm:px-4 py-1 sm:py-2 flex flex-col items-center shadow-lg">
              <span className="text-[8px] sm:text-[10px] text-secondary font-bold tracking-wider mb-0.5 sm:mb-1 whitespace-nowrap">CURRENT P/E</span>
              <span className="text-primary font-bold text-sm sm:text-lg leading-none">8.6x</span>
            </div>
            <div className="w-px h-4 sm:h-6 bg-subtle mt-1"></div>
          </div>

          {/* Industry P/E Line */}
          <div className="absolute top-[-10px] sm:top-[-15px] bottom-[-10px] sm:bottom-[-15px] w-[2px] bg-bullish z-0" style={{ left: '60%' }}></div>
          
          {/* Industry P/E Text */}
          <div className="absolute top-[20px] sm:top-[25px] left-[60%] transform -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
            <span className="text-[8px] sm:text-[10px] text-secondary font-bold tracking-wider mb-0.5 sm:mb-1">INDUSTRY P/E</span>
            <span className="text-bullish font-bold text-sm sm:text-lg leading-none">12.0x</span>
          </div>

          {/* Undervalued Pill */}
          <div className="absolute top-[-40px] sm:top-[-45px] left-[60%] transform -translate-x-1/2 whitespace-nowrap z-20">
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-bullish/30 bg-bullish/10 text-bullish text-[10px] sm:text-xs font-bold flex items-center shadow-sm">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              <span className="hidden sm:inline">29% BELOW INDUSTRY</span>
              <span className="sm:hidden">29% BELOW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Frame 3: Banking Operations */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg p-4 sm:p-6">
        <h3 className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider mb-4 sm:mb-6">Banking Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-16 gap-y-4 sm:gap-y-6">
          <div className="flex justify-between items-center border-b border-subtle pb-2 sm:pb-3">
            <span className="text-secondary text-xs sm:text-sm font-medium">NIM (Net Interest Margin)</span>
            <span className="text-primary font-bold text-sm sm:text-base">12.78%</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-2 sm:pb-3">
            <span className="text-secondary text-xs sm:text-sm font-medium">Total Customer Deposits</span>
            <span className="text-primary font-bold text-sm sm:text-base">921T VND</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-2 sm:pb-3">
            <span className="text-secondary text-xs sm:text-sm font-medium">Total Customer Loans</span>
            <span className="text-primary font-bold text-sm sm:text-base">1,071T VND</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-2 sm:pb-3">
            <span className="text-secondary text-xs sm:text-sm font-medium">LDR (Loan-to-Deposit Ratio)</span>
            <span className="text-orange-600 font-bold text-sm sm:text-base">116.2%</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-2 sm:pb-3">
            <span className="text-secondary text-xs sm:text-sm font-medium">P/B</span>
            <span className="text-primary font-bold text-sm sm:text-base">1.6x</span>
          </div>
          <div className="flex justify-between items-center border-b border-subtle pb-2 sm:pb-3">
            <span className="text-secondary text-xs sm:text-sm font-medium">Dividend</span>
            <span className="text-primary font-bold text-sm sm:text-base">0.0%</span>
          </div>
        </div>
      </div>

    </div>
  );
}
