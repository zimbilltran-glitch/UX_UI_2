import React from 'react';
import { CheckCircle2, XCircle, Star, Info, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, LineChart, Line, ComposedChart, Area, ResponsiveContainer } from 'recharts';
import { KeyValuationMetric } from './KeyValuationMetric';
import { HistoricalFinancialRatioChart } from './HistoricalFinancialRatioChart';
import { RatioVsPeers } from './RatioVsPeers';
import { RatioVsIndustry } from './RatioVsIndustry';
import { RatioVsFairRatio } from './RatioVsFairRatio';
import { ValuationOverview } from './ValuationOverview';
import { colors } from '../theme/colors';

const fcfHistoryData = [
  { date: 'Jan', price: 22000, fairValue: 45000 },
  { date: 'Feb', price: 23000, fairValue: 46000 },
  { date: 'Mar', price: 24000, fairValue: 46000 },
  { date: 'Apr', price: 23500, fairValue: 47000 },
  { date: 'May', price: 25000, fairValue: 47500 },
  { date: 'Jun', price: 26000, fairValue: 48000 },
  { date: 'Jul', price: 25500, fairValue: 48500 },
  { date: 'Aug', price: 26500, fairValue: 49000 },
  { date: 'Sep', price: 27000, fairValue: 49000 },
  { date: 'Oct', price: 26800, fairValue: 49500 },
  { date: 'Nov', price: 27500, fairValue: 49600 },
  { date: 'Dec', price: 26700, fairValue: 49615 },
];

export function Valuation() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <ValuationOverview />

      {/* 1.1 Share Price vs Future Cash Flow Value */}
      <div className="mb-12" id="section_1_1">
        <h2 className="text-2xl font-bold text-primary mb-4">1.1 Share Price vs Future Cash Flow Value</h2>
        <p className="text-secondary mb-8">
          What is the Fair Price of MBB when looking at its future cash flows? For this estimate we use a Discounted Cash Flow model.
        </p>

        <div className="surface-card p-4 sm:p-8 relative overflow-hidden">
          
          <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-24 w-full flex flex-col justify-center">
            
            {/* The Bar */}
            <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-bullish via-yellow-400 to-bearish shadow-inner">
              
              {/* Gap Highlight */}
              <div 
                className="absolute top-0 h-full bg-bullish/20/50"
                style={{ left: '35%', width: '40%' }}
              ></div>

              {/* Badge above the gap */}
              <div 
                className="absolute bottom-full mb-6 sm:mb-8 flex flex-col items-center"
                style={{ left: '55%', transform: 'translateX(-50%)' }}
              >
                <div className="flex items-center space-x-1 bg-bullish/10 border border-bullish/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
                  <TrendingUp size={12} className="text-bullish sm:w-[14px] sm:h-[14px]" />
                  <span className="text-bullish font-bold text-[10px] sm:text-xs tracking-wider">46.2% UNDERVALUED</span>
                </div>
                {/* Connecting line for badge */}
                <div className="h-4 sm:h-6 w-px bg-emerald-200 mt-1"></div>
              </div>

              {/* Current Price Marker */}
              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '35%' }}>
                {/* Dot */}
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-card border-2 sm:border-4 border-subtle rounded-full shadow-md z-10"></div>
                </div>
                
                {/* Label (Above) */}
                <div className="absolute bottom-full mb-3 sm:mb-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="bg-card border border-subtle px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg whitespace-nowrap">
                    <div className="text-secondary text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold mb-0.5 text-center">Current Price</div>
                    <div className="text-primary font-bold text-sm sm:text-lg tracking-tight font-tabular">₫26,700.00</div>
                  </div>
                  {/* Pointer */}
                  <div className="w-px h-3 sm:h-5 bg-subtle mt-1"></div>
                </div>
              </div>

              {/* Fair Value Marker */}
              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '75%' }}>
                {/* Line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 sm:h-12 bg-bullish"></div>
                
                {/* Label (Below) */}
                <div className="absolute top-full mt-4 sm:mt-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  {/* Pointer */}
                  <div className="w-px h-3 sm:h-5 bg-emerald-200 mb-1"></div>
                  <div className="whitespace-nowrap text-center">
                    <div className="text-secondary text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold mb-0.5">Fair Value</div>
                    <div className="text-bullish font-bold text-sm sm:text-lg tracking-tight font-tabular">₫49,615.29</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-base rounded-xl p-4 border border-subtle mt-4 sm:mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
              <h3 className="text-primary font-bold">Future Cash Flow Value History</h3>
              <button className="px-3 py-1.5 bg-card hover:bg-subtle text-secondary text-xs font-semibold rounded-lg border border-subtle transition-colors shadow-sm">
                Set Fair Value
              </button>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-4 gap-4">
              <div className="flex flex-wrap gap-4 sm:gap-8">
                <div>
                  <div className="flex items-center text-xs text-secondary mb-1 font-medium">
                    <div className="w-2 h-2 rounded-full bg-bullish mr-2"></div>
                    07 Mar
                  </div>
                  <div className="text-primary font-bold text-base sm:text-lg border-b border-dotted border-subtle inline-block">₫26,700.00</div>
                </div>
                <div>
                  <div className="flex items-center text-xs text-secondary mb-1 font-medium">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                    Future Cash Flow Value
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <div className="text-primary font-bold text-base sm:text-lg border-b border-dotted border-subtle inline-block">₫49,614.69</div>
                    <span className="text-bullish text-xs font-bold">46.2% undervalued</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 text-right w-full lg:w-auto justify-end sm:justify-start">
                <div>
                  <div className="text-xs text-secondary mb-1 font-medium">1Y</div>
                  <div className="text-bullish text-sm font-bold">43.9%</div>
                </div>
                <div>
                  <div className="text-xs text-secondary mb-1 font-medium">7D</div>
                  <div className="text-bearish text-sm font-bold">-6.3%</div>
                </div>
              </div>
            </div>

            <div className="h-32 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={fcfHistoryData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.colorBullish} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={colors.colorBullish} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="price" stroke={colors.colorBullish} strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                  <Line type="stepAfter" dataKey="fairValue" stroke="#ec4899" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4 mb-8">
            <button className="btn-interactive px-3 py-1.5 bg-card hover:bg-subtle text-secondary rounded-lg text-sm border border-subtle transition-colors shadow-sm font-medium">
              Explore Narratives
            </button>
            <button className="btn-interactive flex items-center space-x-1 px-3 py-1.5 bg-card hover:bg-subtle text-secondary rounded-lg text-sm border border-subtle transition-colors shadow-sm font-medium">
              <span className="grid grid-cols-2 gap-[1px] w-3 h-3 mr-1">
                <div className="bg-subtle"></div><div className="bg-subtle"></div>
                <div className="bg-subtle"></div><div className="bg-subtle"></div>
              </span>
              <span>Data</span>
            </button>
            <button className="btn-interactive flex items-center space-x-1 px-3 py-1.5 bg-card hover:bg-subtle text-secondary rounded-lg text-sm border border-subtle transition-colors shadow-sm font-medium">
              <Info size={14} className="text-secondary" />
              <span>Learn</span>
            </button>
            <button className="btn-interactive px-2 py-1.5 bg-card hover:bg-subtle text-secondary rounded-lg text-sm border border-subtle transition-colors shadow-sm font-medium">
              <span className="tracking-widest leading-none">...</span>
            </button>
          </div>

          <div className="bg-brand/10 rounded-xl p-4 mb-6 flex items-start border border-blue-100">
            <div className="w-40 h-24 bg-blue-200 rounded-lg mr-4 flex-shrink-0 relative overflow-hidden">
              <img src="https://picsum.photos/seed/investing/160/96" alt="Investing Super Power" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <h3 className="text-primary font-bold text-lg mb-1">Ultimate guide to DCF valuation for stock investing</h3>
              <p className="text-sm text-secondary mb-4">Learn how to determine fair value like the best investors in the world.</p>
              <div className="flex space-x-3">
                <button className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-primary font-semibold rounded-lg text-sm transition-colors shadow-sm">Watch now</button>
                <button className="px-4 py-1.5 bg-card hover:bg-subtle text-secondary font-semibold rounded-lg text-sm transition-colors border border-subtle shadow-sm">Dismiss</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
               <CheckCircle2 className="w-5 h-5 text-bullish mr-3 flex-shrink-0 mt-0.5" />
               <p className="text-sm text-secondary">
                 <span className="text-bullish font-bold">Below Future Cash Flow Value:</span> MBB (<span className="border-b border-dotted border-subtle">₫26700</span>) is trading below our estimate of future cash flow value (<span className="border-b border-dotted border-subtle">₫49615.29</span>)
               </p>
            </div>
            <div className="flex items-start">
               <CheckCircle2 className="w-5 h-5 text-bullish mr-3 flex-shrink-0 mt-0.5" />
               <p className="text-sm text-secondary">
                 <span className="text-bullish font-bold">Significantly Below Future Cash Flow Value:</span> MBB is trading below future cash flow value by more than 20%.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1.2 Key Valuation Metric */}
      <div id="section_1_2">
        <KeyValuationMetric />
      </div>

      {/* 1.3 Price to Earnings Ratio vs Peers */}
      <div id="section_1_3">
        <RatioVsPeers />
      </div>

      {/* 1.4 Historical Price to Earnings Ratio */}
      <div id="section_1_4">
        <HistoricalFinancialRatioChart />
      </div>

      {/* 1.5 Ratio vs Industry */}
      <div id="section_1_5">
        <RatioVsIndustry />
      </div>

      {/* 1.6 Ratio vs Fair Ratio */}
      <div id="section_1_6">
        <RatioVsFairRatio />
      </div>

    </div>
  );
}
