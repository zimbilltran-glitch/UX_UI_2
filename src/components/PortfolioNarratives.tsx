import React, { useState, useMemo } from 'react';
import { Info, TrendingUp, X, Edit2, ChevronRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { usePortfolio } from '../contexts/PortfolioContext';

const snowflakeData = [
  { subject: 'VALUE', A: 80, fullMark: 100 },
  { subject: 'FUTURE', A: 60, fullMark: 100 },
  { subject: 'PAST', A: 90, fullMark: 100 },
  { subject: 'HEALTH', A: 85, fullMark: 100 },
  { subject: 'DIVIDEND', A: 40, fullMark: 100 },
];

export const PortfolioNarratives = () => {
  const { holdings } = usePortfolio();
  const [selectedHoldingSymbol, setSelectedHoldingSymbol] = useState<string | null>(null);
  const [sidePanelTab, setSidePanelTab] = useState('Overview');

  // Generate narrative data based on holdings
  const narrativeData = useMemo(() => {
    return holdings.map(holding => {
      // Mock data for narrative specific fields that aren't in the Holding type
      const isUndervalued = holding.fairValueStatus.includes('undervalued');
      return {
        symbol: holding.symbol,
        name: holding.name,
        return7D: holding.return7D,
        return1Y: holding.totalReturn, // Using totalReturn as a proxy for 1Y for demo
        price: holding.lastPrice,
        valuationStatus: holding.fairValueStatus,
        fv: holding.fairValue,
        fvDate: '10 Jan', // Mock date
        narrative: `${holding.symbol}: Accelerating Growth And Investments Will Drive Long-Term Market Leadership`,
        pe: '26.7x',
        growth: '15.4%',
        target: holding.fairValue, // Using fair value as target for demo
        marketCap: 'US$1.66t',
        fwdPe: '21.6x',
        divYield: '0.3%',
        weight: holding.weight,
        capitalInvested: holding.cost,
        shares: holding.shares,
        avgCost: holding.avgPrice,
        chartData: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 + 500 })),
        transactions: [
          { date: '2022/08/26', type: 'BUY', shares: Math.floor(holding.shares / 2), price: holding.avgPrice },
          { date: '2021/08/20', type: 'BUY', shares: Math.ceil(holding.shares / 2), price: holding.avgPrice },
        ],
        updates: [
          { title: `${holding.symbol} Expands Custom Silicon to Power AI Workloads`, date: 'Mar 12', type: 'news' },
          { title: `Upcoming dividend of US$0.53 per share`, date: 'Mar 09', type: 'dividend' },
        ]
      };
    });
  }, [holdings]);

  const selectedHolding = narrativeData.find(h => h.symbol === selectedHoldingSymbol) || null;

  return (
    <div className="flex relative">
      <div className={`flex-1 transition-all duration-300 ${selectedHolding ? 'mr-[400px]' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-primary">Holdings</h2>
            <span className="px-2 py-0.5 bg-subtle text-secondary text-xs rounded-full">{narrativeData.length}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-secondary hover:text-primary">
              <TrendingUp className="w-4 h-4" />
              <span>1Y</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-secondary hover:text-primary">
              <span>↑ Total Value</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="min-w-[800px] space-y-4">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-secondary border-b border-subtle">
              <div className="col-span-2">Company</div>
              <div className="col-span-3">Price & Valuation</div>
              <div className="col-span-4 flex items-center space-x-1">
                <span>My FV & Narrative</span>
                <Info className="w-3 h-3" />
              </div>
              <div className="col-span-1 flex items-center space-x-1">
                <span>Valuation</span>
                <Info className="w-3 h-3" />
              </div>
              <div className="col-span-1 flex items-center space-x-1">
                <span>Growth</span>
                <Info className="w-3 h-3" />
              </div>
              <div className="col-span-1 flex items-center space-x-1">
                <span>Analyst Target</span>
                <Info className="w-3 h-3" />
              </div>
            </div>

            {/* Holdings List */}
            {narrativeData.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-12 gap-4 p-4 bg-card rounded-xl border transition-colors cursor-pointer ${
                  selectedHolding?.symbol === item.symbol ? 'border-brand' : 'border-subtle hover:border-brand/50'
                }`}
                onClick={() => setSelectedHoldingSymbol(item.symbol)}
              >
                {/* Company */}
                <div className="col-span-2 flex flex-col justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-xs flex-shrink-0">
                      {item.symbol.substring(0, 1)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-primary truncate">{item.symbol}</div>
                      <div className="text-xs text-secondary truncate">{item.name}</div>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    <div>
                      <div className={`text-xs font-bold ${item.return7D.startsWith('-') ? 'text-bearish' : 'text-bullish'}`}>{item.return7D}</div>
                      <div className="text-[10px] text-secondary">7D</div>
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${item.return1Y.startsWith('-') ? 'text-bearish' : 'text-bullish'}`}>{item.return1Y}</div>
                      <div className="text-[10px] text-secondary">1Y</div>
                    </div>
                  </div>
                </div>

                {/* Price & Valuation */}
                <div className="col-span-3 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-primary">{item.price}</div>
                    <div className={`text-xs ${item.valuationStatus.includes('undervalued') ? 'text-bullish' : 'text-bearish'}`}>
                      {item.valuationStatus}
                    </div>
                  </div>
                  <div className="h-10 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={item.chartData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={item.valuationStatus.includes('undervalued') ? "#22c55e" : "#ef4444"} 
                          strokeWidth={1.5} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* My FV & Narrative */}
                <div className="col-span-4 flex flex-col">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 rounded-full bg-brand/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-brand"></div>
                    </div>
                    <span className="font-bold text-primary text-sm">{item.fv}</span>
                    <Edit2 className="w-3 h-3 text-secondary" />
                    <span className="text-xs text-secondary">{item.fvDate}</span>
                  </div>
                  <p className="text-sm text-primary line-clamp-2 leading-snug">{item.narrative}</p>
                </div>

                {/* Valuation */}
                <div className="col-span-1 flex items-center">
                  <div className="text-sm font-bold text-primary border-b border-dashed border-subtle pb-0.5">
                    {item.symbol === 'TSLA' ? 'PS ' : 'PE '}{item.pe}
                  </div>
                </div>

                {/* Growth */}
                <div className="col-span-1 flex items-center">
                  <div className="text-sm font-bold text-primary border-b border-dashed border-subtle pb-0.5">
                    E {item.growth}
                  </div>
                </div>

                {/* Analyst Target */}
                <div className="col-span-1 flex items-center">
                  <div className="text-sm font-bold text-primary">{item.target}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {selectedHolding && (
        <div className="w-[400px] fixed right-0 top-0 bottom-0 bg-card border-l border-subtle shadow-2xl z-40 flex flex-col animate-in slide-in-from-right">
          {/* Header */}
          <div className="p-6 border-b border-subtle">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-lg">
                  {selectedHolding.symbol.substring(0, 1)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold text-primary">{selectedHolding.symbol}</h2>
                    <span className="text-primary">{selectedHolding.price}</span>
                  </div>
                  <div className="text-sm text-secondary">{selectedHolding.name}</div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedHoldingSymbol(null)}
                className="p-2 hover:bg-subtle rounded-lg text-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6">
              {['Overview', 'Holding', 'Updates', 'Notes'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSidePanelTab(tab)}
                  className={`pb-2 text-sm font-semibold transition-colors relative ${
                    sidePanelTab === tab ? 'text-brand' : 'text-secondary hover:text-primary'
                  }`}
                >
                  {tab}
                  {sidePanelTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {sidePanelTab === 'Overview' && (
              <div className="space-y-8">
                {/* Important Updates */}
                {selectedHolding.updates.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-primary">Important Updates</h3>
                      <button className="text-xs text-secondary hover:text-primary border-b border-subtle">View All</button>
                    </div>
                    <div className="bg-base rounded-xl p-4 border border-subtle flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-card border border-subtle flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary text-xs">📰</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary mb-1">{selectedHolding.updates[0].title}</p>
                        <p className="text-xs text-secondary">{selectedHolding.updates[0].date}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* My Notes */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-primary">My Notes</h3>
                    <Info className="w-4 h-4 text-secondary" />
                  </div>
                  <button className="w-full py-3 bg-base border border-subtle rounded-xl text-sm font-medium text-secondary hover:text-primary hover:bg-subtle transition-colors flex items-center justify-center space-x-2">
                    <Edit2 className="w-4 h-4" />
                    <span>Add note</span>
                  </button>
                </div>

                {/* Snowflake Analysis */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-primary">Snowflake Analysis</h3>
                    <Info className="w-4 h-4 text-secondary" />
                  </div>
                  <p className="text-sm text-primary mb-4">Undervalued with excellent balance sheet.</p>
                  
                  <div className="h-48 w-full relative mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={snowflakeData}>
                        <PolarGrid stroke="var(--color-subtle)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-primary)', fontSize: 10, fontWeight: 'bold' }} />
                        <Radar name="Portfolio" dataKey="A" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <div className="text-xs text-secondary mb-1">Market Cap</div>
                      <div className="text-sm font-bold text-primary">{selectedHolding.marketCap}</div>
                    </div>
                    <div></div>
                    <div>
                      <div className="text-xs text-secondary mb-1">PE</div>
                      <div className="text-sm font-bold text-primary">{selectedHolding.pe}</div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary mb-1">Fwd PE</div>
                      <div className="text-sm font-bold text-primary">{selectedHolding.fwdPe}</div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary mb-1">E. Growth</div>
                      <div className="text-sm font-bold text-primary">{selectedHolding.growth}</div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary mb-1">Div. Yield</div>
                      <div className="text-sm font-bold text-primary">{selectedHolding.divYield}</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-subtle">
                    <div className="text-xs text-secondary mb-1">Average 1Y Price Target</div>
                    <div className="flex items-baseline space-x-2">
                      <div className="text-lg font-bold text-primary">{selectedHolding.target}</div>
                      <div className="text-xs text-secondary">Updated from {selectedHolding.target}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {sidePanelTab === 'Holding' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-secondary mb-1">Weight</div>
                    <div className="text-sm font-bold text-primary">{selectedHolding.weight}</div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary mb-1">Capital Invested</div>
                    <div className="text-sm font-bold text-primary">{selectedHolding.capitalInvested}</div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary mb-1">No. of Shares</div>
                    <div className="text-sm font-bold text-primary">{selectedHolding.shares}</div>
                  </div>
                  <div>
                    <div className="text-xs text-secondary mb-1">Avg Cost Price</div>
                    <div className="text-sm font-bold text-primary">{selectedHolding.avgCost}</div>
                  </div>
                </div>

                <div className="bg-base rounded-xl border border-subtle p-4">
                  <h3 className="text-sm font-bold text-primary mb-4">Transactions ({selectedHolding.transactions.length})</h3>
                  <div className="space-y-3 mb-4">
                    {selectedHolding.transactions.map((tx, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-4 w-1/2">
                          <span className="text-secondary">{tx.date}</span>
                          <span className={`font-bold ${tx.type === 'BUY' ? 'text-bullish' : 'text-bearish'}`}>{tx.type}</span>
                        </div>
                        <div className="flex justify-between w-1/2">
                          <span className="text-primary">{tx.shares}</span>
                          <span className="text-primary font-bold">{tx.price}</span>
                        </div>
                      </div>
                    ))}
                    {selectedHolding.transactions.length === 0 && (
                      <div className="text-sm text-secondary text-center py-4">No transactions recorded.</div>
                    )}
                  </div>
                  <button className="w-full py-2 bg-card border border-brand/30 text-brand rounded-lg text-sm font-medium hover:bg-brand/10 transition-colors flex items-center justify-center space-x-2">
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Transactions</span>
                  </button>
                </div>
              </div>
            )}

            {sidePanelTab === 'Updates' && (
              <div className="space-y-4">
                {selectedHolding.updates.map((update, i) => (
                  <div key={i} className="flex items-start space-x-4 pb-4 border-b border-subtle last:border-0">
                    <div className="w-8 h-8 rounded-full bg-base border border-subtle flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-secondary text-xs">
                        {update.type === 'news' ? '📰' : update.type === 'dividend' ? '💰' : update.type === 'insider' ? '👤' : '📄'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary mb-1 leading-snug">{update.title}</h4>
                      <p className="text-xs text-secondary">{update.date}</p>
                    </div>
                  </div>
                ))}
                {selectedHolding.updates.length === 0 && (
                  <div className="text-sm text-secondary text-center py-8">No recent updates available.</div>
                )}
              </div>
            )}
            
            {sidePanelTab === 'Notes' && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-12 h-12 rounded-full bg-base border border-subtle flex items-center justify-center mb-4">
                  <Edit2 className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2">No notes yet</h3>
                <p className="text-sm text-secondary mb-4">Add your thoughts and analysis for {selectedHolding.symbol}.</p>
                <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand/90 transition-colors">
                  Create Note
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
