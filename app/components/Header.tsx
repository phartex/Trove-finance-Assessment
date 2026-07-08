'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, HelpCircle, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { logout, user } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push('/login');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="p-1 rounded-full hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
            aria-label="Profile menu"
            aria-expanded={isProfileOpen}
          >
            <User size={22} strokeWidth={2} />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {user?.email || 'User'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}