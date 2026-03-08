import React, { useState } from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState('');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // TODO: Connect to search API here
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-base/80 backdrop-blur-md border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo & Search */}
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0 flex items-center mr-8">
              <span className="text-xl font-bold tracking-tight text-primary">
                FinSang<span className="text-brand">.</span>
              </span>
            </div>
            
            {/* Search Input */}
            <div className="max-w-md w-full lg:max-w-sm relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#8E8E93]" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-subtle rounded-xl leading-5 bg-card text-primary placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand sm:text-sm transition-all duration-200 ease-in-out"
                placeholder={t('header.searchPlaceholder')}
              />
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="btn-interactive flex items-center justify-center px-3 py-1.5 rounded-lg border border-subtle bg-card text-sm font-medium text-secondary hover:text-primary transition-colors"
              aria-label={t('header.language')}
            >
              <span className={`transition-opacity duration-200 ${i18n.language === 'en' ? 'text-brand font-bold' : 'opacity-70'}`}>EN</span>
              <span className="mx-1 opacity-30">|</span>
              <span className={`transition-opacity duration-200 ${i18n.language === 'vi' ? 'text-brand font-bold' : 'opacity-70'}`}>VI</span>
            </button>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="btn-interactive p-2 rounded-lg border border-subtle bg-card text-secondary hover:text-primary transition-colors"
              aria-label={t('header.theme')}
            >
              <div className="relative w-5 h-5">
                <Sun 
                  className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out ${theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
                />
                <Moon 
                  className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out ${theme === 'light' ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
