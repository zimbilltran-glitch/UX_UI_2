import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { HelpCircle, Table, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const generateData = (multiplier: number) => {
  const fb = 209.32 * multiplier;
  const ins = 10.87 * multiplier;
  const sec = 3.90 * multiplier;
  const al = 1.85 * multiplier;
  const rev = fb + ins + sec + al;
  
  const netOff = -104.34 * multiplier;
  const otherElim = -67.64 * multiplier;
  const cos = -0.01 * multiplier;
  const gp = rev + netOff + otherElim + cos;
  
  const ga = -18.87 * multiplier;
  const otherExp = -8.30 * multiplier;
  const earn = gp + ga + otherExp;

  return [
    { name: 'Finance & Banking', value: fb, type: 'positive' },
    { name: 'Insurance', value: ins, type: 'positive' },
    { name: 'Securities Fund', value: sec, type: 'positive' },
    { name: 'Asset & Liability', value: al, type: 'positive' },
    { name: 'Total Revenue', value: rev, type: 'total' },
    { name: 'Net off', value: netOff, type: 'negative' },
    { name: 'Other Eliminations', value: otherElim, type: 'negative' },
    { name: 'Cost of Sales', value: cos, type: 'negative' },
    { name: 'Gross Profit', value: gp, type: 'total' },
    { name: 'General & Admin', value: ga, type: 'negative' },
    { name: 'Other Expenses', value: otherExp, type: 'negative' },
    { name: 'Earnings', value: earn, type: 'total' },
  ];
};

const historicalData: Record<string, any[]> = {
  '2022': generateData(0.65),
  '2023': generateData(0.80),
  '2024': generateData(0.92),
  '2025': generateData(1.05),
  'Q1 2026': generateData(0.28),
  'LTM': generateData(1.0),
};

const periods = ['2022', '2023', '2024', '2025', 'Q1 2026', 'LTM'];

const tableData = [
  { metric: 'Revenue', values: ['37,544,948', '41,219,030', '45,836,578', '53,949,511', '53,949,511'] },
  { metric: 'Gross Profit', values: ['37,544,948', '41,219,030', '45,836,578', '53,949,511', '53,949,511'] },
  { metric: 'Expenses', values: ['21,457,363', '22,206,100', '23,202,821', '27,170,572', '27,170,572'] },
  { metric: 'General & Adm...', values: ['14,300,493', '14,247,710', '16,184,665', '18,866,235', '18,866,235'] },
  { metric: 'Earnings', values: ['16,087,585', '19,012,930', '22,633,757', '26,778,939', '26,778,939'] },
];

const tableYears = ['2022', '2023', '2024', '2025', '2026'];

const getColor = (type: string, theme: string) => {
  const isDark = theme === 'dark';
  if (type === 'total') return isDark ? '#34d399' : '#059669'; // Emerald
  if (type === 'positive') return isDark ? '#38bdf8' : '#0284c7'; // Sky Blue
  return isDark ? '#fb923c' : '#ea580c'; // Orange
};

const CustomTooltip = ({ active, payload, theme }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-subtle rounded-xl p-3 shadow-lg text-sm min-w-[200px]">
        <p className="font-bold text-primary mb-2 border-b border-subtle pb-2">{data.name}</p>
        <div className="flex justify-between items-center gap-4">
          <span className="text-secondary font-medium">
            {data.type === 'total' ? 'Subtotal' : data.type === 'positive' ? 'Addition' : 'Deduction'}
          </span>
          <span className="font-mono font-bold text-base" style={{ color: getColor(data.type, theme) }}>
            {data.displayValue > 0 && data.type !== 'total' ? '+' : ''}{data.displayValue.toFixed(2)}t ₫
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export function RevenueExpensesBreakdown() {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('LTM');
  const [viewMode, setViewMode] = useState<'chart' | 'data'>('chart');

  const chartData = useMemo(() => {
    let runningTotal = 0;
    const rawData = historicalData[selectedPeriod];
    
    return rawData.map(item => {
      if (item.type === 'total') {
        runningTotal = item.value;
        return { ...item, transparent: 0, barValue: item.value, displayValue: item.value };
      } else if (item.type === 'positive') {
        const start = runningTotal;
        runningTotal += item.value;
        return { ...item, transparent: start, barValue: item.value, displayValue: item.value };
      } else {
        runningTotal += item.value; // item.value is negative
        return { ...item, transparent: runningTotal, barValue: Math.abs(item.value), displayValue: item.value };
      }
    });
  }, [selectedPeriod]);

  return (
    <div className="mb-16" id="section_3_1">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">3.1 Revenue & Expenses Breakdown</h2>
          <p className="text-secondary text-sm">How Military Commercial Bank makes and spends money. Based on reported earnings for {selectedPeriod}.</p>
        </div>
        <button className="btn-interactive flex items-center space-x-2 bg-card hover:bg-subtle border border-subtle text-secondary px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow-sm">
          <HelpCircle className="w-4 h-4" />
          <span>Learn</span>
        </button>
      </div>

      <div className="surface-card p-6">
        {viewMode === 'chart' ? (
          <>
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 px-4">
              <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                {periods.map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPeriod(p)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                      selectedPeriod === p
                        ? 'bg-primary text-base'
                        : 'bg-card border border-subtle text-secondary hover:bg-subtle hover:text-primary'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor('positive', theme) }}></div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor('negative', theme) }}></div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Expenses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor('total', theme) }}></div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Totals</span>
                </div>
              </div>
            </div>

            <div className="h-[450px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} 
                    interval={0} 
                    angle={-45} 
                    textAnchor="end" 
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis 
                    tickFormatter={(val) => `₫${val}t`} 
                    tick={{ fontSize: 12, fill: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }} 
                    axisLine={false}
                    tickLine={false}
                    dx={-10}
                  />
                  <Tooltip 
                    content={<CustomTooltip theme={theme} />} 
                    cursor={{ fill: 'var(--bg-subtle)', opacity: 0.4 }}
                  />
                  <ReferenceLine y={0} stroke="var(--border-subtle)" />
                  
                  {/* Transparent base bar for positioning */}
                  <Bar dataKey="transparent" stackId="a" fill="transparent" isAnimationActive={false} />
                  
                  {/* Visible bar */}
                  <Bar dataKey="barValue" stackId="a" radius={[2, 2, 2, 2]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(entry.type, theme)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-subtle">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-subtle/30 text-sm text-primary">
                  <th className="py-4 px-4 font-semibold w-12 text-center"><ChevronLeft className="w-4 h-4 inline-block text-secondary cursor-pointer hover:text-primary transition-colors" /></th>
                  {tableYears.map(year => (
                    <th key={year} className="py-4 px-4 font-semibold">{year}</th>
                  ))}
                  <th className="py-4 px-4 font-semibold w-12 text-center"><ChevronRight className="w-4 h-4 inline-block text-secondary cursor-pointer hover:text-primary transition-colors" /></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} className="border-t border-subtle hover:bg-subtle/30 text-sm">
                    <td className="py-4 px-4 font-semibold text-primary whitespace-nowrap">{row.metric}</td>
                    {row.values.map((val, vIdx) => (
                      <td key={vIdx} className="py-4 px-4 text-secondary font-mono whitespace-nowrap">₫{val}</td>
                    ))}
                    <td className="py-4 px-4"></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-3 text-xs text-secondary border-t border-subtle bg-subtle/10">
              Military Commercial Bank Revenue & Expenses Breakdown (VND Millions)
            </div>
          </div>
        )}

        {/* View Toggle */}
        <div className="flex justify-end mt-6 space-x-2 border-t border-subtle pt-4">
          <button
            onClick={() => setViewMode(viewMode === 'chart' ? 'data' : 'chart')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm border border-blue-700"
          >
            <Table className="w-4 h-4" />
            <span>{viewMode === 'chart' ? 'Data' : 'Chart'}</span>
          </button>
          <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
