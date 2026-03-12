import React, { useState } from 'react';
import { CheckCircle2, XCircle, Table, MoreHorizontal, X } from 'lucide-react';

const TooltipText = ({ children, tooltip }: { children: React.ReactNode, tooltip: string }) => {
  const [show, setShow] = useState(false);
  return (
    <span 
      className="relative inline-block border-b border-dashed border-subtle cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-card text-primary text-xs rounded shadow-lg z-10 font-sans">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-card"></div>
        </div>
      )}
    </span>
  );
};

const BarGroup = ({ title, data }: { title: string, data: { label: string, value: number, color: string }[] }) => {
  const maxValue = 30; // Set a fixed max value for height calculation (e.g., 30%)

  return (
    <div className="flex flex-col items-center w-full max-w-[300px]">
      <div className="flex items-end justify-center h-64 w-full gap-1 mb-4 border-b border-subtle">
        {data.map((item, index) => {
          const heightPercent = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-start justify-end flex-1 h-full group">
              <span className="text-primary font-bold text-lg mb-1">{item.value.toFixed(1)}%</span>
              <div 
                className="w-full relative transition-all duration-300"
                style={{ height: `${heightPercent}%`, backgroundColor: item.color }}
              >
                <span className={`absolute top-2 left-2 font-bold text-xs ${item.label === 'Industry' ? 'text-teal-900' : 'text-white'}`}>
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="text-primary font-bold text-sm">{title}</h3>
    </div>
  );
};

export function PastEarningsGrowthAnalysis() {
  const [showModal, setShowModal] = useState(false);

  const past5YearsData = [
    { label: 'Company', value: 21.4, color: '#3b82f6' }, // Royal Blue
    { label: 'Industry', value: 18.0, color: '#2dd4bf' }, // Cyan
    { label: 'Market', value: 2.5, color: '#ec4899' }, // Magenta
  ];

  const last1YearData = [
    { label: 'Company', value: 18.3, color: '#3b82f6' },
    { label: 'Industry', value: 17.7, color: '#2dd4bf' },
    { label: 'Market', value: 23.0, color: '#ec4899' },
  ];

  const dataSource = [
    { point: 'HOSE:MBB Past 5 Years Annual Earnings Growth', source: 'Historical Financials', value: '21.4%' },
    { point: 'HOSE:MBB Last 1 Year Earnings Growth', source: 'Historical Financials', value: '18.3%' },
    { point: 'Viet Nam Banks Industry Past 5 Years Earnings Growth', source: 'Market Cap Weighted Average', value: '18.0%' },
    { point: 'Viet Nam Banks Industry Last 1 Year Earnings Growth', source: 'Market Cap Weighted Average', value: '17.7%' },
    { point: 'Viet Nam Market Past 5 Years Earnings Growth', source: 'Market Cap Weighted Average', value: '2.5%' },
    { point: 'Viet Nam Market Last 1 Year Earnings Growth', source: 'Market Cap Weighted Average', value: '23.0%' },
  ];

  return (
    <div className="mb-16" id="section_3_4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">3.4 Past Earnings Growth Analysis</h2>
      </div>

      <div className="bg-card rounded-xl p-8 border border-subtle shadow-lg">
        
        {/* Bar Charts */}
        <div className="flex flex-col md:flex-row justify-around items-end gap-12 mb-12 pt-8">
          <BarGroup title="Past 5 Years Annual Earnings Growth" data={past5YearsData} />
          <BarGroup title="Last 1 Year Earnings Growth" data={last1YearData} />
        </div>

        {/* Data Button */}
        <div className="flex justify-end mb-8">
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm border border-blue-700"
            >
              <Table className="w-4 h-4" />
              <span>Data</span>
            </button>
            <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-4">
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-bullish mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-secondary text-sm leading-relaxed">
              <span className="text-bullish font-medium">Earnings Trend:</span> MBB's earnings have grown significantly by 21.4% per year over the past 5 years.
            </div>
          </div>
          <div className="flex items-start">
            <XCircle className="w-5 h-5 text-bearish mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-secondary text-sm leading-relaxed">
              <span className="text-bearish font-medium">Accelerating Growth:</span> MBB's earnings growth over the past year (18.3%) is below its 5-year average (21.4% per year).
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-bullish mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-secondary text-sm leading-relaxed">
              <span className="text-bullish font-medium">Earnings vs Industry:</span> MBB earnings growth over the past year (18.3%) exceeded the Banks industry 17.7%.
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col font-sans text-primary">
            <div className="flex justify-between items-center p-6 border-b border-subtle">
              <h2 className="text-2xl font-bold text-primary font-serif">Past Earnings Growth Analysis</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-secondary hover:text-secondary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse mb-8">
                <thead>
                  <tr className="border-b-2 border-subtle">
                    <th className="py-3 px-4 font-bold text-sm text-secondary w-1/3">Data Point</th>
                    <th className="py-3 px-4 font-bold text-sm text-secondary w-1/2">Source</th>
                    <th className="py-3 px-4 font-bold text-sm text-secondary text-right">Value (per year)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSource.map((row, idx) => (
                    <tr key={idx} className="border-b border-subtle hover:bg-subtle">
                      <td className="py-4 px-4 text-sm text-primary">{row.point}</td>
                      <td className="py-4 px-4 text-sm text-secondary">{row.source}</td>
                      <td className="py-4 px-4 text-sm font-medium text-primary text-right">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-right text-xs text-secondary mb-6">
                HOSE:MBB Past Growth Rates Data Sources
              </div>

              <div className="space-y-4 text-sm text-primary">
                <p>Industry and Market average data is calculated daily.</p>
              </div>
            </div>

            <div className="p-6 border-t border-subtle flex justify-end bg-base rounded-b-lg">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
