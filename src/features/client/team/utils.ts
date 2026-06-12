import type { DownlineMember } from '../../../types';

export const TEAM_LEVEL_FILTERS = ['all', 'L1', 'L2', 'L3'] as const;

export function filterDownlines(
  downlines: DownlineMember[],
  levelFilter: string,
  searchQuery: string
) {
  return downlines.filter(m => {
    if (levelFilter !== 'all' && m.level !== levelFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return m.uid.includes(q) || m.level.toLowerCase().includes(q);
    }
    return true;
  });
}
