export { calculatePowerWashing } from './power-washing'
export { calculateLawnCare } from './lawn-care'
export { calculateWindowCleaning } from './window-cleaning'
export { calculateHandyman } from './handyman'

/**
 * Calculate estimates for multiple services at once
 * 
 * @param {Object} params
 * @param {Object} params.powerWashing - Power washing params (or null to skip)
 * @param {Object} params.lawnCare - Lawn care params (or null to skip)
 * @param {Object} params.windowCleaning - Window cleaning params (or null to skip)
 * @param {Object} params.handyman - Handyman params (or null to skip)
 * @returns {Object} { services: { [name]: { low, mid, high } }, totals: { low, mid, high } }
 */
export function calculateEstimate({
  powerWashing = null,
  lawnCare = null,
  windowCleaning = null,
  handyman = null
} = {}) {
  const services = {}
  let totals = { low: 0, mid: 0, high: 0 }

  if (powerWashing) {
    services.powerWashing = calculatePowerWashing(powerWashing)
    totals.low += services.powerWashing.low
    totals.mid += services.powerWashing.mid
    totals.high += services.powerWashing.high
  }

  if (lawnCare) {
    services.lawnCare = calculateLawnCare(lawnCare)
    totals.low += services.lawnCare.low
    totals.mid += services.lawnCare.mid
    totals.high += services.lawnCare.high
  }

  if (windowCleaning) {
    services.windowCleaning = calculateWindowCleaning(windowCleaning)
    totals.low += services.windowCleaning.low
    totals.mid += services.windowCleaning.mid
    totals.high += services.windowCleaning.high
  }

  if (handyman) {
    services.handyman = calculateHandyman(handyman)
    totals.low += services.handyman.low
    totals.mid += services.handyman.mid
    totals.high += services.handyman.high
  }

  return { services, totals }
}
