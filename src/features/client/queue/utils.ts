import type { OrderStatusFilter, QueueOrderItem, ReleaseLogItem } from './types';

export const filterOrders = (
  orders: QueueOrderItem[],
  orderSearchQuery: string,
  orderStatusFilter: OrderStatusFilter
) =>
  orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                          o.name.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesFilter = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesFilter;
  });

export const getProgressPercent = (releasedAmount: number, originalLocked: number) =>
  originalLocked > 0 ? Math.round((releasedAmount / originalLocked) * 100) : 0;

export const INITIAL_QUEUE_ORDERS: QueueOrderItem[] = [
    {
      id: 'ORD-102456',
      name: '理财方案 A 套餐 (已购)',
      amount: 10000.00,
      originalLock: 3100.00,
      released: 0.00,
      remainingLock: 3100.00,
      status: 'queueing',
      statusLabel: '排队中',
      unlockHistory: []
    },
    {
      id: 'ORD-209182',
      name: '钻石成长计划 C与TROO认购 (已完成)',
      amount: 20000.00,
      originalLock: 6200.00,
      released: 6200.00,
      remainingLock: 0.00,
      status: 'released',
      statusLabel: '已全部解锁并买入',
      unlockHistory: [
        { id: 'ULK-101', time: '2023-11-21 14:02', triggerSource: 'L1直推下线 (UID: 10425) 认购方案 A (10k USDT)', unlockedAmount: 1000.00, trooBought: 10000 },
        { id: 'ULK-102', time: '2023-11-22 09:41', triggerSource: 'L1直推下线 (UID: 10294) 认购方案 C (30k USDT)', unlockedAmount: 3000.00, trooBought: 30000 },
        { id: 'ULK-103', time: '2023-11-23 18:15', triggerSource: 'L1直推下线 (UID: 11029) 认购方案 B (22k USDT)', unlockedAmount: 2200.00, trooBought: 22000 }
      ]
    },
    {
      id: 'ORD-312948',
      name: '至尊创世理财计划 B套餐 (智能锁仓)',
      amount: 50000.00,
      originalLock: 15500.00,
      released: 3100.00,
      remainingLock: 12400.00,
      status: 'partially_released',
      statusLabel: '部分解锁中',
      unlockHistory: [
        { id: 'ULK-201', time: '2023-11-24 10:30', triggerSource: 'L1直推下线 (UID: 10425) 认购方案 B (31k USDT)', unlockedAmount: 3100.00, trooBought: 31000 }
      ]
    },
    {
      id: 'ORD-482931',
      name: '白银增值计划 PRO版 (智能队列)',
      amount: 5000.00,
      originalLock: 1550.00,
      released: 1550.00,
      remainingLock: 0.00,
      status: 'released',
      statusLabel: '已全部解锁并买入',
      unlockHistory: [
        { id: 'ULK-301', time: '2023-11-21 15:55', triggerSource: 'L1直推下线 (UID: 10082) 认购方案 A (15.5k USDT)', unlockedAmount: 1550.00, trooBought: 15500 }
      ]
    },
    {
      id: 'ORD-519283',
      name: '黄金稳定成长方案 C-2型',
      amount: 15000.00,
      originalLock: 4650.00,
      released: 0.00,
      remainingLock: 4650.00,
      status: 'queueing',
      statusLabel: '排队中',
      unlockHistory: []
    },
    {
      id: 'ORD-628491',
      name: '新人体验专属增益方案 (排队划转)',
      amount: 2000.00,
      originalLock: 620.00,
      released: 310.00,
      remainingLock: 310.00,
      status: 'partially_released',
      statusLabel: '部分解锁中',
      unlockHistory: [
        { id: 'ULK-401', time: '2023-11-25 11:24', triggerSource: 'L1直推下线 (UID: 10222) 认购体验方案 (3.1k USDT)', unlockedAmount: 310.00, trooBought: 3100 }
      ]
    },
    {
      id: 'ORD-739102',
      name: '至尊创世理财计划 A套餐 (收益加成)',
      amount: 30000.00,
      originalLock: 9300.00,
      released: 0.00,
      remainingLock: 9300.00,
      status: 'queueing',
      statusLabel: '排队中',
      unlockHistory: []
    },
    {
      id: 'ORD-840192',
      name: '高净值核心认购 C套餐 (已同步)',
      amount: 100000.00,
      originalLock: 31000.00,
      released: 31000.00,
      remainingLock: 0.00,
      status: 'released',
      statusLabel: '已全部解锁并买入',
      unlockHistory: [
        { id: 'ULK-801', time: '2023-11-26 10:15', triggerSource: 'L1直推下线 (UID: 10394) 认购顶级理财 (150k USDT)', unlockedAmount: 15000.00, trooBought: 150000 },
        { id: 'ULK-802', time: '2023-11-27 15:40', triggerSource: 'L1直推下线 (UID: 10582) 认购财富套餐 (160k USDT)', unlockedAmount: 16000.00, trooBought: 160000 }
      ]
    },
    {
      id: 'ORD-910294',
      name: '前沿探索收益型 B套餐 (智能买入)',
      amount: 40000.00,
      originalLock: 12400.00,
      released: 2400.00,
      remainingLock: 10000.00,
      status: 'partially_released',
      statusLabel: '部分解锁中',
      unlockHistory: [
        { id: 'ULK-901', time: '2023-11-28 11:15', triggerSource: 'L1直推下线 (UID: 10118) 认购中级理财 (24k USDT)', unlockedAmount: 2400.00, trooBought: 24000 }
      ]
    },
    {
      id: 'ORD-101192',
      name: '秋季创收星火计划 A(小微理财)',
      amount: 8000.00,
      originalLock: 2480.00,
      released: 0.00,
      remainingLock: 2480.00,
      status: 'queueing',
      statusLabel: '排队中',
      unlockHistory: []
    },
    {
      id: 'ORD-115938',
      name: '联盟智选长期成长计划 D(完全覆盖)',
      amount: 50000.00,
      originalLock: 15500.00,
      released: 15500.00,
      remainingLock: 0.00,
      status: 'released',
      statusLabel: '已全部解锁并买入',
      unlockHistory: [
        { id: 'ULK-111', time: '2023-11-28 14:02', triggerSource: 'L1直推下线 (UID: 10425) 认购成长 C (155k USDT)', unlockedAmount: 15500.00, trooBought: 155000 }
      ]
    },
    {
      id: 'ORD-129482',
      name: '财富方舟稳健型 C-3套餐 (资产配置)',
      amount: 12000.00,
      originalLock: 3720.00,
      released: 1200.00,
      remainingLock: 2520.00,
      status: 'partially_released',
      statusLabel: '部分解锁中',
      unlockHistory: [
        { id: 'ULK-121', time: '2023-11-29 09:30', triggerSource: 'L1直推下线 (UID: 10425) 购买白银方案 (12k USDT)', unlockedAmount: 1200.00, trooBought: 12000 }
      ]
    },
    {
      id: 'ORD-135831',
      name: '至尊创世理财计划 A-1特惠版',
      amount: 25000.00,
      originalLock: 7750.00,
      released: 0.00,
      remainingLock: 7750.00,
      status: 'queueing',
      statusLabel: '排队中',
      unlockHistory: []
    },
    {
      id: 'ORD-149209',
      name: '新兴市场专属红利套餐 B(精选配置)',
      amount: 18000.00,
      originalLock: 5580.00,
      released: 0.00,
      remainingLock: 5580.00,
      status: 'queueing',
      statusLabel: '排队中',
      unlockHistory: []
    },
    {
      id: 'ORD-159481',
      name: '黑金阁私享理财专属方案 D级',
      amount: 150000.00,
      originalLock: 46500.00,
      released: 46500.00,
      remainingLock: 0.00,
      status: 'released',
      statusLabel: '已全部解锁并买入',
      unlockHistory: [
        { id: 'ULK-151', time: '2023-11-30 16:50', triggerSource: 'L1直推下线 (UID: 10294) 认购至尊大满贯计划 (465k USDT)', unlockedAmount: 46500.00, trooBought: 465000 }
      ]
    },
    {
      id: 'ORD-168291',
      name: '前瞻行业先锋认购方案 A',
      amount: 10000.00,
      originalLock: 3100.00,
      released: 310.00,
      remainingLock: 2790.00,
      status: 'partially_released',
      statusLabel: '部分解锁中',
      unlockHistory: [
        { id: 'ULK-161', time: '2023-12-01 10:11', triggerSource: 'L1直推下线 (UID: 10082) 购买体验增益方案 (3.1k USDT)', unlockedAmount: 310.00, trooBought: 3100 }
      ]
    }
];

export const INITIAL_RELEASE_LOGS: ReleaseLogItem[] = [
    {
      id: 'LOG-001',
      date: '2023-11-20 14:30',
      desc: '系统初始状态同步：方案 A 首期 70% 对应 TROO 数量已即刻成交买入。'
    },
    {
      id: 'LOG-002',
      date: '2023-11-20 14:31',
      desc: '31% 已存入排队锁定队列，等待推荐下线认购解锁并买入 TROO。'
    },
    {
      id: 'LOG-003',
      date: '2023-11-21 14:02',
      desc: '直推下线 (UID: 10425) 认购方案 A 成功。触发订单 ORD-209182 首轮额度 1,000.00 USDT 解锁并同步完成 TROO 智能增持划转。'
    },
    {
      id: 'LOG-004',
      date: '2023-11-21 15:55',
      desc: '直推下线 (UID: 10082) 成功认购。触发白银增值计划 ORD-482931 全额解套，释放 1,550.00 USDT 对应买盘买入 15,500 TROO。'
    },
    {
      id: 'LOG-005',
      date: '2023-11-22 09:41',
      desc: '直推下线 (UID: 10294) 完成钻石方案 C 认购。解锁划提订单 ORD-209182 部分锁定 3,000.00 USDT，购买 30,000 TROO。'
    },
    {
      id: 'LOG-006',
      date: '2023-11-23 18:15',
      desc: '直推下线 (UID: 11029) 认购方案 B 完成。订单 ORD-209182 剩余锁定额度 2,200.00 USDT 完全解锁，本订单总计 6,200.00 USDT 成交达成。'
    },
    {
      id: 'LOG-007',
      date: '2023-11-24 10:30',
      desc: '直推下线 (UID: 10425) 认购方案 B (31k USDT) 触发至尊首期解锁。释放 ORD-312948 并买入 31,000 TROO。'
    },
    {
      id: 'LOG-008',
      date: '2023-11-25 11:24',
      desc: '直推下线 (UID: 10222) 认购体验方案 3.1k USDT 达成。根据公式释放 ORD-628491 额度 310.00 USDT 并记入链上凭证。'
    },
    {
      id: 'LOG-009',
      date: '2023-11-26 10:15',
      desc: '多通道核验：直推下线 (UID: 10394) 认购高级套餐，ORD-840192 获得首轮大额解锁 15,000.00 USDT 并成功并网买入。'
    },
    {
      id: 'LOG-010',
      date: '2023-11-27 15:40',
      desc: '直推下线 (UID: 10582) 认购财富套餐验证。ORD-840192 尾款锁定 16,000.00 USDT 全额解套，该智能池状态标记为完全已成交。'
    },
    {
      id: 'LOG-011',
      date: '2023-11-28 11:15',
      desc: '下线用户 (UID: 10118) 新增购买完成，触发 ORD-910294 精组智能匹配解锁 2,400.00 USDT，成交 24,000 TROO 股票权益。'
    },
    {
      id: 'LOG-012',
      date: '2023-11-28 14:02',
      desc: '大额闪兑警报：L1层用户 (UID: 10425) 认购极致覆盖成长计划 C 成功，订单 ORD-115938 在几秒内一次性全额解套，释放值达 15,500.00 USDT。'
    },
    {
      id: 'LOG-013',
      date: '2023-11-29 09:30',
      desc: '直推下线 (UID: 10425) 购买 12k 方案，触发 ORD-129482 按比例解锁并买入 12,000 TROO，系统保持安全稳定输出。'
    },
    {
      id: 'LOG-014',
      date: '2023-11-30 16:50',
      desc: '超级大成订单通告！直推下线 (UID: 10294) 认购大满贯计划 465k USDT。黑金阁专属 ORD-159481 一次性解锁完成 46,500.00 USDT，买入 465,000 股 TROO 头寸。'
    },
    {
      id: 'LOG-015',
      date: '2023-12-01 10:11',
      desc: '先锋认购触发：直推下线 (UID: 10082) 成功加权认购，触发 ORD-168291 解锁 310.00 USDT，TROO 增配中。'
    },
    {
      id: 'LOG-016',
      date: '2023-12-01 18:00',
      desc: '全服日结机制校验：自动排队购买合约所有参数匹配成功，本时段解锁记录与成交量完全对齐。'
    }
];
