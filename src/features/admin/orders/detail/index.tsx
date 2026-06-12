import React from 'react';
import { Landmark, FileText, Share2, Wallet, ShieldCheck, ArrowLeft, Search, CheckCircle, XCircle } from 'lucide-react';
import type { DetailViewProps } from '../types';

export default function DetailView({
  selectedOrder,
  setSelectedOrder,
  detailSearchQuery,
  setDetailSearchQuery,
  filteredAllocations,
  onUpdateOrderStatus
}: DetailViewProps) {

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
                    onUpdateOrderStatus(selectedOrder.id, 'confirmed');
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
                    onUpdateOrderStatus(selectedOrder.id, 'cancelled');
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
