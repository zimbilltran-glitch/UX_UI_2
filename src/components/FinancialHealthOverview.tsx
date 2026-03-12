import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, ChevronDown, ChevronUp, FileText, X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const mockData = {
  financial_health: {
    score: "5/6",
    summary: "Military Commercial Bank has total assets of ₫1,615,763.9B and total equity of ₫142,022.5B. Total deposits are ₫1,152,478.3B, and total loans are ₫1,088,865.0B.",
    criteria: [
      { label: "Asset to Equity Ratio", status: "pass", id: "section_4_1" },
      { label: "Bad Loans", status: "fail", id: "section_4_2" },
      { label: "Allowance for Bad Loans", status: "pass", id: "section_4_3" },
      { label: "Loan to Deposit Ratio", status: "pass", id: "section_4_4" },
      { label: "Current Ratio", status: "pass", id: "section_4_5" },
      { label: "Cash & Equivalents", status: "pass", id: "section_4_6" }
    ],
    key_metrics: {
      asset_to_equity: "11.4x",
      net_interest_margin: "n/a",
      total_deposits: "₫1152.48t",
      loan_to_deposit: "Appropriate",
      bad_loans: "1.3%",
      allowance_for_bad_loans: "Low",
      current_ratio: "Low",
      cash_and_equivalents: "₫177.70t"
    },
    updates: []
  }
};

const snowflakeData = [
  { subject: 'VALUE', A: 80, fullMark: 100 },
  { subject: 'FUTURE', A: 90, fullMark: 100 },
  { subject: 'PAST', A: 70, fullMark: 100 },
  { subject: 'HEALTH', A: 90, fullMark: 100 },
  { subject: 'DIVIDEND', A: 50, fullMark: 100 },
];

export const FinancialHealthOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const data = mockData.financial_health;

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

  const renderUpdateIcon = () => {
    return <div className="w-8 h-8 rounded-full bg-bullish/20 flex items-center justify-center border border-bullish/30 flex-shrink-0"><FileText className="w-4 h-4 text-bullish" /></div>;
  };

  return (
    <div className="mb-12 font-sans" id="section_4_0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary"><span className="text-secondary mr-2">4</span> Military Commercial Bank Balance Sheet Health</h1>
      </div>
      
      {/* Main Collapsible Block */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-primary">Financial Health criteria checks {data.score}</h2>
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
                  <span className="text-secondary text-sm font-medium">Health Score</span>
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
                          const isHealth = payload.value === 'HEALTH';
                          return (
                            <text 
                              x={x} 
                              y={y} 
                              dy={4} 
                              textAnchor="middle" 
                              fill={isHealth ? '#84cc16' : 'var(--text-secondary)'} 
                              fontSize={10} 
                              fontWeight={isHealth ? 700 : 600}
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
          
          <div className="flex space-x-8 mb-8">
            <div className="border-l-2 border-amber-500 pl-4">
              <div className="text-2xl font-bold text-primary mb-1 font-tabular">{data.key_metrics.asset_to_equity}</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle pb-1">Asset to equity ratio</div>
            </div>
            <div className="w-px bg-subtle"></div>
            <div className="border-l-2 border-amber-500 pl-4">
              <div className="text-2xl font-bold text-primary mb-1 font-tabular">{data.key_metrics.net_interest_margin}</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle pb-1">Net interest margin</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Total deposits</span>
              <span className="text-sm text-secondary border border-subtle rounded px-2 py-0.5 font-tabular">{data.key_metrics.total_deposits}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Loan to deposit ratio</span>
              <span className="text-sm text-bullish border border-bullish/20 rounded px-2 py-0.5 font-medium">{data.key_metrics.loan_to_deposit}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary font-bold">Bad loans</span>
              <span className="text-sm text-secondary border border-subtle rounded px-2 py-0.5 font-tabular">{data.key_metrics.bad_loans}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Allowance for bad loans</span>
              <span className="text-sm text-amber-600 border border-amber-600/20 rounded px-2 py-0.5 font-medium">{data.key_metrics.allowance_for_bad_loans}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary font-bold">Current ratio</span>
              <span className="text-sm text-amber-600 border border-amber-600/20 rounded px-2 py-0.5 font-medium">{data.key_metrics.current_ratio}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Cash & equivalents</span>
              <span className="text-sm text-secondary border border-subtle rounded px-2 py-0.5 font-tabular">{data.key_metrics.cash_and_equivalents}</span>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-card rounded-xl border border-subtle shadow-lg p-6 flex flex-col">
          <h3 className="text-lg font-bold text-primary mb-6">Recent financial health updates</h3>
          
          <div className="flex-1 flex items-start justify-start">
            {data.updates.length > 0 ? (
              <div className="space-y-6 w-full">
                {data.updates.slice(0, 4).map((update: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    {renderUpdateIcon()}
                    <div>
                      <div className="text-sm text-primary font-medium leading-tight mb-1">
                        {update.title}{update.msg ? `: ${update.msg}` : ''}
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
              <h3 className="text-xl font-bold text-primary">Recent financial health updates</h3>
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
                    {renderUpdateIcon()}
                    <div>
                      <div className="text-sm text-primary font-medium leading-tight mb-1">
                        {update.title}{update.msg ? `: ${update.msg}` : ''}
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
