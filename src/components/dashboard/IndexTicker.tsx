import React from 'react';

const indices = [
  { name: 'VN-Index', value: 1250.45, change: 12.5, percent: 1.01 },
  { name: 'VN30', value: 1265.80, change: 15.2, percent: 1.21 },
  { name: 'HNX', value: 240.15, change: -1.5, percent: -0.62 },
  { name: 'UPCOM', value: 90.50, change: 0.2, percent: 0.22 },
  { name: 'Dow Jones', value: 39000.50, change: 150.2, percent: 0.38 },
];

export function IndexTicker() {
  return (
    <div className="flex w-full overflow-hidden whitespace-nowrap py-2 px-4 space-x-8 bg-[var(--bg-card)] animate-marquee">
      {indices.map((idx, i) => {
        const isUp = idx.change > 0;
        const colorClass = isUp ? 'text-[var(--color-bullish)]' : 'text-[var(--color-bearish)]';
        return (
          <div key={i} className="flex items-center space-x-2">
            <span className="font-bold text-[var(--text-primary)] opacity-80">{idx.name}</span>
            <span className={`font-mono font-bold ${colorClass}`}>{idx.value.toFixed(2)}</span>
            <span className={`font-mono text-xs ${colorClass}`}>
              {isUp ? '+' : ''}{idx.change.toFixed(2)} ({isUp ? '+' : ''}{idx.percent.toFixed(2)}%)
            </span>
          </div>
        );
      })}
    </div>
  );
}
