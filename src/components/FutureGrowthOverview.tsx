import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, ChevronDown, ChevronUp, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const mockData = {
  future_growth: {
    score: "5/6",
    summary: "Military Commercial Bank is forecast to grow earnings and revenue by 16.7% and 25.6% per annum respectively. EPS is expected to grow by 14.7% per annum. Return on equity is forecast to be 20.8% in 3 years.",
    criteria: [
      { label: "Analyst Future Growth", status: "pass", id: "section_2_2" },
      { label: "EPS Growth Forecasts", status: "pass", id: "section_2_3" },
      { label: "Future ROE", status: "pass", id: "section_2_4" },
      { label: "High Growth Earnings", status: "fail", id: "section_2_5" },
      { label: "Revenue vs Market", status: "pass", id: "section_2_6" },
      { label: "High Growth Revenue", status: "pass", id: "section_2_7" }
    ],
    key_metrics: {
      earnings_growth: "16.7%",
      eps_growth: "14.70%",
      industry_avg: "15.7%",
      revenue_growth: "25.6%",
      future_roe: "20.77%",
      analyst_coverage: "Good",
      last_updated: "19 Feb 2026"
    },
    updates: [
      { date: "Aug 26", type: "positive", msg: "Price target increased by 13% to ₫25,694" },
      { date: "Jul 04", type: "negative", msg: "Price target decreased by 9.6% to ₫29,136" },
      { date: "May 17", type: "neutral", msg: "Consensus EPS estimates fall by 23%" },
      { date: "May 14", type: "neutral", msg: "Consensus revenue estimates decrease by 12%" }
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

export const FutureGrowthOverview = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const data = mockData.future_growth;

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
    switch (type) {
      case 'positive':
        return <div className="w-8 h-8 rounded-full bg-bullish/20 flex items-center justify-center border border-bullish/30 flex-shrink-0"><TrendingUp className="w-4 h-4 text-bullish" /></div>;
      case 'negative':
        return <div className="w-8 h-8 rounded-full bg-bearish/20 flex items-center justify-center border border-bearish/30 flex-shrink-0"><TrendingDown className="w-4 h-4 text-bearish" /></div>;
      case 'neutral':
      default:
        return <div className="w-8 h-8 rounded-full bg-base flex items-center justify-center border border-subtle flex-shrink-0"><BarChart2 className="w-4 h-4 text-secondary" /></div>;
    }
  };

  return (
    <div className="mb-12 font-sans" id="section_2_0">
      <h1 className="text-3xl font-bold text-primary mb-6">2 Future Growth</h1>
      
      {/* Main Collapsible Block */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h2 className="text-xl font-bold text-primary">Future criteria checks {data.score}</h2>
              <div className="flex flex-wrap gap-1">
                {data.criteria.map((c, i) => (
                  c.status === 'pass' 
                    ? <CheckCircle2 key={i} className="w-5 h-5 text-bullish" />
                    : <XCircle key={i} className="w-5 h-5 text-bearish" />
                ))}
              </div>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 rounded-full bg-base flex items-center justify-center hover:bg-subtle transition-colors border border-subtle flex-shrink-0 ml-4"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
            </button>
          </div>
          
          <p className="text-secondary text-sm leading-relaxed mb-6">
            {data.summary}
          </p>

          {isExpanded && (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column: Checklist */}
              <div className="w-full md:w-1/2 bg-base rounded-xl p-4 border border-subtle">
                <h3 className="text-sm font-bold text-primary mb-4 px-2">Future Score <span className="text-bullish">{data.score}</span></h3>
                <div className="space-y-1">
                  {data.criteria.map((check, index) => (
                    <div 
                      key={index}
                      onClick={() => scrollToSection(check.id)}
                      className="list-row flex items-center justify-between p-2.5 rounded-lg hover:bg-subtle cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center">
                        {check.status === 'pass' ? (
                          <CheckCircle2 className="w-4 h-4 text-bullish mr-3 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-bearish mr-3 flex-shrink-0" />
                        )}
                        <span className="text-secondary text-sm font-medium group-hover:text-primary transition-colors">
                          {check.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-secondary group-hover:text-secondary transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Radar Chart */}
              <div className="w-full md:w-1/2 flex items-center justify-center bg-base rounded-xl border border-subtle p-4">
                <div className="w-full max-w-[250px] aspect-square">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={snowflakeData}>
                      <PolarGrid stroke="var(--border-subtle)" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={(props) => {
                          const { x, y, payload } = props;
                          const isFuture = payload.value === 'FUTURE';
                          return (
                            <text 
                              x={x} 
                              y={y} 
                              dy={4} 
                              textAnchor="middle" 
                              fill={isFuture ? '#84cc16' : 'var(--text-secondary)'} 
                              fontSize={10} 
                              fontWeight={isFuture ? 700 : 600}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Information */}
        <div className="bg-card rounded-xl p-6 border border-subtle shadow-lg">
          <h3 className="text-lg font-bold text-primary mb-6">Key information</h3>
          
          <div className="flex flex-col sm:flex-row sm:space-x-8 mb-8 gap-6 sm:gap-0">
            <div>
              <div className="text-2xl font-bold text-primary mb-1 font-tabular">{data.key_metrics.earnings_growth}</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle pb-1 inline-block">Earnings growth rate</div>
            </div>
            <div className="hidden sm:block w-px bg-subtle"></div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1 font-tabular">{data.key_metrics.eps_growth}</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle pb-1 inline-block">EPS growth rate</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-subtle pb-3">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Banks earnings growth</span>
              <span className="text-sm font-medium text-primary font-tabular">{data.key_metrics.industry_avg}</span>
            </div>
            <div className="flex justify-between items-center border-b border-subtle pb-3">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Revenue growth rate</span>
              <span className="text-sm font-medium text-primary font-tabular">{data.key_metrics.revenue_growth}</span>
            </div>
            <div className="flex justify-between items-center border-b border-subtle pb-3">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Future return on equity</span>
              <span className="text-sm font-medium text-primary font-tabular">{data.key_metrics.future_roe}</span>
            </div>
            <div className="flex justify-between items-center border-b border-subtle pb-3">
              <span className="text-sm text-secondary border-b border-dashed border-subtle pb-0.5">Analyst coverage</span>
              <span className="text-xs font-medium text-bullish bg-bullish/10 px-2 py-1 rounded border border-bullish/30">{data.key_metrics.analyst_coverage}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm text-secondary">Last updated</span>
              <span className="text-sm font-medium text-primary font-tabular">{data.key_metrics.last_updated}</span>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-card rounded-xl p-6 border border-subtle shadow-lg flex flex-col relative">
          <h3 className="text-lg font-bold text-primary mb-6">Recent future growth updates</h3>
          
          <div className="space-y-5 flex-1">
            {data.updates.map((update, index) => (
              <div key={index} className="flex items-start">
                {renderUpdateIcon(update.type)}
                <div className="ml-4">
                  <p className="text-sm font-medium text-primary mb-1 leading-snug">{update.msg}</p>
                  <p className="text-xs text-secondary">{update.date}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowAllUpdates(true)}
            className="btn-interactive w-full mt-6 py-3 rounded-lg bg-brand hover:bg-brand/90 text-white text-sm font-medium transition-colors shadow-sm"
          >
            Show all updates
          </button>

          {/* Expanded Panel / Modal for Updates */}
          {showAllUpdates && (
            <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm transition-opacity">
              <div className="w-full max-w-md h-full bg-card border-l border-subtle shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
                <div className="p-6 border-b border-subtle flex justify-between items-center">
                  <h3 className="text-xl font-bold text-primary">Recent future growth updates</h3>
                  <button 
                    onClick={() => setShowAllUpdates(false)}
                    className="text-secondary hover:text-secondary transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                  {data.updates.map((update, index) => (
                    <div key={index} className="flex items-start">
                      {renderUpdateIcon(update.type)}
                      <div className="ml-4">
                        <p className="text-sm font-medium text-primary mb-1 leading-snug">{update.msg}</p>
                        <p className="text-xs text-secondary">{update.date}</p>
                      </div>
                    </div>
                  ))}
                  {/* Mocking more updates for the expanded view */}
                  <div className="flex items-start">
                    {renderUpdateIcon('positive')}
                    <div className="ml-4">
                      <p className="text-sm font-medium text-primary mb-1 leading-snug">Price target increased to ₫32,705</p>
                      <p className="text-xs text-secondary">May 23</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    {renderUpdateIcon('positive')}
                    <div className="ml-4">
                      <p className="text-sm font-medium text-primary mb-1 leading-snug">Price target increased to ₫27,315</p>
                      <p className="text-xs text-secondary">Apr 02</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    {renderUpdateIcon('positive')}
                    <div className="ml-4">
                      <p className="text-sm font-medium text-primary mb-1 leading-snug">Price target increased to ₫26,058</p>
                      <p className="text-xs text-secondary">Mar 25</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
