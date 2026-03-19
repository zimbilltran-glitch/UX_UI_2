import React, { useState, useEffect } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { IndexTicker } from './dashboard/IndexTicker';
import { TechnicalChart } from './dashboard/TechnicalChart';
import { IndexImpact } from './dashboard/IndexImpact';
import { LiquidityChart } from './dashboard/LiquidityChart';
import { ForeignTrading } from './dashboard/ForeignTrading';
import { TopMovers } from './dashboard/TopMovers';
import { MarketHeatmap } from './dashboard/MarketHeatmap';
import { WatchlistWidget } from './dashboard/WatchlistWidget';

const defaultLayouts = {
  lg: [
    { i: 'ticker', x: 0, y: 0, w: 12, h: 1, static: true },
    { i: 'technical', x: 0, y: 1, w: 8, h: 16 },
    { i: 'watchlist', x: 8, y: 1, w: 4, h: 16 },
    { i: 'impact', x: 0, y: 17, w: 6, h: 10 },
    { i: 'heatmap', x: 6, y: 17, w: 6, h: 10 },
    { i: 'liquidity', x: 0, y: 27, w: 4, h: 10 },
    { i: 'foreign', x: 4, y: 27, w: 4, h: 10 },
    { i: 'movers', x: 8, y: 27, w: 4, h: 10 },
  ],
  md: [
    { i: 'ticker', x: 0, y: 0, w: 10, h: 1, static: true },
    { i: 'technical', x: 0, y: 1, w: 10, h: 14 },
    { i: 'watchlist', x: 0, y: 15, w: 10, h: 12 },
    { i: 'impact', x: 0, y: 27, w: 5, h: 10 },
    { i: 'heatmap', x: 5, y: 27, w: 5, h: 10 },
    { i: 'liquidity', x: 0, y: 37, w: 10, h: 10 },
    { i: 'foreign', x: 0, y: 47, w: 10, h: 10 },
    { i: 'movers', x: 0, y: 57, w: 10, h: 10 },
  ],
  sm: [
    { i: 'ticker', x: 0, y: 0, w: 6, h: 1, static: true },
    { i: 'technical', x: 0, y: 1, w: 6, h: 12 },
    { i: 'watchlist', x: 0, y: 13, w: 6, h: 10 },
    { i: 'impact', x: 0, y: 23, w: 6, h: 10 },
    { i: 'heatmap', x: 0, y: 33, w: 6, h: 10 },
    { i: 'liquidity', x: 0, y: 43, w: 6, h: 10 },
    { i: 'foreign', x: 0, y: 53, w: 6, h: 10 },
    { i: 'movers', x: 0, y: 63, w: 6, h: 10 },
  ],
  xs: [
    { i: 'ticker', x: 0, y: 0, w: 4, h: 1.5, static: true },
    { i: 'technical', x: 0, y: 1.5, w: 4, h: 10 },
    { i: 'watchlist', x: 0, y: 11.5, w: 4, h: 10 },
    { i: 'impact', x: 0, y: 21.5, w: 4, h: 8 },
    { i: 'heatmap', x: 0, y: 29.5, w: 4, h: 10 },
    { i: 'liquidity', x: 0, y: 39.5, w: 4, h: 8 },
    { i: 'foreign', x: 0, y: 47.5, w: 4, h: 8 },
    { i: 'movers', x: 0, y: 55.5, w: 4, h: 10 },
  ],
  xxs: [
    { i: 'ticker', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'technical', x: 0, y: 2, w: 1, h: 10 },
    { i: 'watchlist', x: 0, y: 12, w: 1, h: 10 },
    { i: 'impact', x: 0, y: 22, w: 1, h: 8 },
    { i: 'heatmap', x: 0, y: 30, w: 1, h: 10 },
    { i: 'liquidity', x: 0, y: 40, w: 1, h: 8 },
    { i: 'foreign', x: 0, y: 48, w: 1, h: 8 },
    { i: 'movers', x: 0, y: 56, w: 1, h: 10 },
  ]
};

export function MarketDashboard() {
  const [layouts, setLayouts] = useState<any>(defaultLayouts);
  const [isMounted, setIsMounted] = useState(false);
  const { width, containerRef, mounted } = useContainerWidth();

  useEffect(() => {
    setIsMounted(true);
    const savedLayouts = localStorage.getItem('marketDashboardLayouts_v5');
    if (savedLayouts) {
      try {
        setLayouts(JSON.parse(savedLayouts));
      } catch (e) {
        setLayouts(defaultLayouts);
      }
    }
  }, []);

  const onLayoutChange = (currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts);
    localStorage.setItem('marketDashboardLayouts_v5', JSON.stringify(allLayouts));
  };

  if (!isMounted) return null;

  return (
    <div className="p-2 sm:p-4 bg-[var(--bg-base)] min-h-full font-sans text-[var(--text-primary)] w-full overflow-x-hidden" ref={containerRef}>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Market Dashboard</h1>
        <button 
          onClick={() => {
            setLayouts(defaultLayouts);
            localStorage.removeItem('marketDashboardLayouts_v5');
          }}
          className="px-3 py-1.5 text-xs sm:text-sm bg-[var(--bg-card)] hover:bg-[var(--bg-base)] rounded-xl transition-colors border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm"
        >
          Reset Layout
        </button>
      </div>

      {mounted && (
        <Responsive
          className="layout w-full"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 1 }}
          rowHeight={30}
          width={width}
          onLayoutChange={onLayoutChange}
          draggableHandle=".drag-handle"
          margin={[12, 12]}
          containerPadding={[0, 0]}
        >
        <div key="ticker" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg overflow-hidden flex items-center">
          <IndexTicker />
        </div>
        <div key="technical" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg overflow-hidden flex flex-col">
          <div className="drag-handle p-2 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] cursor-move text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Technical Chart</div>
          <div className="flex-1 overflow-hidden p-2"><TechnicalChart /></div>
        </div>
        <div key="impact" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg overflow-hidden flex flex-col">
          <div className="drag-handle p-2 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] cursor-move text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Index Impact</div>
          <div className="flex-1 overflow-hidden p-2"><IndexImpact /></div>
        </div>
        <div key="liquidity" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg overflow-hidden flex flex-col">
          <div className="drag-handle p-2 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] cursor-move text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Market Liquidity</div>
          <div className="flex-1 overflow-hidden p-2"><LiquidityChart /></div>
        </div>
        <div key="foreign" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg overflow-hidden flex flex-col">
          <div className="drag-handle p-2 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] cursor-move text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Foreign Trading</div>
          <div className="flex-1 overflow-hidden p-2"><ForeignTrading /></div>
        </div>
        <div key="movers" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg overflow-hidden flex flex-col">
          <div className="drag-handle p-2 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] cursor-move text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Top Movers</div>
          <div className="flex-1 overflow-hidden p-2"><TopMovers /></div>
        </div>
        <div key="watchlist" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg overflow-hidden flex flex-col">
          <div className="drag-handle p-2 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] cursor-move text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Watchlist</div>
          <div className="flex-1 overflow-hidden p-2"><WatchlistWidget /></div>
        </div>
        <div key="heatmap" className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg overflow-hidden flex flex-col">
          <div className="drag-handle p-2 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] cursor-move text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Market Heatmap</div>
          <div className="flex-1 overflow-hidden p-2"><MarketHeatmap /></div>
        </div>
      </Responsive>
      )}
    </div>
  );
}
