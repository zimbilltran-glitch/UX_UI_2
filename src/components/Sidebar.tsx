import React from 'react';
import { 
  Home, 
  Search, 
  BarChart2, 
  PieChart, 
  TrendingUp, 
  Briefcase, 
  Newspaper, 
  Settings, 
  Bell,
  ChevronRight
} from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#111827] border-r border-gray-800 flex flex-col h-screen sticky top-0">
      <div className="p-4 flex items-center space-x-2 border-b border-gray-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
          SW
        </div>
        <span className="text-white font-semibold text-lg">Simply Wall St</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          <NavItem icon={<Home size={20} />} label="Dashboard" />
          <NavItem icon={<Search size={20} />} label="Discover" />
          <NavItem icon={<Briefcase size={20} />} label="Portfolios" />
          <NavItem icon={<Newspaper size={20} />} label="News" />
          
          <div className="pt-4 pb-2 px-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Company Analysis
            </p>
          </div>
          
          <NavItem icon={<PieChart size={20} />} label="Overview" />
          <NavItem icon={<BarChart2 size={20} />} label="Valuation" />
          <NavItem icon={<TrendingUp size={20} />} label="Future Growth" active />
          <NavItem icon={<BarChart2 size={20} />} label="Past Performance" />
          <NavItem icon={<PieChart size={20} />} label="Financial Health" />
          <NavItem icon={<BarChart2 size={20} />} label="Dividend" />
          <NavItem icon={<Briefcase size={20} />} label="Management" />
          <NavItem icon={<PieChart size={20} />} label="Ownership" />
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium text-white">
            ZT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">zimbill.tran</p>
          </div>
          <Settings size={18} className="text-gray-400 cursor-pointer hover:text-white" />
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        active 
          ? 'bg-blue-900/30 text-blue-400' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <span className={`mr-3 flex-shrink-0 ${active ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}`}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {active && <ChevronRight size={16} className="text-blue-400" />}
    </a>
  );
}
