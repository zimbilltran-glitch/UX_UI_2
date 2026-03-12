import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Generate mock data for the chart
const generateData = () => {
  const data = [];
  let debt = 10;
  let equity = 30;
  
  for (let year = 2015; year <= 2025; year++) {
    for (let month = 1; month <= 12; month += 3) {
      if (year === 2025 && month > 6) break;
      
      data.push({
        date: `${month === 1 ? 'Mar' : month === 4 ? 'Jun' : month === 7 ? 'Sep' : 'Dec'} 30 ${year}`,
        year: month === 1 ? year.toString() : '',
        debt: debt,
        equity: equity,
        cash: equity * 0.8,
      });
      
      debt += Math.random() * 10 - 2;
      equity += Math.random() * 5;
      
      // Add a spike around 2022
      if (year === 2022) {
        debt += 15;
      }
    }
  }
  
  // Ensure the last point matches the screenshot
  data[data.length - 1] = {
    ...data[data.length - 1],
    date: 'Jun 30 2025',
    debt: 203.758,
    equity: 127.804,
    cash: 100,
  };
  
  return data;
};

const data = generateData();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const debt = payload.find((p: any) => p.dataKey === 'debt')?.value || 0;
    const equity = payload.find((p: any) => p.dataKey === 'equity')?.value || 0;
    const ratio = ((debt / equity) * 100).toFixed(1);

    return (
      <div className="bg-card border border-subtle p-4 rounded-lg shadow-lg min-w-[200px]">
        <p className="font-bold text-primary mb-3">{label}</p>
        
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-secondary font-medium">Debt</span>
          </div>
          <span className="font-bold text-bearish font-tabular">₫{debt.toFixed(3)}t</span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-secondary font-medium">Equity</span>
          </div>
          <span className="font-bold text-brand font-tabular">₫{equity.toFixed(3)}t</span>
        </div>
        
        <div className="pt-2 border-t border-subtle text-right">
          <span className="text-secondary text-sm">{ratio}% Debt/Equity Ratio</span>
        </div>
      </div>
    );
  }
  return null;
};

export const DebtToEquityHistory = () => {
  const [activeMetrics, setActiveMetrics] = useState({
    debt: true,
    equity: true,
    cash: false,
  });

  const toggleMetric = (metric: keyof typeof activeMetrics) => {
    setActiveMetrics(prev => ({ ...prev, [metric]: !prev[metric] }));
  };

  return (
    <div className="mb-16" id="section_4_2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">4.2 Debt to Equity History and Analysis</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6 relative">
        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
              <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-primary)', fontSize: 12, fontWeight: 'bold' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-primary)', fontSize: 12, fontWeight: 'bold' }}
                tickFormatter={(value) => value === 0 ? '₫0' : `₫${value}t`}
                domain={[0, 260]}
                ticks={[0, 130, 260]}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Highlight line for the last point */}
              <ReferenceLine x="Jun 30 2025" stroke="var(--border-subtle)" strokeDasharray="3 3" />

              {activeMetrics.debt && (
                <Area 
                  type="monotone" 
                  dataKey="debt" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  fill="#ef4444" 
                  fillOpacity={0.2} 
                  activeDot={{ r: 6, fill: "#ef4444", stroke: "var(--bg-card)", strokeWidth: 2 }}
                />
              )}
              
              {activeMetrics.equity && (
                <Area 
                  type="monotone" 
                  dataKey="equity" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="#3b82f6" 
                  fillOpacity={0.2} 
                  activeDot={{ r: 6, fill: "#3b82f6", stroke: "var(--bg-card)", strokeWidth: 2 }}
                />
              )}

              {activeMetrics.cash && (
                <Area 
                  type="monotone" 
                  dataKey="cash" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fill="none" 
                  activeDot={{ r: 6, fill: "#10b981", stroke: "var(--bg-card)", strokeWidth: 2 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="flex items-center space-x-4 mt-6">
          <button 
            onClick={() => toggleMetric('debt')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
              activeMetrics.debt 
                ? 'bg-subtle border-subtle text-primary' 
                : 'bg-transparent border-transparent text-secondary hover:bg-subtle/50'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${activeMetrics.debt ? 'bg-bearish' : 'border-2 border-bearish'}`}></div>
            <span>Debt</span>
          </button>
          
          <button 
            onClick={() => toggleMetric('equity')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
              activeMetrics.equity 
                ? 'bg-subtle border-subtle text-primary' 
                : 'bg-transparent border-transparent text-secondary hover:bg-subtle/50'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${activeMetrics.equity ? 'bg-brand' : 'border-2 border-brand'}`}></div>
            <span>Equity</span>
          </button>

          <button 
            onClick={() => toggleMetric('cash')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
              activeMetrics.cash 
                ? 'bg-subtle border-subtle text-primary' 
                : 'bg-transparent border-transparent text-secondary hover:bg-subtle/50'
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${activeMetrics.cash ? 'bg-bullish' : 'border-2 border-bullish'}`}></div>
            <span>Cash And Equivalents</span>
          </button>
        </div>

        {/* More Options Button */}
        <div className="absolute bottom-4 right-4">
          <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
