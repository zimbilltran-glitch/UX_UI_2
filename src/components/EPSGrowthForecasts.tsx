import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea, Line, ComposedChart, ReferenceLine } from 'recharts';
import { Table, MoreHorizontal, X, ExternalLink } from 'lucide-react';

const data = [
  { date: '2024-03-31', displayDate: 'Mar 31 2024', eps: 2102.42, isActual: true },
  { date: '2024-06-30', displayDate: 'Jun 30 2024', eps: 2443.24, isActual: true },
  { date: '2024-09-30', displayDate: 'Sep 30 2024', eps: 2439.90, isActual: true },
  { date: '2024-12-31', displayDate: 'Dec 31 2024', eps: 2821.18, isActual: true },
  { date: '2025-03-31', displayDate: 'Mar 31 2025', eps: 3291.51, isActual: true },
  { date: '2025-06-30', displayDate: 'Jun 30 2025', eps: 3269.07, isActual: true },
  { date: '2025-09-30', displayDate: 'Sep 30 2025', eps: 3234.98, isActual: true },
  { date: '2025-12-31', displayDate: 'Dec 31 2025', eps: 3324.51, high: 3324.51, low: 3324.51, isActual: true },
  { date: '2026-12-31', displayDate: 'Dec 31 2026', eps: 3767.98, high: 3948.89, low: 3564.00, analysts: 5, isActual: false },
  { date: '2027-12-31', displayDate: 'Dec 31 2027', eps: 4525.46, high: 4985.31, low: 3788.00, analysts: 5, isActual: false },
  { date: '2028-12-31', displayDate: 'Dec 31 2028', eps: 5148.29, high: 6348.57, low: 3948.00, analysts: 2, isActual: false },
];

const chartData = data.map(d => ({
  ...d,
  range: d.high !== undefined && d.low !== undefined ? [d.low, d.high] : undefined,
  year: d.date.substring(0, 4),
}));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-subtle p-4 rounded-lg shadow-2xl min-w-[250px]">
        <p className="text-primary font-bold mb-3">{data.displayDate}</p>
        <div className="flex justify-between items-center mb-1">
          <span className="text-secondary text-sm mr-8">EPS</span>
          <span className="text-[#2dd4bf] font-bold">₫{(data.eps / 1000).toFixed(3)}k</span>
        </div>
        {!data.isActual && data.high && data.low && (
          <div className="mt-2 pt-2 border-t border-subtle">
            <div className="flex justify-between items-center mb-1">
              <span className="text-secondary text-sm mr-8">Analysts' EPS Range</span>
              <span className="text-[#2dd4bf] font-bold">₫{(data.low / 1000).toFixed(3)}k - ₫{(data.high / 1000).toFixed(3)}k</span>
            </div>
            <div className="text-secondary text-sm mt-2">{data.analysts} Analysts</div>
            <div className="text-secondary text-xs mt-1">Last confirmed on Feb 19 2026</div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const DataModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-card border-b border-subtle px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-primary font-serif">Earnings per Share Growth Forecasts</h2>
          <button onClick={onClose} className="text-secondary hover:text-secondary transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <table className="w-full text-sm text-left mb-8 border border-subtle">
            <thead className="bg-base text-secondary">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-subtle">Data Point</th>
                <th className="px-4 py-3 font-medium border-b border-subtle">Source</th>
                <th className="px-4 py-3 font-medium border-b border-subtle text-right">Value</th>
              </tr>
            </thead>
            <tbody className="text-primary">
              <tr className="border-b border-subtle">
                <td className="px-4 py-3">Past Financials</td>
                <td className="px-4 py-3">Company Filings (12/31/2025)</td>
                <td className="px-4 py-3 text-right">See Below</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Future Estimates</td>
                <td className="px-4 py-3">Up to 7 Analyst Estimates on Average (S&P Global)</td>
                <td className="px-4 py-3 text-right">See Below</td>
              </tr>
            </tbody>
          </table>
          
          <div className="text-right text-xs text-secondary mb-2 uppercase tracking-wider">HOSE:MBB Past and Future Earnings per Share</div>
          <p className="text-primary mb-6 font-medium">
            All data from Military Commercial Bank Company Filings, last reported 12/31/2025, and in <a href="#" className="text-yellow-600 underline decoration-yellow-600/30 underline-offset-4 hover:text-yellow-700">trailing twelve months (TTM)</a> annual period rather than quarterly.
          </p>
          
          <table className="w-full text-sm text-left mb-8 border border-subtle">
            <thead className="bg-base text-secondary">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-subtle">Date</th>
                <th className="px-4 py-3 font-medium border-b border-subtle text-right">EPS *</th>
                <th className="px-4 py-3 font-medium border-b border-subtle text-right">EPS High Estimate</th>
                <th className="px-4 py-3 font-medium border-b border-subtle text-right">EPS Low Estimate</th>
                <th className="px-4 py-3 font-medium border-b border-subtle text-right">Avg. No. Analysts</th>
              </tr>
            </thead>
            <tbody className="text-primary">
              <tr className="border-b border-subtle">
                <td className="px-4 py-3">12/31/2026</td>
                <td className="px-4 py-3 text-right">3,767.98</td>
                <td className="px-4 py-3 text-right">3,948.89</td>
                <td className="px-4 py-3 text-right">3,564</td>
                <td className="px-4 py-3 text-right">5</td>
              </tr>
              <tr className="border-b border-subtle">
                <td className="px-4 py-3">12/31/2027</td>
                <td className="px-4 py-3 text-right">4,525.46</td>
                <td className="px-4 py-3 text-right">4,985.31</td>
                <td className="px-4 py-3 text-right">3,788</td>
                <td className="px-4 py-3 text-right">5</td>
              </tr>
              <tr>
                <td className="px-4 py-3">12/31/2028</td>
                <td className="px-4 py-3 text-right">5,148.29</td>
                <td className="px-4 py-3 text-right">6,348.57</td>
                <td className="px-4 py-3 text-right">3,948</td>
                <td className="px-4 py-3 text-right">2</td>
              </tr>
            </tbody>
          </table>
          
          <div className="text-right text-xs text-secondary mb-8 uppercase tracking-wider">HOSE:MBB Future Estimates Data (VND)</div>
          
          <table className="w-full text-sm text-left mb-4 border border-subtle">
            <thead className="bg-base text-secondary">
              <tr>
                <th className="px-4 py-3 font-medium border-b border-subtle">Date</th>
                <th className="px-4 py-3 font-medium border-b border-subtle text-right">EPS *</th>
              </tr>
            </thead>
            <tbody className="text-primary">
              {[
                { date: '12/31/2025', eps: '3,324.51' },
                { date: '9/30/2025', eps: '3,234.98' },
                { date: '6/30/2025', eps: '3,269.07' },
                { date: '3/31/2025', eps: '3,291.51' },
                { date: '12/31/2024', eps: '2,821.18' },
                { date: '9/30/2024', eps: '2,439.90' },
                { date: '6/30/2024', eps: '2,443.24' },
                { date: '3/31/2024', eps: '2,102.42' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-subtle last:border-0">
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3 text-right">{row.eps}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right text-xs text-secondary mb-6 uppercase tracking-wider">HOSE:MBB Past Financials Data (VND)</div>
          
          <p className="text-sm text-primary font-medium">*GAAP earnings excluding extraordinary items.</p>
        </div>
        
        <div className="sticky bottom-0 bg-card border-t border-subtle px-6 py-4 flex justify-end z-10">
          <button onClick={onClose} className="px-6 py-2 bg-[#F5C347] hover:bg-[#e5b337] text-primary font-bold rounded-lg transition-colors shadow-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export function EPSGrowthForecasts() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mb-16" id="section_2_3">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">2.3 Earnings per Share Growth Forecasts</h2>
      </div>

      <div className="bg-card rounded-xl p-8 border border-subtle shadow-lg relative overflow-hidden">
        {/* Chart Area */}
        <div className="h-[400px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
              <XAxis 
                dataKey="year" 
                stroke="var(--text-secondary)" 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="var(--text-secondary)" 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 'bold' }} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `₫${(val/1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--text-secondary)', strokeWidth: 1, strokeDasharray: '3 3' }} />
              
              {/* Background Areas */}
              {/* @ts-ignore */}
              <ReferenceArea x1="2024" x2="2025" fill="var(--bg-subtle)" fillOpacity={0.5} />
              {/* @ts-ignore */}
              <ReferenceArea x1="2025" x2="2028" fill="var(--bg-base)" fillOpacity={0.3} />
              
              {/* Separator Line */}
              <ReferenceLine x="2025" stroke="#9ca3af" strokeOpacity={0.5} />
              
              {/* Area for Analysts Range */}
              <Area 
                type="monotone" 
                dataKey="range" 
                stroke="none" 
                fill="#2dd4bf" 
                fillOpacity={0.15} 
                isAnimationActive={false}
              />
              
              {/* Line for EPS */}
              <Line 
                type="monotone" 
                dataKey="eps" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (!cx || !cy) return null;
                  return (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={4} 
                      fill={payload.isActual ? '#3b82f6' : '#2dd4bf'} 
                      stroke="var(--bg-card)" 
                      strokeWidth={2} 
                    />
                  );
                }}
                activeDot={{ r: 6, fill: 'var(--text-primary)', strokeWidth: 0 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
          
          {/* Labels for Actual vs Forecasts */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-4 text-xs font-bold">
            <span className="text-primary">Actual</span>
            <span className="text-secondary">Analysts Forecasts</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 mt-4 mb-8">
          <div className="flex items-center px-3 py-1.5 bg-base border border-subtle rounded-md">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-2"></div>
            <span className="text-xs text-secondary font-medium">EPS</span>
          </div>
          <div className="flex items-center px-3 py-1.5 bg-base border border-subtle rounded-md">
            <div className="w-3 h-3 rounded-full bg-[#2dd4bf] opacity-50 mr-2"></div>
            <span className="text-xs text-secondary font-medium">Analysts' EPS Range</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end border-t border-subtle pt-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowModal(true)}
              className="btn-interactive flex items-center space-x-2 px-4 py-2 bg-brand hover:bg-brand/90 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Table className="w-4 h-4" />
              <span>Data</span>
            </button>
            <button className="btn-interactive px-3 py-2 bg-brand hover:bg-brand/90 text-white rounded-lg transition-colors shadow-sm">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Help Link */}
        <div className="mt-6 pt-6 border-t border-subtle text-sm text-secondary">
          <a 
            href="https://support.simplywall.st/hc/en-us/articles/115006170908-Your-data-is-different-from-other-reports-and-websites-why-is-that" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-bullish hover:text-bullish font-medium inline-flex items-center transition-colors"
          >
            Tại sao dữ liệu của chúng tôi khác biệt? <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>

      <DataModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
