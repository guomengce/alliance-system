import type { AdminSettlementLogDto, AdminSettlementTransactionDto } from '../../api/admin/settlement';

export const INITIAL_ADMIN_SETTLEMENT_LOG_DTOS: AdminSettlementLogDto[] = [
  { id: 'STL-9001', date: '2026-05-28', ordersCount: 12, totalCommissions: 48900.00, status: 'completed' },
  { id: 'STL-9002', date: '2026-05-27', ordersCount: 8, totalCommissions: 19500.00, status: 'completed' },
  { id: 'STL-9003', date: '2026-05-26', ordersCount: 15, totalCommissions: 55000.00, status: 'completed' }
];

export const INITIAL_ADMIN_SETTLEMENT_TRANSACTION_DTOS: AdminSettlementTransactionDto[] = [
  { id: 'SREC-101', memberUid: '889425', nickname: '星空行者 (Amanda)', date: '2026-05-29', expectedCommissions: 2500, remainingPoolCapacity: 25000, actualSettledAmount: 2500, spilloverClipped: 0, status: 'fully_settled', contactEmail: 'amanda.stars@gmail.com' },
  { id: 'SREC-102', memberUid: '890112', nickname: '赛博信徒 (Sky)', date: '2026-05-29', expectedCommissions: 1200, remainingPoolCapacity: 380, actualSettledAmount: 380, spilloverClipped: 820, status: 'clipped', contactEmail: 'sky.cybers@yahoo.com' },
  { id: 'SREC-103', memberUid: '891044', nickname: '数字游民 (Dan)', date: '2026-05-29', expectedCommissions: 950, remainingPoolCapacity: 120, actualSettledAmount: 120, spilloverClipped: 830, status: 'clipped', contactEmail: 'dan_nomad99@gate.io' },
  { id: 'SREC-104', memberUid: '892019', nickname: '极光猎人 (Ray)', date: '2026-05-29', expectedCommissions: 800, remainingPoolCapacity: -50, actualSettledAmount: 0, spilloverClipped: 800, status: 'stalled_exception', contactEmail: 'ray.aurora@protonmail.com' }
];
