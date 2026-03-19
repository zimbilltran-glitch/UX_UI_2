import React, { useState } from 'react';

const gainers = [
  { symbol: 'VND', price: 22.5, change: 1.5, percent: 7.14, vol: '15M' },
  { symbol: 'SSI', price: 35.2, change: 2.1, percent: 6.34, vol: '12M' },
  { symbol: 'HCM', price: 28.9, change: 1.6, percent: 5.86, vol: '8M' },
  { symbol: 'VCI', price: 45.0, change: 2.2, percent: 5.14, vol: '5M' },
  { symbol: 'SHS', price: 18.2, change: 0.8, percent: 4.59, vol: '20M' },
];

const losers = [
  { symbol: 'NVL', price: 15.2, change: -1.1, percent: -6.74, vol: '25M' },
  { symbol: 'PDR', price: 26.5, change: -1.8, percent: -6.36, vol: '10M' },
  { symbol: 'DIG', price: 28.1, change: -1.5, percent: -5.06, vol: '14M' },
  { symbol: 'DXG', price: 19.5, change: -0.9, percent: -4.41, vol: '11M' },
  { symbol: 'CEO', price: 22.0, change: -0.8, percent: -3.50, vol: '6M' },
];

export function TopMovers() {
  const [tab, setTab] = useState<'gainers' | 'losers'>('gainers');
  const data = tab === 'gainers' ? gainers : losers;
  const colorClass = tab === 'gainers' ? 'text-[var(--color-bullish)]' : 'text-[var(--color-bearish)]';

  return (
    <div className="flex flex-col h-full bg-[var(--bg-card)]">
      <div className="flex border-b border-[var(--border-subtle)]">
        <button 
          className={`flex-1 py-2 text-sm font-bold ${tab === 'gainers' ? 'text-[var(--color-bullish)] border-b-2 border-[var(--color-bullish)]' : 'text-[var(--text-secondary)]'}`}
          onClick={() => setTab('gainers')}
        >
          Top Gainers
        </button>
        <button 
          className={`flex-1 py-2 text-sm font-bold ${tab === 'losers' ? 'text-[var(--color-bearish)] border-b-2 border-[var(--color-bearish)]' : 'text-[var(--text-secondary)]'}`}
          onClick={() => setTab('losers')}
        >
          Top Losers
        </button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <table className="w-full text-sm min-w-[200px]">
          <thead>
            <tr className="text-[var(--text-secondary)] text-xs text-left">
              <th className="pb-2 font-normal">Symbol</th>
              <th className="pb-2 font-normal text-right">Price</th>
              <th className="pb-2 font-normal text-right">% Change</th>
              <th className="pb-2 font-normal text-right">Vol</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-base)] transition-colors">
                <td className="py-2 font-bold text-[var(--text-primary)]">{item.symbol}</td>
                <td className="py-2 text-right font-mono text-[var(--text-primary)] opacity-80">{item.price.toFixed(2)}</td>
                <td className={`py-2 text-right font-mono ${colorClass}`}>
                  {item.change > 0 ? '+' : ''}{item.percent.toFixed(2)}%
                </td>
                <td className="py-2 text-right font-mono text-[var(--text-secondary)]">{item.vol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
