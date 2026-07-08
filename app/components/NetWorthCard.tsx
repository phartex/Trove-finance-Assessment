'use client';

import React, { useState } from 'react';
// Highlight-start: Ensure it is a named import within curly braces
import { PortfolioSummary, calculatePortfolioChange, formatCurrency } from '../services/portfolioService';
// Highlight-end

interface NetWorthCardProps {
  summary: PortfolioSummary;
  userName: string;
}

export default function NetWorthCard({ summary }: NetWorthCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  
  // Destructure the properties returned by your service function
  const { changePercent, isPositive } = calculatePortfolioChange(summary);
  const timeframes = ['1D', '1W', '1M', 'ALL'];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between h-[300px] shadow-sm">
      
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-bold text-slate-900 tracking-tight">Total Net Worth</span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title={showBalance ? 'Hide balance' : 'Show balance'}
          >
            {showBalance ? (
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTimeframe === tf
                  ? 'bg-[#EBF5F2] text-[#00664F]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Numerical Metrics */}
      <div className="flex items-baseline gap-2.5 mb-1">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
          {showBalance 
            ? formatCurrency(summary.totalPortfolioValue, summary.currency)
            : '••••••'
          }
        </h2>
        
        <div className={`flex items-center gap-0.5 font-bold text-sm ${isPositive ? 'text-[#00664F]' : 'text-red-500'}`}>
          {isPositive ? (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
              <polyline points="17 18 23 18 23 12" />
            </svg>
          )}
          <span>{isPositive ? '+' : '-'}{changePercent.toFixed(1)}%</span>
        </div>
      </div>

      {/* Interactive Trendline Graph */}
      <div className="w-full flex-1 relative mt-2 min-h-[120px]">
        <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isPositive ? '#00664F' : '#EF4444'} stopOpacity="0.15" />
              <stop offset="100%" stopColor={isPositive ? '#00664F' : '#EF4444'} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          <path
            d="M 0 120 Q 120 110 200 70 T 400 90 T 500 20 L 500 150 L 0 150 Z"
            fill="url(#chartGradient)"
          />
          
          <path
            d="M 0 120 Q 120 110 200 70 T 400 90 T 500 20"
            fill="none"
            stroke={isPositive ? '#059A83' : '#EF4444'}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}