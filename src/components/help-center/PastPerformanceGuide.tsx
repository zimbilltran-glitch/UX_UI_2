import React from 'react';
import { EarningsHistoryChart } from '../HelpCenterDiagrams';
import { Accordion } from './HelpCenterShared';

export const PastPerformanceGuide = () => {
  return (
    <Accordion id="past-performance" title="Past Performance">
      <div className="space-y-8">
        {/* Overview */}
        <div>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Past Performance section analyzes the company's historical financial performance over the last 5 years. We look for consistent earnings growth and high returns on equity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
              <h5 className="text-blue-600 font-bold mb-2 text-sm">Earnings Growth</h5>
              <p className="text-xs text-gray-600">Historical annual growth rate of the company's net income over the past 1, 3, and 5 years.</p>
            </div>
            <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
              <h5 className="text-blue-600 font-bold mb-2 text-sm">Return on Equity (ROE)</h5>
              <p className="text-xs text-gray-600">A measure of financial performance calculated by dividing net income by shareholders' equity.</p>
            </div>
          </div>
        </div>

        {/* Earnings History Chart */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Earnings History</h4>
          <p className="text-sm text-gray-500 mb-6">
            We track the company's earnings and revenue over the past 5 years to identify trends.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
            <EarningsHistoryChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Earnings vs Savings Rate</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Did the company grow earnings faster than the risk-free rate?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> 5-year average earnings growth &gt; Savings rate (approx 6%).</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Earnings vs Industry</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Did the company grow earnings faster than its industry peers?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Past year earnings growth &gt; Industry average.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">High ROE</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Does the company generate high returns on equity?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Current ROE &gt; 20%.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Return on Assets (ROA)</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Does the company generate high returns on its assets?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Current ROA &gt; Industry average.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};
