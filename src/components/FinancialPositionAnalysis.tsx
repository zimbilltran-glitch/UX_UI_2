import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  {
    name: 'Short Term',
    assets: 283.60,
    liabilities: 1268.47,
  },
  {
    name: 'Long Term',
    assets: 1332.16,
    liabilities: 205.27,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-subtle p-3 rounded-lg shadow-lg">
        <p className="font-bold text-primary mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between space-x-4 mb-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-secondary text-sm">{entry.name}</span>
            </div>
            <span className="font-bold text-primary font-tabular">₫{entry.value.toFixed(2)}t</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Custom shape to render text on top of the bar
const CustomBar = (props: any) => {
  const { x, y, width, height, fill, value, label } = props;
  
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      <text 
        x={x + 4} 
        y={y - 16} 
        fill="var(--text-primary)" 
        fontSize="12" 
        fontWeight="bold"
        className="font-tabular"
      >
        ₫{value.toFixed(2)}t
      </text>
      <text 
        x={x + 4} 
        y={y + 16} 
        fill="var(--text-primary)" 
        fontSize="12" 
      >
        {label}
      </text>
    </g>
  );
};

export const FinancialPositionAnalysis = () => {
  return (
    <div className="mb-16" id="section_4_1">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">4.1 Financial Position Analysis</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6 relative">
        <div className="h-[400px] w-full mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 30, right: 30, left: 0, bottom: 20 }}
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-primary)', fontSize: 14, fontWeight: 'bold' }}
                dy={10}
              />
              <YAxis hide domain={[0, 1500]} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-subtle)', opacity: 0.4 }} />
              
              <Bar 
                dataKey="assets" 
                name="Assets" 
                fill="#2596be" 
                shape={<CustomBar label="Assets" />}
              />
              <Bar 
                dataKey="liabilities" 
                name="Liabilities" 
                fill="#6ee7b7" 
                shape={<CustomBar label="Liabilities" />}
              />
            </BarChart>
          </ResponsiveContainer>
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
