export default function WorkflowGuide() {
  return (
    <>
      {/* Top-aligned Explanation Window (moved from right side to top of list module) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-[#17131e]/50 p-5 rounded-2xl border border-white/5 text-left animate-fadeIn">
        <div className="md:col-span-8 space-y-3">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#cfbcff] font-sans border-b border-white/5 pb-2">
            D+1 轧账时序规则及防透干预 (Workflow Guide)
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="relative pl-4 border-l border-white/10 space-y-1">
              <p className="font-extrabold text-white">1. D+1 日常轮巡对账</p>
              <p className="text-[#cbc4d2]/60 text-[10px] leading-relaxed">
                以 24 点日切、次日 04:00 点起息派发。将前日“待核算佣金”扣除溢流部分拨入可用余额钱包。
              </p>
            </div>

            <div className="relative pl-4 border-l border-white/10 space-y-1">
              <p className="font-extrabold text-[#e7c365]">2. 额度匮乏拦截 (溢漏)</p>
              <p className="text-[#cbc4d2]/60 text-[10px] leading-relaxed">
                当预期派发额高于“仍可用额度”时，超额部分自动强行归集罚没至平台 Reserve 库中。
              </p>
            </div>

            <div className="relative pl-4 border-l border-white/10 space-y-1">
              <p className="font-extrabold text-emerald-400">3. 手动风控干预</p>
              <p className="text-[#cbc4d2]/60 text-[10px] leading-relaxed">
                支持管理层一键人工补发拨付、下发枯竭邮件并调整多节点异常挂账。
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-[#110e16]/60 p-4.5 border border-white/5 rounded-xl flex flex-col justify-between space-y-2">
          <div className="space-y-1.5">
            <p className="text-[10px] font-black uppercase text-[#cbc4d2]/40 tracking-wider">大盘结算实时审计 (AUDIT)</p>
            <div className="flex justify-between items-center text-[11px] text-[#cbc4d2]/70 font-mono leading-none">
              <span>涉及预拨总佣金:</span>
              <span className="font-black text-white">6,050 U</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#cbc4d2]/70 font-mono leading-none">
              <span>因池不足总拦截:</span>
              <span className="font-extrabold text-red-400">1,650 U</span>
            </div>
          </div>
          <p className="text-[9px] text-[#cbc4d2]/35 italic leading-tight">
            * 链上清结算风控提示：系统每日根据当前联盟充值释放倍率精确对算，手工轧账更正会存入机密审计。
          </p>
        </div>
      </div>
    </>
  );
}
