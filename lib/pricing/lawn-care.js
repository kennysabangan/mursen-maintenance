/**
 * Lawn Care Price Calculator
 *
 * Pricing is tier-based on the MEASURED lawn area (the turf we actually mow),
 * matching Mursen's published à-la-carte rates in
 * RESEARCH/SERVICE_LIST_AND_PRICING.md:
 *
 *   Mow + edge, up to 1/4 acre   → $45   (≤ 10,890 sqft)
 *   Mow + edge, 1/4–1/2 acre     → $65   (10,890–21,780 sqft)
 *   Mow + edge, 1/2–1 acre       → $95   (21,780–43,560 sqft)
 *   Over 1 acre                  → $95 + $75 per additional 1/2 acre
 *
 * These are PER-VISIT prices. Frequency converts per-visit price into a
 * monthly estimate and applies a small volume adjustment per visit.
 *
 * @param {Object} params
 * @param {number} params.sqft_lawn - Measured square footage of lawn to service
 * @param {string} params.frequency - 'weekly' | 'biweekly' | 'monthly' | 'onetime'
 * @returns {{
 *   low: number, mid: number, high: number,      // per-visit range (back-compat)
 *   perVisit: { low: number, mid: number, high: number },
 *   monthly: { low: number, mid: number, high: number },
 *   tier: string, acres: number, sqft: number,
 *   frequency: string, visitsPerMonth: number
 * }}
 */
export function calculateLawnCare({
  sqft_lawn = 0,
  frequency = 'biweekly'
} = {}) {
  const SQFT_PER_ACRE = 43560

  // Per-visit base price by measured lawn size (mow + edge).
  const TIERS = [
    { maxSqft: 10890, price: 45, label: 'Up to 1/4 acre' },
    { maxSqft: 21780, price: 65, label: '1/4–1/2 acre' },
    { maxSqft: 43560, price: 95, label: '1/2–1 acre' }
  ]

  let basePrice
  let tierLabel
  if (sqft_lawn <= 0) {
    basePrice = 45
    tierLabel = 'Up to 1/4 acre'
  } else {
    const tier = TIERS.find(t => sqft_lawn <= t.maxSqft)
    if (tier) {
      basePrice = tier.price
      tierLabel = tier.label
    } else {
      // Over 1 acre: $95 for the first acre, +$75 per additional 1/2 acre.
      const extraAcres = (sqft_lawn - SQFT_PER_ACRE) / SQFT_PER_ACRE
      const halfAcreSteps = Math.ceil(extraAcres / 0.5)
      basePrice = 95 + halfAcreSteps * 75
      tierLabel = `${(sqft_lawn / SQFT_PER_ACRE).toFixed(2)} acres`
    }
  }

  // Per-visit volume adjustment + visits per month by frequency.
  const FREQUENCY = {
    weekly:   { perVisit: 0.92, visitsPerMonth: 4.33 },
    biweekly: { perVisit: 1.0,  visitsPerMonth: 2.17 },
    monthly:  { perVisit: 1.1,  visitsPerMonth: 1.0 },
    onetime:  { perVisit: 1.25, visitsPerMonth: 0 }
  }
  const freq = FREQUENCY[frequency] || FREQUENCY.biweekly

  const minCharge = 45
  const perVisitMid = Math.max(minCharge, basePrice * freq.perVisit)

  // Tight, honest range around the quoted per-visit price to account for
  // terrain, obstacles, and overgrowth confirmed on site.
  const round = n => Math.round(n * 100) / 100
  const perVisit = {
    low: round(Math.max(minCharge, perVisitMid * 0.9)),
    mid: round(perVisitMid),
    high: round(perVisitMid * 1.15)
  }

  const visits = freq.visitsPerMonth
  const monthly = {
    low: round(perVisit.low * visits),
    mid: round(perVisit.mid * visits),
    high: round(perVisit.high * visits)
  }

  return {
    // Back-compat: callers that read low/mid/high get the per-visit range.
    low: perVisit.low,
    mid: perVisit.mid,
    high: perVisit.high,
    perVisit,
    monthly,
    tier: tierLabel,
    acres: round(sqft_lawn / SQFT_PER_ACRE),
    sqft: Math.round(sqft_lawn),
    frequency,
    visitsPerMonth: visits
  }
}
