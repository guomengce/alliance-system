import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HistoryLedgerProps } from '../types';

export default function HistoryLedger({
  filteredHistory,
  activeFilter,
  setActiveFilter
}: HistoryLedgerProps) {
  return (
    <section className="glass-card rounded-[24px] overflow-hidden">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h4 className="text-base font-bold text-white uppercase">佣金历史流水</h4>
        <div className="flex bg-[#211f24] rounded-xl p-1 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'all' ? 'bg-[#36343a] text-[#cfbcff]' : 'text-[#cbc4d2]/80 hover:text-white'
            }`}
          >
            全部状态
          </button>
          <button 
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'pending' ? 'bg-[#36343a] text-[#cfbcff]' : 'text-[#cbc4d2]/80 hover:text-white'
            }`}
          >
            待处理
          </button>
          <button 
            onClick={() => setActiveFilter('success')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeFilter === 'success' ? 'bg-[#36343a] text-[#cfbcff]' : 'text-[#cbc4d2]/80 hover:text-white'
            }`}
          >
            已到账
          </button>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[#cbc4d2] text-[11px] font-bold border-b border-white/5 bg-white/2 uppercase">
              <th className="p-4 px-6">流水单号</th>
              <th className="p-4 px-6">来源用户</th>
              <th className="p-4 px-6 text-right">对方订单金额</th>
              <th className="p-4 px-6 text-center">返佣层级</th>
              <th className="p-4 px-6 text-right">您的收益金</th>
              <th className="p-4 px-6 text-center">结算时间</th>
              <th className="p-4 px-6 text-center">状态</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredHistory.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/3 transition-colors last:border-none">
                <td className="p-4 px-6 font-mono text-xs text-[#cbc4d2]">{item.id}</td>
                <td className="p-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#36343a] text-[9px] flex items-center justify-center text-[#cfbcff] font-bold">
                      {item.userLetter}
                    </div>
                    <span className="font-semibold text-white/90">{item.user}</span>
                  </div>
                </td>
                <td className="p-4 px-6 text-right font-bold text-white font-mono">¥ {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</td>
                <td className="p-4 px-6 text-center">
                  <span className="px-2 py-0.5 bg-[#cfbcff]/10 text-[#cfbcff] text-[10px] rounded font-extrabold uppercase border border-[#cfbcff]/20">
                    {item.level}
                  </span>
                </td>
                <td className="p-4 px-6 text-right font-extrabold text-[#00e676] font-mono">
                  +¥ {item.reward.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                </td>
                <td className="p-4 px-6 text-center text-xs text-[#cbc4d2]/70 font-mono whitespace-nowrap">{item.time}</td>
                <td className="p-4 px-6 text-center whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    item.status === 'success' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                    item.status === 'pending' ? 'bg-[#cfbcff]/10 text-[#cfbcff] border border-[#cfbcff]/20' :
                    'bg-rose-950/40 text-rose-400 border border-rose-800/30'
                  }`}>
                    {item.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View history cards */}
      <div className="md:hidden divide-y divide-white/5 space-y-4 p-4 bg-[#1a1722]/30">
        {filteredHistory.map((item, index) => (
          <div key={item.id} className={`space-y-3 ${index > 0 ? 'pt-4' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] text-[#cbc4d2] bg-white/5 px-2 py-0.5 rounded border border-white/5">{item.id}</span>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-[#36343a] text-[9px] flex items-center justify-center text-[#cfbcff] font-bold">
                    {item.userLetter}
                  </div>
                  <span className="font-semibold text-white/90 text-xs">{item.user}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                item.status === 'success' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30' :
                item.status === 'pending' ? 'bg-[#cfbcff]/10 text-[#cfbcff] border border-[#cfbcff]/20' :
                'bg-rose-950/40 text-rose-400 border border-rose-800/30'
              }`}>
                {item.statusLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono">对方订单 / 层级</p>
                <p className="text-white font-mono mt-0.5">
                  ¥ {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                  <span className="ml-1.5 px-1 py-0.2 bg-[#cfbcff]/10 text-[#cfbcff] text-[8px] rounded uppercase">
                    {item.level}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-[#cbc4d2]/40 text-[10px] font-semibold font-mono text-right">您的收益金</p>
                <p className="text-[#00e676] font-extrabold font-mono text-right mt-0.5">
                  +¥ {item.reward.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-[#cbc4d2]/50 font-mono">
              <span>结算时间</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination mock bar */}
      <div className="p-4 px-6 bg-white/2 flex items-center justify-between border-t border-white/5 text-xs text-[#cbc4d2]">
        <span>显示 1-{filteredHistory.length} 条，共 {filteredHistory.length} 条</span>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
          <span className="font-bold bg-[#cfbcff] text-[#381e72] px-2 py-0.5 rounded">1</span>
          <button className="p-1 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </section>
  );
}
