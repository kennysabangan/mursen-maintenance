/**
 * Power Washing Price Calculator
 * 
 * @param {Object} params
 * @param {number} params.sqft_siding - Square footage of siding
 * @param {number} params.sqft_driveway - Square footage of driveway
 * @param {number} params.sqft_walkways - Square footage of walkways
 * @param {number} params.stories - Number of stories (default: 1)
 * @param {string} params.condition - Property condition: 'light', 'moderate', 'heavy'
 * @returns {{ low: number, mid: number, high: number }}
 */
export function calculatePowerWashing({
  sqft_siding = 0,
  sqft_driveway = 0,
  sqft_walkways = 0,
  stories = 1,
  condition = 'moderate'
} = {}) {
  // Base rates per sqft
  const RATES = {
    siding: { low: 0.18, mid: 0.25, high: 0.32 },
    driveway: { low: 0.12, mid: 0.16, high: 0.22 },
    walkways: { low: 0.14, mid: 0.18, high: 0.24 }
  }

  // Condition multipliers
  const CONDITION_MULT = {
    light: 0.85,
    moderate: 1.0,
    heavy: 1.35
  }

  // Story multiplier (higher = more difficult access)
  const STORY_MULT = stories === 1 ? 1.0 : stories === 2 ? 1.15 : 1.30

  const condMult = CONDITION_MULT[condition] || 1.0

  const low =
    (sqft_siding * RATES.siding.low +
      sqft_driveway * RATES.driveway.low +
      sqft_walkways * RATES.walkways.low) *
    condMult *
    STORY_MULT

  const mid =
    (sqft_siding * RATES.siding.mid +
      sqft_driveway * RATES.driveway.mid +
      sqft_walkways * RATES.walkways.mid) *
    condMult *
    STORY_MULT

  const high =
    (sqft_siding * RATES.siding.high +
      sqft_driveway * RATES.driveway.high +
      sqft_walkways * RATES.walkways.high) *
    condMult *
    STORY_MULT

  // Minimum charge
  const minCharge = 150

  return {
    low: Math.max(minCharge, Math.round(low * 100) / 100),
    mid: Math.max(minCharge, Math.round(mid * 100) / 100),
    high: Math.max(minCharge, Math.round(high * 100) / 100)
  }
}
