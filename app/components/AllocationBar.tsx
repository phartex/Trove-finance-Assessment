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
      <div className="card">
        <p style={{ color: 'var(--text-neutral)', textAlign: 'center' }}>
          No allocation data available
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
          Allocation by Sector
        </p>
      </div>

      {/* Stacked Bar */}
      <div className="allocation-bar" style={{ marginBottom: 'var(--spacing-lg)' }}>
        {allocations.map((allocation, index) => (
          <div
            key={allocation.sector}
            className="allocation-segment"
            style={{
              width: `${allocation.percentage}%`,
              backgroundColor: allocation.color,
              minWidth: allocation.percentage > 0 ? '4px' : '0',
            }}
            title={`${allocation.sector}: ${allocation.percentage.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
        {allocations.map((allocation) => (
          <div 
            key={allocation.sector}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
            }}
          >
            <div 
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                backgroundColor: allocation.color,
              }}
            />
            <div>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: 500,
                color: 'var(--text-default)',
              }}>
                {allocation.sector}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-neutral)' }}>
                  {allocation.percentage.toFixed(1)}%
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-disabled)' }}>
                  ({formatCurrency(allocation.value, currency)})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
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
          Total Portfolio Value
        </span>
        <span style={{ 
          fontSize: '16px', 
          fontWeight: 600,
          color: 'var(--text-default)',
        }}>
          {formatCurrency(totalValue, currency)}
        </span>
      </div>
    </div>
  );
}
