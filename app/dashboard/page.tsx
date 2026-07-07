'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  fetchPortfolioData, 
  calculateSectorAllocation, 
  getAccountSummaries,
  PortfolioData 
} from '../services/portfolioService';
import NetWorthCard from '../components/NetWorthCard';
import AllocationBar from '../components/AllocationBar';
import AccountList from '../components/AccountList';
import StocksTab from '../components/StocksTab';
import OrdersTab from '../components/OrdersTab';

export default function DashboardPage() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'stocks' | 'orders'>('stocks');
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPortfolioData();
      setPortfolioData(data);
    } catch (err) {
      setError('Failed to load portfolio data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-page gap-4">
        <div className="w-10 h-10 border-2 border-transparent border-t-trove-green rounded-full animate-spin" />
        <p className="text-text-neutral">Loading your portfolio...</p>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-page p-6">
        <div className="bg-card-surface rounded-2xl border border-border p-6 max-w-md w-full text-center shadow-sm">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-negative"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3 className="text-lg font-semibold mb-2 text-text-default">
            Error Loading Data
          </h3>
          <p className="text-text-neutral mb-6">
            {error || 'Something went wrong'}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={loadPortfolioData} 
              className="px-6 py-3 bg-trove-green text-white rounded-xl font-medium hover:bg-trove-green/90 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={logout} 
              className="px-6 py-3 bg-bg-default text-text-default rounded-xl font-medium hover:bg-border transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sectorAllocations = calculateSectorAllocation(portfolioData.holdings);
  const accountSummaries = getAccountSummaries(portfolioData.holdings);

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Header */}
      <header className="bg-card-surface border-b border-border px-4 lg:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-trove-green rounded-xl flex items-center justify-center">
              <svg 
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path d="M3 3v18h18"/>
                <path d="M18 17V9"/>
                <path d="M13 17V5"/>
                <path d="M8 17v-3"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-text-default">
              Trove
            </span>
          </div>

          {/* User & Logout */}
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm text-text-neutral">
              {user?.email}
            </span>
            <button 
              onClick={logout}
              className="p-2 text-text-neutral hover:text-text-default hover:bg-bg-default rounded-xl transition-all"
              title="Logout"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Top Section: Net Worth & Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <NetWorthCard 
            summary={portfolioData.summary} 
            userName={portfolioData.user.name}
          />
          <AllocationBar 
            allocations={sectorAllocations}
            totalValue={portfolioData.summary.totalPortfolioValue}
            currency={portfolioData.summary.currency}
          />
        </div>

        {/* Account Summary */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-text-default">
            Account Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AccountList 
              accounts={accountSummaries}
              currency={portfolioData.summary.currency}
            />
          </div>
        </div>

        {/* Holdings & Transactions Tabs */}
        <div className="bg-card-surface rounded-2xl border border-border p-6 mb-8 shadow-sm">
          {/* Tab Navigation */}
          <div className="flex gap-1 border-b border-border mb-6">
            <button
              onClick={() => setActiveTab('stocks')}
              className={`px-5 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'stocks' 
                  ? 'text-trove-green border-b-2 border-trove-green' 
                  : 'text-text-neutral hover:text-text-default'
              }`}
            >
              Stocks
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'orders' 
                  ? 'text-trove-green border-b-2 border-trove-green' 
                  : 'text-text-neutral hover:text-text-default'
              }`}
            >
              Orders
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'stocks' ? (
              <StocksTab 
                holdings={portfolioData.holdings}
                currency={portfolioData.summary.currency}
              />
            ) : (
              <OrdersTab 
                transactions={portfolioData.transactions}
                currency={portfolioData.summary.currency}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6">
          <p className="text-xs text-text-disabled">
            Last updated: {new Date(portfolioData.user.lastUpdated).toLocaleString()}
          </p>
        </footer>
      </main>
    </div>
  );
}
