import { AlertTriangle, CheckCircle, Coins, RefreshCw, Send, Sparkles, X } from 'lucide-react';
import type { DetailsPanelProps } from '../types';

export default function DetailsPanel({
  selectedCommission,
  onClose,
  onForcePayout,
  onSubmitCommissionAdjustment
}: DetailsPanelProps) {
  return (
    <div id="commission_detail_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto">
      <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-lg w-full p-5 md:p-7 relative shadow-2xl shadow-black animate-slideUp flex flex-col max-h-[90vh]">
        
        {/* Header X button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer outline-none z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 pb-3 border-b border-white/5 shrink-0 pr-8">
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#cfbcff]" />
            <span>分销佣金精算派发审计日志详情</span>
          </h4>
          <p className="text-[10px] text-[#cbc4d2]/45 font-mono">TRANSACTION ID: {selectedCommission.id}</p>
        </div>

        {/* Scrollable Container with max height limitation */}
        <div className="overflow-y-auto py-4 pr-1 flex-grow space-y-5 scrollbar-thin scrollbar-thumb-white/10 text-left">
          {/* Core facts in tidy code format */}
          <div className="space-y-3 bg-[#110e16] p-4 rounded-xl border border-white/5 font-mono text-xs text-[#cbc4d2]">
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">拟发放代理/UID：</span>
              <span className="text-white font-extrabold">{selectedCommission.uid} ({selectedCommission.recipientNickname})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">分销推荐代数层级：</span>
              <span className="text-[#cfbcff] font-bold font-sans">{selectedCommission.level} (直属级下线裂变推广)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">认购代收关联源订单：</span>
              <span className="text-white">{selectedCommission.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">预估分拨金额：</span>
              <span className="text-emerald-400 font-extrabold text-sm">USDT {selectedCommission.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">交割目标接收账户：</span>
              <span className="text-emerald-400 font-bold text-[11px]">平台用户内置钱包余额</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">交易计入时间点：</span>
              <span>{selectedCommission.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/40 font-bold font-sans">精算派发终审状态：</span>
              <span className={selectedCommission.status === 'credited' ? 'text-emerald-400' : selectedCommission.status === 'intercepted' ? 'text-red-400 font-bold' : 'text-amber-500 animate-pulse'}>
                {selectedCommission.status === 'credited' ? '✔ 审核已通过到账' : selectedCommission.status === 'pending' ? '⏳ 待结算轮询' : selectedCommission.status === 'intercepted' ? '⛔ 拦截回笼入库 (Recycled)' : '❌ 挂账阻塞/发生账目赤字'}
              </span>
            </div>
          </div>

          {/* Tracking commission origin source detail info */}
          <div className="p-4 bg-[#1e1329]/55 border border-[#cfbcff]/15 rounded-2xl text-xs space-y-2.5">
            <p className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-[#cfbcff]">
              <Coins className="w-4 h-4 shrink-0 text-[#cfbcff]" />
              <span>分润提供源头追踪 (Origin Commission Flow)</span>
            </p>
            <div className="space-y-1.5 font-sans leading-relaxed text-[#cbc4d2]/90">
              <p>
                本笔分销收益由您的团队第 <span className="text-[#cfbcff] font-extrabold font-mono text-sm">{selectedCommission.triggerMemberLevel || `${selectedCommission.level}`}</span> 代代理成员 
                <span className="text-white font-mono font-bold bg-[#110e16] px-1.5 py-0.5 rounded ml-1 text-xs select-all">
                  UID: {selectedCommission.triggerMemberUid || (selectedCommission.status === 'intercepted' ? '891099' : '895002')}
                </span> 执行充值操作所触发提供。
              </p>
              <div className="flex justify-between items-center bg-black/25 px-3 py-2 rounded-xl mt-1 text-[11px] font-mono">
                <span className="text-[#cbc4d2]/45">对应伞下实际充值数额:</span>
                <span className="text-emerald-400 font-extrabold">USDT {(selectedCommission.triggerRechargeAmount || (selectedCommission.amount * 10)).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
            </div>
          </div>

          {/* Exception trace display */}
          {selectedCommission.errorMessage && (
            selectedCommission.status === 'intercepted' ? (
              <div className="p-4 bg-indigo-950/40 border border-[#cfbcff]/20 rounded-2xl text-xs text-[#cbc4d2] space-y-2">
                <p className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-[#cfbcff]">
                  <CheckCircle className="w-4 h-4 shrink-0 text-[#cfbcff]" />
                  <span>资金溢出拦截回笼对账报告 (System Recycle Log)</span>
                </p>
                <p className="leading-relaxed opacity-90 text-[11px] font-mono text-left">{selectedCommission.errorMessage}</p>
                <p className="text-[10px] text-white/30 italic font-sans leading-normal">
                  * 本笔分销溢价收益已由系统智能合约机制自动执行拦截并结转归集至平台准备金账户中，实现完璧入库。
                </p>
              </div>
            ) : (
              <div className="p-4 bg-red-950/40 border border-red-500/20 rounded-2xl text-xs text-red-200 space-y-2">
                <p className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-red-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>系统对账异常检测报告 (Critical Alert)</span>
                </p>
                <p className="leading-relaxed opacity-90 text-[11px] font-mono text-left">{selectedCommission.errorMessage}</p>
                <p className="text-[10px] text-white/30 italic font-sans leading-normal">
                  * 针对该挂账状态，除非人工强写跳过额度限额限制，否则此款项将始终处于待付阻塞队列中，不可入账。
                </p>
              </div>
            )
          )}

          {/* Manual actions area */}
          {selectedCommission.status === 'intercepted' ? (
            <div className="p-4 bg-[#1a1523]/60 border border-white/5 rounded-2xl space-y-2">
              <span className="text-[10px] text-[#cbc4d2]/40 uppercase font-black tracking-wider block">回笼机制干预处理</span>
              <p className="text-xs text-[#cbc4d2]/80 leading-normal text-left">
                该交易为<strong>系统机制自动回笼归集</strong>，属于出入账合规闭环链条的一部分，因此不需要并且无法进行人工微调、二次强划或纠偏 bypass 操作。
              </p>
            </div>
          ) : (
            <div className="space-y-3.5 pt-2 border-t border-white/5">
              <span className="text-[10px] text-[#cbc4d2]/40 uppercase font-black tracking-wider block">异常处理与手动纠偏差操工作流 (Exception Intervention Workflow)</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                
                {/* Action 1: Force credit override pool */}
                <button
                  type="button"
                  onClick={() => onForcePayout(selectedCommission.id)}
                  className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 active:scale-95 text-white p-3 rounded-xl font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>手动强行发放 (Bypass Pool)</span>
                </button>

                {/* Action 2: Adjust amount to pool limit */}
                <button
                  type="button"
                  onClick={() => {
                    const adjustPrompt = prompt(`修正用户 UID: ${selectedCommission.uid} 的实际该单派发佣金额度。(上限请限制在额度容量内，例如输入金额 380U)`, '380');
                    if (adjustPrompt) {
                      onSubmitCommissionAdjustment(selectedCommission.id, adjustPrompt);
                    }
                  }}
                  className="bg-white/5 hover:bg-white/10 text-[#cbc4d2] p-3 rounded-xl font-bold border border-white/10 cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#cfbcff]" />
                  <span>手动微调额度后重试</span>
                </button>

              </div>
              
              <p className="text-[10px] text-[#cbc4d2]/30 text-center leading-normal">
                * 操作警告：手动发放和微调会直接改写中心流动性账簿。任何人工干预都将记录进管理员财务审计日志链中供后续溯源。
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer close */}
        <div className="pt-3 border-t border-white/5 flex justify-end text-xs shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-xl font-semibold transition-all cursor-pointer"
          >
            关闭详情
          </button>
        </div>

      </div>
    </div>
  );
}
