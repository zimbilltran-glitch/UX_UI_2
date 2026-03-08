import React from 'react';
import { DividendChart } from '../HelpCenterDiagrams';
import { Accordion } from './HelpCenterShared';

export const DividendGuide = () => {
  return (
    <Accordion id="dividend" title="Dividend">
      <div className="space-y-8">
        {/* Overview */}
        <div>
          <p className="text-secondary leading-relaxed mb-4">
            The Dividend section analyzes the company's dividend payments. We check if the dividend yield is attractive, if payments have been stable and growing, and if they are sustainable based on earnings and cash flows.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="surface-card border border-subtle p-4 rounded-xl bg-card">
              <h5 className="text-brand font-bold mb-2 text-sm">Dividend Yield</h5>
              <p className="text-xs text-secondary">Annual dividend per share divided by the share price.</p>
            </div>
            <div className="surface-card border border-subtle p-4 rounded-xl bg-card">
              <h5 className="text-brand font-bold mb-2 text-sm">Payout Ratio</h5>
              <p className="text-xs text-secondary">Percentage of earnings paid out as dividends.</p>
            </div>
          </div>
        </div>

        {/* Dividend History Chart */}
        <div className="border-t border-subtle pt-6">
          <h4 className="text-xl font-bold text-primary mb-4">Dividend History</h4>
          <p className="text-sm text-secondary mb-6">
            We track the company's dividend payments over the past 10 years to identify trends in stability and growth.
          </p>
          
          <div className="bg-base p-6 rounded-xl border border-subtle mb-6 shadow-sm">
            <DividendChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">Dividend Yield vs Market</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Is the dividend yield higher than the bottom 25% of dividend payers in the market?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Yield &gt; Bottom 25% of market payers.</li>
              </ul>
            </div>
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">High Dividend Yield</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Is the dividend yield higher than the top 25% of dividend payers in the market?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Yield &gt; Top 25% of market payers.</li>
              </ul>
            </div>
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">Stable Dividend</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Have dividend payments been stable over the past 10 years?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Volatility &lt; 20% over 10 years.</li>
              </ul>
            </div>
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">Growing Dividend</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Have dividend payments increased over the past 10 years?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Current dividend &gt; Dividend 10 years ago.</li>
              </ul>
            </div>
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">Dividend Coverage (Earnings)</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Is the dividend covered by earnings?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Payout Ratio &lt; 90%.</li>
              </ul>
            </div>
            <div className="surface-card border border-subtle p-5 rounded-xl bg-card">
              <div className="flex items-center mb-2">
                <span className="bg-bullish/20 text-bullish text-xs font-bold px-2 py-1 rounded mr-3 border border-bullish/30">Check</span>
                <h6 className="text-primary font-bold">Dividend Coverage (Cash Flow)</h6>
              </div>
              <p className="text-sm text-secondary mb-2">Is the dividend covered by free cash flows?</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li><strong className="text-bullish">Pass:</strong> Cash Payout Ratio &lt; 90%.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};
