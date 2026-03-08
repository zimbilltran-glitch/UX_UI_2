import React from 'react';

export const SnowflakeDiagram = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="0.5" />
    <line x1="50" y1="50" x2="50" y2="10" stroke="#E5E7EB" strokeWidth="0.5" />
    <line x1="50" y1="50" x2="90" y2="30" stroke="#E5E7EB" strokeWidth="0.5" />
    <line x1="50" y1="50" x2="90" y2="70" stroke="#E5E7EB" strokeWidth="0.5" />
    <line x1="50" y1="50" x2="50" y2="90" stroke="#E5E7EB" strokeWidth="0.5" />
    <line x1="50" y1="50" x2="10" y2="70" stroke="#E5E7EB" strokeWidth="0.5" />
    <line x1="50" y1="50" x2="10" y2="30" stroke="#E5E7EB" strokeWidth="0.5" />
    <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="rgba(0, 123, 255, 0.1)" stroke="#007BFF" strokeWidth="1.5" />
    <circle cx="50" cy="20" r="2" fill="#007BFF" />
    <circle cx="80" cy="35" r="2" fill="#007BFF" />
    <circle cx="80" cy="65" r="2" fill="#007BFF" />
    <circle cx="50" cy="80" r="2" fill="#007BFF" />
    <circle cx="20" cy="65" r="2" fill="#007BFF" />
    <circle cx="20" cy="35" r="2" fill="#007BFF" />
  </svg>
);

export const DCFDiagram = () => (
  <svg viewBox="0 0 400 150" className="w-full h-auto">
    {/* Timeline Line */}
    <line x1="50" y1="100" x2="350" y2="100" stroke="#E5E7EB" strokeWidth="2" />
    
    {/* Years */}
    {[0, 1, 2, 3, 4, 5].map((year, i) => (
      <g key={i} transform={`translate(${50 + i * 60}, 100)`}>
        <line y1="-5" y2="5" stroke="#E5E7EB" strokeWidth="2" />
        <text y="20" textAnchor="middle" fontSize="12" fill="#4B5563">Year {year}</text>
        {i > 0 && (
          <>
            <rect x="-20" y="-60" width="40" height="50" fill="#FFFFFF" stroke="#E5E7EB" rx="4" />
            <text x="0" y="-35" textAnchor="middle" fontSize="10" fill="#007BFF" fontWeight="bold">FCF</text>
            <path d="M0,-10 L0,0" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 2" />
          </>
        )}
      </g>
    ))}
    
    {/* Discounting Arrow */}
    <path d="M350,40 Q200,10 50,40" fill="none" stroke="#E83E8C" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <text x="200" y="20" textAnchor="middle" fontSize="12" fill="#E83E8C">Discounted back to Present Value</text>
    
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#E83E8C" />
      </marker>
    </defs>
  </svg>
);

export const GrowthChart = () => (
  <svg viewBox="0 0 400 200" className="w-full h-auto">
    {/* Axes */}
    <line x1="50" y1="150" x2="350" y2="150" stroke="#E5E7EB" strokeWidth="1" />
    <line x1="50" y1="50" x2="50" y2="150" stroke="#E5E7EB" strokeWidth="1" />
    
    {/* Historical Data (Solid Line) */}
    <path d="M50,120 L100,110 L150,115" fill="none" stroke="#4B5563" strokeWidth="2" />
    <circle cx="50" cy="120" r="3" fill="#4B5563" />
    <circle cx="100" cy="110" r="3" fill="#4B5563" />
    <circle cx="150" cy="115" r="3" fill="#4B5563" />
    
    {/* Future Estimates (Dashed Line) */}
    <path d="M150,115 L200,100 L250,80 L300,60" fill="none" stroke="#007BFF" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="200" cy="100" r="3" fill="#007BFF" />
    <circle cx="250" cy="80" r="3" fill="#007BFF" />
    <circle cx="300" cy="60" r="3" fill="#007BFF" />
    
    {/* Labels */}
    <text x="100" y="170" textAnchor="middle" fontSize="12" fill="#4B5563">Past</text>
    <text x="250" y="170" textAnchor="middle" fontSize="12" fill="#4B5563">Future (Estimates)</text>
    <line x1="150" y1="50" x2="150" y2="150" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 2" />
    <text x="150" y="40" textAnchor="middle" fontSize="12" fill="#9CA3AF">Today</text>
  </svg>
);

export const EarningsHistoryChart = () => (
  <svg viewBox="0 0 400 200" className="w-full h-auto">
    {/* Axes */}
    <line x1="50" y1="150" x2="350" y2="150" stroke="#E5E7EB" strokeWidth="1" />
    <line x1="50" y1="50" x2="50" y2="150" stroke="#E5E7EB" strokeWidth="1" />
    
    {/* Revenue Bars */}
    <rect x="70" y="100" width="20" height="50" fill="#EFF6FF" stroke="#007BFF" />
    <rect x="130" y="90" width="20" height="60" fill="#EFF6FF" stroke="#007BFF" />
    <rect x="190" y="80" width="20" height="70" fill="#EFF6FF" stroke="#007BFF" />
    <rect x="250" y="70" width="20" height="80" fill="#EFF6FF" stroke="#007BFF" />
    <rect x="310" y="60" width="20" height="90" fill="#EFF6FF" stroke="#007BFF" />
    
    {/* Earnings Line */}
    <path d="M80,120 L140,110 L200,100 L260,90 L320,80" fill="none" stroke="#E83E8C" strokeWidth="2" />
    <circle cx="80" cy="120" r="3" fill="#E83E8C" />
    <circle cx="140" cy="110" r="3" fill="#E83E8C" />
    <circle cx="200" cy="100" r="3" fill="#E83E8C" />
    <circle cx="260" cy="90" r="3" fill="#E83E8C" />
    <circle cx="320" cy="80" r="3" fill="#E83E8C" />
    
    {/* Legend */}
    <rect x="250" y="20" width="10" height="10" fill="#EFF6FF" stroke="#007BFF" />
    <text x="270" y="30" fontSize="10" fill="#4B5563">Revenue</text>
    <line x1="320" y1="25" x2="330" y2="25" stroke="#E83E8C" strokeWidth="2" />
    <text x="340" y="30" fontSize="10" fill="#4B5563">Earnings</text>
  </svg>
);

export const BalanceSheetDiagram = () => (
  <svg viewBox="0 0 400 200" className="w-full h-auto">
    {/* Assets */}
    <rect x="50" y="50" width="100" height="100" fill="#EFF6FF" stroke="#007BFF" strokeWidth="2" />
    <text x="100" y="100" textAnchor="middle" fontSize="14" fill="#007BFF" fontWeight="bold">Assets</text>
    
    {/* Equals Sign */}
    <text x="180" y="105" textAnchor="middle" fontSize="24" fill="#4B5563">=</text>
    
    {/* Liabilities */}
    <rect x="210" y="50" width="100" height="60" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
    <text x="260" y="85" textAnchor="middle" fontSize="14" fill="#EF4444" fontWeight="bold">Liabilities</text>
    
    {/* Plus Sign */}
    <text x="260" y="125" textAnchor="middle" fontSize="18" fill="#4B5563">+</text>
    
    {/* Equity */}
    <rect x="210" y="130" width="100" height="40" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
    <text x="260" y="155" textAnchor="middle" fontSize="14" fill="#10B981" fontWeight="bold">Equity</text>
  </svg>
);

export const DividendChart = () => (
  <svg viewBox="0 0 400 200" className="w-full h-auto">
    {/* Axes */}
    <line x1="50" y1="150" x2="350" y2="150" stroke="#E5E7EB" strokeWidth="1" />
    <line x1="50" y1="50" x2="50" y2="150" stroke="#E5E7EB" strokeWidth="1" />
    
    {/* Dividend Bars */}
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
      <rect 
        key={i}
        x={60 + i * 30} 
        y={150 - (20 + i * 5)} 
        width="20" 
        height={20 + i * 5} 
        fill="#ECFDF5" 
        stroke="#10B981" 
      />
    ))}
    
    <text x="200" y="180" textAnchor="middle" fontSize="12" fill="#4B5563">Last 10 Years</text>
    <text x="30" y="100" textAnchor="middle" fontSize="12" fill="#4B5563" transform="rotate(-90, 30, 100)">Dividend per Share</text>
  </svg>
);

export const ManagementTenureDiagram = () => (
  <svg viewBox="0 0 400 150" className="w-full h-auto">
    {/* Timeline */}
    <line x1="50" y1="100" x2="350" y2="100" stroke="#E5E7EB" strokeWidth="2" />
    
    {/* Years Markers */}
    {[0, 2, 4, 6, 8].map((year, i) => (
      <g key={i} transform={`translate(${50 + i * 75}, 100)`}>
        <line y1="-5" y2="5" stroke="#E5E7EB" strokeWidth="2" />
        <text y="20" textAnchor="middle" fontSize="12" fill="#4B5563">{year}y</text>
      </g>
    ))}
    
    {/* Average Tenure Marker */}
    <g transform="translate(200, 100)">
      <circle cx="0" cy="0" r="6" fill="#007BFF" />
      <line x1="0" y1="0" x2="0" y2="-40" stroke="#007BFF" strokeWidth="2" />
      <rect x="-40" y="-70" width="80" height="30" rx="4" fill="#007BFF" />
      <text x="0" y="-50" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">4.2 Years</text>
      <text x="0" y="-80" textAnchor="middle" fontSize="12" fill="#007BFF">Avg Tenure</text>
    </g>
  </svg>
);

export const TTMDiagram = () => (
  <svg viewBox="0 0 500 150" className="w-full h-auto">
    {/* Timeline Line */}
    <line x1="50" y1="100" x2="450" y2="100" stroke="#E5E7EB" strokeWidth="2" />
    
    {/* Quarters */}
    {['Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023'].map((q, i) => (
      <g key={i} transform={`translate(${100 + i * 100}, 100)`}>
        <line y1="-5" y2="5" stroke="#E5E7EB" strokeWidth="2" />
        <text y="25" textAnchor="middle" fontSize="12" fill="#4B5563">{q}</text>
        <circle cx="0" cy="0" r="4" fill="#E83E8C" />
      </g>
    ))}
    
    {/* TTM Bracket */}
    <path d="M100,80 L100,60 L400,60 L400,80" fill="none" stroke="#007BFF" strokeWidth="2" />
    <text x="250" y="50" textAnchor="middle" fontSize="14" fill="#007BFF" fontWeight="bold">Trailing Twelve Months (TTM)</text>
    
    {/* Explanation */}
    <text x="250" y="140" textAnchor="middle" fontSize="12" fill="#4B5563">Sum of last 4 quarters = TTM Data</text>
  </svg>
);
