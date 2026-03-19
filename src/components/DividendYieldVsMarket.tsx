import React, { useState } from 'react';
import { Table, MoreHorizontal, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const chartData = [
  { name: 'Company', value: 0.9, fill: '#3b82f6', label: 'Company' },
  { name: 'Market Bottom 25%', value: 3.0, fill: '#8b5cf6', label: 'Market Bottom 25%' },
  { name: 'Market Top 25%', value: 7.7, fill: '#d946ef', label: 'Market Top 25%' },
  { name: 'Industry Average', value: 2.1, fill: '#2dd4bf', label: 'Industry Average' },
  { name: 'Forecast (up to 3 years)', value: 1.1, fill: '#0ea5e9', label: 'Forecast (up to 3 years)' },
];

const tableData = [
  { segment: 'Company (MBB)', yield: '0.9%' },
  { segment: 'Market Bottom 25% (VN)', yield: '3.0%' },
  { segment: 'Market Top 25% (VN)', yield: '7.7%' },
  { segment: 'Industry Average (Banks)', yield: '2.1%' },
  { segment: 'Analyst forecast (MBB) (up to 3 years)', yield: '1.1%' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-subtle p-3 rounded-lg shadow-lg">
        <p className="font-bold text-primary mb-1">{payload[0].payload.name}</p>
        <p className="text-secondary font-medium">
          Dividend Yield: <span className="text-primary font-tabular">{payload[0].value.toFixed(1)}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export const DividendYieldVsMarket = () => {
  const [showData, setShowData] = useState(false);

  return (
    <div className="mb-16" id="section_5_2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">5.2 Dividend Yield vs Market</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6">
        {showData ? (
          <div className="overflow-x-auto">
            <p className="text-sm font-semibold text-secondary mb-4">Military Commercial Bank Dividend Yield vs Market</p>
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-subtle">
                  <th className="py-3 px-4 text-sm font-semibold text-secondary">Segment</th>
                  <th className="py-3 px-4 text-sm font-semibold text-secondary text-right">Dividend Yield</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-subtle hover:bg-subtle/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-bold text-primary">{row.segment}</td>
                    <td className="py-4 px-4 text-sm font-bold text-primary text-right">{row.yield}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-secondary mt-4">How does MBB dividend yield compare to the market?</p>
          </div>
        ) : (
          <div className="relative">
            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 30, right: 0, left: 0, bottom: 30 }}
                  barCategoryGap={0}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                  <XAxis 
                    dataKey="name" 
                    hide 
                  />
                  <YAxis 
                    hide
                    domain={[0, 8]}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-subtle)', opacity: 0.4 }} />
                  
                  <Bar dataKey="value" isAnimationActive={false}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <LabelList 
                      dataKey="value" 
                      position="top" 
                      formatter={(value: number) => `${value.toFixed(1)}%`}
                      style={{ fill: 'var(--text-primary)', fontSize: 16, fontWeight: 'bold' }}
                      offset={10}
                    />
                    <LabelList 
                      dataKey="label" 
                      position="insideTop" 
                      style={{ fill: 'white', fontSize: 12, fontWeight: 500 }}
                      offset={10}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-lg font-bold text-primary mt-2">Current Dividend Yield Vs Market & Industry</p>
          </div>
        )}

        <div className="flex justify-end mt-6 mb-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowData(!showData)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm border ${
                showData 
                  ? 'bg-subtle border-subtle text-primary' 
                  : 'bg-card hover:bg-subtle border-subtle text-secondary'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>Data</span>
            </button>
            <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4 border-t border-subtle pt-6">
          <div className="flex items-start space-x-3">
            <XCircle className="w-6 h-6 text-bearish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bearish font-medium">Notable Dividend: </span>
              MBB's dividend (0.87%) isn't notable compared to the bottom 25% of dividend payers in the VN market (3.05%).
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <XCircle className="w-6 h-6 text-bearish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bearish font-medium">High Dividend: </span>
              MBB's dividend (0.87%) is low compared to the top 25% of dividend payers in the VN market (7.77%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
