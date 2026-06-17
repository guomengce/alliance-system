import { Download, FileText } from 'lucide-react';
import type { OrderHeaderProps } from '../../types';

export default function ListHeader({ onExport }: OrderHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 border-b border-white/5 pb-3.5">
      <div>
        <h3 className="text-sm md:text-base font-black text-white tracking-tight flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#cfbcff]" />
          <span>订单列表</span>
        </h3>
        <p className="text-[11px] text-[#cbc4d2]/50 mt-0.5 leading-tight">
          浏览与检索所有会员认购理财订单存证、交易哈希验证及上级同盟分拨记录。
        </p>
      </div>

      <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
        <button 
          type="button"
          onClick={onExport}
          className="bg-[#cfbcff]/5 hover:bg-[#cfbcff]/15 text-[#cfbcff] px-3.5 py-2 rounded-xl text-xs font-bold border border-[#cfbcff]/10 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
        >
          <Download className="w-3.5 h-3.5" /> 导出
        </button>
      </div>
    </div>
  );
}
