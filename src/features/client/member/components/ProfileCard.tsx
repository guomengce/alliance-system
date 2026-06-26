import { ShieldCheck } from 'lucide-react';
import type { ProfileCardProps } from '../types';

export default function ProfileCard({
  uid,
  nickname,
  joinDate,
  isEditing,
  tempNickname,
  setTempNickname,
  onToggleEdit
}: ProfileCardProps) {
  return (
    <div className="lg:col-span-8 glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-32 h-32 bg-[#cfbcff]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6750a4] to-[#cfbcff] p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-[#141218] flex items-center justify-center border border-[#cfbcff]/20">
              <span className="text-3xl font-black text-[#cfbcff] tracking-tight">
                {nickname ? nickname.slice(0, 2).toUpperCase() : 'US'}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#cfbcff] text-[#381e72] w-7 h-7 rounded-lg flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
            {isEditing ? (
              <input
                type="text"
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="bg-[#211f24] border border-[#cfbcff]/30 text-white rounded-lg px-3 py-1 text-base focus:ring-1 focus:ring-[#cfbcff] outline-none max-w-[180px]"
              />
            ) : (
              <h1 className="text-xl md:text-2xl font-black text-white">{nickname}</h1>
            )}
            <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-xs font-extrabold uppercase px-2.5 py-0.5 rounded border border-[#cfbcff]/20 w-fit mx-auto md:mx-0">
              标准账户
            </span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-[#cbc4d2]">
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="font-semibold text-[#cfbcff]">ID:</span>
              <span className="font-mono">{uid}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="font-semibold text-[#cfbcff]">加入时间:</span>
              <span className="font-mono">{joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onToggleEdit}
        className="whitespace-nowrap bg-[#6750a4]/30 hover:bg-[#6750a4]/50 border border-[#cfbcff]/20 text-[#cfbcff] px-6 py-2.5 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 duration-150"
      >
        {isEditing ? '保存修改' : '修改资料'}
      </button>
    </div>
  );
}
