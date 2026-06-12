import type { CommissionAllocation, OrderDetail } from './types';

export const INITIAL_ORDERS: OrderDetail[] = [
  { 
    id: 'ORD-2026052901', 
    uid: '889421', 
    planName: '套餐 A (入门级)', 
    amount: 1000, 
    status: 'confirmed', 
    time: '2026-05-29 08:12:00',
    paymentChannel: '钱包支付 (帐户余额扣减)',
    txid: 'TWe8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6',
    cashFlowTrack: '会员个人电子钱包余额账户 ➡ 理财认购结算扣缴存根',
    stockConversion: {
      buyRatio: 30,
      queueRatio: 70,
      directStocks: 30000,
      queueStocks: 70000,
      giftedStocks: 0
    },
    commissionAllocations: [
      { level: 'L1代数直推', targetUid: '889425', nickname: '星空行者 (Amanda)', rate: 10, amount: 100, status: 'distributed' },
      { level: 'L2代数间推', targetUid: '890112', nickname: '赛博信徒 (Sky)', rate: 5, amount: 50, status: 'distributed' },
      { level: 'L3代数分裂', targetUid: '891044', nickname: '数字游民 (Dan)', rate: 2, amount: 20, status: 'distributed' }
    ]
  },
  { 
    id: 'ORD-2026052902', 
    uid: '890112', 
    planName: '套餐 B (中级)', 
    amount: 5000, 
    status: 'confirmed', 
    time: '2026-05-29 09:14:22',
    paymentChannel: '钱包支付 (帐户余额扣减)',
    txid: '0x9810dc2e173e4bfa0999de42b292e92c2daefbd45f78b9ce4f90e8291a82bff0',
    cashFlowTrack: '会员个人电子钱包余额账户 ➡ 多链聚合质押智能托管出数对账',
    stockConversion: {
      buyRatio: 40,
      queueRatio: 60,
      directStocks: 200000,
      queueStocks: 300000,
      giftedStocks: 0
    },
    commissionAllocations: [
      { level: 'L1代数直推', targetUid: '889425', nickname: '星空行者 (Amanda)', rate: 10, amount: 500, status: 'distributed' },
      { level: 'L2代数间推', targetUid: '999001', nickname: '创世代表 (SYS)', rate: 5, amount: 250, status: 'distributed' }
    ]
  },
  { 
    id: 'ORD-2026052903', 
    uid: '892019', 
    planName: '套餐 C (热门标签)', 
    amount: 10000, 
    status: 'pending', 
    time: '2026-05-29 11:20:45',
    paymentChannel: '钱包支付 (帐户余额扣减)',
    txid: '0x321fe4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1',
    cashFlowTrack: '会员个人电子钱包余额账户 ➡ 认购托管待管理员审核扣缴',
    stockConversion: {
      buyRatio: 40,
      queueRatio: 60,
      directStocks: 400000,
      queueStocks: 600000,
      giftedStocks: 100000 // 10% Extra
    },
    commissionAllocations: [
      { level: 'L1代数直推', targetUid: '889421', nickname: '飞跃极客 (Jack)', rate: 10, amount: 1000, status: 'pending_lock' },
      { level: 'L2代数间推', targetUid: '889425', nickname: '星空行者 (Amanda)', rate: 5, amount: 500, status: 'pending_lock' }
    ]
  },
  { 
    id: 'ORD-2026052809', 
    uid: '889425', 
    planName: '套餐 D (高级)', 
    amount: 30000, 
    status: 'confirmed', 
    time: '2026-05-28 14:02:11',
    paymentChannel: '钱包支付 (帐户余额扣减)',
    txid: 'TYx77ff12f2a3ea42001bbcf88a0b0d1e2f3a4b5c6ef28c829e925bf0cf3947b112d',
    cashFlowTrack: '会员个人电子钱包余额账户 ➡ 理财托管收支结算核心存根',
    stockConversion: {
      buyRatio: 50,
      queueRatio: 50,
      directStocks: 1500000,
      queueStocks: 1500000,
      giftedStocks: 600000 // 20% gift
    },
    commissionAllocations: [
      { level: 'L1代数直推', targetUid: '999001', nickname: '创世代表 (SYS)', rate: 10, amount: 3000, status: 'distributed' }
    ]
  }
];

export function filterAllocations(allocations: CommissionAllocation[], detailSearchQuery: string) {
  return allocations.filter(alloc => {
    const q = detailSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      alloc.level.toLowerCase().includes(q) ||
      alloc.targetUid.toLowerCase().includes(q) ||
      alloc.nickname.toLowerCase().includes(q)
    );
  });
}
