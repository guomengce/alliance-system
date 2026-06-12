import type { TemplatePanelProps } from '../types';

export default function TemplatePanel({
  notificationTemplate,
  setNotificationTemplate,
  onSaveTemplate
}: TemplatePanelProps) {
  return (
    <div className="lg:col-span-5 bg-[#17131e] p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
      <div>
        <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider pb-2 border-b border-white/5">
          池枯竭额度补缴警告通配模板配置
        </h4>
        <p className="text-[11px] text-[#cbc4d2]/50 mt-1.5 leading-relaxed font-sans">
          配置当出现 D0 发生买单但超级上线佣金代付信用限额剩余容量不足时的即时警告补款模板：
        </p>

        <div className="mt-4 flex flex-col gap-2 font-mono text-xs">
          <span className="text-white font-sans text-xs font-bold block">池红线即将枯竭警告通配富文本</span>
          <textarea 
            rows={4}
            value={notificationTemplate}
            onChange={(e) => setNotificationTemplate(e.target.value)}
            className="bg-[#110e16] border border-white/5 rounded-xl p-3 text-[11px] text-white leading-relaxed focus:ring-1 focus:ring-[#cfbcff] outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={onSaveTemplate}
          className="w-full py-2 bg-[#36343a] text-white rounded-xl text-xs font-bold hover:brightness-115 active:scale-95 transition-all cursor-pointer border border-white/5"
        >
          保存池告警文案模板
        </button>
      </div>
    </div>
  );
}
