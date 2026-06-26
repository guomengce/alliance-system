import { Download, Search } from 'lucide-react';
import type { DownlineLedgerProps } from '../types';
import { LedgerDesktopRow, LedgerMobileRow } from './LedgerRows';

export default function DownlineLedger({
  downlines,
  searchQuery,
  exporting,
  setSearchQuery,
  onExportData
}: DownlineLedgerProps) {
  return (
    <section className="glass-card rounded-2xl overflow-hidden shadow-xl border border-white/5">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold tracking-tight text-white text-base">下属成员详情表</h3>
          <p className="text-xs text-[#cbc4d2]/40">实时展示直属、二代及网络裂变用户的业绩质押明细列表</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Global search within list */}
          <div className="relative group flex items-center bg-[#1e1a26]/90 border border-white/5 rounded-xl px-3 py-1.5 focus-within:border-[#cfbcff]/40 transition-all">
            <Search className="w-4 h-4 text-[#cbc4d2] opacity-60 mr-2" />
            <input 
              type="text" 
              placeholder="搜索用户ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-xs text-white outline-none w-full sm:w-32 h-6"
            />
          </div>
          
          <button 
            onClick={onExportData}
            disabled={exporting}
            className="px-4 py-2 bg-[#cfbcff] text-[#2c155c] hover:bg-[#ebdfff] transition-all rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            {exporting ? '导出中...' : '导出报表'}
          </button>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto scrollbar-hide">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/2 text-[#cbc4d2] text-xs font-bold uppercase tracking-wider">
              <th className="p-4 px-6">用户 ID</th>
              <th className="p-4 px-6 xl:text-center">注册时间</th>
              <th className="p-4 px-6 xl:text-center">节点层级</th>
              <th className="p-4 px-6 text-right">累计业绩 (USDT)</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {downlines.length > 0 ? (
              downlines.map((m) => (
                <LedgerDesktopRow key={m.uid} member={m} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10 text-xs text-[#cbc4d2]/40 font-medium">
                  没有查找到符合条件的裂变下属节点账单
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View with Cards */}
      <div className="md:hidden divide-y divide-white/5 space-y-4 p-4">
        {downlines.length > 0 ? (
          downlines.map((m, index) => (
            <LedgerMobileRow key={m.uid} member={m} index={index} />
          ))
        ) : (
          <div className="text-center py-10 text-xs text-[#cbc4d2]/40 font-medium">
            没有查找到符合条件的裂变下属节点账单
          </div>
        )}
      </div>
    </section>
  );
}
