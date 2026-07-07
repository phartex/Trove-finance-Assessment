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
      <div className="bg-white rounded-2xl border border-border p-6 h-[300px] flex items-center justify-center">
        <p className="text-text-neutral text-sm text-center">
          No allocation data available
        </p>
      </div>
    );
  }

  // Pre-mapping colors to guarantee exact hex-matches with the mockup visuals
  const brandColors: Record<string, string> = {
    Technology: '#059A83',  
    Automotive: '#00B6DF',  
    Healthcare: '#E0F5E1',
    Finance: '#7B79C9',
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-border p-6 flex flex-col justify-between h-[300px]">
      
      {/* Title */}
      <div>
        <h3 className="text-[14px] font-bold text-text-default tracking-tight mb-5">
          Asset Allocation
        </h3>

        {/* Stacked Percentage Progress Bar Track */}
        <div className="flex h-5 rounded-full overflow-hidden bg-slate-100 mb-6 w-full">
          {allocations.map((allocation) => {
            const barColor = brandColors[allocation.sector] || allocation.color;
            return (
              <div
                key={allocation.sector}
                className="transition-all hover:opacity-95 relative first:rounded-l-full last:rounded-r-full"
                style={{
                  width: `${allocation.percentage}%`,
                  backgroundColor: barColor,
                }}
                title={`${allocation.sector}: ${allocation.percentage.toFixed(0)}%`}
              />
            );
          })}
        </div>

        {/* Legend Panel arranged into a structured 2-Column Grid matching the mockup */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {allocations.map((allocation) => {
            const dotColor = brandColors[allocation.sector] || allocation.color;
            return (
              <div key={allocation.sector} className="flex items-start gap-2.5">
                {/* Colored Marker Dot */}
                <span 
                  className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" 
                  style={{ backgroundColor: dotColor }}
                />
                
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-text-neutral leading-tight">
                    {allocation.sector}
                  </span>
                  <span className="text-[16px] font-bold text-text-neutral tracking-tight mt-0.5">
                    {allocation.percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional Clean Bottom Border Context Value for total assurance if needed */}
      <span className="sr-only">
        Total Portfolio Value: {formatCurrency(totalValue, currency)}
      </span>
    </div>
  );
}