import React, { useState } from 'react';
import { Search } from 'lucide-react';

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
  const [period, setPeriod] = useState<'Năm' | 'Quý'>('Năm');
  const [searchQuery, setSearchQuery] = useState('');

  const isAnalysisChart = activeSubTab === 'Biểu đồ phân tích';

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Báo cáo tài chính</h2>
      
      <div className="flex space-x-4 border-b border-subtle mb-6 overflow-x-auto">
        {subTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`pb-2 px-1 whitespace-nowrap tab-interactive ${
              activeSubTab === tab
                ? 'text-brand font-medium active'
                : 'text-secondary hover:text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {!isAnalysisChart && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-secondary" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm chỉ số..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-subtle rounded-lg leading-5 bg-card text-primary placeholder-secondary focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand sm:text-sm transition-colors"
            />
          </div>

          <div className="flex bg-base p-1 rounded-lg border border-subtle">
            <button
              onClick={() => setPeriod('Năm')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                period === 'Năm'
                  ? 'bg-card text-primary shadow-sm'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Năm
            </button>
            <button
              onClick={() => setPeriod('Quý')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                period === 'Quý'
                  ? 'bg-card text-primary shadow-sm'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Quý
            </button>
          </div>
        </div>
      )}

      <div className="surface-card p-6">
        <p className="text-secondary mb-4">Nội dung cho {activeSubTab} sẽ hiển thị ở đây.</p>
        {!isAnalysisChart && (
          <div className="text-sm text-secondary">
            <p>Kỳ báo cáo: <span className="font-medium text-primary">{period}</span></p>
            {searchQuery && (
              <p>Đang tìm kiếm: <span className="font-medium text-primary">"{searchQuery}"</span></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
