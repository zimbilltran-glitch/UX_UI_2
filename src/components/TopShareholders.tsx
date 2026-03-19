import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const shareholdersData = [
  { ownership: '0.86%', name: 'Viet Fund Management Company', shares: '69,644,427', value: '₫1.8t', change: '12.7%', changeType: 'positive', portfolio: '6.1%' },
  { ownership: '0.86%', name: 'Baillie Gifford & Co.', shares: '69,289,275', value: '₫1.8t', change: '-7.38%', changeType: 'negative', portfolio: '0.03%' },
  { ownership: '0.5%', name: 'Schroder Investment Management Limited', shares: '40,171,758', value: '₫1.1t', change: '0%', changeType: 'neutral', portfolio: '0.02%' },
  { ownership: '0.46%', name: 'Franklin Resources, Inc.', shares: '36,962,405', value: '₫970.3b', change: '0%', changeType: 'neutral', portfolio: '0.01%' },
  { ownership: '0.41%', name: 'Fiera Capital Corporation', shares: '32,916,666', value: '₫864.1b', change: '0%', changeType: 'neutral', portfolio: '0.08%' },
  { ownership: '0.37%', name: 'RWC Partners Limited', shares: '30,135,700', value: '₫791.1b', change: '0%', changeType: 'neutral', portfolio: '0.22%' },
  { ownership: '0.36%', name: 'T. Rowe Price Group, Inc.', shares: '28,770,876', value: '₫755.2b', change: '-4.97%', changeType: 'negative', portfolio: 'no data' },
  { ownership: '0.34%', name: 'Dragon Capital Group Ltd.', shares: '27,643,970', value: '₫725.7b', change: '0%', changeType: 'neutral', portfolio: '3.06%' },
  { ownership: '0.34%', name: 'Dragon Capital Management (HK) Limited', shares: '27,553,218', value: '₫723.3b', change: '0%', changeType: 'neutral', portfolio: '11.47%' },
  { ownership: '0.3%', name: 'Korea Investment Management Co., Ltd.', shares: '24,339,049', value: '₫638.9b', change: '0%', changeType: 'neutral', portfolio: '4.48%' },
  { ownership: '0.23%', name: 'VinaCapital Fund Management Joint-Stock Company', shares: '18,439,810', value: '₫484.0b', change: '-18.4%', changeType: 'negative', portfolio: '5.07%' },
  { ownership: '0.21%', name: 'Nordea Investment Management, AB', shares: '16,822,908', value: '₫441.6b', change: '0%', changeType: 'neutral', portfolio: '0.01%' },
  { ownership: '0.2%', name: 'Aberdeen Group Plc', shares: '15,796,486', value: '₫414.7b', change: '0%', changeType: 'neutral', portfolio: '0.01%' },
  { ownership: '0.19%', name: 'Eaton Vance Management', shares: '14,964,385', value: '₫392.8b', change: '70.6%', changeType: 'positive', portfolio: 'no data' },
  { ownership: '0.17%', name: 'Norges Bank Investment Management', shares: '13,337,731', value: '₫350.1b', change: '-64.9%', changeType: 'negative', portfolio: 'no data' },
  { ownership: '0.13%', name: 'Thai Luu', shares: '10,658,346', value: '₫279.8b', change: '0%', changeType: 'neutral', portfolio: 'no data' },
  { ownership: '0.1%', name: 'SCB Asset Management Co., Ltd.', shares: '8,427,784', value: '₫221.2b', change: '0%', changeType: 'neutral', portfolio: '0.18%' },
  { ownership: '0.1%', name: 'Matthews International Capital Management, LLC', shares: '8,324,181', value: '₫218.5b', change: '-2.4%', changeType: 'negative', portfolio: '0.13%' },
  { ownership: '0.1%', name: 'Coeli Frontier Markets AB', shares: '8,298,813', value: '₫217.9b', change: '0%', changeType: 'neutral', portfolio: '3.3%' },
  { ownership: '0.099%', name: 'Fivestar Asset Management Co., Ltd.', shares: '7,963,088', value: '₫209.0b', change: '0%', changeType: 'neutral', portfolio: '3.56%' },
  { ownership: '0.099%', name: 'Capital Asset Management Co. Ltd.', shares: '7,944,199', value: '₫208.5b', change: '0%', changeType: 'neutral', portfolio: '3.77%' },
  { ownership: '0.086%', name: 'Vietcombank Fund Management Joint Venture Company', shares: '6,897,874', value: '₫181.1b', change: '0%', changeType: 'neutral', portfolio: '8.79%' },
  { ownership: '0.084%', name: 'Amundi Asset Management SAS', shares: '6,794,590', value: '₫178.4b', change: '0%', changeType: 'neutral', portfolio: 'no data' },
  { ownership: '0.081%', name: 'Asset Management One Co., Ltd.', shares: '6,556,953', value: '₫172.1b', change: '0%', changeType: 'neutral', portfolio: '0.01%' },
  { ownership: '0.078%', name: 'SSI Fund Management Limited', shares: '6,322,692', value: '₫166.0b', change: '0.73%', changeType: 'positive', portfolio: '8.42%' },
];

export const TopShareholders = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedData = showAll ? shareholdersData : shareholdersData.slice(0, 8);

  return (
    <div className="mb-16" id="section_7_3">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">7.3 Top Shareholders</h2>
        <p className="text-secondary">Top 25 shareholders own 6.77% of the company</p>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-subtle">
                <th className="p-4 text-sm font-bold text-primary">Ownership</th>
                <th className="p-4 text-sm font-bold text-primary">Name</th>
                <th className="p-4 text-sm font-bold text-primary text-right">Shares</th>
                <th className="p-4 text-sm font-bold text-primary text-right">Current Value</th>
                <th className="p-4 text-sm font-bold text-primary text-right border-b border-dashed border-subtle inline-block pb-0.5 mt-4">Change %</th>
                <th className="p-4 text-sm font-bold text-primary text-right border-b border-dashed border-subtle inline-block pb-0.5 mt-4 ml-4">Portfolio %</th>
                <th className="p-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row, index) => (
                <tr key={index} className="border-b border-subtle hover:bg-subtle transition-colors">
                  <td className="p-4 text-sm font-bold text-primary">{row.ownership}</td>
                  <td className="p-4 text-sm font-bold text-primary">{row.name}</td>
                  <td className="p-4 text-sm text-primary text-right">{row.shares}</td>
                  <td className="p-4 text-sm text-secondary border-b border-dashed border-subtle inline-block pb-0.5 mt-4 text-right">{row.value}</td>
                  <td className={`p-4 text-sm text-right ${
                    row.changeType === 'positive' ? 'text-bullish' : 
                    row.changeType === 'negative' ? 'text-bearish' : 'text-secondary'
                  }`}>{row.change}</td>
                  <td className="p-4 text-sm text-secondary text-right">{row.portfolio}</td>
                  <td className="p-4 text-right">
                    <Calendar className="w-4 h-4 text-secondary opacity-50 inline-block" />
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
      </div>
    </div>
  );
};
