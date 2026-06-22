import { describe, expect, it } from 'vitest';
import {
  INITIAL_ADMIN_COMMISSION_DTOS,
  INITIAL_ADMIN_OVERFLOW_LOG_DTOS
} from '../../mock/admin/commissions';
import {
  getInitialAdminCommissions,
  getInitialAdminOverflowLogs,
  mapAdminCommissionDto,
  mapAdminOverflowLogDto
} from './commissions';

describe('admin commission mappers', () => {
  it('maps a commission DTO into the commission payout view model', () => {
    const payout = mapAdminCommissionDto({
      id: 'COP-1',
      orderId: 'ORD-1',
      uid: '889421',
      level: 'L1',
      amount: 400,
      status: 'credited',
      time: '2026-06-22 12:00:00',
      recipientNickname: 'Alice',
      triggerMemberUid: '891044',
      triggerMemberLevel: 'L1',
      triggerRechargeAmount: 4000
    });

    expect(payout).toEqual({
      id: 'COP-1',
      orderId: 'ORD-1',
      uid: '889421',
      level: 'L1',
      amount: 400,
      status: 'credited',
      time: '2026-06-22 12:00:00',
      recipientNickname: 'Alice',
      triggerMemberUid: '891044',
      triggerMemberLevel: 'L1',
      triggerRechargeAmount: 4000
    });
  });

  it('maps an overflow log DTO into the overflow log view model', () => {
    const log = mapAdminOverflowLogDto({
      id: 'OVF-1',
      memberUid: '889421',
      orderId: 'ORD-1',
      tierLevel: 'L2',
      missingAmount: 250,
      time: '2026-06-22 12:10:00'
    });

    expect(log).toEqual({
      id: 'OVF-1',
      memberUid: '889421',
      orderId: 'ORD-1',
      tierLevel: 'L2',
      missingAmount: 250,
      time: '2026-06-22 12:10:00'
    });
  });

  it('returns initial commission and overflow data as fresh arrays', () => {
    const commissions = getInitialAdminCommissions();
    const overflowLogs = getInitialAdminOverflowLogs();

    expect(commissions).toHaveLength(INITIAL_ADMIN_COMMISSION_DTOS.length);
    expect(overflowLogs).toHaveLength(INITIAL_ADMIN_OVERFLOW_LOG_DTOS.length);
    expect(commissions).not.toBe(getInitialAdminCommissions());
    expect(overflowLogs).not.toBe(getInitialAdminOverflowLogs());
  });
});
