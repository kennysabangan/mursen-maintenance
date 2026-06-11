/**
 * Handyman Price Calculator
 * 
 * @param {Object} params
 * @param {number} params.estimated_hours - Estimated hours for the job
 * @returns {{ low: number, mid: number, high: number }}
 */
export function calculateHandyman({
  estimated_hours = 1
} = {}) {
  const HOURLY_RATES = {
    low: 75,
    mid: 100,
    high: 125
  }

  // Minimum charge (1 hour minimum)
  const minHours = Math.max(1, estimated_hours)

  return {
    low: Math.round(minHours * HOURLY_RATES.low * 100) / 100,
    mid: Math.round(minHours * HOURLY_RATES.mid * 100) / 100,
    high: Math.round(minHours * HOURLY_RATES.high * 100) / 100
  }
}
