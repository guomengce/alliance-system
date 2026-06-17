import { AlertTriangle, Bell, RefreshCw, Sparkles, X } from 'lucide-react';
import type { WorkspaceProps } from '../types';

type DetailModalProps = Pick<
  WorkspaceProps,
  | 'selectedTx'
  | 'setSelectedTx'
  | 'handleResolveException'
  | 'handleNotifyInsufficientCapacity'
>;

export default function DetailModal({
  selectedTx,
  setSelectedTx,
  handleResolveException,
  handleNotifyInsufficientCapacity
}: DetailModalProps) {
  return (
    <>
      {/* Settlement detail verification popup dialog */}
      {selectedTx && (
      <div id="settle_audit_overlay" className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4 overflow-y-auto">
        <div className="bg-[#181421] border border-white/10 rounded-3xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl shadow-black animate-slideUp space-y-6">
          
          {/* Close */}
          <button
            type="button"
            onClick={() => setSelectedTx(null)}
            className="absolute right-4 top-4 text-[#cbc4d2]/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1 pb-2 border-b border-white/5">
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#cfbcff]" />
              <span>加盟商佣金属限结算数据穿透校对簿</span>
            </h4>
            <p className="text-[10px] text-[#cbc4d2]/45 font-mono">STL ACCOUNT TICKET ID: {selectedTx.id}</p>
          </div>

          {/* Core facts */}
          <div className="space-y-3 bg-[#110e16] p-4.5 rounded-2xl border border-white/5 font-mono text-xs text-[#cbc4d2]/80">
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/50 font-sans">拟派发结算代理/UID：</span>
              <span className="text-white font-bold">{selectedTx.memberUid} ({selectedTx.nickname})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/50 font-sans">预提报结算结算期：</span>
              <span>{selectedTx.date}日结 (D+1)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#cbc4d2]/50 font-sans">下代下属累积总返本收益：</span>
              <span className="text-white font-bold font-mono">USDT {selectedTx.expectedCommissions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-white/5">
              <span className="text-[#cbc4d2]/50 font-sans">该账号当前仍可用额度池：</span>
              <span className="text-amber-300 font-extrabold font-mono">{selectedTx.remainingPoolCapacity.toLocaleString()} USDT</span>
            </div>
            <div className="flex justify-between pt-1 text-xs">
              <span className="text-emerald-400 font-sans font-bold">实际核发到账美金：</span>
              <span className="text-emerald-400 font-black font-mono">USDT {selectedTx.actualSettledAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-red-400">
              <span className="font-sans font-bold">超发部分大盘截扣溢漏额：</span>
              <span className="font-black font-mono">USDT {selectedTx.spilloverClipped.toLocaleString()}</span>
            </div>
          </div>

          {/* Low capacity alerts warnings explicitly detailing the instructions */}
          {selectedTx.remainingPoolCapacity < selectedTx.expectedCommissions && (
            <div className="p-4 bg-red-950/40 border border-red-500/20 rounded-2xl text-xs text-red-200/90 space-y-2 text-left">
              <p className="font-bold text-red-400 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>额度池严重透支警报 (Capacity Exhausted)</span>
              </p>
              <p className="leading-relaxed text-[11px] font-sans">
                该上线代理人的 [佣金额度] 仅剩余 <strong>{selectedTx.remainingPoolCapacity} USDT</strong>，因此超出了系统设限制。已触发强行溢出回笼大仓机制共 <strong>{selectedTx.spilloverClipped} USDT</strong> 被直接罚没截留。
              </p>
              <p className="text-[10px] text-white/30 font-sans italic">
                * 如果该会员已通过其他渠道认购扩展补齐额度，管理员不仅可以发送警告推送，亦可执行“解决并重置异常”将其强行修正发放。
              </p>
            </div>
          )}

          {/* Actions for settlement details: manual intervention and notifications */}
          <div className="pt-2 space-y-3 text-left">
            <span className="text-[10px] text-[#cbc4d2]/40 font-black uppercase tracking-wider block font-sans">平台决策管理命令 (Bypass & Notification Workflow)</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-sans">
              
              {/* Action 1: Notify user of low capacity alert */}
              <button
                type="button"
                onClick={() => handleNotifyInsufficientCapacity(selectedTx)}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 p-3.5 rounded-xl font-bold border border-amber-500/30 cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Bell className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>🔔 通知会员佣金额池枯竭</span>
              </button>

              {/* Action 2: Exception handling override */}
              <button
                type="button"
                onClick={() => handleResolveException(selectedTx.id)}
                className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 active:scale-95 text-white p-3.5 rounded-xl font-extrabold cursor-pointer transition-all flex items-center justify-center gap-1 shadow-md shadow-[#cfbcff]/5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>⚙️ 人工补发并强制轧账</span>
              </button>

            </div>
            
            <p className="text-[10px] text-[#cbc4d2]/30 text-center leading-normal font-sans">
              * 精算操作备查：发出“佣额度不足拦截警告”会自动下向用户发送系统弹窗通知协助其自助补足。
            </p>
          </div>

          {/* Footer */}
          <div className="pt-2 flex justify-end text-xs font-sans">
            <button
              type="button"
              onClick={() => setSelectedTx(null)}
              className="bg-white/5 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-white/10 transition-all cursor-pointer"
            >
              关闭对账详情
            </button>
          </div>

        </div>
      </div>
      )}
    </>
  );
}
