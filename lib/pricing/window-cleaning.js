/**
 * Window Cleaning Price Calculator
 * 
 * @param {Object} params
 * @param {number} params.window_count - Number of windows
 * @param {number} params.stories - Number of stories (default: 1)
 * @returns {{ low: number, mid: number, high: number }}
 */
export function calculateWindowCleaning({
  window_count = 0,
  stories = 1
} = {}) {
  const RATES = {
    low: 8,
    mid: 12,
    high: 16
  }

  // Screen fee per screen (typically all windows have screens)
  const SCREEN_FEE = {
    low: 4,
    mid: 5,
    high: 6
  }

  // Story multiplier (2nd+ floor = harder access)
  const STORY_MULT = stories === 1 ? 1.0 : stories === 2 ? 1.25 : 1.50

  const low = window_count * (RATES.low + SCREEN_FEE.low) * STORY_MULT
  const mid = window_count * (RATES.mid + SCREEN_FEE.mid) * STORY_MULT
  const high = window_count * (RATES.high + SCREEN_FEE.high) * STORY_MULT

  // Minimum charge
  const minCharge = 100

  return {
    low: Math.max(minCharge, Math.round(low * 100) / 100),
    mid: Math.max(minCharge, Math.round(mid * 100) / 100),
    high: Math.max(minCharge, Math.round(high * 100) / 100)
  }
}
