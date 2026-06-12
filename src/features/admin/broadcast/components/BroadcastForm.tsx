import { MessageSquare, Sliders } from 'lucide-react';
import type { BroadcastFormProps } from '../types';

export default function BroadcastForm({
  broadcastTarget,
  setBroadcastTarget,
  broadcastTitle,
  setBroadcastTitle,
  broadcastBody,
  setBroadcastBody,
  onSendBroadcast
}: BroadcastFormProps) {
  return (
    <div className="lg:col-span-7 bg-[#1c1822]/40 rounded-2xl p-5 border border-white/5 space-y-4">
      <h4 className="text-xs font-black uppercase text-white tracking-widest pb-3 border-b border-white/5 flex items-center gap-1.5 mb-2">
        <MessageSquare className="w-4 h-4 text-[#cfbcff]" />
        向全联盟注册激活用户代表手动广播推送通知
      </h4>

      <div className="space-y-4 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-white">指定投送对象</span>
            <select 
              value={broadcastTarget}
              onChange={(e) => setBroadcastTarget(e.target.value)}
              className="bg-[#110e16] border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white uppercase font-bold cursor-pointer"
            >
              <option value="all">向全同盟所有会员公开广播</option>
              <option value="889421">直投至 UID: 889421代表</option>
              <option value="889425">直投至 UID: 889425代表</option>
              <option value="890112">直投至 UID: 890112代表</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-white">广播通知类别</span>
            <span className="bg-[#110e16] text-[#cfbcff] border border-white/5 px-3.5 py-2 rounded-xl text-xs font-bold text-left block">
              📢 官方通知公告与安全维护大盘提醒
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="font-semibold text-white">通知主标题</span>
          <input 
            type="text"
            value={broadcastTitle}
            onChange={(e) => setBroadcastTitle(e.target.value)}
            placeholder="比如：系统升级大盘核对日志完成提醒"
            className="bg-[#110e16] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-1 focus:ring-[#cfbcff] outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="font-semibold text-white">推送正文详情内容 (支持通配标签替换)</span>
          <textarea 
            rows={4}
            value={broadcastBody}
            onChange={(e) => setBroadcastBody(e.target.value)}
            placeholder="编写详细的同盟安全声明、维护或到账提醒..."
            className="bg-[#110e16] border border-[#cfbcff]/15 rounded-xl p-3 text-xs text-white leading-relaxed focus:ring-1 focus:ring-[#cfbcff] outline-none"
          />
        </div>

        <button 
          onClick={onSendBroadcast}
          className="w-full mt-3 py-3 bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white rounded-xl font-bold active:scale-95 transition-all text-xs text-center cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sliders className="w-3.5 h-3.5" /> 确认向会员一键下发官方系统广播
        </button>
      </div>
    </div>
  );
}
