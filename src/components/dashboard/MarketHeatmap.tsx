import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTheme } from '../../contexts/ThemeContext';

export function MarketHeatmap() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const bgColor = isDark ? '#111111' : '#ffffff';
  const neutralColor = isDark ? '#333333' : '#e5e7eb';

  const options: ApexOptions = {
    chart: {
      type: 'treemap',
      background: bgColor,
      toolbar: { show: false }
    },
    plotOptions: {
      treemap: {
        enableShades: false,
        colorScale: {
          ranges: [
            { from: -100, to: -4, color: '#8B0000' }, // Very Strong Bearish
            { from: -4, to: -2, color: '#B22222' },   // Strong Bearish
            { from: -2, to: -0.01, color: '#FF3B30' }, // Bearish
            { from: -0.01, to: 0.01, color: neutralColor }, // Neutral
            { from: 0.01, to: 2, color: '#34C759' },   // Bullish
            { from: 2, to: 4, color: '#228B22' },      // Strong Bullish
            { from: 4, to: 100, color: '#006400' }     // Very Strong Bullish
          ]
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#FFFFFF'],
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 400, // Not bold
        fontSize: '12px'
      },
      formatter: function(text: string | number | number[], op: any): string | number | (string | number)[] {
        return [text as string, op.value + '%'];
      }
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: { formatter: (val) => val + '%' }
    },
    theme: { mode: isDark ? 'dark' : 'light' }
  };

  const series = [
    {
      data: [
        { x: 'VCB', y: 1.2 },
        { x: 'BID', y: 0.8 },
        { x: 'CTG', y: -0.5 },
        { x: 'MBB', y: 2.1 },
        { x: 'TCB', y: -1.2 },
        { x: 'VPB', y: 0.5 },
        { x: 'ACB', y: 1.5 },
        { x: 'STB', y: -2.5 },
        { x: 'HDB', y: 0.2 },
        { x: 'VIB', y: -0.8 },
        { x: 'SHB', y: 3.2 },
        { x: 'EIB', y: -1.5 },
        { x: 'LPB', y: 0.5 },
        { x: 'TPB', y: 1.2 },
        { x: 'MSB', y: -0.5 },
        { x: 'OCB', y: 0.8 },
        { x: 'SSB', y: -1.2 },
        { x: 'NAB', y: 0.5 },
        { x: 'BVB', y: 1.5 },
        { x: 'ABB', y: -2.5 },
        { x: 'VIC', y: -4.5 },
        { x: 'VHM', y: -3.2 },
        { x: 'VRE', y: -1.8 },
        { x: 'HPG', y: 2.5 },
        { x: 'HSG', y: 4.2 },
        { x: 'NKG', y: 3.8 },
        { x: 'FPT', y: 5.5 },
        { x: 'MWG', y: 1.8 },
        { x: 'PNJ', y: 0.5 },
        { x: 'VNM', y: -0.2 },
        { x: 'MSN', y: -1.5 },
        { x: 'SAB', y: -0.8 },
        { x: 'GAS', y: 0.2 },
        { x: 'PLX', y: 0.5 },
        { x: 'POW', y: -0.5 },
        { x: 'GVR', y: 1.2 },
        { x: 'SSI', y: 2.8 },
        { x: 'VND', y: 3.5 },
        { x: 'VCI', y: 2.2 },
        { x: 'HCM', y: 1.5 }
      ]
    }
  ];

  return (
    <div className="w-full h-full">
      <Chart options={options} series={series} type="treemap" height="100%" />
    </div>
  );
}
