import { describe, expect, it, vi } from 'vitest';
import type { Transaction } from '../types';
import { createAppStateValue } from './createAppStateValue';

const pendingWithdrawal: Transaction = {
  id: 'TXN-1',
  type: 'withdraw',
  typeLabel: 'Withdraw',
  desc: 'Pending withdrawal',
  amount: -100,
  currency: 'USDT',
  time: '2026-06-22 12:00:00',
  status: 'pending',
  statusLabel: 'Pending'
};

const recharge: Transaction = {
  ...pendingWithdrawal,
  id: 'TXN-2',
  type: 'recharge',
  status: 'success',
  statusLabel: 'Success'
};

const createState = () => {
  const addTransactionRecord = vi.fn();
  const addPendingWithdrawal = vi.fn();

  const state = createAppStateValue({
    globalAlertState: { globalAlert: { show: false, message: '', type: 'success' } },
    appShellState: { portalMode: 'client' },
    authState: { nickname: 'User' },
    clientBusinessState: {
      transactions: [],
      addTransactionRecord,
      refundUsdtBalance: vi.fn()
    },
    adminBusinessState: {
      pendingWithdrawals: [],
      addPendingWithdrawal
    }
  } as never);

  return { addPendingWithdrawal, addTransactionRecord, state };
};

describe('createAppStateValue', () => {
  it('adds pending withdrawals to both ledgers', () => {
    const { addPendingWithdrawal, addTransactionRecord, state } = createState();

    state.handleAddTransaction(pendingWithdrawal);

    expect(addTransactionRecord).toHaveBeenCalledWith(pendingWithdrawal);
    expect(addPendingWithdrawal).toHaveBeenCalledWith(pendingWithdrawal);
  });

  it('does not add non-pending withdrawals to pending withdrawal review', () => {
    const { addPendingWithdrawal, addTransactionRecord, state } = createState();

    state.handleAddTransaction(recharge);

    expect(addTransactionRecord).toHaveBeenCalledWith(recharge);
    expect(addPendingWithdrawal).not.toHaveBeenCalled();
  });

  it('keeps internal domain helpers out of the public app state shape', () => {
    const { state } = createState();

    expect('addTransactionRecord' in state).toBe(false);
    expect('refundUsdtBalance' in state).toBe(false);
    expect('addPendingWithdrawal' in state).toBe(false);
  });
});
