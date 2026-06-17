import { Check } from 'lucide-react';
import type { FooterActionsProps } from '../../types';

export function FooterActions({ onBack, onSave }: FooterActionsProps) {
  return (
    <>
        {/* Form controls row - no overlay */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-end">
          <button 
            type="button"
            onClick={() => onBack()}
            className="bg-white/5 hover:bg-white/10 text-[#cbc4d2] px-6 py-3 rounded-xl font-bold transition-all text-xs cursor-pointer text-center outline-none"
          >
            取消返回名册
          </button>
          
          <button 
            type="button"
            onClick={onSave}
            className="bg-gradient-to-r from-[#6750a4] to-[#cfbcff] hover:brightness-110 text-white px-8 py-3 rounded-xl font-black transition-all text-xs cursor-pointer text-center flex items-center justify-center gap-1.5 outline-none shadow-md shadow-[#cfbcff]/5"
          >
            <Check className="w-4 h-4" />
            <span>确认修改</span>
          </button>
        </div>
    </>
  );
}
