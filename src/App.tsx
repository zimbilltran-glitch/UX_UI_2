import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { CompanyOverview } from './components/CompanyOverview';
import { Valuation } from './components/Valuation';
import { FutureGrowth } from './components/FutureGrowth';
import { PastEarnings } from './components/PastEarnings';
import { FinancialStatements } from './components/FinancialStatements';
import { FinancialHealth } from './components/FinancialHealth';
import { Dividend } from './components/Dividend';
import { Management } from './components/Management';
import { Ownership } from './components/Ownership';
import { Portfolios } from './components/Portfolios';
import { HelpCenter } from './components/HelpCenter';
import { Watchlist } from './components/Watchlist';
import { MarketDashboard } from './components/MarketDashboard';
import Header from './components/Header';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { colors } from './theme/colors';
import { useFinancialData } from './hooks/useFinancialData';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const { data, loading, error } = useFinancialData('MBB');

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log('App test - Data:', data);
  console.log('App test - Loading:', loading);
  console.log('App test - Error:', error);

  const navigateTo = (tab: string, sectionId?: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
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
      case 'Dashboard': return <MarketDashboard />;
      case 'Overview': return <CompanyOverview onNavigate={navigateTo} />;
      case 'Valuation': return <Valuation />;
      case 'Future Growth': return <FutureGrowth />;
      case 'Past Performance': return <PastEarnings />;
      case 'Financial Health': return <FinancialHealth />;
      case 'Dividend': return <Dividend />;
      case 'Management': return <Management />;
      case 'Ownership': return <Ownership />;
      case 'Portfolios': return <Portfolios />;
      case 'Watchlist': return <Watchlist />;
      case 'Financial Statements': return <FinancialStatements />;
      case 'Help Center': return <HelpCenter />;
      case 'Other information':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">{activeTab}</h2>
              <p className="text-secondary">This section is under construction.</p>
            </div>
          </div>
        );
      default: return <CompanyOverview onNavigate={navigateTo} />;
    }
  };

  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="flex flex-col h-screen bg-[var(--bg-base)] overflow-hidden font-sans text-[var(--text-primary)] transition-colors duration-300">
          <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div className="flex flex-1 overflow-hidden relative">
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isOpen={isSidebarOpen} 
              setIsOpen={setIsSidebarOpen} 
            />
            
            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'ml-0'}`}>
              {renderContent()}
            </main>
          </div>
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
