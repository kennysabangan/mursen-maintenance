/**
 * Lawn Care Price Calculator
 * 
 * @param {Object} params
 * @param {number} params.sqft_lawn - Square footage of lawn area
 * @param {string} params.frequency - 'weekly', 'biweekly', 'monthly', 'onetime'
 * @returns {{ low: number, mid: number, high: number }}
 */
export function calculateLawnCare({
  sqft_lawn = 0,
  frequency = 'biweekly'
} = {}) {
  const BASE_RATES = {
    low: 0.02,
    mid: 0.03,
    high: 0.04
  }

  // Frequency discounts (bulk = cheaper per visit)
  const FREQUENCY_MULT = {
    weekly: 0.85,
    biweekly: 1.0,
    monthly: 1.15,
    onetime: 1.3
  }

  const freqMult = FREQUENCY_MULT[frequency] || 1.0

  // Minimum charge
  const minCharge = 45

  const low = sqft_lawn * BASE_RATES.low * freqMult
  const mid = sqft_lawn * BASE_RATES.mid * freqMult
  const high = sqft_lawn * BASE_RATES.high * freqMult

  return {
    low: Math.max(minCharge, Math.round(low * 100) / 100),
    mid: Math.max(minCharge, Math.round(mid * 100) / 100),
    high: Math.max(minCharge, Math.round(high * 100) / 100)
  }
}
