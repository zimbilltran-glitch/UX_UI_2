import React from 'react';
import { FinancialHealthOverview } from './FinancialHealthOverview';
import { FinancialPositionAnalysis } from './FinancialPositionAnalysis';
import { DebtToEquityHistory } from './DebtToEquityHistory';
import { HelpCircle } from 'lucide-react';

const HelpCentreLink = () => (
  <div className="mt-6 pt-6 border-t border-subtle">
    <p className="text-secondary text-sm">
      For a more detailed breakdown of how we evaluate financial health, please check out our <a href="#" className="text-brand hover:text-brand transition-colors font-medium">Help Centre</a>.
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

export const FinancialHealth = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <FinancialHealthOverview />

      <FinancialPositionAnalysis />
      <DebtToEquityHistory />

      {/* Placeholder sections for the rest of the tab */}
      <div className="space-y-16">
        <div id="section_4_3">
          <SectionHeader id="section_4_3" title="4.3 Allowance for Bad Loans" description="Is there a sufficient allowance for bad loans?" />
          <div className="bg-card rounded-xl border border-subtle shadow-lg p-8 flex flex-col min-h-[200px]">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-secondary font-medium">Under Construction</p>
            </div>
            <HelpCentreLink />
          </div>
        </div>
      </div>
    </div>
  );
};
