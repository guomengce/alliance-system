import { useEffect, useState } from 'react';
import {
  getAdminCommissions,
  getAdminOverflowLogs
} from '../../../../api/admin/commissions';
import { useAppContext } from '../../../../context/AppContext';
import type { ActiveTab, CommissionPayout } from '../types';
import {
  filterCommissionItems,
  adjustCommissionAmount,
  forceCommissionPayout,
  getAbnormalAuditCount,
  getCombinedCommissionItems,
  getTotalCreditedAmount,
  getTotalOverflowAmount,
  removeOverflowForCommission
} from '../utils';

export function useCommissionsState() {
  const { triggerGlobalAlert } = useAppContext();
  const [commissions, setCommissions] = useState<CommissionPayout[]>([]);
  const [overflowLogs, setOverflowLogs] = useState(() => []);
  const [selectedCommission, setSelectedCommission] = useState<CommissionPayout | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [commissionSearch, setCommissionSearch] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    Promise.all([getAdminCommissions(), getAdminOverflowLogs()]).then(([nextCommissions, nextOverflowLogs]) => {
      if (!mounted) return;
      setCommissions(nextCommissions);
      setOverflowLogs(nextOverflowLogs);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const totalCreditedAmount = getTotalCreditedAmount(commissions);
  const abnormalAuditCount = getAbnormalAuditCount(commissions);
  const totalOverflowAmount = getTotalOverflowAmount(overflowLogs);
  const allCombinedItems = getCombinedCommissionItems(commissions, overflowLogs);
  const filteredCommissions = filterCommissionItems(allCombinedItems, activeTab, commissionSearch);

  const handleForcePayout = (payoutId: string) => {
    setCommissions(prev => forceCommissionPayout(prev, payoutId));
    const targetComp = commissions.find(c => c.id === payoutId);
    if (targetComp) {
      setOverflowLogs(prev => removeOverflowForCommission(prev, targetComp));
    }
    triggerGlobalAlert(`【系统异常人工处理成功】\n已强制 bypass 对应上线代理的佣金限额池拦截，强写该条收益划账业务！\n\n已划归金额: ${targetComp?.amount} USDT\n交割渠道已成功变更为「平台内置账户钱包余额」并增加存池！`, 'success');
    setSelectedCommission(null);
  };

  const handleAdjustCommissionAmount = (payoutId: string, secureNewAmount: number) => {
    setCommissions(prev => adjustCommissionAmount(prev, payoutId, secureNewAmount));
    triggerGlobalAlert(`【人工参数修正对算成功】\n已成功将佣金实发金额修正降低为 ${secureNewAmount} USDT (刚好不突破该代理人的额度限制)。状态已自动恢复为“已入账划账”。`, 'success');
    setSelectedCommission(null);
  };

  const handleSubmitCommissionAdjustment = (payoutId: string, rawAmount: string) => {
    const secureNewAmount = parseFloat(rawAmount);
    if (isNaN(secureNewAmount) || secureNewAmount <= 0) {
      triggerGlobalAlert('请输入有效数值', 'error');
      return;
    }
    handleAdjustCommissionAmount(payoutId, secureNewAmount);
  };

  return {
    abnormalAuditCount,
    activeTab,
    commissionSearch,
    commissions,
    filteredCommissions,
    handleSubmitCommissionAdjustment,
    handleForcePayout,
    overflowLogs,
    selectedCommission,
    setActiveTab,
    setCommissionSearch,
    setSelectedCommission,
    totalCreditedAmount,
    totalOverflowAmount
  };
}
