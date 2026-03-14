import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '../../contexts/ThemeContext';

export function ForeignTrading() {
  const [view, setView] = useState<'market' | 'prop'>('market');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const bgColor = isDark ? '#111111' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111827';
  const gridColor = isDark ? '#1e1e1e' : '#e5e7eb';
  const labelColor = isDark ? '#888888' : '#6b7280';
  const strokeColor = isDark ? '#111111' : '#ffffff';

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      background: bgColor,
      toolbar: { show: false },
      stacked: true
    },
    colors: ['#34C759', '#FF3B30'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 2
      }
    },
    dataLabels: { enabled: false },
    stroke: { width: 1, colors: [strokeColor] },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      labels: { style: { colors: labelColor, fontFamily: 'JetBrains Mono' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: labelColor, fontFamily: 'JetBrains Mono' } }
    },
    grid: { borderColor: gridColor, strokeDashArray: 4 },
    theme: { mode: isDark ? 'dark' : 'light' },
    legend: { show: false }
  };

  const marketSeries = [
    { name: 'Buy', data: [400, 300, 500, 200, 600] },
    { name: 'Sell', data: [-200, -400, -300, -500, -100] }
  ];

  const propSeries = [
    { name: 'Buy', data: [150, 200, 100, 300, 250] },
    { name: 'Sell', data: [-100, -150, -50, -200, -100] }
  ];

  const series = view === 'market' ? marketSeries : propSeries;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex space-x-1 bg-[var(--bg-base)] p-1 rounded-lg border border-[var(--border-subtle)]">
          <button
            onClick={() => setView('market')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              view === 'market' 
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Toàn thị trường
          </button>
          <button
            onClick={() => setView('prop')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              view === 'prop' 
                ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Tự doanh
          </button>
        </div>
        <div className="flex space-x-3 text-xs">
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#34C759] mr-1"></span>Buy</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#FF3B30] mr-1"></span>Sell</div>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <Chart options={options} series={series} type="bar" height="100%" />
      </div>
    </div>
  );
}
