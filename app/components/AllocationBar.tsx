'use client';

import React from 'react';
import { SectorAllocation, formatCurrency } from '../services/portfolioService';

interface AllocationBarProps {
  allocations: SectorAllocation[];
  totalValue: number;
  currency: string;
}

export default function AllocationBar({ allocations, totalValue, currency }: AllocationBarProps) {
  if (allocations.length === 0) {
    return (
      <div className="bg-card-surface rounded-2xl border border-border p-6 shadow-sm">
        <p className="text-text-neutral text-center">
          No allocation data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card-surface rounded-2xl border border-border p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-medium text-text-neutral uppercase tracking-wide">
          Allocation by Sector
        </p>
      </div>

      {/* Stacked Bar */}
      <div className="flex h-8 rounded-xl overflow-hidden bg-bg-default mb-6">
        {allocations.map((allocation) => (
          <div
            key={allocation.sector}
            className="transition-opacity hover:opacity-90 relative min-w-[4px]"
            style={{
              width: `${allocation.percentage}%`,
              backgroundColor: allocation.color,
            }}
            title={`${allocation.sector}: ${allocation.percentage.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {allocations.map((allocation) => (
          <div 
            key={allocation.sector}
            className="flex items-center gap-2"
          >
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: allocation.color }}
            />
            <div>
              <span className="text-sm font-medium text-text-default">
                {allocation.sector}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-text-neutral">
                  {allocation.percentage.toFixed(1)}%
                </span>
                <span className="text-xs text-text-disabled">
                  ({formatCurrency(allocation.value, currency)})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
        <span className="text-sm text-text-neutral">
          Total Portfolio Value
        </span>
        <span className="text-base font-semibold text-text-default">
          {formatCurrency(totalValue, currency)}
        </span>
      </div>
    </div>
  );
}
