import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '../../contexts/ThemeContext';

export function IndexImpact() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const bgColor = isDark ? '#111111' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111827';
  const gridColor = isDark ? '#1e1e1e' : '#e5e7eb';
  const labelColor = isDark ? '#888888' : '#6b7280';

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      background: bgColor,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
        colors: {
          ranges: [
            { from: -10, to: -0.01, color: '#FF3B30' },
            { from: 0, to: 10, color: '#34C759' }
          ]
        }
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['VIC', 'VHM', 'VCB', 'BID', 'CTG', 'VPB', 'TCB', 'MBB', 'HPG', 'FPT'],
      labels: { style: { colors: labelColor, fontFamily: 'JetBrains Mono' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: textColor, fontFamily: 'Plus Jakarta Sans' } }
    },
    grid: { borderColor: gridColor, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
    theme: { mode: isDark ? 'dark' : 'light' },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: { formatter: (val) => val.toFixed(2) + ' pts' }
    }
  };

  const series = [{
    name: 'Impact',
    data: [1.2, 0.8, 0.5, 0.3, 0.2, -0.1, -0.4, -0.6, -0.9, -1.5]
  }];

  return (
    <div className="w-full h-full">
      <Chart options={options} series={series} type="bar" height="100%" />
    </div>
  );
}
