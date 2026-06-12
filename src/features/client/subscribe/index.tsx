import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Check, 
  Info, 
  Award, 
  Clock, 
  Layers, 
  ChevronRight, 
  ShieldAlert,
  Edit,
  PlayCircle,
  AlertTriangle,
  Copy,
  X
} from 'lucide-react';
import { Transaction } from '../../../types';
import PageView from '../../../components/PageView';
import AlertBanner from '../../../components/AlertBanner';

interface SubscribeViewProps {
  usdtBalance: number;
  commissionPoolLimit: number;
  commissionPoolRemaining: number;
  onUpdateCommissionPool: (limitDiff: number, remainingDiff: number) => void;
  onUpdateBalances: (usdtDiff: number, trooDiff: number, lockedDiff?: number) => void;
  onAddTransaction: (txn: Transaction) => void;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  badge: string;
  badgeStyle: string;
  poolLimit: number;
  giftRatio: number;
  releaseLimit: number;
  queueRelease: number;
  isPopular?: boolean;
  description: string;
  borderStyle?: string;
  badgeColor?: string;
}

export default function SubscribeView({
  usdtBalance,
  commissionPoolLimit,
  commissionPoolRemaining,
  onUpdateCommissionPool,
  onUpdateBalances,
  onAddTransaction
}: SubscribeViewProps) {
  // Plan setup
  const plans: Plan[] = [
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

  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[4]); // default is Plan E
  const [amountInput, setAmountInput] = useState<number>(50000);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');
  const [detailModalItem, setDetailModalItem] = useState<any | null>(null);
  
  // Custom mock history with interactive additions matching homepage styles
  const [purchases, setPurchases] = useState([
    { id: 'SUB-99812-E', name: '方案 E', amount: 50000, troo: 350000, giftRatio: 20, lockAmount: 15500, progress: 45, date: '2023-11-24 14:32', status: '进行中', statusType: 'pending' },
    { id: 'SUB-82215-D', name: '方案 D', amount: 10000, troo: 70000, giftRatio: 15, lockAmount: 3100, progress: 100, date: '2023-10-15 09:12', status: '已完成', statusType: 'success' },
    { id: 'SUB-71104-B', name: '方案 B', amount: 1000, troo: 7000, giftRatio: 2, lockAmount: 310, progress: 0, date: '2023-09-02 11:45', status: '已取消', statusType: 'failed' },
  ]);

  // Timers to clean notices
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 6000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setAmountInput(plan.price);
    setErrorMsg('');
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const plan = plans.find(p => p.id === e.target.value);
    if (plan) {
      handleSelectPlan(plan);
    }
  };

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (amountInput < selectedPlan.price) {
      setErrorMsg(`当前方案的最低参与起购额度为 ${selectedPlan.price} USDT`);
      return;
    }

    if (amountInput > usdtBalance) {
      setErrorMsg('USDT 钱包余额不足，请先在钱包模块充值资产再行认购！');
      return;
    }

    const expectedTroo = amountInput * 0.7; // 70% expected release
    const queueLockAmount = amountInput * 0.31; // 31% enters lock queue allocation as per PRD
    const randomId = 'SUB-' + Math.floor(10000 + Math.random() * 90000) + '-' + selectedPlan.name.split(' ')[1];
    
    // Create a temporary preview object with isConfirmation set to true
    const previewPurchase = {
      id: randomId,
      name: selectedPlan.name,
      amount: amountInput,
      troo: expectedTroo * 10,
      giftRatio: selectedPlan.giftRatio,
      lockAmount: queueLockAmount,
      progress: 0,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: '待确认签署',
      statusType: 'pending',
      isConfirmation: true
    };

    setDetailModalItem(previewPurchase);
  };

  const handleConfirmPurchase = () => {
    if (!detailModalItem) return;

    const amount = detailModalItem.amount;
    if (amount > usdtBalance) {
      setErrorMsg('USDT 钱包余额不足，请先在钱包模块充值资产再行认购！');
      setDetailModalItem(null);
      return;
    }

    const expectedTroo = amount * 0.7; // 70% expected release
    const queueLockAmount = amount * 0.31; // 31% enters lock queue allocation as per PRD
    
    // Add proportional poolLimit capacity
    const calculatedLimit = selectedPlan.poolLimit * (amount / selectedPlan.price);
    
    onUpdateBalances(-amount, expectedTroo * 10, queueLockAmount); // subtract usdt, add 70% converted to troo (x10), add lock allocation
    onUpdateCommissionPool(calculatedLimit, calculatedLimit);

    const newPurchase = {
      ...detailModalItem,
      status: '进行中',
      isConfirmation: false
    };

    setPurchases([newPurchase, ...purchases]);
    setDetailModalItem(null); // Close modal cleanly
    
    // Log as transaction record
    onAddTransaction({
      id: 'TXN-' + Math.floor(1000000000 + Math.random() * 9000000000),
      type: 'subscribe',
      typeLabel: '认购',
      desc: `参与并认购 ${selectedPlan.name} 理财计划 (排队锁定 31% = ${queueLockAmount.toFixed(2)} USDT, 佣金池额度增加 +¥ ${calculatedLimit.toLocaleString()})`,
      amount: -amount,
      currency: 'USDT',
      time: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'success',
      statusLabel: '进行中'
    });

    setSuccessMsg(`您已成功认购 ${selectedPlan.name}，成功自您的钱包支付并扣除了 ${amount} USDT。获得立即买入 70% 对应 TROO 和 31% 排队锁定，增加佣金下线限额 +¥ ${calculatedLimit.toLocaleString()} 元！`);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(''), 2000);
  };

  return (
    <PageView>
      <AnimatePresence>
        {successMsg && (
          <AlertBanner 
            message={`认购授权成功 / Subscription Completed: ${successMsg}`} 
            type="success" 
            onClose={() => setSuccessMsg('')} 
          />
        )}
        {errorMsg && (
          <AlertBanner 
            message={errorMsg} 
            type="error" 
            onClose={() => setErrorMsg('')} 
          />
        )}
      </AnimatePresence>

      {/* 1. Plans Selection Area (Vertical High Fidelity Rows - with high contrast purple triggers) */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {plans.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => handleSelectPlan(plan)}
              className={`p-5 sm:p-6 md:p-8 rounded-2xl grid grid-cols-12 gap-5 lg:gap-6 items-center cursor-pointer border transition-all duration-300 relative ${
                isSelected 
                  ? 'bg-gradient-to-br from-[#6750a4]/20 to-[#cfbcff]/5 border-[#cfbcff] ring-2 ring-[#cfbcff]/50 shadow-2xl scale-[1.015] glow-accent' 
                  : `bg-[#1a1620]/75 ${plan.borderStyle || 'border-white/5'} hover:border-[#cfbcff]/30`
              }`}
            >
              {/* Left Column: Plan information and Tier identity */}
              <div className="col-span-12 lg:col-span-4 xl:col-span-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight">
                    {plan.name}
                  </h3>
                  {plan.isPopular && (
                    <span className="px-2.5 py-0.5 bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider rounded-md flex items-center gap-1 shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" /> 推荐
                    </span>
                  )}
                </div>
                
                <p className="text-xs sm:text-[13px] text-[#cbc4d2]/85 leading-relaxed font-normal mt-0.5">
                  {plan.description}
                </p>

                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-[11px] text-[#cbc4d2]/60 uppercase font-black tracking-wide">起购门槛:</span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-white tracking-tight">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-black text-[#cfbcff] font-mono">USDT</span>
                </div>
              </div>

              {/* Middle Column: Specs comparison (super prominent stats bento grids without overflow) */}
              <div className="col-span-12 lg:col-span-8 xl:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6 xl:pl-8">
                {/* Spec 1: 佣金池放款额 */}
                <div className="flex flex-col justify-center bg-white/2 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/5">
                  <span className="text-[10px] sm:text-xs font-bold text-[#cbc4d2]/50 uppercase mb-1 tracking-wider leading-tight">
                    佣金池放款额
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-emerald-400">
                    ¥{plan.poolLimit.toLocaleString()}
                  </span>
                </div>

                {/* Spec 2: 充值返赠比例 */}
                <div className="flex flex-col justify-center bg-[#cfbcff]/2 p-3 rounded-xl border border-[#cfbcff]/5 transition-all hover:bg-[#cfbcff]/5 animate-none">
                  <span className="text-[10px] sm:text-xs font-bold text-[#cfbcff]/60 uppercase mb-1 tracking-wider leading-tight">
                    充值返赠比例
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-[#cfbcff]">
                    +{plan.giftRatio}%
                  </span>
                </div>

                {/* Spec 3: 立即释放买入 */}
                <div className="flex flex-col justify-center bg-white/2 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/5">
                  <span className="text-[10px] sm:text-xs font-bold text-[#cbc4d2]/50 uppercase mb-1 tracking-wider leading-tight">
                    立即释放买入
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-white">
                    {plan.releaseLimit}%
                  </span>
                </div>

                {/* Spec 4: 排队等候锁定 */}
                <div className="flex flex-col justify-center bg-white/2 p-3 rounded-xl border border-white/5 transition-all hover:bg-white/5">
                  <span className="text-[10px] sm:text-xs font-bold text-[#e7c365]/60 uppercase mb-1 tracking-wider leading-tight">
                    排队等候锁定
                  </span>
                  <span className="text-xs sm:text-sm md:text-base lg:text-sm xl:text-lg font-mono font-black text-[#e7c365]">
                    {plan.queueRelease}%
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Trigger Button */}
              <div className="col-span-12 lg:col-span-12 xl:col-span-2 flex justify-end mt-2 lg:mt-4 xl:mt-0">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan);
                  }}
                  className={`w-full xl:w-28 py-2.5 sm:py-3 px-5 rounded-xl text-xs sm:text-[13px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg hover:translate-y-[-1px] active:translate-y-[0px] ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white shadow-[#6750a4]/30 border border-[#cfbcff]/40' 
                      : 'bg-white/5 text-[#cbc4d2] hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {isSelected ? '当前已选' : '立即选择'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2 & 3. Subscription Details Confirm & Rules Form Layout */}
      <div className="space-y-6">
        {/* Form Details Screen - Expanded to full width */}
        <div className="w-full glass-card rounded-2xl p-4 sm:p-6 md:p-8">
          <h2 className="text-sm sm:text-base font-bold text-white mb-4 sm:mb-6 uppercase tracking-wider flex items-center gap-2">
            <Edit className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#cfbcff]" /> 认购详情确认
          </h2>

          <form onSubmit={handleSubscriptionSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] sm:text-[10px] font-bold uppercase text-[#cbc4d2] tracking-wider">选择套餐方案</label>
                  <select 
                    value={selectedPlan.id}
                    onChange={handleDropdownChange}
                    className="bg-[#141218] border border-white/10 rounded-xl text-white px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none"
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {p.price.toLocaleString()} USDT</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] sm:text-[10px] font-bold uppercase text-[#cbc4d2] tracking-wider">认购金额 (USDT)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={amountInput}
                      onChange={(e) => setAmountInput(parseFloat(e.target.value) || 0)}
                      min={selectedPlan.price}
                      className="w-full bg-[#141218] border border-white/10 rounded-xl text-white pl-3.5 sm:pl-4 pr-16 py-3 sm:py-3.5 font-mono font-bold text-sm sm:text-base focus:ring-1 focus:ring-[#cfbcff] outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] sm:text-xs text-[#cbc4d2] font-bold">USDT</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/60 select-none">最低认购门槛: {selectedPlan.price} USDT</span>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 space-y-2.5">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white py-3 sm:py-3.5 rounded-xl font-bold hover:brightness-110 active:scale-[0.99] transition-all duration-150 text-[11px] sm:text-xs tracking-wider uppercase cursor-pointer shadow-lg shadow-black/30 block"
                >
                  确认认购并签署协议文件
                </button>
                <p className="text-left text-[9px] sm:text-[10px] text-[#cbc4d2]/40 select-none leading-relaxed">
                  点击确认即代表您同意《理财参与协议》及相关全自理风险授权声明协议
                </p>
              </div>
            </div>

            <div className="bg-[#141218]/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5 border border-white/5 text-[11px] sm:text-xs md:text-sm">
              <div className="space-y-3.5">
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                  <span className="text-[11px] sm:text-xs text-[#cbc4d2]/80">充值赠送比例</span>
                  <span className="text-xs sm:text-sm font-bold text-[#cfbcff] font-mono">{selectedPlan.giftRatio}%</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                  <span className="text-[11px] sm:text-xs text-[#cbc4d2]/80">立即买入 (70% 对应 TROO)</span>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono">{(amountInput * 0.7 * 10).toLocaleString('zh-CN')} TROO</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                  <span className="text-[11px] sm:text-xs text-[#cbc4d2]/80">排队锁定 (31%)</span>
                  <span className="text-xs sm:text-sm font-bold text-[#e7c365] font-mono">{(amountInput * 0.31).toLocaleString('zh-CN')} USDT</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                  <span className="text-[11px] sm:text-xs text-[#cbc4d2]/80">佣金池增加放款额度</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">+¥ {(selectedPlan.poolLimit * (amountInput / selectedPlan.price)).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[11px] sm:text-xs text-[#cbc4d2]/80">当前可用佣金池限额</span>
                <span className="text-[10px] sm:text-[11px] font-black text-[#cfbcff] font-mono">
                  {commissionPoolRemaining.toLocaleString()} / {commissionPoolLimit.toLocaleString()} USDT
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 4. Recurrent logs purchases - Polished "My Orders" Replica Table with Order ID */}
      <section className="glass-card rounded-2xl overflow-hidden shadow-xl mt-6">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/5">
          <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">认购记录 (Purchase History)</h4>
          <span className="text-[10px] text-[#cbc4d2]/50 font-mono bg-white/5 px-2.5 py-1 rounded-lg">
            共 {purchases.length} 个订单
          </span>
        </div>
        
        {/* Desktop Table - Exactly patterned from HomeView (我的订单) */}
        <div className="hidden md:block overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#141218]/90 text-[#cbc4d2]/80 text-[11px] font-bold uppercase tracking-widest border-b border-white/5 select-none">
              <tr>
                <th className="px-6 py-4">订单编号</th>
                <th className="px-4 py-4">方案产品</th>
                <th className="px-4 py-4 text-right">金额 (USDT)</th>
                <th className="px-4 py-4 text-right">赠送比例</th>
                <th className="px-4 py-4 text-right">预计 TROO</th>
                <th className="px-4 py-4 text-center">日期时间</th>
                <th className="px-4 py-4 text-center">买入进度</th>
                <th className="px-4 py-4 text-center">当前状态</th>
                <th className="px-6 py-4 text-right">管理操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {purchases.map((purchase) => {
                const isCopied = copiedId === purchase.id;
                return (
                  <tr key={purchase.id} className="hover:bg-white/3 transition-colors group">
                    {/* Copyable Order ID Code */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-white/90 select-all">{purchase.id}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(purchase.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-[#cfbcff] rounded hover:bg-white/5 transition-all cursor-pointer"
                          title="复制订单编号"
                        >
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#cfbcff]/15 rounded">
                            {isCopied ? '已复制' : '复制ID'}
                          </span>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{purchase.name}理财</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-white font-mono">
                      {purchase.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-right font-medium text-[#cfbcff] font-mono">
                      {purchase.giftRatio}%
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-emerald-400 font-mono">
                      {purchase.troo.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-center text-[#cbc4d2]/75 font-mono text-xs">
                      {purchase.date}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-center max-w-[120px] mx-auto">
                        <div className="w-16 bg-[#36343a]/40 rounded-full h-1 overflow-hidden">
                          <div className="bg-[#6750a4] h-full" style={{ width: `${purchase.progress}%` }}></div>
                        </div>
                        <span className="text-[10px] font-mono text-white/70">{purchase.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        purchase.statusType === 'success' || purchase.status === '已完成'
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/20' 
                          : purchase.statusType === 'failed' || purchase.status === '已取消'
                            ? 'bg-rose-950/40 text-rose-400 border border-rose-800/20'
                            : 'bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20 animate-pulse'
                      }`}>
                        {purchase.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        type="button"
                        onClick={() => setDetailModalItem(purchase)}
                        className="text-xs text-[#cfbcff] font-black hover:underline tracking-wider cursor-pointer bg-[#cfbcff]/10 hover:bg-[#cfbcff]/20 px-3 py-1.5 rounded-lg border border-[#cfbcff]/15 transition-all text-center"
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View with Cards - Elegant Pattern matches HomeView */}
        <div className="md:hidden divide-y divide-white/5 space-y-4 p-4 bg-[#1a1722]/30">
          {purchases.map((purchase, index) => (
            <div key={purchase.id} className={`space-y-3.5 ${index > 0 ? 'pt-4' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-extrabold text-white text-[13px] sm:text-sm">{purchase.name} 认购计划</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/50 font-mono">#{purchase.id}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(purchase.id)}
                      className="text-[9px] text-[#cfbcff] hover:underline bg-transparent border-0 cursor-pointer"
                    >
                      {copiedId === purchase.id ? '已复制' : '复制'}
                    </button>
                  </div>
                </div>
                <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8.5px] sm:text-[9px] font-black uppercase ${
                  purchase.statusType === 'success' || purchase.status === '已完成'
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/10' 
                    : purchase.statusType === 'failed' || purchase.status === '已取消'
                      ? 'bg-rose-950/40 text-rose-400 border border-rose-800/10'
                      : 'bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20 animate-pulse'
                }`}>
                  {purchase.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-[11px] sm:text-xs bg-[#120f17]/50 rounded-xl p-2.5 sm:p-3 border border-white/5">
                <div>
                  <p className="text-[#cbc4d2]/40 text-[8.5px] sm:text-[9px] font-bold uppercase">认购时间</p>
                  <p className="text-white/80 font-mono mt-0.5 text-[11px] sm:text-xs">{purchase.date}</p>
                </div>
                <div>
                  <p className="text-[#cbc4d2]/40 text-[8.5px] sm:text-[9px] font-bold uppercase text-right">方案金额</p>
                  <p className="text-[#cfbcff] font-bold font-mono text-right mt-0.5 text-[11px] sm:text-xs">{purchase.amount.toLocaleString()} USDT</p>
                </div>
                <div>
                  <p className="text-[#cbc4d2]/40 text-[8.5px] sm:text-[9px] font-bold uppercase">获赠比例</p>
                  <p className="text-white/80 font-mono mt-0.5 mt-0.5 text-[11px] sm:text-xs">{purchase.giftRatio}%</p>
                </div>
                <div>
                  <p className="text-[#cbc4d2]/40 text-[8.5px] sm:text-[9px] font-bold uppercase text-right">预计 TROO</p>
                  <p className="text-emerald-400 font-bold font-mono text-right mt-0.5 text-[11px] sm:text-xs">+{purchase.troo.toLocaleString()} TROO</p>
                </div>
                <div className="col-span-2 pt-1.5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[#cbc4d2]/40 text-[8.5px] sm:text-[9px] font-bold uppercase">买入进度</span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-16 sm:w-20 bg-[#36343a]/40 rounded-full h-1 overflow-hidden">
                      <div className="bg-[#6750a4] h-full" style={{ width: `${purchase.progress}%` }}></div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white/90">{purchase.progress}%</span>
                  </div>
                </div>
              </div>

              <div className="text-right pt-2 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => setDetailModalItem(purchase)}
                  className="text-[11px] sm:text-xs text-[#cfbcff] font-bold hover:underline bg-[#cfbcff]/5 hover:bg-[#cfbcff]/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-[#cfbcff]/10 transition-all cursor-pointer"
                >
                  查看订单详情
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Detail Modal Popup - UX interactive enhancement */}
      <AnimatePresence>
        {detailModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background screen overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailModalItem(null)}
              className="absolute inset-0 bg-black/65 backdrop-blur-md"
            />

            {/* Modal Card content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#211f24] border border-[#cfbcff]/20 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button 
                type="button" 
                onClick={() => setDetailModalItem(null)} 
                className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-5 select-none pb-2 border-b border-white/5">
                <PlayCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#cfbcff]" />
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase">
                  {detailModalItem.isConfirmation ? '确认认购详情及协议' : '理财合约订单明细'}
                </h3>
              </div>

              <div className="space-y-4 text-[11px] sm:text-xs">
                {/* Visual Header Block */}
                <div className="bg-[#141218] p-3.5 sm:p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase block">方案名称</span>
                    <span className="text-sm sm:text-base font-black text-white block mt-0.5">{detailModalItem.name} 专属合约</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase block">当前状态</span>
                    <span className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase mt-1 inline-block ${
                      detailModalItem.isConfirmation
                        ? 'bg-amber-950/40 text-amber-400 border border-amber-800/20'
                        : detailModalItem.statusType === 'success' || detailModalItem.status === '已完成'
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/10' 
                          : detailModalItem.statusType === 'failed' || detailModalItem.status === '已取消'
                            ? 'bg-rose-950/40 text-rose-400 border border-rose-800/10'
                            : 'bg-[#6750a4]/30 text-[#cfbcff] border border-[#cfbcff]/20 animate-pulse'
                    }`}>
                      {detailModalItem.isConfirmation ? '待确认签署' : detailModalItem.status}
                    </span>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-3 bg-white/3 p-3.5 sm:p-4 rounded-xl border border-white/5 text-[11px] sm:text-xs">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[#cbc4d2]/70">交易订单识别号 (Order No.)</span>
                    <div className="flex items-center gap-1.5 font-mono text-white font-semibold flex-wrap justify-end">
                      <span className="text-[10px] sm:text-xs">{detailModalItem.id}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyText(detailModalItem.id)}
                        className="p-1 bg-[#cfbcff]/15 hover:bg-[#cfbcff]/25 rounded text-[#cfbcff] cursor-pointer text-[9px] font-bold"
                      >
                        {copiedId === detailModalItem.id ? '已复制' : '复制'}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">认购锁定金额</span>
                    <span className="text-xs sm:text-sm font-bold text-white font-mono">{detailModalItem.amount.toLocaleString()} USDT</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">充值方案赠送比</span>
                    <span className="text-xs sm:text-sm font-bold text-[#cfbcff] font-mono">{detailModalItem.giftRatio}%</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">买入TROO总数 (70%)</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">{(detailModalItem.troo).toLocaleString()} TROO</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">预计 31% 排队锁定款</span>
                    <span className="text-xs sm:text-sm font-bold text-[#e7c365] font-mono">{(detailModalItem.amount * 0.31).toLocaleString()} USDT</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-[#cbc4d2]/70">合约签署签署时间</span>
                    <span className="text-xs sm:text-sm text-white font-mono">{detailModalItem.date}</span>
                  </div>
                </div>

                {/* Progress Visual Release block */}
                <div className="bg-[#141218]/50 p-3.5 sm:p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-[9px] sm:text-[10px]">
                    <span className="text-[#cbc4d2]/60 uppercase font-bold">立即买入 TROO 比例</span>
                    <span className="font-bold font-mono text-[#cfbcff]">{detailModalItem.isConfirmation ? '100%' : `${detailModalItem.progress}%`}</span>
                  </div>
                  <div className="w-full bg-[#36343a] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] h-full" style={{ width: detailModalItem.isConfirmation ? '100%' : `${detailModalItem.progress}%` }}></div>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-[#cbc4d2]/50 italic leading-relaxed">
                    * 该理财参与协议通过系统进行订单买入操作。在30天投资锁定期后，全部收益与分红可随时提取。
                  </p>
                </div>
              </div>

              {/* Close or Action confirmation footer buttons */}
              <div className="mt-6 flex justify-end">
                {detailModalItem.isConfirmation ? (
                  <div className="flex gap-3 w-full">
                    <button 
                      type="button"
                      onClick={() => setDetailModalItem(null)}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-[#cbc4d2] border border-white/5 py-2.5 sm:py-3 rounded-xl font-bold transition-all text-[11px] sm:text-xs cursor-pointer text-center"
                    >
                      取消返回
                    </button>
                    <button 
                      type="button"
                      onClick={handleConfirmPurchase}
                      className="flex-1 bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white py-2.5 sm:py-3 rounded-xl font-black hover:brightness-110 active:scale-[0.98] transition-all text-[11px] sm:text-xs cursor-pointer shadow-lg shadow-black/20 text-center"
                    >
                      确认支付并认购
                    </button>
                  </div>
                ) : (
                  <button 
                    type="button"
                    onClick={() => setDetailModalItem(null)}
                    className="bg-[#cfbcff] text-[#381e72] px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all text-[11px] sm:text-xs cursor-pointer shadow-md"
                  >
                    关闭窗口
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageView>
  );
}
