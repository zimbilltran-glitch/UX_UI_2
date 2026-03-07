import React, { useState } from 'react';
import { ChevronDown, Info, X, CheckCircle2, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, ResponsiveContainer } from 'recharts';

interface Company {
  ticker: string;
  name: string;
  value: number;
  growth: string;
  marketCap: string;
  isIndustryAvg?: boolean;
  isTarget?: boolean;
}

interface Range {
  label: string;
  min: number;
  max: number;
  count: number;
  isTarget?: boolean;
  isIndustryAvg?: boolean;
}

interface MetricData {
  shortName: string;
  targetValue: number;
  industryAvg: number;
  goodValue: boolean;
  splitPercentage: number;
  ranges: Range[];
  companies: Record<string, Company[]>;
}

interface MockData {
  ticker: string;
  companyName: string;
  industry: string;
  metrics: Record<string, MetricData>;
}

const mockData: MockData = {
  ticker: "MBB",
  companyName: "Military Commercial Bank",
  industry: "VN Banks",
  metrics: {
    "Price to Earnings": {
      shortName: "PE",
      targetValue: 8.0,
      industryAvg: 8.2,
      goodValue: true,
      splitPercentage: 50,
      ranges: [
        { label: "PE 3.0-4.5", min: 3.0, max: 4.5, count: 0 },
        { label: "PE 4.5-6.0", min: 4.5, max: 6.0, count: 2 },
        { label: "PE 6.0-7.5", min: 6.0, max: 7.5, count: 4 },
        { label: "PE 7.5-9.0", min: 7.5, max: 9.0, count: 7, isTarget: true, isIndustryAvg: true },
        { label: "PE 9.0-10.5", min: 9.0, max: 10.5, count: 2 },
        { label: "PE 10.5-12.0", min: 10.5, max: 12.0, count: 2 },
        { label: "PE 12.0-13.5", min: 12.0, max: 13.5, count: 1 },
      ],
      companies: {
        "PE 7.5-9.0": [
          { ticker: "Industry Avg.", name: "", value: 8.2, growth: "15.7%", marketCap: "", isIndustryAvg: true },
          { ticker: "MBB", name: "Military Commercial Bank", value: 8.0, growth: "16.69%", marketCap: "US$8.28b", isTarget: true },
          { ticker: "CTG", name: "Vietnam Commercial Bank for I...", value: 8.0, growth: "10.30%", marketCap: "US$10.68b" },
          { ticker: "TCB", name: "Vietnam Technological and Com...", value: 8.8, growth: "15.92%", marketCap: "US$8.67b" },
          { ticker: "VPB", name: "Vietnam Prosperity Commercial ...", value: 8.8, growth: "16.47%", marketCap: "US$8.14b" },
          { ticker: "HDB", name: "Ho Chi Minh City Development ...", value: 8.3, growth: "n/a", marketCap: "US$4.94b" },
          { ticker: "ACB", name: "Asia Commercial Bank", value: 7.7, growth: "15.73%", marketCap: "US$4.55b" },
          { ticker: "VIB", name: "Vietnam International Commerci...", value: 7.8, growth: "24.10%", marketCap: "US$2.18b" },
        ]
      }
    },
    "Price to Sales": {
      shortName: "PS",
      targetValue: 4.0,
      industryAvg: 4.0,
      goodValue: true,
      splitPercentage: 50,
      ranges: [
        { label: "PS 2.0-2.5", min: 2.0, max: 2.5, count: 0 },
        { label: "PS 2.5-3.0", min: 2.5, max: 3.0, count: 1 },
        { label: "PS 3.0-3.5", min: 3.0, max: 3.5, count: 3 },
        { label: "PS 3.5-4.0", min: 3.5, max: 4.0, count: 5, isTarget: true, isIndustryAvg: true },
        { label: "PS 4.0-4.5", min: 4.0, max: 4.5, count: 2 },
        { label: "PS 4.5-5.0", min: 4.5, max: 5.0, count: 1 },
        { label: "PS 5.0-5.5", min: 5.0, max: 5.5, count: 1 },
      ],
      companies: {
        "PS 3.5-4.0": [
          { ticker: "Industry Avg.", name: "", value: 4.0, growth: "22.9%", marketCap: "", isIndustryAvg: true },
          { ticker: "MBB", name: "Military Commercial Bank", value: 4.0, growth: "25.57%", marketCap: "US$8.28b", isTarget: true },
          { ticker: "CTG", name: "Vietnam Commercial Bank for I...", value: 4.0, growth: "26.21%", marketCap: "US$10.68b" },
          { ticker: "ACB", name: "Asia Commercial Bank", value: 3.9, growth: "18.27%", marketCap: "US$4.55b" },
        ]
      }
    },
    "Price to Book": {
      shortName: "PB",
      targetValue: 1.6,
      industryAvg: 1.3,
      goodValue: false,
      splitPercentage: 35,
      ranges: [
        { label: "PB 1.1-1.2", min: 1.1, max: 1.2, count: 0 },
        { label: "PB 1.2-1.3", min: 1.2, max: 1.3, count: 3, isIndustryAvg: true },
        { label: "PB 1.3-1.5", min: 1.3, max: 1.5, count: 2 },
        { label: "PB 1.5-1.7", min: 1.5, max: 1.7, count: 4, isTarget: true },
        { label: "PB 1.7-1.8", min: 1.7, max: 1.8, count: 1 },
        { label: "PB 1.8-2.0", min: 1.8, max: 2.0, count: 1 },
        { label: "PB 2.0-2.2", min: 2.0, max: 2.2, count: 1 },
      ],
      companies: {
        "PB 1.5-1.7": [
          { ticker: "Industry Avg.", name: "", value: 1.3, growth: "15.7%", marketCap: "", isIndustryAvg: true },
          { ticker: "MBB", name: "Military Commercial Bank", value: 1.6, growth: "16.69%", marketCap: "US$8.28b", isTarget: true },
          { ticker: "CTG", name: "Vietnam Commercial Bank for I...", value: 1.6, growth: "10.30%", marketCap: "US$10.68b" },
          { ticker: "EIB", name: "Vietnam Export Import Commer...", value: 1.6, growth: "n/a", marketCap: "US$1.58b" },
          { ticker: "NVB", name: "National Citizen Commercial Ba...", value: 1.6, growth: "n/a", marketCap: "US$841.06m" },
        ],
        "PB 1.8-2.0": [
          { ticker: "BID", name: "Commercial Bank for Investme...", value: 1.8, growth: "13.27%", marketCap: "US$11.85b" }
        ]
      }
    }
  }
};

export const RatioVsIndustry = () => {
  const [selectedMetric, setSelectedMetric] = useState("Price to Earnings");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  
  const currentData = mockData.metrics[selectedMetric as keyof typeof mockData.metrics];
  const [selectedRange, setSelectedRange] = useState(currentData.ranges.find(r => r.isTarget)?.label || currentData.ranges[0].label);

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
    setIsDropdownOpen(false);
    const newData = mockData.metrics[metric as keyof typeof mockData.metrics];
    setSelectedRange(newData.ranges.find(r => r.isTarget)?.label || newData.ranges[0].label);
    setShowAll(false);
  };

  const currentCompanies = currentData.companies[selectedRange as keyof typeof currentData.companies] || [];
  const displayCompanies = showAll ? currentCompanies : currentCompanies.slice(0, 5);
  const hasMoreCompanies = currentCompanies.length > 5;

  const targetIndex = currentData.ranges.findIndex(r => r.isTarget);
  const avgIndex = currentData.ranges.findIndex(r => r.isIndustryAvg);

  return (
    <div className="mb-12 font-sans">
      <h2 className="text-2xl font-bold text-white mb-2">
        1.5 {selectedMetric} Ratio vs Industry
      </h2>
      <p className="text-gray-300 mb-6">
        How does {mockData.ticker}'s {currentData.shortName} Ratio compare vs other companies in the {mockData.industry} Industry?
      </p>

      <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-800 shadow-lg">
        {/* Top Controls */}
        <div className="flex justify-end mb-6 relative z-20">
          <div className="relative">
            <button 
              className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-full border border-gray-700 transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedMetric}
              <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                {Object.keys(mockData.metrics).map((metric) => (
                  <button
                    key={metric}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${selectedMetric === metric ? 'bg-gray-700 text-white font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    onClick={() => handleMetricChange(metric)}
                  >
                    {metric}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Histogram Chart */}
        <div className="h-64 w-full mb-4 relative">
          {/* Background zones */}
          <div className="absolute inset-0 flex z-0">
            <div className="h-full bg-[#10b981]/20" style={{ width: `${currentData.splitPercentage}%` }}></div>
            <div className="h-full bg-red-900/20 relative overflow-hidden" style={{ width: `${100 - currentData.splitPercentage}%` }}>
              <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(239, 68, 68, 0.15) 5px, rgba(239, 68, 68, 0.15) 10px)' }}></div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height="100%" className="relative z-10">
            <BarChart data={currentData.ranges} margin={{ top: 30, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis 
                dataKey="label" 
                hide={true} // Hide default XAxis to use custom tabs below
              />
              <YAxis 
                stroke="#9ca3af" 
                tick={{fill: '#9ca3af', fontSize: 12}} 
                tickLine={false} 
                axisLine={false}
                ticks={[0, Math.max(...currentData.ranges.map(r => r.count))]}
                label={{ value: 'No. of Companies', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 10 }}
              />
              <Tooltip 
                cursor={{fill: '#374151', opacity: 0.4}} 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }}
                formatter={(value: number) => [value, 'Companies']}
              />
              <Bar dataKey="count" fill="#10b981" onClick={(data) => setSelectedRange(data.label)} cursor="pointer">
                {currentData.ranges.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isTarget ? '#0ea5e9' : (index > avgIndex ? '#374151' : '#10b981')} 
                    opacity={entry.isTarget ? 1 : 0.9} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Labels for MBB and Industry Avg */}
          <div className="absolute top-0 w-full h-full pointer-events-none z-20">
            <div 
              className="absolute top-2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${(targetIndex + 0.5) / currentData.ranges.length * 100}%` }}
            >
              <div className="bg-[#0ea5e9] text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                {mockData.ticker} {currentData.targetValue}x
              </div>
              <div className="w-0.5 h-4 bg-[#0ea5e9] mt-1"></div>
            </div>
            
            <div 
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${currentData.splitPercentage}%` }}
            >
              <div className="bg-[#eab308] text-black text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                Industry Avg. {currentData.industryAvg}x
              </div>
              <div className="w-0.5 h-6 bg-[#eab308] mt-1"></div>
            </div>
          </div>
        </div>

        {/* Range Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-800 mb-6">
          {currentData.ranges.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedRange(range.label)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                selectedRange === range.label 
                  ? 'text-[#eab308] border-[#eab308] bg-gray-800/50' 
                  : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-gray-800/30'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Peer List Table */}
        <div className="overflow-x-auto">
          {currentCompanies.length > 0 ? (
            <>
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 uppercase border-b border-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-medium">{currentCompanies.length} {currentCompanies.length === 1 ? 'Company' : 'Companies'}</th>
                    <th className="px-4 py-3 font-medium border-b border-dotted border-gray-500 inline-block">Price / {currentData.shortName === 'PE' ? 'Earnings' : currentData.shortName === 'PS' ? 'Sales' : 'Book'}</th>
                    <th className="px-4 py-3 font-medium border-b border-dotted border-gray-500 inline-block">Estimated Growth</th>
                    <th className="px-4 py-3 font-medium border-b border-dotted border-gray-500 inline-block">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {displayCompanies.map((company, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-800/50 transition-colors hover:bg-gray-800/30 ${
                        company.isIndustryAvg ? 'bg-yellow-900/10' : company.isTarget ? 'bg-gray-800/50' : ''
                      }`}
                    >
                      <td className={`px-4 py-3 font-medium ${company.isIndustryAvg ? 'text-[#eab308]' : company.isTarget ? 'text-[#eab308]' : 'text-white'}`}>
                        {company.isTarget ? (
                          <><span className="font-bold mr-2">{company.ticker}</span> {company.name}</>
                        ) : company.isIndustryAvg ? (
                          company.ticker
                        ) : (
                          <><span className="font-bold mr-2 text-[#eab308]">{company.ticker}</span> {company.name}</>
                        )}
                      </td>
                      <td className="px-4 py-3">{company.value}x</td>
                      <td className="px-4 py-3">{company.growth}</td>
                      <td className="px-4 py-3">{company.marketCap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {hasMoreCompanies && !showAll && (
                <button 
                  onClick={() => setShowAll(true)}
                  className="w-full mt-4 py-3 bg-gray-800/50 hover:bg-gray-800 text-[#eab308] font-medium rounded-lg transition-colors border border-gray-700/50"
                >
                  Show all {currentCompanies.length} Companies
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No more companies available in this {currentData.shortName} range
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-end mt-6">
          <button 
            onClick={() => setIsLearnModalOpen(true)}
            className="flex items-center px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-md border border-gray-700 transition-colors"
          >
            <Info className="w-4 h-4 mr-2" />
            Learn
          </button>
        </div>
      </div>

      {/* Audit Summary */}
      <div className="mt-6 flex items-start">
        {currentData.goodValue ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
        )}
        <p className="text-sm text-gray-300">
          <span className={currentData.goodValue ? "text-emerald-400 font-medium" : "text-red-400 font-medium"}>
            Price-To-{currentData.shortName === 'PE' ? 'Earnings' : currentData.shortName === 'PS' ? 'Sales' : 'Book'} vs Industry:
          </span> {mockData.ticker} is {currentData.goodValue ? 'good' : 'poor'} value based on its Price-To-{currentData.shortName === 'PE' ? 'Earnings' : currentData.shortName === 'PS' ? 'Sales' : 'Book'} Ratio ({currentData.targetValue}x) compared to the {mockData.industry} industry average ({currentData.industryAvg}x).
        </p>
      </div>

      {/* Learn Modal */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Preferred Ratio vs Industry</h3>
              <button onClick={() => setIsLearnModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-gray-800 space-y-6 text-base leading-relaxed">
              <p>Comparing a company to its industry is useful to gain a wider perspective of how it is valued. The advantage is that you generally have more companies to compare to, with the trade off being that you are comparing with companies that may be at a different stage of the lifecycle to the company you are valuing.</p>
              <p className="pt-2">For a more detailed breakdown of how to compare stocks to their industry, please check out our <a href="#" className="text-[#d97706] hover:text-[#b45309] underline decoration-[#d97706]/30 underline-offset-4 transition-colors">Help Centre</a>.</p>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-2 bg-[#fde047] hover:bg-[#facc15] text-gray-900 font-medium rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
