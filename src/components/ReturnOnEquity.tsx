import React from 'react';
import { XCircle, MoreHorizontal } from 'lucide-react';
import { GaugeChart } from './GaugeChart';

export function ReturnOnEquity() {
  const companyROE = 19.3;
  const industryROE = 15.7;

  return (
    <div className="mb-16" id="section_3_5">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">3.5 Return on Equity</h2>
      </div>

      <div className="bg-card rounded-xl p-8 border border-subtle shadow-lg relative">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          
          {/* Gauge Chart */}
          <div className="w-full md:w-1/2 flex justify-center">
            <GaugeChart 
              title="ROE"
              companyValue={companyROE} 
              industryValue={industryROE}
              maxValue={40}
              redThreshold={10}
              yellowThreshold={20}
              ticks={[0, 10, 20, 30, 40]}
            />
          </div>

          {/* Audit Summary */}
          <div className="w-full md:w-1/2">
            <div className="flex items-start space-x-3">
              <XCircle className="w-6 h-6 text-bearish flex-shrink-0 mt-0.5" />
              <p className="text-secondary text-lg leading-relaxed">
                <span className="text-bearish font-medium">High ROE: </span>
                MBB's <span className="border-b border-dashed border-subtle cursor-help">Return on Equity</span> (19.3%) is considered <span className="border-b border-dashed border-subtle cursor-help">low</span>.
              </p>
            </div>
          </div>

        </div>

        {/* More Options Button */}
        <div className="absolute bottom-4 right-4">
          <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
