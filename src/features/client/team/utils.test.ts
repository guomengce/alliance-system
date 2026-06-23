import { describe, expect, it } from 'vitest';

import type { DownlineMember } from '../../../types';
import { TEAM_LEVEL_FILTERS, filterDownlines } from './utils';

const downlines: DownlineMember[] = [
  {
    uid: '880001',
    level: 'L1',
    tier: 'Gold',
    registrationDate: '2026-01-01',
    nodeSize: 3,
    volume: 1200,
    avatarLetter: 'A',
    invested: 1000,
  },
  {
    uid: '880002',
    level: 'L2',
    tier: 'Silver',
    registrationDate: '2026-01-02',
    nodeSize: 2,
    volume: 800,
    avatarLetter: 'B',
    invested: 500,
  },
  {
    uid: '990003',
    level: 'L3',
    tier: 'Bronze',
    registrationDate: '2026-01-03',
    nodeSize: 1,
    volume: 200,
    avatarLetter: 'C',
    invested: 100,
  },
];

describe('client team utils', () => {
  it('keeps supported team level filters in display order', () => {
    expect(TEAM_LEVEL_FILTERS).toEqual(['all', 'L1', 'L2', 'L3']);
  });

  it('filters downlines by level', () => {
    expect(filterDownlines(downlines, 'L2', '')).toEqual([downlines[1]]);
  });

  it('filters downlines by uid or level search within the selected level', () => {
    expect(filterDownlines(downlines, 'all', '990')).toEqual([downlines[2]]);
    expect(filterDownlines(downlines, 'all', 'l1')).toEqual([downlines[0]]);
    expect(filterDownlines(downlines, 'L2', '880')).toEqual([downlines[1]]);
  });
});
