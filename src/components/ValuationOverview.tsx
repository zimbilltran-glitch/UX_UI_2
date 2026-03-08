import React from 'react';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const mockSummary = {
  score: "5/5",
  checks: [
    { label: "Below Future Cash Flow Value", status: "pass", target_id: "section_1_1" },
    { label: "Significantly Below Future Cash Flow Value", status: "pass", target_id: "section_1_1" },
    { label: "Price-To-Earnings vs Peers", status: "pass", target_id: "section_1_3" },
    { label: "Price-To-Earnings vs Industry", status: "pass", target_id: "section_1_5" },
    { label: "Price-To-Earnings vs Fair Ratio", status: "pass", target_id: "section_1_6" }
  ]
};

const snowflakeData = [
  { subject: 'VALUE', A: 80, fullMark: 100 },
  { subject: 'FUTURE', A: 65, fullMark: 100 },
  { subject: 'PAST', A: 70, fullMark: 100 },
  { subject: 'HEALTH', A: 90, fullMark: 100 },
  { subject: 'DIVIDEND', A: 50, fullMark: 100 },
];

export const ValuationOverview = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const mainContainer = document.querySelector('main');
    
    if (element && mainContainer) {
      // Calculate the element's position relative to the main scroll container
      const elementRect = element.getBoundingClientRect();
      const mainRect = mainContainer.getBoundingClientRect();
      
      // Scroll with a 32px offset for breathing room at the top
      const scrollTop = mainContainer.scrollTop + (elementRect.top - mainRect.top) - 32;
      
      mainContainer.scrollTo({ top: scrollTop, behavior: 'smooth' });
    } else if (element) {
      // Fallback if main container is not found
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="mb-12 font-sans" id="section_1_0">
      <h1 className="text-3xl font-bold text-primary mb-2">1 Valuation</h1>
      <p className="text-secondary mb-6">
        Is MBB undervalued compared to its fair value and its price relative to the market?
      </p>

      <div className="bg-card rounded-xl p-8 border border-subtle flex flex-col md:flex-row shadow-lg">
        {/* Left Column: Checklist */}
        <div className="w-full md:w-3/5 pr-0 md:pr-8 mb-8 md:mb-0">
          <h3 className="text-xl font-bold text-primary mb-6">Valuation Score {mockSummary.score}</h3>
          <div className="space-y-2">
            {mockSummary.checks.map((check, index) => (
              <div 
                key={index}
                onClick={() => scrollToSection(check.target_id)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-subtle cursor-pointer transition-colors group"
              >
                <div className="flex items-center">
                  {check.status === 'pass' ? (
                    <CheckCircle2 className="w-5 h-5 text-bullish mr-3 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-bearish mr-3 flex-shrink-0" />
                  )}
                  <span className="text-secondary font-medium group-hover:text-primary transition-colors">
                    {check.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-secondary group-hover:text-secondary transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Radar Chart */}
        <div className="w-full md:w-2/5 flex items-center justify-center relative">
          <div className="w-full max-w-[300px] aspect-square">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={snowflakeData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="MBB"
                  dataKey="A"
                  stroke="#84cc16"
                  strokeWidth={2}
                  fill="#84cc16"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
