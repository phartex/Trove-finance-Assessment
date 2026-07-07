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
      <div className="bg-card-surface rounded-2xl border border-border p-6 shadow-sm">
        <p className="text-text-neutral text-center">
          No account data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card-surface rounded-2xl border border-border p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-medium text-text-neutral uppercase tracking-wide">
          Account Summary
        </p>
      </div>

      {/* Account Cards */}
      <div className="flex flex-col gap-4">
        {accounts.map((account) => (
          <div
            key={account.category}
            className="p-4 bg-bg-default rounded-xl flex justify-between items-center transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Left: Category Name & Positions */}
            <div>
              <h4 className="text-sm font-semibold text-text-default mb-0.5">
                {account.category}
              </h4>
              <p className="text-xs text-text-neutral">
                {account.positions} {account.positions === 1 ? 'position' : 'positions'}
              </p>
            </div>

            {/* Right: Total Value */}
            <div className="text-right">
              <p className="text-base font-semibold text-text-default">
                {formatCurrency(account.totalValue, currency)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
        <span className="text-sm text-text-neutral">
          Total Categories
        </span>
        <span className="text-sm font-semibold text-text-default">
          {accounts.length}
        </span>
      </div>
    </div>
  );
}
