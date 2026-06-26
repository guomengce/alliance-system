import { Activity, Coins, Lock, Wallet } from 'lucide-react';
import type { WalletPanelProps } from '../../types';

export function WalletPanel({
  formUsdt,
  setFormUsdt,
  formFrozenUsdt,
  setFormFrozenUsdt,
  formTroo,
  setFormTroo,
  formPending,
  setFormPending,
  formNodes,
  formVolume,
}: WalletPanelProps) {
  return (
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <Wallet className="w-5 h-5 text-[#cfbcff]" />
              <h2 className="text-sm font-bold text-white tracking-wider">用户钱包及同盟资产折核 / 异常纠偏</h2>
            </div>

            <div className="p-4 bg-[#cfbcff]/5 border border-[#cfbcff]/10 rounded-2xl text-xs text-[#cbc4d2] space-y-1">
              <p className="font-extrabold text-[#cfbcff]">管理员财务及资产精算纠偏面板</p>
              <p className="opacity-70 leading-relaxed">
                管理员可人工拨备或扣件用户账户中因链上交易延迟、异常阻塞或人工补额导致的各类资产和佣金余额。
              </p>
            </div>

            {/* Comprehensive Net Asset Valuation Cover */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-sans">
              <div className="bg-gradient-to-br from-[#1c142c] to-[#120a1c] p-4.5 rounded-2xl border border-[#cfbcff]/20 col-span-1 md:col-span-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-[#cfbcff] font-extrabold block uppercase tracking-wider">该用户在全联盟折合预估总资产价值 (Total Asset Net Valuation)</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-mono leading-none">
                      {(formUsdt + formFrozenUsdt + formPending + (formTroo * 0.01)).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </span>
                    <span className="text-sm font-bold text-[#cfbcff] font-mono">USDT 等值</span>
                  </div>
                </div>
                <div className="text-right text-xs text-[#cbc4d2]/50 font-mono space-y-0.5">
                  <p>可用额度: {formUsdt.toLocaleString()} USDT</p>
                  <p>拉黑/冻结: {formFrozenUsdt.toLocaleString()} USDT</p>
                  <p>待结算: {formPending.toLocaleString()} USDT</p>
                  <p>TROO折算 (汇率0.01): {(formTroo * 0.01).toLocaleString()} USDT</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#cfbcff] flex items-center gap-1"><Wallet className="w-3.5 h-3.5" /> 可用资产 (USDT)</span>
                  <span className="text-[#cbc4d2]/40 font-mono">AVAILABLE</span>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    value={formUsdt}
                    onChange={(e) => setFormUsdt(Number(e.target.value) || 0)}
                    className="w-full bg-[#110e16] border border-white/10 focus:border-[#cfbcff] text-white text-xs font-extrabold pr-12 pl-3.5 py-3 rounded-xl focus:outline-none font-mono"
                    step="0.01"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-[#cbc4d2]/40 font-mono">USDT</span>
                </div>
              </div>

              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#ffb4ab] flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> 冻结资产 (USDT)</span>
                  <span className="text-[#cbc4d2]/40 font-mono">FROZEN</span>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    value={formFrozenUsdt}
                    onChange={(e) => setFormFrozenUsdt(Number(e.target.value) || 0)}
                    className="w-full bg-[#110e16] border border-white/10 focus:border-[#cfbcff] text-[#ffb4ab] text-xs font-extrabold pr-12 pl-3.5 py-3 rounded-xl focus:outline-none font-mono"
                    step="0.01"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-[#cbc4d2]/40 font-mono">USDT</span>
                </div>
              </div>

              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> D+1 待核算佣金</span>
                  <span className="text-amber-500/40 font-mono">PENDING COMM</span>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    value={formPending}
                    onChange={(e) => setFormPending(Number(e.target.value) || 0)}
                    className="w-full bg-[#110e16] border border-white/10 focus:border-[#cfbcff] text-amber-400 text-xs font-extrabold pr-12 pl-3.5 py-3 rounded-xl focus:outline-none font-mono"
                    step="0.01"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-amber-500/40 font-mono">USDT</span>
                </div>
              </div>

              <div className="bg-[#1c1824] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#cfbcff] flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> TROO股票余量</span>
                  <span className="text-[#cbc4d2]/40 font-mono">TROO STOCK</span>
                </div>
                <div className="relative">
                  <input 
                    type="number"
                    value={formTroo}
                    onChange={(e) => setFormTroo(Number(e.target.value) || 0)}
                    className="w-full bg-[#110e16] border border-white/10 focus:border-[#cfbcff] text-[#cfbcff] text-xs font-extrabold pr-12 pl-3.5 py-3 rounded-xl focus:outline-none font-mono"
                    step="1"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-[#cbc4d2]/40 font-mono">股票</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="bg-[#1c1824]/60 p-4.5 rounded-2xl border border-white/5 space-y-2 opacity-80 select-none">
                <span className="text-xs text-[#cbc4d2]/50 font-extrabold block uppercase">下级网络总裂变节点数 (个)</span>
                <div className="bg-[#110e16] border border-white/5 text-[#cfbcff] text-sm font-extrabold px-3.5 py-3.5 rounded-xl font-mono flex items-center justify-between">
                  <span>{formNodes} 个下属</span>
                  <span className="text-xs bg-[#cfbcff]/10 text-[#cfbcff] px-2 py-0.5 rounded uppercase font-sans font-bold">🔒 系统自动精算 - 绝不允许管理端手动干预</span>
                </div>
              </div>

              <div className="bg-[#1c1824]/60 p-4.5 rounded-2xl border border-white/5 space-y-2 opacity-80 select-none">
                <span className="text-xs text-[#cbc4d2]/50 font-extrabold block uppercase">直属级大盘累积销售业绩 (USDT)</span>
                <div className="bg-[#110e16] border border-white/5 text-emerald-400 text-sm font-extrabold px-3.5 py-3.5 rounded-xl font-mono flex items-center justify-between">
                  <span>USDT {formVolume.toLocaleString()}</span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase font-sans font-bold">🔒 系统裂变聚合 - 绝不允许手动篡改</span>
                </div>
              </div>
            </div>

            {/* 核心同盟分红扣付与佣金统计 */}
            <div className="border border-[#cfbcff]/10 rounded-xl bg-[#cfbcff]/2 p-4 space-y-3 font-sans">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Coins className="w-4 h-4 text-[#cfbcff]" />
                <span>同盟体推广分润与佣金精算对账统计 (D+1 在途及总预估结算)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 font-sans">
                <div className="bg-[#1c1824]/80 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-[#cbc4d2]/50 block">累积分润总收益 (预估)</span>
                  <span className="text-sm font-bold text-emerald-400 block mt-1 font-mono">USDT {(Number(formVolume) * 0.12).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="bg-[#1c1824]/80 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-[#cbc4d2]/50 block">最上限可用分润信用额度</span>
                  <span className="text-sm font-bold text-[#cfbcff] block mt-1 font-mono">USDT {(Number(formVolume) * 0.4).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="bg-[#1c1824]/80 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-[#cbc4d2]/50 block">当前 D+1 待核算佣金度</span>
                  <span className="text-sm font-bold text-amber-400 block mt-1 font-mono">USDT {formPending.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
              </div>
              <p className="text-xs text-[#cbc4d2]/30 leading-normal">
                * 精算公式闭环体系：累积分润额与可用分润上限均与该账户的销售业绩强关联 (12% 转化率 / 40% 精算池权重)。系统自动进行D+1待核算佣金的到账交割，人工微调可用或冻结资产后请点击底部“确认修改”保存数据。
              </p>
            </div>
          </div>
  );
}
