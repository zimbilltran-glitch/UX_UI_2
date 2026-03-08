import React from 'react';
import { PastEarningsOverview } from './PastEarningsOverview';
import { HelpCircle } from 'lucide-react';

const HelpCentreLink = () => (
  <div className="mt-6 pt-6 border-t border-gray-200">
    <p className="text-gray-500 text-sm">
      For a more detailed breakdown of how we evaluate past earnings performance, please check out our <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">Help Centre</a>.
    </p>
  </div>
);

const SectionHeader = ({ id, title, description }: { id: string, title: string, description: string }) => (
  <div className="mb-6 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
    <button className="btn-interactive flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors text-sm font-semibold text-gray-700 shadow-sm">
      <HelpCircle className="w-4 h-4" />
      <span>Learn</span>
    </button>
  </div>
);

export const PastEarnings = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <PastEarningsOverview />

      {/* Placeholder sections for the rest of the tab */}
      <div className="space-y-16">
        <div id="section_3_1">
          <SectionHeader id="section_3_1" title="3.1 Quality Earnings" description="Does MBB have high-quality earnings?" />
          <div className="surface-card p-8 flex flex-col min-h-[200px]">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 font-medium">Under Construction</p>
            </div>
            <HelpCentreLink />
          </div>
        </div>

        <div id="section_3_2">
          <SectionHeader id="section_3_2" title="3.2 Growing Profit Margin" description="Are MBB's profit margins improving?" />
          <div className="surface-card p-8 flex flex-col min-h-[200px]">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 font-medium">Under Construction</p>
            </div>
            <HelpCentreLink />
          </div>
        </div>

        <div id="section_3_3">
          <SectionHeader id="section_3_3" title="3.3 Earnings Trend" description="How have MBB's earnings trended over the past 5 years?" />
          <div className="surface-card p-8 flex flex-col min-h-[200px]">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 font-medium">Under Construction</p>
            </div>
            <HelpCentreLink />
          </div>
        </div>

        <div id="section_3_4">
          <SectionHeader id="section_3_4" title="3.4 Accelerating Growth" description="Is MBB's recent earnings growth accelerating?" />
          <div className="surface-card p-8 flex flex-col min-h-[200px]">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 font-medium">Under Construction</p>
            </div>
            <HelpCentreLink />
          </div>
        </div>

        <div id="section_3_5">
          <SectionHeader id="section_3_5" title="3.5 Earnings vs Industry" description="How does MBB's earnings growth compare to the industry?" />
          <div className="surface-card p-8 flex flex-col min-h-[200px]">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 font-medium">Under Construction</p>
            </div>
            <HelpCentreLink />
          </div>
        </div>

        <div id="section_3_6">
          <SectionHeader id="section_3_6" title="3.6 High ROE" description="Does MBB have a high Return on Equity?" />
          <div className="surface-card p-8 flex flex-col min-h-[200px]">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 font-medium">Under Construction</p>
            </div>
            <HelpCentreLink />
          </div>
        </div>
      </div>
    </div>
  );
};
