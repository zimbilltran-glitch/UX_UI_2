import React, { useState } from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

const boardData = [
  { name: 'Anh Pham', position: 'CEO, Member of Management Board & Director', tenure: '1.8yrs', compensation: '₫3.25b', ownership: '0.072%', ownershipValue: '₫152.8b' },
  { name: 'Loi Le', position: 'Chairman of Supervisory Board', tenure: '6.9yrs', compensation: 'no data', ownership: '0.055%', ownershipValue: '₫116.8b' },
  { name: 'Phuong Thi Vu', position: 'Vice Chairman of the Board', tenure: '6.9yrs', compensation: '₫2.58b', ownership: '0.071%', ownershipValue: '₫149.9b' },
  { name: 'Binh Thi Nguyen', position: 'Deputy Head of Supervisory Board', tenure: '5.8yrs', compensation: 'no data', ownership: '0.058%', ownershipValue: '₫123.5b' },
  { name: 'Thai Luu', position: 'Chairman of the Board', tenure: '12.9yrs', compensation: '₫3.26b', ownership: '0.13%', ownershipValue: '₫279.8b' },
  { name: 'Hai Le', position: 'Director', tenure: '6.9yrs', compensation: '₫2.09b', ownership: '0.028%', ownershipValue: '₫59.4b' },
  { name: 'Huyen Vu', position: 'Director', tenure: '6.9yrs', compensation: 'no data', ownership: '0.010%', ownershipValue: '₫21.2b' },
  { name: 'Trung Vu', position: 'Vice Chairman of the Board', tenure: '1.8yrs', compensation: '₫1.82b', ownership: '0.020%', ownershipValue: '₫43.0b' },
  { name: 'Cuong Pham', position: 'Director', tenure: '1.8yrs', compensation: 'no data', ownership: 'no data', ownershipValue: '' },
  { name: 'Hien Thi Hoang', position: 'Director', tenure: '1.8yrs', compensation: 'no data', ownership: 'no data', ownershipValue: '' },
  { name: 'Ly Thi Nguyen', position: 'Vice Chairwoman of the Board', tenure: '1.8yrs', compensation: 'no data', ownership: 'no data', ownershipValue: '' },
  { name: 'Nam Vu', position: 'Director', tenure: '1.8yrs', compensation: 'no data', ownership: 'no data', ownershipValue: '' },
];

export const BoardMembers = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? boardData : boardData.slice(0, 3);

  return (
    <div className="mb-16" id="section_6_3">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">6.3 Board Members</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-subtle">
                <th className="p-4 text-sm font-bold text-primary">Name</th>
                <th className="p-4 text-sm font-bold text-primary">Position</th>
                <th className="p-4 text-sm font-bold text-primary text-right">Tenure</th>
                <th className="p-4 text-sm font-bold text-primary text-right">Compensation</th>
                <th className="p-4 text-sm font-bold text-primary text-right">Ownership</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((person, index) => (
                <tr key={index} className="border-b border-subtle hover:bg-subtle transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Info className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-bold text-primary">{person.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-secondary">{person.position}</td>
                  <td className="p-4 text-sm text-secondary text-right">{person.tenure}</td>
                  <td className="p-4 text-sm text-primary font-medium text-right border-b border-dashed border-subtle inline-block pb-0.5 mt-4">{person.compensation}</td>
                  <td className="p-4 text-sm text-right">
                    <div className="font-medium text-primary">{person.ownership}</div>
                    {person.ownershipValue && (
                      <div className="text-xs text-secondary border-b border-dashed border-subtle inline-block pb-0.5">{person.ownershipValue}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-subtle bg-base/50">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full py-2 bg-card hover:bg-subtle border border-subtle rounded-lg text-sm font-medium text-primary transition-colors shadow-sm"
          >
            {showAll ? 'Show less' : 'Show more'}
          </button>
        </div>

        <div className="p-6 border-t border-subtle">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mb-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">3.8yrs</div>
              <div className="text-sm text-secondary">Average Tenure</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">49.5yo</div>
              <div className="text-sm text-secondary">Average Age</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-bullish flex-shrink-0 mt-0.5" />
            <p className="text-primary text-lg leading-relaxed">
              <span className="text-bullish font-medium">Experienced Board: </span>
              MBB's board of directors are considered <span className="border-b border-dashed border-subtle pb-0.5">experienced</span> (3.8 years average tenure).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
