import React from 'react';
import { FutureGrowthOverview } from './FutureGrowthOverview';
import { EarningsRevenueForecast } from './EarningsRevenueForecast';
import { AnalystFutureGrowthForecasts } from './AnalystFutureGrowthForecasts';
import { Info, ExternalLink } from 'lucide-react';

const SectionHeader = ({ title, description, id }: { title: string, description: string, id: string }) => (
  <div className="mb-6 flex justify-between items-start" id={id}>
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
    <button className="flex items-center space-x-2 bg-[#1A1A1A] hover:bg-[#222222] border border-gray-800 text-gray-300 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
      <Info className="w-4 h-4" />
      <span>Learn</span>
    </button>
  </div>
);

const HelpCentreLink = () => (
  <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-400">
    For a more detailed breakdown of future growth forecasts, please check out our <a href="#" className="text-emerald-500 hover:text-emerald-400 font-medium inline-flex items-center">Help Centre <ExternalLink className="w-3 h-3 ml-1" /></a>.
  </div>
);

export function FutureGrowth() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <FutureGrowthOverview />
      <EarningsRevenueForecast />
      <AnalystFutureGrowthForecasts />

      {/* 2.2 Earnings vs Savings Rate */}
      <div className="mb-16">
        <SectionHeader 
          id="section_2_2"
          title="2.2 Earnings vs Savings Rate" 
          description="Is MBB's forecast earnings growth above the savings rate?"
        />
        <div className="bg-[#111111] rounded-xl p-8 border border-gray-800 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center border border-emerald-800/50">
                  <span className="text-emerald-500 font-bold text-lg">Pass</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="text-white font-medium">Earnings vs Savings Rate:</span> MBB's forecast earnings growth (16.7% per year) is above the savings rate (3.1%).
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-[#1A1A1A] p-6 rounded-lg border border-gray-800">
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">MBB Earnings Growth</span>
                     <span className="text-emerald-500 font-bold">16.7%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">Savings Rate</span>
                     <span className="text-gray-300 font-bold">3.1%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2">
                     <div className="bg-gray-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          <HelpCentreLink />
        </div>
      </div>

      {/* 2.3 Earnings vs Market */}
      <div className="mb-16">
        <SectionHeader 
          id="section_2_3"
          title="2.3 Earnings vs Market" 
          description="Are MBB's earnings forecast to grow faster than the market?"
        />
        <div className="bg-[#111111] rounded-xl p-8 border border-gray-800 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center border border-emerald-800/50">
                  <span className="text-emerald-500 font-bold text-lg">Pass</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="text-white font-medium">Earnings vs Market:</span> MBB's earnings (16.7% per year) are forecast to grow faster than the VN market (13.7% per year).
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-[#1A1A1A] p-6 rounded-lg border border-gray-800">
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">MBB Earnings Growth</span>
                     <span className="text-emerald-500 font-bold">16.7%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">VN Market Growth</span>
                     <span className="text-gray-300 font-bold">13.7%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2">
                     <div className="bg-gray-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          <HelpCentreLink />
        </div>
      </div>

      {/* 2.4 High Growth Earnings */}
      <div className="mb-16">
        <SectionHeader 
          id="section_2_4"
          title="2.4 High Growth Earnings" 
          description="Are MBB's earnings forecast to grow significantly?"
        />
        <div className="bg-[#111111] rounded-xl p-8 border border-gray-800 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center border border-red-800/50">
                  <span className="text-red-500 font-bold text-lg">Fail</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="text-white font-medium">High Growth Earnings:</span> MBB's earnings are forecast to grow, but not significantly (below 20% per year).
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-[#1A1A1A] p-6 rounded-lg border border-gray-800 relative overflow-hidden">
               <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-red-900/10 border-l border-red-900/30 flex items-center justify-center">
                 <span className="text-red-500/50 text-xs font-bold rotate-90 whitespace-nowrap tracking-widest uppercase">High Growth Threshold</span>
               </div>
               <div className="space-y-4 relative z-10 pr-12">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">MBB Earnings Growth</span>
                     <span className="text-red-400 font-bold">16.7%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2 relative">
                     <div className="bg-red-500 h-2 rounded-full" style={{ width: '83.5%' }}></div>
                     <div className="absolute top-0 bottom-0 left-[100%] w-px bg-red-500/50 h-4 -mt-1"></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">Target (&gt; 20%)</span>
                     <span className="text-gray-300 font-bold">20.0%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2">
                     <div className="bg-gray-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          <HelpCentreLink />
        </div>
      </div>

      {/* 2.5 Revenue vs Market */}
      <div className="mb-16">
        <SectionHeader 
          id="section_2_5"
          title="2.5 Revenue vs Market" 
          description="Is MBB's revenue forecast to grow faster than the market?"
        />
        <div className="bg-[#111111] rounded-xl p-8 border border-gray-800 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center border border-emerald-800/50">
                  <span className="text-emerald-500 font-bold text-lg">Pass</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="text-white font-medium">Revenue vs Market:</span> MBB's revenue (25.6% per year) is forecast to grow faster than the VN market (14.2% per year).
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-[#1A1A1A] p-6 rounded-lg border border-gray-800">
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">MBB Revenue Growth</span>
                     <span className="text-emerald-500 font-bold">25.6%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">VN Market Revenue</span>
                     <span className="text-gray-300 font-bold">14.2%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2">
                     <div className="bg-gray-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          <HelpCentreLink />
        </div>
      </div>

      {/* 2.6 High Growth Revenue */}
      <div className="mb-16">
        <SectionHeader 
          id="section_2_6"
          title="2.6 High Growth Revenue" 
          description="Is MBB's revenue forecast to grow significantly?"
        />
        <div className="bg-[#111111] rounded-xl p-8 border border-gray-800 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center border border-emerald-800/50">
                  <span className="text-emerald-500 font-bold text-lg">Pass</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="text-white font-medium">High Growth Revenue:</span> MBB's revenue (25.6% per year) is forecast to grow faster than 20% per year.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-[#1A1A1A] p-6 rounded-lg border border-gray-800 relative overflow-hidden">
               <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-emerald-900/10 border-l border-emerald-900/30 flex items-center justify-center">
                 <span className="text-emerald-500/50 text-xs font-bold rotate-90 whitespace-nowrap tracking-widest uppercase">High Growth Threshold</span>
               </div>
               <div className="space-y-4 relative z-10 pr-12">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">MBB Revenue Growth</span>
                     <span className="text-emerald-400 font-bold">25.6%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2 relative">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-400">Target (&gt; 20%)</span>
                     <span className="text-gray-300 font-bold">20.0%</span>
                   </div>
                   <div className="w-full bg-gray-800 rounded-full h-2">
                     <div className="bg-gray-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                     <div className="absolute top-0 bottom-0 left-[78%] w-px bg-gray-500/50 h-4 -mt-1"></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          <HelpCentreLink />
        </div>
      </div>

      {/* 2.7 Future ROE */}
      <div className="mb-16">
        <SectionHeader 
          id="section_2_7"
          title="2.7 Future Return on Equity" 
          description="Is MBB's Return on Equity forecast to be high in 3 years time?"
        />
        <div className="bg-[#111111] rounded-xl p-8 border border-gray-800 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center border border-emerald-800/50">
                  <span className="text-emerald-500 font-bold text-lg">Pass</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="text-white font-medium">Future ROE:</span> MBB's Return on Equity is forecast to be high in 3 years time (20.8%).
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1A1A1A" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="50.24" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">20.8%</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">ROE</span>
                </div>
              </div>
            </div>
          </div>
          <HelpCentreLink />
        </div>
      </div>

    </div>
  );
}
