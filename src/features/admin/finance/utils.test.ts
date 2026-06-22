import { describe, expect, it } from 'vitest';
import type { DownlineMember, Transaction } from '@/src/types';
import { applyWalletAdjustment, buildLedgerCsvContent } from './utils';

const downlines: DownlineMember[] = [
  {
    uid: '1001',
    level: 'L1',
    tier: 'Gold',
    registrationDate: '2026-06-21 09:00:00',
    nodeSize: 2,
    volume: 1200,
    avatarLetter: 'A',
    invested: 500,
    usdtBalance: 100,
    trooBalance: 200,
    frozenBalance: 5,
    status: 'normal'
  },
  {
    uid: '1002',
    level: 'L2',
    tier: 'Silver',
    registrationDate: '2026-06-21 10:00:00',
    nodeSize: 1,
    volume: 800,
    avatarLetter: 'B',
    invested: 300
  }
];

const ledger: Transaction[] = [
  {
    id: 'TXN-1',
    type: 'recharge',
    typeLabel: 'Recharge',
    desc: 'Initial deposit',
    amount: 100,
    currency: 'USDT',
    time: '2026-06-22 10:00:00',
    status: 'success',
    statusLabel: 'Success'
  }
];

describe('admin finance utils', () => {
  it('applies wallet adjustment to a selected downline only', () => {
    const result = applyWalletAdjustment(downlines, '1001', {
      usdtBalance: 150,
      trooBalance: 250,
      frozenBalance: 10,
      status: 'frozen'
    });

    expect(result[0]).toMatchObject({
      uid: '1001',
      usdtBalance: 150,
      trooBalance: 250,
      frozenBalance: 10,
      status: 'frozen'
    });
    expect(result[1]).toBe(downlines[1]);
  });

  it('builds ledger CSV content without touching the DOM', () => {
    const csv = buildLedgerCsvContent(ledger);

    expect(csv).toContain('流水ID,分类代码,账目详细描述,收支金额,币种,成交时间,状态');
    expect(csv).toContain('TXN-1,Recharge,Initial deposit,100,USDT,2026-06-22 10:00:00,success');
  });
});
