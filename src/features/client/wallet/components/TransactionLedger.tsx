import { Copy, Search, X } from 'lucide-react';
import type { TransactionLedgerProps } from '../types';
import { getNormalizedTypeLabel } from '../utils';

export default function TransactionLedger({
  filteredTransactions,
  filterButtons,
  filterType,
  searchVal,
  copySuccessId,
  onFilterTypeChange,
  onSearchValChange,
  onCopyTransactionId,
  onSelectTransaction
}: TransactionLedgerProps) {
  return (
    <section className="glass-card rounded-2xl overflow-hidden shadow-xl">
      <div className="p-4 sm:p-6 border-b border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold tracking-tight text-white text-sm sm:text-base uppercase">交易历史 (Historical Ledger)</h3>
          <p className="text-[10px] sm:text-xs text-[#cbc4d2]/50">查找并筛选所有的资金账单往来记录</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative group flex items-center bg-[#211f24] border border-white/5 rounded-xl px-3 py-1.5 focus-within:border-[#cfbcff]/40 transition-all">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cbc4d2] opacity-60 mr-2" />
            <input
              type="text"
              placeholder="搜索交易ID或描述..."
              value={searchVal}
              onChange={(e) => onSearchValChange(e.target.value)}
              className="bg-transparent border-none text-white text-[11px] sm:text-xs outline-none placeholder:text-white/30 h-7 py-1 focus:ring-0 min-w-[#180px]"
            />
            {searchVal && (
              <button onClick={() => onSearchValChange('')} className="p-1 text-white/50 hover:text-white transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex bg-[#211f24] rounded-xl p-1 overflow-x-auto scrollbar-hide">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => onFilterTypeChange(btn.id)}
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
                            onCopyTransactionId(txn.id);
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
                        onClick={() => onSelectTransaction(txn)}
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
                        onCopyTransactionId(txn.id);
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
                      onClick={() => onSelectTransaction(txn)}
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
  );
}
