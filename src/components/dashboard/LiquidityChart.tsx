import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '../../contexts/ThemeContext';

export function LiquidityChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const bgColor = isDark ? '#111111' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111827';
  const gridColor = isDark ? '#1e1e1e' : '#e5e7eb';
  const labelColor = isDark ? '#888888' : '#6b7280';

  const options: ApexOptions = {
    chart: {
      type: 'area',
      background: bgColor,
      toolbar: { show: false },
      sparkline: { enabled: false }
    },
    colors: ['#34C759', labelColor],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
      labels: { style: { colors: labelColor, fontFamily: 'JetBrains Mono' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: labelColor, fontFamily: 'JetBrains Mono' } }
    },
    grid: { borderColor: gridColor, strokeDashArray: 4 },
    theme: { mode: isDark ? 'dark' : 'light' },
    legend: { position: 'top', horizontalAlign: 'right', labels: { colors: textColor } }
  };

  const series = [
    { name: 'Today', data: [1000, 3000, 5000, 8000, 12000, 15000] },
    { name: 'Yesterday', data: [800, 2500, 4500, 7000, 10000, 13000] }
  ];

  return (
    <div className="w-full h-full">
      <Chart options={options} series={series} type="area" height="100%" />
    </div>
  );
}
