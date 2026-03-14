import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const TooltipText = ({ text, tooltip, bold = true }: { text: string, tooltip: string, bold?: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className={`relative inline-block cursor-help ${bold ? 'font-bold' : ''}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="border-b border-dashed border-subtle pb-[1px]">{text}</span>
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-card text-primary text-sm rounded shadow-lg font-sans font-normal text-left">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-card"></div>
        </div>
      )}
    </span>
  );
};

export const FinancialInstitutionsAnalysis = () => {
  return (
    <div className="mb-16" id="section_4_4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">4.4 Financial Institutions Analysis</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-bullish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bullish font-medium">Asset Level: </span>
              MBB's <TooltipText text="Assets to Equity ratio" tooltip="Total Assets / Total Equity" /> (11.4x) is <TooltipText text="moderate" tooltip="Considered acceptable for this industry" />.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <XCircle className="w-6 h-6 text-bearish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bearish font-medium">Allowance for Bad Loans: </span>
              MBB has a <TooltipText text="low allowance for bad loans" tooltip="Allowance for bad loans / Total bad loans" /> (94%).
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-bullish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bullish font-medium">Low Risk Liabilities: </span>
              78% of MBB's liabilities are made up of primarily <TooltipText text="low risk sources of funding" tooltip="Customer deposits are generally considered low risk" />.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-bullish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bullish font-medium">Loan Level: </span>
              MBB has an <TooltipText text="appropriate level of Loans to Assets ratio" tooltip="Total Loans / Total Assets" /> (67%).
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-bullish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bullish font-medium">Low Risk Deposits: </span>
              MBB's <TooltipText text="Loans to Deposits ratio" tooltip="Total Loans / Total Deposits" /> (94%) is <TooltipText text="appropriate" tooltip="Indicates good liquidity" />.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-bullish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bullish font-medium">Level of Bad Loans: </span>
              MBB has an <TooltipText text="appropriate level of bad loans" tooltip="Non-performing loans / Total loans" /> (1.3%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
