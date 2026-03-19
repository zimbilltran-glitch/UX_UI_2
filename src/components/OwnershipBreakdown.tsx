import React, { useState } from 'react';
import { Table, MoreHorizontal, CheckCircle2 } from 'lucide-react';

const tableData = [
  { type: 'Individual Insiders', shares: '73,021,912', percentage: '0.907%' },
  { type: 'Institutions', shares: '587,773,178', percentage: '7.3%' },
  { type: 'General Public', shares: '7,394,204,819', percentage: '91.8%' },
];

export const OwnershipBreakdown = () => {
  const [showData, setShowData] = useState(false);

  return (
    <div className="mb-16" id="section_7_2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">7.2 Ownership Breakdown</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6">
        {showData ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-subtle">
                  <th className="py-3 px-4 text-sm font-semibold text-secondary">Owner Type</th>
                  <th className="py-3 px-4 text-sm font-semibold text-secondary">Number of Shares</th>
                  <th className="py-3 px-4 text-sm font-semibold text-secondary">Ownership Percentage</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-subtle hover:bg-subtle/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-bold text-primary">{row.type}</td>
                    <td className="py-4 px-4 text-sm text-primary">{row.shares}</td>
                    <td className="py-4 px-4 text-sm text-primary">{row.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-secondary mt-4">What is the ownership structure of MBB?</p>
          </div>
        ) : (
          <div className="pt-4 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
              <div>
                <div className="text-sm font-bold text-primary">Individual Insiders <span className="text-[#5eead4]">0.907%</span></div>
                <div className="text-xs text-secondary">73,021,912 shares</div>
              </div>
              <div className="sm:text-right">
                <div className="text-sm font-bold text-primary">Institutions <span className="text-[#2dd4bf]">7.3%</span></div>
                <div className="text-xs text-secondary">587,773,178 shares</div>
              </div>
            </div>
            <div className="flex justify-end items-end">
              <div className="text-right">
                <div className="text-sm font-bold text-primary">General Public <span className="text-[#d946ef]">91.8%</span></div>
                <div className="text-xs text-secondary">7,394,204,819 shares</div>
              </div>
            </div>
            
            <div className="h-12 w-full flex rounded-sm overflow-hidden mt-2">
              <div className="h-full bg-[#5eead4]" style={{ width: '0.907%' }}></div>
              <div className="h-full bg-[#2dd4bf]" style={{ width: '7.3%' }}></div>
              <div className="h-full bg-[#d946ef]" style={{ width: '91.8%' }}></div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8 mb-6">
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

        <div className="flex items-start space-x-3 border-t border-subtle pt-6">
          <CheckCircle2 className="w-6 h-6 text-bullish flex-shrink-0 mt-0.5" />
          <p className="text-primary text-lg leading-relaxed">
            <span className="text-bullish font-medium">Dilution of Shares: </span>
            Shareholders have not been meaningfully <span className="border-b border-dashed border-subtle pb-0.5">diluted</span> in the past year.
          </p>
        </div>
      </div>
    </div>
  );
};
