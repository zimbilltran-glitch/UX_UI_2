import React from 'react';

const watchlist = [
  { symbol: 'FPT', price: 105.5, change: 1.2, percent: 1.15 },
  { symbol: 'MWG', price: 48.2, change: -0.5, percent: -1.03 },
  { symbol: 'HPG', price: 29.5, change: 0.3, percent: 1.03 },
  { symbol: 'TCB', price: 42.1, change: 0.8, percent: 1.94 },
  { symbol: 'MBB', price: 24.5, change: 0.2, percent: 0.82 },
  { symbol: 'VNM', price: 68.0, change: -0.2, percent: -0.29 },
  { symbol: 'VIC', price: 45.8, change: -0.5, percent: -1.08 },
  { symbol: 'VHM', price: 42.5, change: -0.3, percent: -0.70 },
];

export function WatchlistWidget() {
  return (
    <div className="flex flex-col h-full bg-[var(--bg-card)] overflow-y-auto p-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[var(--text-secondary)] text-xs text-left">
            <th className="pb-2 font-normal">Symbol</th>
            <th className="pb-2 font-normal text-right">Price</th>
            <th className="pb-2 font-normal text-right">Change</th>
            <th className="pb-2 font-normal text-right">% Change</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((item, i) => {
            const isUp = item.change > 0;
            const colorClass = isUp ? 'text-[var(--color-bullish)]' : 'text-[var(--color-bearish)]';
            return (
              <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-base)] transition-colors">
                <td className="py-2 font-bold text-[var(--text-primary)]">{item.symbol}</td>
                <td className="py-2 text-right font-mono text-[var(--text-primary)] opacity-80">{item.price.toFixed(2)}</td>
                <td className={`py-2 text-right font-mono ${colorClass}`}>
                  {isUp ? '+' : ''}{item.change.toFixed(2)}
                </td>
                <td className={`py-2 text-right font-mono ${colorClass}`}>
                  {isUp ? '+' : ''}{item.percent.toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
