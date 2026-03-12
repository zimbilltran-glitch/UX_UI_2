import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { GaugeChart } from './GaugeChart';

export function ReturnOnAssetsCapital() {
  const companyROA = 1.7;
  const industryROA = 1.3;

  const companyROCE = null;
  const industryROCE = null;

  return (
    <div className="mb-16 flex flex-col md:flex-row gap-8">
      {/* 3.6 Return on Assets */}
      <div className="w-full md:w-1/2" id="section_3_6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">3.6 Return on Assets</h2>
        </div>

        <div className="bg-card rounded-xl p-8 border border-subtle shadow-lg relative min-h-[350px] flex items-center justify-center">
          <div className="w-full">
            <GaugeChart 
              title="ROA"
              companyValue={companyROA} 
              industryValue={industryROA}
              maxValue={10}
              redThreshold={2}
              yellowThreshold={4}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
          </div>

          {/* More Options Button */}
          <div className="absolute bottom-4 right-4">
            <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3.7 Return on Capital Employed */}
      <div className="w-full md:w-1/2" id="section_3_7">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">3.7 Return on Capital Employed</h2>
        </div>

        <div className="bg-card rounded-xl p-8 border border-subtle shadow-lg relative min-h-[350px] flex items-center justify-center">
          <div className="w-full">
            <GaugeChart 
              title="ROCE"
              companyLabel="Last Year"
              industryLabel="3 Years Ago"
              companyValue={companyROCE} 
              industryValue={industryROCE}
              maxValue={30}
              redThreshold={10}
              yellowThreshold={20}
              ticks={[0, 10, 20, 30]}
            />
          </div>

          {/* More Options Button */}
          <div className="absolute bottom-4 right-4">
            <button className="px-3 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-secondary transition-colors shadow-sm">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
