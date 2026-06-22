import { describe, expect, it } from 'vitest';
import type { DownlineMember, Transaction } from '@/src/types';
import type { AdminLog } from './types';
import {
  buildAdminLogs,
  filterAdminLogs,
  mapDownlineToAdminLog,
  mapTransactionToAdminLog
} from './utils';

const downline: DownlineMember = {
  uid: '1001',
  level: 'L1',
  tier: 'Gold',
  registrationDate: '2026-06-21 09:00:00',
  nodeSize: 2,
  volume: 1200,
  avatarLetter: 'A',
  invested: 500,
  nickname: 'Alice',
  sponsor: 'Root'
};

const transaction: Transaction = {
  id: 'TXN-1',
  type: 'withdraw',
  typeLabel: 'Withdrawal',
  desc: 'Manual withdrawal',
  amount: -100,
  currency: 'USDT',
  time: '2026-06-22 10:00:00',
  status: 'pending',
  statusLabel: 'Pending',
  blockchainProof: {
    txid: 'CHAIN-1',
    network: 'TRON'
  }
};

const seedLog: AdminLog = {
  id: 'LOG-SEED',
  timestamp: '2026-06-20 08:00:00',
  operator: '999001 (SYS)',
  category: 'system',
  severity: 'info',
  ipAddress: '127.0.0.1',
  moduleName: 'System',
  action: 'Seed',
  details: 'Seed log'
};

describe('admin logs utils', () => {
  it('maps downline registrations into operation logs', () => {
    const log = mapDownlineToAdminLog(downline);

    expect(log).toMatchObject({
      id: 'LOG-REG-1001',
      timestamp: downline.registrationDate,
      category: 'operation',
      severity: 'info',
      moduleName: '同盟注册中心'
    });
    expect(log.details).toContain('1001');
    expect(log.payload).toContain('"uid": "1001"');
  });

  it('maps transactions into finance logs with status severity', () => {
    const log = mapTransactionToAdminLog(transaction);

    expect(log).toMatchObject({
      id: 'LOG-1',
      timestamp: transaction.time,
      category: 'finance',
      severity: 'warn',
      ipAddress: '103.45.112.59',
      action: 'Withdrawal'
    });
  });

  it('combines all log sources newest first', () => {
    const logs = buildAdminLogs({
      initialLogs: [seedLog],
      extraLogs: [],
      transactions: [transaction],
      downlines: [downline]
    });

    expect(logs.map(log => log.id)).toEqual(['LOG-1', 'LOG-REG-1001', 'LOG-SEED']);
  });

  it('filters logs by query, severity, and category', () => {
    const logs = buildAdminLogs({
      initialLogs: [seedLog],
      extraLogs: [],
      transactions: [transaction],
      downlines: [downline]
    });

    expect(filterAdminLogs(logs, {
      searchQuery: 'withdrawal',
      selectedSeverity: 'warn',
      selectedCategory: 'finance'
    }).map(log => log.id)).toEqual(['LOG-1']);

    expect(filterAdminLogs(logs, {
      searchQuery: 'alice',
      selectedSeverity: 'All',
      selectedCategory: 'operation'
    }).map(log => log.id)).toEqual(['LOG-REG-1001']);
  });
});
