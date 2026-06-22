import { describe, expect, it } from 'vitest';
import type { CommissionAllocation } from './types';
import { filterAllocations } from './utils';

const allocations: CommissionAllocation[] = [
  {
    level: 'L1',
    targetUid: '889421',
    nickname: 'Alice',
    rate: 10,
    amount: 100,
    status: 'distributed'
  },
  {
    level: 'L2',
    targetUid: '889422',
    nickname: 'Bob',
    rate: 5,
    amount: 50,
    status: 'pending_lock'
  }
];

describe('filterAllocations', () => {
  it('returns every allocation for an empty or whitespace query', () => {
    expect(filterAllocations(allocations, '')).toEqual(allocations);
    expect(filterAllocations(allocations, '   ')).toEqual(allocations);
  });

  it('matches allocation level, target uid, or nickname case-insensitively', () => {
    expect(filterAllocations(allocations, 'l2')).toEqual([allocations[1]]);
    expect(filterAllocations(allocations, '889421')).toEqual([allocations[0]]);
    expect(filterAllocations(allocations, 'ALICE')).toEqual([allocations[0]]);
  });

  it('returns an empty list when no allocation matches the query', () => {
    expect(filterAllocations(allocations, 'unknown')).toEqual([]);
  });
});
