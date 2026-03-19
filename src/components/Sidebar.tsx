import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Search, 
  BarChart2, 
  PieChart, 
  TrendingUp, 
  Briefcase, 
  Newspaper, 
  Settings, 
  ChevronRight,
  Activity,
  Shield,
  DollarSign,
  Users,
  HelpCircle,
  X
} from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen 
}: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
}) {
  const { t } = useTranslation();

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--bg-card)] border-r border-[var(--border-subtle)] flex flex-col h-full transition-transform duration-300 ease-in-out font-sans ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:-ml-64'
    }`}>
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
            <Activity size={18} />
          </div>
          <h2 className="text-lg font-bold text-primary">Menu</h2>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-[var(--border-subtle)] rounded-lg text-secondary transition-colors"
          aria-label="Close Sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          <NavItem icon={<Home size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => { setActiveTab('Dashboard'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<Search size={20} />} label="Discover" />
          <NavItem icon={<Briefcase size={20} />} label="Portfolios" active={activeTab === 'Portfolios'} onClick={() => { setActiveTab('Portfolios'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<Newspaper size={20} />} label="Watchlist" active={activeTab === 'Watchlist'} onClick={() => { setActiveTab('Watchlist'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          
          <div className="pt-6 pb-3 px-3">
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">
              Company Analysis
            </p>
          </div>
          
          <NavItem icon={<PieChart size={20} />} label={t('nav.overview')} active={activeTab === 'Overview'} onClick={() => { setActiveTab('Overview'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<BarChart2 size={20} />} label={t('nav.valuation')} active={activeTab === 'Valuation'} onClick={() => { setActiveTab('Valuation'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<TrendingUp size={20} />} label={t('nav.futureGrowth')} active={activeTab === 'Future Growth'} onClick={() => { setActiveTab('Future Growth'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<Activity size={20} />} label={t('nav.pastPerformance')} active={activeTab === 'Past Performance'} onClick={() => { setActiveTab('Past Performance'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<Shield size={20} />} label={t('nav.financialHealth')} active={activeTab === 'Financial Health'} onClick={() => { setActiveTab('Financial Health'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<DollarSign size={20} />} label={t('nav.dividend')} active={activeTab === 'Dividend'} onClick={() => { setActiveTab('Dividend'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<Users size={20} />} label="Management" active={activeTab === 'Management'} onClick={() => { setActiveTab('Management'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<Briefcase size={20} />} label="Ownership" active={activeTab === 'Ownership'} onClick={() => { setActiveTab('Ownership'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<BarChart2 size={20} />} label="Financial Statements" active={activeTab === 'Financial Statements'} onClick={() => { setActiveTab('Financial Statements'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          <NavItem icon={<Newspaper size={20} />} label="Other information" active={activeTab === 'Other information'} onClick={() => { setActiveTab('Other information'); if(window.innerWidth < 1024) setIsOpen(false); }} />
          
          <div className="pt-6 pb-3 px-3 border-t border-[var(--border-subtle)] mt-4">
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">
              Support
            </p>
          </div>
          <NavItem icon={<HelpCircle size={20} />} label="Help Center" active={activeTab === 'Help Center'} onClick={() => { setActiveTab('Help Center'); if(window.innerWidth < 1024) setIsOpen(false); }} />
        </nav>
      </div>
      
      <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-[var(--bg-card)] shadow-sm">
            ZT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-primary truncate">zimbill.tran</p>
            <p className="text-xs text-secondary truncate">Free Plan</p>
          </div>
          <button className="p-1.5 hover:bg-[var(--border-subtle)] rounded-lg transition-colors">
            <Settings size={18} className="text-secondary" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-brand/10 text-brand border border-brand/20 shadow-sm tab-interactive active' 
          : 'text-secondary hover:bg-[var(--border-subtle)] hover:text-primary border border-transparent tab-interactive'
      }`}
    >
      <span className={`mr-3 flex-shrink-0 transition-colors ${active ? 'text-brand' : 'text-secondary group-hover:text-primary'}`}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {active && <ChevronRight size={16} className="text-brand" />}
    </a>
  );
}
