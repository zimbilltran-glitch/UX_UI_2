import React, { useState } from 'react';
import { Info, CheckCircle2 } from 'lucide-react';

const leadershipData = [
  { name: 'Anh Pham', position: 'CEO, Member of Management Board & Director', tenure: '5.6yrs', compensation: '₫3.25b', ownership: '0.072%', ownershipValue: '₫152.8b' },
  { name: 'Chau Nguyen', position: 'Deputy CEO', tenure: '8.8yrs', compensation: '₫3.04b', ownership: '0.031%', ownershipValue: '₫66.3b' },
  { name: 'Ha Thi Pham', position: 'Deputy CEO & Member of Executive Board', tenure: 'no data', compensation: '₫2.94b', ownership: '0.052%', ownershipValue: '₫109.6b' },
  { name: 'Dat Tran', position: 'Deputy Chief Executive Officer & Member of Executive Board', tenure: '8.2yrs', compensation: '₫2.62b', ownership: '0.072%', ownershipValue: '₫151.5b' },
  { name: 'Ngoc Nguyen', position: 'Member of Executive Board', tenure: '1.8yrs', compensation: '₫2.66b', ownership: '0.028%', ownershipValue: '₫59.9b' },
  { name: 'Thuy Nguyen', position: 'Member of Executive Board', tenure: '1.8yrs', compensation: '₫2.64b', ownership: '0.0094%', ownershipValue: '₫19.9b' },
  { name: 'Khiem Ha', position: 'Deputy CEO & Member of Executive Board', tenure: '8.2yrs', compensation: '₫2.44b', ownership: '0.014%', ownershipValue: '₫30.2b' },
  { name: 'Minh Le', position: 'Deputy CEO & Member of Executive Board', tenure: '8.2yrs', compensation: '₫2.42b', ownership: '0.040%', ownershipValue: '₫85.1b' },
  { name: 'Que Thi Tran', position: 'Member of Executive Board', tenure: '7.1yrs', compensation: '₫1.93b', ownership: '0.044%', ownershipValue: '₫92.6b' },
  { name: 'Phu Vu', position: 'Member of the Executive Board', tenure: '5.6yrs', compensation: '₫1.84b', ownership: '0.012%', ownershipValue: '₫25.0b' },
  { name: 'Hoc Nguyen', position: 'Deputy Executive Officer & Member of Executive Board', tenure: '4yrs', compensation: '₫1.85b', ownership: '0.017%', ownershipValue: '₫36.3b' },
  { name: 'Vu Le', position: 'Member of the Member Council & CEO of Oceanbank/MBV', tenure: '1.3yrs', compensation: '₫2.17b', ownership: '0.028%', ownershipValue: '₫58.3b' },
];

export const LeadershipTeam = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? leadershipData : leadershipData.slice(0, 3);

  return (
    <div className="mb-16" id="section_6_2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">6.2 Leadership Team</h2>
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
                    <div className="text-xs text-secondary border-b border-dashed border-subtle inline-block pb-0.5">{person.ownershipValue}</div>
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
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">5.6yrs</div>
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
              <span className="text-bullish font-medium">Experienced Management: </span>
              MBB's management team is seasoned and <span className="border-b border-dashed border-subtle pb-0.5">experienced</span> (5.6 years average tenure).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
