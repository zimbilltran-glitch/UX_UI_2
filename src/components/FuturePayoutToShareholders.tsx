import React from 'react';
import { MoreHorizontal, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Paid as dividend', value: 6, color: '#3b82f6' },
  { name: 'Earnings retained', value: 94, color: '#4b5563' },
];

export const FuturePayoutToShareholders = () => {
  return (
    <div className="mb-16" id="section_5_4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">5.4 Future Payout to Shareholders</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6 relative">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Chart Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="text-xs text-secondary mb-2">Paid as dividend</div>
            <div className="w-48 h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-primary">6%</span>
                <span className="text-xs text-secondary">2029</span>
              </div>
            </div>
            <div className="text-xs text-secondary mt-2">Earnings retained</div>
          </div>

          {/* Analysis Section */}
          <div className="w-full md:w-1/2">
            <div className="flex items-start space-x-3">
              <XCircle className="w-6 h-6 text-bearish flex-shrink-0 mt-0.5" />
              <p className="text-primary text-lg leading-relaxed">
                <span className="text-bearish font-medium">Future Dividend Coverage: </span>
                No need to calculate the sustainability of MBB's dividend in 3 years as they are not forecast to pay a notable one for the VN market.
              </p>
            </div>
          </div>
        </div>

        {/* More Options Button */}
        <div className="flex justify-center mt-8">
          <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
