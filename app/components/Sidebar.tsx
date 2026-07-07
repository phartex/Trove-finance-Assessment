'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  History, 
  TrendingUp, 
  Settings, 
  Plus 
} from 'lucide-react';

interface SidebarProps {
  userName: string;
  membershipType?: string;
}

export default function Sidebar({ userName, membershipType = "Premium Member" }: SidebarProps) {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Portfolio', icon: Briefcase, active: false },
    { label: 'Transactions', icon: History, active: false },
    { label: 'Markets', icon: TrendingUp, active: false },
    { label: 'Settings', icon: Settings, active: false },
  ];

  return (
    <aside className="hidden md:flex h-screen w-96 flex-col justify-between border-r border-slate-200 bg-white p-6 sticky top-0">
      <div className="flex flex-col">
        {/* Brand Logo */}
        <div className="pl-3 mb-8">
          <span className="text-xl font-bold text-[#00664F]">Trove</span>
        </div>

        {/* Navigation Link Stack */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.label} 
                className={`flex items-center gap-3 w-full p-3 my-4 rounded-lg font-medium text-[12px] transition-all duration-200 ${
                  item.active 
                    ? 'bg-trove-green-light text-[#00664F]' 
                    : 'text-text-default hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Content */}
      <div className="flex flex-col gap-4 border-t border-slate-100 pt-5">
        <div className="flex items-center gap-3 px-2">
          {/* Avatar circle */}
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-700">
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-slate-800 truncate max-w-[140px]">
              {userName}
            </span>
            <span className="text-xs text-slate-400">{membershipType}</span>
          </div>
        </div>
        
        {/* Add Funds Button */}
        <button className="flex items-center justify-center gap-2 w-full p-3 bg-[#00664F] text-white rounded-lg font-semibold text-sm hover:bg-[#004d3c] transition-all">
          <Plus size={18} />
          <span>Add Funds</span>
        </button>
      </div>
    </aside>
  );
}