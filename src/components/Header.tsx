import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('finsang-lang', newLang);
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-center py-4 px-4 md:px-6 lg:px-8 border-b border-subtle gap-4 bg-base/80 backdrop-blur-md transition-colors duration-300">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Logo */}
        <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-card border border-subtle flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 100 100">
            <polygon points="50,5 93,30 93,70 50,95 7,70 7,30" fill="none" stroke="var(--color-bullish)" strokeWidth="5" strokeLinejoin="round" />
            <polyline points="7,30 50,50 93,30" fill="none" stroke="var(--color-bullish)" strokeWidth="2.5" strokeLinejoin="round" className="polyhedron-path" />
            <polyline points="7,70 50,50 93,70" fill="none" stroke="var(--color-bullish)" strokeWidth="2.5" strokeLinejoin="round" className="polyhedron-path" />
            <line x1="50" y1="50" x2="50" y2="95" stroke="var(--color-bullish)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="6" fill="currentColor" className="text-primary" />
          </svg>
        </div>

        <div className="flex flex-col hidden sm:flex">
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            <span className="text-bullish">Fin</span>Sang <span className="text-secondary font-normal ml-1">Terminal</span>
          </h1>
          <span className="text-[11px] font-semibold text-secondary tracking-widest uppercase mt-0">v3.0 • Institutional</span>
        </div>

        {/* Search Input */}
        <div className="relative flex-grow sm:flex-grow-0 sm:ml-4">
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
              className="bg-transparent border-none outline-none text-primary placeholder-secondary ml-2 w-full sm:w-48 lg:w-64 font-sans text-sm"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>
      </div>

      <nav className="flex gap-3 items-center w-full sm:w-auto justify-end">
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

        {/* New Data Button */}
        <button className="btn-interactive px-4 py-2 bg-brand text-white rounded-xl text-sm font-semibold shadow-sm shadow-brand/30 hover:bg-brand/90 transition-colors duration-300">
          <span className="hidden sm:inline">{t('header.newData')}</span>
          <span className="sm:hidden">+</span>
        </button>
      </nav>
    </header>
  );
}
