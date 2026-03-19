import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { Info, ChevronDown, List } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const performanceData = [
  { name: 'Thu 05', portfolio: 0, sp500: 0 },
  { name: 'Fri 06', portfolio: -1, sp500: -0.5 },
  { name: 'Sat 07', portfolio: -0.5, sp500: 0.2 },
  { name: 'Mar 08', portfolio: 0.5, sp500: 0.8 },
  { name: 'Mon 09', portfolio: 1.2, sp500: 1.0 },
  { name: 'Tue 10', portfolio: 1.5, sp500: 1.2 },
  { name: 'Wed 11', portfolio: 2.2, sp500: 1.8 },
  { name: 'Thu 12', portfolio: 1.1, sp500: -2.2 },
];

const snowflakeData = [
  { subject: 'VALUE', A: 80, fullMark: 100 },
  { subject: 'FUTURE', A: 60, fullMark: 100 },
  { subject: 'PAST', A: 90, fullMark: 100 },
  { subject: 'HEALTH', A: 85, fullMark: 100 },
  { subject: 'DIVIDEND', A: 40, fullMark: 100 },
];

export const PortfolioHoldings = () => {
  const { holdings } = usePortfolio();

  return (
    <div className="space-y-6">
      {/* Top Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance vs market */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-subtle p-6">
          <h3 className="text-lg font-bold text-primary mb-6">Performance vs market</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-primary flex items-center">
                US$328,445 <span className="w-2 h-2 rounded-full bg-secondary ml-2"></span>
              </div>
              <div className="text-xs text-secondary">Total Value • {holdings.length} holdings</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-primary">US$235,429</div>
              <div className="text-xs text-secondary">Total Returns <span className="text-bullish">106.8%</span></div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-primary">-US$367</div>
              <div className="text-xs text-secondary">1D Returns <span className="text-bearish">-0.1%</span></div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-primary">22.4%</div>
              <div className="text-xs text-secondary border-b border-dashed border-subtle inline-block pb-0.5">Annualised (IRR)</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex space-x-6">
              <div>
                <div className="flex items-center text-sm text-secondary mb-1">
                  <div className="w-3 h-0.5 bg-bullish mr-2"></div> Portfolio
                </div>
                <div className="text-bullish font-bold">1.1%</div>
              </div>
              <div>
                <div className="flex items-center text-sm text-secondary mb-1">
                  <div className="w-3 h-0.5 bg-secondary mr-2"></div> S&P 500 (US) <ChevronDown className="w-4 h-4 ml-1" />
                </div>
                <div className="text-primary font-bold">-2.2%</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 bg-base p-1 rounded-lg border border-subtle w-full sm:w-auto">
              {['7D', '1M', '3M', 'YTD', '1Y'].map(period => (
                <button key={period} className={`flex-1 sm:flex-none px-3 py-1 text-xs font-medium rounded-md ${period === '7D' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-subtle)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-secondary)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-secondary)', fontSize: 12 }} tickFormatter={(val) => `${val}%`} orientation="right" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-subtle)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-primary)' }}
                />
                <Line type="monotone" dataKey="portfolio" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="sp500" stroke="#6b7280" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Portfolio Snowflake */}
        <div className="bg-card rounded-xl border border-subtle p-6 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-primary">Portfolio Snowflake</h3>
            <Info className="w-4 h-4 text-secondary" />
          </div>
          
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={snowflakeData}>
                <PolarGrid stroke="var(--color-subtle)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-primary)', fontSize: 10, fontWeight: 'bold' }} />
                <Radar name="Portfolio" dataKey="A" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4">
            <p className="text-sm text-primary mb-4">A value Portfolio with a solid track record</p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-secondary">{holdings.length} holdings</span>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-bearish/10 text-bearish text-xs font-bold rounded flex items-center"><span className="mr-1">!</span> 21</span>
                <span className="px-2 py-1 bg-bullish/10 text-bullish text-xs font-bold rounded flex items-center"><span className="mr-1">★</span> 43</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-card rounded-xl border border-subtle p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-secondary">Unrealized Returns</span>
            <Info className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-xl font-bold text-primary mb-1">US$169,637</div>
          <div className="text-xs text-bullish">77.0%</div>
        </div>
        <div className="bg-card rounded-xl border border-subtle p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-secondary">Realized Returns</span>
            <Info className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-xl font-bold text-primary mb-1">US$52,591</div>
          <div className="text-xs text-bullish">23.9%</div>
        </div>
        <div className="bg-card rounded-xl border border-subtle p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-secondary">Dividends</span>
            <Info className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-xl font-bold text-primary mb-1">US$14,152</div>
          <div className="text-xs text-bullish">6.4%</div>
        </div>
        <div className="bg-card rounded-xl border border-subtle p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-secondary">Currency Impact</span>
            <Info className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-xl font-bold text-primary mb-1">-US$952</div>
          <div className="text-xs text-bearish">-0.4%</div>
        </div>
        <div className="bg-card rounded-xl border border-subtle p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-secondary">Estimated Dividends</span>
            <Info className="w-4 h-4 text-secondary" />
          </div>
          <div className="text-xl font-bold text-primary mb-1">US$4,908 <span className="text-sm font-normal text-secondary">/yr</span></div>
          <div className="text-xs text-bullish">1.5% Yield</div>
        </div>
      </div>

      {/* Holdings Table */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-primary">Holdings</h2>
            <span className="px-2 py-0.5 bg-subtle text-secondary text-xs rounded-full">{holdings.length}</span>
          </div>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-card border border-subtle rounded-lg text-sm text-secondary hover:text-primary transition-colors shadow-sm w-full sm:w-auto justify-center sm:justify-start">
            <List className="w-4 h-4" />
            <span>Holding View</span>
          </button>
        </div>

        <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-subtle">
                  <th className="p-4 text-xs font-semibold text-secondary">Symbol</th>
                  <th className="p-4 text-xs font-semibold text-secondary">Last Price</th>
                  <th className="p-4 text-xs font-semibold text-secondary">FV Fair Value</th>
                  <th className="p-4 text-xs font-semibold text-secondary">↓ 7D % Return</th>
                  <th className="p-4 text-xs font-semibold text-secondary">Total Return</th>
                  <th className="p-4 text-xs font-semibold text-secondary">Value/Cost</th>
                  <th className="p-4 text-xs font-semibold text-secondary">Weight/Shares</th>
                  <th className="p-4 text-xs font-semibold text-secondary">Avg. Price</th>
                  <th className="p-4 text-xs font-semibold text-secondary">1Y chart</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding, index) => (
                  <tr key={index} className="border-b border-subtle hover:bg-subtle/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-xs">
                          {holding.symbol.substring(0, 1)}
                        </div>
                        <div>
                          <div className="font-bold text-primary">{holding.symbol}</div>
                          <div className="text-xs text-secondary truncate max-w-[100px]">{holding.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-primary">{holding.lastPrice}</div>
                      <div className={`text-xs ${holding.fairValueStatus.includes('undervalued') ? 'text-bullish' : 'text-bearish'}`}>
                        {holding.fairValueStatus}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center space-x-2 bg-subtle/50 px-2 py-1 rounded border border-subtle">
                        <span className="text-xs text-secondary">FV</span>
                        <span className="font-bold text-primary text-sm">{holding.fairValue}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`font-bold ${holding.return7D.startsWith('-') ? 'text-bearish' : 'text-bullish'}`}>
                        {holding.return7D}
                      </div>
                      <div className="text-xs text-secondary">{holding.return7DValue}</div>
                    </td>
                    <td className="p-4">
                      <div className={`font-bold ${holding.totalReturn.startsWith('-') ? 'text-bearish' : 'text-bullish'}`}>
                        {holding.totalReturn}
                      </div>
                      <div className="text-xs text-secondary">{holding.totalReturnValue}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-primary">{holding.value}</div>
                      <div className="text-xs text-secondary">{holding.cost}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-primary">{holding.weight}</div>
                      <div className="text-xs text-secondary">{holding.shares}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-primary">{holding.avgPrice}</div>
                    </td>
                    <td className="p-4 w-32">
                      <div className="h-8 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={performanceData}>
                            <Line type="monotone" dataKey={holding.return7D.startsWith('-') ? "sp500" : "portfolio"} stroke={holding.return7D.startsWith('-') ? "#ef4444" : "#22c55e"} strokeWidth={1.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
