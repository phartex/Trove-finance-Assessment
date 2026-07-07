'use client';

import React, { useState } from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="w-full h-20 border-b border-slate-100 bg-white flex items-center justify-between p-10 sticky top-0 z-50">
      {/* Search Input Container */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search stocks, crypto..."
          className="w-full h-11 pl-12 pr-4 rounded-full bg-[#EDF2F1]/60 text-slate-800 placeholder-slate-500 font-medium text-sm border border-transparent focus:border-slate-200 focus:bg-white focus:outline-none transition-all"
        />
      </div>

      {/* Action Utility Buttons */}
      <div className="flex items-center gap-5 text-[#334155]">
        {/* Notifications */}
        <button 
          className="p-1 rounded-full hover:bg-slate-50 transition-colors focus:outline-none relative"
          aria-label="Notifications"
        >
          <Bell size={22} strokeWidth={2} />
          {/* Optional: Unread notification dot badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full hidden" />
        </button>

        {/* Help / Support */}
        <button 
          className="p-1 rounded-full hover:bg-slate-50 transition-colors focus:outline-none"
          aria-label="Help and support"
        >
          <HelpCircle size={22} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}