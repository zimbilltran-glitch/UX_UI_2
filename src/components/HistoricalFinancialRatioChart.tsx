import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, Database, MoreHorizontal, Star, Info, X } from 'lucide-react';
import { colors } from '../theme/colors';

const mockData = {
  ticker: "MBB",
  companyName: "Military Commercial Bank",
  data_types: ["Price to Earnings", "Price to Book", "Price to Sales"],
  historical_data: {
    "Price to Earnings": {
      explanation: "Historical Price to Earnings Ratio compares a stock's price to its earnings over time. Higher ratios indicate that investors are willing to pay more for the stock.",
      chart_data: [
        { date: "Jan 01 2021", year: "2021", value: 6.5 },
        { date: "Mar 01 2021", year: "", value: 9.0 },
        { date: "Jun 01 2021", year: "", value: 11.2 },
        { date: "Sep 01 2021", year: "", value: 9.5 },
        { date: "Jan 01 2022", year: "2022", value: 8.5 },
        { date: "Mar 01 2022", year: "", value: 8.8 },
        { date: "Jun 01 2022", year: "", value: 9.1 },
        { date: "Sep 01 2022", year: "", value: 6.5 },
        { date: "Jan 01 2023", year: "2023", value: 5.2 },
        { date: "Mar 01 2023", year: "", value: 4.5 },
        { date: "Jun 01 2023", year: "", value: 4.8 },
        { date: "Sep 01 2023", year: "", value: 5.5 },
        { date: "Jan 01 2024", year: "2024", value: 5.5 },
        { date: "Mar 01 2024", year: "", value: 4.8 },
        { date: "Jun 01 2024", year: "", value: 7.2 },
        { date: "Sep 01 2024", year: "", value: 6.0 },
        { date: "Jan 01 2025", year: "2025", value: 6.1 },
        { date: "Mar 01 2025", year: "", value: 5.8 },
        { date: "Jun 01 2025", year: "", value: 6.8 },
        { date: "Sep 01 2025", year: "", value: 6.5 },
        { date: "Jan 01 2026", year: "2026", value: 8.0 },
        { date: "Mar 06 2026", year: "", value: 8.0 }
      ]
    },
    "Price to Book": {
      explanation: "Historical Price to Book Ratio compares a stock's price to the book value of its equity over time. Higher ratios indicate that investors are willing to pay more for the stock.",
      chart_data: [
        { date: "Jan 01 2021", year: "2021", value: 1.2 },
        { date: "Mar 01 2021", year: "", value: 1.8 },
        { date: "Jun 01 2021", year: "", value: 2.1 },
        { date: "Sep 01 2021", year: "", value: 1.7 },
        { date: "Jan 01 2022", year: "2022", value: 1.6 },
        { date: "Mar 01 2022", year: "", value: 1.65 },
        { date: "Jun 01 2022", year: "", value: 1.7 },
        { date: "Sep 01 2022", year: "", value: 1.2 },
        { date: "Jan 01 2023", year: "2023", value: 1.0 },
        { date: "Mar 01 2023", year: "", value: 0.8 },
        { date: "Jun 01 2023", year: "", value: 0.9 },
        { date: "Sep 01 2023", year: "", value: 1.0 },
        { date: "Jan 01 2024", year: "2024", value: 1.1 },
        { date: "Mar 01 2024", year: "", value: 0.9 },
        { date: "Jun 01 2024", year: "", value: 1.4 },
        { date: "Sep 01 2024", year: "", value: 1.1 },
        { date: "Jan 01 2025", year: "2025", value: 1.2 },
        { date: "Mar 01 2025", year: "", value: 1.1 },
        { date: "Jun 01 2025", year: "", value: 1.3 },
        { date: "Sep 01 2025", year: "", value: 1.2 },
        { date: "Jan 01 2026", year: "2026", value: 1.6 },
        { date: "Mar 06 2026", year: "", value: 1.5 }
      ]
    },
    "Price to Sales": {
      explanation: "Historical Price to Sales Ratio compares a stock's price to its revenues over time. Higher ratios indicate that investors are willing to pay more for the stock.",
      chart_data: [
        { date: "Jan 01 2021", year: "2021", value: 2.2 },
        { date: "Mar 01 2021", year: "", value: 2.9 },
        { date: "Jun 01 2021", year: "", value: 3.5 },
        { date: "Sep 01 2021", year: "", value: 3.0 },
        { date: "Jan 01 2022", year: "2022", value: 2.8 },
        { date: "Mar 01 2022", year: "", value: 2.9 },
        { date: "Jun 01 2022", year: "", value: 3.0 },
        { date: "Sep 01 2022", year: "", value: 2.1 },
        { date: "Jan 01 2023", year: "2023", value: 1.8 },
        { date: "Mar 01 2023", year: "", value: 1.5 },
        { date: "Jun 01 2023", year: "", value: 1.6 },
        { date: "Sep 01 2023", year: "", value: 1.7 },
        { date: "Jan 01 2024", year: "2024", value: 1.9 },
        { date: "Mar 01 2024", year: "", value: 1.6 },
        { date: "Jun 01 2024", year: "", value: 2.4 },
        { date: "Sep 01 2024", year: "", value: 2.0 },
        { date: "Jan 01 2025", year: "2025", value: 2.1 },
        { date: "Mar 01 2025", year: "", value: 1.9 },
        { date: "Jun 01 2025", year: "", value: 2.3 },
        { date: "Sep 01 2025", year: "", value: 2.1 },
        { date: "Jan 01 2026", year: "2026", value: 2.7 },
        { date: "Mar 06 2026", year: "", value: 2.6 }
      ]
    }
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-subtle p-3 rounded-xl shadow-lg w-full max-w-[250px] sm:min-w-[250px]">
        <p className="text-primary font-bold text-sm mb-1">{payload[0].payload.date}</p>
        <div className="flex justify-between items-center">
          <p className="text-secondary text-sm">{mockData.companyName}</p>
          <p className="text-brand font-bold text-sm font-mono">{payload[0].value.toFixed(1)}x</p>
        </div>
      </div>
    );
  }
  return null;
};

export const HistoricalFinancialRatioChart = () => {
  const [selectedMetric, setSelectedMetric] = useState("Price to Earnings");
  const [selectedTimeframe, setSelectedTimeframe] = useState("5Y");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  
  const currentData = mockData.historical_data[selectedMetric as keyof typeof mockData.historical_data];
  
  // Calculate max Y for the chart domain to make it look like the screenshot
  const maxY = Math.max(...currentData.chart_data.map(d => d.value));
  const yAxisMax = Math.ceil(maxY * 1.2); // Add some padding

  return (
    <div className="mb-12 font-sans">
      <h2 className="text-2xl font-bold text-primary mb-4">
        1.4 Historical {selectedMetric} Ratio
      </h2>
      <p className="text-secondary mb-6 leading-relaxed">
        {currentData.explanation}
      </p>

      <div className="surface-card p-6">
        {/* Top Controls */}
      <div className="flex justify-between items-center mb-6 relative z-20">
        {/* Dropdown */}
        <div className="relative">
          <button 
            className="flex items-center px-4 py-2 bg-card hover:bg-subtle text-primary text-sm font-semibold rounded-xl border border-subtle transition-colors shadow-sm"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Star className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" />
            {selectedMetric}
            <ChevronDown className="w-4 h-4 ml-2 text-secondary" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-subtle rounded-xl shadow-xl overflow-hidden">
              {mockData.data_types.map((metric) => (
                <button
                  key={metric}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${selectedMetric === metric ? 'bg-base text-primary font-semibold' : 'text-secondary hover:bg-subtle hover:text-primary'}`}
                  onClick={() => {
                    setSelectedMetric(metric);
                    setIsDropdownOpen(false);
                  }}
                >
                  {metric}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Time Selector */}
        <div className="flex space-x-1">
          {['3M', '6M', '1Y', '3Y', '5Y'].map((time) => (
            <button
              key={time}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                selectedTimeframe === time 
                  ? 'bg-base text-primary' 
                  : 'text-secondary hover:text-primary'
              }`}
              onClick={() => setSelectedTimeframe(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-[350px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={currentData.chart_data}
            margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.brandPrimary} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={colors.brandPrimary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.borderSubtle} />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: colors.textSecondary, fontSize: 12, fontWeight: 600, fontFamily: 'JetBrains Mono' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: colors.textSecondary, fontSize: 12, fontWeight: 600, fontFamily: 'JetBrains Mono' }}
              domain={[0, yAxisMax]}
              ticks={[0, parseFloat((yAxisMax / 2).toFixed(1)), yAxisMax]}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: colors.textSecondary, strokeWidth: 1, strokeDasharray: '4 4' }}
              isAnimationActive={false}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={colors.brandPrimary} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              activeDot={{ r: 6, fill: colors.bgCard, stroke: colors.brandPrimary, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-between items-center mt-6">
        {/* Legend */}
        <div className="flex items-center px-3 py-1.5 bg-base rounded-lg border border-subtle w-fit">
          <div className="w-2.5 h-2.5 rounded-full bg-brand mr-2"></div>
          <span className="text-secondary text-xs font-semibold">HOSE:MBB</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="btn-interactive flex items-center px-3 py-1.5 bg-card hover:bg-subtle text-secondary text-sm font-semibold rounded-lg border border-subtle transition-colors shadow-sm">
            <Database className="w-4 h-4 mr-2" />
            Data
          </button>
          <button 
            onClick={() => setIsLearnModalOpen(true)}
            className="btn-interactive flex items-center px-3 py-1.5 bg-card hover:bg-subtle text-secondary text-sm font-semibold rounded-lg border border-subtle transition-colors shadow-sm"
          >
            <Info className="w-4 h-4 mr-2" />
            Learn
          </button>
          <button className="btn-interactive flex items-center px-3 py-1.5 bg-card hover:bg-subtle text-secondary rounded-lg border border-subtle transition-colors shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      </div>

      {/* Learn Modal */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-card rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-subtle">
            <div className="flex justify-between items-center p-6 border-b border-subtle">
              <h3 className="text-2xl font-bold text-primary">Historical {selectedMetric} Ratio</h3>
              <button onClick={() => setIsLearnModalOpen(false)} className="text-secondary hover:text-secondary">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-secondary space-y-6 text-base leading-relaxed">
              <p>The Historical {selectedMetric} Ratio chart helps you visualize how the market has valued the company over time. By looking at the historical trend, you can identify whether the current valuation is relatively high or low compared to its own past.</p>
              <p>A ratio that is significantly lower than its historical average might indicate that the stock is undervalued, assuming the company's fundamentals haven't deteriorated. Conversely, a ratio much higher than its historical average could suggest overvaluation.</p>
              <p className="pt-2">For more information on how to interpret historical financial ratios, please check out our <a href="#" className="text-brand hover:text-brand underline decoration-blue-600/30 underline-offset-4 transition-colors">Help Centre</a>.</p>
            </div>
            <div className="p-4 border-t border-subtle flex justify-end">
              <button 
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-2 bg-primary text-base hover:opacity-90 font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
