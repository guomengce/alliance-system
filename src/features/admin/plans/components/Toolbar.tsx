import { Plus } from 'lucide-react';
import type { ToolbarProps } from '../types';

export function Toolbar({ onOpenCreateModal }: ToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="text-base font-bold text-white">套餐管理 (Admin Plans Portal)</h3>
        <p className="text-xs text-[#cbc4d2]/60 mt-0.5">
          配置系统各理财档位的本金认购上限、佣金额度配售池具体值、TROO股票买入、排队与额外赠送比率。
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenCreateModal}
        className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 active:scale-95 transition-all text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#cfbcff]/5"
      >
        <Plus className="w-4 h-4" />
        <span>创建新理财套餐</span>
      </button>
    </div>
  );
}
