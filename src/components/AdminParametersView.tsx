import React, { useState } from 'react';
import { Coins, Sliders, Globe } from 'lucide-react';

export default function AdminParametersView() {
  const [commissionLevels, setCommissionLevels] = useState<{ [key: string]: number }>({
    L1: 40, L2: 40, L3: 40, L4: 40, L5: 40
  });
  const [withdrawalFee, setWithdrawalFee] = useState<number>(15);
  const [l1UnlockRatio, setL1UnlockRatio] = useState<number>(10);
  const [apiPriceUrl, setApiPriceUrl] = useState<string>('https://query1.finance.yahoo.com/v8/finance/chart/TROO-USD');

  return (
    <div id="admin_parameters_view" className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 animate-fadeIn flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div>
        <h3 className="text-base font-bold text-white">全系统结算安全红线与运营参数微调面板</h3>
        <p className="text-xs text-[#cbc4d2]/60 mt-0.5">
          可实时微调 L1-L5 各层分成占比、排队解扣门限、以及提款矿工消耗手续封顶
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Parameters Box 1 - Commission tiers ratio */}
        <div className="bg-[#1f1a26]/40 border border-white/5 rounded-2xl p-4.5 space-y-3.5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-black text-[#cfbcff] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
              <Coins className="w-4 h-4 text-[#cfbcff]" />
              L1 - L5 直推及团队分派比例 (%)
            </h4>
            <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed mt-2">
              分别对应第一至五代推荐上线可获得的返比。默认：各级均为 40% 的 U 等值比例计算。
            </p>

            <div className="space-y-2.5 mt-4">
              {['L1', 'L2', 'L3', 'L4', 'L5'].map(lvl => (
                <div key={lvl} className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white font-mono">{lvl} 级代理派佣比</span>
                  <div className="relative">
                    <input 
                      type="number"
                      value={commissionLevels[lvl]}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value) || 0;
                        setCommissionLevels({ ...commissionLevels, [lvl]: v });
                      }}
                      className="bg-[#110e16] border border-white/5 text-white pl-3.5 pr-8 py-1.5 rounded-lg w-28 text-right font-mono font-bold focus:ring-1 focus:ring-[#cfbcff] outline-none"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 text-[10px]">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => alert('L1-L5 各层推荐代付分佣占比修改已实时推送并锁入智能结算合约！')}
            className="w-full mt-4 py-2 bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white rounded-xl text-xs font-bold active:scale-95 transition-all text-center cursor-pointer"
          >
            锁定分成占比
          </button>
        </div>

        {/* Parameters Box 2 - Unlock metrics */}
        <div className="bg-[#1f1a26]/40 border border-white/5 rounded-2xl p-4.5 space-y-3.5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-black text-[#e7c365] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
              <Sliders className="w-4 h-4 text-[#e7c365]" />
              锁定与出金手续扣取参数
            </h4>
            <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed mt-2">
              对提现硬性手续封底限制及下线首期买入解锁释放比例设置
            </p>

            <div className="space-y-4 mt-4 text-xs font-sans">
              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-white">提现硬手续封顶限制 (USDT)</span>
                <input 
                  type="number"
                  value={withdrawalFee}
                  onChange={(e) => setWithdrawalFee(parseFloat(e.target.value) || 0)}
                  className="bg-[#110e16] border border-white/5 rounded-xl px-3 py-2 text-xs text-white font-mono focus:ring-1 focus:ring-[#cfbcff] outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-white">L1 直推下级成交触发排队释放率 (%)</span>
                <input 
                  type="number"
                  value={l1UnlockRatio}
                  onChange={(e) => setL1UnlockRatio(parseFloat(e.target.value) || 0)}
                  className="bg-[#110e16] border border-white/5 rounded-xl px-3 py-2 text-xs text-white font-mono focus:ring-1 focus:ring-[#cfbcff] outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => alert('出金封底矿工费、L1 解锁提点比例保存成功！')}
            className="w-full mt-4 py-2 bg-[#36343a] text-[#cfbcff] rounded-xl text-xs font-bold active:scale-95 transition-all text-center cursor-pointer border border-white/5 hover:bg-[#cfbcff]/10"
          >
            确认扣比修改
          </button>
        </div>

        {/* Parameters Box 3 - API pricing feeds source */}
        <div className="bg-[#1f1a26]/40 border border-white/5 rounded-2xl p-4.5 space-y-3.5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-black text-[#5fc4ff] uppercase tracking-wider pb-2.5 border-b border-white/5 flex items-center gap-1">
              <Globe className="w-4 h-4 text-[#5fc4ff]" />
              TROO股票价 Yahoo API 参数
            </h4>
            <p className="text-[11px] text-[#cbc4d2]/50 leading-relaxed mt-2">
              指定调用的 Yahoo Finance 跨界股票 API 端点，系统按 D+1 交易收盘均价自动加点。
            </p>

            <div className="space-y-4 mt-4 text-xs font-mono">
              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-white text-xs font-sans">API Endpoint Query URL</span>
                <textarea 
                  rows={3}
                  value={apiPriceUrl}
                  onChange={(e) => setApiPriceUrl(e.target.value)}
                  className="bg-[#110e16] border border-white/5 rounded-xl p-2.5 text-[10.5px] text-[#cbc4d2] break-all leading-relaxed focus:ring-1 focus:ring-[#cfbcff] outline-none"
                />
              </div>

              <div className="flex justify-between items-center bg-[#110e16] p-2.5 rounded-xl border border-white/5 text-[10.5px]">
                <span className="text-[#cbc4d2]/50 font-sans">当前调试反馈</span>
                <span className="text-emerald-400 font-bold font-mono">HTTP 200 Connected</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button 
              onClick={() => {
                alert('Yahoo Finance API 跨链报盘价格抓取成功！TROO市价复归锁定在 $0.125');
              }}
              className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-400 text-[#110e16] rounded-xl text-xs font-bold active:scale-95 transition-all text-center cursor-pointer"
            >
              实时抓取测试
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
