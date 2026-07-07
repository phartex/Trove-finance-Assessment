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
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardPage() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'stocks' | 'orders'>('stocks');
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
console.log('User from AuthContext:', user);
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
    <div className="min-h-screen bg-bg-page flex overflow-hidden">
      {/* Left Sidebar Pane */}
      <Sidebar userName={portfolioData.user.name} />

      {/* Right Canvas Area - Managed with flex-col to stick the header on top */}
      <div className="flex-1 h-screen flex flex-col overflow-y-auto">
        
        {/* Header - Now flushes edge-to-edge perfectly */}
        <Header />

        {/* Scrollable Content Container - Removed excess side gaps */}
        <main className="w-full max-w-[1400px] mx-auto px-6 py-8 lg:px-10 flex-1">
          
          {/* Top Section: Net Worth & Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
            {/* Net Worth (Main Canvas Area) */}
            <div className="lg:col-span-7 xl:col-span-8">
              <NetWorthCard 
                summary={portfolioData.summary} 
                userName={portfolioData.user.name}
              />
            </div>

            {/* Sector Allocation Breakdown */}
            <div className="lg:col-span-5 xl:col-span-4">
              <AllocationBar 
                allocations={sectorAllocations}
                totalValue={portfolioData.summary.totalPortfolioValue}
                currency={portfolioData.summary.currency}
              />
            </div>
          </div>

          {/* Account Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-5 text-text-default tracking-tight">
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
                    ? 'text-trove-green border-b-2 border-trove-green font-semibold' 
                    : 'text-text-neutral hover:text-text-default'
                }`}
              >
                Stocks
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-5 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'orders' 
                    ? 'text-trove-green border-b-2 border-trove-green font-semibold' 
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
          <footer className="text-center py-4 border-t border-border/40 mt-12">
            <p className="text-xs text-text-disabled">
              Last updated: {new Date(portfolioData.user.lastUpdated).toLocaleString()}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
