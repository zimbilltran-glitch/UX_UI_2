import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, ChevronDown, ChevronUp, Megaphone, Calendar, X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const mockData = {
  dividend: {
    score: "0/6",
    summary: "Military Commercial Bank is a dividend paying company with a current yield of 0.87%.",
    criteria: [
      { label: "Notable Dividend", status: "fail", id: "section_5_1" },
      { label: "High Dividend", status: "fail", id: "section_5_2" },
      { label: "Stable Dividend", status: "fail", id: "section_5_3" },
      { label: "Growing Dividend", status: "fail", id: "section_5_4" },
      { label: "Earnings Coverage", status: "fail", id: "section_5_5" },
      { label: "Future Dividend Coverage", status: "fail", id: "section_5_6" }
    ],
    key_metrics: {
      dividend_yield: "0.9%",
      buyback_yield: "-0.5%",
      total_shareholder_yield: "0.4%",
      future_dividend_yield: "1.1%",
      dividend_growth: "9.9%",
      next_dividend_pay_date: "n/a",
      ex_dividend_date: "n/a",
      dividend_per_share: "₫227.273",
      payout_ratio: "7%"
    },
    updates: [
      { date: "Aug 05", title: "Military Commercial Joint Stock Bank announces Annual dividend, payable on August 21, 2025", type: "announcement" },
      { date: "May 16", title: "Upcoming dividend of ₫500 per share", type: "calendar" },
      { date: "Jun 07", title: "Military Commercial Joint Stock Bank Approves Cash Dividend, Payable on July 10, 2023", type: "announcement" }
    ]
  }
};

const snowflakeData = [
  { subject: 'VALUE', A: 80, fullMark: 100 },
  { subject: 'FUTURE', A: 90, fullMark: 100 },
  { subject: 'PAST', A: 70, fullMark: 100 },
  { subject: 'HEALTH', A: 90, fullMark: 100 },
  { subject: 'DIVIDEND', A: 0, fullMark: 100 },
];

export const DividendOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const data = mockData.dividend;

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
    if (type === 'calendar') {
      return <div className="w-8 h-8 rounded-full bg-subtle flex items-center justify-center border border-subtle flex-shrink-0"><Calendar className="w-4 h-4 text-secondary" /></div>;
    }
    return <div className="w-8 h-8 rounded-full bg-subtle flex items-center justify-center border border-subtle flex-shrink-0"><Megaphone className="w-4 h-4 text-secondary" /></div>;
  };

  return (
    <div className="mb-12 font-sans" id="section_5_0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary"><span className="text-secondary mr-2">5</span> Military Commercial Bank Dividends and Buybacks</h1>
      </div>
      
      {/* Main Collapsible Block */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-primary">Dividend criteria checks {data.score}</h2>
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
                  <span className="text-secondary text-sm font-medium">Dividend Score</span>
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

              {/* Snowflake Radar */}
              <div className="w-full md:w-1/2 flex items-center justify-center bg-base rounded-xl border border-subtle p-4">
                <div className="w-full max-w-[250px] aspect-square">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={snowflakeData}>
                      <PolarGrid stroke="var(--border-subtle)" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={(props) => {
                          const { x, y, payload } = props;
                          const isDividend = payload.value === 'DIVIDEND';
                          return (
                            <text 
                              x={x} 
                              y={y} 
                              dy={4} 
                              textAnchor="middle" 
                              fill={isDividend ? '#84cc16' : 'var(--text-secondary)'} 
                              fontSize={10} 
                              fontWeight={isDividend ? 700 : 600}
                            >
                              {payload.value}
                            </text>
                          );
                        }} 
                      />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="MBB"
                        dataKey="A"
                        stroke="#84cc16"
                        strokeWidth={2}
                        fill="#84cc16"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
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
              <div className="text-2xl font-bold text-primary mb-1 font-tabular">{data.key_metrics.dividend_yield}</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle pb-1">Dividend yield</div>
            </div>
            <div className="hidden sm:block w-px bg-subtle"></div>
            <div className="border-l-2 border-brand pl-4">
              <div className="text-2xl font-bold text-primary mb-1 font-tabular">{data.key_metrics.buyback_yield}</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle pb-1">Buyback Yield</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Total shareholder yield</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.total_shareholder_yield}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Future dividend yield</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.future_dividend_yield}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Dividend growth</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.dividend_growth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary font-bold">Next dividend pay date</span>
              <span className="text-sm text-secondary font-medium font-tabular">{data.key_metrics.next_dividend_pay_date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary font-bold">Ex dividend date</span>
              <span className="text-sm text-secondary font-medium font-tabular">{data.key_metrics.ex_dividend_date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Dividend per share</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.dividend_per_share}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-subtle mt-4">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Payout ratio</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.payout_ratio}</span>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-card rounded-xl border border-subtle shadow-lg p-6 flex flex-col">
          <h3 className="text-lg font-bold text-primary mb-6">Recent dividend and buyback updates</h3>
          
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
              <h3 className="text-xl font-bold text-primary">Recent dividend and buyback updates</h3>
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
