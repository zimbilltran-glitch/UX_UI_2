import React, { createContext, useContext, useState } from 'react';

export interface Holding {
  symbol: string;
  name: string;
  lastPrice: string;
  fairValue: string;
  fairValueStatus: string;
  return7D: string;
  return7DValue: string;
  totalReturn: string;
  totalReturnValue: string;
  value: string;
  cost: string;
  weight: string;
  shares: number;
  avgPrice: string;
  isAdded?: boolean;
}

const initialHoldings: Holding[] = [
  { symbol: 'IREN', name: 'IREN', lastPrice: 'US$41.40', fairValue: 'US$79.31', fairValueStatus: '47.8% undervalued', return7D: '8.60%', return7DValue: 'US$1,640.00', totalReturn: '535.0%', totalReturnValue: '+US$17,440', value: 'US$20,700', cost: 'US$3,260', weight: '6.3%', shares: 500, avgPrice: 'US$6.52' },
  { symbol: 'GEV', name: 'GE Vernova', lastPrice: 'US$831.92', fairValue: 'US$819.92', fairValueStatus: '1.5% overvalued', return7D: '-0.87%', return7DValue: '-US$182.00', totalReturn: '157.9%', totalReturnValue: '+US$12,748', value: 'US$20,798', cost: 'US$8,075', weight: '6.3%', shares: 25, avgPrice: 'US$323.00' },
  { symbol: 'BATS', name: 'British American...', lastPrice: 'UK£44.48', fairValue: 'UK£45.81', fairValueStatus: '2.9% undervalued', return7D: '1.83%', return7DValue: 'US$747.46', totalReturn: '49.3%', totalReturnValue: '+US$19,016', value: 'US$41,559', cost: 'US$26,990', weight: '12.7%', shares: 700, avgPrice: 'UK£30.00' },
  { symbol: 'NVDA', name: 'NVIDIA', lastPrice: 'US$183.12', fairValue: 'US$253.02', fairValueStatus: '27.6% undervalued', return7D: '-0.89%', return7DValue: '-US$66.00', totalReturn: '881.9%', totalReturnValue: '+US$15,302', value: 'US$7,325', cost: 'US$1,443', weight: '2.2%', shares: 40, avgPrice: 'US$36.06' },
  { symbol: 'CRWD', name: 'CrowdStrike...', lastPrice: 'US$441.74', fairValue: 'US$546.89', fairValueStatus: '19.2% undervalued', return7D: '1.24%', return7DValue: 'US$270.50', totalReturn: '57.4%', totalReturnValue: '+US$10,392', value: 'US$22,087', cost: 'US$13,100', weight: '6.7%', shares: 50, avgPrice: 'US$262.00' },
  { symbol: 'XOM', name: 'Exxon Mobil', lastPrice: 'US$153.57', fairValue: 'US$144.25', fairValueStatus: '6.5% overvalued', return7D: '3.67%', return7DValue: 'US$1,115.20', totalReturn: '171.1%', totalReturnValue: '+US$22,214', value: 'US$31,482', cost: 'US$12,897', weight: '9.6%', shares: 205, avgPrice: 'US$62.91' },
];

interface PortfolioContextType {
  holdings: Holding[];
  addHolding: (holding: Holding) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);

  const addHolding = (holding: Holding) => {
    setHoldings(prev => {
      if (prev.find(h => h.symbol === holding.symbol)) return prev;
      return [holding, ...prev];
    });
  };

  return (
    <PortfolioContext.Provider value={{ holdings, addHolding }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
