import { useState } from 'react';
import {
  getInitialAdminCommissions,
  getInitialAdminOverflowLogs
} from '../../../../api/admin/commissions';
import type { ActiveTab, CommissionPayout } from '../types';
import {
  filterCommissionItems,
  getAbnormalAuditCount,
  getCombinedCommissionItems,
  getTotalCreditedAmount,
  getTotalOverflowAmount
} from '../utils';

export function useCommissionsState() {
  const [commissions, setCommissions] = useState<CommissionPayout[]>(() => getInitialAdminCommissions());
  const [overflowLogs, setOverflowLogs] = useState(() => getInitialAdminOverflowLogs());
  const [selectedCommission, setSelectedCommission] = useState<CommissionPayout | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [commissionSearch, setCommissionSearch] = useState<string>('');

  const totalCreditedAmount = getTotalCreditedAmount(commissions);
  const abnormalAuditCount = getAbnormalAuditCount(commissions);
  const totalOverflowAmount = getTotalOverflowAmount(overflowLogs);
  const allCombinedItems = getCombinedCommissionItems(commissions, overflowLogs);
  const filteredCommissions = filterCommissionItems(allCombinedItems, activeTab, commissionSearch);

  return {
    abnormalAuditCount,
    activeTab,
    commissionSearch,
    commissions,
    filteredCommissions,
    overflowLogs,
    selectedCommission,
    setActiveTab,
    setCommissionSearch,
    setCommissions,
    setOverflowLogs,
    setSelectedCommission,
    totalCreditedAmount,
    totalOverflowAmount
  };
}
