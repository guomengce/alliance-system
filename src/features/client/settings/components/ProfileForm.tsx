import { Settings2 } from 'lucide-react';
import type { ProfileFormProps } from '../types';

export default function ProfileForm({
  tempNickname,
  tempEmail,
  setTempNickname,
  setTempEmail,
  onUpdateProfile
}: ProfileFormProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8">
      <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
        <Settings2 className="w-5 h-5 text-[#cfbcff]" /> 基本资料修改
      </h3>

       <form onSubmit={onUpdateProfile} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-wider">用户昵称 (Nickname)</label>
            <input 
              type="text" 
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
              className="bg-[#211f24] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none font-medium"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-[#cbc4d2] font-semibold uppercase tracking-wider">安全收据邮箱 (Secured Email)</label>
            <input 
              type="email" 
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              className="bg-[#211f24] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#cfbcff] outline-none font-medium"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="bg-[#cfbcff] text-[#381e72] px-6 py-2.5 rounded-lg text-xs font-bold hover:brightness-110 active:scale-95 transition-all text-right ml-auto block"
        >
          保存资料修改
        </button>
      </form>
    </div>
  );
}
