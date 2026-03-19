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

export function AnalystFutureGrowthForecasts() {
  const [showModal, setShowModal] = useState(false);

  const earningsData = [
    { label: 'Company', value: 16.7, color: '#3b82f6' }, // Royal Blue
    { label: 'Industry', value: 15.7, color: '#2dd4bf' }, // Cyan
    { label: 'Market', value: 13.7, color: '#ec4899' }, // Magenta
  ];

  const revenueData = [
    { label: 'Company', value: 25.6, color: '#3b82f6' },
    { label: 'Industry', value: 22.9, color: '#2dd4bf' },
    { label: 'Market', value: 14.2, color: '#ec4899' },
  ];

  const dataSource = [
    { point: 'HOSE:MBB Future Earnings Growth Rate', source: 'Line of Best Fit* through Consensus Estimate Earnings of 7 Analysts', value: '16.7%' },
    { point: 'HOSE:MBB Future Revenue Growth Rate', source: 'Line of Best Fit* through Consensus Estimate Revenue of 7 Analysts', value: '25.6%' },
    { point: 'Viet Nam Banks Industry Earnings Growth Rate', source: 'Market Cap Weighted Average', value: '15.7%' },
    { point: 'Viet Nam Banks Industry Revenue Growth Rate', source: 'Market Cap Weighted Average', value: '22.9%' },
    { point: 'Viet Nam Market Earnings Growth Rate', source: 'Market Cap Weighted Average', value: '13.7%' },
    { point: 'Viet Nam Market Revenue Growth Rate', source: 'Market Cap Weighted Average', value: '14.2%' },
  ];

  return (
    <div className="mb-16" id="section_2_2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">2.2 Analyst Future Growth Forecasts</h2>
      </div>

      <div className="bg-card rounded-xl p-8 border border-subtle shadow-lg">
        
        {/* Bar Charts */}
        <div className="flex flex-col md:flex-row justify-around items-end gap-12 mb-12 pt-8">
          <BarGroup title="Forecast Annual Earnings Growth" data={earningsData} />
          <BarGroup title="Forecast Annual Revenue Growth" data={revenueData} />
        </div>

        {/* Data Button */}
        <div className="flex justify-end mb-8">
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

        {/* Checklist */}
        <div className="space-y-4">
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-bullish mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-secondary text-sm leading-relaxed">
              <span className="text-bullish font-medium">Earnings vs Savings Rate:</span> MBB's forecast earnings growth (16.7% per year) is above the <TooltipText tooltip="The 5-year average rate of return (%) you would receive on a low risk government bond">savings rate</TooltipText> (3.1%).
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-bullish mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-secondary text-sm leading-relaxed">
              <span className="text-bullish font-medium">Earnings vs Market:</span> MBB's earnings (16.7% per year) are forecast to grow faster than the VN market (13.7% per year).
            </div>
          </div>
          <div className="flex items-start">
            <XCircle className="w-5 h-5 text-bearish mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-secondary text-sm leading-relaxed">
              <span className="text-bearish font-medium">High Growth Earnings:</span> MBB's earnings are forecast to grow, but not <TooltipText tooltip="We consider anything above 20% annual earnings growth to be significant">significantly</TooltipText>.
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-bullish mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-secondary text-sm leading-relaxed">
              <span className="text-bullish font-medium">Revenue vs Market:</span> MBB's revenue (25.6% per year) is forecast to grow faster than the VN market (14.2% per year).
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-bullish mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-secondary text-sm leading-relaxed">
              <span className="text-bullish font-medium">High Growth Revenue:</span> MBB's revenue (25.6% per year) is forecast to grow faster than 20% per year.
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col font-sans text-primary">
            <div className="flex justify-between items-center p-6 border-b border-subtle">
              <h2 className="text-2xl font-bold text-primary font-serif">Analyst Future Growth Forecasts</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-secondary hover:text-secondary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse mb-8 min-w-[600px]">
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
              </div>

              <div className="text-right text-xs text-secondary mb-6">
                HOSE:MBB Future Growth Rates Data Sources
              </div>

              <div className="space-y-4 text-sm text-primary">
                <p>
                  <a 
                    href="https://github.com/SimplyWallSt/Company-Analysis-Model/blob/master/MODEL.markdown#future-performance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 underline font-medium"
                  >
                    *Line of best fit is calculated by ..
                  </a>
                </p>
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
