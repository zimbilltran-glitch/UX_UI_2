import React from 'react';
import { CheckCircle2, XCircle, Info, TrendingUp, AlertCircle } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const data = [
  { year: '2020', revenue: 25000, earnings: 8000, cashFlow: 9000 },
  { year: '2021', revenue: 32000, earnings: 11000, cashFlow: 12000 },
  { year: '2022', revenue: 40000, earnings: 15000, cashFlow: 16000 },
  { year: '2023', revenue: 48000, earnings: 18000, cashFlow: 19000 },
  { year: '2024', revenue: 55000, earnings: 21000, cashFlow: 22000 },
  { year: '2025', revenue: 65000, earnings: 25000, cashFlow: 26000, isForecast: true },
  { year: '2026', revenue: 78000, earnings: 30000, cashFlow: 31000, isForecast: true },
  { year: '2027', revenue: 95000, earnings: 36000, cashFlow: 37000, isForecast: true },
];

export function FutureGrowth() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Military Commercial Bank Future Growth</h1>
        <p className="text-gray-400 text-lg">
          Military Commercial Bank is forecast to grow earnings and revenue by 16.7% and 25.6% per annum respectively. EPS is expected to grow by 14.7% per annum. Return on equity is forecast to be 20.8% in 3 years.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-800 col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Earnings and Revenue Growth Forecasts</h2>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div><span className="text-gray-300">Revenue</span></div>
              <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div><span className="text-gray-300">Earnings</span></div>
              <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div><span className="text-gray-300">Free Cash Flow</span></div>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="#9ca3af" 
                  tick={{fill: '#9ca3af'}} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tick={{fill: '#9ca3af'}} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `₫${value/1000}T`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <ReferenceLine x="2024" stroke="#6b7280" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: '#9ca3af', fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between text-xs text-gray-500">
            <span>Historical</span>
            <span>Forecast</span>
          </div>
        </div>

        <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-800 flex flex-col">
          <h2 className="text-xl font-semibold text-white mb-4">Key Information</h2>
          
          <div className="space-y-6 flex-1">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Earnings growth rate</p>
                <p className="text-2xl font-bold text-white">16.7%</p>
              </div>
              <div className="bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                Good
              </div>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">EPS growth rate</p>
                <p className="text-2xl font-bold text-white">14.7%</p>
              </div>
              <div className="bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                Good
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm mb-1">Revenue growth rate</p>
                <p className="text-2xl font-bold text-white">25.6%</p>
              </div>
              <div className="bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                Excellent
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            View Detailed Data
          </button>
        </div>
      </div>

      <div className="bg-[#1F2937] rounded-xl border border-gray-800 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#111827]/50">
          <h2 className="text-xl font-semibold text-white">Future criteria checks</h2>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-emerald-400">5</span>
            <span className="text-gray-500 text-xl">/ 6</span>
            <span className="text-gray-400 ml-2">Passed</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-800">
          <CriteriaItem 
            passed={true} 
            title="Earnings vs Savings Rate" 
            description="MBB's forecast earnings growth (16.7% per year) is above the savings rate (3.1%)."
          />
          <CriteriaItem 
            passed={true} 
            title="Earnings vs Market" 
            description="MBB's earnings (16.7% per year) are forecast to grow faster than the VN market (13.7% per year)."
          />
          <CriteriaItem 
            passed={false} 
            title="High Growth Earnings" 
            description="MBB's earnings are forecast to grow, but not significantly (below 20% per year)."
          />
          <CriteriaItem 
            passed={true} 
            title="Revenue vs Market" 
            description="MBB's revenue (25.6% per year) is forecast to grow faster than the VN market (14.2% per year)."
          />
          <CriteriaItem 
            passed={true} 
            title="High Growth Revenue" 
            description="MBB's revenue (25.6% per year) is forecast to grow faster than 20% per year."
          />
          <CriteriaItem 
            passed={true} 
            title="Future Return on Equity" 
            description="MBB's Return on Equity is forecast to be high in 3 years time (20.8%)."
          />
        </div>
      </div>

      <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-6">Future Return on Equity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-300 mb-4">
              Return on equity (ROE) is a measure of a company's profitability that takes a company's annual return (net income) divided by the value of its total shareholders' equity.
            </p>
            <div className="bg-[#111827] p-4 rounded-lg border border-gray-800 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Forecast ROE (3 years)</span>
                <span className="text-xl font-bold text-emerald-400">20.8%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Considered high (&gt; 20%)</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#374151" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="50.24" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">20.8%</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">ROE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CriteriaItem({ passed, title, description }: { passed: boolean, title: string, description: string }) {
  return (
    <div className="p-5 flex items-start hover:bg-[#253141] transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        {passed ? (
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        )}
      </div>
      <div className="ml-4 flex-1">
        <h3 className={`text-base font-medium ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
}
