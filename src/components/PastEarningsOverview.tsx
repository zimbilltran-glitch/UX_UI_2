import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const mockData = {
  past_performance: {
    score: "4/6",
    summary: "Military Commercial Bank has been growing earnings at an average annual rate of 21.4%, while the Banks industry saw earnings growing at 18% annually. Revenues have been growing at an average rate of 15.2% per year. Military Commercial Bank's return on equity is 19.3%, and it has net margins of 49.6%.",
    criteria: [
      { label: "Quality Earnings", status: "pass", id: "section_3_1" },
      { label: "Growing Profit Margin", status: "pass", id: "section_3_2" },
      { label: "Earnings Trend", status: "pass", id: "section_3_3" },
      { label: "Accelerating Growth", status: "fail", id: "section_3_4" },
      { label: "Earnings vs Industry", status: "pass", id: "section_3_5" },
      { label: "High ROE", status: "fail", id: "section_3_6" }
    ],
    key_metrics: {
      earnings_growth: "21.37%",
      eps_growth: "20.83%",
      industry_growth: "25.82%",
      revenue_growth: "15.16%",
      return_on_equity: "19.28%",
      net_margin: "49.64%",
      last_updated: "31 Dec 2025"
    },
    updates: [
      { date: "Jul 30", title: "Second quarter 2025 earnings", msg: "Revenues exceed analyst expectations" },
      { date: "Apr 28", title: "First quarter 2024 earnings released", msg: "" },
      { date: "Oct 30", title: "Third quarter 2022 earnings released", msg: "" },
      { date: "Mar 13", title: "Full year 2021 earnings", msg: "EPS exceeds analyst expectations while revenues lag behind" },
      { date: "Feb 02", title: "Full year 2021 earnings", msg: "EPS exceeds analyst expectations while revenues lag behind" },
      { date: "Oct 30", title: "Third quarter 2021 earnings released", msg: "EPS ₫800 (vs ₫634 in 3Q 2020)" },
      { date: "Apr 29", title: "First quarter 2021 earnings released", msg: "" },
      { date: "Oct 20", title: "Third quarter earnings released", msg: "" }
    ]
  }
};

const snowflakeData = [
  { subject: 'VALUE', A: 80, fullMark: 100 },
  { subject: 'FUTURE', A: 90, fullMark: 100 },
  { subject: 'PAST', A: 70, fullMark: 100 },
  { subject: 'HEALTH', A: 90, fullMark: 100 },
  { subject: 'DIVIDEND', A: 50, fullMark: 100 },
];

export const PastEarningsOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const data = mockData.past_performance;

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
    <div className="mb-12 font-sans" id="section_3_0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary"><span className="text-secondary mr-2">3</span> Past Earnings Performance</h1>
      </div>
      
      {/* Main Collapsible Block */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-primary">Past criteria checks {data.score}</h2>
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
                  <span className="text-secondary text-sm font-medium">Past Score</span>
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
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={(props) => {
                          const { x, y, payload } = props;
                          const isPast = payload.value === 'PAST';
                          return (
                            <text 
                              x={x} 
                              y={y} 
                              dy={4} 
                              textAnchor="middle" 
                              fill={isPast ? '#84cc16' : '#6b7280'} 
                              fontSize={10} 
                              fontWeight={isPast ? 700 : 600}
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
            <div>
              <div className="text-2xl font-bold text-primary mb-1 font-tabular">{data.key_metrics.earnings_growth}</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle pb-1">Earnings growth rate</div>
            </div>
            <div className="w-px bg-subtle"></div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1 font-tabular">{data.key_metrics.eps_growth}</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle pb-1">EPS growth rate</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Banks industry growth</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.industry_growth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Revenue growth rate</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.revenue_growth}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Return on equity</span>
              <span className="text-sm text-primary font-medium font-tabular">{data.key_metrics.return_on_equity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary font-bold">Net margin</span>
              <span className="text-sm text-primary font-bold font-tabular">{data.key_metrics.net_margin}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-subtle mt-4">
              <span className="text-sm text-secondary">Last Earnings Update</span>
              <span className="text-sm text-secondary font-tabular">{data.key_metrics.last_updated}</span>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-card rounded-xl border border-subtle shadow-lg p-6 flex flex-col">
          <h3 className="text-lg font-bold text-primary mb-6">Recent past performance updates</h3>
          
          <div className="flex-1 space-y-6">
            {data.updates.slice(0, 4).map((update, index) => (
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

          <button 
            onClick={() => setShowAllUpdates(true)}
            className="btn-interactive w-full mt-6 py-3 bg-brand hover:bg-brand/90 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
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
              <h3 className="text-xl font-bold text-primary">Recent past performance updates</h3>
              <button 
                onClick={() => setShowAllUpdates(false)}
                className="w-8 h-8 rounded-full bg-base flex items-center justify-center hover:bg-subtle transition-colors border border-subtle"
              >
                <XCircle className="w-5 h-5 text-secondary" />
              </button>
            </div>
            <div className="p-6 space-y-8">
              {data.updates.map((update, index) => (
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
          </div>
        </div>
      )}
    </div>
  );
};
