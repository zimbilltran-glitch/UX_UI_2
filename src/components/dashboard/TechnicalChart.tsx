import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '../../contexts/ThemeContext';

// Mock data for Candlestick
const generateCandleData = () => {
  let data = [];
  let currentPrice = 1200;
  let time = new Date('2024-01-01').getTime();
  for (let i = 0; i < 100; i++) {
    const open = currentPrice;
    const high = currentPrice + Math.random() * 20;
    const low = currentPrice - Math.random() * 20;
    const close = currentPrice + (Math.random() - 0.5) * 30;
    data.push({
      x: time,
      y: [open, high, low, close].map(v => parseFloat(v.toFixed(2)))
    });
    currentPrice = close;
    time += 86400000; // 1 day
  }
  return data;
};

export function TechnicalChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const bgColor = isDark ? '#111111' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111827';
  const gridColor = isDark ? '#1e1e1e' : '#e5e7eb';
  const labelColor = isDark ? '#888888' : '#6b7280';
  const axisColor = isDark ? '#333333' : '#d1d5db';

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: '100%',
      background: bgColor,
      toolbar: { show: true },
      animations: { enabled: false }
    },
    title: {
      text: 'VN-Index',
      align: 'left',
      style: { color: textColor, fontFamily: 'Plus Jakarta Sans' }
    },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: labelColor, fontFamily: 'JetBrains Mono' } },
      axisBorder: { color: axisColor },
      axisTicks: { color: axisColor }
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: { style: { colors: labelColor, fontFamily: 'JetBrains Mono' } }
    },
    grid: { borderColor: gridColor },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#34C759',
          downward: '#FF3B30'
        }
      }
    },
    theme: { mode: isDark ? 'dark' : 'light' }
  };

  const series = [{
    name: 'VN-Index',
    data: generateCandleData()
  }];

  return (
    <div className="w-full h-full">
      <Chart options={options} series={series} type="candlestick" height="100%" />
    </div>
  );
}
