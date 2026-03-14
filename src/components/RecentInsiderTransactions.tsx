import React from 'react';
import { AlertTriangle, MoreHorizontal } from 'lucide-react';

export const RecentInsiderTransactions = () => {
  return (
    <div className="mb-16" id="section_7_1">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">7.1 Recent Insider Transactions</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6">
        <h3 className="text-lg font-bold text-primary mb-6">Insider Trading Volume</h3>
        
        <div className="w-full overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="w-24"></th>
                <th className="py-3 px-4 text-sm font-semibold text-[#ea580c] bg-[#ea580c]/10 text-right w-1/2">Shares sold</th>
                <th className="py-3 px-4 text-sm font-semibold text-[#22c55e] bg-[#22c55e]/10 w-1/2">Shares bought</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-subtle">
                <td className="py-4 pr-4">
                  <div className="font-bold text-primary text-lg">0-3</div>
                  <div className="text-xs text-secondary">months</div>
                </td>
                <td className="py-4 px-4 text-right text-secondary bg-[#ea580c]/5">0</td>
                <td className="py-4 px-4 text-secondary bg-[#22c55e]/5">0</td>
              </tr>
              <tr className="border-b border-subtle">
                <td className="py-4 pr-4">
                  <div className="font-bold text-primary text-lg">3-6</div>
                  <div className="text-xs text-secondary">months</div>
                </td>
                <td className="py-4 px-4 text-right text-secondary bg-[#ea580c]/5">0</td>
                <td className="py-4 px-4 text-secondary bg-[#22c55e]/5">0</td>
              </tr>
              <tr className="border-b border-subtle">
                <td className="py-4 pr-4">
                  <div className="font-bold text-primary text-lg">6-9</div>
                  <div className="text-xs text-secondary">months</div>
                </td>
                <td className="py-4 px-4 text-right text-secondary bg-[#ea580c]/5">0</td>
                <td className="py-4 px-4 text-secondary bg-[#22c55e]/5">0</td>
              </tr>
              <tr className="border-b border-subtle">
                <td className="py-4 pr-4">
                  <div className="font-bold text-primary text-lg">9-12</div>
                  <div className="text-xs text-secondary">months</div>
                </td>
                <td className="py-4 px-4 text-right text-secondary bg-[#ea580c]/5">0</td>
                <td className="py-4 px-4 text-secondary bg-[#22c55e]/5">0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 sm:pl-24">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#ea580c]"></div>
            <span className="text-sm text-secondary">Sold By Individuals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
            <span className="text-sm text-secondary">Bought By Individuals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#ea580c] opacity-50"></div>
            <span className="text-sm text-secondary">Sold By Companies</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] opacity-50"></div>
            <span className="text-sm text-secondary">Bought By Companies</span>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start space-x-3 border-t border-subtle pt-6">
          <AlertTriangle className="w-6 h-6 text-bearish flex-shrink-0 mt-0.5" />
          <p className="text-primary text-lg leading-relaxed">
            <span className="text-bearish font-medium">Insider Buying: </span>
            Insufficient data to determine if <span className="border-b border-dashed border-subtle pb-0.5">insiders</span> have bought more shares than they have sold in the past 3 months.
          </p>
        </div>
      </div>
    </div>
  );
};
