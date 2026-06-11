import React, { useState } from 'react';
import { Download, Eye, X, Landmark, FileText, Share2, Wallet, ArrowRight, ShieldCheck, ArrowLeft, Search, CheckCircle, XCircle } from 'lucide-react';

interface OrderDetail {
  id: string;
  uid: string;
  planName: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  time: string;
  // Core client requirements
  paymentChannel: string;      // 支付渠道 (e.g., TRC20-USDT, ERC20-USDT, 余额直接扣减)
  txid: string;                // 交易哈希 / TXID
  cashFlowTrack: string;       // 资金流向
  stockConversion: {           // 转换TROO股票详情
    buyRatio: number;          // 股票直接买入比例
    queueRatio: number;        // 股票锁仓排队比例
    directStocks: number;      // 产出活期股票
    queueStocks: number;       // 产出排队股票
    giftedStocks: number;      // 额外赠送股票量
  };
  commissionAllocations: {     // 佣金分拨详情
    level: string;
    targetUid: string;
    nickname: string;
    rate: number;
    amount: number;
    status: 'distributed' | 'failed_insufficient_pool' | 'pending_lock';
  }[];
}

export default function AdminOrdersView() {
  const [orders, setOrders] = useState<OrderDetail[]>([
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
  ]);

  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [detailSearchQuery, setDetailSearchQuery] = useState('');

  // Export CSV
  const exportMockCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "订单编号,会员UID,认购套餐,认购金额(USDT),支付通道,交易哈希,资金流向,状态,入账时间\r\n";
    orders.forEach(o => {
      csvContent += `${o.id},${o.uid},${o.planName},${o.amount},${o.paymentChannel},${o.txid},${o.cashFlowTrack},${o.status},${o.time}\r\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_full_audit_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Switch views cleanly to act as separate page/view
  if (selectedOrder) {
    // Filter commission allocations list based on details table search query
    const filteredAllocations = selectedOrder.commissionAllocations.filter(alloc => {
      const q = detailSearchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        alloc.level.toLowerCase().includes(q) ||
        alloc.targetUid.toLowerCase().includes(q) ||
        alloc.nickname.toLowerCase().includes(q)
      );
    });

    return (
      <div id="admin_orders_detail_view" className="space-y-4 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3 font-sans">
        <div className="glass-card p-4 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
          
          {/* Top toolbar & navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedOrder(null);
                  setDetailSearchQuery('');
                }}
                className="bg-white/5 hover:bg-[#cfbcff]/10 text-[#cfbcff] px-3.5 py-2 rounded-xl text-xs font-bold border border-[#cfbcff]/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>返回订单列表</span>
              </button>
              
              <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
              
              <div className="text-left">
                <span className="text-[10px] uppercase text-[#cbc4d2]/40 font-mono tracking-wider block">订单穿透详情审计</span>
                <p className="text-sm font-black text-white font-mono mt-0.5">{selectedOrder.id}</p>
              </div>
            </div>

            <div className="shrink-0">
              <span className={`text-[10px] font-black px-3 py-1.5 rounded-full ${selectedOrder.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : selectedOrder.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                {selectedOrder.status === 'confirmed' ? '● 链上完成交割' : selectedOrder.status === 'pending' ? '● 待安全审核' : '● 已拒绝注销'}
              </span>
            </div>
          </div>

          {/* Warning / Actions block for PENDING order */}
          {selectedOrder.status === 'pending' && (
            <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 animate-pulse" />
                  <span>待确认的流动性质认购订单</span>
                </h4>
                <p className="text-[11px] text-[#cbc4d2]/70 leading-relaxed max-w-2xl">
                  该笔订单交割额度为 <strong className="text-white font-mono">{selectedOrder.amount.toLocaleString()} USDT</strong>。请在核查链上付款哈希并在D+1个工作日内决定是否下发股票及派发佣金。
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setOrders(prev => prev.map(item => item.id === selectedOrder.id ? { ...item, status: 'confirmed' } : item));
                    setSelectedOrder(prev => prev ? { ...prev, status: 'confirmed' } : null);
                    alert(`订单 ${selectedOrder.id} 交易到货审核已经完成！USDT质押到账已确认，自动开始向对应上线计算佣金派发。`);
                  }}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> 确认到账并交割
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOrders(prev => prev.map(item => item.id === selectedOrder.id ? { ...item, status: 'cancelled' } : item));
                    setSelectedOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
                    alert(`订单 ${selectedOrder.id} 已执行撤回，已将其锁定余额原路全额退回到钱包缓存中。`);
                  }}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" /> 驳回拒绝
                </button>
              </div>
            </div>
          )}

          {/* Grid Layout of parameters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            
            {/* Column 1: Financial & Technical Track */}
            <div className="bg-[#120f1a] p-5 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col justify-between">
              <div className="space-y-3">
                <h5 className="text-[11px] font-black uppercase tracking-wider text-[#cfbcff] flex items-center gap-1.5 border-b border-white/5 pb-2">
                  <FileText className="w-4 h-4" />
                  <span>资金流向与交易校对</span>
                </h5>
                <div className="space-y-3 font-mono text-[11px] leading-tight text-[#cbc4d2]/80">
                  <p>
                    <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">申购会员 UID</span>
                    <span className="text-white font-bold text-sm">{selectedOrder.uid}</span>
                  </p>
                  <p>
                    <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">订购套餐规格</span>
                    <span className="text-[#cfbcff] font-bold text-sm font-sans">{selectedOrder.planName}</span>
                  </p>
                  <p>
                    <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">交割金额 (USDT)</span>
                    <span className="text-emerald-400 font-extrabold text-sm font-sans">{selectedOrder.amount.toLocaleString()} USDT</span>
                  </p>
                  <p>
                    <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">支付通道/方式</span>
                    <span className="text-emerald-300 font-bold font-sans bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 rounded text-[10px] inline-block mt-0.5">
                      {selectedOrder.paymentChannel}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-0.5">资金流向存根</span>
                    <span className="text-[#cbc4d2]/70 font-sans text-xs">{selectedOrder.cashFlowTrack}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Stocks & Assets conversion Details */}
            <div className="bg-[#120f1a] p-5 rounded-2xl border border-white/5 space-y-4 text-left flex flex-col justify-between">
              <div className="space-y-3">
                <h5 className="text-[11px] font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5 border-b border-white/5 pb-2">
                  <Wallet className="w-4 h-4" />
                  <span>TROO 股票认购份额转拨明细</span>
                </h5>
                <div className="space-y-2.5 font-mono text-[11px] leading-tight text-[#cbc4d2]/80">
                  <p>
                    <span className="text-[#cbc4d2]/40 font-sans font-bold block mb-1">股票配售均分配比规格</span> 
                    活期直接配额：{selectedOrder.stockConversion.buyRatio}% / 锁仓排队配额：{selectedOrder.stockConversion.queueRatio}%
                  </p>
                  
                  <div className="divide-y divide-white/5 text-[11px] pt-1">
                    <div className="flex justify-between py-2">
                      <span className="text-[#cbc4d2]/50 font-sans">📈 TROO 股票买入配售活期</span>
                      <span className="text-white font-bold">{selectedOrder.stockConversion.directStocks.toLocaleString()} 股 (即时可用)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-[#cbc4d2]/50 font-sans">⏳ TROO 股票排队交割锁仓</span>
                      <span className="text-amber-400 font-bold">{selectedOrder.stockConversion.queueStocks.toLocaleString()} 股 (排队解锁)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-[#cbc4d2]/50 font-sans">🎁 高额额外股票特赠比例</span>
                      <span className="text-[#cfbcff] font-extrabold">{selectedOrder.stockConversion.giftedStocks > 0 ? `+${selectedOrder.stockConversion.giftedStocks.toLocaleString()} 股` : '无额外赠送'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#cfbcff]/5 border border-[#cfbcff]/15 rounded-xl text-xs text-[#cbc4d2]/80 leading-normal font-sans mt-4">
                💡 <strong>精算对账关系说明</strong>：认购付款将根据智能算法规则自动分割，其中活期股票在确认到账后即刻派发至会员账户，排队仓额则进入全局排队序列逐步解锁。
              </div>
            </div>

          </div>

          {/* Alliance commissions section containing searchable target table */}
          <div className="bg-[#120f1a] p-5 rounded-2xl border border-white/5 text-xs text-[#cbc4d2]/90 text-left space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-3">
              <h5 className="text-[11px] font-black uppercase text-emerald-400 flex items-center gap-1.5 tracking-wider">
                <Share2 className="w-4 h-4" />
                <span>对应上级同盟链条推广佣金穿透分拨明细 (Alliance L1-L5 distribution trace)</span>
              </h5>
              
              {/* Table search filter input */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="w-3.5 h-3.5 text-[#cbc4d2]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={detailSearchQuery}
                  onChange={(e) => setDetailSearchQuery(e.target.value)}
                  placeholder="查找关联 UID、昵称或等级..."
                  className="bg-[#181421] border border-white/10 rounded-xl pl-8 pr-3.5 py-1.5 text-xs text-white placeholder-[#cbc4d2]/30 outline-none focus:border-[#cfbcff]/40 transition-colors w-full font-medium"
                />
              </div>
            </div>

            {/* Desktop View Table */}
            <div className="hidden md:block border border-white/5 rounded-xl overflow-hidden bg-[#181421]/60">
              <div className="grid grid-cols-5 bg-white/3 py-2.5 px-3.5 text-[9px] font-black uppercase tracking-wider text-[#cbc4d2]/40 border-b border-white/5">
                <span>层级 / 代数</span>
                <span>承接代管人 UID</span>
                <span>昵称属性</span>
                <span className="text-right font-mono">返佣比例</span>
                <span className="text-right">结算金额 (USDT)</span>
              </div>
              <div className="divide-y divide-white/5 font-mono text-xs">
                {filteredAllocations.length > 0 ? (
                  filteredAllocations.map((alloc, idx) => (
                    <div key={idx} className="grid grid-cols-5 py-3.5 px-3.5 items-center hover:bg-white/[0.01] transition-colors">
                      <span className="font-sans text-[#cfbcff] font-bold text-left">{alloc.level}</span>
                      <span className="text-left text-white">{alloc.targetUid}</span>
                      <span className="truncate font-sans font-medium text-[#cbc4d2] text-left">{alloc.nickname}</span>
                      <span className="text-right text-[#cbc4d2]/60 font-bold">{alloc.rate}%</span>
                      <span className="text-right text-emerald-400 font-extrabold">USDT {alloc.amount.toLocaleString()}</span>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-[#cbc4d2]/30 font-sans text-xs">
                    未找到符合检索的分拨记录 (可尝试更改关键词)
                  </div>
                )}
              </div>
            </div>

            {/* Mobile View Cards */}
            <div className="block md:hidden border border-white/5 rounded-xl divide-y divide-white/5 overflow-hidden bg-[#181421]/60">
              {filteredAllocations.length > 0 ? (
                filteredAllocations.map((alloc, idx) => (
                  <div key={idx} className="p-3.5 space-y-2 bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="font-sans text-[#cfbcff] font-bold text-xs">{alloc.level}</span>
                      <span className="text-emerald-400 font-extrabold text-xs font-mono">USDT {alloc.amount.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-mono">
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">承接人 UID</span>
                        <span className="text-white font-medium block">{alloc.targetUid}</span>
                      </div>
                      <div>
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">返佣比例</span>
                        <span className="text-white/80 block font-bold">{alloc.rate}%</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">昵称及属性</span>
                        <span className="text-[#cbc4d2]/90 block font-sans truncate" title={alloc.nickname}>
                          {alloc.nickname}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-[#cbc4d2]/30 font-sans text-xs">
                  未找到符合检索的分拨记录 (可尝试更改关键词)
                </div>
              )}
            </div>

            <div className="p-3 bg-[#cfbcff]/5 border border-[#cfbcff]/10 rounded-xl text-[11px] text-[#cbc4d2] space-y-1.5 leading-relaxed font-sans">
              <p className="font-extrabold text-[#cfbcff] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#cfbcff]" />
                <span>分销推广佣金分配核心逻辑说明</span>
              </p>
              <p>
                本笔交易触发的推广佣金<strong>仅会返现给该会员直属的 L1 上级</strong>。
                倘若 <strong>L1 级代理人的佣金限额池大池额度已满 (可用配额已耗尽)</strong>，溢漏或无法派发的剩余佣金部分才会执行溢存滑落，触发穿透性继续往上一层级 (L2、L3等) 继续逐级派发或回拢平台准备金库。
              </p>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => {
                setSelectedOrder(null);
                setDetailSearchQuery('');
              }}
              className="bg-[#cfbcff]/5 hover:bg-[#cfbcff]/15 text-[#cfbcff] border border-[#cfbcff]/10 px-6 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
            >
              返回订单列表
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div id="admin_orders_view" className="space-y-4 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-3">
      <div className="glass-card p-4 md:p-5 rounded-2xl border border-white/5 bg-[#141119] space-y-4 flex-grow flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 border-b border-white/5 pb-3.5">
          <div>
            <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#cfbcff]" />
              <span>订单列表</span>
            </h3>
            <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
              浏览与检索所有会员认购理财订单存证、交易哈希验证及上级同盟分拨记录。
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <button 
              type="button"
              onClick={exportMockCSV}
              className="bg-[#cfbcff]/5 hover:bg-[#cfbcff]/15 text-[#cfbcff] px-3.5 py-2 rounded-xl text-xs font-bold border border-[#cfbcff]/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
            >
              <Download className="w-3.5 h-3.5" /> 导出
            </button>
          </div>
        </div>

      {/* Orders Table */}
      <div className="space-y-4">
        {/* Mobile cards view */}
        <div className="block md:hidden space-y-3">
          {orders.map(o => (
            <div key={o.id} className="bg-[#1c1825]/60 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white font-mono">{o.id}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${o.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : o.status === 'pending' ? 'bg-amber-500/10 text-amber-400 animate-pulse' : 'bg-red-500/10 text-red-400'}`}>
                  {o.status === 'confirmed' ? '已存证交割' : o.status === 'pending' ? '待审核' : '已作废'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-white/5 py-2 font-mono">
                <div>
                  <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">会员 UID</span>
                  <p className="text-[#cbc4d2]/80 mt-0.5">{o.uid}</p>
                </div>
                <div>
                  <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">认购理财规格</span>
                  <p className="font-sans text-white font-bold mt-0.5">{o.planName}</p>
                </div>
                <div>
                  <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">认购金额</span>
                  <p className="text-emerald-400 font-extrabold mt-0.5">USDT {o.amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[#cbc4d2]/40 text-[9px] block font-sans">到账结算时间</span>
                  <p className="text-[#cbc4d2]/50 mt-0.5">{o.time}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px] gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrder(o);
                    setDetailSearchQuery('');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-2.5 py-1.5 rounded-xl active:scale-95 transition-all text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>操作</span>
                </button>

                <div className="flex items-center gap-1.5 ml-auto">
                  {o.status === 'pending' && (
                    <>
                      <button 
                        type="button"
                        onClick={() => {
                          setOrders(prev => prev.map(item => item.id === o.id ? { ...item, status: 'confirmed' } : item));
                          alert(`订单 ${o.id} 交易到货审核已经完成！`);
                        }}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold px-2 py-1 rounded-lg text-[10px] cursor-pointer"
                      >
                        确认
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setOrders(prev => prev.map(item => item.id === o.id ? { ...item, status: 'cancelled' } : item));
                          alert(`订单 ${o.id} 已执行拒绝驳回！`);
                        }}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-2 py-1 rounded-lg text-[10px] cursor-pointer"
                      >
                        驳回
                      </button>
                    </>
                  )}
                  {o.status === 'confirmed' && (
                    <span className="text-[10px] text-emerald-400/60 font-semibold select-none">✔ 已交割</span>
                  )}
                  {o.status === 'cancelled' && (
                    <span className="text-[10px] text-white/30 select-none">中止</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop density table */}
        <div className="hidden md:block overflow-x-auto border border-white/5 rounded-2xl bg-[#1c1825]/40 p-1">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-bold bg-white/[0.01]">
                <th className="py-4 px-4">订单编号 (Tx ID)</th>
                <th className="py-4 px-4">会员 UID</th>
                <th className="py-4 px-4">认购理财规格</th>
                <th className="py-4 px-4 font-mono">认购金额</th>
                <th className="py-4 px-4">到账结算时间</th>
                <th className="py-4 px-4 text-center">状态说明</th>
                <th className="py-4 px-4 text-center">操作</th>
                <th className="py-4 px-4 text-right">审核处理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white font-mono">{o.id}</td>
                  <td className="py-3.5 px-4 text-[#cbc4d2]/80">{o.uid}</td>
                  <td className="py-3.5 px-4 font-sans text-white font-bold">{o.planName}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-extrabold">USDT {o.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-[#cbc4d2]/50">{o.time}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${o.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : o.status === 'pending' ? 'bg-amber-500/10 text-amber-400 animate-pulse' : 'bg-red-500/10 text-red-400'}`}>
                      {o.status === 'confirmed' ? '完成/已交割' : o.status === 'pending' ? '待审核入账' : '已中止作废'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(o);
                        setDetailSearchQuery('');
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                      className="mx-auto bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-2.5 py-1.5 rounded-lg active:scale-95 transition-all text-[11px] font-bold font-sans flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>查看详情</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    {o.status === 'pending' && (
                      <div className="flex justify-end gap-1.5">
                        <button 
                          type="button"
                          onClick={() => {
                            setOrders(prev => prev.map(item => item.id === o.id ? { ...item, status: 'confirmed' } : item));
                            alert(`订单 ${o.id} 交易到货审核已经完成！USDT质押到账已确认，自动开始向对应上线计算佣金派发。`);
                          }}
                          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-sans font-bold px-2 py-1 rounded-lg text-[10px] transition-all cursor-pointer"
                        >
                          确认到账
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            setOrders(prev => prev.map(item => item.id === o.id ? { ...item, status: 'cancelled' } : item));
                            alert(`订单 ${o.id} 已执行撤回，已将其锁定余额原路全额退回到钱包缓存中。`);
                          }}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-sans font-bold px-2 py-1 rounded-lg text-[10px] transition-all cursor-pointer"
                        >
                          驳回
                        </button>
                      </div>
                    )}
                    {o.status === 'confirmed' && (
                      <span className="text-[10px] text-emerald-400/60 font-mono font-bold font-sans">✔ 交割锁证已存证</span>
                    )}
                    {o.status === 'cancelled' && (
                      <span className="text-[10px] text-white/30 font-sans">链上中断</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      </div>
    </div>
  );
}
