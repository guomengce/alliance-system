import { Percent } from 'lucide-react';
import type { RatiosTableProps } from '../types';

export default function RatiosTable({ ratios }: RatiosTableProps) {
  return (
    <section className="glass-card rounded-[24px] overflow-hidden">
      <div className="p-5 px-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Percent className="w-5 h-5 text-[#cfbcff]" />
          <h4 className="text-sm md:text-base font-bold text-white">佣金下线比例说明</h4>
        </div>
        <span className="px-3 py-0.5 bg-[#cfbcff]/10 text-[#cfbcff] text-xs rounded-full font-bold uppercase tracking-wider border border-[#cfbcff]/10">
          当前最高层级: L5
        </span>
      </div>
      <div className="hidden md:block overflow-x-auto scrollbar-hide">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#cbc4d2]/80 text-xs font-bold uppercase tracking-wider border-b border-white/5 bg-white/2">
              <th className="p-4 px-6">代理等级</th>
              <th className="p-4 px-6">返佣计算比例</th>
              <th className="p-4 px-6 text-right">结算周期</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {ratios.map((item, index) => (
              <tr key={index} className="hover:bg-white/3 transition-colors border-b border-white/5 last:border-none">
                <td className="p-4 px-6 font-bold text-[#cfbcff]">{item.name}</td>
                <td className="p-4 px-6 font-semibold text-white font-mono">{item.ratio}</td>
                <td className="p-4 px-6 text-right text-[#cbc4d2]/80 font-mono text-xs">{item.cycle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View ratio cards */}
      <div className="md:hidden divide-y divide-white/5 space-y-4 p-4">
        {ratios.map((item, index) => (
          <div key={index} className={`space-y-2.5 ${index > 0 ? 'pt-4' : ''}`}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#cfbcff] text-sm">{item.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[#cbc4d2]/40 text-xs font-bold font-mono">返佣计算比例</p>
                <p className="text-white font-semibold font-mono mt-0.5">{item.ratio}</p>
              </div>
              <div>
                <p className="text-[#cbc4d2]/40 text-xs font-bold font-mono text-right">结算周期</p>
                <p className="text-[#cbc4d2] font-mono mt-0.5 text-right">{item.cycle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
