export interface PriceRange {
  low: number;
  mid: number;
  high: number;
}

export interface LawnCareEstimate extends PriceRange {
  perVisit: PriceRange;
  monthly: PriceRange;
  tier: string;
  acres: number;
  sqft: number;
  frequency: string;
  visitsPerMonth: number;
}

export function calculateLawnCare(params: {
  sqft_lawn?: number;
  frequency?: 'weekly' | 'biweekly' | 'monthly' | 'onetime';
}): LawnCareEstimate;

export function calculatePowerWashing(params: Record<string, unknown>): PriceRange;
export function calculateWindowCleaning(params: Record<string, unknown>): PriceRange;
export function calculateHandyman(params: Record<string, unknown>): PriceRange;

export function calculateEstimate(params: {
  powerWashing?: Record<string, unknown> | null;
  lawnCare?: Record<string, unknown> | null;
  windowCleaning?: Record<string, unknown> | null;
  handyman?: Record<string, unknown> | null;
}): { services: Record<string, PriceRange>; totals: PriceRange };
