export const CREDIT_POOL_PROGRESS_PERCENT = 65;

export function getCreditPoolRing(progressPercent: number) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return {
    radius,
    circumference,
    strokeDashoffset
  };
}
