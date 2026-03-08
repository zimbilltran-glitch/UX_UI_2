import React from 'react';
import { ManagementTenureDiagram } from '../HelpCenterDiagrams';
import { Accordion } from './HelpCenterShared';

export const ManagementOwnershipGuide = () => {
  return (
    <>
      <Accordion id="management" title="Management">
        <div className="space-y-8">
          {/* Overview */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              The management section does not contribute any scores in the Snowflake and therefore does not affect the color or shape of it. However, we still do some checks as a complimentary analysis. We check whether the CEO's total compensation is reasonable when compared to similar-sized companies in the market and in relation to the company's performance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              In addition, we analyze the experience level of both the management team and the board members by examining their average tenure to gauge the depth of knowledge and expertise within the company's leadership.
            </p>
          </div>

          {/* Key Information */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Key Information</h4>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6 shadow-sm">
              <ManagementTenureDiagram />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
                <h5 className="text-blue-600 font-bold mb-2 text-sm">Total Compensation</h5>
                <p className="text-xs text-gray-600">Sum of all forms of payments and benefits received by the CEO (salary, bonus, stock options, perks).</p>
              </div>
              <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
                <h5 className="text-blue-600 font-bold mb-2 text-sm">CEO Salary Percentage</h5>
                <p className="text-xs text-gray-600">Percentage of total compensation allocated toward salary (paid regardless of performance).</p>
              </div>
              <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
                <h5 className="text-blue-600 font-bold mb-2 text-sm">CEO Tenure</h5>
                <p className="text-xs text-gray-600">Length of time the CEO has been in their current role.</p>
              </div>
              <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
                <h5 className="text-blue-600 font-bold mb-2 text-sm">CEO Ownership</h5>
                <p className="text-xs text-gray-600">Percentage of shares owned by the CEO, indicating personal investment and alignment with shareholders.</p>
              </div>
              <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
                <h5 className="text-blue-600 font-bold mb-2 text-sm">Management Average Tenure</h5>
                <p className="text-xs text-gray-600">Average length of time the members of the management team have been in their roles.</p>
              </div>
              <div className="surface-card border border-gray-200 p-4 rounded-xl bg-white">
                <h5 className="text-blue-600 font-bold mb-2 text-sm">Board Average Tenure</h5>
                <p className="text-xs text-gray-600">Average length of time that members of the board of directors have served on the board.</p>
              </div>
            </div>
          </div>

          {/* CEO Compensation Analysis */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">CEO Compensation Analysis</h4>
            <div className="space-y-4">
              <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
                <div className="flex items-center mb-2">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                  <h6 className="text-gray-900 font-bold">Compensation vs Market</h6>
                </div>
                <p className="text-sm text-gray-600 mb-2">Compares CEO pay to the median of similar-sized companies.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li><strong className="text-emerald-600">Pass:</strong> CEO's total compensation is not above the median average.</li>
                </ul>
              </div>
              <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
                <div className="flex items-center mb-2">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                  <h6 className="text-gray-900 font-bold">Compensation vs Earnings</h6>
                </div>
                <p className="text-sm text-gray-600 mb-2">Evaluates CEO compensation in relation to the company's performance.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li><strong className="text-emerald-600">Pass:</strong> Compensation is aligned with earnings growth.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Team Experience */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Leadership & Board Experience</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
                <div className="flex items-center mb-2">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                  <h6 className="text-gray-900 font-bold">Management Team Experience</h6>
                </div>
                <p className="text-sm text-gray-600 mb-2">Analyzes the experience level of the company's management team.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li><strong className="text-emerald-600">Pass:</strong> Median average tenure of the management team is &ge; 2 years.</li>
                </ul>
              </div>
              <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
                <div className="flex items-center mb-2">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                  <h6 className="text-gray-900 font-bold">Board Member Experience</h6>
                </div>
                <p className="text-sm text-gray-600 mb-2">Analyzes the experience level of the company's board members.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li><strong className="text-emerald-600">Pass:</strong> Median average tenure of the Board of Directors is &ge; 3 years.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Accordion>

      <Accordion id="ownership" title="Ownership">
        <div className="space-y-8">
          {/* Overview */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-4">
              In the ownership section, we analyze the sentiments of insiders by examining their open and off-market transactions. We also evaluate whether shareholders have been diluted by checking the historical shares outstanding. Metrics in this section are not incorporated in the Snowflake score.
            </p>
          </div>

          {/* Recent Insider Transactions */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Recent Insider Transactions</h4>
            <p className="text-sm text-gray-500 mb-4">Overview of transactions done by individuals and institutional insiders in the past 12 months.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="surface-card p-5 rounded-xl border border-gray-200 bg-white">
                <h5 className="text-blue-600 font-bold mb-2">Open Market Transaction</h5>
                <p className="text-sm text-gray-600 mb-2">Buy or sell transaction executed on a stock exchange at a market price, voluntarily initiated by an insider.</p>
                <p className="text-xs text-gray-500">Filed in SEC Form 4 (Code P for acquisition, S for disposition).</p>
              </div>
              <div className="surface-card p-5 rounded-xl border border-gray-200 bg-white">
                <h5 className="text-blue-600 font-bold mb-2">Private (Off-Market) Transaction</h5>
                <p className="text-sm text-gray-600 mb-2">Sale or purchase of shares between parties without going through the marketplace (negotiated agreements).</p>
                <p className="text-xs text-gray-500">Captured when transaction price falls outside the daily price range.</p>
              </div>
            </div>

            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Insider Buying</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Checks both open-market and private transactions done by individual insiders over the past 3 months.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> More buy transactions than sell transactions during this period.</li>
              </ul>
            </div>
          </div>

          {/* Ownership Breakdown */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Ownership Breakdown</h4>
            <p className="text-sm text-gray-500 mb-4">Distribution of shares among different types of shareholders to understand who owns the company.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
              <div className="surface-card p-3 rounded-lg border border-gray-200 text-center bg-white">
                <h6 className="text-gray-900 text-xs font-bold mb-1">Private Companies</h6>
                <p className="text-[10px] text-gray-500">Non-publicly traded</p>
              </div>
              <div className="surface-card p-3 rounded-lg border border-gray-200 text-center bg-white">
                <h6 className="text-gray-900 text-xs font-bold mb-1">Individual Insiders</h6>
                <p className="text-[10px] text-gray-500">Executives, board</p>
              </div>
              <div className="surface-card p-3 rounded-lg border border-gray-200 text-center bg-white">
                <h6 className="text-gray-900 text-xs font-bold mb-1">State/Govt</h6>
                <p className="text-[10px] text-gray-500">State-owned entities</p>
              </div>
              <div className="surface-card p-3 rounded-lg border border-gray-200 text-center bg-white">
                <h6 className="text-gray-900 text-xs font-bold mb-1">General Public</h6>
                <p className="text-[10px] text-gray-500">Individual investors</p>
              </div>
              <div className="surface-card p-3 rounded-lg border border-gray-200 text-center bg-white">
                <h6 className="text-gray-900 text-xs font-bold mb-1">Institutions</h6>
                <p className="text-[10px] text-gray-500">Mutual/pension funds</p>
              </div>
            </div>

            <div className="surface-card border border-gray-200 p-5 rounded-xl bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded mr-3 border border-emerald-200">Check</span>
                <h6 className="text-gray-900 font-bold">Dilution of Shares</h6>
              </div>
              <p className="text-sm text-gray-600 mb-2">Looks at the change in the number of shares outstanding over a 1-year period.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li><strong className="text-emerald-600">Pass:</strong> No significant increase in shares outstanding.</li>
              </ul>
            </div>
          </div>
        </div>
      </Accordion>
    </>
  );
};
