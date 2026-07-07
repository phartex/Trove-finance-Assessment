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
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: 'var(--spacing-md)' }}>
          <svg
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-disabled)',
            }}
            width="18"
            height="18"
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
            className="input"
            style={{ paddingLeft: '44px' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-disabled)',
                padding: '4px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Sector Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`pill ${selectedSector === sector ? 'active' : ''}`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Holdings List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {filteredHoldings.length === 0 ? (
          <div 
            style={{
              padding: 'var(--spacing-2xl)',
              textAlign: 'center',
              color: 'var(--text-neutral)',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ margin: '0 auto var(--spacing-md)', opacity: 0.5 }}
            >
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            <p>No holdings found</p>
            <p style={{ fontSize: '13px', marginTop: 'var(--spacing-xs)' }}>
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredHoldings.map((holding) => {
            const hasPriceData = holding.gainLoss !== null;
            const isPositive = hasPriceData && (holding.gainLoss || 0) >= 0;
            const isPriceUnavailable = holding.currentPrice === 0;

            return (
              <div
                key={holding.id}
                className="card"
                style={{
                  padding: 'var(--spacing-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                {/* Left: Stock Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: '4px' }}>
                    <span 
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: 'var(--text-default)',
                      }}
                    >
                      {holding.ticker}
                    </span>
                    <span 
                      className="pill"
                      style={{ 
                        padding: '2px 8px',
                        fontSize: '10px',
                        cursor: 'default',
                      }}
                    >
                      {holding.sector}
                    </span>
                    {isPriceUnavailable && (
                      <span 
                        style={{
                          fontSize: '10px',
                          padding: '2px 6px',
                          backgroundColor: '#FFF4E0',
                          color: '#F5A623',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}
                      >
                        Price Unavailable
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-neutral)' }}>
                    {holding.name}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-disabled)', marginTop: '4px' }}>
                    {holding.shares} {holding.shares === 1 ? 'share' : 'shares'} @ {formatCurrency(holding.avgCost, currency)}
                  </p>
                </div>

                {/* Right: Value & Gain/Loss */}
                <div style={{ textAlign: 'right' }}>
                  <p style={{ 
                    fontSize: '15px', 
                    fontWeight: 600,
                    color: 'var(--text-default)',
                    marginBottom: '4px',
                  }}>
                    {isPriceUnavailable 
                      ? 'N/A'
                      : formatCurrency(holding.currentValue || 0, currency)
                    }
                  </p>
                  
                  {hasPriceData && !isPriceUnavailable && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <span 
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          color: isPositive ? 'var(--success)' : 'var(--negative)',
                        }}
                      >
                        {isPositive ? '+' : ''}{formatCurrency(holding.gainLoss || 0, currency)}
                      </span>
                      <span 
                        style={{
                          fontSize: '12px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 500,
                          backgroundColor: isPositive ? 'var(--trove-green-light)' : '#FEE2E2',
                          color: isPositive ? 'var(--success)' : 'var(--negative)',
                        }}
                      >
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
        <p style={{ 
          fontSize: '12px', 
          color: 'var(--text-neutral)',
          marginTop: 'var(--spacing-md)',
          textAlign: 'center',
        }}>
          Showing {filteredHoldings.length} of {holdings.length} holdings
        </p>
      )}
    </div>
  );
}
