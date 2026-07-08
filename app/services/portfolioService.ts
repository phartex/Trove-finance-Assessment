/**
 * Portfolio Service Layer
 * * This service wraps the JSON data and simulates asynchronous API calls.
 * It handles data transformation and deals with intentional data quirks.
 */

import portfolioData from './Portfolio_data.json';

// Types
export interface Holding {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  currency: string;
  currentValue?: number;
  totalCost?: number;
  gainLoss?: number;
  gainLossPercent?: number;
  priceUnavailable?: boolean; // Flag for UI
}

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  ticker: string;
  name: string;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface User {
  name: string;
  accountId: string;
  lastUpdated: string;
}

export interface PortfolioSummary {
  totalPortfolioValue: number;
  totalInvested: number;
  currency: string;
}

export interface PortfolioData {
  user: User;
  summary: PortfolioSummary;
  holdings: Holding[];
  transactions: Transaction[];
}

export interface SectorAllocation {
  sector: string;
  value: number;
  percentage: number;
  color: string;
}

export interface AccountSummary {
  category: string;
  positions: number;
  totalValue: number;
}

// Simulated network delay
const SIMULATED_DELAY = 800;

// Sector colors for allocation chart
const SECTOR_COLORS: Record<string, string> = {
  'Technology': '#059A83',    // Primary Trove Green
  'Healthcare': '#00B6DF',    // Accent blue
  'Finance': '#7B79C9',       // Purple
  'Automotive': '#F2C891',    // Cream
  'Entertainment': '#00323D', // Dark blue
};

const DEFAULT_COLOR = '#687D7A';

/**
 * Calculates derived fields for holdings
 * Handles data quirks:
 * 1. NVDA has currentPrice = 0 - treated as "Price unavailable"
 * 2. DIS has shares = 0 - treated as "Closed position" (excluded from portfolio)
 */
function processHoldings(holdings: any[]): Holding[] {
  return holdings
    .filter(holding => holding.shares > 0) // Skip closed positions completely
    .map(holding => {
      const shares = holding.shares;
      const avgCost = holding.avgCost;
      
      // Handle NVDA's currentPrice = 0
      const currentPrice = holding.currentPrice === 0 ? null : holding.currentPrice;
      const currentValue = currentPrice !== null ? shares * currentPrice : 0;
      const totalCost = shares * avgCost;
      const gainLoss = currentPrice !== null ? currentValue - totalCost : null;
      const gainLossPercent = currentPrice !== null && totalCost > 0 
        ? ((currentValue - totalCost) / totalCost) * 100 
        : null;

      return {
        ...holding,
        currentPrice: currentPrice !== null ? currentPrice : 0,
        priceUnavailable: currentPrice === null, 
        currentValue,
        totalCost,
        gainLoss,
        gainLossPercent,
      };
    });
}

/**
 * Fetch portfolio data wrapper matching TanStack fetcher signature
 */
export async function fetchPortfolioData(): Promise<PortfolioData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const processedHoldings = processHoldings(portfolioData.holdings);
        
        // Use the totalPortfolioValue directly from JSON (don't recalculate)
        // This preserves the mock data value: 48250.75
        resolve({
          user: portfolioData.user,
          summary: portfolioData.summary,
          holdings: processedHoldings,
          transactions: portfolioData.transactions.map(t => ({
            ...t,
            type: t.type as 'BUY' | 'SELL',
            status: t.status as 'COMPLETED' | 'PENDING' | 'FAILED',
          })),
        });
      } catch (err) {
        reject(new Error('Failed to process structure parsing maps.'));
      }
    }, SIMULATED_DELAY);
  });
}

export function calculateSectorAllocation(holdings: Holding[]): SectorAllocation[] {
  const sectorMap = new Map<string, number>();
  
  holdings.forEach(holding => {
    const currentValue = holding.currentValue || 0;
    const existing = sectorMap.get(holding.sector) || 0;
    sectorMap.set(holding.sector, existing + currentValue);
  });

  const totalValue = Array.from(sectorMap.values()).reduce((sum, val) => sum + val, 0);

  return Array.from(sectorMap.entries())
    .map(([sector, value]) => ({
      sector,
      value,
      percentage: totalValue > 0 ? (value / totalValue) * 100 : 0,
      color: SECTOR_COLORS[sector] || DEFAULT_COLOR,
    }))
    .sort((a, b) => b.value - a.value);
}

export function getAccountSummaries(holdings: Holding[]): AccountSummary[] {
  const sectorMap = new Map<string, { positions: number; totalValue: number }>();

  holdings.forEach(holding => {
    const existing = sectorMap.get(holding.sector) || { positions: 0, totalValue: 0 };
    sectorMap.set(holding.sector, {
      positions: existing.positions + 1,
      totalValue: existing.totalValue + (holding.currentValue || 0),
    });
  });

  return Array.from(sectorMap.entries())
    .map(([category, data]) => ({
      category,
      positions: data.positions,
      totalValue: data.totalValue,
    }))
    .sort((a, b) => b.totalValue - a.totalValue);
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Formats percentage with sign
 */
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Filters transactions by type
 */
export function filterTransactions(
  transactions: Transaction[],
  filter: 'ALL' | 'BUY' | 'SELL'
): Transaction[] {
  if (filter === 'ALL') return transactions;
  return transactions.filter(t => t.type === filter);
}

/**
 * Filters holdings by search query and sector
 */
export function filterHoldings(
  holdings: Holding[],
  searchQuery: string,
  sectorFilter: string
): Holding[] {
  return holdings.filter(holding => {
    const matchesSearch = !searchQuery || 
      holding.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holding.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = sectorFilter === 'All' || holding.sector === sectorFilter;
    
    return matchesSearch && matchesSector;
  });
}

/**
 * Gets unique sectors from holdings
 */
export function getUniqueSectors(holdings: Holding[]): string[] {
  const sectors = new Set(holdings.map(h => h.sector));
  return ['All', ...Array.from(sectors).sort()];
}

/**
 * Calculates percentage change for net worth
 * (Using the summary data as baseline)
 */
export function calculatePortfolioChange(summary: PortfolioSummary): {
  changePercent: number;
  isPositive: boolean;
} {
  const change = summary.totalPortfolioValue - summary.totalInvested;
  const changePercent = summary.totalInvested > 0 
    ? (change / summary.totalInvested) * 100 
    : 0;
  
  return {
    changePercent: Math.abs(changePercent),
    isPositive: change >= 0,
  };
}