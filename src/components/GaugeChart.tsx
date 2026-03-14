import React from 'react';

interface GaugeChartProps {
  title: string;
  companyLabel?: string;
  industryLabel?: string;
  companyValue: number | null;
  industryValue: number | null;
  maxValue: number;
  redThreshold: number;
  yellowThreshold: number;
  ticks: number[];
  formatValue?: (val: number | null) => string;
}

export const GaugeChart = ({ 
  title, 
  companyLabel = 'Company', 
  industryLabel = 'Industry', 
  companyValue, 
  industryValue, 
  maxValue, 
  redThreshold, 
  yellowThreshold, 
  ticks,
  formatValue = (val) => val === null ? 'n/a' : `${val.toFixed(1)}%`
}: GaugeChartProps) => {
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

  const valueToAngle = (val: number) => (Math.min(val, maxValue) / maxValue) * 180;

  // Arcs
  const redArc = describeArc(cx, cy, radius, 0, valueToAngle(redThreshold));
  const yellowArc = describeArc(cx, cy, radius, valueToAngle(redThreshold), valueToAngle(yellowThreshold));
  const greenArc = describeArc(cx, cy, radius, valueToAngle(yellowThreshold), 180);

  // Inner track for industry
  const innerRadius = radius - 16;
  const industryTrackBg = describeArc(cx, cy, innerRadius, 0, 180);
  const industryTrackFill = industryValue !== null ? describeArc(cx, cy, innerRadius, 0, valueToAngle(industryValue)) : '';

  // Needles
  const companyAngle = companyValue !== null ? valueToAngle(companyValue) : null;
  const industryAngle = industryValue !== null ? valueToAngle(industryValue) : null;

  const companyNeedle = companyAngle !== null ? polarToCartesian(cx, cy, radius - 5, companyAngle) : null;
  const industryNeedle = industryAngle !== null ? polarToCartesian(cx, cy, radius - 20, industryAngle) : null;

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg viewBox="0 0 200 115" className="w-full h-auto">
        {/* Outer Arcs */}
        <path d={redArc} fill="none" stroke="#b91c1c" strokeWidth={strokeWidth} strokeLinecap="butt" />
        <path d={yellowArc} fill="none" stroke="#eab308" strokeWidth={strokeWidth} strokeLinecap="butt" />
        <path d={greenArc} fill="none" stroke="#22c55e" strokeWidth={strokeWidth} strokeLinecap="butt" />

        {/* Inner track for industry */}
        <path d={industryTrackBg} fill="none" stroke="var(--border-subtle)" strokeWidth={strokeWidth} strokeLinecap="butt" />
        {industryTrackFill && <path d={industryTrackFill} fill="none" stroke="#134e4a" strokeWidth={strokeWidth} strokeLinecap="butt" />}

        {/* Industry Needle */}
        {industryNeedle && <line x1={cx} y1={cy} x2={industryNeedle.x} y2={industryNeedle.y} stroke="#2dd4bf" strokeWidth={4} strokeLinecap="round" />}
        
        {/* Company Needle */}
        {companyNeedle && <line x1={cx} y1={cy} x2={companyNeedle.x} y2={companyNeedle.y} stroke="#3b82f6" strokeWidth={4} strokeLinecap="round" />}

        {/* Center Pivot */}
        <circle cx={cx} cy={cy} r={6} fill="var(--bg-card)" stroke="var(--text-secondary)" strokeWidth={2} />

        {/* Labels */}
        {ticks.map((tick) => {
          const angle = valueToAngle(tick);
          const pos = polarToCartesian(cx, cy, radius + 15, angle);
          let textAnchor: "start" | "end" | "middle" = "middle";
          if (tick === 0) textAnchor = "start";
          if (tick === maxValue) textAnchor = "end";
          
          return (
            <text 
              key={tick}
              x={pos.x} 
              y={pos.y + 3} 
              fill="var(--text-primary)" 
              fontSize="8" 
              fontWeight="bold"
              textAnchor={textAnchor}
            >
              {tick === 0 ? '0%' : `${tick.toFixed(1)}%`}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-0 text-center">
        <h4 className="text-primary font-bold text-sm mb-2">{title}</h4>
        <div className="inline-flex flex-col text-xs space-y-1 text-left">
          <div className="flex justify-between w-32">
            <span className="text-[#3b82f6] font-medium">{companyLabel}</span>
            <span className="text-[#3b82f6] font-bold">{formatValue(companyValue)}</span>
          </div>
          <div className="flex justify-between w-32">
            <span className="text-[#2dd4bf] font-medium">{industryLabel}</span>
            <span className="text-[#2dd4bf] font-bold">{formatValue(industryValue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
