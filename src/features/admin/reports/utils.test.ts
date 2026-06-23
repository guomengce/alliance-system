import { describe, expect, it } from 'vitest';

import type { SettlementLog } from './types';
import { buildSettlementCsv } from './utils';

describe('admin reports utils', () => {
  it('builds settlement CSV from provided settlement logs', () => {
    const logs: SettlementLog[] = [
      { date: '2026-06-01', count: 2, total: 1000, status: 'completed' },
      { date: '2026-06-02', count: 3, total: 2500.5, status: 'pending' },
    ];

    expect(buildSettlementCsv(logs).startsWith('data:text/csv;charset=utf-8,')).toBe(true);
    expect(buildSettlementCsv(logs)).toContain('2026-06-01,2,1000,completed');
    expect(buildSettlementCsv(logs)).toContain('2026-06-02,3,2500.5,pending');
  });
});
