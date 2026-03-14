import React, { useState } from 'react';
import { Table, MoreHorizontal, XCircle } from 'lucide-react';
import { ComposedChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

const chartData = [
  { year: '2017', yield: 4.14, payment: 136.713, annual: 136.713, isForecast: false },
  { year: '2018', yield: 2.38, payment: 143.548, annual: 143.548, isForecast: false },
  { year: '2019', yield: 2.89, payment: 170.823, annual: 170.823, isForecast: false },
  { year: '2020', yield: 2.5, payment: 0, annual: 170.823, isForecast: false },
  { year: '2021', yield: 2.2, payment: 0, annual: 200.000, isForecast: false },
  { year: '2022', yield: 2.0, payment: 0, annual: 250.000, isForecast: false },
  { year: '2023', yield: 2.20, payment: 286.418, annual: 286.418, isForecast: false },
  { year: '2024', yield: 1.94, payment: 329.381, annual: 329.381, isForecast: false },
  { year: '2025', yield: 0.88, payment: 227.273, annual: 227.273, isForecast: false },
  { year: '2026', yield: 1.14, payment: 0, annual: 300.000, isForecast: true },
  { year: '2027', yield: 1.52, payment: 0, annual: 400.000, isForecast: true },
  { year: '2028', yield: 1.14, payment: 0, annual: 300.000, isForecast: true },
];

const tableData = [
  { date: '12/31/2028', dps: '₫300.000', yield: '1.14%', payment: 'n/a' },
  { date: '12/31/2027', dps: '₫400.000', yield: '1.52%', payment: 'n/a' },
  { date: '12/31/2026', dps: '₫300.000', yield: '1.14%', payment: 'n/a' },
  { date: '08/13/2025', dps: '₫227.273', yield: '0.88%', payment: '₫227.273' },
  { date: '05/23/2024', dps: '₫329.381', yield: '1.94%', payment: '₫329.381' },
  { date: '06/14/2023', dps: '₫286.418', yield: '2.20%', payment: '₫286.418' },
  { date: '04/05/2019', dps: '₫170.823', yield: '2.89%', payment: '₫170.822' },
  { date: '01/17/2018', dps: '₫143.548', yield: '2.38%', payment: '₫143.548' },
  { date: '02/23/2017', dps: '₫136.713', yield: '4.14%', payment: '₫136.713' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const annual = payload.find((p: any) => p.dataKey === 'annual')?.value || 0;
    const yieldVal = payload.find((p: any) => p.dataKey === 'yield')?.value || 0;
    
    return (
      <div className="bg-card border border-subtle p-4 rounded-lg shadow-lg w-full max-w-[200px] sm:min-w-[200px]">
        <p className="font-bold text-primary mb-3">{label}</p>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-secondary font-medium">Dividend Payments</span>
          <span className="text-primary font-tabular">₫{annual.toFixed(3)} annual</span>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-secondary font-medium">Annual Amount</span>
          <span className="text-[#a855f7] font-tabular">₫{annual.toFixed(3)}/year</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-secondary font-medium">Dividend Yield</span>
          <span className="text-[#3b82f6] font-tabular">{yieldVal.toFixed(1)}%/year</span>
        </div>
      </div>
    );
  }
  return null;
};

export const StabilityAndGrowthOfPayments = () => {
  const [showData, setShowData] = useState(false);
  const [activeMetrics, setActiveMetrics] = useState({
    yield: true,
    payments: true,
    annual: true,
    eps: false,
  });

  const toggleMetric = (metric: keyof typeof activeMetrics) => {
    setActiveMetrics(prev => ({ ...prev, [metric]: !prev[metric] }));
  };

  return (
    <div className="mb-16" id="section_5_1">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">5.1 Stability and Growth of Payments</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6">
        {showData ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-subtle">
                  <th className="py-3 px-4 text-sm font-semibold text-secondary">Date</th>
                  <th className="py-3 px-4 text-sm font-semibold text-secondary">Dividend Per Share (annual)</th>
                  <th className="py-3 px-4 text-sm font-semibold text-secondary text-right">Avg. Yield (%)</th>
                  <th className="py-3 px-4 text-sm font-semibold text-secondary text-right">Payment amount</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-subtle hover:bg-subtle/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-primary">{row.date}</td>
                    <td className="py-3 px-4 text-sm text-primary">{row.dps}</td>
                    <td className="py-3 px-4 text-sm text-primary text-right">{row.yield}</td>
                    <td className="py-3 px-4 text-sm text-primary text-right">{row.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-secondary mt-4">How stable has Military Commercial Bank's dividend per share been in the past?</p>
          </div>
        ) : (
          <div className="relative">
            <div className="h-[400px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
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
                    yAxisId="left"
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text-primary)', fontSize: 12, fontWeight: 'bold' }}
                    tickFormatter={(value) => value === 0 ? '0%' : `${value}%`}
                    domain={[0, 4.5]}
                    ticks={[0, 4.5]}
                    dx={-10}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    hide
                    domain={[0, 500]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  
                  <ReferenceArea x1="2025" x2="2028" yAxisId="left" {...({ fill: "var(--brand-color)", fillOpacity: 0.05 } as any)} />
                  
                  <text x="75%" y="30" fill="var(--text-primary)" fontSize="12" fontWeight="bold" textAnchor="middle">Past</text>
                  <text x="85%" y="30" fill="var(--text-secondary)" fontSize="12" textAnchor="middle">Analysts Forecasts</text>

                  {activeMetrics.yield && (
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="yield" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fill="#3b82f6" 
                      fillOpacity={0.2} 
                      activeDot={{ r: 6, fill: "#3b82f6", stroke: "var(--bg-card)", strokeWidth: 2 }}
                    />
                  )}
                  
                  {activeMetrics.payments && (
                    <Bar 
                      yAxisId="right"
                      dataKey="payment" 
                      barSize={6} 
                      fill="#4ade80" 
                    />
                  )}

                  {activeMetrics.annual && (
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="annual" 
                      stroke="#a855f7" 
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: "#a855f7", stroke: "var(--bg-card)", strokeWidth: 2 }}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <button 
                onClick={() => toggleMetric('yield')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                  activeMetrics.yield 
                    ? 'bg-subtle border-subtle text-primary' 
                    : 'bg-transparent border-transparent text-secondary hover:bg-subtle/50'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${activeMetrics.yield ? 'bg-[#3b82f6]' : 'border-2 border-[#3b82f6]'}`}></div>
                <span>Dividend Yield</span>
              </button>
              
              <button 
                onClick={() => toggleMetric('payments')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                  activeMetrics.payments 
                    ? 'bg-subtle border-subtle text-primary' 
                    : 'bg-transparent border-transparent text-secondary hover:bg-subtle/50'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${activeMetrics.payments ? 'bg-[#4ade80]' : 'border-2 border-[#4ade80]'}`}></div>
                <span>Dividend Payments</span>
              </button>

              <button 
                onClick={() => toggleMetric('annual')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                  activeMetrics.annual 
                    ? 'bg-subtle border-subtle text-primary' 
                    : 'bg-transparent border-transparent text-secondary hover:bg-subtle/50'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${activeMetrics.annual ? 'bg-[#a855f7]' : 'border-2 border-[#a855f7]'}`}></div>
                <span>Annual Amount</span>
              </button>

              <button 
                onClick={() => toggleMetric('eps')}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                  activeMetrics.eps 
                    ? 'bg-subtle border-subtle text-primary' 
                    : 'bg-transparent border-transparent text-secondary hover:bg-subtle/50'
                }`}
              >
                <div className={`w-3 h-3 rounded-full border-2 border-[#ef4444] ${activeMetrics.eps ? 'bg-[#ef4444]' : ''}`}></div>
                <span>Earnings Per Share</span>
              </button>
            </div>
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
              <span className="text-bearish font-medium">Stable Dividend: </span>
              MBB is not paying a notable dividend for the VN market, therefore no need to check if payments are stable.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <XCircle className="w-6 h-6 text-bearish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bearish font-medium">Growing Dividend: </span>
              MBB is not paying a notable dividend for the VN market, therefore no need to check if payments are increasing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
