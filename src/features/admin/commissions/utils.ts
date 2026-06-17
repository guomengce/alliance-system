import type { ActiveTab, CommissionPayout, OverflowLog } from './types';

export const INITIAL_COMMISSIONS: CommissionPayout[] = [
  { id: 'COP-91283', orderId: 'ORD-2026052901', uid: '889425', level: 'L1', amount: 400.00, status: 'credited', time: '2026-05-29 08:30:11', recipientNickname: '星空行者 (Amanda)', triggerMemberUid: '891044', triggerMemberLevel: '1代 (L1)', triggerRechargeAmount: 4000.00 },
  { id: 'COP-91284', orderId: 'ORD-2026052901', uid: '890112', level: 'L2', amount: 400.00, status: 'credited', time: '2026-05-29 08:30:11', recipientNickname: '赛博信徒 (Sky)', triggerMemberUid: '891044', triggerMemberLevel: '2代 (L2)', triggerRechargeAmount: 4000.00 },
  { id: 'COP-91285', orderId: 'ORD-2026052902', uid: '889425', level: 'L1', amount: 2000.00, status: 'pending', time: '2026-05-29 09:20:00', recipientNickname: '星空行者 (Amanda)', triggerMemberUid: '891050', triggerMemberLevel: '1代 (L1)', triggerRechargeAmount: 20000.00 },
  { id: 'COP-91286', orderId: 'ORD-2026052809', uid: '892019', level: 'L2', amount: 1200.00, status: 'credited', time: '2026-05-28 14:15:30', recipientNickname: '极光猎人 (Ray)', triggerMemberUid: '895001', triggerMemberLevel: '2代 (L2)', triggerRechargeAmount: 12000.00 },
  { id: 'COP-91287', orderId: 'ORD-2026052809', uid: '891044', level: 'L3', amount: 1200.00, status: 'pool_insufficient', time: '2026-05-28 14:15:30', recipientNickname: '数字游民 (Dan)', errorMessage: '对应代理人的 [佣金额度池] 余额不足（当前池剩余 380.00 USDT，拟派发 1200.00 USDT），已触发防止超额提取限额保护，处于冻结阻塞状态！', triggerMemberUid: '895001', triggerMemberLevel: '3代 (L3)', triggerRechargeAmount: 12000.00 },
  { id: 'COP-91288', orderId: 'ORD-2026052712', uid: '889421', level: 'L1', amount: 350.00, status: 'failed', time: '2026-05-27 16:45:00', recipientNickname: '飞跃极客 (Jack)', errorMessage: '结算期主网RPC心跳超时，USDT资产发放广播事务回滚 (TxRollbackException)', triggerMemberUid: '889552', triggerMemberLevel: '1代 (L1)', triggerRechargeAmount: 3500.00 }
];

export const INITIAL_OVERFLOW_LOGS: OverflowLog[] = [
  { id: 'OVF-001', memberUid: '891044', orderId: 'ORD-2026052809', tierLevel: 'L3', missingAmount: 820.00, time: '2026-05-28 14:15:30' },
  { id: 'OVF-002', memberUid: '889425', orderId: 'ORD-2026052812', tierLevel: 'L1', missingAmount: 140.00, time: '2026-05-28 16:22:10' },
  { id: 'OVF-003', memberUid: '890112', orderId: 'ORD-2026052815', tierLevel: 'L2', missingAmount: 310.00, time: '2026-05-28 19:40:05' },
  { id: 'OVF-004', memberUid: '892019', orderId: 'ORD-2026052901', tierLevel: 'L2', missingAmount: 450.00, time: '2026-05-29 08:30:11' },
  { id: 'OVF-005', memberUid: '889421', orderId: 'ORD-2026052903', tierLevel: 'L1', missingAmount: 220.00, time: '2026-05-29 10:15:44' },
  { id: 'OVF-006', memberUid: '891044', orderId: 'ORD-2026052906', tierLevel: 'L3', missingAmount: 600.00, time: '2026-05-29 13:02:19' },
  { id: 'OVF-007', memberUid: '890112', orderId: 'ORD-2026052909', tierLevel: 'L2', missingAmount: 180.00, time: '2026-05-29 15:48:30' },
  { id: 'OVF-008', memberUid: '889425', orderId: 'ORD-2026052912', tierLevel: 'L1', missingAmount: 85.00,  time: '2026-05-29 18:20:00' },
  { id: 'OVF-009', memberUid: '892019', orderId: 'ORD-2026052918', tierLevel: 'L2', missingAmount: 500.00, time: '2026-05-29 21:55:12' },
  { id: 'OVF-010', memberUid: '891044', orderId: 'ORD-2026053001', tierLevel: 'L3', missingAmount: 750.00, time: '2026-05-30 01:10:05' },
  { id: 'OVF-011', memberUid: '889421', orderId: 'ORD-2026053004', tierLevel: 'L1', missingAmount: 190.00, time: '2026-05-30 05:30:00' },
  { id: 'OVF-012', memberUid: '890112', orderId: 'ORD-2026053008', tierLevel: 'L2', missingAmount: 420.00, time: '2026-05-30 09:12:44' },
  { id: 'OVF-013', memberUid: '889425', orderId: 'ORD-2026053011', tierLevel: 'L1', missingAmount: 280.00, time: '2026-05-30 11:45:18' },
  { id: 'OVF-014', memberUid: '892019', orderId: 'ORD-2026053015', tierLevel: 'L2', missingAmount: 620.00, time: '2026-05-30 14:02:30' },
  { id: 'OVF-015', memberUid: '891044', orderId: 'ORD-2026053019', tierLevel: 'L3', missingAmount: 900.00, time: '2026-05-30 17:35:10' },
  { id: 'OVF-016', memberUid: '889421', orderId: 'ORD-2026053102', tierLevel: 'L1', missingAmount: 340.00, time: '2026-05-31 03:22:55' },
  { id: 'OVF-017', memberUid: '890112', orderId: 'ORD-2026053105', tierLevel: 'L2', missingAmount: 110.00, time: '2026-05-31 07:14:02' },
  { id: 'OVF-018', memberUid: '889425', orderId: 'ORD-2026053109', tierLevel: 'L1', missingAmount: 490.00, time: '2026-05-31 10:45:00' },
  { id: 'OVF-019', memberUid: '892019', orderId: 'ORD-2026053114', tierLevel: 'L2', missingAmount: 710.00, time: '2026-05-31 13:58:11' },
  { id: 'OVF-020', memberUid: '891044', orderId: 'ORD-2026053118', tierLevel: 'L3', missingAmount: 1050.00, time: '2026-05-31 16:30:44' },
];

export function mapOverflowLogs(overflowLogs: OverflowLog[]): CommissionPayout[] {
  return overflowLogs.map(l => ({
    id: l.id,
    orderId: l.orderId,
    uid: l.memberUid,
    level: l.tierLevel,
    amount: l.missingAmount,
    status: 'intercepted',
    time: l.time,
    recipientNickname: '联盟拦截归集 (Recycled)',
    errorMessage: '因该线上级代理人代付限额大池额度已满，未予下拨支付的溢散金额已被系统自动拦截、解缴并回笼结转入公共 Reserve 准备金库。',
    triggerMemberUid: '891099',
    triggerMemberLevel: l.tierLevel,
    triggerRechargeAmount: l.missingAmount * 10
  }));
}

export function getCombinedCommissionItems(commissions: CommissionPayout[], overflowLogs: OverflowLog[]) {
  return [...commissions, ...mapOverflowLogs(overflowLogs)].sort((a, b) => b.time.localeCompare(a.time));
}

export function filterCommissionItems(
  allCombinedItems: CommissionPayout[],
  activeTab: ActiveTab,
  commissionSearch: string
) {
  return allCombinedItems.filter(p => {
    const matchesSearch = commissionSearch ? (
      p.id.toLowerCase().includes(commissionSearch.toLowerCase()) ||
      p.orderId.toLowerCase().includes(commissionSearch.toLowerCase()) ||
      p.uid.includes(commissionSearch) ||
      p.recipientNickname.toLowerCase().includes(commissionSearch.toLowerCase())
    ) : true;

    if (!matchesSearch) return false;

    if (activeTab === 'credited') {
      return p.status === 'credited';
    }
    if (activeTab === 'blocked') {
      return p.status === 'pool_insufficient' || p.status === 'failed' || p.status === 'pending';
    }
    if (activeTab === 'intercepted') {
      return p.status === 'intercepted';
    }
    return true;
  });
}

export function getTotalCreditedAmount(commissions: CommissionPayout[]) {
  return commissions
    .filter(c => c.status === 'credited')
    .reduce((sum, item) => sum + item.amount, 0) + 2400;
}

export function getAbnormalAuditCount(commissions: CommissionPayout[]) {
  return commissions.filter(c => c.status === 'pool_insufficient' || c.status === 'failed').length;
}

export function getTotalOverflowAmount(overflowLogs: OverflowLog[]) {
  return overflowLogs.reduce((sum, item) => sum + item.missingAmount, 0);
}
