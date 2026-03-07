import React, { useState } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, ReferenceLine, Label } from 'recharts';
import { Table, MoreHorizontal } from 'lucide-react';

const forecastData = [
  { date: '2023-03-31', revenue: 38000000, earnings: 18000000, freeCashFlow: -100000000, cashFromOp: -90000000, isForecast: false },
  { date: '2023-06-30', revenue: 40000000, earnings: 18500000, freeCashFlow: -120000000, cashFromOp: -110000000, isForecast: false },
  { date: '2023-09-30', revenue: 41000000, earnings: 19000000, freeCashFlow: -104190000, cashFromOp: -100000000, isForecast: false },
  { date: '2023-12-31', revenue: 41219000, earnings: 19013000, freeCashFlow: -150000000, cashFromOp: -140000000, isForecast: false },
  { date: '2024-03-31', revenue: 42000000, earnings: 19200000, freeCashFlow: -160000000, cashFromOp: -150000000, isForecast: false },
  { date: '2024-06-30', revenue: 42500000, earnings: 19300000, freeCashFlow: -120000000, cashFromOp: -108791000, isForecast: false },
  { date: '2024-09-30', revenue: 42025740, earnings: 19486930, freeCashFlow: -175947100, cashFromOp: -174060889, isForecast: false },
  { date: '2024-12-31', revenue: 45836578, earnings: 22633757, freeCashFlow: -177859101, cashFromOp: -175557405, isForecast: false },
  { date: '2025-03-31', revenue: 48084975, earnings: 26492845, freeCashFlow: -210511229, cashFromOp: -208671158, isForecast: false },
  { date: '2025-06-30', revenue: 48045352, earnings: 26339341, freeCashFlow: -196907559, cashFromOp: -194990849, isForecast: false },
  { date: '2025-09-30', revenue: 48776743, earnings: 26120209, freeCashFlow: -170729199, cashFromOp: -168892901, isForecast: false },
  { date: '2025-12-31', revenue: 53949511, earnings: 26778939, freeCashFlow: -207366273, cashFromOp: -205586012, isForecast: false },
  { date: '2026-12-31', revenue: 83931738, earnings: 31756129, freeCashFlow: null, cashFromOp: null, isForecast: true, analysts: 5, lastUpdated: 'Feb 19 2026' },
  { date: '2027-12-31', revenue: 95543791, earnings: 38144780, freeCashFlow: null, cashFromOp: null, isForecast: true, analysts: 6, lastUpdated: 'Feb 19 2026' },
  { date: '2028-12-31', revenue: 133083824, earnings: 46342590, freeCashFlow: null, cashFromOp: null, isForecast: true, analysts: 2, lastUpdated: 'Feb 19 2026' },
];

const metricsConfig = {
  revenue: { label: 'Revenue', color: '#3b82f6' }, // Royal Blue
  earnings: { label: 'Earnings', color: '#2dd4bf' }, // Cyan/Aqua
  freeCashFlow: { label: 'Free Cash Flow', color: '#ec4899' }, // Magenta/Pink
  cashFromOp: { label: 'Cash From Op', color: '#f59e0b' }, // Amber/Orange
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

    return (
      <div className="bg-black border border-gray-800 rounded-lg p-3 shadow-xl text-sm min-w-[320px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-xs text-gray-400">
              <th className="pb-2 font-bold text-white text-sm">{formattedDate}</th>
              {dataPoint.isForecast && (
                <>
                  <th className="pb-2 text-right font-normal">Analysts</th>
                  <th className="pb-2 text-right font-normal">Last Updated</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {Object.entries(metricsConfig).map(([key, config]) => {
              if (!activeMetrics[key]) return null;
              const value = dataPoint[key];
              return (
                <tr key={key}>
                  <td className="py-1 text-gray-300 font-medium">{config.label}</td>
                  <td className="py-1 text-right font-bold" style={{ color: config.color }}>
                    {formatTooltipValue(value)}
                  </td>
                  {dataPoint.isForecast && (
                    <>
                      <td className="py-1 text-right text-gray-300">{value !== null && value !== undefined ? dataPoint.analysts : 'n/a'}</td>
                      <td className="py-1 text-right text-gray-300 text-xs">{value !== null && value !== undefined ? dataPoint.lastUpdated : 'n/a'}</td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export function EarningsRevenueForecast() {
  const [viewMode, setViewMode] = useState<'chart' | 'data'>('chart');
  const [activeMetrics, setActiveMetrics] = useState({
    revenue: true,
    earnings: true,
    freeCashFlow: true,
    cashFromOp: true,
  });

  const toggleMetric = (metricKey: string) => {
    setActiveMetrics(prev => ({
      ...prev,
      [metricKey]: !prev[metricKey as keyof typeof prev]
    }));
  };

  return (
    <div className="mb-16" id="section_2_1">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">2.1 Earnings and Revenue Growth Forecasts</h2>
      </div>

      <div className="bg-[#111111] rounded-xl p-6 border border-gray-800 shadow-lg">
        {viewMode === 'chart' ? (
          <>
            <div className="h-[400px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={forecastData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFCF" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metricsConfig.freeCashFlow.color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={metricsConfig.freeCashFlow.color} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCFO" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metricsConfig.cashFromOp.color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={metricsConfig.cashFromOp.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(val) => new Date(val).getFullYear().toString()} 
                    stroke="#666" 
                    tick={{ fill: '#999', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={30}
                  />
                  
                  <YAxis 
                    tickFormatter={formatYAxis} 
                    stroke="#666" 
                    tick={{ fill: '#999', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  
                  <Tooltip 
                    content={<CustomTooltip activeMetrics={activeMetrics} />} 
                    cursor={{ stroke: '#666', strokeWidth: 1, strokeDasharray: '3 3' }} 
                    isAnimationActive={false}
                  />
                  
                  {/* Background Shading */}
                  {/* @ts-ignore */}
                  <ReferenceArea x1="2023-03-31" x2="2025-12-31" fill="#000000" fillOpacity={0.2} />
                  {/* @ts-ignore */}
                  <ReferenceArea x1="2025-12-31" x2="2028-12-31" fill="#ffffff" fillOpacity={0.03} />
                  
                  {/* Divider Line with Labels */}
                  <ReferenceLine x="2025-12-31" stroke="#444" strokeDasharray="3 3">
                    <Label value="Past" position="insideTopLeft" fill="#ccc" fontSize={12} offset={10} />
                    <Label value="Analysts Forecasts" position="insideTopRight" fill="#888" fontSize={12} offset={10} />
                  </ReferenceLine>

                  {/* Zero Line */}
                  <ReferenceLine y={0} stroke="#666" strokeWidth={1} />

                  {/* Areas for Cash Flows */}
                  {activeMetrics.freeCashFlow && (
                    <Area type="monotone" dataKey="freeCashFlow" stroke={metricsConfig.freeCashFlow.color} strokeWidth={2} fill="url(#colorFCF)" connectNulls />
                  )}
                  {activeMetrics.cashFromOp && (
                    <Area type="monotone" dataKey="cashFromOp" stroke={metricsConfig.cashFromOp.color} strokeWidth={2} fill="url(#colorCFO)" connectNulls />
                  )}

                  {/* Lines for Revenue and Earnings */}
                  {activeMetrics.revenue && (
                    <Line type="monotone" dataKey="revenue" stroke={metricsConfig.revenue.color} strokeWidth={2} dot={false} activeDot={{ r: 6, fill: metricsConfig.revenue.color, stroke: '#000', strokeWidth: 2 }} connectNulls />
                  )}
                  {activeMetrics.earnings && (
                    <Line type="monotone" dataKey="earnings" stroke={metricsConfig.earnings.color} strokeWidth={2} dot={false} activeDot={{ r: 6, fill: metricsConfig.earnings.color, stroke: '#000', strokeWidth: 2 }} connectNulls />
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
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md border text-sm transition-colors ${
                      isActive 
                        ? 'bg-[#1A1A1A] border-gray-700 text-gray-200' 
                        : 'bg-transparent border-gray-800 text-gray-500 hover:border-gray-700'
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
                <tr className="border-b border-gray-800 text-sm text-gray-400">
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium text-right">Revenue</th>
                  <th className="py-3 px-4 font-medium text-right">Earnings</th>
                  <th className="py-3 px-4 font-medium text-right">Free Cash Flow</th>
                  <th className="py-3 px-4 font-medium text-right">Cash from Op</th>
                  <th className="py-3 px-4 font-medium text-right">Avg. No. Analysts</th>
                </tr>
              </thead>
              <tbody>
                {[...forecastData].reverse().map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-800/50 hover:bg-white/5 text-sm text-gray-300">
                    <td className="py-3 px-4">{new Date(row.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</td>
                    <td className="py-3 px-4 text-right">{row.revenue !== null && row.revenue !== undefined ? row.revenue.toLocaleString() : 'N/A'}</td>
                    <td className="py-3 px-4 text-right">{row.earnings !== null && row.earnings !== undefined ? row.earnings.toLocaleString() : 'N/A'}</td>
                    <td className="py-3 px-4 text-right">{row.freeCashFlow !== null && row.freeCashFlow !== undefined ? row.freeCashFlow.toLocaleString() : 'N/A'}</td>
                    <td className="py-3 px-4 text-right">{row.cashFromOp !== null && row.cashFromOp !== undefined ? row.cashFromOp.toLocaleString() : 'N/A'}</td>
                    <td className="py-3 px-4 text-right">{row.analysts || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="w-full py-3 mt-2 bg-[#1A1A1A] hover:bg-[#222222] text-gray-300 text-sm font-medium rounded-lg transition-colors">
              Show more
            </button>
          </div>
        )}

        {/* View Toggle */}
        <div className="flex justify-end mt-6 space-x-2 border-t border-gray-800 pt-4">
          <button
            onClick={() => setViewMode(viewMode === 'chart' ? 'data' : 'chart')}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] border border-gray-800 rounded-lg text-sm text-gray-300 transition-colors"
          >
            <Table className="w-4 h-4" />
            <span>{viewMode === 'chart' ? 'Data' : 'Chart'}</span>
          </button>
          <button className="px-3 py-2 bg-[#1A1A1A] hover:bg-[#222222] border border-gray-800 rounded-lg text-gray-400 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
