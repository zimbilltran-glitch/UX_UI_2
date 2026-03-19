import React from 'react';
import { FutureGrowthOverview } from './FutureGrowthOverview';
import { EarningsRevenueForecast } from './EarningsRevenueForecast';
import { AnalystFutureGrowthForecasts } from './AnalystFutureGrowthForecasts';
import { EPSGrowthForecasts } from './EPSGrowthForecasts';
import { FutureReturnOnEquity } from './FutureReturnOnEquity';
import { Info, ExternalLink } from 'lucide-react';

const SectionHeader = ({ title, description, id }: { title: string, description: string, id: string }) => (
  <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4" id={id}>
    <div>
      <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
      <p className="text-secondary text-sm">{description}</p>
    </div>
    <button className="btn-interactive flex items-center space-x-2 bg-card hover:bg-subtle border border-subtle text-secondary px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm flex-shrink-0">
      <Info className="w-4 h-4" />
      <span>Learn</span>
    </button>
  </div>
);

const HelpCentreLink = () => (
  <div className="mt-8 pt-6 border-t border-subtle text-sm text-secondary">
    For a more detailed breakdown of future growth forecasts, please check out our <a href="#" className="text-brand hover:text-brand font-medium inline-flex items-center">Help Centre <ExternalLink className="w-3 h-3 ml-1" /></a>.
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

    </div>
  );
}
