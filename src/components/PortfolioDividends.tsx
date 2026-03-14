import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const qualityData = [
  { name: 'Last 12m', low: 1000, medium: 1500, high: 2171, total: 4671 },
  { name: 'Next 12m', low: 280, medium: 2289, high: 2339, total: 4908 },
  { name: '+2 year', low: 300, medium: 2400, high: 2542, total: 5242 },
  { name: '+3 year', low: 320, medium: 2500, high: 2749, total: 5569 },
];

const holdingsDividendData = [
  { symbol: 'JPM', name: 'JPMorgan Chase', payment: 320, contribution: 6.5, yield: 2.1, yieldOnCost: 2.8, score: 5, growth: 10.8, status: 'high' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', payment: 265, contribution: 5.4, yield: 2.1, yieldOnCost: 5.1, score: 5, growth: 5.6, status: 'high' },
  { symbol: 'XOM', name: 'Exxon Mobil', payment: 861, contribution: 17.5, yield: 2.7, yieldOnCost: 6.4, score: 5, growth: 3.1, status: 'high' },
  { symbol: 'BAC', name: 'Bank of America', payment: 712, contribution: 14.5, yield: 2.4, yieldOnCost: 3.5, score: 5, growth: 13.9, status: 'high' },
  { symbol: 'UNH', name: 'UnitedHealth Group', payment: 181, contribution: 3.7, yield: 3.2, yieldOnCost: 2.0, score: 5, growth: 14.5, status: 'high' },
  { symbol: 'BATS', name: 'British American Tobacco', payment: 2289, contribution: 46.6, yield: 5.5, yieldOnCost: 8.0, score: 3, growth: 3.9, status: 'medium' },
  { symbol: 'NVDA', name: 'NVIDIA', payment: 1.63, contribution: 0.03, yield: 0.02, yieldOnCost: 0.1, score: 0, growth: 11.3, status: 'low' },
  { symbol: 'META', name: 'Meta Platforms', payment: 186, contribution: 3.8, yield: 0.3, yieldOnCost: 1.3, score: 0, growth: 0, status: 'low' },
  { symbol: 'GEV', name: 'GE Vernova', payment: 47.81, contribution: 1.0, yield: 0.2, yieldOnCost: 0.4, score: 0, growth: 0, status: 'low' },
  { symbol: 'PLS', name: 'PLS Group', payment: 44.00, contribution: 0.9, yield: 0, yieldOnCost: 0, score: 0, growth: 0, status: 'low' },
];

const estimatedPaymentsData = Array.from({ length: 36 }).map((_, i) => ({
  name: `Month ${i}`,
  declared: i < 3 ? Math.random() * 500 + 100 : 0,
  estimated: i >= 3 ? Math.random() * 600 + 200 : 0,
}));

export const PortfolioDividends = () => {
  return (
    <div className="space-y-8">
      {/* Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-12 space-y-6 sm:space-y-0 border-b border-subtle pb-6">
        <div>
          <div className="text-sm text-secondary mb-1">Next 12m Income from 10 holdings</div>
          <div className="text-4xl font-bold text-primary">US$4,908</div>
          <div className="text-sm text-green-500 flex items-center mt-2">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            2.6% higher vs last 12m
          </div>
        </div>
        <div className="flex flex-wrap gap-8">
          <div>
            <div className="text-sm text-secondary mb-1">Monthly Income</div>
            <div className="text-2xl font-bold text-primary">US$409</div>
          </div>
          <div>
            <div className="text-sm text-secondary mb-1">Current Yield</div>
            <div className="text-2xl font-bold text-primary">1.5%</div>
          </div>
          <div>
            <div className="text-sm text-secondary mb-1">Yield on Cost</div>
            <div className="text-2xl font-bold text-primary">3.0%</div>
          </div>
        </div>
      </div>

      {/* Dividend Quality & Forecast */}
      <div className="bg-card rounded-xl border border-subtle p-6">
        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-xl font-bold text-primary">Dividend Quality & Forecast</h2>
          <Info className="w-4 h-4 text-secondary cursor-pointer" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side: Chart and summary */}
          <div className="w-full lg:w-5/12 space-y-6">
            <div className="bg-base rounded-lg p-4 border border-subtle">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-subtle">
                <span className="text-sm font-medium text-primary">Next 12m Total</span>
                <span className="text-sm font-bold text-primary">US$4,908</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-primary">Low score 0-2</span>
                    <span className="text-red-500">US$280</span>
                    <span className="text-red-500 text-xs">5.7%</span>
                  </div>
                  <span className="text-secondary">4 holdings</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-primary">Medium score 3-4</span>
                    <span className="text-orange-500">US$2,289</span>
                    <span className="text-orange-500 text-xs">46.6%</span>
                  </div>
                  <span className="text-secondary">1 holding</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-primary">High score 5-6</span>
                    <span className="text-green-500">US$2,339</span>
                    <span className="text-green-500 text-xs">47.7%</span>
                  </div>
                  <span className="text-secondary">5 holdings</span>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={qualityData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8E9299', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="high" stackId="a" fill="#10B981" />
                  <Bar dataKey="medium" stackId="a" fill="#F59E0B" />
                  <Bar dataKey="low" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right side: Holdings list */}
          <div className="w-full lg:w-7/12">
            <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-medium text-secondary mb-2 px-4">
              <div className="col-span-5">Symbol</div>
              <div className="col-span-3 text-right">+12m Payment & Contribution</div>
              <div className="col-span-2 text-right">Yield vs Yield on Cost</div>
              <div className="col-span-2 text-right">Dividend Score & Growth</div>
            </div>
            <div className="space-y-2">
              {holdingsDividendData.map((holding) => (
                <div key={holding.symbol} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-base rounded-lg p-4 border border-subtle hover:bg-subtle/50 transition-colors">
                  <div className="col-span-1 sm:col-span-5 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/20 border border-yellow-400 flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                    </div>
                    <div>
                      <div className="font-bold text-primary">{holding.symbol}</div>
                      <div className="text-xs text-secondary truncate">{holding.name}</div>
                    </div>
                  </div>
                  <div className="col-span-1 sm:col-span-3 text-right">
                    <div className="font-bold text-primary">US${holding.payment.toLocaleString(undefined, { minimumFractionDigits: holding.payment < 100 ? 2 : 0, maximumFractionDigits: 2 })}<span className="text-xs font-normal text-secondary">/ year</span></div>
                    <div className="text-xs text-secondary">{holding.contribution.toFixed(1)}%</div>
                  </div>
                  <div className="col-span-1 sm:col-span-2 text-right">
                    <div className="font-bold text-primary">{holding.yield.toFixed(1)}%</div>
                    <div className="text-xs text-secondary">{holding.yieldOnCost.toFixed(1)}%</div>
                  </div>
                  <div className="col-span-1 sm:col-span-2 text-right flex flex-col items-end">
                    <div className={`flex items-center space-x-1 font-bold ${
                      holding.status === 'high' ? 'text-green-500' : 
                      holding.status === 'medium' ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      {holding.status === 'high' && <CheckCircle className="w-4 h-4" />}
                      {holding.status === 'medium' && <AlertCircle className="w-4 h-4" />}
                      {holding.status === 'low' && <XCircle className="w-4 h-4" />}
                      <span>{holding.score}/6</span>
                    </div>
                    <div className="text-xs text-secondary">{holding.growth.toFixed(1)}%</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-base border border-subtle rounded-lg text-sm font-medium text-primary hover:bg-subtle transition-colors">
              Show all
            </button>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm font-medium text-brand hover:underline">Discover Top Quality Dividend Stocks &gt;</a>
            </div>
          </div>
        </div>
      </div>

      {/* Estimated Future Payments */}
      <div className="bg-card rounded-xl border border-subtle p-6">
        <div className="flex items-center space-x-2 mb-6">
          <h2 className="text-xl font-bold text-primary">Estimated Future Payments</h2>
          <Info className="w-4 h-4 text-secondary cursor-pointer" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side: Chart */}
          <div className="w-full lg:w-7/12">
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-lg font-bold text-primary">Jul 28</span>
              <span className="text-xl sm:text-3xl font-bold text-primary">US$98.40</span>
              <span className="text-sm text-secondary">from 2 companies</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={estimatedPaymentsData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8E9299', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8E9299', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="declared" stackId="a" fill="#2DD4BF" />
                  <Bar dataKey="estimated" stackId="a" fill="#D946EF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                <span className="text-sm text-secondary">Declared</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-fuchsia-500"></div>
                <span className="text-sm text-secondary">Estimated</span>
              </div>
            </div>
          </div>

          {/* Right side: List */}
          <div className="w-full lg:w-5/12">
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="text-lg font-bold text-primary">Jul 2028</h3>
              <div className="text-sm text-secondary">0 declared</div>
              <div className="text-sm text-secondary">2 estimated</div>
            </div>
            
            <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-medium text-secondary mb-2 px-4">
              <div className="col-span-5">Symbol</div>
              <div className="col-span-2 text-right">Ex-date</div>
              <div className="col-span-2 text-right">Pay date</div>
              <div className="col-span-3 text-right">Est Amount</div>
            </div>
            
            <div className="bg-subtle/30 rounded-lg overflow-hidden border border-subtle">
              <div className="flex justify-between items-center p-3 bg-fuchsia-900/20 border-b border-subtle">
                <span className="text-sm font-bold text-primary">Estimated Payments</span>
                <span className="text-sm font-bold text-primary">US$98.40</span>
              </div>
              
              <div className="p-2 space-y-1">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-2 hover:bg-subtle/50 rounded transition-colors">
                  <div className="col-span-1 sm:col-span-5 flex items-center space-x-2">
                    <div className="font-bold text-yellow-500">NVDA</div>
                    <div className="text-xs text-secondary truncate">NVIDIA</div>
                  </div>
                  <div className="col-span-1 sm:col-span-2 text-right text-sm text-secondary">Jun 11</div>
                  <div className="col-span-1 sm:col-span-2 text-right text-sm text-secondary">Jul 03</div>
                  <div className="col-span-1 sm:col-span-3 text-right text-sm font-medium text-primary">US$0.50</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-2 hover:bg-subtle/50 rounded transition-colors">
                  <div className="col-span-1 sm:col-span-5 flex items-center space-x-2">
                    <div className="font-bold text-yellow-500">JPM</div>
                    <div className="text-xs text-secondary truncate">JPMorgan Chase</div>
                  </div>
                  <div className="col-span-1 sm:col-span-2 text-right text-sm text-secondary">Jul 03</div>
                  <div className="col-span-1 sm:col-span-2 text-right text-sm text-secondary">Jul 31</div>
                  <div className="col-span-1 sm:col-span-3 text-right text-sm font-medium text-primary">US$97.91</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <a href="#" className="text-sm font-medium text-brand hover:underline">Discover Upcoming Payment Dividend Stocks &gt;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
