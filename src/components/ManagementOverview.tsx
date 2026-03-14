import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, ChevronDown, ChevronUp, Megaphone, Users, X } from 'lucide-react';

const mockData = {
  management: {
    score: "3/4",
    summary: "Military Commercial Bank's CEO is Anh Pham, appointed in Aug 2020, has a tenure of 5.58 years. directly owns 0.072% of the company's shares, worth ₫152.81B. The average tenure of the management team and the board of directors is 5.6 years and 3.8 years respectively.",
    criteria: [
      { label: "Compensation vs Market", status: "pass", id: "section_6_1" },
      { label: "Compensation vs Earnings", status: "fail", id: "section_6_2" },
      { label: "Experienced Management", status: "pass", id: "section_6_3" },
      { label: "Experienced Board", status: "pass", id: "section_6_4" }
    ],
    key_metrics: {
      ceo_name: "Anh Pham",
      ceo_title: "Chief executive officer",
      total_compensation: "₫3.2b",
      ceo_salary_percentage: "n/a",
      ceo_tenure: "5.6yrs",
      ceo_ownership: "0.07%",
      management_average_tenure: "5.6yrs",
      board_average_tenure: "3.8yrs"
    },
    updates: [
      { date: "Feb 07", title: "Military Commercial Joint Stock Bank, Annual General Meeting, Apr 18, 2026", type: "announcement" },
      { date: "Jun 17", title: "Less than half of directors are independent", type: "warning" },
      { date: "Mar 04", title: "Military Commercial Joint Stock Bank, Annual General Meeting, Apr 26, 2025", type: "announcement" },
      { date: "Jun 25", title: "Military Commercial Joint Stock Bank Announces Management Changes", type: "announcement" },
      { date: "May 09", title: "Military Commercial Joint Stock Bank, Annual General Meeting, Jun 15, 2024", type: "announcement" },
      { date: "Apr 16", title: "Less than half of directors are independent", type: "warning" },
      { date: "Dec 22", title: "Military Commercial Joint Stock Bank Approves the Resignation of Member of the Bod Mr. Le Huu Duc", type: "announcement" },
      { date: "Jun 13", title: "Military Commercial Joint Stock Bank Appoints Do Kim Loan in Charge of Corporate Governance", type: "announcement" },
      { date: "Apr 17", title: "Less than half of directors are independent", type: "warning" },
      { date: "Nov 16", title: "Less than half of directors are independent", type: "warning" },
      { date: "Oct 18", title: "Less than half of directors are independent", type: "warning" }
    ]
  }
};

export const ManagementOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const data = mockData.management;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const mainContainer = document.querySelector('main');
    
    if (element && mainContainer) {
      const elementRect = element.getBoundingClientRect();
      const mainRect = mainContainer.getBoundingClientRect();
      const scrollTop = mainContainer.scrollTop + (elementRect.top - mainRect.top) - 32;
      mainContainer.scrollTo({ top: scrollTop, behavior: 'smooth' });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderUpdateIcon = (type: string) => {
    if (type === 'warning') {
      return <div className="w-8 h-8 rounded-full bg-bearish/10 flex items-center justify-center border border-bearish/20 flex-shrink-0"><Users className="w-4 h-4 text-bearish" /></div>;
    }
    return <div className="w-8 h-8 rounded-full bg-subtle flex items-center justify-center border border-subtle flex-shrink-0"><Megaphone className="w-4 h-4 text-secondary" /></div>;
  };

  return (
    <div className="mb-12 font-sans" id="section_6_0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary"><span className="text-secondary mr-2">6</span> Management</h1>
      </div>
      
      {/* Main Collapsible Block */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-primary">Management criteria checks {data.score}</h2>
              <div className="flex space-x-1 ml-2">
                {data.criteria.map((c, i) => (
                  c.status === 'pass' 
                    ? <CheckCircle2 key={i} className="w-5 h-5 text-bullish" />
                    : <XCircle key={i} className="w-5 h-5 text-bearish" />
                ))}
              </div>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 rounded-full bg-base flex items-center justify-center hover:bg-subtle transition-colors border border-subtle"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
            </button>
          </div>
          
          <p className="text-secondary text-sm leading-relaxed mb-6">
            {data.summary}
          </p>

          {isExpanded && (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Checklist */}
              <div className="w-full md:w-1/2 bg-base rounded-lg p-4 border border-subtle">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-secondary text-sm font-medium">Management Score</span>
                  <span className="text-primary font-bold">{data.score}</span>
                </div>
                <div className="space-y-2">
                  {data.criteria.map((item, index) => (
                    <button 
                      key={index} 
                      onClick={() => scrollToSection(item.id)}
                      className="list-row w-full flex items-center justify-between p-2 hover:bg-subtle rounded-md transition-colors group text-left"
                    >
                      <div className="flex items-center space-x-3">
                        {item.status === 'pass' 
                          ? <CheckCircle2 className="w-4 h-4 text-bullish" />
                          : <XCircle className="w-4 h-4 text-bearish" />
                        }
                        <span className="text-secondary text-sm font-medium group-hover:text-primary transition-colors">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-secondary group-hover:text-secondary transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key Info and Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Information */}
        <div className="bg-card rounded-xl border border-subtle shadow-lg p-6">
          <h3 className="text-lg font-bold text-primary mb-6">Key information</h3>
          
          <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-6 sm:space-y-0 mb-8">
            <div className="border-l-2 border-brand pl-4">
              <div className="text-2xl font-bold text-primary mb-1">{data.key_metrics.ceo_name}</div>
              <div className="text-xs text-secondary">{data.key_metrics.ceo_title}</div>
            </div>
            <div className="hidden sm:block w-px bg-subtle"></div>
            <div className="border-l-2 border-brand pl-4">
              <div className="text-2xl font-bold text-primary mb-1 font-tabular">{data.key_metrics.total_compensation}</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle pb-1 inline-block">Total compensation</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Ceo salary percentage</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.ceo_salary_percentage}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Ceo tenure</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.ceo_tenure}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Ceo ownership</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.ceo_ownership}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-subtle mt-4">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Management average tenure</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.management_average_tenure}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Board average tenure</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.board_average_tenure}</span>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-card rounded-xl border border-subtle shadow-lg p-6 flex flex-col">
          <h3 className="text-lg font-bold text-primary mb-6">Recent management updates</h3>
          
          <div className="flex-1 flex items-start justify-start">
            {data.updates.length > 0 ? (
              <div className="space-y-6 w-full">
                {data.updates.slice(0, 4).map((update: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    {renderUpdateIcon(update.type)}
                    <div>
                      <div className="text-sm text-primary font-medium leading-tight mb-1">
                        {update.title}
                      </div>
                      <div className="text-xs text-secondary">{update.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary text-sm">No updates</p>
            )}
          </div>

          <button 
            onClick={() => setShowAllUpdates(true)}
            disabled={data.updates.length === 0}
            className={`w-full mt-6 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm ${
              data.updates.length > 0 
                ? 'bg-brand hover:bg-brand/90 text-white btn-interactive' 
                : 'bg-subtle text-secondary cursor-not-allowed opacity-50'
            }`}
          >
            Show all updates
          </button>
        </div>
      </div>

      {/* Side Panel for All Updates */}
      {showAllUpdates && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAllUpdates(false)}></div>
          <div className="relative w-full max-w-md bg-card border-l border-subtle h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right">
            <div className="sticky top-0 bg-card/90 backdrop-blur-md p-6 border-b border-subtle flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-primary">Recent management updates</h3>
              <button 
                onClick={() => setShowAllUpdates(false)}
                className="text-secondary hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-8">
              {data.updates.length > 0 ? (
                data.updates.map((update: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    {renderUpdateIcon(update.type)}
                    <div>
                      <div className="text-sm text-primary font-medium leading-tight mb-1">
                        {update.title}
                      </div>
                      <div className="text-xs text-secondary">{update.date}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-secondary text-sm">No updates</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
