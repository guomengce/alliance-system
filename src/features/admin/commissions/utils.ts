import type { ActiveTab, CommissionPayout, OverflowLog } from './types';

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

export function forceCommissionPayout(commissions: CommissionPayout[], payoutId: string) {
  return commissions.map(commission => (
    commission.id === payoutId
      ? { ...commission, status: 'credited' as const, errorMessage: undefined }
      : commission
  ));
}

export function adjustCommissionAmount(
  commissions: CommissionPayout[],
  payoutId: string,
  secureNewAmount: number
) {
  return commissions.map(commission => (
    commission.id === payoutId
      ? {
          ...commission,
          amount: secureNewAmount,
          status: 'credited' as const,
          errorMessage: undefined
        }
      : commission
  ));
}

export function removeOverflowForCommission(
  overflowLogs: OverflowLog[],
  commission: CommissionPayout
) {
  return overflowLogs.filter(log => !(
    log.memberUid === commission.uid &&
    log.orderId === commission.orderId
  ));
}
