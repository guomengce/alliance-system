import { Activity, Lock, ShieldCheck } from 'lucide-react';

import { AntdCard } from '../../../../shared/antd/AntdCard';
import { AntdDesktopTable } from './components/AntdDesktopTable';
import { AntdMobileCard } from './components/AntdMobileCard';
import type { RosterViewProps } from '../types';

const TEXT = {
  title: '\u6392\u961f\u5217\u8868',
  description:
    '\u6d4f\u89c8\u4e0e\u68c0\u7d22\u6240\u6709\u4f1a\u5458\u9501\u4ed3\u6392\u961f\u8d44\u91d1\u660e\u7ec6\u3001\u76f4\u5c5e\u4e0b\u7ebf\u8ba4\u8d2d\u89e3\u9501\u660e\u7ec6\u4ee5\u53ca\u8d26\u989d\u624b\u52a8\u6821\u6b63\u5b58\u8bc1\u3002',
  guideTitle: '\u6392\u961f\u4e0e\u4ea4\u5272\u6838\u5fc3\u673a\u5236\u6307\u5357',
  formulaTitle: '\u89e6\u53d1\u673a\u5236\u5bf9\u7b97\u516c\u5f0f',
  formulaDesc:
    '\u5f53\u4e14\u4ec5\u5f53\u8be5\u4e0a\u7ea7\u4f1a\u5458\u7684\u4e00\u4ee3\u76f4\u63a5 (L1 \u4e0b\u5c5e) \u5212\u8f6c\u8ba4\u8d2d\u7406\u8d22\u5957\u9910\u65f6\uff0c\u4f1a\u7acb\u523b\u6fc0\u53d1\u8be5\u6761\u6392\u961f\u8d26\u5355\u3002',
  formula: '\u89e3\u9501\u91ca\u653e USDT = L1 \u5b9e\u4ed8\u8ba4\u8d2d\u989d * 10%',
  stockNote:
    '\u540c\u65f6\uff0c\u7528\u6237\u5ba2\u6237\u7aef\u5c06\u6309\u89e3\u9501\u989d\u7684 10 \u500d\u6bd4\u4f8b\u83b7\u5f97\u5206\u914d\u7684 TROO \u80a1\u6743\u73b0\u8d27\u4ea4\u8ba9\u53d1\u653e\u3002',
  monitorTitle: '\u667a\u80fd\u6821\u5bf9\u8d22\u52a1\u76d1\u63a7',
  monitorDesc:
    '\u5982\u679c\u7531\u4e8e\u7279\u6b8a\u4e1a\u52a1\u8c03\u6574\u9000\u8ba2\uff0c\u5bfc\u81f4\u4e0b\u7ebf\u8ba2\u5355\u9501\u4ed3\u6570\u636e\u5931\u8861\uff0c\u7ba1\u7406\u5458\u53ef\u901a\u8fc7\u70b9\u51fb\u201c\u8bb0\u5f55\u8be6\u60c5\u201d\u5207\u6362\u81f3\u7ea0\u504f\u7f16\u8f91\u72b6\u6001\u91cd\u5199\u5269\u4f59\u6392\u961f\u91d1\u989d\u3002',
  archiveNote:
    '\u6240\u6709\u7684\u624b\u5de5\u4fee\u6b63\u884c\u4e3a\u5747\u4f1a\u751f\u6210\u72ec\u7279\u7684 TRIG-CAL \u6821\u6b63\u5bf9\u9f50\u6d41\u6c34\u5355\u53f7\u8fdb\u884c\u5f52\u6863\uff0c\u591a\u6838\u8d26\u7c3f\u4fdd\u6301\u7ebf\u4e0a\u7ebf\u4e0b\u903b\u8f91\u4e00\u81f4\u3002',
};

export function AntdRosterView({ lockedRoster, onOpenDetails }: RosterViewProps) {
  return (
    <div id="admin_queue_view" className="space-y-6 animate-fadeIn select-none flex-grow flex flex-col md:min-h-[calc(100vh-140px)] pb-4">
      <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 bg-[#141119] space-y-6 flex-grow flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2 border-b border-white/5 text-left">
          <div>
            <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#cfbcff]" />
              <span>{TEXT.title}</span>
            </h3>
            <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">{TEXT.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#1a1622]/40 p-5 rounded-2xl border border-white/5 text-left animate-fadeIn">
          <AntdCard className="alliance-antd-queue-guide-card">
            <h4 className="text-xs font-black text-[#f1bf50] flex items-center gap-1.5 uppercase tracking-wider font-sans border-b border-white/5 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#f1bf50]" />
              <span>{TEXT.guideTitle}</span>
            </h4>
            <div className="text-xs text-[#cbc4d2]/70 space-y-2.5 leading-relaxed font-sans pt-3">
              <p className="font-extrabold text-white text-[11px]">{TEXT.formulaTitle}</p>
              <p className="leading-relaxed text-[11px]">{TEXT.formulaDesc}</p>
              <div className="p-2 py-1.5 bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 rounded font-mono text-[10px] font-bold text-center w-full max-w-xs">
                {TEXT.formula}
              </div>
              <p className="text-[10px] text-[#cbc4d2]/40">{TEXT.stockNote}</p>
            </div>
          </AntdCard>

          <AntdCard className="alliance-antd-queue-guide-card">
            <div className="space-y-3 flex flex-col justify-between h-full">
              <div>
                <h4 className="text-xs font-black text-[#cfbcff] flex items-center gap-1.5 uppercase tracking-wider font-sans border-b border-white/5 pb-2">
                  <Activity className="w-4 h-4 text-[#cfbcff]" />
                  <span>{TEXT.monitorTitle}</span>
                </h4>
                <p className="text-[#cbc4d2]/75 leading-relaxed text-[11px] font-sans mt-2">{TEXT.monitorDesc}</p>
              </div>
              <div className="p-3 bg-[#cfbcff]/5 border border-[#cfbcff]/10 rounded-xl text-[10px] text-[#cbc4d2]/70 leading-normal font-sans">
                {TEXT.archiveNote}
              </div>
            </div>
          </AntdCard>
        </div>

        <div className="text-left space-y-4 flex-grow">
          <div className="block md:hidden space-y-3">
            {lockedRoster.map((r) => (
              <AntdMobileCard key={r.uid} roster={r} onOpenDetails={onOpenDetails} />
            ))}
          </div>

          <AntdDesktopTable lockedRoster={lockedRoster} onOpenDetails={onOpenDetails} />
        </div>
      </div>
    </div>
  );
}
