/**
 * Lawn Care Price Calculator
 *
 * Pricing model: flat per-visit rate by lot size + grade/complexity multipliers.
 * Calibrated to NKY/Cincinnati market rates (2026).
 * Mid estimate targets median of competitor bids ($280-$470 range for typical properties).
 *
 * @param {Object} params
 * @param {number} params.sqft_lawn - Total lawn square footage
 * @param {string} params.frequency - 'weekly', 'biweekly', 'monthly', 'onetime'
 * @param {string} params.grade - 'flat', 'gentle', 'moderate', 'steep', 'very_steep'
 * @param {string} params.complexity - 'simple', 'moderate', 'complex', 'very_complex'
 * @returns {{ low: number, mid: number, high: number }}
 */
export function calculateLawnCare({
  sqft_lawn = 0,
  frequency = 'weekly',
  grade = 'flat',
  complexity = 'simple'
} = {}) {
  /**
   * Base per-visit rates by lot size.
   * Mid calibrated so: 3,500 sqft + steep + complex = ~$375 (median of competitor range).
   */
  function getBaseRate(sqft) {
    if (sqft <= 3000)  return { low: 95,  mid: 125, high: 165 }   // Small yard
    if (sqft <= 5000)  return { low: 130, mid: 195, high: 260 }   // Medium yard (Sleepy Hollow)
    if (sqft <= 8000)  return { low: 185, mid: 250, high: 335 }   // Large yard
    if (sqft <= 12000) return { low: 250, mid: 340, high: 450 }   // XL yard
    if (sqft <= 20000) return { low: 350, mid: 475, high: 630 }   // Half acre+
    if (sqft <= 40000) return { low: 500, mid: 675, high: 895 }   // ~1 acre
    return { low: 720, mid: 970, high: 1290 }                      // 1+ acres
  }

  // Grade/slope multipliers
  const GRADE_MULT = {
    flat: 1.0,
    gentle: 1.15,
    moderate: 1.30,
    steep: 1.50,
    very_steep: 1.75
  }

  // Complexity multipliers
  const COMPLEXITY_MULT = {
    simple: 1.0,
    moderate: 1.15,
    complex: 1.30,
    very_complex: 1.50
  }

  // Frequency multipliers
  const FREQUENCY_MULT = {
    weekly: 1.0,
    biweekly: 1.15,
    monthly: 1.35,
    onetime: 1.50
  }

  const base = getBaseRate(sqft_lawn)
  const gradeMult = GRADE_MULT[grade] || 1.0
  const complexityMult = COMPLEXITY_MULT[complexity] || 1.0
  const freqMult = FREQUENCY_MULT[frequency] || 1.0

  const minCharge = 95

  const low = base.low * gradeMult * complexityMult * freqMult
  const mid = base.mid * gradeMult * complexityMult * freqMult
  const high = base.high * gradeMult * complexityMult * freqMult

  return {
    low: Math.max(minCharge, Math.round(low)),
    mid: Math.max(minCharge, Math.round(mid)),
    high: Math.max(minCharge, Math.round(high))
  }
}
