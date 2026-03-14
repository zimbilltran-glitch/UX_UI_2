import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, PieChart, Pie, Treemap } from 'recharts';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';

const GaugeChart = ({ title, value, secondaryValue, min, max, ranges, primaryLabel, primaryValue, secondaryLabel, secondaryValueLabel }: any) => {
  const radius = 80;
  const cx = 100;
  const cy = 100;
  
  const getAngle = (val: number) => {
    const percentage = Math.max(0, Math.min(1, (val - min) / (max - min)));
    return Math.PI - (percentage * Math.PI);
  };

  const primaryAngle = getAngle(value);
  const secondaryAngle = getAngle(secondaryValue);

  return (
    <div className="bg-card rounded-xl border border-subtle p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-bold text-primary">{title}</h3>
        <Info className="w-4 h-4 text-secondary cursor-pointer" />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <svg width="200" height="120" viewBox="0 0 200 120">
          {/* Draw ranges */}
          {ranges.map((range: any, i: number) => {
            const startAngle = getAngle(range.min);
            const endAngle = getAngle(range.max);
            
            const x1 = cx + radius * Math.cos(startAngle);
            const y1 = cy - radius * Math.sin(startAngle);
            const x2 = cx + radius * Math.cos(endAngle);
            const y2 = cy - radius * Math.sin(endAngle);
            
            const largeArcFlag = startAngle - endAngle <= Math.PI ? "0" : "1";
            
            const d = [
              "M", x1, y1, 
              "A", radius, radius, 0, largeArcFlag, 1, x2, y2
            ].join(" ");

            return (
              <path key={i} d={d} fill="none" stroke={range.color} strokeWidth="12" strokeLinecap="round" />
            );
          })}
          
          {/* Draw ticks */}
          {[min, ...ranges.map((r: any) => r.max)].map((tick: number, i: number) => {
            const angle = getAngle(tick);
            const x = cx + (radius + 15) * Math.cos(angle);
            const y = cy - (radius + 15) * Math.sin(angle);
            const unit = title.includes('Growth') || title.includes('Return') || title.includes('Yield') || title.includes('Debt to Equity') ? '%' : (title.includes('Ratio') || title.includes('Price to') || title === 'Interest Coverage') ? 'x' : '';
            return (
              <text key={i} x={x} y={y} fill="#8E9299" fontSize="10" textAnchor="middle" dominantBaseline="middle">
                {tick}{unit}
              </text>
            );
          })}

          {/* Secondary Needle */}
          <line 
            x1={cx} 
            y1={cy} 
            x2={cx + (radius - 10) * Math.cos(secondaryAngle)} 
            y2={cy - (radius - 10) * Math.sin(secondaryAngle)} 
            stroke="#8E9299" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
          
          {/* Primary Needle */}
          <line 
            x1={cx} 
            y1={cy} 
            x2={cx + (radius - 5) * Math.cos(primaryAngle)} 
            y2={cy - (radius - 5) * Math.sin(primaryAngle)} 
            stroke="#38BDF8" 
            strokeWidth="6" 
            strokeLinecap="round" 
          />
          
          {/* Center dot */}
          <circle cx={cx} cy={cy} r="6" fill="#8E9299" />
        </svg>
        
        <div className="absolute bottom-0 w-full text-center">
          <div className="text-lg font-bold text-primary">
            {title === 'Price to Earnings' ? 'PE Ratio' : 
             title === 'Price to Sales' ? 'PS Ratio' : 
             title === 'Price to Expected Growth' ? 'PEG Ratio' : 
             title === 'Price to Book' ? 'PB Ratio' : 
             title === 'Price to Free Cash Flow' ? 'P/FCF Ratio' :
             title === 'Return on Equity' ? 'ROE Ratio' : 
             title === 'Return on Capital Employed' ? 'ROCE Ratio' : 
             title === 'Return on Assets' ? 'ROA Ratio' : 
             title === 'Debt to Equity' ? 'D/E Ratio' :
             title === 'Interest Coverage Ratio' ? 'ICR' :
             title === 'Current Ratio' ? 'Current Ratio' :
             title === 'Dividend Yield' ? 'Dividend Yield' : 
             title === 'Dividend Growth Rate' ? 'Dividend Growth' : title}
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-sky-400 font-medium">{primaryLabel}</span>
          <span className="text-sky-400 font-bold">{primaryValue}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-green-400 font-medium">{secondaryLabel}</span>
          <span className="text-green-400 font-bold">{secondaryValueLabel}</span>
        </div>
      </div>
    </div>
  );
};

const BarComparisonChart = ({ title, data, primaryLabel, secondaryLabel, isVertical = false }: any) => {
  return (
    <div className="bg-card rounded-xl border border-subtle p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-bold text-primary">{title}</h3>
        <Info className="w-4 h-4 text-secondary cursor-pointer" />
      </div>
      
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 20 }} layout={isVertical ? "vertical" : "horizontal"}>
            {isVertical ? (
              <>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#8E9299', fontSize: 12, fontWeight: 'bold' }} width={80} />
              </>
            ) : (
              <>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8E9299', fontSize: 12, fontWeight: 'bold' }} dy={10} />
                <YAxis hide />
              </>
            )}
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="portfolio" fill="#38BDF8" radius={[4, 4, 0, 0]}>
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill="#38BDF8" />
              ))}
            </Bar>
            <Bar dataKey="market" fill="#2DD4BF" radius={[4, 4, 0, 0]}>
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill="#2DD4BF" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DonutChart = ({ title, data, centerText, centerSubText }: any) => {
  return (
    <div className="bg-card rounded-xl border border-subtle p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-bold text-primary">{title}</h3>
        <Info className="w-4 h-4 text-secondary cursor-pointer" />
      </div>
      <div className="flex-1 relative min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-primary">{centerText}</span>
          {centerSubText && <span className="text-xs text-secondary">{centerSubText}</span>}
        </div>
      </div>
    </div>
  );
};

const IndustryTreemap = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const TOTAL_VALUE = 307730;

  const sectorData = [
    {
      name: 'Tech',
      size: 19.9,
      color: '#1D4ED8',
      holdings: [
        { name: 'CRWD', size: 6.7 },
        { name: 'IREN', size: 6.3 },
        { name: 'PLTR', size: 4.7 },
        { name: 'NVDA', size: 2.2 },
      ]
    },
    {
      name: 'Telecom',
      size: 16.5,
      color: '#2563EB',
      holdings: [
        { name: 'META', size: 16.5 }
      ]
    },
    {
      name: 'Consumer Discretionary',
      size: 15.6,
      color: '#0F766E',
      holdings: [
        { name: 'TSLA', size: 12.0 },
        { name: 'AMZN', size: 3.6 }
      ]
    },
    {
      name: 'Financials',
      size: 12.9,
      color: '#0D9488',
      holdings: [
        { name: 'BAC', size: 8.6 },
        { name: 'JPM', size: 4.3 }
      ]
    },
    {
      name: 'Consumer Staples',
      size: 12.7,
      color: '#4338CA',
      holdings: [
        { name: 'BATS', size: 12.7 }
      ]
    },
    {
      name: 'Energy',
      size: 9.6,
      color: '#B45309',
      holdings: [
        { name: 'XOM', size: 9.6 }
      ]
    },
    {
      name: 'Industrials',
      size: 6.3,
      color: '#D97706',
      holdings: [
        { name: 'GEV', size: 6.3 }
      ]
    },
    {
      name: 'Healthcare',
      size: 5.4,
      color: '#475569',
      holdings: [
        { name: 'JNJ', size: 3.7 },
        { name: 'UNH', size: 1.7 }
      ]
    },
    {
      name: 'Materials',
      size: 1.0,
      color: '#64748B',
      holdings: [
        { name: 'PLS', size: 1.0 }
      ]
    }
  ];

  const currentData = selectedSector 
    ? sectorData.find(s => s.name === selectedSector)?.holdings.map(h => ({ ...h, color: sectorData.find(s => s.name === selectedSector)?.color }))
    : sectorData;

  const handleSectorClick = (data: any) => {
    if (!selectedSector && data.holdings) {
      setSelectedSector(data.name);
    }
  };

  const getContrastText = (hexColor: string) => {
    if (!hexColor) return '#ffffff';
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? '#0f172a' : '#ffffff';
  };

  const CustomContent = (props: any) => {
    const { x, y, width, height, name, value, color, depth } = props;
    
    if (depth === 0) return null;

    const bgColor = color || '#38BDF8';
    const textColor = getContrastText(bgColor);
    const subTextColor = textColor === '#ffffff' ? 'rgba(255,255,255,0.85)' : 'rgba(15, 23, 42, 0.85)';

    return (
      <g onClick={() => handleSectorClick(props)}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={bgColor}
          stroke="#141414"
          strokeWidth={2}
          style={{ cursor: selectedSector ? 'default' : 'pointer', transition: 'opacity 0.2s' }}
          className={!selectedSector ? "hover:opacity-80" : ""}
        />
        {width > 40 && height > 30 && name && (
          <text x={x + width / 2} y={y + height / 2 - (height > 50 ? 8 : 0)} textAnchor="middle" fill={textColor} fontSize={13} fontWeight="normal" dominantBaseline="central" style={{ pointerEvents: 'none' }}>
            {name}
          </text>
        )}
        {width > 40 && height > 50 && value !== undefined && (
          <text x={x + width / 2} y={y + height / 2 + 12} textAnchor="middle" fill={subTextColor} fontSize={12} fontWeight="normal" dominantBaseline="central" style={{ pointerEvents: 'none' }}>
            {value.toFixed(1)}%
          </text>
        )}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const val = payload[0].value;
      if (val === undefined) return null;
      const dollarValue = (val / 100) * TOTAL_VALUE;
      return (
        <div className="bg-card border border-subtle p-3 rounded-lg shadow-xl z-50">
          <p className="font-bold text-primary">{data.name || payload[0].name}</p>
          <p className="text-sm text-secondary">Weight: {val.toFixed(1)}%</p>
          {selectedSector && (
            <p className="text-sm text-secondary">Value: US${dollarValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          )}
          {!selectedSector && (
            <p className="text-xs text-brand mt-2">Click to drill down</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        {selectedSector ? (
          <button 
            onClick={() => setSelectedSector(null)}
            className="flex items-center text-sm text-secondary hover:text-primary transition-colors bg-subtle/30 px-3 py-1.5 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Sectors
          </button>
        ) : (
          <div className="text-sm text-secondary">Click on a sector to view holdings</div>
        )}
        {selectedSector && (
          <div className="text-sm font-bold text-primary">{selectedSector} Sector</div>
        )}
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={currentData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            content={<CustomContent />}
            isAnimationActive={false}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const PortfolioAnalysis = () => {
  const [activeTab, setActiveTab] = useState('Past Performance');
  const tabs = ['Valuation', 'Future Growth', 'Past Performance', 'Financial Health', 'Dividends'];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-6">Key Metrics & Benchmarks</h2>
        
        <div className="flex space-x-6 border-b border-subtle mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab ? 'text-brand' : 'text-secondary hover:text-primary'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 bg-card border border-subtle rounded-full flex items-center justify-center text-primary hover:bg-subtle z-10 shadow-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
            {activeTab === 'Valuation' && (
              <>
                {/* Future Cash Flow Value */}
                <div className="w-80 flex-shrink-0 snap-start">
                  <div className="bg-card rounded-xl border border-subtle p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-bold text-primary">Future Cash Flow Value</h3>
                      <Info className="w-4 h-4 text-secondary cursor-pointer" />
                    </div>
                    <p className="text-xs text-secondary mb-6">1 holding excluded due to missing data.</p>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-center mb-4">
                        <span className="text-xl font-bold text-green-500">22.5%</span>
                        <div className="text-sm text-green-500">Undervalued</div>
                      </div>
                      
                      <div className="relative h-32 flex items-end overflow-hidden rounded-lg">
                        {/* Left Bar (Cash Flow Value) */}
                        <div className="w-1/2 h-full bg-green-500 relative flex items-end p-3">
                          <div className="text-white">
                            <div className="text-xs font-medium">Cash Flow Value</div>
                            <div className="text-sm font-bold">US$397.23k</div>
                          </div>
                        </div>
                        
                        {/* Right Bar (Total Value) */}
                        <div className="w-1/2 h-[77.5%] flex flex-col relative">
                          <div className="h-[22.5%] bg-red-500 w-full"></div>
                          <div className="flex-1 bg-yellow-500 w-full flex items-center p-3">
                            <div className="text-white">
                              <div className="text-xs font-medium">Total Value</div>
                              <div className="text-sm font-bold">US$307.73k</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Price to Earnings"
                    value={26}
                    secondaryValue={18.4}
                    min={0}
                    max={60}
                    ranges={[
                      { min: 0, max: 20, color: '#10B981' },
                      { min: 20, max: 30, color: '#F59E0B' },
                      { min: 30, max: 50, color: '#F97316' },
                      { min: 50, max: 60, color: '#EF4444' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="26x"
                    secondaryLabel="US Market"
                    secondaryValueLabel="18.4x"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Price to Sales"
                    value={4.7}
                    secondaryValue={2.2}
                    min={0}
                    max={20}
                    ranges={[
                      { min: 0, max: 5, color: '#10B981' },
                      { min: 5, max: 10, color: '#F59E0B' },
                      { min: 10, max: 15, color: '#F97316' },
                      { min: 15, max: 20, color: '#EF4444' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="4.7x"
                    secondaryLabel="US Market"
                    secondaryValueLabel="2.2x"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Price to Expected Growth"
                    value={3.5}
                    secondaryValue={1.5}
                    min={0}
                    max={4}
                    ranges={[
                      { min: 0, max: 1, color: '#10B981' },
                      { min: 1, max: 2, color: '#F59E0B' },
                      { min: 2, max: 3, color: '#F97316' },
                      { min: 3, max: 4, color: '#EF4444' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="3.5x"
                    secondaryLabel="US Market"
                    secondaryValueLabel="1.5x"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Price to Book"
                    value={3.9}
                    secondaryValue={1.6}
                    min={0}
                    max={20}
                    ranges={[
                      { min: 0, max: 5, color: '#10B981' },
                      { min: 5, max: 10, color: '#F59E0B' },
                      { min: 10, max: 15, color: '#F97316' },
                      { min: 15, max: 20, color: '#EF4444' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="3.9x"
                    secondaryLabel="US Market"
                    secondaryValueLabel="1.6x"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Price to Free Cash Flow"
                    value={18.5}
                    secondaryValue={22.1}
                    min={0}
                    max={50}
                    ranges={[
                      { min: 0, max: 15, color: '#10B981' },
                      { min: 15, max: 25, color: '#F59E0B' },
                      { min: 25, max: 35, color: '#F97316' },
                      { min: 35, max: 50, color: '#EF4444' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="18.5x"
                    secondaryLabel="US Market"
                    secondaryValueLabel="22.1x"
                  />
                </div>
              </>
            )}

            {activeTab === 'Future Growth' && (
              <>
                <div className="w-80 flex-shrink-0 snap-start">
                  <BarComparisonChart 
                    title="Annual Earnings Growth vs Market"
                    data={[
                      { name: 'Past Average', portfolio: 19.4, market: 8.3 },
                      { name: 'Future Average', portfolio: 9.0, market: 15.7 }
                    ]}
                    primaryLabel="Portfolio"
                    secondaryLabel="US Market"
                  />
                </div>
                
                <div className="w-80 flex-shrink-0 snap-start">
                  <BarComparisonChart 
                    title="Annual Revenue Growth vs Market"
                    data={[
                      { name: 'Past Average', portfolio: 14.9, market: 12.3 },
                      { name: 'Future Average', portfolio: 12.9, market: 10.5 }
                    ]}
                    primaryLabel="Portfolio"
                    secondaryLabel="US Market"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <BarComparisonChart 
                    title="EPS Growth vs Market"
                    data={[
                      { name: 'Past Average', portfolio: 15.6, market: 16.7 },
                      { name: 'Future Average', portfolio: 11.5, market: 16.2 }
                    ]}
                    primaryLabel="Portfolio"
                    secondaryLabel="US Market"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <BarComparisonChart 
                    title="ROE Forecast vs Market"
                    data={[
                      { name: 'Current ROE', portfolio: 14.4, market: 11.4 },
                      { name: 'Future ROE (3Y)', portfolio: 18.2, market: 12.5 }
                    ]}
                    primaryLabel="Portfolio"
                    secondaryLabel="US Market"
                  />
                </div>
              </>
            )}

            {activeTab === 'Past Performance' && (
              <>
                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Return on Equity"
                    value={14.4}
                    secondaryValue={11.4}
                    min={0}
                    max={40}
                    ranges={[
                      { min: 0, max: 10, color: '#F97316' },
                      { min: 10, max: 20, color: '#F59E0B' },
                      { min: 20, max: 40, color: '#10B981' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="14.4%"
                    secondaryLabel="US Market"
                    secondaryValueLabel="11.4%"
                  />
                </div>
                
                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Return on Capital Employed"
                    value={7.9}
                    secondaryValue={9.3}
                    min={0}
                    max={30}
                    ranges={[
                      { min: 0, max: 5, color: '#EF4444' },
                      { min: 5, max: 10, color: '#F97316' },
                      { min: 10, max: 15, color: '#F59E0B' },
                      { min: 15, max: 30, color: '#10B981' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="7.9%"
                    secondaryLabel="US Market"
                    secondaryValueLabel="9.3%"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Return on Assets"
                    value={15.1}
                    secondaryValue={4.8}
                    min={0}
                    max={10}
                    ranges={[
                      { min: 0, max: 2, color: '#EF4444' },
                      { min: 2, max: 4, color: '#F97316' },
                      { min: 4, max: 6, color: '#F59E0B' },
                      { min: 6, max: 10, color: '#10B981' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="15.1%"
                    secondaryLabel="US Market"
                    secondaryValueLabel="4.8%"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <BarComparisonChart 
                    title="Historical Earnings Growth (5Y)"
                    data={[
                      { name: '1Y Growth', portfolio: 22.4, market: 14.2 },
                      { name: '3Y Avg', portfolio: 18.5, market: 11.8 },
                      { name: '5Y Avg', portfolio: 15.2, market: 9.5 }
                    ]}
                    primaryLabel="Portfolio"
                    secondaryLabel="US Market"
                  />
                </div>
              </>
            )}

            {activeTab === 'Financial Health' && (
              <>
                <div className="w-80 flex-shrink-0 snap-start">
                  <div className="bg-card rounded-xl border border-subtle p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-sm font-bold text-primary">Net Debt to Equity vs Market</h3>
                      <Info className="w-4 h-4 text-secondary cursor-pointer" />
                    </div>
                    
                    <div className="flex-1 flex items-end justify-center space-x-4">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-primary mb-2">124.3%</span>
                        <div className="w-24 bg-[#38BDF8] rounded-t-sm" style={{ height: '160px' }}>
                          <div className="text-white text-xs font-medium p-2">Portfolio</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-primary mb-2">85.8%</span>
                        <div className="w-24 bg-[#2DD4BF] rounded-t-sm" style={{ height: '110px' }}>
                          <div className="text-white text-xs font-medium p-2">US Market</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center font-bold text-primary">Net Debt To Equity Ratio</div>
                  </div>
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Debt to Equity"
                    value={145.2}
                    secondaryValue={110.5}
                    min={0}
                    max={250}
                    ranges={[
                      { min: 0, max: 40, color: '#10B981' },
                      { min: 40, max: 80, color: '#F59E0B' },
                      { min: 80, max: 150, color: '#F97316' },
                      { min: 150, max: 250, color: '#EF4444' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="145.2%"
                    secondaryLabel="US Market"
                    secondaryValueLabel="110.5%"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Interest Coverage Ratio"
                    value={12.4}
                    secondaryValue={8.2}
                    min={0}
                    max={20}
                    ranges={[
                      { min: 0, max: 1.5, color: '#EF4444' },
                      { min: 1.5, max: 3, color: '#F97316' },
                      { min: 3, max: 5, color: '#F59E0B' },
                      { min: 5, max: 20, color: '#10B981' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="12.4x"
                    secondaryLabel="US Market"
                    secondaryValueLabel="8.2x"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Current Ratio"
                    value={1.8}
                    secondaryValue={1.5}
                    min={0}
                    max={5}
                    ranges={[
                      { min: 0, max: 1, color: '#EF4444' },
                      { min: 1, max: 1.5, color: '#F59E0B' },
                      { min: 1.5, max: 3, color: '#10B981' },
                      { min: 3, max: 5, color: '#38BDF8' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="1.8x"
                    secondaryLabel="US Market"
                    secondaryValueLabel="1.5x"
                  />
                </div>
              </>
            )}

            {activeTab === 'Dividends' && (
              <>
                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Dividend Yield"
                    value={1.5}
                    secondaryValue={4.4}
                    min={0}
                    max={8}
                    ranges={[
                      { min: 0, max: 2, color: '#EF4444' },
                      { min: 2, max: 4, color: '#F59E0B' },
                      { min: 4, max: 8, color: '#10B981' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="1.5%"
                    secondaryLabel="US Market"
                    secondaryValueLabel="4.4%"
                  />
                </div>
                
                <div className="w-80 flex-shrink-0 snap-start">
                  <GaugeChart 
                    title="Dividend Growth Rate"
                    value={3.2}
                    secondaryValue={8.9}
                    min={0}
                    max={40}
                    ranges={[
                      { min: 0, max: 10, color: '#EF4444' },
                      { min: 10, max: 20, color: '#F59E0B' },
                      { min: 20, max: 40, color: '#10B981' }
                    ]}
                    primaryLabel="Portfolio"
                    primaryValue="3.2%"
                    secondaryLabel="US Market"
                    secondaryValueLabel="8.9%"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <DonutChart 
                    title="Payout Ratios"
                    data={[
                      { name: 'Paid as dividend', value: 41, color: '#38BDF8' },
                      { name: 'Earnings retained', value: 59, color: '#4B5563' }
                    ]}
                    centerText="41%"
                  />
                </div>

                <div className="w-80 flex-shrink-0 snap-start">
                  <DonutChart 
                    title="Cash Payout Ratios"
                    data={[
                      { name: 'Paid as dividend', value: 35, color: '#10B981' },
                      { name: 'Cash retained', value: 65, color: '#4B5563' }
                    ]}
                    centerText="35%"
                  />
                </div>
              </>
            )}
          </div>

          {/* Right Arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 bg-card border border-subtle rounded-full flex items-center justify-center text-primary hover:bg-subtle z-10 shadow-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Diversification Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-primary mb-8">Diversification</h2>
        
        <div className="space-y-8">
          {/* Diversification across Industries */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <h3 className="text-lg font-bold text-primary">Diversification across Industries</h3>
              <Info className="w-4 h-4 text-secondary cursor-pointer" />
            </div>
            
            <div className="bg-card rounded-xl border border-subtle p-6 h-[400px] flex items-center justify-center">
              <IndustryTreemap />
            </div>
          </div>

          {/* Donut Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Diversification across Holdings */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <h3 className="text-lg font-bold text-primary">Diversification across Holdings</h3>
                <Info className="w-4 h-4 text-secondary cursor-pointer" />
              </div>
              <div className="bg-card rounded-xl border border-subtle p-6 h-[300px] flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'META', value: 16.5, color: '#1D4ED8' },
                        { name: 'BATS', value: 12.7, color: '#2563EB' },
                        { name: 'TSLA', value: 12.0, color: '#3B82F6' },
                        { name: 'XOM', value: 9.6, color: '#0F766E' },
                        { name: 'BAC', value: 8.6, color: '#0D9488' },
                        { name: 'CRWD', value: 6.7, color: '#14B8A6' },
                        { name: 'GEV', value: 6.3, color: '#4338CA' },
                        { name: 'IREN', value: 6.3, color: '#4F46E5' },
                        { name: 'PLTR', value: 4.7, color: '#B45309' },
                        { name: 'JPM', value: 4.3, color: '#D97706' },
                        { name: 'AMZN', value: 3.6, color: '#475569' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {
                        [
                          { name: 'META', value: 16.5, color: '#1D4ED8' },
                          { name: 'BATS', value: 12.7, color: '#2563EB' },
                          { name: 'TSLA', value: 12.0, color: '#3B82F6' },
                          { name: 'XOM', value: 9.6, color: '#0F766E' },
                          { name: 'BAC', value: 8.6, color: '#0D9488' },
                          { name: 'CRWD', value: 6.7, color: '#14B8A6' },
                          { name: 'GEV', value: 6.3, color: '#4338CA' },
                          { name: 'IREN', value: 6.3, color: '#4F46E5' },
                          { name: 'PLTR', value: 4.7, color: '#B45309' },
                          { name: 'JPM', value: 4.3, color: '#D97706' },
                          { name: 'AMZN', value: 3.6, color: '#475569' },
                        ].map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))
                      }
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-primary">META</span>
                  <span className="text-lg font-bold text-primary">16.5%</span>
                  <div className="text-xs text-secondary mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    <span>Value</span><span className="text-primary font-medium">US$54k</span>
                    <span>1Y</span><span className="text-green-500 font-medium">8.0%</span>
                    <span>7D</span><span className="text-red-500 font-medium">-1.0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Diversification by Geography */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <h3 className="text-lg font-bold text-primary">Revenue Diversification by Geography</h3>
                <Info className="w-4 h-4 text-secondary cursor-pointer" />
              </div>
              <div className="bg-card rounded-xl border border-subtle p-6 h-[300px] flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'North America', value: 44.4, color: '#1D4ED8' },
                        { name: 'Rest of the World', value: 27.1, color: '#0F766E' },
                        { name: 'Asia-Pacific', value: 17.7, color: '#B45309' },
                        { name: 'Europe', value: 8.0, color: '#475569' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {
                        [
                          { name: 'North America', value: 44.4, color: '#1D4ED8' },
                          { name: 'Rest of the World', value: 27.1, color: '#0F766E' },
                          { name: 'Asia-Pacific', value: 17.7, color: '#B45309' },
                          { name: 'Europe', value: 8.0, color: '#475569' },
                        ].map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))
                      }
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-lg font-bold text-primary">Rest of the...</span>
                  <span className="text-xs text-secondary mt-1">PLTR, META...</span>
                  <button className="mt-4 px-4 py-1.5 bg-yellow-500/20 text-yellow-500 rounded-lg text-xs font-bold pointer-events-auto hover:bg-yellow-500/30 transition-colors">
                    View all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
