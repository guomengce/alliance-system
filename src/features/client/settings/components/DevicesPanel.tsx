import { Smartphone } from 'lucide-react';
import type { DevicesPanelProps } from '../types';

export default function DevicesPanel({ activeDevices }: DevicesPanelProps) {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#cbc4d2] flex items-center gap-1.5">
          <Smartphone className="w-4.5 h-4.5 text-[#cfbcff]" /> 当前登录设备监控
        </h4>
        <span className="text-[10px] font-mono font-bold text-[#cfbcff] bg-[#cfbcff]/10 border border-[#cfbcff]/20 px-2.5 py-0.5 rounded-full">
          v1.4.12-Stable
        </span>
      </div>

      <div className="space-y-4">
        {activeDevices.map((dev, idx) => (
          <div key={idx} className="flex justify-between items-center opacity-90 text-xs text-[#cbc4d2] border-b border-white/5 pb-3 last:border-none last:pb-0">
            <div className="space-y-0.5">
              <p className="font-bold text-white flex items-center gap-1.5">
                {dev.name} {dev.current && <span className="text-[9px] font-black text-[#00e676] bg-[#00e676]/10 px-1.5 py-0.5 rounded border border-[#00e676]/25">本机</span>}
              </p>
              <p className="opacity-70 text-[11px]">{dev.location} · {dev.ip}</p>
            </div>
            <span className="font-mono text-[10px] opacity-75">{dev.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
