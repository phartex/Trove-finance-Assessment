'use client';

import React, { useState } from 'react';
import { PortfolioSummary, calculatePortfolioChange, formatCurrency } from '../services/portfolioService';

interface NetWorthCardProps {
  summary: PortfolioSummary;
  userName: string;
}

export default function NetWorthCard({ summary, userName }: NetWorthCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  
  const { changePercent, isPositive } = calculatePortfolioChange(summary);

  return (
    <div className="bg-card-surface rounded-2xl border border-border p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-medium text-text-neutral uppercase tracking-wide">
          Net Worth
        </p>
      </div>

      {/* Balance Display */}
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-text-default tracking-tight">
            {showBalance 
              ? formatCurrency(summary.totalPortfolioValue, summary.currency)
              : '••••••'
            }
          </h2>
          
          {/* Toggle Button */}
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-1 text-text-neutral hover:text-text-default transition-colors"
            title={showBalance ? 'Hide balance' : 'Show balance'}
          >
            {showBalance ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center gap-2">
          <span 
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
              isPositive 
                ? 'bg-trove-green-light text-success' 
                : 'bg-red-100 text-negative'
            }`}
          >
            {isPositive ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
              </svg>
            )}
            {isPositive ? '+' : '-'}{changePercent.toFixed(2)}%
          </span>
          <span className="text-sm text-text-neutral">
            from initial investment
          </span>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm text-text-neutral">
          Welcome back, <strong className="text-text-default">{userName}</strong>
        </p>
      </div>
    </div>
  );
}
