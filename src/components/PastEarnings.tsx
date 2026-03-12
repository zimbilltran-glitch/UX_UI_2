import React from 'react';
import { PastEarningsOverview } from './PastEarningsOverview';
import { RevenueExpensesBreakdown } from './RevenueExpensesBreakdown';
import { EarningsRevenueHistory } from './EarningsRevenueHistory';
import { FreeCashFlowEarningsAnalysis } from './FreeCashFlowEarningsAnalysis';
import { PastEarningsGrowthAnalysis } from './PastEarningsGrowthAnalysis';
import { ReturnOnEquity } from './ReturnOnEquity';
import { ReturnOnAssetsCapital } from './ReturnOnAssetsCapital';
import { HelpCircle } from 'lucide-react';

const HelpCentreLink = () => (
  <div className="mt-6 pt-6 border-t border-subtle">
    <p className="text-secondary text-sm">
      For a more detailed breakdown of how we evaluate past earnings performance, please check out our <a href="#" className="text-brand hover:text-brand transition-colors font-medium">Help Centre</a>.
    </p>
  </div>
);

const SectionHeader = ({ id, title, description }: { id: string, title: string, description: string }) => (
  <div className="mb-6 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
      <p className="text-secondary">{description}</p>
    </div>
    <button className="btn-interactive flex items-center space-x-2 px-4 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg transition-colors text-sm font-semibold text-secondary shadow-sm">
      <HelpCircle className="w-4 h-4" />
      <span>Learn</span>
    </button>
  </div>
);

export const PastEarnings = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <PastEarningsOverview />

      <RevenueExpensesBreakdown />
      <EarningsRevenueHistory />
      <FreeCashFlowEarningsAnalysis />
      <PastEarningsGrowthAnalysis />
      <ReturnOnEquity />
      <ReturnOnAssetsCapital />
    </div>
  );
};
