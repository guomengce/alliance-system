import { Activity, ShieldCheck } from 'lucide-react';
import { AntdCard } from '@/src/shared/antd/AntdCard';

export default function AntdStatusHeader() {
  return (
    <AntdCard className="alliance-antd-dashboard-status-card">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/10 shrink-0">
          <ShieldCheck className="w-6 h-6 text-[#110e16]" />
        </div>
        <div>
          <h1 className="text-lg font-black text-white">全同盟高级运营管理控制中心</h1>
          <p className="text-[13px] text-[#cbc4d2]/60 mt-0.5 font-sans leading-relaxed">
            拥有机构储备大盘监控、参数实时微调、跨层佣金对账及秒级广播最高特权
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-[rgba(255,180,171,0.05)] border border-[rgba(255,180,171,0.15)] px-4 py-2 rounded-xl">
        <Activity className="w-4 h-4 text-[#ffb4ab]" />
        <div className="text-left">
          <p className="text-xs text-[#cbc4d2]/50 uppercase font-black tracking-widest leading-none">系统风控状态</p>
          <p className="text-[13px] font-black text-emerald-400 mt-1 leading-none font-mono">D+1 Settled Safely</p>
        </div>
      </div>
    </AntdCard>
  );
}
