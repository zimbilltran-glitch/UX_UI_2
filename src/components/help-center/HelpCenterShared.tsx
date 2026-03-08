import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Tooltip component for inline explanations
export const Tooltip = ({ children, text }: { children: React.ReactNode, text: string }) => (
  <span className="relative group inline-block cursor-help border-b border-dashed border-gray-400 text-brand hover:text-blue-600 transition-colors">
    {children}
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-white text-xs text-gray-700 rounded-lg shadow-xl border border-gray-200 z-50 font-sans leading-relaxed">
      {text}
      {/* Arrow */}
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></span>
      <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-200 mt-[1px] -z-10"></span>
    </span>
  </span>
);

// Accordion component for collapsible sections
export const Accordion = ({ title, children, id }: { title: string, children: React.ReactNode, id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Open accordion if URL hash matches its ID
    const handleHashChange = () => {
      if (window.location.hash === `#${id}`) {
        setIsOpen(true);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for header
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [id]);

  return (
    <div id={id} className="surface-card rounded-xl mb-4 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200 border border-gray-200 bg-white">
      <button 
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className={`p-1 rounded-full bg-gray-100 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 pt-0 border-t border-gray-100 text-gray-600 leading-relaxed bg-white mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};
