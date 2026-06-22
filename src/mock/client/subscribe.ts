import type { ClientPlanDto, ClientSubscribeOrderDto } from '../../api/client/subscribe';

export const INITIAL_CLIENT_PLAN_DTOS: ClientPlanDto[] = [
  { 
    id: 'all-a', 
    name: '方案 A', 
    price: 500, 
    badge: '500 USDT', 
    badgeStyle: 'bg-zinc-800 text-zinc-300 border border-zinc-700/50', 
    poolLimit: 1000, 
    giftRatio: 1, 
    releaseLimit: 70, 
    queueRelease: 31,
    description: '为日常试水用户设计的轻量通道。提供 ¥1,000 佣金池额度、1% 赠送比例，稳健便捷。',
    borderStyle: 'border-zinc-800/80 hover:border-zinc-650',
    badgeColor: 'text-zinc-400'
  },
  { 
    id: 'all-b', 
    name: '方案 B', 
    price: 1000, 
    badge: '1,000 USDT', 
    badgeStyle: 'bg-slate-800/80 text-slate-200 border border-slate-600/40', 
    poolLimit: 2500, 
    giftRatio: 2, 
    releaseLimit: 70, 
    queueRelease: 31,
    description: '完美平衡低起点与高佣金。佣金池爆发增幅 2.5 倍，赠送比例翻倍至 2%！',
    borderStyle: 'border-slate-800/80 hover:border-slate-650',
    badgeColor: 'text-slate-300'
  },
  { 
    id: 'all-c', 
    name: '方案 C', 
    price: 5000, 
    badge: '5,000 USDT', 
    badgeStyle: 'bg-amber-500/10 text-amber-300 border border-amber-500/20', 
    poolLimit: 15000, 
    giftRatio: 6, 
    releaseLimit: 70, 
    queueRelease: 31,
    description: '高净值起步黄金方案。佣金池额度极速跃升至 ¥15,000，额外返赠 6%！收益率飙升。',
    borderStyle: 'border-amber-900/30 hover:border-amber-500/30',
    badgeColor: 'text-amber-400'
  },
  { 
    id: 'all-d', 
    name: '方案 D', 
    price: 10000, 
    badge: '10,000 USDT', 
    badgeStyle: 'bg-sky-500/10 text-sky-300 border border-sky-500/20', 
    poolLimit: 40000, 
    giftRatio: 15, 
    releaseLimit: 70, 
    queueRelease: 31,
    description: '核心极速认购方案。特享 4 倍佣金池(¥40,000)放款授信，充值赠送爆升至 15%！',
    borderStyle: 'border-sky-900/30 hover:border-sky-500/30',
    badgeColor: 'text-sky-400'
  },
  { 
    id: 'all-e', 
    name: '方案 E', 
    price: 50000, 
    badge: '50,000 USDT', 
    badgeStyle: 'bg-gradient-to-r from-purple-500/20 to-rose-500/20 text-[#cfbcff] border border-purple-500/30 font-black', 
    poolLimit: 250000, 
    giftRatio: 20, 
    releaseLimit: 70,
    queueRelease: 31, 
    isPopular: true,
    description: '至尊专属王者方案。极高倍赠予 20% + 高达 ¥250,000 的顶流级放款额，排队买入享最高特权优先级！',
    borderStyle: 'border-purple-500/30 hover:border-[#cfbcff]/50',
    badgeColor: 'text-[#cfbcff]'
  },
];

export const INITIAL_CLIENT_SUBSCRIBE_ORDER_DTOS: ClientSubscribeOrderDto[] = [
  { id: 'SUB-99812-E', name: '方案 E', amount: 50000, troo: 350000, giftRatio: 20, lockAmount: 15500, progress: 45, date: '2023-11-24 14:32', status: '进行中', statusType: 'pending' },
  { id: 'SUB-82215-D', name: '方案 D', amount: 10000, troo: 70000, giftRatio: 15, lockAmount: 3100, progress: 100, date: '2023-10-15 09:12', status: '已完成', statusType: 'success' },
  { id: 'SUB-71104-B', name: '方案 B', amount: 1000, troo: 7000, giftRatio: 2, lockAmount: 310, progress: 0, date: '2023-09-02 11:45', status: '已取消', statusType: 'failed' },
];
