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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-trove-green-light text-success';
      case 'PENDING':
        return 'bg-pending-bg text-pending-text';
      case 'FAILED':
        return 'bg-red-100 text-negative';
      default:
        return 'bg-trove-green-light text-success';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'PENDING':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case 'FAILED':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'border-l-success';
      case 'PENDING':
        return 'border-l-pending-text';
      case 'FAILED':
        return 'border-l-negative';
      default:
        return 'border-l-success';
    }
  };

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex gap-2 mb-6">
        {(['ALL', 'BUY', 'SELL'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              filter === type
                ? 'bg-trove-green text-white border-trove-green'
                : 'bg-card-surface text-text-neutral border-border hover:bg-bg-default'
            }`}
          >
            {type === 'ALL' ? 'All Orders' : type}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="flex flex-col gap-4">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-text-neutral">
            <svg
              className="w-12 h-12 mx-auto mb-4 opacity-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p>No transactions found</p>
            <p className="text-sm mt-1">Try adjusting your filter</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => {
            const isBuy = transaction.type === 'BUY';

            return (
              <div
                key={transaction.id}
                className={`bg-card-surface border border-border rounded-xl p-4 flex justify-between items-start transition-all hover:-translate-y-0.5 hover:shadow-md border-l-4 ${getBorderColor(transaction.status)}`}
              >
                {/* Left: Transaction Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span 
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isBuy 
                          ? 'bg-trove-green-light text-success' 
                          : 'bg-red-100 text-negative'
                      }`}
                    >
                      {isBuy ? 'BUY' : 'SELL'}
                    </span>
                    <span className="text-base font-semibold text-text-default">
                      {transaction.ticker}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusStyles(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-neutral mb-1">
                    {transaction.name}
                  </p>
                  
                  <p className="text-xs text-text-disabled mt-2">
                    {transaction.shares} {transaction.shares === 1 ? 'share' : 'shares'} @ {formatCurrency(transaction.pricePerShare, currency)}
                  </p>
                </div>

                {/* Right: Amount & Date */}
                <div className="text-right">
                  <p className={`text-base font-semibold mb-1 ${isBuy ? 'text-negative' : 'text-success'}`}>
                    {isBuy ? '-' : '+'}{formatCurrency(transaction.totalAmount, currency)}
                  </p>
                  <p className="text-xs text-text-disabled">
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
        <p className="text-xs text-text-neutral mt-4 text-center">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>
      )}
    </div>
  );
}
