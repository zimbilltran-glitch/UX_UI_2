import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Moon, Sun, Sparkles, Plus, Check, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function Header({ 
  isSidebarOpen, 
  setIsSidebarOpen 
}: { 
  isSidebarOpen: boolean, 
  setIsSidebarOpen: (isOpen: boolean) => void 
}) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { holdings, addHolding } = usePortfolio();
  
  const isAdded = holdings.some(h => h.symbol === 'MBB');

  const handleAddToPortfolio = () => {
    if (!isAdded) {
      addHolding({
        symbol: 'MBB',
        name: 'Military Commercial Joint Stock Bank',
        lastPrice: '₫24,500',
        fairValue: '₫35,000',
        fairValueStatus: '30.0% undervalued',
        return7D: '2.5%',
        return7DValue: '+₫612.5',
        totalReturn: '15.0%',
        totalReturnValue: '+₫3,675',
        value: '₫24,500,000',
        cost: '₫20,825,000',
        weight: '5.0%',
        shares: 1000,
        avgPrice: '₫20,825',
        isAdded: true
      });
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('finsang-lang', newLang);
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col lg:flex-row justify-between items-center py-2 sm:py-3 px-3 sm:px-4 md:px-6 lg:px-8 border-b border-subtle gap-2 sm:gap-4 bg-base/80 backdrop-blur-md transition-colors duration-300">
      <div className="flex items-center justify-between w-full lg:w-auto gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sidebar Toggle Button */}
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 sm:p-2 hover:bg-card border border-subtle rounded-xl text-secondary flex items-center justify-center transition-colors"
              aria-label="Open Sidebar"
            >
              <Menu size={18} className="sm:w-[20px] sm:h-[20px]" />
            </button>
          )}

          {/* Logo */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-card border border-subtle flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 100 100">
              <polygon points="50,5 93,30 93,70 50,95 7,70 7,30" fill="none" stroke="var(--color-bullish)" strokeWidth="5" strokeLinejoin="round" />
              <polyline points="7,30 50,50 93,30" fill="none" stroke="var(--color-bullish)" strokeWidth="2.5" strokeLinejoin="round" className="polyhedron-path" />
              <polyline points="7,70 50,50 93,70" fill="none" stroke="var(--color-bullish)" strokeWidth="2.5" strokeLinejoin="round" className="polyhedron-path" />
              <line x1="50" y1="50" x2="50" y2="95" stroke="var(--color-bullish)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="50" cy="50" r="6" fill="currentColor" className="text-primary" />
            </svg>
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-primary">
              <span className="text-bullish">Fin</span>Sang
            </h1>
          </div>
        </div>

        {/* Mobile Search Icon or simple search */}
        <div className="lg:hidden">
          <button className="p-2 hover:bg-card border border-subtle rounded-xl text-secondary">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        {/* Search Input - Desktop */}
        <div className="relative hidden lg:block">
          <div 
            className={`flex items-center bg-card border rounded-full px-4 py-2 transition-all duration-300 ease-in-out ${
              isSearchFocused 
                ? 'border-brand shadow-[0_0_10px_rgba(10,132,255,0.3)]' 
                : 'border-subtle hover:border-brand/50'
            }`}
          >
            <Search 
              size={18} 
              className={`transition-colors duration-300 ${isSearchFocused ? 'text-brand' : 'text-secondary'}`} 
            />
            <input
              type="text"
              placeholder={t('header.searchPlaceholder')}
              className="bg-transparent border-none outline-none text-primary placeholder-secondary ml-2 w-48 lg:w-64 font-sans text-sm"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        <nav className="flex flex-wrap gap-2 items-center w-full sm:w-auto justify-center sm:justify-end">
        {/* Language Switcher */}
        <button 
          onClick={toggleLanguage}
          className="btn-interactive px-3 py-2 bg-card shadow-sm border border-subtle hover:border-brand rounded-xl flex items-center gap-1 transition-colors duration-300"
          aria-label={t('header.language')}
        >
          <span className={`text-xs font-bold transition-opacity duration-300 ${i18n.language === 'en' ? 'text-primary opacity-100' : 'text-secondary opacity-50'}`}>EN</span>
          <span className="text-secondary text-xs opacity-50">|</span>
          <span className={`text-xs font-bold transition-opacity duration-300 ${i18n.language === 'vi' ? 'text-primary opacity-100' : 'text-secondary opacity-50'}`}>VI</span>
        </button>

        {/* Theme Switcher */}
        <button 
          onClick={toggleTheme}
          className="btn-interactive w-10 h-10 bg-card shadow-sm border border-subtle hover:border-brand rounded-xl text-secondary flex items-center justify-center transition-colors duration-300 relative overflow-hidden"
          aria-label={t('header.theme')}
        >
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${theme === 'dark' ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
            <Moon size={18} className="text-secondary" />
          </div>
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${theme === 'light' ? 'opacity-0 scale-50 -rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
            <Sun size={18} className="text-[#FFC107]" />
          </div>
        </button>
        
        {/* AI Button */}
        <button className="btn-interactive px-4 py-2 bg-card shadow-sm border border-subtle hover:border-brand rounded-xl text-primary text-sm font-semibold flex items-center gap-2 transition-colors duration-300">
          <Sparkles size={16} className="text-brand" />
          <span className="hidden sm:inline">{t('header.aiAnalysis')}</span>
        </button>

        {/* Add to Portfolio Button */}
        <button 
          onClick={handleAddToPortfolio}
          disabled={isAdded}
          className={`btn-interactive px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors duration-300 shadow-sm ${
            isAdded 
              ? 'bg-subtle text-secondary cursor-not-allowed border border-subtle' 
              : 'bg-brand text-white hover:bg-brand/90 shadow-brand/30'
          }`}
        >
          {isAdded ? <Check size={16} /> : <Plus size={16} />}
          <span className="hidden sm:inline">{isAdded ? 'Added to Portfolio' : 'Add to Portfolio'}</span>
        </button>

        {/* New Data Button */}
        <button className="btn-interactive px-4 py-2 bg-card border border-subtle text-primary rounded-xl text-sm font-semibold shadow-sm hover:border-brand transition-colors duration-300">
          <span className="hidden sm:inline">{t('header.newData')}</span>
          <span className="sm:hidden">+</span>
        </button>
      </nav>
      </div>
    </header>
  );
}
