'use client';

import React, { useState, useMemo } from 'react';
import { Transaction, filterTransactions, formatCurrency, formatDate } from '../services/portfolioService';

interface OrdersTabProps {
  transactions: Transaction[];
  currency: string;
}

export default function OrdersTab({ transactions, currency }: OrdersTabProps) {
  const [filter, setFilter] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');

  const filteredTransactions = useMemo(() => 
    filterTransactions(transactions, filter),
    [transactions, filter]
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'badge-completed';
      case 'PENDING':
        return 'badge-pending';
      case 'FAILED':
        return 'badge-failed';
      default:
        return 'badge-completed';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'PENDING':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case 'FAILED':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Filter Pills */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--spacing-sm)', 
        marginBottom: 'var(--spacing-lg)',
      }}>
        {(['ALL', 'BUY', 'SELL'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`pill ${filter === type ? 'active' : ''}`}
          >
            {type === 'ALL' ? 'All Orders' : type}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {filteredTransactions.length === 0 ? (
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
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p>No transactions found</p>
            <p style={{ fontSize: '13px', marginTop: 'var(--spacing-xs)' }}>
              Try adjusting your filter
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => {
            const isBuy = transaction.type === 'BUY';

            return (
              <div
                key={transaction.id}
                className="card"
                style={{
                  padding: 'var(--spacing-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderLeft: `4px solid ${
                    transaction.status === 'COMPLETED' 
                      ? 'var(--success)' 
                      : transaction.status === 'PENDING'
                      ? '#F5A623'
                      : 'var(--negative)'
                  }`,
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
                {/* Left: Transaction Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: '6px' }}>
                    <span 
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: isBuy ? 'var(--trove-green-light)' : '#FEE2E2',
                        color: isBuy ? 'var(--success)' : 'var(--negative)',
                      }}
                    >
                      {isBuy ? 'BUY' : 'SELL'}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-default)' }}>
                      {transaction.ticker}
                    </span>
                    <span className={`badge ${getStatusBadgeClass(transaction.status)}`}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </span>
                    </span>
                  </div>
                  
                  <p style={{ fontSize: '13px', color: 'var(--text-neutral)', marginBottom: '4px' }}>
                    {transaction.name}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginTop: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-disabled)' }}>
                      {transaction.shares} {transaction.shares === 1 ? 'share' : 'shares'} @ {formatCurrency(transaction.pricePerShare, currency)}
                    </span>
                  </div>
                </div>

                {/* Right: Amount & Date */}
                <div style={{ textAlign: 'right' }}>
                  <p style={{ 
                    fontSize: '15px', 
                    fontWeight: 600,
                    color: isBuy ? 'var(--negative)' : 'var(--success)',
                    marginBottom: '4px',
                  }}>
                    {isBuy ? '-' : '+'}{formatCurrency(transaction.totalAmount, currency)}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-disabled)' }}>
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Results Count */}
      {filteredTransactions.length > 0 && (
        <p style={{ 
          fontSize: '12px', 
          color: 'var(--text-neutral)',
          marginTop: 'var(--spacing-md)',
          textAlign: 'center',
        }}>
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>
      )}
    </div>
  );
}
