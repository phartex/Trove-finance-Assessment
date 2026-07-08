'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import {
  fetchPortfolioData,
  calculateSectorAllocation,
  formatCurrency
} from '../services/portfolioService';
import NetWorthCard from '../components/NetWorthCard';
import AllocationBar from '../components/AllocationBar';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardPage() {
  const { logout } = useAuth();

  // TanStack Query orchestration replaces useState + useEffect hooks entirely
  const {
    data: portfolioData,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['portfolioData'],
    queryFn: fetchPortfolioData,
    staleTime: 1000 * 60 * 5, // Keep cache fresh for 5 minutes
  });

  // Loading view state matching layout
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F6F6] gap-4">
        <div className="w-10 h-10 border-2 border-transparent border-t-[#00664F] rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Loading your portfolio...</p>
      </div>
    );
  }

  // Error boundary view state matching layout
  if (isError || !portfolioData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F6F6] p-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 max-w-md w-full text-center shadow-sm">
          <svg className="w-12 h-12 mx-auto mb-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3 className="text-lg font-semibold mb-2 text-slate-800">Error Loading Data</h3>
          <p className="text-slate-500 mb-6">Something went wrong while pulling portfolio ledgers.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => refetch()} className="px-6 py-3 bg-[#00664F] text-white rounded-xl font-medium hover:bg-[#004d3c] transition-colors">
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

  // Pre-filtered downstream data matrices
  const validHoldings = portfolioData.holdings;
  const sectorAllocations = calculateSectorAllocation(validHoldings);

  const accountCards = [
    { label: 'US Portfolio', value: 32140.00, change: '+ 2.4%', isUp: true, prefix: '$' },
    { label: 'NG Portfolio', value: 4250000, change: '▼ 1.2%', isUp: false, prefix: '₦' },
    { label: 'Fixed Income', value: 8500.00, change: '+ 0.5%', isUp: true, prefix: '$' },
    { label: 'GEMS', value: 3360.75, change: '+ 5.8%', isUp: true, prefix: '$' },
  ];

  return (
    <div className="min-h-screen bg-bg-page flex overflow-hidden">
      <Sidebar userName={portfolioData.user.name} />

      <div className="flex-1 h-screen bg-bg-canvas flex flex-col overflow-y-auto bg-[#F2F6F6]">
        <Header />

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

          {/* 2. Middle Sub-portfolio Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {accountCards.map((card) => (
              <div key={card.label} className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between cursor-pointer shadow-sm min-h-[120px]">
                <span className="text-[13px] font-bold text-slate-400 tracking-tight uppercase">{card.label}</span>
                <span className="text-[18px] font-extrabold text-slate-900 mt-2">
                  {card.prefix}{card.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span className={`text-[13px] font-bold mt-2 ${card.isUp ? 'text-[#00664F]' : 'text-red-500'}`}>
                  {card.change}
                </span>
              </div>
            ))}
          </div>




          {/* 3. Bottom Section: Side-by-Side Dual Ledger Track (Holdings & Transactions) */}

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Holdings Column Left */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-bold text-slate-900 tracking-tight">Holdings</h3>
                <button className="text-xs font-bold text-[#00664F] hover:cursor-pointer">View All</button>
              </div>

              <div className="flex flex-col gap-3">
                {validHoldings.slice(0, 5).map((holding) => {
                  const assetTicker = holding.ticker || "STOCK";
                  const assetName = holding.name || "";
                  const sharesCount = holding.shares ?? 0;

                  // Intentional Quirk 1: If currentPrice is 0, price is missing/unavailable
                  const isPriceMissing = holding.currentPrice === 0;
                  const currentVal = isPriceMissing ? 0 : (holding.currentValue ?? (sharesCount * (holding.currentPrice ?? 0)));

                  // Intentional Quirk 5: Calculate Gain/Loss dynamically if not explicitly provided
                  const totalCost = sharesCount * (holding.avgCost ?? 0);
                  const profitAmt = isPriceMissing ? 0 : (currentVal - totalCost);
                  const profitPct = totalCost > 0 ? (profitAmt / totalCost) * 100 : 0;
                  const isPositive = profitAmt >= 0;

                  return (
                    <div key={holding.id || assetTicker} className="bg-white border border-border rounded-2xl p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 ">
                        <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 text-sm">
                          {assetTicker.substring(0, 3)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800">{assetTicker}</span>
                          <span className="text-xs text-slate-400 font-medium">{assetName}</span>
                        </div>
                      </div>

                      <div className="text-center hidden sm:block">
                        <span className="text-[14px] text-slate-400 font-semibold block">Shares</span>
                        <span className="text-[16px] font-bold text-slate-800">{sharesCount.toFixed(2)}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[16px] font-bold text-text-neutral block">
                          {isPriceMissing
                            ? 'Price unavailable'
                            : formatCurrency(currentVal, portfolioData.summary.currency)
                          }
                        </span>
                        {!isPriceMissing && (
                          <span className={`text-[14px] font-bold ${isPositive ? 'text-success' : 'text-negative'}`}>
                            {isPositive ? '+' : ''}{formatCurrency(profitAmt, portfolioData.summary.currency)} ({isPositive ? '+' : ''}{profitPct.toFixed(1)}%)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Transactions Column Right */}
            <div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-bold text-slate-900 tracking-tight">Recent Transactions</h3>
                <button className="text-xs font-bold text-[#00664F] hover:cursor-pointer">View All</button>
              </div>

              <div className="flex flex-col bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                {/* Header Container */}
                

                {/* Transactions List */}
                <div className="flex flex-col divide-y divide-slate-200">
                  {portfolioData.transactions?.slice(0, 5).map((tx) => {
                    const txType = tx.type || "BUY";
                    const nameOfAsset = tx.name || tx.ticker || "Asset Stock";
                    const txShares = tx.shares || 0;
                    const txAmount = tx.totalAmount ?? 0;
                    const isBuy = txType.toUpperCase() === 'BUY';

                    // Check if it's the specific NVDA pending quirk from the mockup
                    const isPendingQuirk = tx.status === 'PENDING';

                    const formattedTxDate = tx.date
                      ? new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'Oct 24, 2023';

                    return (
                      <div key={tx.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                        {/* Left Side: Icon & Meta Details */}
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center font-bold justify-center text-2xl ${isBuy ? 'bg-accent-blue text-[#00664F]' : 'bg-[#D5EDE6] text-[#004D3C]'
                            }`}>
                            {isBuy ? '+' : '−'}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[15px] font-bold text-slate-800">
                              {txType.charAt(0) + txType.slice(1).toLowerCase()} {nameOfAsset}
                            </span>
                            <span className="text-xs text-slate-400 font-medium mt-0.5">
                              {formattedTxDate} • {txShares.toFixed(2)} Shares
                            </span>
                          </div>
                        </div>

                        {/* Right Side: Financial Amounts & Pill Statuses */}
                        <div className="text-right flex flex-col items-end gap-1.5">
                          <span className={`text-[15px] font-bold ${isPendingQuirk ? 'text-slate-400 italic font-medium' : 'text-slate-900'}`}>
                            {isPendingQuirk ? (
                              'Price unavailable'
                            ) : (
                              `${isBuy ? '-' : '+'}${formatCurrency(txAmount, portfolioData.summary.currency)}`
                            )}
                          </span>

                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${tx.status === 'COMPLETED' ? 'bg-[#D2F2E9] text-[#00664F]' :
                            tx.status === 'PENDING' ? 'bg-[#FCEFD6] text-[#C07E23]' :
                              'bg-[#FDE5E5] text-[#C73E3E]'
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