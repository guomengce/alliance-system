import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  AlertCircle, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  Play, 
  UserCheck, 
  History, 
  TrendingUp, 
  Terminal,
  ChevronRight,
  Sparkles,
  X,
  Search,
  Filter
} from 'lucide-react';
import { Transaction } from '../types';
import PageView from './PageView';
import AlertBanner from './AlertBanner';
import { AnimatePresence, motion } from 'motion/react';

interface QueueViewProps {
  usdtBalance: number;
  lockedQueueAmount: number;
  originalLockedQueue: number;
  releasedQueueAmount: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
  onUpdateBalances: (usdtDiff: number, trooDiff: number, lockedDiff?: number) => void;
  onAddTransaction: (txn: Transaction) => void;
  onExecuteSimulation: (purchaseAmt: number, commissionPercent: number, subUid: string, subPlanName: string) => {
    totalRebate: number;
    userAEarned: number;
    overflowAmount: number;
    actualUnlocked: number;
    trooFromUnlock: number;
    unlockEntitled: number;
  };
}

interface UnlockRecord {
  id: string;
  time: string;
  triggerSource: string; // 触发下线信息/操作
  unlockedAmount: number; // 解锁金额
  trooBought: number;     // 购买 TROO 股数
}

interface QueueOrderItem {
  id: string;
  name: string;
  amount: number;         // 认购金额
  originalLock: number;   // 原始锁定 (31%)
  released: number;       // 已释放
  remainingLock: number;  // 剩余锁定
  status: 'released' | 'partially_released' | 'queueing'; 
  statusLabel: string;
  unlockHistory?: UnlockRecord[]; // 每一笔的解锁记录
}

interface ReleaseLogItem {
  id: string;
  date: string;
  desc: string;
}

export default function QueueView({
  usdtBalance,
  lockedQueueAmount,
  originalLockedQueue,
  releasedQueueAmount,
  commissionPoolLimit,
  commissionPoolRemaining,
  onUpdateBalances,
  onAddTransaction,
  onExecuteSimulation
}: QueueViewProps) {
  
  // 1. Dynamic calculated totals mapped perfectly from top-level state
  const originalLocked = originalLockedQueue;
  const releasedAmount = releasedQueueAmount;
  const remainingLocked = lockedQueueAmount;

  // 2. High-fidelity Queue Orders containing all orders preloaded to allow transparent outside management
  const [orders, setOrders] = useState<QueueOrderItem[]>([
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
  ]);

  // 3. Timeline Logs matching "买入/解锁记录" in screenshot
  const [releaseLogs, setReleaseLogs] = useState<ReleaseLogItem[]>([
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
  ]);

  // Notice alert banner on visual clearing
  const [alertSuccess, setAlertSuccess] = useState<{
    show: boolean;
    unlockedSum: number;
    uid: string;
  }>({ show: false, unlockedSum: 0, uid: '' });

  // Inline messaging state replace window.alert
  const [infoMessage, setInfoMessage] = useState('');

  // Track visible counts and active detail selection popup modal
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(10);
  const [visibleLogsCount, setVisibleLogsCount] = useState(10);
  const [loadingMoreOrders, setLoadingMoreOrders] = useState(false);
  const [loadingMoreLogs, setLoadingMoreLogs] = useState(false);
  const [selectedDetailOrder, setSelectedDetailOrder] = useState<QueueOrderItem | null>(null);

  // Consolidated reset helper for visibility pagination
  const resetOrdersVisibility = () => {
    setVisibleOrdersCount(10);
  };

  // Reusable custom generic scroll loading abstraction
  const createScrollLoader = (
    loading: boolean,
    setLoading: (val: boolean) => void,
    setVisibleCount: React.Dispatch<React.SetStateAction<number>>,
    totalLength: number
  ) => {
    return (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 30;
      if (isAtBottom && !loading && totalLength > 0) {
        setLoading(true);
        setTimeout(() => {
          setVisibleCount(prev => Math.min(prev + 10, totalLength));
          setLoading(false);
        }, 500);
      }
    };
  };

  // Search and filter toolbar state representing active view parameters
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'queueing' | 'partially_released' | 'released'>('all');

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) || 
                          o.name.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesFilter = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleOrdersScroll = createScrollLoader(
    loadingMoreOrders,
    setLoadingMoreOrders,
    setVisibleOrdersCount,
    filteredOrders.length
  );

  const handleLogsScroll = createScrollLoader(
    loadingMoreLogs,
    setLoadingMoreLogs,
    setVisibleLogsCount,
    releaseLogs.length
  );

  // Dynamically compute progress percentages helper
  const overallProgressPercent = originalLocked > 0 ? Math.round((releasedAmount / originalLocked) * 100) : 0;

  // Preset trigger helper to inject custom new orders
  const handleAddNewMockOrder = () => {
    setInfoMessage('请使用“认购中心”模块下的方案订购，所生成的订单将自动上链广播并进入智能队列！');
  };

  return (
    <PageView>
      {/* Inline Messaging Alerts */}
      <AnimatePresence>
        {infoMessage && (
          <div className="mb-4">
            <AlertBanner 
              message={infoMessage} 
              type="info" 
              onClose={() => setInfoMessage('')} 
            />
          </div>
        )}
      </AnimatePresence>
      {/* Instant clearing simulation success notice banner */}
      <AnimatePresence>
        {alertSuccess.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-emerald-400 text-xs font-bold leading-relaxed shadow-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                <Unlock className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <p className="text-white font-extrabold text-sm">🎉 智能合约解套运算已广播完成！</p>
                <p className="text-emerald-400/80 font-mono mt-0.5">
                  成功从排队锁仓中解锁并买入了 <span className="underline decoration-dashed">{(alertSuccess.unlockedSum * 10).toLocaleString()} TROO</span>（等值 {alertSuccess.unlockedSum.toFixed(2)} USDT），已立即存入您的持股账户。
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📊 SECT 1: 买入进度可视化 (Release Progress Visualization Card) */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden bg-[#16131c]">
        
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7c4dff]/5 to-transparent rounded-bl-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-white text-lg font-black tracking-tight">买入及解锁进度可视化</h3>
            <p className="text-xs text-[#cbc4d2]/60 mt-0.5 font-medium">
              实时追踪您的理财方案从排队锁定到完全解锁并成份买入 TROO 股票的流转状态
            </p>
          </div>
          
          <div className="text-right shrink-0">
            <span className="text-2xl md:text-3.5xl font-black font-mono text-[#cfbcff] block leading-none tracking-tight">
              {overallProgressPercent}%
            </span>
            <span className="text-[9px] text-[#cbc4d2]/40 font-bold uppercase tracking-widest font-mono">
              OVERALL PROGRESS
            </span>
          </div>
        </div>

        {/* Dynamic high-precision 3-column financial index lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Card Cell 1 */}
          <div className="relative pb-3 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-[#cbc4d2]/60 tracking-wide">
              原始锁定金额 (31%)
            </span>
            <p className="text-2xl font-black font-mono text-white mt-1.5 tracking-tight">
              ¥ {originalLocked.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </p>
            {/* Soft subtle gray underline marker */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 rounded-full"></div>
          </div>

          {/* Card Cell 2 */}
          <div className="relative pb-3 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-[#cbc4d2]/60 tracking-wide">
              已解锁买入金额
            </span>
            <p className="text-2xl font-black font-mono text-[#cfbcff] mt-1.5 tracking-tight">
              ¥ {releasedAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </p>
            {/* Soft subtle gray underline marker matching Cell 3 */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 rounded-full"></div>
          </div>

          {/* Card Cell 3 */}
          <div className="relative pb-3 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-[#cbc4d2]/60 tracking-wide">
              剩余锁定
            </span>
            <p className="text-2xl font-black font-mono text-white mt-1.5 tracking-tight">
              ¥ {remainingLocked.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </p>
            {/* Soft subtle gray underline marker */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 rounded-full"></div>
          </div>

        </div>

        {/* Big horizontal progress bar */}
        <div className="w-full bg-[#100d14] rounded-full h-2.5 overflow-hidden border border-white/[0.02]">
          <div 
            className="bg-[#cfbcff] h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${overallProgressPercent}%` }}
          />
        </div>

      </div>

      {/* ⚠️ SECT 2: L1 驱动解锁机制 Callout Box */}
      <div className="p-4 bg-[#1b1724] border border-white/5 rounded-2xl flex items-start gap-3.5 select-none text-xs leading-relaxed">
        <span className="p-1.5 bg-[#cfbcff]/10 text-[#cfbcff] rounded-lg mt-0.5 shrink-0">
          <AlertCircle className="w-4 h-4" />
        </span>
        <div className="space-y-1">
          <p className="text-white font-black">L1 驱动解锁机制</p>
          <p className="text-[#cbc4d2]/70 font-medium">
            当您的 L1 层级下线成功认购，系统将自动从您的排队账户中解锁该订单金额 of 10%。仅限 L1 直推成员。
          </p>
          <p className="text-[#cfbcff]/90 font-mono text-[10px] font-bold uppercase tracking-wider">
            计算公式：解锁金额 = L1 订单金额 × 10%
          </p>
        </div>
      </div>

      {/* 📋 SECT 3: TWO COLUMN LAYOUT: TABLE & TIMELINE LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left column (2/3 Width): 排队订单列表 */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="glass-card rounded-2xl overflow-hidden bg-[#16131c]">
            {/* Integrated Dual Search & Status Tabs toolbar directly on the main page */}
            <div className="p-5 border-b border-white/5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h4 className="text-sm font-semibold text-white tracking-wider flex items-center gap-2">
                  排队订单列表 <span className="text-[11px] font-mono text-[#cbc4d2]/40 font-normal">({filteredOrders.length} 个订单)</span>
                </h4>
                
                {/* Search input in card toolbar layout */}
                <div className="relative w-full sm:w-64">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#cbc4d2]/40">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="按订单号或理财套餐搜索..."
                    value={orderSearchQuery}
                    onChange={(e) => {
                      setOrderSearchQuery(e.target.value);
                      resetOrdersVisibility(); // reset page length on search
                    }}
                    className="w-full bg-[#100d14] border border-white/5 rounded-xl pl-8 pr-7 py-2 text-[11px] text-white placeholder-[#cbc4d2]/30 focus:outline-none focus:border-[#cfbcff]/50 transition-colors"
                  />
                  {orderSearchQuery && (
                    <button 
                      onClick={() => {
                        setOrderSearchQuery('');
                        resetOrdersVisibility();
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#cbc4d2]/40 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Status Segment Filter Controls */}
              <div className="flex flex-wrap bg-[#100d14] p-1 rounded-xl border border-white/5 gap-1 self-start">
                <button 
                  onClick={() => {
                    setOrderStatusFilter('all');
                    resetOrdersVisibility();
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${orderStatusFilter === 'all' ? 'bg-[#cfbcff] text-[#100d14]' : 'text-[#cbc4d2]/60 hover:text-white'}`}
                >
                  全部
                </button>
                <button 
                  onClick={() => {
                    setOrderStatusFilter('queueing');
                    resetOrdersVisibility();
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${orderStatusFilter === 'queueing' ? 'bg-[#cfbcff] text-[#100d14]' : 'text-[#cbc4d2]/60 hover:text-white'}`}
                >
                  排队中
                </button>
                <button 
                  onClick={() => {
                    setOrderStatusFilter('partially_released');
                    resetOrdersVisibility();
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${orderStatusFilter === 'partially_released' ? 'bg-[#cfbcff] text-[#100d14]' : 'text-[#cbc4d2]/60 hover:text-white'}`}
                >
                  部分解锁
                </button>
                <button 
                  onClick={() => {
                    setOrderStatusFilter('released');
                    resetOrdersVisibility();
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${orderStatusFilter === 'released' ? 'bg-[#cfbcff] text-[#100d14]' : 'text-[#cbc4d2]/60 hover:text-white'}`}
                >
                  已完成
                </button>
              </div>
            </div>

            {/* Scrollable grid view wrapper defaulting to show 10 items */}
            <div 
              onScroll={handleOrdersScroll}
              className="p-5 max-h-[660px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-white/10 space-y-4"
            >
              {filteredOrders.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <Filter className="w-8 h-8 text-[#cbc4d2]/20 mx-auto" strokeWidth={1.5} />
                  <p className="text-[#cbc4d2]/40 text-xs">没有匹配到符合筛选条件的订单记录</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredOrders.slice(0, visibleOrdersCount).map((item) => {
                      const percentComplete = item.originalLock > 0 ? Math.round((item.released / item.originalLock) * 100) : 0;
                      return (
                        <div 
                          key={item.id} 
                          className="relative bg-[#1c1924]/60 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg group overflow-hidden"
                        >
                          {/* Corner gradient backdrop highlighting remain locked status */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none rounded-tr-2xl"></div>
                          
                          {/* Header: Name, Uid & Badge */}
                          <div className="flex items-start justify-between gap-3 relative z-10">
                            <div className="min-w-0">
                              <h5 className="font-extrabold text-sm text-white tracking-wide group-hover:text-[#cfbcff] transition-colors truncate">
                                {item.name}
                              </h5>
                              <p className="text-[10px] text-[#cbc4d2]/30 font-mono mt-1">
                                订单编号 ID: <span className="text-[#cbc4d2]/50">{item.id}</span>
                              </p>
                            </div>
                            <div className="shrink-0">
                              {item.status === 'released' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-950/50 text-emerald-400 border border-emerald-500/25 rounded-full text-[10px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                                  {item.statusLabel}
                                </span>
                              )}
                              {item.status === 'partially_released' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 bg-[#cfbcff]/15 text-[#cfbcff] border border-[#cfbcff]/30 rounded-full text-[10px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff] animate-pulse mr-1.5"></span>
                                  {item.statusLabel}
                                </span>
                              )}
                              {item.status === 'queueing' && (
                                <span className="inline-flex items-center px-2.5 py-0.5 bg-amber-950/50 text-amber-400 border border-amber-500/25 rounded-full text-[10px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mr-1.5"></span>
                                  {item.statusLabel}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Financial Metrics Split - Clean Display with Zero Overflow */}
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2 border-t border-b border-white/5 py-3 relative z-10">
                            <div>
                              <span className="text-[#cbc4d2]/40 text-[9px] font-bold uppercase tracking-wider block">认购方案金额</span>
                              <span className="text-white font-mono font-black text-sm block mt-0.5">
                                ¥ {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#cbc4d2]/40 text-[9px] font-bold uppercase tracking-wider block">排队锁定金额 (31%)</span>
                              <span className="text-[#cbc4d2]/80 font-mono font-semibold text-sm block mt-0.5">
                                ¥ {item.originalLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            <div>
                              <span className="text-[#cbc4d2]/40 text-[9px] font-bold uppercase tracking-wider block">已解锁并买入</span>
                              <span className="text-[#cfbcff] font-mono font-black text-sm block mt-0.5">
                                ¥ {item.released.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            <div>
                              <span className="text-amber-400/60 text-[9px] font-bold uppercase tracking-wider block">剩余锁定中</span>
                              <span className="text-amber-400 font-mono font-black text-sm block mt-0.5">
                                ¥ {item.remainingLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>

                          {/* Progress Indicator Section */}
                          <div className="space-y-1.5 relative z-10">
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span className="text-[#cbc4d2]/50">解锁买入进度 (Unlock Ratio)</span>
                              <span className="text-white font-mono">{percentComplete}%</span>
                            </div>
                            <div className="w-full bg-[#100d14] rounded-full h-2 overflow-hidden border border-white/[0.02]">
                              <div 
                                className="bg-gradient-to-r from-[#8a6eff] to-[#cfbcff] h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${percentComplete}%` }}
                              />
                            </div>
                          </div>

                          {/* Details action line */}
                          <div className="pt-2.5 border-t border-white/5 flex justify-between items-center relative z-10">
                            <span className="text-[10px] text-[#cbc4d2]/30 font-bold uppercase font-mono">
                              UNLOCK HISTORY ({item.unlockHistory?.length || 0})
                            </span>
                            <button
                              type="button"
                              onClick={() => setSelectedDetailOrder(item)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#cfbcff] hover:text-[#e5d5ff] hover:underline transition-colors cursor-pointer"
                            >
                              查看明细
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Load more prompt for orders listing */}
                  {loadingMoreOrders && (
                    <div className="flex items-center justify-center py-4 gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#cfbcff] animate-bounce [animation-delay:0.4s]"></span>
                      <span className="text-[10px] text-[#cbc4d2]/45 font-mono font-bold uppercase tracking-wider ml-1">链上计算同步中...</span>
                    </div>
                  )}

                  {!loadingMoreOrders && visibleOrdersCount < filteredOrders.length && (
                    <div className="text-center pt-2">
                      <button 
                        type="button"
                        onClick={() => {
                          setLoadingMoreOrders(true);
                          setTimeout(() => {
                            setVisibleOrdersCount(prev => Math.min(prev + 10, filteredOrders.length));
                            setLoadingMoreOrders(false);
                          }, 450);
                        }}
                        className="text-[10px] font-bold text-[#cfbcff]/50 hover:text-[#cfbcff] font-mono tracking-wider transition-colors cursor-pointer py-2 px-4 rounded-xl border border-white/5 bg-white/[0.01]"
                      >
                        向下滚动或点击加载更多 (LOAD MORE)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right column (1/3 Width): 买入与解锁记录 Timeline Logging layout with scroll load more */}
        <div className="lg:col-span-1 space-y-4 h-full">
          
          <div className="glass-card rounded-2xl p-5 bg-[#16131c] flex flex-col justify-between min-h-[400px] lg:min-h-[500px]">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-white/5 mb-5">
                <h4 className="text-sm font-semibold text-white tracking-wider flex items-center gap-2">
                  买入/解锁记录 <span className="text-[11px] font-mono text-[#cbc4d2]/40 font-normal">({releaseLogs.length})</span>
                </h4>
                <Clock className="w-4 h-4 text-[#cbc4d2]/40" />
              </div>

              {/* Vertical timeline stepper inside custom scroll box */}
              <div 
                onScroll={handleLogsScroll}
                className="max-h-[570px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-white/5 relative select-none space-y-6"
              >
                {/* Dashed background stepper stem line */}
                <div className="absolute top-2 bottom-6 left-[15.5px] w-px border-l border-dashed border-white/10 z-0"></div>

                <div className="space-y-6 relative z-10 pl-3">
                  {releaseLogs.slice(0, visibleLogsCount).map((log) => (
                    <div key={log.id} className="relative pl-5 flex flex-col gap-1">
                      {/* Circle Bullet accent indicator icon */}
                      <span className="absolute left-[0.2px] top-1.5 w-1.5 h-1.5 rounded-full border border-[#cfbcff]/60 bg-[#16131c]"></span>
                      
                      <div className="flex justify-between items-center text-[9px] font-mono text-[#cbc4d2]/40 tracking-wide">
                        <span>{log.date}</span>
                        <span className="text-[#cfbcff]/50 font-bold">{log.id}</span>
                      </div>
                      <p className="text-[11px] text-[#cbc4d2] font-semibold leading-relaxed">
                        {log.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {loadingMoreLogs && (
                  <div className="flex items-center justify-center py-2 gap-1 ml-4 text-[9px] text-[#cbc4d2]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cfbcff] animate-pulse"></span>
                    <span>载入更早记录中...</span>
                  </div>
                )}

                {!loadingMoreLogs && visibleLogsCount < releaseLogs.length && (
                  <div className="text-center pt-2 pl-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setLoadingMoreLogs(true);
                        setTimeout(() => {
                          setVisibleLogsCount(prev => Math.min(prev + 10, releaseLogs.length));
                          setLoadingMoreLogs(false);
                        }, 450);
                      }}
                      className="text-[10px] font-bold text-[#cfbcff]/40 hover:text-[#cfbcff] font-mono tracking-wider transition-colors cursor-pointer py-1 px-3 rounded-lg border border-white/5 bg-white/[0.01]"
                    >
                      滚动/点击加载更多
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 🔮 MODAL DIALOG: Selected Order Unlock Records Breakdown */}
      <AnimatePresence>
        {selectedDetailOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop cover overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetailOrder(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-[#15121b] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] z-10"
            >
              {/* Top Banner Highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8a6eff] via-[#cfbcff] to-[#e8ddff]" />

              {/* Modal Header */}
              <div className="p-5 border-b border-white/5 flex justify-between items-start">
                <div className="space-y-1 pr-6">
                  <span className="text-[10px] font-bold text-[#cfbcff] uppercase tracking-widest font-mono">
                    ORDER DETAIL BREAKDOWN
                  </span>
                  <h3 className="text-white text-[15px] font-black tracking-tight leading-relaxed">
                    {selectedDetailOrder.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-[#cbc4d2]/40 font-mono">
                      订单ID: {selectedDetailOrder.id}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    {selectedDetailOrder.status === 'released' && (
                      <span className="text-[10px] font-bold text-emerald-400">已全部解锁并买入</span>
                    )}
                    {selectedDetailOrder.status === 'partially_released' && (
                      <span className="text-[10px] font-bold text-[#cfbcff]">部分解锁中</span>
                    )}
                    {selectedDetailOrder.status === 'queueing' && (
                      <span className="text-[10px] font-bold text-amber-400">排队等待解锁</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDetailOrder(null)}
                  className="p-1 px-1.5 rounded-lg bg-white/5 text-[#cbc4d2]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body / Scroll Content */}
              <div className="p-5 overflow-y-auto space-y-5 scrollbar-thin">
                
                {/* Financial Indices Grid inside Modal */}
                <div className="grid grid-cols-2 gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-[#cbc4d2]/40 uppercase tracking-widest block">认购方案金额</span>
                    <span className="text-white font-mono font-black text-sm">
                      ¥ {selectedDetailOrder.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-[#cbc4d2]/40 uppercase tracking-widest block font-mono">排队锁定金额 (31%)</span>
                    <span className="text-[#cbc4d2]/80 font-mono font-bold text-sm">
                      ¥ {selectedDetailOrder.originalLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="space-y-0.5 pt-1.5 border-t border-white/[0.03]">
                    <span className="text-[9px] font-bold text-[#cbc4d2]/40 uppercase tracking-widest block">已解锁并买入额</span>
                    <span className="text-[#cfbcff] font-mono font-black text-sm">
                      ¥ {selectedDetailOrder.released.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="space-y-0.5 pt-1.5 border-t border-white/[0.03]">
                    <span className="text-[9px] font-bold text-amber-400/60 uppercase tracking-widest block">剩余排队锁定中</span>
                    <span className="text-amber-400 font-mono font-black text-sm">
                      ¥ {selectedDetailOrder.remainingLock.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#cbc4d2]/50">解锁买入比例 (UNLOCK RATIO)</span>
                    <span className="text-[#cfbcff] font-mono">
                      {selectedDetailOrder.originalLock > 0 
                        ? Math.round((selectedDetailOrder.released / selectedDetailOrder.originalLock) * 100)
                        : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-[#100d14] rounded-full h-2 overflow-hidden border border-white/[0.02]">
                    <div 
                      className="bg-gradient-to-r from-[#8a6eff] to-[#cfbcff] h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${selectedDetailOrder.originalLock > 0 
                          ? Math.round((selectedDetailOrder.released / selectedDetailOrder.originalLock) * 100)
                          : 0}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Detailed Unlock Flows Tab Item */}
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-bold text-[#cbc4d2]/50 uppercase tracking-widest block border-b border-white/5 pb-1.5 font-mono">
                    每一笔解锁明细 10% 锁定额度解套流水 (UNLOCKED LOGS)
                  </h4>

                  {selectedDetailOrder.unlockHistory && selectedDetailOrder.unlockHistory.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDetailOrder.unlockHistory.map((subLog) => (
                        <div 
                          key={subLog.id} 
                          className="bg-[#120f18]/90 p-3 rounded-xl border border-white/5 space-y-2 relative overflow-hidden group hover:border-[#cfbcff]/20 transition-all"
                        >
                          {/* Circle glowing indicator */}
                          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#cfbcff]/40 animate-pulse group-hover:bg-[#cfbcff]" />
                          
                          <div className="flex justify-between items-center text-[10px] text-[#cbc4d2]/40 font-mono pr-4">
                            <span className="font-semibold text-white/50">流水流水号 ID: {subLog.id}</span>
                            <span>{subLog.time}</span>
                          </div>
                          
                          <p className="text-white/80 text-[11px] leading-relaxed">
                            {subLog.triggerSource}
                          </p>
                          
                          <div className="flex justify-between items-center mt-1 text-[10px] bg-white/[0.03] px-2.5 py-1 rounded-lg font-mono">
                            <span className="text-emerald-400 font-bold">已解锁: ¥{subLog.unlockedAmount.toFixed(2)}</span>
                            <span className="text-[#cfbcff] font-bold">买入增持: +{subLog.trooBought.toLocaleString()} TROO</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-[#100d14]/50 border border-dashed border-white/5 rounded-xl text-[#cbc4d2]/30 text-xs font-medium space-y-1">
                      <Lock className="w-5 h-5 mx-auto text-[#cbc4d2]/20" />
                      <p>暂无解锁动作明细</p>
                      <p className="text-[10px] text-[#cbc4d2]/20 scale-95 font-mono">WAITING L1 REFERRALS DISPATCH EVENT...</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 bg-white/[0.01] border-t border-white/5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDetailOrder(null)}
                  className="px-4 py-2 bg-[#cfbcff] text-[#100d14] text-[11px] font-black rounded-lg hover:bg-white transition-all cursor-pointer shadow-lg font-bold"
                >
                  关闭详情窗口 (CLOSE)
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageView>
  );
}
