import React, { useState } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Table, MoreHorizontal, HelpCircle } from 'lucide-react';
import { colors } from '../theme/colors';

const historyData = [
  { date: '2016-12-31', revenue: 10000000, earnings: 3000000, freeCashFlow: -20000000, cashFromOp: -15000000, operatingExpenses: -5000000 },
  { date: '2017-12-31', revenue: 12000000, earnings: 3500000, freeCashFlow: -25000000, cashFromOp: -20000000, operatingExpenses: -6000000 },
  { date: '2018-06-30', revenue: 13517000, earnings: 4274000, freeCashFlow: null, cashFromOp: -22000000, operatingExpenses: -7000000 },
  { date: '2018-12-31', revenue: 15000000, earnings: 4800000, freeCashFlow: -30000000, cashFromOp: -25000000, operatingExpenses: -8000000 },
  { date: '2019-12-31', revenue: 18000000, earnings: 6000000, freeCashFlow: -35000000, cashFromOp: -30000000, operatingExpenses: -9000000 },
  { date: '2020-12-31', revenue: 22000000, earnings: 8000000, freeCashFlow: 5000000, cashFromOp: 10000000, operatingExpenses: -11000000 },
  { date: '2021-12-31', revenue: 28000000, earnings: 12000000, freeCashFlow: -40000000, cashFromOp: -35000000, operatingExpenses: -14000000 },
  { date: '2022-12-31', revenue: 35000000, earnings: 16000000, freeCashFlow: -80000000, cashFromOp: -70000000, operatingExpenses: -18000000 },
  { date: '2023-12-31', revenue: 41219000, earnings: 19013000, freeCashFlow: -150000000, cashFromOp: -140000000, operatingExpenses: -22000000 },
  { date: '2024-12-31', revenue: 45836578, earnings: 22633757, freeCashFlow: -177859101, cashFromOp: -175557405, operatingExpenses: -25000000 },
  { date: '2025-12-31', revenue: 53949511, earnings: 26778939, freeCashFlow: -207366273, cashFromOp: -205586012, operatingExpenses: -28000000 },
];

const metricsConfig = {
  revenue: { label: 'Revenue', color: '#3b82f6' }, // Blue
  earnings: { label: 'Earnings', color: '#2dd4bf' }, // Cyan
  freeCashFlow: { label: 'Free Cash Flow', color: '#ec4899' }, // Pink
  cashFromOp: { label: 'Cash From Op', color: '#f59e0b' }, // Orange
  operatingExpenses: { label: 'Operating Expenses', color: '#a855f7' }, // Purple
};

const formatYAxis = (value: number) => {
  if (value === 0) return '₫0';
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return `${isNegative ? '-' : ''}₫${(absValue / 1000000).toFixed(0)}t`;
  }
  return `${isNegative ? '-' : ''}₫${absValue.toLocaleString()}`;
};

const formatTooltipValue = (value: number | null | undefined) => {
  if (value === null || value === undefined) return 'No data';
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  return `${isNegative ? '-' : ''}₫${(absValue / 1000000).toFixed(3)}t /yr`;
};

const CustomTooltip = ({ active, payload, activeMetrics }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const dateObj = new Date(dataPoint.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const revenue = dataPoint.revenue;
    const earnings = dataPoint.earnings;
    const profitMargin = revenue && earnings ? ((earnings / revenue) * 100).toFixed(1) : null;

    return (
      <div className="bg-card border border-subtle rounded-xl p-3 shadow-lg text-sm min-w-[280px]">
        <div className="border-b border-subtle pb-2 mb-2">
          <div className="font-bold text-primary text-sm">{formattedDate}</div>
        </div>
        <table className="w-full text-left border-collapse">
          <tbody>
            {Object.entries(metricsConfig).map(([key, config]) => {
              if (!activeMetrics[key]) return null;
              const value = dataPoint[key];
              return (
                <tr key={key}>
                  <td className="py-1 text-secondary font-medium">{config.label}</td>
                  <td className="py-1 text-right font-bold font-mono" style={{ color: config.color }}>
                    {formatTooltipValue(value)}
                  </td>
                </tr>
              );
            })}
            {profitMargin && activeMetrics.revenue && activeMetrics.earnings && (
              <tr>
                <td colSpan={2} className="py-1 text-right text-secondary font-medium text-xs">
                  {profitMargin}% profit margin
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export function EarningsRevenueHistory() {
  const [viewMode, setViewMode] = useState<'chart' | 'data'>('chart');
  const [activeMetrics, setActiveMetrics] = useState({
    revenue: true,
    earnings: true,
    freeCashFlow: true,
    cashFromOp: false,
    operatingExpenses: false,
  });

  const toggleMetric = (metricKey: string) => {
    setActiveMetrics(prev => ({
      ...prev,
      [metricKey]: !prev[metricKey as keyof typeof prev]
    }));
  };

  return (
    <div className="mb-16" id="section_3_2">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">3.2 Earnings and Revenue History</h2>
        </div>
        <button className="btn-interactive flex items-center space-x-2 bg-card hover:bg-subtle border border-subtle text-secondary px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Learn</span>
        </button>
      </div>

      <div className="surface-card p-6">
        {viewMode === 'chart' ? (
          <>
            <div className="h-[400px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={historyData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFCF" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metricsConfig.freeCashFlow.color} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={metricsConfig.freeCashFlow.color} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCFO" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metricsConfig.cashFromOp.color} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={metricsConfig.cashFromOp.color} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metricsConfig.revenue.color} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={metricsConfig.revenue.color} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metricsConfig.earnings.color} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={metricsConfig.earnings.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.borderSubtle} vertical={false} />
                  
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(val) => new Date(val).getFullYear().toString()} 
                    stroke={colors.textSecondary} 
                    tick={{ fill: colors.textSecondary, fontSize: 12, fontFamily: 'JetBrains Mono' }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={30}
                  />
                  
                  <YAxis 
                    tickFormatter={formatYAxis} 
                    stroke={colors.textSecondary} 
                    tick={{ fill: colors.textSecondary, fontSize: 12, fontFamily: 'JetBrains Mono' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  
                  <Tooltip 
                    content={<CustomTooltip activeMetrics={activeMetrics} />} 
                    cursor={{ stroke: colors.textSecondary, strokeWidth: 1, strokeDasharray: '3 3' }} 
                    isAnimationActive={false}
                  />
                  
                  {/* Zero Line */}
                  <ReferenceLine y={0} stroke={colors.textSecondary} strokeWidth={1} />

                  {/* Areas for Cash Flows */}
                  {activeMetrics.freeCashFlow && (
                    <Area type="monotone" dataKey="freeCashFlow" stroke={metricsConfig.freeCashFlow.color} strokeWidth={2} fill="url(#colorFCF)" connectNulls />
                  )}
                  {activeMetrics.cashFromOp && (
                    <Area type="monotone" dataKey="cashFromOp" stroke={metricsConfig.cashFromOp.color} strokeWidth={2} fill="url(#colorCFO)" connectNulls />
                  )}
                  {activeMetrics.operatingExpenses && (
                    <Area type="monotone" dataKey="operatingExpenses" stroke={metricsConfig.operatingExpenses.color} strokeWidth={2} fill="transparent" connectNulls />
                  )}

                  {/* Lines for Revenue and Earnings */}
                  {activeMetrics.revenue && (
                    <Area type="monotone" dataKey="revenue" stroke={metricsConfig.revenue.color} strokeWidth={2} fill="url(#colorRev)" activeDot={{ r: 6, fill: colors.bgCard, stroke: metricsConfig.revenue.color, strokeWidth: 2 }} connectNulls />
                  )}
                  {activeMetrics.earnings && (
                    <Area type="monotone" dataKey="earnings" stroke={metricsConfig.earnings.color} strokeWidth={2} fill="url(#colorEarn)" activeDot={{ r: 6, fill: colors.bgCard, stroke: metricsConfig.earnings.color, strokeWidth: 2 }} connectNulls />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-6">
              {Object.entries(metricsConfig).map(([key, config]) => {
                const isActive = activeMetrics[key as keyof typeof activeMetrics];
                return (
                  <button
                    key={key}
                    onClick={() => toggleMetric(key)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-colors ${
                      isActive 
                        ? 'bg-base border-subtle text-primary' 
                        : 'bg-transparent border-subtle text-secondary hover:border-subtle'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: isActive ? config.color : 'transparent', border: `1px solid ${config.color}` }}
                    ></span>
                    <span>{config.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-subtle text-sm text-secondary">
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold text-right">Revenue</th>
                  <th className="py-3 px-4 font-semibold text-right">Earnings</th>
                  <th className="py-3 px-4 font-semibold text-right">Free Cash Flow</th>
                  <th className="py-3 px-4 font-semibold text-right">Cash from Op</th>
                  <th className="py-3 px-4 font-semibold text-right">Operating Expenses</th>
                </tr>
              </thead>
              <tbody>
                {[...historyData].reverse().map((row, idx) => (
                  <tr key={idx} className="border-b border-subtle/50 hover:bg-subtle text-sm text-secondary">
                    <td className="py-3 px-4 font-mono">{new Date(row.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</td>
                    <td className="py-3 px-4 text-right font-mono">{row.revenue !== null && row.revenue !== undefined ? row.revenue.toLocaleString() : 'N/A'}</td>
                    <td className="py-3 px-4 text-right font-mono">{row.earnings !== null && row.earnings !== undefined ? row.earnings.toLocaleString() : 'N/A'}</td>
                    <td className="py-3 px-4 text-right font-mono">{row.freeCashFlow !== null && row.freeCashFlow !== undefined ? row.freeCashFlow.toLocaleString() : 'N/A'}</td>
                    <td className="py-3 px-4 text-right font-mono">{row.cashFromOp !== null && row.cashFromOp !== undefined ? row.cashFromOp.toLocaleString() : 'N/A'}</td>
                    <td className="py-3 px-4 text-right font-mono">{row.operatingExpenses !== null && row.operatingExpenses !== undefined ? row.operatingExpenses.toLocaleString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="w-full py-3 mt-2 bg-base hover:bg-subtle text-secondary text-sm font-semibold rounded-lg transition-colors">
              Show more
            </button>
          </div>
        )}

        {/* View Toggle */}
        <div className="flex justify-end mt-6 space-x-2 border-t border-subtle pt-4">
          <button
            onClick={() => setViewMode(viewMode === 'chart' ? 'data' : 'chart')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm border border-blue-700"
          >
            <Table className="w-4 h-4" />
            <span>{viewMode === 'chart' ? 'Data' : 'Chart'}</span>
          </button>
          <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
