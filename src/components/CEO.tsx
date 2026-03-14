import React from 'react';

export const CEO = () => {
  return (
    <div className="mb-16" id="section_6_1">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">6.1 CEO</h2>
      </div>

      <div className="bg-card rounded-xl border border-subtle shadow-lg p-6">
        <h3 className="text-lg font-bold text-primary mb-6">Anh Pham (45 yo)</h3>
        
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mb-8">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">5.6yrs</div>
            <div className="text-sm text-secondary">Tenure</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 border-b border-dashed border-subtle inline-block pb-1">₫3,248,000,000</div>
            <div className="text-sm text-secondary">Compensation</div>
          </div>
        </div>

        <p className="text-primary text-sm leading-relaxed">
          Mr. Anh Nhu Pham serves as Member of the Executive Board at Military Commercial Joint Stock Bank since August 18, 2020 and serves as its Chief Executive Officer since April 12, 2023 and is its Director sin... <button className="text-secondary hover:text-primary underline transition-colors">Show more</button>
        </p>
      </div>
    </div>
  );
};
