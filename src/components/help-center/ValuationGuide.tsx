import React from 'react';
import { TrendingUp, Info, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { DCFDiagram } from '../HelpCenterDiagrams';
import { Accordion, Tooltip } from './HelpCenterShared';

export const ValuationGuide = () => {
  return (
    <Accordion id="understanding-valuation" title="Valuation">
      <div className="space-y-8">
        {/* Overview */}
        <div>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Valuation section helps you determine if a stock is trading at a good price. We compare the stock's current share price to its estimated fair value, as well as to its peers and the broader market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
              <h5 className="text-blue-600 font-bold mb-2 text-sm">Relative Valuation</h5>
              <p className="text-xs text-gray-600">Comparing the stock's price ratios (like P/E) to other companies or the market average.</p>
            </div>
            <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
              <h5 className="text-blue-600 font-bold mb-2 text-sm">Intrinsic Valuation</h5>
              <p className="text-xs text-gray-600">Estimating the stock's true value based on its future cash flows (Discounted Cash Flow).</p>
            </div>
          </div>
        </div>

        {/* DCF Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Discounted Cash Flow (DCF)</h4>
          <p className="text-sm text-gray-500 mb-6">
            We use a 2-Stage Discounted Cash Flow (DCF) model to estimate the intrinsic value of a stock. This involves forecasting the company's future free cash flows and discounting them back to today's value.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
            <DCFDiagram />
          </div>

          <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
            <div className="flex items-center mb-2">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
              <h6 className="text-gray-900 font-bold">Share Price vs. Fair Value</h6>
            </div>
            <p className="text-sm text-gray-600 mb-2">Is the stock trading significantly below our estimate of its fair value?</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li><strong className="text-emerald-600">Pass:</strong> Trading at least 20% below fair value.</li>
              <li><strong className="text-gray-500">Neutral:</strong> Trading within 20% of fair value.</li>
              <li><strong className="text-red-600">Fail:</strong> Trading more than 20% above fair value.</li>
            </ul>
          </div>
        </div>

        {/* Relative Valuation Section */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Relative Valuation Checks</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">PE vs Peers</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is the Price-to-Earnings ratio good compared to peer companies?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> PE is lower than the average PE of peer companies.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">PE vs Industry</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is the Price-to-Earnings ratio good compared to the industry average?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> PE is lower than the industry average PE.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">PE vs Fair PE</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Is the PE ratio reasonable given the company's growth forecast?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> PE is lower than the calculated Fair PE (PEG ratio &lt; 1).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Analyst Targets */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Analyst Price Targets</h4>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start">
            <Info className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              We aggregate price targets from major securities firms. While useful, analyst targets can vary widely and are often short-term focused (12 months).
            </p>
          </div>
        </div>
      </div>
    </Accordion>
  );
};
