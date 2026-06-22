import type { AdminPlanDto } from '../../api/admin/plans';

export const INITIAL_ADMIN_PLAN_DTOS: AdminPlanDto[] = [
  { id: 'plan-a', name: '套餐 A (入门级)', price: 1000, giftRatio: 1.0, buyRatio: 30, queueRatio: 70, commissionLimit: 2000, status: 'enabled', description: '入门级流动性理财增益套餐，提供基础分销推荐提款容量与30% TROO代币活期配额。' },
  { id: 'plan-b', name: '套餐 B (中级)', price: 5000, giftRatio: 1.0, buyRatio: 40, queueRatio: 60, commissionLimit: 25000, status: 'enabled', description: '中等量级流动性认购，大幅解锁L1直推及下代联盟返佣额度配发。' },
  { id: 'plan-c', name: '套餐 C (热门标签)', price: 10000, giftRatio: 1.1, buyRatio: 40, queueRatio: 60, commissionLimit: 55000, status: 'enabled', description: '最具性价比热门主打档，额外加赠10% TROO股票配额，附赠首发优先买券分配权。' },
  { id: 'plan-d', name: '套餐 D (高级)', price: 30000, giftRatio: 1.2, buyRatio: 50, queueRatio: 50, commissionLimit: 180000, status: 'enabled', description: '高阶精英合伙人专项级别，股票配售比高至50%，提供超值十万级推荐额度封池释放。' },
  { id: 'plan-e', name: '套餐 E (旗舰级)', price: 50000, giftRatio: 1.3, buyRatio: 50, queueRatio: 50, commissionLimit: 350000, status: 'enabled', description: '平台首席旗舰级认购方案，加赠30%股票权重，全渠道排队解锁享受VIP最优先特权通道。' }
];
