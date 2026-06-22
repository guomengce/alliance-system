import type { Transaction } from '../../../types';
import type { FilterButton, NetworkType } from './types';

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

interface WalletTransactionOptions {
  now?: () => Date;
}

const createTxnId = () => `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
const formatTime = (date: Date) => date.toISOString().replace('T', ' ').slice(0, 19);

export function validateWithdraw(
  amount: number,
  usdtBalance: number,
  address: string,
  network: NetworkType
) {
  const minWithdraw = network === 'ETH' ? 40 : 20;
  if (amount < minWithdraw) return `提现金额不可低于最小提现要求: ${minWithdraw} USDT`;
  if (amount > usdtBalance) return '您的可用余额不足！';
  if (!address.trim()) return '请输入收款钱包地址';
  return null;
}

export function validateTransfer(amount: number, usdtBalance: number, transferUserId: string) {
  if (amount < 10) return '站内划转金额不可低于最小划转限制: 10 USDT';
  if (!transferUserId.trim()) return '请输入接收方的平台用户ID (UID)';
  if (amount > usdtBalance) return '您的可用余额不足！';
  return null;
}

export function buildWithdrawTransaction(
  amount: number,
  network: NetworkType,
  address: string,
  { now = () => new Date() }: WalletTransactionOptions = {}
): Transaction {
  return {
    id: createTxnId(),
    type: 'withdraw',
    typeLabel: '提现申请',
    desc: `提现至外部钱包 (${network} 网络: ${address})`,
    amount: -amount,
    currency: 'USDT',
    time: formatTime(now()),
    status: 'pending',
    statusLabel: '处理中'
  };
}

export function buildTransferTransaction(
  amount: number,
  transferUserId: string,
  { now = () => new Date() }: WalletTransactionOptions = {}
): Transaction {
  return {
    id: createTxnId(),
    type: 'transfer',
    typeLabel: '平台划转',
    desc: `站内资金划转至用户 UID: ${transferUserId}`,
    amount: -amount,
    currency: 'USDT',
    time: formatTime(now()),
    status: 'success',
    statusLabel: '成功'
  };
}
