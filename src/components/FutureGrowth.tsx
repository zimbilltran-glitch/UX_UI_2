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
    <button className="btn-interactive flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm">
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

    </div>
  );
}
