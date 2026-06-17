import { Coins, Eye, Search } from 'lucide-react';
import type { DownlineMember } from '@/src/types';

interface WalletsPanelProps {
  downlines: DownlineMember[];
  searchMemberQuery: string;
  setSearchMemberQuery: (query: string) => void;
  handleOpenWalletDetails: (member: DownlineMember) => void;
}

export default function WalletsPanel({
  downlines,
  searchMemberQuery,
  setSearchMemberQuery,
  handleOpenWalletDetails
}: WalletsPanelProps) {
  return (
<div className="space-y-4 animate-fadeIn">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h4 className="text-xs uppercase tracking-wider text-white font-sans font-bold flex items-center gap-1.5">
        <Coins className="w-4 h-4 text-[#cfbcff]" />
        联盟代表个人USDT、冻结及TROO股票财富存余普查
      </h4>
      <p className="text-[10px] text-[#cbc4d2]/50 mt-0.5">
        实时监管特定代收理财代表的可用、排队在途、冻结等各项细项指标，点击“钱包纠偏详情”极速拨乱反正。
      </p>
    </div>

    <div className="relative w-full sm:w-64">
      <input 
        type="text"
        value={searchMemberQuery}
        onChange={(e) => setSearchMemberQuery(e.target.value)}
        placeholder="键入昵称 / UID 搜查账户存余..."
        className="w-full bg-[#1c1824] border border-white/10 rounded-xl px-3.5 py-2 pl-9 text-xs text-white placeholder-white/30 focus:ring-1 focus:ring-[#cfbcff] outline-none"
      />
      <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
    </div>
  </div>

  {/* Desktop View Table */}
  <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl pr-1">
    <table className="w-full text-left text-xs">
      <thead>
        <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-bold bg-white/[0.01]">
          <th className="py-4 px-4">会员昵称 / UID 账号</th>
          <th className="py-4 px-4 font-mono text-emerald-400">可用资金余额 (USDT)</th>
          <th className="py-4 px-4 font-mono text-cyan-400">已冻结资产 (USDT)</th>
          <th className="py-4 px-4 font-mono text-[#cfbcff]">TROO 股票配售余量</th>
          <th className="py-4 px-4 font-mono text-amber-500">D+1 待核算佣金 (USDT)</th>
          <th className="py-4 px-4 font-mono text-white">总总资产折合 (USDT)</th>
          <th className="py-4 px-4 text-center">状态</th>
          <th className="py-4 px-4 text-right">钱包细节修正</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5 font-mono">
        {downlines
          .filter(d => {
            if (!searchMemberQuery) return true;
            const q = searchMemberQuery.toLowerCase();
            return d.uid.includes(q) || 
                   (d.nickname && d.nickname.toLowerCase().includes(q)) ||
                   (d.email && d.email.toLowerCase().includes(q));
          })
          .map(d => {
            // Total Assets calculation: USDT balance + Frozen Balance + Pending Balance
            const totalWealth = (d.usdtBalance || 0) + (d.frozenBalance || 0) + (d.pendingBalance || 0);

            return (
              <tr key={d.uid} className="hover:bg-white/[0.015]">
                <td className="py-3.5 px-4 font-sans">
                  <p className="font-extrabold text-white text-xs">{d.nickname || '新同盟会员'}</p>
                  <p className="font-mono text-[10px] text-[#cbc4d2]/40 mt-0.5">UID: {d.uid}</p>
                </td>
                <td className="py-3.5 px-4 font-mono text-emerald-400 font-extrabold">{d.usdtBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</td>
                <td className="py-3.5 px-4 font-mono text-cyan-400 font-extrabold">{d.frozenBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</td>
                <td className="py-3.5 px-4 font-mono text-[#cfbcff] font-extrabold">{d.trooBalance?.toLocaleString(undefined, {minimumFractionDigits: 0}) || '0'} TROO</td>
                <td className="py-3.5 px-4 font-mono text-amber-500 font-bold">{d.pendingBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</td>
                <td className="py-3.5 px-4 font-mono text-white font-black">
                  USDT {totalWealth.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                    d.status === 'normal' ? 'bg-emerald-500/10 text-emerald-400' :
                    d.status === 'frozen' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {d.status === 'normal' ? '活跃' : d.status === 'frozen' ? '挂冻' : '受限'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => handleOpenWalletDetails(d)}
                    className="bg-white/5 hover:bg-[#cfbcff]/15 text-[#cbc4d2] hover:text-[#cfbcff] px-3 py-1.5 rounded-xl font-bold font-sans active:scale-95 transition-all text-xs inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>财务审计</span>
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>

  {/* Mobile View Card Stack */}
  <div className="block md:hidden space-y-3">
    {downlines
      .filter(d => {
        if (!searchMemberQuery) return true;
        const q = searchMemberQuery.toLowerCase();
        return d.uid.includes(q) || 
               (d.nickname && d.nickname.toLowerCase().includes(q)) ||
               (d.email && d.email.toLowerCase().includes(q));
      })
      .map(d => {
        const totalWealth = (d.usdtBalance || 0) + (d.frozenBalance || 0) + (d.pendingBalance || 0);

        return (
          <div key={d.uid} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-3 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
              <div>
                <span className="font-extrabold text-white text-sm">{d.nickname || '新同盟会员'}</span>
                <div className="text-[10px] text-[#cbc4d2]/40 font-mono mt-0.5">UID: {d.uid}</div>
              </div>
              <span className={`text-[9.5px] font-black uppercase px-2.5 py-0.5 rounded ${
                d.status === 'normal' ? 'bg-emerald-500/10 text-emerald-400' :
                d.status === 'frozen' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-100'
              }`}>
                {d.status === 'normal' ? '活跃' : d.status === 'frozen' ? '挂冻' : '受限'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-mono text-[11px] pb-1">
              <div>
                <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">可用资金 (USDT)</span>
                <span className="text-emerald-400 font-extrabold block text-xs">{d.usdtBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</span>
              </div>
              <div>
                <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">冻结资产 (USDT)</span>
                <span className="text-cyan-400 font-extrabold block text-xs">{d.frozenBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</span>
              </div>
              <div>
                <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">TROO 股票量</span>
                <span className="text-[#cfbcff] font-extrabold block text-xs">{d.trooBalance?.toLocaleString(undefined, {minimumFractionDigits: 0}) || '0'} TROO</span>
              </div>
              <div>
                <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">在途佣金</span>
                <span className="text-amber-500 font-bold block text-xs">{d.pendingBalance?.toLocaleString(undefined, {minimumFractionDigits: 2}) || '0.00'} U</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-white/5">
                <span className="text-[#cbc4d2]/40 text-[9px] font-sans block leading-none mb-1">总资产折合 (Combined)</span>
                <span className="text-white font-black text-xs font-mono">USDT {totalWealth.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
            </div>

            <div className="pt-1.5">
              <button
                type="button"
                onClick={() => handleOpenWalletDetails(d)}
                className="w-full justify-center bg-white/5 hover:bg-[#cfbcff]/15 text-[#cbc4d2] hover:text-[#cfbcff] py-2.5 rounded-xl font-bold font-sans active:scale-95 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#cfbcff]" />
                <span>财务审计与纠偏</span>
              </button>
            </div>
          </div>
        );
      })}
  </div>
</div>
  );
}
