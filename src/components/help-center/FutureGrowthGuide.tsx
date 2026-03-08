import React from 'react';
import { GrowthChart } from '../HelpCenterDiagrams';
import { Accordion } from './HelpCenterShared';

export const FutureGrowthGuide = () => {
  return (
    <Accordion id="future-growth" title="Future Growth">
      <div className="space-y-8">
        {/* Overview */}
        <div>
          <p className="text-secondary leading-relaxed mb-4">
            The Future Growth section analyzes analyst estimates for the company's future earnings and revenue. We look for companies that are expected to grow faster than the market and their industry peers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="surface-card border border-subtle p-4 rounded-xl bg-card">
              <h5 className="text-brand font-bold mb-2 text-sm">Earnings Growth</h5>
              <p className="text-xs text-secondary">Forecasted annual growth rate of the company's net income.</p>
            </div>
            <div className="surface-card border border-subtle p-4 rounded-xl bg-card">
              <h5 className="text-brand font-bold mb-2 text-sm">Revenue Growth</h5>
              <p className="text-xs text-secondary">Forecasted annual growth rate of the company's total revenue.</p>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="border-t border-subtle pt-6">
          <h4 className="text-xl font-bold text-primary mb-4">Analyst Estimates</h4>
          <p className="text-sm text-secondary mb-6">
            We aggregate estimates from all analysts covering the stock to create a consensus forecast.
          </p>
          
          <div className="bg-base p-6 rounded-xl border border-subtle mb-6 shadow-sm">
            <GrowthChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">Earnings vs Market</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Is earnings growth forecasted to be higher than the market average?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Forecasted annual earnings growth &gt; Market average.</li>
              </ul>
            </div>
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">High Growth Earnings</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Is the company expected to grow earnings significantly?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Forecasted annual earnings growth &gt; 20%.</li>
              </ul>
            </div>
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">Revenue vs Market</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Is revenue growth forecasted to be higher than the market average?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Forecasted annual revenue growth &gt; Market average.</li>
              </ul>
            </div>
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">Future ROE</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Is the company expected to generate high returns on equity in 3 years?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Forecasted ROE in 3 years &gt; 20%.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};
