import { Download, Eye, Sliders } from 'lucide-react';
import type { Transaction } from '@/src/types';

interface LedgerPanelProps {
  fullLedger: Transaction[];
  ledgerTypeFilter: string;
  setLedgerTypeFilter: (filter: string) => void;
  setSelectedLedgerItem: (item: Transaction) => void;
  exportLedgerCSV: () => void;
}

export default function LedgerPanel({
  fullLedger,
  ledgerTypeFilter,
  setLedgerTypeFilter,
  setSelectedLedgerItem,
  exportLedgerCSV
}: LedgerPanelProps) {
  return (
<div className="space-y-4 animate-fadeIn">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h4 className="text-xs uppercase tracking-wider text-white font-sans font-bold flex items-center gap-1.5">
        <Sliders className="w-4 h-4 text-[#cfbcff]" />
        充值、提现、派发佣金、排队解锁完整总流水账谱
      </h4>
      <p className="text-[10px] text-[#cbc4d2]/50 mt-0.5">
        记录每一次美金和TROO股份变动，点击即可拉取单条记账证书对账。
      </p>
    </div>

    {/* Filter inputs */}
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto text-xs font-sans">
      <select
        value={ledgerTypeFilter}
        onChange={(e) => setLedgerTypeFilter(e.target.value)}
        className="bg-[#211f24] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold cursor-pointer"
      >
        <option value="all">显示全部流水形态</option>
        <option value="recharge">🛡 仅显示 充值/买入流水</option>
        <option value="withdraw">💸 仅显示 提币/出金流水</option>
        <option value="commission">🎉 仅显示 五代派佣流水</option>
        <option value="lock">⏳ 仅显示 排队解锁流水</option>
      </select>

      <button
        type="button"
        onClick={exportLedgerCSV}
        className="bg-[#cfbcff]/5 hover:bg-[#cfbcff]/15 text-[#cfbcff] border border-[#cfbcff]/10 px-4 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
      >
        <Download className="w-3.5 h-3.5" />
        <span>备存总流水 (CSV)</span>
      </button>
    </div>
  </div>

  {/* Desktop View Table */}
  <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl pr-1">
    <table className="w-full text-left text-xs">
      <thead>
        <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-bold bg-white/[0.01]">
          <th className="py-4 px-4">记账流水ID</th>
          <th className="py-4 px-4">收支类型</th>
          <th className="py-4 px-4">盟友资金交割详情描述</th>
          <th className="py-4 px-4 font-mono">交割金额</th>
          <th className="py-4 px-4 font-mono">币种</th>
          <th className="py-4 px-4">交易完成时分</th>
          <th className="py-4 px-4 text-center">细节证书</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5 font-mono">
        {fullLedger
          .filter(l => {
            if (ledgerTypeFilter === 'all') return true;
            return l.type === ledgerTypeFilter;
          })
          .map(l => (
            <tr key={l.id} className="hover:bg-white/[0.015]">
              <td className="py-3.5 px-4 font-mono font-bold text-white">{l.id}</td>
              <td className="py-3.5 px-4">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                  l.type === 'recharge' ? 'bg-emerald-500/10 text-emerald-400' :
                  l.type === 'withdraw' ? 'bg-red-500/10 text-[#ffb4ab]' :
                  l.type === 'commission' ? 'bg-[#cfbcff]/10 text-[#cfbcff]' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {l.typeLabel || l.type.toUpperCase()}
                </span>
              </td>
              <td className="py-3.5 px-4 text-[#cbc4d2] font-sans truncate max-w-[280px]" title={l.desc}>{l.desc}</td>
              <td className={`py-3.5 px-4 font-mono font-black ${l.amount < 0 ? 'text-[#ffb4ab]' : 'text-emerald-400'}`}>
                {l.amount < 0 ? '' : '+'}{l.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </td>
              <td className="py-3.5 px-4 font-mono text-[#cbc4d2]/60 font-bold">{l.currency}</td>
              <td className="py-3.5 px-4 font-mono text-[#cbc4d2]/40">{l.time}</td>
              <td className="py-3.5 px-4 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedLedgerItem(l)}
                  className="bg-white/5 hover:bg-white/10 text-[#cbc4d2] px-2.5 py-1 rounded-lg text-[10.5px] font-sans active:scale-95 transition-all outline-none mx-auto cursor-pointer flex items-center gap-1"
                >
                  <Eye className="w-3 h-3 text-[#cfbcff]" />
                  <span>凭证</span>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>

  {/* Mobile View Card Stack */}
  <div className="block md:hidden space-y-3">
    {fullLedger
      .filter(l => {
        if (ledgerTypeFilter === 'all') return true;
        return l.type === ledgerTypeFilter;
      })
      .map(l => (
        <div key={l.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-3 font-sans text-xs">
          <div className="flex justify-between items-start border-b border-white/5 pb-2">
            <div>
              <span className="font-mono text-white font-extrabold text-[11px]">{l.id}</span>
              <div className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">{l.time}</div>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
              l.type === 'recharge' ? 'bg-emerald-500/10 text-emerald-400' :
              l.type === 'withdraw' ? 'bg-red-500/10 text-[#ffb4ab]' :
              l.type === 'commission' ? 'bg-[#cfbcff]/10 text-[#cfbcff]' : 'bg-amber-500/10 text-amber-400'
            }`}>
              {l.typeLabel || l.type.toUpperCase()}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#cbc4d2]/45 text-[9px] block leading-none">资金交割描述</span>
            <span className="text-[#cbc4d2]/90 block leading-relaxed line-clamp-2 text-[11px]" title={l.desc}>
              {l.desc}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="font-mono text-[11px]">
              <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-0.5">交割金额 / 币种</span>
              <span className={`font-black text-xs ${l.amount < 0 ? 'text-[#ffb4ab]' : 'text-emerald-400'}`}>
                {l.amount < 0 ? '' : '+'}{l.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </span>
              <span className="text-[#cbc4d2]/60 font-bold ml-1 text-[10px]">{l.currency}</span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedLedgerItem(l)}
              className="bg-white/5 hover:bg-white/10 text-[#cbc4d2] px-3 py-2 rounded-xl text-xs font-bold active:scale-95 transition-all outline-none cursor-pointer flex items-center gap-1 shrink-0"
            >
              <Eye className="w-3.5 h-3.5 text-[#cfbcff]" />
              <span>查看凭证</span>
            </button>
          </div>
        </div>
      ))}
  </div>
</div>
  );
}
