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
    <div className="card" style={{ position: 'relative' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <p style={{ 
          fontSize: '12px', 
          color: 'var(--text-neutral)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 500,
        }}>
          Net Worth
        </p>
      </div>

      {/* Balance Display */}
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-sm)',
        }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 600,
            color: 'var(--text-default)',
            letterSpacing: '-0.5px',
          }}>
            {showBalance 
              ? formatCurrency(summary.totalPortfolioValue, summary.currency)
              : '••••••'
            }
          </h2>
          
          {/* Toggle Button */}
          <button
            onClick={() => setShowBalance(!showBalance)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'var(--text-neutral)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={showBalance ? 'Hide balance' : 'Show balance'}
          >
            {showBalance ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {/* Change Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: isPositive ? 'var(--trove-green-light)' : '#FEE2E2',
              color: isPositive ? 'var(--success)' : 'var(--negative)',
            }}
          >
            {isPositive ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
              </svg>
            )}
            {isPositive ? '+' : '-'}{changePercent.toFixed(2)}%
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-neutral)' }}>
            from initial investment
          </span>
        </div>
      </div>

      {/* Welcome Message */}
      <div 
        style={{
          marginTop: 'var(--spacing-lg)',
          paddingTop: 'var(--spacing-md)',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <p style={{ fontSize: '13px', color: 'var(--text-neutral)' }}>
          Welcome back, <strong style={{ color: 'var(--text-default)' }}>{userName}</strong>
        </p>
      </div>
    </div>
  );
}
