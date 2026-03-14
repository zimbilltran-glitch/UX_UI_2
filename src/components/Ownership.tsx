import React from 'react';
import { RecentInsiderTransactions } from './RecentInsiderTransactions';
import { OwnershipBreakdown } from './OwnershipBreakdown';
import { TopShareholders } from './TopShareholders';

export const Ownership = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mb-12" id="section_7_0">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-primary"><span className="text-secondary mr-2">7</span> Ownership</h1>
        </div>
        <p className="text-primary font-bold">Who are the major shareholders and have insiders been buying or selling?</p>
      </div>

      <div className="border-t border-subtle mb-12"></div>

      <RecentInsiderTransactions />
      <OwnershipBreakdown />
      <TopShareholders />
    </div>
  );
};
