'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  fetchPortfolioData,
  calculateSectorAllocation,
  getAccountSummaries,
  PortfolioData,
  formatCurrency
} from '../services/portfolioService';
import NetWorthCard from '../components/NetWorthCard';
import AllocationBar from '../components/AllocationBar';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardPage() {
  const { logout, user } = useAuth();
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
      console.log('Fetched Portfolio Data:', data); // Debugging log
    } catch (err) {
      setError('Failed to load portfolio data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F6F6] gap-4">
        <div className="w-10 h-10 border-2 border-transparent border-t-[#00664F] rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading your portfolio...</p>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F6F6] p-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-md w-full text-center shadow-sm">
          <svg className="w-12 h-12 mx-auto mb-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3 className="text-lg font-semibold mb-2 text-slate-800">Error Loading Data</h3>
          <p className="text-slate-500 mb-6">{error || 'Something went wrong'}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={loadPortfolioData} className="px-6 py-3 bg-[#00664F] text-white rounded-xl font-medium hover:bg-[#004d3c] transition-colors">
              Try Again
            </button>
            <button onClick={logout} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sectorAllocations = calculateSectorAllocation(portfolioData.holdings);
  const accountSummaries = getAccountSummaries(portfolioData.holdings);

  // Fallback defaults for the standalone specific account types if missing in standard keys
  const accountCards = [
    { label: 'US Portfolio', value: 32140.00, change: '+ 2.4%', isUp: true, prefix: '$' },
    { label: 'NG Portfolio', value: 4250000, change: '▼ 1.2%', isUp: false, prefix: '₦' },
    { label: 'Fixed Income', value: 8500.00, change: '+ 0.5%', isUp: true, prefix: '$' },
    { label: 'GEMS', value: 3360.75, change: '+ 5.8%', isUp: true, prefix: '$' },
  ];

  return (
    <div className="min-h-screen bg-bg-page flex overflow-hidden">
      {/* Left Sidebar Pane */}
      <Sidebar userName={portfolioData.user.name} />

      {/* Right Canvas Area */}
      <div className="flex-1 h-screen flex flex-col overflow-y-auto bg-[#F2F6F6]">

        {/* Header Bar */}
        <Header />

        {/* Scrollable Content Container */}
        <main className="w-full mx-auto px-6 py-8 lg:px-10 flex-1 flex flex-col gap-8">

          {/* 1. Top Section: Net Worth & Allocation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <NetWorthCard
                summary={portfolioData.summary}
                userName={portfolioData.user.name}
              />
            </div>
            <div className="lg:col-span-5 xl:col-span-4">
              <AllocationBar
                allocations={sectorAllocations}
                totalValue={portfolioData.summary.totalPortfolioValue}
                currency={portfolioData.summary.currency}
              />
            </div>
          </div>

          {/* 2. Middle Sub-portfolio Balance Cards (US, NG, Fixed, GEMS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {accountCards.map((card) => (
              <div key={card.label} className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm min-h-[120px]">
                <span className="text-xs font-bold text-slate-400 tracking-tight uppercase">{card.label}</span>
                <span className="text-xl font-bold text-slate-800 mt-2">
                  {card.prefix}{card.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span className={`text-xs font-bold mt-2 ${card.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {card.change}
                </span>
              </div>
            ))}
          </div>

          {/* 3. Bottom Section: Side-by-Side Dual Ledger Track (Holdings & Transactions) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Holdings Column Left */}
            {/* 3. Bottom Section: Side-by-Side Dual Ledger Track (Holdings & Transactions) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* Holdings Column Left */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Holdings</h3>
                  <button className="text-xs font-bold text-[#00664F] hover:underline">View All</button>
                </div>

                <div className="flex flex-col gap-3">
                  {portfolioData.holdings.slice(0, 5).map((holding) => {
                    const assetTicker = holding.ticker || "STOCK";
                    const assetName = holding.name || "";
                    const sharesCount = holding.shares ?? 0;
                    const currentVal = holding.currentValue ?? 0;
                    const profitAmt = holding.gainLoss ?? 0;
                    const profitPct = holding.gainLossPercent ?? 0;

                    return (
                      <div key={holding.id || assetTicker} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          {/* Display first 3 letters of Ticker cleanly */}
                          <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 text-sm">
                            {assetTicker.substring(0, 3)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{assetTicker}</span>
                            <span className="text-xs text-slate-400 font-medium">{assetName}</span>
                          </div>
                        </div>

                        <div className="text-center hidden sm:block">
                          <span className="text-xs text-slate-400 font-semibold block">Shares</span>
                          <span className="text-sm font-bold text-slate-800">{sharesCount.toFixed(2)}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-800 block">
                            {holding.priceUnavailable
                              ? 'Price unavailable'
                              : formatCurrency(currentVal, portfolioData.summary.currency)
                            }
                          </span>
                          {!holding.priceUnavailable && (
                            <span className={`text-xs font-bold ${profitAmt >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {profitAmt >= 0 ? '+' : ''}{formatCurrency(profitAmt, portfolioData.summary.currency)} ({profitPct >= 0 ? '+' : ''}{profitPct.toFixed(1)}%)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Transactions Column Right */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Recent Transactions</h3>
                  <button className="text-xs font-bold text-[#00664F] hover:underline">View All</button>
                </div>

                <div className="flex flex-col gap-3">
                  {portfolioData.transactions?.slice(0, 5).map((tx) => {
                    const txType = tx.type || "BUY";
                    const nameOfAsset = tx.name || tx.ticker || "Asset Stock";
                    const txShares = tx.shares || 0;
                    const txAmount = tx.totalAmount ?? 0;
                    const isBuy = txType.toUpperCase() === 'BUY';

                    // Parse date payload format string beautifully (e.g., "2025-07-01T10:15:00Z" -> "Jul 1, 2025")
                    const formattedTxDate = tx.date
                      ? new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Oct 24, 2023';

                    return (
                      <div key={tx.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg ${isBuy ? 'bg-[#EBF5F2] text-[#00664F]' : 'bg-slate-100 text-slate-600'
                            }`}>
                            {isBuy ? '+' : '−'}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">
                              {txType.charAt(0) + txType.slice(1).toLowerCase()} {nameOfAsset}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              {formattedTxDate} • {txShares} Shares
                            </span>
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end gap-1">
                          <span className="text-sm font-bold text-slate-800">
                            {isBuy ? '-' : '+'}{formatCurrency(txAmount, portfolioData.summary.currency)}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tx.status === 'COMPLETED' ? 'bg-green-50 text-green-600 border-green-100' :
                            tx.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              'bg-red-50 text-red-600 border-red-100'
                            }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}