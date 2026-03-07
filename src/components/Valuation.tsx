import React from 'react';
import { CheckCircle2, XCircle, Star, Info, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, LineChart, Line, ComposedChart, Area, ResponsiveContainer } from 'recharts';
import { KeyValuationMetric } from './KeyValuationMetric';
import { HistoricalFinancialRatioChart } from './HistoricalFinancialRatioChart';
import { RatioVsPeers } from './RatioVsPeers';
import { RatioVsIndustry } from './RatioVsIndustry';
import { RatioVsFairRatio } from './RatioVsFairRatio';
import { ValuationOverview } from './ValuationOverview';

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

const peerData = [
  { name: 'Commercial Bank for Investment and Development of Vietnam', pe: 10.2, growth: '13.27%' },
  { name: 'Vietnam Prosperity Commercial Bank', pe: 8.8, growth: '16.47%' },
  { name: 'Vietnam Technological and Commercial Bank', pe: 8.8, growth: '15.92%' },
  { name: 'Military Commercial Bank', pe: 8.0, growth: '16.69%', isTarget: true },
  { name: 'Vietnam Commercial Bank for Industry and Trade', pe: 8.0, growth: '10.30%' },
];

const historicalPEData = [
  { date: '2021-06', pe: 7.5 },
  { date: '2021-12', pe: 11.2 },
  { date: '2022-06', pe: 6.2 },
  { date: '2022-12', pe: 5.1 },
  { date: '2023-06', pe: 5.8 },
  { date: '2023-12', pe: 5.5 },
  { date: '2024-06', pe: 7.1 },
  { date: '2024-12', pe: 6.0 },
  { date: '2025-06', pe: 6.8 },
  { date: '2025-12', pe: 7.2 },
  { date: '2026-03', pe: 8.0 },
];

const industryPEData = [
  { range: '3.0-4.5', count: 0 },
  { range: '4.5-6.0', count: 2 },
  { range: '6.0-7.5', count: 4 },
  { range: '7.5-9.0', count: 7, isTarget: true }, // MBB is here
  { range: '9.0-10.5', count: 2 },
  { range: '10.5-12.0', count: 2 },
  { range: '12.0+', count: 1 },
];

export function Valuation() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <ValuationOverview />

      {/* 1.1 Share Price vs Future Cash Flow Value */}
      <div className="mb-12" id="section_1_1">
        <h2 className="text-2xl font-bold text-white mb-4">1.1 Share Price vs Future Cash Flow Value</h2>
        <p className="text-gray-300 mb-8">
          What is the Fair Price of MBB when looking at its future cash flows? For this estimate we use a Discounted Cash Flow model.
        </p>

        <div className="bg-[#0B0E14] rounded-xl p-8 border border-gray-800 relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#00FFA3]/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative pt-24 pb-24 w-full flex flex-col justify-center">
            
            {/* The Bar */}
            <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-[#00FFA3] via-[#FDE047] to-[#FF6B6B]">
              
              {/* Gap Highlight (Glowing Trail) */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-4 bg-[#00FFA3]/20 blur-[4px] rounded-full"
                style={{ left: '35%', width: '40%' }}
              ></div>
              <div 
                className="absolute top-0 h-full bg-[#00FFA3]/40"
                style={{ left: '35%', width: '40%' }}
              ></div>

              {/* Badge above the gap */}
              <div 
                className="absolute bottom-full mb-8 flex flex-col items-center"
                style={{ left: '55%', transform: 'translateX(-50%)' }}
              >
                <div className="flex items-center space-x-1 bg-[#00FFA3]/10 border border-[#00FFA3]/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(0,255,163,0.15)]">
                  <TrendingUp size={14} className="text-[#00FFA3]" />
                  <span className="text-[#00FFA3] font-bold text-xs tracking-wider">46.2% UNDERVALUED</span>
                </div>
                {/* Connecting line for badge */}
                <div className="h-6 w-px bg-gradient-to-b from-[#00FFA3]/50 to-transparent mt-1"></div>
              </div>

              {/* Current Price Marker */}
              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '35%' }}>
                {/* Glowing dot */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute w-4 h-4 bg-white/40 rounded-full blur-[2px]"></div>
                  <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"></div>
                </div>
                
                {/* Glassmorphism Label (Above) */}
                <div className="absolute bottom-full mb-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="bg-white/5 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
                    <div className="text-gray-400 text-[10px] uppercase tracking-wider font-medium mb-0.5 text-center">Current Price</div>
                    <div className="text-white font-bold text-lg tracking-tight">₫26,700.00</div>
                  </div>
                  {/* Pointer */}
                  <div className="w-px h-5 bg-gradient-to-b from-white/50 to-transparent mt-1"></div>
                </div>
              </div>

              {/* Fair Value Marker */}
              <div className="absolute top-1/2 -translate-y-1/2" style={{ left: '75%' }}>
                {/* Neon Line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-12 bg-[#00FFA3] shadow-[0_0_10px_#00FFA3]"></div>
                
                {/* Label (Below) */}
                <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  {/* Pointer */}
                  <div className="w-px h-5 bg-gradient-to-t from-[#00FFA3]/50 to-transparent mb-1"></div>
                  <div className="whitespace-nowrap text-center">
                    <div className="text-gray-400 text-[10px] uppercase tracking-wider font-medium mb-0.5">Fair Value</div>
                    <div className="text-[#00FFA3] font-bold text-lg tracking-tight drop-shadow-[0_0_8px_rgba(0,255,163,0.4)]">₫49,615.29</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-[#111827] rounded-xl p-4 border border-gray-800 mt-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white font-bold">Future Cash Flow Value History</h3>
              <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded border border-gray-700 transition-colors">
                Set Fair Value
              </button>
            </div>

            <div className="flex justify-between items-end mb-4">
              <div className="flex space-x-8">
                <div>
                  <div className="flex items-center text-xs text-gray-400 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                    07 Mar
                  </div>
                  <div className="text-white font-bold text-lg border-b border-dotted border-gray-500 inline-block">₫26,700.00</div>
                </div>
                <div>
                  <div className="flex items-center text-xs text-gray-400 mb-1">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                    Future Cash Flow Value
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <div className="text-white font-bold text-lg border-b border-dotted border-gray-500 inline-block">₫49,614.69</div>
                    <span className="text-emerald-500 text-xs font-medium">46.2% undervalued</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 text-right">
                <div>
                  <div className="text-xs text-gray-400 mb-1">1Y</div>
                  <div className="text-emerald-500 text-sm font-medium">43.9%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">7D</div>
                  <div className="text-red-500 text-sm font-medium">-6.3%</div>
                </div>
              </div>
            </div>

            <div className="h-32 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={fcfHistoryData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                  <Line type="stepAfter" dataKey="fairValue" stroke="#ec4899" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4 mb-8">
            <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm border border-gray-700 transition-colors">
              Explore Narratives
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm border border-gray-700 transition-colors">
              <span className="grid grid-cols-2 gap-[1px] w-3 h-3 mr-1">
                <div className="bg-gray-400"></div><div className="bg-gray-400"></div>
                <div className="bg-gray-400"></div><div className="bg-gray-400"></div>
              </span>
              <span>Data</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm border border-gray-700 transition-colors">
              <Info size={14} className="text-gray-400" />
              <span>Learn</span>
            </button>
            <button className="px-2 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm border border-gray-700 transition-colors">
              <span className="tracking-widest leading-none">...</span>
            </button>
          </div>

          <div className="bg-[#253141] rounded-xl p-4 mb-6 flex items-start border border-gray-700">
            <div className="w-40 h-24 bg-blue-900 rounded-lg mr-4 flex-shrink-0 relative overflow-hidden">
              <img src="https://picsum.photos/seed/investing/160/96" alt="Investing Super Power" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-2 left-2 text-white font-black text-xs leading-tight">
                YOUR INVESTING<br/>SUPER POWER
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">Ultimate guide to DCF valuation for stock investing</h3>
              <p className="text-sm text-gray-400 mb-4">Learn how to determine fair value like the best investors in the world.</p>
              <div className="flex space-x-3">
                <button className="px-4 py-1.5 bg-[#facc15] hover:bg-yellow-400 text-black font-medium rounded-lg text-sm transition-colors">Watch now</button>
                <button className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg text-sm transition-colors">Dismiss</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
               <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
               <p className="text-sm text-gray-300">
                 <span className="text-emerald-400 font-medium">Below Future Cash Flow Value:</span> MBB (<span className="border-b border-dotted border-gray-500">₫26700</span>) is trading below our estimate of future cash flow value (<span className="border-b border-dotted border-gray-500">₫49615.29</span>)
               </p>
            </div>
            <div className="flex items-start">
               <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
               <p className="text-sm text-gray-300">
                 <span className="text-emerald-400 font-medium">Significantly Below Future Cash Flow Value:</span> MBB is trading below future cash flow value by more than 20%.
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
