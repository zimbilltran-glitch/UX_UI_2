import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const historyData = [
  { year: '2020', revenue: 20000, earnings: 5000, cashFlow: 6000 },
  { year: '2021', revenue: 25000, earnings: 8000, cashFlow: 9000 },
  { year: '2022', revenue: 32000, earnings: 11000, cashFlow: 12000 },
  { year: '2023', revenue: 40000, earnings: 15000, cashFlow: 16000 },
  { year: '2024', revenue: 48000, earnings: 18000, cashFlow: 19000 },
  { year: '2025', revenue: 55000, earnings: 21000, cashFlow: 22000 },
];

const growthData = [
  { name: 'Company', value: 21.4, fill: '#3b82f6' },
  { name: 'Industry', value: 18.0, fill: '#2dd4bf' },
  { name: 'Market', value: 23.2, fill: '#d946ef' },
];

export function PastPerformance() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8" id="section_3_0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">3 Past Performance</h1>
      </div>

      <div className="bg-[#1F2937] rounded-xl border border-gray-800 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#111827]/50">
          <h2 className="text-xl font-semibold text-white">Past criteria checks</h2>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-emerald-400">4</span>
            <span className="text-gray-500 text-xl">/ 6</span>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-300">
            Military Commercial Bank has been growing earnings at an average annual rate of 21.4%, while the Banks industry saw earnings growing at 18% annually. Revenues have been growing at an average rate of 15.2% per year.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">3.2 Earnings and Revenue History</h2>
        <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-800">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="year" stroke="#9ca3af" tick={{fill: '#9ca3af'}} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} tickLine={false} axisLine={false} tickFormatter={(value) => `₫${value/1000}T`} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="cashFlow" stroke="#d946ef" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div><span className="text-gray-300 text-sm">Revenue</span></div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div><span className="text-gray-300 text-sm">Earnings</span></div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div><span className="text-gray-300 text-sm">Free Cash Flow</span></div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">3.4 Past Earnings Growth Analysis</h2>
        <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-800">
          <div className="h-64 w-full max-w-2xl">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#9ca3af'}} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip cursor={{fill: '#374151', opacity: 0.4}} contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {growthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
