import { describe, expect, it } from 'vitest';
import {
  INITIAL_ADMIN_SETTLEMENT_LOG_DTOS,
  INITIAL_ADMIN_SETTLEMENT_TRANSACTION_DTOS
} from '../../mock/admin/settlement';
import {
  getInitialAdminSettlementLogs,
  getInitialAdminSettlementTransactions,
  mapAdminSettlementLogDto,
  mapAdminSettlementTransactionDto
} from './settlement';

describe('admin settlement mappers', () => {
  it('maps a settlement transaction DTO into the settlement item view model', () => {
    const transaction = mapAdminSettlementTransactionDto({
      id: 'SREC-1',
      memberUid: '889421',
      nickname: 'Alice',
      date: '2026-06-22',
      expectedCommissions: 2500,
      remainingPoolCapacity: 5000,
      actualSettledAmount: 2500,
      spilloverClipped: 0,
      status: 'fully_settled',
      contactEmail: 'alice@example.com'
    });

    expect(transaction).toEqual({
      id: 'SREC-1',
      memberUid: '889421',
      nickname: 'Alice',
      date: '2026-06-22',
      expectedCommissions: 2500,
      remainingPoolCapacity: 5000,
      actualSettledAmount: 2500,
      spilloverClipped: 0,
      status: 'fully_settled',
      contactEmail: 'alice@example.com'
    });
  });

  it('maps a settlement log DTO into the settle log view model', () => {
    const log = mapAdminSettlementLogDto({
      id: 'STL-1',
      date: '2026-06-22',
      ordersCount: 8,
      totalCommissions: 12000,
      status: 'completed'
    });

    expect(log).toEqual({
      id: 'STL-1',
      date: '2026-06-22',
      ordersCount: 8,
      totalCommissions: 12000,
      status: 'completed'
    });
  });

  it('returns initial settlement data as fresh arrays', () => {
    const logs = getInitialAdminSettlementLogs();
    const transactions = getInitialAdminSettlementTransactions();

    expect(logs).toHaveLength(INITIAL_ADMIN_SETTLEMENT_LOG_DTOS.length);
    expect(transactions).toHaveLength(INITIAL_ADMIN_SETTLEMENT_TRANSACTION_DTOS.length);
    expect(logs).not.toBe(getInitialAdminSettlementLogs());
    expect(transactions).not.toBe(getInitialAdminSettlementTransactions());
  });
});
