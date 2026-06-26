import { Eye } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type SettlementListProps = Pick<
  WorkspaceProps,
  | 'settlementTransactions'
  | 'setSelectedTx'
>;

export default function SettlementList({
  settlementTransactions,
  setSelectedTx
}: SettlementListProps) {
  return (
    <>
      {/* List module covering full width */}
      <div className="text-left space-y-4 flex-grow">
        <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#cfbcff]">当日各加盟会员具体结算与扣税账簿 (Settlement Logs)</h4>

        {/* Mobile card list */}
        <div className="block md:hidden space-y-3">
          {settlementTransactions.map(tx => (
            <div key={tx.id} className="bg-[#1d1925]/40 border border-white/5 p-4 rounded-2xl space-y-3 font-sans">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white text-xs font-bold leading-none">{tx.memberUid}</p>
                  <p className="text-xs text-[#cbc4d2]/40 font-normal mt-0.5">{tx.nickname}</p>
                </div>
                <span className={`text-xs font-black px-2 py-0.5 rounded ${tx.status === 'fully_settled' ? 'bg-emerald-500/10 text-emerald-400' : tx.status === 'clipped' ? 'bg-red-500/10 text-red-400' : tx.status === 'stalled_exception' ? 'bg-red-950 text-amber-500 animate-pulse border border-red-500/25' : 'bg-[#cfbcff]/10 text-[#cfbcff]'}`}>
                  {tx.status === 'fully_settled' ? '全额派发' : tx.status === 'clipped' ? '超额扣税' : tx.status === 'stalled_exception' ? '待干预' : '已推警告'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[13px] border-t border-b border-white/5 py-2 font-mono">
                <div>
                  <span className="text-[#cbc4d2]/40 text-xs block font-sans">预拨虚增应得</span>
                  <p className="text-white font-semibold mt-0.5">USDT {tx.expectedCommissions.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[#cbc4d2]/40 text-xs block font-sans">可用佣金池限额</span>
                  <p className={`font-semibold mt-0.5 ${tx.remainingPoolCapacity < 1000 ? 'text-amber-400 font-extrabold' : 'text-[#cbc4d2]/85'}`}>{tx.remainingPoolCapacity.toLocaleString()} U</p>
                </div>
                <div>
                  <span className="text-[#cbc4d2]/40 text-xs block font-sans">实派到账</span>
                  <p className="text-emerald-400 font-bold mt-0.5">USDT {tx.actualSettledAmount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-red-400/80 text-xs block font-sans">溢扣平台准备金</span>
                  <p className="text-red-400 font-bold mt-0.5">USDT {tx.spilloverClipped.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedTx(tx)}
                  className="bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-3 py-1.5 rounded-xl text-[13px] font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>精算审核校准</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop density table */}
        <div className="hidden md:block overflow-x-auto border border-white/5 bg-[#1d1925]/20 rounded-2xl p-1">
          <table className="w-full text-left text-xs text-[#cbc4d2]/85">
            <thead>
              <tr className="border-b border-white/5 text-[#cbc4d2]/50 font-black bg-white/[0.01]">
                <th className="py-4 px-4">对账代表 (UID)</th>
                <th className="py-4 px-4 font-mono">预拨应得 (U)</th>
                <th className="py-4 px-4 font-mono">当前可用佣额度 (U)</th>
                <th className="py-4 px-4 font-mono">实到账派发 (U)</th>
                <th className="py-4 px-4 font-mono text-red-400">溢漏回笼大盘 (U)</th>
                <th className="py-4 px-4 text-center">状态说明</th>
                <th className="py-4 px-4 text-center">排调监管</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {settlementTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold">
                    <div className="flex flex-col">
                      <span className="text-white text-xs">{tx.memberUid}</span>
                      <span className="text-xs text-[#cbc4d2]/40 font-normal">{tx.nickname}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-white">USDT {tx.expectedCommissions.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className={tx.remainingPoolCapacity < 1000 ? 'text-amber-400 font-extrabold' : 'text-[#cbc4d2]/85'}>
                      {tx.remainingPoolCapacity.toLocaleString()} U
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-extrabold">USDT {tx.actualSettledAmount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-red-500 font-extrabold">USDT {tx.spilloverClipped.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`text-xs font-black px-2 py-0.5 rounded ${tx.status === 'fully_settled' ? 'bg-emerald-500/10 text-emerald-400' : tx.status === 'clipped' ? 'bg-red-500/10 text-red-400' : tx.status === 'stalled_exception' ? 'bg-red-950 text-amber-500 animate-pulse border border-red-500/25' : 'bg-[#cfbcff]/10 text-[#cfbcff]'}`}>
                      {tx.status === 'fully_settled' ? '全额派发' : tx.status === 'clipped' ? '超额溢流截断' : tx.status === 'stalled_exception' ? '待人工干预' : '已推警告邮件'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedTx(tx)}
                      className="mx-auto bg-white/5 hover:bg-[#cfbcff]/10 text-white hover:text-[#cfbcff] px-2.5 py-1 rounded-lg text-xs font-bold font-sans active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>校准</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
