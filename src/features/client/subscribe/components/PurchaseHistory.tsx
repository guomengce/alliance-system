import type { WorkspaceProps } from '../types';

type PurchaseHistoryProps = Pick<
  WorkspaceProps,
  | 'purchases'
  | 'copiedId'
  | 'setDetailModalItem'
  | 'handleCopyText'
>;

export default function PurchaseHistory({
  purchases,
  copiedId,
  setDetailModalItem,
  handleCopyText
}: PurchaseHistoryProps) {
  return (
    <>
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
    </>
  );
}
