import React from 'react';
import { GrowthChart } from '../HelpCenterDiagrams';
import { Accordion } from './HelpCenterShared';

export const FutureGrowthGuide = () => {
  return (
    <Accordion id="future-growth" title="Future Growth">
      <div className="space-y-8">
        {/* Overview */}
        <div>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Future Growth section analyzes analyst estimates for the company's future earnings and revenue. We look for companies that are expected to grow faster than the market and their industry peers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
              <h5 className="text-blue-600 font-bold mb-2 text-sm">Earnings Growth</h5>
              <p className="text-xs text-gray-600">Forecasted annual growth rate of the company's net income.</p>
            </div>
            <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
              <h5 className="text-blue-600 font-bold mb-2 text-sm">Revenue Growth</h5>
              <p className="text-xs text-gray-600">Forecasted annual growth rate of the company's total revenue.</p>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Analyst Estimates</h4>
          <p className="text-sm text-gray-500 mb-6">
            We aggregate estimates from all analysts covering the stock to create a consensus forecast.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
            <GrowthChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Earnings vs Market</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is earnings growth forecasted to be higher than the market average?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Forecasted annual earnings growth &gt; Market average.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">High Growth Earnings</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is the company expected to grow earnings significantly?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Forecasted annual earnings growth &gt; 20%.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Revenue vs Market</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is revenue growth forecasted to be higher than the market average?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Forecasted annual revenue growth &gt; Market average.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Future ROE</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is the company expected to generate high returns on equity in 3 years?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Forecasted ROE in 3 years &gt; 20%.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};
