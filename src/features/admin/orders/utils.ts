import type { CommissionAllocation } from './types';

export function filterAllocations(allocations: CommissionAllocation[], detailSearchQuery: string) {
  return allocations.filter(alloc => {
    const q = detailSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      alloc.level.toLowerCase().includes(q) ||
      alloc.targetUid.toLowerCase().includes(q) ||
      alloc.nickname.toLowerCase().includes(q)
    );
  });
}
