import { ArrowLeft } from 'lucide-react';

interface DetailHeaderProps {
  onBack: () => void;
}

export function DetailHeader({ onBack }: DetailHeaderProps) {
  return (
      <div className="glass-card p-4 rounded-2xl border border-white/5 bg-[#141119] flex flex-wrap justify-between items-center gap-4">
        <button
          onClick={onBack}
          className="bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#cbc4d2]" />
          <span>返回排队代表名册</span>
        </button>

        <div className="text-right">
          <span className="text-[9px] font-black uppercase text-[#cfbcff] px-2.5 py-1 bg-[#cfbcff]/10 rounded-full font-sans">
            排队出水穿透账册 (Trace Sheet)
          </span>
        </div>
      </div>
  );
}
