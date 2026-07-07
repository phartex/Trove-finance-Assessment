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
  activeView?: string;
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
    <aside className="sidebar-wrapper">
      <div className="sidebar-top">
        {/* Brand Logo */}
        <div className="sidebar-logo">
          <span className="logo-text">Trove</span>
        </div>

        {/* Navigation Link Stack */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.label} 
                className={`sidebar-link ${item.active ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Content */}
      <div className="sidebar-bottom">
        <div className="user-profile-box">
          <div className="avatar-placeholder">
            {userName.charAt(0)}
          </div>
          <div className="user-meta">
            <span className="user-name">{userName}</span>
            <span className="user-tier">{membershipType}</span>
          </div>
        </div>
        
        <button className="btn-add-funds">
          <Plus size={18} />
          <span>Add Funds</span>
        </button>
      </div>
    </aside>
  );
}