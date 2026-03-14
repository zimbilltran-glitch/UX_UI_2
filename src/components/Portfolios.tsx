import React, { useState } from 'react';
import { PortfolioHoldings } from './PortfolioHoldings';
import { PortfolioReturns } from './PortfolioReturns';
import { PortfolioNarratives } from './PortfolioNarratives';
import { PortfolioUpdates } from './PortfolioUpdates';
import { PortfolioDividends } from './PortfolioDividends';
import { PortfolioAnalysis } from './PortfolioAnalysis';
import { ChevronDown } from 'lucide-react';

export const Portfolios = () => {
  const [activeTab, setActiveTab] = useState('Holdings');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-3xl">🍿</span>
        <h1 className="text-3xl font-bold text-primary">Demo Portfolio</h1>
        <ChevronDown className="w-6 h-6 text-secondary" />
      </div>
      <div className="text-sm text-secondary mb-6">Analysis updated 1h ago</div>

      <div className="flex space-x-6 border-b border-subtle mb-8 overflow-x-auto scrollbar-hide">
        {['Holdings', 'Returns', 'Narratives', 'Updates', 'Dividends', 'Analysis'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-semibold transition-colors relative ${
              activeTab === tab ? 'text-brand' : 'text-secondary hover:text-primary'
            }`}
          >
            {tab}
            {tab === 'Updates' && <span className="ml-2 bg-brand text-white text-xs px-2 py-0.5 rounded-full">12</span>}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'Holdings' && <PortfolioHoldings />}
      {activeTab === 'Returns' && <PortfolioReturns />}
      {activeTab === 'Narratives' && <PortfolioNarratives />}
      {activeTab === 'Updates' && <PortfolioUpdates />}
      {activeTab === 'Dividends' && <PortfolioDividends />}
      {activeTab === 'Analysis' && <PortfolioAnalysis />}
    </div>
  );
};
