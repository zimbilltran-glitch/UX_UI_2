import React from 'react';

export const BalanceSheet = () => {
  return (
    <div className="mb-16" id="section_4_3">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">4.3 Balance Sheet</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Assets */}
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-bold text-primary mb-4">Assets</h3>
            <div className="flex h-[350px] border border-gray-900 rounded-sm overflow-hidden text-sm">
              {/* Long Term */}
              <div className="w-[85%] h-full bg-[#4ade80] border-r border-gray-900 p-3 flex flex-col">
                <span className="font-medium text-gray-900">LT & Other</span>
                <span className="text-gray-900">₫1407.1t</span>
              </div>
              {/* Short Term & Receivables */}
              <div className="w-[15%] h-full flex flex-col">
                <div className="h-[85%] bg-[#4ade80] border-b border-gray-900 p-3 flex flex-col overflow-hidden">
                  <span className="font-medium text-gray-900 leading-tight">Cash &<br/>STI</span>
                  <span className="text-gray-900 mt-1">₫177.7t</span>
                </div>
                <div className="h-[15%] bg-[#4ade80] p-3 flex flex-col justify-center overflow-hidden">
                  <span className="font-medium text-gray-900 leading-tight truncate">Rec.</span>
                  <span className="text-gray-900 truncate">₫26.1t</span>
                </div>
              </div>
            </div>
          </div>

          {/* Liabilities + Equity */}
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-bold text-primary mb-4">Liabilities + Equity</h3>
            <div className="flex h-[350px] border border-gray-900 rounded-sm overflow-hidden text-sm">
              {/* Accounts Payable */}
              <div className="w-[65%] h-full bg-[#4ade80] border-r border-gray-900 p-3 flex flex-col">
                <span className="font-medium text-gray-900">AP</span>
                <span className="text-gray-900">₫1152.5t</span>
              </div>
              {/* Debt, Equity, Other */}
              <div className="w-[35%] h-full flex flex-col">
                <div className="h-[40%] bg-[#ef4444] border-b border-gray-900 p-3 flex flex-col">
                  <span className="font-medium text-gray-900">Debt</span>
                  <span className="text-gray-900">₫256.2t</span>
                </div>
                <div className="h-[40%] bg-[#4ade80] border-b border-gray-900 p-3 flex flex-col">
                  <span className="font-medium text-gray-900">Equity</span>
                  <span className="text-gray-900">₫142.0t</span>
                </div>
                <div className="h-[20%] bg-[#4ade80] p-3 flex flex-col justify-center">
                  <span className="font-medium text-gray-900">Other Liab.</span>
                  <span className="text-gray-900">₫65.0t</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-8 pt-4 border-t border-subtle text-xs text-secondary grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
          <div><span className="font-semibold text-primary">LT & Other:</span> Long Term & Other Assets</div>
          <div><span className="font-semibold text-primary">Cash & STI:</span> Cash & Short Term Investments</div>
          <div><span className="font-semibold text-primary">Rec.:</span> Receivables</div>
          <div><span className="font-semibold text-primary">AP:</span> Accounts Payable</div>
          <div><span className="font-semibold text-primary">Other Liab.:</span> Other Liabilities</div>
        </div>
      </div>
    </div>
  );
};
