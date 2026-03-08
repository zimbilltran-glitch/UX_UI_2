import React from 'react';
import { Shield } from 'lucide-react';
import { BalanceSheetDiagram } from '../HelpCenterDiagrams';
import { Accordion } from './HelpCenterShared';

export const FinancialHealthGuide = () => {
  return (
    <Accordion id="financial-health" title="Financial Health">
      <div className="space-y-8">
        {/* Overview */}
        <div>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Financial Health section assesses the company's balance sheet strength. We look at its debt levels, cash runway, and ability to meet short-term and long-term obligations.
          </p>
        </div>

        {/* Balance Sheet Analysis */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Balance Sheet Analysis</h4>
          <p className="text-sm text-gray-500 mb-4">Visualizes the company's assets, liabilities, and equity.</p>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
            <BalanceSheetDiagram />
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <h5 className="text-emerald-600 font-bold mb-2">Short Term Liabilities</h5>
              <p className="text-sm text-gray-600 mb-2">Checks if short-term assets cover short-term liabilities.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Short Term Assets &gt; Short Term Liabilities.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <h5 className="text-emerald-600 font-bold mb-2">Long Term Liabilities</h5>
              <p className="text-sm text-gray-600 mb-2">Checks if short-term assets cover long-term liabilities.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Short Term Assets &gt; Long Term Liabilities.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <h5 className="text-emerald-600 font-bold mb-2">Debt Level</h5>
              <p className="text-sm text-gray-600 mb-2">Checks if the company has a safe level of debt compared to its equity.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Net Debt to Equity ratio &lt; 40%.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <h5 className="text-emerald-600 font-bold mb-2">Reducing Debt</h5>
              <p className="text-sm text-gray-600 mb-2">Checks if the company has reduced its debt over the last 5 years.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Debt to Equity ratio reduced over past 5 years.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <h5 className="text-emerald-600 font-bold mb-2">Debt Coverage</h5>
              <p className="text-sm text-gray-600 mb-2">Checks if debt is well covered by operating cash flow.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> Operating Cash Flow &gt; 20% of Total Debt.</li>
              </ul>
            </div>
            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <h5 className="text-emerald-600 font-bold mb-2">Interest Coverage</h5>
              <p className="text-sm text-gray-600 mb-2">Checks if interest payments are well covered by earnings (EBIT).</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> EBIT &gt; 5x Interest Expense.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Financial Institutions */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-700 p-2 rounded-lg mr-3 border border-purple-200">
              <Shield className="w-5 h-5" />
            </span>
            Analysis for Financial Institutions
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Financial Institutions (Banks, Financial Services, REITs, Insurance) borrow the majority of their funding. Conventional debt measures don't apply, so we use a separate series of health checks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="surface-card border border-gray-200 p-4 rounded-lg bg-white">
              <h6 className="text-gray-900 font-bold mb-1 text-sm"><span className="text-emerald-600 mr-2">✓</span>Asset Level</h6>
              <p className="text-xs text-gray-500">Leverage (Assets to Equity) &lt; 20x.</p>
            </div>
            <div className="surface-card border border-gray-200 p-4 rounded-lg bg-white">
              <h6 className="text-gray-900 font-bold mb-1 text-sm"><span className="text-emerald-600 mr-2">✓</span>Allowance for Bad Loans</h6>
              <p className="text-xs text-gray-500">Provision for bad loans &gt; actual bad debts written off.</p>
            </div>
            <div className="surface-card border border-gray-200 p-4 rounded-lg bg-white">
              <h6 className="text-gray-900 font-bold mb-1 text-sm"><span className="text-emerald-600 mr-2">✓</span>Low Risk Liabilities</h6>
              <p className="text-xs text-gray-500">Total deposits &gt; 50% of total liabilities.</p>
            </div>
            <div className="surface-card border border-gray-200 p-4 rounded-lg bg-white">
              <h6 className="text-gray-900 font-bold mb-1 text-sm"><span className="text-emerald-600 mr-2">✓</span>Loan Level</h6>
              <p className="text-xs text-gray-500">Net loans &lt; 110% of total assets.</p>
            </div>
            <div className="surface-card border border-gray-200 p-4 rounded-lg bg-white">
              <h6 className="text-gray-900 font-bold mb-1 text-sm"><span className="text-emerald-600 mr-2">✓</span>Low Risk Deposits</h6>
              <p className="text-xs text-gray-500">Total loans &lt; 125% of total deposits.</p>
            </div>
            <div className="surface-card border border-gray-200 p-4 rounded-lg bg-white">
              <h6 className="text-gray-900 font-bold mb-1 text-sm"><span className="text-emerald-600 mr-2">✓</span>Level of Bad Loans</h6>
              <p className="text-xs text-gray-500">Net Charge Off Ratio &lt; 3%.</p>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};
