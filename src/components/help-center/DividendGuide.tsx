import React from 'react';
import { DividendChart } from '../HelpCenterDiagrams';
import { Accordion } from './HelpCenterShared';

export const DividendGuide = () => {
  return (
    <Accordion id="dividend" title="Dividend">
      <div className="space-y-8">
        {/* Overview */}
        <div>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Dividend section analyzes the company's dividend payments. We check if the dividend yield is attractive, if payments have been stable and growing, and if they are sustainable based on earnings and cash flows.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
              <h5 className="text-blue-600 font-bold mb-2 text-sm">Dividend Yield</h5>
              <p className="text-xs text-gray-600">Annual dividend per share divided by the share price.</p>
            </div>
            <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
              <h5 className="text-blue-600 font-bold mb-2 text-sm">Payout Ratio</h5>
              <p className="text-xs text-gray-600">Percentage of earnings paid out as dividends.</p>
            </div>
          </div>
        </div>

        {/* Dividend History Chart */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Dividend History</h4>
          <p className="text-sm text-gray-500 mb-6">
            We track the company's dividend payments over the past 10 years to identify trends in stability and growth.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
            <DividendChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Dividend Yield vs Market</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is the dividend yield higher than the bottom 25% of dividend payers in the market?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Yield &gt; Bottom 25% of market payers.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">High Dividend Yield</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is the dividend yield higher than the top 25% of dividend payers in the market?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Yield &gt; Top 25% of market payers.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Stable Dividend</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Have dividend payments been stable over the past 10 years?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Volatility &lt; 20% over 10 years.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Growing Dividend</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Have dividend payments increased over the past 10 years?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Current dividend &gt; Dividend 10 years ago.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Dividend Coverage (Earnings)</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is the dividend covered by earnings?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Payout Ratio &lt; 90%.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Dividend Coverage (Cash Flow)</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is the dividend covered by free cash flows?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Cash Payout Ratio &lt; 90%.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};
