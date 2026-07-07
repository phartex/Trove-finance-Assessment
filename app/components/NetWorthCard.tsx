'use client';

import React, { useState } from 'react';
import { PortfolioSummary, calculatePortfolioChange, formatCurrency } from '../services/portfolioService';

interface NetWorthCardProps {
  summary: PortfolioSummary;
  userName: string;
}

export default function NetWorthCard({ summary }: NetWorthCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  
  const { changePercent, isPositive } = calculatePortfolioChange(summary);
  const timeframes = ['1D', '1W', '1M', 'ALL'];

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 flex flex-col justify-between h-[300px]">
      
      {/* Top Meta Bar: Title on Left, Custom Tab Filter Switcher on Right */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-slate-500">Total Net Worth</span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
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

        {/* Mock Timeframe Selector Deck */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
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

      {/* Numerical Metrics: Balance and Trending Indicators */}
      <div className="flex items-baseline gap-3 mb-1">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          {showBalance 
            ? formatCurrency(summary.totalPortfolioValue, summary.currency)
            : '••••••'
          }
        </h2>
        
        <div className="flex items-center gap-1 font-semibold text-sm text-[#00664F]">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          <span>+{changePercent.toFixed(1)}%</span>
        </div>
      </div>

      {/* Dynamic Native SVG Interactive Performance Graph */}
      <div className="w-full flex-1 relative mt-2 min-h-[120px]">
        <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
          <defs>
            {/* Soft Transparent Gradient Mesh Fill under the main trendline */}
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00664F" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00664F" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Shaded Area Under Curve */}
          <path
            d="M 0 120 Q 120 110 200 70 T 400 90 T 500 20 L 500 150 L 0 150 Z"
            fill="url(#chartGradient)"
          />
          
          {/* Primary Stroke Trendline */}
          <path
            d="M 0 120 Q 120 110 200 70 T 400 90 T 500 20"
            fill="none"
            stroke="#00664F"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}