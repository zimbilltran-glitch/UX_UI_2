import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, BookOpen, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { swsHelpData, HelpSection, QAPair } from '../data/swsHelpData';

const Accordion = ({ qa, isOpen, onToggle }: { qa: QAPair, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className="border border-[var(--border-subtle)] rounded-xl mb-3 overflow-hidden bg-[var(--bg-card)]">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-[var(--bg-base)] transition-colors focus:outline-none"
      >
        <span className="font-semibold text-[var(--text-primary)]">{qa.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-4 pt-0 text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
              {qa.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const HelpCenter = () => {
  const [activeSection, setActiveSection] = useState<string>(swsHelpData[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (sectionId: string, index: number) => {
    const key = `${sectionId}-${index}`;
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for sticky header
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Scroll spy to update active section in sidebar
  useEffect(() => {
    const handleScroll = () => {
      const sections = swsHelpData.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 150; // Offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredData = swsHelpData.map(section => {
    const matchesSection = section.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           section.overviewText.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchingQAs = section.qaPairs.filter(qa => 
      qa.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchesSection || matchingQAs.length > 0) {
      return {
        ...section,
        qaPairs: searchQuery ? matchingQAs : section.qaPairs
      };
    }
    return null;
  }).filter(Boolean) as HelpSection[];

  return (
    <div className="min-h-full bg-[var(--bg-base)] text-[var(--text-primary)] font-sans pb-24">
      {/* Header / Hero Section */}
      <div className="bg-[var(--bg-card)] border-b border-[var(--border-subtle)] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">How can we help you?</h1>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for articles, guides, and FAQs..." 
                className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl py-4 pl-12 pr-4 text-[var(--text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent shadow-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-5 h-5" />
            </div>
            <div className="flex justify-center mt-4 space-x-4 text-sm text-[var(--text-secondary)]">
              <span>Popular:</span>
              <button onClick={() => scrollToSection('value')} className="hover:text-[var(--brand-primary)] transition-colors">Valuation</button>
              <button onClick={() => scrollToSection('snowflake-overview')} className="hover:text-[var(--brand-primary)] transition-colors">Snowflake</button>
              <button onClick={() => scrollToSection('dividends')} className="hover:text-[var(--brand-primary)] transition-colors">Dividends</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="md:col-span-1 hidden md:block">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4 px-2">On this page</h3>
                <nav className="space-y-1 border-l-2 border-[var(--border-subtle)] ml-2">
                  {swsHelpData.map((section) => (
                    <button 
                      key={section.id}
                      onClick={() => scrollToSection(section.id)} 
                      className={`block w-full text-left pl-4 py-2 text-sm transition-all -ml-[2px] ${
                        activeSection === section.id 
                          ? 'text-[var(--brand-primary)] border-l-2 border-[var(--brand-primary)] font-medium' 
                          : 'text-[var(--text-secondary)] hover:text-[var(--brand-primary)] hover:border-l-2 hover:border-[var(--brand-primary)]'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-16">
            {filteredData.length === 0 ? (
              <div className="text-center py-12 text-[var(--text-secondary)]">
                No results found for "{searchQuery}". Try adjusting your search.
              </div>
            ) : (
              filteredData.map((section) => {
                const IconComponent = (LucideIcons as any)[section.iconName] || HelpCircle;
                
                return (
                  <section id={section.id} key={section.id} className="scroll-mt-24">
                    <div className="flex items-center mb-6 pb-2 border-b border-[var(--border-subtle)]">
                      <div className="bg-[var(--brand-primary)]/10 p-2 rounded-lg mr-3">
                        <IconComponent className="w-6 h-6 text-[var(--brand-primary)]" />
                      </div>
                      <h2 className="text-2xl font-bold text-[var(--text-primary)]">{section.title}</h2>
                    </div>
                    
                    <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-subtle)] mb-8 shadow-sm">
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {section.overviewText}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Frequently Asked Questions</h3>
                      {section.qaPairs.map((qa, index) => (
                        <Accordion 
                          key={index}
                          qa={qa}
                          isOpen={!!openAccordions[`${section.id}-${index}`]}
                          onToggle={() => toggleAccordion(section.id, index)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
