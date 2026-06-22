/**
 * Business simulation and calculation engine for alliance settlement operations
 */

export interface SimulationResult {
  totalRebate: number;
  userAEarned: number;
  overflowAmount: number;
  actualUnlocked: number;
  trooFromUnlock: number;
  unlockEntitled: number;
}

/**
 * Executes commission rebate distribution and queue unlocking mechanics.
 * 
 * Rules:
 *  - 10% of downline purchase enters lock-unlock allowance.
 *  - Unlocks up to existing remaining locked balance count.
 *  - Unlocked USDT triggers TROO minting conversion at a static cross-rate of 1 USDT = 10 TROO.
 *  - Rebate calculates from downline package price & standard split percent.
 *  - Distributed amount gets capped at the remaining capacity of the parent agent's commission pool size.
 * 
 * @param purchaseAmt 
 * @param commissionPercent 
 * @param lockedQueueAmount 
 * @param commissionPoolRemaining 
 */
export function calculateDirectSimulation(
  purchaseAmt: number,
  commissionPercent: number,
  lockedQueueAmount: number,
  commissionPoolRemaining: number
): SimulationResult {
  const unlockEntitled = purchaseAmt * 0.10;
  const actualUnlocked = Math.min(lockedQueueAmount, unlockEntitled);
  const trooFromUnlock = actualUnlocked * 10; // Rate of 1 USDT = 10 TROO
  
  const totalRebate = purchaseAmt * (commissionPercent / 100);
  const userAEarned = Math.min(totalRebate, commissionPoolRemaining);
  const overflowAmount = totalRebate - userAEarned;

  return {
    totalRebate: parseFloat(totalRebate.toFixed(2)),
    userAEarned: parseFloat(userAEarned.toFixed(2)),
    overflowAmount: parseFloat(overflowAmount.toFixed(2)),
    actualUnlocked: parseFloat(actualUnlocked.toFixed(2)),
    trooFromUnlock: parseFloat(trooFromUnlock.toFixed(2)),
    unlockEntitled: parseFloat(unlockEntitled.toFixed(2))
  };
}

/**
 * Calculates standard asset values and formats
 */
export function formatAsUSDT(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value).replace('$', '¥ ');
}
