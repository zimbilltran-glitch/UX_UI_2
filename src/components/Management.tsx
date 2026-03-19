import React from 'react';
import { ManagementOverview } from './ManagementOverview';
import { CEO } from './CEO';
import { LeadershipTeam } from './LeadershipTeam';
import { BoardMembers } from './BoardMembers';
import { HelpCircle } from 'lucide-react';

const HelpCentreLink = () => (
  <div className="mt-6 pt-6 border-t border-subtle">
    <p className="text-secondary text-sm">
      For a more detailed breakdown of how we evaluate management, please check out our <a href="#" className="text-brand hover:text-brand transition-colors font-medium">Help Centre</a>.
    </p>
  </div>
);

const SectionHeader = ({ id, title, description }: { id: string, title: string, description: string }) => (
  <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
      <p className="text-secondary">{description}</p>
    </div>
    <button className="btn-interactive flex items-center space-x-2 px-4 py-2 bg-card hover:bg-subtle border border-subtle rounded-lg transition-colors text-sm font-semibold text-secondary shadow-sm flex-shrink-0">
      <HelpCircle className="w-4 h-4" />
      <span>Learn</span>
    </button>
  </div>
);

export const Management = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <ManagementOverview />

      <CEO />
      <LeadershipTeam />
      <BoardMembers />

    </div>
  );
};
