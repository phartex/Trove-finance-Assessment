'use client';

import React from 'react';
import { AccountSummary, formatCurrency } from '../services/portfolioService';

interface AccountListProps {
  accounts: AccountSummary[];
  currency: string;
}

export default function AccountList({ accounts, currency }: AccountListProps) {
  if (accounts.length === 0) {
    return (
      <div className="card">
        <p style={{ color: 'var(--text-neutral)', textAlign: 'center' }}>
          No account data available
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <p style={{ 
          fontSize: '12px', 
          color: 'var(--text-neutral)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 500,
        }}>
          Account Summary
        </p>
      </div>

      {/* Account Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {accounts.map((account) => (
          <div
            key={account.category}
            style={{
              padding: 'var(--spacing-md)',
              backgroundColor: 'var(--bg-default)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Left: Category Name & Positions */}
            <div>
              <h4 style={{ 
                fontSize: '14px', 
                fontWeight: 600,
                color: 'var(--text-default)',
                marginBottom: '2px',
              }}>
                {account.category}
              </h4>
              <p style={{ 
                fontSize: '12px', 
                color: 'var(--text-neutral)',
              }}>
                {account.positions} {account.positions === 1 ? 'position' : 'positions'}
              </p>
            </div>

            {/* Right: Total Value */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ 
                fontSize: '15px', 
                fontWeight: 600,
                color: 'var(--text-default)',
              }}>
                {formatCurrency(account.totalValue, currency)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div 
        style={{
          marginTop: 'var(--spacing-lg)',
          paddingTop: 'var(--spacing-md)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '13px', color: 'var(--text-neutral)' }}>
          Total Categories
        </span>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: 600,
          color: 'var(--text-default)',
        }}>
          {accounts.length}
        </span>
      </div>
    </div>
  );
}
