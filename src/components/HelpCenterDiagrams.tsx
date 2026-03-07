import React from 'react';

export const SnowflakeDiagram = () => (
  <svg viewBox="0 0 200 200" className="w-full h-auto">
    <polygon points="100,20 180,80 150,170 50,170 20,80" fill="none" stroke="#374151" strokeWidth="2" />
    <polygon points="100,40 160,85 135,150 65,150 40,85" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
    <text x="90" y="15" fontSize="12" fill="#9ca3af">Value</text>
    <text x="185" y="85" fontSize="12" fill="#9ca3af">Future</text>
    <text x="155" y="185" fontSize="12" fill="#9ca3af">Past</text>
    <text x="20" y="185" fontSize="12" fill="#9ca3af">Health</text>
    <text x="5" y="85" fontSize="12" fill="#9ca3af">Dividend</text>
  </svg>
);

export const DCFDiagram = () => (
  <svg viewBox="0 0 400 100" className="w-full h-auto">
    <line x1="20" y1="50" x2="380" y2="50" stroke="#4b5563" strokeWidth="2" />
    <circle cx="20" cy="50" r="5" fill="#10b981" />
    <circle cx="110" cy="50" r="5" fill="#10b981" />
    <circle cx="200" cy="50" r="5" fill="#10b981" />
    <circle cx="290" cy="50" r="5" fill="#10b981" />
    <circle cx="380" cy="50" r="5" fill="#10b981" />
    <text x="15" y="80" fontSize="10" fill="#9ca3af">Year 0</text>
    <text x="105" y="80" fontSize="10" fill="#9ca3af">Year 1</text>
    <text x="195" y="80" fontSize="10" fill="#9ca3af">Year 2</text>
    <text x="285" y="80" fontSize="10" fill="#9ca3af">Year 3</text>
    <text x="375" y="80" fontSize="10" fill="#9ca3af">Terminal</text>
  </svg>
);

export const GrowthChart = () => (
  <svg viewBox="0 0 400 150" className="w-full h-auto">
    <polyline points="20,130 100,100 200,70 300,40 380,20" fill="none" stroke="#10b981" strokeWidth="3" />
    <line x1="20" y1="130" x2="380" y2="130" stroke="#4b5563" strokeWidth="1" />
    <line x1="20" y1="130" x2="20" y2="20" stroke="#4b5563" strokeWidth="1" />
  </svg>
);

export const EarningsHistoryChart = () => (
  <svg viewBox="0 0 400 150" className="w-full h-auto">
    <rect x="30" y="100" width="40" height="30" fill="#10b981" />
    <rect x="100" y="80" width="40" height="50" fill="#10b981" />
    <rect x="170" y="60" width="40" height="70" fill="#10b981" />
    <rect x="240" y="90" width="40" height="40" fill="#10b981" />
    <rect x="310" y="40" width="40" height="90" fill="#10b981" />
    <line x1="20" y1="130" x2="380" y2="130" stroke="#4b5563" strokeWidth="1" />
  </svg>
);

export const BalanceSheetDiagram = () => (
  <svg viewBox="0 0 400 150" className="w-full h-auto">
    <rect x="20" y="20" width="170" height="110" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <rect x="210" y="20" width="170" height="50" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <rect x="210" y="80" width="170" height="50" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="80" y="75" fontSize="14" fill="#9ca3af">Assets</text>
    <text x="250" y="50" fontSize="14" fill="#9ca3af">Liabilities</text>
    <text x="250" y="110" fontSize="14" fill="#9ca3af">Equity</text>
  </svg>
);

export const DividendChart = () => (
  <svg viewBox="0 0 400 150" className="w-full h-auto">
    <rect x="30" y="110" width="40" height="20" fill="#3b82f6" />
    <rect x="100" y="100" width="40" height="30" fill="#3b82f6" />
    <rect x="170" y="90" width="40" height="40" fill="#3b82f6" />
    <rect x="240" y="80" width="40" height="50" fill="#3b82f6" />
    <rect x="310" y="70" width="40" height="60" fill="#3b82f6" />
    <line x1="20" y1="130" x2="380" y2="130" stroke="#4b5563" strokeWidth="1" />
  </svg>
);

export const ManagementTenureDiagram = () => (
  <svg viewBox="0 0 400 150" className="w-full h-auto">
    <rect x="20" y="20" width="200" height="20" fill="#3b82f6" />
    <rect x="20" y="60" width="300" height="20" fill="#3b82f6" />
    <rect x="20" y="100" width="150" height="20" fill="#3b82f6" />
    <text x="230" y="35" fontSize="12" fill="#9ca3af">CEO (5 yrs)</text>
    <text x="310" y="75" fontSize="12" fill="#9ca3af">Management (8 yrs)</text>
    <text x="160" y="115" fontSize="12" fill="#9ca3af">Board (3 yrs)</text>
  </svg>
);

export const TTMDiagram = () => (
  <svg viewBox="0 0 400 100" className="w-full h-auto">
    <rect x="20" y="30" width="80" height="40" fill="#1f2937" stroke="#374151" />
    <rect x="110" y="30" width="80" height="40" fill="#1f2937" stroke="#374151" />
    <rect x="200" y="30" width="80" height="40" fill="#1f2937" stroke="#374151" />
    <rect x="290" y="30" width="80" height="40" fill="#10b981" stroke="#374151" />
    <text x="30" y="55" fontSize="10" fill="#9ca3af">Q3 2022</text>
    <text x="120" y="55" fontSize="10" fill="#9ca3af">Q4 2022</text>
    <text x="210" y="55" fontSize="10" fill="#9ca3af">Q1 2023</text>
    <text x="300" y="55" fontSize="10" fill="#ffffff">Q2 2023</text>
  </svg>
);
