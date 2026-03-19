import React, { useState } from 'react';
import { ChevronDown, FileText, DollarSign, Activity, Users, AlertTriangle, MoreHorizontal } from 'lucide-react';

const categories = [
  { id: 'earnings', name: 'Earnings', icon: <DollarSign className="w-4 h-4" />, count: 0 },
  { id: 'valuations', name: 'Valuations', icon: <Activity className="w-4 h-4" />, count: 0 },
  { id: 'narrative', name: 'Narrative Updates', icon: <FileText className="w-4 h-4" />, count: 7 },
  { id: 'dividends', name: 'Dividends', icon: <DollarSign className="w-4 h-4" />, count: 2 },
  { id: 'insider', name: 'Insider Trading', icon: <Users className="w-4 h-4" />, count: 2 },
  { id: 'risk', name: 'Risk and Legal', icon: <AlertTriangle className="w-4 h-4" />, count: 1 },
  { id: 'other', name: 'Other', icon: <MoreHorizontal className="w-4 h-4" />, count: 0 },
];

const updatesData = [
  {
    id: 1,
    company: 'Bank of America',
    symbol: 'BAC',
    date: 'Oct 18, 2025',
    title: 'Scott+Scott Files Lawsuit Against Jpmorgan Chase, Bank of America, Wells Fargo, Citibank, U.S. Bank, Pnc, and Truist',
    description: 'Scott+Scott Attorneys at Law LLP filed a class action lawsuit on behalf of two California and Colorado residents against some of the nation\'s leading banks, including JPMorgan Chase, Bank of America, Wells Fargo, Citibank, U.S....',
    category: 'risk',
    logoColor: 'bg-red-100 text-red-600'
  },
  {
    id: 2,
    company: 'CrowdStrike Holdings',
    symbol: 'CRWD',
    date: 'Mar 5, 2026',
    title: 'Full year 2026 earnings: EPS exceeds analyst expectations',
    description: 'Full year 2026 results: US$0.65 loss per share (further deteriorated from US$0.079 loss in FY 2025). Revenue: US$4.81b (up 22% from FY 2025). Net loss: US$162.5m (loss widened US$143.2m from FY 2025). Revenue was in lin...',
    category: 'earnings',
    logoColor: 'bg-red-500 text-white'
  },
  {
    id: 3,
    company: 'UnitedHealth Group',
    symbol: 'UNH',
    date: 'Mar 3, 2026',
    title: 'Full year 2025 earnings: EPS misses analyst expectations',
    description: 'Full year 2025 results: EPS: US$13.23 (down from US$15.64 in FY 2024). Revenue: US$447.6b (up 12% from FY 2024). Net income: US$12.1b (down 16% from FY 2024). Profit margin: 2.7% (down from 3.6% in FY 2024). The decrease in...',
    category: 'earnings',
    logoColor: 'bg-blue-500 text-white'
  },
  {
    id: 4,
    company: 'Bank of America',
    symbol: 'BAC',
    date: 'Feb 28, 2026',
    title: 'Full year 2025 earnings: EPS in line with analyst expectations despite revenue beat',
    description: 'Full year 2025 results: EPS: US$3.86 (up from US$3.23 in FY 2024). Revenue: US$107.4b (up 7.4% from FY 2024). Net income: US$29.1b (up 15% from FY 2024). Profit margin: 27% (up from 25% in FY 2024). The increase in margin was...',
    category: 'earnings',
    logoColor: 'bg-red-100 text-red-600'
  },
  {
    id: 5,
    company: 'NVIDIA',
    symbol: 'NVDA',
    date: 'Feb 27, 2026',
    title: 'Full year 2026 earnings: EPS exceeds analyst expectations',
    description: 'Full year 2026 results: EPS: US$4.93 (up from US$2.97 in FY 2025). Revenue: US$215.9b (up 66% from FY 2025). Net income: US$120.1b (up 65% from FY 2025). Profit margin: 56% (in line with FY 2025). Revenue was in line with analys...',
    category: 'earnings',
    logoColor: 'bg-green-500 text-white'
  },
  {
    id: 6,
    company: 'PLS Group',
    symbol: 'PLS',
    date: 'Feb 21, 2026',
    title: 'First half 2026 earnings released',
    description: 'First half 2026 results: Revenue: AU$624.0m (up 47% from 1H 2025). Net income: AU$33.0m (up AU$102.4m from 1H 2025). Profit margin: 5.3% (up from net loss in 1H 2025). The move to profitability was driven by higher revenue...',
    category: 'earnings',
    logoColor: 'bg-teal-100 text-teal-600'
  }
];

export const PortfolioUpdates = () => {
  const [activeCategory, setActiveCategory] = useState('earnings');

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="space-y-1">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                activeCategory === category.id 
                  ? 'bg-subtle text-primary' 
                  : 'text-secondary hover:bg-subtle/50 hover:text-primary'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeCategory === category.id ? 'bg-card border border-subtle text-brand' : 'bg-base border border-subtle text-secondary'
                }`}>
                  {category.icon}
                </div>
                <div className="text-left">
                  <div className={`text-sm font-medium ${activeCategory === category.id ? 'text-primary' : ''}`}>
                    {category.name}
                  </div>
                  {category.count > 0 && (
                    <div className="text-xs text-secondary flex items-center mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand mr-1.5"></span>
                      {category.count} new
                    </div>
                  )}
                </div>
              </div>
              {activeCategory === category.id && <ChevronDown className="w-4 h-4 text-secondary" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-card rounded-xl border border-subtle p-2">
          <div className="space-y-2">
            {updatesData.map(update => (
              <div key={update.id} className="p-4 hover:bg-subtle/50 rounded-lg transition-colors cursor-pointer group">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${update.logoColor}`}>
                    {update.symbol.substring(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-primary">{update.company}</span>
                      <span className="text-xs text-secondary">{update.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-primary mb-2 group-hover:text-brand transition-colors">
                      {update.title}
                    </h3>
                    <p className="text-sm text-secondary line-clamp-2 leading-relaxed">
                      {update.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
