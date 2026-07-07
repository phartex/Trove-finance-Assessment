'use client';

import React, { useState, useMemo } from 'react';
import { Holding, filterHoldings, getUniqueSectors, formatCurrency, formatPercentage } from '../services/portfolioService';

interface StocksTabProps {
  holdings: Holding[];
  currency: string;
}

export default function StocksTab({ holdings, currency }: StocksTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');

  const sectors = useMemo(() => getUniqueSectors(holdings), [holdings]);
  
  const filteredHoldings = useMemo(() => 
    filterHoldings(holdings, searchQuery, selectedSector),
    [holdings, searchQuery, selectedSector]
  );

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="mb-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-disabled"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by ticker or company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-bg-default border border-border rounded-xl text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:border-trove-green focus:bg-card-surface transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-disabled hover:text-text-default p-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Sector Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                selectedSector === sector
                  ? 'bg-trove-green text-white border-trove-green'
                  : 'bg-card-surface text-text-neutral border-border hover:bg-bg-default'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Holdings List */}
      <div className="flex flex-col gap-4">
        {filteredHoldings.length === 0 ? (
          <div className="py-12 text-center text-text-neutral">
            <svg
              className="w-12 h-12 mx-auto mb-4 opacity-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            <p>No holdings found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredHoldings.map((holding) => {
            const hasPriceData = holding.gainLoss !== null;
            const isPositive = hasPriceData && (holding.gainLoss || 0) >= 0;
            const isPriceUnavailable = holding.currentPrice === 0;

            return (
              <div
                key={holding.id}
                className="bg-card-surface border border-border rounded-xl p-4 flex justify-between items-start transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Left: Stock Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-text-default">
                      {holding.ticker}
                    </span>
                    <span className="px-2 py-0.5 text-xs border border-border rounded-full text-text-neutral cursor-default">
                      {holding.sector}
                    </span>
                    {isPriceUnavailable && (
                      <span className="text-xs px-1.5 py-0.5 bg-pending-bg text-pending-text rounded font-semibold">
                        Price Unavailable
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-neutral">
                    {holding.name}
                  </p>
                  <p className="text-xs text-text-disabled mt-1">
                    {holding.shares} {holding.shares === 1 ? 'share' : 'shares'} @ {formatCurrency(holding.avgCost, currency)}
                  </p>
                </div>

                {/* Right: Value & Gain/Loss */}
                <div className="text-right">
                  <p className="text-base font-semibold text-text-default mb-1">
                    {isPriceUnavailable 
                      ? 'N/A'
                      : formatCurrency(holding.currentValue || 0, currency)
                    }
                  </p>
                  
                  {hasPriceData && !isPriceUnavailable && (
                    <div className="flex items-center justify-end gap-1.5">
                      <span className={`text-sm font-semibold ${isPositive ? 'text-success' : 'text-negative'}`}>
                        {isPositive ? '+' : ''}{formatCurrency(holding.gainLoss || 0, currency)}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                        isPositive 
                          ? 'bg-trove-green-light text-success' 
                          : 'bg-red-100 text-negative'
                      }`}>
                        {isPositive ? '+' : ''}{(holding.gainLossPercent || 0).toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Results Count */}
      {filteredHoldings.length > 0 && (
        <p className="text-xs text-text-neutral mt-4 text-center">
          Showing {filteredHoldings.length} of {holdings.length} holdings
        </p>
      )}
    </div>
  );
}
