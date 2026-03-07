import React, { useState } from 'react';
import { Star, Plus, MoreHorizontal, X, ChevronRight, Info, Table } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { OverviewSupplementary } from './OverviewSupplementary';

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
  const snowflakeColor = totalScore >= 20 ? '#a3e635' : totalScore >= 10 ? '#eab308' : '#ef4444';
  
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
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 bg-[#111111] p-6 rounded-xl border border-gray-800 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Logo_MB_new.png/600px-Logo_MB_new.png" alt="MBB Logo" className="object-contain" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{data.name}</h1>
            <p className="text-gray-400">HOSE:{data.ticker} Stock Report</p>
            <p className="text-gray-400 mt-1">Market Cap <span className="text-white">₫217.9t</span></p>
            
            <div className="flex space-x-3 mt-4">
              <button className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition-colors">
                <Plus size={18} />
                <span>Add to Portfolio</span>
              </button>
              <button className="flex items-center space-x-2 bg-[#1A1A1A] hover:bg-[#222222] text-white px-4 py-2 rounded-lg font-medium transition-colors border border-gray-800">
                <Star size={18} />
                <span>Watching</span>
              </button>
              <button className="flex items-center justify-center bg-[#1A1A1A] hover:bg-[#222222] text-white w-10 h-10 rounded-lg transition-colors border border-gray-800">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-0 w-full md:w-64">
           <div className="text-sm text-gray-400 mb-2 flex justify-between">
             <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>Mar 07 2026</span>
             <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>AnalystPriceTarget</span>
           </div>
           <div className="flex justify-between items-end mb-4">
             <div className="text-xl font-bold text-white">₫26.70k</div>
             <div className="text-sm text-gray-400">₫32.71k <span className="text-emerald-400">18.4% undervalued</span></div>
           </div>
           <div className="h-16 w-full bg-[#1A1A1A] rounded flex items-end overflow-hidden relative border border-gray-800">
             <svg viewBox="0 0 100 30" className="w-full h-full preserve-aspect-ratio-none absolute bottom-0">
               <path d="M0,25 L10,24 L20,23 L30,22 L40,20 L50,15 L60,10 L70,12 L80,11 L90,10 L100,8" fill="none" stroke="#10b981" strokeWidth="1.5" />
               <path d="M0,20 L10,19 L20,18 L30,17 L40,15 L50,10 L60,5 L70,7 L80,6 L90,5 L100,3" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="2 2" />
             </svg>
           </div>
           <div className="flex justify-between text-xs text-gray-500 mt-2">
             <span>1Y <span className="text-emerald-400">43.9%</span></span>
             <span>7D <span className="text-red-400">-6.3%</span></span>
           </div>
        </div>
      </div>

      {/* Overview & Snowflake */}
      <div className="bg-[#111111] rounded-xl p-8 border border-gray-800 shadow-lg mb-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{data.name} ({data.ticker}) Stock Overview</h2>
          <p className="text-gray-300 mb-8">Provides banking products and services. <a href="#" className="text-yellow-500 hover:underline">More details &gt;</a></p>
          
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">REWARDS</h3>
          <ul className="space-y-4 mb-8">
            {data.rewards.map((reward, idx) => (
              <li key={idx} className="flex items-start group cursor-pointer" onClick={() => scrollToSection(reward.tab, reward.link)}>
                <Star className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" fill={reward.isGood ? "#10b981" : "none"} />
                <span className="text-gray-200 group-hover:text-white transition-colors group-hover:underline decoration-gray-600 underline-offset-4">{reward.text} <ChevronRight className="inline w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" /></span>
              </li>
            ))}
          </ul>

          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">RISK ANALYSIS</h3>
          {hasRisks ? (
            <div className="mb-4">
              <p className="text-red-400 font-medium mb-2">Risks detected for {data.ticker} from our risk checks.</p>
              <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
                {data.risk_checks.filter(r => r.status === 'fail').map((risk, idx) => (
                  <li key={idx}>{risk.label}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-white font-medium mb-6">No risks detected for {data.ticker} from our risk checks.</p>
          )}
          <button 
            onClick={() => setShowRiskModal(true)}
            className="bg-[#1A1A1A] hover:bg-[#222222] text-yellow-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-yellow-900/50"
          >
            See All Risk Checks
          </button>
        </div>

        <div className="flex flex-col items-center justify-center relative">
          <div className="w-80 h-80 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={snowflakeData}>
                <PolarGrid stroke="#333333" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar 
                  name={data.ticker} 
                  dataKey="A" 
                  stroke={snowflakeColor} 
                  strokeWidth={2} 
                  fill={snowflakeColor} 
                  fillOpacity={0.6} 
                  style={{ filter: `drop-shadow(0 0 10px ${snowflakeColor}80)` }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm font-medium">Snowflake Analysis</p>
            <p className="text-white font-medium">Undervalued with high growth potential.</p>
          </div>
          
          <div className="absolute bottom-0 right-0 flex space-x-2">
            <button 
              onClick={() => setShowDataModal(true)}
              className="flex items-center space-x-1.5 bg-[#1A1A1A] hover:bg-[#222222] text-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-gray-800"
            >
              <Table size={14} />
              <span>Data</span>
            </button>
            <button 
              onClick={() => setShowLearnModal(true)}
              className="flex items-center space-x-1.5 bg-[#1A1A1A] hover:bg-[#222222] text-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-gray-800"
            >
              <Info size={14} />
              <span>Learn</span>
            </button>
            <button className="flex items-center justify-center bg-[#1A1A1A] hover:bg-[#222222] text-gray-300 w-8 h-8 rounded-lg transition-colors border border-gray-800">
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>
      </div>

      <OverviewSupplementary />

      {/* Modals */}
      {showLearnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">About the Snowflake</h3>
              <button onClick={() => setShowLearnModal(false)} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <div className="p-6 text-gray-300 space-y-4 text-sm leading-relaxed overflow-y-auto max-h-[60vh]">
              <p>The Snowflake is a visual summary of our company analysis based on five fundamental areas: <strong className="text-white">Value, Future, Past, Health and Dividend</strong>. It gives you an instant snapshot of company's investment profile, helping you quickly decide if it is worth researching any further.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Each area has six metrics we measure a company against, which it either passes or fails.</li>
                <li>The colour of the Snowflake relates to its size. The more metrics a company passes, the larger and greener the Snowflake becomes. Inversely, the fewer metrics a company passes, the smaller and more red the Snowflake will be.</li>
                <li>The snowflake is not a buy or sell recommendation. It simply represents how attractive a company's fundamentals are. While its colour changes from red to green depending on how many checks the company passes, a low score in a particular assessment criteria should not necessarily exclude a stock from investment consideration.</li>
              </ul>
              <p className="pt-4">For a more in-depth explanation of the Snowflake, you can view our <a href="https://github.com/SimplyWallSt/Company-Analysis-Model/blob/master/MODEL.markdown#the-snowflake" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline font-medium">analysis model</a>.</p>
            </div>
            <div className="p-4 border-t border-gray-800 flex justify-end bg-[#0A0A0A]">
              <button onClick={() => setShowLearnModal(false)} className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {showDataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{data.ticker} Stock Overview</h3>
              <button onClick={() => setShowDataModal(false)} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <div className="p-0">
              <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#1A1A1A]">
                <span className="font-semibold text-white">Snowflake Score</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <span className="text-gray-300">Valuation</span>
                <span className="text-white font-medium">{data.snowflake_scores.value}/6</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <span className="text-gray-300">Future Growth</span>
                <span className="text-white font-medium">{data.snowflake_scores.future}/6</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <span className="text-gray-300">Past Performance</span>
                <span className="text-white font-medium">{data.snowflake_scores.past}/6</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <span className="text-gray-300">Financial Health</span>
                <span className="text-white font-medium">{data.snowflake_scores.health}/6</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <span className="text-gray-300">Dividends</span>
                <span className="text-white font-medium">{data.snowflake_scores.dividend}/6</span>
              </div>
              <div className="p-4 text-sm text-gray-500 bg-[#0A0A0A]">
                {data.ticker} fundamental analysis
              </div>
            </div>
          </div>
        </div>
      )}

      {showRiskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111111] rounded-xl border border-gray-800 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#0A0A0A]">
              <h3 className="text-xl font-bold text-white">Risk Checks</h3>
              <button onClick={() => setShowRiskModal(false)} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <div className="p-6 text-gray-300 text-sm leading-relaxed border-b border-gray-800 bg-[#111111]">
              We perform automated risk checks on every company. We flag any failed checks as potential investment risks. A company which passes all our checks, however, is not 'risk free'.
            </div>
            <div className="bg-[#1A1A1A] p-4 border-b border-gray-800">
              <h4 className="text-white font-medium">{data.name} ({data.ticker}) Risk Checks</h4>
            </div>
            <div className="overflow-y-auto flex-1 p-0 bg-[#111111]">
              {data.risk_checks.map((check, idx) => (
                <div key={idx} className="flex items-start justify-between p-4 border-b border-gray-800 hover:bg-[#1A1A1A] transition-colors group">
                  <div className="flex items-start space-x-4">
                    <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mt-0.5 ${
                      check.status === 'pass' ? 'bg-emerald-900/40 text-emerald-500 border border-emerald-800/50' : 
                      check.status === 'fail' ? 'bg-red-900/40 text-red-500 border border-red-800/50' : 
                      'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}>
                      {check.status === 'no_data' ? 'No Data' : check.status}
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">{check.label}</p>
                      <p className="text-gray-400 text-sm">{check.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowRiskModal(false);
                      scrollToSection(check.tab, check.link);
                    }}
                    className="flex items-center space-x-1 text-gray-400 hover:text-white bg-[#222222] hover:bg-[#2A2A2A] px-3 py-1.5 rounded border border-gray-700 transition-colors text-sm opacity-0 group-hover:opacity-100"
                  >
                    <span>{check.section}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-800 flex justify-end bg-[#0A0A0A]">
              <button onClick={() => setShowRiskModal(false)} className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
