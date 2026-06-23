import { describe, expect, it } from 'vitest';

import { CREDIT_POOL_PROGRESS_PERCENT, getCreditPoolRing } from './utils';

describe('client member utils', () => {
  it('keeps the mock credit pool progress at the current dashboard value', () => {
    expect(CREDIT_POOL_PROGRESS_PERCENT).toBe(65);
  });

  it('calculates credit pool ring geometry from progress percent', () => {
    const ring = getCreditPoolRing(65);

    expect(ring.radius).toBe(80);
    expect(ring.circumference).toBeCloseTo(2 * Math.PI * 80);
    expect(ring.strokeDashoffset).toBeCloseTo(ring.circumference * 0.35);
  });
});
