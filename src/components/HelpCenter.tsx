import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, BookOpen, HelpCircle, Database, Shield } from 'lucide-react';
import { SnowflakeDiagram } from './HelpCenterDiagrams';
import { Accordion } from './help-center/HelpCenterShared';
import { ValuationGuide } from './help-center/ValuationGuide';
import { FutureGrowthGuide } from './help-center/FutureGrowthGuide';
import { PastPerformanceGuide } from './help-center/PastPerformanceGuide';
import { FinancialHealthGuide } from './help-center/FinancialHealthGuide';
import { DividendGuide } from './help-center/DividendGuide';
import { ManagementOwnershipGuide } from './help-center/ManagementOwnershipGuide';
import { FaqSection } from './help-center/FaqSection';

export const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('guide');
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-primary font-sans">
      {/* Header / Hero Section */}
      <div className="bg-card border-b border-subtle pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-primary mb-6 tracking-tight">How can we help you?</h1>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for articles, guides, and FAQs..." 
                className="w-full bg-card border border-subtle rounded-xl py-4 pl-12 pr-4 text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
            </div>
            <div className="flex justify-center mt-4 space-x-4 text-sm text-secondary">
              <span>Popular:</span>
              <button onClick={() => scrollToSection('understanding-valuation')} className="hover:text-brand transition-colors">Valuation</button>
              <button onClick={() => scrollToSection('how-snowflake-works')} className="hover:text-brand transition-colors">Snowflake</button>
              <button onClick={() => scrollToSection('data-sources')} className="hover:text-brand transition-colors">Data Sources</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 px-2">Categories</h3>
                <nav className="space-y-1">
                  <button 
                    onClick={() => setActiveCategory('guide')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeCategory === 'guide' ? 'bg-brand/10 text-brand' : 'text-secondary hover:bg-subtle hover:text-primary'}`}
                  >
                    <BookOpen className="w-4 h-4 mr-3" />
                    Analysis Model Guide
                  </button>
                  <button 
                    onClick={() => setActiveCategory('faqs')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeCategory === 'faqs' ? 'bg-brand/10 text-brand' : 'text-secondary hover:bg-subtle hover:text-primary'}`}
                  >
                    <HelpCircle className="w-4 h-4 mr-3" />
                    FAQs & Data
                  </button>
                </nav>
              </div>

              {/* Table of Contents (Dynamic based on active category) */}
              <div>
                <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4 px-2">On this page</h3>
                <nav className="space-y-1 border-l-2 border-subtle ml-2">
                  {activeCategory === 'guide' ? (
                    <>
                      <button onClick={() => scrollToSection('guide-core-model')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Core Model (Snowflake)</button>
                      <button onClick={() => scrollToSection('understanding-valuation')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Valuation</button>
                      <button onClick={() => scrollToSection('future-growth')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Future Growth</button>
                      <button onClick={() => scrollToSection('past-performance')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Past Performance</button>
                      <button onClick={() => scrollToSection('financial-health')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Financial Health</button>
                      <button onClick={() => scrollToSection('dividend')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Dividend</button>
                      <button onClick={() => scrollToSection('management')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Management</button>
                      <button onClick={() => scrollToSection('ownership')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Ownership</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => scrollToSection('how-snowflake-works')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">How Snowflake Works</button>
                      <button onClick={() => scrollToSection('data-updates')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Data Updates</button>
                      <button onClick={() => scrollToSection('markets-and-assets')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Markets & Assets</button>
                      <button onClick={() => scrollToSection('data-sources')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Data Sources</button>
                      <button onClick={() => scrollToSection('data-differences')} className="block w-full text-left pl-4 py-1 text-sm text-secondary hover:text-brand hover:border-l-2 hover:border-blue-500 -ml-[2px] transition-all">Data Differences</button>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Guide Section */}
            <section id="guide-core-model">
              <div className="flex items-center mb-6 pb-2 border-b border-subtle">
                <div className="bg-brand/10 p-2 rounded-lg mr-3">
                  <BookOpen className="w-6 h-6 text-brand" />
                </div>
                <h2 className="text-2xl font-bold text-primary">Analysis Model Guide</h2>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-subtle mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-3">The Finsang Snowflake</h3>
                    <p className="text-secondary mb-4 leading-relaxed">
                      Our core analysis model visualizes a company's performance across 5 key areas: Valuation, Future Growth, Past Performance, Financial Health, and Dividend.
                    </p>
                    <p className="text-secondary leading-relaxed">
                      Each axis represents a score out of 6, based on 6 underlying checks. The larger the area, the better the company performs in that criteria.
                    </p>
                  </div>
                  <div className="w-48 h-48 flex-shrink-0 bg-base rounded-full flex items-center justify-center border border-subtle shadow-sm">
                    <SnowflakeDiagram />
                  </div>
                </div>
              </div>

              {/* Imported Guide Sections */}
              <ValuationGuide />
              <FutureGrowthGuide />
              <PastPerformanceGuide />
              <FinancialHealthGuide />
              <DividendGuide />
              <ManagementOwnershipGuide />
            </section>

            {/* FAQs Section */}
            <FaqSection />

          </div>
        </div>
      </div>
    </div>
  );
}
