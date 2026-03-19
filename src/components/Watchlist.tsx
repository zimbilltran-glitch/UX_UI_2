import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Settings, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  MoreHorizontal,
  X,
  Edit2,
  Star,
  Search,
  Newspaper,
  Users
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar 
} from 'recharts';

// Mock Data
const watchlistData = [
  {
    id: 'AAPL',
    ticker: 'AAPL',
    name: 'Apple',
    price: 'US$255.76',
    currency: 'US$',
    priceValue: 255.76,
    change7d: -1.7,
    change3m: -8.1,
    undervalued: 5.8,
    fairValue: 'US$271.47',
    fvDate: '04 Jan',
    narrative: 'Is Apple (AAPL) Trading Above Its Fair Value? The $4 Trillion Question.',
    pe: '31.9x',
    fwdPe: '29.4x',
    eGrowth: '7.5%',
    divYield: '0.4%',
    analystTarget: 'US$295.44',
    marketCap: 'US$3.83t',
    color: '#F59E0B', // Amber
    chartData: Array.from({ length: 20 }, () => ({ value: 240 + Math.random() * 30 })),
    snowflake: [
      { subject: 'Value', A: 3, fullMark: 6 },
      { subject: 'Future', A: 4, fullMark: 6 },
      { subject: 'Past', A: 6, fullMark: 6 },
      { subject: 'Health', A: 5, fullMark: 6 },
      { subject: 'Dividend', A: 2, fullMark: 6 },
    ],
    updates: [
      {
        title: 'Apple will shine with a 6% revenue growth in the next 5 years',
        date: 'Mar 09',
        source: 'Apple Inc. (AAPL) - Investment Narrative Company Overview Apple Inc.'
      }
    ],
    rewards: [
      'Earnings are forecast to grow 7.52% per year',
      'Earnings grew by 22.5% over the past year'
    ],
    risks: [
      'No risks detected for AAPL from our risks checks.'
    ]
  },
  {
    id: 'MBB',
    ticker: 'MBB',
    name: 'Military Commercial Joint Stock Bank',
    price: '₫26,150.00',
    currency: '₫',
    priceValue: 26150,
    change7d: -3.0,
    change3m: 9.4,
    undervalued: 20.1,
    fairValue: '₫32.71k',
    fvDate: '13 Mar',
    narrative: 'Analysts are bullish with a Price Target of ₫32,710 based on 55.6% annual revenue growth forecasts.',
    pe: '7.9x',
    fwdPe: '7.1x',
    eGrowth: '16.7%',
    divYield: '3.3%',
    analystTarget: '₫32,709.73',
    marketCap: '₫136.8t',
    color: '#84CC16', // Lime
    chartData: Array.from({ length: 20 }, () => ({ value: 24000 + Math.random() * 3000 })),
    snowflake: [
      { subject: 'Value', A: 5, fullMark: 6 },
      { subject: 'Future', A: 4, fullMark: 6 },
      { subject: 'Past', A: 5, fullMark: 6 },
      { subject: 'Health', A: 3, fullMark: 6 },
      { subject: 'Dividend', A: 4, fullMark: 6 },
    ],
    updates: [
      {
        title: 'Strong credit growth expected in Q1 2026',
        date: 'Mar 10',
        source: 'Market Analysis Report'
      }
    ],
    rewards: [
      'Earnings are forecast to grow 16.7% per year',
      'Trading at 20% below our estimate of its fair value'
    ],
    risks: [
      'High proportion of non-performing loans compared to peers.'
    ]
  },
  {
    id: 'TCB',
    ticker: 'TCB',
    name: 'Vietnam Technological and Commercial Joint Stock Bank',
    price: '₫30,000.00',
    currency: '₫',
    priceValue: 30000,
    change7d: -6.8,
    change3m: -6.3,
    undervalued: 28.9,
    fairValue: '₫42.17k',
    fvDate: '13 Mar',
    narrative: 'Branch Expansion And Cash Dividend Will Support Banking Diversification Ahead',
    pe: '8.4x',
    fwdPe: '7.1x',
    eGrowth: '15.9%',
    divYield: '3.3%',
    analystTarget: '₫42,165.20',
    marketCap: 'US$8.08b',
    color: '#84CC16', // Lime
    chartData: Array.from({ length: 20 }, () => ({ value: 28000 + Math.random() * 4000 })),
    snowflake: [
      { subject: 'Value', A: 6, fullMark: 6 },
      { subject: 'Future', A: 5, fullMark: 6 },
      { subject: 'Past', A: 5, fullMark: 6 },
      { subject: 'Health', A: 4, fullMark: 6 },
      { subject: 'Dividend', A: 3, fullMark: 6 },
    ],
    updates: [
      {
        title: 'Full year 2025 earnings: EPS and revenues exceed analyst expectations',
        date: 'Jan 23',
        source: 'Company Earnings Report'
      }
    ],
    rewards: [
      'Earnings are forecast to grow 15.92% per year',
      'Analysts in good agreement that stock price will rise by 40.6%',
      'Earnings have grown 8% per year over the past 5 years',
      'Trading at 39% below our estimate of its fair value'
    ],
    risks: [
      'No risks detected for TCB from our risks checks.'
    ]
  }
];

export function Watchlist() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Updates' | 'Notes'>('Overview');
  const [showValuationModal, setShowValuationModal] = useState(false);

  const selectedData = watchlistData.find(s => s.id === selectedStock);

  return (
    <div className="flex h-full bg-[var(--bg-base)] text-[var(--text-primary)] relative">
      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300 ${selectedStock ? 'lg:pr-[400px]' : ''}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif">Watchlist</h1>
            <ChevronDown size={24} className="text-secondary cursor-pointer" />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg hover:bg-[var(--border-subtle)] transition-colors text-sm font-medium whitespace-nowrap">
              <Plus size={16} />
              <span>New Watchlist</span>
            </button>
            <button className="p-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg hover:bg-[var(--border-subtle)] transition-colors">
              <Upload size={16} />
            </button>
            <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg hover:bg-[var(--border-subtle)] transition-colors text-sm font-medium whitespace-nowrap">
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Sub Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold">Watching</h2>
            <span className="bg-[var(--border-subtle)] text-secondary px-2 py-0.5 rounded-full text-xs font-bold">
              {watchlistData.length}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-secondary w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                <TrendingUp size={16} />
                <span>3M</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                <TrendingUp size={16} />
                <span>7D Performance</span>
              </button>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[var(--border-subtle)]"></div>
            <button className="p-1 hover:text-primary transition-colors">
              <div className="w-4 h-4 border border-current rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-current rounded-sm"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Table Header - Hidden on mobile */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-secondary border-b border-[var(--border-subtle)] mb-2">
          <div className="col-span-2">Company</div>
          <div className="col-span-3">Price & Valuation</div>
          <div className="col-span-4 flex items-center space-x-1">
            <span>My FV & Narrative</span>
            <Info size={14} />
          </div>
          <div className="col-span-1 flex items-center space-x-1">
            <span>Valuation</span>
            <Info size={14} />
          </div>
          <div className="col-span-1 flex items-center space-x-1">
            <span>Growth</span>
            <Info size={14} />
          </div>
          <div className="col-span-1 flex items-center space-x-1">
            <span>Analyst Target</span>
            <Info size={14} />
          </div>
        </div>

        {/* Watchlist Items */}
        <div className="space-y-3 sm:space-y-2">
          {watchlistData.map((stock) => (
            <div 
              key={stock.id}
              onClick={() => setSelectedStock(stock.id)}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                selectedStock === stock.id 
                  ? 'bg-[var(--bg-card)] border-brand/30 shadow-sm' 
                  : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-brand/30'
              }`}
            >
              {/* Company */}
              <div className="col-span-1 lg:col-span-2 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-base)] border border-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-6 h-6" style={{ fill: stock.color, opacity: 0.8 }}>
                    <path d="M50 10 C 70 10, 90 30, 90 50 C 90 70, 70 90, 50 90 C 30 90, 10 70, 10 50 C 10 30, 30 10, 50 10 Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{stock.ticker}</div>
                  <div className="text-xs text-secondary truncate">{stock.name}</div>
                  <div className="flex items-center space-x-3 mt-1 text-xs">
                    <div>
                      <span className={stock.change7d >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {stock.change7d > 0 ? '+' : ''}{stock.change7d}%
                      </span>
                      <span className="text-[10px] text-secondary ml-1">7D</span>
                    </div>
                    <div>
                      <span className={stock.change3m >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {stock.change3m > 0 ? '+' : ''}{stock.change3m}%
                      </span>
                      <span className="text-[10px] text-secondary ml-1">3M</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Valuation */}
              <div className="col-span-1 lg:col-span-3 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{stock.price}</span>
                  <span className="text-xs font-medium text-green-500">{stock.undervalued}% undervalued</span>
                </div>
                <div className="h-10 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stock.chartData}>
                      <defs>
                        <linearGradient id={`colorValue-${stock.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={stock.change7d >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={stock.change7d >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={stock.change7d >= 0 ? "#10B981" : "#EF4444"} 
                        fill={`url(#colorValue-${stock.id})`}
                        strokeWidth={1.5} 
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* My FV & Narrative */}
              <div className="col-span-1 lg:col-span-4 flex items-center justify-between">
                <div className="flex flex-col justify-center flex-1 pr-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-[var(--bg-base)] flex items-center justify-center">
                      <span className="text-[10px]">🎯</span>
                    </div>
                    <span className="font-bold text-sm">{stock.fairValue}</span>
                    <span className="text-xs text-secondary">{stock.fvDate}</span>
                  </div>
                  <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                    {stock.narrative}
                  </p>
                </div>
                {stock.id !== 'AAPL' && (
                  <button 
                    className="px-3 py-1.5 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md text-xs font-medium hover:bg-[var(--border-subtle)] transition-colors flex items-center space-x-1 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowValuationModal(true);
                    }}
                  >
                    <span>Select</span>
                    <ChevronDown size={14} className="-rotate-90" />
                  </button>
                )}
              </div>

              {/* Valuation, Growth, Analyst Target - Grouped on mobile */}
              <div className="col-span-1 lg:col-span-3 grid grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-0">
                <div className="flex flex-col justify-center">
                  <div className="text-xs text-secondary lg:hidden mb-1">Valuation</div>
                  <div className="text-sm font-bold flex items-center space-x-1">
                    <span className="text-secondary font-normal lg:inline hidden">PE</span>
                    <span className="border-b border-dashed border-secondary">{stock.pe}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-xs text-secondary lg:hidden mb-1">Growth</div>
                  <div className="text-sm font-bold flex items-center space-x-1">
                    <span className="text-secondary font-normal lg:inline hidden">E</span>
                    <span className="border-b border-dashed border-secondary">{stock.eGrowth}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-xs text-secondary lg:hidden mb-1">Target</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold border-b border-dashed border-secondary">{stock.analystTarget}</div>
                    <button className="p-1 text-secondary hover:text-primary transition-colors hidden lg:block">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search e.g. Apple" 
              className="pl-9 pr-4 py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-sm focus:outline-none focus:border-brand w-full"
            />
          </div>
          <div className="text-xs text-secondary">
            {watchlistData.length}/50 stocks
          </div>
        </div>

        <div className="mt-8 text-sm text-secondary">
          We've recently updated how you can view stocks within your watchlist. <a href="#" className="text-brand hover:underline">Share Feedback</a>
        </div>
      </div>

      {/* Side Panel */}
      {selectedStock && selectedData && (
        <div className="fixed lg:absolute top-0 right-0 w-full sm:w-[400px] h-full bg-[var(--bg-card)] border-l border-[var(--border-subtle)] flex flex-col shadow-2xl z-40 animate-in slide-in-from-right-8 duration-300">
          {/* Panel Header */}
          <div className="p-4 border-b border-[var(--border-subtle)]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1">
                  {/* Placeholder for company logo */}
                  <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-500">
                    {selectedData.ticker}
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="font-bold text-lg">{selectedData.ticker}</h2>
                    <span className="text-sm font-medium">{selectedData.price}</span>
                  </div>
                  <p className="text-xs text-secondary">{selectedData.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStock(null)}
                className="p-1.5 text-secondary hover:text-primary hover:bg-[var(--border-subtle)] rounded-md transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6">
              {['Overview', 'Updates', 'Notes'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab 
                      ? 'border-brand text-primary' 
                      : 'border-transparent text-secondary hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {activeTab === 'Overview' && (
              <>
                {/* Important Updates */}
                <div className="bg-[var(--bg-base)] rounded-xl border border-[var(--border-subtle)] p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-secondary">Important Updates</h3>
                    <button className="text-xs text-secondary hover:text-primary underline">View All</button>
                  </div>
                  {selectedData.updates.map((update, idx) => (
                    <div key={idx} className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--border-subtle)] flex items-center justify-center flex-shrink-0 mt-1">
                        <Newspaper size={14} className="text-secondary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold leading-snug mb-1">{update.title}</h4>
                        <div className="text-xs text-secondary mb-1">{update.date}</div>
                        <p className="text-xs text-secondary">{update.source}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* My Notes */}
                <div className="bg-[var(--bg-base)] rounded-xl border border-[var(--border-subtle)] p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-secondary">My Notes</h3>
                    <Info size={14} className="text-secondary" />
                  </div>
                  <button className="w-full py-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-sm font-medium hover:bg-[var(--border-subtle)] transition-colors flex items-center justify-center space-x-2">
                    <Edit2 size={14} />
                    <span>Add note</span>
                  </button>
                </div>

                {/* Snowflake Analysis */}
                <div className="bg-[var(--bg-base)] rounded-xl border border-[var(--border-subtle)] p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-secondary mb-1">Snowflake Analysis</h3>
                      <p className="text-sm font-medium leading-snug">Flawless balance sheet and undervalued.</p>
                    </div>
                    <Info size={14} className="text-secondary mt-1" />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs text-secondary mb-1">Market Cap</div>
                      <div className="text-lg font-bold">{selectedData.marketCap}</div>
                    </div>
                    <div className="w-24 h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={selectedData.snowflake}>
                          <PolarGrid gridType="polygon" stroke="var(--border-subtle)" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 8 }} />
                          <Radar name="Company" dataKey="A" stroke={selectedData.color} fill={selectedData.color} fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div>
                      <div className="text-xs text-secondary mb-1">PE</div>
                      <div className="text-sm font-bold">{selectedData.pe}</div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary mb-1">Fwd PE</div>
                      <div className="text-sm font-bold">{selectedData.fwdPe}</div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary mb-1">E. Growth</div>
                      <div className="text-sm font-bold">{selectedData.eGrowth}</div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary mb-1">Div. Yield</div>
                      <div className="text-sm font-bold">{selectedData.divYield}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <div className="text-xs text-secondary mb-1">Average 1Y Price Target</div>
                    <div className="text-sm font-bold flex items-center space-x-2">
                      <span>{selectedData.analystTarget}</span>
                      <span className="text-xs font-normal text-secondary">Updated from {selectedData.analystTarget}</span>
                    </div>
                  </div>
                </div>

                {/* Rewards */}
                <div className="bg-[var(--bg-base)] rounded-xl border border-[var(--border-subtle)] p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-secondary">Rewards</h3>
                    <Info size={14} className="text-secondary" />
                  </div>
                  <ul className="space-y-2">
                    {selectedData.rewards.map((reward, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm font-medium">
                        <Star size={14} className="text-green-500 mt-0.5 flex-shrink-0 fill-current" />
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk Analysis */}
                <div className="bg-[var(--bg-base)] rounded-xl border border-[var(--border-subtle)] p-4">
                  <h3 className="text-sm font-bold text-secondary mb-3">Risk Analysis</h3>
                  <ul className="space-y-2">
                    {selectedData.risks.map((risk, idx) => (
                      <li key={idx} className="text-sm font-medium">
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center pt-2 pb-4">
                  <button className="px-6 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold rounded-full transition-colors flex items-center space-x-2">
                    <span>Full Analysis</span>
                    <ChevronDown size={16} className="-rotate-90" />
                  </button>
                </div>
              </>
            )}
            {activeTab === 'Updates' && (
              <div className="text-center py-8 text-secondary text-sm">
                No more updates available.
              </div>
            )}
            {activeTab === 'Notes' && (
              <div className="text-center py-8 text-secondary text-sm">
                You haven't added any notes yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Valuation Modal */}
      {showValuationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-[var(--border-subtle)]">
              <h2 className="text-lg font-bold">Valuation for TCB</h2>
              <button 
                onClick={() => setShowValuationModal(false)}
                className="p-1.5 text-secondary hover:text-primary hover:bg-[var(--border-subtle)] rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">Community Narratives</span>
                  <span className="bg-[var(--border-subtle)] text-secondary px-2 py-0.5 rounded-full text-xs font-bold">4</span>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1.5 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md text-sm font-medium hover:bg-[var(--border-subtle)] transition-colors">
                  <Plus size={14} />
                  <span>Create Narrative</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Narrative Card 1 */}
                <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-4 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">TCB (₫30,000) is trading below our estimate of fair value (₫49,195).</h3>
                    <div className="flex items-center space-x-4 text-xs text-secondary mt-auto pt-4">
                      <div className="flex items-center space-x-1"><Users size={14} /><span>4</span></div>
                      <div>over 1 year ago</div>
                    </div>
                  </div>
                  <div className="w-full sm:w-[280px] bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-3 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-amber-900/30 flex items-center justify-center text-amber-500">
                          <span className="text-xs">🐂</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm">₫49.2k</span>
                            <span className="text-[10px] font-bold text-green-500">39.0% undervalued</span>
                          </div>
                          <div className="text-xs text-secondary">Future Cash Flow Value</div>
                        </div>
                      </div>
                      <MoreHorizontal size={16} className="text-secondary" />
                    </div>
                    <div className="text-xs text-secondary mb-3">
                      Number of Analysts <span className="font-bold text-primary">15</span>
                    </div>
                    <button className="w-full py-1.5 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md text-sm font-medium hover:bg-[var(--border-subtle)] transition-colors mt-auto">
                      Set Fair Value
                    </button>
                  </div>
                </div>

                {/* Narrative Card 2 */}
                <div className="bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl p-4 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">Branch Expansion And Cash Dividend Will Support Banking Diversification Ahead</h3>
                    <p className="text-xs text-secondary line-clamp-2 mb-3">
                      Key Takeaways Rapid digital transformation, diversification, and Vietnam's economic growth position Techcombank for sustained retail and corporate expansion, improv... <span className="text-brand font-medium cursor-pointer">Read more</span>
                    </p>
                    <div className="flex items-center justify-between text-xs text-secondary mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1"><span>👁</span><span>76</span></div>
                        <div className="flex items-center space-x-1"><span>👍</span><span>0</span></div>
                        <div className="flex items-center space-x-1"><span>💬</span><span>0</span></div>
                        <div className="flex items-center space-x-1"><Users size={14} /><span>7</span></div>
                      </div>
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-[10px] font-bold">Updated</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-[280px] bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-3 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-500">
                          <span className="text-xs">🎯</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm">₫42.17k</span>
                            <span className="text-[10px] font-bold text-green-500">28.9% undervalued</span>
                          </div>
                          <div className="text-xs text-secondary">AnalystConsensusTarget's Fair Value</div>
                        </div>
                      </div>
                      <MoreHorizontal size={16} className="text-secondary" />
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mb-3">
                      <div className="text-secondary">Revenue <span className="font-bold text-primary">22.01% p.a.</span></div>
                      <div className="text-secondary">Profit Margin <span className="font-bold text-primary">49.08%</span></div>
                      <div className="text-secondary">Future PE <span className="font-bold text-primary">9.58x</span></div>
                      <div className="text-secondary">Price in 2029 <span className="font-bold text-primary">₫58.47k</span></div>
                    </div>
                    <div className="flex space-x-2 mt-auto">
                      <button className="flex-1 py-1.5 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md text-sm font-medium hover:bg-[var(--border-subtle)] transition-colors">
                        Set Fair Value
                      </button>
                      <button className="px-3 py-1.5 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-md text-sm font-medium hover:bg-[var(--border-subtle)] transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[var(--border-subtle)] flex justify-end">
              <button 
                onClick={() => setShowValuationModal(false)}
                className="px-6 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
