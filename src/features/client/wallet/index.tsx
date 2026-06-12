import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, 
  Coins, 
  Lock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  ArrowLeftRight, 
  Info, 
  Search, 
  X, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  Clock,
  Copy,
  AlertTriangle
} from 'lucide-react';
import { Transaction } from '../../../types';
import PageView from '../../../components/PageView';
import AlertBanner from '../../../components/AlertBanner';
import MetricCard from '../../../components/MetricCard';

interface WalletViewProps {
  usdtBalance: number;
  trooBalance: number;
  lockedQueueAmount: number;
  transactions: Transaction[];
  onAddTransaction: (txn: Transaction) => void;
  onUpdateBalances: (usdtDiff: number, trooDiff: number, lockedDiff?: number) => void;
}

export default function WalletView({
  usdtBalance,
  trooBalance,
  lockedQueueAmount,
  transactions,
  onAddTransaction,
  onUpdateBalances
}: WalletViewProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [activeAction, setActiveAction] = useState<'none' | 'recharge' | 'withdraw' | 'transfer'>('none');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [searchVal, setSearchVal] = useState<string>('');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [copySuccessId, setCopySuccessId] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Recharge & Withdraw Network Switching (TRX / ETH)
  const [rechargeNetwork, setRechargeNetwork] = useState<'TRX' | 'ETH'>('TRX');
  const [withdrawNetwork, setWithdrawNetwork] = useState<'TRX' | 'ETH'>('TRX');

  // Form Inputs
  const [amountInput, setAmountInput] = useState<string>('');
  const [addressInput, setAddressInput] = useState<string>('');
  const [transferUserId, setTransferUserId] = useState<string>('');

  // Clear states when toggling panels
  useEffect(() => {
    setAmountInput('');
    setAddressInput('');
    setTransferUserId('');
    setErrorMsg('');
  }, [activeAction]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const getNormalizedTypeLabel = (type: string, defaultLabel: string) => {
    const mapping: Record<string, string> = {
      'recharge': '充值',
      'withdraw': '提现',
      'transfer': '划转',
      'subscribe': '认购',
      'commission': '佣金',
      'lock': '锁定'
    };
    return mapping[type] || defaultLabel;
  };

  const filterButtons = [
    { id: 'all', label: '全部' },
    { id: 'recharge', label: '充值' },
    { id: 'withdraw', label: '提现' },
    { id: 'transfer', label: '划转' },
    { id: 'subscribe', label: '认购' },
    { id: 'commission', label: '佣金' },
    { id: 'lock', label: '锁定' }
  ];

  // Filter transaction records properly
  const filteredTransactions = transactions.filter(txn => {
    // 1. Filter by category
    if (filterType !== 'all' && txn.type !== filterType) return false;
    // 2. Filter by search description/id
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

  // Handle action submissions
  const handleSubmitAction = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const num = parseFloat(amountInput);
    
    if (activeAction !== 'recharge') {
      if (isNaN(num) || num <= 0) {
        setErrorMsg('请输入有效的金额');
        return;
      }
    }

    const formattedTime = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const generatedId = 'TXN-' + Math.floor(1000000000 + Math.random() * 9000000000);

    if (activeAction === 'recharge') {
      return; // Handled dynamically without submit buttons
    } else if (activeAction === 'withdraw') {
      const minWithdraw = withdrawNetwork === 'ETH' ? 40 : 20;
      if (num < minWithdraw) {
        setErrorMsg(`提现金额不可低于最小提现要求: ${minWithdraw} USDT`);
        return;
      }
      if (num > usdtBalance) {
        setErrorMsg('您的可用余额不足！');
        return;
      }
      if (!addressInput.trim()) {
        setErrorMsg('请输入收款钱包地址');
        return;
      }
      onUpdateBalances(-num, 0);
      onAddTransaction({
        id: generatedId,
        type: 'withdraw',
        typeLabel: '提现申请',
        desc: `提现至外部钱包 (${withdrawNetwork} 网络: ${addressInput})`,
        amount: -num,
        currency: 'USDT',
        time: formattedTime,
        status: 'pending',
        statusLabel: '处理中'
      });
      setSuccessMsg(`已成功提交提现申请 ${num} USDT (${withdrawNetwork}网络)，系统正在处理`);
    } else if (activeAction === 'transfer') {
      const minTransfer = 10;
      if (num < minTransfer) {
        setErrorMsg(`站内划转金额不可低于最小划转限制: ${minTransfer} USDT`);
        return;
      }
      if (!transferUserId.trim()) {
        setErrorMsg('请输入接收方的平台用户ID (UID)');
        return;
      }
      if (num > usdtBalance) {
        setErrorMsg('您的可用余额不足！');
        return;
      }
      onUpdateBalances(-num, 0); // Deduct usdt balance
      onAddTransaction({
        id: generatedId,
        type: 'transfer',
        typeLabel: '平台划转',
        desc: `站内资金划转至用户 UID: ${transferUserId}`,
        amount: -num,
        currency: 'USDT',
        time: formattedTime,
        status: 'success',
        statusLabel: '成功'
      });
      setSuccessMsg(`划转成功！您已成功向平台用户 ${transferUserId} 口岸划转 ${num} USDT`);
    }

    // Reset input states
    setAmountInput('');
    setAddressInput('');
    setTransferUserId('');
    setActiveAction('none');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <PageView>
      {/* Assets Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="总资产 (USDT)"
          value={usdtBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          icon={<DollarSign className="w-4.5 h-4.5" />}
          subtext="资产实时汇率波动 +0.25%"
          subIcon={<TrendingUp className="w-3.5 h-3.5" />}
        />

        <MetricCard
          label="TROO 余额"
          value={trooBalance.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          icon={<Coins className="w-4.5 h-4.5" />}
          subtext={`≈ ${(trooBalance * 0.27).toLocaleString('zh-CN', { maximumFractionDigits: 2 })} USDT`}
          hoverGradientColor="bg-[#cdc0e9]"
        />

        <MetricCard
          label="排队账号锁定金额"
          value={lockedQueueAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          icon={<Lock className="w-4 h-4" />}
          subtext="排队中，待解锁释放"
          subIcon={<Clock className="w-3.5 h-3.5" />}
          hoverGradientColor="bg-[#e7c365]"
        />
      </section>

      {/* Action Buttons Panels */}
      <section className="space-y-4">
        {/* Quick action triggers */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
          <button 
            onClick={() => setActiveAction(activeAction === 'recharge' ? 'none' : 'recharge')}
            className={`flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-150 text-xs sm:text-sm cursor-pointer border ${
              activeAction === 'recharge' 
                ? 'bg-[#6750a4] text-white shadow-md glow-accent border border-[#cfbcff]/40 ring-1 ring-[#cfbcff] scale-[1.02]'
                : activeAction === 'none'
                  ? 'bg-[#6750a4] text-white border-transparent hover:scale-[1.02] active:scale-[0.98] shadow-md glow-accent'
                  : 'bg-[#141218]/45 text-[#cbc4d2]/40 border-white/5 opacity-60 hover:opacity-85'
            }`}
          >
            <ArrowDownLeft className="w-4 sm:w-4.5 h-4 sm:h-4.5" /> 充值
          </button>
          
          <button 
            onClick={() => setActiveAction(activeAction === 'withdraw' ? 'none' : 'withdraw')}
            className={`flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-150 text-xs sm:text-sm cursor-pointer border ${
              activeAction === 'withdraw' 
                ? 'bg-[#6750a4] text-white shadow-md glow-accent border border-[#cfbcff]/40 ring-1 ring-[#cfbcff] scale-[1.02]'
                : activeAction === 'none'
                  ? 'bg-[#211f24] text-[#cfbcff] border-[#cfbcff]/20 hover:border-[#cfbcff]/50 hover:bg-[#cfbcff]/5 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-[#141218]/45 text-[#cbc4d2]/40 border-white/5 opacity-60 hover:opacity-85'
            }`}
          >
            <ArrowUpRight className="w-4 sm:w-4.5 h-4 sm:h-4.5" /> 提现
          </button>

          <button 
            onClick={() => setActiveAction(activeAction === 'transfer' ? 'none' : 'transfer')}
            className={`flex items-center justify-center gap-1.5 px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold transition-all duration-150 text-xs sm:text-sm cursor-pointer border ${
              activeAction === 'transfer' 
                ? 'bg-[#6750a4] text-white shadow-md glow-accent border border-[#cfbcff]/40 ring-1 ring-[#cfbcff] scale-[1.02]'
                : activeAction === 'none'
                  ? 'bg-[#211f24] text-white border-white/10 hover:border-white/20 hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-[#141218]/45 text-[#cbc4d2]/40 border-white/5 opacity-60 hover:opacity-85'
            }`}
          >
            <RefreshCcw className="w-4 sm:w-4.5 h-4 sm:h-4.5" /> 划转
          </button>

          <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-1 text-[10px] sm:text-xs text-[#cbc4d2] opacity-60 font-medium">
            <Info className="w-3.5 h-3.5 text-[#cfbcff]" />
            <span>交易流程均经多重安全链上校验</span>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <AlertBanner message={successMsg} type="success" onClose={() => setSuccessMsg('')} />
        )}

        {/* Action Panel Form Overlay */}
        <AnimatePresence>
          {activeAction !== 'none' && (
            <motion.div 
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.25 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden overflow-y-auto"
            >
              <button 
                onClick={() => setActiveAction('none')} 
                className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-sm sm:text-base font-bold text-white mb-4 sm:mb-5 uppercase tracking-wider flex items-center gap-2">
                {activeAction === 'recharge' && '安全智能充值系统'}
                {activeAction === 'withdraw' && '链上提现申请授权'}
                {activeAction === 'transfer' && '站内用户资金划转'}
              </h3>

              {errorMsg && (
                <div className="mb-5">
                  <AlertBanner message={errorMsg} type="error" onClose={() => setErrorMsg('')} />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <form onSubmit={handleSubmitAction} className="lg:col-span-2 space-y-5">
                  {/* RECHARGE BLOCK */}
                  {activeAction === 'recharge' && (
                    <div className="space-y-5">
                      {/* Network selection toggle */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-black uppercase tracking-wider">选择充值网络 / Network</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setRechargeNetwork('TRX')}
                            className={`px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all text-[11px] sm:text-xs cursor-pointer ${
                              rechargeNetwork === 'TRX' 
                                ? 'bg-[#6750a4] border-[#cfbcff] text-white shadow-md glow-accent' 
                                : 'bg-[#141218]/45 border-white/10 text-[#cbc4d2]/70 hover:border-white/20'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${rechargeNetwork === 'TRX' ? 'bg-white animate-pulse' : 'bg-[#cbc4d2]/40'}`}></span>
                            TRC-20 (TRON) 网络
                          </button>
                          <button
                            type="button"
                            onClick={() => setRechargeNetwork('ETH')}
                            className={`px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all text-[11px] sm:text-xs cursor-pointer ${
                              rechargeNetwork === 'ETH' 
                                ? 'bg-[#6750a4] border-[#cfbcff] text-white shadow-md glow-accent' 
                                : 'bg-[#141218]/45 border-white/10 text-[#cbc4d2]/70 hover:border-white/20'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${rechargeNetwork === 'ETH' ? 'bg-white animate-pulse' : 'bg-[#cbc4d2]/40'}`}></span>
                            ERC-20 (Ethereum) 网络
                          </button>
                        </div>
                      </div>

                      {/* Deposit address */}
                      <div className="bg-white/3 rounded-2xl p-4 border border-white/5 space-y-3">
                        <span className="font-extrabold text-[#cfbcff] block text-[10px] sm:text-xs uppercase tracking-wide">
                          专属 USDT {rechargeNetwork === 'TRX' ? 'TRC-20' : 'ERC-20'} 地址:
                        </span>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <span className="font-mono text-white text-xs sm:text-sm select-all break-all block py-1">
                            {rechargeNetwork === 'TRX' 
                              ? 'TX52b9m8xQ987dY64VbxZ3M98127341' 
                              : '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const addr = rechargeNetwork === 'TRX' 
                                ? 'TX52b9m8xQ987dY64VbxZ3M98127341' 
                                : '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
                              navigator.clipboard.writeText(addr);
                              setCopiedAddress(true);
                              setTimeout(() => setCopiedAddress(false), 2000);
                            }}
                            className="flex-shrink-0 flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 text-[10px] sm:text-xs font-bold uppercase rounded-xl bg-[#cfbcff]/15 hover:bg-[#cfbcff]/25 text-[#cfbcff] border border-[#cfbcff]/15 transition-all cursor-pointer"
                          >
                            <Copy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                            {copiedAddress ? '已复制' : '复制充值地址'}
                          </button>
                        </div>
                      </div>

                      {/* Warnings */}
                      <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 space-y-2.5 text-[#cbc4d2]/90">
                        <div className="flex items-center gap-2 text-[#e7c365]">
                          <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">充值重要提示与规则 (Deposit Precautions)</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1.5 text-[10px] sm:text-[11px] font-medium leading-relaxed">
                          <li>
                            最小起充金额为 <strong className="text-white">10 USDT</strong>，任何低于该额度的订单将无法在两端网络入账核销，且不可返还。
                          </li>
                          <li>
                            请切勿向专属充值账户发送非 USDT 的其它数字资产。发送其它通证将可能造成资产永久流失。
                          </li>
                          <li>
                            区块链链上网络检测通过（通常 1-3 个确认块，5分钟内）后，系统将实时统计并安全入账您的协议余额中。
                          </li>
                          <li>
                            充值务必保证网络协议匹配，当前选定网络协议：<span className="text-[#cfbcff] font-bold">USDT-{rechargeNetwork}</span>。
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* WITHDRAW BLOCK */}
                  {activeAction === 'withdraw' && (
                    <div className="space-y-4">
                      {/* Network choice */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-wider">选择提现协议网络 / Network</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setWithdrawNetwork('TRX')}
                            className={`px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all text-xs cursor-pointer ${
                              withdrawNetwork === 'TRX' 
                                ? 'bg-[#6750a4] border-[#cfbcff] text-white shadow-md glow-accent' 
                                : 'bg-[#141218]/45 border-white/10 text-[#cbc4d2]/70 hover:border-white/20'
                            }`}
                          >
                            TRC-20 (TRON 网络)
                          </button>
                          <button
                            type="button"
                            onClick={() => setWithdrawNetwork('ETH')}
                            className={`px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all text-xs cursor-pointer ${
                              withdrawNetwork === 'ETH' 
                                ? 'bg-[#6750a4] border-[#cfbcff] text-white shadow-md glow-accent' 
                                : 'bg-[#141218]/45 border-white/10 text-[#cbc4d2]/70 hover:border-white/20'
                            }`}
                          >
                            ERC-20 (Ethereum 网络)
                          </button>
                        </div>
                      </div>

                      {/* Receipt address */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase">接收方链上钱包地址 (Address)</label>
                        <input 
                          type="text" 
                          placeholder={`请输入您的 ${withdrawNetwork} 网络专用收款地址...`} 
                          value={addressInput}
                          onChange={(e) => setAddressInput(e.target.value)}
                          required
                          className="bg-[#141218] border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none"
                        />
                      </div>

                      {/* Amount */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase">提现数量 / Withdraw Amount (USDT)</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            placeholder="0.00" 
                            value={amountInput}
                            onChange={(e) => setAmountInput(e.target.value)}
                            required
                            min="1"
                            className="w-full bg-[#141218] border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold focus:ring-1 focus:ring-[#cfbcff] outline-none pr-16"
                          />
                          <button 
                            type="button"
                            onClick={() => setAmountInput(usdtBalance.toString())}
                            className="absolute right-3 top-2.5 sm:top-3 text-[9px] sm:text-[10px] font-black text-[#cfbcff] uppercase hover:underline cursor-pointer"
                          >
                            全部
                          </button>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/50 block">当前可用协议余额: {usdtBalance.toLocaleString('zh-CN')} USDT</span>
                      </div>

                      {/* Submit Withdraw */}
                      <div className="pt-2">
                        <button 
                          type="submit"
                          className="w-full md:w-auto bg-[#cfbcff] text-[#381e72] py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-black/35"
                        >
                          <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          <span>发起链上提现申请</span>
                        </button>
                      </div>

                      {/* Warnings for Withdraw */}
                      <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 space-y-2 text-[#cbc4d2]/90">
                        <div className="flex items-center gap-2 text-[#e7c365]">
                          <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">提现安全须知与规则 (Withdraw Precautions)</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1.5 text-[10px] sm:text-[11px] font-medium leading-relaxed">
                          <li>
                            提现起提门槛：{withdrawNetwork === 'TRX' ? 'TRC-20 单笔最低起算金为 ' : 'ERC-20 单笔最低起算金为 '}<strong className="text-white">{withdrawNetwork === 'TRX' ? '20' : '40'} USDT</strong>。
                          </li>
                          <li>
                            提现手续包干：{withdrawNetwork === 'TRX' ? 'TRC-20 每笔固定收取 1.5 USDT 的链上打包费' : 'ERC-20 每笔固定收取 8 USDT 以太网络核心 Gas 消耗费'}。
                          </li>
                          <li>
                            请双重检测您的提现目标地址与收款网络：<span className="text-white font-bold">{withdrawNetwork} 网络</span>。一旦由于选错目标链导致充转错乱，资金将永久性丢失在外部黑洞。
                          </li>
                          <li>
                            出账校验将在账单流安全审计确认后，平均 10-30 分钟在公链上广播成交。
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* TRANSFER BLOCK */}
                  {activeAction === 'transfer' && (
                    <div className="space-y-4">
                      {/* target platform id */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-widest text-[#cfbcff]">平台目标用户 ID (UID)</label>
                        <input 
                          type="text" 
                          placeholder="请输入资金接收方的系统注册 UID, 示例: 5049382" 
                          value={transferUserId}
                          onChange={(e) => setTransferUserId(e.target.value)}
                          required
                          className="bg-[#141218] border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none"
                        />
                        <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40">此属性为目标伙伴资产界面顶部的 8 位纯数字协议识别符</span>
                      </div>

                      {/* amount input */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] sm:text-[10px] text-[#cbc4d2] font-semibold uppercase">划转数量 / Transfer Amount (USDT)</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            placeholder="0.00" 
                            value={amountInput}
                            onChange={(e) => setAmountInput(e.target.value)}
                            required
                            min="10"
                            className="w-full bg-[#141218] border border-white/10 text-white rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold focus:ring-1 focus:ring-[#cfbcff] outline-none pr-16"
                          />
                          <button 
                            type="button"
                            onClick={() => setAmountInput(usdtBalance.toString())}
                            className="absolute right-3 top-2.5 sm:top-3 text-[9px] sm:text-[10px] font-black text-[#cfbcff] uppercase hover:underline cursor-pointer"
                          >
                            全部
                          </button>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/50">您当前可用协议余额：{usdtBalance.toLocaleString('zh-CN')} USDT</span>
                      </div>

                      {/* Submit */}
                      <div className="pt-2">
                        <button 
                          type="submit"
                          className="w-full md:w-auto bg-[#cfbcff] text-[#381e72] py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-black/35"
                        >
                          <RefreshCcw className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          <span>确认授权站内划转</span>
                        </button>
                      </div>

                      {/* Warnings for Transfer */}
                      <div className="bg-amber-500/5 rounded-2xl p-4 border border-amber-500/10 space-y-2 text-[#cbc4d2]/90">
                        <div className="flex items-center gap-2 text-[#e7c365]">
                          <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">站内极速划转须知 (Transfer Precautions)</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1.5 text-[10px] sm:text-[11px] font-medium leading-relaxed">
                          <li>
                            站内互转起拨限额：单笔仅限 <strong className="text-white">10 USDT</strong> 级以上交易允许通过结算。
                          </li>
                          <li>
                            站内转移免手续：由于隶属协议内部极速信道，不加收任何网络广播传输费，实现秒级扣款 and 写入接收方钱包。
                          </li>
                          <li>
                            由于此操作不经过链上二次漫游确认，划转提交直接在底层原子更新，因此<span className="text-rose-400 font-bold">一旦签字成交概不具备撤回、追讨或冲正的余地</span>。
                          </li>
                          <li>
                            请务必与接收方多次核对 <strong className="text-white">系统 8 位 UID 识别号</strong>。转错 UID 损失需自行负单向责任。
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </form>

                {/* Right Scan Block Panel */}
                {activeAction === 'recharge' && (
                  <div className="flex flex-col items-center justify-center p-5 bg-[#14111a]/85 rounded-3xl border border-white/5 relative overflow-hidden group min-h-[220px] self-stretch select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,188,255,0.06)_0%,transparent_75%)] pointer-events-none" />
                    
                    {/* Visual QR Code Container */}
                    <div className="relative p-3.5 bg-white rounded-2xl shadow-xl shadow-black/50 overflow-hidden mb-4 border border-white/10 transition-transform duration-300 group-hover:scale-105">
                      <svg className="w-32 h-32 text-[#110e16]" viewBox="0 0 29 29" fill="currentColor">
                        {/* Finder Patterns (Top-Left) */}
                        <path d="M0 0h7v7H0zm1 1v5h5V1zm1 1h3v3H2z" />
                        {/* Finder Patterns (Top-Right) */}
                        <path d="M22 0h7v7h-7zm1 1v5h5V1zm1 1h3v3H24z" />
                        {/* Finder Patterns (Bottom-Left) */}
                        <path d="M0 22h7v7H0zm1 1v5h5v-5zm1 1h3v3H2z" />
                        {/* Alignment Pattern */}
                        <path d="M22 22h5v5h-5zm1 1v3h3v-3z" />
                        {/* Custom visual bits representation */}
                        {rechargeNetwork === 'TRX' ? (
                          <>
                            <path d="M9 1h1v1H9zm2 0h2v1h-2zm3 0h1v2h-1zm2 0h2v1h-2zm3 0h1v1h-1zM9 3h2v1H9zm3 0h1v1h-1zm2 0h3v1h-3zm4 0h1v1h-1zM9 5h1v1H9zm2 0h1v1h-1zm3 0h2v1h-2zm3 0h2v1h-2zm1 0h1v1h-1z" />
                            <path d="M1 9h2v1H1zm3 0h1v1H4zm3 0h1v1H7zm2 0h1v2H9zm2 0h3v1h-3zm4 0h1v1h-1zm2 0h2v1h-2zm3 0h1v2h-1zm2 0h1v1h-1zM1 11h1v1H1zm3 0h2v1H4zm3 0h1v1H7zm1 1h1v1H8zm3-1h1v1h-1zm3 0h2v1h-2zm5 0h1v1h-1zm2 0h2v1h-2z" />
                            <path d="M10 13h1v1h-1zm2-1h1v2h-1zm4 1h3v1h-3zm4 0h1v1h-1zm2 0h3v1h-3zm3 0h1v1h-1zM1 15h3v1H1zm5 0h1v1H6zm4 0h1v2h-1zm2 0h2v1h-2zm3 0h2v1h-2zm5 0h1v1h-1zm2 0h2v1h-2zm2 0h2v1h-2z" />
                            <path d="M9 17h1v1H9zm2 0h2v1h-2zm3 0h1v1h-1zm2 0h2v1h-2zm3 0h1v2h-1zm3-1h1v1h-1zm2 1h1v1h-1zM1 19h1v1H1zm3 0h2v1H4zm3 0h1v1H7zm2 0h3v1h-3zm4 0h1v1h-1zm3 0h2v1h-2zm4 0h3v1h-3z" />
                          </>
                        ) : (
                          <>
                            <path d="M9 2h1v1H9zm2 0h2v1h-2zm5 0h1v2h-1zm1 0h2v1h-2zm2 0h1v1h-1zM9 4h2v1H9zm3 0h1v1h-1zm2 0h3v1h-3zm4 0h1v1h-1zM9 6h1v1H9zm2 0h1v1h-1zm2 0h2v1h-2zm2 0h2v1h-2zm1 0h1v1h-1z" />
                            <path d="M1 8h2v1H1zm3 0h1v1H4zm3 0h1v1H7zm2 0h1v2H9zm2 0h3v1h-3zm4 0h1v1h-1zm2 0h2v1h-2zm3 0h1v2h-1zm1 0h1v1h-1zM1 10h1v1H1zm3 0h2v1H4zm3 0h1v1H7zm1 1h1v1H8zm3-1h1v1h-1zm3 0h2v1h-2zm5 0h1v1h-1zm1 0h2v1h-2z" />
                            <path d="M11 12h1v1h-1zm2-1h1v2h-1zm2 1h3v1h-3zm4 0h1v1h-1zm2 0h3v1h-3zm2 0h1v1h-1zM1 14h3v1H1zm5 0h1v1H6zm4 0h1v2h-1zm2 0h2v1h-2zm3 0h2v1h-2zm2 0h1v1h-1zm2 0h2v1h-2zm2 0h2v1h-2z" />
                            <path d="M10 16h1v1h-1zm2 0h2v1h-2zm3 0h1v1H1zm1 0h2v1h-2zm3 0h1v2h-1zm1-1h1v1h-1zm2 1h1v1h-1zM1 18h1v1H1zm3 0h2v1H4zm3 0h1v1H7zm2 0h3v1h-3zm4 0h1v1h-1zm2 0h2v1h-2zm3 0h3v1h-3z" />
                          </>
                        )}
                      </svg>
                      {/* Hover border glow wrapper */}
                      <div className="absolute inset-0 border-2 border-[#cfbcff]/0 group-hover:border-[#cfbcff]/20 transition-all rounded-2xl" />
                    </div>

                    <span className="text-xs text-white/90 font-black tracking-widest text-center">
                      数字二维码安全扫码
                    </span>
                    <span className="text-[10px] text-[#cfbcff] font-bold text-center mt-1.5 uppercase font-[#cfbcff]/10 px-2.5 py-0.5 rounded-full border border-[#cfbcff]/15">
                      USDT - {rechargeNetwork} 专用
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Transaction History Section */}
      <section className="glass-card rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold tracking-tight text-white text-sm sm:text-base uppercase">交易历史 (Historical Ledger)</h3>
            <p className="text-[10px] sm:text-xs text-[#cbc4d2]/50">查找并筛选所有的资金账单往来记录</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Search Input for Historical Transactions */}
            <div className="relative group flex items-center bg-[#211f24] border border-white/5 rounded-xl px-3 py-1.5 focus-within:border-[#cfbcff]/40 transition-all">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cbc4d2] opacity-60 mr-2" />
              <input 
                type="text" 
                placeholder="搜索交易ID或描述..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="bg-transparent border-none text-white text-[11px] sm:text-xs outline-none placeholder:text-white/30 h-7 py-1 focus:ring-0 min-w-[#180px]"
              />
              {searchVal && (
                <button onClick={() => setSearchVal('')} className="p-1 text-white/50 hover:text-white transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex bg-[#211f24] rounded-xl p-1 overflow-x-auto scrollbar-hide">
              {filterButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilterType(btn.id)}
                  className={`px-2.5 sm:px-3 py-1.5 whitespace-nowrap rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                    filterType === btn.id 
                      ? 'bg-[#36343a] text-[#cfbcff]' 
                      : 'text-[#cbc4d2]/80 hover:text-white'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="hidden md:block overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/2 text-[#cbc4d2] text-[11px] font-bold uppercase tracking-wider">
                <th className="p-4 px-6">订单编号</th>
                <th className="p-4 px-6">类型</th>
                <th className="p-4 px-6">描述</th>
                <th className="p-4 px-6 text-right">金额</th>
                <th className="p-4 px-6 text-center">时间</th>
                <th className="p-4 px-6 text-center">状态</th>
                <th className="p-4 px-6 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => {
                  const isPositive = txn.amount > 0;
                  const isCopied = copySuccessId === txn.id;
                  return (
                    <tr key={txn.id} className="hover:bg-white/3 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#cfbcff] bg-[#cfbcff]/5 px-2 py-1 rounded border border-[#cfbcff]/10">
                            {txn.id}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(txn.id);
                              setCopySuccessId(txn.id);
                              setTimeout(() => setCopySuccessId(''), 1500);
                            }}
                            className="p-1 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white"
                            title="复制订单编号"
                          >
                            <Copy className={`w-3 h-3 ${isCopied ? 'text-emerald-400' : ''}`} />
                          </button>
                          {isCopied && (
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded">
                              已复制
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            txn.type === 'recharge' || txn.type === 'commission' ? 'bg-[#00e676]' : 
                            txn.type === 'transfer' ? 'bg-[#cfbcff]' : 'bg-[#ffb4ab]'
                          }`}></span>
                          <span className="font-semibold text-white/90">{getNormalizedTypeLabel(txn.type, txn.typeLabel)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-white">{txn.desc}</p>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className={`font-mono font-bold ${isPositive ? 'text-[#00e676]' : 'text-[#ffb4ab]'}`}>
                          {isPositive ? '+' : ''} {txn.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} {txn.currency}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-xs text-[#cbc4d2]/70 font-mono whitespace-nowrap">
                        {txn.time}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap animate-pulse" style={{ animationDuration: '3s' }}>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold capitalize ${
                          txn.status === 'success' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                          txn.status === 'pending' ? 'bg-[#cfbcff]/10 text-[#cfbcff] border border-[#cfbcff]/20' :
                          txn.status === 'locked' ? 'bg-amber-950/40 text-amber-400 border border-amber-800/30' :
                          'bg-rose-950/40 text-rose-400 border border-rose-800/30'
                        }`}>
                          {txn.statusLabel || txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button 
                          onClick={() => setSelectedTxn(txn)}
                          className="text-xs text-[#cfbcff] hover:underline font-bold"
                        >
                          详情
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-xs text-[#cbc4d2]/50 font-medium">
                    没有找到符合条件的交易记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Card View for Mobile */}
        <div className="md:hidden space-y-4 p-4 divide-y divide-white/5 bg-[#1a1722]/30">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((txn, index) => {
              const isPositive = txn.amount > 0;
              const isCopied = copySuccessId === txn.id;
              return (
                <div key={txn.id} className={`pt-4 ${index === 0 ? 'pt-0' : ''} space-y-3`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-semibold text-[#cfbcff] bg-[#cfbcff]/5 px-1.5 py-0.5 rounded border border-[#cfbcff]/10">
                        {txn.id}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(txn.id);
                          setCopySuccessId(txn.id);
                          setTimeout(() => setCopySuccessId(''), 1500);
                        }}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-white"
                      >
                        <Copy className={`w-3 h-3 ${isCopied ? 'text-emerald-400' : ''}`} />
                      </button>
                      {isCopied && (
                        <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded">
                          已复制
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold capitalize ${
                      txn.status === 'success' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                      txn.status === 'pending' ? 'bg-[#cfbcff]/10 text-[#cfbcff] border border-[#cfbcff]/20' :
                      txn.status === 'locked' ? 'bg-amber-950/40 text-amber-400 border border-amber-800/30' :
                      'bg-rose-950/40 text-rose-400 border border-rose-800/30'
                    }`}>
                      {txn.statusLabel || txn.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          txn.type === 'recharge' || txn.type === 'commission' ? 'bg-[#00e676]' : 
                          txn.type === 'transfer' ? 'bg-[#cfbcff]' : 'bg-[#ffb4ab]'
                        }`}></span>
                        <span className="font-semibold text-white/90">{getNormalizedTypeLabel(txn.type, txn.typeLabel)}</span>
                      </div>
                      <p className="font-bold text-white text-[12px] sm:text-xs">{txn.desc}</p>
                      <p className="text-[10px] text-[#cbc4d2]/70 font-mono">{txn.time}</p>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <span className={`font-mono font-bold block text-xs sm:text-sm ${isPositive ? 'text-[#00e676]' : 'text-[#ffb4ab]'}`}>
                        {isPositive ? '+' : ''} {txn.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} {txn.currency}
                      </span>
                      <button 
                        onClick={() => setSelectedTxn(txn)}
                        className="mt-1 text-[11px] sm:text-xs text-[#cfbcff] hover:underline font-bold"
                      >
                        详情
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-xs text-[#cbc4d2]/50 font-medium">
              没有找到符合条件的交易记录
            </div>
          )}
        </div>
        <div className="p-4 px-6 bg-white/2 flex items-center justify-between text-[11px] sm:text-xs text-[#cbc4d2]">
          <span>显示 1-{filteredTransactions.length} 条，共 {filteredTransactions.length} 条</span>
        </div>
      </section>

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {selectedTxn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTxn(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md bg-[#16131c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-5 sm:p-6 text-left"
            >
              <button 
                onClick={() => setSelectedTxn(null)} 
                className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-sm sm:text-base font-bold text-white mb-5 sm:mb-6 uppercase tracking-wider flex items-center gap-2 font-sans">
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cfbcff]" />
                交易详单 (Transaction Details)
              </h3>

              <div className="space-y-4">
                <div className="bg-[#100d14] rounded-xl p-3 border border-white/5">
                  <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">交易订单编号 (Order ID)</span>
                  <div className="flex items-center justify-between gap-1 mt-1">
                    <span className="font-mono text-[11px] sm:text-xs text-[#cfbcff] font-bold select-all break-all mr-2">
                      {selectedTxn.id}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(selectedTxn.id);
                        setCopySuccessId(selectedTxn.id);
                        setTimeout(() => setCopySuccessId(''), 2000);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-black uppercase bg-[#cfbcff]/15 hover:bg-[#cfbcff]/25 text-[#cfbcff] rounded border border-[#cfbcff]/15 transition-all cursor-pointer"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      {copySuccessId === selectedTxn.id ? '已复制' : '复制'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">账单类型</span>
                    <span className="text-xs sm:text-sm font-bold text-white block mt-1">{getNormalizedTypeLabel(selectedTxn.type, selectedTxn.typeLabel)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">交易状态</span>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold capitalize ${
                      selectedTxn.status === 'success' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                      selectedTxn.status === 'pending' ? 'bg-[#cfbcff]/10 text-[#cfbcff] border border-[#cfbcff]/20' :
                      selectedTxn.status === 'locked' ? 'bg-amber-950/40 text-amber-400 border border-amber-800/30' :
                      'bg-rose-950/40 text-rose-400 border border-rose-800/30'
                    }`}>
                      {selectedTxn.statusLabel || selectedTxn.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">资金变动金额</span>
                    <span className={`text-sm sm:text-base font-mono font-black block mt-1 ${selectedTxn.amount > 0 ? 'text-[#00e676]' : 'text-[#ffb4ab]'}`}>
                      {selectedTxn.amount > 0 ? '+' : ''}{selectedTxn.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })} {selectedTxn.currency}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">创建时间</span>
                    <span className="text-[11px] sm:text-xs font-mono text-white/70 block mt-1">{selectedTxn.time}</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-[9px] sm:text-[10px] text-[#cbc4d2]/40 font-bold uppercase tracking-wide block">业务日志详情 (Log Notes)</span>
                  <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed mt-1 bg-white/2 p-2.5 rounded-lg border border-white/5">{selectedTxn.desc}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedTxn(null)}
                  className="bg-[#211f24] hover:bg-white/5 text-white border border-white/10 hover:border-white/20 px-5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageView>
  );
}
