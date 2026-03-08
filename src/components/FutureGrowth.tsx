import React from 'react';
import { FutureGrowthOverview } from './FutureGrowthOverview';
import { EarningsRevenueForecast } from './EarningsRevenueForecast';
import { AnalystFutureGrowthForecasts } from './AnalystFutureGrowthForecasts';
import { EPSGrowthForecasts } from './EPSGrowthForecasts';
import { FutureReturnOnEquity } from './FutureReturnOnEquity';
import { Info, ExternalLink } from 'lucide-react';

const SectionHeader = ({ title, description, id }: { title: string, description: string, id: string }) => (
  <div className="mb-6 flex justify-between items-start" id={id}>
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
    <button className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm">
      <Info className="w-4 h-4" />
      <span>Learn</span>
    </button>
  </div>
);

const HelpCentreLink = () => (
  <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
    For a more detailed breakdown of future growth forecasts, please check out our <a href="#" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">Help Centre <ExternalLink className="w-3 h-3 ml-1" /></a>.
  </div>
);

export function FutureGrowth() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <FutureGrowthOverview />
      <EarningsRevenueForecast />
      <AnalystFutureGrowthForecasts />

      <EPSGrowthForecasts />

      <FutureReturnOnEquity />

      {/* 2.5 High Growth Earnings */}
      <div className="mb-16">
        <SectionHeader 
          id="section_2_5"
          title="2.5 High Growth Earnings" 
          description="Are MBB's earnings forecast to grow significantly?"
        />
        <div className="surface-card p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center border border-red-200">
                  <span className="text-red-600 font-bold text-lg">Fail</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="text-gray-900 font-bold">High Growth Earnings:</span> MBB's earnings are forecast to grow, but not significantly (below 20% per year).
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-xl border border-gray-200 relative overflow-hidden shadow-sm">
               <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-red-50 border-l border-red-100 flex items-center justify-center">
                 <span className="text-red-300 text-xs font-bold rotate-90 whitespace-nowrap tracking-widest uppercase">High Growth Threshold</span>
               </div>
               <div className="space-y-4 relative z-10 pr-12">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-500 font-medium">MBB Earnings Growth</span>
                     <span className="text-red-500 font-bold">16.7%</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2 relative">
                     <div className="bg-red-500 h-2 rounded-full" style={{ width: '83.5%' }}></div>
                     <div className="absolute top-0 bottom-0 left-[100%] w-px bg-red-300 h-4 -mt-1"></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-500 font-medium">Target (&gt; 20%)</span>
                     <span className="text-gray-900 font-bold">20.0%</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-gray-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          <HelpCentreLink />
        </div>
      </div>

      {/* 2.6 Revenue vs Market */}
      <div className="mb-16">
        <SectionHeader 
          id="section_2_6"
          title="2.6 Revenue vs Market" 
          description="Is MBB's revenue forecast to grow faster than the market?"
        />
        <div className="surface-card p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                  <span className="text-emerald-600 font-bold text-lg">Pass</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="text-gray-900 font-bold">Revenue vs Market:</span> MBB's revenue (25.6% per year) is forecast to grow faster than the VN market (14.2% per year).
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-500 font-medium">MBB Revenue Growth</span>
                     <span className="text-emerald-600 font-bold">25.6%</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-500 font-medium">VN Market Revenue</span>
                     <span className="text-gray-900 font-bold">14.2%</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-gray-400 h-2 rounded-full" style={{ width: '50%' }}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          <HelpCentreLink />
        </div>
      </div>

      {/* 2.7 High Growth Revenue */}
      <div className="mb-16">
        <SectionHeader 
          id="section_2_7"
          title="2.7 High Growth Revenue" 
          description="Is MBB's revenue forecast to grow significantly?"
        />
        <div className="surface-card p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                  <span className="text-emerald-600 font-bold text-lg">Pass</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="text-gray-900 font-bold">High Growth Revenue:</span> MBB's revenue (25.6% per year) is forecast to grow faster than 20% per year.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-xl border border-gray-200 relative overflow-hidden shadow-sm">
               <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-emerald-50 border-l border-emerald-100 flex items-center justify-center">
                 <span className="text-emerald-300 text-xs font-bold rotate-90 whitespace-nowrap tracking-widest uppercase">High Growth Threshold</span>
               </div>
               <div className="space-y-4 relative z-10 pr-12">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-500 font-medium">MBB Revenue Growth</span>
                     <span className="text-emerald-600 font-bold">25.6%</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2 relative">
                     <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-gray-500 font-medium">Target (&gt; 20%)</span>
                     <span className="text-gray-900 font-bold">20.0%</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-gray-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                     <div className="absolute top-0 bottom-0 left-[78%] w-px bg-gray-400 h-4 -mt-1"></div>
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
        <div className="surface-card p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                  <span className="text-emerald-600 font-bold text-lg">Pass</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="text-gray-900 font-bold">Future ROE:</span> MBB's Return on Equity is forecast to be high in 3 years time (20.8%).
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="50.24" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">20.8%</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">ROE</span>
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
