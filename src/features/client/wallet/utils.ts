import type { Transaction } from '../../../types';
import type { FilterButton } from './types';

export const FILTER_BUTTONS: FilterButton[] = [
  { id: 'all', label: '全部' },
  { id: 'recharge', label: '充值' },
  { id: 'withdraw', label: '提现' },
  { id: 'transfer', label: '划转' },
  { id: 'subscribe', label: '认购' },
  { id: 'commission', label: '佣金' },
  { id: 'lock', label: '锁定' }
];

export const getNormalizedTypeLabel = (type: string, defaultLabel: string) => {
  const mapping: Record<string, string> = {
    recharge: '充值',
    withdraw: '提现',
    transfer: '划转',
    subscribe: '认购',
    commission: '佣金',
    lock: '锁定'
  };
  return mapping[type] || defaultLabel;
};

export const filterTransactions = (
  transactions: Transaction[],
  filterType: string,
  searchVal: string
) =>
  transactions.filter(txn => {
    if (filterType !== 'all' && txn.type !== filterType) return false;
    if (searchVal.trim() !== '') {
      const query = searchVal.toLowerCase();
      const normalizedLabel = getNormalizedTypeLabel(txn.type, txn.typeLabel);
      return (
        txn.desc.toLowerCase().includes(query) ||
        txn.id.toLowerCase().includes(query) ||
        txn.typeLabel.toLowerCase().includes(query) ||
        normalizedLabel.toLowerCase().includes(query)
      );
    }
    return true;
  });
