import type { DownlineMember, Transaction } from '@/src/types';

export const COMPANY_USDT = 31500000;
export const COMPANY_TROO = 950000000;
export const WITHDRAWAL_FEE = 15;

export function buildInitialLedger(transactions: Transaction[]): Transaction[] {
  return [
    ...transactions,
    {
      id: 'TXN-77319',
      type: 'recharge',
      typeLabel: '充值首缴',
      desc: '用户 889421 通过 ERC-20 链上首季质押充值',
      amount: 10000.00,
      currency: 'USDT',
      time: '2026-05-28 14:02:11',
      status: 'success',
      statusLabel: '成功'
    },
    {
      id: 'TXN-77320',
      type: 'commission',
      typeLabel: '分派佣金',
      desc: '推广分红派发给 L1 推荐人 889425 (套餐 A)',
      amount: 400.00,
      currency: 'USDT',
      time: '2026-05-28 14:15:30',
      status: 'success',
      statusLabel: '成功'
    },
    {
      id: 'TXN-77321',
      type: 'exchange',
      typeLabel: '股票置换',
      desc: '认购套餐首推配售 TROO 代币赠送 (10倍系数)',
      amount: 10000.00,
      currency: 'TROO',
      time: '2026-05-28 14:16:00',
      status: 'success',
      statusLabel: '成功'
    },
    {
      id: 'TXN-77322',
      type: 'transfer',
      typeLabel: '代付划扣',
      desc: '扣减上线超级代理 889425 配置信用度额量',
      amount: -1000.00,
      currency: 'USDT',
      time: '2026-05-28 14:12:00',
      status: 'success',
      statusLabel: '成功'
    },
    {
      id: 'TXN-77323',
      type: 'lock',
      typeLabel: '排队解锁',
      desc: 'L1级直指成交成功触发 889421 解锁 (10%)',
      amount: 500.00,
      currency: 'USDT',
      time: '2026-05-28 14:18:22',
      status: 'success',
      statusLabel: '成功'
    }
  ];
}

export function getTotalUserUSDT(downlines: DownlineMember[]) {
  return downlines.reduce((acc, d) => acc + (d.usdtBalance || 0), 0);
}

export function getTotalUserTROO(downlines: DownlineMember[]) {
  return downlines.reduce((acc, d) => acc + (d.trooBalance || 0), 0);
}

export function getTotalUserLocked(downlines: DownlineMember[]) {
  return downlines.reduce((acc, d) => acc + (d.pendingBalance || 0), 0);
}

export function createWalletAdjustmentTransaction(selectedWalletMember: DownlineMember, adjustUsdt: number): Transaction {
  return {
    id: `TXN-ADJ-${Math.floor(10000 + Math.random() * 90000)}`,
    type: 'transfer',
    typeLabel: '人工对账',
    desc: `管理员手动对会员 UID ${selectedWalletMember.uid} 实施资金纠偏对置修正`,
    amount: adjustUsdt - (selectedWalletMember.usdtBalance || 0),
    currency: 'USDT',
    time: new Date().toISOString().replace('T', ' ').substring(0, 19),
    status: 'success',
    statusLabel: '成功'
  };
}
