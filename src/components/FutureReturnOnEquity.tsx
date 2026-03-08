import React, { useState } from 'react';
import { CheckCircle2, Info, X, ExternalLink } from 'lucide-react';

// Tooltip component for the dotted underline text
const TooltipText = ({ text, tooltip }: { text: string, tooltip: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="border-b border-dashed border-subtle pb-[1px]">{text}</span>
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-card text-primary text-sm rounded shadow-lg font-sans">
          {tooltip}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-card"></div>
        </div>
      )}
    </span>
  );
};

const GaugeChart = ({ companyValue, industryValue }: { companyValue: number, industryValue: number }) => {
  const radius = 80;
  const cx = 100;
  const cy = 100;
  const strokeWidth = 8;

  // Helper to calculate SVG arc path
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Max value is 40%
  const maxVal = 40;
  const valueToAngle = (val: number) => (val / maxVal) * 180;

  // Arcs
  const redArc = describeArc(cx, cy, radius, 0, valueToAngle(10));
  const yellowArc = describeArc(cx, cy, radius, valueToAngle(10), valueToAngle(20));
  const greenArc = describeArc(cx, cy, radius, valueToAngle(20), 180);

  // Needles
  const companyAngle = valueToAngle(companyValue);
  const industryAngle = valueToAngle(industryValue);

  const companyNeedle = polarToCartesian(cx, cy, radius - 5, companyAngle);
  const industryNeedle = polarToCartesian(cx, cy, radius - 20, industryAngle);

  // Inner track for industry
  const innerRadius = radius - 16;
  const industryTrackBg = describeArc(cx, cy, innerRadius, 0, 180);
  const industryTrackFill = describeArc(cx, cy, innerRadius, 0, industryAngle);

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg viewBox="0 0 200 115" className="w-full h-auto">
        {/* Outer Arcs */}
        <path d={redArc} fill="none" stroke="#b91c1c" strokeWidth={strokeWidth} strokeLinecap="butt" />
        <path d={yellowArc} fill="none" stroke="#eab308" strokeWidth={strokeWidth} strokeLinecap="butt" />
        <path d={greenArc} fill="none" stroke="#22c55e" strokeWidth={strokeWidth} strokeLinecap="butt" />

        {/* Inner track for industry */}
        <path d={industryTrackBg} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} strokeLinecap="butt" />
        <path d={industryTrackFill} fill="none" stroke="#134e4a" strokeWidth={strokeWidth} strokeLinecap="butt" />

        {/* Industry Needle */}
        <line x1={cx} y1={cy} x2={industryNeedle.x} y2={industryNeedle.y} stroke="#2dd4bf" strokeWidth={4} strokeLinecap="round" />
        
        {/* Company Needle */}
        <line x1={cx} y1={cy} x2={companyNeedle.x} y2={companyNeedle.y} stroke="#3b82f6" strokeWidth={4} strokeLinecap="round" />

        {/* Center Pivot */}
        <circle cx={cx} cy={cy} r={6} fill="#f3f4f6" stroke="#9ca3af" strokeWidth={2} />

        {/* Labels */}
        <text x={10} y={105} fill="#374151" fontSize="8" fontWeight="bold">0%</text>
        <text x={35} y={45} fill="#374151" fontSize="8" fontWeight="bold">10.0%</text>
        <text x={100} y={10} fill="#374151" fontSize="8" fontWeight="bold" textAnchor="middle">20.0%</text>
        <text x={165} y={45} fill="#374151" fontSize="8" fontWeight="bold">30.0%</text>
        <text x={190} y={105} fill="#374151" fontSize="8" fontWeight="bold" textAnchor="end">40.0%</text>
      </svg>

      {/* Legend */}
      <div className="mt-0 text-center">
        <h4 className="text-primary font-bold text-sm mb-2">Future ROE (3yrs)</h4>
        <div className="inline-flex flex-col text-xs space-y-1 text-left">
          <div className="flex justify-between w-32">
            <span className="text-[#3b82f6] font-medium">Company</span>
            <span className="text-[#3b82f6] font-bold">{companyValue.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between w-32">
            <span className="text-[#2dd4bf] font-medium">Industry</span>
            <span className="text-secondary font-bold">{industryValue.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function FutureReturnOnEquity() {
  const [showLearnModal, setShowLearnModal] = useState(false);
  const companyROE = 20.8;
  const industryROE = 15.7;

  return (
    <div className="mb-16" id="section_2_4">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">2.4 Future Return on Equity</h2>
        </div>
        <button 
          onClick={() => setShowLearnModal(true)}
          className="btn-interactive flex items-center space-x-2 bg-brand hover:bg-brand/90 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-sm"
        >
          <Info className="w-4 h-4" />
          <span>Learn</span>
        </button>
      </div>

      <div className="bg-card rounded-xl p-8 border border-subtle shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          
          {/* Gauge Chart */}
          <div className="w-full md:w-1/2 flex justify-center">
            <GaugeChart companyValue={companyROE} industryValue={industryROE} />
          </div>

          {/* Audit Summary */}
          <div className="w-full md:w-1/2">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-bullish flex-shrink-0 mt-0.5" />
              <p className="text-secondary text-lg leading-relaxed">
                <span className="text-bullish font-medium">Future ROE: </span>
                MBB's <TooltipText text="Return on Equity" tooltip="A profitability measure which show how efficiently a company's management team has used it's shareholders money to generate profits" /> is forecast to be high in 3 years time ({companyROE}%)
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Learn Modal */}
      {showLearnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-subtle rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-subtle">
              <h3 className="text-xl font-bold text-primary">Future Return on Equity</h3>
              <button onClick={() => setShowLearnModal(false)} className="text-secondary hover:text-secondary transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 text-secondary space-y-4">
              <p>
                <strong>Return on Equity (ROE)</strong> is a measure of a company's profitability that reveals how much profit a company generates with the money shareholders have invested.
              </p>
              <p>
                A high forecast ROE indicates that the company is expected to be efficient at generating profits from its equity base in the future. This is a positive signal for growth investors, as it suggests the company can reinvest its earnings effectively to drive further growth.
              </p>
              <div className="mt-8 pt-6 border-t border-subtle text-sm text-secondary">
                For a more detailed breakdown of Future ROE calculations, please check out our <a href="#" className="text-bullish hover:text-bullish font-medium inline-flex items-center">Help Centre <ExternalLink className="w-3 h-3 ml-1" /></a>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
