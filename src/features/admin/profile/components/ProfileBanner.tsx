import { ShieldCheck } from 'lucide-react';
import type { ProfileBannerProps } from '../types';

export function ProfileBanner({ uid, nickname }: ProfileBannerProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-32 h-32 bg-[#cfbcff]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6750a4] to-[#cfbcff] p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-[#141218] flex items-center justify-center border border-[#cfbcff]/20">
              <span className="text-3xl font-black text-[#cfbcff] tracking-tight font-mono">
                {nickname ? nickname.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#cfbcff] text-[#141218] w-7 h-7 rounded-lg flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
            <h1 className="text-xl md:text-2xl font-black text-white">{nickname}</h1>
            <span className="bg-[#cfbcff]/10 text-[#cfbcff] text-[10px] font-black uppercase px-2.5 py-0.5 rounded border border-[#cfbcff]/20 w-fit mx-auto md:mx-0 tracking-wider">
              SYSTEM SUPERUSER
            </span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-[#cbc4d2]">
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="font-semibold text-[#cfbcff] font-mono">ADMIN UID:</span>
              <span className="font-mono">{uid}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="font-semibold text-[#cfbcff] font-mono">ROLE LEVEL:</span>
              <span>ROOT MASTER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
