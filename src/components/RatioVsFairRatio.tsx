import React, { useState } from 'react';
import { Database, Info, X, CheckCircle2, MoreHorizontal } from 'lucide-react';

const mockData = {
  ticker: "MBB",
  metric_name: "Price to Earnings",
  short_name: "PE",
  current_val: 8.0,
  fair_val: 10.6,
  gauge_max: 21.2,
  status_text: "good value",
  fair_ratio_definition: "The fair ratio is based on a statistical model created by Finsang to approximate an expected ratio for a company based on its growth, risk and industry factors.",
  learn_content: "Every company is unique, and professionals understand that using a rule of thumb or average ratio is only one part of valuing a company. The Finsang Fair Ratio uses thousands of data points to understand how much the market pays for growth and risk, and combines that with industry data to build the intuition that a professional with decades of experience might have."
};

export const RatioVsFairRatio = () => {
  const [showData, setShowData] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const { ticker, metric_name, short_name, current_val, fair_val, gauge_max, status_text, fair_ratio_definition, learn_content } = mockData;

  // Gauge calculations
  const cx = 200;
  const cy = 160;
  const r = 120;
  const strokeWidth = 60;

  const fairAngle = 180 - (fair_val / gauge_max) * 180;
  const fairRad = (fairAngle * Math.PI) / 180;
  const fairX = cx + r * Math.cos(fairRad);
  const fairY = cy - r * Math.sin(fairRad);

  const currentAngle = 180 - (current_val / gauge_max) * 180;
  const currentRad = (currentAngle * Math.PI) / 180;
  const currentX = cx + r * Math.cos(currentRad);
  const currentY = cy - r * Math.sin(currentRad);

  // Labels positioning
  const currentLabelX = cx + (r + 40) * Math.cos(currentRad);
  const currentLabelY = cy - (r + 40) * Math.sin(currentRad);

  const fairLabelX = cx + (r + 40) * Math.cos(fairRad);
  const fairLabelY = cy - (r + 40) * Math.sin(fairRad);

  return (
    <div className="mb-12 font-sans">
      <h2 className="text-2xl font-bold text-white mb-4">
        1.6 {metric_name} Ratio vs Fair Ratio
      </h2>
      
      <div className="text-gray-300 mb-8 relative text-base">
        What is {ticker}'s {short_name} Ratio compared to its{' '}
        <span 
          className="relative inline-block cursor-help group"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span className="border-b border-dotted border-yellow-500 text-white font-medium">Fair {short_name} Ratio?</span>
          
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-white text-gray-900 text-sm p-3 rounded-lg shadow-xl z-50 pointer-events-none">
              {fair_ratio_definition}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
            </div>
          )}
        </span>
        {' '}This is the expected {short_name} Ratio taking into account the company's forecast earnings growth, profit margins and other risk factors.
      </div>

      <div className="bg-[#1F2937] rounded-xl p-6 border border-gray-800 shadow-lg flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Left Side: Chart or Data */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {!showData ? (
            <div className="relative w-full max-w-[400px] aspect-[5/3] mt-8">
              <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                <defs>
                  <pattern id="redHatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                    <rect width="8" height="8" fill="#ef4444" fillOpacity="0.15" />
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#ef4444" strokeWidth="2" opacity="0.8" />
                  </pattern>
                </defs>

                {/* Green Arc (Good Value) */}
                <path 
                  d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${fairX} ${fairY}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={strokeWidth}
                />

                {/* Red Arc (Overvalued) */}
                <path 
                  d={`M ${fairX} ${fairY} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                  fill="none"
                  stroke="url(#redHatch)"
                  strokeWidth={strokeWidth}
                />

                {/* Fair Value Line */}
                <line 
                  x1={cx + (r - strokeWidth/2) * Math.cos(fairRad)} 
                  y1={cy - (r - strokeWidth/2) * Math.sin(fairRad)} 
                  x2={cx + (r + strokeWidth/2 + 10) * Math.cos(fairRad)} 
                  y2={cy - (r + strokeWidth/2 + 10) * Math.sin(fairRad)} 
                  stroke="#eab308" 
                  strokeWidth="3" 
                />

                {/* Needle */}
                <line 
                  x1={cx} 
                  y1={cy} 
                  x2={cx + (r + strokeWidth/2 + 5) * Math.cos(currentRad)} 
                  y2={cy - (r + strokeWidth/2 + 5) * Math.sin(currentRad)} 
                  stroke="#0ea5e9" 
                  strokeWidth="5" 
                  strokeLinecap="round"
                />
                <circle cx={cx} cy={cy} r="8" fill="#0ea5e9" />
                <circle cx={cx} cy={cy} r="3" fill="#1F2937" />

                {/* Scale Labels */}
                <text x={cx - r - strokeWidth/2 - 10} y={cy + 5} fill="#9ca3af" fontSize="12" textAnchor="end" fontWeight="500">0x</text>
                <text x={cx + r + strokeWidth/2 + 10} y={cy + 5} fill="#9ca3af" fontSize="12" textAnchor="start" fontWeight="500">{gauge_max}x</text>
                
                {/* Midpoints */}
                <text x={cx + (r + strokeWidth/2 + 15) * Math.cos(Math.PI * 0.75)} y={cy - (r + strokeWidth/2 + 15) * Math.sin(Math.PI * 0.75)} fill="#9ca3af" fontSize="12" textAnchor="end" alignmentBaseline="middle" fontWeight="500">{(gauge_max * 0.25).toFixed(1)}x</text>
                <text x={cx + (r + strokeWidth/2 + 15) * Math.cos(Math.PI * 0.25)} y={cy - (r + strokeWidth/2 + 15) * Math.sin(Math.PI * 0.25)} fill="#9ca3af" fontSize="12" textAnchor="start" alignmentBaseline="middle" fontWeight="500">{(gauge_max * 0.75).toFixed(1)}x</text>
              </svg>

              {/* HTML Labels for better styling */}
              <div 
                className="absolute flex flex-col items-center pointer-events-none"
                style={{ 
                  left: `${(currentLabelX / 400) * 100}%`, 
                  top: `${(currentLabelY / 200) * 100}%`,
                  transform: 'translate(-50%, -100%)',
                  marginTop: '-15px'
                }}
              >
                <div className="bg-[#0ea5e9] text-white px-3 py-1.5 rounded-md shadow-lg flex flex-col items-center">
                  <span className="text-xs font-medium">Current {short_name}</span>
                  <span className="text-sm font-bold">{current_val}x</span>
                </div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#0ea5e9]"></div>
              </div>

              <div 
                className="absolute flex flex-col items-center pointer-events-none"
                style={{ 
                  left: `${(fairLabelX / 400) * 100}%`, 
                  top: `${(fairLabelY / 200) * 100}%`,
                  transform: 'translate(-50%, -100%)',
                  marginTop: '-15px'
                }}
              >
                <div className="bg-[#eab308] text-gray-900 px-3 py-1.5 rounded-md shadow-lg flex flex-col items-center">
                  <span className="text-xs font-medium">Fair {short_name}</span>
                  <span className="text-sm font-bold">{fair_val}x</span>
                </div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#eab308]"></div>
              </div>
            </div>
          ) : (
            <div className="w-full mt-4">
              <table className="w-full text-sm text-left text-gray-300 border border-gray-700 rounded-lg overflow-hidden">
                <tbody>
                  <tr className="border-b border-gray-700 bg-gray-800/50">
                    <td className="px-4 py-3 font-medium text-white">Fair Ratio</td>
                    <td className="px-4 py-3 text-right"></td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 font-medium">Current {short_name} Ratio</td>
                    <td className="px-4 py-3 text-right text-white font-medium">{current_val}x</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Fair {short_name} Ratio</td>
                    <td className="px-4 py-3 text-right text-white font-medium">{fair_val}x</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 text-xs text-gray-500">
                {ticker} {short_name} Ratio vs Fair Ratio.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-8">
            <button 
              onClick={() => setShowData(!showData)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md border transition-colors ${showData ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700'}`}
            >
              <Database className="w-4 h-4 mr-2" />
              Data
            </button>
            <button 
              onClick={() => setIsLearnModalOpen(true)}
              className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-md border border-gray-700 transition-colors"
            >
              <Info className="w-4 h-4 mr-2" />
              Learn
            </button>
            <button className="flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md border border-gray-700 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Audit Summary */}
        <div className="w-full md:w-1/2 flex items-start md:mt-16">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-base text-gray-300 leading-relaxed">
            <span className="text-emerald-400 font-medium">
              {metric_name} vs Fair Ratio:
            </span>{' '}
            {ticker} is {status_text} based on its {metric_name} Ratio ({current_val}x) compared to the estimated Fair {metric_name} Ratio ({fair_val}x).
          </p>
        </div>
      </div>

      {/* Learn Modal */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Preferred Ratio vs Fair Ratio</h3>
              <button onClick={() => setIsLearnModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-gray-800 space-y-6 text-base leading-relaxed">
              <p>{learn_content}</p>
              <p className="pt-2">For a more detailed breakdown of how we compare stocks to their industry, please check out our <a href="#" className="text-[#d97706] hover:text-[#b45309] underline decoration-[#d97706]/30 underline-offset-4 transition-colors">Help Centre</a>.</p>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-2 bg-[#fde047] hover:bg-[#facc15] text-gray-900 font-medium rounded-md transition-colors"
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
