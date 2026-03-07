/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CompanyOverview } from './components/CompanyOverview';
import { Valuation } from './components/Valuation';
import { FutureGrowth } from './components/FutureGrowth';
import { PastEarnings } from './components/PastEarnings';
import { HelpCenter } from './components/HelpCenter';

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  const navigateTo = (tab: string, sectionId?: string) => {
    setActiveTab(tab);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        const mainContainer = document.querySelector('main');
        if (element && mainContainer) {
          const elementRect = element.getBoundingClientRect();
          const mainRect = mainContainer.getBoundingClientRect();
          const scrollTop = mainContainer.scrollTop + (elementRect.top - mainRect.top) - 32;
          mainContainer.scrollTo({ top: scrollTop, behavior: 'smooth' });
        } else if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150); // Small delay to allow the tab content to render
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return <CompanyOverview onNavigate={navigateTo} />;
      case 'Valuation': return <Valuation />;
      case 'Future Growth': return <FutureGrowth />;
      case 'Past Performance': return <PastEarnings />;
      case 'Help Center': return <HelpCenter />;
      case 'Financial Health': 
      case 'Dividend':
      case 'Management':
      case 'Ownership':
      case 'Other information':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{activeTab}</h2>
              <p className="text-gray-400">This section is under construction.</p>
            </div>
          </div>
        );
      default: return <CompanyOverview onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] overflow-hidden font-sans text-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
