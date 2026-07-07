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
      <div 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-page)',
          gap: 'var(--spacing-md)',
        }}
      >
        <div 
          className="spinner"
          style={{ 
            width: '40px', 
            height: '40px',
            borderWidth: '3px',
            color: 'var(--trove-green)',
          }} 
        />
        <p style={{ color: 'var(--text-neutral)' }}>Loading your portfolio...</p>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-page)',
          padding: 'var(--spacing-lg)',
        }}
      >
        <div className="card" style={{ maxWidth: '400px', textAlign: 'center' }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--negative)"
            strokeWidth="1.5"
            style={{ margin: '0 auto var(--spacing-md)' }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-default)' }}>
            Error Loading Data
          </h3>
          <p style={{ color: 'var(--text-neutral)', marginBottom: 'var(--spacing-lg)' }}>
            {error || 'Something went wrong'}
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
            <button onClick={loadPortfolioData} className="btn btn-primary">
              Try Again
            </button>
            <button onClick={logout} className="btn btn-secondary">
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
    <div className="page-container">
      {/* Header */}
      <header 
        style={{
          backgroundColor: 'var(--card-surface)',
          borderBottom: '1px solid var(--border-color)',
          padding: 'var(--spacing-md) var(--spacing-lg)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div 
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: 'var(--trove-green)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2.5"
              >
                <path d="M3 3v18h18"/>
                <path d="M18 17V9"/>
                <path d="M13 17V5"/>
                <path d="M8 17v-3"/>
              </svg>
            </div>
            <span style={{ 
              fontSize: '18px', 
              fontWeight: 700, 
              color: 'var(--text-default)',
            }}>
              Trove
            </span>
          </div>

          {/* User & Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <span style={{ 
              fontSize: '14px', 
              color: 'var(--text-neutral)',
              display: 'none',
            }} className="hide-mobile">
              {user?.email}
            </span>
            <button 
              onClick={logout}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-neutral)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-default)';
                e.currentTarget.style.color = 'var(--text-default)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-neutral)';
              }}
              title="Logout"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-container">
        {/* Top Section: Net Worth & Allocation */}
        <div 
          style={{
            display: 'grid',
            gap: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-xl)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
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
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 600,
            marginBottom: 'var(--spacing-md)',
            color: 'var(--text-default)',
          }}>
            Account Breakdown
          </h2>
          <div style={{
            display: 'grid',
            gap: 'var(--spacing-lg)',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          }}>
            <AccountList 
              accounts={accountSummaries}
              currency={portfolioData.summary.currency}
            />
          </div>
        </div>

        {/* Holdings & Transactions Tabs */}
        <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {/* Tab Navigation */}
          <div className="tab-list">
            <button
              onClick={() => setActiveTab('stocks')}
              className={`tab ${activeTab === 'stocks' ? 'active' : ''}`}
            >
              Stocks
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
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
        <footer style={{ textAlign: 'center', padding: 'var(--spacing-lg) 0' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-disabled)' }}>
            Last updated: {new Date(portfolioData.user.lastUpdated).toLocaleString()}
          </p>
        </footer>
      </main>
    </div>
  );
}
