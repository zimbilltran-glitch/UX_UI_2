import React, { useState } from 'react';
import { Star, Plus, MoreHorizontal, X, ChevronRight, Info, Table } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { OverviewSupplementary } from './OverviewSupplementary';
import { colors } from '../theme/colors';

const mockData = {
  stock_overview: {
    ticker: "MBB",
    name: "Military Commercial Joint Stock Bank",
    snowflake_scores: { value: 5, future: 5, past: 4, health: 5, dividend: 0 },
    rewards: [
      { text: "Trading at 46.2% below our estimate of its fair value", tab: "Valuation", link: "section_1_1", isGood: true },
      { text: "Earnings are forecast to grow 16.69% per year", tab: "Future Growth", link: "section_2_0", isGood: true },
      { text: "Earnings grew by 18.3% over the past year", tab: "Past Performance", link: "section_3_0", isGood: true },
      { text: "Trading at good value compared to peers and industry", tab: "Valuation", link: "section_1_0", isGood: true }
    ],
    risk_checks: [
      { label: "Do they have high quality earnings?", description: "The company's earnings are high quality", status: "pass", section: "3 Past Performance", tab: "Past Performance", link: "section_3_0" },
      { label: "Have profit margins improved over the past year?", description: "Profit margins improved or MBB became profitable", status: "pass", section: "3 Past Performance", tab: "Past Performance", link: "section_3_0" },
      { label: "Is their share price liquid and stable?", description: "Share price has been stable over the past 3 months compared to the VN market", status: "pass", section: "Overview", tab: "Overview", link: "section_0_0" },
      { label: "Is their dividend sustainable?", description: "Dividend is too low to be a concern", status: "pass", section: "5 Dividend", tab: "Dividend", link: "section_5_0" },
      { label: "Have there been any negative recent events?", description: "No negative events detected", status: "pass", section: "Overview", tab: "Overview", link: "section_0_0" },
      { label: "Do they have negative shareholders equity?", description: "Company has positive equity", status: "pass", section: "4 Financial Health", tab: "Financial Health", link: "section_4_0" },
      { label: "Do they have meaningful revenue?", description: "Revenue is meaningful (₫53,950B)", status: "pass", section: "3 Past Performance", tab: "Past Performance", link: "section_3_0" },
      { label: "Are they profitable?", description: "Company is currently profitable", status: "pass", section: "3 Past Performance", tab: "Past Performance", link: "section_3_0" },
      { label: "Is there sufficient financial data?", description: "Sufficient data for analysis", status: "pass", section: "2 Future Growth", tab: "Future Growth", link: "section_2_0" },
      { label: "Have shareholders been diluted?", description: "Shareholders have not been meaningfully diluted in the past year", status: "pass", section: "7 Ownership", tab: "Ownership", link: "section_7_0" },
      { label: "Is revenue or earnings forecast to grow?", description: "Positive growth forecast", status: "pass", section: "2 Future Growth", tab: "Future Growth", link: "section_2_0" },
      { label: "Is their market capitalization meaningful?", description: "Market cap is meaningful (₫217,888B)", status: "pass", section: "8 Other information", tab: "Other information", link: "section_8_0" }
    ]
  }
};

export function CompanyOverview({ onNavigate }: { onNavigate?: (tab: string, sectionId?: string) => void }) {
  const [showDataModal, setShowDataModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  const data = mockData.stock_overview;

  const snowflakeData = [
    { subject: 'VALUE', A: (data.snowflake_scores.value / 6) * 100 },
    { subject: 'FUTURE', A: (data.snowflake_scores.future / 6) * 100 },
    { subject: 'PAST', A: (data.snowflake_scores.past / 6) * 100 },
    { subject: 'HEALTH', A: (data.snowflake_scores.health / 6) * 100 },
    { subject: 'DIVIDEND', A: (data.snowflake_scores.dividend / 6) * 100 },
  ];

  const totalScore = Object.values(data.snowflake_scores).reduce((a, b) => a + b, 0);
  const snowflakeColor = totalScore >= 10 ? '#84cc16' : '#ef4444';
  
  const hasRisks = data.risk_checks.some(check => check.status === 'fail');

  const scrollToSection = (tab: string, id: string) => {
    if (onNavigate) {
      onNavigate(tab, id);
    } else {
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
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans" id="section_0_0">
      {/* Hero Section */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden mb-8 p-4 sm:p-6 flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 w-full lg:w-auto">
          <div className="w-16 h-16 bg-white border border-subtle rounded-xl flex items-center justify-center p-2 shadow-sm flex-shrink-0">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Logo_MB_new.png/600px-Logo_MB_new.png" alt="MBB Logo" className="object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-primary">{data.name}</h1>
            <p className="text-secondary font-medium text-sm sm:text-base">HOSE:{data.ticker} Stock Report</p>
            <p className="text-secondary mt-1 text-sm">Market Cap <span className="text-primary font-bold font-tabular">₫217.9t</span></p>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
              <button className="btn-interactive flex items-center space-x-2 bg-brand hover:bg-brand/90 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm text-xs sm:text-sm">
                <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Add to Portfolio</span>
              </button>
              <button className="btn-interactive flex items-center space-x-2 bg-card hover:bg-subtle text-secondary px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors border border-subtle shadow-sm text-xs sm:text-sm">
                <Star size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Watching</span>
              </button>
              <button className="btn-interactive flex items-center justify-center bg-card hover:bg-subtle text-secondary w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition-colors border border-subtle shadow-sm">
                <MoreHorizontal size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-64">
           <div className="text-[10px] sm:text-sm text-secondary mb-2 flex justify-between font-medium">
             <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-bullish mr-1.5 sm:mr-2"></div>Mar 07 2026</span>
             <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-purple-500 mr-1.5 sm:mr-2"></div>AnalystPriceTarget</span>
           </div>
           <div className="flex justify-between items-end mb-4">
             <div className="text-lg sm:text-xl font-bold text-primary">₫26.70k</div>
             <div className="text-[10px] sm:text-sm text-secondary font-medium">₫32.71k <span className="text-bullish font-bold">18.4% undervalued</span></div>
           </div>
           <div className="h-12 sm:h-16 w-full bg-base rounded-lg flex items-end overflow-hidden relative border border-subtle">
             <svg viewBox="0 0 100 30" className="w-full h-full preserve-aspect-ratio-none absolute bottom-0">
               <path d="M0,25 L10,24 L20,23 L30,22 L40,20 L50,15 L60,10 L70,12 L80,11 L90,10 L100,8" fill="none" stroke="#10b981" strokeWidth="1.5" />
               <path d="M0,20 L10,19 L20,18 L30,17 L40,15 L50,10 L60,5 L70,7 L80,6 L90,5 L100,3" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="2 2" />
             </svg>
           </div>
           <div className="flex justify-between text-[10px] sm:text-xs text-secondary mt-2 font-medium">
             <span>1Y <span className="text-bullish font-bold">43.9%</span></span>
             <span>7D <span className="text-bearish font-bold">-6.3%</span></span>
           </div>
        </div>
      </div>

      {/* Overview & Snowflake */}
      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column: Rewards & Risks */}
            <div className="w-full md:w-1/2 bg-base rounded-xl p-6 border border-subtle">
              <h2 className="text-xl font-bold text-primary mb-2">{data.name} ({data.ticker}) Overview</h2>
              <p className="text-secondary text-sm mb-6 leading-relaxed">Provides banking products and services. <a href="#" className="text-brand hover:underline font-medium">More details &gt;</a></p>
              
              <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">REWARDS</h3>
              <ul className="space-y-3 mb-6">
                {data.rewards.map((reward, idx) => (
                  <li key={idx} className="flex items-start group cursor-pointer" onClick={() => scrollToSection(reward.tab, reward.link)}>
                    <Star className="w-4 h-4 text-bullish mr-3 flex-shrink-0 mt-0.5" fill={reward.isGood ? "#10b981" : "none"} />
                    <span className="text-secondary text-sm group-hover:text-primary transition-colors group-hover:underline decoration-subtle underline-offset-4 font-medium">
                      {reward.text} <ChevronRight className="inline w-3 h-3 text-secondary group-hover:text-secondary transition-colors" />
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">RISK ANALYSIS</h3>
              {hasRisks ? (
                <div className="mb-4">
                  <p className="text-bearish text-sm font-semibold mb-2">Risks detected for {data.ticker} from our risk checks.</p>
                  <ul className="list-disc pl-5 text-secondary text-xs space-y-1">
                    {data.risk_checks.filter(r => r.status === 'fail').map((risk, idx) => (
                      <li key={idx}>{risk.label}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-primary text-sm font-medium mb-6">No risks detected for {data.ticker} from our risk checks.</p>
              )}
              <button 
                onClick={() => setShowRiskModal(true)}
                className="btn-interactive bg-brand hover:bg-brand/90 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-sm"
              >
                See All Risk Checks
              </button>
            </div>

            {/* Right Column: Radar Chart */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-base rounded-xl border border-subtle p-6 relative">
              <div className="w-full max-w-[280px] aspect-square relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={snowflakeData}>
                      <PolarGrid stroke="var(--border-subtle)" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={(props) => {
                          const { x, y, payload } = props;
                          return (
                            <text 
                              x={x} 
                              y={y} 
                              dy={4} 
                              textAnchor="middle" 
                              fill="var(--text-secondary)" 
                              fontSize={10} 
                              fontWeight={600}
                            >
                              {payload.value}
                            </text>
                          );
                        }} 
                      />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar 
                        name={data.ticker} 
                        dataKey="A" 
                        stroke={snowflakeColor} 
                        strokeWidth={2} 
                        fill={snowflakeColor} 
                        fillOpacity={0.6} 
                      />
                    </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <p className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-1">SNOWFLAKE ANALYSIS</p>
                <p className="text-primary font-bold text-base leading-tight">Undervalued with high growth potential.</p>
              </div>
              
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button 
                  onClick={() => setShowDataModal(true)}
                  className="w-8 h-8 flex items-center justify-center bg-card hover:bg-subtle text-secondary rounded-lg transition-colors border border-subtle shadow-sm"
                  title="Data"
                >
                  <Table size={14} />
                </button>
                <button 
                  onClick={() => setShowLearnModal(true)}
                  className="w-8 h-8 flex items-center justify-center bg-card hover:bg-subtle text-secondary rounded-lg transition-colors border border-subtle shadow-sm"
                  title="Learn"
                >
                  <Info size={14} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-card hover:bg-subtle text-secondary rounded-lg transition-colors border border-subtle shadow-sm">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OverviewSupplementary />

      {/* Modals */}
      {showLearnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl border border-subtle shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-subtle flex justify-between items-center">
              <h3 className="text-xl font-bold text-primary">About the Snowflake</h3>
              <button onClick={() => setShowLearnModal(false)} className="text-secondary hover:text-secondary transition-colors"><X size={24} /></button>
            </div>
            <div className="p-6 text-secondary space-y-4 text-sm leading-relaxed overflow-y-auto max-h-[60vh]">
              <p>The Snowflake is a visual summary of our company analysis based on five fundamental areas: <strong className="text-primary">Value, Future, Past, Health and Dividend</strong>. It gives you an instant snapshot of company's investment profile, helping you quickly decide if it is worth researching any further.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Each area has six metrics we measure a company against, which it either passes or fails.</li>
                <li>The colour of the Snowflake relates to its size. The more metrics a company passes, the larger and greener the Snowflake becomes. Inversely, the fewer metrics a company passes, the smaller and more red the Snowflake will be.</li>
                <li>The snowflake is not a buy or sell recommendation. It simply represents how attractive a company's fundamentals are. While its colour changes from red to green depending on how many checks the company passes, a low score in a particular assessment criteria should not necessarily exclude a stock from investment consideration.</li>
              </ul>
              <p className="pt-4">For a more in-depth explanation of the Snowflake, you can view our <a href="https://github.com/SimplyWallSt/Company-Analysis-Model/blob/master/MODEL.markdown#the-snowflake" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-medium">analysis model</a>.</p>
            </div>
            <div className="p-4 border-t border-subtle flex justify-end bg-base">
              <button onClick={() => setShowLearnModal(false)} className="bg-primary text-base hover:opacity-90 font-semibold px-6 py-2 rounded-xl transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {showDataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl border border-subtle shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-subtle flex justify-between items-center">
              <h3 className="text-xl font-bold text-primary">{data.ticker} Stock Overview</h3>
              <button onClick={() => setShowDataModal(false)} className="text-secondary hover:text-secondary transition-colors"><X size={24} /></button>
            </div>
            <div className="p-0">
              <div className="flex justify-between items-center p-4 border-b border-subtle bg-base">
                <span className="font-bold text-primary">Snowflake Score</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-subtle">
                <span className="text-secondary font-medium">Valuation</span>
                <span className="text-primary font-bold">{data.snowflake_scores.value}/6</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-subtle">
                <span className="text-secondary font-medium">Future Growth</span>
                <span className="text-primary font-bold">{data.snowflake_scores.future}/6</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-subtle">
                <span className="text-secondary font-medium">Past Performance</span>
                <span className="text-primary font-bold">{data.snowflake_scores.past}/6</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-subtle">
                <span className="text-secondary font-medium">Financial Health</span>
                <span className="text-primary font-bold">{data.snowflake_scores.health}/6</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-subtle">
                <span className="text-secondary font-medium">Dividends</span>
                <span className="text-primary font-bold">{data.snowflake_scores.dividend}/6</span>
              </div>
              <div className="p-4 text-sm text-secondary bg-base font-medium">
                {data.ticker} fundamental analysis
              </div>
            </div>
          </div>
        </div>
      )}

      {showRiskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl border border-subtle shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-subtle flex justify-between items-center bg-base">
              <h3 className="text-xl font-bold text-primary">Risk Checks</h3>
              <button onClick={() => setShowRiskModal(false)} className="text-secondary hover:text-secondary transition-colors"><X size={24} /></button>
            </div>
            <div className="p-6 text-secondary text-sm leading-relaxed border-b border-subtle bg-card">
              We perform automated risk checks on every company. We flag any failed checks as potential investment risks. A company which passes all our checks, however, is not 'risk free'.
            </div>
            <div className="bg-base p-4 border-b border-subtle">
              <h4 className="text-primary font-bold">{data.name} ({data.ticker}) Risk Checks</h4>
            </div>
            <div className="overflow-y-auto flex-1 p-0 bg-card">
              {data.risk_checks.map((check, idx) => (
                <div key={idx} className="flex items-start justify-between p-4 border-b border-subtle hover:bg-subtle transition-colors group">
                  <div className="flex items-start space-x-4">
                    <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mt-0.5 ${
                      check.status === 'pass' ? 'bg-bullish/20 text-bullish border border-bullish/30' : 
                      check.status === 'fail' ? 'bg-bearish/20 text-bearish border border-bearish/30' : 
                      'bg-base text-secondary border border-subtle'
                    }`}>
                      {check.status === 'no_data' ? 'No Data' : check.status}
                    </div>
                    <div>
                      <p className="text-primary font-semibold mb-1">{check.label}</p>
                      <p className="text-secondary text-sm font-medium">{check.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowRiskModal(false);
                      scrollToSection(check.tab, check.link);
                    }}
                    className="flex items-center space-x-1 text-secondary hover:text-primary bg-card hover:bg-subtle px-3 py-1.5 rounded border border-subtle transition-colors text-sm opacity-0 group-hover:opacity-100 shadow-sm"
                  >
                    <span>{check.section}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-subtle flex justify-end bg-base">
              <button onClick={() => setShowRiskModal(false)} className="bg-primary text-base hover:opacity-90 font-semibold px-6 py-2 rounded-xl transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
