import React, { useState } from 'react';

const subTabs = [
  'Cân đối kế toán',
  'Kết quả kinh doanh',
  'Lưu chuyển tiền tệ',
  'Thuyết minh',
  'Chỉ số tài chính',
  'Biểu đồ phân tích'
];

export function FinancialStatements() {
  const [activeSubTab, setActiveSubTab] = useState(subTabs[0]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Financial Statements</h2>
      <div className="flex space-x-4 border-b border-[var(--border-subtle)] mb-6">
        {subTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`pb-2 px-1 ${
              activeSubTab === tab
                ? 'border-b-2 border-brand text-brand font-medium'
                : 'text-secondary hover:text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-subtle)]">
        <p className="text-secondary">Content for {activeSubTab} goes here.</p>
      </div>
    </div>
  );
}
