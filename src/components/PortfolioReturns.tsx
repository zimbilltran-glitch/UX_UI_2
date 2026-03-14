import React, { useState } from 'react';
import { Info, ChevronDown, Download, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const returnsData = [
  { name: 'Unrealized', value: 170924, fill: '#22c55e' },
  { name: 'Realized', value: 52591, fill: '#22c55e' },
  { name: 'Dividends', value: 14152, fill: '#22c55e' },
  { name: 'Currency', value: -952, fill: '#ef4444' },
  { name: 'Total', value: 236716, fill: '#22c55e' },
];

const highestContributors = [
  { name: 'META', desc: 'Meta Platforms', value: 'US$43,962', percent: '277.2%', width: '80%' },
  { name: 'AAPL', desc: 'Apple', value: 'US$33,789', percent: '205.8%', width: '60%' },
  { name: 'XOM', desc: 'Exxon Mobil', value: 'US$22,206', percent: '171.1%', width: '40%' },
  { name: 'BATS', desc: 'British American...', value: 'US$19,016', percent: '49.3%', width: '35%' },
  { name: 'IREN', desc: 'IREN', value: 'US$17,425', percent: '534.5%', width: '30%' },
];

const lowestContributors = [
  { name: 'BABA', desc: 'Alibaba...', value: '-US$5,000', percent: '-31.6%', width: '15%' },
  { name: 'UNH', desc: 'UnitedHealth...', value: '-US$2,778', percent: '-31.0%', width: '10%' },
  { name: 'PLS', desc: 'PLS Group', value: 'US$726', percent: '27.3%', width: '5%' },
  { name: 'OKTA', desc: 'Okta', value: 'US$2,320', percent: '59.2%', width: '8%' },
  { name: 'AMZN', desc: 'Amazon.com', value: 'US$4,257', percent: '51.3%', width: '12%' },
];

const detailedReturns = [
  { ticker: 'Amazon.com\nNasdaqGS:AMZN', shares: 57, price: 'US$209.53', value: '11,943.21', cost: '7,775.21', unrealized: '4,168.00', realized: '88.76', dividends: '0', currency: '0', total: '4,256.76', irr: '12.5%' },
  { ticker: 'Bank of America\nNYSE:BAC', shares: 600, price: 'US$47.13', value: '28,278.00', cost: '19,100.00', unrealized: '9,178.00', realized: '0', dividends: '2,856.00', currency: '0', total: '12,034.00', irr: '10.2%' },
  { ticker: 'British American...\nLSE:BATS', shares: 700, price: 'UK£44.48', value: '41,559.00', cost: '26,989.86', unrealized: '14,569.14', realized: '1,156.71', dividends: '3,734.93', currency: '-445.03', total: '19,015.75', irr: '35.8%' },
  { ticker: 'CrowdStrike Hol...\nNasdaqGS:CRWD', shares: 50, price: 'US$441.54', value: '22,077.00', cost: '13,100.00', unrealized: '8,977.00', realized: '1,405.00', dividends: '0', currency: '0', total: '10,382.00', irr: '28.3%' },
  { ticker: 'Exxon Mobil\nNYSE:XOM', shares: 205, price: 'US$153.53', value: '31,473.65', cost: '12,897.40', unrealized: '18,576.25', realized: '31.34', dividends: '3,598.20', currency: '0', total: '22,205.79', irr: '30.0%' },
];

export const PortfolioReturns = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Date Filter & Info */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-card border border-subtle rounded-lg text-sm font-medium text-primary hover:bg-subtle transition-colors">
            <span>Since inception</span>
            <ChevronDown className="w-4 h-4 text-secondary" />
          </button>
          <span className="text-sm text-secondary">29/01/2015 → 13/03/2026</span>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors"
        >
          <Info className="w-4 h-4" />
          <span>How returns are calculated?</span>
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Returns Breakdown */}
        <div className="bg-card rounded-xl border border-subtle p-6">
          <div className="flex items-center space-x-2 mb-6">
            <h3 className="text-lg font-bold text-primary">Returns Breakdown</h3>
            <Info className="w-4 h-4 text-secondary" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={returnsData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-subtle)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-secondary)', fontSize: 12 }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'var(--color-subtle)', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-subtle)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-primary)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {returnsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contributors to Returns */}
        <div className="bg-card rounded-xl border border-subtle p-6">
          <div className="flex items-center space-x-2 mb-6">
            <h3 className="text-lg font-bold text-primary">Contributors to Returns</h3>
            <Info className="w-4 h-4 text-secondary" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Highest */}
            <div>
              <h4 className="text-sm font-semibold text-primary mb-4">Highest contributors</h4>
              <div className="space-y-4">
                {highestContributors.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 w-1/2">
                      <div>
                        <div className="text-sm font-bold text-primary">{item.name}</div>
                        <div className="text-xs text-secondary truncate w-16">{item.desc}</div>
                      </div>
                      <div className="h-2 w-16 bg-subtle rounded-full overflow-hidden">
                        <div className="h-full bg-bullish" style={{ width: item.width }}></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{item.value}</div>
                      <div className="text-xs text-bullish">{item.percent}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lowest */}
            <div>
              <h4 className="text-sm font-semibold text-primary mb-4">Lowest contributors</h4>
              <div className="space-y-4">
                {lowestContributors.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 w-1/2">
                      <div>
                        <div className="text-sm font-bold text-primary">{item.name}</div>
                        <div className="text-xs text-secondary truncate w-16">{item.desc}</div>
                      </div>
                      <div className="h-2 w-16 bg-subtle rounded-full overflow-hidden flex justify-end">
                        <div className={`h-full ${item.value.startsWith('-') ? 'bg-bearish' : 'bg-bullish'}`} style={{ width: item.width }}></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{item.value}</div>
                      <div className={`text-xs ${item.percent.startsWith('-') ? 'text-bearish' : 'text-bullish'}`}>{item.percent}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Returns Report */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-primary">Detailed Returns Report</h2>
            <Info className="w-4 h-4 text-secondary" />
          </div>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-card border border-subtle rounded-lg text-sm text-secondary hover:text-primary transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span>Download as CSV</span>
          </button>
        </div>

        <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-subtle bg-base/50">
                  <th className="p-4 text-xs font-semibold text-secondary">Ticker</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">Shares</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">Price</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">USD<br/>Value</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">USD<br/>Cost Basis</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">USD<br/>Unrealized</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">USD<br/>Realized</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">USD<br/>Dividends</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">USD<br/>Currency Gains</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">USD<br/>Total Gains</th>
                  <th className="p-4 text-xs font-semibold text-secondary text-right">Annualized (IRR)</th>
                </tr>
              </thead>
              <tbody>
                {detailedReturns.map((row, index) => (
                  <tr key={index} className="border-b border-subtle hover:bg-subtle/50 transition-colors">
                    <td className="p-4">
                      <div className="text-sm font-medium text-primary whitespace-pre-line">{row.ticker}</div>
                    </td>
                    <td className="p-4 text-sm text-primary text-right">{row.shares}</td>
                    <td className="p-4 text-sm text-primary text-right">{row.price}</td>
                    <td className="p-4 text-sm text-primary text-right">{row.value}</td>
                    <td className="p-4 text-sm text-primary text-right">{row.cost}</td>
                    <td className="p-4 text-sm text-primary text-right">{row.unrealized}</td>
                    <td className="p-4 text-sm text-primary text-right">{row.realized}</td>
                    <td className="p-4 text-sm text-primary text-right">{row.dividends}</td>
                    <td className="p-4 text-sm text-primary text-right">{row.currency}</td>
                    <td className="p-4 text-sm text-primary text-right">{row.total}</td>
                    <td className="p-4 text-sm text-primary text-right">{row.irr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-card border border-subtle rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="sticky top-0 bg-card/90 backdrop-blur-md p-6 border-b border-subtle flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-primary">How returns are calculated</h3>
              <button onClick={() => setShowModal(false)} className="text-secondary hover:text-primary transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6 text-sm text-primary leading-relaxed">
              <p>These calculations apply to both each holding and your overall portfolio.</p>
              <p>All return percentages are based on your Cumulative Capital Invested (the total amount you've invested over time).</p>
              
              <div>
                <h4 className="font-bold mb-2">Percentage returns</h4>
                <ul className="list-disc pl-5 space-y-2 text-secondary">
                  <li><strong className="text-primary">Total Returns %</strong> = Total Return $ / Cumulative Capital Invested</li>
                  <li><strong className="text-primary">Unrealised Returns %</strong> = Unrealised Gain/Loss $ / Cumulative Capital Invested</li>
                  <li><strong className="text-primary">Realised Returns %</strong> = Realised Gain/Loss $ / Cumulative Capital Invested</li>
                  <li><strong className="text-primary">Dividend Returns %</strong> = Dividends Received $ / Cumulative Capital Invested</li>
                  <li><strong className="text-primary">Currency Returns %</strong> = Currency Gain/Loss $ / Cumulative Capital Invested</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-2">Cash returns</h4>
                <ul className="list-disc pl-5 space-y-2 text-secondary">
                  <li><strong className="text-primary">Unrealised Return $</strong> = (Current Price - Average Buy Price) × Shares Held</li>
                  <li><strong className="text-primary">Realised Return $</strong> = Proceeds from Sold Shares - Their Cost Basis</li>
                  <li><strong className="text-primary">Dividend Return $</strong> = Total Dividends Received</li>
                  <li><strong className="text-primary">Currency Return $</strong> = Impact of exchange rate changes on your returns</li>
                  <li><strong className="text-primary">Total Return $</strong> = Unrealised + Realised + Dividends + Currency</li>
                </ul>
              </div>

              <p>These breakdowns help you understand where your returns are coming from — growth, dividends, currency effects, or realised profits.</p>
            </div>
            <div className="sticky bottom-0 bg-card/90 backdrop-blur-md p-6 border-t border-subtle flex justify-end space-x-4 z-10">
              <button className="px-4 py-2 border border-subtle rounded-lg text-secondary hover:text-primary hover:bg-subtle transition-colors font-medium">
                Learn more
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
