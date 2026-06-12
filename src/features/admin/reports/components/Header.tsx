import { BarChart2, Download } from 'lucide-react';
import type { HeaderProps } from '../types';

export function Header({ onExportCSV }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-[#cfbcff]" />
          联盟收益精算报表与趋势审计分析 (Report Center)
        </h3>
        <p className="text-xs text-[#cbc4d2]/60 mt-0.5">
          全网D+1分润核算对账、质押套餐申购占比以及各层收益穿透报表，支持即时快照分析或CSV导出
        </p>
      </div>
      <button
        onClick={onExportCSV}
        className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] text-white hover:opacity-90 px-4 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg w-full sm:w-auto justify-center"
      >
        <Download className="w-4 h-4" /> 导出全局日结算报表 (CSV)
      </button>
    </div>
  );
}
