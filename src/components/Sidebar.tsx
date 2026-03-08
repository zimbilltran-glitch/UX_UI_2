import React from 'react';
import { FinSangLogo } from '../theme';
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
  HelpCircle
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 font-sans">
      <div className="p-4 flex items-center space-x-3 border-b border-gray-100">
        <FinSangLogo className="w-10 h-10" />
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-bullish font-bold text-lg tracking-tight">Fin</span>
            <span className="text-gray-900 font-bold text-lg tracking-tight">Sang</span>
            <span className="text-gray-600 font-bold text-lg tracking-tight ml-1">Terminal</span>
          </div>
          <span className="text-gray-500 text-[10px] uppercase tracking-wider font-bold">V3.0 • INSTITUTIONAL</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          <NavItem icon={<Home size={20} />} label="Dashboard" />
          <NavItem icon={<Search size={20} />} label="Discover" />
          <NavItem icon={<Briefcase size={20} />} label="Portfolios" />
          <NavItem icon={<Newspaper size={20} />} label="News" />
          
          <div className="pt-6 pb-3 px-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Company Analysis
            </p>
          </div>
          
          <NavItem icon={<PieChart size={20} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <NavItem icon={<BarChart2 size={20} />} label="Valuation" active={activeTab === 'Valuation'} onClick={() => setActiveTab('Valuation')} />
          <NavItem icon={<TrendingUp size={20} />} label="Future Growth" active={activeTab === 'Future Growth'} onClick={() => setActiveTab('Future Growth')} />
          <NavItem icon={<Activity size={20} />} label="Past Performance" active={activeTab === 'Past Performance'} onClick={() => setActiveTab('Past Performance')} />
          <NavItem icon={<Shield size={20} />} label="Financial Health" active={activeTab === 'Financial Health'} onClick={() => setActiveTab('Financial Health')} />
          <NavItem icon={<DollarSign size={20} />} label="Dividend" active={activeTab === 'Dividend'} onClick={() => setActiveTab('Dividend')} />
          <NavItem icon={<Users size={20} />} label="Management" active={activeTab === 'Management'} onClick={() => setActiveTab('Management')} />
          <NavItem icon={<Briefcase size={20} />} label="Ownership" active={activeTab === 'Ownership'} onClick={() => setActiveTab('Ownership')} />
          <NavItem icon={<Newspaper size={20} />} label="Other information" active={activeTab === 'Other information'} onClick={() => setActiveTab('Other information')} />
          
          <div className="pt-6 pb-3 px-3 border-t border-gray-100 mt-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Support
            </p>
          </div>
          <NavItem icon={<HelpCircle size={20} />} label="Help Center" active={activeTab === 'Help Center'} onClick={() => setActiveTab('Help Center')} />
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-white shadow-sm">
            ZT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">zimbill.tran</p>
            <p className="text-xs text-gray-500 truncate">Free Plan</p>
          </div>
          <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
            <Settings size={18} className="text-gray-500" />
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
          ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200'
      }`}
    >
      <span className={`mr-3 flex-shrink-0 transition-colors ${active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {active && <ChevronRight size={16} className="text-blue-500" />}
    </a>
  );
}
