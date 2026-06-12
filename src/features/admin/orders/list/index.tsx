import React from 'react';
import { Download, Eye, FileText } from 'lucide-react';
import type { ListViewProps } from '../types';

export default function ListView({
  orders,
  setSelectedOrder,
  setDetailSearchQuery,
  exportMockCSV,
  onUpdateOrderStatus
}: ListViewProps) {
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
                          onUpdateOrderStatus(o.id, 'confirmed');
                          alert(`订单 ${o.id} 交易到货审核已经完成！`);
                        }}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold px-2 py-1 rounded-lg text-[10px] cursor-pointer"
                      >
                        确认
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          onUpdateOrderStatus(o.id, 'cancelled');
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
                            onUpdateOrderStatus(o.id, 'confirmed');
                            alert(`订单 ${o.id} 交易到货审核已经完成！USDT质押到账已确认，自动开始向对应上线计算佣金派发。`);
                          }}
                          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-sans font-bold px-2 py-1 rounded-lg text-[10px] transition-all cursor-pointer"
                        >
                          确认到账
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            onUpdateOrderStatus(o.id, 'cancelled');
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
